# sync_storie.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-05-31
# Recupera episodi NARRATIVI (header markdown, non frontmatter YAML) dalle cartelle
# stagione su disco -> DASHBOARD/src/data/storieData.ts, con ID UNIVOCI (stem completo)
# per non collidere con entry esistenti. Idempotente: rigenera il blocco RECOVERED.
#
# Uso:  python sync_storie.py            (dry-run: mostra cosa importerebbe)
#       python sync_storie.py --write    (scrive in storieData.ts)

import re
import io
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]          # TITANIUM_OS/
EPISODES_ROOT = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
STORIE_TS = ROOT / "DASHBOARD" / "src" / "data" / "storieData.ts"

START_MARK = "  // RECOVERED_START — episodi narrativi importati da sync_storie.py"
END_MARK   = "  // RECOVERED_END"

# cartella -> (glob, stagione, label). I narrativi vivono fuori da SA_AUTO.
SOURCES = [
    ("S2_SISTEMA", "EP_S2_*.md", "ST",  "Il Sistema"),   # narrativi hand-craft
    ("S2_SISTEMA", "EP_2*.md",   "ST",  "Il Sistema"),   # dev-log story_agent (EP_YYYYMMDD)
    ("MOMENTI",    "MOM_*.md",   "MOM", "Momenti"),
]

MONTHS = {"gennaio":"01","febbraio":"02","marzo":"03","aprile":"04","maggio":"05",
          "giugno":"06","luglio":"07","agosto":"08","settembre":"09","ottobre":"10",
          "novembre":"11","dicembre":"12"}


def parse_episode(md: Path, stagione: str, label: str) -> dict | None:
    raw = md.read_text(encoding="utf-8", errors="replace")
    # togli blocco TOC
    body = re.sub(r"<!--\s*TOC\s*-->.*?<!--\s*/TOC\s*-->", "", raw, flags=re.DOTALL).strip()

    # ── titolo + sottotitolo: due formati ──────────────────────────────────
    # A) narrativo hand-craft:  "# EP_X — TITOLO"  +  '### "sottotitolo"'
    # B) dev-log story_agent:   "# TITANIUM_OS — S1E09"  +  '## "Titolo Vero"'
    m_narr = re.search(r"^#\s+(?:EP_|MOM|MOMENTO).+?\s+[—-]\s+(.+)$", body, re.M)
    m_auto = re.search(r'^##\s+"(.+?)"\s*$', body, re.M)
    if m_narr:
        title = m_narr.group(1).strip()
        if title.isupper():
            title = title.title()
        m_sub = re.search(r'^###\s+"?(.+?)"?\s*$', body, re.M)
        sottotitolo = m_sub.group(1).strip().strip('"') if m_sub else ""
    elif m_auto:
        title = m_auto.group(1).strip()
        # sottotitolo derivato dal nome file (commit subject leggibile)
        slug = re.sub(r"^EP_\d{8}_", "", md.stem)
        sottotitolo = slug.replace("_", " ").strip().capitalize()
    else:
        return None

    # data: dal filename EP_YYYYMMDD_ se presente, altrimenti data italiana nel testo
    data_evento = datetime.now().strftime("%Y-%m-%d")
    m_fn = re.match(r"EP_(\d{4})(\d{2})(\d{2})_", md.stem)
    if m_fn:
        data_evento = f"{m_fn.group(1)}-{m_fn.group(2)}-{m_fn.group(3)}"
    else:
        m_date = re.search(r"(\d{1,2})\s+(" + "|".join(MONTHS) + r")\s+(\d{4})", body, re.I)
        if m_date:
            d, mon, y = m_date.group(1), m_date.group(2).lower(), m_date.group(3)
            data_evento = f"{y}-{MONTHS[mon]}-{d.zfill(2)}"

    # durata: "Durata ... NN"
    m_dur = re.search(r"[Dd]urata[^0-9]*(\d{1,3})", body)
    durata = int(m_dur.group(1)) if m_dur else 10

    # preview: prima prosa reale dopo gli header/meta
    prose = []
    for line in body.splitlines():
        s = line.strip()
        if not s or s.startswith(("#", "*", "-", ">", "|", "<")) or s.startswith("==="):
            continue
        prose.append(s)
        if sum(len(p) for p in prose) > 220:
            break
    preview = " ".join(prose)[:220]

    return {
        "id": md.stem,                    # ID UNIVOCO = nome file (no collisione)
        "title": title,
        "sottotitolo": sottotitolo,
        "stagione": stagione,
        "stagione_label": label,
        "data_evento": data_evento,
        "tags": ["narrativo", stagione.lower(), "recuperato"],
        "status": "ready",
        "durata_min": durata,
        "preview": preview,
        "content": body,
    }


