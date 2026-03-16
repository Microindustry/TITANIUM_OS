"""
========================================================
TITANIUM_OS — WATCHER (Automation #1)
Modulo    : watcher.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.1.0
Data      : 2026-03-16
========================================================
Input  : nessuno — gira in background continuamente
Output : trigger automatico per backup.py, changelog.py,
         state_updater.py ad ogni modifica file sistema
Avvio  : pythonw watcher.py  (senza finestra visibile)
         oppure tramite START_TITANIUM_OS.bat
========================================================
"""

import os
import sys
import time
import json
import logging
from pathlib import Path
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# ============================================================
# CONFIGURAZIONE
# ============================================================

# Risale alla root TITANIUM_OS (due livelli su da AUTOMATIONS/core/)
ROOT = Path(__file__).resolve().parent.parent.parent

# Cartelle da ignorare completamente
IGNORE_DIRS = {
    "BACKUPS",
    "VERSIONS",
    "__pycache__",
    ".git",
    "node_modules",
    ".venv",
    "venv",
}

# Estensioni file da ignorare (temporanei, compilati, ecc.)
IGNORE_EXTENSIONS = {
    ".pyc", ".pyo", ".tmp", ".temp",
    ".log", ".lock", "~",
}

# File da ignorare per nome
IGNORE_FILES = {
    "STATE.json",      # aggiornato da state_updater, non da watcher
    "changelog.md",    # scritto da changelog_writer
    "diff_log.json",   # scritto da versioner
}

# Debounce: ignora eventi doppi entro N secondi sullo stesso file
# Alzato da 2s a 5s — i backup spam del 10 mar dimostravano che 2s non bastava
DEBOUNCE_SECONDS = 5.0

# Path log watcher
LOG_PATH = ROOT / "DATA" / "logs" / "watcher.log"


# ============================================================
# LOGGING SETUP
# ============================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [WATCHER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("watcher")


# ============================================================
# IMPORT AUTOMAZIONI CORE (lazy — evita import circolari)
# ============================================================
def _import_core():
    """Importa i moduli core solo quando servono."""
    core_path = Path(__file__).resolve().parent
    if str(core_path) not in sys.path:
        sys.path.insert(0, str(core_path))

    from backup import run_backup
    from changelog_writer import write_changelog_entry
    from state_updater import update_state_on_change
    return run_backup, write_changelog_entry, update_state_on_change


def _import_md_modules():
    """Importa i moduli specifici per file .md (lazy)."""
    core_path = Path(__file__).resolve().parent
    if str(core_path) not in sys.path:
        sys.path.insert(0, str(core_path))

    from md_validator import validate_file
    from semantic_indexer import index_file
    from toc_compiler import compile_toc
    from auto_linker import run_auto_linker
    from md_view_pipeline import deploy_view
    return validate_file, index_file, compile_toc, run_auto_linker, deploy_view


# ============================================================
# DEBOUNCE TRACKER
# ============================================================
class DebounceTracker:
    """Evita di processare lo stesso evento più volte in poco tempo."""

    def __init__(self, seconds: float):
        # Dict: path -> ultimo timestamp evento
        self._last_event: dict = {}
        self._debounce = seconds

    def should_process(self, path: str) -> bool:
        """Ritorna True se l'evento va processato (non è un duplicato)."""
        now = time.time()
        last = self._last_event.get(path, 0)

        if now - last < self._debounce:
            # Evento duplicato — ignora
            return False

        # Aggiorna timestamp
        self._last_event[path] = now
        return True

    def cleanup(self):
        """Rimuove entry vecchie per evitare memory leak."""
        cutoff = time.time() - 60  # 60 secondi
        self._last_event = {
            k: v for k, v in self._last_event.items()
            if v > cutoff
        }


