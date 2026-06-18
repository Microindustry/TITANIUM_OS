"""
========================================================
TITANIUM_OS — SESSION ORIENTER (Automation #20)
Modulo    : session_orienter.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Input  : nessuno — eseguire all'inizio di ogni sessione
Output : stampa a schermo il brief completo di contesto
         + genera INBOX/session_brief_[data].md
         + genera prompt pre-compilato per Claude/Cursor
Zero riconfigurazione. Apri il terminale, lancia,
copia il prompt. Il contesto è già tutto lì.
========================================================
Uso Windows:
  python AUTOMATIONS/core/session_orienter.py
oppure doppio click su SESSION_START.bat
========================================================
"""

import json
import sys
import os
import logging
from pathlib import Path
from datetime import datetime

_ROOT_SO = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT_SO))
try:
    from CORE.log import get_logger
    logger = get_logger("session_orienter")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [session_orienter] %(levelname)s %(message)s")
    logger = logging.getLogger("session_orienter")

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
STATE_PATH = ROOT / "BRAIN" / "STATE.json"
CLAUDE_MD_PATH = ROOT / "BRAIN" / "CLAUDE.md"
MILESTONES_PATH = ROOT / "DATA" / "milestones.json"
CHANGELOG_PATH = ROOT / "VERSIONS" / "changelog.md"
INBOX_DIR = ROOT / "INBOX"


# ============================================================
# CARICAMENTO DATI
# ============================================================

def _load_json(path: Path) -> dict:
    """Carica JSON con fallback a dict vuoto."""
    if path.exists():
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {}


def _load_text(path: Path, max_lines: int = 30) -> str:
    """Carica testo con limite righe."""
    if path.exists():
        try:
            with open(path, "r", encoding="utf-8") as f:
                lines = f.readlines()
            return "".join(lines[:max_lines])
        except IOError:
            pass
    return ""


def _get_recent_changelog(n_lines: int = 20) -> str:
    """Prende le ultime N righe del changelog."""
    if not CHANGELOG_PATH.exists():
        return "(nessuna attività registrata)"
    with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()
    recent = [l for l in lines if l.strip() and not l.startswith("#")]
    return "".join(recent[-n_lines:])


def _count_inbox_items() -> dict:
    """Conta file nella INBOX per tipo."""
    if not INBOX_DIR.exists():
        return {"ideas": 0, "links": 0, "other": 0}

    counts = {"ideas": 0, "links": 0, "other": 0}
    for f in INBOX_DIR.iterdir():
        if f.is_file():
            name = f.name.lower()
            if "idea" in name:
                counts["ideas"] += 1
            elif "link" in name:
                counts["links"] += 1
            else:
                counts["other"] += 1
    return counts


# ============================================================
# GENERAZIONE BRIEF
# ============================================================