def esc_tpl(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def esc_str(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def to_ts(ep: dict) -> str:
    return (
        "  {\n"
        f'    id: "{esc_str(ep["id"])}",\n'
        f'    title: "{esc_str(ep["title"])}",\n'
        f'    sottotitolo: "{esc_str(ep["sottotitolo"])}",\n'
        f'    stagione: "{ep["stagione"]}",\n'
        f'    stagione_label: "{esc_str(ep["stagione_label"])}",\n'
        f'    data_evento: "{ep["data_evento"]}",\n'
        f'    tags: {json.dumps(ep["tags"])},\n'
        f'    status: "{ep["status"]}",\n'
        f'    durata_min: {ep["durata_min"]},\n'
        f'    preview: "{esc_str(ep["preview"])}",\n'
        f'    content: `{esc_tpl(ep["content"])}`,\n'
        "  },"
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="Scrive in storieData.ts")
    args = ap.parse_args()

    ts = STORIE_TS.read_text(encoding="utf-8")
    # existing_ids = solo gli ID FUORI dal blocco RECOVERED, cosi' un re-run
    # rigenera il blocco con TUTTI i recuperati (incrementale e idempotente)
    ts_wo_block = re.sub(re.escape(START_MARK) + r".*?" + re.escape(END_MARK),
                         "", ts, flags=re.DOTALL)
    existing_ids = set(re.findall(r'id:\s*"([^"]+)"', ts_wo_block))

    episodes = []
    for folder, glob, stagione, label in SOURCES:
        d = EPISODES_ROOT / folder
        if not d.exists():
            continue
        for md in sorted(d.glob(glob)):
            ep = parse_episode(md, stagione, label)
            if ep is None:
                print(f"  SKIP (no header parsabile): {md.name}")
                continue
            if ep["id"] in existing_ids:
                print(f"  SKIP (gia' in dashboard): {ep['id']}")
                continue
            episodes.append(ep)

    print(f"\n=== {len(episodes)} episodi da recuperare ===")
    for ep in episodes:
        print(f"  + [{ep['stagione']}] {ep['id']}  —  {ep['title']}  ({ep['data_evento']}, {ep['durata_min']}min)")

    if not episodes:
        print("Niente da recuperare.")
        return

    if not args.write:
        print("\n(dry-run) Rilancia con --write per scrivere in storieData.ts")
        return

    block = "\n".join(to_ts(ep) for ep in episodes)
    new_section = f"{START_MARK}\n{block}\n{END_MARK}\n"

    if START_MARK in ts and END_MARK in ts:
        ts = re.sub(re.escape(START_MARK) + r".*?" + re.escape(END_MARK) + r"\n",
                    new_section, ts, flags=re.DOTALL)
    else:
        # inserisci prima del blocco AUTO se c'e', altrimenti prima del ']' finale
        anchor = "  // AUTO_GENERATED_START"
        if anchor in ts:
            ts = ts.replace(anchor, new_section + anchor, 1)
        else:
            idx = ts.rfind("];")
            ts = ts[:idx] + new_section + ts[idx:]

    STORIE_TS.write_text(ts, encoding="utf-8")
    print(f"\nScritto: {len(episodes)} episodi in {STORIE_TS.name}")


if __name__ == "__main__":
    main()
