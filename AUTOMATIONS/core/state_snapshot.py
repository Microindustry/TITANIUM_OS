# state_snapshot.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-07-07
"""
Snapshot GIORNALIERO di BRAIN/STATE.json in _VAULT/BACKUPS/state_snapshots/.

Nato dal clobber del 07/07: quando state_updater ha sovrascritto STATE col
template default, NON esisteva nessuna copia (ne' git fresco, ne' BACKUPS) —
le 68 milestone si sono salvate solo perche' erano nel contesto della sessione.
La scrittura atomica cura la miccia; questo cura il caso "comunque perso".

Rotazione: ultimi KEEP giorni (1 file al giorno, riesecuzioni sovrascrivono).
Chiamato da night_push.bat prima della retention. Idempotente.
"""

import json
import shutil
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATE = ROOT / "BRAIN" / "STATE.json"
SNAP_DIR = ROOT / "_VAULT" / "BACKUPS" / "state_snapshots"
KEEP = 14


def run() -> Path | None:
    if not STATE.exists():
        print("[state_snapshot] STATE.json assente - skip")
        return None
    # valida PRIMA di copiare: uno snapshot corrotto e' peggio di nessuno snapshot
    try:
        data = json.loads(STATE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as e:
        print(f"[state_snapshot] STATE.json illeggibile ({e}) - NON snapshotto")
        return None
    n_mile = len(data.get("milestones", {}).get("verified", []))

    SNAP_DIR.mkdir(parents=True, exist_ok=True)
    dest = SNAP_DIR / f"STATE_{datetime.now():%Y%m%d}.json"
    shutil.copy2(STATE, dest)

    snaps = sorted(SNAP_DIR.glob("STATE_*.json"))
    for old in snaps[:-KEEP]:
        old.unlink()
    print(f"[state_snapshot] {dest.name} ({n_mile} milestone) | tenuti {min(len(snaps), KEEP)}/{KEEP}")
    return dest


if __name__ == "__main__":
    run()
