"""
========================================================
TITANIUM_OS — MILESTONE TRACKER (Automation #14)
Modulo    : milestone_tracker.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Input  : nessuno — eseguito ogni mattina tramite Task Scheduler
Output : stampa 3 righe: dove sei / cosa hai fatto / cosa fare
         + salva INBOX/daily_brief_[data].md
         + calcola giorni al capannone
Schedulazione Windows (Task Scheduler):
  Trigger  : ogni giorno alle 08:00
  Azione   : python path\\milestone_tracker.py
  Start in : path\\TITANIUM_OS\\
========================================================
"""

import json
import sys
import logging
from pathlib import Path
from datetime import datetime, date, timedelta

_ROOT_MT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT_MT))
try:
    from CORE.log import get_logger
    logger = get_logger("milestone_tracker")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [milestone_tracker] %(levelname)s %(message)s")
    logger = logging.getLogger("milestone_tracker")

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
STATE_PATH = ROOT / "BRAIN" / "STATE.json"
MILESTONES_PATH = ROOT / "DATA" / "milestones.json"
CHANGELOG_PATH = ROOT / "VERSIONS" / "changelog.md"
INBOX_DIR = ROOT / "INBOX"

# Data target capannone
TARGET_DATE = date(2030, 7, 15)

# ============================================================
# CALCOLI
# ============================================================

def _days_to_capannone() -> int:
    """Calcola giorni rimanenti al capannone."""
    today = date.today()
    delta = TARGET_DATE - today
    return delta.days


def _load_json(path: Path) -> dict:
    if path.exists():
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {}


def _get_yesterday_activity() -> str:
    """Estrae attività di ieri dal changelog."""
    if not CHANGELOG_PATH.exists():
        return "Nessuna attività registrata"

    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    today_str = datetime.now().strftime("%Y-%m-%d")

    activities = []
    in_yesterday = False

    with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
        for line in f:
            if f"## {yesterday}" in line:
                in_yesterday = True
                continue
            if f"## {today_str}" in line:
                in_yesterday = False
                break
            if in_yesterday and line.strip().startswith("-"):
                # Prendi solo le prime 5 attività significative
                activity = line.strip().lstrip("- ").strip()
                if activity and len(activities) < 5:
                    activities.append(activity)

    if not activities:
        return "Nessuna attività registrata ieri"

    return "\n".join(f"  • {a}" for a in activities)


def _get_next_milestones(n: int = 3) -> list:
    """Prende le prossime N milestone da completare."""
    data = _load_json(MILESTONES_PATH)
    milestones = data.get("milestones", [])

    # Filtra solo quelle non ancora completate
    pending = [
        m for m in milestones
        if m.get("status") in ("PROSSIMO", "PIANIFICATO", "TARGET")
    ]

    # Ordina per ID
    pending.sort(key=lambda x: x.get("id", 999))

    return pending[:n]


def _calculate_progress() -> dict:
    """Calcola progresso complessivo dai pillars."""
    state = _load_json(STATE_PATH)
    pillars = state.get("pillars", {})

    if not pillars:
        return {"overall": 0, "details": {}}

    # Media semplice dei pct_complete
    pcts = [v.get("pct_complete", 0) for v in pillars.values()]
    overall = sum(pcts) / len(pcts) if pcts else 0

    return {
        "overall": round(overall, 1),
        "details": {k: v.get("pct_complete", 0) for k, v in pillars.items()}
    }


# ============================================================
# GENERAZIONE BRIEF GIORNALIERO
# ============================================================

