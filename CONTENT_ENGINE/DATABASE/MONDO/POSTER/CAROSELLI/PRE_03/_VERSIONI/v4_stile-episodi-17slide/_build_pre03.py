# _build_pre03.py | TITANIUM_OS / NINA / CAROSELLI | v1.0 | 2026-06-27
# Genera PRE_03 "I Personaggi" nello stile degli altri episodi (PRE_01/02):
# sfondo blu + griglia + flusso continuo gold/cyan; UNA sola slide-immagine (pag.2),
# il resto a testo (lead/intro/trio/seal) in continuo. 17 slide.
# Uso: python _build_pre03.py   ->   carosello.html
import math, os

HERE = os.path.dirname(os.path.abspath(__file__))
TOT = 17

# ---------- flusso continuo (onda che scorre L->R, prosegue tra le slide) ----------
def wave_path(idx, mid, amp, lam, phase, step=16):
    pts = []
    for x in range(-40, 1113, step):
        gx = idx * 1080 + x
        y = mid + amp * math.sin(2 * math.pi * gx / lam + phase)
        pts.append(f"L {x} {y:.1f}")
    return "M " + pts[0][2:] + " " + " ".join(pts[1:])

def gold_y(idx, x):
    gx = idx * 1080 + x
    return 1150 + 60 * math.sin(2 * math.pi * gx / 1200 + 0.608)

def flow_svg(idx):
    fid = f"soft{idx}"
    cyan = wave_path(idx, 420, 26, 1200, -1.2)
    gold = wave_path(idx, 1150, 60, 1200, 0.608)
    beads = ""
    off = (idx * 120) % 300
    for bx in range(off - 300, 1081, 300):
        if 0 <= bx <= 1080:
            by = gold_y(idx, bx)
            beads += (f'<circle cx="{bx}" cy="{by:.1f}" r="42" fill="url(#gGold)" opacity="0.45"/>'
                      f'<circle cx="{bx}" cy="{by:.1f}" r="3" fill="#ffe6ad" opacity="0.7"/>')
    return (f'<svg class="flow" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">'
            f'<defs><filter id="{fid}" x="-20%" y="-60%" width="140%" height="220%">'
            f'<feGaussianBlur stdDeviation="7"/></filter></defs>'
            f'<path d="{cyan}" fill="none" stroke="#5fc7f3" stroke-width="6" opacity="0.10" filter="url(#{fid})"/>'
            f'<path d="{gold}" fill="none" stroke="#f4b65a" stroke-width="11" opacity="0.18" filter="url(#{fid})" stroke-linecap="round"/>'
            f'<path d="{gold}" fill="none" stroke="#ffe6ad" stroke-width="1.6" opacity="0.32" stroke-linecap="round"/>'
            f'{beads}</svg>')

# ---------- glifi vettoriali riusabili (scene SVG, viewBox 600x380) ----------
def G(inner): return f'<div class="scene"><svg viewBox="0 0 600 380" width="600" height="380" xmlns="http://www.w3.org/2000/svg">{inner}</svg></div>'

g_question = G('<circle cx="300" cy="180" r="170" fill="url(#gPink)"/><circle cx="300" cy="180" r="140" fill="url(#gGold)"/>'
    '<text x="300" y="252" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="230" fill="#ec4899">?</text>')

g_door = G('<circle cx="300" cy="210" r="180" fill="url(#gGold)"/>'
    '<path d="M210,330 L210,150 Q300,92 390,150 L390,330 Z" fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"/>'
    '<path d="M300,108 Q390,108 390,210 L390,330 L300,330 Z" fill="url(#gDoor)" opacity="0.9"/>'
    '<line x1="300" y1="120" x2="300" y2="324" stroke="#fff4dc" stroke-width="2" opacity="0.8"/>'
    '<circle cx="356" cy="232" r="6" fill="#7a5a24"/>')

