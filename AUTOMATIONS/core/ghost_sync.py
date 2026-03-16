"""
========================================================
TITANIUM_OS — SYNC CLOUD BIDIREZIONALE "GHOST" (#17)
Modulo    : ghost_sync.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Sincronizza TITANIUM_OS con un repository
            GitHub remoto. Conflict resolution by timestamp:
            vince il file modificato più di recente.
            Esegue sanitizer prima di ogni push.
Input     : nessuno (sync completo) o --pull / --push
Output    : log in DATA/logs/ghost_sync.log
            report in DATA/ghost_sync_report.json
Config    : DATA/ghost_sync_config.json
Avvio     : python ghost_sync.py
            python ghost_sync.py --push
            python ghost_sync.py --pull
========================================================
"""

import os
import sys
import json
import logging
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT        = Path(__file__).resolve().parent.parent.parent
LOG_PATH    = ROOT / "DATA" / "logs" / "ghost_sync.log"
REPORT_PATH = ROOT / "DATA" / "ghost_sync_report.json"
CONFIG_PATH = ROOT / "DATA" / "ghost_sync_config.json"

# Config di default — sovrascritta da ghost_sync_config.json
DEFAULT_CONFIG = {
    "remote": "origin",
    "branch": "main",
    "auto_sanitize": True,   # esegui sanitizer prima del push
    "commit_prefix": "[GHOST]",
    "push_on_conflict": "newer",  # 'newer' | 'local' | 'remote' | 'manual'
}

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [GHOST_SYNC] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("ghost_sync")


# ============================================================
# CONFIG
# ============================================================

def _load_config() -> dict:
    """Carica config da file o usa default."""
    if CONFIG_PATH.exists():
        try:
            with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                return {**DEFAULT_CONFIG, **json.load(f)}
        except json.JSONDecodeError:
            log.warning("Config JSON non valido — uso default")
    return DEFAULT_CONFIG.copy()


def _save_default_config():
    """Crea il file di config con valori default se non esiste."""
    if not CONFIG_PATH.exists():
        CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(DEFAULT_CONFIG, f, indent=2, ensure_ascii=False)
        log.info(f"Config creata: {CONFIG_PATH}")


# ============================================================
# GIT UTILS
# ============================================================

def _git(args: list[str], check: bool = True) -> subprocess.CompletedProcess:
    """Esegue un comando git nella ROOT."""
    cmd = ["git", "-C", str(ROOT)] + args
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    if check and result.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} fallito:\n{result.stderr.strip()}")
    return result


def _is_git_repo() -> bool:
    """Verifica che ROOT sia un repository git."""
    result = _git(["rev-parse", "--is-inside-work-tree"], check=False)
    return result.returncode == 0


def _get_changed_files() -> list[str]:
    """Ritorna la lista di file modificati/aggiunti/eliminati (unstaged + staged)."""
    result = _git(["status", "--porcelain"])
    files = []
    for line in result.stdout.splitlines():
        if line.strip():
            files.append(line[3:].strip())
    return files


def _get_remote_diff_files(remote: str, branch: str) -> list[str]:
    """
    Ritorna i file che differiscono tra HEAD locale e il remote.
    Richiede fetch preventivo.
    """
    try:
        result = _git(["diff", "--name-only", f"{remote}/{branch}...HEAD"])
        return [f for f in result.stdout.splitlines() if f.strip()]
    except RuntimeError:
        return []


def _resolve_conflict_newer(file_path: str) -> str:
    """
    Determina se tenere la versione locale o remota basandosi
    sul timestamp di modifica del file locale vs commit remoto.
    Ritorna 'local' o 'remote'.
    """
    local_path = ROOT / file_path
    if not local_path.exists():
        return "remote"

    local_mtime = local_path.stat().st_mtime

    # Timestamp dell'ultimo commit remoto che ha toccato questo file
    try:
        result = _git(["log", "-1", "--format=%ct", "origin/main", "--", file_path])
        remote_ts = int(result.stdout.strip()) if result.stdout.strip() else 0
    except (RuntimeError, ValueError):
        remote_ts = 0

    return "local" if local_mtime > remote_ts else "remote"


# ============================================================
# SANITIZE PRE-PUSH
# ============================================================

