# eva_brain.py | TITANIUM_OS / NODES / EVA | v0.1 | 2026-06-05
# Cervello di EVA: classifica l'intento di un messaggio in arrivo e compone la
# risposta. Rule-based + slot-filling minimale per le prenotazioni di Vita Natura.
#
# Progettato per girare ANCHE senza alcuna API (dry-run): in input una stringa,
# in output un dict {intent, reply, handoff}. La NLU "vera" (Claude / LLM locale)
# si potra' agganciare in seguito sostituendo classify_intent().
#
# Uso CLI (test offline):
#   python eva_brain.py "vorrei prenotare una pulizia viso giovedi"
#   python eva_brain.py --repl

import os
import re
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

NODE_DIR = Path(__file__).resolve().parent

# ── Config ────────────────────────────────────────────────────────────────────

def load_config() -> dict:
    """Carica config.json se presente, altrimenti config.example.json (default)."""
    for name in ("config.json", "config.example.json"):
        p = NODE_DIR / name
        if p.exists():
            return json.loads(p.read_text(encoding="utf-8"))
    return {}

CFG = load_config()
BIZ = CFG.get("business", {})
SERVICES = CFG.get("services", [])
REPLIES = CFG.get("replies", {})

# ── Intent classification (rule-based, sostituibile) ──────────────────────────

INTENT_PATTERNS = {
    "saluto":       r"\b(ciao|salve|buongiorno|buonasera|hey|ehi)\b",
    "prenotazione": r"\b(prenot|appuntament|fissare|disponibilit|posto|prenotarmi)\w*",
    "orari":        r"\b(orari|apert|chius|quando siete|a che ora)\w*",
    "servizi":      r"\b(servizi|trattament|che cosa fate|listino|cosa offrite)\w*",
    "prezzo":       r"\b(prezz|costo|quanto costa|tariffa|listino prezzi)\w*",
    "annulla":      r"\b(annull|disdic|cancell|spostare|rimandare)\w*",
    "ringraziamento": r"\b(grazie|gentilissim|perfetto grazie)\b",
}

# Estrae un servizio citato confrontando le keyword del listino
def match_service(text: str) -> dict | None:
    t = text.lower()
    for svc in SERVICES:
        for kw in svc.get("keywords", []):
            if kw.lower() in t:
                return svc
    return None

def classify_intent(text: str) -> str:
    t = text.lower()
    # priorita': annulla > prenotazione > prezzo > servizi > orari > saluto
    order = ["annulla", "prenotazione", "prezzo", "servizi", "orari", "saluto", "ringraziamento"]
    for intent in order:
        if re.search(INTENT_PATTERNS[intent], t):
            return intent
    return "fallback"

# ── Composizione risposta ─────────────────────────────────────────────────────

def _fmt(template: str, **kw) -> str:
    try:
        return template.format(**kw)
    except (KeyError, IndexError):
        return template

def compose_reply(text: str, intent: str) -> dict:
    """Ritorna {reply, handoff}. handoff=True => passare a operatore umano."""
    nome_biz = BIZ.get("name", "il centro")
    svc = match_service(text)

    if intent == "saluto":
        return {"reply": REPLIES.get("saluto",
                f"Ciao! Sono EVA, l'assistente di {nome_biz}. Come posso aiutarti? "
                "Posso dirti orari, servizi o aiutarti a prenotare."), "handoff": False}

    if intent == "orari":
        return {"reply": REPLIES.get("orari",
                f"Gli orari di {nome_biz}: {BIZ.get('hours', 'mar-sab 9:00-19:00')}."),
                "handoff": False}

    if intent == "servizi":
        elenco = ", ".join(s["name"] for s in SERVICES) or "diversi trattamenti viso e corpo"
        return {"reply": f"Offriamo: {elenco}. Vuoi info su uno in particolare o prenotare?",
                "handoff": False}

    if intent == "prezzo":
        if svc:
            return {"reply": f"{svc['name']}: {svc.get('price', 'da concordare')} "
                    f"({svc.get('duration', '—')}). Vuoi prenotare?", "handoff": False}
        return {"reply": "Dimmi quale trattamento ti interessa e ti dico prezzo e durata.",
                "handoff": False}

    if intent == "prenotazione":
        if svc:
            return {"reply": f"Perfetto, {svc['name']} ({svc.get('duration', '—')}). "
                    "Per che giorno e fascia oraria preferisci? Ti confermo la disponibilita'.",
                    "handoff": True}  # handoff: la conferma reale passa all'agenda/umano
        return {"reply": "Volentieri! Quale trattamento vuoi prenotare e per quando?",
                "handoff": False}

    if intent == "annulla":
        return {"reply": "Va bene, mi occupo io di spostare o annullare. "
                "Puoi dirmi giorno e ora dell'appuntamento?", "handoff": True}

    if intent == "ringraziamento":
        return {"reply": "A te! Se ti serve altro sono qui. \U0001F33F", "handoff": False}

    # fallback
    return {"reply": REPLIES.get("fallback",
            "Non sono sicura di aver capito. Posso aiutarti con orari, servizi o "
            "una prenotazione — oppure ti passo subito una persona del centro."),
            "handoff": True}

# ── API pubblica del cervello ─────────────────────────────────────────────────

def handle_message(text: str, sender: str | None = None) -> dict:
    """Punto d'ingresso unico: testo -> {intent, reply, handoff, ts, sender}."""
    text = (text or "").strip()
    intent = classify_intent(text)
    out = compose_reply(text, intent)
    return {
        "ts": datetime.now().isoformat(timespec="seconds"),
        "sender": sender,
        "intent": intent,
        "reply": out["reply"],
        "handoff": out["handoff"],
    }

# ── CLI ───────────────────────────────────────────────────────────────────────

def _print(res: dict):
    flag = "  [->operatore]" if res["handoff"] else ""
    print(f"[{res['intent']}]{flag}\nEVA> {res['reply']}\n")

def main():
    ap = argparse.ArgumentParser(description="EVA brain — test offline")
    ap.add_argument("text", nargs="*", help="Messaggio da classificare")
    ap.add_argument("--repl", action="store_true", help="Modalita' interattiva")
    args = ap.parse_args()

    if args.repl:
        print("EVA dry-run REPL. Scrivi un messaggio (Ctrl+C per uscire).\n")
        try:
            while True:
                msg = input("cliente> ").strip()
                if msg:
                    _print(handle_message(msg, sender="repl"))
        except (KeyboardInterrupt, EOFError):
            print("\nciao!")
            return
    if args.text:
        _print(handle_message(" ".join(args.text), sender="cli"))
    else:
        ap.print_help()

if __name__ == "__main__":
    main()
