# _build_ep.py | TITANIUM_OS / NINA / CAROSELLI | v1.0 | 2026-06-27
# Genera il carosello dell'EPISODIO EP_N2_01 "La Bambina che Chiedeva Perche'".
# Taglio: BLUEPRINT SVG NARRATIVO (scelta Matteo sess#51) — ogni beat = una scena disegnata
# in blueprint-anime (oro/ciano su fondo scuro), niente foto. Stesso sfondo/flusso degli altri
# caroselli (PRE_01/02/03). 16 slide, fedele al testo dell'episodio (3 strati + open loop).
# Uso: python _build_ep.py -> carosello.html
import math, os

HERE = os.path.dirname(os.path.abspath(__file__))
EPID = "EP_N2_01"
PIETRA = "⟡0 Materia"
TOT = 16

# ---------- flusso continuo (identico alla famiglia PRE_*) ----------
def wave_path(idx, mid, amp, lam, phase, step=16):
    pts = [f"L {x} {mid + amp*math.sin(2*math.pi*(idx*1080+x)/lam + phase):.1f}" for x in range(-40, 1113, step)]
    return "M " + pts[0][2:] + " " + " ".join(pts[1:])
def gold_y(idx, x): return 1150 + 60*math.sin(2*math.pi*(idx*1080+x)/1200 + 0.608)
def flow_svg(idx):
    fid = f"soft{idx}"
    cyan = wave_path(idx, 420, 26, 1200, -1.2); gold = wave_path(idx, 1150, 60, 1200, 0.608)
    beads = ""
    for bx in range((idx*120)%300 - 300, 1081, 300):
        if 0 <= bx <= 1080:
            by = gold_y(idx, bx)
            beads += (f'<circle cx="{bx}" cy="{by:.1f}" r="42" fill="url(#gGold)" opacity="0.45"/>'
                      f'<circle cx="{bx}" cy="{by:.1f}" r="3" fill="#ffe6ad" opacity="0.7"/>')
    return (f'<svg class="flow" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">'
            f'<defs><filter id="{fid}" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>'
            f'<path d="{cyan}" fill="none" stroke="#5fc7f3" stroke-width="6" opacity="0.10" filter="url(#{fid})"/>'
            f'<path d="{gold}" fill="none" stroke="#f4b65a" stroke-width="11" opacity="0.18" filter="url(#{fid})" stroke-linecap="round"/>'
            f'<path d="{gold}" fill="none" stroke="#ffe6ad" stroke-width="1.6" opacity="0.32" stroke-linecap="round"/>{beads}</svg>')

# ---------- SCENE narrative (viewBox 600x380), blueprint oro/ciano ----------
def S(inner): return f'<div class="scene"><svg viewBox="0 0 600 380" width="600" height="380" xmlns="http://www.w3.org/2000/svg">{inner}</svg></div>'

# porta socchiusa con luce + ? (cover/ingresso)
sc_entry = S('<circle cx="300" cy="200" r="185" fill="url(#gGold)"/>'
    '<g stroke="#5fc7f3" stroke-width="1.4" opacity="0.35"><line x1="60" y1="300" x2="540" y2="300"/><line x1="120" y1="270" x2="480" y2="270"/></g>'
    '<path d="M210,330 L210,150 Q300,92 390,150 L390,330 Z" fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"/>'
    '<path d="M300,108 Q390,108 390,210 L390,330 L300,330 Z" fill="url(#gDoor)" opacity="0.92"/>'
    '<line x1="300" y1="120" x2="300" y2="324" stroke="#fff4dc" stroke-width="2" opacity="0.8"/><circle cx="356" cy="232" r="6" fill="#7a5a24"/>'
    '<text x="300" y="92" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="78" fill="#ec4899">?</text>')

