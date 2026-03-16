"""
========================================================
TITANIUM_OS — BACKUP + VERSIONING (Automation #2)
Modulo    : backup.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Input  : event_type (str), file_path (str), rel_path (str),
         timestamp (str)
Output : copia snapshot in BACKUPS/[timestamp]/
         mantiene ultime MAX_BACKUPS versioni per file
Chiamato da: watcher.py ad ogni evento file
========================================================
"""

import os
import shutil
import json
import logging
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
BACKUPS_DIR = ROOT / "BACKUPS"
VERSIONS_DIR = ROOT / "VERSIONS" / "snapshots"

# Quante versioni tenere per ogni file
MAX_VERSIONS_PER_FILE = 30

# Solo questi tipi di evento triggerano un backup
BACKUP_ON_EVENTS = {"MODIFIED", "CREATED"}

# Estensioni file di cui fare snapshot (i file importanti)
BACKUP_EXTENSIONS = {
    ".md", ".json", ".py", ".txt", ".csv",
    ".yaml", ".yml", ".toml", ".html", ".jsx",
}

# File sempre da includere nel backup (indipendentemente dall'estensione)
ALWAYS_BACKUP = {
    "CLAUDE.md", "STATE.json", "projects.json",
    "milestones.json", "changelog.md",
}

# File da NON backuppare mai (cambiano troppo spesso)
NEVER_BACKUP = {
    "watcher.log", "diff_log.json",
}

log = logging.getLogger("backup")


# ============================================================
# FUNZIONI
# ============================================================

def _should_backup(rel_path: str, event_type: str) -> bool:
    """Determina se questo file va backuppato."""

    # Solo su certi eventi
    if event_type not in BACKUP_ON_EVENTS:
        return False

    p = Path(rel_path)

    # Mai backuppare questi
    if p.name in NEVER_BACKUP:
        return False

    # Sempre backuppare questi
    if p.name in ALWAYS_BACKUP:
        return True

    # Backuppa le estensioni configurate
    if p.suffix.lower() in BACKUP_EXTENSIONS:
        return True

    return False


def _make_timestamp_key() -> str:
    """Genera una chiave timestamp per il nome cartella backup."""
    return datetime.now().strftime("%Y%m%d_%H%M%S")


def _get_snapshot_path(rel_path: str, timestamp: str) -> Path:
    """
    Costruisce il path del file snapshot.
    Mantiene la struttura cartelle originale dentro BACKUPS/[timestamp]/
    Esempio: BRAIN/CLAUDE.md -> BACKUPS/20260309_143022/BRAIN/CLAUDE.md
    """
    ts_key = datetime.fromisoformat(timestamp).strftime("%Y%m%d_%H%M%S")
    return BACKUPS_DIR / ts_key / rel_path


def _cleanup_old_backups_for_file(rel_path: str):
    """
    Mantiene solo le ultime MAX_VERSIONS_PER_FILE versioni per ogni file.
    Scansiona tutte le cartelle backup e tiene le più recenti.
    """
    # Trova tutte le versioni esistenti di questo file
    versions = []
    if BACKUPS_DIR.exists():
        for ts_dir in sorted(BACKUPS_DIR.iterdir()):
            if ts_dir.is_dir():
                file_snapshot = ts_dir / rel_path
                if file_snapshot.exists():
                    versions.append((ts_dir.name, file_snapshot))

    # Ordina per timestamp (più vecchio prima)
    versions.sort(key=lambda x: x[0])

    # Rimuovi le versioni in eccesso (tieni solo le ultime MAX)
    excess = len(versions) - MAX_VERSIONS_PER_FILE
    if excess > 0:
        for ts_key, snapshot_path in versions[:excess]:
            try:
                snapshot_path.unlink()
                log.debug(f"Rimossa versione vecchia: {ts_key}/{rel_path}")

                # Rimuovi cartella timestamp se vuota
                ts_dir = BACKUPS_DIR / ts_key
                if ts_dir.exists() and not any(ts_dir.rglob("*")):
                    ts_dir.rmdir()

            except Exception as e:
                log.warning(f"Cleanup errore su {snapshot_path}: {e}")


