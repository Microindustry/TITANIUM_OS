# _build_pre03.py | TITANIUM_OS / NINA / CAROSELLI | v2.0 | 2026-06-27
# Genera PRE_03 "I Personaggi" — SCHEDA DEI PERSONAGGI (character bible).
# Stesso sfondo degli altri episodi (PRE_01/02): blu + griglia + flusso continuo gold/cyan.
# UNA sola slide-immagine (pag.2), foto Nina INLINE base64 (si vede ovunque).
# NON ripete i concetti di PRE_01 (Atomi&Bit, 8 Pietre, Mappa, metodo): va in PROFONDITA' sui
# personaggi e introduce Forge + l'Entropia (assenti in PRE_01). Themis allineato al canone PRE_01
# (custode della misura). 17 slide. Uso: python _build_pre03.py -> carosello.html
import math, os, base64
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
TOT = 17

# ---------- foto Nina (pag.2) inline base64, ritagliata 1080x1350 ----------
def nina_data_uri():
    src = os.path.join(HERE, "img", "scena_studio.png")
    im = Image.open(src).convert("RGB")
    tw, th = 1080, 1350
    s = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    left = round((im.width - tw) * 0.5); top = round((im.height - th) * 0.42)
    im = im.crop((left, top, left + tw, top + th))
    out = os.path.join(HERE, "img", "_nina_slide2.jpg")
    im.save(out, quality=88)
    b = base64.b64encode(open(out, "rb").read()).decode()
    return "data:image/jpeg;base64," + b

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

# ---------- glifi vettoriali, TUTTI DISTINTI (scene SVG, viewBox 600x380) ----------
def G(inner): return f'<div class="scene"><svg viewBox="0 0 600 380" width="600" height="380" xmlns="http://www.w3.org/2000/svg">{inner}</svg></div>'

# cover: costellazione del cast (? centrale + 3 simboli orbitanti)
g_cast = G('<circle cx="300" cy="190" r="185" fill="url(#gGold)"/>'
    '<g stroke="#aebdda" stroke-width="1.4" opacity="0.4"><line x1="300" y1="190" x2="150" y2="120"/><line x1="300" y1="190" x2="455" y2="130"/><line x1="300" y1="190" x2="300" y2="320"/></g>'
    '<text x="300" y="225" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="120" fill="#ec4899">?</text>'
    '<g transform="translate(150,120)" stroke="#5fc7f3" stroke-width="3" fill="none"><line x1="-22" y1="0" x2="22" y2="0"/><line x1="0" y1="-16" x2="0" y2="14"/><path d="M-22,0 l-8,16 h16 z"/><path d="M22,0 l-8,16 h16 z"/></g>'
    '<g transform="translate(455,130)" stroke="#f4b65a" stroke-width="3" fill="none"><circle r="20"/><circle r="8"/>' +
    "".join(f'<line x1="{26*math.cos(math.radians(a)):.0f}" y1="{26*math.sin(math.radians(a)):.0f}" x2="{20*math.cos(math.radians(a)):.0f}" y2="{20*math.sin(math.radians(a)):.0f}"/>' for a in range(0,360,45)) + '</g>'
    '<g transform="translate(300,320)" stroke="#ec4899" stroke-width="4"><line x1="-15" y1="-15" x2="15" y2="15"/><line x1="15" y1="-15" x2="-15" y2="15"/></g>')

# Nina · carattere: scintilla
g_spark = G('<circle cx="300" cy="190" r="170" fill="url(#gGold)"/>'
    '<g stroke="#f4b65a" stroke-width="4" stroke-linecap="round">' +
    "".join(f'<line x1="300" y1="190" x2="{300+ (95 if i%2 else 60)*math.cos(math.radians(i*45)):.0f}" y2="{190+ (95 if i%2 else 60)*math.sin(math.radians(i*45)):.0f}"/>' for i in range(8)) +
    '</g><circle cx="300" cy="190" r="22" fill="#ffe6ad"/>')

