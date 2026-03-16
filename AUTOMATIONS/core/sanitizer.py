"""
========================================================
TITANIUM_OS — SANITIZZAZIONE DATI SENSIBILI (#16)
Modulo    : sanitizer.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Scansiona i file .md e .json di TITANIUM_OS
            per identificare stringhe sensibili (API keys,
            token, credenziali, PII) prima della sync cloud.
            Non modifica i file — segnala e blocca.
Input     : nessuno (scansione completa) o path specifico
Output    : report in DATA/sanitizer_report.json
            log in DATA/logs/sanitizer.log
Avvio     : python sanitizer.py
            python sanitizer.py --path BRAIN/STATE.json
========================================================
"""

import os
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

ROOT        = Path(__file__).resolve().parent.parent.parent
LOG_PATH    = ROOT / "DATA" / "logs" / "sanitizer.log"
REPORT_PATH = ROOT / "DATA" / "sanitizer_report.json"

# Estensioni da scansionare
SCAN_EXTENSIONS = {".md", ".json", ".txt", ".env", ".yaml", ".yml"}

# Cartelle da saltare nella scansione
SKIP_DIRS = {
    "BACKUPS", "VERSIONS", "__pycache__", ".git",
    "node_modules", ".venv", "venv",
}

# ============================================================
# PATTERN SENSIBILI
# Pattern: (nome, regex, gravità)
# gravità: CRITICAL | HIGH | MEDIUM
# ============================================================

SENSITIVE_PATTERNS = [
    # API Keys generiche (lunghezza 20-64 char alfanumerici con trattini/underscore)
    ("API_KEY_GENERIC",
     r'(?i)(api[_\-]?key|apikey)\s*[:=]\s*["\']?([A-Za-z0-9_\-]{20,64})["\']?',
     "CRITICAL"),

    # OpenAI / Anthropic
    ("OPENAI_KEY",
     r'sk-[A-Za-z0-9]{20,}',
     "CRITICAL"),
    ("ANTHROPIC_KEY",
     r'sk-ant-[A-Za-z0-9\-_]{20,}',
     "CRITICAL"),

    # Token Bearer
    ("BEARER_TOKEN",
     r'(?i)bearer\s+[A-Za-z0-9_\-\.]{20,}',
     "CRITICAL"),

    # Password in chiaro
    ("PASSWORD_PLAIN",
     r'(?i)(password|passwd|pwd)\s*[:=]\s*["\']?([^\s"\']{8,})["\']?',
     "HIGH"),

    # Token generici
    ("TOKEN_GENERIC",
     r'(?i)(token|secret)\s*[:=]\s*["\']?([A-Za-z0-9_\-\.]{16,})["\']?',
     "HIGH"),

    # Chiavi GitHub / GitLab
    ("GITHUB_TOKEN",
     r'ghp_[A-Za-z0-9]{36}',
     "CRITICAL"),
    ("GITLAB_TOKEN",
     r'glpat-[A-Za-z0-9_\-]{20}',
     "CRITICAL"),

    # Codice fiscale italiano (16 char alfanum)
    ("CODICE_FISCALE",
     r'\b[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]\b',
     "HIGH"),

    # Numero carta di credito
    ("CREDIT_CARD",
     r'\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b',
     "CRITICAL"),

    # IBAN italiano
    ("IBAN",
     r'\bIT\d{2}[A-Z0-9]{23}\b',
     "HIGH"),

    # IP privati con credenziali (user:pass@ip)
    ("CREDENTIAL_IN_URL",
     r'[A-Za-z0-9_\-]+:[A-Za-z0-9_\-@#$%^&*]{6,}@\d{1,3}\.\d{1,3}',
     "CRITICAL"),

    # AWS
    ("AWS_ACCESS_KEY",
     r'AKIA[0-9A-Z]{16}',
     "CRITICAL"),
    ("AWS_SECRET_KEY",
     r'(?i)aws[_\-]?secret[_\-]?access[_\-]?key\s*[:=]\s*["\']?([A-Za-z0-9/+]{40})["\']?',
     "CRITICAL"),
]

