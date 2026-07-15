# _build_pre_03_v6.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v6 | 2026-07-15
# PRE_03 "I Personaggi" a standard (#59): 17→10 slide, un taglio, copertina §2-bis
# (volto di Nina LIBERO, dissolvenza — regola Matteo 15/07), stampo serie PRE_01 v13.
# Testi canonici v5 riusati VERBATIM dove giusti. Onde in fase 21-30 del flusso serie.
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12_STYLE_SRC = HERE.parent / "PRE_01" / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"
V5 = HERE / "_VERSIONI" / "v5_personaggi-profondi" / "carosello.html"

W, H = 1080, 1350
PHASE_OFFSET = 20  # PRE_01 = 1-10, PRE_02 = 11-20, PRE_03 = 21-30

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
 2: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<path d="M380 90 l14 52 l52 14 l-52 14 l-14 52 l-14 -52 l-52 -14 l52 -14 Z" '
          'fill="#ec4899" fill-opacity="0.85"/>'
          '<path d="M300 260 q80 44 160 0" stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<circle cx="290" cy="150" r="5" fill="#f4b65a"/><circle cx="480" cy="130" r="5" fill="#5fc7f3"/>'
          '<circle cx="450" cy="240" r="4" fill="#ec4899"/>'),
 3: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M310 120 L360 210 L310 210 L360 300" stroke="#f4b65a" stroke-width="5" '
          'fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
          '<path d="M420 160 a48 48 0 1 1 -8 74" stroke="#5fc7f3" stroke-width="5" fill="none" stroke-linecap="round"/>'
          '<path d="M412 234 l-22 -4 M412 234 l2 -22" stroke="#5fc7f3" stroke-width="4" stroke-linecap="round"/>'),
 5: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M180 300 C 260 300, 300 220, 380 200 C 460 180, 520 130, 580 110" '
          'stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<circle cx="220" cy="292" r="10" stroke="#8595b4" stroke-width="3.5" fill="#0c1122"/>'
          '<circle cx="392" cy="198" r="10" stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M566 124 l14 -22 l14 22 l-14 22 Z" stroke="#ec4899" stroke-width="3.5" fill="#ec4899" fill-opacity="0.15"/>'),
 6: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M380 110 v170" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M300 150 h160" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M300 150 l-24 60 h48 Z M460 150 l-24 60 h48 Z" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<path d="M340 300 h80" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M240 210 h60 M460 210 h60" stroke="#8595b4" stroke-width="3" stroke-opacity="0.6" stroke-linecap="round"/>'),
 7: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M330 260 l70 -70 M400 190 l34 -34" stroke="#f4b65a" stroke-width="7" stroke-linecap="round"/>'
          '<path d="M420 142 h48 v34 h-48 Z" stroke="#f4b65a" stroke-width="5" fill="#f4b65a" fill-opacity="0.15" '
          'transform="rotate(45 444 159)"/>'
          '<path d="M280 300 h200 M300 282 h160" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M492 120 l8 -18 M512 140 l18 -10" stroke="#ec4899" stroke-width="3.5" stroke-linecap="round"/>'),
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M300 150 h100 M330 300 h40" stroke="#5fc7f3" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M350 150 v150" stroke="#5fc7f3" stroke-width="4"/>'
          '<path d="M300 150 l-20 52 h40 Z" stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M400 150 l-20 52 h40 Z" stroke="#5fc7f3" stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M440 240 l60 -60 M480 200 l26 -26" stroke="#f4b65a" stroke-width="6" stroke-linecap="round"/>'
          '<path d="M496 158 h40 v28 h-40 Z" stroke="#f4b65a" stroke-width="4" fill="#f4b65a" fill-opacity="0.15" '
          'transform="rotate(45 516 172)"/>'
          '<path d="M368 224 h44" stroke="#ec4899" stroke-width="4" stroke-linecap="round"/>'),
 9: scene(f'<defs>{GLOW_P}</defs><rect width="760" height="380" fill="url(#gp)"/>'
          '<g stroke="#fb7185" stroke-width="4" stroke-linecap="round" opacity="0.9">'
          '<path d="M340 140 l80 80 M420 140 l-80 80"/></g>'
          '<circle cx="270" cy="240" r="5" fill="#8595b4"/><circle cx="300" cy="280" r="4" fill="#8595b4"/>'
          '<circle cx="480" cy="250" r="5" fill="#8595b4"/><circle cx="510" cy="210" r="4" fill="#8595b4"/>'
          '<circle cx="460" cy="300" r="4" fill="#8595b4"/>'
          '<path d="M240 320 h280" stroke="#8595b4" stroke-width="3" stroke-opacity="0.4" stroke-linecap="round"/>'),
 "cast": scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<circle cx="250" cy="190" r="52" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<path d="M232 176 h36 M250 176 v34 M238 210 h24" stroke="#5fc7f3" stroke-width="3.5" stroke-linecap="round"/>'
          '<circle cx="380" cy="190" r="52" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<path d="M362 208 l24 -24 M382 178 h16 v12 h-16 Z" stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<circle cx="510" cy="190" r="52" stroke="#fb7185" stroke-width="4" fill="#0c1122" stroke-dasharray="0"/>'
          '<path d="M494 174 l32 32 M526 174 l-32 32" stroke="#fb7185" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M302 190 h26 M432 190 h26" stroke="#8595b4" stroke-width="3" stroke-opacity="0.5"/>'),
 10: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M310 150 l22 22 l-22 22 l-22 -22 Z" stroke="#ec4899" stroke-width="4" fill="#0c1122"/>'
          '<path d="M380 130 l22 22 l-22 22 l-22 -22 Z" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<path d="M450 150 l22 22 l-22 22 l-22 -22 Z" stroke="#f4b65a" stroke-width="4" fill="#0c1122"/>'
          '<text x="380" y="270" text-anchor="middle" font-family="playfair-display" font-size="44" '
          'fill="#8595b4" font-style="italic">?</text>'),
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
  <div class="footer"><span><span class="dot">⟡</span>&nbsp;Personaggi</span><span class="nina">NINA</span><span>{idx} / 10</span></div>
