# vault_intersect.py | TITANIUM_OS / CONTENT_ENGINE | v2.0 | 2026-06-20
# Interseca il RESTO del vault (KNOWLEDGE, GENESIS, V32, MIMS, VULCAN, FINANZA, ...) come
# storie_intersect fa per gli episodi: da note isolate a RETE. Inietta i wikilink
# `## Collegati` -> il grafo di Obsidian connette anche il sapere.
#
# v2.0: i legami si calcolano sul CONTENUTO, non solo sul titolo. Ogni nota diventa un
#   vettore TF-IDF (nome-file/heading/tag pesati di piu', ma si legge tutto il corpo),
#   firma = top-N termini, legame = COSINE similarity oltre soglia. Cosi' le note vecchie-
#   ma-ricche con titoli generici (prima "nessun legame") si connettono per ciò che DICONO.
#   Bonus lieve stesso-dominio (cluster) senza bloccare i legami cross-dominio (l'ecosistema).
# v1.0: keyword solo da nome-file+titolo+tag (troppo povero -> molte note isolate).
#
# Esclude STORIE/ (le fa setup_obsidian/storie_intersect), gli indici _* e i servizi.
# Idempotente (blocco fra marker, stessi di v1 -> sovrascrive i legami vecchi).
# Uso: python CONTENT_ENGINE/scripts/vault_intersect.py [--min-sim 0.06] [--max 8]

import os
import re
import sys
import math
import argparse
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

SIG = 30          # quanti termini compongono la "firma" di una nota
# ECOSISTEMA non ZONE (#43): prima un bonus allo stesso-dominio costruiva muri attorno
# a V32/MIMS/GENESIS/... -> il grafo veniva "a zone". Ora si premiano i PONTI cross-dominio
# e se ne garantiscono alcuni per nota (principio Giuntura: ogni nota esce dal suo cluster).
CROSS_BONUS   = 1.12   # un legame verso un ALTRO dominio pesa un filo di piu' (ponte > muro)
CROSS_RESERVE = 2      # min. legami cross-dominio garantiti per nota (se esistono sopra soglia)

# cartelle/note da NON toccare
SKIP_DIRS = {"STORIE", ".obsidian", ".git", "_allegati"}
SKIP_STEMS = {"HOME", "README", "_EVOLUZIONE"}

STOP = set("""
il lo la i gli le un uno una di a da in con su per tra fra e o ed od ad ma se che chi cui non come piu più
del della dei delle dal dalla dallo nel nella nello negli nelle sul sulla sullo al alla allo agli alle un'
dell d l it the of to and or for with on is are be by from this that as at its has have not are was were
md txt pdf docx v1 v2 v3 v4 v5 v6 v7 v8 atto nuovo documento testo readme index nota note file appunti
si no ci vi ne li gli loro suo sua sue suoi mio mia tuo tua questo questa questi queste quello quella
ogni tutto tutti tutte ancora gia già anche solo molto poco quando dove perche perché cosa cosi così
essere avere fare puo può deve fra parte modo cose verso senza sopra sotto dopo prima ora qui qua
cos po vuol vuoi all sull nell dall coi cogli quale quali ossia cioe cioè oltre entro mentre quindi
""".split())

_ID_RX = re.compile(r"^#\s+(.+)$", re.MULTILINE)
_HEAD_RX = re.compile(r"^#{1,6}\s+(.+)$", re.MULTILINE)
_TAG_RX = re.compile(r"^tags:\s*(.+)$", re.MULTILINE)
_WORD = re.compile(r"[a-zA-Zàèéìòùç0-9]{3,}")
_CODE_RX = re.compile(r"```.*?```", re.DOTALL)
_COLLEGATI_RX = re.compile(re.escape(_C_START) + r".*?" + re.escape(_C_END), re.DOTALL)


def _toks(s: str):
    for w in _WORD.findall(s.lower()):
        if w in STOP or w.isdigit() or len(w) < 3:
            continue
        yield w


