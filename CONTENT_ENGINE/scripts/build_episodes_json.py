# build_episodes_json.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-04
# Manutenzione di DASHBOARD/src/data/episodes.json (la fonte dati robusta degli episodi):
#  - aggiunge l'episodio PILOTA (EP_PILOTA_00) in cima se assente
#  - ripulisce i titoli "slug" (underscore / minuscoli / troncati)
# I dati sono JSON: non possono rompere il build (a differenza dei template literal TS).

import re
import json
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
PILOTA_MD = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S0_ORIGINI" / "EP_PILOTA_00_il_mondo.md"


def clean_title(t: str) -> str:
    if not t:
        return t
    # slug -> parole; title-case se tutto minuscolo o con underscore
    if "_" in t or t == t.lower():
        t = t.replace("_", " ").strip()
        t = " ".join(w if (w.isupper() and len(w) > 1) else w.capitalize() for w in t.split())
    return t.strip()


def load_pilota() -> dict | None:
    if not PILOTA_MD.exists():
        return None
    raw = PILOTA_MD.read_text(encoding="utf-8")
    body = re.sub(r"<!--\s*TOC\s*-->.*?<!--\s*/TOC\s*-->", "", raw, flags=re.DOTALL).strip()
    preview = " ".join(re.sub(r"[#*>`\-]", " ", body).split())[:200]
    return {
        "id": "EP_PILOTA_00",
        "title": "Il Mondo",
        "sottotitolo": "Acciaio e codice: chi sono, cosa costruisco, e la crew che ci vive dentro",
        "stagione": "S0",
        "stagione_label": "Le Origini",
        "data_evento": datetime.now().strftime("%Y-%m-%d"),
        "tags": ["pilota", "intro", "ecosistema", "personaggi"],
        "status": "ready",
        "durata_min": 14,
        "preview": preview,
        "content": body,
    }


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))

    # 1) titoli puliti
    fixed = 0
    for e in eps:
        nt = clean_title(e.get("title", ""))
        if nt != e.get("title"):
            e["title"] = nt
            fixed += 1

    # 2) pilota in cima (idempotente)
    if not any(e["id"] == "EP_PILOTA_00" for e in eps):
        pil = load_pilota()
        if pil:
            eps.insert(0, pil)
            print("aggiunto EP_PILOTA_00 in cima")
    else:
        print("EP_PILOTA_00 gia' presente")

    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"titoli ripuliti: {fixed} | episodi totali: {len(eps)}")


if __name__ == "__main__":
    main()