</div>
'''

def build():
    style = re.search(r"<style>(.*?)</style>", V12_STYLE_SRC.read_text(encoding="utf-8"), re.S).group(1)
    style += """
/* v6 — copertina §2-bis + volto libero (stampo serie = PRE_01 v13.1) */
.cover-title { font-size:74px; }
.ninaface { width:520px; height:420px; object-fit:cover; object-position:center 22%;
  -webkit-mask-image: radial-gradient(ellipse 62% 58% at 50% 46%, #000 46%, transparent 78%);
  mask-image: radial-gradient(ellipse 62% 58% at 50% 46%, #000 46%, transparent 78%); }
.scene-face { position:absolute; top:190px; left:0; right:0; height:420px;
  display:flex; align-items:center; justify-content:center; }
"""
    face = re.search(r'(data:image/\w+;base64,[A-Za-z0-9+/=]+)', V5.read_text(encoding="utf-8")).group(1)
    face_scene = f'<div class="scene-face"><img class="ninaface" src="{face}" alt=""/></div>'

    slides = []
    slides.append(slide(1, "I PERSONAGGI · PRE 3 / 4", '''
  <div class="body2" style="top:640px;">
    <div class="lead cover-title">Chi sta con Nina —<br>e chi le rema<br><span class="accent">contro</span>.</div>
  </div>''', face_scene))

    slides.append(slide(2, "L'eroina · Nina", '''
  <div class="body2 s2">
    <div class="lead">Una scintilla che<br>non si <span class="pink">spegne</span>.</div>
    <div class="intro">Nina è energia pura: parla veloce, pensa più veloce ancora, e quando una cosa la prende non la molla più. <span class="soft">È coraggiosa</span> — a volte troppo — e ha un cuore grande quanto la sua testa dura.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">★</span><div>Ostinata: se sbatte contro un muro, <b>cerca la finestra</b>.</div></div>
      <div class="role"><span class="mk pink">♥</span><div>Generosa: quello che capisce, lo <b>spiega subito</b> agli altri.</div></div>
      <div class="role"><span class="mk cyan">?</span><div>Curiosa: la sua parola preferita è <b>«perché»</b>.</div></div>
    </div>
  </div>''', SCENES[2]))

    slides.append(slide(3, "Nina · luci e ombre", '''
  <div class="body2 s2">
    <div class="lead">Anche i geni<br><span class="accent">inciampano</span>.</div>
    <div class="intro">Nina non è perfetta, ed è per questo che le vuoi bene. <span class="soft">Si distrae, si arrabbia con sé stessa,</span> a volte si butta giù e pensa di non essere capace.</div>
    <div class="trio">
      <div class="role"><span class="mk pink">✕</span><div>Quando sbaglia, <b>se la prende</b> — forte.</div></div>
      <div class="role"><span class="mk cyan">↻</span><div>Ma non resta a terra: <b>respira e riparte</b>.</div></div>
      <div class="role"><span class="mk gold">◐</span><div>Scopre che sbagliare non è perdere: è solo <b>non aver ancora capito</b>.</div></div>
    </div>
    <div class="seal">I difetti non la rovinano: la rendono vera.</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "Nina · come cresce", '''
  <div class="body2 s2">
    <div class="lead">Da chi si perde<br>a chi <span class="pink">costruisce</span>.</div>
    <div class="intro">All'inizio Nina è solo una bambina con tante domande e poco ordine. <span class="soft">Avventura dopo avventura</span> impara a darsi i suoi strumenti, e diventa capace di guidarsi da sola.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">1</span><div>Prima: si perde, dimentica, si scoraggia.</div></div>
      <div class="role"><span class="mk cyan">2</span><div>Poi: si fa <b>una mappa, un metodo, le sue regole</b>.</div></div>
      <div class="role"><span class="mk pink">3</span><div>Infine: <b>non aspetta più</b> che siano gli altri a risolverle le cose.</div></div>
    </div>
    <div class="seal">Il viaggio di Nina è imparare a costruirsi la strada.</div>
  </div>''', SCENES[5]))

    slides.append(slide(5, "Il cast · non è sola", '''
  <div class="body2 s2">
    <div class="lead">Tre figure<br>al suo <span class="accent">fianco</span>.</div>
    <div class="intro">Intorno a Nina vivono altri personaggi. <span class="soft">Due la aiutano</span> a costruire e a non perdersi; <span class="soft">uno le rema contro</span>, sempre.</div>
    <div class="trio">
      <div class="role"><span class="mk cyan">⚖</span><div><b>Themis</b> — la custode della misura.</div></div>
      <div class="role"><span class="mk gold">⚒</span><div><b>Forge</b> — le mani dell'officina.</div></div>
      <div class="role"><span class="mk pink">✕</span><div><b>L'Entropia</b> — il disordine che la sfida.</div></div>
    </div>
    <div class="seal">Gli alleati la sostengono. L'avversario la fa crescere.</div>
  </div>''', SCENES["cast"]))

    slides.append(slide(6, "Themis · la custode della misura", '''
  <div class="body2 s2">
    <div class="lead">La frena, e così<br>la <span class="pink">salva</span>.</div>
    <div class="intro">Themis è calma dove Nina è foga: <span class="soft">non alza mai la voce, perché lascia parlare i numeri.</span> Nina taglierebbe senza misurare, pur di arrivare prima — Themis la ferma un secondo prima.</div>
    <div class="trio">
      <div class="role"><span class="mk cyan">⚖</span><div>Precisa fino al millesimo: <b>o una cosa torna, o non torna</b>.</div></div>
      <div class="role"><span class="mk gold">⊙</span><div>Severa ma giusta: <b>non sgrida, mostra</b>.</div></div>
      <div class="role"><span class="mk pink">✓</span><div>Le insegna a fidarsi <b>della prova</b> invece che dell'istinto.</div></div>
    </div>
    <div class="seal">È la voce che dice «aspetta, controlliamo».</div>
  </div>''', SCENES[6]))

    slides.append(slide(7, "Forge · le mani del mondo", '''
  <div class="body2 s2">
    <div class="lead">Le insegna<br>a <span class="accent">fare</span>.</div>
    <div class="intro">Se Themis è la mente fredda, Forge è il calore dell'officina: <span class="soft">ruvido, generoso, instancabile</span> — sa di limatura e metallo caldo, e ride forte ogni volta che un pezzo riesce.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">⚒</span><div>Le mostra che <b>pensare e fare</b> sono la stessa cosa.</div></div>
      <div class="role"><span class="mk cyan">↺</span><div>Le insegna a <b>riprovare</b> quando il pezzo viene storto.</div></div>
      <div class="role"><span class="mk pink">◆</span><div>Le regala l'orgoglio di dire <b>«questo l'ho costruito io»</b>.</div></div>
    </div>
    <div class="seal">Per lui una cosa esiste solo quando la puoi tenere in mano.</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "Insieme · misura e martello", '''
  <div class="body2 s2">
    <div class="lead">Uno pesa,<br>l'altro <span class="pink">batte</span>.</div>
    <div class="intro">Themis e Forge sembrano opposti, e infatti si completano. <span class="soft">Prima si misura, poi si costruisce:</span> insieme tengono Nina sul filo giusto tra l'idea e la realtà.</div>
    <div class="trio">
      <div class="role"><span class="mk cyan">⚖</span><div><b>Themis</b>: controlla che sia giusto.</div></div>
      <div class="role"><span class="mk gold">⚒</span><div><b>Forge</b>: fa in modo che esista.</div></div>
      <div class="role"><span class="mk pink">⟡</span><div>In mezzo, Nina impara a <b>non saltare nessun passo</b>.</div></div>
    </div>
    <div class="seal">Mente e mani: la coppia che la fa crescere.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "L'Entropia · l'avversario", '''
  <div class="body2 s2">
    <div class="lead">Il nemico<br><span class="rose">invisibile</span>.</div>
    <div class="intro">Non è un mostro con i denti: <span class="soft">è l'Entropia, il disordine.</span> Non vive nelle caverne — vive nelle piccole cose: la stanza in cui non trovi più niente, il progetto lasciato a metà, la sera in cui pensi «non sono capace» e molli.</div>
    <div class="trio">
      <div class="role"><span class="mk pink">…</span><div>Non attacca: <b>aspetta che tu ti arrenda</b> da solo.</div></div>
      <div class="role"><span class="mk gold">⛨</span><div>Si batte <b>costruendo</b>: ogni volta che Nina sistema, misura, costruisce — le toglie terreno.</div></div>
      <div class="role"><span class="mk cyan">↻</span><div>Non si vince una volta sola: <b>si tiene a bada ogni giorno</b>.</div></div>
    </div>
    <div class="seal">Il disordine non fa rumore — ed è proprio questa la sua forza.</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Prossimo · PRE 4 · Tutto è vero", '''
  <div class="body2 s2">
    <div class="lead">Ora li<br><span class="accent">conosci</span>.</div>
    <div class="intro">Nina, Themis, Forge e l'Entropia: il cast è pronto. <span class="soft">Altre figure arriveranno</span> — per ora aspettano dietro le quinte, riconoscibili solo dai loro simboli: i volti si scoprono con le avventure.</div>
    <div class="intro">E c'è un'ultima cosa da sapere, la più importante: <span class="soft">niente di tutto questo è inventato</span>. Dietro ogni personaggio c'è un pezzo del lavoro vero.</div>
    <div class="seal">PRE 4 · Tutto è vero — il patto che regge il mondo →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · PRE_03 — I Personaggi (v6, 10 slide)</title>
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
    print(f"OK v6: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
