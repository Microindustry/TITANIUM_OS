# milestone_to_episode.py
# parte di: TITANIUM_OS / CONTENT_ENGINE
# versione: 1.0 / data: 2026-03-19
#
# Legge BRAIN/STATE.json → per ogni milestone non ancora coperto
# chiama Claude API → genera episodio podcast .md → aggiorna storieData.ts
#
# Uso locale:  python CONTENT_ENGINE/scripts/milestone_to_episode.py
# Uso CI:      come sopra, con ANTHROPIC_API_KEY come env var

import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

import anthropic

# ── Paths ──────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent.parent
STATE_PATH    = ROOT / "BRAIN" / "STATE.json"
STORIE_PATH   = ROOT / "DASHBOARD" / "src" / "data" / "storieData.ts"
EPISODES_DIR  = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
EPISODES_DIR.mkdir(parents=True, exist_ok=True)

# ── Claude client ──────────────────────────────────────────────────────────
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# ── Leggi milestones ────────────────────────────────────────────────────────
def load_milestones() -> list[str]:
    with open(STATE_PATH, encoding="utf-8") as f:
        state = json.load(f)
    return state.get("milestones", {}).get("verified", [])

# ── Controlla episodi già generati ─────────────────────────────────────────
def already_generated() -> set[str]:
    """Ritorna set di milestone text già coperti da episodi AUTO."""
    existing = set()
    for md_file in EPISODES_DIR.glob("EP_AUTO_*.md"):
        content = md_file.read_text(encoding="utf-8")
        # cerca riga "milestone:" nel frontmatter
        m = re.search(r'^milestone:\s*"(.+)"', content, re.MULTILINE)
        if m:
            existing.add(m.group(1))
    return existing

# ── Genera episodio via Claude ──────────────────────────────────────────────
def generate_episode(milestone: str, ep_num: int, context: dict) -> dict:
    """Chiama Claude con 2 passaggi: haiku per struttura, sonnet per narrativa."""

    ctx_v32   = context.get('v32_pct', 65)
    ctx_mims  = context.get('mims_pct', 30)
    ctx_focus = context.get('focus_today', 'costruzione V32')
    ctx_block = context.get('blockers', ['nessuno'])[0] if context.get('blockers') else 'nessuno'

    # ── PASS 1: haiku → metadati strutturati (veloce, economico) ──────────
    meta_prompt = f"""Milestone: "{milestone}"
Progetto: V32 fresatrice CNC {ctx_v32}%, MIMS {ctx_mims}%, TITANIUM_OS, VULCAN pressa 20t, EVA WhatsApp bot.

Genera due cose per questo milestone di Matteo Benenati (artigiano industriale + system builder):
1. Metadati episodio podcast
2. Hook reel Instagram/YouTube (stile Simone Rizzo: wow immediato + dato concreto + open loop finale)

Rispondi SOLO con JSON su una riga:
{{"title":"titolo narrativo 3-5 parole","sottotitolo":"frase evocativa max 10 parole","tags":["tag1","tag2","tag3"],"durata_min":8,"preview":"prima frase episodio diretta max 120 caratteri","reel_hook":"script reel 60-80 parole in italiano fluido, prima persona. Struttura: apertura con dato concreto e visivo → problema che c era prima → azione tecnica precisa → domanda aperta che crea attesa. Zero parentesi, zero template. Solo testo da leggere in camera."}}"""

    meta_msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=300,
        messages=[{"role": "user", "content": meta_prompt}]
    )
    meta_raw = meta_msg.content[0].text.strip()
    meta_raw = re.sub(r'^```json\s*', '', meta_raw)
    meta_raw = re.sub(r'\s*```$', '', meta_raw.strip())
    meta = json.loads(meta_raw)

    # ── PASS 2: sonnet → narrativa di qualita con XML + system + few-shot ──
    # Tecnica: system prompt separato + XML tags + 2 few-shot in-context
    # Fonte: Anthropic docs 2025 + arXiv style-transfer research
    SYSTEM = """Sei Matteo Benenati — artigiano industriale + system builder. Scrivi sempre in prima persona.

<identita>
15 anni officina: TIG titanio MotoGP (SCProject), robot ESSEGI packaging, presse DATWLER, QC LU.VE refrigerazione.
Ora: fresatrice CNC V32 da zero (178kg, 3 assi, ±0.019mm) + TITANIUM_OS sopra (React+Python+automazioni AI).
Paralleli: MIMS connettori fisici modulari, VULCAN pressa 20t + ricette polimeri, EVA AI WhatsApp per Maria.
ADHD — il sistema e lo scaffolding cognitivo. Senza STATE.json ti perdi.
</identita>

<stile>
Frasi corte. Spezzate. Come pensi tu, non come uno scrittore.
Dati tecnici reali: numeri, tolleranze, nomi materiali, comandi shell, nomi file.
Lavoro fisico: si sente l officina, il metallo, il fumo della saldatura.
Codice: si sente il terminale aperto alle 23:00, il cursore che lampeggia.
VIETATO: "questo momento", "straordinario", "incredibile", "viaggio", "sfida", "percorso".
PREFERITO: "Ho scoperto che...", "Il problema era...", "Ora so che...", numeri, azioni precise.
</stile>

<esempi_voce>
<esempio_1>
Officina, martedi, 21:40. Il tubo 40x40x3 e in morsa. TIG in mano — stesso setup degli scarichi MotoGP, stessa macchina, elettrodo tungsteno 2.4mm affilato a 30°. Sbaglio l angolo sul giunto, rifaccio il tacco. Non e un dramma. E un dato: "giunto a T su S235, approccio ottimale 15° non 20°". Lo scrivo in STATE.json.
</esempio_1>
<esempio_2>
Il terminale dice: ModuleNotFoundError. E la terza volta in due ore. Non e un errore — e il sistema che mi dice che ho saltato un passaggio. Apro BRAIN/STATE.json: prossimo step era "install dipendenze". Non l avevo fatto. ADHD. Il sistema funziona solo se lo aggiorno in tempo reale, non a fine sessione.
</esempio_2>
</esempi_voce>"""

    narrative_user = f"""<milestone>"{milestone}"</milestone>
<contesto_ora>
  focus: {ctx_focus}
  blocker_attivo: {ctx_block}
  v32_completamento: {ctx_v32}%
  mims_completamento: {ctx_mims}%
</contesto_ora>

<istruzioni>
Scrivi episodio podcast (500-650 parole, markdown) con questa struttura:
1. Citazione in prima persona tra > — una cosa che hai pensato o detto quel giorno, secca
2. Scena esatta: dove eri, che ora era, gesto fisico o comando preciso
3. Il bivio: cosa non funzionava prima, cosa cambia dopo questo milestone
4. Connessione al sistema: come si innesta in V32 / TITANIUM_OS / MIMS / VULCAN
5. Ultima riga: una frase sola. Corta. Vera. Niente aggettivi.
</istruzioni>"""

    narrative_msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2000,
        system=SYSTEM,
        messages=[{"role": "user", "content": narrative_user}]
    )

    meta["content"] = narrative_msg.content[0].text.strip()
    return meta

