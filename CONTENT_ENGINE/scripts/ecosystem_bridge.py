# ecosystem_bridge.py | TITANIUM_OS / CONTENT_ENGINE | v1.0 | 2026-06-20
# UNISCE I DUE MONDI: finora vault_intersect collega sapere<->sapere (salta le STORIE) e
# storie_intersect collega episodio<->episodio. Mancavano i PONTI cross-mondo: la storia
# "VULCAN la pelle" non era legata a VULCAN_MANIFESTO. Questo passo costruisce UN solo
# spazio TF-IDF su TUTTO il vault (sapere + storie) e inietta un blocco `## Nell'ecosistema`
# con i legami CROSS-MONDO (ogni episodio -> note di sapere; ogni nota -> episodi).
# Non tocca i blocchi `## Collegati` esistenti (marker propri) -> additivo, idempotente.
# "Recuperare tutto e unire in ecosistema" (Matteo, 20/06): esteso il piu' possibile.
# Uso: python CONTENT_ENGINE/scripts/ecosystem_bridge.py [--min-sim 0.05] [--max 5]

import os, re, sys, math, argparse, collections
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass

MENTE = Path(os.environ.get("MENTE_DIR", r"C:\Users\teo\MICROINDUSTRY\MENTE"))
_E_START = "<!-- ECOSISTEMA:start (auto, ecosystem_bridge) -->"
_E_END   = "<!-- ECOSISTEMA:end -->"
SIG = 30
SKIP_DIRS  = {".obsidian", ".git", "_allegati", "_ARCHIVIO", "_PROPOSTI"}  # _ARCHIVIO/_PROPOSTI: non canone (sess.#43)
SKIP_STEMS = {"HOME", "README", "_EVOLUZIONE", "PIETRE", "_SMISTAMENTO"}

STOP = set("""
il lo la i gli le un uno una di a da in con su per tra fra e o ed od ad ma se che chi cui non come piu più
del della dei delle dal dalla dallo nel nella nello negli nelle sul sulla sullo al alla allo agli alle un'
dell d l it the of to and or for with on is are be by from this that as at its has have not was were md txt
pdf docx v1 v2 v3 v4 v5 v6 v7 v8 atto nuovo documento testo readme index nota note file appunti si no ci vi
ne li loro suo sua sue suoi mio mia tuo tua questo questa questi queste quello quella ogni tutto tutti tutte
ancora gia già anche solo molto poco quando dove perche perché cosa cosi così essere avere fare puo può deve
parte modo cose verso senza sopra sotto dopo prima ora qui qua cos po vuol vuoi all sull nell dall coi cogli
quale quali ossia cioe cioè oltre entro mentre quindi episodio ep collegati nell ecosistema tema
""".split())

_ID_RX   = re.compile(r"^#\s+(.+)$", re.MULTILINE)
_HEAD_RX = re.compile(r"^#{1,6}\s+(.+)$", re.MULTILINE)
_TAG_RX  = re.compile(r"^tags:\s*(.+)$", re.MULTILINE)
_WORD    = re.compile(r"[a-zA-Zàèéìòùç0-9]{3,}")
_CODE    = re.compile(r"```.*?```", re.DOTALL)
_BLK_COLL = re.compile(r"<!--\s*COLLEGATI:start.*?COLLEGATI:end\s*-->", re.DOTALL)
_BLK_ECO  = re.compile(re.escape(_E_START) + r".*?" + re.escape(_E_END), re.DOTALL)


def _toks(s):
    for w in _WORD.findall(s.lower()):
        if w in STOP or w.isdigit() or len(w) < 3: continue
        yield w

def term_freq(path, text):
    body = _BLK_ECO.sub("", _BLK_COLL.sub("", text))
    body = _CODE.sub(" ", body)
    tf = collections.Counter()
    for w in _toks(path.stem.replace("_"," ").replace("-"," ")): tf[w] += 3
    for m in _HEAD_RX.finditer(body[:4000]):
        for w in _toks(m.group(1)): tf[w] += 2
    mt = _TAG_RX.search(text[:600])
    if mt:
        for w in _toks(mt.group(1)): tf[w] += 3
    for w in _toks(body[:8000]): tf[w] += 1
    return tf

