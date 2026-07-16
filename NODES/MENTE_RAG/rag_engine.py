# rag_engine.py | TITANIUM_OS / NODES / MENTE_RAG | v4.3 | 2026-07-13
# RAG ibrido: ChromaDB semantico + TF-IDF BM25 keyword + CrossEncoder reranker
# Rebuild incrementale via manifest (mtime+size) — solo file nuovi/modificati
# Pattern: Hybrid RRF + two-stage retrieval (2024-2025 state-of-art)
# v4.1: chunking heading-aware sui .md (confini semantici + breadcrumb) + snapshot
#       chroma_db in _VAULT/BACKUPS (recovery istantaneo senza ri-embedding)
# v4.3: self-heal INVERSO nell'incrementale — file con vettori mancanti in ChromaDB
#       (scritture perse da indicizzatori concorrenti al boot) vengono ri-processati

import os, sys, re, json, pickle, logging, hashlib
from datetime import datetime
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# CUDA kill-switch (#42, PRIMA di importare torch). Se il device e' forzato a CPU
# (env RAG_DEVICE=cpu o file rag_device.txt con "cpu"), nascondi la GPU a torch ORA:
# anche coi modelli su CPU, torch+cu124 crea comunque il contesto CUDA, e su questa
# GTX 1070 dopo un riavvio sporco quel contesto riserva ~57 GB di COMMIT -> satura
# Windows e impalla il PC. CUDA_VISIBLE_DEVICES="" impedisce la creazione del contesto.
# Va fatto qui, prima di qualsiasi import che tiri dentro torch (sentence_transformers).
def _early_cpu_gate():
    f = os.environ.get("RAG_DEVICE", "").strip().lower()
    if not f:
        p = Path(__file__).resolve().parent / "rag_device.txt"
        if p.exists():
            try: f = p.read_text(encoding="utf-8").strip().lower()
            except Exception: f = ""
    if f == "cpu":
        os.environ["CUDA_VISIBLE_DEVICES"] = ""
_early_cpu_gate()

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("rag_engine")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [rag_engine] %(levelname)s %(message)s")
    logger = logging.getLogger("rag_engine")

# HF Hub: i modelli (embedder+reranker) sono in cache locale -> il rebuild non
# ha bisogno della rete. Senza HF_TOKEN huggingface_hub logga a ogni load
# "unauthenticated requests to the HF Hub..." che finiva in night_research.log e
# faceva rigenerare la critica AUD-3d358b577a/c322691a4c. Il warning e' innocuo
# qui (cache), quindi lo zittiamo alla fonte. Se Matteo aggiunge HF_TOKEN in .env
# viene usato comunque (download piu' rapidi); resta opt-in HF_HUB_OFFLINE=1. (#44)
os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
for _hf in ("huggingface_hub", "huggingface_hub.utils._http"):
    logging.getLogger(_hf).setLevel(logging.ERROR)

import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity as _cos_sim

# ── CONFIG ───────────────────────────────────────────────────────────────────
MENTE_DIR      = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
_HERE          = Path(__file__).resolve().parent
CHROMA_DIR     = _HERE / "chroma_db"
MANIFEST_PATH  = _HERE / "rag_manifest.json"
CORPUS_PATH    = _HERE / "rag_corpus.jsonl"
TFIDF_PATH     = _HERE / "rag_tfidf.pkl"
COLLECTION     = "mente"
EMBED_MODEL    = "paraphrase-multilingual-MiniLM-L12-v2"
RERANKER_MODEL = "BAAI/bge-reranker-v2-m3"   # multilingue (100+ lingue, IT) — ms-marco era solo EN su contenuto italiano (upgrade 14/06, testato: discrimina IT)

# DEVICE: GPU se disponibile (ottimizzazione 22/06). La embedding-function di ChromaDB
# e il CrossEncoder default-ano su CPU -> rebuild 5-8x piu lenti e query piu lente.
# Forzare "cuda" sulla GTX 1070 accelera embedding (indicizzazione) e rerank (query).
#
# OVERRIDE (22/06 #42): dopo un riavvio sporco l'init CUDA di torch+cu124 su questa
# GTX 1070 riservava ~57 GB di COMMIT a ogni load -> saturava Windows e impallava il
# PC (RAM fisica libera, commit esaurito -> MemoryError all'import). Su CPU lo stesso
# load sta su ~5 GB e gira. Finche' la GPU non e' ripristinata si forza CPU senza
# toccare lo stack: RAG_DEVICE=cpu (env) oppure file NODES/MENTE_RAG/rag_device.txt
# con dentro "cpu". Default invariato (auto-cuda) quando non c'e' override.
_DEVICE_FILE = _HERE / "rag_device.txt"

def _resolve_device():
    forced = os.environ.get("RAG_DEVICE", "").strip().lower()
    if not forced and _DEVICE_FILE.exists():
        try:
            forced = _DEVICE_FILE.read_text(encoding="utf-8").strip().lower()
        except Exception:
            forced = ""
    if forced in ("cpu", "cuda"):
        return forced
    try:
        import torch as _torch
        return "cuda" if _torch.cuda.is_available() else "cpu"
    except Exception:
        return "cpu"

DEVICE = _resolve_device()

CHUNK_SIZE     = 512    # chars (~100 token) — ottimale per Q&A tecnico
CHUNK_STRIDE   = 200    # 61% overlap — bilancia contesto e precisione
# CHUNK_VER governa l'invalidazione del manifest (cambiarlo = full re-embed di TUTTO
# al prossimo --incremental). NON lo tocchiamo per il passaggio a heading-aware:
# un re-embed di 32k chunk vuole la GPU libera, ma la notte l'API è su (24/7) -> OOM
# 8GB, proprio il guasto da blackout che vogliamo evitare. La geometria del chunk è
# invariata, quindi il nuovo algoritmo entra in modo ADDITIVO: ogni .md adotta lo
# split heading-aware quando viene ri-processato (cambio mtime). Per migrare TUTTO il
# corpus in un colpo, rebuild DELIBERATO a GPU libera (API giù): --rebuild / --rebuild-hard.
CHUNK_VER      = f"v{CHUNK_SIZE}s{CHUNK_STRIDE}"
CHUNK_ALGO     = "heading-aware-md (v4.1)"   # doc: split sui titoli .md + breadcrumb
TOP_K          = 5

