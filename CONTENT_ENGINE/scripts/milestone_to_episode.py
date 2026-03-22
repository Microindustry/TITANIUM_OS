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
    """Chiama Claude e restituisce dict con tutti i campi dell'episodio."""

    prompt = f"""Sei il ghostwriter del podcast di Matteo Benenati — artigiano industriale + system builder.

Contesto del progetto:
- TITANIUM_OS: sistema operativo cognitivo personale (React + Python + automazioni)
- V32: fresatrice CNC da zero, 178 kg, ±0.019 mm — stato attuale: {context.get('v32_pct', 65)}%
- MIMS: connettori modulari fisici — stato: {context.get('mims_pct', 30)}%
- VULCAN: pressa 20t + ricette polimeri + brevetto
- EVA: AI assistant WhatsApp per centro estetico di Maria
- Focus oggi: {context.get('focus_today', '')}
- Blocker attivo: {context.get('blockers', ['nessuno'])[0] if context.get('blockers') else 'nessuno'}

MILESTONE DA RACCONTARE:
"{milestone}"

Scrivi un episodio podcast in italiano (stile Matteo: diretto, tecnico, zero fluff, prima persona).

PARTE 1 — rispondi SOLO con questo JSON su una riga (nessun testo extra prima o dopo):
{{"title":"titolo breve max 4 parole","sottotitolo":"frase evocativa max 12 parole","tags":["tag1","tag2","tag3"],"durata_min":7,"preview":"prime 2 righe narrative max 150 caratteri"}}

PARTE 2 — dopo il JSON scrivi esattamente la riga:
---CONTENT---
Poi scrivi il testo completo (400-600 parole, markdown):
- Inizia con una citazione in prima persona tra >
- Racconta il milestone come un momento specifico
- Collega al sistema piu grande (V32, TITANIUM_OS, MIMS)
- Chiudi con riflessione sul perche questo momento conta
- Linguaggio: officina + codice, mai pomposo"""

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text.strip()

    # separa JSON da content usando il separatore ---CONTENT---
    if "---CONTENT---" in raw:
        json_part, content_part = raw.split("---CONTENT---", 1)
    else:
        # fallback: prima riga = JSON, resto = content
        lines = raw.split("\n", 1)
        json_part = lines[0]
        content_part = lines[1] if len(lines) > 1 else ""

    json_part = json_part.strip()
    json_part = re.sub(r'^```json\s*', '', json_part)
    json_part = re.sub(r'\s*```$', '', json_part.strip())

    data = json.loads(json_part)
    data["content"] = content_part.strip()
    return data

# ── Salva episodio .md ──────────────────────────────────────────────────────
def save_episode_md(ep_id: str, milestone: str, data: dict, date_str: str) -> Path:
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

    # Genera nuovi episodi per milestone non ancora coperti
    new_count = 0
    for i, milestone in enumerate(milestones):
        if milestone in done:
            print(f"  ✓ già coperto: {milestone[:50]}")
            continue

        ep_num = len(list(EPISODES_DIR.glob("EP_AUTO_*.md"))) + 1
        ep_id  = f"EP_AUTO_{ep_num:03d}"
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
