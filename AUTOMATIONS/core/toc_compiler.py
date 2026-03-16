"""
========================================================
TITANIUM_OS — COMPILER DOCUMENTALE / TOC (#21)
Modulo    : toc_compiler.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Genera o aggiorna automaticamente il Table
            of Contents (TOC) in un file .md.
            Il TOC viene inserito dopo il frontmatter
            e prima del primo contenuto.
            Usa marcatori <!-- TOC --> / <!-- /TOC -->
            per aggiornare senza distruggere il testo.
Input     : file_path (str)
Output    : file .md aggiornato con TOC inline
Chiamato da: watcher.py (on_modified) o CLI manuale
========================================================
"""

import re
import sys
import logging
import argparse
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT     = Path(__file__).resolve().parent.parent.parent
LOG_PATH = ROOT / "DATA" / "logs" / "toc_compiler.log"

# Soglia minima heading per generare TOC
# (file con meno di N heading non ne vale la pena)
MIN_HEADINGS = 3

# Livello massimo di heading da includere nel TOC (1=h1, 3=h3, ecc.)
MAX_TOC_LEVEL = 3

TOC_START = "<!-- TOC -->"
TOC_END   = "<!-- /TOC -->"

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [TOC_COMPILER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("toc_compiler")


# ============================================================
# FUNZIONI
# ============================================================

def _heading_to_anchor(text: str) -> str:
    """
    Converte testo heading in anchor GitHub-style.
    Es: "Il Mio Titolo" → "il-mio-titolo"
    """
    # Rimuovi markdown inline (bold, italic, code)
    text = re.sub(r'[*_`]', '', text)
    # Lowercase
    text = text.lower()
    # Spazi → trattini, rimuovi caratteri non alfanumerici
    text = re.sub(r'[^\w\s\-àèìòùáéíóú]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    return text


def _extract_headings(lines: list[str]) -> list[tuple[int, str]]:
    """
    Estrae tutti gli heading fino a MAX_TOC_LEVEL.
    Ritorna lista di (livello, testo).
    Ignora heading dentro blocchi codice.
    """
    headings = []
    in_code_block = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        m = re.match(r'^(#{1,6})\s+(.+)', line)
        if m:
            level = len(m.group(1))
            if level <= MAX_TOC_LEVEL:
                headings.append((level, m.group(2).strip()))
    return headings


def _build_toc(headings: list[tuple[int, str]]) -> str:
    """Genera il blocco TOC come testo Markdown."""
    if not headings:
        return ""

    lines = [TOC_START, ""]
    min_level = min(h[0] for h in headings)

    for level, text in headings:
        indent = "  " * (level - min_level)
        anchor = _heading_to_anchor(text)
        # Rimuovi emoji dal testo visualizzato nel TOC
        display = re.sub(r'[^\w\s\-àèìòùáéíóú.,!?:()/]', '', text).strip()
        lines.append(f"{indent}- [{display}](#{anchor})")

    lines.append("")
    lines.append(TOC_END)
    return "\n".join(lines)


def _find_frontmatter_end(lines: list[str]) -> int:
    """Ritorna l'indice della riga dopo la fine del frontmatter (o 0)."""
    if not lines or lines[0].strip() != "---":
        return 0
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return i + 1
    return 0  # frontmatter non chiuso — inserisci all'inizio


def _find_toc_block(content: str) -> tuple[int, int] | tuple[None, None]:
    """Ritorna (start, end) degli indici del blocco TOC esistente, o (None, None)."""
    start = content.find(TOC_START)
    if start == -1:
        return None, None
    end = content.find(TOC_END, start)
    if end == -1:
        return None, None
    return start, end + len(TOC_END)


# ============================================================
# FUNZIONE PRINCIPALE
# ============================================================

def compile_toc(file_path: Path, dry_run: bool = False) -> bool:
    """
    Genera o aggiorna il TOC in un file .md.
    Ritorna True se il file è stato modificato.
    """
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        log.error(f"Lettura fallita {file_path}: {e}")
        return False

    lines = content.splitlines()
    headings = _extract_headings(lines)

    if len(headings) < MIN_HEADINGS:
        log.debug(f"Skip {file_path.name} — solo {len(headings)} heading(s)")
        return False

    toc_block = _build_toc(headings)
    toc_start, toc_end = _find_toc_block(content)

    if toc_start is not None:
        # Aggiorna TOC esistente
        current_toc = content[toc_start:toc_end]
        if current_toc == toc_block:
            log.debug(f"TOC già aggiornato: {file_path.name}")
            return False
        new_content = content[:toc_start] + toc_block + content[toc_end:]
    else:
        # Inserisci nuovo TOC dopo frontmatter
        fm_end = _find_frontmatter_end(lines)
        insert_pos = sum(len(l) + 1 for l in lines[:fm_end])
        new_content = content[:insert_pos] + toc_block + "\n\n" + content[insert_pos:]

    if not dry_run:
        try:
            file_path.write_text(new_content, encoding="utf-8")
            rel = file_path.relative_to(ROOT)
            log.info(f"TOC aggiornato: {rel} ({len(headings)} heading)")
        except IOError as e:
            log.error(f"Scrittura fallita {file_path}: {e}")
            return False
    else:
        print(f"[DRY RUN] TOC che verrebbe generato per {file_path.name}:")
        print(toc_block)

    return True


def compile_all(dry_run: bool = False):
    """Aggiorna il TOC in tutti i .md della ROOT."""
    skip_dirs = {"BACKUPS", "VERSIONS", "__pycache__", ".git", "node_modules", ".venv"}
    updated = 0
    for f in ROOT.rglob("*.md"):
        skip = any(part in skip_dirs for part in f.relative_to(ROOT).parts)
        if not skip:
            if compile_toc(f, dry_run=dry_run):
                updated += 1
    log.info(f"TOC aggiornati: {updated} file")


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compiler TOC per file .md")
    parser.add_argument("--file",    type=str, help="File specifico")
    parser.add_argument("--all",     action="store_true", help="Aggiorna tutti i .md")
    parser.add_argument("--dry-run", action="store_true", help="Mostra senza modificare")
    args = parser.parse_args()

    if args.all:
        compile_all(dry_run=args.dry_run)
    elif args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        compile_toc(path, dry_run=args.dry_run)
    else:
        parser.print_help()