# SNAPSHOT: copia known-good di chroma_db in _VAULT/BACKUPS (fuori git). Il recovery
# a 2 livelli ricostruisce sempre dal corpus, ma uno snapshot permette un restore
# ISTANTANEO senza ri-embeddare 32k chunk. La notte ne scatta uno dopo l'incrementale.
ROOT           = Path(os.environ.get("TI_ROOT", str(_HERE.parents[1])))
SNAPSHOT_DIR   = ROOT / "_VAULT" / "BACKUPS" / "rag_snapshots"
SNAPSHOT_KEEP  = 3      # rotazione: tieni gli ultimi N snapshot

# WIKILINK-AWARE EXPANSION (GraphRAG-lite, v4.2) — l'edge dei vault Obsidian (SOTA 2026):
# se un chunk recuperato vive in una nota che linka [[B]], aggiungiamo candidati da B
# PRIMA del reranker, che fa da filtro (link irrilevante → scartato dal CrossEncoder).
# Il grafo si costruisce da puro walk+regex (NIENTE GPU): disaccoppiato dall'embedding,
# si rigenera live e a fine build_index. Risoluzione: target = stem del filename (.md).
LINKGRAPH_PATH = _HERE / "rag_linkgraph.json"
GRAPH_EXPAND_FROM = 3   # espandi dai primi N risultati RRF
GRAPH_EXPAND_MAX  = 8   # max candidati aggiunti dai link (poi il reranker decide)
_WIKILINK = re.compile(r"\[\[([^\]\|#]+)")   # cattura il target fino a | o # o ]]
FETCH_K        = TOP_K * 3   # candidati pre-rerank
RRF_K          = 60
SUPPORTED_EXT  = {".md", ".txt", ".py", ".json"}

# CANONE vs RICERCA (Punto 4a): la ricerca web atterra in KNOWLEDGE/RESEARCH ma
# NON entra nel RAG canonico — eviterebbe il garbage-in (paper irrilevanti che
# diluiscono il segnale delle decisioni V32/MIMS). Resta su file, consultabile;
# il digest notturno la sintetizza separatamente. Path relativi a MENTE_DIR.
# + ASSOLUTO/VERSIONI (#53, attacco 07 P0.2): storico v3→v6, _CANONE.md lo definisce
#   "storico" non verità — in RRF competeva alla pari con V9/reale.
EXCLUDE_REL_DIRS = (os.path.join("KNOWLEDGE", "RESEARCH"),
                    os.path.join("ASSOLUTO", "VERSIONI"))

# Cartelle di staging/archivio: NON sono canone (una sola verità sul RAG). Match a
# QUALSIASI livello del path.
# _ARCHIVIO = versioni vecchie/superate tenute come origine: i vecchi EP_AV (sess.#43)
#   e l'archivio fonti NotebookLM ex-_DA_ORDINARE (rinominato 24/06: canone V6 superato,
#   numeri parziali — vedi MENTE/_ARCHIVIO/_SMISTAMENTO.md). Restano in Obsidian, fuori canone.
# _PROPOSTI = proposte del generatore Nina da validare. Indicizzarle creerebbe
# duplicati/divergenze in retrieval. Stessa convenzione di build_episodes_json (part "_*").
# ARCHIVIO / ARCHIVE_V6 (#53, attacco 07 P0.2): le cartelle-archivio SENZA underscore
# (KNOWLEDGE/SINAPSI/ARCHIVIO 32 file incl. copie vecchie delle note canone V32,
# KNOWLEDGE/ASSOLUTO/ARCHIVE_V6 10 file) erano dentro il canone e servivano
# la verità vecchia in competizione con quella reale.
EXCLUDE_DIR_NAMES = {"_ARCHIVIO", "_PROPOSTI", "ARCHIVIO", "ARCHIVE_V6"}


def _is_excluded(path: Path) -> bool:
    """True se il file vive in una cartella esclusa dal canone (RICERCA web, o staging/archivio episodi)."""
    rel_parts = path.relative_to(MENTE_DIR).parts
    if any(part in EXCLUDE_DIR_NAMES for part in rel_parts[:-1]):
        return True
    rel = str(path.relative_to(MENTE_DIR))
    return any(rel == d or rel.startswith(d + os.sep) for d in EXCLUDE_REL_DIRS)


# ── CHROMA ────────────────────────────────────────────────────────────────────

def _get_collection(reset: bool = False):
    embed_fn = SentenceTransformerEmbeddingFunction(model_name=EMBED_MODEL, device=DEVICE)
    client   = chromadb.PersistentClient(path=str(CHROMA_DIR))
    col = client.get_or_create_collection(
        name=COLLECTION,
        embedding_function=embed_fn,
        metadata={"hnsw:space": "cosine"},
    )
    if reset:
        # SVUOTA per-id invece di delete_collection: il collection-level delete cambia
        # l'uuid e invalida l'handle che l'api (long-running, elevata) tiene aperto ->
        # "Collection does not exist" + rebuild che muore a metà. Svuotando per-id l'uuid
        # resta lo stesso: il rebuild gira pulito anche con l'api su (no UAC necessario).
        try:
            ids = col.get(include=[]).get("ids", [])
            for i in range(0, len(ids), 500):
                col.delete(ids=ids[i:i+500])
        except Exception:
            pass
    return col

# ── TEXT ──────────────────────────────────────────────────────────────────────

def _read_file(path: Path) -> str:
    try: return path.read_text(encoding="utf-8", errors="replace")
    except Exception: return ""

