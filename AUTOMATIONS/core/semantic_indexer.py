"""
========================================================
TITANIUM_OS — INDICIZZAZIONE SEMANTICA (#20)
Modulo    : semantic_indexer.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Ad ogni salvataggio di un .md, estrae tag
            semantici (dal frontmatter e dal contenuto)
            e li persiste in un database SQLite.
            Espone query per trovare file per tag, tema,
            data o parola chiave.
Input     : file_path (str) — path del file da indicizzare
Output    : DATA/semantic_index.db (SQLite)
Chiamato da: watcher.py (on_modified/on_created) o CLI
========================================================
"""

import re
import sys
import sqlite3
import logging
import argparse
from pathlib import Path
from datetime import datetime
from collections import Counter

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT    = Path(__file__).resolve().parent.parent.parent
DB_PATH = ROOT / "DATA" / "semantic_index.db"
LOG_PATH = ROOT / "DATA" / "logs" / "semantic_indexer.log"

SKIP_DIRS = {"BACKUPS", "VERSIONS", "__pycache__", ".git", "node_modules", ".venv"}

# Stop words italiane + inglesi per estrazione keyword
STOP_WORDS = {
    "il", "la", "lo", "le", "gli", "i", "un", "una", "uno", "e", "o",
    "ma", "se", "che", "di", "da", "in", "con", "su", "per", "tra", "fra",
    "del", "della", "dello", "dei", "degli", "delle", "al", "alla", "allo",
    "ai", "alle", "agli", "nel", "nella", "nello", "nei", "nelle", "negli",
    "the", "a", "an", "and", "or", "but", "if", "of", "to", "in", "for",
    "on", "with", "at", "by", "from", "is", "are", "was", "were", "be",
    "this", "that", "it", "as", "not", "have", "has", "will", "can",
    "non", "più", "anche", "come", "qui", "là", "già", "così", "ogni",
    "suo", "sua", "suoi", "sue", "mio", "mia", "tuoi", "vostro",
}

TOP_KEYWORDS_N = 10  # quante keyword estrarre per file

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [SEMANTIC_IDX] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("semantic_indexer")


# ============================================================
# DATABASE
# ============================================================

def _get_db() -> sqlite3.Connection:
    """Apre (o crea) il database e garantisce lo schema."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS files (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            path        TEXT UNIQUE NOT NULL,
            title       TEXT,
            category    TEXT,
            indexed_at  TEXT NOT NULL,
            modified_at TEXT,
            word_count  INTEGER DEFAULT 0,
            char_count  INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS tags (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            file_id INTEGER NOT NULL,
            tag     TEXT NOT NULL,
            source  TEXT NOT NULL,  -- 'frontmatter' | 'keyword' | 'heading'
            FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE,
            UNIQUE(file_id, tag)
        );

        CREATE INDEX IF NOT EXISTS idx_tags_tag     ON tags(tag);
        CREATE INDEX IF NOT EXISTS idx_files_path   ON files(path);
        CREATE INDEX IF NOT EXISTS idx_files_category ON files(category);
    """)
    conn.commit()
    return conn


# ============================================================
# ESTRAZIONE METADATI
# ============================================================

def _parse_frontmatter(lines: list[str]) -> dict:
    """Estrae coppie chiave:valore dal frontmatter YAML (semplice)."""
    meta = {}
    if not lines or lines[0].strip() != "---":
        return meta
    for line in lines[1:]:
        if line.strip() == "---":
            break
        m = re.match(r'^([\w\-]+)\s*:\s*(.+)', line.strip())
        if m:
            key, val = m.group(1).strip(), m.group(2).strip()
            # Lista inline: [a, b, c]
            if val.startswith("[") and val.endswith("]"):
                val = [v.strip().strip("'\"") for v in val[1:-1].split(",")]
            meta[key] = val
    return meta


def _extract_title(lines: list[str], meta: dict) -> str:
    """Estrae il titolo: prima da frontmatter, poi da primo h1."""
    if "titolo" in meta:
        return str(meta["titolo"])
    if "title" in meta:
        return str(meta["title"])
    for line in lines:
        m = re.match(r'^#\s+(.+)', line)
        if m:
            return m.group(1).strip()
    return ""


def _extract_headings(lines: list[str]) -> list[str]:
    """Estrae il testo di tutti gli heading (h2, h3)."""
    headings = []
    for line in lines:
        m = re.match(r'^#{2,3}\s+(.+)', line)
        if m:
            text = re.sub(r'[^a-zA-Z0-9àèìòùÀÈÌÒÙáéíóú _\-]', '', m.group(1))
            headings.append(text.strip().lower())
    return headings


