# vault_intersect.py | TITANIUM_OS / CONTENT_ENGINE | v3.0 | 2026-07-20
# Interseca il RESTO del vault (KNOWLEDGE, GENESIS, V32, MIMS, VULCAN, FINANZA, ...) come
# storie_intersect fa per gli episodi: da note isolate a RETE. Inietta i wikilink
# `## Collegati` -> il grafo di Obsidian connette anche il sapere.
#
# v3.0: i legami si calcolano nello SPAZIO SEMANTICO DEL RAG. Ogni nota diventa un vettore
#   con lo STESSO modello del RAG (paraphrase-multilingual-MiniLM-L12-v2, su CPU per non
#   contendere la GPU all'API); legame = cosine oltre soglia. Cosi' i Collegati che navighi
#   in Obsidian SONO i vicini semantici del RAG (trova parentele anche senza parole in
#   comune) e quegli stessi [[link]] rientrano nel linkgraph -> migliorano la graph-expansion
#   in query: il loop Obsidian<->RAG si chiude. La firma TF-IDF resta SOLO per l'etichetta
#   "tema". Fallback automatico a TF-IDF (--engine tfidf) se l'embedder non e' disponibile:
#   il vault non resta mai senza Collegati.
#
# v2.0: i legami si calcolano sul CONTENUTO, non solo sul titolo. Ogni nota diventa un
#   vettore TF-IDF (nome-file/heading/tag pesati di piu', ma si legge tutto il corpo),
#   firma = top-N termini, legame = COSINE similarity oltre soglia. Cosi' le note vecchie-
#   ma-ricche con titoli generici (prima "nessun legame") si connettono per ciò che DICONO.
#   Bonus lieve stesso-dominio (cluster) senza bloccare i legami cross-dominio (l'ecosistema).
# v1.0: keyword solo da nome-file+titolo+tag (troppo povero -> molte note isolate).
#
# v2.1: emette DATA/audit/vault_orphans.json — le note senza alcun legame (orfani di RETE).
#   Tesi Konik ("graph view = diagnostico, non gingillo"): un orfano ai bordi del grafo
#   = sapere scollegato o indice/MOC stantio. night_audit lo legge come canon_violations.
#
# Esclude STORIE/ (le fa setup_obsidian/storie_intersect), gli indici _* e i servizi.
# Idempotente (blocco fra marker, stessi di v1 -> sovrascrive i legami vecchi).
# Uso: python CONTENT_ENGINE/scripts/vault_intersect.py [--engine auto|semantic|tfidf] [--min-sim S] [--max 8]

import os
import re
import sys
import json
import math
import argparse
import collections
from datetime import datetime
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

MENTE = Path(os.environ.get("MENTE_DIR", r"C:\Users\teo\MICROINDUSTRY\MENTE"))
TI_ROOT = Path(__file__).resolve().parents[2]
ORPHANS_F = TI_ROOT / "DATA" / "audit" / "vault_orphans.json"

_C_START = "<!-- COLLEGATI:start (auto, vault_intersect) -->"
_C_END = "<!-- COLLEGATI:end -->"

SIG = 30          # quanti termini compongono la "firma" di una nota
# ECOSISTEMA non ZONE (#43): prima un bonus allo stesso-dominio costruiva muri attorno
# a V32/MIMS/GENESIS/... -> il grafo veniva "a zone". Ora si premiano i PONTI cross-dominio
# e se ne garantiscono alcuni per nota (principio Giuntura: ogni nota esce dal suo cluster).
CROSS_BONUS   = 1.15   # un legame verso un ALTRO dominio pesa un filo di piu' (ponte > muro)
CROSS_RESERVE = 4      # min. legami cross-dominio garantiti per nota (se esistono sopra soglia)

# cartelle/note da NON toccare
# (#53, attacco 07 P3): + _ARCHIVIO/_PROPOSTI — gli archivi non si intessono né contano
# come orfani di RETE (night_audit li leggeva come canon_violations = rumore).
SKIP_DIRS = {"STORIE", ".obsidian", ".git", "_allegati", "_ARCHIVIO", "_PROPOSTI"}
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


# STESSO modello del RAG (rag_engine.EMBED_MODEL) -> stesso spazio semantico. Tenere in sync.
EMBED_MODEL = "paraphrase-multilingual-MiniLM-L12-v2"
# Soglia cosine densa: calibrata sui dati del vault (mediana coppie ~0.34 = rumore;
# quantile 0.90 ~0.53). 0.50 tiene solo parentele forti. Il TF-IDF (fallback) resta 0.045.
SEM_MIN_SIM = 0.50
# Due candidati con cosine >= questa = la stessa cosa (es. note-sessione duplicate): se ne
# tiene UNO solo, così i quasi-duplicati non inondano i Collegati scacciando i doc veri.
DEDUP_SIM = 0.90