def generate_brief() -> dict:
    """
    Genera il dizionario completo con tutti i dati per il brief.
    Ritorna dict con sezioni: state, milestones, recent_activity,
    inbox, blockers, prompt.
    """
    state = _load_json(STATE_PATH)
    milestones_data = _load_json(MILESTONES_PATH)
    inbox = _count_inbox_items()
    now = datetime.now()

    # ---- Pillars status ----------------------------------------
    pillars = state.get("pillars", {})
    pillar_lines = []
    for name, data in pillars.items():
        pct = data.get("pct_complete", 0)
        status = data.get("status", "?")
        phase = data.get("phase", "")
        nxt = data.get("next", "")
        bar = "█" * (pct // 10) + "░" * (10 - pct // 10)
        pillar_lines.append(
            f"  {name:<15} [{bar}] {pct:3}%  {status}"
        )
        if phase:
            pillar_lines.append(f"  {'':15}  Fase   : {phase}")
        if nxt:
            pillar_lines.append(f"  {'':15}  Prossimo: {nxt}")

    # ---- Milestone attive ---------------------------------------
    milestone_next = state.get("active_milestone",
                               state.get("milestones", {}).get("next", "—"))

    # ---- Milestones da completare (TARGET) ----------------------
    targets = []
    for m in milestones_data.get("milestones", []):
        if m.get("status") in ("TARGET", "PROSSIMO", "PIANIFICATO"):
            targets.append(f"  #{m['id']:2} [{m['date']:12}] {m['name']} — {m['status']}")
    targets_str = "\n".join(targets[:6]) if targets else "  (nessuna)"

    # ---- Blockers -----------------------------------------------
    blockers = state.get("blockers", [])
    blockers_str = "\n".join(f"  🔴 {b}" for b in blockers) if blockers else "  (nessuno)"

    # ---- Prompt pre-compilato per Claude/Cursor -----------------
    focus = state.get("focus_today", "")
    last_action = state.get("last_action", "")
    next_step = state.get("next_step", "")

    prompt = f"""[TITANIUM_OS — SESSION CONTEXT]
Data: {now.strftime('%Y-%m-%d %H:%M')}
Milestone attiva: {milestone_next}
Ultimo step: {last_action}
Prossimo step: {next_step}
Focus oggi: {focus if focus else 'da definire'}
Blockers: {', '.join(blockers) if blockers else 'nessuno'}

Stato pilastri:
{chr(10).join(f"  {k}: {v.get('status')} ({v.get('pct_complete')}%)" for k,v in pillars.items())}

TASK SESSIONE:
[Descrivi qui cosa vuoi fare oggi]

Regola: THEMIS pianifica prima di eseguire. Conferma il piano prima di scrivere codice."""

    return {
        "now": now.strftime("%Y-%m-%d %H:%M:%S"),
        "last_update": state.get("last_update", "N/A"),
        "last_action": last_action,
        "active_milestone": milestone_next,
        "next_step": next_step,
        "focus_today": focus,
        "session_count": state.get("session_count", 0),
        "pillar_lines": "\n".join(pillar_lines),
        "targets": targets_str,
        "blockers": blockers_str,
        "inbox": inbox,
        "recent_activity": _get_recent_changelog(15),
        "prompt": prompt,
    }


# ============================================================
# RENDERING A SCHERMO
# ============================================================

def print_brief(brief: dict):
    """Stampa il brief a schermo in modo leggibile."""

    sep = "═" * 56

    print(f"\n{sep}")
    print(f"  TITANIUM_OS — SESSION BRIEF")
    print(f"  {brief['now']}")
    print(sep)

    print(f"\n📍 MILESTONE ATTIVA")
    print(f"  {brief['active_milestone']}")

    print(f"\n⏭  PROSSIMO STEP")
    print(f"  {brief['next_step'] or '— da definire'}")

    print(f"\n🎯 FOCUS OGGI")
    print(f"  {brief['focus_today'] or '— da definire'}")

    print(f"\n📊 PILASTRI")
    print(brief['pillar_lines'])

    print(f"\n🗓  TARGET PROSSIMI")
    print(brief['targets'])

    print(f"\n🔴 BLOCKERS")
    print(brief['blockers'])

    inbox = brief['inbox']
    total_inbox = sum(inbox.values())
    if total_inbox > 0:
        print(f"\n📥 INBOX ({total_inbox} items)")
        print(f"  💡 Idee: {inbox['ideas']}  "
              f"🔗 Link: {inbox['links']}  "
              f"📄 Altro: {inbox['other']}")

    print(f"\n📋 ATTIVITÀ RECENTE")
    recent = brief['recent_activity'].strip()
    if recent:
        for line in recent.split("\n")[-8:]:
            print(f"  {line.rstrip()}")
    else:
        print("  (nessuna)")

    print(f"\n{sep}")
    print(f"  Sessioni totali: {brief['session_count']}")
    print(f"  Ultimo save: {brief['last_update'][:16]}")
    print(sep)

    print(f"\n{'─'*56}")
    print("  PROMPT PRE-COMPILATO (copia in Claude/Cursor):")
    print(f"{'─'*56}")
    print(brief['prompt'])
    print(f"{'─'*56}\n")


# ============================================================
# SALVATAGGIO BRIEF IN INBOX
# ============================================================

def _cleanup_old_briefs(keep: int = 10):
    """Mantieni solo gli ultimi N brief in INBOX, elimina i più vecchi."""
    if not INBOX_DIR.exists():
        return
    briefs = sorted(
        INBOX_DIR.glob("session_brief_*.md"),
        key=lambda p: p.stat().st_mtime,
        reverse=True
    )
    for old in briefs[keep:]:
        old.unlink()


def save_brief_to_inbox(brief: dict):
    """
    Salva il brief come file .md nella INBOX.
    Mantiene solo gli ultimi 10 brief (pulizia automatica).
    """
    INBOX_DIR.mkdir(parents=True, exist_ok=True)
    fname = f"session_brief_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    fpath = INBOX_DIR / fname

    content = f"""# SESSION BRIEF — {brief['now']}

## Milestone attiva
{brief['active_milestone']}

## Prossimo step
{brief['next_step'] or '— da definire'}

## Focus oggi
{brief['focus_today'] or '— da definire'}

## Pilastri
{brief['pillar_lines']}

## Target prossimi
{brief['targets']}

## Blockers
{brief['blockers']}

## Prompt sessione
```
{brief['prompt']}
```
"""
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)

    # Pulizia automatica: tieni solo gli ultimi 10 brief
    _cleanup_old_briefs(keep=10)

    return fpath


# ============================================================
# MAIN
# ============================================================

def main():
    """Entry point: genera e mostra il brief di sessione."""

    # Output UTF-8 robusto: la console Windows cp1252 va in crash sui box-drawing (═, —, →).
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    brief = generate_brief()
    print_brief(brief)
    saved = save_brief_to_inbox(brief)

    print(f"Brief salvato: INBOX/{saved.name}\n")


if __name__ == "__main__":
    main()
