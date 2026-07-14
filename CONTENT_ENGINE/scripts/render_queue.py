# render_queue.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v1.0 | 2026-07-14
# Runner BATCH del render caroselli (collo di bottiglia n°2, attacco #58):
# cicla CAROSELLI/<ID>/, renderizza ciò che è cambiato e chiude col QC.
#   carosello.html -> slides/slide_N.png (1080×1350) + _sheet.png (contact sheet)
#   social.html    -> slides_social/slide_N.jpg (JPEG ≤8MB, pronti per IG)
# Incrementale: se l'HTML non è più nuovo dell'output, la cartella si salta (--force per tutto).
# Contratto slide: blocchi delimitati da "<!-- ===== N " (come i _render storici) — se
# mancano i marker, fallback: split su class="slide".
# Uso: python render_queue.py [ID ...] [--force]
# Sostituisce i _render_all/_render_pair per-cartella (che restano, ma il batch è la via).

import re
import sys
import subprocess
import tempfile
import time
from pathlib import Path

from PIL import Image

BASE      = Path(__file__).resolve().parents[2]
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"

BROWSERS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]
BROWSER = next((b for b in BROWSERS if Path(b).exists()), None)

MAX_JPEG_BYTES = 8 * 1024 * 1024  # limite IG per immagine (doc Meta #56)


def _slide_blocks(src: str) -> list[tuple[int, str]]:
    """[(numero, blocco_html)] — marker '<!-- ===== N ' o fallback su class="slide"."""
    nums = [int(n) for n in re.findall(r"<!-- ===== (\d+) ", src)]
    blocks = []
    if nums:
        for n in nums:
            a = src.index(f"<!-- ===== {n} ")
            nxt = src.find("<!-- ===== ", a + 5)
            b = nxt if nxt != -1 else src.index("</body>")
            blocks.append((n, src[a:b].strip()))
        return blocks
    # fallback: senza marker, spezza sui div slide (numerazione = ordine)
    hits = [m.start() for m in re.finditer(r'<div[^>]+class="slide"', src)]
    for i, a in enumerate(hits):
        b = hits[i + 1] if i + 1 < len(hits) else src.index("</body>")
        blocks.append((i + 1, src[a:b].strip()))
    return blocks


def _render_html(html_path: Path, outdir: Path, as_jpeg: bool) -> list[Path]:
    src = html_path.read_text(encoding="utf-8")
    head = src.split("<body>")[0]
    outdir.mkdir(exist_ok=True)
    outs = []
    for n, block in _slide_blocks(src):
        doc = head + "<body style='padding:0;gap:0'>\n" + block + "\n</body></html>"
        tmp = html_path.parent / f"_tmp_{n}.html"  # accanto: i path relativi risolvono
        tmp.write_text(doc, encoding="utf-8")
        png = outdir / f"slide_{n}.png"
        ud = tempfile.mkdtemp(prefix="chr_car_")
        subprocess.run([BROWSER, "--headless", "--disable-gpu", "--hide-scrollbars",
                        f"--user-data-dir={ud}", "--window-size=1080,1350",
                        "--virtual-time-budget=8000", f"--screenshot={png}",
                        "file:///" + str(tmp).replace("\\", "/")], check=False,
                       capture_output=True)
        # Chrome può tenere il tmp/png per qualche istante (WinError 32): retry tollerante
        for attempt in range(5):
            try:
                tmp.unlink(missing_ok=True)
                break
            except PermissionError:
                time.sleep(0.5)
        if not png.exists():
            print(f"    ERRORE render slide {n} di {html_path.parent.name}/{html_path.name}")
            continue
        img = None
        for attempt in range(5):
            try:
                img = Image.open(png)
                img.load()
                break
            except (PermissionError, OSError):
                time.sleep(0.5)
        if img is None:
            print(f"    ERRORE lettura slide {n} di {html_path.parent.name}/{html_path.name}")
            continue
        img = img.crop((0, 0, 1080, 1350))
        if as_jpeg:
            jpg = outdir / f"slide_{n}.jpg"
            q = 92
            img.convert("RGB").save(jpg, quality=q)
            while jpg.stat().st_size > MAX_JPEG_BYTES and q > 40:
                q -= 10
                img.convert("RGB").save(jpg, quality=q)
            png.unlink(missing_ok=True)
            outs.append(jpg)
        else:
            img.save(png)
            outs.append(png)
    return outs


def _sheet(imgs: list[Path], dest: Path) -> None:
    if not imgs:
        return
    tw, th, cols = 360, 450, 3
    rows = (len(imgs) + cols - 1) // cols
    sheet = Image.new("RGB", (tw * cols, th * rows), "#05070d")
    for i, p in enumerate(imgs):
        sheet.paste(Image.open(p).resize((tw, th)), ((i % cols) * tw, (i // cols) * th))
    sheet.save(dest)


def _stale(html: Path, outdir: Path) -> bool:
    if not outdir.exists() or not any(outdir.iterdir()):
        return True
    newest_out = max(p.stat().st_mtime for p in outdir.iterdir())
    return html.stat().st_mtime > newest_out


def main() -> int:
    if BROWSER is None:
        print("nessun browser headless trovato (Chrome/Edge)")
        return 1
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    force = "--force" in sys.argv
    done = skipped = 0
    for folder in sorted(CAROSELLI.iterdir()):
        if not folder.is_dir() or folder.name.startswith("_"):
            continue
        if args and folder.name not in args:
            continue
        # v1.1 (riconciliazione 14/07): UN taglio ≤10 — carosello.html produce
        # slides/ (PNG, sito/PDF) E slides_ig/ (JPEG ≤8MB, pronti per Instagram).
        html = folder / "carosello.html"
        if not html.exists():
            continue
        outdir = folder / "slides"
        if not force and not _stale(html, outdir):
            skipped += 1
            continue
        print(f"  render {folder.name}/carosello.html -> slides/ + slides_ig/")
        outs = _render_html(html, outdir, as_jpeg=False)
        _sheet(outs, folder / "_sheet.png")
        igdir = folder / "slides_ig"
        igdir.mkdir(exist_ok=True)
        for png in outs:
            img = Image.open(png).convert("RGB")
            jpg = igdir / (png.stem + ".jpg")
            q = 92
            img.save(jpg, quality=q)
            while jpg.stat().st_size > MAX_JPEG_BYTES and q > 40:
                q -= 10
                img.save(jpg, quality=q)
        done += 1
    print(f"render_queue: {done} render, {skipped} già aggiornati")
    # chiusura: QC automatico sull'intera cartella
    qc = subprocess.run([sys.executable, str(BASE / "CONTENT_ENGINE/scripts/caroselli_qc.py")])
    return qc.returncode


if __name__ == "__main__":
    sys.exit(main())
