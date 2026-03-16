"""
========================================================
TITANIUM_OS — GESTIONE PERMESSI ACL (#23)
Modulo    : acl_manager.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Legge i metadati del frontmatter di un .md
            (campo 'accesso') e imposta i permessi NTFS
            corrispondenti su Windows.
            Solo per file con frontmatter esplicito.
Input     : file_path (str)
Output    : permessi NTFS modificati + log
Avvio     : python acl_manager.py --file BRAIN/STATE.json
            python acl_manager.py --scan (applica a tutti)
Dipendenze: pywin32 — pip install pywin32
========================================================
"""

import re
import sys
import logging
import argparse
from pathlib import Path

ROOT     = Path(__file__).resolve().parent.parent.parent
LOG_PATH = ROOT / "DATA" / "logs" / "acl_manager.log"

# Mappatura frontmatter 'accesso' → preset permessi
# Formato: (read_only, hide_from_others)
ACCESS_PRESETS = {
    "pubblico":  {"read_only": False, "hidden": False},
    "privato":   {"read_only": True,  "hidden": True},
    "sola_lettura": {"read_only": True, "hidden": False},
    "archivio":  {"read_only": True,  "hidden": False},
}

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [ACL_MANAGER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("acl_manager")


def _read_access_from_frontmatter(file_path: Path) -> str | None:
    """
    Legge il campo 'accesso' dal frontmatter YAML.
    Ritorna il valore o None se assente.
    """
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError:
        return None

    if not content.startswith("---"):
        return None

    for line in content.splitlines()[1:]:
        if line.strip() == "---":
            break
        m = re.match(r'^accesso\s*:\s*(.+)', line.strip())
        if m:
            return m.group(1).strip().lower()

    return None


def _set_readonly(file_path: Path, readonly: bool):
    """Imposta o rimuove l'attributo read-only su Windows."""
    import stat
    current = file_path.stat().st_mode
    if readonly:
        # Rimuovi write permission
        new_mode = current & ~(stat.S_IWRITE | stat.S_IWGRP | stat.S_IWOTH)
    else:
        # Aggiungi write permission
        new_mode = current | stat.S_IWRITE
    file_path.chmod(new_mode)


def _set_hidden(file_path: Path, hidden: bool):
    """Imposta l'attributo hidden su Windows tramite win32api."""
    try:
        import win32api
        import win32con
        attrs = win32api.GetFileAttributes(str(file_path))
        if hidden:
            win32api.SetFileAttributes(str(file_path),
                                       attrs | win32con.FILE_ATTRIBUTE_HIDDEN)
        else:
            win32api.SetFileAttributes(str(file_path),
                                       attrs & ~win32con.FILE_ATTRIBUTE_HIDDEN)
    except ImportError:
        log.warning("pywin32 non installato — attributo hidden non applicabile. "
                    "Installa: pip install pywin32")
    except Exception as e:
        log.error(f"Set hidden fallito per {file_path.name}: {e}")


def apply_acl(file_path: Path) -> bool:
    """
    Legge il frontmatter e applica i permessi corrispondenti.
    Ritorna True se sono stati applicati permessi.
    """
    access = _read_access_from_frontmatter(file_path)
    if not access:
        return False  # nessun frontmatter 'accesso' — skip

    preset = ACCESS_PRESETS.get(access)
    if not preset:
        log.warning(f"{file_path.name}: valore 'accesso' non riconosciuto: '{access}'")
        return False

    try:
        _set_readonly(file_path, preset["read_only"])
        _set_hidden(file_path, preset["hidden"])
        log.info(f"ACL applicato: {file_path.relative_to(ROOT)} → {access} "
                 f"(readonly={preset['read_only']}, hidden={preset['hidden']})")
        return True
    except Exception as e:
        log.error(f"ACL fallito per {file_path.name}: {e}")
        return False


def scan_and_apply():
    """Applica ACL a tutti i .md con frontmatter 'accesso'."""
    skip_dirs = {"BACKUPS", "VERSIONS", "__pycache__", ".git"}
    count = 0
    for f in ROOT.rglob("*.md"):
        skip = any(p in skip_dirs for p in f.relative_to(ROOT).parts)
        if not skip and apply_acl(f):
            count += 1
    log.info(f"ACL applicato a {count} file.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gestione permessi ACL per file .md")
    parser.add_argument("--file", type=str, help="File specifico")
    parser.add_argument("--scan", action="store_true", help="Applica a tutti i .md")
    args = parser.parse_args()

    if args.scan:
        scan_and_apply()
    elif args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        apply_acl(path)
    else:
        parser.print_help()
