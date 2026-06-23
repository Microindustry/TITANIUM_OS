# nina_map_cover.py | TITANIUM_OS / NODES / NINA_AGENT | v1.0 | 2026-06-24
# COPERTURA MAPPA — genera un episodio Nina per ogni CONCETTO DISTINTO della Mappa
# ancora senza versione Nina (asse_nina.stato_nina == "fonte"). Diverso dal loop RAG
# (che approfondisce i 13 origine): qui si copre la mappa in AMPIEZZA — Graphify, RETE,
# l'orchestratore, il watcher... ognuno diventa una casella Nina accesa.
#   - sorgente concetti: DASHBOARD/src/data/episodes.json (narrativa.asse_nina, stato=fonte)
#   - grounding: il RAG (via nina_agent.retrieve_context, query = titolo del concetto)
#   - output: auto-promosso nel canone + MENTE (come deciso: "tutti nel canone")
#   - RIPARTIBILE: cursore in DATA/nina_map_cover.json (done = source_id già coperti)
#   - un solo rebuild episodes.json alla fine (CPU), niente GPU qui (lascia al watcher)
#
# Uso:
#   python nina_map_cover.py --dry-run        # mostra la coda, non genera
#   python nina_map_cover.py --count 6        # copre i prossimi 6 concetti scoperti
#   python nina_map_cover.py                  # copre TUTTI i concetti pendenti

import os
import io
import sys
import json
import logging
import subprocess
from pathlib import Path
from datetime import datetime

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))

try:
    from CORE.log import get_logger
    logger = get_logger("nina_map_cover")
except Exception:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [nina_map_cover] %(levelname)s %(message)s")
    logger = logging.getLogger("nina_map_cover")

from NODES.NINA_AGENT import nina_agent as agent

TI_ROOT       = _ROOT
PY            = sys.executable
EPISODES_JSON = TI_ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
BUILD_JSON    = TI_ROOT / "CONTENT_ENGINE" / "scripts" / "build_episodes_json.py"
CURSOR        = TI_ROOT / "DATA" / "nina_map_cover.json"


def list_fonti() -> list[dict]:
    """I concetti distinti della Mappa senza versione Nina (stato_nina == 'fonte')."""
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    out = []
    for e in eps:
        an = (e.get("narrativa") or {}).get("asse_nina") or {}
        if an.get("stato_nina") != "fonte":
            continue
        title = (e.get("title") or "").strip()
        sub = (e.get("sottotitolo") or "").strip()
        # concetto specifico = titolo (+sottotitolo): è la cosa DISTINTA da raccontare,
        # non il 'concetto' generico (più seed condividono lo stesso, es. "la mappa della conoscenza")
        concetto = f"{title} — {sub}" if sub else title
        out.append({
            "source_id": e["id"],
            "concetto": concetto,
            "rag_query": title or sub or an.get("concetto", ""),
            "regione": an.get("regione", 0),
            "giro": an.get("giro_spirale", 1),
            "richiama": list(an.get("richiama") or []),
        })
    # ordine: per regione poi per giro (la mappa si riempie in modo leggibile)
    out.sort(key=lambda x: (x["regione"] if x["regione"] is not None else 99, x["giro"], x["source_id"]))
    return out


def _load_cursor() -> dict:
    try:
        return json.loads(CURSOR.read_text(encoding="utf-8")) if CURSOR.exists() else {}
    except Exception:
        return {}


def _save_cursor(st: dict) -> None:
    CURSOR.parent.mkdir(parents=True, exist_ok=True)
    CURSOR.write_text(json.dumps(st, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def rebuild_episodes() -> bool:
    try:
        r = subprocess.run([PY, str(BUILD_JSON)], cwd=str(TI_ROOT),
                           capture_output=True, text=True, timeout=180,
                           encoding="utf-8", errors="replace")
        if r.returncode == 0:
            logger.info("episodes.json rebuild OK")
            return True
        logger.warning("rebuild rc=%s: %s", r.returncode, (r.stderr or "")[-300:])
    except Exception as e:
        logger.warning("rebuild fallito: %s", e)
    return False


def run(count: int | None = None, dry_run: bool = False) -> int:
    fonti = list_fonti()
    st = _load_cursor()
    done = set(st.get("done", []))
    pending = [f for f in fonti if f["source_id"] not in done]
    logger.info("Concetti mappa: %d totali · %d coperti · %d pendenti",
                len(fonti), len(done), len(pending))
    if count is not None:
        pending = pending[:max(0, count)]

    if dry_run:
        for f in pending:
            print(f"[dry-run] ⟡{f['regione']} g{f['giro']} {f['source_id']:32} -> {f['concetto'][:70]}")
        print(f"\n{len(pending)} da coprire (dry-run, niente generato).")
        return 0

    generated = 0
    for f in pending:
        meta = {"regione": f["regione"], "giro": f["giro"], "casella": "?",
                "richiama": f["richiama"], "concept_slug": f["concetto"]}
        logger.info("Copro ⟡%s g%s | %s | da %s",
                    f["regione"], f["giro"], f["concetto"][:60], f["source_id"])
        try:
            out = agent.generate(f["concetto"], meta, rag_query=f["rag_query"], auto=True)
        except Exception as ex:
            out = None
            logger.warning("generazione in errore per %s (%s)", f["source_id"], ex)
        if out:
            generated += 1
            done.add(f["source_id"])
            logger.info("COPERTO+PROMOSSO: %s", out.name)
        else:
            logger.error("saltato (grounding/API) %s — NON segno done, riprovabile", f["source_id"])

    st["done"] = sorted(done)
    st["last_run"] = datetime.now().isoformat(timespec="seconds")
    st["total_fonti"] = len(fonti)
    _save_cursor(st)

    if generated:
        rebuild_episodes()
        logger.info("RAG: indicizzazione lasciata al watcher (MENTE fs -> incrementale)")
    return generated


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser(description="Nina — copertura mappa (un episodio per concetto distinto)")
    p.add_argument("--count", type=int, help="Quanti concetti coprire in questo giro (default: tutti i pendenti)")
    p.add_argument("--dry-run", action="store_true", help="Mostra la coda, non genera")
    args = p.parse_args()
    n = run(count=args.count, dry_run=args.dry_run)
    print(f"\nNina map-cover: {n} concetto/i coperto/i e promosso/i.")
