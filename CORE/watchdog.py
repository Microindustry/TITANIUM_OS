"""
========================================================
TITANIUM_OS — AUTOMATION WATCHDOG (#14)
Modulo    : watchdog.py
Parte di  : CORE/
Versione  : 1.3.0
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
import psutil

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
        match_norm = match.replace("/", "\\").lower()
        for proc in psutil.process_iter(["cmdline"]):
            try:
                cmdline = " ".join(proc.info["cmdline"] or []).replace("/", "\\").lower()
                if match_norm in cmdline:
                    return True
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue
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
        creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.CREATE_NO_WINDOW,
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
            creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.CREATE_NO_WINDOW
        )
        log.info(f"RIAVVIATO: {name}")
    except Exception as e:
        log.error(f"ERRORE riavvio {name}: {e}")


# ── MAIN LOOP (swarm parallelo) ───────────────────────────────

import threading

def _check_one(name: str, config: dict, restart_counts: dict, lock: threading.Lock):
    """Controlla un singolo processo in un thread dedicato."""
    if not _is_running(config["match"]):
        with lock:
            restart_counts[name] += 1
        _restart(name, config)
        time.sleep(5)


def main():
    log.info("=" * 50)
    log.info("TITANIUM_OS WATCHDOG — Avvio (swarm parallelo)")
    log.info(f"Controllo ogni {CHECK_INTERVAL}s — {len(PROCESSES)} processi in parallelo")
    log.info("=" * 50)

    restart_counts = {name: 0 for name in PROCESSES}
    lock = threading.Lock()

    while True:
        threads = [
            threading.Thread(
                target=_check_one,
                args=(name, config, restart_counts, lock),
                daemon=True,
            )
            for name, config in PROCESSES.items()
        ]
        for t in threads:
            t.start()
        for t in threads:
            t.join(timeout=20)

        with lock:
            cycle_log = " | ".join(f"{n}: {restart_counts[n]}r" for n in PROCESSES)
        log.info(f"CHECK OK — {cycle_log}")

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()
