# nina_agent.py | TITANIUM_OS / NODES / NINA_AGENT | v1.0 | 2026-06-22
# Generatore Nina v2 GROUNDED a 2 stadi: 1 concetto reale -> 1 avventura.
#   Stadio 1 — ARCHITETTO (haiku): interroga il RAG (MENTE) e progetta lo scheletro
#              dell'episodio (analogia "test della sarta", strato-fondo reale, open
#              loop, FATTI atomici). Ancora la favola a fatti VERI, non inventati.
#   Stadio 2 — SCRITTORE (sonnet): scrive l'avventura completa nella voce di
#              Nina/THEMIS/FORGE, formato canonico identico agli EP_N2_*, dalla
#              Character Bible VIVA (letta da MENTE, cosi' resta in sync).
# Output in S_AVVENTURA/_PROPOSTI/ con status 'proposto_da_validare' (canone Nina v2:
# "il sistema PROPONE, l'umano APPROVA" — gli episodi definitivi li valida Matteo;
# i temi di VALORI/relazioni li decide il genitore). Stampa la riga NINA_SEED da
# aggiungere a build_episodes_json.py quando l'episodio viene promosso.
#
# Uso:
#   python nina_agent.py --concept "l'allucinazione: quando la mente inventa" \
#          --regione 3 --giro 2 --richiama "⟡3" --casella 8
#   (--rag opzionale per la query di grounding; default = il concetto)

import os
import sys
import io
import re
import json
import logging
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))
try:
    from CORE.log import get_logger
    logger = get_logger("nina_agent")
except ImportError:
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s [nina_agent] %(levelname)s %(message)s")
    logger = logging.getLogger("nina_agent")

try:
    import anthropic
except ImportError:
    logger.error("anthropic non installato")
    sys.exit(1)

TI_ROOT  = _ROOT
MENTE    = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
AV_CE       = TI_ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S_AVVENTURA"
AV_PROPOSTI = AV_CE / "_PROPOSTI"
AV_ARCHIVIO = AV_CE / "_ARCHIVIO"
AV_MENTE    = MENTE / "STORIE" / "S_AVVENTURA"
BIBLE    = MENTE / "KNOWLEDGE" / "NINA_V2_CHARACTER_BIBLE.md"
ARCH     = MENTE / "KNOWLEDGE" / "NINA_V2_ARCHITETTURA.md"
# Registro asse_nina degli auto-generati (letto da build_episodes_json -> compaiono sulla Mappa)
SEED_AUTO   = TI_ROOT / "CONTENT_ENGINE" / "scripts" / "nina_seed_auto.json"
# Stato del nodo (per /api/nina/status e il pannello RAG Nina)
NINA_STATE  = TI_ROOT / "DATA" / "nina_state.json"

MODEL_ARCH   = "claude-haiku-4-5-20251001"   # stadio 1: struttura, economico
MODEL_WRITER = "claude-sonnet-4-6"           # stadio 2: prosa, qualita'
# Grounding obbligatorio: minimo di righe-fatto dal RAG sotto cui NON si genera (dal vero o niente)
MIN_GROUNDING_LINES = 2

REGIONI_NINA = {
    0: "LA MATERIA", 1: "LA TRACCIA", 2: "L'OFFICINA CHE GIRA SOLA",
    3: "LA MENTE CHE PARLA", 4: "LA BIBLIOTECA DELLE FONTI", 5: "LA GRANDE MAPPA",
    6: "L'ESERCITO SILENZIOSO", 7: "IL DIRETTORE",
}


# ── GROUNDING RAG ─────────────────────────────────────────────────────────────

def retrieve_context(query: str, k: int = 8) -> str:
    """Fatti reali da MENTE/RAG per ancorare l'avventura. API locale (leggera),
    fallback motore diretto, poi best-effort (vuoto -> niente numeri inventati)."""
    query = (query or "").strip()[:300]
    if not query:
        return ""
    try:
        url = "http://localhost:5001/api/rag/search?" + urllib.parse.urlencode({"q": query})
        with urllib.request.urlopen(url, timeout=25) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        res = (data.get("results") or [])[:k]
        if res:
            return "\n".join(
                f"- [{r.get('source','?')}] {(r.get('preview') or '').strip()[:260]}"
                for r in res
            )
    except Exception:
        pass
    try:
        from NODES.MENTE_RAG.rag_engine import search
        res = search(query, top_k=k)
        if res:
            return "\n".join(f"- [{r['source']}] {r['preview'].strip()[:260]}" for r in res)
    except Exception as e:
        logger.warning("RAG non disponibile (%s) — avventura non grounded", e)
    return ""


