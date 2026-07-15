# _build_pre_02_v2.py | TITANIUM_OS / CONTENT_ENGINE / CAROSELLI | v2 | 2026-07-15
# PRE_02 "Come funziona Nina" a standard (#59): 16→10 slide, un taglio, copertina
# §2-bis, stesso stampo di PRE_01 v13 (la griglia è una collezione: stesso layout per
# serie). Testi canonici v1 riusati VERBATIM dove giusti; de-«figlia» (slide 15 v1,
# stessa regola [persone] di canon_guard); via «32 mila pezzi» (numero stale).
# Le onde di sfondo CONTINUANO da PRE_01 (fase globale: slide 11-20 del flusso serie).
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
V12_STYLE_SRC = HERE.parent / "PRE_01" / "_VERSIONI" / "v12_icone-8-pietre" / "carosello.html"

W, H = 1080, 1350
PHASE_OFFSET = 10  # PRE_01 occupa le posizioni 1-10 del flusso della serie

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

SCENES = {
 # copertina: la casella col doppio fondo — tre strati, luce che filtra sotto
 1: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<rect x="290" y="90" width="180" height="52" rx="8" stroke="#ec4899" stroke-width="4" fill="#0c1122"/>'
          '<path d="M334 116 q22 -18 44 0 q22 18 44 0" stroke="#ec4899" stroke-width="3" fill="none" stroke-linecap="round"/>'
          '<rect x="290" y="162" width="180" height="52" rx="8" stroke="#eef2fb" stroke-width="3.5" fill="#0c1122"/>'
          '<path d="M330 188 h100 M350 200 h60" stroke="#eef2fb" stroke-width="3" stroke-opacity="0.7" stroke-linecap="round"/>'
          '<rect x="290" y="234" width="180" height="52" rx="8" stroke="#f4b65a" stroke-width="4" fill="#f4b65a" fill-opacity="0.10"/>'
          '<circle cx="380" cy="260" r="9" fill="#f4b65a"/>'
          '<path d="M310 306 Q 380 336 450 306" stroke="#f4b65a" stroke-width="3" stroke-opacity="0.5" fill="none"/>'),
 2: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<circle cx="380" cy="190" r="86" stroke="#5fc7f3" stroke-width="4" fill="#0c1122"/>'
          '<path d="M380 132 v116 M380 190 l-52 -34 M380 190 l52 -34 M380 226 l-40 26 M380 226 l40 26" '
          'stroke="#5fc7f3" stroke-width="3.5" stroke-linecap="round"/>'
          '<circle cx="328" cy="156" r="7" fill="#f4b65a"/><circle cx="432" cy="156" r="7" fill="#f4b65a"/>'
          '<circle cx="340" cy="252" r="7" fill="#ec4899"/><circle cx="420" cy="252" r="7" fill="#ec4899"/>'),
 3: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<g stroke="#8595b4" stroke-width="2.5" stroke-opacity="0.6">'
          '<path d="M200 110 h360 M200 190 h360 M200 270 h360 M290 110 v160 M380 110 v160 M470 110 v160"/></g>'
          '<path d="M245 230 L335 150 L425 230 L515 150" stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<circle cx="245" cy="230" r="11" fill="#ec4899"/>'
          '<path d="M515 150 l14 14 l-14 14 l-14 -14 Z" stroke="#eef2fb" stroke-width="3.5" fill="#0c1122"/>'),
 4: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M270 100 h220 M270 100 l-24 46 h268 l-24 -46" stroke="#ec4899" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M246 190 h268" stroke="#eef2fb" stroke-width="3.5" stroke-linecap="round"/>'
          '<path d="M246 234 h268" stroke="#f4b65a" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M380 146 v120" stroke="#8595b4" stroke-width="3" stroke-dasharray="1 14" stroke-linecap="round"/>'
          '<circle cx="380" cy="286" r="9" fill="#f4b65a"/>'),
 5: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M300 260 C 340 140, 430 140, 470 220" stroke="#eef2fb" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<path d="M470 220 l-6 -24 M470 220 l22 -10" stroke="#eef2fb" stroke-width="3.5" stroke-linecap="round"/>'
          '<path d="M296 236 l10 30 l30 -8" stroke="#ec4899" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
          '<circle cx="300" cy="260" r="8" fill="#ec4899"/>'),
 6: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M380 110 v150 M380 260 q0 40 -46 40 M380 260 q0 40 46 40" stroke="#f4b65a" stroke-width="5" '
          'fill="none" stroke-linecap="round"/>'
          '<circle cx="380" cy="132" r="20" stroke="#f4b65a" stroke-width="5" fill="none"/>'
          '<path d="M320 200 h120" stroke="#f4b65a" stroke-width="5" stroke-linecap="round"/>'
          '<path d="M366 96 l14 -22 l14 22" stroke="#5fc7f3" stroke-width="3" fill="none" stroke-linecap="round"/>'),
 7: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<path d="M300 190 a80 80 0 1 1 24 57" stroke="#f4b65a" stroke-width="5" fill="none" stroke-linecap="round"/>'
          '<path d="M324 247 l-26 2 M324 247 l6 -26" stroke="#f4b65a" stroke-width="4" fill="none" stroke-linecap="round"/>'
          '<circle cx="380" cy="110" r="8" fill="#f4b65a"/><circle cx="460" cy="190" r="8" fill="#5fc7f3"/>'
          '<circle cx="380" cy="270" r="8" fill="#ec4899"/>'),
 8: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M320 300 v-70 q0 -18 14 -18 q13 0 13 16 v-30 q0 -16 14 -16 q14 0 14 16 v22 v-34 '
          'q0 -16 14 -16 q14 0 14 16 v34 v-22 q0 -14 13 -14 q14 0 14 16 v66 q0 34 -28 34 h-54 q-28 0 -42 -34" '
          'stroke="#eef2fb" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
          '<path d="M452 128 l10 -22 M472 150 l22 -12 M480 182 h24" stroke="#f4b65a" stroke-width="4" stroke-linecap="round"/>'),
 9: scene(f'<defs>{GLOW_G}</defs><rect width="760" height="380" fill="url(#gg)"/>'
          '<path d="M330 300 h100 M340 282 h80" stroke="#8595b4" stroke-width="4" stroke-linecap="round"/>'
          '<path d="M380 258 v-36" stroke="#f4b65a" stroke-width="4" stroke-linecap="round"/>'
          '<circle cx="380" cy="180" r="42" fill="#f4b65a" fill-opacity="0.22" stroke="#f4b65a" stroke-width="4"/>'
          '<path d="M380 118 v-26 M322 200 h-26 M438 200 h26 M336 142 l-20 -20 M424 142 l20 -20" '
          'stroke="#f4b65a" stroke-width="3.5" stroke-linecap="round"/>'
          '<text x="380" y="192" text-anchor="middle" font-family="space-mono" font-size="30" fill="#f6f8ff">?</text>'),
 10: scene(f'<defs>{GLOW_C}</defs><rect width="760" height="380" fill="url(#gc)"/>'
          '<circle cx="330" cy="190" r="34" stroke="#eef2fb" stroke-width="4" fill="#0c1122"/>'
          '<circle cx="318" cy="182" r="4" fill="#eef2fb"/><circle cx="342" cy="182" r="4" fill="#eef2fb"/>'
          '<circle cx="318" cy="200" r="4" fill="#eef2fb"/><circle cx="342" cy="200" r="4" fill="#eef2fb"/>'
          '<path d="M396 190 H540 M540 190 l-20 -13 M540 190 l-20 13" stroke="#ec4899" stroke-width="4" '
          'fill="none" stroke-linecap="round"/>'
          '<path d="M586 160 l22 22 l-22 22 l-22 -22 Z" stroke="#f4b65a" stroke-width="4" fill="#f4b65a" fill-opacity="0.12"/>'),
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
  <div class="footer"><span><span class="dot">⟡</span>&nbsp;Come funziona</span><span class="nina">NINA</span><span>{idx} / 10</span></div>
