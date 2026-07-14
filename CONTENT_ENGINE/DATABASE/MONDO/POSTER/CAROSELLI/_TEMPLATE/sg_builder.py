# sg_builder.py | TITANIUM_OS / CAROSELLI / _TEMPLATE | v1.0 | 2026-07-14
# Builder CONDIVISO dei caroselli SG (voce Matteo) — infra di template, non episodio:
# i _build_* per-cartella importano da qui e portano SOLO i dati delle slide.
# Così il CSS/marchio vive in UN posto (anti-drift F12) e resta = tokens.css.
# Genera ENTRAMBI i tagli: carosello.html (completo ≤16) + social.html (slide social=True ≤10).
# Contratti: marker "<!-- ===== N " (render_queue) · slide 1 con class "cover-title"
# + font-size inline (QC §2-bis) · self-contained (niente asset esterni oltre Typekit).

from pathlib import Path

# ── CSS canonico (valori = _TEMPLATE/tokens.css, standard EP_N2_02) ──────────
CSS = """
* { margin:0; padding:0; box-sizing:border-box; }
html,body { background:#05070d; }
body { display:flex; flex-direction:column; align-items:center; gap:40px; padding:40px 0; }
.slide { position:relative; width:1080px; height:1350px; overflow:hidden;
  background: radial-gradient(120% 75% at 50% 34%, #1a2440 0%, #0c1122 46%, #05070d 100%);
  font-family:"source-sans-3",sans-serif; color:#eef2fb; }
.grid { position:absolute; inset:30px; opacity:0.04; background-image: linear-gradient(#5fc7f3 1px, transparent 1px), linear-gradient(90deg,#5fc7f3 1px, transparent 1px); background-size:54px 54px; }
.frame { position:absolute; inset:30px; border:1px solid rgba(148,163,184,0.22); border-radius:4px; }
.flow { position:absolute; inset:0; width:1080px; height:1350px; pointer-events:none; }
.toplabel { position:absolute; top:60px; left:0; right:0; text-align:center; font-family:"space-mono",monospace; font-size:17px; letter-spacing:6px; color:#8595b4; text-transform:uppercase; }
.kicker { position:absolute; top:150px; left:0; right:0; text-align:center; font-family:"space-mono",monospace; font-size:16px; letter-spacing:6px; color:#f4b65a; text-transform:uppercase; }
.scene { position:absolute; top:210px; left:0; right:0; height:380px; display:flex; align-items:center; justify-content:center; }
.body2 { position:absolute; left:96px; right:96px; top:640px; bottom:176px; display:flex; flex-direction:column; justify-content:flex-start; gap:26px; text-align:center; }
.lead { font-family:"playfair-display",serif; font-weight:700; font-size:66px; line-height:1.04; color:#f6f8ff; letter-spacing:-0.5px; }
.lead .accent { color:#f4b65a; font-style:italic; } .lead .pink { color:#ec4899; font-style:italic; } .lead .cyan { color:#5fc7f3; font-style:italic; } .lead .rose { color:#fb7185; font-style:italic; }
.intro { font-size:31px; line-height:1.5; color:#c3cce0; }
.intro .soft { color:#eef2fb; font-weight:600; } .intro .g { color:#f4b65a; font-weight:600; } .intro .cyan { color:#5fc7f3; font-weight:600; } .intro .pink { color:#ec4899; font-weight:600; }
.seal { font-family:"playfair-display",serif; font-style:italic; font-weight:700; font-size:31px; line-height:1.32; color:#f4b65a; margin-top:6px; }
.cta { font-family:"space-mono",monospace; font-size:20px; line-height:1.45; letter-spacing:1px; color:#5fc7f3; border:1px solid rgba(95,199,243,0.3); border-radius:14px; padding:18px 22px; }
.footer { position:absolute; left:60px; right:60px; bottom:60px; display:flex; align-items:center; justify-content:space-between; font-family:"space-mono",monospace; font-size:15px; letter-spacing:2px; color:#7f8db0; }
.footer .dot { color:#f4b65a; } .footer .matteo { color:#fb7185; }
"""