# Nina · luci e ombre: cerchio diviso chiaro/scuro
g_twoface = G('<circle cx="300" cy="190" r="170" fill="url(#gPink)"/>'
    '<circle cx="300" cy="190" r="120" fill="none" stroke="#ec4899" stroke-width="3"/>'
    '<path d="M300,70 A120,120 0 0,1 300,310 Z" fill="#ec4899" opacity="0.22"/>'
    '<line x1="300" y1="70" x2="300" y2="310" stroke="#ec4899" stroke-width="3"/>'
    '<circle cx="250" cy="160" r="7" fill="#f4b65a"/><circle cx="350" cy="160" r="7" fill="#ec4899"/>')

# Nina · aspetto: volto con coda
g_face = G('<circle cx="300" cy="190" r="172" fill="url(#gPink)"/>'
    '<g fill="none" stroke="#ec4899" stroke-width="3"><circle cx="296" cy="180" r="92"/>'
    '<path d="M340,108 Q392,96 380,168 Q374,210 352,232" stroke="#7c8cab"/>'
    '<path d="M268,210 Q296,230 322,210"/></g>'
    '<circle cx="270" cy="172" r="6" fill="#ec4899"/><circle cx="324" cy="172" r="6" fill="#ec4899"/>'
    '<g fill="#f4b65a"><circle cx="256" cy="196" r="2.5"/><circle cx="296" cy="206" r="2.5"/><circle cx="336" cy="196" r="2.5"/></g>')

# Nina · arco: gradini che salgono con figura
g_growth = G('<circle cx="300" cy="190" r="175" fill="url(#gGold)"/>'
    '<g stroke="#f4b65a" stroke-width="3" fill="none"><path d="M170,290 H230 V250 H290 V210 H350 V170 H410"/></g>'
    '<g stroke="#5fc7f3" stroke-width="3" fill="none" opacity="0.8"><path d="M170,300 Q300,120 430,150" marker-end=""/></g>'
    '<circle cx="410" cy="150" r="10" fill="#ec4899"/>')

# cast intro: tre marchi connessi
g_trio = G('<circle cx="300" cy="190" r="175" fill="url(#gGold)"/>'
    '<g stroke="#aebdda" stroke-width="1.6" opacity="0.4"><line x1="180" y1="190" x2="300" y2="190"/><line x1="300" y1="190" x2="420" y2="190"/></g>'
    '<g transform="translate(180,190)" stroke="#5fc7f3" stroke-width="3" fill="none"><line x1="-20" y1="0" x2="20" y2="0"/><line x1="0" y1="-15" x2="0" y2="13"/><path d="M-20,0 l-7,15 h14 z"/><path d="M20,0 l-7,15 h14 z"/></g>'
    '<g transform="translate(300,190)" stroke="#f4b65a" stroke-width="3" fill="none"><circle r="20"/><circle r="7"/></g>'
    '<g transform="translate(420,190)" stroke="#ec4899" stroke-width="4"><line x1="-15" y1="-15" x2="15" y2="15"/><line x1="15" y1="-15" x2="-15" y2="15"/></g>')

# Themis · chi è: bilancia/calibro
g_scales = G('<circle cx="300" cy="190" r="170" fill="url(#gCyan)"/>'
    '<g stroke="#5fc7f3" stroke-width="3" fill="none"><line x1="300" y1="92" x2="300" y2="280"/>'
    '<line x1="180" y1="130" x2="420" y2="130"/><line x1="180" y1="130" x2="150" y2="200"/><line x1="180" y1="130" x2="210" y2="200"/>'
    '<line x1="420" y1="130" x2="390" y2="200"/><line x1="420" y1="130" x2="450" y2="200"/>'
    '<path d="M138,200 Q180,244 222,200"/><path d="M378,200 Q420,244 462,200"/><rect x="252" y="280" width="96" height="14" rx="4"/></g>')

