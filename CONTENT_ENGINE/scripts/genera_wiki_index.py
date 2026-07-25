# genera_wiki_index.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-13
# Rende MENTE un VAULT OBSIDIAN navigabile: genera HOME.md (mappa del sapere) + un
# indice per ogni dominio, con [[wikilink]] che Obsidian risolve. Aprendo MENTE come
# vault, il graph view nativo connette tutto = "il grafo che e' il nostro wiki".
# Auto-mantenuto: si rigenera a ogni run (evolutivo). READ-only sui contenuti.

import os
import sys
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
SKIP = {".git", ".obsidian", "graphify-out", "_ARCHIVIO", "_PROPOSTI"}  # _ARCHIVIO/_PROPOSTI: non canone (sess.#43)
AUTO = "<!-- AUTO-GENERATO da genera_wiki_index.py — rigenerato, non editare a mano -->"

# descrizione umana per dominio (cosa c'e' dentro)
DOMINI = {
    "ASSOLUTO":    "Il documento maestro e la sua evoluzione (VERSIONI v3→v8).",
    "V32":         "La CNC: BOM, schemi, manuali, note d'officina, decisioni.",
    "MIMS":        "Connettori modulari: design (disegni) e protocollo/manifesti.",
    "VITA_NATURA": "Il centro estetico di Maria + EVA (automazione WhatsApp).",
    "GENESIS":     "Lo stack AI: architettura, RAG, agenti, automazioni.",
    "FINANZA":     "Modelli, valore, scienza finanziaria.",
    "OFFICINA":    "Attrezzatura, fornitori, procedure fisiche.",
    "VULCAN":      "La pressa polimeri.",
    "CV":          "Identità professionale, capacità.",
    "KNOWLEDGE":   "Sapere trasversale: visione, personaggi, prompt, media, ricerca.",
    "SESSIONI":    "Cattura delle decisioni dalle sessioni + archivio storie.",
}


def md_files(d: Path):
    return sorted([p for p in d.rglob("*.md")
                   if not any(s in p.parts for s in SKIP) and p.name != "HOME.md"
                   and not p.name.startswith("_INDEX")],
                  key=lambda p: str(p).lower())


def link(p: Path) -> str:
    # Obsidian risolve [[nome]] per nome-file; titolo leggibile dal nome
    titolo = p.stem.replace("_", " ").strip()
    return f"[[{p.stem}|{titolo}]]"


def gen_domain_index(domain_dir: Path):
    files = md_files(domain_dir)
    if not files:
        return 0
    name = domain_dir.name
    lines = [AUTO, "", f"# {name} — indice", "",
             DOMINI.get(name, ""), "",
             f"*{len(files)} note · rigenerato {datetime.now():%Y-%m-%d}*", ""]
    # raggruppa per sottocartella
    by_sub: dict[str, list] = {}
    for f in files:
        rel = f.relative_to(domain_dir)
        sub = rel.parts[0] if len(rel.parts) > 1 else "."
        by_sub.setdefault(sub, []).append(f)
    for sub in sorted(by_sub):
        if sub != ".":
            lines.append(f"## {sub}")
        for f in by_sub[sub]:
            lines.append(f"- {link(f)}")
        lines.append("")
    (domain_dir / f"_INDEX_{name}.md").write_text("\n".join(lines), encoding="utf-8")
    return len(files)


def main() -> int:
    domini = sorted([d for d in MENTE.iterdir()
                     if d.is_dir() and d.name not in SKIP and not d.name.startswith(".")])
    home = [AUTO, "", "# 🧠 LA MENTE — TITANIUM_OS",
            "", "Il sapere di Matteo, navigabile. Ogni dominio ha il suo indice; "
            "il **graph view** di Obsidian (icona a sinistra) mostra le connessioni.",
            "", f"*Vault rigenerato il {datetime.now():%Y-%m-%d %H:%M} · "
            "apri questo file come nota iniziale.*", "", "---", ""]
    total = 0
    for d in domini:
        n = gen_domain_index(d)
        if n == 0:
            continue
        total += n
        desc = DOMINI.get(d.name, "")
        home.append(f"## [[_INDEX_{d.name}|{d.name}]]  ·  {n} note")
        if desc:
            home.append(f"> {desc}")
        home.append("")
    home.insert(8, f"**{total} note in {len(domini)} domini.**")
    (MENTE / "HOME.md").write_text("\n".join(home), encoding="utf-8")
    print(f"  HOME.md + {len(domini)} indici di dominio · {total} note totali.")
    print(f"  Apri in Obsidian: vault = {MENTE}  →  apri HOME.md  →  graph view.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