def _world(path):
    return "storia" if "STORIE" in path.parts else "sapere"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-sim", type=float, default=0.04)
    ap.add_argument("--max", type=int, default=8, help="max ponti cross-mondo per nota")
    args = ap.parse_args()
    if not MENTE.exists():
        print(f"[ecosystem_bridge] MENTE assente: {MENTE}"); return 1

    notes = []
    for p in sorted(MENTE.rglob("*.md")):
        if any(s in p.parts for s in SKIP_DIRS): continue
        if p.stem in SKIP_STEMS or p.stem.startswith("_INDEX"): continue
        try: txt = p.read_text(encoding="utf-8", errors="replace")
        except Exception: continue
        tf = term_freq(p, txt)
        if not tf: continue
        m = _ID_RX.search(txt[:1500])
        title = (m.group(1).strip() if m else p.stem.replace("_"," "))[:80]
        notes.append({"path": p, "stem": p.stem, "title": title, "tf": tf,
                      "txt": txt, "world": _world(p)})
    N = len(notes)
    if N < 2:
        print("[ecosystem_bridge] meno di 2 note"); return 0

    df = collections.Counter()
    for n in notes:
        for w in n["tf"]: df[w] += 1
    idf = {w: math.log(1 + N / c) for w, c in df.items()}

    postings = collections.defaultdict(list)
    for i, n in enumerate(notes):
        vec = {w: n["tf"][w] * idf.get(w, 0) for w in n["tf"]}
        top = sorted(vec.items(), key=lambda kv: -kv[1])[:SIG]
        norm = math.sqrt(sum(w*w for _, w in top)) or 1.0
        n["sig"] = {w: v/norm for w, v in top}
        for w, ww in n["sig"].items():
            postings[w].append((i, ww))

    total = bridged = 0
    for i, n in enumerate(notes):
        sims = collections.defaultdict(float)
        for w, ww in n["sig"].items():
            for j, wj in postings[w]:
                if j != i and notes[j]["world"] != n["world"]:   # SOLO cross-mondo
                    sims[j] += ww * wj
        scored = sorted(((s, j) for j, s in sims.items() if s >= args.min_sim), key=lambda x: -x[0])

        if scored:
            bridged += 1
            verso = "episodi che lo raccontano" if n["world"] == "sapere" else "il sapere dietro la storia"
            righe = [f"*{verso}:*"]
            seen_stems = set()
            for s, j in scored:
                if len(seen_stems) >= args.max:    # max link UNICI
                    break
                o = notes[j]
                if o["stem"] in seen_stems:        # dedup: stessi stem (copie) = un link solo
                    continue
                seen_stems.add(o["stem"])
                shared = sorted(set(n["sig"]) & set(o["sig"]), key=lambda w: -(n["sig"][w]+o["sig"][w]))[:3]
                righe.append(f"- [[{o['stem']}|{o['title']}]] — *{', '.join(shared) if shared else o['world']}*")
            blocco = _E_START + "\n## Nell'ecosistema\n" + "\n".join(righe) + "\n" + _E_END
            total += len(righe) - 1   # link effettivi (esclusa l'intestazione)
        else:
            blocco = _E_START + "\n## Nell'ecosistema\n_nessun ponte cross-mondo_\n" + _E_END

        txt = n["txt"]
        new = _BLK_ECO.sub(lambda _: blocco, txt) if _E_START in txt else (txt.rstrip() + "\n\n" + blocco + "\n")
        if new != txt:
            n["path"].write_text(new, encoding="utf-8")

    saperi  = sum(1 for n in notes if n["world"] == "sapere")
    storie  = N - saperi
    print(f"ECOSYSTEM BRIDGE: {N} note ({saperi} sapere + {storie} storie) · "
          f"{total} ponti cross-mondo · {bridged} note collegate ai due mondi")
    return 0

if __name__ == "__main__":
    sys.exit(main())
