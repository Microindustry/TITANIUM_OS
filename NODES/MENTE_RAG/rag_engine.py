# rag_engine.py | TITANIUM_OS / NODES / MENTE_RAG | v3.0 | 2026-05-27
# RAG su MICROINDUSTRY/MENTE/ — ChromaDB PersistentClient + SentenceTransformer
# Modello: paraphrase-multilingual-MiniLM-L12-v2 (384-dim, offline, IT/EN/DE/FR)

import os
import sys
import re
import json
from datetime import datetime
from pathlib import Path

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

# ── CONFIG ──────────────────────────────────────────────────────────────
MENTE_DIR    = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
CHROMA_DIR   = Path(__file__).resolve().parent / "chroma_db"
COLLECTION   = "mente"
EMBED_MODEL  = "paraphrase-multilingual-MiniLM-L12-v2"

CHUNK_SIZE    = 800
CHUNK_STRIDE  = 400
TOP_K         = 5
SUPPORTED_EXT = {".md", ".txt", ".py", ".json"}

# ── CHROMA CLIENT ────────────────────────────────────────────────────────

def _get_collection(reset: bool = False) -> chromadb.Collection:
    embed_fn = SentenceTransformerEmbeddingFunction(model_name=EMBED_MODEL)
    client   = chromadb.PersistentClient(path=str(CHROMA_DIR))
    if reset:
        try:
            client.delete_collection(COLLECTION)
        except Exception:
            pass
    return client.get_or_create_collection(
        name=COLLECTION,
        embedding_function=embed_fn,
        metadata={"hnsw:space": "cosine"},
    )

# ── TEXT UTILITIES ───────────────────────────────────────────────────────

def _extract_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""

def _chunk(text: str, source_id: str) -> list[dict]:
    chunks, start, idx = [], 0, 0
    while start < len(text):
        content = text[start:start + CHUNK_SIZE].strip()
        if len(content) > 50:
            chunks.append({
                "id":      f"{source_id}__c{idx}",
                "text":    content,
                "preview": content[:300],
            })
            idx += 1
        start += CHUNK_STRIDE
    return chunks

# ── INDEX BUILD ──────────────────────────────────────────────────────────

def build_index(force: bool = False) -> int:
    collection = _get_collection(reset=force)
    if collection.count() > 0 and not force:
        print(f"[RAG] Index presente: {collection.count()} chunk. Usa --rebuild per aggiornare.")
        return collection.count()

    print(f"[RAG] Indicizzazione: {MENTE_DIR}")
    docs, ids, meta = [], [], []
    seen: set[str] = set()

    for path in MENTE_DIR.rglob("*"):
        if path.suffix.lower() not in SUPPORTED_EXT:
            continue
        text = _extract_text(path)
        if not text:
            continue
        rel = str(path.relative_to(MENTE_DIR))
        sid = re.sub(r"[^a-zA-Z0-9_\-]", "_", rel)
        for chunk in _chunk(text, sid):
            if chunk["id"] in seen:
                continue
            seen.add(chunk["id"])
            docs.append(chunk["text"])
            ids.append(chunk["id"])
            meta.append({
                "source":  rel,
                "preview": chunk["preview"],
                "indexed": datetime.now().isoformat()[:10],
            })

    if not docs:
        print("[RAG] Nessun documento trovato in MENTE.")
        return 0

    batch = 50
    for i in range(0, len(docs), batch):
        collection.upsert(
            documents=docs[i:i+batch],
            ids=ids[i:i+batch],
            metadatas=meta[i:i+batch],
        )
        print(f"  [{i+len(docs[i:i+batch])}/{len(docs)}] chunk indicizzati...")

    total = collection.count()
    print(f"[RAG] Index completo: {total} chunk | modello: {EMBED_MODEL}")
    return total

# ── SEARCH ──────────────────────────────────────────────────────────────

def search(query: str, top_k: int = TOP_K, rebuild: bool = False) -> list[dict]:
    if rebuild:
        build_index(force=True)
    collection = _get_collection()
    if collection.count() == 0:
        build_index()
    n = min(top_k, collection.count())
    if n == 0:
        return []
    results = collection.query(
        query_texts=[query],
        n_results=n,
        include=["metadatas", "distances", "documents"],
    )
    output = []
    for doc, m, dist in zip(
        results.get("documents", [[]])[0],
        results.get("metadatas", [[]])[0],
        results.get("distances", [[]])[0],
    ):
        output.append({
            "source":  m.get("source", "?"),
            "preview": doc[:300],
            "score":   round(1 - dist, 4),
        })
    return output

def search_and_format(query: str, top_k: int = TOP_K) -> str:
    results = search(query, top_k)
    if not results:
        return f"Nessun risultato per: '{query}'"
    lines = [f"## RAG — '{query}'\n"]
    for i, r in enumerate(results, 1):
        lines.append(f"**{i}. {r['source']}** (similarity: {r['score']})\n{r['preview']}\n")
    return "\n".join(lines)

def get_index_stats() -> dict:
    try:
        col = _get_collection()
        return {
            "chunks":     col.count(),
            "chroma_dir": str(CHROMA_DIR),
            "mente_dir":  str(MENTE_DIR),
            "model":      EMBED_MODEL,
            "engine":     "ChromaDB + SentenceTransformer",
        }
    except Exception as e:
        return {"error": str(e)}

# ── CLI ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="MENTE RAG — ChromaDB + SentenceTransformer")
    parser.add_argument("query",     nargs="?",           help="Query da cercare")
    parser.add_argument("--rebuild", action="store_true", help="Forza rebuild index")
    parser.add_argument("--stats",   action="store_true", help="Mostra stats index")
    parser.add_argument("--top",     type=int, default=TOP_K)
    args = parser.parse_args()

    if args.stats:
        print(json.dumps(get_index_stats(), indent=2, ensure_ascii=False))
    elif args.rebuild or not args.query:
        build_index(force=True)
        print(json.dumps(get_index_stats(), indent=2, ensure_ascii=False))
    if args.query:
        print(search_and_format(args.query, args.top))