g_map = G('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<rect x="150" y="90" width="300" height="210" rx="10" fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"/>'
    '<path d="M170,250 Q240,150 300,200 T440,160" fill="none" stroke="#5fc7f3" stroke-width="3" opacity="0.8"/>'
    '<g fill="#ec4899"><circle cx="200" cy="232" r="7"/><circle cx="320" cy="196" r="7"/><circle cx="420" cy="158" r="7"/></g>'
    '<g stroke="#ffe6ad" stroke-width="1.4" opacity="0.5" stroke-dasharray="5 6"><line x1="200" y1="232" x2="320" y2="196"/><line x1="320" y1="196" x2="420" y2="158"/></g>')

def gem(cx, cy, r, col):
    return (f'<polygon points="{cx},{cy-r} {cx+r},{cy-r*0.35} {cx+r*0.6},{cy+r} {cx-r*0.6},{cy+r} {cx-r},{cy-r*0.35}" '
            f'fill="none" stroke="{col}" stroke-width="3"/>')
g_stones = G('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>' +
    "".join(gem(120 + i*73, 150 + (18 if i % 2 else -18), 26,
                ["#f4b65a", "#5fc7f3", "#ec4899"][i % 3]) for i in range(7)) +
    '<text x="300" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="22" letter-spacing="6" fill="#aeb9d4">8 PIETRE</text>')

g_atombit = G('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<g transform="translate(190,190)"><circle cx="0" cy="0" r="10" fill="#f4b65a"/>'
    '<g fill="none" stroke="#f4b65a" stroke-width="2.4" opacity="0.85">'
    '<ellipse rx="78" ry="30"/><ellipse rx="78" ry="30" transform="rotate(60)"/><ellipse rx="78" ry="30" transform="rotate(120)"/></g></g>'
    '<g transform="translate(410,190)" stroke="#5fc7f3" stroke-width="2.2"><line x1="-60" y1="-40" x2="20" y2="-60"/>'
    '<line x1="20" y1="-60" x2="-10" y2="10"/><line x1="-10" y1="10" x2="55" y2="40"/><line x1="-10" y1="10" x2="-60" y2="-40"/></g>'
    '<g transform="translate(410,190)" fill="#9adcff"><circle cx="-60" cy="-40" r="6"/><circle cx="20" cy="-60" r="5"/><circle cx="-10" cy="10" r="7"/><circle cx="55" cy="40" r="5"/></g>')

g_gear = G('<circle cx="300" cy="190" r="170" fill="url(#gGold)"/>'
    '<g transform="translate(300,190)" fill="none" stroke="#f4b65a" stroke-width="3">'
    '<circle r="70"/><circle r="30"/>' +
    "".join(f'<line x1="{92*math.cos(math.radians(a)):.0f}" y1="{92*math.sin(math.radians(a)):.0f}" '
            f'x2="{70*math.cos(math.radians(a)):.0f}" y2="{70*math.sin(math.radians(a)):.0f}"/>' for a in range(0, 360, 45)) +
    '</g>')

g_themis = G('<circle cx="300" cy="190" r="170" fill="url(#gCyan)"/>'
    '<g stroke="#5fc7f3" stroke-width="3" fill="none"><line x1="300" y1="90" x2="300" y2="270"/>'
    '<line x1="180" y1="130" x2="420" y2="130"/><line x1="180" y1="130" x2="150" y2="200"/><line x1="180" y1="130" x2="210" y2="200"/>'
    '<line x1="420" y1="130" x2="390" y2="200"/><line x1="420" y1="130" x2="450" y2="200"/>'
    '<path d="M140,200 Q180,240 220,200"/><path d="M380,200 Q420,240 460,200"/><rect x="250" y="270" width="100" height="16" rx="4"/></g>')

g_entropy = G('<circle cx="300" cy="190" r="170" fill="url(#gPink)"/>'
    '<g stroke="#ec4899" stroke-width="3" opacity="0.9">' +
    "".join(f'<line x1="{300+ (-1)**i*((i*17)%120)}" y1="{120+(i*23)%150}" '
            f'x2="{300+ (-1)**i*((i*29)%140)}" y2="{120+(i*41)%160}"/>' for i in range(12)) +
    '</g><circle cx="300" cy="190" r="14" fill="none" stroke="#ec4899" stroke-width="3"/>')