# pizzicore dietro l'orecchio: testa di profilo + onde
sc_tingle = S('<circle cx="300" cy="190" r="175" fill="url(#gPink)"/>'
    '<g fill="none" stroke="#ec4899" stroke-width="3"><path d="M250,120 Q360,110 360,210 Q360,280 290,290 L290,250 Q250,250 248,210 Q246,170 250,120 Z"/>'
    '<circle cx="300" cy="210" r="16"/></g>'
    '<g fill="none" stroke="#f4b65a" stroke-width="2.5" opacity="0.85"><path d="M330,200 Q360,210 350,235"/><path d="M348,188 Q392,205 372,250"/><path d="M366,176 Q424,200 396,262"/></g>'
    '<text x="430" y="150" font-family="playfair-display,serif" font-style="italic" font-size="40" fill="#5fc7f3">?</text>'
    '<text x="470" y="200" font-family="playfair-display,serif" font-style="italic" font-size="28" fill="#5fc7f3" opacity="0.7">?</text>')

# ripostiglio: scatoloni + porticina con filo di luce
sc_closet = S('<circle cx="320" cy="200" r="180" fill="url(#gGold)"/>'
    '<g fill="#0a0f1d" stroke="#7c8cab" stroke-width="2.5"><rect x="120" y="220" width="110" height="90"/><rect x="135" y="160" width="86" height="60"/></g>'
    '<g stroke="#7c8cab" stroke-width="1.6" opacity="0.6"><line x1="120" y1="240" x2="230" y2="240"/><line x1="135" y1="180" x2="221" y2="180"/></g>'
    '<rect x="300" y="120" width="150" height="200" rx="4" fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"/>'
    '<line x1="375" y1="120" x2="375" y2="320" stroke="#f4b65a" stroke-width="2"/>'
    '<polygon points="375,120 375,320 410,300 410,140" fill="url(#gDoor)" opacity="0.55"/>'
    '<circle cx="360" cy="225" r="5" fill="#ffd98a"/>')

# il ponte di ferro e luce sulla valle
sc_bridge = S('<circle cx="300" cy="180" r="185" fill="url(#gGold)"/>'
    '<path d="M60,150 Q300,40 540,150" fill="none" stroke="#f4b65a" stroke-width="3"/>'
    '<line x1="60" y1="250" x2="540" y2="250" stroke="#f4b65a" stroke-width="4"/>'
    '<g stroke="#f4b65a" stroke-width="2" opacity="0.8">' + "".join(f'<line x1="{90+i*60}" y1="250" x2="{90+i*60}" y2="{150+ (1-abs(i-3.5)/4)*-0}" />' for i in range(8)) + '</g>'
    '<g stroke="#f4b65a" stroke-width="2" opacity="0.7">' + "".join(f'<line x1="{90+i*60}" y1="250" x2="{90+i*60}" y2="{60+(300-(90+i*60))**0*0}" />' for i in range(0)) + '</g>'
    '<g stroke="#f4b65a" stroke-width="1.8" opacity="0.7">' + "".join(f'<line x1="{90+i*60}" y1="250" x2="{90+i*60}" y2="{150 + (abs(i-3.5))*8:.0f}" />' for i in range(8)) + '</g>'
    '<g stroke="#5fc7f3" stroke-width="1.4" opacity="0.4"><line x1="60" y1="300" x2="540" y2="300"/><line x1="110" y1="330" x2="490" y2="330"/></g>')

# la Giuntura: Atomi (sx) <-> Bit (dx), ponte che li unisce
sc_junction = S('<circle cx="300" cy="190" r="185" fill="url(#gGold)"/>'
    '<line x1="150" y1="210" x2="450" y2="210" stroke="#f4b65a" stroke-width="4"/>'
    # atomi sx
    '<g transform="translate(150,150)" stroke="#f4b65a" stroke-width="2.6" fill="none"><polygon points="0,-26 24,-13 24,13 0,26 -24,13 -24,-13"/><circle r="9"/></g>'
    '<text x="150" y="118" text-anchor="middle" font-family="space-mono,monospace" font-size="17" letter-spacing="3" fill="#f4b65a">ATOMI</text>'
    # bit dx
    '<g transform="translate(450,150)" stroke="#5fc7f3" stroke-width="2.2"><line x1="-26" y1="-18" x2="14" y2="-28"/><line x1="14" y1="-28" x2="-6" y2="12"/><line x1="-6" y1="12" x2="30" y2="22"/><line x1="-6" y1="12" x2="-26" y2="-18"/></g>'
    '<g transform="translate(450,150)" fill="#9adcff"><circle cx="-26" cy="-18" r="5"/><circle cx="14" cy="-28" r="4"/><circle cx="-6" cy="12" r="6"/><circle cx="30" cy="22" r="4"/></g>'
    '<text x="450" y="118" text-anchor="middle" font-family="space-mono,monospace" font-size="17" letter-spacing="3" fill="#6fb7dd">BIT</text>'
    '<text x="300" y="270" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="30" fill="#ffe6ad">la Giuntura</text>')

