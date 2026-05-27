# daily_brief.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-05-27
# Genera brief mattutino da BRAIN/STATE.json + contenuti pronti
# Output: stringa markdown (stampata a console) + DATA/daily_brief_last.md

import sys
import json
from datetime import datetime
from pathlib import Path

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ── PATH ────────────────────────────────────────────────────────────────
REPO_ROOT      = Path(__file__).resolve().parents[2]
STATE_FILE     = REPO_ROOT / "BRAIN" / "STATE.json"
CONTENT_DIR    = Path.home() / "MICROINDUSTRY" / "CONTENT_ENGINE" / "produzione_contenuti"
DATA_DIR       = REPO_ROOT / "DATA"
OUTPUT_FILE    = DATA_DIR / "daily_brief_last.md"

# ── HELPERS ─────────────────────────────────────────────────────────────

def _load_state() -> dict:
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        return {"error": str(e)}

def _list_content_ready() -> list[dict]:
    ready = []
    if not CONTENT_DIR.exists():
        return ready
    for path in CONTENT_DIR.rglob("*"):
        if path.is_file() and path.suffix.lower() in {".md", ".txt", ".pdf"}:
            stat = path.stat()
            ready.append({
                "name": path.name,
                "path": str(path.relative_to(CONTENT_DIR)),
                "modified": datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d"),
                "size_kb": round(stat.st_size / 1024, 1),
            })
    ready.sort(key=lambda x: x["modified"], reverse=True)
    return ready[:10]

def _pillar_line(name: str, data: dict) -> str:
    pct  = data.get("pct_complete", "?")
    nxt  = data.get("next", "—")
    stat = data.get("status", "?")
    return f"  - **{name}** [{stat}] {pct}% → {nxt}"

# ── BRIEF GENERATION ────────────────────────────────────────────────────

def generate_brief() -> str:
    state   = _load_state()
    today   = datetime.now().strftime("%A %d %B %Y")
    now_str = datetime.now().strftime("%H:%M")

    lines = [
        f"# TITANIUM_OS — Daily Brief",
        f"**{today}** | generato alle {now_str}\n",
    ]

    # ── MILESTONE ATTUALE
    milestone = state.get("active_milestone", "N/D")
    focus     = state.get("focus_today", "N/D")
    lines += [
        "## MILESTONE ATTUALE",
        f"**{milestone}**",
        f"Focus oggi: {focus}\n",
    ]

    # ── BLOCKERS
    blockers = state.get("blockers", [])
    if blockers:
        lines.append("## BLOCKERS")
        for b in blockers:
            lines.append(f"  - {b}")
        lines.append("")

    # ── PILASTRI
    pillars = state.get("pillars", {})
    if pillars:
        lines.append("## PILASTRI")
        for name, data in pillars.items():
            lines.append(_pillar_line(name, data))
        lines.append("")

    # ── NODI ATTIVI
    nodes = state.get("nodes", {})
    if nodes:
        lines.append("## NODI")
        for name, status in nodes.items():
            icon = "✓" if "ATTIVO" in str(status).upper() else "○"
            lines.append(f"  {icon} {name}: {status}")
        lines.append("")

    # ── CONTENUTI PRONTI
    content = _list_content_ready()
    if content:
        lines.append(f"## CONTENUTI PRONTI ({len(content)})")
        for c in content:
            lines.append(f"  - {c['name']} ({c['modified']}, {c['size_kb']} KB)")
        lines.append("")

    # ── PROSSIMO STEP
    next_step = state.get("next_step", "")
    if next_step:
        lines += ["## PROSSIMO STEP", f"→ {next_step}\n"]

    # ── STATS
    session = state.get("session_count", 0)
    last    = state.get("last_update", "N/D")[:10]
    lines += [
        "---",
        f"_Sessione #{session} | Ultimo aggiornamento STATE: {last}_",
    ]

    return "\n".join(lines)

# ── SAVE + PRINT ─────────────────────────────────────────────────────────

def run() -> str:
    brief = generate_brief()
    DATA_DIR.mkdir(exist_ok=True)
    OUTPUT_FILE.write_text(brief, encoding="utf-8")
    return brief

if __name__ == "__main__":
    print(run())
