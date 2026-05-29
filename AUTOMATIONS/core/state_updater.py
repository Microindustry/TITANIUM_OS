"""
========================================================
TITANIUM_OS — STATE UPDATER (Automation #4)
Modulo    : state_updater.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Input  : event_type (str), file_path (str), timestamp (str)
Output : aggiorna BRAIN/STATE.json con last_update,
         last_action, session_count, pillars status
Chiamato da: watcher.py ad ogni evento rilevante
             + chiamabile manualmente per aggiornamenti manuali
========================================================
"""

import json
import logging
import re
import threading
import urllib.request
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIG BRIDGE n8n
# ============================================================

_BRIDGE_PATH = Path(__file__).resolve().parent.parent / "n8n_bridge.json"

def _load_bridge_config() -> dict:
    """Carica n8n_bridge.json. Ritorna config vuota se non esiste."""
    try:
        with open(_BRIDGE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"enabled": False}


def _notify_n8n(webhook_key: str, payload: dict):
    """
    Invia payload JSON al webhook n8n in un thread separato (non bloccante).
    webhook_key: chiave in n8n_bridge.json > webhooks (es. "milestone_trigger")
    """
    def _fire():
        try:
            cfg = _load_bridge_config()
            if not cfg.get("enabled", False):
                return
            url = cfg.get("webhooks", {}).get(webhook_key)
            if not url:
                return
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                url, data=data,
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=cfg.get("timeout_seconds", 10)):
                pass
            log.info(f"[N8N] Webhook inviato: {webhook_key}")
        except Exception as e:
            log.warning(f"[N8N] Webhook fallito ({webhook_key}): {e}")

    threading.Thread(target=_fire, daemon=True).start()

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
STATE_PATH = ROOT / "BRAIN" / "STATE.json"

# Mappa: se il file modificato contiene questa stringa nel path
# → aggiorna il pillar corrispondente
PILLAR_MAP = {
    "PILLARS/V32":        "V32",
    "PILLARS/MIMS":       "MIMS",
    "PILLARS/GENESIS":    "GENESIS",
    "PILLARS/VITA_NATURA":"VITA_NATURA",
    "PILLARS/IDENTITY":   "IDENTITY",
    "AUTOMATIONS":        "GENESIS",    # lavoro su automazioni = GENESIS
    "BRAIN":              None,          # file cervello: non mappa a pillar
}

# Keyword in file_path che suggeriscono un tipo di attività
ACTIVITY_HINTS = {
    "V32":          "Lavoro su CNC Titanium V32",
    "MIMS":         "Lavoro su MIMS Platform",
    "GENESIS":      "Lavoro su GENESIS Digital",
    "EVA":          "Sviluppo EVA automation",
    "AVA":          "Sviluppo AVA media persona",
    "VITA_NATURA":  "Lavoro su Vita Natura",
    "CLAUDE.md":    "Aggiornamento BRAIN/CLAUDE.md",
    "STATE":        "Aggiornamento STATE",
    "ASSOLUTO":     "Lavoro su documento ASSOLUTO",
    "IDENTITY":     "Lavoro su profilo/CV/LinkedIn",
    "backup":       "Manutenzione sistema",
    "watcher":      "Sviluppo automazioni core",
    "scraper":      "Sviluppo research automations",
}

log = logging.getLogger("state_updater")


# ============================================================
# FUNZIONI
# ============================================================

