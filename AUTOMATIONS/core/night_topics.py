# night_topics.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-06-03
# Genera i topic di ricerca notturni GUIDATI da STATE.json e prioritizzati dal RAG.
#  - STATE decide QUALI temi (pilastri attivi + blocker + milestone corrente)
#  - RAG decide la PRIORITA': i temi poco coperti ("gap") vanno in cima
# Output: scrive DATA/night_topics.txt, righe "query|dominio".
#   (file e NON stdout: il for /f di night_research.bat catturerebbe il banner
#    AutoRun di cmd al posto dei topic — leggere da file evita il sub-shell.)

import sys
import json
import re
from pathlib import Path

ROOT  = Path(__file__).resolve().parents[2]      # AUTOMATIONS/core -> repo root
sys.path.insert(0, str(ROOT))
STATE = ROOT / "BRAIN" / "STATE.json"
OUT   = ROOT / "DATA" / "night_topics.txt"

MAX_TOPICS    = 5
GAP_THRESHOLD = 0.45   # copertura RAG sotto la quale il tema e' un "buco" da colmare

# Semi di ricerca per dominio — frasi forti in EN per fonti web/accademiche
SEEDS = {
    "V32": [
        "epoxy granite polymer concrete vibration damping machine tool",
        "linear guide rail preload stiffness precision CNC",
        "CNC spindle ER20 runout thermal accuracy",
        "machine tool frame structural rigidity gusset FEM",
    ],
    "MIMS": [
        "polymer composite injection molding modular tile manufacturing",
        "snap-fit connector design tolerance fatigue",
        "fiber reinforced polymer mechanical properties",
    ],
    "GENESIS": [
        "retrieval augmented generation technical documentation",
        "local large language model fine-tuning LoRA small model",
        "autonomous AI agent orchestration 2025",
    ],
}

# keyword -> dominio: aggancia blocker/milestone al dominio giusto
DOMAIN_HINTS = {
    "V32":     ["cnc", "mandrino", "spindle", "guida", "asse", "epoxy", "granite",
                "gusset", "fresa", "tig", "colonna", "silent block", "basamento"],
    "MIMS":    ["mims", "connet", "stampo", "polimero", "tile", "snap", "modular"],
    "GENESIS": ["rag", "llm", "agent", "automazion", "dashboard", "mcp",
                "finetune", "watchdog", "n8n", "episodi", "dataset"],
}


def _active_domains(state: dict) -> list[str]:
    doms = []
    for k, v in state.get("pillars", {}).items():
        if k in SEEDS and v.get("status") in ("in_progress", "building", "active"):
            doms.append(k)
    return doms or ["V32", "GENESIS"]


def _domain_of(text: str):
    t = text.lower()
    for dom, kws in DOMAIN_HINTS.items():
        if any(k in t for k in kws):
            return dom
    return None


def main():
    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    active = _active_domains(state)

    # 1) candidati dai semi dei domini attivi
    candidates: list[tuple[str, str]] = []
    for dom in active:
        for q in SEEDS.get(dom, []):
            candidates.append((q, dom))

    # 2) milestone/blocker NON diventano query grezze: erano gergo interno
    #    ("...resolver _ti_paths bat registrar UA") -> 0 risultati + rumore web.
    #    Servono invece da BOOST di priorita': se citano un dominio, i suoi seed
    #    (query EN gia' ben formate) salgono in cima.
    boost = set()
    for txt in [state.get("active_milestone", "")] + list(state.get("blockers", [])):
        dom = _domain_of(txt or "")
        if dom:
            boost.add(dom)

    # dedup mantenendo l'ordine
    seen, uniq = set(), []
    for q, d in candidates:
        if q.lower() not in seen:
            seen.add(q.lower())
            uniq.append((q, d))

    # 3) prioritizza con il RAG: gap (poco coperti) prima
    try:
        from NODES.MENTE_RAG.rag_engine import search

        def coverage(q: str) -> float:
            try:
                r = search(q, top_k=3)
                return max((x.get("score", 0) for x in r), default=0.0)
            except Exception:
                return 0.0
    except Exception:
        def coverage(_q: str) -> float:
            return 0.0

    scored = []
    for q, d in uniq:
        cov = coverage(q)
        scored.append((q, d, cov, cov < GAP_THRESHOLD))
    # ordine: dominio "boostato" da milestone/blocker prima, poi gap, poi
    # copertura crescente (i temi piu' deboli nel RAG vanno colmati prima).
    scored.sort(key=lambda x: (x[1] not in boost, not x[3], x[2]))

    picked = scored[:MAX_TOPICS]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(f"{q}|{d}" for q, d, _, _ in picked) + "\n", encoding="utf-8")

    for q, d, cov, gap in picked:
        print(f"[topic] {'GAP ' if gap else '    '}cov={cov:.2f} [{d}] {q}")
    print(f"[night_topics] scritti {len(picked)} topic -> {OUT}")


if __name__ == "__main__":
    main()