# Themis · cosa fa: righello con tacche + filo
g_measure = G('<circle cx="300" cy="190" r="170" fill="url(#gCyan)"/>'
    '<rect x="150" y="170" width="300" height="44" rx="6" fill="none" stroke="#5fc7f3" stroke-width="3"/>' +
    "".join(f'<line x1="{170+i*28}" y1="170" x2="{170+i*28}" y2="{190 if i%2 else 200}" stroke="#5fc7f3" stroke-width="2"/>' for i in range(10)) +
    '<path d="M150,120 Q300,90 450,120" stroke="#f4b65a" stroke-width="2.5" fill="none" opacity="0.7"/>'
    '<circle cx="300" cy="98" r="5" fill="#ffe6ad"/>')

# Forge · chi è: incudine
g_anvil = G('<circle cx="300" cy="200" r="172" fill="url(#gGold)"/>'
    '<g fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"><path d="M170,210 H430 L400,250 H320 L320,300 H280 L280,250 H200 Z"/><rect x="250" y="300" width="100" height="26" rx="4"/></g>'
    '<g fill="#ffcf85"><circle cx="210" cy="150" r="4"/><circle cx="240" cy="128" r="3"/><circle cx="380" cy="150" r="4"/><circle cx="350" cy="128" r="3"/></g>')

# Forge · cosa fa: martello + scintille
g_hammer = G('<circle cx="300" cy="190" r="170" fill="url(#gGold)"/>'
    '<g stroke="#f4b65a" stroke-width="3" fill="#0a0f1d"><rect x="230" y="110" width="140" height="50" rx="6"/><rect x="288" y="160" width="24" height="150" rx="6"/></g>'
    '<g stroke="#ffcf85" stroke-width="3" stroke-linecap="round"><line x1="170" y1="300" x2="200" y2="280"/><line x1="200" y1="320" x2="232" y2="300"/><line x1="430" y1="300" x2="400" y2="280"/></g>')

# insieme: bilancia con ingranaggio su un piatto
g_scalegear = G('<circle cx="300" cy="190" r="172" fill="url(#gGold)"/>'
    '<g stroke="#aebdda" stroke-width="3" fill="none"><line x1="300" y1="100" x2="300" y2="270"/><line x1="180" y1="130" x2="420" y2="130"/><rect x="252" y="270" width="96" height="14" rx="4"/></g>'
    '<g transform="translate(180,180)" stroke="#5fc7f3" stroke-width="3" fill="none"><path d="M-34,0 Q0,40 34,0"/><line x1="0" y1="-50" x2="0" y2="0"/></g>'
    '<g transform="translate(420,176)" stroke="#f4b65a" stroke-width="3" fill="none"><line x1="0" y1="-46" x2="0" y2="-8"/><circle cy="14" r="20"/><circle cy="14" r="7"/></g>')

# Entropia · chi è: frammenti sparsi
g_entropy = G('<circle cx="300" cy="190" r="170" fill="url(#gPink)"/>'
    '<g stroke="#ec4899" stroke-width="3" fill="none" opacity="0.9">' +
    "".join(f'<rect x="{300+((i*53)%200)-100}" y="{120+((i*71)%150)}" width="{14+(i%3)*8}" height="{14+(i%2)*10}" transform="rotate({(i*37)%90} {300+((i*53)%200)-100} {120+((i*71)%150)})"/>' for i in range(9)) +
    '</g>')

# Entropia · come la incontri: forma che si dissolve in puntini
g_fading = G('<circle cx="300" cy="190" r="170" fill="url(#gPink)"/>'
    '<rect x="170" y="120" width="120" height="140" rx="8" fill="none" stroke="#ec4899" stroke-width="3"/>'
    '<g fill="#ec4899" opacity="0.85">' +
    "".join(f'<circle cx="{300+i*14}" cy="{190+ (-1)**i*(i*6)}" r="{max(2,7-i)}"/>' for i in range(12)) + '</g>')

# duello: scudo con ordine
g_shield = G('<circle cx="300" cy="190" r="172" fill="url(#gGold)"/>'
    '<path d="M300,90 L400,128 V210 Q400,280 300,318 Q200,280 200,210 V128 Z" fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"/>'
    '<g stroke="#5fc7f3" stroke-width="2.4" opacity="0.85"><line x1="240" y1="170" x2="360" y2="170"/><line x1="240" y1="205" x2="360" y2="205"/><line x1="240" y1="240" x2="360" y2="240"/></g>'
    '<g transform="translate(300,210)" stroke="#ec4899" stroke-width="3"><line x1="-14" y1="-14" x2="14" y2="14"/><line x1="14" y1="-14" x2="-14" y2="14"/></g>')