# Themis col calibro
sc_themis = S('<circle cx="300" cy="190" r="175" fill="url(#gCyan)"/>'
    '<g fill="none" stroke="#5fc7f3" stroke-width="3"><circle cx="300" cy="120" r="34"/><path d="M250,300 Q250,200 300,200 Q350,200 350,300"/></g>'
    '<g stroke="#f4b65a" stroke-width="3" fill="none"><rect x="360" y="170" width="120" height="22" rx="3"/><line x1="380" y1="170" x2="380" y2="200"/><line x1="455" y1="170" x2="455" y2="200"/>' +
    "".join(f'<line x1="{372+i*12}" y1="170" x2="{372+i*12}" y2="180" stroke="#f4b65a" stroke-width="1.4"/>" ' for i in range(9)) + '</g>'
    '<text x="300" y="345" text-anchor="middle" font-family="space-mono,monospace" font-size="16" letter-spacing="4" fill="#aeb9d4">THEMIS</text>')

# grande ? raggiante
sc_question = S('<circle cx="300" cy="185" r="180" fill="url(#gPink)"/><circle cx="300" cy="185" r="150" fill="url(#gGold)"/>'
    '<g stroke="#ec4899" stroke-width="2" opacity="0.5">' + "".join(f'<line x1="300" y1="185" x2="{300+150*math.cos(math.radians(a)):.0f}" y2="{185+150*math.sin(math.radians(a)):.0f}"/>' for a in range(0,360,30)) + '</g>'
    '<text x="300" y="252" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="220" fill="#ec4899">?</text>')

# due bottoni identici sulla stoffa
def button(cx, cy, col, taut=False, torn=False):
    g = f'<circle cx="{cx}" cy="{cy}" r="42" fill="#0a0f1d" stroke="{col}" stroke-width="3"/>'
    g += "".join(f'<circle cx="{cx+dx}" cy="{cy+dy}" r="5" fill="{col}"/>' for dx,dy in [(-14,-14),(14,-14),(-14,14),(14,14)])
    if torn:
        g = f'<circle cx="{cx}" cy="{cy-30}" r="42" fill="#0a0f1d" stroke="{col}" stroke-width="3"/>'
        g += f'<path d="M{cx},{cy+12} q-6,40 -18,60 M{cx},{cy+12} q6,30 2,55" stroke="{col}" stroke-width="2.5" fill="none"/>'
        g += f'<path d="M{cx-30},{cy+74} q30,-18 60,0" stroke="{col}" stroke-width="2.5" fill="none" stroke-dasharray="4 5"/>'
    elif taut:
        g += "".join(f'<line x1="{cx+dx}" y1="{cy+dy}" x2="{cx+dx*2.4}" y2="{cy+dy*2.4}" stroke="{col}" stroke-width="2" opacity="0.7"/>' for dx,dy in [(-14,14),(14,14)])
    return g
sc_buttons = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<rect x="120" y="120" width="360" height="150" rx="10" fill="none" stroke="#7c8cab" stroke-width="2" opacity="0.6"/>'
    '<g stroke="#7c8cab" stroke-width="1" opacity="0.3">' + "".join(f'<line x1="120" y1="{135+i*20}" x2="480" y2="{135+i*20}"/>' for i in range(7)) + '</g>'
    + button(220, 195, "#f4b65a") + button(380, 195, "#f4b65a") +
    '<text x="300" y="320" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="26" fill="#aeb9d4">identici?</text>')

