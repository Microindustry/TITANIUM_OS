# nina_region_posters.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-24
# Genera la COLLANA delle 8 Regioni del mondo di Nina: una card per Pietra ⟡0→⟡7,
# colore-tema + gemma + titolo/frase dell'episodio-madre (da episodes.json). Output
# HTML self-contained -> PNG via headless Chrome (no AI-image gen, design grafico).
# Uso: python nina_region_posters.py   (rende tutte le 8 in MONDO/POSTER/regioni/)

import json, subprocess, sys, io, os
from pathlib import Path

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
OUT = ROOT / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "regioni"
OUT.mkdir(parents=True, exist_ok=True)

# Regione-madre: (id episodio, pietra, nome regione, colore, accento chiaro)
REGIONI = [
    ("EP_N2_01", "0", "LA MATERIA",      "#f4b65a", "#ffe6ad"),
    ("EP_N2_10", "1", "LA TRACCIA",      "#34d399", "#a7f3d0"),
    ("EP_N2_06", "2", "L'OFFICINA",      "#fb923c", "#fed7aa"),
    ("EP_N2_07", "3", "LA MENTE",        "#a78bfa", "#ddd6fe"),
    ("EP_N2_09", "4", "LA BIBLIOTECA",   "#38bdf8", "#bae6fd"),
    ("EP_N2_11", "5", "LA GRANDE MAPPA", "#818cf8", "#c7d2fe"),
    ("EP_N2_12", "6", "L'ESERCITO",      "#fb7185", "#fecdd3"),
    ("EP_N2_14", "7", "IL DIRETTORE",    "#fbbf24", "#fde68a"),
]

CARD = """<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Space+Mono:wght@400;700&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{background:#05070d}}
.card{{position:relative;width:1080px;height:1350px;overflow:hidden;
  background:radial-gradient(120% 60% at 50% 32%, {col}1f 0%, #0b1020 50%, #05070d 100%);
  font-family:'Space Mono',monospace;color:#eef2fb}}
.frame{{position:absolute;inset:40px;border:1px solid {col}40;border-radius:6px}}
.brand{{position:absolute;top:78px;left:0;right:0;text-align:center;font-size:19px;
  letter-spacing:9px;color:#8595b4}}
.gemwrap{{position:absolute;top:200px;left:0;right:0;display:flex;justify-content:center}}
.region{{position:absolute;top:600px;left:0;right:0;text-align:center;font-size:30px;
  font-weight:700;letter-spacing:12px;color:{col}}}
.pietra{{position:absolute;top:648px;left:0;right:0;text-align:center;font-size:15px;
  letter-spacing:6px;color:#7f8db0}}
.title{{position:absolute;top:760px;left:90px;right:90px;text-align:center;
  font-family:'Playfair Display',serif;font-weight:700;font-size:72px;line-height:1.02;color:#f6f8ff}}
.tag{{position:absolute;top:1010px;left:110px;right:110px;text-align:center;
  font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:30px;
  line-height:1.42;color:#aeb9d4}}
.foot{{position:absolute;bottom:78px;left:90px;right:90px;display:flex;justify-content:space-between;
  font-size:16px;letter-spacing:2px;color:#7f8db0}}
.foot .nina{{color:{col}}}
</style></head><body>
<div class="card">
  <div class="frame"></div>
  <div class="brand">TITANIUM&nbsp;OS · L'AVVENTURA DI NINA</div>
  <div class="gemwrap">
    <svg width="340" height="380" viewBox="0 0 340 380">
      <defs>
        <radialGradient id="g" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stop-color="{acc}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="{col}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="{acc}"/><stop offset="100%" stop-color="{col}"/>
        </linearGradient>
      </defs>
      <circle cx="170" cy="170" r="180" fill="url(#g)"/>
      <!-- gemma sfaccettata -->
      <g stroke="{acc}" stroke-width="2" stroke-opacity="0.6" fill="url(#face)">
        <polygon points="170,40 290,150 170,330 50,150" fill-opacity="0.22"/>
        <polygon points="170,40 290,150 170,150" fill-opacity="0.40"/>
        <polygon points="170,40 50,150 170,150" fill-opacity="0.30"/>
        <polygon points="50,150 170,150 170,330" fill-opacity="0.18"/>
        <polygon points="290,150 170,150 170,330" fill-opacity="0.28"/>
      </g>
      <text x="170" y="200" text-anchor="middle" font-family="Playfair Display,serif"
        font-size="120" font-weight="700" fill="{acc}">{num}</text>
    </svg>
  </div>
  <div class="region">{region}</div>
  <div class="pietra">PIETRA ⟡{num} · CASELLA MADRE</div>
  <div class="title">{title}</div>
  <div class="tag">«{tag}»</div>
  <div class="foot"><span>{eid}</span><span class="nina">NINA</span><span>il mondo · regione {num}/7</span></div>
</div></body></html>"""

def find_chrome():
    for p in [r"C:\Program Files\Google\Chrome\Application\chrome.exe",
              r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
              os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe")]:
        if Path(p).exists():
            return p
    return None

def main():
    eps = {e["id"]: e for e in json.loads(EPISODES.read_text(encoding="utf-8"))}
    chrome = find_chrome()
    if not chrome:
        print("Chrome non trovato"); sys.exit(1)
    done = 0
    for eid, num, region, col, acc in REGIONI:
        e = eps.get(eid, {})
        title = e.get("title", "?")
        tag = (e.get("sottotitolo") or "").strip().strip('"')
        if len(tag) > 130:
            tag = tag[:127].rsplit(" ", 1)[0] + "…"
        html = CARD.format(col=col, acc=acc, num=num, region=region, title=title, tag=tag, eid=eid)
        hpath = OUT / f"regione_{num}_{eid}.html"
        ppath = OUT / f"regione_{num}_{eid}.png"
        hpath.write_text(html, encoding="utf-8")
        udd = os.path.expandvars(rf"%LOCALAPPDATA%\Temp\chrome_region_{num}")
        r = subprocess.run([chrome, "--headless=new", "--no-sandbox", "--disable-gpu",
            f"--user-data-dir={udd}", "--hide-scrollbars", "--force-device-scale-factor=1",
            "--window-size=1080,1350", "--virtual-time-budget=7000",
            "--default-background-color=ff05070d",
            f"--screenshot={ppath}", hpath.as_uri()],
            capture_output=True, text=True, timeout=90)
        ok = ppath.exists()
        print(f"  ⟡{num} {region:16} -> {'OK' if ok else 'FAIL'} {ppath.name}")
        done += 1 if ok else 0
    print(f"\nCollana Regioni: {done}/8 card generate in {OUT.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
