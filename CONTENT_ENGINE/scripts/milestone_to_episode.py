"""
========================================================
CONTENT ENGINE — MILESTONE TO EPISODE GENERATOR
Modulo    : milestone_to_episode.py
Parte di  : CONTENT_ENGINE/scripts/
Versione  : 1.0.0
Data      : 2026-03-18
========================================================
Funzione  : Legge STATE.json, trova milestone senza episodio,
            chiama Claude API per generare storytelling podcast,
            salva .md in DATABASE/episodes/SA_AUTO/,
            aggiorna DASHBOARD/src/data/storieData.ts.
Input     : STATE.json (milestones.verified)
Output    : .md episodi + storieData.ts aggiornato
Avvio     : python milestone_to_episode.py
            python milestone_to_episode.py --all   (forza rigenerazione)
========================================================
"""

import sys
import re
import json
import argparse
import logging
from pathlib import Path
from datetime import datetime

# ── Paths ──────────────────────────────────────────────────────────────────
# LOGICA: path relativi — CONTENT_ENGINE e' il parent di scripts/
CONTENT_ENGINE  = Path(__file__).resolve().parent.parent
# LOGICA: TITANIUM_OS risale da CONTENT_ENGINE se dentro il repo,
#         altrimenti usa env var
import os
_tos_env = os.getenv("TITANIUM_OS_ROOT")
if _tos_env:
    TITANIUM_OS = Path(_tos_env)
elif (CONTENT_ENGINE.parent / "BRAIN").exists():
    # LOGICA: CONTENT_ENGINE e' dentro TITANIUM_OS
    TITANIUM_OS = CONTENT_ENGINE.parent
else:
    # LOGICA: CONTENT_ENGINE e' su Desktop accanto a TITANIUM_OS
    TITANIUM_OS = CONTENT_ENGINE.parent / "TITANIUM_OS"
STATE_JSON      = TITANIUM_OS / "BRAIN" / "STATE.json"
EPISODES_DIR    = CONTENT_ENGINE / "DATABASE" / "episodes" / "SA_AUTO"
PROCESSED_FILE  = CONTENT_ENGINE / "DATABASE" / "PROCESSED_MILESTONES.json"
STORIE_DATA_TS  = TITANIUM_OS / "DASHBOARD" / "src" / "data" / "storieData.ts"
LOG_PATH        = CONTENT_ENGINE / "scripts" / "logs" / "generator.log"

EPISODES_DIR.mkdir(parents=True, exist_ok=True)
LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [GENERATOR] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("generator")

# ── Claude API ─────────────────────────────────────────────────────────────
def _get_retry_client():
    """Importa _api_retry da AUTOMATIONS/core/ se disponibile, altrimenti fallback."""
    try:
        # LOGICA: aggiungi AUTOMATIONS/core/ al path per usare _api_retry
        core_path = TITANIUM_OS / "AUTOMATIONS" / "core"
        if str(core_path) not in sys.path:
            sys.path.insert(0, str(core_path))
        from _api_retry import get_client, call_claude
        return get_client(), call_claude
    except ImportError:
        # LOGICA: fallback se _api_retry non disponibile (es. GitHub Actions)
        import anthropic
        client = anthropic.Anthropic()
        def _simple_call(c, *, model, max_tokens, system="", user=""):
            msg = c.messages.create(
                model=model, max_tokens=max_tokens, system=system,
                messages=[{"role": "user", "content": user}]
            )
            return msg.content[0].text
        return client, _simple_call


def retrieve_context(milestone: str, k: int = 6) -> str:
    """Recupera fatti reali dal RAG (MENTE/) sul milestone — grounding dell'episodio."""
    try:
        if str(TITANIUM_OS) not in sys.path:
            sys.path.insert(0, str(TITANIUM_OS))
        from NODES.MENTE_RAG.rag_engine import search
        results = search(milestone, top_k=k)
        if not results:
            return ""
        return "\n".join(f"- [{r['source']}] {r['preview'].strip()}" for r in results)
    except Exception as e:
        log.warning(f"RAG context non disponibile ({e}) — episodio non grounded")
        return ""