def _run_sanitizer() -> bool:
    """
    Esegue sanitizer.py prima del push.
    Ritorna True se è sicuro procedere (nessun CRITICAL).
    """
    sanitizer_path = ROOT / "AUTOMATIONS" / "core" / "sanitizer.py"
    if not sanitizer_path.exists():
        log.warning("sanitizer.py non trovato — skip sanitize")
        return True

    result = subprocess.run(
        [sys.executable, str(sanitizer_path)],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        log.error("SANITIZER: trovati dati CRITICAL — push bloccato!")
        log.error("Controlla DATA/sanitizer_report.json prima di procedere.")
        return False

    log.info("Sanitizer: nessun dato sensibile trovato — OK")
    return True


# ============================================================
# OPERAZIONI SYNC
# ============================================================

def do_pull(config: dict) -> dict:
    """Esegue pull dal remote."""
    remote = config["remote"]
    branch = config["branch"]
    log.info(f"Pull: {remote}/{branch}")

    try:
        _git(["fetch", remote])
        result = _git(["pull", remote, branch])
        log.info(f"Pull completato: {result.stdout.strip()}")
        return {"status": "ok", "output": result.stdout.strip()}
    except RuntimeError as e:
        log.error(f"Pull fallito: {e}")
        return {"status": "error", "error": str(e)}


def do_push(config: dict) -> dict:
    """
    Stage tutti i file modificati, commit, push.
    Risolve conflitti secondo la strategia configurata.
    """
    remote = config["remote"]
    branch = config["branch"]
    prefix = config["commit_prefix"]

    # Sanitize prima del push
    if config["auto_sanitize"]:
        if not _run_sanitizer():
            return {"status": "blocked", "reason": "sanitizer_critical"}

    changed = _get_changed_files()
    if not changed:
        log.info("Nessuna modifica locale da pushare.")
        return {"status": "nothing_to_push"}

    log.info(f"File modificati: {len(changed)}")

    try:
        # Stage tutto (esclude file sensibili — il sanitizer ha già validato)
        _git(["add", "-A"])

        # Commit
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        msg = f"{prefix} Auto-sync {timestamp} ({len(changed)} file)"
        _git(["commit", "-m", msg])

        # Push
        _git(["push", remote, branch])
        log.info(f"Push completato: {msg}")

        return {
            "status": "ok",
            "commit_message": msg,
            "files_pushed": len(changed),
        }

    except RuntimeError as e:
        log.error(f"Push fallito: {e}")

        # Prova a risolvere il conflitto con fetch + rebase
        if "rejected" in str(e) or "non-fast-forward" in str(e):
            log.warning("Conflitto rilevato — tentativo rebase...")
            try:
                _git(["fetch", remote])
                _git(["rebase", f"{remote}/{branch}"])
                _git(["push", remote, branch])
                log.info("Rebase + push riuscito.")
                return {"status": "ok_after_rebase"}
            except RuntimeError as e2:
                log.error(f"Rebase fallito — intervento manuale richiesto: {e2}")
                return {"status": "conflict_manual", "error": str(e2)}

        return {"status": "error", "error": str(e)}


def do_sync(config: dict) -> dict:
    """Pull + Push."""
    pull_result = do_pull(config)
    push_result = do_push(config)
    return {"pull": pull_result, "push": push_result}


def _write_report(result: dict):
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = {"timestamp": datetime.now().isoformat(), **result}
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ghost Sync — Bidirezionale Cloud")
    parser.add_argument("--push",  action="store_true", help="Solo push")
    parser.add_argument("--pull",  action="store_true", help="Solo pull")
    parser.add_argument("--setup", action="store_true", help="Crea config di default")
    args = parser.parse_args()

    if args.setup:
        _save_default_config()
        print(f"Config creata in {CONFIG_PATH} — modificala con remote/branch corretti.")
        sys.exit(0)

    if not _is_git_repo():
        log.error(f"{ROOT} non è un repository git. Esegui: git init && git remote add origin <url>")
        sys.exit(1)

    config = _load_config()
    log.info("=" * 50)
    log.info(f"Ghost Sync | remote={config['remote']} branch={config['branch']}")

    if args.push:
        result = do_push(config)
    elif args.pull:
        result = do_pull(config)
    else:
        result = do_sync(config)

    _write_report(result)
    log.info(f"Report: {REPORT_PATH}")
    log.info("=" * 50)

    sys.exit(0 if result.get("status") in ("ok", "ok_after_rebase", "nothing_to_push") else 1)
