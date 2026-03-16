"""
========================================================
TITANIUM_OS — AUTOMATION WATCH-DOG (#14)
Modulo    : automation_watchdog.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Monitora che le automazioni critiche girino.
            Se un processo è crashato, lo riavvia.
Input     : nessuno — gira come processo standalone
Output    : log in DATA/logs/watchdog.log
            report in DATA/watchdog_status.json
Avvio     : python automation_watchdog.py
            oppure come task schedulato Windows
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

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent

LOG_PATH    = ROOT / "DATA" / "logs" / "watchdog.log"
STATUS_PATH = ROOT / "DATA" / "watchdog_status.json"

# Intervallo di controllo in secondi
CHECK_INTERVAL = 60

# Automazioni con processo persistente da monitorare
# Formato: nome → comando di avvio se non gira
MONITORED_PROCESSES = {
    "watcher.py": {
        "cmd": [sys.executable, str(ROOT / "AUTOMATIONS" / "core" / "watcher.py")],
        "critical": True,   # True = riavvia automaticamente se assente
        "match": "watcher.py",  # stringa da cercare nella lista processi
    },
    "api_server.py": {
        "cmd": [sys.executable, str(ROOT / "api_server.py")],
        "critical": False,  # False = logga solo, non riavvia
        "match": "api_server.py",
    },
}

# ============================================================
# LOGGING SETUP
# ============================================================

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

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


# ============================================================
# FUNZIONI
# ============================================================

def _get_running_process_cmdlines() -> list[str]:
    """Restituisce la lista di cmdline dei processi Python attivi."""
    try:
        import psutil
        cmdlines = []
        for proc in psutil.process_iter(["cmdline"]):
            try:
                cl = proc.info.get("cmdline") or []
                cmdlines.append(" ".join(cl))
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue
        return cmdlines
    except ImportError:
        log.error("psutil non installato. Esegui: pip install psutil")
        return []


def _is_running(match_str: str, cmdlines: list[str]) -> bool:
    """True se almeno un processo contiene match_str nella sua cmdline."""
    return any(match_str in cl for cl in cmdlines)


def _restart_process(name: str, cmd: list[str]):
    """Avvia il processo in background (senza finestra su Windows)."""
    try:
        # DETACHED_PROCESS = 0x00000008 — non eredita il terminale su Windows
        flags = 0
        if sys.platform == "win32":
            flags = subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP

        subprocess.Popen(
            cmd,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            creationflags=flags,
        )
        log.warning(f"[RESTART] {name} riavviato.")
    except Exception as e:
        log.error(f"[RESTART FAIL] {name}: {e}")


def _write_status(results: dict):
    """Scrive lo stato corrente in watchdog_status.json."""
    STATUS_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = {
        "timestamp": datetime.now().isoformat(),
        "processi": results,
    }
    try:
        with open(STATUS_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except IOError as e:
        log.error(f"Status write error: {e}")


def check_and_heal():
    """
    Ciclo principale: verifica ogni processo monitorato.
    Se critico e assente → riavvia.
    """
    cmdlines = _get_running_process_cmdlines()
    if not cmdlines:
        return  # psutil non disponibile, skip

    results = {}

    for name, cfg in MONITORED_PROCESSES.items():
        running = _is_running(cfg["match"], cmdlines)
        status = "OK" if running else "DOWN"
        results[name] = {"status": status, "critical": cfg["critical"]}

        if not running:
            if cfg["critical"]:
                log.warning(f"[DOWN] {name} non in esecuzione. Riavvio...")
                _restart_process(name, cfg["cmd"])
                results[name]["status"] = "RESTARTED"
            else:
                log.warning(f"[DOWN] {name} non in esecuzione (non critico — solo log).")

    _write_status(results)

    # Riepilogo rapido
    stati = [f"{k}:{v['status']}" for k, v in results.items()]
    log.info("Status: " + " | ".join(stati))


# ============================================================
# MAIN
# ============================================================

def main():
    log.info("=" * 50)
    log.info("TITANIUM_OS AUTOMATION WATCH-DOG — Avvio")
    log.info(f"Monitorati: {list(MONITORED_PROCESSES.keys())}")
    log.info(f"Intervallo check: {CHECK_INTERVAL}s")
    log.info("=" * 50)

    while True:
        try:
            check_and_heal()
        except Exception as e:
            log.error(f"Errore ciclo watchdog: {e}")

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()