def load_previous_episode() -> dict:
    """Ultimo episodio AUTO generato: titolo + chiusura — per dare continuita' narrativa."""
    if not EPISODES_DIR.exists():
        return {}
    mds = sorted(EPISODES_DIR.glob("EP_AUTO_*.md"))
    if not mds:
        return {}
    text = mds[-1].read_text(encoding="utf-8", errors="ignore")
    title = re.search(r'^title:\s*"(.+)"$', text, re.M)
    # estrai la sezione CHIUSURA (la frase che rimane)
    chiusura = re.search(r'##\s*CHIUSURA\s*(.+?)(?:\n##|\Z)', text, re.DOTALL | re.IGNORECASE)
    return {
        "title":    title.group(1) if title else "",
        "chiusura": (chiusura.group(1).strip()[:300] if chiusura else ""),
    }


def generate_episode_content(milestone: str, context: dict,
                             rag_context: str = "", prev: dict | None = None) -> str:
    """Chiama Claude API per generare episodio storytelling podcast, grounded sul RAG
    e collegato all'episodio precedente (filo narrativo)."""
    client, call_fn = _get_retry_client()
    prev = prev or {}

    pillars_summary = "\n".join([
        f"- {k}: {v.get('phase', v.get('status','?'))} ({v.get('pct_complete',0)}%)"
        for k, v in context.get("pillars", {}).items()
    ])

    fonti_block = (
        f"\nFATTI DAL TUO ARCHIVIO (MENTE/RAG) — usa QUESTI dati reali, numeri e decisioni; NON inventare:\n{rag_context}\n"
        if rag_context else
        "\n(Nessun fatto specifico recuperato dall'archivio: resta sui fatti del milestone, non inventare numeri.)\n"
    )

    continuita_block = ""
    if prev.get("title"):
        continuita_block = (
            f"\nEPISODIO PRECEDENTE (per continuita', NON ripeterlo):\n"
            f"- Titolo: {prev['title']}\n"
            f"- Chiudeva con: {prev.get('chiusura','')}\n"
            f"Apri richiamando in una riga dove eravamo rimasti, poi vai avanti.\n"
        )

    prompt = f"""Sei lo scrittore del podcast "Il Sistema" — storia personale di Matteo Benenati,
artigiano industriale che costruisce TITANIUM_OS: una fresatrice CNC (V32), connettori modulari (MIMS),
automazioni (GENESIS), una pressa polimeri (VULCAN), e un centro estetico gestito con AI (EVA/Vita Natura).

Scrivi un episodio podcast completo in italiano, prima persona (voce di Matteo).
Tono: diretto, tecnico, concreto, zero retorica. Come raccontare a un amico in officina.
Aggancia il racconto a numeri, materiali e decisioni REALI (vedi i fatti dall'archivio). Niente frasi vuote.

MILESTONE DA RACCONTARE:
"{milestone}"

CONTESTO PROGETTO:
{pillars_summary}
{fonti_block}{continuita_block}
FORMATO OBBLIGATORIO:
---
## COLD OPEN
[2-3 righe ad effetto che introducono il momento; se c'e' continuita', richiama dove eravamo]

## ATTO I — [titolo]
[contesto: perche' questo milestone conta, cosa c'era prima — usa i fatti dall'archivio]

## ATTO II — [titolo]
[il momento specifico: cosa e' successo, come, con quali numeri/materiali/scelte tecniche]

## ATTO III — [titolo]
[conseguenze concrete: cosa cambia adesso, cosa si sblocca, prossimo passo]

## CHIUSURA
[citazione in corsivo — la frase che rimane, collegata al filo della storia]

## FATTI (per il RAG)
[3-6 righe di fatti atomici, terzo requisito del canone — l'episodio deve INSEGNARE al
sistema, non solo raccontare (regola 7). Forma che il RAG recupera secco:
- DECISIONE: <cosa deciso, col numero/parametro reale>
- LOGICA: <perche', la causa tecnica>
- OBIETTIVO: <cosa sblocca / prossimo passo misurabile>
Solo specifiche e logica progettuale, MAI ricette o segreti.]
---

Lunghezza: 900-1300 parole nei 3 atti. Sezioni chiare. NO bullet point nella prosa
(i bullet SOLO nel blocco FATTI). Prosa densa di sostanza."""

    return call_fn(client, model="claude-sonnet-4-6",
                   max_tokens=2600, system="", user=prompt)


