"""
========================================================
TITANIUM_OS — PIPELINE DEPLOY "VIEW" (#25)
Modulo    : md_view_pipeline.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Converte file .md in payload JSON strutturato
            per il dashboard React (api_server.py).
            Ogni file diventa un endpoint:
            GET /api/view/<path_relativo>
            Genera anche un indice in DATA/view_index.json
            con tutti i .md disponibili come "view".
Input     : file_path (str) o --rebuild (tutti)
Output    : DATA/views/<path>.json (payload per React)
            DATA/view_index.json (indice completo)
Chiamato da: watcher.py (on_modified) — passivo
            o CLI per rebuild completo
========================================================
"""

import re
import sys
import json
import logging
import argparse
from pathlib import Path
from datetime import datetime

ROOT       = Path(__file__).resolve().parent.parent.parent
VIEWS_DIR  = ROOT / "DATA" / "views"
INDEX_PATH = ROOT / "DATA" / "view_index.json"
LOG_PATH   = ROOT / "DATA" / "logs" / "md_view_pipeline.log"

SKIP_DIRS = {"BACKUPS", "VERSIONS", "__pycache__", ".git", "node_modules", ".venv", "views"}

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [VIEW_PIPELINE] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("md_view_pipeline")


def _parse_frontmatter(lines: list[str]) -> dict:
    """Estrae frontmatter YAML semplice."""
    meta = {}
    if not lines or lines[0].strip() != "---":
        return meta
    for line in lines[1:]:
        if line.strip() == "---":
            break
        m = re.match(r'^([\w\-]+)\s*:\s*(.+)', line.strip())
        if m:
            key, val = m.group(1), m.group(2).strip().strip("'\"")
            meta[key] = val
    return meta


def _extract_sections(lines: list[str]) -> list[dict]:
    """
    Divide il contenuto in sezioni basate sugli heading.
    Ogni sezione: {"level": int, "title": str, "content": str}
    """
    sections = []
    current = {"level": 0, "title": "intro", "content": []}
    in_fm = False
    fm_done = False

    for line in lines:
        # Salta frontmatter
        if not fm_done:
            if line.strip() == "---":
                in_fm = not in_fm
                if not in_fm:
                    fm_done = True
                continue
            if in_fm:
                continue

        m = re.match(r'^(#{1,4})\s+(.+)', line)
        if m:
            # Salva sezione corrente se ha contenuto
            if current["content"]:
                current["content"] = "\n".join(current["content"]).strip()
                sections.append(current)
            current = {
                "level": len(m.group(1)),
                "title": m.group(2).strip(),
                "content": [],
            }
        else:
            current["content"].append(line)

    # Ultima sezione
    if current["content"]:
        current["content"] = "\n".join(current["content"]).strip()
        sections.append(current)

    return sections


def build_view(file_path: Path) -> dict:
    """
    Costruisce il payload JSON per il dashboard.
    Struttura: {meta, title, sections, raw, updated_at}
    """
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        return {"error": str(e)}

    lines = content.splitlines()
    meta  = _parse_frontmatter(lines)

    # Titolo: frontmatter o primo h1
    title = meta.get("titolo") or meta.get("title") or ""
    if not title:
        for line in lines:
            m = re.match(r'^#\s+(.+)', line)
            if m:
                title = m.group(1).strip()
                break
    if not title:
        title = file_path.stem

    sections = _extract_sections(lines)
    rel_path = str(file_path.relative_to(ROOT)).replace("\\", "/")

    return {
        "path":       rel_path,
        "title":      title,
        "meta":       meta,
        "sections":   sections,
        "word_count": len(re.findall(r'\b\w+\b', content)),
        "updated_at": datetime.fromtimestamp(file_path.stat().st_mtime).isoformat(),
        "built_at":   datetime.now().isoformat(),
    }


def deploy_view(file_path: Path):
    """Genera il .json di una singola view e aggiorna l'indice."""
    payload = build_view(file_path)
    rel_path = str(file_path.relative_to(ROOT)).replace("\\", "/")

    # Path di output: DATA/views/<percorso_relativo>.json
    out_path = VIEWS_DIR / (rel_path.replace("/", "__") + ".json")
    VIEWS_DIR.mkdir(parents=True, exist_ok=True)

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    _update_index(rel_path, payload["title"], payload["updated_at"])
    log.info(f"View deployata: {rel_path}")


def _update_index(rel_path: str, title: str, updated_at: str):
    """Aggiorna DATA/view_index.json con la entry del file."""
    if INDEX_PATH.exists():
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            index = json.load(f)
    else:
        index = {"views": {}}

    index["views"][rel_path] = {
        "title": title,
        "updated_at": updated_at,
        "endpoint": f"/api/view/{rel_path.replace('/', '__')}",
    }
    index["last_built"] = datetime.now().isoformat()
    index["total"] = len(index["views"])

    INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2, ensure_ascii=False)


def rebuild_all():
    """Ricostruisce tutte le view .md → .json."""
    count = 0
    for f in ROOT.rglob("*.md"):
        skip = any(p in SKIP_DIRS for p in f.relative_to(ROOT).parts)
        if not skip:
            deploy_view(f)
            count += 1
    log.info(f"Rebuild completo: {count} view generate. Indice: {INDEX_PATH}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MD → JSON view per dashboard React")
    parser.add_argument("--file",    type=str, help="File specifico")
    parser.add_argument("--rebuild", action="store_true", help="Ricostruisce tutto")
    args = parser.parse_args()

    if args.rebuild:
        rebuild_all()
    elif args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        deploy_view(path)
    else:
        parser.print_help()