# ── Onde di sfondo (il PONTE che attraversa le slide — nastro unico) ─────────
def flow(seed: int) -> str:
    y1, y2 = 980 + (seed * 37) % 120, 1080 + (seed * 53) % 140
    return (f'<svg class="flow" viewBox="0 0 1080 1350" fill="none">'
            f'<path d="M-20 {y1} C 260 {y1-90}, 540 {y1+70}, 1100 {y1-30}" stroke="#5fc7f3" stroke-opacity="0.10" stroke-width="2"/>'
            f'<path d="M-20 {y2} C 300 {y2+60}, 620 {y2-80}, 1100 {y2+20}" stroke="#f4b65a" stroke-opacity="0.08" stroke-width="2"/>'
            f'</svg>')

# ── Libreria SCENE monoline (blueprint, mai wireframe: glow pieni + tratti) ──
def _wrap(inner: str) -> str:
    return (f'<svg width="760" height="360" viewBox="0 0 760 360" fill="none">'
            f'<defs><radialGradient id="glow" cx="50%" cy="45%" r="60%">'
            f'<stop offset="0%" stop-color="#5fc7f3" stop-opacity="0.16"/>'
            f'<stop offset="100%" stop-color="#5fc7f3" stop-opacity="0"/></radialGradient>'
            f'<radialGradient id="glowg" cx="50%" cy="45%" r="60%">'
            f'<stop offset="0%" stop-color="#f4b65a" stop-opacity="0.16"/>'
            f'<stop offset="100%" stop-color="#f4b65a" stop-opacity="0"/></radialGradient></defs>'
            f'<rect width="760" height="360" fill="url(#glow)"/>{inner}</svg>')

