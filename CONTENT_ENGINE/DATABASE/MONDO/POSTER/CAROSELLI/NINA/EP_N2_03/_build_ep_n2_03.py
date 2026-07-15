# _build_ep_n2_03.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v1.0 | 2026-07-15
# EP_N2_03 «Mille Volte Uguale» — PRIMO episodio del cammino con lo stampo nuovo
# (sessione #60, scaletta a 10 approvata da Matteo). Fonte VERBATIM dove possibile:
# episodes/S_AVVENTURA/EP_N2_03_mille_volte_uguale.md (canone, ready).
# Stampo serie PRE_01 v13 (style v12 + copertina §2-bis). Onde: il cammino CONTINUA
# l'onda globale del mondo — PRE 1-40, poi casella N = fase 40+(N-1)*10+1..10
# (EP_N2_03 → 61-70; EP_N2_01/02 prenderanno 41-50/51-60 quando rifatti a standard).
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12_STYLE_SRC = HERE.parent / "PRE_01" / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"

W, H = 1080, 1350
PHASE_OFFSET = 60  # casella 3 del cammino: fase 61-70 (dopo PRE 1-40 + caselle 1-2)

def waves(idx: int) -> str:
    def poly(y0, amp, period, phase, x0):
        pts = []
        x = -40
        while x <= 1112:
            xg = x0 + x
            y = y0 + amp * math.sin(2 * math.pi * xg / period + phase)
            pts.append(f"L {x} {y:.1f}" if pts else f"M {x} {y:.1f}")
            x += 16
        return " ".join(pts)
    x0 = (PHASE_OFFSET + idx - 1) * W
    cyan = poly(420, 26, 1440, 1.2, x0)
    gold = poly(1150, 58, 2160, -0.7, x0)
    return (f'<svg class="flow" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">'
            f'<defs><filter id="soft{idx}" x="-20%" y="-60%" width="140%" height="220%">'
            f'<feGaussianBlur stdDeviation="7"/></filter></defs>'
            f'<path d="{cyan}" fill="none" stroke="#5fc7f3" stroke-width="6" opacity="0.10" filter="url(#soft{idx})"/>'
            f'<path d="{gold}" fill="none" stroke="#f4b65a" stroke-width="11" opacity="0.18" filter="url(#soft{idx})" stroke-linecap="round"/>'
            f'<path d="{gold}" fill="none" stroke="#ffe6ad" stroke-width="1.6" opacity="0.32" stroke-linecap="round"/></svg>')

def scene(svg_inner: str, h: int = 380) -> str:
    return (f'<div class="scene"><svg width="760" height="{h}" viewBox="0 0 760 {h}" fill="none" '
            f'xmlns="http://www.w3.org/2000/svg">{svg_inner}</svg></div>')

GLOW_G = ('<radialGradient id="gg" cx="50%" cy="45%" r="60%">'
          '<stop offset="0%" stop-color="#f4b65a" stop-opacity="0.16"/>'
          '<stop offset="100%" stop-color="#f4b65a" stop-opacity="0"/></radialGradient>')
GLOW_C = ('<radialGradient id="gc" cx="50%" cy="45%" r="60%">'
          '<stop offset="0%" stop-color="#5fc7f3" stop-opacity="0.16"/>'
          '<stop offset="100%" stop-color="#5fc7f3" stop-opacity="0"/></radialGradient>')
GLOW_P = ('<radialGradient id="gp" cx="50%" cy="45%" r="60%">'
          '<stop offset="0%" stop-color="#ec4899" stop-opacity="0.14"/>'
          '<stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>')