# ── Salva episodio .md ──────────────────────────────────────────────────────
def save_episode_md(ep_id: str, milestone: str, data: dict, date_str: str) -> Path:
    reel = data.get('reel_hook', '').replace('"', "'")
    content = f"""---
id: "{ep_id}"
milestone: "{milestone}"
title: "{data['title']}"
sottotitolo: "{data['sottotitolo']}"
stagione: "AUTO"
data_evento: "{date_str}"
tags: {json.dumps(data['tags'], ensure_ascii=False)}
status: "ready"
durata_min: {data['durata_min']}
reel_hook: "{reel}"
generated: "{datetime.now().isoformat()}"
---

# {data['title']}

{data['content']}
"""
    path = EPISODES_DIR / f"{ep_id}.md"
    path.write_text(content, encoding="utf-8")
    return path

# ── Genera TypeScript per storieData.ts ────────────────────────────────────
def build_ts_block(episodes_data: list[dict]) -> str:
    blocks = []
    for ep in episodes_data:
        content_escaped = ep['content'].replace('`', r'\`').replace('${', r'\${')
        preview_escaped = ep['preview'].replace("'", "\\'")
        block = f"""  {{
    id: "{ep['id']}",
    title: "{ep['title']}",
    sottotitolo: "{ep['sottotitolo']}",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "{ep['date']}",
    tags: {json.dumps(ep['tags'], ensure_ascii=False)},
    status: "ready" as EpisodeStatus,
    durata_min: {ep['durata_min']},
    preview: "{preview_escaped}",
    content: `{content_escaped}`,
  }},"""
        blocks.append(block)
    return "\n".join(blocks)

# ── Aggiorna storieData.ts ─────────────────────────────────────────────────
def update_storie_ts(new_episodes_ts: str):
    text = STORIE_PATH.read_text(encoding="utf-8")
    # sostituisce il blocco tra i markers
    pattern = r'(  // AUTO_GENERATED_START\n).*?(  // AUTO_GENERATED_END)'
    replacement = f'  // AUTO_GENERATED_START\n{new_episodes_ts}\n  // AUTO_GENERATED_END'
    updated = re.sub(pattern, replacement, text, flags=re.DOTALL)
    STORIE_PATH.write_text(updated, encoding="utf-8")

