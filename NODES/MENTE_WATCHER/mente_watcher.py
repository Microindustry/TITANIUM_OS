# mente_watcher.py | TITANIUM_OS / NODES / MENTE_WATCHER | v1.3 | 2026-05-27
# Guarda MICROINDUSTRY\MENTE\ in background (path dinamico via Path.home())
# Quando un file cambia -> POST /api/scan + rag-rebuild automatico
# Output: DATA/mente_digest.json aggiornato + ChromaDB aggiornato
# Avvio: incluso in START_GETAC.bat / Task Scheduler

import os
import sys
import time
import subprocess
import logging
import threading
import urllib.request
import urllib.error
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# ── CONFIG ────────────────────────────────────────────────────
REPO_ROOT   = Path(__file__).resolve().parents[2]
MENTE_DIR   = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
API_SCAN    = "http://localhost:5001/api/scan"
RAG_SCRIPT  = REPO_ROOT / "NODES" / "MENTE_RAG" / "rag_engine.py"
PYTHON      = sys.executable
DEBOUNCE_S  = 10.0  # secondi di quiete prima di scansionare + rebuild
LOG_DIR     = REPO_ROOT / "DATA" / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)
LOG_PATH    = LOG_DIR / "mente_watcher.log"

WATCH_EXTS  = {".pdf", ".docx", ".txt", ".md"}  # estensioni che triggherano scan

# ── LOGGING ───────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [MENTE_WATCHER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("mente_watcher")


# ── SCAN TRIGGER (debounced) ───────────────────────────────────

class DebouncedScanner:
    """Accumula eventi e triggera la scan solo dopo N secondi di quiete."""

    def __init__(self, delay: float):
        self._delay = delay
        self._timer: threading.Timer | None = None
        self._lock = threading.Lock()

    def schedule(self, reason: str):
        with self._lock:
            if self._timer is not None:
                self._timer.cancel()
            self._timer = threading.Timer(self._delay, self._run, args=[reason])
            self._timer.daemon = True
            self._timer.start()
        log.info(f"Scan programmata in {self._delay}s — motivo: {reason}")

    def _run(self, reason: str):
        log.info(f"Ciclo avviato — {reason}")

        # 1. Scanner digest (se API è up)
        try:
            req = urllib.request.Request(
                API_SCAN, data=b"{}",
                headers={"Content-Type": "application/json"}, method="POST",
            )
            with urllib.request.urlopen(req, timeout=150) as resp:
                log.info(f"Scanner OK — {resp.read().decode()[:100]}")
        except urllib.error.URLError:
            log.warning("API spenta — scanner skippato, RAG rebuild continua")
        except Exception as e:
            log.error(f"Errore scanner: {e}")

        # 2. RAG rebuild (sempre — indipendente dall'API)
        if RAG_SCRIPT.exists():
            try:
                env = {**os.environ, "MENTE_DIR": str(MENTE_DIR), "PYTHONPATH": str(REPO_ROOT)}
                result = subprocess.run(
                    [PYTHON, str(RAG_SCRIPT), "--rebuild"],
                    capture_output=True, text=True, timeout=300, env=env,
                )
                if result.returncode == 0:
                    log.info("RAG rebuild OK")
                else:
                    log.error(f"RAG rebuild errore: {result.stderr[-200:]}")
            except Exception as e:
                log.error(f"RAG rebuild eccezione: {e}")
        else:
            log.warning(f"rag_engine.py non trovato: {RAG_SCRIPT}")


# ── FILE SYSTEM HANDLER ────────────────────────────────────────

scanner = DebouncedScanner(DEBOUNCE_S)


class MenteHandler(FileSystemEventHandler):
    """Reagisce a modifiche in LA MIA MENTE."""

    def _relevant(self, path: str) -> bool:
        return Path(path).suffix.lower() in WATCH_EXTS

    def on_modified(self, event):
        if not event.is_directory and self._relevant(event.src_path):
            rel = Path(event.src_path).name
            scanner.schedule(f"MODIFIED {rel}")

    def on_created(self, event):
        if not event.is_directory and self._relevant(event.src_path):
            rel = Path(event.src_path).name
            scanner.schedule(f"CREATED {rel}")

    def on_moved(self, event):
        if not event.is_directory and self._relevant(event.dest_path):
            rel = Path(event.dest_path).name
            scanner.schedule(f"MOVED -> {rel}")


# ── MAIN ──────────────────────────────────────────────────────

def main():
    if not MENTE_DIR.exists():
        log.error(f"Cartella non trovata: {MENTE_DIR}")
        log.error("Crea la cartella o modifica MENTE_DIR in questo script.")
        sys.exit(1)

    log.info("=" * 50)
    log.info("MENTE_WATCHER — Avvio")
    log.info(f"Cartella: {MENTE_DIR}")
    log.info(f"Estensioni: {WATCH_EXTS}")
    log.info(f"Debounce: {DEBOUNCE_S}s")
    log.info(f"API scan: {API_SCAN}")
    log.info("=" * 50)

    handler  = MenteHandler()
    observer = Observer()
    observer.schedule(handler, str(MENTE_DIR), recursive=True)
    observer.start()
    log.info("Watcher attivo. CTRL+C per fermare.")

    try:
        while True:
            time.sleep(2)
    except KeyboardInterrupt:
        log.info("Arresto mente_watcher...")
        observer.stop()

    observer.join()
    log.info("Mente_watcher fermato.")


if __name__ == "__main__":
    main()
