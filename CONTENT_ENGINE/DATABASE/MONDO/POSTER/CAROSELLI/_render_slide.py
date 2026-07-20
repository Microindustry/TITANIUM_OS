# _render_slide.py | TITANIUM_OS / CAROSELLI | v1.0 | 2026-07-20
# Rende UNA slide (1080x1350) di un carosello.html a marker <!-- ===== N -->.
# Compatibile coi caroselli build-style con SVG inline per-slide (no <svg width="0"> globale).
# Uso: python _render_slide.py <carosello.html> <out.jpg> <N>
import sys, os, re, subprocess, tempfile
from PIL import Image

html, out, n = sys.argv[1], os.path.abspath(sys.argv[2]), int(sys.argv[3])
src = open(html, encoding="utf-8").read()

# head: togli gap/padding della colonna così la singola slide sta a 0,0
head = (src.split("<body>")[0]
        .replace("padding:40px 0", "padding:0")
        .replace("gap:40px", "gap:0"))

a = src.index(f"<!-- ===== {n} ")
nxt = src.find("<!-- ===== ", a + 5)
b = nxt if nxt != -1 else src.index("</body>")
block = src[a:b].strip()

doc = head + "<body>\n" + block + "\n</body></html>"
tmp = out + ".tmp.html"
open(tmp, "w", encoding="utf-8").write(doc)

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ud = tempfile.mkdtemp(prefix="chr_sl_")
subprocess.run([chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
                f"--user-data-dir={ud}", "--window-size=1080,1350",
                "--virtual-time-budget=5000", f"--screenshot={out}",
                "file:///" + os.path.abspath(tmp).replace("\\", "/")], check=False)
im = Image.open(out)
im.crop((0, 0, 1080, 1350)).convert("RGB").save(out, quality=92)
os.remove(tmp)
print("rendered", out, "->", im.size)