# ============================================================
# LOGGING
# ============================================================

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [SANITIZER] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("sanitizer")


# ============================================================
# FUNZIONI
# ============================================================

def _collect_files(target: Path) -> list[Path]:
    """Raccoglie file da scansionare in base a target (file o directory)."""
    if target.is_file():
        return [target] if target.suffix in SCAN_EXTENSIONS else []

    files = []
    for f in target.rglob("*"):
        if not f.is_file():
            continue
        if f.suffix not in SCAN_EXTENSIONS:
            continue
        # Salta directory escluse
        skip = False
        for part in f.relative_to(target).parts:
            if part in SKIP_DIRS:
                skip = True
                break
        if not skip:
            files.append(f)
    return files


def _scan_file(file_path: Path) -> list[dict]:
    """
    Scansiona un singolo file per pattern sensibili.
    Ritorna lista di findings.
    """
    findings = []
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except IOError as e:
        log.warning(f"Impossibile leggere {file_path}: {e}")
        return []

    lines = content.splitlines()
    for line_num, line in enumerate(lines, start=1):
        for pattern_name, regex, severity in SENSITIVE_PATTERNS:
            matches = re.findall(regex, line)
            if matches:
                # Oscura il valore trovato nel report
                redacted_line = re.sub(regex, f"[{pattern_name}_REDACTED]", line)
                findings.append({
                    "pattern": pattern_name,
                    "severity": severity,
                    "line": line_num,
                    "redacted_context": redacted_line.strip()[:120],
                })
    return findings


def run_scan(target_path: Path = None) -> dict:
    """
    Esegue la scansione completa o su un path specifico.
    Ritorna il report completo.
    """
    target = target_path or ROOT
    log.info("=" * 50)
    log.info(f"Avvio scansione: {target}")

    files = _collect_files(target)
    log.info(f"File da scansionare: {len(files)}")

    all_findings = []
    clean_files = 0

    for f in files:
        findings = _scan_file(f)
        if findings:
            rel = str(f.relative_to(ROOT))
            for finding in findings:
                finding["file"] = rel
            all_findings.extend(findings)
            log.warning(f"[TROVATO] {f.relative_to(ROOT)} — "
                        f"{len(findings)} finding(s)")
        else:
            clean_files += 1

    # Raggruppa per gravità
    by_severity = {"CRITICAL": [], "HIGH": [], "MEDIUM": []}
    for f in all_findings:
        by_severity.setdefault(f["severity"], []).append(f)

    report = {
        "timestamp": datetime.now().isoformat(),
        "target": str(target),
        "files_scanned": len(files),
        "files_clean": clean_files,
        "files_with_issues": len(files) - clean_files,
        "total_findings": len(all_findings),
        "by_severity": {k: len(v) for k, v in by_severity.items()},
        "findings": all_findings,
    }

    # Scrivi report
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    # Riepilogo
    log.info(f"Scansione completata.")
    log.info(f"File: {len(files)} | Puliti: {clean_files} | "
             f"Con problemi: {report['files_with_issues']}")
    log.info(f"Findings — CRITICAL: {report['by_severity']['CRITICAL']} | "
             f"HIGH: {report['by_severity']['HIGH']} | "
             f"MEDIUM: {report['by_severity'].get('MEDIUM', 0)}")
    log.info(f"Report salvato: {REPORT_PATH}")
    log.info("=" * 50)

    return report


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="TITANIUM_OS — Sanitizzatore dati sensibili"
    )
    parser.add_argument(
        "--path",
        type=str,
        default=None,
        help="Path specifico da scansionare (default: tutta TITANIUM_OS)"
    )
    args = parser.parse_args()

    target = Path(args.path) if args.path else None
    if target and not target.is_absolute():
        target = ROOT / target  # interpreta come relativo a ROOT

    report = run_scan(target)

    # Exit code 1 se ci sono finding CRITICAL (utile per pre-commit hook)
    if report["by_severity"]["CRITICAL"] > 0:
        sys.exit(1)
    sys.exit(0)
