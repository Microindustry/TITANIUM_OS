# generate_restart_prompt.py | TITANIUM_OS / SCRIPTS | v1.0 | 2026-05-30
# Genera RIAVVIO_SESSIONE.txt da session_context.json + STATE.json + git log
# Eseguito automaticamente dallo stop hook di Claude Code

import json
import subprocess
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STATE_FILE   = ROOT / "BRAIN" / "STATE.json"
CONTEXT_FILE = ROOT / "DATA" / "session_context.json"
OUTPUT_FILE  = ROOT / "RIAVVIO_SESSIONE.txt"


def _git_log(n=5):
    try:
        result = subprocess.run(
            ["git", "log", f"--oneline", f"-{n}"],
            cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=10
        )
        return result.stdout.strip()
    except Exception:
        return "(git log non disponibile)"


def main():
    # Leggi session_context.json
    ctx = {}
    if CONTEXT_FILE.exists():
        with open(CONTEXT_FILE, encoding="utf-8") as f:
            ctx = json.load(f)

    # Leggi STATE.json
    state = {}
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding="utf-8") as f:
            state = json.load(f)

    now = datetime.now().strftime("%d/%m/%Y %H:%M")
    session_num = ctx.get("session_number", state.get("session_count", "?"))
    next_session = int(session_num) + 1 if str(session_num).isdigit() else "?"

    lines = [
        f"=== RIAVVIO SESSIONE #{next_session} — {now} ===",
        f"Ultima sessione: #{session_num} — {ctx.get('session_date', 'N/A')}",
        "",
        "━━━ STAVAMO PARLANDO DI ━━━",
        ctx.get("last_discussed", state.get("last_action", "N/A")),
        "",
        "━━━ TOPIC ATTIVI ━━━",
    ]
    for t in ctx.get("active_topics", []):
        lines.append(f"  • {t}")

    lines += ["", "━━━ THREAD APERTI (da riprendere) ━━━"]
    for t in ctx.get("open_threads", []):
        lines.append(f"  → {t}")

    lines += ["", "━━━ DECISIONI PRESE NELL'ULTIMA SESSIONE ━━━"]
    for d in ctx.get("decisions_made", []):
        lines.append(f"  ✓ {d}")

    lines += [
        "",
        "━━━ PROSSIMA AZIONE SUGGERITA ━━━",
        f"  {ctx.get('next_action', state.get('next_step', 'N/A'))}",
        "",
        "━━━ BLOCKERS ━━━",
    ]
    blockers = ctx.get("blockers", state.get("blockers", []))
    for b in blockers:
        lines.append(f"  ⚠ {b}")

    lines += [
        "",
        "━━━ STATO PILASTRI ━━━",
    ]
    for name, p in state.get("pillars", {}).items():
        pct = p.get("pct_complete", "?")
        nxt = p.get("next", "")
        lines.append(f"  {name}: {pct}% — {nxt[:60]}")

    lines += [
        "",
        "━━━ ULTIMI COMMIT ━━━",
        _git_log(5),
        "",
        f"Generato: {now}",
    ]

    OUTPUT_FILE.write_text("\n".join(lines), encoding="utf-8")
    print(f"[restart_prompt] Scritto: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