# Da quando MENTE è un vault Obsidian, ogni nota porta un blocco auto `## Collegati`
# (liste di [[wikilink]] iniettate da vault_intersect/storie_intersect) + commenti AUTO.
# Sono NAVIGAZIONE, non sapere: indicizzarli crea centinaia di chunk-lista quasi identici
# che diluiscono il segnale. Si tolgono prima del chunking (efficienza RAG su vault).
_COLLEGATI_BLK = re.compile(r"<!--\s*COLLEGATI:start.*?COLLEGATI:end\s*-->", re.DOTALL)
_ECOSISTEMA_BLK = re.compile(r"<!--\s*ECOSISTEMA:start.*?ECOSISTEMA:end\s*-->", re.DOTALL)
_AUTO_COMMENT  = re.compile(r"^<!--\s*AUTO-GENERATO.*?-->\s*$", re.MULTILINE)

def _clean_for_index(text: str) -> str:
    text = _COLLEGATI_BLK.sub("", text)
    text = _ECOSISTEMA_BLK.sub("", text)   # ponti cross-mondo: navigazione, non sapere (#43)
    text = _AUTO_COMMENT.sub("", text)
    return text

# File di pura navigazione del vault: indici e mappe auto-generate = solo wikilink.
# Niente sapere da cercare → fuori dal RAG (il loro contenuto vive già nelle note vere).
_NAV_FILES = {"HOME.md", "_EVOLUZIONE.md"}
def _is_nav_file(path: Path) -> bool:
    return path.name in _NAV_FILES or path.name.startswith("_INDEX")

def _chunk(text: str, sid: str) -> list[dict]:
    """Finestra scorrevole cieca alla struttura (fallback per .py/.json/.txt e per
    i markdown senza heading)."""
    chunks, start, idx = [], 0, 0
    while start < len(text):
        content = text[start:start + CHUNK_SIZE].strip()
        if len(content) > 40:
            chunks.append({"id": f"{sid}__c{idx}", "text": content})
            idx += 1
        start += CHUNK_STRIDE
    return chunks


_H_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*#*\s*$")

def _chunk_md_by_heading(text: str, sid: str) -> list[dict]:
    """Chunking heading-aware per Markdown (v4.1).

    Spezza il documento sulle intestazioni (#..######) — confini SEMANTICI veri,
    non offset ciechi — e antepone a ogni chunk il *breadcrumb* delle heading
    (es. "[V32 > Rinforzi colonne]"). Vantaggi:
      • un chunk non taglia più a metà una frase tra due sezioni diverse;
      • il breadcrumb dà contesto al modello E aggiunge keyword cercabili (il titolo
        di sezione finisce nel testo indicizzato → trovabile da semantico e BM25).
    Sezioni più lunghe di CHUNK_SIZE → finestra scorrevole INTERNA alla sezione
    (overlap dentro la sezione, mai tra sezioni). Documenti senza heading →
    fallback alla finestra cieca _chunk (identico comportamento precedente)."""
    sections: list[tuple[str, str]] = []   # (breadcrumb, body)
    stack: list[tuple[int, str]] = []      # (livello_heading, titolo)
    buf: list[str] = []

    def flush():
        body = "\n".join(buf).strip()
        if body:
            crumb = " > ".join(t for _, t in stack)
            sections.append((crumb, body))
        buf.clear()

    for ln in text.split("\n"):
        m = _H_RE.match(ln)
        if m:
            flush()  # chiudi la sezione sotto la heading precedente
            level, title = len(m.group(1)), m.group(2).strip()
            stack = [(lv, t) for lv, t in stack if lv < level]
            stack.append((level, title))
        else:
            buf.append(ln)
    flush()

    if not sections:                       # nessuna heading → vecchio comportamento
        return _chunk(text, sid)

    chunks, idx = [], 0
    for crumb, body in sections:
        prefix = f"[{crumb}]\n" if crumb else ""
        starts = range(0, len(body), CHUNK_STRIDE) if len(body) > CHUNK_SIZE else [0]
        for start in starts:
            seg = body[start:start + CHUNK_SIZE].strip()
            content = (prefix + seg).strip()
            if len(content) > 40:
                chunks.append({"id": f"{sid}__c{idx}", "text": content})
                idx += 1
    return chunks


def _chunk_dispatch(text: str, sid: str, suffix: str) -> list[dict]:
    """Markdown → heading-aware; tutto il resto (.py/.json/.txt) → finestra cieca."""
    if suffix == ".md":
        return _chunk_md_by_heading(text, sid)
    return _chunk(text, sid)

def _sid(rel: str) -> str:
    # base leggibile dal path + hash del path ORIGINALE: due file che si normalizzano
    # uguale (es. separatori diversi: "_" vs "—" vs "___") avevano lo STESSO id -> chunk
    # duplicati -> DuplicateIDError nel rebuild. L'hash garantisce unicita' senza cancellare
    # nessun file (le versioni quasi-duplicate restano, regola 1).
    base = re.sub(r"[^a-zA-Z0-9_\-]", "_", rel)
    h = hashlib.sha1(rel.encode("utf-8")).hexdigest()[:8]
    return f"{base}__{h}"

# ── MANIFEST ──────────────────────────────────────────────────────────────────

def _load_manifest() -> dict:
    if MANIFEST_PATH.exists():
        try:
            m = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
            if m.get("chunk_ver") == CHUNK_VER:
                return m
        except Exception: pass
    return {"chunk_ver": CHUNK_VER, "files": {}}

def _save_manifest(m: dict):
    MANIFEST_PATH.write_text(
        json.dumps(m, ensure_ascii=False, indent=2), encoding="utf-8"
    )

# ── CORPUS (per TF-IDF) ───────────────────────────────────────────────────────

