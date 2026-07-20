# pdf_to_memory.py | TITANIUM_OS / AUTOMATIONS / core | v1.2 | 2026-07-20
# Modulo: Conversore PDF → Memoria Ecosystem
# Parte di: GENESIS / AUTOMATIONS
# Input:  TITANIUM_OS/PDF_DROP/*.pdf  (drag & drop) | oppure --file <path>
# Output: BRAIN/KNOWLEDGE/ | BRAIN/ASSOLUTO/ | oppure --mente <subdir> → MICROINDUSTRY/MENTE/<subdir>/
#
# USO:
#   python pdf_to_memory.py                          <- processa tutti i PDF in PDF_DROP ora
#   python pdf_to_memory.py --watch                  <- modalità watch (gira in background)
#   python pdf_to_memory.py --file doc.pdf           <- file specifico → PDF_DROP pipeline
#   python pdf_to_memory.py --file doc.pdf --mente V32 --keep --rag  <- → MENTE/V32/, no spostamento, rag-rebuild

import sys
import os
import json
import re
import shutil
import logging
from pathlib import Path
from datetime import datetime

# Fix encoding su Windows console
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

_ROOT_PTM = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT_PTM))
try:
    from CORE.log import get_logger
    logger = get_logger("pdf_to_memory")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [pdf_to_memory] %(levelname)s %(message)s")
    logger = logging.getLogger("pdf_to_memory")

try:
    import pdfplumber
except ImportError:
    logger.error("pdfplumber non installato — esegui: pip install pdfplumber")
    sys.exit(1)

# Docling opzionale (venv dedicato ~/.venvs/docling, torch ISOLATO dal RAG): estrazione PDF
# strutturata (heading/tabelle/OCR). Se manca -> fallback pdfplumber (mai bloccante).
try:
    from AUTOMATIONS.core import docling_extract as _docling
except Exception:
    _docling = None

# Motore di estrazione: auto (Docling se c'e', poi pdfplumber) | docling | pdfplumber.
# Override via env PDF_ENGINE o flag --engine.
ENGINE = os.environ.get("PDF_ENGINE", "auto")

# ── CONFIG ────────────────────────────────────────────────────────────────────
ROOT        = Path(__file__).resolve().parents[2]   # TITANIUM_OS/
PDF_DROP    = ROOT / "PDF_DROP"
PROCESSED   = PDF_DROP / "_PROCESSED"
ERRORS      = PDF_DROP / "_ERRORS"
KNOWLEDGE   = ROOT / "BRAIN" / "KNOWLEDGE"
ASSOLUTO    = ROOT / "BRAIN" / "ASSOLUTO"
VERSIONS_DB = ROOT / "DATA" / "pdf_versions.json"
MENTE_ROOT  = Path(os.environ.get("MENTE_DIR",
              str(Path.home() / "MICROINDUSTRY" / "MENTE")))

# Keywords per riconoscere ATTI FORMALI (doc legali/burocratici/contrattuali)
ATTO_KEYWORDS = [
    "delibera", "decreto", "atto n.", "contratto", "verbale",
    "certificato", "fattura", "ricevuta", "autorizzazione",
    "ordinanza", "circolare", "normativa", "regolamento",
    "art.", "comma ", "legge n.", "d.lgs", "d.p.r.", "allegato",
    "sentenza", "provvedimento", "disposizione", "dichiarazione",
    "omologazione", "collaudo", "scheda tecnica ufficiale",
]

