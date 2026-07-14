# caroselli_qc.py | TITANIUM_OS / CONTENT_ENGINE / QC CAROSELLI | v1.1 | 2026-07-14
# QC automatico delle regole caroselli (GUIDA_CAROSELLI.md §5 + §2-bis copertina) —
# eseguibile a mano (procedura §4 passo 5) e importato da night_audit (sentinella notturna).
# Regole eseguibili:
#   - file canonici presenti (carosello.html, caption.txt, README.md)
#   - canvas 1080×1350 dichiarato sulle slide (data-canvas-width/height)
#   - conteggio slide: completo ≤16 (standard) · social.html ≤10 (limite HARD API Instagram)
#   - anti-wireframe: nessun "dashed" negli HTML (slot vuoti vietati — feedback caroselli-ricchi)
#   - self-contained: nessuna <img src="http..."> (Express import + niente dipendenze rete)
#   - COPERTINA (§2-bis, v1.1): la slide 1 deve avere un elemento class="cover-title"
#     con font-size dichiarata ≥ 60px (prova della miniatura). Contratto per i caroselli
#     NUOVI (i legacy pre-standard sono esentati: sono già nel piano di rifacimento).
# Legacy (pre-standard, TUTTI da rifare da 0 — ordine Matteo 14/07): i 5 esistenti.
#   Le loro anomalie note (17 slide, niente cover-title) finiscono in "legacy_note",
#   NON tra le falle: sono già tracciate nei piani di produzione.
# Output: DATA/audit/caroselli_qc.json

import json
import re
import sys
from datetime import datetime
from pathlib import Path

BASE      = Path(__file__).resolve().parents[2]          # TITANIUM_OS
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"
OUT_JSON  = BASE / "DATA" / "audit" / "caroselli_qc.json"

MAX_COMPLETO = 16   # standard vero (v1.1: tolta la tolleranza 17 — i PRE si rifanno da 0)
MAX_SOCIAL   = 10   # limite HARD API Instagram (doc Meta, verificato #56)
MIN_COVER_FONT = 60 # px — prova della miniatura (§2-bis.2)

# I 5 pre-standard (14/07): tutti nel piano di rifacimento. Anomalie -> legacy_note.
LEGACY_REDO = {"PRE_01", "PRE_02", "PRE_03", "EP_N2_01", "EP_N2_02"}

RX_SLIDE   = re.compile(r'class="slide"')
RX_CANVAS  = re.compile(r'data-canvas-width="1080"\s+data-canvas-height="1350"')
RX_DASHED  = re.compile(r'dashed')
RX_IMGHTTP = re.compile(r'<img[^>]+src="http')
RX_COVER_TITLE = re.compile(r'class="[^"]*cover-title[^"]*"')
RX_COVER_FONT  = re.compile(r'cover-title[^>]*style="[^"]*font-size:\s*(\d+)px', re.S)

CANONICI = ["carosello.html", "caption.txt", "README.md"]


def _first_slide_block(html: str) -> str:
    """Il blocco della slide 1 (dalla prima class="slide" alla seconda, o tutto)."""
    hits = [m.start() for m in RX_SLIDE.finditer(html)]
    if not hits:
        return ""
    end = hits[1] if len(hits) > 1 else len(html)
    return html[hits[0]:end]


def _check_html(path: Path, max_slides: int, out: list, ep: str, label: str) -> int:
    html = path.read_text(encoding="utf-8", errors="replace")
    n_slides = len(RX_SLIDE.findall(html))
    n_canvas = len(RX_CANVAS.findall(html))
    if n_slides > max_slides:
        out.append(f"{ep}/{path.name}: {n_slides} slide > limite {max_slides} ({label})")
    if n_canvas < n_slides:
        out.append(f"{ep}/{path.name}: {n_slides - n_canvas} slide senza canvas 1080x1350 dichiarato")
    if RX_DASHED.search(html):
        out.append(f"{ep}/{path.name}: 'dashed' presente — slot/griglia a vista VIETATI (caroselli ricchi)")
    if RX_IMGHTTP.search(html):
        out.append(f"{ep}/{path.name}: <img src=\"http...\"> — deve essere self-contained (base64/SVG)")
    return n_slides


def _check_cover(path: Path, out: list, ep: str) -> None:
    """§2-bis eseguibile: slide 1 = poster. Serve un .cover-title leggibile a miniatura."""
    html = path.read_text(encoding="utf-8", errors="replace")
    block = _first_slide_block(html)
    if not block:
        return
    if not RX_COVER_TITLE.search(block):
        out.append(f"{ep}/{path.name}: slide 1 senza class=\"cover-title\" (copertina §2-bis: il poster deve dichiararsi)")
        return
    m = RX_COVER_FONT.search(block)
    if m and int(m.group(1)) < MIN_COVER_FONT:
        out.append(f"{ep}/{path.name}: cover-title font-size {m.group(1)}px < {MIN_COVER_FONT}px (prova della miniatura §2-bis)")


def run_qc() -> dict:
    """Esegue il QC su tutte le cartelle carosello. Ritorna il report (e lo salva)."""
    report = {"generated": datetime.now().isoformat()[:19], "checked": 0,
              "issues": [], "legacy_note": [], "per_id": {}}
    if not CAROSELLI.exists():
        report["issues"].append(f"cartella CAROSELLI assente: {CAROSELLI}")
        return _save(report)

    for folder in sorted(CAROSELLI.iterdir()):
        if not folder.is_dir() or folder.name.startswith("_"):
            continue
        ep = folder.name
        legacy = ep in LEGACY_REDO
        sink = report["legacy_note"] if legacy else report["issues"]
        report["checked"] += 1
        entry = {"files_ok": True, "slides": None, "slides_social": None, "legacy": legacy}

        for fname in CANONICI:
            if not (folder / fname).exists():
                entry["files_ok"] = False
                sink.append(f"{ep}: manca il file canonico {fname}")

        html = folder / "carosello.html"
        if html.exists():
            entry["slides"] = _check_html(html, MAX_COMPLETO, sink, ep, "completo")
            _check_cover(html, sink, ep)

        social = folder / "social.html"
        if social.exists():
            entry["slides_social"] = _check_html(social, MAX_SOCIAL, sink, ep, "social-cut IG")

        report["per_id"][ep] = entry

    return _save(report)


def _save(report: dict) -> dict:
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return report


if __name__ == "__main__":
    r = run_qc()
    print(f"caroselli QC: {r['checked']} cartelle, {len(r['issues'])} falle, "
          f"{len(r['legacy_note'])} note legacy -> {OUT_JSON}")
    for i in r["issues"]:
        print("  FALLA:", i)
    for i in r["legacy_note"]:
        print("  legacy:", i)
    sys.exit(1 if r["issues"] else 0)
