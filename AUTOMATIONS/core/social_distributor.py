"""
========================================================
TITANIUM_OS — SOCIAL DISTRIBUTOR (CE-7)
Modulo    : social_distributor.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Distribuisce contenuti su LinkedIn e Telegram.
            LinkedIn: pubblica post di testo (API v2).
            Telegram: invia messaggio al tuo canale/chat.
            Registra ogni distribuzione in
            CONTENT_ENGINE/distribuiti/log.json
Input     : --linkedin <file.md> o --telegram <file.md>
            o --all <file.md> (entrambi i canali)
Output    : post pubblicato + log aggiornato
Config    : nel .env:
            LINKEDIN_ACCESS_TOKEN
            TELEGRAM_BOT_TOKEN
            TELEGRAM_CHAT_ID
Avvio     : python social_distributor.py --all respiro_dei_dati_linkedin.md
========================================================
"""

import os
import re
import sys
import json
import logging
import argparse
import requests
from pathlib import Path
from datetime import datetime

ROOT           = Path(__file__).resolve().parent.parent.parent
CONTENT_ENGINE = Path(os.environ.get("CONTENT_ENGINE_DIR", str(Path.home() / "MICROINDUSTRY" / "CONTENT_ENGINE")))
DISTRIBUITI    = CONTENT_ENGINE / "distribuiti"
LOG_PATH       = ROOT / "DATA" / "logs" / "social_distributor.log"
DIST_LOG       = DISTRIBUITI / "distribution_log.json"

# LinkedIn API
LINKEDIN_API = "https://api.linkedin.com/v2"

# Telegram API
TELEGRAM_API = "https://api.telegram.org/bot{token}/sendMessage"

# Max char per LinkedIn (hard limit API)
LINKEDIN_MAX_CHARS = 3000

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [SOCIAL] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("social_distributor")


def _get_env(name: str) -> str | None:
    """Legge variabile da ambiente o .env."""
    val = os.environ.get(name, "").strip()
    if not val:
        env_file = ROOT / ".env"
        if env_file.exists():
            for line in env_file.read_text(encoding="utf-8").splitlines():
                if line.startswith(f"{name}="):
                    val = line.split("=", 1)[1].strip()
                    break
    return val or None


def _extract_linkedin_text(content: str) -> str:
    """
    Estrae il testo del post LinkedIn da un file .md multicanale.
    Cerca la sezione ## FORMATO 1 — LINKEDIN o usa tutto il contenuto.
    """
    # Cerca sezione LinkedIn esplicitamente
    m = re.search(
        r'##\s+FORMATO\s+1[^#\n]*LINKEDIN\s*\n(.*?)(?=\n##|\Z)',
        content, re.DOTALL | re.IGNORECASE
    )
    if m:
        return m.group(1).strip()

    # Fallback: rimuovi frontmatter e markdown pesante
    clean = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
    clean = re.sub(r'^#{1,6}\s+', '', clean, flags=re.MULTILINE)
    clean = re.sub(r'```.*?```', '', clean, flags=re.DOTALL)
    clean = re.sub(r'<!--.*?-->', '', clean, flags=re.DOTALL)
    clean = re.sub(r'\*{1,3}([^*]+)\*{1,3}', r'\1', clean)
    clean = re.sub(r'\n{3,}', '\n\n', clean)
    return clean.strip()[:LINKEDIN_MAX_CHARS]


def _get_linkedin_urn(token: str) -> str:
    """Recupera il LinkedIn URN (person ID) del profilo autenticato."""
    resp = requests.get(
        f"{LINKEDIN_API}/userinfo",
        headers={"Authorization": f"Bearer {token}"},
        timeout=15
    )
    if resp.status_code != 200:
        raise RuntimeError(f"LinkedIn userinfo error {resp.status_code}: {resp.text[:200]}")
    sub = resp.json().get("sub", "")
    if not sub:
        raise RuntimeError("LinkedIn: sub (person ID) non trovato nella risposta")
    return f"urn:li:person:{sub}"


def publish_linkedin(text: str, source_file: str = "") -> dict:
    """
    Pubblica un post su LinkedIn tramite API v2.
    Ritorna il response dict con postId.
    """
    token = _get_env("LINKEDIN_ACCESS_TOKEN")
    if not token:
        log.error("LINKEDIN_ACCESS_TOKEN non trovata nel .env")
        return {"ok": False, "error": "token mancante"}

    # Tronca se necessario
    if len(text) > LINKEDIN_MAX_CHARS:
        text = text[:LINKEDIN_MAX_CHARS - 3] + "..."

    try:
        author_urn = _get_linkedin_urn(token)
    except Exception as e:
        return {"ok": False, "error": str(e)}

    payload = {
        "author":     author_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": text},
                "shareMediaCategory": "NONE",
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    resp = requests.post(
        f"{LINKEDIN_API}/ugcPosts",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
        },
        json=payload, timeout=30
    )

    if resp.status_code in (200, 201):
        post_id = resp.headers.get("x-restli-id", "unknown")
        log.info(f"LinkedIn: post pubblicato — ID: {post_id}")
        return {"ok": True, "platform": "linkedin", "post_id": post_id,
                "source": source_file, "chars": len(text)}
    else:
        log.error(f"LinkedIn error {resp.status_code}: {resp.text[:200]}")
        return {"ok": False, "platform": "linkedin",
                "error": f"{resp.status_code}: {resp.text[:100]}"}


