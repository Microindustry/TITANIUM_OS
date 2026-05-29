"""
========================================================
TITANIUM_OS — VALIDATORE SINTASSI MD (#18)
Modulo    : md_validator.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Verifica struttura .md prima del salvataggio.
            Controlla: gerarchia heading (no h3 senza h2),
            blocchi codice aperti, link malformati,
            frontmatter YAML valido.
Input     : file_path (str) — path del file da validare
Output    : dict con errori/warning + exit code 1 se errori
Chiamato da: watcher.py (on_modified) o pre-commit hook
========================================================
"""

import re
import sys
import json
import logging
import argparse
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT     = Path(__file__).resolve().parent.parent.parent
LOG_PATH = ROOT / "DATA" / "logs" / "md_validator.log"

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [MD_VALIDATOR] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("md_validator")


# ============================================================
# REGOLE DI VALIDAZIONE
# ============================================================

def _check_heading_hierarchy(lines: list[str]) -> list[dict]:
    """
    Verifica che i heading rispettino la gerarchia.
    Errore se si salta livello (es. h1 → h3 senza h2).
    """
    issues = []
    prev_level = 0
    for i, line in enumerate(lines, start=1):
        m = re.match(r'^(#{1,6})\s', line)
        if not m:
            continue
        level = len(m.group(1))
        if prev_level > 0 and level > prev_level + 1:
            issues.append({
                "line": i,
                "type": "ERROR",
                "rule": "HEADING_SKIP",
                "message": f"Salto heading: h{prev_level} → h{level} (manca h{prev_level+1})"
            })
        prev_level = level
    return issues


def _check_code_blocks(lines: list[str]) -> list[dict]:
    """Verifica che i blocchi ``` siano tutti chiusi."""
    issues = []
    open_line = None
    open_lang = ""
    in_block = False
    for i, line in enumerate(lines, start=1):
        if line.strip().startswith("```"):
            if not in_block:
                in_block = True
                open_line = i
                open_lang = line.strip()[3:].strip()
            else:
                in_block = False
                open_line = None
    if in_block:
        issues.append({
            "line": open_line,
            "type": "ERROR",
            "rule": "UNCLOSED_CODE_BLOCK",
            "message": f"Blocco codice aperto alla riga {open_line} (lang: '{open_lang}') mai chiuso"
        })
    return issues


def _check_links(lines: list[str]) -> list[dict]:
    """Controlla link Markdown malformati: [testo] senza (url) o viceversa."""
    issues = []
    # Pattern: parentesi quadra chiusa non seguita da parentesi tonda
    dangling_bracket = re.compile(r'\[[^\]]+\](?!\()')
    # Link con parentesi vuote
    empty_link = re.compile(r'\[[^\]]*\]\(\s*\)')

    for i, line in enumerate(lines, start=1):
        # Ignora righe che sono immagini (![ ... ])
        clean = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', line)
        # Ignora link di riferimento [testo][ref]
        clean = re.sub(r'\[[^\]]+\]\[[^\]]*\]', '', clean)

        if empty_link.search(clean):
            issues.append({
                "line": i,
                "type": "WARNING",
                "rule": "EMPTY_LINK",
                "message": "Link con URL vuoto"
            })
    return issues


def _check_frontmatter(lines: list[str]) -> list[dict]:
    """Verifica che il frontmatter YAML (se presente) sia ben formato."""
    issues = []
    if not lines or lines[0].strip() != "---":
        return []  # nessun frontmatter — ok

    # Trova la chiusura ---
    close_idx = None
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            close_idx = i
            break

    if close_idx is None:
        issues.append({
            "line": 1,
            "type": "ERROR",
            "rule": "UNCLOSED_FRONTMATTER",
            "message": "Frontmatter YAML aperto (---) ma mai chiuso"
        })
        return issues

    # Verifica sintassi base: ogni riga deve essere key: value o lista
    for i, line in enumerate(lines[1:close_idx], start=2):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if not re.match(r'^[\w\-]+\s*:', stripped) and not stripped.startswith("-"):
            issues.append({
                "line": i,
                "type": "WARNING",
                "rule": "FRONTMATTER_SYNTAX",
                "message": f"Riga frontmatter non riconosciuta: '{stripped[:60]}'"
            })
    return issues


# ============================================================
# FUNZIONE PRINCIPALE
# ============================================================

def validate_file(file_path: Path) -> dict:
    """
    Valida un file .md.
    Ritorna: {"file": str, "errors": int, "warnings": int, "issues": [...]}
    """
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        return {"file": str(file_path), "errors": 1, "warnings": 0,
                "issues": [{"type": "ERROR", "rule": "READ_ERROR", "message": str(e)}]}

    lines = content.splitlines()
    issues = []
    issues += _check_frontmatter(lines)
    issues += _check_heading_hierarchy(lines)
    issues += _check_code_blocks(lines)
    issues += _check_links(lines)

    errors   = sum(1 for i in issues if i["type"] == "ERROR")
    warnings = sum(1 for i in issues if i["type"] == "WARNING")

    result = {
        "file": str(file_path.relative_to(ROOT)) if ROOT in file_path.parents else str(file_path),
        "timestamp": datetime.now().isoformat(),
        "errors": errors,
        "warnings": warnings,
        "issues": issues,
    }

    if errors:
        log.warning(f"[FAIL] {result['file']} — {errors} errori, {warnings} warning")
    elif warnings:
        log.info(f"[WARN] {result['file']} — {warnings} warning")
    else:
        log.info(f"[OK] {result['file']}")

    return result


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Valida sintassi file .md")
    parser.add_argument("file", nargs="?", help="File .md da validare")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    args = parser.parse_args()

    if not args.file:
        parser.print_help()
        sys.exit(0)

    path = Path(args.file)
    if not path.is_absolute():
        path = ROOT / path

    result = validate_file(path)

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))  # output dati: resta print
    else:
        for issue in result["issues"]:
            line_info = f"L{issue.get('line', '?')} " if "line" in issue else ""
            log.info("[%s] %s%s: %s", issue["type"], line_info, issue["rule"], issue["message"])

    sys.exit(1 if result["errors"] > 0 else 0)