# ============================================================
# EVENT HANDLER
# ============================================================
class TitaniumHandler(FileSystemEventHandler):
    """Gestisce tutti gli eventi filesystem di TITANIUM_OS."""

    def __init__(self):
        super().__init__()
        self.debounce = DebounceTracker(DEBOUNCE_SECONDS)
        # Importa i moduli core una volta
        self._run_backup, self._write_changelog, self._update_state = _import_core()
        # Importa moduli specifici .md
        (self._validate_md, self._index_md,
         self._compile_toc, self._run_auto_linker,
         self._deploy_view) = _import_md_modules()

    def _should_ignore(self, path: str) -> bool:
        """Ritorna True se il file/cartella va ignorato."""
        p = Path(path)

        # Ignora se dentro una cartella da ignorare
        for part in p.parts:
            if part in IGNORE_DIRS:
                return True

        # Ignora per estensione
        if p.suffix.lower() in IGNORE_EXTENSIONS:
            return True

        # Ignora per nome file
        if p.name in IGNORE_FILES:
            return True

        return False

    def _get_relative(self, path: str) -> str:
        """Converte path assoluto in relativo a ROOT."""
        try:
            return str(Path(path).relative_to(ROOT))
        except ValueError:
            return path

    def _handle_event(self, event_type: str, src_path: str, dest_path: str = None):
        """Logica centrale: riceve evento e triggera le automazioni."""

        # Filtra file da ignorare
        if self._should_ignore(src_path):
            return

        # Debounce: ignora duplicati
        if not self.debounce.should_process(src_path):
            return

        # Pulizia periodica debounce tracker
        self.debounce.cleanup()

        # Path relativo per logging
        rel_path = self._get_relative(src_path)
        timestamp = datetime.now().isoformat()

        log.info(f"[{event_type}] {rel_path}")

        # --------------------------------------------------------
        # TRIGGER AUTOMAZIONI
        # --------------------------------------------------------
        try:
            # 1. Changelog — registra ogni modifica
            self._write_changelog(
                event_type=event_type,
                file_path=rel_path,
                timestamp=timestamp,
                dest_path=self._get_relative(dest_path) if dest_path else None
            )
        except Exception as e:
            log.error(f"Changelog error: {e}")

        try:
            # 2. State updater — aggiorna STATE.json
            self._update_state(
                event_type=event_type,
                file_path=rel_path,
                timestamp=timestamp
            )
        except Exception as e:
            log.error(f"State updater error: {e}")

        try:
            # 3. Backup — esegue snapshot se necessario
            self._run_backup(
                event_type=event_type,
                file_path=src_path,
                rel_path=rel_path,
                timestamp=timestamp
            )
        except Exception as e:
            log.error(f"Backup error: {e}")

        # ---- Trigger specifici per file .md ---------------------
        is_md = Path(src_path).suffix.lower() == ".md"

        if is_md and event_type in ("MODIFIED", "CREATED"):
            src = Path(src_path)

            try:
                # 4. Validatore sintassi MD
                result = self._validate_md(src)
                if result["errors"]:
                    log.warning(f"MD_VALIDATOR: {result['errors']} errori in {rel_path}")
            except Exception as e:
                log.error(f"MD validator error: {e}")

            try:
                # 5. Indicizzazione semantica
                self._index_md(src)
            except Exception as e:
                log.error(f"Semantic indexer error: {e}")

            try:
                # 6. TOC compiler
                self._compile_toc(src)
            except Exception as e:
                log.error(f"TOC compiler error: {e}")

            try:
                # 7. View pipeline — aggiorna JSON per dashboard React
                self._deploy_view(src)
            except Exception as e:
                log.error(f"View pipeline error: {e}")

        if is_md and event_type == "MOVED":
            try:
                # 8. Auto-linker — aggiorna i link che puntavano al vecchio path
                self._run_auto_linker()
            except Exception as e:
                log.error(f"Auto-linker error: {e}")

    # ---- Event handlers ----------------------------------------

    def on_modified(self, event):
        if not event.is_directory:
            self._handle_event("MODIFIED", event.src_path)

    def on_created(self, event):
        if not event.is_directory:
            self._handle_event("CREATED", event.src_path)

    def on_deleted(self, event):
        if not event.is_directory:
            self._handle_event("DELETED", event.src_path)

    def on_moved(self, event):
        if not event.is_directory:
            self._handle_event("MOVED", event.src_path, event.dest_path)


# ============================================================
# MAIN — avvio observer
# ============================================================
def main():
    """Avvia il watcher su tutta la cartella TITANIUM_OS."""

    log.info("=" * 50)
    log.info("TITANIUM_OS WATCHER — Avvio")
    log.info(f"Root: {ROOT}")
    log.info(f"Cartelle ignorate: {IGNORE_DIRS}")
    log.info("=" * 50)

    # Crea handler e observer
    handler = TitaniumHandler()
    observer = Observer()

    # Monitora tutta la root ricorsivamente
    observer.schedule(handler, str(ROOT), recursive=True)
    observer.start()

    log.info("Watcher attivo. CTRL+C per fermare.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        log.info("Arresto watcher...")
        observer.stop()

    observer.join()
    log.info("Watcher fermato.")


if __name__ == "__main__":
    main()