def generate_daily_brief() -> str:
    """Genera il brief giornaliero completo."""

    state = _load_json(STATE_PATH)
    now = datetime.now()
    days_left = _days_to_capannone()
    progress = _calculate_progress()
    next_milestones = _get_next_milestones(3)
    yesterday_activity = _get_yesterday_activity()

    # ---- Milestone attiva ------
    active = state.get("active_milestone", "—")
    next_step = state.get("next_step", "—")
    blockers = state.get("blockers", [])
    focus = state.get("focus_today", "—")

    # ---- Calcolo settimane ---
    weeks_left = days_left // 7

    # ---- Barra progresso complessiva ---
    pct = progress["overall"]
    bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))

    # ---- Next milestones text ---
    milestones_text = ""
    for m in next_milestones:
        emoji = "🔴" if m["status"] == "PROSSIMO" else "🟡" if m["status"] == "PIANIFICATO" else "🟢"
        milestones_text += f"  {emoji} #{m['id']:2} [{m['date']:12}] {m['name']}\n"
    if not milestones_text:
        milestones_text = "  (nessuna in lista)"

    # ---- Blockers text ---
    blockers_text = "\n".join(f"  🔴 {b}" for b in blockers) if blockers else "  ✅ Nessun blocker"

    brief = f"""
╔══════════════════════════════════════════════════════════╗
║  TITANIUM_OS — DAILY BRIEF
║  {now.strftime('%A %d %B %Y').upper()}
╚══════════════════════════════════════════════════════════╝

📍 DOVE SEI OGGI
  Milestone  : {active}
  Prossimo   : {next_step}
  Focus      : {focus}

📋 COSA HAI FATTO IERI
{yesterday_activity}

⏭  PROSSIME MILESTONE
{milestones_text}
🔴 BLOCKERS
{blockers_text}

📊 PROGRESSO ECOSISTEMA
  Overall [{bar}] {pct:.0f}%
"""

    for pillar, pct_p in progress["details"].items():
        bar_p = "█" * (pct_p // 10) + "░" * (10 - pct_p // 10)
        brief += f"  {pillar:<15} [{bar_p}] {pct_p}%\n"

    brief += f"""
⏳ COUNTDOWN CAPANNONE
  🏭 {days_left:,} giorni  ({weeks_left} settimane)
  📅 Target: 15 Luglio 2030

══════════════════════════════════════════════════════════
"""

    return brief


# ============================================================
# SALVATAGGIO + STAMPA
# ============================================================

def run_daily_brief():
    """Esegue il brief giornaliero: stampa + salva in INBOX."""

    brief = generate_daily_brief()

    # Stampa a schermo
    print(brief)

    # Salva in INBOX
    INBOX_DIR.mkdir(parents=True, exist_ok=True)
    fname = f"daily_brief_{datetime.now().strftime('%Y%m%d')}.md"
    fpath = INBOX_DIR / fname

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(f"# Daily Brief — {datetime.now().strftime('%Y-%m-%d')}\n\n")
        f.write(brief)

    logger.info("Brief salvato: INBOX/%s", fname)
    return fpath


# ============================================================
# SETUP TASK SCHEDULER WINDOWS
# ============================================================

TASK_SETUP_INSTRUCTIONS = """
╔═══════════════════════════════════════════════════════════╗
║  SETUP TASK SCHEDULER WINDOWS — Milestone Tracker        ║
╚═══════════════════════════════════════════════════════════╝

1. Apri Task Scheduler (Win+R → taskschd.msc)
2. "Create Basic Task" (pannello destro)
3. Nome: "TITANIUM_OS Daily Brief"
4. Trigger: Daily → 08:00
5. Action: Start a program
   Program: python
   Arguments: AUTOMATIONS\\core\\milestone_tracker.py
   Start in: C:\\[tuo_path]\\TITANIUM_OS\\
6. Finish

Oppure lancia questo comando PowerShell come Amministratore:

$action = New-ScheduledTaskAction -Execute "python" `
  -Argument "AUTOMATIONS\\core\\milestone_tracker.py" `
  -WorkingDirectory "C:\\[tuo_path]\\TITANIUM_OS"
$trigger = New-ScheduledTaskTrigger -Daily -At 8am
Register-ScheduledTask -TaskName "TITANIUM_OS Daily Brief" `
  -Action $action -Trigger $trigger -RunLevel Highest

(Sostituisci C:\\[tuo_path] con il path reale di TITANIUM_OS)
"""


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--setup":
        print(TASK_SETUP_INSTRUCTIONS)
    else:
        run_daily_brief()
