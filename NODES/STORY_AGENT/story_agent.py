# story_agent.py | TITANIUM_OS / NODES / STORY_AGENT | v1.2 | 2026-06-22
# Genera episodi narrativi automaticamente da git commits, sessioni, milestone
# Gira come Stop hook + cron notturno — PC sempre acceso, zero perdita di materiale
# v1.1: prompt allineato al canone 2-assi — ogni episodio emette ## FATTI (per il RAG)
#       (terzo requisito: l'episodio deve insegnare al sistema, non solo raccontare)
# v1.2: GROUNDING RAG (allineato a milestone_to_episode) — l'episodio attinge al sapere
#       connesso di MENTE via /api/rag/search (leggero, no torch nel Stop hook; fallback al
#       motore diretto, poi best-effort). Regola di canone nel system prompt = prevenzione
#       alla fonte (oltre al canon_guard.clean che gira dopo). Chiude il loop regola 7.

import os
import sys
import io
import json
import logging
import subprocess
import re
import urllib.request
import urllib.parse
from datetime import datetime, timedelta
from pathlib import Path

# forza UTF-8 su stdout/stderr Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))
try:
    from CORE.log import get_logger
    logger = get_logger("story_agent")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [story_agent] %(levelname)s %(message)s")
    logger = logging.getLogger("story_agent")

try:
    import anthropic
except ImportError:
    logger.error("anthropic non installato")
    sys.exit(1)

TI_ROOT   = _ROOT
MENTE     = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
CE_ROOT   = TI_ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S2_SISTEMA"
ST_ROOT   = MENTE / "SESSIONI" / "STORIE" / "S2_SISTEMA"
STATE_F   = TI_ROOT / "NODES" / "STORY_AGENT" / "story_state.json"
SESSIONI  = MENTE / "SESSIONI"

CE_ROOT.mkdir(parents=True, exist_ok=True)
ST_ROOT.mkdir(parents=True, exist_ok=True)
STATE_F.parent.mkdir(parents=True, exist_ok=True)


# ── STATE ─────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_F.exists():
        return json.loads(STATE_F.read_text(encoding="utf-8"))
    return {"last_commit": None, "episodes_generated": [], "last_run": None}


def save_state(state: dict):
    STATE_F.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


# ── GIT ───────────────────────────────────────────────────────────────────────

def git_log_since(since_hash: str | None, max_commits: int = 50) -> list[dict]:
    """Ritorna i commit non ancora processati."""
    fmt = "%H|%ad|%s|%b"
    cmd = ["git", "log", f"--format={fmt}", "--date=short", f"-{max_commits}"]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8",
                       errors="replace", cwd=str(TI_ROOT))
    if r.returncode != 0 or not r.stdout:
        return []

    commits = []
    for line in r.stdout.strip().splitlines():
        if not line.strip():
            continue
        parts = line.split("|", 3)
        if len(parts) < 3:
            continue
        commits.append({
            "hash": parts[0][:8],
            "date": parts[1],
            "subject": parts[2],
            "body": parts[3].strip() if len(parts) > 3 else "",
        })

    # ritorna solo commit successivi a since_hash
    if since_hash:
        new = []
        for c in commits:
            if c["hash"] == since_hash[:8]:
                break
            new.append(c)
        return new
    return commits


def group_commits_by_theme(commits: list[dict]) -> list[dict]:
    """Raggruppa commit correlati in un singolo episodio."""
    if not commits:
        return []

    groups = []
    current_group = [commits[0]]
    current_date = commits[0]["date"]

    for c in commits[1:]:
        same_date = c["date"] == current_date
        same_theme = _similar_theme(c["subject"], current_group[-1]["subject"])
        if same_date or same_theme:
            current_group.append(c)
        else:
            groups.append({"date": current_date, "commits": current_group})
            current_group = [c]
            current_date = c["date"]

    groups.append({"date": current_date, "commits": current_group})
    return groups


def _similar_theme(s1: str, s2: str) -> bool:
    """Semplice check se due subject parlano dello stesso tema."""
    keywords = ["dashboard", "rag", "agent", "canvas", "matteo", "genesis",
                "v32", "mims", "eva", "state", "hook", "research", "story"]
    s1l, s2l = s1.lower(), s2.lower()
    for kw in keywords:
        if kw in s1l and kw in s2l:
            return True
    return False


