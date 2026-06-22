# backfill_fatti.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-11
# Dà i "## FATTI (per il RAG)" agli episodi che NON ce l'hanno (i generatori li producono
# da ora in avanti; questo recupera lo storico). Cosi il riflusso fatti_reflux.py li porta
# in MENTE e il RAG conosce TUTTA la conoscenza interna, non solo gli ultimi 6 episodi.
#
# SICURO: APPEND-ONLY. Non riscrive mai il contenuto dell'episodio: aggiunge il blocco in
# coda. Salta gli episodi che hanno gia' i FATTI (idempotente). --dry-run per provare,
# --limit N per processare a lotti (ogni episodio = 1 chiamata Sonnet). Git traccia tutto.

import os
import re
import sys
import argparse
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
MODEL = "claude-sonnet-4-6"

PROMPT = """Questo è un episodio del progetto TITANIUM_OS di Matteo (artigiano industriale:
V32=CNC epoxy-granite, MIMS=connettori modulari, GENESIS=stack AI, EVA=automazione centro estetico).

Estrai un blocco "## FATTI (per il RAG)": 3-6 fatti ATOMICI che il RAG possa recuperare secco.
REGOLE FERREE:
- Usa SOLO numeri, decisioni e parametri PRESENTI nel testo. NON inventare nulla.
- Forma: "- **DECISIONE:** ... **LOGICA:** ... " oppure **FATTO:**/**OBIETTIVO:**/**PRECISIONE:** ecc.
- Solo specifiche e logica progettuale. MAI ricette o segreti.
- Se l'episodio è povero di dati concreti, estrai meno fatti (anche solo 2), ma veri.

Rispondi SOLO con il blocco markdown, che inizia esattamente con la riga "## FATTI (per il RAG)".

EPISODIO:
---
{content}
---"""


def has_fatti(text: str) -> bool:
    return bool(re.search(r"##\s*FATTI", text, re.IGNORECASE))


def gen_fatti(client, content: str) -> str:
    import anthropic  # noqa
    resp = client.messages.create(
        model=MODEL, max_tokens=600,
        messages=[{"role": "user", "content": PROMPT.format(content=content[:6000])}],
    )
    txt = resp.content[0].text.strip()
    i = txt.find("## FATTI")
    return txt[i:].strip() if i >= 0 else ""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=5, help="max episodi da processare")
    ap.add_argument("--dry-run", action="store_true", help="non scrive, mostra solo cosa farebbe")
    args = ap.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key and not args.dry_run:
        print("[backfill] ANTHROPIC_API_KEY assente — usa --dry-run o carica .env")
        return 1
    client = None
    if not args.dry_run:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)

    todo = [p for p in sorted(EPISODES_DIR.rglob("*.md"))
            if not has_fatti(p.read_text(encoding="utf-8", errors="replace"))]
    print(f"[backfill] episodi senza FATTI: {len(todo)} · processo max {args.limit}"
          f"{' (DRY-RUN)' if args.dry_run else ''}\n")

    done = 0
    for p in todo[:args.limit]:
        raw = p.read_text(encoding="utf-8", errors="replace")
        if args.dry_run:
            print(f"  [dry] genererei FATTI per: {p.relative_to(EPISODES_DIR)}")
            done += 1
            continue
        block = gen_fatti(client, raw)
        if not block or "## FATTI" not in block:
            print(f"  ✗ generazione vuota: {p.name} — salto")
            continue
        # APPEND in coda (mai riscrive il contenuto esistente)
        new = raw.rstrip() + "\n\n" + block.rstrip() + "\n"
        p.write_text(new, encoding="utf-8")
        done += 1
        print(f"  ✓ {p.relative_to(EPISODES_DIR)}  (+{len(block.splitlines())} righe FATTI)")

    print(f"\n[backfill] fatti aggiunti a {done} episodi.")
    if done and not args.dry_run:
        print("  prossimo: build_episodes_json.py (sync) + fatti_reflux.py + rag-update")
    return 0


if __name__ == "__main__":
    sys.exit(main())
