# _build_pre_01_v13.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v13 | 2026-07-15
# PRE_01 "Il Mondo di Nina" RIFATTO DA 0 (INSIEME, sessione #59): 10 slide, un taglio,
# copertina §2-bis (cover-title), regole GUIDA §7 (slide-carne, chiusura=perché restare,
# open loop con assaggio). Riusa VERBATIM lo <style> della v12 (stile "buonanotte" vinto)
# e il volto definitivo di Nina (base64 da PRE_03, canone #50). Onde di sfondo continue
# L→R tra le slide (fase globale). I contenuti dei simboli/Giuntura/⟡0 sono canone v12.
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12 = HERE / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"
PRE_03 = HERE.parent / "PRE_03" / "carosello.html"

W, H = 1080, 1350

def waves(idx: int) -> str:
    """Onde di sfondo con continuità tra slide (fase = posizione globale)."""
    def poly(y0, amp, period, phase, x0):
        pts = []
        x = -40
        while x <= 1112:
            xg = x0 + x
            y = y0 + amp * math.sin(2 * math.pi * xg / period + phase)
            pts.append(f"L {x} {y:.1f}" if pts else f"M {x} {y:.1f}")
            x += 16
        return " ".join(pts)
    x0 = (idx - 1) * W
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

def door(open_beam: bool = False) -> str:
    beam = ('<path d="M410 305 L560 180 L560 305 Z" fill="#f4b65a" fill-opacity="0.10"/>'
            if open_beam else "")
    return (f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>{beam}'
            '<rect x="330" y="120" width="120" height="185" rx="10" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
            '<rect x="346" y="140" width="88" height="165" rx="7" fill="#f4b65a" fill-opacity="0.16"/>'
            '<circle cx="426" cy="222" r="6" fill="#f4b65a"/>'
            '<path d="M390 96 l14 -20 l14 20 l-14 20 Z" stroke="#ec4899" stroke-width="3" fill="none"/>'
            '<path d="M120 330 H640" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5" stroke-linecap="round"/>')

SCENES = {
 1: scene(door()),
 3: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M180 300 H580" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M210 300 v-46 h140 v46 M470 300 v-60 h90 v60" stroke="#8595b4" stroke-width="3" stroke-opacity="0.8"/>'
          '<circle cx="280" cy="210" r="8" fill="#f4b65a"/><path d="M280 218 v36" stroke="#f4b65a" stroke-width="2.5"/>'
          '<path d="M560 120 a44 44 0 1 0 34 72 a52 52 0 0 1 -34 -72" fill="#5fc7f3" fill-opacity="0.35"/>',),
 4: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<circle cx="320" cy="210" r="96" stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
          '<circle cx="480" cy="248" r="58" stroke="#ec4899" stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M292 196 q28 30 56 0 M462 240 q18 20 36 0" stroke="#eef2fb" stroke-width="3" fill="none" stroke-linecap="round"/>'),
 5: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<circle cx="310" cy="195" r="105" stroke="#f4b65a" stroke-width="3.5" fill="#f4b65a" fill-opacity="0.05"/>'
          '<circle cx="450" cy="195" r="105" stroke="#5fc7f3" stroke-width="3.5" fill="#5fc7f3" fill-opacity="0.05"/>'
          '<path d="M262 182 l22 0 l11 -19 l11 19 l22 0 l-11 19 l11 19 l-22 0 l-11 19 l-11 -19 l-22 0 l11 -19 Z" '
          'transform="translate(-8,0)" stroke="#f4b65a" stroke-width="3" fill="none"/>'
          '<circle cx="482" cy="168" r="6" fill="#5fc7f3"/><circle cx="512" cy="200" r="6" fill="#5fc7f3"/>'
          '<circle cx="470" cy="222" r="6" fill="#5fc7f3"/>'
          '<path d="M482 168 L512 200 L470 222" stroke="#5fc7f3" stroke-width="2.5" fill="none"/>'),
 6: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M120 190 l26 -26 l26 26 l-26 26 Z" stroke="#f4b65a" stroke-width="4" fill="#f4b65a" fill-opacity="0.10"/>'
          '<g stroke="#5fc7f3" stroke-width="3"><circle cx="306" cy="170" r="7" fill="#5fc7f3"/>'
          '<circle cx="342" cy="204" r="7" fill="#5fc7f3"/><circle cx="298" cy="216" r="7" fill="#5fc7f3"/>'
          '<path d="M306 170 L342 204 L298 216" fill="none"/></g>'
          '<path d="M470 164 l26 26 l-26 26 l-26 -26 Z" stroke="#ec4899" stroke-width="4" fill="none"/>'
          '<path d="M614 164 l26 26 l-26 26 l-26 -26 Z" stroke="#eef2fb" stroke-width="4" fill="#eef2fb" fill-opacity="0.14"/>'
          '<path d="M120 300 H640" stroke="#8595b4" stroke-width="2.5" stroke-opacity="0.5"/>'),
 7: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M110 320 C 240 300, 300 220, 400 200 S 620 130, 660 90" stroke="#f4b65a" '
          'stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M200 296 l14 14 l-14 14 l-14 -14 Z M400 186 l14 14 l-14 14 l-14 -14 Z '
          'M600 116 l14 14 l-14 14 l-14 -14 Z" stroke="#eef2fb" stroke-width="3.5" fill="#0c1122"/>'),
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M380 120 l52 30 v60 l-52 30 l-52 -30 v-60 Z" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<circle cx="380" cy="180" r="18" stroke="#f4b65a" stroke-width="4" fill="none"/>'
          '<path d="M300 300 H460" stroke="#8595b4" stroke-width="3" stroke-opacity="0.6" stroke-linecap="round"/>'),
 9: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M320 240 C 320 150, 440 150, 440 220 C 440 262, 386 262, 386 292" '
          'stroke="#ec4899" stroke-width="5" fill="none" stroke-linecap="round"/>'
          '<circle cx="386" cy="330" r="6" fill="#ec4899"/>'
          '<path d="M470 292 H600 M600 292 l-22 -14 M600 292 l-22 14" stroke="#5fc7f3" stroke-width="3.5" '
          'fill="none" stroke-linecap="round"/>'),
 10: scene(door(open_beam=True)),
}