# ── SESSIONI ──────────────────────────────────────────────────────────────────

def get_recent_sessions(days: int = 3) -> list[str]:
    """Recupera contenuto sessioni recenti non ancora narrativizzate."""
    if not SESSIONI.exists():
        return []
    cutoff = datetime.now() - timedelta(days=days)
    texts = []
    for f in sorted(SESSIONI.glob("*.md"), reverse=True):
        try:
            mtime = datetime.fromtimestamp(f.stat().st_mtime)
            if mtime > cutoff and "RIAVVIO" not in f.name.upper():
                texts.append(f.read_text(encoding="utf-8", errors="ignore")[:800])
        except Exception:
            continue
    return texts[:5]


# ── STATO PROGETTO ────────────────────────────────────────────────────────────

def get_project_snapshot() -> dict:
    state_path = TI_ROOT / "BRAIN" / "STATE.json"
    if not state_path.exists():
        return {}
    try:
        return json.loads(state_path.read_text(encoding="utf-8"))
    except Exception:
        return {}


# ── GROUNDING RAG ─────────────────────────────────────────────────────────────

def retrieve_context(query: str, k: int = 6) -> str:
    """Recupera fatti reali dal RAG (MENTE/) per ancorare l'episodio — come
    milestone_to_episode. Prima via /api/rag/search (leggera, no torch nel Stop
    hook); se l'API e' giu', fallback al motore diretto; poi best-effort (stringa
    vuota -> il prompt resta sui fatti del milestone, senza inventare)."""
    query = (query or "").strip()[:300]
    if not query:
        return ""
    # 1) API locale (il watchdog la tiene viva) — rilegge indice da disco a ogni query
    try:
        url = "http://localhost:5001/api/rag/search?" + urllib.parse.urlencode(
            {"q": query, "demote": "STORIE"})   # anti-eco (#8): grounda sul FATTI curato
        with urllib.request.urlopen(url, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        res = (data.get("results") or [])[:k]
        if res:
            return "\n".join(
                f"- [{r.get('source','?')}] {(r.get('preview') or '').strip()[:240]}"
                for r in res
            )
    except Exception:
        pass
    # 2) Fallback: motore diretto (carica torch — solo se l'API non risponde)
    try:
        from NODES.MENTE_RAG.rag_engine import search
        res = search(query, top_k=k, demote_dirs=("STORIE",))
        if res:
            return "\n".join(
                f"- [{r['source']}] {r['preview'].strip()[:240]}" for r in res
            )
    except Exception as e:
        logger.warning("RAG context non disponibile (%s) — episodio non grounded", e)
    return ""


# ── EPISODIO ESISTENTE ────────────────────────────────────────────────────────

def episode_slug(group: dict) -> str:
    date = group["date"].replace("-", "")
    first_subject = group["commits"][0]["subject"]
    # rimuovi prefissi tipo "feat:", "chore:", "fix:" ecc.
    clean = re.sub(r"^(feat|fix|chore|docs|auto|refactor|test|ci)(\([^)]*\))?:\s*", "", first_subject, flags=re.IGNORECASE)
    slug = re.sub(r"[^a-z0-9]+", "_", clean[:40].lower()).strip("_")
    slug = slug[:35]  # max lunghezza
    return f"EP_{date}_{slug}"


def episode_exists(slug: str) -> bool:
    return (CE_ROOT / f"{slug}.md").exists()


# ── GENERAZIONE CLAUDE ────────────────────────────────────────────────────────

SYSTEM_PROMPT = """Sei il narratore di TITANIUM_OS — il sistema cognitivo di Matteo Benenati.

Matteo è un artigiano industriale (TIG/MIG titanio MotoGP, robot, presse, QC) che costruisce:
- V32: CNC 3 assi da 178 kg in una taverna da 12 m² — corpo unico, Epoxy Granite, precisione IT6-IT7
- MIMS: sistema modulare di connettori fisici — tiles 190x190, PA-GF30
- VULCAN: pressa a compressione per le "mattonelle"/pannelli MIMS — il telaio ha 2 cilindri che fungono da guida del piano premente; geometria a croce di centraggio sperimentale
- GENESIS: il sistema cognitivo — RAG ChromaDB, Flask API, React dashboard, agenti AI, MCP server
- EVA: WhatsApp automation per il centro estetico di Maria
Target capannone: 15 luglio 2030

Il tuo stile è quello degli episodi S1: narrativo, cinematografico, tecnico ma personale. ZERO motivational speech.
I dati sono reali. Le decisioni sono verificate. Il tono è onesto — anche sui fallimenti e i momenti difficili.

REGOLA DI CANONE (inderogabile): i componenti di V32 e VULCAN NON si descrivono MAI come
"recuperati / usati / di recupero / a costo zero / seconda mano". Sono componenti industriali
reali: usa SEMPRE la specifica tecnica + la logica progettuale (es. "PLC industriale Siemens
S7-314C"). Ancorati ai FATTI DALL'ARCHIVIO (RAG) qui sotto: usa QUEI numeri e decisioni, non
inventare quote né attribuire a VULCAN parti di altre macchine (es. il telaio CNC).

Ogni episodio ha:
- COLD OPEN cinematografico (1 immagine o scena concreta)
- 3 ATTI narrativi con dati tecnici reali
- CHIUSURA con riflessione non retorica
- reel_hook finale (3-5 righe, stile Simone Rizzo: dato concreto → problema → azione → open loop)
- blocco "## FATTI (per il RAG)" — vedi sotto, OBBLIGATORIO
- Tabella metadati finale

## FATTI (per il RAG) — terzo requisito del canone
Un episodio non è solo una bella storia: deve INSEGNARE al sistema (regola 7: il loop
V32 → episodio → RAG → Claude più informato). In coda, prima della tabella metadati,
aggiungi SEMPRE un blocco così:

## FATTI (per il RAG)
- DECISIONE: <cosa è stato deciso, con il numero/parametro reale>
- LOGICA: <perché, la causa tecnica verificabile>
- OBIETTIVO: <cosa sblocca / prossimo passo misurabile>
(3-6 righe, fatti atomici con numeri e decisioni, in forma che il RAG recupera secco.
Solo specifiche e logica progettuale — MAI ricette o segreti: quelli restano in MENTE/_VAULT.)

Rispondi SOLO con il markdown dell'episodio. Nessuna spiegazione prima o dopo."""


def generate_episode(group: dict, sessions: list[str], snapshot: dict) -> str:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return ""

    client = anthropic.Anthropic(api_key=api_key, max_retries=4)

    commits_text = "\n".join(
        f"- [{c['date']}] {c['subject']}" + (f"\n  {c['body']}" if c['body'] else "")
        for c in group["commits"]
    )

    sessions_text = "\n\n---\n\n".join(sessions[:3]) if sessions else "Nessuna sessione disponibile."

    active_milestone = snapshot.get("active_milestone", "Config G")
    pillars = snapshot.get("pillars", {})
    last_action = snapshot.get("last_action", "")

    # GROUNDING: interroga il RAG con i temi dei commit di questo gruppo, cosi'
    # l'episodio si ancora ai fatti reali di MENTE (regola 7) invece che ai soli
    # subject di git. La query e' la sintesi dei subject del gruppo.
    rag_query = " ".join(c["subject"] for c in group["commits"])[:300]
    rag_context = retrieve_context(rag_query)
    if rag_context:
        logger.info("RAG: %d fonti per il grounding (%s)",
                    len(rag_context.splitlines()), rag_query[:50])
    fonti_block = (
        f"FATTI DAL TUO ARCHIVIO (MENTE/RAG) — usa QUESTI dati reali, numeri e decisioni; "
        f"NON inventare e NON confondere macchine diverse:\n{rag_context}\n"
        if rag_context else
        "(Nessun fatto specifico recuperato dall'archivio: resta sui fatti del commit/milestone, "
        "non inventare numeri.)\n"
    )

    user_prompt = f"""Genera un episodio podcast narrativo per TITANIUM_OS basato su questo lavoro:

DATA: {group['date']}
COMMIT (lavoro completato):
{commits_text}

CONTESTO PROGETTO:
- Milestone attivo: {active_milestone}
- V32: {pillars.get('V32', {}).get('pct_complete', '?')}% completamento
- GENESIS: {pillars.get('GENESIS', {}).get('pct_complete', '?')}% completamento
- Ultima azione: {last_action[:200]}

{fonti_block}
ESTRATTI SESSIONI RECENTI:
{sessions_text[:1200]}

Genera l'episodio completo in stile S1 (narrativo, cinematografico, tecnico, personale).
Il titolo deve catturare l'essenza del lavoro — non il nome tecnico del commit.
Se c'è materiale per più angoli narrativi, scegli quello più significativo per Matteo.
Includi sempre il reel_hook alla fine."""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )
    return response.content[0].text