# ── CANONE VIVO ───────────────────────────────────────────────────────────────

def _read(p: Path, limit: int = 6000) -> str:
    try:
        return p.read_text(encoding="utf-8", errors="ignore")[:limit]
    except Exception:
        return ""


def load_canon() -> str:
    """Estrae le REGOLE DI STILE + personaggi dalla Character Bible viva (e un
    estratto dell'Architettura). Cosi' la voce resta IDENTICA e in sync se Matteo
    edita la bible — niente regole hardcodate che divergono dal canone."""
    bible = _read(BIBLE, 6000)
    # tieni le sezioni personaggi + regole di stile (il cuore della coerenza)
    return bible or "(Character Bible non trovata — usa il canone noto di Nina v2.)"


def next_episode_id() -> str:
    mx = 0
    for d in (AV_CE, AV_PROPOSTI):
        if d.exists():
            for f in d.glob("EP_N2_*.md"):
                m = re.match(r"EP_N2_(\d+)", f.stem)
                if m:
                    mx = max(mx, int(m.group(1)))
    return f"EP_N2_{mx + 1:02d}"


# ── STADIO 1 — ARCHITETTO ─────────────────────────────────────────────────────

ARCH_SYSTEM = """Sei l'ARCHITETTO degli episodi di "Nina" (media educativo di TITANIUM_OS).
Progetti lo SCHELETRO di UN episodio che insegna UN concetto reale a una bambina curiosa.
Regole non negoziabili del mondo: l'antagonista e' il DISORDINE/Entropia (una forza, mai un
cattivo con la faccia); ogni episodio ha 3 strati (bambino/curioso/grande); UN esempio
domestico-artigiano ("test della sarta"); un open loop finale che tira alla casella dopo; un
piccolo esperimento "Provalo tu". Lo STRATO FONDO e i FATTI devono basarsi sui FATTI DALL'ARCHIVIO
(RAG) reali: NON inventare numeri o meccanismi. Rispondi SOLO con un JSON valido, nient'altro."""


def stage1_architect(client, concept: str, rag_context: str, meta: dict) -> dict:
    fonti = (f"FATTI DALL'ARCHIVIO (MENTE/RAG) — la verita' reale su cui ancorare:\n{rag_context}\n"
             if rag_context else "(Nessun fatto dall'archivio: resta generale, non inventare numeri.)\n")
    regione_nome = REGIONI_NINA.get(meta.get("regione"), "")
    user = f"""CONCETTO REALE DA INSEGNARE (1 concetto = 1 avventura):
"{concept}"

POSTO NELLA MAPPA: regione {meta.get('regione','?')} {regione_nome} · giro {meta.get('giro','?')} · casella {meta.get('casella','?')}

{fonti}
Progetta lo scheletro. Rispondi SOLO con questo JSON (valori in italiano, concreti):
{{
  "title": "titolo breve ed evocativo (no nome tecnico)",
  "sottotitolo": "una frase che cattura l'essenza, voce calda",
  "insegna": "cosa impara, in 1 frase chiara",
  "posto_mappa": "1 frase: che terra/luogo e' nella mappa viva",
  "dove_siamo": "micro-recap 1-2 righe dei prerequisiti (l'episodio si regge da solo)",
  "test_della_sarta": "UN esempio domestico/artigiano (cucito, cucina, nodi, misure) che spiega il concetto",
  "key_images": ["5 immagini-chiave concrete per l'animazione"],
  "strato_fondo": "il fatto tecnico VERO per il 'grande/papa' (dai FATTI RAG, niente invenzioni)",
  "open_loop": "la domanda finale che tira alla casella successiva",
  "provalo_tu": "un piccolo esperimento reale da fare a casa",
  "aggancio_reale": "il nodo reale del sistema GENESIS/V32/MIMS che questo concetto rispecchia",
  "fatti_rag": ["3-5 FATTI atomici, grounded, che il RAG recupera secco (con numeri/decisioni se presenti)"]
}}"""
    # Retry: ogni tanto haiku non restituisce JSON valido (o lo tronca). Riprova alcune
    # volte invece di abortire — cosi' un singolo intoppo non ferma un intero batch/notte.
    last_err = None
    for attempt in range(3):
        try:
            msg = client.messages.create(
                model=MODEL_ARCH, max_tokens=1500, system=ARCH_SYSTEM,
                messages=[{"role": "user", "content": user}],
            )
            txt = msg.content[0].text
            m = re.search(r"\{.*\}", txt, re.DOTALL)
            if not m:
                raise ValueError("nessun JSON nello scheletro")
            return json.loads(m.group(0))
        except (ValueError, json.JSONDecodeError) as e:
            last_err = e
            logger.warning("stadio 1 tentativo %d/3 fallito (%s) — riprovo", attempt + 1, e)
    raise ValueError(f"stadio 1: scheletro non valido dopo 3 tentativi ({last_err})")