# tira: uno regge (taut), uno strappato (torn)
sc_pull = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    + button(210, 175, "#5fc7f3", taut=True) + button(395, 175, "#ec4899", torn=True) +
    '<g stroke="#5fc7f3" stroke-width="3" opacity="0.8"><line x1="210" y1="250" x2="210" y2="300" marker-end=""/><polygon points="210,310 202,292 218,292"/></g>'
    '<text x="210" y="345" text-anchor="middle" font-family="space-mono,monospace" font-size="16" fill="#5fc7f3">REGGE</text>'
    '<text x="395" y="345" text-anchor="middle" font-family="space-mono,monospace" font-size="16" fill="#ec4899">CEDE</text>')

# il gesto: ago, filo, nodo nascosto
sc_stitch = S('<circle cx="300" cy="190" r="175" fill="url(#gGold)"/>'
    '<line x1="170" y1="120" x2="380" y2="250" stroke="#aebdda" stroke-width="3"/><circle cx="172" cy="118" r="6" fill="none" stroke="#aebdda" stroke-width="2.5"/>'
    '<path d="M200,250 q40,-50 80,0 t80,0 t80,0" fill="none" stroke="#f4b65a" stroke-width="2.6"/>'
    '<circle cx="300" cy="300" r="22" fill="none" stroke="#ec4899" stroke-width="3"/><path d="M288,300 q12,16 24,0" stroke="#ec4899" stroke-width="2.5" fill="none"/>'
    '<text x="300" y="345" text-anchor="middle" font-family="space-mono,monospace" font-size="15" letter-spacing="2" fill="#ec4899">il nodo che non si vede</text>')

# la verita': bottone + freccia trazione + sigillo
sc_truth = S('<circle cx="300" cy="180" r="180" fill="url(#gGold)"/>'
    + button(300, 165, "#f4b65a", taut=True) +
    '<g stroke="#f4b65a" stroke-width="3"><line x1="300" y1="245" x2="300" y2="305"/><polygon points="300,318 290,298 310,298"/></g>'
    '<text x="300" y="350" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="30" fill="#ffe6ad">regge quando lo tiri</text>')

# test della sarta: due orli + lavaggio x3 + contatori
sc_sarta = S('<circle cx="300" cy="180" r="180" fill="url(#gGold)"/>'
    '<g stroke="#5fc7f3" stroke-width="2.6" fill="none"><line x1="120" y1="130" x2="260" y2="130"/>' + "".join(f'<line x1="{130+i*16}" y1="130" x2="{130+i*16}" y2="145"/>' for i in range(8)) + '</g>'
    '<text x="190" y="170" text-anchor="middle" font-family="space-mono,monospace" font-size="22" fill="#5fc7f3">100+</text>'
    '<g stroke="#ec4899" stroke-width="2.6" fill="none"><line x1="340" y1="130" x2="480" y2="130"/>' + "".join(f'<line x1="{350+i*40}" y1="130" x2="{350+i*40}" y2="145"/>' for i in range(3)) + '</g>'
    '<text x="410" y="170" text-anchor="middle" font-family="space-mono,monospace" font-size="22" fill="#ec4899">10-20</text>'
    '<g transform="translate(300,250)" stroke="#aebdda" stroke-width="2.5" fill="none"><path d="M-40,-10 q40,-30 80,0 l0,40 q-40,20 -80,0 z"/><path d="M-40,-10 q40,20 80,0"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="17" letter-spacing="3" fill="#aeb9d4">LAVA × 3</text>')

# pizzicore = superpotenza: scintilla/lampada
sc_spark = S('<circle cx="300" cy="180" r="175" fill="url(#gGold)"/>'
    '<g stroke="#f4b65a" stroke-width="4" stroke-linecap="round">' + "".join(f'<line x1="300" y1="180" x2="{300+(100 if i%2 else 64)*math.cos(math.radians(i*45)):.0f}" y2="{180+(100 if i%2 else 64)*math.sin(math.radians(i*45)):.0f}"/>' for i in range(8)) + '</g>'
    '<circle cx="300" cy="180" r="26" fill="#ffe6ad"/>'
    '<text x="300" y="330" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="26" fill="#ec4899">non spegnerlo</text>')

