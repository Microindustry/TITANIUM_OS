# generate_restart_prompt.py | TITANIUM_OS / SCRIPTS | v1.1 | 2026-05-31
# Genera RIAVVIO_SESSIONE.txt da session_context.json + STATE.json + git log
# Eseguito automaticamente dallo stop hook di Claude Code
# v1.1 — SELF-HEALING: se session_context e' stale (non di oggi), deriva il
#        contesto dai commit git di oggi -> il handoff non e' mai cieco anche
#        se Claude non ha chiamato il tool MCP update_session_context.

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


def _git_today_subjects(max_n=12):
    """Soggetti dei commit di oggi — fonte per auto-derivare il contesto sessione."""
    today = datetime.now().strftime("%Y-%m-%d")
    try:
        result = subprocess.run(
            ["git", "log", f"--since={today} 00:00", "--pretty=format:%s"],
            cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=10
        )
        subs = [s.strip() for s in result.stdout.splitlines() if s.strip()]
        # Filtra il rumore meta (commit di salvataggio sessione)
        subs = [s for s in subs if not s.lower().startswith("session:")]
        return subs[:max_n]
    except Exception:
        return []


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
    today = datetime.now().strftime("%Y-%m-%d")
    session_num = ctx.get("session_number", state.get("session_count", "?"))
    next_session = int(session_num) + 1 if str(session_num).isdigit() else "?"

    # ── SELF-HEALING: rileva contesto stale ────────────────────────────────
    # session_context e' aggiornato solo dal tool MCP update_session_context.
    # Se Claude non l'ha chiamato, e' fermo a una sessione precedente -> il
    # handoff sarebbe cieco. In quel caso derivo dai commit git di oggi.
    ctx_date = (ctx.get("session_date") or ctx.get("last_updated", ""))[:10]
    today_commits = _git_today_subjects()
    ctx_is_stale = ctx_date != today and bool(today_commits)

    if ctx_is_stale:
        last_discussed = (
            "[auto-derivato dai commit di oggi — session_context.json fermo a "
            f"{ctx_date or 'N/A'}; ricorda il tool MCP update_session_context]\n  "
            + "; ".join(today_commits[:4])
        )
        active_topics = today_commits
        decisions_made = []           # non inventare decisioni: lascia ai commit
        open_threads = ctx.get("open_threads", [])  # i thread restano validi
        next_action = state.get("next_step", ctx.get("next_action", "N/A"))
    else:
        last_discussed = ctx.get("last_discussed", state.get("last_action", "N/A"))
        active_topics = ctx.get("active_topics", [])
        decisions_made = ctx.get("decisions_made", [])
        open_threads = ctx.get("open_threads", [])
        next_action = ctx.get("next_action", state.get("next_step", "N/A"))

    header_warn = "  ⚠ contesto AUTO-DERIVATO da git (chiama update_session_context)\n" if ctx_is_stale else ""

    lines = [
        f"=== RIAVVIO SESSIONE #{next_session} — {now} ===",
        f"Ultima sessione: #{session_num} — {ctx.get('session_date', 'N/A')}",
        header_warn.rstrip("\n") if header_warn else "",
        "━━━ STAVAMO PARLANDO DI ━━━",
        last_discussed,
        "",
        "━━━ TOPIC ATTIVI ━━━",
    ]
    for t in active_topics:
        lines.append(f"  • {t}")

    lines += ["", "━━━ THREAD APERTI (da riprendere) ━━━"]
    for t in open_threads:
        lines.append(f"  → {t}")

    lines += ["", "━━━ DECISIONI PRESE NELL'ULTIMA SESSIONE ━━━"]
    for d in decisions_made:
        lines.append(f"  ✓ {d}")

    lines += [
        "",
        "━━━ PROSSIMA AZIONE SUGGERITA ━━━",
        f"  {next_action}",
        "",
        "━━━ BLOCKERS ━━━",
    ]
    # blockers live da STATE.json (sempre freschi); fallback su ctx
    blockers = state.get("blockers") or ctx.get("blockers", [])
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