# altri volti: orizzonte con sagome ?
g_horizon = G('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<line x1="150" y1="270" x2="450" y2="270" stroke="#aebdda" stroke-width="2" opacity="0.5"/>'
    '<g fill="#0a0f1d" stroke="#7c8cab" stroke-width="2.5">'
    '<path d="M210,270 V210 Q210,178 240,178 Q270,178 270,210 V270 Z"/>'
    '<path d="M330,270 V196 Q330,160 364,160 Q398,160 398,196 V270 Z"/></g>'
    '<text x="240" y="150" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="48" fill="#5fc7f3">?</text>'
    '<text x="364" y="132" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="48" fill="#ec4899">?</text>')

# si parte: sentiero verso una stella
g_path = G('<circle cx="300" cy="160" r="160" fill="url(#gGold)"/>'
    '<text x="300" y="150" text-anchor="middle" font-family="playfair-display,serif" font-weight="800" font-size="90" fill="#f4b65a">&#10022;</text>'
    '<path d="M250,330 Q300,260 290,210 Q280,170 300,150" fill="none" stroke="#5fc7f3" stroke-width="3" stroke-dasharray="6 8" opacity="0.8"/>'
    '<path d="M350,330 Q310,270 310,210" fill="none" stroke="#5fc7f3" stroke-width="3" stroke-dasharray="6 8" opacity="0.5"/>')

# ---------- contenuti: SCHEDA PERSONAGGI (17 slide; pag.2 = foto) ----------
def role(mk_cls, ch, html): return f'<div class="role"><span class="mk {mk_cls}">{ch}</span><span>{html}</span></div>'

slides = []
slides.append({"type": "cover"})                                    # 1
slides.append({"type": "image"})                                    # 2 — UNICA FOTO

# 3 — NINA · carattere
slides.append({"type": "text", "kicker": "Nina · com'è fatta", "glyph": g_spark,
    "lead": 'Una scintilla che non <span class="accent">si spegne.</span>',
    "intro": 'Nina è energia pura: parla veloce, pensa più veloce ancora, e quando una cosa la prende non la molla più. <span class="soft">È coraggiosa</span> — a volte troppo — e ha un cuore grande quanto la sua testa dura.',
    "points": [role("gold", "★", 'Ostinata: se sbatte contro un muro, <b class="gold">cerca la finestra</b>.'),
               role("cyan", "♥", 'Generosa: quello che capisce, lo <b class="cyan">spiega subito</b> agli altri.'),
               role("pink", "!", 'Impaziente: vorrebbe tutto adesso — e a volte questo la frega.')],
    "seal": 'Sveglia, calda, testarda: una piccola forza della natura.'})

# 4 — NINA · luci e ombre
slides.append({"type": "text", "kicker": "Nina · luci e ombre", "glyph": g_twoface,
    "lead": 'Anche i geni <span class="accent">inciampano.</span>',
    "intro": 'Nina non è perfetta, ed è per questo che le vuoi bene. <span class="soft">Si distrae, si arrabbia con sé stessa,</span> a volte si butta giù e pensa di non essere capace.',
    "points": [role("pink", "✕", 'Quando sbaglia, <b class="pink">se la prende</b> — forte.'),
               role("gold", "↻", 'Ma non resta a terra: <b class="gold">respira e riparte</b>.'),
               role("cyan", "◐", 'Scopre che sbagliare non è perdere: è solo non aver ancora capito.')],
    "seal": 'I difetti non la rovinano: la rendono una di noi.'})