# la materia non mente: gate REGGE/NON REGGE
sc_material = S('<circle cx="300" cy="190" r="178" fill="url(#gGold)"/>'
    '<g stroke="#aebdda" stroke-width="3" fill="none"><line x1="300" y1="110" x2="300" y2="270"/><line x1="180" y1="150" x2="420" y2="150"/><rect x="252" y="270" width="96" height="14" rx="4"/></g>'
    '<g transform="translate(180,200)" stroke="#5fc7f3" stroke-width="3" fill="none"><line x1="0" y1="-50" x2="0" y2="0"/><path d="M-30,0 q30,34 60,0 z"/></g>'
    '<text x="180" y="250" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#5fc7f3">REGGE</text>'
    '<g transform="translate(420,200)" stroke="#ec4899" stroke-width="3" fill="none"><line x1="0" y1="-50" x2="0" y2="0"/><path d="M-30,0 q30,34 60,0 z" stroke-dasharray="4 5"/></g>'
    '<text x="420" y="250" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#ec4899">NO</text>')

# chiusura: bottone stretto in mano, notte
sc_night = S('<circle cx="300" cy="180" r="180" fill="url(#gGold)"/>'
    '<g fill="#ffe6ad" opacity="0.8"><circle cx="140" cy="110" r="3"/><circle cx="470" cy="100" r="3"/><circle cx="430" cy="160" r="2.5"/><circle cx="180" cy="200" r="2.5"/><circle cx="500" cy="220" r="2"/></g>'
    '<path d="M180,300 Q220,210 300,210 Q360,210 380,250 Q400,290 360,300 Z" fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"/>'
    '<g stroke="#f4b65a" stroke-width="2.5" fill="none"><path d="M300,250 q-18,6 -30,26"/><path d="M320,250 q-14,10 -22,28"/><path d="M340,252 q-10,12 -16,28"/></g>'
    + button(322, 244, "#ffd98a") +
    '<text x="300" y="345" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="24" fill="#aeb9d4">per sentirlo reggere</text>')

# open loop: calibro/righello + freccia avanti
sc_ruler = S('<circle cx="300" cy="180" r="180" fill="url(#gCyan)"/>'
    '<rect x="130" y="160" width="300" height="46" rx="6" fill="none" stroke="#5fc7f3" stroke-width="3"/>' +
    "".join(f'<line x1="{150+i*28}" y1="160" x2="{150+i*28}" y2="{178 if i%2 else 190}" stroke="#5fc7f3" stroke-width="2"/>' for i in range(10)) +
    '<g stroke="#f4b65a" stroke-width="3"><line x1="300" y1="260" x2="430" y2="260"/><polygon points="446,260 424,250 424,270"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="17" letter-spacing="3" fill="#ffe6ad">→ la misura · EP 02</text>')

