# grid_preview.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v1.0 | 2026-07-14
# Anteprima della GRIGLIA Instagram (§2-bis: "la griglia è una collezione"):
# prende la slide_1 (copertina) di ogni carosello e le compone come apparirà
# il profilo — 3 colonne, crop centrale 3:4 (il formato griglia IG attuale),
# ordine dal più recente (in alto a sinistra) al più vecchio.
# Uso: python grid_preview.py [ID ...]   (default: tutte le cartelle con slides/slide_1.png)
# Output: CAROSELLI/_griglia_ig.png

import sys
from pathlib import Path

from PIL import Image

BASE      = Path(__file__).resolve().parents[2]
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"
OUT       = CAROSELLI / "_griglia_ig.png"

def _cartelle_caroselli(base):
    """Cartelle carosello a QUALSIASI profondita' (riordino #59: binari NINA/ e
    SISTEMA/): e' un carosello ogni cartella che contiene carosello.html, esclusi
    i rami tecnici (_BOZZE quarantena, _TEMPLATE, _VERSIONI archivi)."""
    skip = {"_BOZZE", "_TEMPLATE", "_VERSIONI"}
    out = []
    for h in base.rglob("carosello.html"):
        rel = h.relative_to(base)
        if any(part in skip for part in rel.parts):
            continue
        out.append(h.parent)
    return sorted(out, key=lambda f: f.name)


THUMB_W, THUMB_H = 360, 480          # 3:4 come la griglia IG attuale
GAP = 3                              # il filetto tra le celle, come su IG
COLS = 3


def cover(folder: Path) -> Path | None:
    p = folder / "slides" / "slide_1.png"
    return p if p.exists() else None


def crop_3_4(img: Image.Image) -> Image.Image:
    w, h = img.size                   # 1080×1350 (4:5)
    tw = int(h * 3 / 4)               # larghezza del crop 3:4 a piena altezza
    if tw <= w:
        x = (w - tw) // 2
        img = img.crop((x, 0, x + tw, h))
    else:
        th = int(w * 4 / 3)
        y = (h - th) // 2
        img = img.crop((0, y, w, y + th))
    return img.resize((THUMB_W, THUMB_H))


def main() -> int:
    ids = sys.argv[1:]
    folders = [f for f in _cartelle_caroselli(CAROSELLI) if cover(f)]
    if ids:
        folders = [f for f in folders if f.name in ids]
    # feed IG: il più recente in alto a sinistra → ordine inverso di pubblicazione
    folders = sorted(folders, key=lambda f: f.name, reverse=True)
    if not folders:
        print("nessuna copertina trovata")
        return 1
    rows = (len(folders) + COLS - 1) // COLS
    W = COLS * THUMB_W + (COLS - 1) * GAP
    H = rows * THUMB_H + (rows - 1) * GAP
    sheet = Image.new("RGB", (W, H), "#000000")
    for i, f in enumerate(folders):
        t = crop_3_4(Image.open(cover(f)))
        x = (i % COLS) * (THUMB_W + GAP)
        y = (i // COLS) * (THUMB_H + GAP)
        sheet.paste(t, (x, y))
        print(f"  {i+1:2d}. {f.name}")
    sheet.save(OUT)
    print(f"griglia ({len(folders)} copertine, {rows} righe) -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