# 5 — NINA · aspetto
slides.append({"type": "text", "kicker": "Nina · come la riconosci", "glyph": g_face,
    "lead": 'Sempre <span class="accent">lei.</span>',
    "intro": 'Il suo volto non cambia mai, in nessuna storia: <span class="soft">è la sua firma.</span> Pelle ambrata, un mix di Colombia e Sud Italia, e quegli occhi castano scuro che ti guardano dritti.',
    "points": [role("gold", "♪", '<b class="gold">Coda alta</b> lunghissima, da ballerina.'),
               role("cyan", "▤", '<b class="cyan">Giacca di jeans</b> a bottoni, con tocchi rosa.'),
               role("pink", "✦", '<b class="pink">Lentiggini</b> sul naso e uno sguardo che non si abbassa.')],
    "seal": 'Stesso volto, mille avventure.'})

# 6 — NINA · arco
slides.append({"type": "text", "kicker": "Nina · come cresce", "glyph": g_growth,
    "lead": 'Da chi si perde a chi <span class="accent">costruisce.</span>',
    "intro": 'All\'inizio Nina è solo una bambina con tante domande e poco ordine. <span class="soft">Avventura dopo avventura</span> impara a darsi i suoi strumenti, e diventa capace di guidarsi da sola.',
    "points": [role("cyan", "1", 'Prima: si perde, dimentica, si scoraggia.'),
               role("gold", "2", 'Poi: si fa una mappa, un metodo, le sue regole.'),
               role("pink", "3", 'Infine: <b class="pink">non aspetta più</b> che siano gli altri a risolverle le cose.')],
    "seal": 'La storia di Nina è la storia di chi impara a camminare da sé.'})

# 7 — IL CAST
slides.append({"type": "text", "kicker": "Il cast · non è sola", "glyph": g_trio,
    "lead": 'Tre figure al suo <span class="accent">fianco.</span>',
    "intro": 'Intorno a Nina vivono altri personaggi. <span class="soft">Due la aiutano</span> a costruire e a non perdersi; <span class="pink">uno le rema contro,</span> sempre.',
    "points": [role("cyan", "⚖", '<b class="cyan">Themis</b> — la custode della misura.'),
               role("gold", "⚒", '<b class="gold">Forge</b> — le mani dell\'officina.'),
               role("pink", "✕", '<b class="pink">L\'Entropia</b> — il disordine che la sfida.')],
    "seal": 'Gli alleati la sostengono. L\'avversario la fa crescere.'})

# 8 — THEMIS · chi è (allineato a PRE_01)
slides.append({"type": "text", "kicker": "Themis · chi è", "glyph": g_scales,
    "lead": 'La custode della <span class="cyan">misura.</span>',
    "intro": 'Themis è calma dove Nina è foga. <span class="soft">Asciutta, sguardo fermo, il calibro sempre a portata di mano:</span> non alza mai la voce, perché lascia parlare i numeri.',
    "points": [role("cyan", "⚖", 'Precisa fino al millesimo: <b class="cyan">o una cosa torna, o non torna</b>.'),
               role("gold", "⊙", 'Severa ma giusta: non sgrida, mostra.'),
               role("pink", "✓", 'È la voce che dice «aspetta, controlliamo».')],
    "seal": 'Dove c\'è confusione, Themis porta esattezza.'})

# 9 — THEMIS · cosa fa per Nina
slides.append({"type": "text", "kicker": "Themis · cosa fa per Nina", "glyph": g_measure,
    "lead": 'La frena, e così la <span class="accent">salva.</span>',
    "intro": 'Nina taglierebbe senza misurare, pur di arrivare prima. <span class="soft">Themis la ferma un secondo prima:</span> le insegna a fidarsi della prova invece che dell\'istinto.',
    "points": [role("cyan", "↦", 'Le insegna a <b class="cyan">misurare prima di agire</b>.'),
               role("gold", "≡", 'Tiene il filo del ragionamento quando Nina si infervora.'),
               role("pink", "!", 'Le ricorda che una cosa bella ma sbagliata resta sbagliata.')],
    "seal": 'La pazienza che trasforma la foga in metodo.'})

