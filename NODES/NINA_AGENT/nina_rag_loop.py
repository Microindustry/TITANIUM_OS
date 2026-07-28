# nina_rag_loop.py | TITANIUM_OS / NODES / NINA_AGENT | v1.1 | 2026-07-04
# RAG NINA — il loop che "vede gli episodi archiviati e continua a generarli".
# Canone sess.#44: TUTTO AUTOMATICO, nessun intervento umano.
#   1. legge i semi = gli EP_AV in S_AVVENTURA/_ARCHIVIO (l'origine del mondo di Nina);
#   2. a rotazione prende il prossimo seme non ancora ri-generato (cursore in nina_state.json);
#   3. genera un nuovo EP_N2 (auto-promosso: canone + MENTE + seed-auto) -> alimenta il RAG;
#   4. rebuild episodes.json (CPU) cosi' la dashboard lo mostra subito.
# Il RAG lo indicizza il WATCHER (MENTE fs -> incrementale): NIENTE processo GPU qui
# (la GTX 1070 regge un solo processo; un rebuild CLI con l'API su -> OOM, memoria nota).
# Usa --rag solo se lo lanci a API spenta e vuoi forzare l'incrementale.
#
# Uso:
#   python nina_rag_loop.py                 # genera 1 episodio dal prossimo seme
#   python nina_rag_loop.py --count 3       # genera 3 (rotazione)
#   python nina_rag_loop.py --dry-run       # mostra cosa farebbe, non genera
#   python nina_rag_loop.py --rag           # forza l'incrementale RAG inline (API spenta)

import os
import re
import sys
import io
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
    logger = get_logger("nina_rag_loop")
except Exception:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [nina_rag_loop] %(levelname)s %(message)s")
    logger = logging.getLogger("nina_rag_loop")

from NODES.NINA_AGENT import nina_agent as agent

TI_ROOT     = _ROOT
PY          = sys.executable
AV_ARCHIVIO = agent.AV_ARCHIVIO
NINA_STATE  = agent.NINA_STATE
BUILD_JSON  = TI_ROOT / "CONTENT_ENGINE" / "scripts" / "build_episodes_json.py"
RAG_ENGINE  = TI_ROOT / "NODES" / "MENTE_RAG" / "rag_engine.py"

# keyword del nome-file/titolo -> regione della Mappa (per posizionare il ri-racconto)
REGION_HINT = [
    ("materia", 0), ("giuntura", 0), ("mille_volte", 0), ("uguale", 0),
    ("segno", 1), ("traccia", 1), ("loop", 1),
    ("automa", 2), ("officina", 2),
    ("mente", 3), ("inventa", 3), ("llm", 3),
    ("biblioteca", 4), ("fonti", 4), ("rag", 4),
    ("mappa", 5), ("grande", 5),
    ("esercito", 6), ("soldato", 6), ("agenti", 6), ("guardiano", 6),
    ("direttore", 7), ("orchestr", 7),
    ("valore", 1), ("soldi", 1),
]


def _parse_frontmatter(text: str) -> dict:
    fm = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end > 0:
            for line in text[3:end].splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    fm[k.strip()] = v.strip()
    return fm


def _concept_of(path: Path) -> dict:
    """Estrae concetto + regione da un EP_AV archiviato (il seme)."""
    text = path.read_text(encoding="utf-8", errors="ignore")
    fm = _parse_frontmatter(text)
    title = fm.get("title") or path.stem
    sub = fm.get("sottotitolo", "")
    concetto = (sub or title).strip().strip('"')[:120]
    name = path.stem.lower()
    regione = 0
    for kw, r in REGION_HINT:
        if kw in name or kw in title.lower():
            regione = r
            break
    return {"seed_file": path.name, "concetto": concetto, "title": title, "regione": regione}


def list_seeds() -> list[dict]:
    if not AV_ARCHIVIO.exists():
        return []
    return [_concept_of(p) for p in sorted(AV_ARCHIVIO.glob("EP_AV_*.md"))]


def _load_state() -> dict:
    try:
        return json.loads(NINA_STATE.read_text(encoding="utf-8")) if NINA_STATE.exists() else {}
    except Exception:
        return {}


