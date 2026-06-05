# eva_session.py | TITANIUM_OS / NODES / EVA | v0.2 | 2026-06-05
# Stato conversazione per la prenotazione multi-turno di EVA.
#
# Principio di sicurezza: EVA NON conferma slot da sola (un centro estetico non puo'
# rischiare doppie prenotazioni). Raccoglie i dati su piu' messaggi e poi consegna un
# riepilogo all'operatore (handoff). L'aggancio reale all'agenda e' uno step successivo.
#
# Stato per mittente (dict) con TTL, persistito su DATA/eva/sessions.json: sopravvive a
# un restart del processo. Per il pilot e' sufficiente; in produzione si potra' spostare
# in Redis/SQLite mantenendo la stessa interfaccia.

import os
import re
import json
import time
import tempfile
from pathlib import Path
from datetime import datetime

# Stati del flusso di prenotazione
IDLE        = "idle"
ASK_SERVICE = "ask_service"
ASK_DAY     = "ask_day"
ASK_TIME    = "ask_time"
ASK_NAME    = "ask_name"
DONE        = "done"

TTL_SECONDS = 30 * 60  # una sessione inattiva scade dopo 30 min

# ── Persistenza su disco ───────────────────────────────────────────────────────
# Le sessioni sopravvivono a un restart del webhook (Task Scheduler/watchdog/crash):
# una prenotazione a meta' non si perde lasciando il cliente appeso. Stesso DATA/eva
# di eva_inbox (gitignored, PII), override via EVA_DATA_DIR.

NODE_DIR = Path(__file__).resolve().parent
ROOT = NODE_DIR.parents[1]  # .../TITANIUM_OS

def _sessions_path() -> Path:
    d = os.environ.get("EVA_DATA_DIR", "").strip()
    base = Path(d) if d else (ROOT / "DATA" / "eva")
    base.mkdir(parents=True, exist_ok=True)
    return base / "sessions.json"

def _prune(d: dict, now: float) -> dict:
    return {k: v for k, v in d.items()
            if isinstance(v, dict) and (now - v.get("updated", 0)) <= TTL_SECONDS}

def _load() -> dict:
    p = _sessions_path()
    if not p.exists():
        return {}
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        return _prune(data, time.time()) if isinstance(data, dict) else {}
    except (OSError, json.JSONDecodeError):
        return {}  # file corrotto/illeggibile: si riparte pulito, non si blocca EVA

def _save():
    """Scrive le sessioni in modo atomico (temp + replace) per non lasciare file
    parziali se il processo muore a meta' scrittura."""
    p = _sessions_path()
    try:
        fd, tmp = tempfile.mkstemp(dir=str(p.parent), suffix=".tmp")
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(_SESSIONS, fh, ensure_ascii=False)
        os.replace(tmp, p)
    except OSError:
        pass

_SESSIONS: dict[str, dict] = _load()

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
    _save()

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
    _save()
    return s

def advance(sender: str, text: str, match_service_fn) -> dict:
    """Fa avanzare il flusso e persiste lo stato (qualunque sia il ramo d'uscita)."""
    res = _advance(sender, text, match_service_fn)
    _save()
    return res

def _advance(sender: str, text: str, match_service_fn) -> dict:
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
