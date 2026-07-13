# caroselli_qc.py | TITANIUM_OS / CONTENT_ENGINE / QC CAROSELLI | v1.0 | 2026-07-13
# QC automatico delle regole caroselli (GUIDA_CAROSELLI.md §5) — eseguibile a mano
# (procedura §4 passo 5) e importato da night_audit (sentinella notturna).
# Regole eseguibili:
#   - file canonici presenti (carosello.html, caption.txt, README.md)
#   - canvas 1080×1350 dichiarato sulle slide (data-canvas-width/height)
#   - conteggio slide: completo ≤17 (16 = standard, 17 = legacy PRE) · social.html ≤10 (IG API)
#   - anti-wireframe: nessun "dashed" negli HTML (slot vuoti vietati — feedback caroselli-ricchi)
#   - self-contained: nessuna <img src="http..."> (Express import + niente dipendenze rete)
# Output: DATA/audit/caroselli_qc.json

import json
import re
import sys
from datetime import datetime
from pathlib import Path

BASE      = Path(__file__).resolve().parents[2]          # TITANIUM_OS
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"
OUT_JSON  = BASE / "DATA" / "audit" / "caroselli_qc.json"

MAX_COMPLETO = 17   # 16 = standard EP; 17 tollerato (PRE legacy)
MAX_SOCIAL   = 10   # limite HARD API Instagram (doc Meta, verificato #56)

RX_SLIDE   = re.compile(r'class="slide"')
RX_CANVAS  = re.compile(r'data-canvas-width="1080"\s+data-canvas-height="1350"')
RX_DASHED  = re.compile(r'dashed')
RX_IMGHTTP = re.compile(r'<img[^>]+src="http')

CANONICI = ["carosello.html", "caption.txt", "README.md"]


def _check_html(path: Path, max_slides: int, issues: list, ep: str, label: str) -> int:
    html = path.read_text(encoding="utf-8", errors="replace")
    n_slides = len(RX_SLIDE.findall(html))
    n_canvas = len(RX_CANVAS.findall(html))
    if n_slides > max_slides:
        issues.append(f"{ep}/{path.name}: {n_slides} slide > limite {max_slides} ({label})")
    if n_canvas < n_slides:
        issues.append(f"{ep}/{path.name}: {n_slides - n_canvas} slide senza canvas 1080x1350 dichiarato")
    if RX_DASHED.search(html):
        issues.append(f"{ep}/{path.name}: 'dashed' presente — slot/griglia a vista VIETATI (caroselli ricchi)")
    if RX_IMGHTTP.search(html):
        issues.append(f"{ep}/{path.name}: <img src=\"http...\"> — deve essere self-contained (base64/SVG)")
    return n_slides


def run_qc() -> dict:
    """Esegue il QC su tutte le cartelle carosello. Ritorna il report (e lo salva)."""
    report = {"generated": datetime.now().isoformat()[:19], "checked": 0,
              "issues": [], "per_id": {}}
    if not CAROSELLI.exists():
        report["issues"].append(f"cartella CAROSELLI assente: {CAROSELLI}")
        return _save(report)

    for folder in sorted(CAROSELLI.iterdir()):
        if not folder.is_dir() or folder.name.startswith("_"):
            continue
        ep = folder.name
        report["checked"] += 1
        entry = {"files_ok": True, "slides": None, "slides_social": None}

        for fname in CANONICI:
            if not (folder / fname).exists():
                entry["files_ok"] = False
                report["issues"].append(f"{ep}: manca il file canonico {fname}")

        html = folder / "carosello.html"
        if html.exists():
            entry["slides"] = _check_html(html, MAX_COMPLETO, report["issues"], ep, "completo")

        social = folder / "social.html"
        if social.exists():
            entry["slides_social"] = _check_html(social, MAX_SOCIAL, report["issues"], ep, "social-cut IG")

        report["per_id"][ep] = entry

    return _save(report)


def _save(report: dict) -> dict:
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return report


if __name__ == "__main__":
    r = run_qc()
    print(f"caroselli QC: {r['checked']} cartelle, {len(r['issues'])} problemi -> {OUT_JSON}")
    for i in r["issues"]:
        print("  FALLA:", i)
    sys.exit(1 if r["issues"] else 0)