def publish_telegram(text: str, source_file: str = "") -> dict:
    """
    Invia un messaggio su Telegram tramite Bot API.
    Supporta markdown (parse_mode=Markdown).
    """
    bot_token = _get_env("TELEGRAM_BOT_TOKEN")
    chat_id   = _get_env("TELEGRAM_CHAT_ID")

    if not bot_token or not chat_id:
        log.error("TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID mancanti nel .env")
        return {"ok": False, "error": "config mancante"}

    # Telegram max 4096 char
    if len(text) > 4096:
        text = text[:4090] + "\n..."

    resp = requests.post(
        TELEGRAM_API.format(token=bot_token),
        json={
            "chat_id":    chat_id,
            "text":       text,
            "parse_mode": "Markdown",
        },
        timeout=15
    )

    data = resp.json()
    if data.get("ok"):
        msg_id = data.get("result", {}).get("message_id", "unknown")
        log.info(f"Telegram: messaggio inviato — ID: {msg_id}")
        return {"ok": True, "platform": "telegram", "message_id": msg_id,
                "source": source_file, "chars": len(text)}
    else:
        log.error(f"Telegram error: {data}")
        return {"ok": False, "platform": "telegram", "error": str(data)}


def _log_distribution(results: list[dict], source_file: str):
    """Aggiorna CONTENT_ENGINE/distribuiti/distribution_log.json."""
    DISTRIBUITI.mkdir(parents=True, exist_ok=True)

    if DIST_LOG.exists():
        with open(DIST_LOG, "r", encoding="utf-8") as f:
            log_data = json.load(f)
    else:
        log_data = {"distributions": []}

    log_data["distributions"].append({
        "timestamp":   datetime.now().isoformat(),
        "source_file": source_file,
        "results":     results,
    })

    with open(DIST_LOG, "w", encoding="utf-8") as f:
        json.dump(log_data, f, indent=2, ensure_ascii=False)


def distribute_file(md_path: Path, channels: list[str]) -> list[dict]:
    """
    Distribuisce il contenuto di un .md sui canali specificati.
    channels: ['linkedin', 'telegram'] o entrambi
    """
    content = md_path.read_text(encoding="utf-8", errors="ignore")
    source  = md_path.name
    results = []

    log.info(f"Distribuzione: {source} → {channels}")

    if "linkedin" in channels:
        text = _extract_linkedin_text(content)
        log.info(f"LinkedIn: {len(text)} char")
        result = publish_linkedin(text, source_file=source)
        results.append(result)

    if "telegram" in channels:
        # Per Telegram usiamo il testo originale pulito (no rimozione MD)
        clean = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
        clean = re.sub(r'<!--.*?-->', '', clean, flags=re.DOTALL)
        clean = clean.strip()[:4000]
        result = publish_telegram(clean, source_file=source)
        results.append(result)

    _log_distribution(results, source)

    ok_count = sum(1 for r in results if r.get("ok"))
    log.info(f"Completato: {ok_count}/{len(results)} canali OK")
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Social Distributor — pubblica su LinkedIn e Telegram")
    parser.add_argument("--file",      type=str, required=True, help="File .md da distribuire")
    parser.add_argument("--linkedin",  action="store_true", help="Pubblica su LinkedIn")
    parser.add_argument("--telegram",  action="store_true", help="Invia su Telegram")
    parser.add_argument("--all",       action="store_true", help="Tutti i canali")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.is_absolute():
        path = CONTENT_ENGINE / "produzione_contenuti" / path

    if not path.exists():
        log.error("File non trovato: %s", path)
        sys.exit(1)

    channels = []
    if args.all or args.linkedin:
        channels.append("linkedin")
    if args.all or args.telegram:
        channels.append("telegram")

    if not channels:
        log.error("Specifica almeno un canale: --linkedin, --telegram, --all")
        sys.exit(1)

    results = distribute_file(path, channels)
    for r in results:
        status = "OK" if r.get("ok") else "FAIL"
        log.info("[%s] %s — %s", status, r.get("platform", "?"),
                 r.get("post_id") or r.get("message_id") or r.get("error", ""))
