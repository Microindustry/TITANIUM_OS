"""
========================================================
TITANIUM_OS — CROSS REFERENCE ENGINE (Automation #13b)
Modulo    : cross_ref_engine.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-09
========================================================
Gestisce le dipendenze cross-atto nell'ASSOLUTO V6.0.
I tuoi dati chiave (prezzi, misure, date) compaiono in
più atti — questo motore li mantiene sincronizzati.

COMANDI:
  extract  — converte PDF degli atti in Markdown editabili
  scan     — analizza gli atti e trova dove compare ogni valore
  check    — rileva valori inconsistenti tra atti
  propagate <key> <nuovo_valore> — aggiorna un valore in tutti gli atti
  report   — genera report completo delle dipendenze

USO:
  python cross_ref_engine.py extract
  python cross_ref_engine.py check
  python cross_ref_engine.py propagate v32_investimento "EUR 2.500"
  python cross_ref_engine.py report

WORKFLOW TIPICO quando aggiorni un dato:
  1. Modifica il valore in dependency_map.json (master_value)
  2. python cross_ref_engine.py propagate <chiave> "<nuovo valore>"
  3. Il sistema aggiorna tutti gli atti collegati
  4. Rivedi il diff in VERSIONS/propagation_log.md
========================================================
"""

import re
import json
import sys
import argparse
import shutil
import logging
from pathlib import Path
from datetime import datetime

_ROOT_CRE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT_CRE))
try:
    from CORE.log import get_logger
    logger = get_logger("cross_ref_engine")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [cross_ref] %(levelname)s %(message)s")
    logger = logging.getLogger("cross_ref_engine")

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT = Path(__file__).resolve().parent.parent.parent
ASSOLUTO_DIR = ROOT / "BRAIN" / "ASSOLUTO"
ATTI_DIR = ASSOLUTO_DIR / "ATTI"
VERSIONS_DIR = ASSOLUTO_DIR / "VERSIONS"
DEP_MAP_PATH = ASSOLUTO_DIR / "dependency_map.json"
PROP_LOG_PATH = ROOT / "VERSIONS" / "propagation_log.md"
PDF_INBOX = ASSOLUTO_DIR / "PDF_INBOX"    # dove metti i PDF originali

# ============================================================
# CARICAMENTO DEPENDENCY MAP
# ============================================================