def _load_corpus() -> dict[str, dict]:
    """Returns {chunk_id: {"text": str, "source": str}}"""
    out = {}
    if not CORPUS_PATH.exists():
        return out
    with open(CORPUS_PATH, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                item = json.loads(line.strip())
                out[item["id"]] = {"text": item["text"], "source": item.get("source", "")}
            except Exception: pass
    return out

def _save_corpus(corpus: dict[str, dict]):
    with open(CORPUS_PATH, "w", encoding="utf-8") as f:
        for cid, d in corpus.items():
            f.write(json.dumps(
                {"id": cid, "text": d["text"], "source": d["source"]},
                ensure_ascii=False,
            ) + "\n")

# ── TF-IDF BM25 ───────────────────────────────────────────────────────────────

def _fit_tfidf(corpus: dict[str, dict]):
    ids   = list(corpus.keys())
    texts = [corpus[i]["text"] for i in ids]
    if not texts:
        return
    vec    = TfidfVectorizer(
        analyzer="word", ngram_range=(1, 2),
        max_features=60_000, sublinear_tf=True,
    )
    matrix = vec.fit_transform(texts)
    with open(TFIDF_PATH, "wb") as f:
        pickle.dump({"vec": vec, "matrix": matrix, "ids": ids}, f)

def _kw_search(query: str, top_k: int) -> list[tuple[str, float]]:
    if not TFIDF_PATH.exists():
        return []
    try:
        with open(TFIDF_PATH, "rb") as f:
            d = pickle.load(f)
        q   = d["vec"].transform([query])
        s   = _cos_sim(q, d["matrix"]).flatten()
        idx = np.argsort(s)[::-1][:top_k]
        return [(d["ids"][i], float(s[i])) for i in idx if s[i] > 0]
    except Exception:
        return []

# ── RRF ───────────────────────────────────────────────────────────────────────

def _rrf(
    sem: list[tuple[str, float]],
    kw:  list[tuple[str, float]],
) -> list[tuple[str, float]]:
    scores: dict[str, float] = {}
    for rank, (cid, _) in enumerate(sem):
        scores[cid] = scores.get(cid, 0.0) + 1.0 / (RRF_K + rank + 1)
    for rank, (cid, _) in enumerate(kw):
        scores[cid] = scores.get(cid, 0.0) + 1.0 / (RRF_K + rank + 1)
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)

# ── CANON-PIN (attacco 07 P1.2) ───────────────────────────────────────────────
# _CANONE.md era la "verita' unica" solo per il lettore umano: nessun codice lo
# leggeva, e in RRF le note canoniche competevano alla pari con qualunque nota.
# Da qui in poi il canone PESA nel retrieval: bonus in selezione (equivale a un
# voto extra di primo rango) + slot riservato nel top-k finale (v. search()).

CANONE_PATH     = MENTE_DIR / "_CANONE.md"
CANON_RRF_BONUS = 1.0 / RRF_K
# marker che declassa un bullet del canone a STORICO: i suoi [[link]] NON pesano
# nel retrieval (es. le note V32 "su molle" con banner SUPERSEDED alla riga sotto).
_SUPERSEDED     = re.compile(r"superseded|snapshot storico", re.I)
_canon_cache: dict = {"mtime": None, "stems": frozenset()}


def _canon_stems() -> frozenset:
    """Stems (nome nota senza .md, lowercase) dei [[wikilink]] di _CANONE.md.
    Cache su mtime: si ricarica da solo quando il canone cambia."""
    try:
        mt = CANONE_PATH.stat().st_mtime
    except OSError:
        return frozenset()
    if _canon_cache["mtime"] != mt:
        stems = set()
        try:
            text = CANONE_PATH.read_text(encoding="utf-8", errors="replace")
        except OSError:
            return _canon_cache["stems"]
        # split per bullet (una riga-continuazione indentata resta nel suo bullet):
        # se il bullet e' marcato SUPERSEDED/storico, i suoi wikilink si saltano.
        for block in re.split(r"\n(?=[ \t]*[-*] )", text):
            if _SUPERSEDED.search(block):
                continue
            for m in _WIKILINK.finditer(block):
                stems.add(m.group(1).strip().replace("\\", "/").rsplit("/", 1)[-1].lower())
        _canon_cache["mtime"] = mt
        _canon_cache["stems"] = frozenset(stems)
        logger.debug("canon-pin: %d note canoniche da _CANONE.md", len(stems))
    return _canon_cache["stems"]


def _is_canon(source: str) -> bool:
    stem = source.replace("\\", "/").rsplit("/", 1)[-1]
    if stem.lower().endswith(".md"):
        stem = stem[:-3]
    return stem.lower() in _canon_stems()

# ── CROSSENCODER ──────────────────────────────────────────────────────────────

_ce = None

def _get_ce():
    global _ce
    if _ce is None:
        try:
            from sentence_transformers import CrossEncoder
            _ce = CrossEncoder(RERANKER_MODEL, device=DEVICE)
        except Exception:
            _ce = False
    return _ce if _ce is not False else None

def _rerank(query: str, cands: list[dict], top_k: int) -> list[dict]:
    ce = _get_ce()
    if not ce or len(cands) <= top_k:
        return cands[:top_k]
    scores = ce.predict([(query, c["text"]) for c in cands])
    for c, s in zip(cands, scores):
        c["_ce"] = float(s)
    return sorted(cands, key=lambda x: x["_ce"], reverse=True)[:top_k]

# ── INDEX BUILD ───────────────────────────────────────────────────────────────

