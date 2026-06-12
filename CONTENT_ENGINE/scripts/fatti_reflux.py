# fatti_reflux.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-11
# IL RIFLUSSO: chiude il loop di autoalimentazione del sapere (regola 7).
#
#   commit/milestone -> episodio (con ## FATTI per il RAG) -> [QUESTO NODO] -> MENTE/<dominio>/
#   -> rag-update indicizza -> il RAG conosce la conoscenza INTERNA del progetto
#   -> gli episodi futuri nascono piu' informati. Il sistema impara da se' stesso.
#
# Problema che risolve (canone STORIE_STRUTTURA_2ASSI, "terzo requisito"):
#   gli episodi erano ricchi ma la fonte vuota — MENTE/V32 1 file, MENTE/GENESIS 1 file,
#   mentre 110+ episodi parlano di meccanica/sistema. Il RAG era nutrito di paper ESTERNI
#   (KNOWLEDGE/RESEARCH) e affamato della conoscenza INTERNA. Questo nodo la riversa.
#
# REBUILD-SAFE & IDEMPOTENTE: rigenera le note-fonte dagli episodi ad ogni run (come
# build_episodes_json). Non scrive nei domini se non c'e' nulla da scrivere. READ degli
# episodi, WRITE solo in MENTE/<dominio>/fatti_dalle_storie.md (file dedicato e marcato,
# non sovrascrive note scritte a mano da Matteo).

import os
import re
import sys
import json
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))

OUT_NAME = "fatti_dalle_storie.md"   # file dedicato per dominio: solo questo nodo lo tocca
MARKER = "<!-- AUTO-GENERATO da fatti_reflux.py — NON editare a mano (rigenerato dagli episodi) -->"

# Mappa dominio -> parole chiave. Match con WORD-BOUNDARY (non sottostringa: "estetic"
# matchava "estetico" metaforico nei dev-log, "eva" finiva in parole a caso). Peso:
# un hit nei TAGS conta piu' di uno nel titolo, piu' di uno nel testo FATTI — i tag sono
# segnale strutturato, il testo e' rumoroso. Vince il dominio con punteggio piu' alto.
DOMAIN_KEYWORDS = {
    "FINANZA":     ["finanza", "soldi", "denaro", "baratto", "moneta", "risparmio", "cuscinetto"],
    "V32":         ["v32", "epoxy", "granite", "gusset", "config g", "mandrino", "cnc", "titanio",
                    "rigidezza", "rigidità", "telaio", "colonna", "asse x", "asse z", "saldatura", "tig"],
    "MIMS":        ["mims", "tiles", "pa-gf30", "connettori", "stampo", "pressa", "vulcan"],
    "VITA_NATURA": ["eva", "vita natura", "centro estetico", "prenotazioni", "whatsapp"],
    "GENESIS":     ["genesis", "rag", "graphify", "dashboard", "agente", "agenti", "watcher", "mcp",
                    "automazione", "notturna", "llm", "chromadb", "nina", "storie", "wiki", "grafo"],
}
DEFAULT_DOMAIN = "GENESIS"   # il sistema cognitivo: catch-all per i dev-log


def _kw_hits(keywords: list, text: str) -> int:
    """Quante keyword compaiono in text come PAROLA (word-boundary), non sottostringa."""
    n = 0
    for kw in keywords:
        if re.search(r"(?<!\w)" + re.escape(kw) + r"(?!\w)", text, re.IGNORECASE):
            n += 1
    return n


def _load_meta_by_id() -> dict:
    """id episodio -> {tags, title, stagione, asse_nina} da episodes.json (per il dominio)."""
    if not EPISODES_JSON.exists():
        return {}
    out = {}
    for e in json.loads(EPISODES_JSON.read_text(encoding="utf-8")):
        out[e.get("id")] = e
    return out


def extract_fatti(text: str) -> str:
    """Ritorna il corpo del blocco '## FATTI (per il RAG)' (fino al prossimo ## / --- / EOF)."""
    m = re.search(r"##\s*FATTI[^\n]*\n(.*?)(?=\n##\s|\n---\s*\n|\Z)", text, re.DOTALL | re.IGNORECASE)
    if not m:
        return ""
    return m.group(1).strip()


def pick_domain(meta: dict, fatti: str, title_fallback: str) -> str:
    # 1) segnale strutturato forte: il verticale Nina dichiarato
    nina = ((meta or {}).get("narrativa") or {}).get("asse_nina") or {}
    if nina.get("verticale") == "finanza":
        return "FINANZA"
    # 2) punteggio pesato: tag (x3) > titolo (x2) > testo FATTI (x1), match word-boundary
    tags = " ".join(meta.get("tags", []) if meta else [])
    title = (meta.get("title") if meta else "") or title_fallback
    best, best_score = DEFAULT_DOMAIN, 0
    for domain, kws in DOMAIN_KEYWORDS.items():
        score = 3 * _kw_hits(kws, tags) + 2 * _kw_hits(kws, title) + _kw_hits(kws, fatti)
        if score > best_score:
            best, best_score = domain, score
    return best


