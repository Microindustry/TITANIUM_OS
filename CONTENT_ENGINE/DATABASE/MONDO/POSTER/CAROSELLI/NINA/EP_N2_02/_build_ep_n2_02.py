# _build_ep_n2_02.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v2.0 | 2026-07-15
# EP_N2_02 «Il Soffio di Troppo» A STANDARD (#60): 16→10 slide, un taglio,
# copertina §2-bis, stampo serie PRE_01 v13 (come EP_N2_03, il precedente del cammino).
# Fonte VERBATIM: episodes/S_AVVENTURA/EP_N2_02_il_soffio_di_troppo.md.
# Onde: il cammino continua l'onda del mondo — casella 2 = fase 51-60.
# v1 (blueprint 16) resta in _VERSIONI.
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12_STYLE_SRC = HERE.parent / "PRE_01" / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"

W, H = 1080, 1350
PHASE_OFFSET = 50  # casella 2 del cammino: fase 51-60

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

def _incastro(x, y, gap, col):
    """Due blocchi con incastro maschio/femmina; gap = distanza tra i pezzi."""
    return (f'<path d="M{x} {y} h100 v34 h34 v34 h-34 v34 h-100 Z" stroke="{col}" '
            f'stroke-width="4" fill="#0c1122" stroke-linejoin="round"/>'
            f'<path d="M{x+134+gap} {y} h100 v102 h-100 v-34 h-32 v-34 h32 Z" stroke="{col}" '
            f'stroke-width="4" fill="#0c1122" stroke-linejoin="round"/>')