# ---------- contenuti (16 slide narrative, fedeli al testo) ----------
slides = [
 {"type":"cover","kicker":"Episodio 1 · ⟡0 La Materia","scene":sc_entry,
  "title":"La Bambina che<br/>Chiedeva Perché","sub":"Il Mondo di Nina · Casella 1",
  "tag":"Fatto bene non vuol dire bello.<br/>Vuol dire che <i>regge quando lo tiri.</i>"},

 {"type":"t","kicker":"Cold open","scene":sc_tingle,
  "lead":'Una domanda <span class="pink">di troppo.</span>',
  "intro":'C\'era una bambina che, quando le dicevano «è così e basta», sentiva un <span class="soft">pizzicore dietro le orecchie</span> — come uno starnuto che non arriva. Si chiamava Nina.',
  "seal":'Perché è così? E perché proprio così?'},

 {"type":"t","kicker":"Atto I · la porta","scene":sc_closet,
  "lead":'Una porta che <span class="accent">nessuno vedeva.</span>',
  "intro":'In fondo a un ripostiglio, dietro tre scatoloni, una porticina non chiusa a chiave: solo… non vista. Nina chiese «perché c\'è una porta, qui?» — e siccome nessuno rispondeva, <span class="soft">l\'aprì.</span>',
  "seal":'Per accorgersene, serviva prima aver voglia di chiedere.'},

 {"type":"t","kicker":"Atto I · il ponte","scene":sc_bridge,
  "lead":'Dall\'altra parte: un <span class="accent">ponte.</span>',
  "intro":'Non una stanza. Un ponte largo, di ferro e di luce, sospeso su una valle. Da una parte cose che si toccano; dall\'altra cose che si accendono. <span class="soft">E il ponte le teneva insieme.</span>',
  "seal":'Come fossero la stessa cosa, vista da due lati.'},

 {"type":"t","kicker":"Atto I · Atomi ↔ Bit","scene":sc_junction,
  "lead":'Si chiama <span class="accent">Giuntura.</span>',
  "intro":'Da un lato gli <span class="g">Atomi</span> — la roba che pesa, che si rompe, che ti sporca le mani. Dall\'altro i <span class="cyan">Bit</span> — la roba che si scrive, si conta, corre. Quasi tutti credono siano due mondi.',
  "seal":'Non lo sono. Sono lo stesso mondo.'},

 {"type":"t","kicker":"Atto I · l'incontro","scene":sc_themis,
  "lead":'Mi chiamo <span class="cyan">Themis.</span>',
  "intro":'Una donna asciutta, occhi attenti, un calibro in mano. Non sorrise per gentilezza: guardò Nina come si guarda <span class="soft">qualcuno che potrebbe valere la pena.</span>',
  "seal":'«Custodisco questo posto.»'},

 {"type":"t","kicker":"Atto I · lo strumento","scene":sc_question,
  "lead":'Nina chiese: «<span class="pink">perché?</span>»',
  "intro":'Themis ebbe l\'ombra di un sorriso. «Brava. <span class="soft">Hai già lo strumento più importante.</span> Tienilo stretto — non lasciartelo togliere mai.»',
  "seal":'La domanda è già metà del mestiere.'},

 {"type":"t","kicker":"Atto II · la prova","scene":sc_buttons,
  "lead":'Due bottoni, <span class="accent">identici.</span>',
  "intro":'Sul banco, due bottoni cuciti sulla stessa stoffa, uno accanto all\'altro. Stesso bottone, stesso filo. <span class="soft">Persino la luce ci cadeva sopra allo stesso modo.</span>',
  "seal":'«Sembrano uguali, vero?»'},

 {"type":"t","kicker":"Atto II · «tira»","scene":sc_pull,
  "lead":'Uno regge. L\'altro <span class="pink">no.</span>',
  "intro":'Nina tirò il primo: resse, anche più forte. Tirò il secondo: <span class="soft">venne via al primo strappo,</span> con un filo penzolante e un buco slabbrato.',
  "seal":'«Perché? Sono identici.»'},

 {"type":"t","kicker":"Atto II · la differenza","scene":sc_stitch,
  "lead":'La differenza è nel <span class="accent">gesto.</span>',
  "intro":'Il primo l\'ha cucito chi sapeva come: il filo il numero giusto di volte, il nodo dove non si vede ma tiene. Il secondo, a occhio, di fretta. <span class="soft">«Tanto si vede uguale.»</span>',
  "seal":'Si vede uguale. Finché non serve davvero.'},

 {"type":"t","kicker":"Atto II · la lezione","scene":sc_truth,
  "lead":'Regge <span class="accent">quando lo tiri.</span>',
  "intro":'«Allora fatto bene non vuol dire bello,» disse Nina. «No,» disse Themis, contenta sul serio. <span class="soft">«Vuol dire vero.»</span>',
  "seal":'La differenza non si vede: si sente nel momento esatto.'},

 {"type":"t","kicker":"Per i grandi · il test della sarta","scene":sc_sarta,
  "lead":'Lava tre <span class="accent">volte.</span>',
  "intro":'Due orli: uno con punti piccoli e nodo doppio, uno di corsa. Da fuori uguali. <span class="soft">Ma dopo tre lavaggi</span> il primo è ancora lì, il secondo si è disfatto.',
  "seal":'100+ cicli col nodo · 10-20 senza. Misurabile, non un\'opinione.'},

 {"type":"t","kicker":"Atto III · il pizzicore","scene":sc_spark,
  "lead":'Non <span class="accent">spegnerlo.</span>',
  "intro":'«Non sai cucire un bottone così.» «Nessuno nasce sapendolo. Non è quello il punto.» Il punto è il pizzicore: <span class="soft">la cosa più preziosa che hai.</span>',
  "seal":'Chi continua a chiedere perché — e va a provarlo — costruisce qualsiasi cosa.'},

 {"type":"t","kicker":"Atto III · la maestra","scene":sc_material,
  "lead":'La materia non <span class="accent">mente.</span>',
  "intro":'Si parte da qui, dalla roba che pesa, perché qui non puoi barare: <span class="soft">o il bottone regge, o non regge.</span>',
  "seal":'È la maestra più onesta che ci sia.'},

 {"type":"t","kicker":"Chiusura","scene":sc_night,
  "lead":'Un bottone in <span class="accent">tasca.</span>',
  "intro":'Nina tornò a casa col bottone fatto bene, regalo di Themis, e una sensazione nuova: che il mondo non fosse «così e basta», ma <span class="soft">fosse fatto.</span> Quella notte lo tirò piano, nel buio.',
  "seal":'Ogni cosa fatta nasconde un come e un perché.'},

 {"type":"close","kicker":"La casella dopo","scene":sc_ruler,
  "lead":'E se si potesse <span class="accent">misurare?</span>',
  "intro":'Themis aveva detto «il numero giusto di volte». Ma quanto è il giusto? <span class="soft">La differenza tra regge e non regge si può misurare.</span>',
  "cta":'Provalo tu: due nodi alle scarpe, uno con calma e uno di corsa. Quale regge?',
  "seal":'Hai chiesto perché — e sei andato a vedere.'},
]