def _load_embedder():
    """Carica il modello del RAG su CPU. None su QUALSIASI errore (torch assente, modello
    non scaricato, ...) -> il chiamante ripiega su TF-IDF. CPU forzata: l'API possiede la GPU."""
    os.environ.setdefault("RAG_DEVICE", "cpu")
    try:
        from sentence_transformers import SentenceTransformer
        return SentenceTransformer(EMBED_MODEL, device="cpu")
    except Exception as e:
        print(f"[vault_intersect] embedder RAG non disponibile ({e}) -> TF-IDF")
        return None


def _note_repr(n) -> str:
    """Testo rappresentativo di una nota per l'embedding: titolo + incipit del corpo
    (senza blocco Collegati ne' code). Il modello tronca ~128 token: titolo+incipit = tema."""
    body = _COLLEGATI_RX.sub("", n["txt"])
    body = _CODE_RX.sub(" ", body)
    body = re.sub(r"\s+", " ", body).strip()
    return f"{n['title']}. {body[:1500]}"


def _semantic_sims(notes, embedder):
    """Similarita' coseno nello spazio del RAG. Salva n['vec'] (serve al dedup dei
    quasi-duplicati) e ritorna list[dict[j->score]]."""
    import numpy as np
    texts = [_note_repr(n) for n in notes]
    emb = embedder.encode(texts, batch_size=64, normalize_embeddings=True,
                          show_progress_bar=False)
    emb = np.asarray(emb, dtype="float32")
    for i, n in enumerate(notes):
        n["vec"] = emb[i]
    S = emb @ emb.T
    sims_all = []
    for i in range(len(notes)):
        row = S[i]
        sims_all.append({j: float(v) for j, v in enumerate(row) if j != i and v > 0})
    return sims_all


def _is_dup(cand_j, chosen_js, notes) -> bool:
    """True se la nota cand_j e' quasi-identica (cosine >= DEDUP_SIM) a una gia' scelta.
    Attivo solo in semantic (dove esiste n['vec']); in TF-IDF ritorna sempre False."""
    v = notes[cand_j].get("vec")
    if v is None:
        return False
    import numpy as np
    return any(float(np.dot(v, notes[cj]["vec"])) >= DEDUP_SIM for cj in chosen_js)


