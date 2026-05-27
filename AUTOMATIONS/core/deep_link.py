"""
========================================================
TITANIUM_OS — DEEP-LINK WINDOWS (#24)
Modulo    : deep_link.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Crea shortcut .lnk dinamiche che aprono
            un file .md direttamente nell'ambiente
            preferito (Cursor, Obsidian, VSCode, notepad).
            Le shortcut vengono salvate in DATA/shortcuts/.
Input     : file_path (str) e opzionalmente editor
Output    : .lnk in DATA/shortcuts/
Avvio     : python deep_link.py --file BRAIN/STATE.json
            python deep_link.py --file BRAIN/STATE.json --editor cursor
            python deep_link.py --all
Dipendenze: pywin32 — pip install pywin32
========================================================
"""

import sys
import logging
import argparse
from pathlib import Path

ROOT          = Path(__file__).resolve().parent.parent.parent
SHORTCUTS_DIR = ROOT / "DATA" / "shortcuts"
LOG_PATH      = ROOT / "DATA" / "logs" / "deep_link.log"

# Editor configurabili — percorso eseguibile
EDITORS = {
    "cursor":   str(Path.home() / "AppData" / "Local" / "Programs" / "cursor" / "Cursor.exe"),
    "vscode":   str(Path.home() / "AppData" / "Local" / "Programs" / "Microsoft VS Code" / "Code.exe"),
    "obsidian": str(Path.home() / "AppData" / "Local" / "Obsidian" / "Obsidian.exe"),
    "notepad":  r"C:\Windows\System32\notepad.exe",
}

DEFAULT_EDITOR = "cursor"

SKIP_DIRS = {"BACKUPS", "VERSIONS", "__pycache__", ".git", "node_modules"}

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [DEEP_LINK] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("deep_link")


def create_shortcut(file_path: Path, editor: str = DEFAULT_EDITOR) -> Path | None:
    """
    Crea una shortcut .lnk che apre file_path con l'editor specificato.
    Ritorna il path della shortcut creata.
    """
    try:
        import win32com.client
    except ImportError:
        log.error("pywin32 non installato. Esegui: pip install pywin32")
        return None

    editor_exe = EDITORS.get(editor, EDITORS[DEFAULT_EDITOR])
    editor_path = Path(editor_exe)

    if not editor_path.exists():
        log.warning(f"Editor non trovato: {editor_exe} — uso notepad")
        editor_exe = EDITORS["notepad"]

    SHORTCUTS_DIR.mkdir(parents=True, exist_ok=True)

    # Nome shortcut: nome_file_editor.lnk
    shortcut_name = f"{file_path.stem}_{editor}.lnk"
    shortcut_path = SHORTCUTS_DIR / shortcut_name

    try:
        shell = win32com.client.Dispatch("WScript.Shell")
        shortcut = shell.CreateShortCut(str(shortcut_path))
        shortcut.Targetpath    = editor_exe
        shortcut.Arguments     = f'"{file_path}"'
        shortcut.WorkingDirectory = str(file_path.parent)
        shortcut.Description   = f"TITANIUM_OS — Apri {file_path.name} in {editor}"
        shortcut.save()

        log.info(f"Shortcut creata: {shortcut_name} → {file_path.relative_to(ROOT)}")
        return shortcut_path

    except Exception as e:
        log.error(f"Creazione shortcut fallita: {e}")
        return None


def create_all_shortcuts(editor: str = DEFAULT_EDITOR):
    """Crea shortcut per tutti i .md importanti (BRAIN/, PILLARS/, root)."""
    # Limita alle cartelle più usate — non ha senso per tutti i .md
    target_dirs = [
        ROOT / "BRAIN",
        ROOT / "CORE",
        ROOT / "INBOX",
    ]
    count = 0
    for d in target_dirs:
        if not d.exists():
            continue
        for f in d.rglob("*.md"):
            if create_shortcut(f, editor):
                count += 1
    log.info(f"Shortcut create: {count}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Crea shortcut .lnk per file .md")
    parser.add_argument("--file",   type=str, help="File specifico")
    parser.add_argument("--editor", type=str, default=DEFAULT_EDITOR,
                        choices=list(EDITORS.keys()), help="Editor target")
    parser.add_argument("--all",    action="store_true",
                        help="Crea shortcut per BRAIN/ CORE/ INBOX/")
    args = parser.parse_args()

    if args.all:
        create_all_shortcuts(editor=args.editor)
    elif args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        create_shortcut(path, editor=args.editor)
    else:
        parser.print_help()