# ---------- STYLE (famiglia PRE_*) + DEFS ----------
STYLE = '''<style>
* { margin:0; padding:0; box-sizing:border-box; }
html,body { background:#05070d; }
body { display:flex; flex-direction:column; align-items:center; gap:40px; padding:40px 0; }
.slide { position:relative; width:1080px; height:1350px; overflow:hidden;
  background: radial-gradient(120% 75% at 50% 34%, #1a2440 0%, #0c1122 46%, #05070d 100%);
  font-family:"source-sans-3",sans-serif; color:#eef2fb; }
.grid { position:absolute; inset:30px; opacity:0.04;
  background-image: linear-gradient(#5fc7f3 1px, transparent 1px), linear-gradient(90deg,#5fc7f3 1px, transparent 1px); background-size:54px 54px; }
.frame { position:absolute; inset:30px; border:1px solid rgba(148,163,184,0.22); border-radius:4px; }
.flow { position:absolute; inset:0; width:1080px; height:1350px; pointer-events:none; }
.toplabel { position:absolute; top:60px; left:0; right:0; text-align:center; font-family:"space-mono",monospace; font-size:17px; letter-spacing:6px; color:#8595b4; text-transform:uppercase; }
.kicker { position:absolute; top:150px; left:0; right:0; text-align:center; font-family:"space-mono",monospace; font-size:16px; letter-spacing:6px; color:#f4b65a; text-transform:uppercase; }
.scene { position:absolute; top:210px; left:0; right:0; height:380px; display:flex; align-items:center; justify-content:center; }
.body2 { position:absolute; left:96px; right:96px; top:640px; bottom:176px; display:flex; flex-direction:column; justify-content:flex-start; gap:26px; text-align:center; }
.lead { font-family:"playfair-display",serif; font-weight:700; font-size:66px; line-height:1.04; color:#f6f8ff; letter-spacing:-0.5px; }
.lead .accent { color:#f4b65a; font-style:italic; } .lead .pink { color:#ec4899; font-style:italic; } .lead .cyan { color:#5fc7f3; font-style:italic; }
.intro { font-size:31px; line-height:1.5; color:#c3cce0; }
.intro .soft { color:#eef2fb; font-weight:600; } .intro .g { color:#f4b65a; font-weight:600; } .intro .cyan { color:#5fc7f3; font-weight:600; }
.seal { font-family:"playfair-display",serif; font-style:italic; font-weight:700; font-size:31px; line-height:1.32; color:#f4b65a; margin-top:6px; }
.cta { font-family:"space-mono",monospace; font-size:21px; line-height:1.45; letter-spacing:1px; color:#5fc7f3; border:1px solid rgba(95,199,243,0.3); border-radius:14px; padding:18px 22px; }
.footer { position:absolute; left:60px; right:60px; bottom:60px; display:flex; align-items:center; justify-content:space-between; font-family:"space-mono",monospace; font-size:15px; letter-spacing:2px; color:#7f8db0; }
.footer .dot { color:#f4b65a; } .footer .nina { color:#ec4899; }
</style>'''
DEFS = '''<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="gGold" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffe6ad" stop-opacity="0.85"/><stop offset="42%" stop-color="#f4b65a" stop-opacity="0.32"/><stop offset="100%" stop-color="#f4b65a" stop-opacity="0"/></radialGradient>
<radialGradient id="gCyan" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#9adcff" stop-opacity="0.6"/><stop offset="100%" stop-color="#5fc7f3" stop-opacity="0"/></radialGradient>
<radialGradient id="gPink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ec4899" stop-opacity="0.55"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>
<linearGradient id="gDoor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff4dc"/><stop offset="55%" stop-color="#ffcf85"/><stop offset="100%" stop-color="#eda24a"/></linearGradient>
</defs></svg>'''