g_method = G('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<g font-family="space-mono,monospace" font-size="40" fill="#f4b65a" text-anchor="middle">'
    '<text x="300" y="120">?</text><text x="300" y="205" font-size="34" fill="#5fc7f3">&#128065;</text>'
    '</g><g stroke="#f4b65a" stroke-width="3" fill="none" opacity="0.7">'
    '<path d="M300,135 L300,165" marker-end="url(#a)"/></g>'
    '<text x="300" y="285" text-anchor="middle" font-family="space-mono,monospace" font-size="22" letter-spacing="4" fill="#aeb9d4">CHIEDE &#8594; GUARDA</text>')

g_face = G('<circle cx="300" cy="190" r="175" fill="url(#gPink)"/>'
    '<g fill="none" stroke="#ec4899" stroke-width="3"><circle cx="300" cy="180" r="92"/>'
    '<path d="M300,88 Q360,70 372,120" stroke="#7c8cab"/>'  # coda
    '<circle cx="272" cy="172" r="6" fill="#ec4899"/><circle cx="328" cy="172" r="6" fill="#ec4899"/>'
    '<path d="M278,212 Q300,230 322,212"/></g>'
    '<g fill="#f4b65a"><circle cx="258" cy="196" r="2.5"/><circle cx="300" cy="206" r="2.5"/><circle cx="342" cy="196" r="2.5"/></g>')

g_star = G('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<text x="300" y="250" text-anchor="middle" font-family="playfair-display,serif" font-weight="800" font-size="150" fill="#f4b65a">&#10022;</text>')

# ---------- contenuti (17 slide; pag.2 = immagine) ----------
def role(mk_cls, ch, html): return f'<div class="role"><span class="mk {mk_cls}">{ch}</span><span>{html}</span></div>'

slides = []

# 1 — COVER
slides.append({"type": "cover", "kicker": "Preambolo · I Personaggi"})

# 2 — NINA (UNICA IMMAGINE)
slides.append({"type": "image"})

# 3 — CHI È
slides.append({"type": "text", "kicker": "Chi è · L'eroina", "glyph": g_face,
    "lead": 'Una bambina che <span class="accent">non sta ferma.</span>',
    "intro": 'Nina ha più o meno quattordici anni: mora, sguardo sicuro, un mix di Colombia e Sud Italia. <span class="soft">Brava ragazza — e piccolo genio curioso.</span> Vive in mezzo a mappe, libri e domande.',
    "points": [role("pink", "♪", 'Coda alta da ballerina, <b class="pink">giacca di jeans</b> con tocchi rosa.'),
               role("gold", "✦", 'Sveglia, ostinata, un filo sfrontata: <b class="gold">non molla</b> finché non capisce.'),
               role("cyan", "☼", 'Sta bene tra gli attrezzi del papà come tra i suoi quaderni.')],
    "seal": 'È la protagonista — ma soprattutto è una di noi.'})

# 4 — LA SUPERPOTENZA
slides.append({"type": "text", "kicker": "La sua superpotenza", "glyph": g_question,
    "lead": 'Chiede <span class="pink">«perché?»</span>',
    "intro": 'La sua arma non è la forza: è <span class="soft">una domanda</span>. E dopo la domanda, il passo che quasi nessuno fa — andare a vedere davvero.',
    "points": [role("pink", "?", 'Non si ferma alla prima risposta: <b class="pink">apre la porta</b> e guarda dentro.'),
               role("gold", "⟡", 'Non si accontenta di «è così e basta»: vuole il <b class="gold">perché vero</b>.'),
               role("cyan", "→", 'Così trasforma la curiosità in conoscenza, un pezzo alla volta.')],
    "seal": 'Una domanda, mille porte.'})