</div>
'''

def build():
    style = re.search(r"<style>(.*?)</style>", V12_STYLE_SRC.read_text(encoding="utf-8"), re.S).group(1)
    style += """
/* v2 — copertina §2-bis (stampo serie = PRE_01 v13) */
.cover-title { font-size:78px; }
"""
    slides = []
    slides.append(slide(1, "COME FUNZIONA NINA · PRE 2 / 4", '''
  <div class="body2" style="top:640px;">
    <div class="lead cover-title">La favola ha un<br><span class="accent">doppio fondo</span>.</div>
  </div>''', SCENES[1]))

    slides.append(slide(2, "L'idea · Un organismo", '''
  <div class="body2 s2">
    <div class="lead">Non un libro.<br>Un <span class="pink">organismo</span>.</div>
    <div class="intro">Un libro normale si stampa e resta fermo per sempre. <span class="soft">Questo no: è vivo.</span> Respira insieme al lavoro vero del papà e cambia quando cambia il mondo.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">◆</span><div>È <b>vero</b>: ogni storia nasce da qualcosa che esiste davvero.</div></div>
      <div class="role"><span class="mk cyan">✦</span><div>È <b>vivo</b>: si aggiorna da solo, come una pianta che fa foglie nuove.</div></div>
      <div class="role"><span class="mk pink">⟡</span><div>È <b>infinito</b>: non c'è mai l'ultima pagina.</div></div>
    </div>
    <div class="seal">Un Libro-IA: metà racconto, metà macchina viva.</div>
  </div>''', SCENES[2]))

    slides.append(slide(3, "La forma · La Mappa Viva", '''
  <div class="body2 s2">
    <div class="lead">Coordinate,<br>non <span class="accent">pagine</span>.</div>
    <div class="intro">Non si legge dall'inizio alla fine. <span class="soft">È una mappa</span>, e tu sei una pedina: ti muovi dove vuoi, e ogni casella è una storia-tappa che ti insegna una cosa vera.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">⟡</span><div>Entri da <b>dove vuoi</b>: non esiste un solo ordine giusto.</div></div>
      <div class="role"><span class="mk cyan">→</span><div>Una materia nuova? <b>Una terra nuova</b>: la mappa cresce ai bordi, senza crollare al centro.</div></div>
    </div>
    <div class="seal">Una mappa da esplorare, non un corridoio da percorrere.</div>
  </div>''', SCENES[3]))

    slides.append(slide(4, "Il trucco · Il doppio fondo", '''
  <div class="body2 s2">
    <div class="lead">Ogni casella ha un<br><span class="pink">sottosuolo</span>.</div>
    <div class="intro">Quando Nina mette il piede su una casella non legge solo una pagina: <span class="soft">buca la superficie</span> e scende attraverso tre strati, dal più magico al più vero.</div>
    <div class="trio">
      <div class="role"><span class="mk pink">☾</span><div>Sopra: la <b>fiaba</b> che senti la sera.</div></div>
      <div class="role"><span class="mk gold">✋</span><div>In mezzo: l'<b>esempio di bottega</b> che la spiega.</div></div>
      <div class="role"><span class="mk cyan">◆</span><div>Sotto: la <b>cosa vera</b> — il sistema che gira davvero, sul computer del papà, mentre tu leggi.</div></div>
    </div>
    <div class="seal">Tre profondità nella stessa casella: scegli tu quanto scendere.</div>
  </div>''', SCENES[4]))

    slides.append(slide(5, "Il filtro · Il test della sarta", '''
  <div class="body2 s2">
    <div class="lead">Si spiega<br>con le <span class="accent">mani</span>.</div>
    <div class="intro">Lo strato di mezzo toglie la magia e mostra il meccanismo, ma con esempi di casa e di bottega. <span class="soft">La regola è dura:</span> se non si spiega così, non entra nel libro.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">✋</span><div>Gli <b>orli della sarta</b>, i secchi forati, gli alberi della famiglia.</div></div>
      <div class="role"><span class="mk pink">◆</span><div>Cose che <b>tocchi ogni giorno</b>, usate per capire cose difficili.</div></div>
    </div>
    <div class="seal">Il «test della sarta»: se la nonna non lo capisce, si riscrive.</div>
  </div>''', SCENES[5]))

    slides.append(slide(6, "La regola d'oro · Ancoraggio", '''
  <div class="body2 s2">
    <div class="lead">Ogni parola<br><span class="accent">ancorata</span>.</div>
    <div class="intro">Niente viene inventato a caso. <span class="soft">Ogni cosa che Nina dice</span> è agganciata a un fatto che esiste e che si può controllare.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">⟡</span><div>Se non è <b>vero e verificabile</b>, non diventa una storia.</div></div>
      <div class="role"><span class="mk cyan">→</span><div>Così impari il mondo <b>com'è</b>, non come qualcuno se lo immagina.</div></div>
    </div>
    <div class="seal">Una favola che non ti racconta mai una bugia.</div>
  </div>''', SCENES[6]))

    slides.append(slide(7, "Il motore · Il cerchio", '''
  <div class="body2 s2">
    <div class="lead">Il progetto<br><span class="pink">insegna</span> al libro.</div>
    <div class="intro">Ecco il segreto della vita di Nina: <span class="soft">il lavoro vero insegna a Nina, e Nina insegna a te.</span> È un cerchio che non si ferma.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">◆</span><div>Il <b>papà costruisce</b> → il sistema impara → una storia nuova si posa da sola sulla mappa.</div></div>
      <div class="role"><span class="mk cyan">✦</span><div><b>Nina racconta</b> → tu impari.</div></div>
      <div class="role"><span class="mk pink">⟡</span><div><b>Niente bozze</b>: ogni capitolo è definitivo, perché il fatto c'è già.</div></div>
    </div>
    <div class="seal">Più il mondo va avanti, più il libro ha cose da dire.</div>
  </div>''', SCENES[7]))

    slides.append(slide(8, "La sfida · Provalo tu", '''
  <div class="body2 s2">
    <div class="lead">Non solo letto:<br><span class="accent">fatto</span>.</div>
    <div class="intro">A ogni tappa non basta ascoltare: c'è un <span class="soft">«Provalo tu»</span>. Una piccola sfida vera, da fare con le mani o con la testa, per capire davvero.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">✋</span><div>Cuci un bottone, tara una macchina, conta un resto.</div></div>
      <div class="role"><span class="mk pink">◆</span><div>Capire è <b>fare</b>: quello che provi con le mani, ti resta.</div></div>
      <div class="role"><span class="mk cyan">✦</span><div>Ogni sfida vinta è una <b>capacità che si accende</b> — alla fine hai la mappa di cosa sai fare.</div></div>
    </div>
    <div class="seal">Si impara con le mani, non solo con le orecchie.</div>
  </div>''', SCENES[8]))

    slides.append(slide(9, "Il cuore · Perché esiste", '''
  <div class="body2 s2">
    <div class="lead">Un papà che scrive<br>per chi chiede <span class="pink">perché</span>.</div>
    <div class="intro">Sotto tutto, Nina è il diario di un papà: spiegare il mondo di domani — <span class="soft">fatto di macchine che pensano</span> — non come una magia da subire, ma come un mestiere da governare.</div>
    <div class="trio">
      <div class="role"><span class="mk gold">◆</span><div>Con <b>precisione, calibro e traccia</b>: il mestiere dell'artigiano.</div></div>
      <div class="role"><span class="mk cyan">?</span><div>Per non avere <b>paura</b> del futuro, ma saperlo costruire.</div></div>
    </div>
    <div class="seal">Il regalo più grande: capire, per essere liberi.</div>
  </div>''', SCENES[9]))

    slides.append(slide(10, "Prossimo · PRE 3 · I Personaggi", '''
  <div class="body2 s2">
    <div class="lead">Un gesto vero<br>apre <span class="accent">tutto</span>.</div>
    <div class="intro">Basta un gesto vero — cucire un bottone, tarare una macchina — e usarlo come chiave per aprire la mente. <span class="soft">Le storie arrivano una alla volta</span>, quando il lavoro vero le produce: restare è vederle accendersi sulla mappa.</div>
    <div class="seal">PRE 3 · I Personaggi — la bambina che chiede perché,<br>e la custode che misura →</div>
  </div>''', SCENES[10]))

    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<title>Nina · PRE_02 — Come funziona Nina (v2, 10 slide)</title>
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
    print(f"OK v2: 10 slide -> {HERE / 'carosello.html'} ({len(html)} char)")

if __name__ == "__main__":
    build()