# ── Helpers ────────────────────────────────────────────────────────────────
def milestone_to_id(milestone: str, idx: int) -> str:
    """Genera ID episodio da testo milestone."""
    # Estrai data se presente (es. "13 Feb 2026")
    date_match = re.search(r'\((\d{1,2}\s+\w+\s+\d{4})\)', milestone)
    suffix = f"{idx:02d}"
    return f"EP_AUTO_{suffix}"


def milestone_to_slug(milestone: str) -> str:
    """Genera slug file da testo milestone."""
    clean = re.sub(r'[^\w\s]', '', milestone.lower())
    clean = re.sub(r'\s+', '_', clean.strip())
    return clean[:40]


def extract_date(milestone: str) -> str:
    """Estrae data dal testo milestone, fallback oggi."""
    months = {
        "gen": "01", "feb": "02", "mar": "03", "apr": "04",
        "mag": "05", "giu": "06", "lug": "07", "ago": "08",
        "set": "09", "ott": "10", "nov": "11", "dic": "12"
    }
    m = re.search(r'(\d{1,2})\s+(\w+)\s+(\d{4})', milestone, re.IGNORECASE)
    if m:
        day, mon_str, year = m.group(1), m.group(2).lower()[:3], m.group(3)
        mon = months.get(mon_str, "01")
        return f"{year}-{mon}-{day.zfill(2)}"
    return datetime.now().strftime("%Y-%m-%d")


def load_processed() -> dict:
    if PROCESSED_FILE.exists():
        return json.loads(PROCESSED_FILE.read_text(encoding="utf-8"))
    return {"processed": []}


def save_processed(data: dict):
    PROCESSED_FILE.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )


def milestone_to_subtitle(milestone: str) -> str:
    """Genera sottotitolo descrittivo dal testo del milestone."""
    m = milestone.lower()
    if "dashboard" in m or "react" in m:
        return "Il sistema diventa visibile"
    if "asse" in m or "guida" in m or "servo" in m:
        return "Un asse prende vita"
    if "hmi" in m or "tp900" in m or "plc" in m:
        return "Il cervello della macchina"
    if "saldato" in m or "tig" in m or "gusset" in m:
        return "Metallo che diventa struttura"
    if "epoxy" in m or "granite" in m or "composito" in m:
        return "Il carattere della macchina"
    if "mcp" in m or "rag" in m or "chroma" in m:
        return "La memoria esternalizzata"
    if "assoluto" in m or "documento" in m:
        return "La verità messa su carta"
    if "bronzin" in m or "pezzi" in m or "lavorat" in m:
        return "Geometria che diventa linguaggio"
    if "componenti" in m or "bom" in m or "ordinato" in m:
        return "Dalla teoria alla fisica"
    if "content" in m or "episodi" in m or "dataset" in m:
        return "La storia documentata"
    if "milestone" in m or "completato" in m:
        return "Un passo avanti nel sistema"
    return "Milestone verificato · auto-generato"


def build_frontmatter(ep_id: str, milestone: str, date: str) -> str:
    short_title = milestone[:50].rstrip(".,")
    subtitle = milestone_to_subtitle(milestone)
    return f"""---
id: {ep_id}
title: "{short_title}"
sottotitolo: "{subtitle}"
stagione: AUTO
stagione_label: "Generato"
data_evento: {date}
data_generato: {datetime.now().strftime("%Y-%m-%d")}
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "{milestone}"
---

"""


def save_episode_md(ep_id: str, milestone: str, content: str, date: str) -> Path:
    slug = milestone_to_slug(milestone)
    filename = f"{ep_id}_{slug}.md"
    filepath = EPISODES_DIR / filename
    full_content = f"# {ep_id} — Milestone\n### \"{milestone[:60]}\"\n\n" + build_frontmatter(ep_id, milestone, date) + content
    filepath.write_text(full_content, encoding="utf-8")
    log.info(f"Salvato: {filepath.name}")
    return filepath


def _js(s) -> str:
    """Stringa JS sicura via JSON (escapa backslash, backtick, virgolette, newline, ${).
    Bulletproof: impossibile rompere il parsing (a differenza dei template literal)."""
    return json.dumps(s, ensure_ascii=False)


