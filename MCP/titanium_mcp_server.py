# titanium_mcp_server.py | TITANIUM_OS / MCP | v1.2 | 2026-05-30
# Server MCP locale — espone TITANIUM_OS a Claude Code via stdio
# Tools: get_state, update_milestone, search_mente, get_daily_brief, list_content_ready

import sys
import json
import logging
import asyncio
from datetime import datetime
from pathlib import Path

import mcp.server.stdio
from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp import types

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ── PATH ────────────────────────────────────────────────────────────────
REPO_ROOT  = Path(__file__).resolve().parents[1]
STATE_FILE = REPO_ROOT / "BRAIN" / "STATE.json"
DATA_DIR   = REPO_ROOT / "DATA"

sys.path.insert(0, str(REPO_ROOT))
try:
    from CORE.log import get_logger
    logger = get_logger("mcp_server")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [mcp_server] %(levelname)s %(message)s")
    logger = logging.getLogger("mcp_server")

# ── SERVER INIT ─────────────────────────────────────────────────────────
server = Server("titanium-os")

# ── TOOL DEFINITIONS ────────────────────────────────────────────────────

@server.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_state",
            description="Ritorna lo stato attuale di TITANIUM_OS (STATE.json): milestone, pilastri, nodi, blockers.",
            inputSchema={
                "type": "object",
                "properties": {
                    "section": {
                        "type": "string",
                        "description": "Sezione specifica (pillars, nodes, blockers, milestones) — ometti per tutto",
                    }
                },
            },
        ),
        types.Tool(
            name="update_milestone",
            description="Aggiorna active_milestone, next_step, blockers o focus_today in STATE.json.",
            inputSchema={
                "type": "object",
                "properties": {
                    "active_milestone": {"type": "string"},
                    "next_step":        {"type": "string"},
                    "focus_today":      {"type": "string"},
                    "blockers":         {"type": "array", "items": {"type": "string"}},
                    "pillar":           {"type": "string", "description": "Nome pilastro (V32, MIMS, GENESIS...)"},
                    "pillar_pct":       {"type": "number", "description": "% completamento pilastro"},
                    "pillar_next":      {"type": "string", "description": "Prossimo step del pilastro"},
                    "pillar_status":    {"type": "string"},
                },
            },
        ),
        types.Tool(
            name="search_mente",
            description="Cerca nei documenti MICROINDUSTRY/MENTE/ tramite RAG ibrido (ChromaDB semantico + TF-IDF BM25 + CrossEncoder reranker). Ritorna i chunk più rilevanti.",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Testo da cercare (italiano/inglese/tecnico)",
                    },
                    "top_k": {
                        "type": "integer",
                        "description": "Numero di risultati (default 5)",
                        "default": 5,
                    },
                    "rebuild": {
                        "type": "boolean",
                        "description": "Forza rebuild dell'indice (default false)",
                        "default": False,
                    },
                },
                "required": ["query"],
            },
        ),
        types.Tool(
            name="get_daily_brief",
            description="Genera e ritorna il brief mattutino: milestone, blockers, pilastri, contenuti pronti.",
            inputSchema={"type": "object", "properties": {}},
        ),
        types.Tool(
            name="list_content_ready",
            description="Lista i file pronti in MICROINDUSTRY/CONTENT_ENGINE/produzione_contenuti/.",
            inputSchema={
                "type": "object",
                "properties": {
                    "limit": {
                        "type": "integer",
                        "description": "Max risultati (default 10)",
                        "default": 10,
                    }
                },
            },
        ),
        types.Tool(
            name="rag_update",
            description="Aggiorna incrementalmente il RAG ChromaDB dopo modifiche a MENTE/. Più veloce di rebuild completo.",
            inputSchema={
                "type": "object",
                "properties": {
                    "force_rebuild": {
                        "type": "boolean",
                        "description": "Forza rebuild completo (default false — usa incrementale)",
                        "default": False,
                    }
                },
            },
        ),
        types.Tool(
            name="save_session",
            description="Salva le decisioni chiave della sessione in MENTE/SESSIONI/ per il RAG futuro. Usa a fine sessione o quando prendi decisioni importanti.",
            inputSchema={
                "type": "object",
                "properties": {
                    "topic": {
                        "type": "string",
                        "description": "Tema della sessione (es: 'watchdog-swarm', 'v32-gusset-config')",
                    },
                    "content": {
                        "type": "string",
                        "description": "Contenuto da salvare: decisioni, misure, blockers risolti, apprendimenti",
                    },
                    "tags": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Tag per la ricerca (es: ['V32', 'GENESIS', 'struttura'])",
                    },
                },
                "required": ["topic", "content"],
            },
        ),
    ]

