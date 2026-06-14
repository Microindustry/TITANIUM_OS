# vault_intersect.py | TITANIUM_OS / CONTENT_ENGINE | v1.0 | 2026-06-13
# Interseca il RESTO del vault (KNOWLEDGE, GENESIS, V32, MIMS, FINANZA, ...) come
# storie_intersect fa per gli episodi: da note isolate a RETE. Le note di sapere
# raramente hanno metadati ricchi, quindi i legami si calcolano per KEYWORD condivise
# (da nome-file + titolo + tag), pesate IDF (un termine in troppe note non collega tutto).
# Inietta i wikilink `## Collegati` -> il grafo di Obsidian connette anche il sapere.
#
# Esclude STORIE/ (già fatto da setup_obsidian), gli indici _* e i file di servizio.
# Idempotente (blocco fra marker). Uso: python CONTENT_ENGINE/scripts/vault_intersect.py

import os
import re
import sys
import math
import collections
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

MENTE = Path(os.environ.get("MENTE_DIR", r"C:\Users\teo\MICROINDUSTRY\MENTE"))

_C_START = "<!-- COLLEGATI:start (auto, vault_intersect) -->"
_C_END = "<!-- COLLEGATI:end -->"
MAX_LINKS = 6
MIN_SHARED = 2

# cartelle/note da NON toccare
SKIP_DIRS = {"STORIE", ".obsidian", ".git", "_allegati"}
SKIP_STEMS = {"HOME", "README", "_EVOLUZIONE"}

STOP = set("""
il lo la i gli le un uno una di a da in con su per tra fra e o ma se che chi cui non come piu
del della dei delle dal dalla nel nella sul sulla al alla un' dell della d l it the of to and or
for with on in is are be by from this that as at it md txt pdf v1 v2 v3 v4 v5 v6 v7 v8 atto
nuovo documento testo readme index nota note file appunti
""".split())

_ID_RX = re.compile(r"^#\s+(.+)$", re.MULTILINE)
_WORD = re.compile(r"[a-zA-Zàèéìòù0-9]{3,}")


def keywords(path: Path, text: str) -> set:
    """Keyword di una nota: dal nome-file + primo heading + tag frontmatter."""
    src = path.stem.replace("_", " ").replace("-", " ")
    m = _ID_RX.search(text[:1500])
    if m:
        src += " " + m.group(1)
    mt = re.search(r"^tags:\s*(.+)$", text[:600], re.MULTILINE)
    if mt:
        src += " " + mt.group(1)
    out = set()
    for w in _WORD.findall(src.lower()):
        if w in STOP or w.isdigit():
            continue
        out.add(w)
    return out


def main():
    if not MENTE.exists():
        print(f"[vault_intersect] MENTE assente: {MENTE}")
        return 1

    notes = []  # (path, stem, title, keywords)
    for p in MENTE.rglob("*.md"):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.stem in SKIP_STEMS or p.stem.startswith("_INDEX"):
            continue
        try:
            txt = p.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        kw = keywords(p, txt)
        if not kw:
            continue
        m = _ID_RX.search(txt[:1500])
        title = m.group(1).strip() if m else p.stem.replace("_", " ")
        notes.append({"path": p, "stem": p.stem, "title": title[:80], "kw": kw, "txt": txt})

    # IDF: un termine presente in tante note pesa meno
    df = collections.Counter()
    for n in notes:
        for w in n["kw"]:
            df[w] += 1
    N = len(notes)
    idf = {w: math.log(1 + N / c) for w, c in df.items()}

    # stem unici (per wikilink non ambigui); se duplicato, si usa lo stem comunque
    by_stem = {}
    for n in notes:
        by_stem.setdefault(n["stem"], n)

    total = 0
    for n in notes:
        scored = []
        for o in notes:
            if o is n:
                continue
            shared = n["kw"] & o["kw"]
            if len(shared) < MIN_SHARED:
                continue
            score = sum(idf.get(w, 0) for w in shared)
            scored.append((score, o, shared))
        scored.sort(key=lambda x: -x[0])
        top = scored[:MAX_LINKS]

        righe = []
        for score, o, shared in top:
            kws = ", ".join(sorted(shared, key=lambda w: -idf.get(w, 0))[:3])
            righe.append(f"- [[{o['stem']}|{o['title']}]] — *tema: {kws}*")
        blocco = _C_START + "\n## Collegati\n" + ("\n".join(righe) if righe else "_nessun legame_") + "\n" + _C_END

        txt = n["txt"]
        if _C_START in txt and _C_END in txt:
            new = re.sub(re.escape(_C_START) + r".*?" + re.escape(_C_END), blocco, txt, flags=re.DOTALL)
        else:
            new = txt.rstrip() + "\n\n" + blocco + "\n"
        if new != txt:
            n["path"].write_text(new, encoding="utf-8")
        total += len(top)

    linked = sum(1 for n in notes if any(
        len(n["kw"] & o["kw"]) >= MIN_SHARED for o in notes if o is not n))
    print(f"VAULT INTERSECT: {N} note di sapere · {total} legami · {linked} connesse")


if __name__ == "__main__":
    main()
