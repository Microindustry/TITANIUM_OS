# _render_all.py | TITANIUM_OS / NINA / CAROSELLI | v1.0 | 2026-06-27
# Render di ogni slide di un carosello.html in slides/slide_N.png + contact sheet _sheet.png.
# Uso: python _render_all.py [carosello.html]
import sys, re, subprocess, os, tempfile
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
html = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(HERE, "carosello.html")
base = os.path.dirname(html)
outdir = os.path.join(base, "slides"); os.makedirs(outdir, exist_ok=True)
src = open(html, encoding="utf-8").read()
head = src.split("<body>")[0]
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

nums = [int(n) for n in re.findall(r"<!-- ===== (\d+) ", src)]
imgs = []
for n in nums:
    a = src.index(f"<!-- ===== {n} ")
    nxt = src.find("<!-- ===== ", a + 5)
    b = nxt if nxt != -1 else src.index("</body>")
    block = src[a:b].strip()
    doc = head + "<body style='padding:0;gap:0'>\n" + block + "\n</body></html>"
    tmp = os.path.join(base, f"_tmp_{n}.html")  # accanto al carosello: i path relativi img/ risolvono
    open(tmp, "w", encoding="utf-8").write(doc)
    out = os.path.join(outdir, f"slide_{n}.png")
    ud = tempfile.mkdtemp(prefix="chr_nina_")
    subprocess.run([chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--user-data-dir={ud}", "--window-size=1080,1350",
                    "--virtual-time-budget=5000", f"--screenshot={out}",
                    "file:///" + tmp.replace("\\", "/")], check=False)
    Image.open(out).crop((0, 0, 1080, 1350)).save(out)
    os.remove(tmp)
    imgs.append(out)
    print("ok slide", n)

# contact sheet (3 colonne)
thumb_w = 360; thumb_h = 450; cols = 3
rows = (len(imgs) + cols - 1) // cols
sheet = Image.new("RGB", (thumb_w * cols, thumb_h * rows), "#05070d")
for i, p in enumerate(imgs):
    t = Image.open(p).resize((thumb_w, thumb_h))
    sheet.paste(t, ((i % cols) * thumb_w, (i // cols) * thumb_h))
sheet.save(os.path.join(base, "_sheet.png"))
print("sheet ->", os.path.join(base, "_sheet.png"))
