"""
========================================================
TITANIUM_OS — AUTO-LINKER RIFERIMENTI (#19)
Modulo    : auto_linker.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Scansiona i link interni nei file .md.
            Se un file referenziato è stato spostato,
            aggiorna automaticamente il path nel link.
            Registra ogni correzione nel changelog.
Input     : nessuno (scan completo ROOT) o path specifico
Output    : fix inline nei file .md + log correzioni
Chiamato da: watcher.py (on_moved) o CLI manuale
========================================================
"""

import re
import sys
import json
import logging
import argparse
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT     = Path(__file__).resolve().parent.parent.parent
LOG_PATH = ROOT / "DATA" / "logs" / "auto_linker.log"
INDEX_PATH = ROOT / "DATA" / "file_index.json"

SKIP_DIRS = {"BACKUPS", "VERSIONS", "__pycache__", ".git", "node_modules", ".venv"}

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [AUTO_LINKER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("auto_linker")

# Regex per link Markdown interni: [testo](path) — esclude http/https
LINK_RE = re.compile(r'\[([^\]]*)\]\((?!https?://)([^)]+)\)')


# ============================================================
# INDICE FILE
# ============================================================

def build_file_index(root: Path = ROOT) -> dict[str, Path]:
    """
    Costruisce un indice filename → path assoluto per tutti i file .md.
    In caso di nomi duplicati, vince il path più corto (più vicino alla root).
    """
    index: dict[str, Path] = {}
    for f in root.rglob("*.md"):
        skip = any(part in SKIP_DIRS for part in f.relative_to(root).parts)
        if skip:
            continue
        name = f.name
        if name not in index or len(str(f)) < len(str(index[name])):
            index[name] = f
    return index


def save_file_index(index: dict[str, Path]):
    """Salva l'indice in DATA/file_index.json (per debug e audit)."""
    INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = {k: str(v.relative_to(ROOT)) for k, v in index.items()}
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ============================================================
# RISOLUZIONE LINK
# ============================================================

def _resolve_link(link_path: str, source_file: Path,
                  index: dict[str, Path]) -> str | None:
    """
    Dato un link relativo in un file .md, verifica se il target esiste.
    Se non esiste, cerca il filename nell'indice e ritorna il nuovo path relativo.
    Ritorna None se il link è già valido o non correggibile.
    """
    # Path assoluto del target come il file sorgente lo "vede"
    source_dir = source_file.parent
    target_abs = (source_dir / link_path).resolve()

    if target_abs.exists():
        return None  # link valido, niente da fare

    # Il file non esiste nel path attuale — cerca per nome nell'indice
    target_name = Path(link_path).name
    if target_name in index:
        new_abs = index[target_name]
        # Calcola path relativo dal file sorgente al nuovo path
        try:
            new_rel = new_abs.relative_to(source_dir)
            return str(new_rel).replace("\\", "/")
        except ValueError:
            # Non è relativo — usa path relativo alla root
            try:
                new_rel = new_abs.relative_to(ROOT)
                return str(new_rel).replace("\\", "/")
            except ValueError:
                return None

    return None  # non trovato nell'indice


# ============================================================
# FIX FILE
# ============================================================

def fix_file_links(file_path: Path, index: dict[str, Path],
                   dry_run: bool = False) -> list[dict]:
    """
    Corregge i link interni in un file .md.
    dry_run=True: simula senza scrivere.
    Ritorna lista di correzioni applicate.
    """
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        log.error(f"Lettura fallita {file_path}: {e}")
        return []

    corrections = []
    new_content = content

    for match in LINK_RE.finditer(content):
        text, link_path = match.group(1), match.group(2)

        # Ignora anchors (#), query string, e path assoluti Windows
        if link_path.startswith("#") or link_path.startswith("http") or ":" in link_path:
            continue

        new_path = _resolve_link(link_path, file_path, index)
        if new_path and new_path != link_path:
            old_link = f"[{text}]({link_path})"
            new_link = f"[{text}]({new_path})"
            new_content = new_content.replace(old_link, new_link, 1)
            corrections.append({
                "file": str(file_path.relative_to(ROOT)),
                "old": link_path,
                "new": new_path,
                "text": text,
                "timestamp": datetime.now().isoformat(),
            })
            log.info(f"Fix: {file_path.relative_to(ROOT)} — '{link_path}' → '{new_path}'")

    if corrections and not dry_run:
        try:
            file_path.write_text(new_content, encoding="utf-8")
        except IOError as e:
            log.error(f"Scrittura fallita {file_path}: {e}")
            return []

    return corrections


# ============================================================
# FUNZIONE PRINCIPALE
# ============================================================

def run_auto_linker(target_path: Path = None, dry_run: bool = False) -> list[dict]:
    """Scansiona tutti i .md e corregge i link rotti."""
    log.info("=" * 50)
    log.info(f"Avvio Auto-Linker | dry_run={dry_run}")

    # Costruisci indice file corrente
    index = build_file_index()
    save_file_index(index)
    log.info(f"Indice costruito: {len(index)} file .md indicizzati")

    # Raccoglie file da processare
    root = target_path or ROOT
    files = []
    for f in root.rglob("*.md"):
        skip = any(part in SKIP_DIRS for part in f.relative_to(ROOT).parts)
        if not skip:
            files.append(f)

    all_corrections = []
    for f in files:
        corrections = fix_file_links(f, index, dry_run=dry_run)
        all_corrections.extend(corrections)

    log.info(f"File scansionati: {len(files)} | Correzioni: {len(all_corrections)}")
    log.info("=" * 50)
    return all_corrections


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Auto-Linker riferimenti .md")
    parser.add_argument("--path", type=str, help="Path specifico (default: ROOT)")
    parser.add_argument("--dry-run", action="store_true", help="Simula senza modificare")
    args = parser.parse_args()

    target = Path(args.path) if args.path else None
    if target and not target.is_absolute():
        target = ROOT / target

    corrections = run_auto_linker(target, dry_run=args.dry_run)

    if args.dry_run and corrections:
        print(f"\nCorrezioni simulate ({len(corrections)}):")
        for c in corrections:
            print(f"  {c['file']}: '{c['old']}' → '{c['new']}'")
