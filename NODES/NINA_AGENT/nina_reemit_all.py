# nina_reemit_all.py | TITANIUM_OS / NODES / NINA_AGENT | v1.0 | 2026-06-24
# RE-EMIT di TUTTI gli episodi di Nina, partendo dal fondamento (Nina dal giorno 0),
# con GROUNDING OBBLIGATORIO (canone sess.#44: tutti dal vero o niente).
#   - prende la lista canonica degli EP_N2 dai SEED (concetto + regione + giro + richiama);
#   - per ognuno: ARCHIVIA la versione attuale (_ARCHIVIO/reemit_<ts>/, additivo: nulla si perde),
#     poi rigenera grounded e auto-promuove nel canone + MENTE (stesso id);
#   - alla fine rebuild episodes.json. Il RAG lo indicizza il watcher / la notturna.
# Richiede: RAG su (API :5001 o motore diretto) + ANTHROPIC_API_KEY. Senza fonti, salta (non inventa).
#
# Uso:
#   python nina_reemit_all.py --dry-run        # mostra la lista e l'ordine, non genera
#   python nina_reemit_all.py --only 1,2,3     # solo certe caselle (numeri EP_N2)
#   python nina_reemit_all.py                  # re-emit di tutti (costa API; archivia prima)
#   python nina_reemit_all.py --rag            # + incrementale RAG inline a fine (API spenta)

import os
import re
import sys
import io
import json
import shutil
import logging
import subprocess
from pathlib import Path
from datetime import datetime

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))
sys.path.insert(0, str(_ROOT / "CONTENT_ENGINE" / "scripts"))

try:
    from CORE.log import get_logger
    logger = get_logger("nina_reemit")
except Exception:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [nina_reemit] %(levelname)s %(message)s")
    logger = logging.getLogger("nina_reemit")

from NODES.NINA_AGENT import nina_agent as agent
import build_episodes_json as bej  # NINA_SEED / FINANZA_SEED (con il merge di nina_seed_auto)

TI_ROOT    = _ROOT
PY         = sys.executable
AV_CE      = agent.AV_CE
AV_MENTE   = agent.AV_MENTE
AV_ARCH    = agent.AV_ARCHIVIO
BUILD_JSON = TI_ROOT / "CONTENT_ENGINE" / "scripts" / "build_episodes_json.py"
RAG_ENGINE = TI_ROOT / "NODES" / "MENTE_RAG" / "rag_engine.py"

_EPNUM = re.compile(r"EP_N2_(\d+)")


def canon_list() -> list[dict]:
    """Tutti gli EP_N2 canonici dai SEED (tech + finanza), in ordine di casella."""
    out = []
    for seed, vert in ((bej.NINA_SEED, "tech"), (bej.FINANZA_SEED, "finanza")):
        for eid, row in seed.items():
            m = _EPNUM.match(eid)
            if not m:
                continue
            concetto, reg, giro, richiama, _stato = row
            out.append({"id": eid, "num": int(m.group(1)), "concetto": concetto,
                        "regione": reg, "giro": giro, "richiama": list(richiama), "verticale": vert})
    out.sort(key=lambda x: x["num"])
    return out


def archive_old_versions(ep_id: str, keep_name: str, ts: str) -> int:
    """Archivia le VECCHIE versioni di un episodio (canone + MENTE) DOPO che la nuova e'
    stata scritta: sposta tutti i file dell'id TRANNE 'keep_name' (la nuova) in
    _ARCHIVIO/reemit_<ts>/. Cosi' un fallimento di generazione non perde mai il canone
    (si archivia solo a successo avvenuto). Additivo, escluso dal RAG. Ritorna quanti mossi."""
    moved = 0
    for base in (AV_CE, AV_MENTE):
        if not base.exists():
            continue
        dest_dir = AV_ARCH / f"reemit_{ts}" / base.name
        for f in base.glob(f"{ep_id}_*.md"):
            if f.name == keep_name:
                continue  # la nuova versione resta nel canone
            dest_dir.mkdir(parents=True, exist_ok=True)
            shutil.move(str(f), str(dest_dir / f.name))
            moved += 1
    return moved


EPISODES_JSON = TI_ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"


def purge_reemitted(ids: list[str]) -> None:
    """build_episodes_json e' additivo (dedup per id, NON aggiorna le voci esistenti):
    dopo un re-emit i .md cambiano ma il json terrebbe il vecchio. Quindi togliamo le
    voci ri-emesse cosi' il rebuild le re-importa fresche dal disco."""
    try:
        d = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
        keep = [e for e in d if str(e.get("id", "")) not in set(ids)]
        if len(keep) != len(d):
            EPISODES_JSON.write_text(json.dumps(keep, ensure_ascii=False, indent=2), encoding="utf-8")
            logger.info("episodes.json: purgate %d voci ri-emesse (re-import dal disco)", len(d) - len(keep))
    except Exception as e:
        logger.warning("purge episodes.json fallito: %s", e)


