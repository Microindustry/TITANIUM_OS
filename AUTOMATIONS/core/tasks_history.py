# tasks_history.py | TITANIUM_OS / AUTOMATIONS / CORE | v1.0 | 2026-07-09
# Heartbeat della catena notturna (pattern Uptime Kuma, ricognizione #57):
# ogni notte appende l'esito dei task TI_* a DATA/tasks_history.json (max 30 giorni).
# Fonte: /api/tasks/notturne (l'API elevata che gia' interroga Task Scheduler).
# Hook: chiamato in coda alla catena notturna. Se l'API e' giu', esce zitto (exit 0):
# la tacca mancante NEL grafico e' essa stessa il segnale (dead-man visivo).

import json
import sys
import urllib.request
from datetime import date
from pathlib import Path

TI_ROOT = Path(__file__).resolve().parents[2]
TARGET = TI_ROOT / "DATA" / "tasks_history.json"
API = "http://localhost:5001/api/tasks/notturne"
KEEP_DAYS = 30


def main() -> None:
    try:
        with urllib.request.urlopen(API, timeout=20) as r:
            data = json.loads(r.read().decode("utf-8"))
    except Exception as e:
        print(f"[tasks_history] API non raggiungibile ({e}) — nessuna tacca stanotte")
        return
    tasks = data.get("tasks") or {}
    if not tasks:
        print("[tasks_history] risposta vuota — niente da registrare")
        return

    hist = []
    if TARGET.exists():
        try:
            hist = json.loads(TARGET.read_text(encoding="utf-8"))
        except Exception:
            hist = []  # file corrotto: si riparte (e' solo storico di cortesia)

    today = date.today().isoformat()
    entry = {
        "date": today,
        "results": {
            name: {
                "ok": bool(t.get("active")) and "err" not in str(t.get("last_result_label", "")).lower()
                      and "fallito" not in str(t.get("last_result_label", "")).lower(),
                "label": t.get("last_result_label", ""),
                "last_run": t.get("last_run", ""),
            }
            for name, t in tasks.items()
        },
    }
    hist = [h for h in hist if h.get("date") != today] + [entry]
    hist = hist[-KEEP_DAYS:]
    TARGET.write_text(json.dumps(hist, ensure_ascii=False, indent=1), encoding="utf-8")
    ok = sum(1 for r in entry["results"].values() if r["ok"])
    print(f"[tasks_history] {today}: {ok}/{len(entry['results'])} task ok — storico {len(hist)} giorni")


if __name__ == "__main__":
    sys.exit(main())
