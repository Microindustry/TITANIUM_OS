# eva_server.py | TITANIUM_OS / NODES / EVA | v0.3 | 2026-06-05
# Webhook Flask per WhatsApp Cloud API (Meta) — riceve i messaggi, li passa a
# eva_brain e risponde. Funziona in DRY-RUN senza credenziali (logga la risposta
# invece di inviarla), cosi' lo si puo' provare prima di collegare l'account Meta.
#
# Endpoints:
#   GET  /webhook   verifica di Meta (hub.challenge)
#   POST /webhook   ricezione messaggi
#   GET  /health    stato nodo
#
# Run:  python eva_server.py            (porta 5055, default DRY-RUN se manca il token)
# Env (da _VAULT/KEYS/titanium_os.env):
#   EVA_WHATSAPP_TOKEN   token permanente Graph API
#   EVA_PHONE_NUMBER_ID  id del numero mittente (WhatsApp Cloud API)
#   EVA_VERIFY_TOKEN     stringa scelta da te, usata nella verifica webhook
#   EVA_APP_SECRET       app secret Meta (per validare la firma X-Hub-Signature-256)
#   EVA_DRY_RUN          "1" per non inviare davvero (default 1 se manca il token)

import os
import sys
import hmac
import json
import hashlib
import logging
from pathlib import Path

if sys.stdout is not None and sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

NODE_DIR = Path(__file__).resolve().parent
ROOT = NODE_DIR.parents[1]  # .../TITANIUM_OS
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(NODE_DIR))

try:
    from CORE.log import get_logger
    logger = get_logger("eva_server")
except Exception:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [eva_server] %(levelname)s %(message)s")
    logger = logging.getLogger("eva_server")

import eva_brain
import eva_inbox

# ── Carica env dal vault (necessario se lanciato da Task Scheduler / login) ────
_env_file = Path.home() / "TITANIUM_OS" / "_VAULT" / "KEYS" / "titanium_os.env"
if _env_file.exists():
    for _line in _env_file.read_text(encoding="utf-8", errors="replace").splitlines():
        _line = _line.strip()
        if _line and not _line.startswith("#") and "=" in _line:
            _k, _, _v = _line.partition("=")
            os.environ.setdefault(_k.strip(), _v.strip())

TOKEN        = os.environ.get("EVA_WHATSAPP_TOKEN", "")
PHONE_ID     = os.environ.get("EVA_PHONE_NUMBER_ID", "")
VERIFY_TOKEN = os.environ.get("EVA_VERIFY_TOKEN", "titanium-eva")
APP_SECRET   = os.environ.get("EVA_APP_SECRET", "")
GRAPH_VER    = os.environ.get("EVA_GRAPH_VERSION", "v21.0")
# Dry-run di default finche' non c'e' un token: niente invii reali per sbaglio.
DRY_RUN      = os.environ.get("EVA_DRY_RUN", "" ).strip() in ("1", "true", "yes") or not TOKEN

try:
    import requests
except ImportError:
    requests = None

from flask import Flask, request, jsonify, Response

app = Flask(__name__)

# ── Invio messaggio (o log in dry-run) ────────────────────────────────────────

def send_whatsapp(to: str, text: str) -> dict:
    if DRY_RUN or not (TOKEN and PHONE_ID and requests):
        logger.info("[DRY-RUN] -> %s : %s", to, text)
        return {"dry_run": True, "to": to, "text": text}
    url = f"https://graph.facebook.com/{GRAPH_VER}/{PHONE_ID}/messages"
    payload = {"messaging_product": "whatsapp", "to": to,
               "type": "text", "text": {"body": text}}
    r = requests.post(url, json=payload,
                      headers={"Authorization": f"Bearer {TOKEN}"}, timeout=20)
    if r.status_code >= 300:
        logger.warning("invio fallito %s: %s", r.status_code, r.text[:300])
    return {"status": r.status_code}

# ── Validazione firma Meta (X-Hub-Signature-256) ──────────────────────────────