# ── DB VERSIONI ───────────────────────────────────────────────────────────────
def load_versions_db() -> dict:
    """Carica il database delle versioni documenti."""
    if VERSIONS_DB.exists():
        with open(VERSIONS_DB, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_versions_db(db: dict):
    """Salva il database delle versioni."""
    with open(VERSIONS_DB, "w", encoding="utf-8") as f:
        json.dump(db, f, indent=2, ensure_ascii=False)

# ── CLASSIFICAZIONE ───────────────────────────────────────────────────────────
def classify(text: str) -> str:
    """
    Restituisce 'ATTO' se il testo contiene ≥2 keyword burocratiche/legali.
    Altrimenti restituisce 'INFO' (conoscenza generale).
    """
    text_lower = text.lower()
    score = sum(1 for kw in ATTO_KEYWORDS if kw in text_lower)
    return "ATTO" if score >= 2 else "INFO"

# ── VERSIONING ────────────────────────────────────────────────────────────────
def clean_filename(name: str) -> str:
    """Rimuove caratteri non validi per filesystem Windows."""
    name = re.sub(r'[<>:"/\\|?*]', '_', name)
    name = re.sub(r'\s+', '_', name.strip())
    return name[:80]

def extract_base_key(filename: str) -> str:
    """
    Estrae il nome base del documento rimuovendo date e numeri versione.
    Es: "Manuale_CNC_v2.pdf" → "manuale_cnc"
        "Report_2026-03-10.pdf" → "report"
    """
    stem = Path(filename).stem
    stem = re.sub(r'[_\-]v\d+\b', '', stem, flags=re.IGNORECASE)      # _v1, _v2
    stem = re.sub(r'[_\-]\d{4}[\-_]\d{2}[\-_]\d{2}', '', stem)         # _2026-03-10
    stem = re.sub(r'[_\-]\d{8}\b', '', stem)                             # _20260310
    stem = re.sub(r'[_\-\s]+$', '', stem)                                # trailing separators
    return stem.lower().strip()

def find_similar_key(base_key: str, db: dict) -> str | None:
    """
    Cerca nel DB un documento con nome simile (≥70% parole in comune).
    Gestisce il caso in cui lo stesso doc viene rinominato leggermente.
    """
    if base_key in db:
        return base_key
    base_words = set(re.split(r'[_\-\s]+', base_key))
    for key in db:
        key_words = set(re.split(r'[_\-\s]+', key))
        union = len(key_words | base_words)
        if union > 0 and len(key_words & base_words) / union >= 0.7:
            return key
    return None

# ── ESTRAZIONE (Docling con fallback pdfplumber) ──────────────────────────────
def _pdfplumber_fulltext(pdf_path: Path) -> tuple[str, int]:
    """Estrazione base pdfplumber: testo per pagina + tabelle grezze. (full_text, n_pagine)."""
    pages_text = []
    with pdfplumber.open(pdf_path) as pdf:
        n_pages = len(pdf.pages)
        for i, page in enumerate(pdf.pages):
            raw = page.extract_text() or ""
            tables = page.extract_tables()
            table_md = ""
            for table in tables:
                if table:
                    rows = [" | ".join(str(c or "") for c in row) for row in table if row]
                    table_md += "\n\n**[TABELLA]**\n" + "\n".join(rows)
            pages_text.append(f"## Pagina {i+1}\n\n{raw.strip()}{table_md}")
    return "\n\n---\n\n".join(pages_text), n_pages


def _extract_fulltext(pdf_path: Path, engine: str = None) -> tuple[str, int]:
    """(markdown, n_pagine). engine: auto|docling|pdfplumber (default = ENGINE globale).
    Docling da' markdown STRUTTURATO (heading/tabelle/OCR) -> chunk RAG migliori; fallback
    SEMPRE garantito su pdfplumber (il PDF non resta mai non-processato)."""
    engine = engine or ENGINE
    if engine in ("auto", "docling") and _docling is not None and _docling.is_available():
        res = _docling.extract(pdf_path)
        if res and res[0].strip():
            logger.info("Estrazione: Docling (%d pagine)", res[1])
            return res
        if engine == "docling":
            logger.warning("Docling non ha estratto nulla da %s -> fallback pdfplumber", pdf_path.name)
    return _pdfplumber_fulltext(pdf_path)


# ── CORE: PROCESSA UN PDF ─────────────────────────────────────────────────────
def process_pdf(pdf_path: Path) -> bool:
    """
    Pipeline completa per un singolo PDF:
    1. Estrae testo con pdfplumber
    2. Classifica ATTO / INFO
    3. Controlla se esiste una versione precedente
    4. Scrive .md nella cartella giusta (ASSOLUTO o KNOWLEDGE)
    5. Aggiorna il database versioni
    6. Sposta il PDF originale in _PROCESSED (o _ERRORS se fallisce)

    Restituisce True se ok, False se errore.
    """
    logger.info("Processo: %s", pdf_path.name)

    try:
        # ── 1. ESTRAZIONE TESTO (Docling con fallback pdfplumber) ─────────────
        full_text, n_pages = _extract_fulltext(pdf_path)

        # PDF scansionato (immagine): testo vuoto
        if not full_text.strip():
            logger.warning("Testo vuoto — PDF scansionato: %s — spostato in _ERRORS", pdf_path.name)
            shutil.move(str(pdf_path), str(ERRORS / pdf_path.name))
            return False

        # ── 2. CLASSIFICAZIONE ────────────────────────────────────────────────
        doc_type = classify(full_text)
        output_dir = ASSOLUTO if doc_type == "ATTO" else KNOWLEDGE
        logger.info("Tipo: %s → BRAIN/%s/", doc_type, output_dir.name)

        # ── 3. VERSIONING ─────────────────────────────────────────────────────
        db = load_versions_db()
        base_key = extract_base_key(pdf_path.stem)
        existing_key = find_similar_key(base_key, db)

        if existing_key:
            # Documento già noto → incrementa versione
            prev_data = db[existing_key]
            version_num = prev_data["version"] + 1
            prev_file   = prev_data["current_file"]
            logger.info("Versione precedente: v%d (%s) → questa v%d", prev_data["version"], prev_file, version_num)
        else:
            # Documento nuovo
            version_num = 1
            prev_file   = None
            existing_key = base_key
            logger.info("Nuovo documento, assegno v1")

        timestamp = datetime.now().strftime("%Y-%m-%d")
        out_name  = f"{clean_filename(pdf_path.stem)}_v{version_num}.md"
        out_path  = output_dir / out_name

        # ── 4. SCRITTURA MARKDOWN ─────────────────────────────────────────────
        version_banner = ""
        if prev_file:
            version_banner = (
                f"> **AGGIORNAMENTO v{version_num}** — "
                f"Sostituisce `{prev_file}` (data: {timestamp})\n"
                f"> Versione precedente conservata in `_PROCESSED/`\n\n"
            )

        frontmatter = f"""---
source: {pdf_path.name}
type: {doc_type}
version: {version_num}
date: {timestamp}
pages: {n_pages}
previous_version: {prev_file or "nessuna"}
processed_by: pdf_to_memory.py v1.0
---

"""
        content = (
            frontmatter
            + version_banner
            + f"# {pdf_path.stem}\n\n"
            + full_text
        )

        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)

        logger.info("Scritto: %s", out_path.relative_to(ROOT))

        # ── 5. AGGIORNA DATABASE VERSIONI ─────────────────────────────────────
        history = db.get(existing_key, {}).get("history", [])
        history.append({
            "version": version_num,
            "file":    str(out_path.relative_to(ROOT)),
            "date":    timestamp,
            "source":  pdf_path.name,
        })
        db[existing_key] = {
            "version":      version_num,
            "current_file": str(out_path.relative_to(ROOT)),
            "type":         doc_type,
            "source_pdf":   pdf_path.name,
            "updated":      timestamp,
            "history":      history,
        }
        save_versions_db(db)

        # ── 6. SPOSTA PDF IN _PROCESSED ───────────────────────────────────────
        dest_name = f"{clean_filename(pdf_path.stem)}_v{version_num}_{timestamp}{pdf_path.suffix}"
        shutil.move(str(pdf_path), str(PROCESSED / dest_name))
        logger.info("PDF archiviato → _PROCESSED/%s", dest_name)

        return True

    except Exception as e:
        logger.error("%s: %s", pdf_path.name, e)
        try:
            shutil.move(str(pdf_path), str(ERRORS / pdf_path.name))
        except Exception:
            pass
        return False

