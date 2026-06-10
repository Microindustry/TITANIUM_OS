# enrich_recap_episodes.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-10
# Igiene one-shot, idempotente e additiva su DASHBOARD/src/data/episodes.json:
#  - promuove il titolo REALE (riga ## "..." nel .md) degli episodi auto-recap che hanno
#    titolo-serie generico "TITANIUM OS SxEy" e zero metadati; l'etichetta-serie diventa
#    sottotitolo. Deriva tag dal contenuto. Nessun contenuto viene perso o cancellato.
#  - clampa eventuali data_evento nel FUTURO a oggi (un episodio non puo' essere nel domani).
# Leggi-modifica-riscrivi: rilanciabile senza effetti doppi.

import re
import json
import glob
from pathlib import Path
from datetime import date

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
EPISODES_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
TODAY = date.today().isoformat()

# parola-nel-contenuto -> tag (curati: solo termini reali del sistema)
KEYWORDS = {
    "graphify": "graphify", "grafo": "grafo", "rete": "rete", "rag": "rag",
    "watcher": "watcher", "n8n": "n8n", "dashboard": "dashboard", "markdown": "markdown",
    "flutter": "flutter", "agenti": "agenti", "agente": "agenti", "milestone": "milestone",
    "watchdog": "watchdog", "nina": "nina", "themis": "themis", "audit": "audit",
    "notturn": "automazione-notturna", "bug": "bugfix", "commit": "git",
    "roster": "personaggi", "cartella clinica": "self-audit", "view": "ui", "vista": "ui",
}


def real_title(eid: str) -> str:
    hits = glob.glob(str(EPISODES_DIR / "**" / f"{eid}*"), recursive=True)
    for h in hits:
        raw = Path(h).read_text(encoding="utf-8")  # UTF-8 pulito: niente errors=replace
        m = re.search(r'^##\s+"([^"]+)"', raw, re.M)
        if m:
            return m.group(1).strip()
    return ""


def derive_tags(text: str) -> list:
    low = text.lower()
    tags = [tag for kw, tag in KEYWORDS.items() if kw in low]
    # dedup mantenendo l'ordine + tag base sempre presente
    seen, out = set(), []
    for t in ["dev-log"] + tags:
        if t not in seen:
            seen.add(t); out.append(t)
    return out


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    promoted, clamped = [], []

    for e in eps:
        # 1) clamp date future
        if e.get("data_evento", "") > TODAY:
            clamped.append((e["id"], e["data_evento"]))
            e["data_evento"] = TODAY

        # 2) promuovi titolo reale sui recap generici senza metadati
        is_generic = e.get("title", "").strip().upper().startswith("TITANIUM")
        if is_generic and not e.get("tags") and not e.get("sottotitolo", "").strip():
            rt = real_title(e["id"])
            if rt:
                serie = e["title"].strip()
                e["sottotitolo"] = serie                       # etichetta-serie preservata
                e["title"] = rt                                # titolo reale in evidenza
                e["tags"] = derive_tags(e.get("content", "") + " " + rt)
                promoted.append((e["id"], rt))

    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"date future clampate a {TODAY}: {len(clamped)}")
    for i, old in clamped:
        print(f"  {i}: {old} -> {TODAY}")
    print(f"\ntitoli reali promossi: {len(promoted)}")
    for i, t in promoted:
        print(f"  {i}: {t}")


if __name__ == "__main__":
    main()
