# watchdog.py | TITANIUM_OS / SERVICES | v1.0 | 2026-05-27
# Mantiene API server + MENTE_WATCHER vivi — li riavvia se cadono
# Avvio: Task Scheduler al login, o python SERVICES/watchdog.py
# Scrive: DATA/watchdog_status.json ogni 60s

import os
import sys
import json
import time
import signal
import logging
import subprocess
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ── CONFIG ────────────────────────────────────────────────────
REPO_ROOT   = Path(__file__).resolve().parents[1]
PYTHON      = sys.executable
LOG_DIR     = REPO_ROOT / "DATA" / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)
STATUS_FILE = REPO_ROOT / "DATA" / "watchdog_status.json"
CHECK_S     = 30    # controlla ogni 30 secondi
WRITE_S     = 60    # scrive status ogni 60 secondi

# pythonw.exe non ha stdout/stderr (None) -> aggiungi lo StreamHandler solo se presente
_handlers = [logging.FileHandler(LOG_DIR / "watchdog.log", encoding="utf-8")]
if sys.stdout is not None:
    _handlers.append(logging.StreamHandler(sys.stdout))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [WATCHDOG] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=_handlers,
)
log = logging.getLogger("watchdog")

# ── SERVIZI DA GESTIRE ────────────────────────────────────────
SERVICES = {
    "api_server": {
        "script":  REPO_ROOT / "api_server.py",
        "check":   lambda: _http_ok("http://localhost:5001/api/health"),
        "label":   "API Server (5001)",
    },
    "mente_watcher": {
        "script":  REPO_ROOT / "NODES" / "MENTE_WATCHER" / "mente_watcher.py",
        "check":   lambda: _proc_running("mente_watcher"),
        "label":   "MENTE Watcher",
    },
}

_procs: dict[str, subprocess.Popen] = {}

# ── HELPERS ──────────────────────────────────────────────────

def _http_ok(url: str, timeout: int = 3) -> bool:
    import urllib.request, urllib.error
    try:
        with urllib.request.urlopen(url, timeout=timeout):
            return True
    except Exception:
        return False

def _proc_running(name: str) -> bool:
    p = _procs.get(name)
    return p is not None and p.poll() is None

def _start(name: str) -> bool:
    cfg = SERVICES[name]
    script = cfg["script"]
    if not script.exists():
        log.error(f"{name}: script non trovato — {script}")
        return False
    try:
        env = {**os.environ, "PYTHONPATH": str(REPO_ROOT)}
        p = subprocess.Popen(
            [PYTHON, str(script)],
            cwd=str(REPO_ROOT),
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        _procs[name] = p
        log.info(f"{cfg['label']} avviato — PID {p.pid}")
        return True
    except Exception as e:
        log.error(f"{name}: errore avvio — {e}")
        return False

def _write_status(stats: dict):
    try:
        STATUS_FILE.parent.mkdir(parents=True, exist_ok=True)
        STATUS_FILE.write_text(json.dumps(stats, indent=2, ensure_ascii=False), encoding="utf-8")
    except Exception:
        pass

# ── LOOP PRINCIPALE ──────────────────────────────────────────

def run():
    log.info("=" * 50)
    log.info("TITANIUM_OS WATCHDOG — Avvio")
    log.info(f"Servizi: {list(SERVICES.keys())}")
    log.info(f"Check ogni {CHECK_S}s")
    log.info("=" * 50)

    # Avvio iniziale
    for name in SERVICES:
        time.sleep(1)
        _start(name)

    last_write = 0.0
    restarts: dict[str, int] = {n: 0 for n in SERVICES}

    while True:
        time.sleep(CHECK_S)
        now = time.time()
        status: dict = {"checked_at": datetime.now().isoformat(), "services": {}}

        for name, cfg in SERVICES.items():
            alive = cfg["check"]()
            if not alive:
                restarts[name] += 1
                log.warning(f"{cfg['label']} NON risponde — riavvio #{restarts[name]}")
                _start(name)
                time.sleep(3)
                alive = cfg["check"]()

            status["services"][name] = {
                "label":    cfg["label"],
                "alive":    alive,
                "restarts": restarts[name],
                "pid":      _procs[name].pid if _procs.get(name) else None,
            }

        if now - last_write >= WRITE_S:
            _write_status(status)
            last_write = now

if __name__ == "__main__":
    def _stop(sig, frame):
        log.info("Arresto watchdog...")
        for p in _procs.values():
            try:
                p.terminate()
            except Exception:
                pass
        sys.exit(0)

    signal.signal(signal.SIGINT,  _stop)
    signal.signal(signal.SIGTERM, _stop)
    run()