# ── STADIO 2 — SCRITTORE ──────────────────────────────────────────────────────

def stage2_writer(client, concept: str, skel: dict, canon: str,
                  rag_context: str, ep_id: str, meta: dict) -> str:
    fonti = (f"FATTI DALL'ARCHIVIO (RAG) — usa QUESTI, non inventare:\n{rag_context}\n"
             if rag_context else "")
    regione_nome = REGIONI_NINA.get(meta.get("regione"), "")
    system = f"""Sei lo SCRITTORE degli episodi di "Nina" v2. Scrivi un'avventura educativa
completa, in italiano, qualita' definitiva (NIENTE bozze, niente moralismo, niente villain
con la faccia). Voce e personaggi IDENTICI alla Character Bible qui sotto.

=== CHARACTER BIBLE (canone vivo) ===
{canon}
=== fine bible ===

Lezione tecnica reale: dev'essere accurata (vedi FATTI dall'archivio). La favola e' lo strato
'bambino', il concetto lo strato 'curioso', i FATTI lo strato 'grande'. Rispondi SOLO con il
markdown dell'episodio, dal titolo H1 fino al blocco FATTI. Nessuna spiegazione prima o dopo."""

    user = f"""Scrivi l'episodio {ep_id} su questo concetto reale:
"{concept}"  (regione {meta.get('regione','?')} {regione_nome} · giro {meta.get('giro','?')} · casella {meta.get('casella','?')})

SCHELETRO (progettato e grounded — rispettalo, e' la spina dorsale):
{json.dumps(skel, ensure_ascii=False, indent=2)}

{fonti}
FORMATO OBBLIGATORIO (identico agli EP_N2_*):

# {ep_id} — [TITOLO]
### "[sottotitolo]"

**Formato:** Avventura (Nina v2) · ~[12-16] min
**Per chi:** [chi se lo chiede]
**Insegna:** [insegna]
**Materia:** [nome regione] (⟡[regione]) · **Casella [casella] del viaggio**
**Posto nella Mappa:** [posto_mappa]

---

> **Dove siamo:** [dove_siamo]

---

## COLD OPEN
[2-4 paragrafi: una scena concreta, un dialogo Nina↔THEMIS che apre il gancio]

## ATTO I — [TITOLO]
[il concetto introdotto col fare; includi il "test della sarta" in un blocco "> *(Esempio per tutti — il test della sarta: ...)*"]

## ATTO II — [TITOLO]
[approfondimento; chiudi con un blocco "> *(Strato fondo — per il grande: [strato_fondo])*"]

## ATTO III — [TITOLO]
[conseguenza pratica / come si usa; lega a una verita'-ponte del canone]

## CHIUSURA
[la casella si accende sulla mappa; poi un blocco citazione con l'OPEN LOOP che termina con la domanda in corsivo verso la casella dopo]

---

*Provalo tu: [provalo_tu]*

---

<!-- SCENE / KEY-IMAGE (per l'animazione) -->
1. ... (5 immagini dalle key_images)

<!-- DIDATTICA -->
**Pietra:** `⟡[regione]` [nome] (giro [giro]). *[il concetto in 1-2 frasi]*
**Pietre richiamate:** [richiama o "—"]
**3 strati:** bambino = ... · curioso = ... · grande = ...
**Cuore:** la curiosita' e' un superpotere · fai bene le cose vere · gli strumenti, non le risposte
**Aggancio reale:** [aggancio_reale]
**Open loop → Casella [casella+1]:** [open_loop]

## FATTI (per il RAG)
- **FATTO:** {ep_id}, casella {meta.get('casella','?')} ([concetto]) del viaggio Nina v2.
- [3-5 bullet dai fatti_rag, atomici, grounded]

Lunghezza: 1100-1600 parole nei 3 atti. Prosa densa, dialoghi voiceabili, ZERO retorica."""

    msg = client.messages.create(
        model=MODEL_WRITER, max_tokens=4000, system=system,
        messages=[{"role": "user", "content": user}],
    )
    return msg.content[0].text