# 10 — FORGE · chi è (NUOVO)
slides.append({"type": "text", "kicker": "Forge · chi è", "glyph": g_anvil,
    "lead": 'Le mani del <span class="accent">mondo.</span>',
    "intro": 'Se Themis è la mente fredda, Forge è il calore dell\'officina. <span class="soft">Ruvido, generoso, instancabile:</span> sa di limatura e metallo caldo, e ride forte ogni volta che un pezzo riesce.',
    "points": [role("gold", "⚒", 'Dà forma alla materia: <b class="gold">salda, taglia, monta</b>.'),
               role("cyan", "▦", 'Non ha paura di sporcarsi le mani — anzi, gli piace.'),
               role("pink", "✦", 'Per lui una cosa esiste solo quando la puoi <b class="pink">tenere in mano</b>.')],
    "seal": 'Il fuoco buono che trasforma le idee in oggetti.'})

# 11 — FORGE · cosa fa per Nina
slides.append({"type": "text", "kicker": "Forge · cosa fa per Nina", "glyph": g_hammer,
    "lead": 'Le insegna a <span class="accent">fare.</span>',
    "intro": 'Nina capisce in fretta, ma capire non basta. <span class="soft">Forge la porta al banco</span> e le mette gli attrezzi in mano: una buona idea, finché resta in testa, non ha ancora salvato nessuno.',
    "points": [role("gold", "⚒", 'Le mostra che <b class="gold">pensare e fare</b> sono la stessa cosa.'),
               role("cyan", "↺", 'Le insegna a riprovare quando il pezzo viene storto.'),
               role("pink", "◆", 'Le regala l\'orgoglio di dire «questo l\'ho costruito io».')],
    "seal": 'Dal pensiero alla cosa vera: ci pensa Forge.'})

# 12 — INSIEME
slides.append({"type": "text", "kicker": "Insieme · misura e martello", "glyph": g_scalegear,
    "lead": 'Uno pesa, l\'altro <span class="accent">batte.</span>',
    "intro": 'Themis e Forge sembrano opposti, e infatti si completano. <span class="soft">Prima si misura, poi si costruisce:</span> insieme tengono Nina sul filo giusto tra l\'idea e la realtà.',
    "points": [role("cyan", "⚖", '<b class="cyan">Themis</b>: controlla che sia giusto.'),
               role("gold", "⚒", '<b class="gold">Forge</b>: fa in modo che esista.'),
               role("pink", "⟡", 'In mezzo, Nina impara a non saltare nessun passo.')],
    "seal": 'Mente e mani: la coppia che la fa crescere.'})

# 13 — L'ENTROPIA · chi è (NUOVO)
slides.append({"type": "text", "kicker": "L'Entropia · l'avversario", "glyph": g_entropy,
    "lead": 'Il nemico <span class="pink">invisibile.</span>',
    "intro": 'Ogni storia ha il suo avversario. Qui non è un mostro con i denti: <span class="soft">è l\'Entropia, il disordine.</span> La forza silenziosa che, se la lasci fare, sfalda ogni cosa.',
    "points": [role("pink", "✕", 'Rompe, perde i pezzi, fa dimenticare.'),
               role("gold", "↓", 'Spegne la voglia: il suo sussurro è «<b>lascia perdere</b>».'),
               role("cyan", "…", 'Non attacca: aspetta che tu ti arrenda da solo.')],
    "seal": 'Non fa rumore — ed è proprio per questo che è pericolosa.'})

# 14 — L'ENTROPIA · come la incontri
slides.append({"type": "text", "kicker": "L'Entropia · come la incontri", "glyph": g_fading,
    "lead": 'La riconosci <span class="accent">ogni giorno.</span>',
    "intro": 'L\'Entropia non vive nelle caverne: vive nelle piccole cose di tutti i giorni. <span class="soft">È normale, ed è per questo che è così forte.</span>',
    "points": [role("pink", "▦", 'La stanza in disordine in cui non trovi più niente.'),
               role("gold", "◷", 'Il progetto lasciato a metà, il pezzo che sparisce.'),
               role("cyan", "↘", 'La sera in cui pensi «non sono capace» e molli.')],
    "seal": 'Piccola, quotidiana, paziente: ecco com\'è fatta.'})

