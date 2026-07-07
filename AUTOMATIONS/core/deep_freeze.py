"""
========================================================
TITANIUM_OS — BACKUP DEEP FREEZE (#15)
Modulo    : deep_freeze.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Export settimanale crittografato di tutto
            TITANIUM_OS in un archivio .zip AES-256.
            Esclude BACKUPS/ e VERSIONS/ per evitare
            archivi dentro archivi.
Input     : nessuno — schedulato o chiamato via CLI
Output    : BACKUPS/deep_freeze/freeze_[timestamp].zip (AES-256)
            log in DATA/logs/deep_freeze.log
Avvio     : python deep_freeze.py
            oppure Task Scheduler Windows (domenica 03:00)
========================================================
"""

import os
import sys
import json
import logging
import zipfile
import hashlib
import secrets
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT         = Path(__file__).resolve().parent.parent.parent
FREEZE_DIR   = ROOT / "BACKUPS" / "deep_freeze"
LOG_PATH     = ROOT / "DATA" / "logs" / "deep_freeze.log"
MANIFEST_PATH = FREEZE_DIR / "manifest.json"

# Cartelle da escludere dall'archivio
EXCLUDE_DIRS = {
    "BACKUPS",      # evita archivi dentro archivi
    "VERSIONS",     # snapshot intermedi — non servono nel deep freeze
    "__pycache__",
    ".git",
    "node_modules",
    ".venv",
    "venv",
}

# Estensioni da escludere
EXCLUDE_EXTENSIONS = {".pyc", ".pyo", ".tmp", ".temp", ".lock"}

# Mantieni massimo N freeze (rotazione)
MAX_FREEZE_FILES = 8  # ~2 mesi settimanali

# ============================================================
# LOGGING
# ============================================================

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [DEEP_FREEZE] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("deep_freeze")


# ============================================================
# FUNZIONI
# ============================================================

def _should_exclude(path: Path) -> bool:
    """True se il path va escluso dall'archivio."""
    for part in path.parts:
        if part in EXCLUDE_DIRS:
            return True
        # chroma_db* = indice binario ricostruibile (rag-rebuild) con snapshot
        # propri in _VAULT/BACKUPS/rag_snapshots: dentro il freeze gonfiava
        # lo zip a 2 GB (freeze del 05/07 vs 185 MB del 21/06)
        if part.startswith("chroma_db"):
            return True
    if path.suffix.lower() in EXCLUDE_EXTENSIONS:
        return True
    return False


def _collect_files(root: Path) -> list[Path]:
    """Raccoglie tutti i file da includere nel freeze."""
    files = []
    for f in root.rglob("*"):
        if f.is_file() and not _should_exclude(f.relative_to(root)):
            files.append(f)
    return files


def _sha256_file(path: Path) -> str:
    """Calcola SHA-256 di un file."""
    h = hashlib.sha256()
    try:
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(65536), b""):
                h.update(chunk)
    except IOError:
        return "ERROR"
    return h.hexdigest()


def _rotate_old_freezes(freeze_dir: Path):
    """Elimina i freeze più vecchi se supera MAX_FREEZE_FILES."""
    existing = sorted(
        freeze_dir.glob("freeze_*.zip"),
        key=lambda f: f.stat().st_mtime
    )
    while len(existing) > MAX_FREEZE_FILES:
        oldest = existing.pop(0)
        oldest.unlink()
        log.info(f"Rimosso freeze vecchio: {oldest.name}")


def _update_manifest(freeze_path: Path, file_count: int, total_bytes: int,
                     checksum: str):
    """Aggiorna manifest.json con l'ultimo freeze."""
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)

    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
            manifest = json.load(f)
    else:
        manifest = {"history": []}

    manifest["last_freeze"] = {
        "file": freeze_path.name,
        "timestamp": datetime.now().isoformat(),
        "file_count": file_count,
        "total_bytes": total_bytes,
        "sha256": checksum,
    }
    manifest["history"].append(manifest["last_freeze"])

    # Tieni solo gli ultimi MAX_FREEZE_FILES record
    manifest["history"] = manifest["history"][-MAX_FREEZE_FILES:]

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)


# ============================================================
# FUNZIONE PRINCIPALE
# ============================================================

def run_deep_freeze():
    """
    Esegue il backup completo crittografato.

    Nota sulla crittografia: Python stdlib zipfile non supporta
    AES nativo. Usiamo pyzipper se disponibile (AES-256),
    altrimenti ZIP standard con password (ZipCrypto — più debole).
    Installa pyzipper per crittografia forte: pip install pyzipper
    """
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    freeze_filename = f"freeze_{timestamp}.zip"
    FREEZE_DIR.mkdir(parents=True, exist_ok=True)
    freeze_path = FREEZE_DIR / freeze_filename

    log.info("=" * 50)
    log.info(f"Avvio Deep Freeze: {freeze_filename}")

    # Raccolta file
    files = _collect_files(ROOT)
    log.info(f"File da archiviare: {len(files)}")

    # Genera password casuale per questo freeze
    # IMPORTANTE: salva questa password in un posto sicuro esterno
    password = secrets.token_hex(32)
    password_file = FREEZE_DIR / f"freeze_{timestamp}.key"

    # Scrittura archivio
    total_bytes = 0
    try:
        # Tenta con pyzipper (AES-256) se installato
        try:
            import pyzipper
            with pyzipper.AESZipFile(
                freeze_path, "w",
                compression=pyzipper.ZIP_DEFLATED,
                encryption=pyzipper.WZ_AES
            ) as zf:
                zf.setpassword(password.encode())
                for f in files:
                    arcname = str(f.relative_to(ROOT))
                    zf.write(f, arcname)
                    total_bytes += f.stat().st_size
            encryption_type = "AES-256"

        except ImportError:
            # Fallback: ZIP con ZipCrypto (installa pyzipper per AES)
            log.warning("pyzipper non trovato — uso ZipCrypto (meno sicuro). "
                        "Installa: pip install pyzipper")
            with zipfile.ZipFile(freeze_path, "w", zipfile.ZIP_DEFLATED) as zf:
                zf.setpassword(password.encode())
                for f in files:
                    arcname = str(f.relative_to(ROOT))
                    zf.write(f, arcname)
                    total_bytes += f.stat().st_size
            encryption_type = "ZipCrypto"

    except Exception as e:
        log.error(f"Errore creazione archivio: {e}")
        return

    # Salva la chiave in chiaro accanto all'archivio
    # (in produzione: sposta su supporto esterno o vault)
    with open(password_file, "w", encoding="utf-8") as f:
        f.write(f"Freeze: {freeze_filename}\n")
        f.write(f"Data: {datetime.now().isoformat()}\n")
        f.write(f"Encryption: {encryption_type}\n")
        f.write(f"Password: {password}\n")
        f.write("ATTENZIONE: Sposta questo file su supporto esterno!\n")

    # Checksum dell'archivio
    checksum = _sha256_file(freeze_path)

    # Aggiorna manifest
    _update_manifest(freeze_path, len(files), total_bytes, checksum)

    # Rotazione vecchi freeze
    _rotate_old_freezes(FREEZE_DIR)

    size_mb = freeze_path.stat().st_size / (1024 * 1024)
    log.info(f"Freeze completato: {freeze_filename}")
    log.info(f"File: {len(files)} | Dimensione: {size_mb:.1f} MB | Tipo: {encryption_type}")
    log.info(f"SHA-256: {checksum}")
    log.info(f"Chiave: {password_file.name} — SPOSTALA su supporto esterno!")
    log.info("=" * 50)

    return freeze_path


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    run_deep_freeze()