def _update_versions_index(rel_path: str, snapshot_path: Path, timestamp: str):
    """
    Aggiorna diff_log.json con il record del nuovo snapshot.
    Utile per la Dashboard per mostrare storico versioni.
    """
    diff_log_path = ROOT / "VERSIONS" / "diff_log.json"

    # Leggi log esistente
    if diff_log_path.exists():
        try:
            with open(diff_log_path, "r", encoding="utf-8") as f:
                diff_log = json.load(f)
        except (json.JSONDecodeError, IOError):
            diff_log = {"events": []}
    else:
        diff_log = {"events": []}

    # Aggiungi nuovo evento
    diff_log["events"].append({
        "timestamp": timestamp,
        "file": rel_path,
        "snapshot": str(snapshot_path.relative_to(ROOT)),
        "type": "snapshot"
    })

    # Tieni solo ultimi 500 eventi nel log
    if len(diff_log["events"]) > 500:
        diff_log["events"] = diff_log["events"][-500:]

    # Scrivi
    try:
        with open(diff_log_path, "w", encoding="utf-8") as f:
            json.dump(diff_log, f, indent=2, ensure_ascii=False)
    except IOError as e:
        log.warning(f"diff_log write errore: {e}")


# ============================================================
# FUNZIONE PRINCIPALE — chiamata da watcher.py
# ============================================================

def run_backup(event_type: str, file_path: str, rel_path: str, timestamp: str):
    """
    Esegue backup del file modificato.

    Args:
        event_type : tipo evento ("MODIFIED", "CREATED", ecc.)
        file_path  : path assoluto del file sorgente
        rel_path   : path relativo a ROOT (per il nome snapshot)
        timestamp  : timestamp ISO dell'evento
    """

    # Decide se questo file va backuppato
    if not _should_backup(rel_path, event_type):
        return

    src = Path(file_path)

    # File deve esistere per fare snapshot
    if not src.exists():
        log.debug(f"Skip backup (file non esiste): {rel_path}")
        return

    # Costruisce path destinazione snapshot
    snapshot_path = _get_snapshot_path(rel_path, timestamp)

    # Crea cartelle intermedie
    snapshot_path.parent.mkdir(parents=True, exist_ok=True)

    # Copia il file
    try:
        shutil.copy2(str(src), str(snapshot_path))
        log.info(f"[BACKUP] Snapshot: {rel_path} → {snapshot_path.parent.name}/")

        # Aggiorna indice versioni
        _update_versions_index(rel_path, snapshot_path, timestamp)

        # Pulizia versioni vecchie
        _cleanup_old_backups_for_file(rel_path)

    except (IOError, OSError) as e:
        log.error(f"Backup fallito per {rel_path}: {e}")


# ============================================================
# BACKUP MANUALE — snapshot completo dell'intera root
# ============================================================

def run_full_backup():
    """
    Esegue uno snapshot completo di tutto TITANIUM_OS.
    Uso manuale o schedulato settimanalmente.
    """
    timestamp = datetime.now().isoformat()
    ts_key = datetime.now().strftime("%Y%m%d_%H%M%S")
    dest_dir = BACKUPS_DIR / f"FULL_{ts_key}"

    log.info(f"[FULL BACKUP] Avvio → {dest_dir.name}")

    copied = 0
    skipped = 0

    for src_path in ROOT.rglob("*"):
        if src_path.is_file():
            # Ignora cartella BACKUPS stessa e VERSIONS/snapshots
            rel = src_path.relative_to(ROOT)
            parts = rel.parts
            if parts[0] in ("BACKUPS", "VERSIONS"):
                skipped += 1
                continue
            if "__pycache__" in parts:
                skipped += 1
                continue

            dest_path = dest_dir / rel
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            try:
                shutil.copy2(str(src_path), str(dest_path))
                copied += 1
            except Exception as e:
                log.warning(f"Full backup skip {rel}: {e}")
                skipped += 1

    log.info(f"[FULL BACKUP] Completato: {copied} file copiati, {skipped} saltati")
    return dest_dir


# ============================================================
# TEST STANDALONE
# ============================================================
if __name__ == "__main__":
    print("Test: full backup manuale")
    result = run_full_backup()
    print(f"Backup salvato in: {result}")
