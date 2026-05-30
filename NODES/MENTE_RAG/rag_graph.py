# rag_graph.py | TITANIUM_OS / NODES / MENTE_RAG | v1.0 | 2026-05-30
# RAG graph-aware: relazioni tra documenti MENTE/ via networkx
# Pattern: co-citazione + keyword overlap + catena V32→VULCAN→MIMS
# Estende RAG v4 — non lo sostituisce. Usa search_graph() al posto di search()

import os
import sys
import json
import pickle
import logging
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("rag_graph")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [rag_graph] %(levelname)s %(message)s")
    logger = logging.getLogger("rag_graph")

import networkx as nx

_HERE       = Path(__file__).resolve().parent
GRAPH_PATH  = _HERE / "rag_graph.pkl"
CORPUS_PATH = _HERE / "rag_corpus.jsonl"

# Relazioni hardcoded del dominio (catene note)
DOMAIN_EDGES = [
    ("V32/",        "MIMS/",        "precondition", 1.0),
    ("V32/",        "OFFICINA/",    "uses",         0.8),
    ("MIMS/",       "VITA_NATURA/", "product",      0.9),
    ("GENESIS/",    "V32/",         "monitors",     0.7),
    ("GENESIS/",    "MIMS/",        "monitors",     0.7),
    ("KNOWLEDGE/",  "V32/",         "informs",      0.6),
    ("KNOWLEDGE/",  "GENESIS/",     "informs",      0.6),
    ("SESSIONI/",   "V32/",         "documents",    0.5),
    ("SESSIONI/",   "GENESIS/",     "documents",    0.5),
]

# Tag/keyword che indicano relazione forte tra documenti
RELATION_KEYWORDS = {
    "V32":      ["v32", "cnc", "fresatrice", "epoxy", "gusset", "colonna", "guida"],
    "MIMS":     ["mims", "stampo", "iniezione", "tile", "polimero", "vulcan"],
    "GENESIS":  ["genesis", "rag", "chromadb", "dashboard", "agente", "mcp"],
    "OFFICINA": ["saldatura", "tig", "titanio", "mandrino", "utensile"],
}