SCENES = {
    # la scintilla TIG: arco + sparchi (chi salda riconosce il momento)
    "scintilla": _wrap(
        '<path d="M330 90 L380 210" stroke="#eef2fb" stroke-width="5" stroke-linecap="round"/>'
        '<path d="M330 90 L318 60 M330 90 L300 84" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
        '<circle cx="380" cy="214" r="10" fill="#f4b65a"/>'
        '<circle cx="380" cy="214" r="26" stroke="#f4b65a" stroke-opacity="0.5" stroke-width="2"/>'
        '<path d="M380 214 L420 190 M380 214 L430 226 M380 214 L400 258 M380 214 L352 256" stroke="#f4b65a" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/>'
        '<path d="M140 268 H620" stroke="#5fc7f3" stroke-width="3" stroke-linecap="round" stroke-opacity="0.7"/>'
        '<path d="M170 268 v-16 h60 v16 M420 268 v-22 h90 v22" stroke="#8595b4" stroke-width="3" stroke-opacity="0.8"/>'),
    # il percorso: 4 stazioni (robot, pressa, qualità, titanio) su una linea
    "percorso": _wrap(
        '<path d="M90 200 C 240 120, 420 260, 670 150" stroke="#5fc7f3" stroke-width="3" stroke-opacity="0.8"/>'
        '<circle cx="120" cy="186" r="12" fill="#0c1122" stroke="#f4b65a" stroke-width="3"/>'
        '<circle cx="300" cy="172" r="12" fill="#0c1122" stroke="#f4b65a" stroke-width="3"/>'
        '<circle cx="480" cy="216" r="12" fill="#0c1122" stroke="#f4b65a" stroke-width="3"/>'
        '<circle cx="650" cy="156" r="14" fill="#f4b65a"/>'
        '<path d="M120 230 h0 M300 216 h0" stroke="none"/>'
        '<text x="120" y="252" text-anchor="middle" font-family="space-mono" font-size="17" fill="#8595b4">ROBOT</text>'
        '<text x="300" y="238" text-anchor="middle" font-family="space-mono" font-size="17" fill="#8595b4">PRESSE</text>'
        '<text x="480" y="282" text-anchor="middle" font-family="space-mono" font-size="17" fill="#8595b4">QUALITÀ</text>'
        '<text x="650" y="120" text-anchor="middle" font-family="space-mono" font-size="17" fill="#f4b65a">TITANIO</text>'),
    # la mappa nascosta: punti sparsi che una linea rivela come costellazione
    "mappa": _wrap(
        '<circle cx="150" cy="120" r="6" fill="#eef2fb"/><circle cx="300" cy="220" r="6" fill="#eef2fb"/>'
        '<circle cx="420" cy="110" r="6" fill="#eef2fb"/><circle cx="560" cy="240" r="6" fill="#eef2fb"/>'
        '<circle cx="640" cy="130" r="8" fill="#f4b65a"/>'
        '<path d="M150 120 L300 220 L420 110 L560 240 L640 130" stroke="#5fc7f3" stroke-width="2.5" stroke-opacity="0.75"/>'
        '<circle cx="640" cy="130" r="22" stroke="#f4b65a" stroke-opacity="0.5" stroke-width="2"/>'),
    # la testa e l'impalcatura: profilo + struttura esterna che la sorregge
    "impalcatura": _wrap(
        '<circle cx="330" cy="180" r="86" stroke="#eef2fb" stroke-width="4"/>'
        '<path d="M330 130 v100 M290 180 h80" stroke="#8595b4" stroke-width="3" stroke-opacity="0.7"/>'
        '<path d="M450 96 v190 M520 96 v190 M450 130 h70 M450 200 h70 M450 260 h70" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
        '<path d="M416 180 h34" stroke="#f4b65a" stroke-width="4" stroke-linecap="round"/>'),
    # la taverna: porta piccola, luce dentro
    "taverna": _wrap(
        '<path d="M240 300 H540" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
        '<rect x="330" y="130" width="120" height="170" rx="8" stroke="#eef2fb" stroke-width="4" fill="#0c1122"/>'
        '<rect x="346" y="150" width="88" height="150" rx="6" fill="#f4b65a" fill-opacity="0.22"/>'
        '<circle cx="428" cy="222" r="6" fill="#f4b65a"/>'
        '<text x="390" y="96" text-anchor="middle" font-family="space-mono" font-size="18" fill="#8595b4">12 m²</text>'),
    # il socio: due nodi diversi, un legame che lavora
    "socio": _wrap(
        '<circle cx="250" cy="180" r="62" stroke="#f4b65a" stroke-width="4"/>'
        '<path d="M250 148 v64 M218 180 h64" stroke="#f4b65a" stroke-width="3" stroke-opacity="0.7"/>'
        '<rect x="452" y="118" width="124" height="124" rx="14" stroke="#5fc7f3" stroke-width="4"/>'
        '<circle cx="514" cy="180" r="10" fill="#5fc7f3"/>'
        '<path d="M312 180 H452" stroke="#eef2fb" stroke-width="4" stroke-linecap="round"/>'
        '<circle cx="382" cy="180" r="7" fill="#eef2fb"/>'),
    # la notte che lavora: luna + processi accesi
    "notte": _wrap(
        '<path d="M480 100 a70 70 0 1 0 66 96 a56 56 0 1 1 -66 -96" fill="#f4b65a" fill-opacity="0.85"/>'
        '<rect x="150" y="210" width="90" height="60" rx="8" stroke="#5fc7f3" stroke-width="3"/>'
        '<rect x="270" y="190" width="90" height="80" rx="8" stroke="#5fc7f3" stroke-width="3"/>'
        '<circle cx="195" cy="240" r="6" fill="#5fc7f3"/><circle cx="315" cy="230" r="6" fill="#5fc7f3"/>'
        '<path d="M195 210 v-26 M315 190 v-26" stroke="#5fc7f3" stroke-width="2.5" stroke-opacity="0.7"/>'),
    # il loop: milestone -> storia -> di nuovo dentro
    "loop": _wrap(
        '<path d="M380 96 a92 92 0 1 1 -0.1 0" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
        '<path d="M380 96 l-22 -18 M380 96 l-26 14" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
        '<circle cx="380" cy="188" r="12" fill="#f4b65a"/>'
        '<text x="380" y="330" text-anchor="middle" font-family="space-mono" font-size="17" fill="#8595b4">MILESTONE → STORIA → SISTEMA</text>'),
    # il patto: la stretta — due tratti che si incontrano su un sigillo
    "patto": _wrap(
        '<path d="M170 220 C 260 160, 330 160, 380 190" stroke="#f4b65a" stroke-width="5" stroke-linecap="round"/>'
        '<path d="M590 220 C 500 160, 430 160, 380 190" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
        '<circle cx="380" cy="192" r="16" fill="#0c1122" stroke="#eef2fb" stroke-width="4"/>'
        '<circle cx="380" cy="192" r="5" fill="#f4b65a"/>'),
    # i 5 pilastri
    "pilastri": _wrap(
        ''.join(f'<rect x="{150+i*100}" y="{140+(i%2)*14}" width="52" height="{170-(i%2)*14}" rx="6" stroke="{c}" stroke-width="4"/>'
                for i, c in enumerate(["#f4b65a", "#5fc7f3", "#eef2fb", "#5fc7f3", "#ec4899"]))
        + '<path d="M130 328 H660" stroke="#8595b4" stroke-width="3" stroke-opacity="0.7"/>'),
    # la stella polare / il capannone all'orizzonte
    "stella": _wrap(
        '<path d="M120 300 H640" stroke="#8595b4" stroke-width="3" stroke-opacity="0.7"/>'
        '<path d="M300 300 v-70 l80 -44 80 44 v70" stroke="#eef2fb" stroke-width="4" fill="none" stroke-linejoin="round"/>'
        '<circle cx="380" cy="96" r="9" fill="#f4b65a"/>'
        '<path d="M380 70 v-18 M380 122 v18 M354 96 h-18 M406 96 h18 M362 78 l-12 -12 M398 78 l12 -12 M362 114 l-12 12 M398 114 l12 12" stroke="#f4b65a" stroke-width="3" stroke-linecap="round"/>'),
    # la porta di Nina (per la slide-ponte): porticina rosa + perché
    "porta_nina": _wrap(
        '<rect x="340" y="140" width="100" height="150" rx="8" stroke="#ec4899" stroke-width="4" fill="#0c1122"/>'
        '<circle cx="420" cy="218" r="5" fill="#ec4899"/>'
        '<text x="390" y="106" text-anchor="middle" font-family="playfair-display" font-size="44" fill="#ec4899" font-style="italic">?</text>'),
}