# ── SALVATAGGIO ───────────────────────────────────────────────────────────────

def save_episode(slug: str, content: str, date: str):
    # Canon guard (regola scalabile): pulisce alla FONTE il framing vietato
    # "componente recuperato/usato/EUR 0" per V32/VULCAN prima di scrivere.
    try:
        from AUTOMATIONS.core.canon_guard import clean as _canon_clean
        content = _canon_clean(content)
    except Exception:
        pass
    for dest in [CE_ROOT / f"{slug}.md", ST_ROOT / f"{slug}.md"]:
        dest.write_text(content, encoding="utf-8")
        logger.info("salvato: %s", dest.relative_to(TI_ROOT) if TI_ROOT in dest.parents else dest.name)


# ── MAIN ──────────────────────────────────────────────────────────────────────

def main(backfill: bool = False, max_groups: int = 5):
    logger.info("avvio%s", " (backfill)" if backfill else "")

    state = load_state()
    last_commit = None if backfill else state.get("last_commit")

    commits = git_log_since(last_commit, max_commits=80 if backfill else 30)
    if not commits:
        logger.info("nessun commit nuovo — skip")
        state["last_run"] = datetime.now().isoformat()
        save_state(state)
        return

    groups = group_commits_by_theme(commits)
    logger.info("%d commit -> %d gruppi tematici", len(commits), len(groups))

    sessions = get_recent_sessions(days=7 if backfill else 3)
    snapshot = get_project_snapshot()

    generated = 0
    for group in groups[:max_groups]:
        slug = episode_slug(group)
        if episode_exists(slug) and not backfill:
            logger.debug("già esiste: %s — skip", slug)
            continue

        logger.info("genero: %s (%d commit)", slug, len(group["commits"]))
        content = generate_episode(group, sessions, snapshot)
        if content:
            save_episode(slug, content, group["date"])
            state["episodes_generated"].append({"slug": slug, "date": group["date"]})
            generated += 1
        else:
            logger.error("generazione fallita per %s", slug)

    if commits:
        state["last_commit"] = commits[0]["hash"]
    state["last_run"] = datetime.now().isoformat()
    save_state(state)

    # Gli episodi appena scritti su disco devono entrare in episodes.json (la fonte
    # che il dashboard renderizza), altrimenti nascono orfani/invisibili. Best-effort.
    if generated:
        sync_episodes_json()

    logger.info("done — %d episodi generati", generated)