def slide(idx, kicker, body, scn="", extra_cls=""):
    return f'''<!-- ===== {idx} ===== -->
<div class="slide{extra_cls}" data-canvas-width="{W}" data-canvas-height="{H}">
  <div class="grid"></div><div class="frame"></div>
  {waves(idx)}
  <div class="toplabel">Titanium&nbsp;OS · L'Avventura</div>
  <div class="kicker">{kicker}</div>
  {scn}
  {body}
  <div class="footer"><span><span class="dot">⟡</span>&nbsp;Preambolo</span><span class="nina">NINA</span><span>{idx} / 10</span></div>
</div>
'''

def build():
    v12 = V12.read_text(encoding="utf-8")
    style = re.search(r"<style>(.*?)</style>", v12, re.S).group(1)
    style += """
/* v13 — copertina §2-bis + volto (v13.1: LIBERO, niente forma geometrica —
   dissolvenza radiale nel buio, ordine Matteo 15/07) */
.cover-title { font-size:78px; }
.ninaface { width:520px; height:420px; object-fit:cover; object-position:center 22%;
  -webkit-mask-image: radial-gradient(ellipse 62% 58% at 50% 46%, #000 46%, transparent 78%);
  mask-image: radial-gradient(ellipse 62% 58% at 50% 46%, #000 46%, transparent 78%); }
.scene-face { position:absolute; top:190px; left:0; right:0; height:420px;
  display:flex; align-items:center; justify-content:center; }
"""
    face = re.search(r'(data:image/\w+;base64,[A-Za-z0-9+/=]+)', PRE_03.read_text(encoding="utf-8")).group(1)

    slides = []
    slides.append(slide(1, "IL MONDO DI NINA · PRE 1 / 4", '''
  <div class="body2" style="top:640px;">
    <div class="lead cover-title">C'è una porta<br>in fondo alla<br><span class="accent">taverna</span>.</div>
  </div>''', SCENES[1]))

    slides.append(slide(2, "Cos'è · Il Mondo di Nina", '''
  <div class="body2 s2">
    <div class="lead">Un racconto che<br><span class="pink">insegna</span>.</div>
    <div class="intro">Non è solo una favola della buonanotte. <span class="soft">È un viaggio</span> che spiega, una storia alla volta, com'è fatto davvero il mondo — dal metallo che si salda fino alle macchine che pensano.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">☾</span><div>Si legge <b>la sera, ad alta voce</b>: una storia corta e calda, da ascoltare sotto le coperte.</div></div>
      <div class="role"><span class="mk pink">◆</span><div>Ma ogni storia nasconde una <b>cosa vera</b>: un pezzo di scienza, tecnica o tecnologia.</div></div>
    </div>
    <div class="seal">Una favola che, di nascosto, ti insegna il mondo.</div>
  </div>''', f'<div class="scene-face"><img class="ninaface" src="{face}" alt=""/></div>'))

    slides.append(slide(3, "Perché · L'origine", '''
  <div class="body2 s2">
    <div class="lead">Nato da un <span class="accent">papà</span><br>che costruisce.</div>
    <div class="intro">In una taverna vera — <span class="soft">dodici metri quadri sotto una casa</span> — un papà costruisce macchine di giorno e sistemi di notte. Nina è nata lì: ogni cosa costruita davvero, la sera diventa una storia.</div>
    <div class="seal">Prima si costruisce. Poi si racconta.</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "Per chi è · A chi parla", '''
  <div class="body2 s2">
    <div class="lead">Per i piccoli,<br>e per i <span class="pink">grandi</span>.</div>
    <div class="intro">Si legge ad alta voce, <span class="soft">in due</span>: e ognuno ci trova la sua storia.</div>
    <div class="trio">
      <div class="role"><span class="mk cyan">☾</span><div>Il <b>bambino</b> segue Nina nelle sue avventure — e il suo registro è il primo gradino, non il tetto.</div></div>
      <div class="role"><span class="mk pink">✦</span><div>Il <b>grande</b> riconosce, dietro la favola, come funzionano davvero le cose.</div></div>
    </div>
    <div class="seal">Una storia, due altezze.</div>
  </div>''', SCENES[4]))

    slides.append(slide(5, "Il Mondo · Atomi ↔ Bit", '''
  <div class="body2 s2">
    <div class="lead">Due mondi?<br><span class="accent">No.</span></div>
    <div class="intro">La roba che si tocca e la roba che si accende sembrano lontanissime, agli opposti. E invece sono <span class="soft">lo stesso identico mondo</span>, guardato da due lati diversi.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">◆</span><div><b>Atomi</b>: il metallo, il peso nelle braccia, la cosa che scotta, taglia, resiste.</div></div>
      <div class="role"><span class="mk cyan">✦</span><div><b>Bit</b>: il numero, il segnale, l'idea che corre nei fili e accende lo schermo.</div></div>
    </div>
    <div class="seal">Vederli insieme: è esattamente lì che comincia la magia.</div>
  </div>''', SCENES[5]))

    slides.append(slide(6, "Il Mondo · I quattro segni", '''
  <div class="body2 s2">
    <div class="lead">Quattro segni.<br>Un <span class="accent">linguaggio</span>.</div>
    <div class="intro">Le cose importanti, qui, hanno un simbolo: così si riconoscono al volo. <span class="soft">Sono solo quattro</span>, e tornano in ogni storia.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">◆</span><div><b>Atomo</b> (il dado): tutto ciò che si tocca e pesa.</div></div>
      <div class="role"><span class="mk cyan">✦</span><div><b>Bit</b> (i nodi): tutto ciò che è informazione e si accende.</div></div>
      <div class="role"><span class="mk pink">⟡</span><div><b>Giuntura</b> (il rombo): il punto dove due cose diventano una — come una saldatura ben fatta, o una riga di codice ben scritta.</div></div>
      <div class="role"><span class="mk gold">⟡</span><div>E la <b>Pietra</b>: ogni passo che hai capito davvero.</div></div>
    </div>
  </div>''', SCENES[6]))

    slides.append(slide(7, "Il Mondo · La Mappa Viva", '''
  <div class="body2 s2">
    <div class="lead">Non un libro:<br>una <span class="pink">mappa viva</span>.</div>
    <div class="intro">Le storie sono tappe di un cammino che parte dal fondo — <span class="soft">dalla materia che pesa</span> — e sale fino alle macchine che pensano. E la mappa cresce col lavoro vero: quando in taverna succede qualcosa, una storia nuova si accende.</div>
    <div class="seal">⟡ Le Pietre si raccolgono strada facendo.</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "Le radici · Tutto è vero", '''
  <div class="body2 s2">
    <div class="lead">Niente è<br><span class="accent">inventato</span>.</div>
    <div class="intro">Dietro ogni avventura c'è un fatto successo davvero: una macchina che nasce in taverna, un errore che insegna, una notte di lavoro. <span class="soft">Il patto completo</span> — cosa è vero, e come si controlla — è una storia a parte, e arriva presto.</div>
    <div class="seal">Le favole migliori non si inventano. Si costruiscono.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "Il Metodo · Prossimo capitolo", '''
  <div class="body2 s2">
    <div class="lead">Come fa una favola<br>a insegnare <span class="pink">davvero</span>?</div>
    <div class="intro">C'è un metodo preciso: ogni storia <span class="soft">semina un'idea</span>, la fa tornare quando serve, e finisce con una prova da fare con le mani — in cucina, sul tavolo, in garage. Nel prossimo capitolo lo apriamo pezzo per pezzo.</div>
    <div class="seal">PRE 2 · Come funziona Nina →</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Prima Pietra · ⟡0 La Materia", '''
  <div class="body2 s2">
    <div class="lead">La porta è<br><span class="accent">aperta</span>.</div>
    <div class="intro">Si parte dal fondo, dalla roba che pesa e non sa mentire: la materia. <span class="soft">Qui non si può barare con le parole</span> — o una cosa regge, o non regge. E questo mondo cresce mentre la taverna lavora: restare è vederlo crescere.</div>
    <div class="seal">⟡0 La Materia — Episodio 1 · La Bambina che Chiedeva Perché →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · PRE_01 — Il Mondo di Nina (v13, 10 slide)</title>
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
    print(f"OK v13: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