def build_index(force: bool = False) -> int:
    manifest   = {"chunk_ver": CHUNK_VER, "files": {}} if force else _load_manifest()
    collection = _get_collection(reset=force)

    # Migrazione da v3: dati presenti ma nessun manifest → full rebuild
    if collection.count() > 0 and not force and not manifest["files"]:
        logger.info("Migrazione da v3 rilevata — full rebuild (una tantum)...")
        logger.info("Prima migrazione può richiedere 3-5 min. Le successive <20 sec.")
        manifest   = {"chunk_ver": CHUNK_VER, "files": {}}
        collection = _get_collection(reset=True)
        force      = True

    logger.info("%s — %s", "Full rebuild" if force else "Rebuild incrementale", MENTE_DIR)

    corpus     = {} if force else _load_corpus()
    prev_files = manifest.get("files", {})

    # Self-heal INVERSO (v4.3): il purge orfani sotto copre live-corpus, ma non il caso
    # opposto — chunk nel manifest/corpus che in ChromaDB non ci sono (scritture perse:
    # due indicizzatori concorrenti al boot, run interrotta tra upsert e save). Un file
    # con vettori mancanti viene tolto dal manifest -> il loop qui sotto lo ri-processa
    # in QUESTA run (mai cancellare dati buoni: gli id sono deterministici, il re-upsert
    # sovrascrive; eventuali code vecchie le pulisce il purge orfani a valle).
    if not force:
        try:
            live_now = set(collection.get(include=[]).get("ids", []))
            stale_rels = [rel for rel, e in prev_files.items()
                          if any(cid not in live_now for cid in e.get("chunk_ids", []))]
            for rel in stale_rels:
                for cid in prev_files[rel].get("chunk_ids", []):
                    corpus.pop(cid, None)
                prev_files.pop(rel)
            if stale_rels:
                logger.info("Self-heal inverso: %d file con vettori mancanti in ChromaDB -> ri-processo: %s",
                            len(stale_rels), ", ".join(stale_rels[:5]))
        except Exception as e:
            logger.warning("Self-heal inverso saltato: %s", e)

    new_files: dict = {}
    all_paths  = sorted(
        p for p in MENTE_DIR.rglob("*")
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXT
        and not _is_excluded(p) and not _is_nav_file(p)
    )

    added = modified = skipped = removed_chunks = 0
    batch_docs, batch_ids, batch_meta = [], [], []
    today = datetime.now().isoformat()[:10]

    def flush():
        if not batch_docs:
            return
        for i in range(0, len(batch_docs), 50):
            collection.upsert(
                documents=batch_docs[i:i+50],
                ids=batch_ids[i:i+50],
                metadatas=batch_meta[i:i+50],
            )
        logger.debug("+%d chunk upserted", len(batch_docs))
        batch_docs.clear(); batch_ids.clear(); batch_meta.clear()

    for path in all_paths:
        rel  = str(path.relative_to(MENTE_DIR))
        st   = path.stat()
        sig  = {"mtime": st.st_mtime, "size": st.st_size}
        prev = prev_files.get(rel)

        # Invariato → salta
        if prev and prev.get("mtime") == sig["mtime"] and prev.get("size") == sig["size"]:
            new_files[rel] = prev
            skipped += 1
            continue

        # Rimuovi chunk precedenti
        if prev and prev.get("chunk_ids"):
            try: collection.delete(ids=prev["chunk_ids"])
            except Exception: pass
            for cid in prev["chunk_ids"]:
                corpus.pop(cid, None)
            removed_chunks += len(prev["chunk_ids"])
            modified += 1
        else:
            added += 1

        # Ri-chunking (pulizia vault: via blocchi Collegati + commenti auto)
        text   = _clean_for_index(_read_file(path))
        chunks = _chunk_dispatch(text, _sid(rel), path.suffix.lower()) if text else []
        cids   = []
        for c in chunks:
            batch_docs.append(c["text"])
            batch_ids.append(c["id"])
            batch_meta.append({
                "source":  rel,
                "preview": c["text"][:300],
                "indexed": today,
            })
            corpus[c["id"]] = {"text": c["text"], "source": rel}
            cids.append(c["id"])
        new_files[rel] = {**sig, "chunk_ids": cids}

        if len(batch_docs) >= 200:
            flush()  # flush incrementale

    flush()  # flush finale

    # File eliminati
    for rel in set(prev_files) - {str(p.relative_to(MENTE_DIR)) for p in all_paths}:
        for cid in prev_files[rel].get("chunk_ids", []):
            try: collection.delete(ids=[cid])
            except Exception: pass
            corpus.pop(cid, None)
            removed_chunks += 1

    # Self-heal orfani: tieni il semantico allineato al corpus (== BM25) ad OGNI
    # incrementale, cosi' il drift manifest<->ChromaDB (file accorciato, processo
    # interrotto a meta', migrazioni) non si accumula piu' in silenzio finche' non
    # serve un force-rebuild manuale. Gli ID validi correnti sono TUTTI nel corpus
    # (ID derivati dal path, non dal contenuto), quindi purgare collection-corpus
    # non puo' mai cancellare un chunk buono. Invariante: collection.count()==len(corpus).
    if not force:
        try:
            live_ids = set(collection.get(include=[]).get("ids", []))
            orphans  = list(live_ids - set(corpus.keys()))
            for i in range(0, len(orphans), 500):
                collection.delete(ids=orphans[i:i+500])
            if orphans:
                removed_chunks += len(orphans)
                logger.info("Self-heal: purgati %d vettori orfani (semantico->corpus)", len(orphans))
        except Exception as e:
            logger.warning("Self-heal orfani saltato: %s", e)

    manifest["files"] = new_files
    _save_manifest(manifest)
    _save_corpus(corpus)

    total = collection.count()
    logger.info("Totale: %d chunk | +add:%d mod:%d skip:%d -del:%d",
                total, added, modified, skipped, removed_chunks)

    logger.info("Fit TF-IDF BM25 su %d chunk...", len(corpus))
    _fit_tfidf(corpus)
    # Linkgraph aggiornato nello stesso passaggio (cheap, no GPU): tiene il grafo
    # wikilink allineato al vault per la graph-expansion in query.
    try:
        build_linkgraph()
    except Exception as e:
        logger.warning("build_linkgraph saltato: %s", e)
    logger.info("Completo — semantico + BM25 + reranker + linkgraph pronti.")
    return total

# ── WIKILINK GRAPH (GraphRAG-lite) ─────────────────────────────────────────────