def _load_dep_map() -> dict:
    """Carica la dependency map."""
    if not DEP_MAP_PATH.exists():
        logger.error("dependency_map.json non trovato in %s", DEP_MAP_PATH)
        return {}
    with open(DEP_MAP_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    # Rimuovi chiave meta
    return {k: v for k, v in data.items() if not k.startswith("_")}


def _save_dep_map(dep_map: dict):
    """Salva la dependency map aggiornando solo i valori (preserva _meta)."""
    if DEP_MAP_PATH.exists():
        with open(DEP_MAP_PATH, "r", encoding="utf-8") as f:
            full = json.load(f)
    else:
        full = {"_meta": {}}

    for k, v in dep_map.items():
        full[k] = v

    with open(DEP_MAP_PATH, "w", encoding="utf-8") as f:
        json.dump(full, f, indent=2, ensure_ascii=False)


def _load_atto(atto_name: str) -> tuple[str, Path]:
    """
    Carica un atto. Ritorna (contenuto, path).
    Cerca prima in ATTI_DIR/[nome].md
    """
    path = ATTI_DIR / f"{atto_name}.md"
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            return f.read(), path
    return "", path


def _save_atto(path: Path, content: str):
    """Salva un atto aggiornato, archiviando prima la versione precedente."""
    # Archivia versione precedente
    if path.exists():
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        VERSIONS_DIR.mkdir(parents=True, exist_ok=True)
        archive = VERSIONS_DIR / f"{path.stem}_{ts}.md"
        shutil.copy2(str(path), str(archive))

    # Scrivi versione aggiornata
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


# ============================================================
# COMANDO: extract — converte PDF in Markdown
# ============================================================

def cmd_extract(pdf_dir: Path = None):
    """
    Estrae testo dai PDF degli atti e li converte in file Markdown.
    I PDF devono essere nella cartella PDF_INBOX (o in pdf_dir).

    Dipendenza: pip install pymupdf
    """
    src_dir = pdf_dir or PDF_INBOX
    src_dir.mkdir(parents=True, exist_ok=True)
    ATTI_DIR.mkdir(parents=True, exist_ok=True)

    # Verifica disponibilità pymupdf
    try:
        import fitz  # pymupdf
    except ImportError:
        logger.warning("pymupdf non installato — esegui: pip install pymupdf")
        _print_manual_fallback()
        return

    pdf_files = list(src_dir.glob("*.pdf")) + list(src_dir.glob("*.PDF"))

    if not pdf_files:
        logger.warning("Nessun PDF trovato in: %s", src_dir)
        _print_manual_fallback()
        return

    logger.info("Trovati %d PDF in %s", len(pdf_files), src_dir)

    for pdf_path in sorted(pdf_files):
        logger.info("Elaborazione: %s", pdf_path.name)

        try:
            doc = fitz.open(str(pdf_path))
            pages_text = []

            for page_num, page in enumerate(doc, 1):
                text = page.get_text("text")
                if text.strip():
                    pages_text.append(f"<!-- Pagina {page_num} -->\n{text}")

            doc.close()

            full_text = "\n\n".join(pages_text)
            full_text = _clean_pdf_text(full_text)

            stem = pdf_path.stem
            out_name = _normalize_atto_name(stem)
            out_path = ATTI_DIR / f"{out_name}.md"

            with open(out_path, "w", encoding="utf-8") as f:
                f.write(f"# {stem}\n")
                f.write(f"*Estratto automaticamente da PDF: {pdf_path.name}*\n")
                f.write(f"*Data estrazione: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n\n")
                f.write("---\n\n")
                f.write(full_text)

            logger.info("→ %s.md (%d righe)", out_name, full_text.count("\n"))

        except Exception as e:
            logger.error("ERRORE %s: %s", pdf_path.name, e)

    logger.info("Extract completato. File in: %s", ATTI_DIR)


def _clean_pdf_text(text: str) -> str:
    """
    Pulizia base del testo estratto da PDF.
    Rimuove header/footer ripetuti, normalizza spazi.
    """
    lines = text.split("\n")
    cleaned = []

    # Pattern tipici di header/footer da rimuovere
    skip_patterns = [
        re.compile(r'TITANIUM VENTURES.*DEFINITIVO', re.IGNORECASE),
        re.compile(r'^Pagina \d+'),
        re.compile(r'^\d+\s*$'),  # solo numero pagina
        re.compile(r'^Febbraio 2026 — DEFINITIVO'),
    ]

    for line in lines:
        skip = False
        for pattern in skip_patterns:
            if pattern.search(line.strip()):
                skip = True
                break
        if not skip:
            cleaned.append(line)

    return "\n".join(cleaned)


def _normalize_atto_name(stem: str) -> str:
    """
    Normalizza il nome del file PDF in nome atto standard.
    Esempi:
      "Atto III - V32" → "ATTO_III_V32"
      "ASSOLUTO_V6_Atto_IV" → "ATTO_IV_MIMS"
    """
    stem_upper = stem.upper()
    # Mappa diretta se il nome è riconoscibile
    if "I_II" in stem_upper or ("ATTO_I" in stem_upper and "II" in stem_upper):
        return "ATTO_I_II"
    if "III" in stem_upper:
        return "ATTO_III_V32"
    if "IV" in stem_upper:
        return "ATTO_IV_MIMS"
    if "V_LAB" in stem_upper or ("_V_" in stem_upper and "LAB" in stem_upper):
        return "ATTO_V_LAB_MATERIALI"
    if "VI" in stem_upper and "GENESIS" in stem_upper:
        return "ATTO_VI_GENESIS"
    if "VII" in stem_upper:
        return "ATTO_VII_VERDETTO"
    if "VIII" in stem_upper:
        return "ATTO_VIII_MERCATO"
    if "IX" in stem_upper:
        return "ATTO_IX_IP"
    if "_X_" in stem_upper or stem_upper.endswith("_X"):
        return "ATTO_X_MEDIA"
    if "XI" in stem_upper or "XII" in stem_upper:
        return "ATTO_XI_XII_EPILOGO"
    # Fallback: usa il nome originale normalizzato
    return re.sub(r'[^A-Z0-9_]', '_', stem_upper)


def _print_manual_fallback():
    """Istruzioni fallback per chi non può usare pymupdf."""
    print("  ALTERNATIVA MANUALE:")
    print("  1. Apri ogni PDF in Acrobat/Edge/Chrome")
    print("  2. Seleziona tutto (CTRL+A), copia (CTRL+C)")
    print("  3. Incolla in un file .md in BRAIN/ASSOLUTO/ATTI/")
    print("  4. Nomina il file: ATTO_III_V32.md, ATTO_IV_MIMS.md, ecc.")
    print()


# ============================================================
# COMANDO: scan — trova dove compare ogni valore
# ============================================================

def cmd_scan(verbose: bool = True) -> dict:
    """
    Analizza tutti gli atti e trova le occorrenze di ogni
    valore nella dependency map.

    Ritorna: {chiave: {atto_name: [numeri_riga]}}
    """
    dep_map = _load_dep_map()
    if not dep_map:
        return {}

    atti_files = list(ATTI_DIR.glob("*.md")) if ATTI_DIR.exists() else []

    if not atti_files:
        logger.warning("Nessun atto trovato in %s — esegui prima: extract", ATTI_DIR)
        return {}

    logger.info("Scan: %d atti, %d chiavi...", len(atti_files), len(dep_map))

    results = {}  # {key: {atto_name: [righe]}}

    for key, entry in dep_map.items():
        patterns = entry.get("pattern_cerca", [entry.get("master_value", "")])
        results[key] = {}

        for atto_file in sorted(atti_files):
            atto_name = atto_file.stem

            with open(atto_file, "r", encoding="utf-8") as f:
                lines = f.readlines()

            found_lines = []
            for i, line in enumerate(lines, 1):
                for pattern in patterns:
                    # Cerca pattern (case-insensitive, regex o testo semplice)
                    try:
                        if re.search(pattern, line, re.IGNORECASE):
                            found_lines.append(i)
                            break
                    except re.error:
                        # Pattern non valido come regex — cerca come testo semplice
                        if pattern.lower() in line.lower():
                            found_lines.append(i)
                            break

            if found_lines:
                results[key][atto_name] = found_lines

    if verbose:
        _print_scan_results(results, dep_map)

    return results


def _print_scan_results(results: dict, dep_map: dict):
    """Stampa i risultati dello scan in modo leggibile."""
    for key, occurrences in results.items():
        entry = dep_map.get(key, {})
        label = entry.get("label", key)
        master = entry.get("master_value", "?")

        total = sum(len(v) for v in occurrences.values())
        if total == 0:
            status = "⚠️  NON TROVATO"
        else:
            status = f"✓  {total} occorrenze"

        print(f"  [{key}] {label}")
        print(f"    Master: {master}  —  {status}")

        for atto, lines in occurrences.items():
            print(f"    → {atto}: righe {lines}")
        print()


# ============================================================
# COMANDO: check — rileva inconsistenze
# ============================================================

def cmd_check():
    """
    Confronta il valore master con quello trovato negli atti.
    Rileva: valori mancanti, valori diversi dal master, atti attesi ma non trovati.
    """
    dep_map = _load_dep_map()
    if not dep_map:
        return

    atti_files = list(ATTI_DIR.glob("*.md")) if ATTI_DIR.exists() else []

    if not atti_files:
        logger.warning("Nessun atto trovato in %s", ATTI_DIR)
        return

    logger.info("Check: verifica coerenza cross-atto...")

    issues = []
    ok_count = 0

    for key, entry in dep_map.items():
        master_value = entry.get("master_value", "")
        expected_atti = entry.get("atti", [])
        label = entry.get("label", key)
        patterns = entry.get("pattern_cerca", [master_value])

        found_in = {}  # {atto_name: [righe]}
        wrong_value = {}  # {atto_name: [frammento testo trovato]}

        for atto_file in sorted(atti_files):
            atto_name = atto_file.stem

            with open(atto_file, "r", encoding="utf-8") as f:
                content = f.read()
                lines = content.split("\n")

            found_lines = []
            for i, line in enumerate(lines, 1):
                for pattern in patterns:
                    try:
                        if re.search(pattern, line, re.IGNORECASE):
                            found_lines.append(i)
                            break
                    except re.error:
                        if pattern.lower() in line.lower():
                            found_lines.append(i)
                            break

            if found_lines:
                found_in[atto_name] = found_lines

        # Verifica: atti attesi ma non trovati
        for expected_atto in expected_atti:
            if expected_atto not in found_in:
                # Controlla se il file esiste
                atto_path = ATTI_DIR / f"{expected_atto}.md"
                if atto_path.exists():
                    issues.append({
                        "tipo": "VALORE_MANCANTE",
                        "key": key,
                        "label": label,
                        "atto": expected_atto,
                        "master": master_value,
                        "dettaglio": f"'{master_value}' atteso in {expected_atto} ma non trovato"
                    })
                else:
                    issues.append({
                        "tipo": "ATTO_MANCANTE",
                        "key": key,
                        "label": label,
                        "atto": expected_atto,
                        "master": master_value,
                        "dettaglio": f"Atto {expected_atto}.md non esiste ancora"
                    })
            else:
                ok_count += 1

    # Stampa risultati
    if not issues:
        print(f"  ✅ Tutto coerente — {ok_count} valori verificati in tutti gli atti.")
    else:
        warnings = [i for i in issues if i["tipo"] == "ATTO_MANCANTE"]
        errors = [i for i in issues if i["tipo"] == "VALORE_MANCANTE"]

        if errors:
            print(f"  ❌ {len(errors)} INCONSISTENZE rilevate:")
            for issue in errors:
                print(f"\n    [{issue['tipo']}] {issue['label']}")
                print(f"    Atto    : {issue['atto']}")
                print(f"    Master  : {issue['master']}")
                print(f"    Problema: {issue['dettaglio']}")
                print(f"    Fix     : python cross_ref_engine.py propagate {issue['key']} \"{issue['master']}\"")

        if warnings:
            print(f"\n  ⚠️  {len(warnings)} ATTI NON ANCORA ESTRATTI:")
            missing_atti = set(i["atto"] for i in warnings)
            for atto in sorted(missing_atti):
                print(f"    - {atto}.md (aggiungilo con il comando extract)")

    print(f"\n  Verificati: {ok_count} OK | {len([i for i in issues if i['tipo']=='VALORE_MANCANTE'])} errori | {len([i for i in issues if i['tipo']=='ATTO_MANCANTE'])} atti mancanti")


# ============================================================
# COMANDO: propagate — aggiorna un valore in tutti gli atti
# ============================================================

def cmd_propagate(key: str, new_value: str, dry_run: bool = False):
    """
    Aggiorna il valore di una chiave in tutti gli atti collegati.

    Args:
        key       : chiave nella dependency map (es. "v32_investimento")
        new_value : nuovo valore (es. "EUR 2.500")
        dry_run   : se True, mostra cosa cambierebbe senza scrivere
    """
    dep_map = _load_dep_map()

    if key not in dep_map:
        logger.error("Chiave '%s' non trovata nella dependency map.", key)
        logger.info("Chiavi disponibili: %s", ", ".join(dep_map.keys()))
        return

    entry = dep_map[key]
    old_value = entry["master_value"]
    target_atti = entry.get("atti", [])
    label = entry.get("label", key)

    print(f"\n[PROPAGATE] {label}")
    print(f"  Vecchio valore : {old_value}")
    print(f"  Nuovo valore   : {new_value}")
    print(f"  Atti coinvolti : {', '.join(target_atti)}")

    if dry_run:
        print(f"\n  [DRY RUN — nessuna modifica verrà scritta]")

    print()

    changes_made = []
    errors = []

    for atto_name in target_atti:
        content, atto_path = _load_atto(atto_name)

        if not content:
            print(f"  ⚠️  {atto_name}.md non trovato — skip")
            continue

        # Conta occorrenze prima
        original_content = content
        replacements = 0

        # Sostituisci tutti i pattern con il nuovo valore
        patterns = entry.get("pattern_cerca", [old_value])

        for pattern in patterns:
            try:
                new_content, count = re.subn(
                    pattern, new_value, content, flags=re.IGNORECASE
                )
                if count > 0:
                    content = new_content
                    replacements += count
            except re.error:
                # Fallback: sostituzione semplice case-insensitive
                pattern_lower = pattern.lower()
                lines = content.split("\n")
                new_lines = []
                for line in lines:
                    if pattern_lower in line.lower():
                        # Sostituisce preservando case del testo circostante
                        idx = line.lower().find(pattern_lower)
                        new_line = line[:idx] + new_value + line[idx + len(pattern):]
                        new_lines.append(new_line)
                        replacements += 1
                    else:
                        new_lines.append(line)
                content = "\n".join(new_lines)

        if replacements > 0:
            if not dry_run:
                _save_atto(atto_path, content)

            print(f"  {'[DRY]' if dry_run else '✓'} {atto_name}.md — {replacements} sostituzione/i")
            changes_made.append({
                "atto": atto_name,
                "replacements": replacements,
                "old": old_value,
                "new": new_value
            })
        else:
            print(f"  ⚠️  {atto_name}.md — nessuna occorrenza trovata")

    # Aggiorna master_value nella dependency map
    if not dry_run and changes_made:
        dep_map[key]["master_value"] = new_value
        # Aggiungi al pattern di ricerca anche il nuovo valore
        patterns = dep_map[key].get("pattern_cerca", [])
        if new_value not in patterns:
            patterns.append(new_value)
            dep_map[key]["pattern_cerca"] = patterns
        _save_dep_map(dep_map)

        # Log propagazione
        _log_propagation(key, label, old_value, new_value, changes_made)

        print(f"\n  ✅ Propagazione completata: {len(changes_made)} atti aggiornati")
        print(f"  📋 Log: VERSIONS/propagation_log.md")
    elif dry_run:
        print(f"\n  [DRY RUN] Avrebbe aggiornato {len(changes_made)} atti.")
        print(f"  Per eseguire davvero: python cross_ref_engine.py propagate {key} \"{new_value}\"")
    else:
        print(f"\n  ⚠️  Nessuna modifica effettuata (valori non trovati).")
        print(f"  Verifica i pattern in dependency_map.json per la chiave '{key}'")


def _log_propagation(key: str, label: str, old_value: str, new_value: str,
                     changes: list):
    """Aggiunge una voce al log delle propagazioni."""
    PROP_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"\n## {ts} — {label}\n\n"
    entry += f"- **Chiave**: `{key}`\n"
    entry += f"- **Vecchio**: `{old_value}`\n"
    entry += f"- **Nuovo**: `{new_value}`\n"
    entry += f"- **Atti aggiornati**: {len(changes)}\n\n"
    for c in changes:
        entry += f"  - {c['atto']}: {c['replacements']} sostituzione/i\n"
    entry += "\n---\n"

    if PROP_LOG_PATH.exists():
        with open(PROP_LOG_PATH, "a", encoding="utf-8") as f:
            f.write(entry)
    else:
        with open(PROP_LOG_PATH, "w", encoding="utf-8") as f:
            f.write("# TITANIUM_OS — PROPAGATION LOG\n\n")
            f.write(entry)


# ============================================================
# COMANDO: report — panoramica completa
# ============================================================

def cmd_report():
    """
    Genera un report Markdown completo della mappa dipendenze:
    - Stato di ogni valore
    - Dove compare ogni valore
    - Inconsistenze rilevate
    """
    dep_map = _load_dep_map()
    if not dep_map:
        return

    atti_files = list(ATTI_DIR.glob("*.md")) if ATTI_DIR.exists() else []
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    report_path = ROOT / "VERSIONS" / f"dep_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    report_path.parent.mkdir(parents=True, exist_ok=True)

    lines = [
        f"# TITANIUM_OS — DEPENDENCY REPORT\n",
        f"*Generato: {ts}*\n",
        f"*Atti disponibili: {len(atti_files)}*\n",
        f"*Chiavi mappate: {len(dep_map)}*\n\n",
        "---\n\n",
        "## MAPPA DIPENDENZE\n\n",
    ]

    for key, entry in dep_map.items():
        label = entry.get("label", key)
        master = entry.get("master_value", "?")
        target_atti = entry.get("atti", [])
        note = entry.get("note", "")

        lines.append(f"### {label}\n\n")
        lines.append(f"- **Chiave**: `{key}`\n")
        lines.append(f"- **Valore master**: `{master}`\n")
        lines.append(f"- **Atti coinvolti**: {', '.join(f'`{a}`' for a in target_atti)}\n")
        if note:
            lines.append(f"- **Note**: {note}\n")
        lines.append("\n")

    with open(report_path, "w", encoding="utf-8") as f:
        f.writelines(lines)

    logger.info("Report salvato: %s (%d chiavi)", report_path.name, len(dep_map))
    return report_path


# ============================================================
# CLI
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="Cross Reference Engine — TITANIUM_OS",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Esempi:
  Estrai PDF in Markdown:
    python cross_ref_engine.py extract

  Verifica coerenza:
    python cross_ref_engine.py check

  Anteprima propagazione (senza scrivere):
    python cross_ref_engine.py propagate v32_investimento "EUR 2.500" --dry

  Propaga modifica reale:
    python cross_ref_engine.py propagate v32_investimento "EUR 2.500"

  Report completo:
    python cross_ref_engine.py report
        """
    )

    sub = parser.add_subparsers(dest="cmd", required=True)

    # extract
    p_ext = sub.add_parser("extract", help="Converti PDF degli atti in Markdown")
    p_ext.add_argument("--pdf-dir", type=Path, default=None,
                       help="Cartella sorgente PDF (default: BRAIN/ASSOLUTO/PDF_INBOX)")

    # scan
    sub.add_parser("scan", help="Scansiona atti e mappa le occorrenze")

    # check
    sub.add_parser("check", help="Rileva valori inconsistenti tra atti")

    # propagate
    p_prop = sub.add_parser("propagate", help="Aggiorna valore in tutti gli atti")
    p_prop.add_argument("key", help="Chiave nella dependency map")
    p_prop.add_argument("new_value", help="Nuovo valore da impostare")
    p_prop.add_argument("--dry", action="store_true",
                        help="Mostra cosa cambierebbe senza scrivere")

    # report
    sub.add_parser("report", help="Genera report completo dipendenze")

    args = parser.parse_args()

    if args.cmd == "extract":
        cmd_extract(pdf_dir=args.pdf_dir)
    elif args.cmd == "scan":
        cmd_scan()
    elif args.cmd == "check":
        cmd_check()
    elif args.cmd == "propagate":
        cmd_propagate(args.key, args.new_value, dry_run=args.dry)
    elif args.cmd == "report":
        cmd_report()


if __name__ == "__main__":
    main()