def build_ts_entry(ep_id: str, milestone: str, date: str, content: str) -> str:
    """Genera entry TypeScript per storieData.ts (stringhe via JSON, no template literal)."""
    title = milestone[:50].rstrip(".,")
    subtitle = milestone_to_subtitle(milestone)
    preview = content[:150].replace('\n', ' ').strip()
    tags = json.dumps(["auto_generato", "milestone"])

    return f"""  {{
    id: {_js(ep_id)},
    title: {_js(title)},
    sottotitolo: {_js(subtitle)},
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: {_js(date)},
    tags: {tags},
    status: "ready",
    durata_min: 8,
    preview: {_js(preview)},
    content: {_js(content)},
  }},"""


def update_storie_data_ts(new_entries: list[str]):
    """Aggiunge nuovi episodi alla sezione AUTO di storieData.ts."""
    if not STORIE_DATA_TS.exists():
        log.warning("storieData.ts non trovato, skip aggiornamento dashboard.")
        return

    content = STORIE_DATA_TS.read_text(encoding="utf-8")

    START_MARKER = "// AUTO_GENERATED_START"
    END_MARKER   = "// AUTO_GENERATED_END"

    new_block = "\n".join(new_entries)

    if START_MARKER in content and END_MARKER in content:
        # Sostituisce il blocco esistente
        pattern = re.compile(
            rf"{re.escape(START_MARKER)}.*?{re.escape(END_MARKER)}",
            re.DOTALL
        )
        replacement = f"{START_MARKER}\n{new_block}\n  {END_MARKER}"
        # repl come funzione: i backslash nel contenuto (path C:\Users -> \U) NON
        # vengono interpretati come escape della regex (fix re.error bad escape)
        content = pattern.sub(lambda _m: replacement, content)
    else:
        # Aggiunge prima della chiusura dell'array EPISODES
        insert_before = "];"
        if insert_before in content:
            block = f"\n  {START_MARKER}\n{new_block}\n  {END_MARKER}\n"
            content = content.replace(
                "// ── STAGIONE T ───────────────────────────────────────────────",
                f"// ── STAGIONE AUTO (generata) ──────────────────────────────\n  {START_MARKER}\n  {END_MARKER}\n\n  // ── STAGIONE T ─────────────────────────────────────────────"
            )
            # Dopo il blocco AUTO aggiunto, riapplica con entries
            if START_MARKER in content:
                pattern = re.compile(
                    rf"{re.escape(START_MARKER)}.*?{re.escape(END_MARKER)}",
                    re.DOTALL
                )
                replacement = f"{START_MARKER}\n{new_block}\n  {END_MARKER}"
                # repl come funzione: i backslash nel contenuto (path C:\Users -> \U) NON
        # vengono interpretati come escape della regex (fix re.error bad escape)
        content = pattern.sub(lambda _m: replacement, content)

    STORIE_DATA_TS.write_text(content, encoding="utf-8")
    log.info(f"storieData.ts aggiornato con {len(new_entries)} episodi auto.")


def _next_auto_index() -> int:
    """Prossimo numero EP_AUTO libero su disco — evita ID duplicati (fix au20)."""
    mx = -1
    if EPISODES_DIR.exists():
        for f in EPISODES_DIR.glob("EP_AUTO_*.md"):
            m = re.match(r"EP_AUTO_(\d+)", f.stem)
            if m:
                mx = max(mx, int(m.group(1)))
    return mx + 1


