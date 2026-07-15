# _build_pre_04.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v1.0 | 2026-07-15
# PRE_04 "Tutto è vero" — CHIUDE la serie preambolo Nina (4/4, sessione #60).
# Il patto di verità lato Nina (gemello di PRE_SG_03 «Il patto del racconto»):
# taverna/macchine/errori veri, la regola «Mostrami» vale per chi scrive, patto sui
# numeri (§7.7: niente numeri di progetto come fatti), 1 slide PONTE che presenta
# il binario Sistema (PONTE_SG_NINA: «due porte, una famiglia», mai più di una).
# Stampo serie PRE_01 v13 (style v12 + copertina §2-bis), onde in fase 31-40.
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12_STYLE_SRC = HERE.parent / "PRE_01" / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"
PRE_03 = HERE.parent / "PRE_03" / "carosello.html"

W, H = 1080, 1350
PHASE_OFFSET = 30  # PRE_01 = 1-10, PRE_02 = 11-20, PRE_03 = 21-30, PRE_04 = 31-40

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
 # sigillo del patto: cerchio-timbro con la Giuntura ⟡ dentro
 1: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<circle cx="380" cy="190" r="112" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<circle cx="380" cy="190" r="90" stroke="#f4b65a" stroke-width="1.6" stroke-opacity="0.4" fill="none"/>'
          '<path d="M380 132 l40 58 l-40 58 l-40 -58 Z" stroke="#ec4899" stroke-width="4" '
          'fill="#ec4899" fill-opacity="0.12"/>'
          '<path d="M364 190 l12 14 l22 -30" stroke="#f4b65a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
          '<path d="M240 320 h280" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
 # il patto: due cerchi (noi/voi) che si intrecciano, la Giuntura nel mezzo
 2: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<circle cx="310" cy="190" r="100" stroke="#f4b65a" stroke-width="3.5" fill="#f4b65a" fill-opacity="0.05"/>'
          '<circle cx="450" cy="190" r="100" stroke="#5fc7f3" stroke-width="3.5" fill="#5fc7f3" fill-opacity="0.05"/>'
          '<path d="M380 158 l22 32 l-22 32 l-22 -32 Z" stroke="#ec4899" stroke-width="4" fill="#0c1122"/>'),
 # la taverna: casa in sezione, la stanza sotto accesa, la luna sopra
 3: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M270 160 L380 92 L490 160" stroke="#8595b4" stroke-width="4" fill="none" stroke-linejoin="round"/>'
          '<path d="M290 160 v70 h180 v-70" stroke="#8595b4" stroke-width="3.5" fill="none"/>'
          '<path d="M180 230 H580" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
          '<rect x="320" y="242" width="120" height="66" rx="6" stroke="#f4b65a" stroke-width="4" fill="#f4b65a" fill-opacity="0.16"/>'
          '<path d="M348 276 h64 M380 258 v36" stroke="#f4b65a" stroke-width="3" stroke-linecap="round"/>'
          '<path d="M560 96 a40 40 0 1 0 30 64 a46 46 0 0 1 -30 -64" fill="#5fc7f3" fill-opacity="0.35"/>'),
 # le macchine: il portale/telaio in piedi + la piccola pressa accanto
 4: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M250 300 v-150 h180 v150" stroke="#5fc7f3" stroke-width="5" fill="none" stroke-linejoin="round"/>'
          '<path d="M232 150 h216" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M310 208 h60 M340 178 v60" stroke="#5fc7f3" stroke-width="3.5" stroke-linecap="round"/>'
          '<path d="M500 300 v-110 M580 300 v-110 M500 190 h80" stroke="#f4b65a" stroke-width="4" stroke-linecap="round"/>'
          '<rect x="510" y="226" width="60" height="18" rx="4" stroke="#f4b65a" stroke-width="3.5" fill="#f4b65a" fill-opacity="0.15"/>'
          '<path d="M190 300 H620" stroke="#8595b4" stroke-width="3.5" stroke-opacity="0.7" stroke-linecap="round"/>'),
 # gli sbagli: la linea che si spezza — e riparte più su; la luna delle notti mute
 5: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<path d="M160 280 C 230 268, 280 250, 330 236" stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M338 214 l24 -26 M336 188 l28 24" stroke="#fb7185" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M396 214 C 460 196, 540 160, 600 128" stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<circle cx="600" cy="128" r="7" fill="#f4b65a"/>'
          '<path d="M560 70 a30 30 0 1 0 22 48 a34 34 0 0 1 -22 -48" fill="#5fc7f3" fill-opacity="0.3"/>'),
 # il patto sui numeri: il calibro fermo e la clessidra — «non ancora»
 7: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M240 170 h280 M240 170 v70 M330 170 v54" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M240 240 h56 M330 224 h30" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M540 160 h80 l-28 46 l28 46 h-80 l28 -46 Z" stroke="#f4b65a" stroke-width="4" '
          'fill="#f4b65a" fill-opacity="0.10" stroke-linejoin="round"/>'
          '<circle cx="580" cy="238" r="5" fill="#f4b65a"/>'),
 # il PONTE: due porte (oro=Nina, ciano=Sistema) unite da un arco
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<rect x="200" y="140" width="100" height="160" rx="9" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<rect x="214" y="156" width="72" height="144" rx="6" fill="#f4b65a" fill-opacity="0.16"/>'
          '<circle cx="282" cy="226" r="5" fill="#f4b65a"/>'
          '<rect x="460" y="140" width="100" height="160" rx="9" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<rect x="474" y="156" width="72" height="144" rx="6" fill="#5fc7f3" fill-opacity="0.14"/>'
          '<circle cx="478" cy="226" r="5" fill="#5fc7f3"/>'
          '<path d="M300 150 C 340 96, 420 96, 460 150" stroke="#ec4899" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M150 300 H610" stroke="#8595b4" stroke-width="3.5" stroke-opacity="0.6" stroke-linecap="round"/>'),
 # il mondo che cresce: gradini che salgono, una Pietra nuova che si accende
 9: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M170 310 h110 v-56 h110 v-56 h110 v-56 h90" stroke="#8595b4" stroke-width="4" '
          'fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
          '<path d="M225 296 l13 13 l-13 13 l-13 -13 Z M335 240 l13 13 l-13 13 l-13 -13 Z" '
          'stroke="#f4b65a" stroke-width="3.5" fill="#f4b65a" fill-opacity="0.15"/>'
          '<path d="M445 184 l13 13 l-13 13 l-13 -13 Z" stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M556 128 l15 15 l-15 15 l-15 -15 Z" stroke="#ec4899" stroke-width="4" fill="#ec4899" fill-opacity="0.18"/>'
          '<path d="M556 96 v-14 M584 128 h14" stroke="#ec4899" stroke-width="3" stroke-linecap="round"/>'),
 # si parte: la porta aperta col fascio di luce (chiude il cerchio del PRE_01)
 10: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M410 305 L560 180 L560 305 Z" fill="#f4b65a" fill-opacity="0.10"/>'
          '<rect x="330" y="120" width="120" height="185" rx="10" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<rect x="346" y="140" width="88" height="165" rx="7" fill="#f4b65a" fill-opacity="0.16"/>'
          '<circle cx="426" cy="222" r="6" fill="#f4b65a"/>'
          '<path d="M390 96 l14 -20 l14 20 l-14 20 Z" stroke="#ec4899" stroke-width="3" fill="none"/>'
          '<path d="M120 330 H640" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>'),
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
  <div class="footer"><span><span class="dot">⟡</span>&nbsp;Il Patto</span><span class="nina">NINA</span><span>{idx} / 10</span></div>