# ── SCAN: processa tutto ciò che è in PDF_DROP adesso ─────────────────────────
def scan_drop_folder():
    """Processa tutti i PDF presenti in PDF_DROP in questo momento."""
    pdfs = sorted(PDF_DROP.glob("*.pdf")) + sorted(PDF_DROP.glob("*.PDF"))
    if not pdfs:
        logger.info("Nessun PDF trovato in PDF_DROP/ — trascina i file qui.")
        return
    logger.info("%d PDF trovati. Inizio elaborazione...", len(pdfs))
    ok  = sum(1 for p in pdfs if process_pdf(p))
    err = len(pdfs) - ok
    if err:
        logger.warning("OK: %d | ERRORI: %d | TOTALE: %d — file con errori → PDF_DROP/_ERRORS/", ok, err, len(pdfs))
    else:
        logger.info("OK: %d | TOTALE: %d", ok, len(pdfs))

# ── WATCH: monitora PDF_DROP continuamente ────────────────────────────────────
def watch_mode():
    """
    Modalità watch: gira in background e processa ogni PDF
    non appena viene trascinato nella cartella PDF_DROP.
    Avvia con: python pdf_to_memory.py --watch
    """
    try:
        from watchdog.observers import Observer
        from watchdog.events import FileSystemEventHandler
    except ImportError:
        logger.error("watchdog non installato — esegui: pip install watchdog")
        sys.exit(1)

    class PDFHandler(FileSystemEventHandler):
        def on_created(self, event):
            if event.is_directory:
                return
            path = Path(event.src_path)
            # Solo PDF nella root di PDF_DROP (non nelle sottocartelle)
            if path.suffix.lower() == ".pdf" and path.parent == PDF_DROP:
                import time
                time.sleep(0.8)          # attende che il file sia scritto completamente
                process_pdf(path)

    observer = Observer()
    observer.schedule(PDFHandler(), str(PDF_DROP), recursive=False)
    observer.start()

    logger.info("Watch attivo: %s — trascina PDF per processo automatico. Ctrl+C per fermare.", PDF_DROP)
    try:
        import time
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Watch fermato.")
        observer.stop()
    observer.join()