def build_linkgraph() -> dict:
    """Costruisce il grafo dei [[wikilink]] del vault — puro walk+regex, NIENTE GPU.
    Risoluzione Obsidian: il target di [[stem|alias]] è lo STEM del filename .md.

    Parsiamo TUTTI i link, inclusi quelli dei blocchi auto 'Collegati' (vault_intersect):
    NON sono ridondanti col semantico. vault_intersect li calcola con TF-IDF sull'INTERO
    documento, mentre il retrieval lavora sui CHUNK: un link A→B fa da ponte verso i chunk
    di B che il retrieval chunk-level ha mancato (recall complementare doc→chunk). Il cap
    GRAPH_EXPAND_MAX e il reranker a valle proteggono la precisione. Scrive
    rag_linkgraph.json. Disaccoppiato dall'embedding: si rigenera quando si vuole."""
    md_files = [
        p for p in MENTE_DIR.rglob("*.md")
        if p.is_file() and not _is_excluded(p) and not _is_nav_file(p)
    ]
    # stem(lower) → relpath (con os.sep, coerente con _sid usato nell'indice)
    stem2rel: dict[str, str] = {}
    for p in md_files:
        stem2rel[p.stem.lower()] = str(p.relative_to(MENTE_DIR))

    by_source: dict[str, list[str]] = {}
    edges = 0
    for p in md_files:
        rel  = str(p.relative_to(MENTE_DIR))
        text = _read_file(p)   # grezzo: include i [[wikilink]] dei blocchi Collegati
        targets = set()
        for raw in _WIKILINK.findall(text):
            tgt = stem2rel.get(raw.strip().lower())
            if tgt and tgt != rel:
                targets.add(tgt)
        if targets:
            by_source[rel] = sorted(targets)
            edges += len(targets)

    graph = {"built": datetime.now().isoformat(), "edges": edges, "by_source": by_source}
    try:
        LINKGRAPH_PATH.write_text(json.dumps(graph, ensure_ascii=False), encoding="utf-8")
    except Exception as e:
        logger.warning("linkgraph non salvato: %s", e)
    logger.info("Linkgraph: %d note con link, %d archi (vault completo, risolti)", len(by_source), edges)
    return graph

def _load_linkgraph() -> dict:
    if not LINKGRAPH_PATH.exists():
        return {}
    try:
        return json.loads(LINKGRAPH_PATH.read_text(encoding="utf-8")).get("by_source", {})
    except Exception:
        return {}

def _graph_expand(col, cands: list[dict], id_map: dict) -> list[dict]:
    """Aggiunge candidati dalle note linkate dai primi GRAPH_EXPAND_FROM risultati.
    Tira il primo chunk (__c0) di ogni nota linkata non già presente, cap a
    GRAPH_EXPAND_MAX. Il reranker a valle filtra i link irrilevanti."""
    lg = _load_linkgraph()
    if not lg or not cands:
        return []
    seen_src = {c["source"] for c in cands}
    linked: list[str] = []
    for c in cands[:GRAPH_EXPAND_FROM]:
        for tgt in lg.get(c["source"], []):
            if tgt not in seen_src and tgt not in linked:
                linked.append(tgt)
    if not linked:
        return []
    want_ids = [f"{_sid(rel)}__c0" for rel in linked[: GRAPH_EXPAND_MAX * 2]]
    try:
        got = col.get(ids=want_ids, include=["documents", "metadatas"])
    except Exception:
        return []
    added: list[dict] = []
    for cid, doc, m in zip(got.get("ids", []), got.get("documents", []), got.get("metadatas", [])):
        if cid in id_map or not doc:
            continue
        src = m.get("source", "?")
        id_map[cid] = {"text": doc, "source": src}
        added.append({"chunk_id": cid, "text": doc, "source": src, "rrf": 0.0, "_graph": True})
        if len(added) >= GRAPH_EXPAND_MAX:
            break
    if added:
        logger.debug("graph-expand: +%d candidati da %d note linkate", len(added), len(linked))
    return added


# ── SEARCH ────────────────────────────────────────────────────────────────────

def search(
    query:            str,
    top_k:            int  = TOP_K,
    rebuild:          bool = False,
    use_hybrid:       bool = True,
    use_reranker:     bool = True,
    use_graph_expand: bool = True,
) -> list[dict]:
    if rebuild:
        build_index(force=True)
    col = _get_collection()
    if col.count() == 0:
        build_index()
        col = _get_collection()

    fetch = min(FETCH_K, col.count())
    if fetch == 0:
        return []

    # 1 — Semantico (ChromaDB)
    sr  = col.query(
        query_texts=[query], n_results=fetch,
        include=["metadatas", "distances", "documents"],
    )
    sem = [(cid, round(1 - dist, 4))
           for cid, dist in zip(sr["ids"][0], sr["distances"][0])]
    id_map: dict[str, dict] = {
        cid: {"text": doc, "source": m.get("source", "?")}
        for cid, doc, m in zip(sr["ids"][0], sr["documents"][0], sr["metadatas"][0])
    }

    # 2 — Keyword BM25 (TF-IDF proxy)
    kw: list[tuple[str, float]] = _kw_search(query, fetch) if use_hybrid else []
    missing = [cid for cid, _ in kw if cid not in id_map]
    if missing:
        try:
            ex = col.get(ids=missing, include=["documents", "metadatas"])
            for cid, doc, m in zip(ex["ids"], ex["documents"], ex["metadatas"]):
                id_map[cid] = {"text": doc, "source": m.get("source", "?")}
        except Exception: pass

    # 3 — RRF merge
    merged = _rrf(sem, kw)

    # 3b — canon-pin: le note puntate da _CANONE.md pesano di piu' nella SELEZIONE
    # (un voto extra di primo rango). Il reranker resta giudice del merito.
    canon = _canon_stems()
    if canon:
        merged = sorted(
            ((cid, score + (CANON_RRF_BONUS
                            if cid in id_map and _is_canon(id_map[cid]["source"])
                            else 0.0))
             for cid, score in merged),
            key=lambda x: x[1], reverse=True,
        )

    # 4 — Candidati per reranker
    cands = [
        {"chunk_id": cid, **id_map[cid], "rrf": score,
         "canon": bool(canon) and _is_canon(id_map[cid]["source"])}
        for cid, score in merged[:FETCH_K]
        if cid in id_map
    ]

    # 4b — Graph-expansion (GraphRAG-lite): aggiunge candidati dalle note linkate
    # dai top risultati. Il reranker a valle filtra: i link irrilevanti non passano.
    if use_graph_expand:
        cands += _graph_expand(col, cands, id_map)

    # 5 — CrossEncoder rerank
    final = _rerank(query, cands, top_k) if use_reranker else cands[:top_k]

    # 5b — slot riservato canone: se tra i candidati c'era almeno una nota canonica
    # ma il top-k finale non ne contiene nessuna, la migliore entra al posto
    # dell'ultimo (il canone ha sempre voce quando e' in gara, mai sostituendo il 1o).
    # NB: flag ricalcolato dalla source (i candidati della graph-expansion non lo portano).
    if canon and final and not any(_is_canon(c["source"]) for c in final):
        best = max((c for c in cands if _is_canon(c["source"])),
                   key=lambda c: c.get("_ce", c["rrf"]), default=None)
        if best is not None:
            final = final[:-1] + [best]

    return [
        {
            "source":  c["source"],
            "preview": c["text"][:300],
            "score":   round(c.get("_ce", c["rrf"]), 4),
            "canon":   bool(canon) and _is_canon(c["source"]),
        }
        for c in final
    ]

