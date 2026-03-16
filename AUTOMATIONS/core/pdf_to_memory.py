# pdf_to_memory.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-03-10
# Modulo: Conversore PDF → Memoria Ecosystem
# Parte di: GENESIS / AUTOMATIONS
# Input:  TITANIUM_OS/PDF_DROP/*.pdf  (drag & drop)
# Output: BRAIN/KNOWLEDGE/ (informazioni) | BRAIN/ASSOLUTO/ (atti formali)
#
# USO:
#   python pdf_to_memory.py           <- processa tutti i PDF in PDF_DROP ora
#   python pdf_to_memory.py --watch   <- modalità watch (gira in background)

import sys
import os
import json
import re
import shutil
from pathlib import Path
from datetime import datetime

# Fix encoding su Windows console
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

try:
    import pdfplumber
except ImportError:
    print("[ERROR] pdfplumber non installato.")
    print("        Esegui: pip install pdfplumber")
    sys.exit(1)

# ── CONFIG ────────────────────────────────────────────────────────────────────
ROOT        = Path(__file__).resolve().parents[2]   # TITANIUM_OS/
PDF_DROP    = ROOT / "PDF_DROP"
PROCESSED   = PDF_DROP / "_PROCESSED"
ERRORS      = PDF_DROP / "_ERRORS"
KNOWLEDGE   = ROOT / "BRAIN" / "KNOWLEDGE"
ASSOLUTO    = ROOT / "BRAIN" / "ASSOLUTO"
VERSIONS_DB = ROOT / "DATA" / "pdf_versions.json"

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
    print(f"\n[PDF] Processo: {pdf_path.name}")

    try:
        # ── 1. ESTRAZIONE TESTO ───────────────────────────────────────────────
        pages_text = []
        with pdfplumber.open(pdf_path) as pdf:
            n_pages = len(pdf.pages)
            for i, page in enumerate(pdf.pages):
                raw = page.extract_text() or ""
                # Estrae anche tabelle se presenti
                tables = page.extract_tables()
                table_md = ""
                for table in tables:
                    if table:
                        rows = [" | ".join(str(c or "") for c in row) for row in table if row]
                        table_md += "\n\n**[TABELLA]**\n" + "\n".join(rows)
                pages_text.append(f"## Pagina {i+1}\n\n{raw.strip()}{table_md}")

        full_text = "\n\n---\n\n".join(pages_text)

        # PDF scansionato (immagine): testo vuoto
        if not full_text.strip():
            print(f"[WARN] Testo vuoto — probabilmente PDF scansionato: {pdf_path.name}")
            print(f"       Spostato in _ERRORS per revisione manuale.")
            shutil.move(str(pdf_path), str(ERRORS / pdf_path.name))
            return False

        # ── 2. CLASSIFICAZIONE ────────────────────────────────────────────────
        doc_type = classify(full_text)
        output_dir = ASSOLUTO if doc_type == "ATTO" else KNOWLEDGE
        print(f"[CLASS] Tipo: {doc_type} → cartella: BRAIN/{output_dir.name}/")

        # ── 3. VERSIONING ─────────────────────────────────────────────────────
        db = load_versions_db()
        base_key = extract_base_key(pdf_path.stem)
        existing_key = find_similar_key(base_key, db)

        if existing_key:
            # Documento già noto → incrementa versione
            prev_data = db[existing_key]
            version_num = prev_data["version"] + 1
            prev_file   = prev_data["current_file"]
            print(f"[VER]  Versione precedente trovata: v{prev_data['version']} ({prev_file})")
            print(f"[VER]  Questa sarà v{version_num}")
        else:
            # Documento nuovo
            version_num = 1
            prev_file   = None
            existing_key = base_key
            print(f"[VER]  Nuovo documento, assegno v1")

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

        print(f"[OK]   Scritto: {out_path.relative_to(ROOT)}")

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
        print(f"[DONE] PDF archiviato → _PROCESSED/{dest_name}")

        return True

    except Exception as e:
        print(f"[ERROR] {pdf_path.name}: {e}")
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
        print("[INFO] Nessun PDF trovato in PDF_DROP/ — trascina i file qui.")
        return
    print(f"[SCAN] {len(pdfs)} PDF trovati. Inizio elaborazione...\n")
    ok  = sum(1 for p in pdfs if process_pdf(p))
    err = len(pdfs) - ok
    print(f"\n{'='*50}")
    print(f"[FINE] OK: {ok}  |  ERRORI: {err}  |  TOTALE: {len(pdfs)}")
    if err:
        print(f"       File con errori → PDF_DROP/_ERRORS/")

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
        print("[ERROR] watchdog non installato. Esegui: pip install watchdog")
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

    print(f"[WATCH] Monitorando: {PDF_DROP}")
    print(f"        Trascina qualsiasi PDF nella cartella — processo automatico.")
    print(f"        Premi Ctrl+C per fermare.\n")
    try:
        import time
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[WATCH] Fermato.")
        observer.stop()
    observer.join()

# ── MAIN ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    # Crea tutte le cartelle necessarie se non esistono
    for d in [PDF_DROP, PROCESSED, ERRORS, KNOWLEDGE]:
        d.mkdir(parents=True, exist_ok=True)

    if "--watch" in sys.argv:
        watch_mode()
    else:
        scan_drop_folder()
