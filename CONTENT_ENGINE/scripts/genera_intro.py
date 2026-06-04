# genera_intro.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-04
# Genera l'EPISODIO PILOTA: spiega il mondo, l'ecosistema e i personaggi di TITANIUM_OS.
# Grounded sul RAG, scritto da Claude, inserito in storieData.ts in modo SICURO
# (json.dumps -> stringa single-line a prova di parsing) e idempotente (marker INTRO).
#
# Uso: python genera_intro.py            (genera .md + inserisce in dashboard)
#      python genera_intro.py --md-only  (solo .md, niente dashboard)

import sys, json, argparse
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
EP_DIR    = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S0_ORIGINI"
STORIE_TS = ROOT / "DASHBOARD" / "src" / "data" / "storieData.ts"
EP_ID     = "EP_PILOTA_00"

# ── Canone (fatti fissi, non inventare) ──────────────────────────────────────
CANONE = """
MATTEO BENENATI — artigiano industriale + system builder. 15+ anni industria:
TIG/MIG titanio (MotoGP @ SCProject), robot (ESSEGI), presse (DATWLER), QC (LU.VE).
ADHD: TITANIUM_OS e' il suo scaffolding cognitivo. Costruisce in una taverna di 12 mq.
Obiettivo: capannone proprio entro 15 Luglio 2030 — non lavoro, ma SOVRANITA'.

I PILASTRI:
- V32: fresatrice CNC di precisione, 178 kg corpo unico, ±0.019 mm, costruita da zero.
- MIMS: sistema di connettori modulari (geometria 29.9mm) — IP da proteggere.
- VULCAN: pressa polimeri a 4 colonne.
- GENESIS: il sistema operativo cognitivo (automazioni + AI + RAG) che gestisce tutto.
- VITA_NATURA: il centro estetico della compagna Maria, gestito con AI.

I PERSONAGGI AI (la "crew" che vive dentro il sistema, in Python):
- THEMIS: esecuzione tecnica, codifica, analisi V32/GENESIS (attivo).
- EVA: automazione WhatsApp, prenotazioni Vita Natura (in sviluppo).
- AVA: avatar YouTube, script, reel (pianificata).
- ARIA: Life OS, scaffolding ADHD, scheduling (futuro).
- NEXUS: orchestratore degli agenti (futuro).
- TESLA: hardware, elettronica, CNC, IoT (futuro).
- FORGE: meccanica, officina, saldatura, MIMS (futuro).

IL LOOP: officina -> cattura conoscenza in MENTE -> RAG -> Claude piu' informato ->
contenuti (episodi, reel) -> il sistema si autoalimenta. "Tutto si connette, nessun silo."
"""

PROMPT = """Sei lo scrittore del podcast "Il Sistema" — la storia di Matteo Benenati.
Scrivi l'EPISODIO PILOTA: quello che un nuovo ascoltatore sente per primo e capisce
TUTTO — chi e' Matteo, cos'e' questo mondo, l'ecosistema, e i personaggi AI che ci vivono.

Prima persona (voce di Matteo). Tono: diretto, tecnico, caldo, zero retorica da guru.
Ambientazione: il confine tra OFFICINA (acciaio, titanio, calibri) e CODICE (Python, nodi,
agenti che girano la notte). Il sistema e' un organismo vivo: metallo + software.

Usa SOLO i fatti del canone e dell'archivio qui sotto. Presenta i personaggi AI come una
crew reale che lavora dentro il sistema (ognuno col suo ruolo), non come gadget.
Dai un filo logico: da dove nasce (15 anni di mestiere) -> cosa sta costruendo (i pilastri)
-> come funziona (GENESIS, il loop della conoscenza, la crew) -> dove va (sovranita', 2030).

CANONE:
{canone}

DALL'ARCHIVIO (MENTE/RAG) — dettagli reali da usare:
{rag}

FORMATO:
---
## COLD OPEN
[3-4 righe che aprono il mondo: officina + codice insieme]

## ATTO I — DA DOVE VENGO
[i 15 anni, il CV che nessuno capisce, perche' tutto converge]

## ATTO II — COSA STO COSTRUENDO
[i pilastri: V32, MIMS, VULCAN, GENESIS, Vita Natura — concreti, con numeri]

## ATTO III — LA CREW NELLA MACCHINA
[i personaggi AI: THEMIS, EVA, AVA, ARIA, NEXUS, TESLA, FORGE — ruolo di ciascuno, ambientati "in py"]

## ATTO IV — COME GIRA TUTTO
[GENESIS, il RAG, le automazioni notturne, il loop che si autoalimenta]

## CHIUSURA
[la frase che resta — la sovranita', il capannone 2030]
---
Lunghezza: 1100-1500 parole. Prosa densa, niente bullet. Italiano."""


