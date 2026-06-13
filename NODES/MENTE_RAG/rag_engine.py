# rag_engine.py | TITANIUM_OS / NODES / MENTE_RAG | v4.0 | 2026-05-28
# RAG ibrido: ChromaDB semantico + TF-IDF BM25 keyword + CrossEncoder reranker
# Rebuild incrementale via manifest (mtime+size) — solo file nuovi/modificati
# Pattern: Hybrid RRF + two-stage retrieval (2024-2025 state-of-art)

import os, sys, re, json, pickle, logging, hashlib
from datetime import datetime
from pathlib import Path

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("rag_engine")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [rag_engine] %(levelname)s %(message)s")
    logger = logging.getLogger("rag_engine")

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
RERANKER_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"

CHUNK_SIZE     = 512    # chars (~100 token) — ottimale per Q&A tecnico
CHUNK_STRIDE   = 200    # 61% overlap — bilancia contesto e precisione
CHUNK_VER      = f"v{CHUNK_SIZE}s{CHUNK_STRIDE}"
TOP_K          = 5
FETCH_K        = TOP_K * 3   # candidati pre-rerank
RRF_K          = 60
SUPPORTED_EXT  = {".md", ".txt", ".py", ".json"}

# CANONE vs RICERCA (Punto 4a): la ricerca web atterra in KNOWLEDGE/RESEARCH ma
# NON entra nel RAG canonico — eviterebbe il garbage-in (paper irrilevanti che
# diluiscono il segnale delle decisioni V32/MIMS). Resta su file, consultabile;
# il digest notturno la sintetizza separatamente. Path relativi a MENTE_DIR.
EXCLUDE_REL_DIRS = (os.path.join("KNOWLEDGE", "RESEARCH"),)


def _is_excluded(path: Path) -> bool:
    """True se il file vive in una cartella esclusa dal canone (es. RICERCA web)."""
    rel = str(path.relative_to(MENTE_DIR))
    return any(rel == d or rel.startswith(d + os.sep) for d in EXCLUDE_REL_DIRS)


# ── CHROMA ────────────────────────────────────────────────────────────────────

def _get_collection(reset: bool = False):
    embed_fn = SentenceTransformerEmbeddingFunction(model_name=EMBED_MODEL)
    client   = chromadb.PersistentClient(path=str(CHROMA_DIR))
    if reset:
        try: client.delete_collection(COLLECTION)
        except Exception: pass
    return client.get_or_create_collection(
        name=COLLECTION,
        embedding_function=embed_fn,
        metadata={"hnsw:space": "cosine"},
    )

# ── TEXT ──────────────────────────────────────────────────────────────────────

def _read_file(path: Path) -> str:
    try: return path.read_text(encoding="utf-8", errors="replace")
    except Exception: return ""

def _chunk(text: str, sid: str) -> list[dict]:
    chunks, start, idx = [], 0, 0
    while start < len(text):
        content = text[start:start + CHUNK_SIZE].strip()
        if len(content) > 40:
            chunks.append({"id": f"{sid}__c{idx}", "text": content})
            idx += 1
        start += CHUNK_STRIDE
    return chunks

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

# ── CROSSENCODER ──────────────────────────────────────────────────────────────

_ce = None

def _get_ce():
    global _ce
    if _ce is None:
        try:
            from sentence_transformers import CrossEncoder
            _ce = CrossEncoder(RERANKER_MODEL)
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
    new_files: dict = {}
    all_paths  = sorted(
        p for p in MENTE_DIR.rglob("*")
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXT
        and not _is_excluded(p)
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

        # Ri-chunking
        text   = _read_file(path)
        chunks = _chunk(text, _sid(rel)) if text else []
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

    manifest["files"] = new_files
    _save_manifest(manifest)
    _save_corpus(corpus)

    total = collection.count()
    logger.info("Totale: %d chunk | +add:%d mod:%d skip:%d -del:%d",
                total, added, modified, skipped, removed_chunks)

    logger.info("Fit TF-IDF BM25 su %d chunk...", len(corpus))
    _fit_tfidf(corpus)
    logger.info("Completo — semantico + BM25 + reranker pronti.")
    return total

# ── SEARCH ────────────────────────────────────────────────────────────────────

def search(
    query:        str,
    top_k:        int  = TOP_K,
    rebuild:      bool = False,
    use_hybrid:   bool = True,
    use_reranker: bool = True,
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

    # 4 — Candidati per reranker
    cands = [
        {"chunk_id": cid, **id_map[cid], "rrf": score}
        for cid, score in merged[:FETCH_K]
        if cid in id_map
    ]

    # 5 — CrossEncoder rerank
    final = _rerank(query, cands, top_k) if use_reranker else cands[:top_k]

    return [
        {
            "source":  c["source"],
            "preview": c["text"][:300],
            "score":   round(c.get("_ce", c["rrf"]), 4),
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
    return {
        "chunks":        chunks,
        "bm25_chunks":   bm25_n,
        "files_indexed": len(m.get("files", {})),
        "chunk_config":  f"size={CHUNK_SIZE} stride={CHUNK_STRIDE}",
        "model":         EMBED_MODEL,
        "reranker":      RERANKER_MODEL,
        "engine":        "ChromaDB + TF-IDF RRF + CrossEncoder (v4.0)",
    }

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
    args = p.parse_args()

    if args.stats:
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
        )
        if not results:
            print(f"Nessun risultato per: '{args.query}'")
        else:
            print(f"\n## RAG v4 — '{args.query}'\n")
            for i, r in enumerate(results, 1):
                print(f"{i}. [{r['source']}] score={r['score']}")
                print(f"   {r['preview'][:200]}\n")