# 5 — IL METODO
slides.append({"type": "text", "kicker": "Come ragiona", "glyph": g_method,
    "lead": 'Quattro mosse, <span class="accent">sempre le stesse.</span>',
    "intro": 'Nina non nasce sapendo: nasce <span class="soft">provando</span>. Ogni avventura segue lo stesso piccolo metodo, lo stesso che usa un sistema che si aggiorna.',
    "points": [role("gold", "1", '<b>Chiede</b> — parte da un dubbio, non da una certezza.'),
               role("cyan", "2", '<b>Guarda dentro</b> — va a vedere come funziona davvero.'),
               role("pink", "3", '<b>Costruisce</b> lo strumento che le serve, poi lo <b>aggiorna</b> quando sbaglia.')],
    "seal": 'Sbagliare è un passo del metodo, non una colpa.'})

# 6 — IL SUO SEGNO
slides.append({"type": "text", "kicker": "Il suo segno", "glyph": g_door,
    "lead": 'Il «?» e la <span class="accent">porticina.</span>',
    "intro": 'Ogni eroe ha il suo simbolo. Quello di Nina è una <span class="soft">porta socchiusa</span> con un punto di domanda sopra: la curiosità che apre un passaggio dove gli altri vedono solo un muro.',
    "points": [role("gold", "⌂", 'La porticina dorata: <b class="gold">si può sempre entrare</b> e capire.'),
               role("pink", "?", 'Il punto di domanda rosa: il suo colore, la sua firma.')],
    "seal": 'Dove vedi quel segno, c’è qualcosa da scoprire.'})

# 7 — ATOMI & BIT
slides.append({"type": "text", "kicker": "Il suo mondo · Atomi & Bit", "glyph": g_atombit,
    "lead": 'Due mondi, <span class="accent">un solo mondo.</span>',
    "intro": 'Il mondo di Nina è fatto di due fili intrecciati: gli <span class="g">Atomi</span> — la materia, il metallo, le cose che si toccano — e i <span class="soft">Bit</span> — l’informazione, il codice, le macchine che pensano.',
    "points": [role("gold", "◆", '<b class="gold">Atomi</b>: saldature, ingranaggi, presse, tutto ciò che ha un peso.'),
               role("cyan", "✦", '<b class="cyan">Bit</b>: numeri, programmi, intelligenze che imparano.'),
               role("pink", "∞", 'Lei vive sul ponte tra i due: dal più concreto al più astratto.')],
    "seal": 'Capire come si tengono insieme: questa è l’avventura.'})

# 8 — LA MAPPA È IL SUO OS
slides.append({"type": "text", "kicker": "Il suo mondo · La Mappa", "glyph": g_map,
    "lead": 'La Mappa è il suo <span class="accent">OS.</span>',
    "intro": 'Come tanti, Nina <span class="soft">si perde</span> tra mille cose da ricordare. Allora si costruisce una Mappa: il suo sistema operativo personale, fatto di strumenti che la aiutano a ritrovarsi.',
    "points": [role("gold", "⟡", 'Ogni cosa che impara diventa un <b class="gold">posto sulla Mappa</b>.'),
               role("cyan", "⌖", 'La Mappa la guida di <b>Pietra in Pietra</b>, senza fretta.'),
               role("pink", "+", 'Non è finita: cresce con lei, una versione alla volta.')],
    "seal": 'Non tenere tutto in testa: costruisci la mappa.'})

# 9 — LE 8 PIETRE
slides.append({"type": "text", "kicker": "Il suo mondo · Le 8 Pietre", "glyph": g_stones,
    "lead": 'Otto Pietre, <span class="accent">un cammino.</span>',
    "intro": 'Il viaggio di Nina è segnato da otto tappe, le <span class="soft">8 Pietre</span>: si parte da ciò che si tocca e si arriva a ciò che comanda. Ogni Pietra è un concetto in più.',
    "points": [role("gold", "0", 'Si comincia dalla <b class="gold">Materia</b> — il metallo, gli atomi.'),
               role("cyan", "5", 'Si passa per <b class="cyan">memoria, sapere e agenti</b> — i bit.'),
               role("pink", "7", 'Si arriva al <b class="pink">Direttore</b>: chi tiene insieme tutto.')],
    "seal": 'Dal toccare al comandare, un passo alla volta.'})