</div>
'''

def build():
    style = re.search(r"<style>(.*?)</style>", V12_STYLE_SRC.read_text(encoding="utf-8"), re.S).group(1)
    style += """
/* PRE_04 — copertina §2-bis + volto libero (stampo serie = PRE_01 v13.1) */
.cover-title { font-size:76px; }
.ninaface { width:520px; height:420px; object-fit:cover; object-position:center 22%;
  -webkit-mask-image: radial-gradient(ellipse 62% 58% at 50% 46%, #000 46%, transparent 78%);
  mask-image: radial-gradient(ellipse 62% 58% at 50% 46%, #000 46%, transparent 78%); }
.scene-face { position:absolute; top:190px; left:0; right:0; height:420px;
  display:flex; align-items:center; justify-content:center; }
"""
    face = re.search(r'(data:image/\w+;base64,[A-Za-z0-9+/=]+)', PRE_03.read_text(encoding="utf-8")).group(1)
    face_scene = f'<div class="scene-face"><img class="ninaface" src="{face}" alt=""/></div>'

    slides = []
    slides.append(slide(1, "TUTTO È VERO · PRE 4 / 4", '''
  <div class="body2" style="top:660px;">
    <div class="lead cover-title">Le favole<br>si inventano.<br><span class="accent">Questa no.</span></div>
  </div>''', SCENES[1]))

    slides.append(slide(2, "Il patto · prima di partire", '''
  <div class="body2 s2">
    <div class="lead">Una promessa,<br>tra noi e <span class="pink">voi</span>.</div>
    <div class="intro">Prima di aprire la porta, l'ultima cosa — la più importante. Questo mondo ha una regola sola, e vale per chi lo scrive: <span class="soft">tutto quello che Nina scopre esiste davvero</span>.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">◆</span><div>La <b>taverna</b> esiste.</div></div>
      <div class="role"><span class="mk cyan">✦</span><div>Le <b>macchine</b> esistono.</div></div>
      <div class="role"><span class="mk pink">⟡</span><div>Perfino gli <b>sbagli</b> sono successi davvero.</div></div>
    </div>
    <div class="seal">Il resto è favola. Il cuore no.</div>
  </div>''', SCENES[2]))

    slides.append(slide(3, "È vero · La taverna", '''
  <div class="body2 s2">
    <div class="lead">Dodici metri quadri<br>di <span class="accent">officina</span>.</div>
    <div class="intro">Sotto una casa vera c'è una stanza vera: il banco, la saldatrice, il calibro. Ci lavora <span class="soft">un papà con quindici anni di officina</span> — di giorno il metallo, di notte il sistema. Nina è nata lì.</div>
    <div class="seal">Quando nella favola c'è la taverna, è quella.</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "È vero · Le macchine", '''
  <div class="body2 s2">
    <div class="lead">La macchina<br>è <span class="pink">in piedi</span>.</div>
    <div class="intro">In taverna sta nascendo una macchina che scolpisce il metallo: oggi è un telaio d'acciaio vero, coi pezzi scelti uno a uno. Accanto, una piccola pressa <span class="soft">costruita a mano</span>. Quando Nina misura e costruisce, là sotto si misura e si costruisce davvero.</div>
    <div class="seal">Niente cartone: acciaio.</div>
  </div>''', SCENES[4]))

    slides.append(slide(5, "È vero · Anche gli sbagli", '''
  <div class="body2 s2">
    <div class="lead">I disastri non<br>si <span class="accent">nascondono</span>.</div>
    <div class="intro">Una volta il sistema è rimasto muto per dieci notti, e nessuno se n'era accorto. È successo davvero — <span class="soft">ed è diventato una storia</span>. Qui gli errori non si cancellano: si raccontano, con la cura accanto.</div>
    <div class="seal">Nel mondo di Nina si sbaglia come nella vita: sul serio.</div>
  </div>''', SCENES[5]))

    slides.append(slide(6, "La regola di Nina · vale per tutti", '''
  <div class="body2 s2">
    <div class="lead">«Da dove lo sai?<br><span class="pink">Mostrami</span>.»</div>
    <div class="intro">È la frase di Nina — e comanda anche chi scrive. Ogni storia nasce da un fatto registrato: <span class="soft">una misura, una foto, una riga di codice</span>. Se un grande chiede la prova, la prova c'è.</div>
    <div class="seal">Nessuna storia senza qualcosa da mostrare.</div>
  </div>''', face_scene))

    slides.append(slide(7, "Il patto sui numeri", '''
  <div class="body2 s2">
    <div class="lead">Se non è provato,<br>si dice «<span class="accent">non ancora</span>».</div>
    <div class="intro">I numeri gonfiati rovinano le favole vere. Qui un numero entra solo quando la realtà l'ha dimostrato: <span class="soft">fino a quel giorno si racconta come stanno le cose</span> — cosa c'è già, cosa manca.</div>
    <div class="seal">Promettere poco. Mostrare tutto.</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "La porta gemella · Il Sistema", '''
  <div class="body2 s2">
    <div class="lead">Questo mondo ha<br>un <span class="pink">fratello</span>.</div>
    <div class="intro">Le storie vere di chi il sistema lo costruisce — l'officina, le notti, le decisioni — vivono in un binario tutto loro, raccontate <span class="soft">con la voce di chi le ha vissute</span>. Senza favola: il diario di bordo.</div>
    <div class="seal">Due porte, una famiglia: Nina e il Sistema.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "Perché restare", '''
  <div class="body2 s2">
    <div class="lead">Il mondo cresce<br>col <span class="accent">lavoro</span>.</div>
    <div class="intro">Questa mappa non è finita, ed è il bello: ogni cosa che nascerà là sotto — un pezzo, un attrezzo, uno sbaglio — <span class="soft">diventerà una storia qui sopra</span>. Chi resta non rilegge: vede nascere.</div>
    <div class="seal">Le storie arrivano al ritmo della taverna: quello vero.</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Si parte · Episodio 1", '''
  <div class="body2 s2">
    <div class="lead">Il preambolo<br>è <span class="pink">finito</span>.</div>
    <div class="intro">Le quattro porte sono aperte: il mondo, il metodo, i personaggi, il patto. Ora la prima avventura: <span class="soft">c'entrano dei bottoni, una sarta, e un pizzicore</span> che non lascia dormire.</div>
    <div class="seal">⟡0 La Materia — Episodio 1 · La Bambina che Chiedeva Perché →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · PRE_04 — Tutto è vero (v1, 10 slide)</title>
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
    print(f"OK PRE_04 v1: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