def search_and_format(query: str, top_k: int = TOP_K) -> str:
    results = search(query, top_k)
    if not results:
        return f"Nessun risultato per: '{query}'"
    lines = [f"## RAG v4 — '{query}'\n"]
    for i, r in enumerate(results, 1):
        lines.append(f"**{i}. {r['source']}** (score: {r['score']})\n{r['preview']}\n")
    return "\n".join(lines)

def get_index_stats() -> dict:
    try:
        col    = _get_collection()
        chunks = col.count()
    except Exception:
        chunks = 0
    try:
        with open(TFIDF_PATH, "rb") as f:
            d = pickle.load(f)
        bm25_n = len(d.get("ids", []))
    except Exception:
        bm25_n = 0
    m = _load_manifest()
    lg = _load_linkgraph()
    return {
        "chunks":        chunks,
        "bm25_chunks":   bm25_n,
        "files_indexed": len(m.get("files", {})),
        "chunk_config":  f"size={CHUNK_SIZE} stride={CHUNK_STRIDE} [{CHUNK_VER}] | {CHUNK_ALGO}",
        "snapshots":     len(_list_snapshots()),
        "linkgraph_notes": len(lg),
        "model":         EMBED_MODEL,
        "reranker":      RERANKER_MODEL,
        "engine":        "ChromaDB + TF-IDF RRF + CrossEncoder + GraphRAG-lite (v4.2)",
    }

# ── RECOVERY a 2 LIVELLI (post-crash/blackout) ─────────────────────────────────
# ChromaDB e' un motore embedded, non crash-durable: su power-loss l'indice HNSW
# resta inconsistente con SQLite -> crash NATIVO (SIGSEGV) in lettura query. Noi
# teniamo il corpus a parte (rag_corpus.jsonl) quindi possiamo SEMPRE ricostruire.
#   L1 (chirurgico): sposta SOLO il segmento HNSW; Chroma lo ricostruisce dagli
#       embedding gia' in chroma.sqlite3 -> niente ri-embedding (secondi/minuti).
#   L2 (nucleare):   build_index(force=True), ri-embedda tutto dal corpus MENTE.
# L'orchestratore (SERVICES/rag_recover.ps1) sonda con --probe in SUBPROCESS perche'
# un SIGSEGV non e' catturabile in-process: lo vede solo come exit-code != 0.

def _vector_segment_dirs() -> list[Path]:
    """Cartelle UUID del segmento HNSW (scope VECTOR) presenti in CHROMA_DIR.
    Sono i binari dell'indice che si corrompono su crash; NON contengono gli
    embedding (quelli stanno in chroma.sqlite3)."""
    db = CHROMA_DIR / "chroma.sqlite3"
    if not db.exists():
        return []
    import sqlite3
    dirs: list[Path] = []
    try:
        con = sqlite3.connect(str(db))
        rows = con.execute("select id from segments where scope='VECTOR'").fetchall()
        con.close()
        for (sid,) in rows:
            d = CHROMA_DIR / str(sid)
            if d.is_dir():
                dirs.append(d)
    except Exception as e:
        logger.warning("segment query fallita: %s", e)
    return dirs


def drop_hnsw_index() -> int:
    """RECOVERY L1 (chirurgico): sposta da parte SOLO il segmento HNSW corrotto.
    Additivo (rinomina, non cancella). Procedura ufficiale Chroma: al prossimo
    open il motore ricostruisce l'HNSW dagli embedding in chroma.sqlite3."""
    moved = 0
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    for d in _vector_segment_dirs():
        try:
            d.rename(d.with_name(f"{d.name}.hnsw_corrupt_{ts}"))
            logger.info("L1: segmento HNSW spostato -> %s.hnsw_corrupt_%s", d.name, ts)
            moved += 1
        except Exception as e:
            logger.warning("L1: non spostato %s: %s", d.name, e)
    return moved


def reset_chroma_dir() -> str:
    """RESET FISICO: sposta da parte l'INTERA cartella chroma_db (additivo, non
    cancella). Serve perche' su chromadb 0.5.23 il reset-per-id NON azzera lo
    spazio-label di hnswlib: dopo molti delete/re-add restano label fantasma con
    indice > count -> 'KeyError np.uint64(N)' su alcune query. Solo ripartendo da
    una cartella VUOTA l'HNSW rinumera da 0 e l'indice torna pulito. Ritorna il
    nome del backup, o '' se non c'era nulla da spostare."""
    if not CHROMA_DIR.exists():
        return ""
    bak = CHROMA_DIR.with_name(f"chroma_db_reset_{datetime.now():%Y%m%d_%H%M%S}")
    CHROMA_DIR.rename(bak)
    logger.info("RESET FISICO: chroma_db -> %s", bak.name)
    return bak.name


# ── SNAPSHOT / RESTORE (_VAULT/BACKUPS) ────────────────────────────────────────
# Il recovery L1/L2 sopra ricostruisce SEMPRE dal corpus, ma L2 ri-embedda 32k
# chunk (minuti, serve la GPU). Uno snapshot della cartella chroma_db permette un
# restore ISTANTANEO (copia di file) di un indice noto-buono. Vive in _VAULT/BACKUPS
# (fuori dal git, regola 8). La notte ne scatta uno dopo l'incrementale riuscito.

def _list_snapshots() -> list[Path]:
    if not SNAPSHOT_DIR.exists():
        return []
    return sorted(
        p for p in SNAPSHOT_DIR.glob("chroma_db_*")
        if p.is_dir() and not p.name.endswith(".tmp")
    )