# 10 — LE PIETRE IN FILA
slides.append({"type": "text", "kicker": "Le 8 Pietre · in fila", "glyph": g_stones,
    "lead": 'I nomi delle <span class="accent">Pietre.</span>',
    "intro": 'Le incontrerai una per una, nelle avventure. Per ora bastano i nomi — <span class="soft">come le tappe di una scalata.</span>',
    "points": [role("gold", "▣", '<b>Materia &middot; Automazione</b> — il mondo fisico che si muove.'),
               role("cyan", "▤", '<b>Modelli &middot; Memoria &middot; Sapere</b> — le macchine che imparano.'),
               role("pink", "▥", '<b>Agenti &middot; Orchestrazione &middot; Direttore</b> — il sistema che si governa.')],
    "seal": 'Otto parole che, insieme, sono un intero mondo.'})

# 11 — NON È SOLA
slides.append({"type": "text", "kicker": "I compagni di viaggio", "glyph": g_star,
    "lead": 'Non è <span class="accent">sola.</span>',
    "intro": 'Intorno a Nina si muovono altre figure: <span class="soft">due alleati</span> che la aiutano a costruire, e <span class="pink">un avversario</span> che vuole spegnere la curiosità.',
    "points": [role("cyan", "Θ", '<b class="cyan">Themis</b> — la mente logica.'),
               role("gold", "⚒", '<b class="gold">Forge</b> — l’officina.'),
               role("pink", "✕", '<b class="pink">L’Entropia</b> — il disordine.')],
    "seal": 'I loro volti si scoprono lungo le avventure.'})

# 12 — THEMIS
slides.append({"type": "text", "kicker": "Alleato · Themis", "glyph": g_themis,
    "lead": '<span class="cyan">Themis</span>, la mente logica.',
    "intro": 'Themis è la parte che <span class="soft">ragiona e tiene il filo</span>: prende le idee di Nina e le mette in ordine, passo dopo passo, senza perdere un pezzo.',
    "points": [role("cyan", "✓", 'Esegue con metodo: <b class="cyan">prima capisce, poi agisce</b>.'),
               role("gold", "≡", 'Ricorda il piano e lo segue anche quando Nina si distrae.'),
               role("pink", "⟲", 'Quando qualcosa non torna, lo dice — e si corregge.')],
    "seal": 'La calma che trasforma il caos in passi.'})

# 13 — FORGE
slides.append({"type": "text", "kicker": "Alleato · Forge", "glyph": g_gear,
    "lead": '<span class="accent">Forge</span>, l’officina.',
    "intro": 'Forge è le mani: <span class="soft">dà forma alla materia.</span> Salda, taglia, monta. Dove Themis pensa, Forge costruisce — è il lato Atomi del mondo di Nina.',
    "points": [role("gold", "⚒", 'Lavora il metallo: <b class="gold">titanio, acciaio, alluminio</b>.'),
               role("cyan", "▦", 'Trasforma un disegno in un pezzo che esiste davvero.'),
               role("pink", "✦", 'Insegna che <b>capire</b> e <b>fare</b> sono la stessa cosa.')],
    "seal": 'Il sapere che diventa un oggetto da tenere in mano.'})

# 14 — L'ENTROPIA
slides.append({"type": "text", "kicker": "Avversario · l'Entropia", "glyph": g_entropy,
    "lead": 'L’<span class="pink">Entropia</span>, il disordine.',
    "intro": 'Ogni storia ha il suo avversario. Qui non è un mostro: è il <span class="soft">disordine</span> — le cose che si rompono, si perdono, si dimenticano. È ciò che vorrebbe spegnere la curiosità.',
    "points": [role("pink", "✕", 'Fa perdere i pezzi, confonde, scoraggia.'),
               role("gold", "⛨", 'Nina lo batte <b class="gold">costruendo ordine</b>: mappe, strumenti, metodo.'),
               role("cyan", "↻", 'Non si vince una volta sola: si tiene a bada ogni giorno.')],
    "seal": 'Contro il disordine, l’arma è costruire.'})

