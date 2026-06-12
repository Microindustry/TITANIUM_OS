# stato_fisico.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-06-12
# IL FILE FISICO: scrive uno STATO_SISTEMA.txt umano-leggibile sul Desktop (non solo
# codice/JSON). Si aggiorna ad ogni run e GRIDA quando qualcosa va guardato — risolve
# la cecita' della catena notturna (un task che fallisce era invisibile fino all'audit).
#
# Controlla: servizi vivi (watchdog_status), risultato degli ultimi task notturni
# (schtasks), freschezza dei log. Tutto verde -> "TUTTO OK". Problema -> "DA GUARDARE".
# READ-ONLY sul sistema; scrive solo i file di stato.

import os
import re
import sys
import json
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
LOGS = ROOT / "DATA" / "logs"
WATCHDOG = ROOT / "DATA" / "watchdog_status.json"
DESKTOP = Path(os.environ.get("USERPROFILE", str(Path.home()))) / "Desktop"
OUT_DESKTOP = DESKTOP / "STATO_SISTEMA.txt"
OUT_REPO = ROOT / "DATA" / "stato_sistema.txt"

NIGHT_TASKS = ["TI_StoryAgent", "TI_NightResearch", "TI_NightAudit", "TI_NightPush",
               "TI_DailyBrief", "TI_Watchdog"]
NIGHT_LOGS = ["story_agent.log", "night_research.log", "night_push.log", "night_audit_run.log"]


def task_results() -> list[tuple[str, str, str]]:
    """(nome, esito, ultima_esecuzione) per ogni task notturno via Get-ScheduledTaskInfo
    (JSON affidabile, non testo localizzato di schtasks)."""
    out = []
    for t in NIGHT_TASKS:
        try:
            r = subprocess.run(
                ["powershell", "-NoProfile", "-Command",
                 f"Get-ScheduledTaskInfo -TaskName {t} | "
                 f"Select-Object LastTaskResult,LastRunTime | ConvertTo-Json -Compress"],
                capture_output=True, text=True, encoding="utf-8", errors="replace")
            data = json.loads(r.stdout.strip() or "{}")
            code = data.get("LastTaskResult")
            # 0 = ok; 267009/0x41301 = "in esecuzione" (normale per il Watchdog long-running)
            ok = code in (0, 267009, 0x41301)
            esito = "OK" if ok else f"FALLITO (codice {code})"
            run = ""
            m = re.search(r"/Date\((\d+)", str(data.get("LastRunTime", "")))
            if m:
                run = datetime.fromtimestamp(int(m.group(1)) / 1000).strftime("%d/%m %H:%M")
            out.append((t, esito, run))
        except Exception as e:
            out.append((t, f"non leggibile ({e})", ""))
    return out


def log_alerts() -> tuple[list[str], list[str]]:
    """Righe RECENTI (<36h) nei log notturni, evidence-based. Ritorna (critici, note):
    critici = guasti veri (alzano l'allarme); note = rumore atteso (429/timeout, solo info)."""
    critical, note = [], []
    cutoff = datetime.now() - timedelta(hours=36)
    crit = re.compile(r"Traceback|PermissionError|FileNotFoundError|push fallito|\bFALLITO\b|\bERR:", re.IGNORECASE)
    soft = re.compile(r"\b429\b|rate limit|Too Many Requests|Read timed out|\btimeout\b", re.IGNORECASE)
    daterx = re.compile(r"(\d{4})-(\d{2})-(\d{2})")
    for name in NIGHT_LOGS:
        f = LOGS / name
        if not f.exists():
            continue
        lines = f.read_text(encoding="utf-8", errors="replace").splitlines()[-60:]
        ctx = None
        for ln in lines:
            m = daterx.search(ln)
            if m:
                try: ctx = datetime(int(m[1]), int(m[2]), int(m[3]))
                except ValueError: pass
            if ctx is not None and ctx < cutoff:
                continue
            if crit.search(ln):
                critical.append(f"{name}: {ln.strip()[:90]}")
            elif soft.search(ln):
                note.append(f"{name}: {ln.strip()[:90]}")
    return critical, note


def services() -> list[str]:
    out = []
    if WATCHDOG.exists():
        try:
            data = json.loads(WATCHDOG.read_text(encoding="utf-8"))
            for k, v in data.get("services", {}).items():
                out.append(f"{v.get('label', k)}: {'attivo' if v.get('alive') else 'SPENTO'}")
        except Exception:
            pass
    return out


def main() -> int:
    tasks = task_results()
    critical, note = log_alerts()
    svcs = services()
    task_fail = [t for t in tasks if "FALLITO" in t[1]]
    svc_down = [s for s in svcs if "SPENTO" in s]
    problemi = bool(task_fail or critical or svc_down)   # il rumore atteso (429) non allarma

    L = []
    L.append("=" * 52)
    L.append(" STATO TITANIUM_OS — file fisico (auto-aggiornato)")
    L.append(f" {datetime.now():%A %d %B %Y, %H:%M}")
    L.append("=" * 52)
    L.append("")
    if problemi:
        L.append(">>> ⚠  C'È QUALCOSA DA GUARDARE  <<<")
    else:
        L.append(">>> ✓  TUTTO OK — il sistema gira da solo  <<<")
    L.append("")
    L.append("— Task notturni —")
    for n, esito, run in tasks:
        mark = "✓" if "OK" in esito else "⚠"
        L.append(f"  {mark} {n:18} {esito}   (ultima: {run})")
    L.append("")
    L.append("— Servizi —")
    for s in (svcs or ["(watchdog_status non disponibile)"]):
        L.append(f"  {'⚠' if 'SPENTO' in s else '·'} {s}")
    if critical:
        L.append("")
        L.append("— ⚠ GUASTI dai log (ultime 36h) —")
        for a in critical[:8]:
            L.append(f"  ⚠ {a}")
    if note:
        L.append("")
        L.append("— note (rumore atteso, non urgente) —")
        for a in note[:4]:
            L.append(f"  · {a}")
    L.append("")
    L.append("Questo file si riscrive da solo (catena notturna + watchdog).")
    L.append("Se vedi ⚠, apri DATA/logs/ del task indicato.")
    text = "\n".join(L)

    for out in (OUT_DESKTOP, OUT_REPO):
        try:
            out.write_text(text, encoding="utf-8")
        except Exception as e:
            print(f"[stato_fisico] non ho potuto scrivere {out}: {e}")
    print(text)
    print(f"\n→ scritto: {OUT_DESKTOP}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
