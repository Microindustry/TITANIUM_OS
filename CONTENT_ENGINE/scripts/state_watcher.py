"""
========================================================
CONTENT ENGINE — STATE WATCHER
Modulo    : state_watcher.py
Parte di  : CONTENT_ENGINE/scripts/
Versione  : 1.0.0
Data      : 2026-03-18
========================================================
Funzione  : Osserva STATE.json in background.
            Quando cambia milestones.verified,
            chiama milestone_to_episode.py per auto-generare
            nuovi episodi podcast senza intervento manuale.
Avvio     : python state_watcher.py
            (avviare con START_TITANIUM_OS.bat o in background)
========================================================
"""

import os
import sys
import json
import time
import logging
import subprocess
from pathlib import Path
from datetime import datetime

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print("watchdog non trovato. Esegui: pip install watchdog")
    sys.exit(1)

# ── Paths ──────────────────────────────────────────────────────────────────
SCRIPTS_DIR    = Path(__file__).resolve().parent
_tos_env = os.environ.get("TITANIUM_OS_ROOT")
_ce = SCRIPTS_DIR.parent.parent  # scripts/../.. = TITANIUM_OS root
if _tos_env:
    TITANIUM_OS = Path(_tos_env)
elif (_ce / "BRAIN").exists():
    TITANIUM_OS = _ce
else:
    TITANIUM_OS = Path.home() / "TITANIUM_OS" / "TITANIUM_OS"
STATE_JSON     = TITANIUM_OS / "BRAIN" / "STATE.json"
GENERATOR      = SCRIPTS_DIR / "milestone_to_episode.py"
LOG_PATH       = SCRIPTS_DIR / "logs" / "state_watcher.log"

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [STATE_WATCHER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("state_watcher")

# ── Stato interno ──────────────────────────────────────────────────────────
_last_milestones: list = []
_last_trigger: float = 0.0
DEBOUNCE_SECONDS = 10.0  # evita trigger multipli su salvataggi rapidi


def _read_milestones() -> list:
    try:
        state = json.loads(STATE_JSON.read_text(encoding="utf-8"))
        return state.get("milestones", {}).get("verified", [])
    except Exception as e:
        log.warning(f"Errore lettura STATE.json: {e}")
        return []


def _run_generator():
    """Avvia milestone_to_episode.py come sottoprocesso."""
    log.info("Avvio milestone_to_episode.py...")
    try:
        result = subprocess.run(
            [sys.executable, str(GENERATOR)],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode == 0:
            log.info("Generazione completata.")
            if result.stdout:
                log.info(result.stdout[-500:])
        else:
            log.error(f"Errore generator (exit {result.returncode}):")
            log.error(result.stderr[-500:])
    except subprocess.TimeoutExpired:
        log.error("Timeout dopo 120s — generator bloccato?")
    except Exception as e:
        log.error(f"Errore avvio generator: {e}")


class StateChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        global _last_milestones, _last_trigger

        if not event.src_path.endswith("STATE.json"):
            return

        now = time.time()
        if now - _last_trigger < DEBOUNCE_SECONDS:
            return  # debounce
        _last_trigger = now

        current = _read_milestones()

        # Confronta con snapshot precedente
        new_items = [m for m in current if m not in _last_milestones]
        if new_items:
            log.info(f"Nuovi milestone rilevati ({len(new_items)}):")
            for m in new_items:
                log.info(f"  + {m[:70]}")
            _last_milestones = current
            _run_generator()
        else:
            # Aggiorna snapshot anche se nessun nuovo milestone
            _last_milestones = current


# ── Main ───────────────────────────────────────────────────────────────────
def main():
    global _last_milestones

    if not STATE_JSON.exists():
        log.error(f"STATE.json non trovato: {STATE_JSON}")
        sys.exit(1)

    # Snapshot iniziale
    _last_milestones = _read_milestones()
    log.info(f"STATE_WATCHER avviato. {len(_last_milestones)} milestone esistenti.")
    log.info(f"Osservando: {STATE_JSON}")

    event_handler = StateChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, str(STATE_JSON.parent), recursive=False)
    observer.start()

    log.info("In ascolto... (Ctrl+C per fermare)")
    try:
        while True:
            time.sleep(5)
    except KeyboardInterrupt:
        log.info("Stop richiesto.")
        observer.stop()

    observer.join()
    log.info("STATE_WATCHER terminato.")


if __name__ == "__main__":
    main()