# 15 — COME LA RICONOSCI
slides.append({"type": "text", "kicker": "Sempre lei", "glyph": g_face,
    "lead": 'Una sola, <span class="accent">riconoscibile.</span>',
    "intro": 'In ogni avventura Nina è <span class="soft">la stessa</span>: cambia solo dove la porta la curiosità. Il volto non cambia mai.',
    "points": [role("gold", "♪", '<b class="gold">Coda alta</b> lunghissima, da ballerina.'),
               role("cyan", "▤", '<b class="cyan">Giacca di jeans</b> a bottoni, con tocchi rosa.'),
               role("pink", "✦", '<b class="pink">Lentiggini</b>, occhi castano scuro, sguardo sicuro.')],
    "seal": 'Stesso volto, mille mondi.'})

# 16 — PERCHÉ ESISTE
slides.append({"type": "text", "kicker": "Perché esiste", "glyph": g_door,
    "lead": 'Per imparare il <span class="accent">mondo.</span>',
    "intro": 'Nina è la versione bambina di un’idea grande: <span class="soft">spiegare come funziona davvero ciò che ci circonda</span>, una storia alla volta — dal metallo che si salda fino alle macchine che pensano.',
    "points": [role("gold", "☾", 'Si legge come una favola: corta, calda, della buonanotte.'),
               role("cyan", "◆", 'Ma dentro c’è sempre una <b class="cyan">cosa vera</b> da imparare.'),
               role("pink", "∞", 'Impari il mondo <b class="pink">senza accorgertene</b>.')],
    "seal": 'Una favola che, di nascosto, ti insegna il mondo.'})

# 17 — CHIUSURA
slides.append({"type": "close", "kicker": "Si parte",
    "lead": 'Il viaggio <span class="accent">comincia.</span>',
    "intro": 'Adesso conosci Nina, il suo mondo e i suoi compagni. <span class="soft">Il resto si scopre camminando.</span>',
    "seal": 'Episodio 1 — in arrivo.'})