def rebuild_episodes(ids: list[str] | None = None) -> None:
    if ids:
        purge_reemitted(ids)
    try:
        r = subprocess.run([PY, str(BUILD_JSON)], cwd=str(TI_ROOT), capture_output=True, text=True, timeout=180)
        logger.info("episodes.json rebuild rc=%s", r.returncode)
        if r.returncode != 0:
            logger.warning("rebuild stderr: %s", (r.stderr or "")[-300:])
    except Exception as e:
        logger.warning("rebuild episodes.json fallito: %s", e)


def rag_incremental() -> None:
    try:
        r = subprocess.run([PY, str(RAG_ENGINE), "--incremental"], cwd=str(TI_ROOT),
                           capture_output=True, text=True, timeout=1200)
        logger.info("rag --incremental rc=%s", r.returncode)
    except Exception as e:
        logger.warning("rag --incremental fallito: %s", e)


def run(only: set[int] | None = None, dry_run: bool = False, do_rag: bool = False) -> dict:
    eps = canon_list()
    if only:
        eps = [e for e in eps if e["num"] in only]
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    logger.info("Re-emit: %d episodi%s (grounding OBBLIGATORIO)", len(eps),
                f" (solo {sorted(only)})" if only else "")

    if dry_run:
        for e in eps:
            print(f"  [{e['num']:>2}] {e['id']}  reg {e['regione']} giro {e['giro']} [{e['verticale']}]  {e['concetto'][:60]}")
        print(f"\n[dry-run] {len(eps)} episodi da ri-emettere (nessuna generazione, nessun archivio).")
        return {"planned": len(eps), "ok": 0, "skipped": 0}

    if not os.environ.get("ANTHROPIC_API_KEY", "").strip():
        logger.error("ANTHROPIC_API_KEY assente — impossibile ri-emettere. Carica _VAULT/KEYS/titanium_os.env.")
        return {"planned": len(eps), "ok": 0, "skipped": len(eps), "error": "no_api_key"}

    ok, skipped = 0, 0
    for e in eps:
        meta = {"id": e["id"], "regione": e["regione"], "giro": e["giro"],
                "casella": e["num"], "richiama": e["richiama"]}
        # GENERA PRIMA (non tocchiamo il canone finche' non c'e' la nuova versione)
        logger.info("[%s] regenero (grounded)...", e["id"])
        try:
            out = agent.generate(e["concetto"], meta, rag_query=e["concetto"], auto=True, require_grounding=True)
        except Exception as ex:
            out = None
            logger.warning("[%s] errore in generazione (%s) — proseguo col prossimo", e["id"], ex)
        if out:
            # SOLO ORA archivia le vecchie versioni (tutte tranne quella appena scritta)
            moved = archive_old_versions(e["id"], out.name, ts)
            ok += 1
            logger.info("[%s] RE-EMESSO: %s (archiviate %d vecchie)", e["id"], out.name, moved)
        else:
            skipped += 1
            logger.warning("[%s] SALTATO (grounding insufficiente o errore) — la versione ATTUALE resta nel canone", e["id"])

    rebuild_episodes([e["id"] for e in eps])
    if do_rag:
        rag_incremental()
    else:
        logger.info("RAG: indicizzazione lasciata al watcher/notturna (MENTE fs -> incrementale)")
    logger.info("Re-emit finito: %d ok, %d saltati (archivio: _ARCHIVIO/reemit_%s)", ok, skipped, ts)
    return {"planned": len(eps), "ok": ok, "skipped": skipped, "archive": f"reemit_{ts}"}


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser(description="Re-emit di tutti gli episodi Nina (grounded, dal fondamento)")
    p.add_argument("--only", help="Solo certe caselle, es. '1,2,3'")
    p.add_argument("--dry-run", action="store_true", help="Mostra la lista, non genera")
    p.add_argument("--rag", action="store_true", help="Incrementale RAG inline a fine (solo API spenta)")
    args = p.parse_args()
    only = {int(x) for x in args.only.split(",")} if args.only else None
    res = run(only=only, dry_run=args.dry_run, do_rag=args.rag)
    print(f"\nRe-emit: {json.dumps(res, ensure_ascii=False)}")