def _save_state(st: dict) -> None:
    NINA_STATE.parent.mkdir(parents=True, exist_ok=True)
    NINA_STATE.write_text(json.dumps(st, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def next_seed(seeds: list[dict], done: list[str]) -> dict | None:
    """Prossimo seme non ancora ri-generato; quando il giro e' finito, ricomincia
    (giro piu' profondo) — 'continua a generarli'.
    (#53, attacco 03 F3): i semi GEMELLI (EP_AV_X e EP_AV_X_2 condividono la regione)
    producevano due quasi-doppioni della stessa lezione per giro (EP_N2_51 e 52 =
    entrambi la lezione di EP_N2_08 → archiviati). Regola spirale: UNA rigenerazione
    per regione per giro — il gemello viene consumato senza generare (torna eleggibile
    al giro successivo, quando la spirale riparte piu' profonda)."""
    regioni_done = {s["regione"] for s in seeds if s["seed_file"] in done}
    for s in seeds:
        if s["seed_file"] in done:
            continue
        if s["regione"] in regioni_done:
            logger.info("seme gemello saltato: %s (regione %s gia' rigenerata in questo giro)",
                        s["seed_file"], s["regione"])
            done.append(s["seed_file"])   # consumato senza doppione
            regioni_done.add(s["regione"])
            continue
        return s
    return None


def rebuild_episodes() -> bool:
    try:
        r = subprocess.run([PY, str(BUILD_JSON)], cwd=str(TI_ROOT),
                           capture_output=True, text=True, timeout=180)
        if r.returncode == 0:
            logger.info("episodes.json rebuild OK")
            return True
        logger.warning("rebuild episodes.json rc=%s: %s", r.returncode, (r.stderr or "")[-300:])
    except Exception as e:
        logger.warning("rebuild episodes.json fallito: %s", e)
    return False


def rag_incremental() -> bool:
    """Incrementale RAG inline (SOLO con --rag: rischio OOM se l'API GPU e' su)."""
    try:
        r = subprocess.run([PY, str(RAG_ENGINE), "--incremental"], cwd=str(TI_ROOT),
                           capture_output=True, text=True, timeout=900)
        logger.info("rag --incremental rc=%s", r.returncode)
        return r.returncode == 0
    except Exception as e:
        logger.warning("rag --incremental fallito: %s", e)
        return False


def run(count: int = 1, dry_run: bool = False, do_rag: bool = False) -> int:
    seeds = list_seeds()
    if not seeds:
        logger.warning("Nessun seme in _ARCHIVIO (%s) — niente da generare", AV_ARCHIVIO)
        return 0
    st = _load_state()
    done = list(st.get("seeds_done", []))
    giro_base = int(st.get("giro_corrente", 2))  # i ri-racconti partono dal giro 2 (piu' profondi degli originali)

    generated = 0
    for _ in range(max(1, count)):
        # (v1.1) reset PRIMA di pescare: col vecchio ordine, a giro completo next_seed
        # tornava None per sempre e il reset non veniva mai raggiunto -> loop morto a fine giro
        if len(done) >= len(seeds):  # giro completo -> si riparte piu' profondi
            done = []
            giro_base += 1
            logger.info("Giro dei semi completo -> nuovo giro spirale %s", giro_base)
        seed = next_seed(seeds, done)
        if not seed:
            break

        # casella = il numero dell'episodio che stiamo per creare. Era hardcoded "?" e
        # finiva nel fallback FATTI di nina_agent (":450") come "casella ?" in 32 episodi
        # su 64, in contraddizione con l'header dello stesso file ("Casella 64 del viaggio").
        try:
            _casella = int(re.match(r"EP_N2_(\d+)", agent.next_episode_id()).group(1))
        except Exception:
            _casella = "?"
        meta = {"regione": seed["regione"], "giro": giro_base,
                "casella": _casella, "richiama": [], "concept_slug": seed["concetto"]}
        logger.info("Seme: %s -> regione %s, giro %s | %s",
                    seed["seed_file"], seed["regione"], giro_base, seed["concetto"][:60])
        if dry_run:
            print(f"[dry-run] genererei da {seed['seed_file']} (reg {seed['regione']}, giro {giro_base})")
            done.append(seed["seed_file"])
            generated += 1
            continue

        try:
            out = agent.generate(seed["concetto"], meta, rag_query=seed["concetto"], auto=True)
        except Exception as ex:
            out = None
            logger.warning("generazione in errore per %s (%s)", seed["seed_file"], ex)
        if out:
            generated += 1
            done.append(seed["seed_file"])
            logger.info("GENERATO+PROMOSSO: %s", out.name)
        else:
            # non blocca il giro: segna il seme come tentato e passa al prossimo
            logger.error("generazione fallita/saltata per %s — proseguo", seed["seed_file"])
            done.append(seed["seed_file"])

    # persisti cursore (mai in dry-run: non deve sporcare la rotazione)
    if not dry_run:
        # (v1.1) RICARICA lo stato: agent.generate ha scritto last_generated/canon_count/
        # generated_total durante il giro — salvare la copia pre-run li clobberava
        # (lost-update: lo stato mostrava l'episodio vecchio anche a generazione riuscita)
        st = _load_state()
        st["seeds_done"] = done
        st["giro_corrente"] = giro_base
        st["last_loop"] = datetime.now().isoformat(timespec="seconds")
        st["seed_archive_count"] = len(seeds)
        _save_state(st)

    if generated and not dry_run:
        rebuild_episodes()
        if do_rag:
            rag_incremental()
        else:
            logger.info("RAG: lascio l'indicizzazione al watcher (MENTE fs -> incrementale, no GPU qui)")
    return generated


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser(description="RAG Nina — genera in continuo dai semi archiviati (auto)")
    p.add_argument("--count", type=int, default=1, help="Quanti episodi generare in questo giro")
    p.add_argument("--dry-run", action="store_true", help="Mostra cosa farebbe, non genera")
    p.add_argument("--rag", action="store_true", help="Forza l'incrementale RAG inline (solo API spenta)")
    args = p.parse_args()
    n = run(count=args.count, dry_run=args.dry_run, do_rag=args.rag)
    print(f"\nNina RAG loop: {n} episodio/i {'simulati' if args.dry_run else 'generati e promossi'}.")