def _extract_keywords(content: str, n: int = TOP_KEYWORDS_N) -> list[str]:
    """Estrae le N parole più frequenti (escluse stop words)."""
    words = re.findall(r'\b[a-zA-ZàèìòùÀÈÌÒÙáéíóú]{4,}\b', content.lower())
    filtered = [w for w in words if w not in STOP_WORDS]
    most_common = Counter(filtered).most_common(n)
    return [word for word, _ in most_common]


# ============================================================
# INDICIZZAZIONE
# ============================================================

def index_file(file_path: Path):
    """
    Legge il file .md ed aggiorna il record nel database.
    Se il record esiste, lo sovrascrive (upsert).
    """
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        log.error(f"Lettura fallita {file_path}: {e}")
        return

    lines = content.splitlines()
    meta  = _parse_frontmatter(lines)
    title = _extract_title(lines, meta)
    keywords = _extract_keywords(content)
    headings = _extract_headings(lines)

    # Tag da frontmatter
    fm_tags = []
    for key in ("tags", "tag", "category", "categorie"):
        val = meta.get(key)
        if val:
            fm_tags += val if isinstance(val, list) else [str(val)]

    # Categoria principale
    category = meta.get("categoria") or meta.get("category") or meta.get("type") or ""

    # Statistiche
    word_count = len(re.findall(r'\b\w+\b', content))
    char_count = len(content)

    rel_path = str(file_path.relative_to(ROOT)).replace("\\", "/")
    now = datetime.now().isoformat()
    mod_time = datetime.fromtimestamp(file_path.stat().st_mtime).isoformat()

    conn = _get_db()
    try:
        # Upsert file
        conn.execute("""
            INSERT INTO files (path, title, category, indexed_at, modified_at, word_count, char_count)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(path) DO UPDATE SET
                title=excluded.title,
                category=excluded.category,
                indexed_at=excluded.indexed_at,
                modified_at=excluded.modified_at,
                word_count=excluded.word_count,
                char_count=excluded.char_count
        """, (rel_path, title, category, now, mod_time, word_count, char_count))

        file_id = conn.execute(
            "SELECT id FROM files WHERE path=?", (rel_path,)
        ).fetchone()["id"]

        # Rimuovi tag vecchi e reinserisci
        conn.execute("DELETE FROM tags WHERE file_id=?", (file_id,))

        all_tags = []
        for t in fm_tags:
            all_tags.append((file_id, t.lower().strip(), "frontmatter"))
        for k in keywords:
            all_tags.append((file_id, k, "keyword"))
        for h in headings:
            if h:
                all_tags.append((file_id, h[:64], "heading"))

        conn.executemany(
            "INSERT OR IGNORE INTO tags (file_id, tag, source) VALUES (?, ?, ?)",
            all_tags
        )
        conn.commit()

        log.info(f"Indicizzato: {rel_path} | tags={len(all_tags)} | parole={word_count}")

    except sqlite3.Error as e:
        log.error(f"DB error per {rel_path}: {e}")
    finally:
        conn.close()


def search(query: str, limit: int = 20) -> list[dict]:
    """
    Cerca file per tag o keyword.
    Ritorna lista di dict con path, title, category, match_count.
    """
    conn = _get_db()
    rows = conn.execute("""
        SELECT f.path, f.title, f.category, COUNT(t.id) as match_count
        FROM files f
        JOIN tags t ON t.file_id = f.id
        WHERE t.tag LIKE ?
        GROUP BY f.id
        ORDER BY match_count DESC
        LIMIT ?
    """, (f"%{query.lower()}%", limit)).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def reindex_all():
    """Reindicizza tutti i .md nella ROOT."""
    log.info("Reindex completo avviato...")
    count = 0
    for f in ROOT.rglob("*.md"):
        skip = any(part in SKIP_DIRS for part in f.relative_to(ROOT).parts)
        if not skip:
            index_file(f)
            count += 1
    log.info(f"Reindex completato: {count} file.")


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Indicizzazione semantica .md")
    parser.add_argument("--file",    type=str, help="Indicizza un file specifico")
    parser.add_argument("--reindex", action="store_true", help="Reindicizza tutto")
    parser.add_argument("--search",  type=str, help="Cerca per tag/keyword")
    args = parser.parse_args()

    if args.reindex:
        reindex_all()
    elif args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        index_file(path)
    elif args.search:
        results = search(args.search)
        if results:
            print(f"\nRisultati per '{args.search}':")
            for r in results:
                print(f"  [{r['match_count']} match] {r['path']} — {r['title']}")
        else:
            print(f"Nessun risultato per '{args.search}'")
    else:
        parser.print_help()