# ── ASSEMBLAGGIO + SALVATAGGIO ────────────────────────────────────────────────

def build_frontmatter(ep_id: str, skel: dict, meta: dict, status: str = "ready") -> str:
    title = skel.get("title", ep_id)
    sub   = skel.get("sottotitolo", "").replace('"', "'")
    base_tags = ["avventura", "educativo", "nina", "themis", "nina-v2"]
    extra = [t for t in re.split(r"[^\wàèéìòù]+", (meta.get("concept_slug") or "")) if len(t) > 3][:3]
    tags = ", ".join(base_tags + extra)
    return (
        f"---\n"
        f"id: {ep_id}\n"
        f"title: {title}\n"
        f"sottotitolo: {sub}\n"
        f"stagione: AV\n"
        f"data_evento: {datetime.now().strftime('%Y-%m-%d')}\n"
        f"status: {status}\n"
        f"durata_min: 14\n"
        f"tags: {tags}\n"
        f"---\n\n"
    )


def register_seed_auto(ep_id: str, skel: dict, meta: dict) -> None:
    """Registra l'asse_nina dell'episodio in nina_seed_auto.json, così
    build_episodes_json lo arricchisce e l'episodio compare anche sulla Mappa —
    senza editare il sorgente (canone sess.#44: tutto automatico)."""
    try:
        data = json.loads(SEED_AUTO.read_text(encoding="utf-8")) if SEED_AUTO.exists() else {}
    except Exception:
        data = {}
    concetto = (skel.get("insegna") or skel.get("title") or ep_id)[:70]
    data[ep_id] = [concetto, int(meta.get("regione", 0)), int(meta.get("giro", 1)),
                   list(meta.get("richiama") or []), "adattato"]
    SEED_AUTO.parent.mkdir(parents=True, exist_ok=True)
    SEED_AUTO.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    logger.info("seed-auto registrato: %s (regione %s, giro %s)", ep_id, meta.get("regione"), meta.get("giro"))