def _tfidf_sims(notes):
    """Fallback: similarita' TF-IDF sulla firma n['sig']. Ritorna list[dict[j->score]]."""
    postings = collections.defaultdict(list)
    for i, n in enumerate(notes):
        for w, ww in n["sig"].items():
            postings[w].append((i, ww))
    sims_all = [collections.defaultdict(float) for _ in notes]
    for i, n in enumerate(notes):
        for w, ww in n["sig"].items():
            for j, wj in postings[w]:
                if j != i:
                    sims_all[i][j] += ww * wj
    return sims_all


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--engine", choices=["auto", "semantic", "tfidf"], default="auto",
                    help="auto: prova il RAG (semantic), altrimenti TF-IDF")
    ap.add_argument("--min-sim", type=float, default=None,
                    help="soglia cosine per un legame (default: semantic 0.33 / tfidf 0.045)")
    ap.add_argument("--max", type=int, default=10, help="max legami per nota")
    args = ap.parse_args()

    if not MENTE.exists():
        print(f"[vault_intersect] MENTE assente: {MENTE}")
        return 1

    # Engine: nello spazio semantico del RAG se disponibile, altrimenti TF-IDF (il vault
    # non resta mai senza Collegati). 'auto'/'semantic' provano a caricare l'embedder.
    engine = args.engine
    embedder = None
    if engine in ("auto", "semantic"):
        embedder = _load_embedder()
        if embedder is not None:
            engine = "semantic"
        else:
            if args.engine == "semantic":
                print("[vault_intersect] semantic richiesto ma embedder assente -> TF-IDF")
            engine = "tfidf"
    if args.min_sim is None:
        args.min_sim = SEM_MIN_SIM if engine == "semantic" else 0.045

    # Il boost cross-dominio (×1.15) + gli slot riservati erano una stampella TF-IDF: nello
    # spazio DENSO (tutto 0.5-0.6) ribaltano la classifica e seppelliscono i legami
    # same-domain più forti (es. VULCAN->VULCAN_MANIFESTO). Il modello trova i ponti da solo,
    # quindi in semantic si neutralizza il pollice sulla bilancia (bonus 1.0, riserva leggera).
    cross_bonus = 1.0 if engine == "semantic" else CROSS_BONUS
    cross_reserve = 2 if engine == "semantic" else CROSS_RESERVE

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

    # firma TF-IDF per nota (top SIG termini): serve SEMPRE per l'etichetta "tema" dei
    # legami (le parole condivise che spiegano PERCHE' due note si toccano), a prescindere
    # dall'engine che decide CHI si collega.
    for n in notes:
        vec = {w: n["tf"][w] * idf.get(w, 0) for w in n["tf"]}
        top = sorted(vec.items(), key=lambda kv: -kv[1])[:SIG]
        norm = math.sqrt(sum(w * w for _, w in top)) or 1.0
        n["sig"] = {w: w_ / norm for w, w_ in top}

    # CHI si collega: engine semantico (embedding del RAG) o TF-IDF (fallback). Il RAG
    # decide le parentele per SIGNIFICATO; la firma TF-IDF sopra spiega solo il "tema".
    if engine == "semantic":
        sims_all = _semantic_sims(notes, embedder)
    else:
        sims_all = _tfidf_sims(notes)

    total = 0
    connesse = 0
    cross_total = 0
    orfani = []
    for i, n in enumerate(notes):
        sims = sims_all[i]
        # premia i ponti cross-dominio + riserva qualche slot ai migliori legami verso
        # ALTRI domini, così ogni nota esce dal suo cluster (ecosistema, non zone).
        scored = []
        for j, s in sims.items():
            cross = notes[j]["domain"] != n["domain"]
            s *= (cross_bonus if cross else 1.0)
            if s >= args.min_sim:
                scored.append((s, cross, j))
        scored.sort(key=lambda x: -x[0])
        # scelta con collasso dei quasi-duplicati: prima i ponti cross-dominio garantiti,
        # poi i migliori restanti; mai due volte "la stessa" nota (dedup su n['vec']).
        chosen, chosen_js = [], []
        for t in [x for x in scored if x[1]]:          # ponti cross-dominio, i migliori
            if len(chosen) >= cross_reserve:
                break
            if _is_dup(t[2], chosen_js, notes):
                continue
            chosen.append(t); chosen_js.append(t[2])
        for t in scored:                                # riempi coi migliori in assoluto
            if len(chosen) >= args.max:
                break
            if t in chosen or _is_dup(t[2], chosen_js, notes):
                continue
            chosen.append(t); chosen_js.append(t[2])
        top = [(s, j) for s, _c, j in sorted(chosen, key=lambda x: -x[0])]

        righe = []
        for s, j in top:
            o = notes[j]
            shared = sorted(set(n["sig"]) & set(o["sig"]),
                            key=lambda w: -(n["sig"][w] + o["sig"][w]))[:3]
            tema = ", ".join(shared) if shared else o["domain"].lower()
            righe.append(f"- [[{o['stem']}|{o['title']}]] — *tema: {tema}*")
        if top:
            connesse += 1
        else:
            orfani.append({"stem": n["stem"], "title": n["title"], "domain": n["domain"],
                           "rel": n["path"].relative_to(MENTE).as_posix()})
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

    # Orfani di RETE (Konik): artefatto per la cartella clinica (night_audit lo legge come
    # canon_violations). Solo additivo: i legami sopra non cambiano.
    try:
        ORPHANS_F.parent.mkdir(parents=True, exist_ok=True)
        ORPHANS_F.write_text(json.dumps({
            "generated": datetime.now().isoformat(timespec="seconds"),
            "engine": engine,
            "soglia": args.min_sim,
            "n_note": N,
            "n_orfani": len(orfani),
            "orfani": sorted(orfani, key=lambda o: (o["domain"], o["stem"])),
        }, ensure_ascii=False, indent=2), encoding="utf-8")
    except Exception as e:
        print(f"[vault_intersect] avviso: vault_orphans.json non scritto ({e})")

    pct = (100 * cross_total / total) if total else 0
    print(f"VAULT INTERSECT v3 [{engine}]: {N} note di sapere · {total} legami "
          f"({cross_total} cross-dominio = {pct:.0f}%) · {connesse} connesse · {N - connesse} isolate (soglia {args.min_sim})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