# 15 — IL DUELLO
slides.append({"type": "text", "kicker": "Il duello · ordine vs disordine", "glyph": g_shield,
    "lead": 'Si batte <span class="accent">costruendo.</span>',
    "intro": 'Contro l\'Entropia non serve la forza: serve l\'ordine. <span class="soft">Ogni volta che Nina sistema, misura, costruisce uno strumento,</span> le toglie un pezzo di terreno.',
    "points": [role("gold", "⛨", 'Mettere ordine è già <b class="gold">vincere una battaglia</b>.'),
               role("cyan", "↻", 'Non si vince una volta sola: si tiene a bada ogni giorno.'),
               role("pink", "✦", 'Gli alleati aiutano, ma la scelta di non arrendersi è sua.')],
    "seal": 'Il disordine si combatte un gesto ordinato alla volta.'})

# 16 — ALTRI VOLTI
slides.append({"type": "text", "kicker": "Altri volti · il mondo è grande", "glyph": g_horizon,
    "lead": 'E gli <span class="accent">altri?</span>',
    "intro": 'Il Mondo di Nina è appena cominciato. <span class="soft">Altre figure arriveranno</span> — aiutanti, maestri, creature curiose — e per ora aspettano dietro le quinte, riconoscibili solo dai loro simboli.',
    "points": [role("gold", "⟡", 'Ogni nuovo personaggio porterà una nuova idea.'),
               role("cyan", "✦", 'I loro volti si scopriranno con le avventure.'),
               role("pink", "?", 'Chi sarà il prossimo? Lo deciderà la storia.')],
    "seal": 'Un cast che cresce, una storia alla volta.'})