def _run_script(rel_path: str, label: str):
    """Esegue uno script CONTENT_ENGINE come modulo. Best-effort: non solleva."""
    try:
        import importlib.util
        p = TI_ROOT / rel_path
        spec = importlib.util.spec_from_file_location(p.stem, p)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        mod.main()
        logger.info("%s ok", label)
    except Exception as e:
        logger.warning("%s fallito: %s", label, e)


def sync_episodes_json():
    """Pipeline storie post-generazione (best-effort, ordine importante):
    1. build_episodes_json: i .md nuovi entrano in episodes.json (+ albero + narrativa)
    2. storie_intersect: ricalcola la RETE di legami fra episodi (collegati)
    3. setup_obsidian: propaga episodi + wikilink Collegati nel vault (grafo connesso)
    Un errore in un passo non blocca il run notturno."""
    _run_script("CONTENT_ENGINE/scripts/build_episodes_json.py", "episodes.json sincronizzato")
    _run_script("CONTENT_ENGINE/scripts/storie_intersect.py", "intersezione episodi ricalcolata")
    _run_script("CONTENT_ENGINE/scripts/storie_evoluzione.py", "episodi organizzati per evoluzione")
    _run_script("CONTENT_ENGINE/scripts/setup_obsidian.py", "vault Obsidian aggiornato")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--backfill", action="store_true",
                        help="Processa tutto lo storico (ignora last_commit)")
    parser.add_argument("--max", type=int, default=5,
                        help="Max gruppi da processare in un run")
    args = parser.parse_args()
    main(backfill=args.backfill, max_groups=args.max)