def snapshot_chroma(keep: int = SNAPSHOT_KEEP) -> str:
    """Copia chroma_db in _VAULT/BACKUPS/rag_snapshots/chroma_db_<ts> (atomico via
    .tmp+rename). Ruota tenendo gli ultimi `keep`. Ritorna il path, o '' se non
    c'è nulla da salvare. Da chiamare a indice SANO (es. dopo l'incrementale)."""
    import shutil
    if not (CHROMA_DIR / "chroma.sqlite3").exists():
        return ""
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    dst = SNAPSHOT_DIR / f"chroma_db_{datetime.now():%Y%m%d_%H%M%S}"
    tmp = dst.with_name(dst.name + ".tmp")
    if tmp.exists():
        shutil.rmtree(tmp, ignore_errors=True)
    shutil.copytree(CHROMA_DIR, tmp)
    tmp.rename(dst)
    for old in (_list_snapshots()[:-keep] if keep > 0 else []):
        shutil.rmtree(old, ignore_errors=True)
        logger.info("Snapshot ruotato via: %s", old.name)
    logger.info("Snapshot chroma_db -> %s (tengo ultimi %d)", dst.name, keep)
    return str(dst)

def restore_latest_snapshot() -> str:
    """RESTORE ISTANTANEO: rimpiazza chroma_db con l'ultimo snapshot (la cartella
    corrente viene messa da parte, additivo). Ritorna il nome dello snapshot usato,
    o '' se non ce ne sono. Alternativa veloce a L2 quando l'indice è corrotto ma
    esiste un backup recente noto-buono."""
    import shutil
    snaps = _list_snapshots()
    if not snaps:
        return ""
    src = snaps[-1]
    if CHROMA_DIR.exists():
        CHROMA_DIR.rename(CHROMA_DIR.with_name(f"chroma_db_prerestore_{datetime.now():%Y%m%d_%H%M%S}"))
    shutil.copytree(src, CHROMA_DIR)
    logger.info("Restore snapshot %s -> chroma_db", src.name)
    return src.name


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser(
        description="MENTE RAG v4 — Hybrid BM25 + Semantic + CrossEncoder"
    )
    p.add_argument("query",          nargs="?",           help="Query da cercare")
    p.add_argument("--rebuild",      action="store_true", help="Full rebuild (reset indice)")
    p.add_argument("--incremental",  action="store_true", help="Rebuild incrementale (default)")
    p.add_argument("--stats",        action="store_true", help="Statistiche indice")
    p.add_argument("--top",          type=int, default=TOP_K)
    p.add_argument("--no-reranker",  action="store_true", help="Disabilita CrossEncoder")
    p.add_argument("--no-hybrid",    action="store_true", help="Solo ricerca semantica")
    p.add_argument("--no-graph",     action="store_true", help="Disabilita la graph-expansion wikilink")
    p.add_argument("--linkgraph",    action="store_true", help="(Ri)costruisci SOLO il grafo wikilink rag_linkgraph.json (no GPU)")
    p.add_argument("--probe",        action="store_true", help="Query minima di salute (exit!=0 se l'indice crasha) — per orchestratore")
    p.add_argument("--drop-hnsw",    action="store_true", help="Recovery L1: sposta il segmento HNSW corrotto (Chroma lo ricostruisce da sqlite, no ri-embed)")
    p.add_argument("--rebuild-hard", action="store_true", help="Rebuild con RESET FISICO della cartella chroma_db (HNSW rinumera da 0: cura 'KeyError np.uint64' post delete massivi)")
    p.add_argument("--snapshot",     action="store_true", help="Copia known-good di chroma_db in _VAULT/BACKUPS (rotazione ultimi 3)")
    p.add_argument("--restore-snapshot", action="store_true", help="Restore istantaneo dall'ultimo snapshot in _VAULT/BACKUPS (no ri-embed)")
    args = p.parse_args()

    if args.probe:
        # Pensato per girare in subprocess: un HNSW corrotto fa SIGSEGV qui ->
        # exit-code != 0 visibile all'orchestratore. Se sano stampa PROBE_OK.
        try:
            r = search("probe", top_k=1, use_hybrid=False, use_reranker=False, use_graph_expand=False)
            print(f"PROBE_OK results={len(r)}")
        except Exception as e:
            print(f"PROBE_FAIL {e}")
            sys.exit(2)
    elif args.linkgraph:
        g = build_linkgraph()
        print(json.dumps({"notes": len(g.get("by_source", {})), "edges": g.get("edges", 0)}, ensure_ascii=False))
    elif args.drop_hnsw:
        print(json.dumps({"hnsw_dirs_moved": drop_hnsw_index()}, ensure_ascii=False))
    elif args.snapshot:
        path = snapshot_chroma()
        print(json.dumps({"snapshot": path or "(niente da salvare)", "totale": len(_list_snapshots())}, ensure_ascii=False))
    elif args.restore_snapshot:
        name = restore_latest_snapshot()
        print(json.dumps({"restored": name or "(nessuno snapshot)"}, ensure_ascii=False))
    elif args.rebuild_hard:
        bak = reset_chroma_dir()
        print(f"reset fisico chroma_db: {bak or '(vuoto)'}")
        build_index(force=True)
        print(json.dumps(get_index_stats(), indent=2, ensure_ascii=False))
    elif args.stats:
        print(json.dumps(get_index_stats(), indent=2, ensure_ascii=False))
    elif args.rebuild:
        build_index(force=True)
        print(json.dumps(get_index_stats(), indent=2, ensure_ascii=False))
    elif args.incremental or (not args.query and not args.stats):
        build_index(force=False)
        print(json.dumps(get_index_stats(), indent=2, ensure_ascii=False))
    if args.query:
        results = search(
            args.query,
            top_k=args.top,
            use_hybrid=not args.no_hybrid,
            use_reranker=not args.no_reranker,
            use_graph_expand=not args.no_graph,
        )
        if not results:
            print(f"Nessun risultato per: '{args.query}'")
        else:
            print(f"\n## RAG v4 — '{args.query}'\n")
            for i, r in enumerate(results, 1):
                print(f"{i}. [{r['source']}] score={r['score']}")
                print(f"   {r['preview'][:200]}\n")
