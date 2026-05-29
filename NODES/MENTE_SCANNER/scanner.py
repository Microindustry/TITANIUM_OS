# scanner.py | TITANIUM_OS / NODES / MENTE_SCANNER | v1.3 | 2026-05-29
# Legge MICROINDUSTRY\MENTE\ ricorsivamente (path dinamico via Path.home())
# Estrae: decisioni, spec tecniche, milestone, nomi personaggi
# Output: TITANIUM_OS\DATA\mente_digest.json

import os
import sys
import json
import re
import logging
from datetime import datetime
from pathlib import Path

# Fix encoding Windows console
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("scanner")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [scanner] %(levelname)s %(message)s")
    logger = logging.getLogger("scanner")

# ── CONFIG ────────────────────────────────────────────────────
MENTE_DIR  = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
OUTPUT_DIR = Path(__file__).resolve().parents[2] / "DATA"
OUTPUT_FILE = OUTPUT_DIR / "mente_digest.json"

# Keyword per estrazione contestuale
KEYWORDS = {
    "decisions": [
        r"DECISIONE[:\s](.+)",
        r"LOGICA[:\s](.+)",
        r"OBIETTIVO[:\s](.+)",
        r"TARGET[:\s](.+)",
        r"REGOLA[:\s](.+)",
        r"PRINCIPIO[:\s](.+)",
    ],
    "specs": [
        r"[\d]+\.[\d]+\s*mm",
        r"[\d]+\.[\d]+\s*Hz",
        r"[\d]+\.[\d]+\s*kW",
        r"€\s*[\d]+[\.,]?[\d]*",
        r"[\d]+\s*kg",
        r"[\d]+\s*RPM",
        r"[\d]+\s*bar",
        r"IT[34567]",
        r"f₀\s*=\s*[\d\.]+",
    ],
    "milestones": [
        r"(20[2-9][0-9])\s+Q[1-4]",
        r"(Luglio|Gennaio|Febbraio|Marzo|Aprile|Maggio|Giugno|Agosto|Settembre|Ottobre|Novembre|Dicembre)\s+20[2-9][0-9]",
        r"BEP[:\s]+(.+)",
        r"ROI[:\s]+(.+)",
    ],
    "personaggi": [
        r"\b(THEMIS|EVA|AVA|ARIA|NEXUS|TESLA|FORGE)\b",
        r"\b(V32|MIMS|GENESIS|ASSOLUTO)\b",
    ],
}

# ── ESTRAZIONE TESTO ──────────────────────────────────────────

def extract_pdf(path: Path) -> str:
    """Estrae testo da PDF con pdfplumber."""
    try:
        import pdfplumber
        text_parts = []
        with pdfplumber.open(str(path)) as pdf:
            for page in pdf.pages:
                t = page.extract_text()
                if t:
                    text_parts.append(t)
        return "\n".join(text_parts)
    except ImportError:
        return f"[ERRORE: pdfplumber non installato — pip install pdfplumber]"
    except Exception as e:
        return f"[ERRORE PDF: {e}]"


def extract_docx(path: Path) -> str:
    """Estrae testo da .docx con python-docx."""
    try:
        from docx import Document
        doc = Document(str(path))
        return "\n".join(p.text for p in doc.paragraphs if p.text.strip())
    except ImportError:
        return f"[ERRORE: python-docx non installato — pip install python-docx]"
    except Exception as e:
        return f"[ERRORE DOCX: {e}]"


def extract_txt(path: Path) -> str:
    """Legge file .txt."""
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        return f"[ERRORE TXT: {e}]"


def extract_text(path: Path) -> tuple[str, bool]:
    """Dispatch per tipo file. Ritorna (testo, readable)."""
    ext = path.suffix.lower()
    if ext == ".pdf":
        return extract_pdf(path), True
    elif ext == ".docx":
        return extract_docx(path), True
    elif ext == ".txt":
        return extract_txt(path), True
    else:
        return "", False  # STL, shapr, html — solo presenza


# ── ANALISI TESTO ─────────────────────────────────────────────

def analyze_text(text: str) -> dict:
    """Applica keyword matching al testo estratto."""
    results = {k: [] for k in KEYWORDS}
    lines = text.split("\n")

    for line in lines:
        line = line.strip()
        if not line or len(line) < 5:
            continue
        for category, patterns in KEYWORDS.items():
            for pattern in patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                for m in matches:
                    entry = m.strip() if isinstance(m, str) else line[:120]
                    if entry and entry not in results[category]:
                        results[category].append(entry[:150])  # cap length

    # Deduplica e limita per categoria
    for k in results:
        results[k] = list(dict.fromkeys(results[k]))[:25]  # max 25 per categoria

    return results


# ── SCAN PRINCIPALE ───────────────────────────────────────────

def scan() -> dict:
    """Scansiona MENTE_DIR e produce il digest."""
    files_data = []
    total_decisions, total_specs, total_milestones = 0, 0, 0
    files_read, files_skipped = 0, 0

    logger.info("MENTE_SCANNER avvio — fonte: %s", MENTE_DIR)
    logger.info("Output: %s", OUTPUT_FILE)

    for path in sorted(MENTE_DIR.rglob("*")):
        if not path.is_file():
            continue

        rel = path.relative_to(MENTE_DIR)
        ext = path.suffix.lower()
        size_kb = round(path.stat().st_size / 1024, 1)

        text, readable = extract_text(path)

        entry: dict = {
            "path": str(rel),
            "type": ext.lstrip(".") or "unknown",
            "size_kb": size_kb,
            "readable": readable,
        }

        if readable and text and not text.startswith("[ERRORE"):
            extracts = analyze_text(text)
            entry["extracts"] = extracts
            entry["text_len"] = len(text)

            nd = len(extracts["decisions"])
            ns = len(extracts["specs"])
            nm = len(extracts["milestones"])
            total_decisions += nd
            total_specs     += ns
            total_milestones += nm
            files_read += 1

            if (nd + ns + nm) > 0:
                logger.debug("✓ %s — d:%d s:%d m:%d", rel, nd, ns, nm)
            else:
                logger.debug("○ %s", rel)
        else:
            entry["extracts"] = {}
            files_skipped += 1
            logger.debug("· %s [%s] — skip", rel, ext or "no-ext")

        files_data.append(entry)

    digest = {
        "scanned_at": datetime.now().isoformat(),
        "source_dir": str(MENTE_DIR),
        "output_file": str(OUTPUT_FILE),
        "total_files": len(files_data),
        "files_read": files_read,
        "files_skipped": files_skipped,
        "global_summary": {
            "total_decisions": total_decisions,
            "total_specs":     total_specs,
            "total_milestones": total_milestones,
            "total_extractions": total_decisions + total_specs + total_milestones,
        },
        "by_file": files_data,
    }

    logger.info("Scan completato — file:%d letti:%d saltati:%d | d:%d s:%d m:%d",
                len(files_data), files_read, files_skipped,
                total_decisions, total_specs, total_milestones)

    return digest


# ── ENTRY POINT ───────────────────────────────────────────────

if __name__ == "__main__":
    if not MENTE_DIR.exists():
        logger.error("Cartella non trovata: %s", MENTE_DIR)
        exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    digest = scan()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(digest, f, ensure_ascii=False, indent=2)

    logger.info("Digest salvato: %s (%d estrazioni)",
                OUTPUT_FILE, digest["global_summary"]["total_extractions"])