# 17 — SI PARTE
slides.append({"type": "close", "kicker": "Si parte",
    "lead": 'Ora li <span class="accent">conosci.</span>',
    "intro": 'Nina, Themis, Forge e l\'Entropia: il cast è pronto. <span class="soft">Il resto si scopre camminando, una storia alla volta.</span>',
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
.scene { position:absolute; top:222px; left:0; right:0; height:360px; display:flex; align-items:center; justify-content:center; }
.body2 { position:absolute; left:96px; right:96px; top:606px; bottom:178px;
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
  font-family:"space-mono",monospace; font-size:22px; border:1.6px solid currentColor; }
.gold { color:#f4b65a; } .pink { color:#ec4899; } .cyan { color:#5fc7f3; }
.mk.gold { background:rgba(244,182,90,0.08); } .mk.pink { background:rgba(236,72,153,0.09); } .mk.cyan { background:rgba(95,199,243,0.08); }
.seal { font-family:"playfair-display",serif; font-style:italic; font-weight:700; font-size:30px; line-height:1.32; color:#f4b65a; margin-top:8px; }
.footer { position:absolute; left:60px; right:60px; bottom:60px; display:flex; align-items:center; justify-content:space-between;
  font-family:"space-mono",monospace; font-size:15px; letter-spacing:2px; color:#7f8db0; }
.footer .dot { color:#f4b65a; } .footer .nina { color:#ec4899; }
/* slide-immagine (pag.2) */
.scene-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.vtop { position:absolute; top:0; left:0; right:0; height:300px; background:linear-gradient(180deg, rgba(5,7,13,0.8), rgba(5,7,13,0)); }
.vbot { position:absolute; bottom:0; left:0; right:0; height:600px; background:linear-gradient(0deg, rgba(5,7,13,0.95) 0%, rgba(5,7,13,0.72) 32%, rgba(5,7,13,0) 100%); }
.framelt { position:absolute; inset:26px; border:1px solid rgba(255,255,255,0.18); border-radius:4px; }
.bigtitle { position:absolute; left:0; right:0; text-align:center; font-family:"playfair-display",serif; font-weight:800; color:#f8faff; line-height:0.98; text-shadow:0 6px 30px rgba(0,0,0,0.6); }
.role-c { position:absolute; left:0; right:0; text-align:center; font-family:"space-mono",monospace; font-size:20px; letter-spacing:5px; color:#ec4899; text-transform:uppercase; }
.lead-c { position:absolute; left:120px; right:120px; text-align:center; font-size:31px; line-height:1.5; color:#dfe6f2; text-shadow:0 2px 12px rgba(0,0,0,0.7); }
.lead-c .pk { color:#ec4899; font-weight:700; } .lead-c .hi { color:#fff; font-weight:600; }
</style>'''

DEFS = '''<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="gGold" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffe6ad" stop-opacity="0.85"/><stop offset="42%" stop-color="#f4b65a" stop-opacity="0.32"/><stop offset="100%" stop-color="#f4b65a" stop-opacity="0"/></radialGradient>
<radialGradient id="gCyan" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#9adcff" stop-opacity="0.6"/><stop offset="100%" stop-color="#5fc7f3" stop-opacity="0"/></radialGradient>
<radialGradient id="gPink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ec4899" stop-opacity="0.55"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>
<linearGradient id="gDoor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff4dc"/><stop offset="55%" stop-color="#ffcf85"/><stop offset="100%" stop-color="#eda24a"/></linearGradient>
</defs></svg>'''

def footer(n): return f'<div class="footer"><span><span class="dot">⟡</span>&nbsp;Personaggi</span><span class="nina">NINA</span><span>{n} / {TOT}</span></div>'

NINA_IMG = nina_data_uri()

def render_slide(s, i):
    n = i + 1
    head = '<div class="slide" data-canvas-width="1080" data-canvas-height="1350">'
    if s["type"] == "cover":
        return (head + '<div class="grid"></div><div class="frame"></div>' + flow_svg(i) +
            '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
            '<div style="position:absolute;top:96px;left:0;right:0;text-align:center;font-family:\'space-mono\',monospace;font-size:14px;letter-spacing:5px;color:#ec4899">PREAMBOLO · I PERSONAGGI</div>'
            + g_cast +
            '<div style="position:absolute;left:80px;right:80px;top:860px;text-align:center">'
            '<div style="font-family:\'playfair-display\',serif;font-weight:800;font-size:104px;line-height:0.96;color:#f6f8ff;letter-spacing:-1px">I&nbsp;Personaggi</div>'
            '<div style="font-family:\'space-mono\',monospace;font-size:20px;letter-spacing:6px;color:#ec4899;text-transform:uppercase;margin-top:26px">Il cast del Mondo di Nina</div>'
            '<div style="font-family:\'playfair-display\',serif;font-style:italic;font-weight:700;font-size:30px;line-height:1.42;color:#aeb9d4;margin-top:26px;padding:0 20px">Chi sono, come sono fatti,<br/>e perché stanno dalla sua parte.</div></div>'
            '<div class="footer"><span><span class="dot">⟡</span>&nbsp;Personaggi</span><span class="nina">NINA</span><span>scorri →</span></div></div>')
    if s["type"] == "image":
        return (head + f'<img class="scene-img" src="{NINA_IMG}">'
            '<div class="vtop"></div><div class="vbot"></div><div class="framelt"></div>'
            '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
            '<div class="kicker">L\'eroina</div>'
            '<div class="bigtitle" style="bottom:300px; font-size:118px">Nina</div>'
            '<div class="role-c" style="bottom:250px">La protagonista</div>'
            '<div class="lead-c" style="bottom:140px">La bambina attorno a cui gira tutto il mondo. <span class="hi">Conosciamola davvero.</span></div>'
            + footer(n) + '</div>')
    if s["type"] == "close":
        return (head + '<div class="grid"></div><div class="frame"></div>' + flow_svg(i) +
            '<div class="toplabel">Titanium&nbsp;OS · L\'Avventura</div>'
            f'<div class="kicker">{s["kicker"]}</div>' + g_path +
            '<div class="body2" style="top:640px; justify-content:center; gap:30px">'
            f'<div class="lead" style="font-size:74px">{s["lead"]}</div>'
            f'<div class="intro">{s["intro"]}</div>'
            f'<div class="seal" style="font-size:34px">{s["seal"]}</div></div>' + footer(n) + '</div>')
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
print(f"PRE_03 generato: {len(slides)} slide -> carosello.html (foto inline base64)")