# ── TOOL HANDLERS ────────────────────────────────────────────────────────

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:

    def _ok(text: str) -> list[types.TextContent]:
        return [types.TextContent(type="text", text=text)]

    # ── get_state ────────────────────────────────────────────────────────
    if name == "get_state":
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                state = json.load(f)
            section = arguments.get("section", "").strip()
            if section and section in state:
                payload = {section: state[section]}
            else:
                payload = state
            logger.info("get_state section=%s", section or "all")
            return _ok(json.dumps(payload, ensure_ascii=False, indent=2))
        except Exception as e:
            logger.error("get_state: %s", e)
            return _ok(f"Errore lettura STATE.json: {e}")

    # ── update_milestone ─────────────────────────────────────────────────
    elif name == "update_milestone":
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                state = json.load(f)

            for field in ("active_milestone", "next_step", "focus_today"):
                if arguments.get(field):
                    state[field] = arguments[field]

            if "blockers" in arguments:
                state["blockers"] = arguments["blockers"]

            pillar = arguments.get("pillar")
            if pillar and pillar in state.get("pillars", {}):
                if "pillar_pct"    in arguments:
                    state["pillars"][pillar]["pct_complete"] = arguments["pillar_pct"]
                if "pillar_next"   in arguments:
                    state["pillars"][pillar]["next"]         = arguments["pillar_next"]
                if "pillar_status" in arguments:
                    state["pillars"][pillar]["status"]       = arguments["pillar_status"]

            state["last_update"] = datetime.now().isoformat()

            with open(STATE_FILE, "w", encoding="utf-8") as f:
                json.dump(state, f, ensure_ascii=False, indent=2)

            logger.info("update_milestone: %s", {k: v for k, v in arguments.items()})
            return _ok(f"STATE.json aggiornato alle {state['last_update'][:16]}")
        except Exception as e:
            logger.error("update_milestone: %s", e)
            return _ok(f"Errore update STATE.json: {e}")

    # ── search_mente ─────────────────────────────────────────────────────
    elif name == "search_mente":
        try:
            from NODES.MENTE_RAG.rag_engine import search_and_format
            query   = arguments["query"]
            top_k   = int(arguments.get("top_k", 5))
            rebuild = bool(arguments.get("rebuild", False))
            logger.info("search_mente: '%s' top_k=%d rebuild=%s", query, top_k, rebuild)
            if rebuild:
                from NODES.MENTE_RAG.rag_engine import build_index
                build_index(force=True)
            return _ok(search_and_format(query, top_k))
        except Exception as e:
            logger.error("search_mente: %s", e)
            return _ok(f"Errore RAG search: {e}")

    # ── get_daily_brief ──────────────────────────────────────────────────
    elif name == "get_daily_brief":
        try:
            from AUTOMATIONS.core.daily_brief import run
            return _ok(run())
        except Exception as e:
            return _ok(f"Errore daily_brief: {e}")

    # ── list_content_ready ───────────────────────────────────────────────
    elif name == "list_content_ready":
        try:
            from AUTOMATIONS.core.daily_brief import _list_content_ready
            limit = int(arguments.get("limit", 10))
            items = _list_content_ready()[:limit]
            if not items:
                return _ok("Nessun contenuto pronto trovato.")
            lines = ["## Contenuti pronti\n"]
            for i, c in enumerate(items, 1):
                lines.append(f"{i}. **{c['name']}** — {c['modified']} ({c['size_kb']} KB)\n   `{c['path']}`")
            return _ok("\n".join(lines))
        except Exception as e:
            return _ok(f"Errore list_content_ready: {e}")

    # ── rag_update ───────────────────────────────────────────────
    elif name == "rag_update":
        try:
            from NODES.MENTE_RAG.rag_engine import build_index
            force = bool(arguments.get("force_rebuild", False))
            mode  = "Full rebuild" if force else "Incrementale"
            logger.info("rag_update: %s", mode)
            n = build_index(force=force)
            return _ok(f"RAG aggiornato ({mode}) — {n} chunk indicizzati.")
        except Exception as e:
            logger.error("rag_update: %s", e)
            return _ok(f"Errore rag_update: {e}")

    # ── save_session ─────────────────────────────────────────────
    elif name == "save_session":
        try:
            import os
            mente_dir = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
            sessioni_dir = mente_dir / "SESSIONI"
            sessioni_dir.mkdir(parents=True, exist_ok=True)

            topic   = arguments["topic"].lower().replace(" ", "_")
            content = arguments["content"]
            tags    = arguments.get("tags", [])
            today   = datetime.now().strftime("%Y-%m-%d")
            fname   = f"{today}_{topic}.md"
            fpath   = sessioni_dir / fname

            tag_str = ", ".join(tags) if tags else ""
            md = f"# Sessione: {topic}\n*Data: {today}*\n"
            if tag_str:
                md += f"*Tag: {tag_str}*\n"
            md += f"\n{content}\n"

            fpath.write_text(md, encoding="utf-8")
            logger.info("save_session: %s", fpath)

            # RAG update incrementale automatico
            try:
                from NODES.MENTE_RAG.rag_engine import build_index
                build_index(force=False)
                rag_msg = " RAG aggiornato."
            except Exception:
                rag_msg = " (RAG update fallito — esegui rag-update manualmente)"

            return _ok(f"Sessione salvata: {fpath}.{rag_msg}")
        except Exception as e:
            logger.error("save_session: %s", e)
            return _ok(f"Errore save_session: {e}")

    return _ok(f"Tool sconosciuto: {name}")

# ── MAIN ─────────────────────────────────────────────────────────────────

async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="titanium-os",
                server_version="1.0.0",
                capabilities=server.get_capabilities(
                    notification_options=None,
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
