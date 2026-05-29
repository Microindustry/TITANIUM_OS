"""
========================================================
TITANIUM_OS — ASSOLUTO SPLITTER (Automation #13)
Modulo    : assoluto_splitter.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Input  : file ASSOLUTO master (MD o TXT) — path da CLI
         oppure automatico da BRAIN/ASSOLUTO/V6_MASTER.md
Output : BRAIN/ASSOLUTO/ATTI/ATTO_[nome].md per ogni atto
         + versione archiviata in BRAIN/ASSOLUTO/VERSIONS/
Funzioni:
  split()   — divide master in atti separati
  compose() — ricompone atti in master
  diff()    — mostra differenze tra versioni
Uso: python assoluto_splitter.py split   [--input path]
     python assoluto_splitter.py compose [--output path]
     python assoluto_splitter.py diff V5_archive.md V6_MASTER.md
========================================================
"""

import re
import sys
import json
import shutil
import argparse
import logging
from pathlib import Path
from datetime import datetime

_ROOT_AS = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT_AS))
try:
    from CORE.log import get_logger
    logger = get_logger("assoluto_splitter")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [assoluto] %(levelname)s %(message)s")
    logger = logging.getLogger("assoluto_splitter")

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
ASSOLUTO_DIR = ROOT / "BRAIN" / "ASSOLUTO"
ATTI_DIR = ASSOLUTO_DIR / "ATTI"
VERSIONS_DIR = ASSOLUTO_DIR / "VERSIONS"
MASTER_PATH = ASSOLUTO_DIR / "V6_MASTER.md"
CHANGELOG_PATH = ASSOLUTO_DIR / "changelog.md"

# Pattern per rilevare l'inizio di un Atto nel documento
# Cerca linee come "ATTO I:", "ATTO III —", "ATTO VIII:", ecc.
ATTO_PATTERNS = [
    re.compile(r'^#\s+ATTO\s+(I{1,4}V?|V?I{0,3}|IX|X{1,3})\s*[:\-—]', re.IGNORECASE),
    re.compile(r'^ATTO\s+(I{1,4}V?|V?I{0,3}|IX|X{1,3})\s*[:\-—]', re.IGNORECASE),
    re.compile(r'^#+\s+ATTO\s+\w+', re.IGNORECASE),
]

# Mappa numeri romani → nomi file
ATTO_NAMES = {
    "I": "ATTO_I_II",          # I+II spesso uniti
    "II": "ATTO_I_II",
    "III": "ATTO_III_V32",
    "IV": "ATTO_IV_MIMS",
    "V": "ATTO_V_LAB_MATERIALI",
    "VI": "ATTO_VI_GENESIS",
    "VII": "ATTO_VII_VERDETTO",
    "VIII": "ATTO_VIII_MERCATO",
    "IX": "ATTO_IX_IP",
    "X": "ATTO_X_MEDIA",
    "XI": "ATTO_XI_XII_EPILOGO",
    "XII": "ATTO_XI_XII_EPILOGO",
}


# ============================================================
# FUNZIONI SPLIT
# ============================================================

def _detect_atto_start(line: str) -> str | None:
    """
    Rileva se una riga è l'inizio di un Atto.
    Ritorna il numero romano dell'Atto, oppure None.
    """
    for pattern in ATTO_PATTERNS:
        m = pattern.match(line.strip())
        if m:
            # Estrai il numero romano dal match
            roman = re.search(
                r'\b(I{1,4}V?|V?I{0,3}|IX|X{1,3})\b', line, re.IGNORECASE
            )
            if roman:
                return roman.group(1).upper()
    return None


