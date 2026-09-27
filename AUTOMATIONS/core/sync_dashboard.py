# sync_dashboard.py | TITANIUM_OS / AUTOMATIONS / core | v1.1 | 2026-09-27
# Sync INCREMENTALE a fine turno (hook Stop globale, ~/.claude/hooks/stop_titanium.sh)
# + utile a mano. Tiene la dashboard allineata senza intervento: rebuild STORIE
# (episodes.json) + refresh CRITICHE (bussola_todos.json). Lavora SOLO se le sorgenti
# sono cambiate (mtime/hash), così l'hook resta quasi istantaneo. Non fallisce mai (exit 0).
# v1.1 (#73): bussola = DA_FARE.md, specchio Desktop "da fare.txt", .graphifyignore
#   derivato da .gitignore. Lo specchio era fermo al 16/07 perche' l'hook Stop di
#   progetto ("cmd /c ...") da Git Bash non partiva piu': ora l'hook e' globale.
#   Ogni passo ha il suo try: un errore in uno non deve spegnere gli altri in silenzio.

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


def _graphifyignore() -> bool:
    """R4 (#73): .graphifyignore = regole di .gitignore + archivi fuori lettura.
    graphify, se trova .graphifyignore, NON legge piu' .gitignore: per questo il
    file le ricopia (derivato, non scritto a mano) invece di elencare solo gli archivi."""
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from fuori_lettura import PATTERN
    gi = BASE / ".gitignore"
    out = BASE / ".graphifyignore"
    body = gi.read_text(encoding="utf-8") if gi.exists() else ""
    text = ("# .graphifyignore | GENERATO da AUTOMATIONS/core/sync_dashboard.py - non editare a mano\n"
            "# graphify, se trova questo file, non legge piu' .gitignore: qui ci sono le sue regole\n"
            "# + gli archivi che non devono pesare nel grafo (fonte: AUTOMATIONS/core/fuori_lettura.py).\n\n"
            "# --- archivi: fuori dal percorso di lettura (R4, #73) ---\n"
            + "\n".join(PATTERN) + "\n\n# --- da .gitignore ---\n" + body)
    cur = out.read_text(encoding="utf-8") if out.exists() else None
    if cur != text:
        out.write_text(text, encoding="utf-8")
        return True
    return False


def sync(verbose: bool = False) -> dict:
    did = {"storie": False, "critiche": False, "desktop": False, "pct": False, "graphify": False}
    bussola = BASE / "DA_FARE.md"

    # 1) STORIE: rebuild episodes.json se un .md episodio è più recente
    try:
        ep_dir = BASE / "CONTENT_ENGINE" / "DATABASE" / "episodes"
        ep_json = BASE / "DASHBOARD" / "src" / "data" / "episodes.json"
        if ep_dir.exists() and _newer_than(ep_dir.rglob("*.md"), ep_json):
            _run(["CONTENT_ENGINE/scripts/build_episodes_json.py"])
            did["storie"] = True
    except Exception:
        pass

    # 2) CRITICHE: refresh bussola_todos.json se il CONTENUTO della bussola è cambiato
    try:
        todos = BASE / "DATA" / "audit" / "bussola_todos.json"
        stamp = BASE / "DATA" / ".sync_bussola.hash"
        if bussola.exists() and (not todos.exists() or _changed_by_hash(bussola, stamp)):
            _run(["NODES/AUDIT_AGENT/night_audit.py", "--bussola-only"])
            did["critiche"] = True
    except Exception:
        pass

    # 3) DESKTOP: specchio PURO di DA_FARE.md (il piano vivo e' la SCALETTA dentro la bussola)
    try:
        desk = Path.home() / "Desktop" / "da fare.txt"
        if bussola.exists():
            src = bussola.read_text(encoding="utf-8")
            cur = desk.read_text(encoding="utf-8") if desk.exists() else None
            if cur != src:
                desk.write_text(src, encoding="utf-8")
                did["desktop"] = True
    except Exception:
        pass

    # 4) PERCENTUALI: riallinea i pilastri della dashboard (MappaView + PILLARS_DATA
    # + ROOT) alla FONTE UNICA STATE.json. Solo se STATE e' cambiato. Agente
    # NODES/PCT_SYNC/pct_sync.py: sostituisce solo cifre -> non rompe il TS.
    try:
        state = BASE / "BRAIN" / "STATE.json"
        pstamp = BASE / "DATA" / ".sync_pct.hash"
        if state.exists() and _changed_by_hash(state, pstamp):
            _run(["NODES/PCT_SYNC/pct_sync.py", "--fix", "--quiet"])
            did["pct"] = True
    except Exception:
        pass

    # 5) GRAPHIFY: archivi fuori dal grafo (R4)
    try:
        did["graphify"] = _graphifyignore()
    except Exception:
        pass

    if verbose:
        print(f"sync: storie={'rebuilt' if did['storie'] else 'ok'} · "
              f"critiche={'refreshed' if did['critiche'] else 'ok'} · "
              f"desktop={'mirrored' if did['desktop'] else 'ok'} · "
              f"pct={'synced' if did['pct'] else 'ok'} · "
              f"graphify={'rewritten' if did['graphify'] else 'ok'}")
    return did


if __name__ == "__main__":
    sync(verbose="--quiet" not in sys.argv)
    sys.exit(0)