def term_freq(path: Path, text: str) -> collections.Counter:
    """TF pesata: nome-file ×3, heading ×2, tag ×3, corpo ×1. Niente blocco Collegati/code."""
    body = _COLLEGATI_RX.sub("", text)
    body = _CODE_RX.sub(" ", body)
    tf = collections.Counter()
    # nome-file (segnale forte di cosa parla la nota)
    for w in _toks(path.stem.replace("_", " ").replace("-", " ")):
        tf[w] += 3
    # tutti gli heading
    for m in _HEAD_RX.finditer(body[:4000]):
        for w in _toks(m.group(1)):
            tf[w] += 2
    # tag frontmatter
    mt = _TAG_RX.search(text[:600])
    if mt:
        for w in _toks(mt.group(1)):
            tf[w] += 3
    # corpo (primi ~8000 char: l'incipit porta il tema; evita di pesare doc enormi all'infinito)
    for w in _toks(body[:8000]):
        tf[w] += 1
    return tf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-sim", type=float, default=0.05, help="soglia cosine per creare un legame")
    ap.add_argument("--max", type=int, default=8, help="max legami per nota")
    args = ap.parse_args()

    if not MENTE.exists():
        print(f"[vault_intersect] MENTE assente: {MENTE}")
        return 1

    notes = []
    for p in sorted(MENTE.rglob("*.md")):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.stem in SKIP_STEMS or p.stem.startswith("_INDEX"):
            continue
        try:
            txt = p.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        tf = term_freq(p, txt)
        if not tf:
            continue
        m = _ID_RX.search(txt[:1500])
        title = (m.group(1).strip() if m else p.stem.replace("_", " "))[:80]
        domain = p.relative_to(MENTE).parts[0]
        notes.append({"path": p, "stem": p.stem, "title": title,
                      "tf": tf, "txt": txt, "domain": domain})

    N = len(notes)
    if N < 2:
        print("[vault_intersect] meno di 2 note — niente da intersecare")
        return 0

    # IDF su tutto il corpus
    df = collections.Counter()
    for n in notes:
        for w in n["tf"]:
            df[w] += 1
    idf = {w: math.log(1 + N / c) for w, c in df.items()}

    # firma TF-IDF per nota (top SIG termini), L2-normalizzata -> cosine = prodotto scalare
    postings = collections.defaultdict(list)   # term -> [(idx, weight)]
    for i, n in enumerate(notes):
        vec = {w: n["tf"][w] * idf.get(w, 0) for w in n["tf"]}
        top = sorted(vec.items(), key=lambda kv: -kv[1])[:SIG]
        norm = math.sqrt(sum(w * w for _, w in top)) or 1.0
        sig = {w: w_ / norm for w, w_ in top}
        n["sig"] = sig
        for w, ww in sig.items():
            postings[w].append((i, ww))

    total = 0
    connesse = 0
    cross_total = 0
    for i, n in enumerate(notes):
        sims = collections.defaultdict(float)
        for w, ww in n["sig"].items():
            for j, wj in postings[w]:
                if j != i:
                    sims[j] += ww * wj
        # premia i ponti cross-dominio + riserva qualche slot ai migliori legami verso
        # ALTRI domini, così ogni nota esce dal suo cluster (ecosistema, non zone).
        scored = []
        for j, s in sims.items():
            cross = notes[j]["domain"] != n["domain"]
            s *= (CROSS_BONUS if cross else 1.0)
            if s >= args.min_sim:
                scored.append((s, cross, j))
        scored.sort(key=lambda x: -x[0])
        cross_first = [t for t in scored if t[1]][:CROSS_RESERVE]   # i migliori ponti, garantiti
        chosen = list(cross_first)
        for t in scored:
            if len(chosen) >= args.max:
                break
            if t not in chosen:
                chosen.append(t)
        top = [(s, j) for s, _c, j in sorted(chosen[:args.max], key=lambda x: -x[0])]

        righe = []
        for s, j in top:
            o = notes[j]
            shared = sorted(set(n["sig"]) & set(o["sig"]),
                            key=lambda w: -(n["sig"][w] + o["sig"][w]))[:3]
            tema = ", ".join(shared) if shared else o["domain"].lower()
            righe.append(f"- [[{o['stem']}|{o['title']}]] — *tema: {tema}*")
        if top:
            connesse += 1
        cross_total += sum(1 for _s, j in top if notes[j]["domain"] != n["domain"])
        blocco = _C_START + "\n## Collegati\n" + ("\n".join(righe) if righe else "_nessun legame_") + "\n" + _C_END

        txt = n["txt"]
        if _C_START in txt and _C_END in txt:
            new = _COLLEGATI_RX.sub(lambda _: blocco, txt)
        else:
            new = txt.rstrip() + "\n\n" + blocco + "\n"
        if new != txt:
            n["path"].write_text(new, encoding="utf-8")
        total += len(top)

    pct = (100 * cross_total / total) if total else 0
    print(f"VAULT INTERSECT v2: {N} note di sapere · {total} legami "
          f"({cross_total} cross-dominio = {pct:.0f}%) · {connesse} connesse · {N - connesse} isolate (soglia {args.min_sim})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