def split(input_path: Path = None, verbose: bool = True):
    """
    Divide il documento ASSOLUTO in atti separati.

    Args:
        input_path : path del master (default: MASTER_PATH)
        verbose    : stampa progress
    """
    if input_path is None:
        input_path = MASTER_PATH

    if not input_path.exists():
        logger.error("File non trovato: %s — copia il tuo ASSOLUTO in: %s", input_path, MASTER_PATH)
        return False

    # Crea cartelle se non esistono
    ATTI_DIR.mkdir(parents=True, exist_ok=True)
    VERSIONS_DIR.mkdir(parents=True, exist_ok=True)

    # Archivia versione precedente del master
    _archive_master()

    # Leggi il master
    with open(input_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    if verbose:
        logger.info("Analisi: %s (%d righe)", input_path.name, len(lines))

    # ---- Parsing: suddividi in sezioni per Atto ----------------
    sections = {}          # {nome_file: [righe]}
    current_atto = "PROLOGO"
    current_lines = []
    atto_count = 0

    for line in lines:
        roman = _detect_atto_start(line)

        if roman and roman in ATTO_NAMES:
            # Salva sezione precedente
            if current_lines:
                fname = ATTO_NAMES.get(current_atto, f"ATTO_{current_atto}")
                if fname not in sections:
                    sections[fname] = []
                sections[fname].extend(current_lines)

            # Inizia nuova sezione
            current_atto = roman
            current_lines = [line]
            atto_count += 1
        else:
            current_lines.append(line)

    # Salva l'ultima sezione
    if current_lines:
        fname = ATTO_NAMES.get(current_atto, f"ATTO_{current_atto}")
        if fname not in sections:
            sections[fname] = []
        sections[fname].extend(current_lines)

    # ---- Scrittura file atti ------------------------------------
    if not sections:
        logger.warning("Nessun Atto rilevato — verificare formato master. Il doc deve contenere righe come: '# ATTO III: ...'")
        sections["ATTO_COMPLETO"] = lines

    saved = []
    for fname, content_lines in sections.items():
        if not content_lines:
            continue

        atto_path = ATTI_DIR / f"{fname}.md"
        with open(atto_path, "w", encoding="utf-8") as f:
            f.writelines(content_lines)

        saved.append(fname)
        if verbose:
            logger.info("✓ %s.md (%d righe)", fname, len(content_lines))

    # ---- Aggiorna changelog ASSOLUTO ---------------------------
    _write_assoluto_changelog(
        action="split",
        detail=f"Diviso in {len(saved)} atti: {', '.join(saved)}"
    )

    if verbose:
        logger.info("Completato: %d atti salvati in %s", len(saved), ATTI_DIR)

    return True


# ============================================================
# FUNZIONI COMPOSE
# ============================================================

def compose(output_path: Path = None, verbose: bool = True):
    """
    Ricompone i file atti in un unico master.

    Args:
        output_path : dove salvare il master (default: MASTER_PATH)
        verbose     : stampa progress
    """
    if output_path is None:
        output_path = MASTER_PATH

    if not ATTI_DIR.exists() or not any(ATTI_DIR.iterdir()):
        logger.error("Nessun atto trovato in %s", ATTI_DIR)
        return False

    # Ordine degli atti per composizione
    atto_order = [
        "ATTO_I_II",
        "ATTO_III_V32",
        "ATTO_IV_MIMS",
        "ATTO_V_LAB_MATERIALI",
        "ATTO_VI_GENESIS",
        "ATTO_VII_VERDETTO",
        "ATTO_VIII_MERCATO",
        "ATTO_IX_IP",
        "ATTO_X_MEDIA",
        "ATTO_XI_XII_EPILOGO",
    ]

    if verbose:
        logger.info("Composizione master: %s", output_path.name)

    composed_lines = []

    # Intestazione master
    composed_lines.append(
        f"# TITANIUM VENTURES — ASSOLUTO V6.0 MASTER\n"
        f"*Ricomposto automaticamente: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n\n"
    )

    included = []

    # Includi atti nell'ordine definito
    for fname in atto_order:
        atto_path = ATTI_DIR / f"{fname}.md"
        if atto_path.exists():
            with open(atto_path, "r", encoding="utf-8") as f:
                content = f.read()
            composed_lines.append(content)
            composed_lines.append("\n\n---\n\n")
            included.append(fname)
            if verbose:
                logger.info("✓ %s.md", fname)

    # Aggiungi eventuali atti non nell'ordine standard
    for atto_file in sorted(ATTI_DIR.glob("*.md")):
        fname = atto_file.stem
        if fname not in atto_order and fname not in included:
            with open(atto_file, "r", encoding="utf-8") as f:
                content = f.read()
            composed_lines.append(content)
            composed_lines.append("\n\n---\n\n")
            included.append(fname)
            if verbose:
                logger.info("✓ %s.md (extra)", fname)

    # Archivia versione precedente
    _archive_master()

    # Scrivi master
    with open(output_path, "w", encoding="utf-8") as f:
        f.writelines(composed_lines)

    _write_assoluto_changelog(
        action="compose",
        detail=f"Ricomposto da {len(included)} atti"
    )

    if verbose:
        total_lines = sum(len(l.split("\n")) for l in composed_lines)
        logger.info("Master salvato: %s (%d atti, ~%d righe)", output_path, len(included), total_lines)

    return True


# ============================================================
# ARCHIVIO VERSIONI
# ============================================================

def _archive_master():
    """Archivia il master corrente prima di sovrascriverlo."""
    if MASTER_PATH.exists():
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        archive_path = VERSIONS_DIR / f"V6_{ts}.md"
        VERSIONS_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copy2(str(MASTER_PATH), str(archive_path))


def _write_assoluto_changelog(action: str, detail: str):
    """Aggiorna il changelog interno di ASSOLUTO."""
    ASSOLUTO_DIR.mkdir(parents=True, exist_ok=True)

    entry = (
        f"- `{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}` "
        f"[{action.upper()}] {detail}\n"
    )

    if CHANGELOG_PATH.exists():
        with open(CHANGELOG_PATH, "a", encoding="utf-8") as f:
            f.write(entry)
    else:
        with open(CHANGELOG_PATH, "w", encoding="utf-8") as f:
            f.write("# ASSOLUTO — CHANGELOG\n\n")
            f.write(entry)


# ============================================================
# CLI
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="ASSOLUTO SPLITTER — Dividi e ricomponi il documento V6.0"
    )
    parser.add_argument(
        "action",
        choices=["split", "compose", "status"],
        help="split: divide in atti | compose: ricompone master | status: mostra stato"
    )
    parser.add_argument(
        "--input", "-i",
        type=Path,
        default=None,
        help=f"Path file input (default: {MASTER_PATH})"
    )
    parser.add_argument(
        "--output", "-o",
        type=Path,
        default=None,
        help=f"Path file output (default: {MASTER_PATH})"
    )

    args = parser.parse_args()

    if args.action == "split":
        split(input_path=args.input)

    elif args.action == "compose":
        compose(output_path=args.output)

    elif args.action == "status":
        logger.info("ASSOLUTO STATUS — master: %s [%s]",
                    MASTER_PATH, "✓" if MASTER_PATH.exists() else "✗")
        logger.info("Atti dir: %s", ATTI_DIR)
        if ATTI_DIR.exists():
            atti = list(ATTI_DIR.glob("*.md"))
            logger.info("Atti: %d", len(atti))
            for a in sorted(atti):
                lines = len(a.read_text(encoding="utf-8").split("\n"))
                logger.info("  - %s (%d righe)", a.name, lines)
        if VERSIONS_DIR.exists():
            versions = list(VERSIONS_DIR.glob("*.md"))
            logger.info("Versioni: %d", len(versions))


if __name__ == "__main__":
    main()
