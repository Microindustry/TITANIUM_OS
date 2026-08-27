# genesis_seed.py | TITANIUM_OS / CORE / GENESIS | v1.0 | 2026-08-16
# S2 della scala GENESIS: popola il db con i dipartimenti e gli agenti REALI.
#
# IDEMPOTENTE: ogni riga e' un UPSERT su chiave stabile. Rieseguibile quante volte
# vuoi, non duplica e non cancella il lavoro fatto a mano (i campi non gestiti qui
# restano come sono). E' pensato per essere rilanciato dopo ogni modifica allo schema.
#
# STATE.json NON viene toccato ne' importato: e' handoff di CONTESTO (il racconto per
# la sessione dopo), non stato strutturato. Le due cose restano separate — deciso in
# BRAIN/SCALA-GENESIS.md, gradino S2.
#
# NB ONESTA': i 6 dipartimenti sono quelli decisi da Matteo. Gli agenti di CONTENUTO
# (Nina, story_agent, caroselli) e di SISTEMA (audit, research, RAG) non hanno una casa
# naturale tra i 6 — GENESIS non e' un dipartimento nella lista. Qui stanno sotto
# OFFICINA come "la bottega che costruisce il sistema". Se e' sbagliato, la correzione
# e' una riga in DEPARTMENTS + il campo department_id degli agenti: DECISIONE DI MATTEO.
#
#   python CORE/genesis_seed.py           esegue il seed (idempotente)
#   python CORE/genesis_seed.py --albero  stampa l'albero con una query ricorsiva

from __future__ import annotations

import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from CORE.genesis_db import connect, init  # noqa: E402
from CORE import repos  # noqa: E402  — S3: la SQL sta li', non qui

NOW = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# (id, name, slug, tagline, color, ord)
DEPARTMENTS = [
    ("dep_v32",     "V32",         "v32",        "la CNC in epoxy-granite",              "#7dd3fc", 1),
    ("dep_mims",    "MIMS",        "mims",       "i connettori modulari (Via B VULCAN)", "#fbbf24", 2),
    ("dep_vita",    "VITA-NATURA", "vita-natura", "il centro estetico",                  "#86efac", 3),
    ("dep_fitpark", "FIT-PARK",    "fit-park",   "",                                     "#c4b5fd", 4),
    ("dep_finanze", "FINANZE",     "finanze",    "BEP, ROI, fornitori",                  "#f9a8d4", 5),
    ("dep_officina", "OFFICINA",   "officina",   "attrezzatura, banco, e il sistema che costruisce il sistema", "#fca5a5", 6),
]

# (id, department_id, parent_id, name, role, tier, status, description, model, entrypoint)
AGENTS = [
    # ── i tre nomi ──────────────────────────────────────────────────────────────
    ("ag_themis", "dep_officina", None, "THEMIS", "Esecuzione tecnica, codifica, analisi",
     "lead", "active", "Il coordinatore tecnico: sotto di lui gira tutto cio' che lavora di notte.",
     "claude-sonnet-4-6", ""),
    ("ag_ava", "dep_officina", None, "AVA", "Video, script, reel",
     "lead", "planned", "Avatar YouTube e script. Non ancora costruita.", "", ""),
    ("ag_eva", "dep_vita", None, "EVA", "WhatsApp e prenotazioni Vita Natura",
     "lead", "building", "Pilot v0.3 reale: gira offline in dry-run.", "", "NODES/EVA/eva_server.py"),

    # ── i worker che esistono DAVVERO e girano di notte (sotto THEMIS) ──────────
    ("ag_nina", "dep_officina", "ag_themis", "NINA_AGENT", "Genera gli episodi di Nina",
     "specialist", "active", "2 stadi: Architetto (haiku, grounding RAG) + Scrittore (sonnet).",
     "claude-haiku-4-5 + claude-sonnet-4-6", "NODES/NINA_AGENT/nina_rag_loop.py"),
    ("ag_story", "dep_officina", "ag_themis", "STORY_AGENT", "Episodi di Sistema dai commit",
     "specialist", "active", "Trasforma i commit recenti in episodi S2_SISTEMA.",
     "claude-sonnet-4-6", "NODES/STORY_AGENT/run_story_agent.bat"),
    ("ag_audit", "dep_officina", "ag_themis", "AUDIT_AGENT", "La cartella clinica notturna",
     "specialist", "active", "Legge i log, gli organi vivi e il canone; scrive le critiche.",
     "claude-sonnet-4-6", "NODES/AUDIT_AGENT/night_audit.py"),
    ("ag_research", "dep_officina", "ag_themis", "RESEARCH_AGENT", "Ricerca paper notturna",
     "specialist", "active", "Cerca sui topic V32/MIMS/GENESIS e indicizza nel RAG.",
     "", "NODES/RESEARCH_AGENT/research_agent.py"),
    ("ag_rag", "dep_officina", "ag_themis", "MENTE_RAG", "L'indice della conoscenza",
     "worker", "active", "ChromaDB + BM25 + reranker, su GPU. E' la memoria del sistema.",
     "", "NODES/MENTE_RAG/rag_engine.py"),
    ("ag_watcher", "dep_officina", "ag_themis", "AI_NEWS_WATCHER", "Sorveglia le novita' IA",
     "worker", "active", "26 sorgenti keyless (GitHub, RSS, YouTube), tier + rotazione.",
     "", "NODES/AI_NEWS_WATCHER/watcher.py"),
    ("ag_caroselli", "dep_officina", "ag_themis", "CAROSELLI", "Impagina i caroselli",
     "worker", "active", "Due corsie: SISTEMA (apprendista) e NINA (impagina i testi canonici).",
     "", "AUTOMATIONS/core/night_caroselli.bat"),
    ("ag_retention", "dep_officina", "ag_themis", "RETENTION", "Igiene del disco",
     "worker", "active", "7 regole di conservazione, dry-run di default.",
     "", "AUTOMATIONS/core/retention.py"),
    ("ag_selfimprove", "dep_officina", "ag_themis", "SELF_IMPROVE", "Propone migliorie",
     "worker", "active", "PROPOSE-ONLY: scrive proposte, non tocca il codice. Decide l'umano.",
     "", "DATA/self_improve/"),
]