def valid_signature(raw: bytes) -> bool:
    if not APP_SECRET:
        # (#53, attacco 02 F2): fail-open SOLO in dry-run (pilot locale). In LIVE il
        # secret e' OBBLIGATORIO: senza, un POST di rete farebbe processare messaggi
        # finti a eva_brain e partire risposte WhatsApp reali. Fail-closed.
        if DRY_RUN:
            return True
        logger.error("EVA_APP_SECRET mancante in modalita' LIVE — webhook rifiutato (fail-closed)")
        return False
    sig = request.headers.get("X-Hub-Signature-256", "")
    if not sig.startswith("sha256="):
        return False
    digest = hmac.new(APP_SECRET.encode(), raw, hashlib.sha256).hexdigest()
    return hmac.compare_digest("sha256=" + digest, sig)

# ── Webhook ───────────────────────────────────────────────────────────────────

@app.get("/webhook")
def verify():
    # Handshake di verifica richiesto da Meta quando registri l'URL.
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge", "")
    if mode == "subscribe" and token == VERIFY_TOKEN:
        logger.info("webhook verificato")
        return Response(challenge, mimetype="text/plain")
    return Response("forbidden", status=403)

@app.post("/webhook")
def receive():
    raw = request.get_data()
    if not valid_signature(raw):
        logger.warning("firma non valida, scarto")
        return Response("bad signature", status=403)

    data = request.get_json(silent=True) or {}
    results = []
    for entry in data.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})
            for msg in value.get("messages", []):
                if msg.get("type") != "text":
                    continue
                sender = msg.get("from")
                body = msg.get("text", {}).get("body", "")
                res = eva_brain.handle_message(body, sender=sender)
                logger.info("%s [%s] -> %s", sender, res["intent"], res["reply"][:80])
                # Handoff -> registra in inbox cosi' una persona del centro puo' richiamare
                if res.get("handoff"):
                    eva_inbox.record_handoff({
                        "sender": sender, "intent": res["intent"],
                        "reply": res["reply"], "slots": res.get("slots"),
                    })
                send_whatsapp(sender, res["reply"])
                results.append(res)
    return jsonify({"handled": len(results), "results": results})

@app.get("/inbox")
def inbox():
    # Handoff verso l'operatore (ultimi N, opz. solo i nuovi). Per pannello/n8n.
    # (#53, attacco 02 F1): gli handoff contengono PII dei clienti (numero WhatsApp,
    # messaggi). Da localhost passa libero (pannello same-host); da remoto serve
    # X-API-Key == EVA_API_KEY (fallback TI_API_KEY) — fail-closed come api_server.
    if request.remote_addr not in ("127.0.0.1", "::1"):
        key = os.environ.get("EVA_API_KEY", "") or os.environ.get("TI_API_KEY", "")
        if not key or request.headers.get("X-API-Key", "") != key:
            return jsonify({"error": "non autorizzato"}), 403
    limit = request.args.get("limit", default=50, type=int)
    only_new = request.args.get("nuovi", default="0") in ("1", "true", "yes")
    recs = eva_inbox.read_handoffs(limit=limit, status="nuovo" if only_new else None)
    return jsonify({"count": len(recs), "handoffs": recs})

@app.get("/health")
def health():
    return jsonify({
        "node": "EVA",
        "version": "0.3",
        "dry_run": DRY_RUN,
        "configured": bool(TOKEN and PHONE_ID),
        "verify_token_set": VERIFY_TOKEN != "titanium-eva",
        "app_secret_set": bool(APP_SECRET),
    })

if __name__ == "__main__":
    port = int(os.environ.get("EVA_PORT", "5055"))
    # (#53, attacco 02 F1): default 127.0.0.1 — PII clienti non raggiungibile da
    # LAN/Tailscale. Quando Meta dovra' raggiungere il webhook: tunnel con TLS
    # (Cloudflare Tunnel/ngrok) verso localhost, oppure EVA_BIND esplicito.
    bind = os.environ.get("EVA_BIND", "127.0.0.1")
    mode = "DRY-RUN (nessun invio reale)" if DRY_RUN else "LIVE"
    logger.info("EVA webhook su %s:%d — %s", bind, port, mode)
    app.run(host=bind, port=port)
