"""
========================================================
TITANIUM_OS — AUTOMATION WATCHDOG (#14)
Modulo    : watchdog.py
Parte di  : CORE/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Monitora i processi critici di TITANIUM_OS.
Se uno crasha, lo riavvia automaticamente.
Log in DATA/logs/watchdog.log
Avvio: pythonw CORE/watchdog.py (silenzioso)
       oppure aggiunto in START_ECOSYSTEM.bat
========================================================
"""

import sys
import os
import time
import logging
import subprocess
from pathlib import Path
from datetime import datetime

# ── CONFIGURAZIONE ────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent

LOG_PATH = ROOT / "DATA" / "logs" / "watchdog.log"
LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

# Intervallo di controllo in secondi
CHECK_INTERVAL = 30

# Processi da monitorare: nome → comando di riavvio
PROCESSES = {
    "watcher": {
        "match": "AUTOMATIONS/core/watcher.py",  # stringa nel commandline
        "cmd": [sys.executable, str(ROOT / "AUTOMATIONS" / "core" / "watcher.py")],
        "use_pythonw": True,  # avvia senza finestra
    },
    "mente_watcher": {
        "match": "NODES/MENTE_WATCHER/mente_watcher.py",
        "cmd": [sys.executable, str(ROOT / "NODES" / "MENTE_WATCHER" / "mente_watcher.py")],
        "use_pythonw": True,
    },
    "api_server": {
        "match": "api_server.py",
        "cmd": [sys.executable, str(ROOT / "api_server.py")],
        "use_pythonw": False,  # flask ha bisogno di stdout
    },
}

# ── LOGGING ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [WATCHDOG] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("watchdog")


# ── HELPERS ──────────────────────────────────────────────────

def _is_running(match: str) -> bool:
    """Controlla se un processo con 'match' nel commandline è attivo."""
    try:
        result = subprocess.run(
            ["wmic", "process", "get", "commandline"],
            capture_output=True, text=True, timeout=10
        )
        # Normalizza separatori per confronto cross-platform
        match_norm = match.replace("/", "\\").lower()
        for line in result.stdout.splitlines():
            if match_norm in line.lower():
                return True
        return False
    except Exception as e:
        log.error(f"Errore check processo '{match}': {e}")
        return True  # assume attivo per evitare riavvii falsi


def _restart(name: str, config: dict):
    """Riavvia un processo crashato."""
    log.warning(f"CRASH RILEVATO: {name} — riavvio in corso...")
    try:
        cmd = config["cmd"]
        if config.get("use_pythonw"):
            # Sostituisce python con pythonw (avvio silenzioso)
            pythonw = Path(sys.executable).parent / "pythonw.exe"
            if pythonw.exists():
                cmd = [str(pythonw)] + cmd[1:]

        subprocess.Popen(
            cmd,
            cwd=str(ROOT),
            creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP
        )
        log.info(f"RIAVVIATO: {name}")
    except Exception as e:
        log.error(f"ERRORE riavvio {name}: {e}")


# ── MAIN LOOP ─────────────────────────────────────────────────

def main():
    log.info("=" * 50)
    log.info("TITANIUM_OS WATCHDOG — Avvio")
    log.info(f"Controllo ogni {CHECK_INTERVAL}s — {len(PROCESSES)} processi monitorati")
    log.info("=" * 50)

    restart_counts = {name: 0 for name in PROCESSES}

    while True:
        for name, config in PROCESSES.items():
            if not _is_running(config["match"]):
                restart_counts[name] += 1
                _restart(name, config)
                # Attendi 5s dopo riavvio prima del prossimo check
                time.sleep(5)
            # else: processo attivo, nessuna azione

        # Log stato ogni 10 cicli (ogni ~5 minuti)
        cycle_log = " | ".join(
            f"{n}: {restart_counts[n]} restart" for n in PROCESSES
        )
        log.info(f"CHECK OK — {cycle_log}")

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()