def _pentagramma(y0: int, note_drift=True) -> str:
    """5 linee + note: le prime in fila, poi salgono fuori dal rigo (la deriva)."""
    lines = "".join(f'<path d="M170 {y0+i*16} H590" stroke="#8595b4" stroke-width="2" '
                    f'stroke-opacity="0.55"/>' for i in range(5))
    notes = []
    for k in range(10):
        x = 195 + k * 42
        drift = 0 if (not note_drift or k < 4) else int(((k - 3) ** 1.6) * 6)
        y = y0 + 48 - drift
        col = "#f4b65a" if drift <= 12 else "#ec4899"
        notes.append(f'<ellipse cx="{x}" cy="{y}" rx="9" ry="7" fill="{col}"/>'
                     f'<path d="M{x+8} {y-2} v-26" stroke="{col}" stroke-width="2.5"/>')
    return lines + "".join(notes)

SCENES = {
 # cover: il quaderno di musica — note in fila che scappano dal rigo
 1: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<rect x="140" y="86" width="480" height="212" rx="10" stroke="#8595b4" '
          'stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M380 86 v212" stroke="#8595b4" stroke-width="2" stroke-opacity="0.5"/>'
          + _pentagramma(130) +
          '<path d="M240 330 h280" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
 # il quaderno da vicino: «quando è diventato sbagliato?» — piano piano
 2: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          + _pentagramma(110) +
          '<path d="M195 300 h150" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M430 300 l16 -10 v20 Z" fill="#ec4899"/>'
          '<path d="M460 300 h110" stroke="#ec4899" stroke-width="4" stroke-linecap="round" stroke-opacity="0.7"/>'),
 # la cucitura: parte al centro, curva piano fino a uscire — il test della sarta
 3: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<rect x="130" y="120" width="500" height="150" rx="8" stroke="#8595b4" '
          'stroke-width="3" fill="#8595b4" fill-opacity="0.06"/>'
          '<path d="M150 195 H610" stroke="#8595b4" stroke-width="2" stroke-opacity="0.4"/>'
          '<path d="M150 195 C 300 195, 420 185, 500 165 C 550 152, 590 142, 615 132" '
          'stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round" '
          'stroke-dasharray="12 8"/>'
          '<path d="M600 118 v40 M580 138 h40" stroke="#ec4899" stroke-width="3" stroke-linecap="round"/>'),
 # la riga di gesso: il riferimento fermo, il controllo ogni dieci punti
 4: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M150 200 H610" stroke="#eef2fb" stroke-width="5" stroke-linecap="round" stroke-opacity="0.85"/>'
          '<path d="M150 208 H610" stroke="#eef2fb" stroke-width="2" stroke-opacity="0.25"/>'
          '<path d="M170 200 C 280 200, 420 198, 590 200" stroke="#f4b65a" stroke-width="4" '
          'fill="none" stroke-linecap="round" stroke-dasharray="12 8"/>'
          '<g stroke="#5fc7f3" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">'
          '<path d="M250 154 l9 10 l16 -22"/><path d="M390 154 l9 10 l16 -22"/>'
          '<path d="M530 154 l9 10 l16 -22"/></g>'),
 # la deriva: la Mappa Viva e l'ombra senza faccia — polvere che si posa
 5: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<g stroke="#5fc7f3" stroke-width="3"><circle cx="310" cy="160" r="8" fill="#5fc7f3"/>'
          '<circle cx="400" cy="210" r="8" fill="#5fc7f3"/><circle cx="330" cy="260" r="8" fill="#5fc7f3"/>'
          '<circle cx="470" cy="150" r="8" fill="#5fc7f3"/>'
          '<path d="M310 160 L400 210 L330 260 M400 210 L470 150" fill="none"/></g>'
          '<g fill="#fb7185" fill-opacity="0.55"><circle cx="540" cy="230" r="4"/>'
          '<circle cx="560" cy="252" r="3"/><circle cx="522" cy="256" r="3"/>'
          '<circle cx="548" cy="280" r="2.5"/><circle cx="575" cy="272" r="2.5"/>'
          '<circle cx="200" cy="130" r="3"/><circle cx="222" cy="116" r="2.5"/></g>'
          '<path d="M180 320 q190 -26 400 0" stroke="#fb7185" stroke-width="3" '
          'stroke-opacity="0.4" fill="none" stroke-linecap="round"/>'),
 # tenerla a bada: bilancia, orologio, calibro — tutti si ricontrollano
 6: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M240 150 v110 M200 260 h80 M240 150 l-52 44 M240 150 l52 44" '
          'stroke="#f4b65a" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M188 194 a22 14 0 0 0 44 0 Z M292 194 a22 14 0 0 1 -44 0 Z" '
          'stroke="#f4b65a" stroke-width="3" fill="#0c1122"/>'
          '<circle cx="420" cy="200" r="56" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<path d="M420 200 v-34 M420 200 l24 14" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M530 170 h110 M530 170 v70 M572 170 v54" stroke="#eef2fb" stroke-width="4" '
          'stroke-linecap="round" stroke-opacity="0.85"/>'
          '<path d="M530 240 h28 M572 224 h16" stroke="#eef2fb" stroke-width="3.5" '
          'stroke-linecap="round" stroke-opacity="0.85"/>'),
 # i venti chiodi di Forge: tutti uguali — tranne uno
 7: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M160 300 H600" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
          + "".join(
              f'<path d="M{200+k*46} 300 v-92 M{200+k*46-9} 208 h18" '
              f'stroke="{"#ec4899" if k == 5 else "#f4b65a"}" stroke-width="4" stroke-linecap="round"/>'
              + (f'<path d="M{200+k*46} 208 v-16" stroke="#ec4899" stroke-width="4" stroke-linecap="round"/>' if k == 5 else "")
              for k in range(8)) +
          '<path d="M430 132 l16 22 M446 132 l-16 22" stroke="#ec4899" stroke-width="0" fill="none"/>'),
 # la Pietra: il rombo ⟡0 acceso, colore rame caldo
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M380 96 l58 94 l-58 94 l-58 -94 Z" stroke="#f4b65a" stroke-width="5" '
          'fill="#f4b65a" fill-opacity="0.14" stroke-linejoin="round"/>'
          '<path d="M380 138 l32 52 l-32 52 l-32 -52 Z" stroke="#ffe6ad" stroke-width="2.5" '
          'fill="none" stroke-linejoin="round"/>'
          '<path d="M380 60 v-16 M470 190 h18 M290 190 h-18 M380 320 v16" '
          'stroke="#f4b65a" stroke-width="3" stroke-linecap="round" stroke-opacity="0.7"/>'),
 # provalo tu: linee copiate a mano che derivano vs righello fermo
 9: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          + "".join(f'<path d="M{215+k*22} 130 L{215+k*22+int((k**1.5)*3)} 270" '
                    f'stroke="#fb7185" stroke-width="3.5" stroke-linecap="round" stroke-opacity="0.8"/>'
                    for k in range(6)) +
          '<path d="M470 118 h44 v164 h-44 Z" stroke="#5fc7f3" stroke-width="3" fill="#5fc7f3" fill-opacity="0.08"/>'
          + "".join(f'<path d="M{548+k*22} 130 V270" stroke="#5fc7f3" stroke-width="3.5" stroke-linecap="round"/>'
                    for k in range(4))),
 # chiusura: la mappa — casella 3 accesa, casella 4 che aspetta
 10: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M150 300 C 260 280, 330 230, 400 200 C 470 170, 540 140, 620 110" '
          'stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M210 288 l13 13 l-13 13 l-13 -13 Z M320 234 l13 13 l-13 13 l-13 -13 Z" '
          'stroke="#f4b65a" stroke-width="3.5" fill="#f4b65a" fill-opacity="0.15"/>'
          '<path d="M430 182 l15 15 l-15 15 l-15 -15 Z" stroke="#ffe6ad" stroke-width="4" '
          'fill="#f4b65a" fill-opacity="0.5"/>'
          '<path d="M560 128 l14 14 l-14 14 l-14 -14 Z" stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
          '<text x="560" y="106" text-anchor="middle" font-family="playfair-display" '
          'font-size="30" fill="#5fc7f3" font-style="italic">?</text>'),
}