# ── Main ───────────────────────────────────────────────────────────────────
def main():
    print("── milestone_to_episode ──────────────────────────────")

    milestones = load_milestones()
    done = already_generated()

    # Carica contesto da STATE.json
    with open(STATE_PATH, encoding="utf-8") as f:
        state = json.load(f)
    context = {
        "v32_pct":      state["pillars"]["V32"]["pct_complete"],
        "mims_pct":     state["pillars"]["MIMS"]["pct_complete"],
        "focus_today":  state.get("focus_today", ""),
        "blockers":     state.get("blockers", []),
    }

    # Episodi già nel file .ts (AUTO section) — li rileggiamo tutti per non perderli
    existing_ts_episodes = []
    for md_file in sorted(EPISODES_DIR.glob("EP_AUTO_*.md")):
        content = md_file.read_text(encoding="utf-8")
        fm_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
        if not fm_match:
            continue
        fm = fm_match.group(1)
        body = content[fm_match.end():].strip()
        def fm_get(key):
            m = re.search(rf'^{key}:\s*"?(.+?)"?\s*$', fm, re.MULTILINE)
            return m.group(1).strip('"') if m else ""
        tags_m = re.search(r'^tags:\s*(\[.*?\])', fm, re.MULTILINE)
        dur_m  = re.search(r'^durata_min:\s*(\d+)', fm, re.MULTILINE)
        existing_ts_episodes.append({
            "id":         fm_get("id"),
            "title":      fm_get("title"),
            "sottotitolo":fm_get("sottotitolo"),
            "date":       fm_get("data_evento"),
            "tags":       json.loads(tags_m.group(1)) if tags_m else [],
            "durata_min": int(dur_m.group(1)) if dur_m else 7,
            "preview":    fm_get("preview") if re.search(r'^preview:', fm, re.MULTILINE) else body[:100],
            "content":    body,
        })

    # calcola prossimo numero disponibile UNA volta sola, poi incrementa
    existing_nums = []
    for f in EPISODES_DIR.glob("EP_AUTO_*.md"):
        m = re.search(r'EP_AUTO_(\d+)', f.stem)
        if m:
            existing_nums.append(int(m.group(1)))
    next_num = max(existing_nums, default=0) + 1

    # Genera nuovi episodi per milestone non ancora coperti
    new_count = 0
    for i, milestone in enumerate(milestones):
        if milestone in done:
            print(f"  ✓ già coperto: {milestone[:50]}")
            continue

        ep_id  = f"EP_AUTO_{next_num:03d}"
        ep_num = next_num
        next_num += 1
        # estrai data dal milestone se presente, altrimenti usa oggi
        date_m = re.search(r'\((\d{1,2})\s+(\w+)\s+(\d{4})\)', milestone)
        mesi = {"Gen":1,"Feb":2,"Mar":3,"Apr":4,"Mag":5,"Giu":6,"Lug":7,"Ago":8,"Set":9,"Ott":10,"Nov":11,"Dic":12}
        if date_m:
            giorno, mese_it, anno = date_m.group(1), date_m.group(2), date_m.group(3)
            mese_n = mesi.get(mese_it[:3], 1)
            date_str = f"{anno}-{mese_n:02d}-{int(giorno):02d}"
        else:
            date_str = datetime.now().strftime("%Y-%m-%d")

        print(f"  → generando {ep_id}: {milestone[:60]}...")
        try:
            data = generate_episode(milestone, ep_num, context)
        except Exception as e:
            print(f"     ERRORE: {e}")
            continue

        path = save_episode_md(ep_id, milestone, data, date_str)
        print(f"     salvato: {path.name}")

        existing_ts_episodes.append({
            "id":          ep_id,
            "title":       data["title"],
            "sottotitolo": data["sottotitolo"],
            "date":        date_str,
            "tags":        data["tags"],
            "durata_min":  data["durata_min"],
            "preview":     data["preview"],
            "content":     data["content"],
        })
        new_count += 1

    if new_count == 0 and not existing_ts_episodes:
        print("  Nessun episodio da aggiornare.")
        return

    # Aggiorna storieData.ts con tutti gli episodi AUTO
    ts_block = build_ts_block(existing_ts_episodes)
    update_storie_ts(ts_block)
    print(f"\n  storieData.ts aggiornato — {new_count} nuovi episodi, {len(existing_ts_episodes)} totali AUTO")
    print("── done ──────────────────────────────────────────────")

if __name__ == "__main__":
    main()
