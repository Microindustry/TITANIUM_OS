# mente_watcher.py | TITANIUM_OS / NODES / MENTE_WATCHER | v1.2 | 2026-05-27
# Guarda MICROINDUSTRY\MENTE\ in background (path dinamico via Path.home())
# Quando un file cambia -> chiama POST /api/scan (api_server:5001)
# Output: aggiorna DATA/mente_digest.json automaticamente
# Avvio: incluso in START_ECOSYSTEM.bat

import sys
import time
import logging
import threading
import urllib.request
import urllib.error
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# ── CONFIG ────────────────────────────────────────────────────
import os
MENTE_DIR   = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
API_SCAN    = "http://localhost:5001/api/scan"
DEBOUNCE_S  = 8.0   # secondi di quiete prima di scansionare
LOG_PATH    = Path(__file__).resolve().parents[2] / "VERSIONS" / "mente_watcher.log"

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
        log.info(f"Avvio scan — {reason}")
        try:
            req = urllib.request.Request(
                API_SCAN,
                data=b"{}",
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=150) as resp:
                body = resp.read().decode("utf-8", errors="replace")
                # Mostra solo prime 200 char del risultato
                log.info(f"Scan completata — risposta: {body[:200]}")
        except urllib.error.URLError as e:
            log.warning(f"API non raggiungibile (api_server spento?): {e}")
        except Exception as e:
            log.error(f"Errore scan: {e}")


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