def collect() -> dict:
    """Ritorna {dominio: [ {id, title, date, fatti}... ]} dagli episodi con blocco FATTI."""
    meta_by_id = _load_meta_by_id()
    buckets: dict[str, list] = {}
    md_files = sorted(EPISODES_DIR.rglob("*.md")) if EPISODES_DIR.exists() else []
    for p in md_files:
        raw = p.read_text(encoding="utf-8", errors="replace")
        fatti = extract_fatti(raw)
        if not fatti:
            continue
        # id: frontmatter 'id:' o primo heading '# EP_...' o stem
        mid = re.search(r"^id:\s*(.+)$", raw, re.MULTILINE)
        eid = (mid.group(1).strip().strip('"') if mid else None) or p.stem
        meta = meta_by_id.get(eid, {})
        mdate = re.search(r"(20\d{2})[-_]?(\d{2})[-_]?(\d{2})", p.stem)
        date = f"{mdate.group(1)}-{mdate.group(2)}-{mdate.group(3)}" if mdate else \
            datetime.fromtimestamp(p.stat().st_mtime).strftime("%Y-%m-%d")
        title = (meta.get("title") if meta else None) or p.stem.replace("_", " ")
        domain = pick_domain(meta, fatti, title)
        buckets.setdefault(domain, []).append(
            {"id": eid, "title": title, "date": date, "fatti": fatti})
    return buckets


def write_domain(domain: str, entries: list) -> Path:
    """Scrive (rigenera) MENTE/<domain>/fatti_dalle_storie.md. Idempotente."""
    out_dir = MENTE / domain
    out_dir.mkdir(parents=True, exist_ok=True)
    fpath = out_dir / OUT_NAME
    entries = sorted(entries, key=lambda e: e["date"], reverse=True)
    body = [
        "---",
        f'source: "storie (riflusso automatico)"',
        f'domain: "{domain}"',
        f'date_ingested: "{datetime.now().strftime("%Y-%m-%d")}"',
        f"n_episodi: {len(entries)}",
        "---",
        "",
        MARKER,
        "",
        f"# FATTI dal dominio {domain} — riflusso dalle STORIE",
        "",
        f"Conoscenza interna del progetto estratta dai blocchi `## FATTI (per il RAG)` "
        f"degli episodi. Riversata qui perche' il RAG la indicizzi (loop di regola 7). "
        f"Rigenerato dagli episodi: non editare a mano.",
        "",
    ]
    for e in entries:
        body.append(f"## {e['title']}  ·  {e['date']}  ·  [{e['id']}]")
        body.append("")
        body.append(e["fatti"])
        body.append("")
    fpath.write_text("\n".join(body), encoding="utf-8")
    return fpath


def _clean_stale(active_domains: set):
    """Rimuove i fatti_dalle_storie.md auto-generati di domini ora vuoti (es. dopo una
    rimappatura). Tocca SOLO i file col nostro MARKER: mai le note scritte a mano."""
    removed = []
    if not MENTE.exists():
        return removed
    for f in MENTE.glob(f"*/{OUT_NAME}"):
        domain = f.parent.name
        if domain in active_domains:
            continue
        try:
            if MARKER in f.read_text(encoding="utf-8", errors="replace"):
                f.unlink()
                removed.append(domain)
        except Exception:
            pass
    return removed


def main() -> int:
    buckets = collect()
    if not buckets:
        print("[fatti_reflux] nessun blocco FATTI trovato negli episodi — niente da riversare.")
        return 0
    total = 0
    print("=" * 60)
    print(" RIFLUSSO FATTI — episodi -> MENTE/ (loop RAG)")
    print("=" * 60)
    for domain in sorted(buckets):
        entries = buckets[domain]
        fpath = write_domain(domain, entries)
        total += len(entries)
        rel = fpath.relative_to(MENTE.parent) if MENTE.parent in fpath.parents else fpath
        print(f"  {domain:12} {len(entries):3} episodi -> {rel}")
    stale = _clean_stale(set(buckets))
    if stale:
        print(f"  puliti {len(stale)} file auto-generati ora vuoti: {', '.join(stale)}")
    print(f"\n  totale: {total} blocchi FATTI riversati in {len(buckets)} domini.")
    print("  prossimo: rag-update li indicizza (lo fa la catena notturna, o: "
          "python NODES/MENTE_RAG/rag_engine.py --incremental)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