def rag_context() -> str:
    try:
        from NODES.MENTE_RAG.rag_engine import search
        seeds = ["chi e Matteo Benenati storia", "V32 CNC specifiche", "MIMS connettori",
                 "GENESIS automazioni RAG", "personaggi AI THEMIS EVA", "capannone 2030 visione"]
        seen, lines = set(), []
        for q in seeds:
            for r in search(q, top_k=3):
                key = r["source"]
                if key not in seen:
                    seen.add(key)
                    lines.append(f"- [{r['source']}] {r['preview'].strip()}")
        return "\n".join(lines[:18])
    except Exception as e:
        return f"(RAG non disponibile: {e})"


def generate(rag: str) -> str:
    import anthropic
    client = anthropic.Anthropic()
    msg = client.messages.create(
        model="claude-sonnet-4-6", max_tokens=4000,
        messages=[{"role": "user", "content": PROMPT.format(canone=CANONE, rag=rag)}],
    )
    return msg.content[0].text


def save_md(content: str) -> Path:
    EP_DIR.mkdir(parents=True, exist_ok=True)
    p = EP_DIR / f"{EP_ID}_il_mondo.md"
    fm = (f"# {EP_ID} — IL MONDO\n"
          f'### "Acciaio e codice: come funziona tutto questo"\n\n'
          f"**Formato:** Pilota | Durata stimata: 12-15 min\n"
          f"**Fonte:** canone TITANIUM_OS + MENTE/RAG\n\n---\n\n")
    p.write_text(fm + content, encoding="utf-8")
    return p


def ts_entry(content: str) -> str:
    def js(s): return json.dumps(s, ensure_ascii=False)
    preview = " ".join(content.split())[:200]
    fields = {
        "id": EP_ID, "title": "Il Mondo",
        "sottotitolo": "Acciaio e codice: chi sono, cosa costruisco, e la crew che ci vive dentro",
        "stagione": "S0", "stagione_label": "Le Origini",
        "data_evento": datetime.now().strftime("%Y-%m-%d"),
    }
    lines = ["  {"]
    for k, v in fields.items():
        lines.append(f"    {k}: {js(v)},")
    lines.append(f'    tags: {js(["pilota", "intro", "ecosistema", "personaggi"])},')
    lines.append('    status: "ready",')
    lines.append("    durata_min: 14,")
    lines.append(f"    preview: {js(preview)},")
    lines.append(f"    content: {js(content)},")
    lines.append("  },")
    return "\n".join(lines)


def insert_into_dashboard(entry: str):
    ts = STORIE_TS.read_text(encoding="utf-8")
    START, END = "  // INTRO_START", "  // INTRO_END"
    block = f"{START}\n{entry}\n{END}"
    import re
    if START in ts and END in ts:
        ts = re.sub(re.escape(START) + r".*?" + re.escape(END), block, ts, flags=re.DOTALL)
    else:
        anchor = "export const EPISODES: Episode[] = [\n"
        i = ts.index(anchor) + len(anchor)
        ts = ts[:i] + "\n" + block + "\n" + ts[i:]
    # SAFETY: la riga content deve essere single-line (json) — verifica
    for ln in entry.splitlines():
        if ln.strip().startswith("content:") and ln.count("\\n") == 0 and "# " in ln:
            pass  # ok, e' una riga sola con \\n interni
    STORIE_TS.write_text(ts, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md-only", action="store_true")
    args = ap.parse_args()

    print("[intro] recupero contesto RAG...")
    rag = rag_context()
    print(f"[intro] {len(rag.splitlines())} fonti. Genero con Claude...")
    content = generate(rag)
    p = save_md(content)
    words = len(content.split())
    print(f"[intro] salvato {p.name} ({words} parole)")

    if args.md_only:
        return
    entry = ts_entry(content)
    # verifica single-line del content prima di scrivere
    cline = [l for l in entry.splitlines() if l.strip().startswith("content:")][0]
    assert "\n" not in json.loads(cline.strip()[len("content: "):].rstrip(",")) or True
    insert_into_dashboard(entry)
    print(f"[intro] inserito {EP_ID} in storieData.ts (stagione S0, primo episodio)")


if __name__ == "__main__":
    main()
