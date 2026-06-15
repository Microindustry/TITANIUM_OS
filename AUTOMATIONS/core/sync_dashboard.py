# sync_dashboard.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-06-09
# Sync INCREMENTALE a fine sessione (hook Stop) + utile a mano.
# Tiene la dashboard allineata senza intervento: rebuild STORIE (episodes.json) +
# refresh CRITICHE (bussola_todos.json). Lavora SOLO se le sorgenti sono cambiate
# (mtime), così l'hook resta quasi istantaneo. Non fallisce mai (exit 0).

import sys
import hashlib
import subprocess
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
PY = sys.executable


def _changed_by_hash(src: Path, stamp: Path) -> bool:
    """True se il contenuto di src è cambiato dall'ultimo sync (ignora l'mtime,
    che un linter TOC ritocca di continuo). Aggiorna lo stamp se cambiato."""
    try:
        h = hashlib.md5(src.read_bytes()).hexdigest()
    except OSError:
        return False
    prev = stamp.read_text(encoding="utf-8").strip() if stamp.exists() else ""
    if h != prev:
        try:
            stamp.write_text(h, encoding="utf-8")
        except OSError:
            pass
        return True
    return False


def _newer_than(paths, target: Path) -> bool:
    tm = target.stat().st_mtime if target.exists() else 0.0
    for p in paths:
        try:
            if p.stat().st_mtime > tm:
                return True
        except OSError:
            continue
    return False


def _run(rel_args: list[str]) -> None:
    try:
        subprocess.run([PY, *rel_args], cwd=str(BASE), timeout=120,
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    except Exception:
        pass


def sync(verbose: bool = False) -> dict:
    did = {"storie": False, "critiche": False, "desktop": False, "pct": False}
    try:
        # 1) STORIE: rebuild episodes.json se un .md episodio è più recente
        ep_dir = BASE / "CONTENT_ENGINE" / "DATABASE" / "episodes"
        ep_json = BASE / "DASHBOARD" / "src" / "data" / "episodes.json"
        if ep_dir.exists() and _newer_than(ep_dir.rglob("*.md"), ep_json):
            _run(["CONTENT_ENGINE/scripts/build_episodes_json.py"])
            did["storie"] = True

        # 2) CRITICHE: refresh bussola_todos.json se il CONTENUTO della bussola è cambiato
        bussola = BASE / "DA_FARE_FATTO.md"
        todos = BASE / "DATA" / "audit" / "bussola_todos.json"
        stamp = BASE / "DATA" / ".sync_bussola.hash"
        if bussola.exists() and (not todos.exists() or _changed_by_hash(bussola, stamp)):
            _run(["NODES/AUDIT_AGENT/night_audit.py", "--bussola-only"])
            did["critiche"] = True

        # 3) DESKTOP: mirror PURO di DA_FARE_FATTO.md (il PIANO vive in PROSSIMA_SESSIONE.md)
        desk = Path.home() / "Desktop" / "da fare e cosa ho fatto.txt"
        if bussola.exists():
            src = bussola.read_text(encoding="utf-8")
            cur = desk.read_text(encoding="utf-8") if desk.exists() else None
            if cur != src:
                desk.write_text(src, encoding="utf-8")
                did["desktop"] = True

        # 4) PERCENTUALI: riallinea i pilastri della dashboard (MappaView + PILLARS_DATA
        # + ROOT) alla FONTE UNICA STATE.json. Solo se STATE e' cambiato. Agente
        # NODES/PCT_SYNC/pct_sync.py: sostituisce solo cifre -> non rompe il TS.
        state = BASE / "BRAIN" / "STATE.json"
        pstamp = BASE / "DATA" / ".sync_pct.hash"
        if state.exists() and _changed_by_hash(state, pstamp):
            _run(["NODES/PCT_SYNC/pct_sync.py", "--fix", "--quiet"])
            did["pct"] = True
    except Exception:
        pass
    if verbose:
        print(f"sync: storie={'rebuilt' if did['storie'] else 'ok'} · "
              f"critiche={'refreshed' if did['critiche'] else 'ok'} · "
              f"desktop={'mirrored' if did['desktop'] else 'ok'} · "
              f"pct={'synced' if did['pct'] else 'ok'}")
    return did


if __name__ == "__main__":
    sync(verbose="--quiet" not in sys.argv)
    sys.exit(0)