def slide(idx, kicker, body, scn=""):
    return f'''<!-- ===== {idx} ===== -->
<div class="slide" data-canvas-width="{W}" data-canvas-height="{H}">
  <div class="grid"></div><div class="frame"></div>
  {waves(idx)}
  <div class="toplabel">Titanium&nbsp;OS · L'Avventura</div>
  <div class="kicker">{kicker}</div>
  {scn}
  {body}
  <div class="footer"><span><span class="dot">⟡0</span>&nbsp;La Materia</span><span class="nina">NINA</span><span>{idx} / 10</span></div>
</div>
'''

def build():
    style = re.search(r"<style>(.*?)</style>", V12_STYLE_SRC.read_text(encoding="utf-8"), re.S).group(1)
    style += """
/* EP_N2_03 — copertina §2-bis (stampo serie = PRE_01 v13.1) */
.cover-title { font-size:72px; }
"""

    slides = []
    slides.append(slide(1, "EPISODIO 3 · ⟡0 LA MATERIA", '''
  <div class="body2" style="top:660px;">
    <div class="lead cover-title">Nessuno ha<br>sbagliato. Eppure è<br>tutto <span class="accent">storto</span>.</div>
  </div>''', SCENES[1]))

    slides.append(slide(2, "Il quaderno · di notte, alla Giuntura", '''
  <div class="body2 s2">
    <div class="lead">Le note scappano<br>dal <span class="pink">rigo</span>.</div>
    <div class="intro">Nina trova un vecchio quaderno di musica: le prime righe sono perfette, note in fila come soldatini. Poi, piano piano, cominciano a salire — fino a galleggiare fuori dal pentagramma. <span class="soft">«Ma quando è diventato sbagliato?»</span> chiede Themis. Nina guarda a lungo. «Non lo so. Piano piano.»</div>
    <div class="seal">Nessun errore grosso. Eppure alla fine è tutto storto.</div>
  </div>''', SCENES[2]))

    slides.append(slide(3, "La cucitura · il test della sarta", '''
  <div class="body2 s2">
    <div class="lead">Mezzo millimetro<br>alla <span class="accent">volta</span>.</div>
    <div class="intro">Sul banco della Fucina, una cucitura parte dritta al centro e finisce fuori di cinque centimetri. La sarta era brava: ogni punto giusto — ma spostato di mezzo millimetro dal precedente, sempre verso destra. <span class="soft">Mezzo millimetro non si vede. Dopo cento punti: cinque centimetri.</span></div>
    <div class="seal">Non c'è stato un momento in cui ha pensato «adesso sbaglio».</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "La riga di gesso · il riferimento", '''
  <div class="body2 s2">
    <div class="lead">Non ricorda —<br><span class="pink">controlla</span>.</div>
    <div class="intro">La sarta che vince fa così: segna una riga di gesso prima di cucire, e ogni dieci punti controlla che l'ago sia ancora sopra quella riga. <span class="soft">La memoria dell'ultimo punto si sposta con te. La riga di gesso no.</span></div>
    <div class="seal">Serve un punto fermo a cui tornare, ogni poco.</div>
  </div>''', SCENES[4]))

    slides.append(slide(5, "Il nemico · ha un nome", '''
  <div class="body2 s2">
    <div class="lead">Il nemico non<br><span class="accent">grida</span>.</div>
    <div class="intro">Nella sala della Mappa Viva, Themis mostra a Nina un'ombra che gira lenta lungo i bordi. Non è un mostro: non ha la faccia. È il Disordine, e in questo territorio ha un nome preciso: <span class="soft">la deriva</span>. Non decide di fare danni — sposta le cose di un soffio alla volta, finché non te ne accorgi più.</div>
    <div class="seal">Il quaderno, la cucitura: era lei.</div>
  </div>''', SCENES[5]))

    slides.append(slide(6, "Tenerla a bada · due mosse", '''
  <div class="body2 s2">
    <div class="lead">Non si ferma.<br>Si <span class="pink">tiene a bada</span>.</div>
    <div class="intro">Ogni strumento deriva — si sposta piano, senza che nessuno lo voglia. La cura è sempre la stessa, in due mosse:</div>
    <div class="trio">
      <div class="role"><span class="mk gold">⊙</span><div>Un <b>riferimento fermo</b>: qualcosa che non si sposta, a cui tornare — la bilancia si azzera col peso noto, l'orologio col segnale orario.</div></div>
      <div class="role"><span class="mk cyan">↻</span><div>Il <b>ricontrollo ogni N volte</b> — non una volta sola.</div></div>
      <div class="role"><span class="mk pink">⚖</span><div>«Anche il mio calibro deriva» dice Themis. <b>«Anch'io controllo. Sempre.»</b></div></div>
    </div>
  </div>''', SCENES[6]))

    slides.append(slide(7, "I venti chiodi · la Fucina", '''
  <div class="body2 s2">
    <div class="lead">Undici, undici,<br>undici… <span class="accent">e mezzo</span>.</div>
    <div class="intro">Forge allinea venti chiodi fatti a mano. Nina li misura col calibro: tutti undici millimetri — tranne il quindicesimo. Il fuoco era cambiato, il metallo era più caldo. <span class="soft">Forge se n'è accorto: misura ogni cinque.</span> I chiodi sbagliati sono in una cassa a parte, fuori dalla fila.</div>
    <div class="seal">«Ha tenuto a bada la deriva.» «Ha fatto il mestiere.»</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "La Pietra · ⟡0 · giro 3", '''
  <div class="body2 s2">
    <div class="lead">Una volta è fortuna.<br>Mille volte<br>è <span class="pink">metodo</span>.</div>
    <div class="intro">I grandi la chiamano calibrazione: confrontare lo strumento, ogni tanto, con uno zero fisso fuori dal sistema. <span class="soft">Senza ripetibilità non c'è conoscenza affidabile</span> — solo un'istantanea che potrebbe già essere sbagliata.</div>
    <div class="seal">⟡0 giro 3 — la ripetibilità: mille volte uguale.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "Provalo tu · due minuti", '''
  <div class="body2 s2">
    <div class="lead">La prova della<br><span class="accent">linea</span>.</div>
    <div class="intro">Disegna una linea dritta. Poi copiala dieci volte — ogni volta copiando l'ultima, senza righello. Guarda la decima: è storta, e non sai dire quando è successo. <span class="soft">Ora rifallo con un righello fisso: la linea resta dritta.</span></div>
    <div class="seal">Quello è il riferimento che batte la deriva. Si capisce con le mani.</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Casella accesa · e la prossima", '''
  <div class="body2 s2">
    <div class="lead">La casella tre<br>si <span class="pink">accende</span>.</div>
    <div class="intro">Nina ha la sua terza Pietra: la deriva non grida, si tiene a bada con un punto fermo e il ricontrollo. Ma Themis ha già la domanda nuova: <span class="soft">se lo spostamento è troppo piccolo per vederlo, come fai ad accorgertene?</span> Per rispondere serve una mappa che dice sempre la verità.</div>
    <div class="seal">Casella 4 · La Mappa che Non Mente →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · EP_N2_03 — Mille Volte Uguale (v1, 10 slide)</title>
<meta name="hz:slide-selector" content=".slide" />
<meta name="hz:canvas-width" content="{W}" />
<meta name="hz:canvas-height" content="{H}" />
<link rel="stylesheet" href="https://use.typekit.net/zhv2kry.css">
<style>{style}</style>
</head>
<body>

{"".join(slides)}
</body>
</html>
'''
    (HERE / "carosello.html").write_text(html, encoding="utf-8")
    print(f"OK EP_N2_03 v1: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