# ---------- HTML ----------
STYLE = '''<style>
* { margin:0; padding:0; box-sizing:border-box; }
html,body { background:#05070d; }
body { display:flex; flex-direction:column; align-items:center; gap:40px; padding:40px 0; }
.slide { position:relative; width:1080px; height:1350px; overflow:hidden;
  background: radial-gradient(120% 75% at 50% 34%, #1a2440 0%, #0c1122 46%, #05070d 100%);
  font-family:"source-sans-3",sans-serif; color:#eef2fb; }
.grid { position:absolute; inset:30px; opacity:0.04;
  background-image: linear-gradient(#5fc7f3 1px, transparent 1px), linear-gradient(90deg,#5fc7f3 1px, transparent 1px);
  background-size:54px 54px; }
.frame { position:absolute; inset:30px; border:1px solid rgba(148,163,184,0.22); border-radius:4px; }
.flow { position:absolute; inset:0; width:1080px; height:1350px; pointer-events:none; }
.toplabel { position:absolute; top:60px; left:0; right:0; text-align:center;
  font-family:"space-mono",monospace; font-size:17px; letter-spacing:6px; color:#8595b4; text-transform:uppercase; }
.kicker { position:absolute; top:150px; left:0; right:0; text-align:center;
  font-family:"space-mono",monospace; font-size:16px; letter-spacing:6px; color:#f4b65a; text-transform:uppercase; }
.scene { position:absolute; top:226px; left:0; right:0; height:360px; display:flex; align-items:center; justify-content:center; }
.body2 { position:absolute; left:96px; right:96px; top:610px; bottom:182px;
  display:flex; flex-direction:column; justify-content:flex-start; gap:22px; text-align:center; }
.lead { font-family:"playfair-display",serif; font-weight:700; font-size:62px; line-height:1.04; color:#f6f8ff; letter-spacing:-0.5px; }
.lead .accent { color:#f4b65a; font-style:italic; } .lead .pink { color:#ec4899; font-style:italic; }
.lead .cyan { color:#5fc7f3; font-style:italic; }
.intro { font-size:29px; line-height:1.5; color:#c3cce0; }
.intro .soft { color:#eef2fb; font-weight:600; } .intro .g { color:#f4b65a; font-weight:600; }
.trio { display:flex; flex-direction:column; gap:16px; margin-top:4px; }
.role { display:flex; align-items:flex-start; gap:18px; text-align:left; font-size:25px; line-height:1.38; color:#c3cce0; }
.role b { font-weight:700; } .role b.gold,.role .gold { color:#f4b65a; } .role b.pink,.role .pink { color:#ec4899; } .role b.cyan,.role .cyan { color:#5fc7f3; }
.mk { flex:0 0 auto; width:48px; height:48px; margin-top:1px; border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-family:"space-mono",monospace; font-size:23px; border:1.6px solid currentColor; }
.gold { color:#f4b65a; } .pink { color:#ec4899; } .cyan { color:#5fc7f3; }
.mk.gold { background:rgba(244,182,90,0.08); } .mk.pink { background:rgba(236,72,153,0.09); } .mk.cyan { background:rgba(95,199,243,0.08); }
.seal { font-family:"playfair-display",serif; font-style:italic; font-weight:700; font-size:30px; line-height:1.32; color:#f4b65a; margin-top:8px; }
.footer { position:absolute; left:60px; right:60px; bottom:60px; display:flex; align-items:center; justify-content:space-between;
  font-family:"space-mono",monospace; font-size:15px; letter-spacing:2px; color:#7f8db0; }
.footer .dot { color:#f4b65a; } .footer .nina { color:#ec4899; }
/* slide-immagine (pag.2) */
.scene-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.vtop { position:absolute; top:0; left:0; right:0; height:300px; background:linear-gradient(180deg, rgba(5,7,13,0.8), rgba(5,7,13,0)); }
.vbot { position:absolute; bottom:0; left:0; right:0; height:620px; background:linear-gradient(0deg, rgba(5,7,13,0.95) 0%, rgba(5,7,13,0.78) 30%, rgba(5,7,13,0) 100%); }
.framelt { position:absolute; inset:26px; border:1px solid rgba(255,255,255,0.18); border-radius:4px; }
.bigtitle { position:absolute; left:0; right:0; text-align:center; font-family:"playfair-display",serif; font-weight:800; color:#f8faff; line-height:0.98; text-shadow:0 6px 30px rgba(0,0,0,0.55); }
.role-c { position:absolute; left:0; right:0; text-align:center; font-family:"space-mono",monospace; font-size:20px; letter-spacing:5px; color:#ec4899; text-transform:uppercase; }
.lead-c { position:absolute; left:120px; right:120px; text-align:center; font-size:31px; line-height:1.5; color:#dfe6f2; text-shadow:0 2px 12px rgba(0,0,0,0.55); }
.lead-c .pk { color:#ec4899; font-weight:700; } .lead-c .hi { color:#fff; font-weight:600; }
</style>'''

DEFS = '''<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="gGold" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffe6ad" stop-opacity="0.85"/><stop offset="42%" stop-color="#f4b65a" stop-opacity="0.32"/><stop offset="100%" stop-color="#f4b65a" stop-opacity="0"/></radialGradient>
<radialGradient id="gCyan" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#9adcff" stop-opacity="0.6"/><stop offset="100%" stop-color="#5fc7f3" stop-opacity="0"/></radialGradient>
<radialGradient id="gPink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ec4899" stop-opacity="0.55"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>
<linearGradient id="gDoor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff4dc"/><stop offset="55%" stop-color="#ffcf85"/><stop offset="100%" stop-color="#eda24a"/></linearGradient>
</defs></svg>'''

def footer(n): return f'<div class="footer"><span><span class="dot">⟡</span>&nbsp;Personaggi</span><span class="nina">NINA</span><span>{n} / {TOT}</span></div>'

