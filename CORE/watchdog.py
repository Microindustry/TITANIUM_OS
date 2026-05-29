"""
========================================================
TITANIUM_OS — AUTOMATION WATCHDOG (#14)
Modulo    : watchdog.py
Parte di  : CORE/
Versione  : 1.2.0
Data      : 2026-05-29
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
import subprocess
from pathlib import Path

# ── CONFIGURAZIONE ────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

try:
    from CORE.log import get_logger
    log = get_logger("watchdog")
except ImportError:
    import logging
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [WATCHDOG] %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
    log = logging.getLogger("watchdog")

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
    "dashboard": {
        "match": "vite",
        "cmd": None,  # avviato via npm — usa _restart_dashboard
        "use_pythonw": False,
    },
}

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


def _restart_dashboard():
    """Riavvia la dashboard Vite via npm run dev."""
    node_dir = Path(os.environ.get("USERPROFILE", str(Path.home()))) / "tools" / "nodejs"
    npm = node_dir / "npm.cmd"
    dash_dir = ROOT / "DASHBOARD"
    subprocess.Popen(
        [str(npm), "run", "dev", "--silent"],
        cwd=str(dash_dir),
        creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP,
    )
    log.info("RIAVVIATA: dashboard (Vite :5173)")


def _restart(name: str, config: dict):
    """Riavvia un processo crashato."""
    log.warning(f"CRASH RILEVATO: {name} — riavvio in corso...")
    if name == "dashboard":
        _restart_dashboard()
        return
    try:
        cmd = config["cmd"]
        if config.get("use_pythonw"):
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