def update_state(ep_id: str, title: str) -> None:
    """Aggiorna DATA/nina_state.json (ultimo generato + conteggi) per /api/nina/status."""
    try:
        st = json.loads(NINA_STATE.read_text(encoding="utf-8")) if NINA_STATE.exists() else {}
    except Exception:
        st = {}
    canon = len(list(AV_CE.glob("EP_N2_*.md"))) if AV_CE.exists() else 0
    semi  = len(list(AV_ARCHIVIO.glob("EP_AV_*.md"))) if AV_ARCHIVIO.exists() else 0
    st.update({
        "last_generated": {"id": ep_id, "title": title, "at": datetime.now().isoformat(timespec="seconds")},
        "canon_count": canon, "seed_archive_count": semi,
        "generated_total": int(st.get("generated_total", 0)) + 1,
    })
    NINA_STATE.parent.mkdir(parents=True, exist_ok=True)
    NINA_STATE.write_text(json.dumps(st, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def save_proposal(ep_id: str, frontmatter: str, body: str, skel: dict, meta: dict) -> Path:
    # canon guard alla fonte (idempotente)
    try:
        from AUTOMATIONS.core.canon_guard import clean as _canon_clean
        body = _canon_clean(body)
    except Exception:
        pass
    AV_PROPOSTI.mkdir(parents=True, exist_ok=True)
    slug = re.sub(r"[^a-z0-9]+", "_", skel.get("title", ep_id).lower()).strip("_")[:40]
    fname = f"{ep_id}_{slug}.md"
    out = AV_PROPOSTI / fname
    out.write_text(frontmatter + body.strip() + "\n", encoding="utf-8")
    logger.info("PROPOSTO: %s", out.relative_to(TI_ROOT))

    # riga NINA_SEED suggerita (per la promozione manuale in build_episodes_json.py)
    richiama = meta.get("richiama") or []
    seed = (f'    "{ep_id}": ({json.dumps(skel.get("insegna", skel.get("title",""))[:70], ensure_ascii=False)}, '
            f'{meta.get("regione",0)}, {meta.get("giro",1)}, {json.dumps(richiama, ensure_ascii=False)}, "adattato"),')
    (AV_PROPOSTI / f"{ep_id}.seed.txt").write_text(seed + "\n", encoding="utf-8")
    logger.info("Riga NINA_SEED suggerita -> %s.seed.txt:\n%s", ep_id, seed)
    return out


def save_canon(ep_id: str, frontmatter: str, body: str, skel: dict, meta: dict) -> Path:
    """AUTO-PROMOZIONE (canone sess.#44: tutto automatico, niente _PROPOSTI):
    scrive l'episodio DEFINITIVO sia nel canone (S_AVVENTURA/, per la dashboard via
    build_episodes_json) sia in MENTE/STORIE/S_AVVENTURA/ (per il RAG di Nina), registra
    l'asse_nina in nina_seed_auto.json e aggiorna lo stato. Nessuna approvazione umana."""
    try:
        from AUTOMATIONS.core.canon_guard import clean as _canon_clean
        body = _canon_clean(body)
    except Exception:
        pass
    slug = re.sub(r"[^a-z0-9]+", "_", skel.get("title", ep_id).lower()).strip("_")[:40]
    fname = f"{ep_id}_{slug}.md"
    text = frontmatter + body.strip() + "\n"

    AV_CE.mkdir(parents=True, exist_ok=True)
    out = AV_CE / fname
    out.write_text(text, encoding="utf-8")
    logger.info("CANONE: %s", out.relative_to(TI_ROOT))

    # mirror in MENTE -> il RAG di Nina lo indicizza (RAG legge MENTE, non CONTENT_ENGINE)
    try:
        AV_MENTE.mkdir(parents=True, exist_ok=True)
        (AV_MENTE / fname).write_text(text, encoding="utf-8")
        logger.info("MENTE (RAG): STORIE/S_AVVENTURA/%s", fname)
    except Exception as e:
        logger.warning("mirror MENTE fallito (%s) — il RAG non vedra' subito %s", e, ep_id)

    register_seed_auto(ep_id, skel, meta)
    update_state(ep_id, skel.get("title", ep_id))
    return out


# ── MAIN ──────────────────────────────────────────────────────────────────────

def generate(concept: str, meta: dict, rag_query: str | None = None, auto: bool = True,
             require_grounding: bool = True) -> Path | None:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        logger.error("ANTHROPIC_API_KEY assente — impossibile generare")
        return None
    client = anthropic.Anthropic(api_key=api_key)

    ep_id = meta.get("id") or next_episode_id()
    meta.setdefault("regione", 0)
    meta.setdefault("giro", 1)
    meta.setdefault("casella", "?")
    meta["concept_slug"] = concept

    rag_context = retrieve_context(rag_query or concept)
    n_fonti = len(rag_context.splitlines()) if rag_context else 0
    logger.info("Grounding: %d righe di fonti (%s)", n_fonti, (rag_query or concept)[:50])

    # GROUNDING OBBLIGATORIO (canone sess.#44: "tutti i nuovi episodi fatti dal vero").
    # Senza fatti reali dal RAG NON si genera: meglio nessun episodio che uno inventato.
    # (il RAG dev'essere su: API localhost:5001 o motore diretto. Disattivabile solo
    # esplicitamente con require_grounding=False, non in automatico.)
    if require_grounding and n_fonti < MIN_GROUNDING_LINES:
        logger.error("GROUNDING INSUFFICIENTE (%d/%d fonti) per %s — NON genero (dal vero o niente). "
                     "Verifica che il RAG sia su (API :5001) e che il concetto trovi fatti.",
                     n_fonti, MIN_GROUNDING_LINES, ep_id)
        return None

    logger.info("Stadio 1 — Architetto (%s)...", MODEL_ARCH)
    skel = stage1_architect(client, concept, rag_context, meta)
    logger.info("  scheletro: %s", skel.get("title", "?"))

    logger.info("Stadio 2 — Scrittore (%s)...", MODEL_WRITER)
    canon = load_canon()
    body = stage2_writer(client, concept, skel, canon, rag_context, ep_id, meta)

    # Il blocco FATTI (per il RAG) e' il terzo requisito del canone (serve a
    # build_episodes_json + riflusso). Lo Scrittore spesso lo omette o lascia SOLO
    # l'intestazione: garantiamo SEMPRE i fatti grounded dello scheletro (stadio 1).
    # Cosi' la densita' di FATTI non dipende dai capricci del writer (>=4 fatti reali).
    fatti = [str(f).strip() for f in (skel.get("fatti_rag") or []) if str(f).strip()]
    header_fatto = (f"- **FATTO:** {ep_id}, casella {meta.get('casella','?')} "
                    f"({concept[:60]}) del viaggio Nina v2, regione {meta.get('regione','?')} "
                    f"({REGIONI_NINA.get(meta.get('regione'), '?')}).")
    if "## FATTI" not in body:
        blocco = ["## FATTI (per il RAG)", header_fatto] + [f"- {f}" for f in fatti[:5]]
        body = body.rstrip() + "\n\n" + "\n".join(blocco) + "\n"
        logger.info("FATTI: blocco creato dallo scheletro (writer l'aveva omesso)")
    else:
        # blocco presente: se e' scarno (< 4 bullet) lo arricchiamo coi fatti grounded mancanti
        fatti_sec = body[body.find("## FATTI"):]
        n_bullet = len(re.findall(r"^\s*-\s", fatti_sec, flags=re.M))
        if n_bullet < 4 and fatti:
            mancanti = [f for f in fatti if f[:30].lower() not in fatti_sec.lower()]
            if mancanti:
                body = body.rstrip() + "\n" + "\n".join(f"- {f}" for f in mancanti[:5]) + "\n"
                logger.info("FATTI: blocco scarno (%d) -> aggiunti %d fatti grounded", n_bullet, len(mancanti[:5]))

    # validazione minima del formato (non blocca: e' una proposta da rivedere)
    for sec in ("## COLD OPEN", "## ATTO I", "## CHIUSURA", "## FATTI"):
        if sec not in body:
            logger.warning("formato: sezione mancante '%s' (rivedere a mano)", sec)

    if auto:
        # AUTO-PROMOZIONE: episodio definitivo, nel canone + MENTE (RAG), niente gate
        frontmatter = build_frontmatter(ep_id, skel, meta, status="ready")
        return save_canon(ep_id, frontmatter, body, skel, meta)
    # modalita' legacy: proposta da validare (solo se richiesta esplicitamente)
    frontmatter = build_frontmatter(ep_id, skel, meta, status="proposto_da_validare")
    return save_proposal(ep_id, frontmatter, body, skel, meta)


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser(description="Nina v2 — generatore avventure grounded (2 stadi)")
    p.add_argument("--concept", required=True, help="Il concetto reale da insegnare (1 concetto = 1 avventura)")
    p.add_argument("--rag", help="Query di grounding RAG (default: il concetto)")
    p.add_argument("--id", help="ID episodio (default: prossimo EP_N2_xx libero)")
    p.add_argument("--regione", type=int, help="Regione/Pietra ⟡N (0-7 tech)")
    p.add_argument("--giro", type=int, default=1, help="Giro della spirale (profondita')")
    p.add_argument("--casella", help="Numero casella nel viaggio")
    p.add_argument("--richiama", help="Pietre richiamate, es. '⟡3,⟡0'")
    p.add_argument("--proposta", action="store_true",
                   help="Legacy: salva in _PROPOSTI come bozza da validare (default = auto-promozione nel canone)")
    p.add_argument("--no-grounding", action="store_true",
                   help="Disattiva il grounding obbligatorio (sconsigliato: rischia episodi inventati)")
    args = p.parse_args()

    meta = {
        "id": args.id,
        "regione": args.regione,
        "giro": args.giro,
        "casella": args.casella,
        "richiama": [r.strip() for r in args.richiama.split(",")] if args.richiama else [],
    }
    out = generate(args.concept, {k: v for k, v in meta.items() if v is not None},
                   rag_query=args.rag, auto=not args.proposta, require_grounding=not args.no_grounding)
    if out:
        print(f"\nOK -> {out}")
        if args.proposta:
            print("Modalita' proposta: rivedi, poi sposta da _PROPOSTI/ a S_AVVENTURA/.")
        else:
            print("Auto-promosso nel canone + MENTE. Esegui rebuild episodes.json + rag-update")
            print("(oppure usa il loop nina_rag_loop.py che li fa in automatico).")
    else:
        sys.exit(1)
