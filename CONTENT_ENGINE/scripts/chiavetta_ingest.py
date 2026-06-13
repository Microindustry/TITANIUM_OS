# chiavetta_ingest.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-12
# Rende ATTIVI i documenti utili della chiavetta/Desktop: li estrae in testo, li mappa
# per dominio e li scrive in MENTE/<dominio>/da_chiavetta/ -> il RAG li indicizza.
# Cosi la conoscenza ferma su disco (Vita Natura/EVA, MIMS, ASSOLUTO, MIA MENTE) entra
# nel cervello del sistema invece di restare un mucchio di file morti.
#
# SICURO: legge dalla sorgente, scrive SOLO in MENTE/. Non sposta/cancella nulla sulla
# chiavetta. ESCLUDE segreti (credenziali, .env, .key, mail) e dump di codice (node_modules).
# Idempotente: rigenera le note ad ogni run.

import os
import re
import sys
import zipfile
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
# Inbox per STATO (non per provenienza): i nuovi import atterrano qui, poi
# riordina_mente.py li smista nelle cartelle tematiche. Niente "da_chiavetta".
SUBDIR = "_DA_ORDINARE"

# sorgenti possibili (la prima che esiste vince); override con argv[1]
DEFAULT_SOURCES = [r"G:\\", r"C:\Users\teo\Desktop\chiavetta"]

DOC_EXT = {".pdf", ".md", ".txt", ".json", ".csv", ".markdown", ".docx"}
# WHITELIST: solo le cartelle CURATE di Matteo (conoscenza vera). Esclude i backup del
# repo/sistema (TITANIUM_OS*, SINAPSI, CONTENT_ENGINE, AI_Dashboard) che sono codice o
# gia' nel sistema vivo -> niente duplicati ne' spazzatura di terze parti nel RAG.
INCLUDE_TOP = {"mari doc", "vita natura", "50", "la mia mente", "nuova cartella", "pedana"}
EXCLUDE_PATH = re.compile(r"node_modules|[\\/]dist[\\/]|[\\/]\.git[\\/]|[\\/]build[\\/]|"
                          r"site-packages|__pycache__|[\\/]\.next[\\/]|[\\/]\.cache", re.IGNORECASE)
# nomi-spazzatura: file con nome hash (cache/export di tool), non conoscenza
JUNK_NAME = re.compile(r"^[0-9a-f]{8,}$|^\d{4,}$", re.IGNORECASE)
# file di progetto-codice (config/lock/manifest): non conoscenza, inquinano il RAG
JUNK_STEM = {"package", "package-lock", "package_lock", "tsconfig", "jsconfig",
             "settings_local", "settings.local", "launch", "readme", "eslintrc",
             ".eslintrc", "prettierrc", "vite.config", "tailwind.config",
             "postcss.config", "components", "index", "license", "changelog",
             "manifest", "robots", "sitemap", "yarn", "pnpm-lock"}
# SEGRETI / PII: mai nel RAG (regola 8)
SECRET = re.compile(r"credenzial|password|secret|token|[\\/]\.env|\.key$|\.pem$|becap|gmail|"
                    r"backup", re.IGNORECASE)
MAX_BYTES = 4_000_000

# dominio MENTE da parole nel path (ordine = priorita')
DOMAIN_RULES = [
    ("VITA_NATURA", re.compile(r"mari doc|vita.?natura|estetic", re.IGNORECASE)),
    ("MIMS",        re.compile(r"[\\/]50[\\/]|modul|mims|prototip|disegno|piastra|gancio|staffa", re.IGNORECASE)),
    ("V32",         re.compile(r"\bv32\b|epoxy|granite|cnc|mandrino|lista cnc", re.IGNORECASE)),
    ("ASSOLUTO",    re.compile(r"assoluto|\batti\b|atti_", re.IGNORECASE)),
]
DEFAULT_DOMAIN = "KNOWLEDGE"


def slug(s: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "_", s).strip("_").lower()
    return s[:60] or "doc"


def pick_domain(path: Path) -> str:
    full = str(path)
    for dom, rx in DOMAIN_RULES:
        if rx.search(full):
            return dom
    return DEFAULT_DOMAIN


def extract_text(p: Path) -> str:
    ext = p.suffix.lower()
    try:
        if ext in (".md", ".txt", ".markdown", ".csv", ".json"):
            return p.read_text(encoding="utf-8", errors="replace")
        if ext == ".pdf":
            import pdfplumber
            out = []
            with pdfplumber.open(str(p)) as pdf:
                for page in pdf.pages[:30]:
                    out.append(page.extract_text() or "")
            return "\n".join(out)
        if ext == ".docx":
            # docx = zip di XML; estrai il testo da word/document.xml senza dipendenze
            with zipfile.ZipFile(str(p)) as z:
                xml = z.read("word/document.xml").decode("utf-8", errors="replace")
            xml = re.sub(r"</w:p>", "\n", xml)
            return re.sub(r"<[^>]+>", "", xml)
    except Exception as e:
        return f"[estrazione fallita: {e}]"
    return ""


def main() -> int:
    sources = [sys.argv[1]] if len(sys.argv) > 1 else DEFAULT_SOURCES
    src = next((Path(s) for s in sources if Path(s).exists()), None)
    if not src:
        print(f"[ingest] nessuna sorgente trovata tra {sources}")
        return 1
    print(f"[ingest] sorgente: {src}\n" + "=" * 60)

    stats, skipped_secret = {}, 0
    for p in src.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in DOC_EXT:
            continue
        try:
            top = p.relative_to(src).parts[0].lower()
        except (ValueError, IndexError):
            continue
        if top not in INCLUDE_TOP:        # solo cartelle curate (whitelist)
            continue
        if EXCLUDE_PATH.search(str(p)) or p.stat().st_size > MAX_BYTES:
            continue
        if JUNK_NAME.match(p.stem) or p.stem.lower() in JUNK_STEM:
            continue                       # nome-hash o file di progetto-codice
        if SECRET.search(str(p)):
            skipped_secret += 1
            continue
        text = extract_text(p).strip()
        if len(text) < 80:            # poco testo (es. PDF solo-disegno): salta, sarebbe rumore
            continue
        domain = pick_domain(p)
        out_dir = MENTE / domain / SUBDIR
        out_dir.mkdir(parents=True, exist_ok=True)
        rel = p.relative_to(src)
        fpath = out_dir / f"{slug(p.stem)}.md"
        header = (f"---\nsource: \"chiavetta\"\ndomain: \"{domain}\"\n"
                  f"original_path: \"{rel}\"\ndate_ingested: \"{datetime.now():%Y-%m-%d}\"\n---\n\n"
                  f"# {p.stem}\n\n")
        fpath.write_text(header + text, encoding="utf-8")
        stats[domain] = stats.get(domain, 0) + 1

    for dom in sorted(stats):
        print(f"  {dom:12} {stats[dom]:3} documenti -> MENTE/{dom}/{SUBDIR}/")
    print(f"\n  totale: {sum(stats.values())} documenti attivati · {skipped_secret} segreti esclusi.")
    print("  prossimo: rag-update li indicizza.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