# ── MENTE OUTPUT ──────────────────────────────────────────────────────────────
def process_pdf_to_mente(pdf_path: Path, mente_subdir: str, keep: bool = True) -> bool:
    """
    Variante MENTE: estrae testo PDF e scrive .md in MENTE_ROOT/<mente_subdir>/.
    Non sposta il PDF originale per default (keep=True).
    """
    logger.info("%s → MENTE/%s/", pdf_path.name, mente_subdir)
    out_dir = MENTE_ROOT / mente_subdir
    out_dir.mkdir(parents=True, exist_ok=True)

    try:
        full_text, n_pages = _extract_fulltext(pdf_path)
        if not full_text.strip():
            logger.warning("PDF scansionato (nessun testo estraibile): %s", pdf_path.name)
            return False

        timestamp = datetime.now().strftime("%Y-%m-%d")
        out_name  = f"{clean_filename(pdf_path.stem)}.md"
        out_path  = out_dir / out_name

        frontmatter = f"""---
source: {pdf_path.name}
mente_subdir: {mente_subdir}
date_processed: {timestamp}
pages: {n_pages}
processed_by: pdf_to_memory.py v1.1
---

"""
        content = frontmatter + f"# {pdf_path.stem}\n\n" + full_text
        out_path.write_text(content, encoding="utf-8")
        logger.info("Scritto: %s (%d pagine)", out_path, n_pages)

        if not keep:
            dest = PROCESSED / f"{clean_filename(pdf_path.stem)}_{timestamp}{pdf_path.suffix}"
            PROCESSED.mkdir(parents=True, exist_ok=True)
            shutil.move(str(pdf_path), str(dest))
            logger.info("PDF archiviato → %s", dest.name)

        return True

    except Exception as e:
        logger.error("%s: %s", pdf_path.name, e)
        return False


def run_rag_rebuild():
    """Triggera rag-rebuild dopo ingestione PDF."""
    rag_engine = ROOT / "NODES" / "RAG_ENGINE" / "rag_engine.py"
    if not rag_engine.exists():
        # Prova path alternativo
        rag_engine = ROOT / "AUTOMATIONS" / "core" / "rag_engine.py"
    if not rag_engine.exists():
        logger.warning("rag_engine.py non trovato — rag-rebuild saltato.")
        return
    logger.info("Avvio rag-rebuild...")
    import subprocess
    result = subprocess.run(
        [sys.executable, str(rag_engine), "--rebuild"],
        capture_output=True, text=True, timeout=120
    )
    if result.returncode == 0:
        logger.info("RAG rebuild completato.")
    else:
        logger.error("RAG rebuild errore: %s", result.stderr[-300:])


# ── MAIN ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="PDF → TITANIUM_OS Memory")
    parser.add_argument("--file",  type=str, default=None, help="Processa file PDF specifico")
    parser.add_argument("--mente", type=str, default=None, help="Output a MENTE/<subdir>/ invece di BRAIN/")
    parser.add_argument("--keep",  action="store_true",    help="Non spostare il PDF originale")
    parser.add_argument("--rag",   action="store_true",    help="Esegui rag-rebuild dopo ingestione")
    parser.add_argument("--watch", action="store_true",    help="Modalità watch su PDF_DROP")
    parser.add_argument("--engine", choices=["auto", "docling", "pdfplumber"], default=None,
                        help="Motore estrazione (default: auto -> Docling se disponibile)")
    args = parser.parse_args()
    if args.engine:
        ENGINE = args.engine

    for d in [PDF_DROP, PROCESSED, ERRORS, KNOWLEDGE]:
        d.mkdir(parents=True, exist_ok=True)

    if args.watch:
        watch_mode()
    elif args.file:
        pdf_path = Path(args.file).resolve()
        if not pdf_path.exists():
            logger.error("File non trovato: %s", pdf_path)
            sys.exit(1)
        if args.mente:
            ok = process_pdf_to_mente(pdf_path, args.mente, keep=args.keep)
        else:
            ok = process_pdf(pdf_path)
        if ok and args.rag:
            run_rag_rebuild()
    else:
        scan_drop_folder()
        if args.rag:
            run_rag_rebuild()
