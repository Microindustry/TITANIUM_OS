"""
========================================================
TITANIUM_OS — CHANGELOG WRITER (Automation #3)
Modulo    : changelog_writer.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Input  : event_type (str), file_path (str), timestamp (str),
         dest_path (str, opzionale per MOVED)
Output : aggiunge riga a VERSIONS/changelog.md
         con data, ora, file, tipo evento
Chiamato da: watcher.py ad ogni evento file rilevante
========================================================
"""

import os
import json
import logging
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
CHANGELOG_PATH = ROOT / "VERSIONS" / "changelog.md"

# Dimensione massima changelog (righe) prima di archiviare
MAX_CHANGELOG_LINES = 2000

# Emoji per tipo evento — rende il changelog leggibile a colpo d'occhio
EVENT_ICONS = {
    "MODIFIED": "✏️",
    "CREATED":  "✨",
    "DELETED":  "🗑️",
    "MOVED":    "➡️",
}

# Nomi file "importanti" — mostrati in grassetto nel changelog
IMPORTANT_FILES = {
    "CLAUDE.md", "STATE.json", "projects.json",
    "milestones.json", "RULES.md",
}

log = logging.getLogger("changelog")


# ============================================================
# FUNZIONI
# ============================================================

def _format_entry(event_type: str, file_path: str, timestamp: str,
                  dest_path: str = None) -> str:
    """
    Genera una riga formattata per il changelog.
    Formato: `[DATA ORA] ICON TIPO — file_path`
    """
    # Formato data leggibile
    try:
        dt = datetime.fromisoformat(timestamp)
        date_str = dt.strftime("%Y-%m-%d %H:%M:%S")
    except ValueError:
        date_str = timestamp

    icon = EVENT_ICONS.get(event_type, "•")
    p = Path(file_path)

    # Grassetto per file importanti
    fname_display = f"**{file_path}**" if p.name in IMPORTANT_FILES else file_path

    # Entry base
    entry = f"- `{date_str}` {icon} {event_type} — {fname_display}"

    # Se è uno spostamento, aggiungi destinazione
    if event_type == "MOVED" and dest_path:
        entry += f" → `{dest_path}`"

    return entry + "\n"


def _get_current_day_header(timestamp: str) -> str:
    """Genera l'intestazione del giorno nel formato ## YYYY-MM-DD."""
    try:
        dt = datetime.fromisoformat(timestamp)
        return f"\n## {dt.strftime('%Y-%m-%d')}\n\n"
    except ValueError:
        return f"\n## {datetime.now().strftime('%Y-%m-%d')}\n\n"


def _day_header_exists(content: str, timestamp: str) -> bool:
    """Controlla se l'intestazione del giorno corrente è già nel changelog."""
    try:
        dt = datetime.fromisoformat(timestamp)
        header = f"## {dt.strftime('%Y-%m-%d')}"
    except ValueError:
        header = f"## {datetime.now().strftime('%Y-%m-%d')}"
    return header in content


def _archive_old_changelog():
    """
    Archivia il changelog se supera MAX_CHANGELOG_LINES.
    Sposta il contenuto vecchio in VERSIONS/changelog_archive_[data].md
    """
    if not CHANGELOG_PATH.exists():
        return

    with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Archivia SOLO con overflow sostanziale (a chunk), non a ogni evento.
    # Prima archiviava le ~3 righe oltre 2000 ad OGNI modifica file -> 1 archivio
    # per evento (centinaia di file). Ora scatta a 3000 e archivia ~1000 righe.
    ARCHIVE_TRIGGER = MAX_CHANGELOG_LINES + 1000   # 3000
    if len(lines) <= ARCHIVE_TRIGGER:
        return

    # Archivia: prendi le righe più vecchie
    archive_lines = lines[:-MAX_CHANGELOG_LINES]
    keep_lines = lines[-MAX_CHANGELOG_LINES:]

    archive_name = f"changelog_archive_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    archive_path = ROOT / "VERSIONS" / archive_name

    with open(archive_path, "w", encoding="utf-8") as f:
        f.writelines(archive_lines)

    with open(CHANGELOG_PATH, "w", encoding="utf-8") as f:
        f.write("# TITANIUM_OS — CHANGELOG\n")
        f.write(f"*Archiviato: {archive_name}*\n\n")
        f.writelines(keep_lines)

    log.info(f"[CHANGELOG] Archiviato in {archive_name}")


# ============================================================
# FUNZIONE PRINCIPALE — chiamata da watcher.py
# ============================================================

def write_changelog_entry(event_type: str, file_path: str, timestamp: str,
                          dest_path: str = None):
    """
    Aggiunge una riga al changelog.

    Args:
        event_type : tipo evento ("MODIFIED", "CREATED", ecc.)
        file_path  : path relativo del file (da ROOT)
        timestamp  : timestamp ISO dell'evento
        dest_path  : path destinazione (solo per MOVED)
    """

    # Assicurati che la cartella VERSIONS esista
    CHANGELOG_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Leggi changelog esistente (o crea header iniziale)
    if CHANGELOG_PATH.exists():
        with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        content = "# TITANIUM_OS — CHANGELOG\n"

    # Aggiungi header del giorno se non esiste già
    if not _day_header_exists(content, timestamp):
        content += _get_current_day_header(timestamp)

    # Genera e aggiungi la nuova entry
    entry = _format_entry(event_type, file_path, timestamp, dest_path)
    content += entry

    # Scrivi
    try:
        with open(CHANGELOG_PATH, "w", encoding="utf-8") as f:
            f.write(content)
    except IOError as e:
        log.error(f"Changelog write errore: {e}")
        return

    # Archivia se troppo grande
    _archive_old_changelog()


# ============================================================
# FUNZIONE MANUALE: aggiunge nota custom al changelog
# ============================================================

def write_manual_entry(message: str, category: str = "NOTE"):
    """
    Aggiunge una nota manuale al changelog.
    Uso: write_manual_entry("V32 Config G completata", "MILESTONE")

    Args:
        message  : testo della nota
        category : categoria (MILESTONE, NOTE, DECISION, ecc.)
    """
    timestamp = datetime.now().isoformat()
    icons = {
        "MILESTONE": "🏁",
        "DECISION":  "⚡",
        "NOTE":      "📝",
        "BUY":       "💳",
        "ERROR":     "❌",
        "FIX":       "🔧",
    }
    icon = icons.get(category, "📝")

    entry = f"- `{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}` {icon} **{category}** — {message}\n"

    CHANGELOG_PATH.parent.mkdir(parents=True, exist_ok=True)

    if CHANGELOG_PATH.exists():
        with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        content = "# TITANIUM_OS — CHANGELOG\n"

    if not _day_header_exists(content, timestamp):
        content += _get_current_day_header(timestamp)

    content += entry

    with open(CHANGELOG_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    log.info(f"[CHANGELOG] Nota manuale: {category} — {message}")


# ============================================================
# TEST STANDALONE
# ============================================================
if __name__ == "__main__":
    ts = datetime.now().isoformat()
    write_changelog_entry("MODIFIED", "BRAIN/CLAUDE.md", ts)
    write_changelog_entry("CREATED", "PILLARS/V32/config_g_notes.md", ts)
    write_manual_entry("Test manuale changelog", "NOTE")
    log.info("Changelog scritto in: %s", CHANGELOG_PATH)
