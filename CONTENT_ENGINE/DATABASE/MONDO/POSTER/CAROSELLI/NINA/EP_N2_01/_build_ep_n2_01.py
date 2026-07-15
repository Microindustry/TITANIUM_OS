# _build_ep_n2_01.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v3.0 | 2026-07-15
# EP_N2_01 «La Bambina che Chiedeva Perché» A STANDARD (#60): 16→10 slide, un taglio,
# copertina §2-bis, stampo serie PRE_01 v13 (come EP_N2_03, il precedente del cammino).
# Fonte VERBATIM: episodes/S_AVVENTURA/EP_N2_01_la_bambina_che_chiedeva_perche.md.
# Onde: il cammino continua l'onda del mondo — casella 1 = fase 41-50.
# v1 (8 slide) e v2 (blueprint 16) restano in _VERSIONI.
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12_STYLE_SRC = HERE.parent / "PRE_01" / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"

W, H = 1080, 1350
PHASE_OFFSET = 40  # casella 1 del cammino: fase 41-50 (dopo PRE 1-40)

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

SCENES = {
 # cover: la porticina non vista, un filo di luce dalla fessura
 1: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<rect x="330" y="110" width="120" height="195" rx="10" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<path d="M446 130 L470 118 V300 L446 292 Z" fill="#f4b65a" fill-opacity="0.18"/>'
          '<circle cx="426" cy="216" r="6" fill="#f4b65a"/>'
          '<rect x="220" y="230" width="70" height="75" rx="6" stroke="#8595b4" stroke-width="3" '
          'stroke-opacity="0.6" fill="#0c1122"/>'
          '<rect x="240" y="176" width="56" height="54" rx="6" stroke="#8595b4" stroke-width="3" '
          'stroke-opacity="0.5" fill="#0c1122"/>'
          '<path d="M140 305 H640" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
 # il pizzicore: «è così e basta» — il punto interrogativo che pizzica
 2: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<path d="M330 230 C 330 140, 450 140, 450 210 C 450 252, 396 252, 396 282" '
          'stroke="#ec4899" stroke-width="6" fill="none" stroke-linecap="round"/>'
          '<circle cx="396" cy="320" r="7" fill="#ec4899"/>'
          '<path d="M300 130 l-14 -14 M480 130 l14 -14 M390 96 v-18" '
          'stroke="#f4b65a" stroke-width="3.5" stroke-linecap="round"/>'),
 # la Giuntura: il ponte tra Atomi (dado) e Bit (nodi di luce)
 3: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M150 240 C 280 170, 480 170, 610 240" stroke="#f4b65a" stroke-width="5" '
          'fill="none" stroke-linecap="round"/>'
          '<path d="M210 216 v54 M320 190 v80 M440 190 v80 M550 216 v54" '
          'stroke="#8595b4" stroke-width="3" stroke-opacity="0.6"/>'
          '<path d="M150 270 H610" stroke="#8595b4" stroke-width="3.5" stroke-opacity="0.7" stroke-linecap="round"/>'
          '<path d="M140 150 l22 0 l11 -19 l11 19 l22 0 l-11 19 l11 19 l-22 0 l-11 19 l-11 -19 l-22 0 l11 -19 Z" '
          'stroke="#f4b65a" stroke-width="3" fill="none"/>'
          '<circle cx="590" cy="130" r="6" fill="#5fc7f3"/><circle cx="622" cy="158" r="6" fill="#5fc7f3"/>'
          '<circle cx="580" cy="176" r="6" fill="#5fc7f3"/>'
          '<path d="M590 130 L622 158 L580 176" stroke="#5fc7f3" stroke-width="2.5" fill="none"/>'),
 # i due bottoni: identici all'occhio — uno regge, uno viene via
 4: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M170 300 H590" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
          '<circle cx="290" cy="200" r="46" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<circle cx="278" cy="192" r="5" fill="#f4b65a"/><circle cx="302" cy="192" r="5" fill="#f4b65a"/>'
          '<circle cx="278" cy="212" r="5" fill="#f4b65a"/><circle cx="302" cy="212" r="5" fill="#f4b65a"/>'
          '<circle cx="470" cy="200" r="46" stroke="#fb7185" stroke-width="4" fill="#0c1122" '
          'transform="rotate(14 470 200)"/>'
          '<circle cx="462" cy="192" r="5" fill="#fb7185"/><circle cx="484" cy="196" r="5" fill="#fb7185"/>'
          '<path d="M470 246 C 480 270, 500 278, 520 286" stroke="#fb7185" stroke-width="3" '
          'fill="none" stroke-linecap="round"/>'),
 # il gesto nascosto: il nodo dove non si vede ma dove tiene
 5: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<circle cx="380" cy="190" r="88" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<path d="M340 190 q20 -34 40 0 q20 34 40 0" stroke="#f4b65a" stroke-width="4" '
          'fill="none" stroke-linecap="round"/>'
          '<path d="M348 214 q32 22 64 0" stroke="#f4b65a" stroke-width="3" fill="none" '
          'stroke-linecap="round" stroke-dasharray="8 7"/>'
          '<path d="M300 110 l-18 -18 M460 110 l18 -18" stroke="#8595b4" stroke-width="3" '
          'stroke-opacity="0.6" stroke-linecap="round"/>'),
 # fatto bene = regge quando lo tiri: la mano che tira, il bottone che tiene
 6: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<circle cx="330" cy="200" r="42" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<path d="M372 200 H540 M540 200 l-20 -12 M540 200 l-20 12" '
          'stroke="#5fc7f3" stroke-width="4.5" fill="none" stroke-linecap="round"/>'
          '<path d="M300 260 q30 20 60 0" stroke="#8595b4" stroke-width="3" stroke-opacity="0.6" '
          'fill="none" stroke-linecap="round"/>'),
 # la materia non mente: il dado-atomo solido sulla bilancia della verità
 7: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M380 120 l52 30 v60 l-52 30 l-52 -30 v-60 Z" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<circle cx="380" cy="180" r="18" stroke="#f4b65a" stroke-width="4" fill="none"/>'
          '<path d="M300 300 H460" stroke="#8595b4" stroke-width="3" stroke-opacity="0.6" stroke-linecap="round"/>'),
 # la Pietra ⟡0 giro 1: il rombo acceso, la radice
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M380 96 l58 94 l-58 94 l-58 -94 Z" stroke="#f4b65a" stroke-width="5" '
          'fill="#f4b65a" fill-opacity="0.14" stroke-linejoin="round"/>'
          '<path d="M380 138 l32 52 l-32 52 l-32 -52 Z" stroke="#ffe6ad" stroke-width="2.5" '
          'fill="none" stroke-linejoin="round"/>'
          '<path d="M380 284 v40 M362 316 q18 14 36 0" stroke="#f4b65a" stroke-width="3" '
          'stroke-linecap="round" stroke-opacity="0.7" fill="none"/>'),
 # provalo tu: due aeroplanini — uno plana, uno cade
 9: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M180 160 l120 28 l-96 24 l-14 34 Z" stroke="#5fc7f3" stroke-width="3.5" '
          'fill="#5fc7f3" fill-opacity="0.10" stroke-linejoin="round"/>'
          '<path d="M310 196 C 400 190, 480 200, 560 220" stroke="#5fc7f3" stroke-width="3" '
          'stroke-dasharray="10 8" fill="none" stroke-linecap="round"/>'
          '<path d="M430 120 l86 20 l-68 18 l-10 24 Z" stroke="#fb7185" stroke-width="3.5" '
          'fill="#fb7185" fill-opacity="0.10" stroke-linejoin="round" transform="rotate(38 470 150)"/>'
          '<path d="M500 190 C 520 230, 526 264, 528 296" stroke="#fb7185" stroke-width="3" '
          'stroke-dasharray="10 8" fill="none" stroke-linecap="round"/>'),
 # chiusura: Nina nel buio col bottone + la scala che scende nel caldo (casella 2)
 10: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<circle cx="280" cy="180" r="36" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<circle cx="270" cy="174" r="4" fill="#f4b65a"/><circle cx="290" cy="174" r="4" fill="#f4b65a"/>'
          '<circle cx="270" cy="190" r="4" fill="#f4b65a"/><circle cx="290" cy="190" r="4" fill="#f4b65a"/>'
          '<path d="M470 130 h60 l-14 34 h-60 Z M456 164 h60 l-14 34 h-60 Z M442 198 h60 l-14 34 h-60 Z" '
          'stroke="#fb7185" stroke-width="3" fill="#fb7185" fill-opacity="0.08"/>'
          '<path d="M420 268 q40 22 96 10" stroke="#fb7185" stroke-width="3" stroke-opacity="0.6" '
          'fill="none" stroke-linecap="round"/>'),
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
/* EP_N2_01 v3 — copertina §2-bis (stampo serie = PRE_01 v13.1) */
.cover-title { font-size:74px; }
"""

    slides = []
    slides.append(slide(1, "EPISODIO 1 · ⟡0 LA MATERIA", '''
  <div class="body2" style="top:660px;">
    <div class="lead cover-title">C'era una bambina<br>con una domanda<br>di <span class="accent">troppo</span>.</div>
  </div>''', SCENES[1]))

    slides.append(slide(2, "Il pizzicore · dove tutto comincia", '''
  <div class="body2 s2">
    <div class="lead">«È così<br>e <span class="pink">basta</span>.»</div>
    <div class="intro">Quando glielo dicevano, Nina sentiva un pizzicore dietro le orecchie — come quando stai per starnutire e non starnutisci. <span class="soft">Perché è così? E perché proprio così, e non in un altro modo?</span> Quel giorno, dietro tre scatoloni, trovò una porticina che nessuno vedeva. Chiese «perché c'è una porta, qui?»</div>
    <div class="seal">E siccome nessuno rispondeva, l'aprì.</div>
  </div>''', SCENES[2]))

    slides.append(slide(3, "La Giuntura · il ponte", '''
  <div class="body2 s2">
    <div class="lead">Due mondi?<br><span class="accent">Lo stesso</span>.</div>
    <div class="intro">Dietro la porta, un ponte di ferro e di luce: da una parte gli <span class="soft">Atomi</span> — la roba che pesa, che si rompe, che sporca le mani — dall'altra i <span class="soft">Bit</span> — la roba che si scrive, si conta, corre. «Quasi tutti credono che siano due mondi» dice Themis, la custode. «Non lo sono. E questo ponte lo dimostra.»</div>
    <div class="seal">Nina chiese: «Perché?» — «Brava. Hai già lo strumento più importante.»</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "I due bottoni · il banco di legno", '''
  <div class="body2 s2">
    <div class="lead">Identici.<br><span class="pink">Sembrano</span>.</div>
    <div class="intro">Sul banco, due bottoni sulla stessa stoffa: stesso bottone, stesso filo, perfino la luce ci cade uguale. «Tira.» <span class="soft">Il primo regge</span> — la stoffa si tende, il bottone non si muove. <span class="soft">Il secondo viene via al primo strappo</span>, con un filo penzolante e un buchino slabbrato.</div>
    <div class="seal">«Perché? Sono identici.» — «All'occhio, sì.»</div>
  </div>''', SCENES[4]))

    slides.append(slide(5, "Il gesto nascosto", '''
  <div class="body2 s2">
    <div class="lead">La differenza<br>non si <span class="accent">vede</span>.</div>
    <div class="intro">Il primo l'ha cucito chi sapeva <em>come</em>: il filo passato il numero giusto di volte, il nodo fatto dove non si vede ma dove tiene. Il secondo, qualcuno di fretta — «tanto si vede uguale». <span class="soft">E infatti si vede uguale. Finché non serve davvero:</span> con il nodo regge oltre cento tirate, senza cede in dieci-venti.</div>
    <div class="seal">Una cosa fatta bene e una a casaccio possono sembrare identiche.</div>
  </div>''', SCENES[5]))

    slides.append(slide(6, "La prima verità del Mestiere", '''
  <div class="body2 s2">
    <div class="lead">Fatto bene<br>non è <span class="pink">bello</span>.</div>
    <div class="intro">Nina guardò i due bottoni a lungo. Poi disse, piano: «Allora <em>fatto bene</em> non vuol dire <em>bello</em>.» «No» disse Themis, e stavolta era contenta sul serio. <span class="soft">«Vuol dire vero. Una cosa fatta bene è una cosa che regge quando la tiri.»</span></div>
    <div class="seal">La differenza si sente nel momento esatto in cui deve fare il suo lavoro.</div>
  </div>''', SCENES[6]))

    slides.append(slide(7, "La maestra più onesta", '''
  <div class="body2 s2">
    <div class="lead">La materia non<br>dice <span class="accent">bugie</span>.</div>
    <div class="intro">«Ma io non so cucire un bottone così» disse Nina. «Certo che no. Nessuno nasce sapendolo. Non è quello il punto.» Il punto è non spegnere il pizzicore — chiedere <em>perché funziona?</em> e poi <span class="soft">andare a provarlo con le mani</span>. E si parte dalla roba che pesa, perché qui non si può barare: o il bottone regge, o non regge.</div>
    <div class="seal">Per questo il viaggio comincia dagli Atomi.</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "La Pietra · ⟡0 · giro 1", '''
  <div class="body2 s2">
    <div class="lead">Regge quando<br>lo <span class="pink">tiri</span>.</div>
    <div class="intro">È la radice di tutto il cammino: ciò che funziona davvero parte da un gesto fatto bene su qualcosa di vero. <span class="soft">E vale anche di là dal ponte:</span> una saldatura ben fatta e una riga di codice ben scritta fanno la stessa identica cosa — prendono il disordine e lo rendono solido e ripetibile.</div>
    <div class="seal">⟡0 giro 1 — fatto bene = vero, non bello.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "Provalo tu · due minuti", '''
  <div class="body2 s2">
    <div class="lead">Uno con calma,<br>uno di <span class="accent">corsa</span>.</div>
    <div class="intro">Prendi due cose fatte allo stesso modo — due nodi alle scarpe, due torri di costruzioni, due aeroplanini di carta. Fanne uno con calma e uno di corsa. <span class="soft">Poi mettili alla prova: cammina, soffia, tira.</span> Quale regge?</div>
    <div class="seal">Hai chiesto perché — e sei andato a vedere. È la superpotenza.</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Casella accesa · e la prossima", '''
  <div class="body2 s2">
    <div class="lead">Il bottone,<br>nel <span class="pink">buio</span>.</div>
    <div class="intro">Quella notte Nina non dormì subito: tirava il bottone in tasca per sentirlo reggere. Ma Themis aveva detto una cosa strana: il filo passato <em>«il numero giusto di volte»</em>. <span class="soft">Quanto è il giusto? E se la differenza tra regge e non regge si potesse… misurare?</span> Alla casella dopo c'è una fucina che scende nel caldo — e un soffio che fa la differenza.</div>
    <div class="seal">Casella 2 · Il Soffio di Troppo →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · EP_N2_01 — La Bambina che Chiedeva Perché (v3, 10 slide)</title>
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
    print(f"OK EP_N2_01 v3: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