# (id, name, category, status, description, probe)
TOOLS = [
    ("tl_rag",    "MENTE RAG",       "conoscenza", "live",
     "Indice ibrido semantico + BM25 + reranker", "GET http://localhost:5001/api/rag/search"),
    ("tl_api",    "API server",      "sistema",    "down",
     "Flask :5001, serve dashboard e RAG",        "GET http://localhost:5001/api/health"),
    ("tl_dash",   "Dashboard",       "sistema",    "configured",
     "Vite :5173",                                "GET http://localhost:5173/"),
    ("tl_obsidian", "Obsidian vault", "conoscenza", "live",
     "Il vault di MENTE, con i ponti fra note",   "conteggio note in MENTE/"),
    ("tl_n8n",    "n8n",             "automazione", "configured",
     "Self-hosted :5678",                          "GET http://localhost:5678/"),
    ("tl_postiz", "Postiz",          "social",     "down",
     "Stack Docker per pubblicare",                "docker compose ps"),
    ("tl_ollama", "Ollama",          "modelli",    "configured",
     "qwen2.5:7b locale su GPU",                   "ollama list"),
]

UPSERT_DEP = """
INSERT INTO departments (id, name, slug, tagline, color, ord) VALUES (?,?,?,?,?,?)
ON CONFLICT(id) DO UPDATE SET
  name=excluded.name, slug=excluded.slug, tagline=excluded.tagline,
  color=excluded.color, ord=excluded.ord
"""

UPSERT_AGENT = """
INSERT INTO agents (id, department_id, parent_id, name, role, tier, status,
                    description, model, entrypoint)
VALUES (?,?,?,?,?,?,?,?,?,?)
ON CONFLICT(id) DO UPDATE SET
  department_id=excluded.department_id, parent_id=excluded.parent_id,
  name=excluded.name, role=excluded.role, tier=excluded.tier,
  status=excluded.status, description=excluded.description,
  model=excluded.model, entrypoint=excluded.entrypoint
"""

UPSERT_TOOL = """
INSERT INTO tools (id, name, category, status, description, probe) VALUES (?,?,?,?,?,?)
ON CONFLICT(id) DO UPDATE SET
  name=excluded.name, category=excluded.category, status=excluded.status,
  description=excluded.description, probe=excluded.probe
"""

# La CTE ricorsiva dell'albero e' migrata in CORE/repos.py (gradino S3):
# qui restava l'unico blocco di SQL fuori dal repository layer.


def seed(db_path: str | Path | None = None) -> dict:
    init(db_path)
    with connect(db_path) as con:
        con.executemany(UPSERT_DEP, DEPARTMENTS)
        # i lead PRIMA dei worker: parent_id ha una FK, l'ordine conta
        con.executemany(UPSERT_AGENT, [a for a in AGENTS if a[2] is None])
        con.executemany(UPSERT_AGENT, [a for a in AGENTS if a[2] is not None])
        con.executemany(UPSERT_TOOL, TOOLS)
        con.commit()
        # conteggio PRIMA di uscire dal with: repos lavora sulla connessione
        # aperta, quindi vede le righe appena scritte
        return {nome: repos.conteggio(con, nome)
                for nome in ("departments", "agents", "tools")}


def albero(db_path: str | Path | None = None) -> list:
    with connect(db_path) as con:
        return repos.albero(con)


if __name__ == "__main__":
    # l'albero si disegna con i box-drawing: su console Windows cp1252
    # la stampa cadeva con UnicodeEncodeError alla prima ramificazione
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    if "--albero" not in sys.argv:
        n = seed()
        print(f"seed ok ({NOW}) — dipartimenti {n['departments']} · "
              f"agenti {n['agents']} · strumenti {n['tools']}")
    for r in albero():
        print(f"  {'   ' * r['livello']}{'└─ ' if r['livello'] else ''}"
              f"{r['name']}  [{r['tier']}]  · {r['dipartimento']}")