# ── Main ───────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Forza rigenerazione di tutti i milestone")
    parser.add_argument("--sync", action="store_true", help="Solo ricostruzione storieData.ts dai .md su disco (no generazione, no API)")
    args = parser.parse_args()

    if args.sync:
        all_auto = _load_all_auto_ts()
        update_storie_data_ts(all_auto)
        log.info(f"Sync: storieData.ts ricostruito da {len(all_auto)} episodi AUTO su disco.")
        return

    # Leggi STATE.json
    if not STATE_JSON.exists():
        log.error(f"STATE.json non trovato: {STATE_JSON}")
        sys.exit(1)

    state = json.loads(STATE_JSON.read_text(encoding="utf-8"))
    milestones = state.get("milestones", {}).get("verified", [])
    context = {
        "pillars": state.get("pillars", {}),
        "active_milestone": state.get("active_milestone", ""),
    }

    if not milestones:
        log.info("Nessun milestone trovato in STATE.json")
        return

    processed = load_processed()
    done_set = set(processed["processed"]) if not args.all else set()

    # LOGICA: dedup — controlla anche file .md gia' esistenti su disco
    existing_slugs = {f.stem for f in EPISODES_DIR.glob("EP_AUTO_*.md")} if EPISODES_DIR.exists() else set()

    new_episodes_ts = []
    count = 0
    prev_ep  = load_previous_episode()   # continuita' col backlog gia' esistente
    auto_idx = _next_auto_index()        # ID collision-free: prossimo numero libero (fix au20)

    for idx, milestone in enumerate(milestones):
        if milestone in done_set:
            log.info(f"Skip (gia' processato): {milestone[:50]}")
            continue

        slug = milestone_to_slug(milestone)

        # LOGICA: dedup su disco per SLUG (indipendente dall'indice -> niente ID duplicati)
        if any(stem.endswith(f"_{slug}") for stem in existing_slugs):
            log.info(f"Skip (file esiste): _{slug}")
            if milestone not in processed["processed"]:
                processed["processed"].append(milestone)
                save_processed(processed)
            continue

        ep_id = f"EP_AUTO_{auto_idx:02d}"
        auto_idx += 1

        log.info(f"Generando episodio per: {milestone[:60]}...")
        date   = extract_date(milestone)

        # Recupera fatti reali dal RAG + genera contenuto grounded e collegato al precedente
        rag_ctx = retrieve_context(milestone)
        if rag_ctx:
            log.info(f"  RAG: {len(rag_ctx.splitlines())} fonti recuperate per il grounding")
        content = generate_episode_content(milestone, context, rag_context=rag_ctx, prev=prev_ep)

        # Aggiorna la continuita' per il prossimo episodio (titolo + chiusura di questo)
        _ch = re.search(r'##\s*CHIUSURA\s*(.+?)(?:\n##|\Z)', content, re.DOTALL | re.IGNORECASE)
        prev_ep = {"title": milestone[:50].rstrip(".,"),
                   "chiusura": (_ch.group(1).strip()[:300] if _ch else "")}

        # Salva .md
        save_episode_md(ep_id, milestone, content, date)

        # Prepara entry TypeScript
        new_episodes_ts.append(build_ts_entry(ep_id, milestone, date, content))

        # Marca come processato
        processed["processed"].append(milestone)
        save_processed(processed)
        count += 1

    if new_episodes_ts:
        # Carica tutti gli episodi auto esistenti per ricostruire il blocco completo
        all_auto_ts = _load_all_auto_ts()
        all_auto_ts.extend(new_episodes_ts)
        update_storie_data_ts(all_auto_ts)
        log.info(f"Completato: {count} nuovi episodi generati.")
    else:
        log.info("Nessun nuovo milestone da processare.")


def _load_all_auto_ts() -> list[str]:
    """Ricostruisce le entry TS dagli .md già generati (per rebuild completo)."""
    entries = []
    if not EPISODES_DIR.exists():
        return entries
    for md_file in sorted(EPISODES_DIR.glob("EP_AUTO_*.md")):
        text = md_file.read_text(encoding="utf-8", errors="ignore")
        # Estrai frontmatter
        fm_match = re.search(r'---\n(.*?)\n---', text, re.DOTALL)
        if not fm_match:
            continue
        fm_text = fm_match.group(1)
        ep_id = re.search(r'^id:\s*(.+)$', fm_text, re.M)
        title = re.search(r'^title:\s*"(.+)"$', fm_text, re.M)
        date  = re.search(r'^data_evento:\s*(.+)$', fm_text, re.M)
        milestone = re.search(r'^milestone_originale:\s*"(.+)"$', fm_text, re.M)
        if not (ep_id and title and date):
            continue
        # Corpo dopo il frontmatter
        body = text.split('---\n', 2)[-1] if text.count('---') >= 2 else text
        entries.append(build_ts_entry(
            ep_id.group(1).strip(),
            milestone.group(1) if milestone else title.group(1),
            date.group(1).strip(),
            body[:1200]
        ))
    return entries


if __name__ == "__main__":
    main()
