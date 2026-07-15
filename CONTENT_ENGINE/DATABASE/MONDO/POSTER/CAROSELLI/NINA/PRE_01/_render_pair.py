# _render_pair.py | TITANIUM_OS / NINA / CAROSELLI | v1.0 | 2026-06-25
# Render di N slide affiancate (senza gap) di un carosello.html, per studiare le giunture.
# Uso: python _render_pair.py <carosello.html> <out.png> <slide_nums es. "2,3">
import sys, re, subprocess, os, tempfile
from PIL import Image

os.makedirs(os.path.dirname(os.path.abspath(sys.argv[2])), exist_ok=True)

html, out, nums = sys.argv[1], os.path.abspath(sys.argv[2]), [int(x) for x in sys.argv[3].split(",")]
src = open(html, encoding="utf-8").read()
head = src.split("<body>")[0].replace(
    "flex-direction:column; align-items:center; gap:40px; padding:40px 0;",
    "flex-direction:row; align-items:flex-start; gap:0; padding:0;")
defs = re.search(r'(<svg width="0".*?</svg>)', src, re.S).group(1)

blocks = []
for n in nums:
    a = src.index(f"<!-- ===== {n} ")
    nxt = src.find("<!-- ===== ", a + 5)
    b = nxt if nxt != -1 else src.index("</body>")
    blocks.append(src[a:b].strip())

doc = head + "<body>\n" + defs + "\n" + "\n".join(blocks) + "\n</body></html>"
tmp = out + ".tmp.html"
open(tmp, "w", encoding="utf-8").write(doc)

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ud = tempfile.mkdtemp(prefix="chr_nina_")
subprocess.run([chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
                f"--user-data-dir={ud}", f"--window-size={1080*len(nums)},1350",
                "--virtual-time-budget=4000", f"--screenshot={out}",
                "file:///" + os.path.abspath(tmp).replace("\\", "/")], check=False)
im = Image.open(out)
im.crop((0, 0, 1080 * len(nums), 1350)).save(out)
os.remove(tmp)
print("rendered", out, "->", im.size)