def footer(n, last=False):
    r = "fine ⟡" if last else f"{n} / {TOT}"
    return f'<div class="footer"><span><span class="dot">⟡</span>&nbsp;{PIETRA}</span><span class="nina">{EPID}</span><span>{r}</span></div>'

def render(s, i):
    n = i+1
    head = '<div class="slide" data-canvas-width="1080" data-canvas-height="1350"><div class="grid"></div><div class="frame"></div>' + flow_svg(i)
    top = '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
    if s["type"] == "cover":
        return (head + top +
            f'<div style="position:absolute;top:96px;left:0;right:0;text-align:center;font-family:\'space-mono\',monospace;font-size:14px;letter-spacing:5px;color:#ec4899">{s["kicker"].upper()}</div>'
            + s["scene"] +
            '<div style="position:absolute;left:80px;right:80px;top:640px;text-align:center">'
            f'<div style="font-family:\'playfair-display\',serif;font-weight:800;font-size:80px;line-height:1.0;color:#f6f8ff;letter-spacing:-1px">{s["title"]}</div>'
            f'<div style="font-family:\'space-mono\',monospace;font-size:18px;letter-spacing:5px;color:#ec4899;text-transform:uppercase;margin-top:28px">{s["sub"]}</div>'
            f'<div style="font-family:\'playfair-display\',serif;font-weight:700;font-size:32px;line-height:1.4;color:#aeb9d4;margin-top:30px;padding:0 10px">{s["tag"]}</div></div>'
            '<div class="footer"><span><span class="dot">⟡</span>&nbsp;'+PIETRA+'</span><span class="nina">'+EPID+'</span><span>scorri →</span></div></div>')
    cta = f'<div class="cta">{s["cta"]}</div>' if s.get("cta") else ""
    last = (s["type"] == "close")
    return (head + top + f'<div class="kicker">{s["kicker"]}</div>' + s["scene"] +
        '<div class="body2">'
        f'<div class="lead">{s["lead"]}</div>'
        f'<div class="intro">{s["intro"]}</div>'
        f'{cta}'
        f'<div class="seal">{s["seal"]}</div></div>' + footer(n, last) + '</div>')

html = ['<!DOCTYPE html>','<html lang="it">','<head>','<meta charset="UTF-8" />',
        f'<title>Nina · {EPID} — La Bambina che Chiedeva Perché</title>',
        '<meta name="hz:slide-selector" content=".slide" />',
        '<meta name="hz:canvas-width" content="1080" />',
        '<meta name="hz:canvas-height" content="1350" />',
        '<link rel="stylesheet" href="https://use.typekit.net/zhv2kry.css">',
        STYLE,'</head>','<body>',DEFS]
for i,s in enumerate(slides):
    html.append(f"<!-- ===== {i+1} ===== -->")
    html.append(render(s,i))
html += ['</body>','</html>']
open(os.path.join(HERE,"carosello.html"),"w",encoding="utf-8").write("\n".join(html))
print(f"{EPID} generato: {len(slides)} slide -> carosello.html")