def render_slide(s, i):
    n = i + 1
    head = '<div class="slide" data-canvas-width="1080" data-canvas-height="1350">'
    if s["type"] == "cover":
        return (head + '<div class="grid"></div><div class="frame"></div>' + flow_svg(i) +
            '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
            f'<div style="position:absolute;top:96px;left:0;right:0;text-align:center;font-family:\'space-mono\',monospace;font-size:14px;letter-spacing:5px;color:#ec4899">{s["kicker"].upper()}</div>'
            + g_star +
            '<div style="position:absolute;left:80px;right:80px;top:860px;text-align:center">'
            '<div style="font-family:\'playfair-display\',serif;font-weight:800;font-size:104px;line-height:0.96;color:#f6f8ff;letter-spacing:-1px">I&nbsp;Personaggi</div>'
            '<div style="font-family:\'space-mono\',monospace;font-size:20px;letter-spacing:6px;color:#ec4899;text-transform:uppercase;margin-top:26px">Il Mondo di Nina</div>'
            '<div style="font-family:\'playfair-display\',serif;font-style:italic;font-weight:700;font-size:30px;line-height:1.42;color:#aeb9d4;margin-top:26px;padding:0 20px">Ogni avventura ha le sue facce.<br/>Si comincia da lei.</div></div>'
            '<div class="footer"><span><span class="dot">⟡</span>&nbsp;Personaggi</span><span class="nina">NINA</span><span>scorri →</span></div></div>')
    if s["type"] == "image":
        return (head + '<img class="scene-img" src="img/scena_studio.png" style="object-position:50% 42%">'
            '<div class="vtop"></div><div class="vbot"></div><div class="framelt"></div>'
            '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
            '<div class="kicker">L\'eroina</div>'
            '<div class="bigtitle" style="bottom:300px; font-size:118px">Nina</div>'
            '<div class="role-c" style="bottom:250px">La ragazza che chiede perché</div>'
            '<div class="lead-c" style="bottom:140px">Brava ragazza… e <span class="pk">piccolo genio curioso</span>. Vive in mezzo a mappe, libri e domande.</div>'
            + footer(n) + '</div>')
    if s["type"] == "close":
        return (head + '<div class="grid"></div><div class="frame"></div>' + flow_svg(i) +
            '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
            f'<div class="kicker">{s["kicker"]}</div>' + g_star +
            '<div class="body2" style="top:640px; justify-content:center; gap:30px">'
            f'<div class="lead" style="font-size:74px">{s["lead"]}</div>'
            f'<div class="intro">{s["intro"]}</div>'
            f'<div class="seal" style="font-size:34px">{s["seal"]}</div></div>' + footer(n) + '</div>')
    # text
    trio = ('<div class="trio">' + "".join(s["points"]) + '</div>') if s.get("points") else ""
    return (head + '<div class="grid"></div><div class="frame"></div>' + flow_svg(i) +
        '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
        f'<div class="kicker">{s["kicker"]}</div>' + s["glyph"] +
        '<div class="body2">'
        f'<div class="lead">{s["lead"]}</div>'
        f'<div class="intro">{s["intro"]}</div>'
        f'{trio}'
        f'<div class="seal">{s["seal"]}</div></div>' + footer(n) + '</div>')

html = ['<!DOCTYPE html>', '<html lang="it">', '<head>', '<meta charset="UTF-8" />',
        '<title>Nina · PRE_03 — I Personaggi</title>',
        '<meta name="hz:slide-selector" content=".slide" />',
        '<meta name="hz:canvas-width" content="1080" />',
        '<meta name="hz:canvas-height" content="1350" />',
        '<link rel="stylesheet" href="https://use.typekit.net/zhv2kry.css">',
        STYLE, '</head>', '<body>', DEFS]
for i, s in enumerate(slides):
    html.append(f"<!-- ===== {i+1} ===== -->")
    html.append(render_slide(s, i))
html += ['</body>', '</html>']

open(os.path.join(HERE, "carosello.html"), "w", encoding="utf-8").write("\n".join(html))
print(f"PRE_03 generato: {len(slides)} slide -> carosello.html")