def _load_state() -> dict:
    """Carica STATE.json. Se non esiste o è corrotto, ritorna struttura base."""
    if STATE_PATH.exists():
        try:
            with open(STATE_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            log.warning(f"STATE.json corrotto, ricreo: {e}")

    # Struttura base se il file non esiste
    return {
        "meta": {"version": "1.0.0"},
        "last_update": datetime.now().isoformat(),
        "active_milestone": "",
        "last_action": "Sistema avviato",
        "next_step": "",
        "session_count": 0,
        "pillars": {
            "V32":        {"status": "in_progress", "pct_complete": 65},
            "MIMS":       {"status": "waiting_press", "pct_complete": 30},
            "GENESIS":    {"status": "building", "pct_complete": 10},
            "VITA_NATURA":{"status": "active", "pct_complete": 40},
            "IDENTITY":   {"status": "pending", "pct_complete": 20},
        },
        "milestones": {"verified": [], "next": "", "target_capannone": "2030-07-15"},
        "focus_today": "",
        "blockers": [],
        "ideas_inbox": 0,
    }


def _save_state(state: dict):
    """Salva STATE.json."""
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    try:
        with open(STATE_PATH, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2, ensure_ascii=False)
    except IOError as e:
        log.error(f"STATE.json write errore: {e}")


def _detect_activity(file_path: str) -> str:
    """
    Analizza il path del file modificato e genera una descrizione
    human-readable dell'attività in corso.
    """
    fp_upper = file_path.upper()

    # Cerca keyword nel path
    for keyword, description in ACTIVITY_HINTS.items():
        if keyword.upper() in fp_upper:
            return f"{description} ({Path(file_path).name})"

    # Default generico
    return f"Modifica a {Path(file_path).name}"


def _detect_pillar(file_path: str) -> str | None:
    """
    Rileva quale pillar è coinvolto dal path del file.
    Ritorna None se non è un pillar specifico.
    """
    for path_fragment, pillar in PILLAR_MAP.items():
        if path_fragment.upper() in file_path.upper():
            return pillar
    return None


def _increment_session_count(state: dict, file_path: str):
    """
    Incrementa session_count quando viene modificato STATE.json
    o quando viene aperto un file di progetto.
    Logica semplice: se il file è CLAUDE.md = nuova sessione.
    """
    if "CLAUDE.md" in file_path or "STATE.json" in file_path:
        state["session_count"] = state.get("session_count", 0) + 1


# ============================================================
# FUNZIONE PRINCIPALE — chiamata da watcher.py
# ============================================================

def update_state_on_change(event_type: str, file_path: str, timestamp: str):
    """
    Aggiorna STATE.json in risposta a un cambio file.

    Args:
        event_type : tipo evento ("MODIFIED", "CREATED", ecc.)
        file_path  : path relativo del file (da ROOT)
        timestamp  : timestamp ISO dell'evento
    """

    # Non aggiornare STATE.json se il file modificato è STATE.json stesso
    # (evita loop)
    if "STATE.json" in file_path:
        return

    state = _load_state()

    # Aggiorna timestamp
    state["last_update"] = timestamp

    # Aggiorna last_action
    activity = _detect_activity(file_path)
    state["last_action"] = activity

    # Controlla se coinvolge un pillar
    pillar = _detect_pillar(file_path)
    if pillar and pillar in state.get("pillars", {}):
        # Aggiorna last_activity del pillar
        state["pillars"][pillar]["last_activity"] = timestamp

    # Incrementa session count se necessario
    _increment_session_count(state, file_path)

    # Salva
    _save_state(state)
    log.debug(f"[STATE] Aggiornato: {activity}")


# ============================================================
# FUNZIONI MANUALI — per aggiornamenti controllati
# ============================================================

def set_milestone(milestone_name: str):
    """
    Imposta manualmente la milestone attiva.
    Uso: set_milestone("Config G — Rinforzi colonne Z+U")
    """
    state = _load_state()
    state["active_milestone"] = milestone_name
    state["last_update"] = datetime.now().isoformat()
    state["last_action"] = f"Milestone impostata: {milestone_name}"
    _save_state(state)
    log.info(f"[STATE] Milestone: {milestone_name}")

    # Notifica n8n → trigger content pipeline
    _notify_n8n("milestone_trigger", {
        "event": "milestone_set",
        "milestone_name": milestone_name,
        "timestamp": state["last_update"],
        "pillars": state.get("pillars", {}),
        "focus_today": state.get("focus_today", ""),
        "next_step": state.get("next_step", ""),
    })


def set_next_step(next_step: str):
    """
    Imposta il prossimo step manualmente.
    Uso: set_next_step("Acquistare bulloni M10 per Config G")
    """
    state = _load_state()
    state["next_step"] = next_step
    state["last_update"] = datetime.now().isoformat()
    _save_state(state)
    log.info(f"[STATE] Next step: {next_step}")


def set_focus_today(focus: str):
    """
    Imposta il focus del giorno.
    Uso: set_focus_today("Saldare gusset colonne Z - 3 ore")
    """
    state = _load_state()
    state["focus_today"] = focus
    state["last_update"] = datetime.now().isoformat()
    _save_state(state)
    log.info(f"[STATE] Focus oggi: {focus}")


def add_blocker(blocker: str):
    """
    Aggiunge un blocker alla lista.
    Uso: add_blocker("Manca mandrino 2.2kW — ordinare")
    """
    state = _load_state()
    blockers = state.get("blockers", [])
    if blocker not in blockers:
        blockers.append(blocker)
        state["blockers"] = blockers
        state["last_update"] = datetime.now().isoformat()
        _save_state(state)
        log.info(f"[STATE] Blocker aggiunto: {blocker}")


def remove_blocker(blocker: str):
    """
    Rimuove un blocker dalla lista.
    Uso: remove_blocker("Manca mandrino 2.2kW — ordinare")
    """
    state = _load_state()
    blockers = state.get("blockers", [])
    if blocker in blockers:
        blockers.remove(blocker)
        state["blockers"] = blockers
        state["last_update"] = datetime.now().isoformat()
        _save_state(state)
        log.info(f"[STATE] Blocker rimosso: {blocker}")


def update_pillar_status(pillar: str, status: str, pct: int = None,
                          phase: str = None, next_action: str = None):
    """
    Aggiorna lo stato di un pillar.
    Uso: update_pillar_status("V32", "in_progress", pct=70,
                               phase="Config G in esecuzione")
    """
    state = _load_state()
    pillars = state.get("pillars", {})

    if pillar not in pillars:
        pillars[pillar] = {}

    pillars[pillar]["status"] = status
    if pct is not None:
        pillars[pillar]["pct_complete"] = pct
    if phase:
        pillars[pillar]["phase"] = phase
    if next_action:
        pillars[pillar]["next"] = next_action

    state["pillars"] = pillars
    state["last_update"] = datetime.now().isoformat()
    _save_state(state)
    log.info(f"[STATE] Pillar {pillar}: {status} ({pct}%)")


def mark_milestone_done(milestone_id: int, name: str):
    """
    Segna una milestone come completata.
    Aggiorna la lista verified in STATE.json
    """
    state = _load_state()
    milestones = state.get("milestones", {})
    verified = milestones.get("verified", [])

    entry = f"#{milestone_id} {name} — {datetime.now().strftime('%Y-%m-%d')}"
    if entry not in verified:
        verified.append(entry)
        milestones["verified"] = verified
        state["milestones"] = milestones
        state["last_update"] = datetime.now().isoformat()
        state["last_action"] = f"✅ MILESTONE COMPLETATA: {name}"
        _save_state(state)
        log.info(f"[STATE] Milestone completata: {name}")

        # Notifica n8n → trigger content pipeline
        _notify_n8n("milestone_trigger", {
            "event": "milestone_completed",
            "milestone_id": milestone_id,
            "milestone_name": name,
            "timestamp": state["last_update"],
            "pillars": state.get("pillars", {}),
            "verified_count": len(verified),
            "focus_today": state.get("focus_today", ""),
            "next_step": state.get("next_step", ""),
        })


def get_state_summary() -> str:
    """
    Ritorna un summary testuale dello stato attuale.
    Usato da session_orienter.py per il brief di apertura sessione.
    """
    state = _load_state()

    lines = [
        "═══════════════════════════════════════",
        "  TITANIUM_OS — STATO SISTEMA",
        "═══════════════════════════════════════",
        f"  Ultimo aggiornamento : {state.get('last_update', 'N/A')[:16]}",
        f"  Ultima azione        : {state.get('last_action', 'N/A')}",
        f"  Milestone attiva     : {state.get('active_milestone', 'N/A')}",
        f"  Prossimo step        : {state.get('next_step', 'N/A')}",
        f"  Focus oggi           : {state.get('focus_today', '—')}",
        f"  Sessioni totali      : {state.get('session_count', 0)}",
        "",
        "  PILASTRI:",
    ]

    for pillar, data in state.get("pillars", {}).items():
        pct = data.get("pct_complete", 0)
        status = data.get("status", "?")
        bar = "█" * (pct // 10) + "░" * (10 - pct // 10)
        lines.append(f"  {pillar:<15} [{bar}] {pct:3}% — {status}")

    blockers = state.get("blockers", [])
    if blockers:
        lines.append("")
        lines.append("  🔴 BLOCKERS:")
        for b in blockers:
            lines.append(f"    • {b}")

    lines.append("═══════════════════════════════════════")
    return "\n".join(lines)


# ============================================================
# TEST STANDALONE
# ============================================================
if __name__ == "__main__":
    # Test aggiornamento automatico
    update_state_on_change("MODIFIED", "PILLARS/V32/config_g.md",
                           datetime.now().isoformat())

    # Test aggiornamenti manuali
    set_milestone("Config G — Rinforzi colonne Z+U")
    set_next_step("Saldare i 4 gusset 200mm sulla colonna Z sinistra")
    set_focus_today("Config G: gusset sinistra — stima 3 ore")

    # Stampa summary
    log.info(get_state_summary())