def _slide(idx: int, meta: dict, s: dict, total: int) -> str:
    cover = idx == 1
    lead_cls = "lead cover-title" if cover else "lead"
    lead_style = ' style="font-size:78px"' if cover else ""
    scene = SCENES.get(s.get("scene", ""), "")
    seal = f'<div class="seal">{s["seal"]}</div>' if s.get("seal") else ""
    cta = f'<div class="cta">{s["cta"]}</div>' if s.get("cta") else ""
    intro = f'<div class="intro">{s["intro"]}</div>' if s.get("intro") else ""
    return f"""
<!-- ===== {idx} · {s.get('kicker','')} ===== -->
<div class="slide" data-canvas-width="1080" data-canvas-height="1350">
  <div class="grid"></div><div class="frame"></div>
  {flow(idx)}
  <div class="toplabel">{meta['toplabel']}</div>
  <div class="kicker">{s['kicker']}</div>
  <div class="scene">{scene}</div>
  <div class="body2">
    <div class="{lead_cls}"{lead_style}>{s['lead']}</div>
    {intro}{seal}{cta}
  </div>
  <div class="footer"><span>TITANIUM_OS</span><span class="dot">{meta['serie']} · {idx} / {total}</span><span class="matteo">matteo</span></div>
</div>"""


def build(folder: Path, meta: dict, slides: list[dict]) -> None:
    """UN SOLO taglio, sempre ≤10 (riconciliazione Matteo 14/07, GUIDA §1.0).
    Se la lista supera 10, entrano le slide con social=True; le ALTRE restano
    DATI nel _build_* — materiale per il carosello successivo (mai buttare)."""
    chosen = [s for s in slides if s.get("social")] if len(slides) > 10 else slides
    assert len(chosen) <= 10, f"carosello {len(chosen)} > 10 (spezzalo: un carosello in più)"
    extra = len(slides) - len(chosen)

    def doc(subset: list[dict]) -> str:
        total = len(subset)
        body = "".join(_slide(i + 1, meta, s, total) for i, s in enumerate(subset))
        return f"""<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>{meta['title']}</title>
<meta name="hz:slide-selector" content=".slide" />
<meta name="hz:canvas-width" content="1080" />
<meta name="hz:canvas-height" content="1350" />
<link rel="stylesheet" href="https://use.typekit.net/zhv2kry.css">
<style>{CSS}</style>
</head>
<body>
{body}
</body>
</html>"""

    (folder / "carosello.html").write_text(doc(chosen), encoding="utf-8")
    print(f"{folder.name}: {len(chosen)} slide (<=10) · {extra} extra conservate come materiale")
