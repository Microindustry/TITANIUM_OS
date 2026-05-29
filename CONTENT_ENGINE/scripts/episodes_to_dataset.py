# episodes_to_dataset.py | TITANIUM_OS / CONTENT_ENGINE | v1.2 | 2026-05-29
import sys
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
#
# Converte episodi .md in dataset JSONL per fine-tuning LLM
# Strategia: chunking strutturale + auto-QA via Claude haiku
# Output: CONTENT_ENGINE/DATABASE/training/dataset.jsonl
#         formato: {"prompt": "...", "completion": "..."}
#
# Uso: ANTHROPIC_API_KEY=sk-... python CONTENT_ENGINE/scripts/episodes_to_dataset.py

import json
import os
import re
import logging
from pathlib import Path
import anthropic

_ROOT_EDS = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT_EDS))
try:
    from CORE.log import get_logger
    logger = get_logger("episodes_to_dataset")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [episodes_to_dataset] %(levelname)s %(message)s")
    logger = logging.getLogger("episodes_to_dataset")

ROOT       = Path(__file__).parent.parent.parent
EP_DIR     = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
TRAIN_DIR  = ROOT / "CONTENT_ENGINE" / "DATABASE" / "training"
TRAIN_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE   = TRAIN_DIR / "dataset.jsonl"

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


def load_episode(md_path: Path) -> dict:
    raw = md_path.read_text(encoding="utf-8")
    # estrai frontmatter
    fm = {}
    fm_match = re.match(r'^---\n([\s\S]+?)\n---\n', raw)
    if fm_match:
        for line in fm_match.group(1).split('\n'):
            if ':' in line:
                k, v = line.split(':', 1)
                fm[k.strip()] = v.strip().strip('"')
    body = re.sub(r'^---[\s\S]+?---\n', '', raw).strip()
    return {"id": fm.get("id", md_path.stem), "title": fm.get("title", ""), "body": body, "tags": fm.get("tags", "")}


def generate_qa_pairs(episode: dict) -> list[dict]:
    """Genera 5 coppie Q&A per episodio via Claude haiku."""
    prompt = f"""Episodio podcast di Matteo Benenati:
Titolo: {episode['title']}
Tags: {episode['tags']}

Testo:
{episode['body'][:1500]}

Genera 5 domande e risposte in italiano basate su questo episodio.
Formato — rispondi SOLO con JSON array:
[
  {{"q":"domanda 1","a":"risposta 1 (2-4 frasi, stile Matteo: diretto, tecnico)"}},
  ...
]
Le domande devono coprire: fatto tecnico, decisione presa, connessione al sistema, lezione imparata, prossimo step."""

    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1200,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r'^```json\s*', '', raw)
    raw = re.sub(r'\s*```$', '', raw.strip())
    pairs = json.loads(raw)
    return pairs


def episode_to_samples(episode: dict) -> list[dict]:
    """Converte episodio in campioni training formato instruction/input/output.
    Fonte: AWS Nova + Google Cloud fine-tuning best practices 2025."""
    samples = []

    # Campione 1: style transfer — milestone → episodio narrativo
    samples.append({
        "instruction": "Sei Matteo Benenati. Scrivi un episodio podcast in prima persona su questo milestone del tuo progetto.",
        "input": f"Milestone: {episode['title']}",
        "output": episode['body']
    })

    # Campioni 2-6: Q&A pairs per knowledge extraction
    try:
        pairs = generate_qa_pairs(episode)
        for p in pairs:
            samples.append({
                "instruction": "Rispondi come Matteo Benenati — diretto, tecnico, prima persona, dati reali.",
                "input": p["q"],
                "output": p["a"]
            })
    except Exception as e:
        logger.warning("QA error per %s: %s", episode["id"], e)

    return samples


def main():
    files = sorted(list(EP_DIR.glob("EP_AUTO_*.md")) + list(EP_DIR.glob("EP_*.md")))
    if not files:
        logger.warning("Nessun episodio trovato.")
        return

    logger.info("episodes_to_dataset — %d episodi", len(files))

    all_samples = []
    for md_path in files:
        ep = load_episode(md_path)
        samples = episode_to_samples(ep)
        all_samples.extend(samples)
        logger.info("  %s: %s — %d campioni", ep["id"], ep["title"][:50], len(samples))

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        for s in all_samples:
            f.write(json.dumps(s, ensure_ascii=False) + "\n")

    logger.info("totale campioni: %d | dataset: %s", len(all_samples), OUT_FILE)


if __name__ == "__main__":
    main()
