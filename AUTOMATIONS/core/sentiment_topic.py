"""
========================================================
TITANIUM_OS — ANALISI SENTIMENT & TOPIC (#22)
Modulo    : sentiment_topic.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Classifica i file .md in workspace tematici
            usando Claude API. Arricchisce il record
            nel semantic_index.db con sentiment e topic.
Input     : file_path (str) o --reanalyze (tutti i .md)
Output    : campo topic/sentiment in DATA/semantic_index.db
            report in DATA/sentiment_report.json
Avvio     : python sentiment_topic.py --file BRAIN/STATE.json
            python sentiment_topic.py --reanalyze
========================================================
"""

import sys
import json
import sqlite3
import logging
import argparse
from pathlib import Path
from datetime import datetime

ROOT      = Path(__file__).resolve().parent.parent.parent
DB_PATH   = ROOT / "DATA" / "semantic_index.db"
LOG_PATH  = ROOT / "DATA" / "logs" / "sentiment_topic.log"
REPORT_PATH = ROOT / "DATA" / "sentiment_report.json"

SKIP_DIRS = {"BACKUPS", "VERSIONS", "__pycache__", ".git", "node_modules", ".venv"}

# Workspace tematici — mappatura topic → etichetta
WORKSPACE_MAP = {
    "tecnico":    ["python", "codice", "automazione", "script", "api", "database", "server"],
    "creativo":   ["storytelling", "contenuto", "podcast", "video", "linkedin", "narrazione"],
    "progetto":   ["mims", "titanium", "eva", "fitpark", "cnc", "fresatrice"],
    "operativo":  ["task", "milestone", "deadline", "stato", "sessione", "backup"],
    "personale":  ["maria", "vita natura", "adhd", "riflessione", "idea"],
}

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [SENTIMENT] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("sentiment_topic")


def _ensure_schema():
    """Aggiunge colonne topic/sentiment al DB se non esistono."""
    if not DB_PATH.exists():
        return
    conn = sqlite3.connect(str(DB_PATH))
    try:
        conn.execute("ALTER TABLE files ADD COLUMN topic TEXT")
    except sqlite3.OperationalError:
        pass  # colonna già presente
    try:
        conn.execute("ALTER TABLE files ADD COLUMN sentiment TEXT")
    except sqlite3.OperationalError:
        pass
    conn.commit()
    conn.close()


def _classify_local(content: str, title: str) -> tuple[str, str]:
    """
    Classificazione locale (senza API) basata su keyword.
    Ritorna (topic, sentiment).
    """
    text = (title + " " + content[:1000]).lower()

    # Topic: workspace con più keyword presenti
    scores = {ws: sum(1 for kw in kws if kw in text)
              for ws, kws in WORKSPACE_MAP.items()}
    topic = max(scores, key=scores.get) if any(scores.values()) else "generico"

    # Sentiment semplice: conta parole positive/negative
    positive = ["completato", "riuscito", "ok", "fatto", "attivo", "avanzato",
                "nuovo", "creato", "aggiornato", "funziona"]
    negative = ["errore", "fallito", "problema", "bloccato", "crash",
                "rotto", "broken", "missing", "todo", "da fare"]
    pos = sum(1 for w in positive if w in text)
    neg = sum(1 for w in negative if w in text)

    if pos > neg:
        sentiment = "positivo"
    elif neg > pos:
        sentiment = "negativo"
    else:
        sentiment = "neutro"

    return topic, sentiment


def _classify_with_claude(content: str, title: str) -> tuple[str, str]:
    """
    Classificazione via Claude API (più precisa).
    Fallback su classificazione locale se API non disponibile.
    """
    try:
        import anthropic
        client = anthropic.Anthropic()

        excerpt = content[:800]
        prompt = (
            f"Analizza questo file Markdown.\n"
            f"Titolo: {title}\n"
            f"Contenuto (estratto): {excerpt}\n\n"
            f"Rispondi SOLO con un JSON: "
            f'{{\"topic\": \"<uno tra: tecnico/creativo/progetto/operativo/personale/generico>\", '
            f'\"sentiment\": \"<uno tra: positivo/neutro/negativo>\"}}'
        )
        msg = client.messages.create(
            model="claude-haiku-4-5-20251001",  # Haiku — più veloce/economico per task semplici
            max_tokens=64,
            messages=[{"role": "user", "content": prompt}]
        )
        data = json.loads(msg.content[0].text.strip())
        return data.get("topic", "generico"), data.get("sentiment", "neutro")

    except Exception:
        return _classify_local(content, title)


def analyze_file(file_path: Path, use_api: bool = False):
    """Analizza un file e aggiorna il DB."""
    _ensure_schema()

    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        log.error(f"Lettura fallita {file_path}: {e}")
        return

    rel_path = str(file_path.relative_to(ROOT)).replace("\\", "/")

    # Estrai titolo da h1 o nome file
    import re
    m = re.search(r'^#\s+(.+)', content, re.MULTILINE)
    title = m.group(1).strip() if m else file_path.stem

    if use_api:
        topic, sentiment = _classify_with_claude(content, title)
    else:
        topic, sentiment = _classify_local(content, title)

    # Aggiorna DB
    if DB_PATH.exists():
        conn = sqlite3.connect(str(DB_PATH))
        conn.execute(
            "UPDATE files SET topic=?, sentiment=? WHERE path=?",
            (topic, sentiment, rel_path)
        )
        conn.commit()
        conn.close()

    log.info(f"{rel_path} → topic={topic} sentiment={sentiment}")
    return {"file": rel_path, "topic": topic, "sentiment": sentiment}


def reanalyze_all(use_api: bool = False):
    """Analizza tutti i .md e genera report aggregato."""
    results = []
    for f in ROOT.rglob("*.md"):
        skip = any(p in SKIP_DIRS for p in f.relative_to(ROOT).parts)
        if not skip:
            r = analyze_file(f, use_api=use_api)
            if r:
                results.append(r)

    # Aggrega per workspace
    by_topic = {}
    for r in results:
        by_topic.setdefault(r["topic"], []).append(r["file"])

    report = {
        "timestamp": datetime.now().isoformat(),
        "total_files": len(results),
        "by_topic": {k: len(v) for k, v in by_topic.items()},
        "details": results,
    }
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    log.info(f"Report salvato: {REPORT_PATH}")
    log.info(f"Workspace: {report['by_topic']}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analisi sentiment & topic .md")
    parser.add_argument("--file",      type=str, help="Analizza file specifico")
    parser.add_argument("--reanalyze", action="store_true", help="Analizza tutti i .md")
    parser.add_argument("--api",       action="store_true", help="Usa Claude API (più preciso)")
    args = parser.parse_args()

    if args.reanalyze:
        reanalyze_all(use_api=args.api)
    elif args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        analyze_file(path, use_api=args.api)
    else:
        parser.print_help()
