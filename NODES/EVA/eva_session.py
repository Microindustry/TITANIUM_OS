# eva_session.py | TITANIUM_OS / NODES / EVA | v0.1 | 2026-06-05
# Stato conversazione per la prenotazione multi-turno di EVA.
#
# Principio di sicurezza: EVA NON conferma slot da sola (un centro estetico non puo'
# rischiare doppie prenotazioni). Raccoglie i dati su piu' messaggi e poi consegna un
# riepilogo all'operatore (handoff). L'aggancio reale all'agenda e' uno step successivo.
#
# Stato in memoria per processo (dict per mittente) con TTL. Per il pilot e' sufficiente;
# in produzione si potra' spostare in Redis/SQLite mantenendo la stessa interfaccia.

import re
import time
from datetime import datetime

# Stati del flusso di prenotazione
IDLE        = "idle"
ASK_SERVICE = "ask_service"
ASK_DAY     = "ask_day"
ASK_TIME    = "ask_time"
ASK_NAME    = "ask_name"
DONE        = "done"

TTL_SECONDS = 30 * 60  # una sessione inattiva scade dopo 30 min

_SESSIONS: dict[str, dict] = {}

# ── Gestione sessioni ─────────────────────────────────────────────────────────

def get_session(sender: str) -> dict:
    now = time.time()
    s = _SESSIONS.get(sender)
    if s and (now - s["updated"]) > TTL_SECONDS:
        s = None  # scaduta
    if not s:
        s = {"state": IDLE, "slots": {}, "updated": now}
        _SESSIONS[sender] = s
    s["updated"] = now
    return s

def reset_session(sender: str):
    _SESSIONS.pop(sender, None)

def active(sender: str) -> bool:
    s = _SESSIONS.get(sender)
    return bool(s and s["state"] not in (IDLE, DONE))

# ── Parsing slot (giorno / fascia oraria) ─────────────────────────────────────

_GIORNI = r"(lunedi|martedi|mercoledi|giovedi|venerdi|sabato|domenica|oggi|domani|dopodomani)"
_DATE   = r"\b(\d{1,2}[/\-]\d{1,2}(?:[/\-]\d{2,4})?)\b"

def parse_day(text: str) -> str | None:
    t = text.lower()
    m = re.search(_GIORNI, t)
    if m:
        return m.group(1)
    m = re.search(_DATE, t)
    if m:
        return m.group(1)
    return None

def parse_time(text: str) -> str | None:
    t = text.lower()
    m = re.search(r"\b([01]?\d|2[0-3])[:.]([0-5]\d)\b", t)   # 14:30 / 9.00
    if m:
        return f"{int(m.group(1)):02d}:{m.group(2)}"
    m = re.search(r"\b(alle\s*)?([01]?\d|2[0-3])\b", t)       # "alle 15"
    if m and ("alle" in t or "ora" in t or re.search(r"\b\d{1,2}\b", t)):
        return f"{int(m.group(2)):02d}:00"
    if "mattina" in t or "mattino" in t:
        return "mattina"
    if "pomeriggio" in t:
        return "pomeriggio"
    if "sera" in t:
        return "sera"
    return None

# ── Flusso di prenotazione ────────────────────────────────────────────────────

def start_booking(sender: str, service: dict | None) -> dict:
    """Avvia/aggiorna una prenotazione. service: dict del listino o None."""
    s = get_session(sender)
    s["state"] = ASK_SERVICE
    s["slots"] = {}
    if service:
        s["slots"]["service"] = service["name"]
        s["slots"]["duration"] = service.get("duration", "")
        s["state"] = ASK_DAY
    return s

def advance(sender: str, text: str, match_service_fn) -> dict:
    """Fa avanzare il flusso con il messaggio corrente.
    Ritorna {reply, handoff, done}. match_service_fn(text)->dict|None dal brain."""
    s = get_session(sender)
    slots = s["slots"]

    # In qualsiasi punto, prova a riempire slot deducibili dal testo
    if "service" not in slots:
        svc = match_service_fn(text)
        if svc:
            slots["service"] = svc["name"]
            slots["duration"] = svc.get("duration", "")
    if "day" not in slots:
        d = parse_day(text)
        if d:
            slots["day"] = d
    if "time" not in slots:
        tm = parse_time(text)
        if tm:
            slots["time"] = tm

    # Determina il prossimo slot mancante e chiedi
    if "service" not in slots:
        s["state"] = ASK_SERVICE
        return _r("Per quale trattamento vuoi prenotare?")
    if "day" not in slots:
        s["state"] = ASK_DAY
        return _r(f"Perfetto, {slots['service']}. Per che giorno?")
    if "time" not in slots:
        s["state"] = ASK_TIME
        return _r("A che ora preferisci? (anche solo mattina o pomeriggio va bene)")
    if "name" not in slots:
        # Se siamo gia' a chiedere il nome, questo messaggio E' il nome
        if s["state"] == ASK_NAME:
            slots["name"] = text.strip()[:60]
        else:
            s["state"] = ASK_NAME
            return _r("A che nome metto la richiesta?")

    # Tutti gli slot pieni -> riepilogo e handoff
    s["state"] = DONE
    riepilogo = (
        f"Richiesta registrata:\n"
        f"- Trattamento: {slots.get('service')}"
        + (f" ({slots.get('duration')})" if slots.get('duration') else "") + "\n"
        f"- Giorno: {slots.get('day')}\n"
        f"- Ora: {slots.get('time')}\n"
        f"- Nome: {slots.get('name')}\n"
        "Una persona del centro ti confermera' la disponibilita' a breve. \U0001F33F"
    )
    return {"reply": riepilogo, "handoff": True, "done": True, "slots": dict(slots)}

def _r(reply: str) -> dict:
    return {"reply": reply, "handoff": False, "done": False}