def _load_corpus() -> list[dict]:
    out = []
    if not CORPUS_PATH.exists():
        return out
    with open(CORPUS_PATH, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                out.append(json.loads(line.strip()))
            except Exception:
                pass
    return out


def _source_folder(source: str) -> str:
    """Estrae la cartella di primo livello da un path relativo MENTE/."""
    parts = Path(source).parts
    return parts[0] + "/" if parts else source


def _keyword_overlap(text_a: str, text_b: str, keywords: list[str]) -> float:
    ta, tb = text_a.lower(), text_b.lower()
    hits = sum(1 for k in keywords if k in ta and k in tb)
    return min(hits / max(len(keywords), 1), 1.0)


def build_graph(force: bool = False) -> nx.DiGraph:
    """Costruisce il grafo di relazioni tra documenti MENTE/."""
    if not force and GRAPH_PATH.exists():
        try:
            with open(GRAPH_PATH, "rb") as f:
                G = pickle.load(f)
            logger.info("Grafo caricato: %d nodi, %d archi", G.number_of_nodes(), G.number_of_edges())
            return G
        except Exception:
            pass

    logger.info("Build grafo relazioni MENTE/...")
    G = nx.DiGraph()
    corpus = _load_corpus()

    # Raggruppa chunk per sorgente
    docs: dict[str, list[str]] = defaultdict(list)
    for item in corpus:
        docs[item.get("source", "unknown")].append(item.get("text", ""))

    # Nodi = documenti
    for src in docs:
        folder = _source_folder(src)
        G.add_node(src, folder=folder, chunk_count=len(docs[src]))

    # Archi da relazioni di dominio (folder-level)
    sources = list(docs.keys())
    for src in sources:
        folder_src = _source_folder(src)
        for (f_a, f_b, rel_type, weight) in DOMAIN_EDGES:
            if folder_src.startswith(f_a):
                for tgt in sources:
                    if tgt != src and _source_folder(tgt).startswith(f_b):
                        G.add_edge(src, tgt, type=rel_type, weight=weight)

    # Archi da overlap keyword tra documenti dello stesso dominio
    for domain, keywords in RELATION_KEYWORDS.items():
        domain_docs = [s for s in sources if domain.lower() in s.lower()]
        for i, a in enumerate(domain_docs):
            text_a = " ".join(docs[a][:3])  # prime 3 chunk
            for b in domain_docs[i+1:]:
                text_b = " ".join(docs[b][:3])
                overlap = _keyword_overlap(text_a, text_b, keywords)
                if overlap > 0.3:
                    G.add_edge(a, b, type="keyword_overlap", weight=overlap)
                    G.add_edge(b, a, type="keyword_overlap", weight=overlap)

    with open(GRAPH_PATH, "wb") as f:
        pickle.dump(G, f)

    logger.info("Grafo costruito: %d nodi, %d archi", G.number_of_nodes(), G.number_of_edges())
    return G


def expand_with_graph(results: list[dict], top_k: int = 3) -> list[dict]:
    """
    Espande i risultati RAG con documenti correlati via grafo.
    Aggiunge al massimo top_k documenti correlati non già presenti.
    """
    try:
        G = build_graph()
    except Exception as e:
        logger.warning("Graph expand fallito: %s", e)
        return results

    present = {r["source"] for r in results}
    candidates: dict[str, float] = {}

    for r in results:
        src = r["source"]
        if src not in G:
            continue
        for neighbor in G.successors(src):
            if neighbor not in present:
                w = G[src][neighbor].get("weight", 0.5)
                candidates[neighbor] = max(candidates.get(neighbor, 0.0), w * r["score"])

    ranked = sorted(candidates.items(), key=lambda x: x[1], reverse=True)[:top_k]
    corpus = _load_corpus()
    corpus_map = {c["id"]: c for c in corpus}

    for src, score in ranked:
        # Prendi il chunk più rappresentativo del documento correlato
        chunks = [c for c in corpus if c.get("source") == src]
        if chunks:
            results.append({
                "source":   src,
                "preview":  chunks[0]["text"][:300],
                "score":    round(score, 4),
                "via_graph": True,
            })

    return results


def search_graph(query: str, top_k: int = 5) -> str:
    """
    Ricerca RAG v4 + espansione grafo relazioni.
    Drop-in replacement di search_and_format().
    """
    from NODES.MENTE_RAG.rag_engine import search
    results = search(query, top_k=top_k)
    results = expand_with_graph(results, top_k=2)

    if not results:
        return f"Nessun risultato per: '{query}'"

    lines = [f"## RAG v5 (graph-aware) — '{query}'\n"]
    for i, r in enumerate(results, 1):
        tag = " *(via grafo)*" if r.get("via_graph") else ""
        lines.append(f"**{i}. {r['source']}** (score: {r['score']}){tag}\n{r['preview']}\n")
    return "\n".join(lines)


def get_graph_stats() -> dict:
    G = build_graph()
    return {
        "nodes":        G.number_of_nodes(),
        "edges":        G.number_of_edges(),
        "domain_edges": len(DOMAIN_EDGES),
        "top_hubs":     sorted(G.degree(), key=lambda x: x[1], reverse=True)[:5],
    }


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser(description="RAG graph-aware v5")
    p.add_argument("query",  nargs="?", help="Query")
    p.add_argument("--build", action="store_true", help="Forza rebuild grafo")
    p.add_argument("--stats", action="store_true", help="Statistiche grafo")
    args = p.parse_args()

    if args.build or not GRAPH_PATH.exists():
        build_graph(force=True)
    if args.stats:
        print(json.dumps(get_graph_stats(), indent=2, ensure_ascii=False))
    if args.query:
        print(search_graph(args.query))