SCENES = {
 # cover: l'incastro quasi chiuso + il soffio (tre onde leggere)
 1: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          + _incastro(230, 140, 18, "#f4b65a") +
          '<path d="M180 120 q14 10 0 20 q-14 10 0 20 M156 130 q12 8 0 16 q-12 8 0 16" '
          'stroke="#5fc7f3" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
          '<path d="M170 320 H590" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
 # la Fucina: la scala che scende nel caldo, la luce arancione dal basso
 2: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<path d="M480 110 h70 l-16 40 h-70 Z M464 150 h70 l-16 40 h-70 Z M448 190 h70 l-16 40 h-70 Z '
          'M432 230 h70 l-16 40 h-70 Z" stroke="#f4b65a" stroke-width="3" fill="#f4b65a" fill-opacity="0.07"/>'
          '<ellipse cx="330" cy="300" rx="130" ry="26" fill="#f4b65a" fill-opacity="0.18"/>'
          '<path d="M300 268 q10 -22 24 0 q12 -18 22 0" stroke="#f4b65a" stroke-width="3.5" '
          'fill="none" stroke-linecap="round"/>'),
 # giusto rispetto a cosa: l'incastro scorrevole — mezzo mm di qua o di là
 3: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          + _incastro(230, 150, 10, "#5fc7f3") +
          '<path d="M395 120 v-24 M395 96 l-9 12 M395 96 l9 12" stroke="#ec4899" stroke-width="3" '
          'stroke-linecap="round" fill="none"/>'
          '<path d="M250 310 h260" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
 # il filo della sarta: seta piano, lana forte — stessa mano, due tensioni
 4: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<rect x="170" y="140" width="180" height="120" rx="10" stroke="#8595b4" stroke-width="3" '
          'stroke-opacity="0.7" fill="#0c1122"/>'
          '<path d="M190 200 q70 -18 140 0" stroke="#f4b65a" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
          '<rect x="410" y="140" width="180" height="120" rx="10" stroke="#8595b4" stroke-width="4" fill="#0c1122"/>'
          '<path d="M430 200 h140" stroke="#f4b65a" stroke-width="5" stroke-linecap="round"/>'
          '<circle cx="260" cy="200" r="14" stroke="#f4b65a" stroke-width="3" fill="#0c1122"/>'
          '<circle cx="500" cy="200" r="14" stroke="#f4b65a" stroke-width="3" fill="#0c1122"/>'),
 # l'incastro fisso: si preme col palmo — quattro decimi più stretto
 5: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          + _incastro(230, 170, 0, "#f4b65a") +
          '<path d="M395 130 v-40 M377 108 l18 22 l18 -22" stroke="#f4b65a" stroke-width="4" '
          'stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
          '<path d="M250 320 h260" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
 # la conseguenza: il calibro e il punto interrogativo — cosa succede se sbagli?
 6: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M240 170 h280 M240 170 v70 M330 170 v54" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M240 240 h56 M330 224 h30" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M560 150 C 560 110, 620 110, 620 146 C 620 170, 590 170, 590 190" '
          'stroke="#ec4899" stroke-width="5" fill="none" stroke-linecap="round"/>'
          '<circle cx="590" cy="220" r="6" fill="#ec4899"/>'),
 # parola vuota: "preciso" tra virgolette che si sgonfia — preciso per fare cosa?
 7: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<path d="M300 130 q-24 8 -24 30 M320 130 q-24 8 -24 30" stroke="#8595b4" stroke-width="4" '
          'stroke-linecap="round" fill="none"/>'
          '<path d="M460 220 q24 -8 24 -30 M440 220 q24 -8 24 -30" stroke="#8595b4" stroke-width="4" '
          'stroke-linecap="round" fill="none"/>'
          '<path d="M330 176 h100" stroke="#fb7185" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 8"/>'
          '<path d="M380 260 v24 M380 296 v2" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'),
 # la Pietra ⟡0 giro 2: il rombo acceso, il patto
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M380 96 l58 94 l-58 94 l-58 -94 Z" stroke="#f4b65a" stroke-width="5" '
          'fill="#f4b65a" fill-opacity="0.14" stroke-linejoin="round"/>'
          '<path d="M380 138 l32 52 l-32 52 l-32 -52 Z" stroke="#ffe6ad" stroke-width="2.5" '
          'fill="none" stroke-linejoin="round"/>'
          '<path d="M290 190 h-24 M470 190 h24" stroke="#f4b65a" stroke-width="3" '
          'stroke-linecap="round" stroke-opacity="0.7"/>'),
 # provalo tu: la stessa linea su superfici diverse
 9: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<rect x="170" y="130" width="120" height="140" rx="8" stroke="#8595b4" stroke-width="3" fill="#0c1122"/>'
          '<path d="M200 160 v80" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
          '<rect x="320" y="130" width="120" height="140" rx="8" stroke="#8595b4" stroke-width="3" fill="#0c1122"/>'
          '<path d="M350 160 C 356 190, 346 220, 356 240" stroke="#5fc7f3" stroke-width="4" '
          'fill="none" stroke-linecap="round"/>'
          '<rect x="470" y="130" width="120" height="140" rx="8" stroke="#8595b4" stroke-width="3" fill="#0c1122"/>'
          '<path d="M500 160 C 512 180, 496 214, 514 240" stroke="#5fc7f3" stroke-width="4" '
          'stroke-opacity="0.5" fill="none" stroke-linecap="round" stroke-dasharray="8 7"/>'),
 # chiusura: la casella 2 accesa + il quaderno che aspetta (casella 3)
 10: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M150 300 C 260 280, 330 230, 400 200 C 470 170, 540 140, 620 110" '
          'stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M210 288 l13 13 l-13 13 l-13 -13 Z" stroke="#f4b65a" stroke-width="3.5" '
          'fill="#f4b65a" fill-opacity="0.15"/>'
          '<path d="M320 234 l15 15 l-15 15 l-15 -15 Z" stroke="#ffe6ad" stroke-width="4" '
          'fill="#f4b65a" fill-opacity="0.5"/>'
          '<path d="M430 182 l14 14 l-14 14 l-14 -14 Z M560 128 l14 14 l-14 14 l-14 -14 Z" '
          'stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
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
/* EP_N2_02 v2 — copertina §2-bis (stampo serie = PRE_01 v13.1) */
.cover-title { font-size:74px; }
"""

    slides = []
    slides.append(slide(1, "EPISODIO 2 · ⟡0 LA MATERIA", '''
  <div class="body2" style="top:660px;">
    <div class="lead cover-title">Un soffio lo fa<br>entrare. Un soffio<br>lo <span class="accent">rompe</span>.</div>
  </div>''', SCENES[1]))

    slides.append(slide(2, "La Fucina · la scala nel caldo", '''
  <div class="body2 s2">
    <div class="lead">«La mano deve<br>sapere <span class="pink">prima</span>.»</div>
    <div class="intro">Dietro la libreria di Themis, una scala scende nel caldo. In fondo, Forge guarda due blocchi di legno: uno con una sporgenza, uno con un incavo. Avvicina i pezzi — la sporgenza entra per metà, si ferma. <span class="soft">Poi soffia. Un soffio leggero, quasi niente.</span> Il pezzo scivola dentro fino in fondo. Combacia.</div>
    <div class="seal">Nina rimane ferma: «Un soffio?»</div>
  </div>''', SCENES[2]))

    slides.append(slide(3, "La domanda · giusto rispetto a cosa?", '''
  <div class="body2 s2">
    <div class="lead">«Giusti rispetto<br>a <span class="accent">cosa</span>?»</div>
    <div class="intro">«Perché funzionava un soffio e non di più?» chiede Themis. È un mobile: i pezzi devono scorrere. <span class="soft">Più stretto di mezzo millimetro, si inceppa. Più largo di mezzo millimetro, balla.</span> Mezzo millimetro — meno dello spessore di un'unghia. Le mani di Forge l'avevano sentito senza nessuno strumento.</div>
    <div class="seal">«Quello è il patto.»</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "Il filo della sarta", '''
  <div class="body2 s2">
    <div class="lead">Stesse mani,<br>due <span class="pink">gesti</span>.</div>
    <div class="intro">Themis posa ago, filo, seta sottile e lana grezza. Un bottone sulla seta: Nina tira il filo piano, in punta di dita. Lo stesso bottone su uno zaino di lana da portare in montagna: <span class="soft">stringe quasi due volte tanto</span>. Stesse mani, stesso filo, stesso bottone — due cose diverse.</div>
    <div class="seal">La precisione non è nel filo: è nella relazione tra filo, tessuto e peso.</div>
  </div>''', SCENES[4]))

    slides.append(slide(5, "L'incastro fisso · niente soffio", '''
  <div class="body2 s2">
    <div class="lead">Questo non deve<br><span class="accent">scorrere</span>.</div>
    <div class="intro">Terzo pezzo: un'asse portante, unita per sempre. Forge non soffia — preme con tutto il palmo, i pezzi entrano lenti, e non si muovono più. L'incastro è più stretto di <span class="soft">quattro decimi</span>. Con il gioco dello scorrevole? Cede sotto carico. Ancora più stretto? Non entra, o spacca il legno.</div>
    <div class="seal">Tra «combacia» e «si rompe» c'è una questione di gradi. Non di sì o no.</div>
  </div>''', SCENES[5]))

    slides.append(slide(6, "La domanda che devi farti sempre", '''
  <div class="body2 s2">
    <div class="lead">La conseguenza<br>se <span class="pink">sbagli</span>.</div>
    <div class="intro">«Come fa Forge a sapere qual è la tolleranza giusta?» «Conosce il pezzo. Conosce l'uso. Conosce il materiale. <span class="soft">E conosce la conseguenza se sbaglia.</span>» Non: sono abbastanza preciso? Ma: cosa succede se non lo sono abbastanza?</div>
  </div>''', SCENES[6]))

    slides.append(slide(7, "«Preciso» da solo è vuoto", '''
  <div class="body2 s2">
    <div class="lead">Preciso per<br>fare <span class="accent">cosa</span>?</div>
    <div class="intro">«Quando qualcuno dice che ha fatto una cosa "precisa"» dice Nina «non sta dicendo niente, se non dice rispetto a cosa.» Themis sorride — quello vero. <span class="soft">«Preciso per scorrere in un mobile» è un'informazione. «Preciso per portare un solaio» è un'altra.</span></div>
    <div class="seal">«Controlla i fatti, non le parole.»</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "La Pietra · ⟡0 · giro 2", '''
  <div class="body2 s2">
    <div class="lead">La precisione<br>è un <span class="pink">patto</span>.</div>
    <div class="intro">Tra te, il pezzo, e quello che il pezzo deve fare. I grandi la chiamano tolleranza: <span class="soft">un accoppiamento scorrevole vive di mezzo millimetro, uno portante di un decimo</span> — e il filo della sarta si misura in grammi: leggero sulla seta, quattro volte tanto sulla lana. Nessuno dei due è «preciso in assoluto».</div>
    <div class="seal">⟡0 giro 2 — «giusto» esiste solo rispetto a cosa succede dopo.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "Provalo tu · due minuti", '''
  <div class="body2 s2">
    <div class="lead">La stessa linea,<br>tre <span class="accent">superfici</span>.</div>
    <div class="intro">Disegna una linea dritta su carta normale. Poi la stessa linea su cartone, e su un vetro appannato. <span class="soft">Il gesto è uguale ogni volta — il risultato cambia.</span> La tua mano non è diventata meno precisa: è il patto tra mano, strumento e superficie che è diverso.</div>
    <div class="seal">Quale linea è «più precisa»? Dipende da cosa volevi fare.</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Casella accesa · e la prossima", '''
  <div class="body2 s2">
    <div class="lead">Il calibro,<br>in <span class="pink">tasca</span>.</div>
    <div class="intro">La casella 2 si accende, arancione come la Fucina. Nina ha il patto — ma il patto va anche <em>mantenuto</em>: come fai a sapere che una cosa resta giusta nel tempo? <span class="soft">Alla casella dopo c'è un quaderno di musica dove nessuno ha sbagliato — eppure è tutto storto.</span></div>
    <div class="seal">Casella 3 · Mille Volte Uguale →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · EP_N2_02 — Il Soffio di Troppo (v2, 10 slide)</title>
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
    print(f"OK EP_N2_02 v2: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
