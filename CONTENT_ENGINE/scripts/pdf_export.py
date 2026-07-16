# pdf_export.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v1.0 | 2026-07-16
# PDF LINKEDIN — un documento sfogliabile per episodio (ONDATA B, finding #5).
# Su LinkedIn il "carosello" e' un POST-DOCUMENTO: un singolo PDF con una pagina
# per slide. Qui ogni cartella-carosello prende il suo carosello.pdf (dalle
# slides/slide_*.png in ordine). Canale NON-Meta: pubblicabile OGGI, zero prerequisiti.
#
# Uso:  python pdf_export.py [ID ...]     (default: tutte le cartelle con slides/)
# Out:  <cartella>/carosello.pdf          (una pagina per slide, ordine numerico)

import re
import sys
from pathlib import Path

from PIL import Image

BASE      = Path(__file__).resolve().parents[2]
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"
SKIP      = {"_BOZZE", "_TEMPLATE", "_VERSIONI"}   # quarantena/archivi: niente PDF


def _cartelle(ids: list[str]) -> list[Path]:
    """Cartelle carosello (a qualsiasi profondita': binari NINA/SISTEMA/), quarantena
    esclusa. Se sono passati degli ID, filtra per nome cartella."""
    out = []
    for h in CAROSELLI.rglob("carosello.html"):
        rel = h.relative_to(CAROSELLI)
        if any(part in SKIP for part in rel.parts):
            continue
        if ids and h.parent.name not in ids:
            continue
        out.append(h.parent)
    return sorted(out, key=lambda f: f.name)


def _slides(folder: Path) -> list[Path]:
    """slide_*.png ordinate NUMERICAMENTE (slide_10 dopo slide_2, non in lessicografico)."""
    def num(p: Path) -> int:
        m = re.search(r"slide_(\d+)", p.stem)
        return int(m.group(1)) if m else 0
    return sorted((folder / "slides").glob("slide_*.png"), key=num)


def export(folder: Path) -> tuple[bool, int, float]:
    """Compone le slide in <folder>/carosello.pdf. Ritorna (ok, n_pagine, MB)."""
    pngs = _slides(folder)
    if not pngs:
        return False, 0, 0.0
    imgs = [Image.open(p).convert("RGB") for p in pngs]
    out = folder / "carosello.pdf"
    imgs[0].save(out, save_all=True, append_images=imgs[1:], resolution=150.0)
    return True, len(imgs), out.stat().st_size / 1048576


def main(ids: list[str]) -> int:
    cart = _cartelle(ids)
    if not cart:
        print("[pdf_export] nessuna cartella carosello trovata")
        return 1
    done, pages, mb = 0, 0, 0.0
    for folder in cart:
        ok, n, size = export(folder)
        if ok:
            done += 1; pages += n; mb += size
            print(f"[pdf] {folder.name:14s} -> carosello.pdf ({n} pagine, {size:.1f} MB)")
        else:
            print(f"[skip] {folder.name:14s} — nessuna slide PNG")
    print(f"[pdf_export] {done} PDF creati ({pages} pagine, {mb:.1f} MB totali)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
