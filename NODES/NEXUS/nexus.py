# nexus.py | TITANIUM_OS / NODES / NEXUS | v1.0 | 2026-05-30
# Orchestratore agenti swarm — esegue agenti specializzati in parallelo
# Pattern: task decomposition → parallel dispatch → result merge
# Agenti: THEMIS (tecnico), FORGE (officina), RESEARCH (paper), RAG (memoria)

import os
import sys
import json
import threading
import time
import logging
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed, TimeoutError

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("nexus")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [nexus] %(levelname)s %(message)s")
    logger = logging.getLogger("nexus")

ROOT   = Path(__file__).resolve().parents[2]
MENTE  = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))

# ── AGENTI DISPONIBILI ────────────────────────────────────────────────────────

AGENT_REGISTRY: dict[str, dict] = {
    "rag": {
        "description": "Cerca nella memoria MENTE/ via RAG ibrido",
        "domains":     ["*"],
    },
    "research": {
        "description": "Cerca paper tecnici su arXiv/web e li ingesta in MENTE/",
        "domains":     ["V32", "MIMS", "GENESIS", "OFFICINA"],
    },
    "state": {
        "description": "Legge e aggiorna STATE.json",
        "domains":     ["*"],
    },
}


# ── TASK ─────────────────────────────────────────────────────────────────────

class SwarmTask:
    """Unità di lavoro per un singolo agente."""

    def __init__(self, agent: str, query: str, params: dict | None = None):
        self.agent   = agent
        self.query   = query
        self.params  = params or {}
        self.result  = None
        self.error   = None
        self.elapsed = 0.0

    def run(self) -> "SwarmTask":
        t0 = time.time()
        try:
            if self.agent == "rag":
                self.result = _run_rag(self.query, self.params)
            elif self.agent == "research":
                self.result = _run_research(self.query, self.params)
            elif self.agent == "state":
                self.result = _run_state(self.query, self.params)
            else:
                self.error = f"Agente sconosciuto: {self.agent}"
        except Exception as e:
            self.error = str(e)
            logger.error("SwarmTask[%s] error: %s", self.agent, e)
        self.elapsed = round(time.time() - t0, 2)
        return self


# ── RUNNER AGENTI ─────────────────────────────────────────────────────────────

def _run_rag(query: str, params: dict) -> str:
    from NODES.MENTE_RAG.rag_engine import search_and_format
    top_k = int(params.get("top_k", 5))
    return search_and_format(query, top_k)


def _run_research(query: str, params: dict) -> str:
    import subprocess
    domain  = params.get("domain", "GENESIS")
    max_res = int(params.get("max", 3))
    script  = ROOT / "NODES" / "RESEARCH_AGENT" / "research_agent.py"
    result  = subprocess.run(
        [sys.executable, str(script), query, "--domain", domain, "--rag", "--max", str(max_res)],
        capture_output=True, text=True, timeout=120, cwd=str(ROOT),
    )
    return result.stdout.strip() or result.stderr.strip() or "Nessun risultato"


def _run_state(query: str, params: dict) -> str:
    state_file = ROOT / "BRAIN" / "STATE.json"
    try:
        state = json.loads(state_file.read_text(encoding="utf-8"))
        section = params.get("section", "")
        if section and section in state:
            return json.dumps(state[section], ensure_ascii=False, indent=2)
        # Estrai solo i campi rilevanti alla query
        relevant = {
            "active_milestone": state.get("active_milestone"),
            "next_step":        state.get("next_step"),
            "blockers":         state.get("blockers"),
            "pillars":          {k: {"pct": v.get("pct_complete"), "next": v.get("next")}
                                 for k, v in state.get("pillars", {}).items()},
        }
        return json.dumps(relevant, ensure_ascii=False, indent=2)
    except Exception as e:
        return f"Errore lettura state: {e}"


# ── ORCHESTRATORE ─────────────────────────────────────────────────────────────

def run_swarm(tasks: list[SwarmTask], timeout: float = 90.0) -> list[SwarmTask]:
    """
    Esegue tutti i task in parallelo, raccoglie i risultati entro timeout.
    Ritorna la lista dei task completati (con result/error popolati).
    """
    logger.info("NEXUS swarm — %d task in parallelo", len(tasks))
    with ThreadPoolExecutor(max_workers=len(tasks)) as pool:
        futures = {pool.submit(t.run): t for t in tasks}
        completed = []
        for future in as_completed(futures, timeout=timeout):
            task = futures[future]
            try:
                completed.append(future.result())
            except TimeoutError:
                task.error = "timeout"
                completed.append(task)
                logger.warning("SwarmTask[%s] timeout", task.agent)
    logger.info("NEXUS swarm — completato in %.1fs", sum(t.elapsed for t in completed))
    return completed


def format_results(tasks: list[SwarmTask]) -> str:
    """Formatta i risultati swarm per consumo da Claude/API."""
    lines = []
    for t in tasks:
        lines.append(f"\n## [{t.agent.upper()}] ({t.elapsed}s)")
        if t.error:
            lines.append(f"*Errore: {t.error}*")
        else:
            lines.append(t.result or "*Nessun risultato*")
    return "\n".join(lines)


# ── API SEMPLICE ─────────────────────────────────────────────────────────────

def ask(query: str, agents: list[str] | None = None, **kwargs) -> str:
    """
    Interroga più agenti in parallelo su una singola query.
    agents: lista di agenti da usare (default: rag + state)
    """
    if agents is None:
        agents = ["rag", "state"]
    tasks = [SwarmTask(a, query, kwargs) for a in agents if a in AGENT_REGISTRY]
    results = run_swarm(tasks)
    return format_results(results)


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="NEXUS — orchestratore agenti swarm")
    parser.add_argument("query", help="Query da inviare agli agenti")
    parser.add_argument("--agents", nargs="+", default=["rag", "state"],
                        choices=list(AGENT_REGISTRY.keys()),
                        help="Agenti da usare (default: rag state)")
    parser.add_argument("--domain", default="GENESIS", help="Dominio per research agent")
    args = parser.parse_args()

    output = ask(args.query, agents=args.agents, domain=args.domain)
    print(output)
