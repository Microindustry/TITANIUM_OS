# _build_ep.py | TITANIUM_OS / NINA / CAROSELLI | v1.0 | 2026-06-27
# Carosello EPISODIO EP_N2_02 "Il Soffio di Troppo". Taglio BLUEPRINT SVG narrativo (canone sess#51),
# stesso sfondo/flusso della famiglia PRE_*/EP_N2_01. 16 slide, fedele al testo (3 strati + open loop).
# Uso: python _build_ep.py -> carosello.html
import math, os

HERE = os.path.dirname(os.path.abspath(__file__))
EPID = "EP_N2_02"; PIETRA = "⟡0 Materia"; TOT = 16

def wave_path(idx, mid, amp, lam, phase, step=16):
    pts = [f"L {x} {mid + amp*math.sin(2*math.pi*(idx*1080+x)/lam + phase):.1f}" for x in range(-40, 1113, step)]
    return "M " + pts[0][2:] + " " + " ".join(pts[1:])
def gold_y(idx, x): return 1150 + 60*math.sin(2*math.pi*(idx*1080+x)/1200 + 0.608)
def flow_svg(idx):
    fid = f"soft{idx}"; cyan = wave_path(idx,420,26,1200,-1.2); gold = wave_path(idx,1150,60,1200,0.608); beads = ""
    for bx in range((idx*120)%300 - 300, 1081, 300):
        if 0 <= bx <= 1080:
            by = gold_y(idx,bx)
            beads += f'<circle cx="{bx}" cy="{by:.1f}" r="42" fill="url(#gGold)" opacity="0.45"/><circle cx="{bx}" cy="{by:.1f}" r="3" fill="#ffe6ad" opacity="0.7"/>'
    return (f'<svg class="flow" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg"><defs><filter id="{fid}" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>'
            f'<path d="{cyan}" fill="none" stroke="#5fc7f3" stroke-width="6" opacity="0.10" filter="url(#{fid})"/>'
            f'<path d="{gold}" fill="none" stroke="#f4b65a" stroke-width="11" opacity="0.18" filter="url(#{fid})" stroke-linecap="round"/>'
            f'<path d="{gold}" fill="none" stroke="#ffe6ad" stroke-width="1.6" opacity="0.32" stroke-linecap="round"/>{beads}</svg>')

def S(inner): return f'<div class="scene"><svg viewBox="0 0 600 380" width="600" height="380" xmlns="http://www.w3.org/2000/svg">{inner}</svg></div>'

# pezzi incastro riusabili
def tenon(x, y, col):  # pezzo con sporgenza a destra
    return f'<path d="M{x},{y} h120 v34 h26 v32 h-26 v34 h-120 z" fill="#0a0f1d" stroke="{col}" stroke-width="3"/>'
def mortise(x, y, col, gap=0):  # pezzo con incavo a sinistra
    g = 6 + gap
    return f'<path d="M{x},{y} h120 v100 h-120 v-34 h-{26-g} v-32 h{26-g} z" fill="#0a0f1d" stroke="{col}" stroke-width="3"/>'

# cover: incastro + soffio
sc_cover = S('<circle cx="300" cy="190" r="185" fill="url(#gGold)"/>'
    + tenon(150,150,"#f4b65a") + mortise(304,140,"#f4b65a") +
    '<g stroke="#5fc7f3" stroke-width="2.5" fill="none" opacity="0.85"><path d="M120,120 q26,-12 50,0"/><path d="M120,140 q34,-14 64,0"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="30" fill="#ffe6ad">il soffio</text>')

# scala verso la Fucina (luce arancione dal basso)
sc_stairs = S('<circle cx="300" cy="300" r="200" fill="url(#gGold)"/>'
    '<g fill="#0a0f1d" stroke="#f4b65a" stroke-width="2.6">' + "".join(f'<rect x="{200+i*16}" y="{120+i*40}" width="200" height="22"/>' for i in range(6)) + '</g>'
    '<g fill="#ffcf85" opacity="0.5"><ellipse cx="300" cy="360" rx="160" ry="30"/></g>'
    '<g fill="#ffcf85" opacity="0.85"><ellipse cx="300" cy="368" rx="90" ry="16"/></g>')

# FORGE soffia, il pezzo scivola dentro
sc_blow = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    + tenon(120,150,"#f4b65a") + mortise(330,140,"#f4b65a") +
    '<g stroke="#5fc7f3" stroke-width="2.6" fill="none"><line x1="252" y1="190" x2="320" y2="190" stroke-dasharray="5 6"/><polygon points="332,190 318,182 318,198" fill="#5fc7f3"/></g>'
    '<g stroke="#9adcff" stroke-width="2.4" fill="none" opacity="0.85"><path d="M90,150 q24,-10 46,0"/><path d="M90,170 q30,-12 56,0"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="16" letter-spacing="3" fill="#aeb9d4">«la mano sa prima»</text>')

# quanto e' giusto? big ? su due pezzi
sc_giusto = S('<circle cx="300" cy="180" r="180" fill="url(#gPink)"/><circle cx="300" cy="180" r="150" fill="url(#gGold)"/>'
    '<text x="300" y="250" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="200" fill="#ec4899">?</text>'
    '<text x="300" y="330" text-anchor="middle" font-family="space-mono,monospace" font-size="17" letter-spacing="3" fill="#ffe6ad">GIUSTO · RISPETTO A COSA</text>')

# scorrevole: cassetto con frecce e gioco di luce
sc_slide = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<rect x="160" y="150" width="280" height="100" rx="8" fill="none" stroke="#f4b65a" stroke-width="3"/>'
    '<rect x="190" y="166" width="220" height="68" rx="6" fill="#0a0f1d" stroke="#5fc7f3" stroke-width="2.5"/>'
    '<g stroke="#5fc7f3" stroke-width="3"><line x1="120" y1="200" x2="160" y2="200"/><polygon points="108,200 126,192 126,208"/><line x1="440" y1="200" x2="480" y2="200"/><polygon points="492,200 474,192 474,208"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="26" fill="#ffe6ad">deve scorrere · ½ mm</text>')

# filo: seta (tensione bassa) vs lana (tensione alta)
sc_thread2 = S('<circle cx="300" cy="180" r="180" fill="url(#gGold)"/>'
    # seta sx
    '<rect x="110" y="130" width="150" height="110" rx="6" fill="none" stroke="#5fc7f3" stroke-width="2"/>'
    '<circle cx="185" cy="185" r="26" fill="#0a0f1d" stroke="#5fc7f3" stroke-width="2.6"/>'
    '<g stroke="#5fc7f3" stroke-width="1.6" opacity="0.8"><line x1="185" y1="185" x2="185" y2="240"/></g>'
    '<text x="185" y="265" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#5fc7f3">seta · piano</text>'
    # lana dx
    '<rect x="340" y="130" width="150" height="110" rx="6" fill="none" stroke="#ec4899" stroke-width="3" stroke-dasharray="3 3"/>'
    '<circle cx="415" cy="185" r="26" fill="#0a0f1d" stroke="#ec4899" stroke-width="3"/>'
    '<g stroke="#ec4899" stroke-width="3"><line x1="415" y1="185" x2="415" y2="245"/></g>'
    '<text x="415" y="265" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#ec4899">lana · forte</text>')

# relazione: triangolo FILO-TESSUTO-USO
sc_relation = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<polygon points="300,110 200,280 400,280" fill="none" stroke="#f4b65a" stroke-width="2.6"/>'
    '<g fill="#0a0f1d" stroke="#5fc7f3" stroke-width="2.6"><circle cx="300" cy="110" r="22"/><circle cx="200" cy="280" r="22"/><circle cx="400" cy="280" r="22"/></g>'
    '<text x="300" y="86" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#5fc7f3">FILO</text>'
    '<text x="190" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#5fc7f3">TESSUTO</text>'
    '<text x="410" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="14" fill="#5fc7f3">USO</text>'
    '<text x="300" y="225" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="24" fill="#ffe6ad">relazione</text>')

# incastro fisso: serrato, nessun gioco
sc_fixed = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    + tenon(150,150,"#f4b65a").replace("h26","h26") + mortise(270,140,"#f4b65a",gap=-6) +
    '<g stroke="#ec4899" stroke-width="3"><line x1="300" y1="110" x2="300" y2="135"/><line x1="300" y1="245" x2="300" y2="270"/><polygon points="300,128 292,112 308,112"/><polygon points="300,252 292,268 308,268"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="16" letter-spacing="2" fill="#ec4899">FISSO · porta peso</text>')

# preme col palmo (lento), non si muove
sc_press = S('<circle cx="300" cy="200" r="180" fill="url(#gGold)"/>'
    '<g fill="#0a0f1d" stroke="#f4b65a" stroke-width="3"><path d="M250,120 q20,-30 50,0 q14,-22 34,2 q12,-16 26,6 l0,70 q0,30 -40,30 l-50,0 q-30,0 -30,-40 z"/></g>'
    '<g stroke="#ec4899" stroke-width="3"><line x1="300" y1="250" x2="300" y2="300"/><polygon points="300,312 290,292 310,292"/></g>'
    '<rect x="230" y="312" width="140" height="22" fill="#0a0f1d" stroke="#5fc7f3" stroke-width="2.5"/>'
    '<text x="300" y="362" text-anchor="middle" font-family="space-mono,monospace" font-size="15" fill="#aeb9d4">lento · non si muove</text>')

# gradi non si/no: scala con cursore
sc_degrees = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<line x1="120" y1="200" x2="480" y2="200" stroke="#aebdda" stroke-width="3"/>'
    '<g stroke="#aebdda" stroke-width="2">' + "".join(f'<line x1="{120+i*40}" y1="192" x2="{120+i*40}" y2="208"/>' for i in range(10)) + '</g>'
    '<polygon points="300,176 288,150 312,150" fill="#f4b65a"/><circle cx="300" cy="200" r="7" fill="#f4b65a"/>'
    '<text x="135" y="245" font-family="space-mono,monospace" font-size="15" fill="#ec4899">si blocca</text>'
    '<text x="270" y="140" font-family="space-mono,monospace" font-size="15" fill="#ffe6ad">combacia</text>'
    '<text x="405" y="245" font-family="space-mono,monospace" font-size="15" fill="#ec4899">cede</text>')

# tolleranza: due barre +-0.5 vs +-0.1
sc_tolerance = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<rect x="130" y="150" width="160" height="36" rx="4" fill="none" stroke="#5fc7f3" stroke-width="2.6"/>'
    '<rect x="186" y="150" width="48" height="36" fill="#5fc7f3" opacity="0.25"/>'
    '<text x="210" y="215" text-anchor="middle" font-family="space-mono,monospace" font-size="18" fill="#5fc7f3">± 0,5 mm</text>'
    '<text x="210" y="240" text-anchor="middle" font-family="space-mono,monospace" font-size="13" fill="#aeb9d4">scorrevole</text>'
    '<rect x="320" y="150" width="160" height="36" rx="4" fill="none" stroke="#ec4899" stroke-width="2.6"/>'
    '<rect x="392" y="150" width="16" height="36" fill="#ec4899" opacity="0.3"/>'
    '<text x="400" y="215" text-anchor="middle" font-family="space-mono,monospace" font-size="18" fill="#ec4899">± 0,1 mm</text>'
    '<text x="400" y="240" text-anchor="middle" font-family="space-mono,monospace" font-size="13" fill="#aeb9d4">stretto</text>')

# conseguenza se sbagli: pezzo crepato + ?
sc_conseq = S('<circle cx="300" cy="190" r="180" fill="url(#gPink)"/>'
    '<rect x="200" y="140" width="200" height="100" rx="6" fill="#0a0f1d" stroke="#ec4899" stroke-width="3"/>'
    '<path d="M300,140 l-14,40 l20,18 l-16,42" fill="none" stroke="#ec4899" stroke-width="3"/>'
    '<text x="300" y="300" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="26" fill="#ffe6ad">e se sbaglio?</text>')

# il patto: TE - PEZZO - USO + sigillo
sc_patto = S('<circle cx="300" cy="190" r="180" fill="url(#gGold)"/>'
    '<g stroke="#aebdda" stroke-width="2" opacity="0.5"><line x1="160" y1="180" x2="300" y2="180"/><line x1="300" y1="180" x2="440" y2="180"/></g>'
    '<g fill="#0a0f1d" stroke="#f4b65a" stroke-width="2.6"><circle cx="160" cy="180" r="26"/><circle cx="300" cy="180" r="30"/><circle cx="440" cy="180" r="26"/></g>'
    '<text x="160" y="186" text-anchor="middle" font-family="space-mono,monospace" font-size="13" fill="#f4b65a">TE</text>'
    '<text x="300" y="186" text-anchor="middle" font-family="space-mono,monospace" font-size="12" fill="#f4b65a">PEZZO</text>'
    '<text x="440" y="186" text-anchor="middle" font-family="space-mono,monospace" font-size="13" fill="#f4b65a">USO</text>'
    '<text x="300" y="285" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-weight="700" font-size="30" fill="#ffe6ad">il patto</text>')

# prima la testa: testa con ingranaggio, poi mano
sc_head = S('<circle cx="300" cy="170" r="170" fill="url(#gCyan)"/>'
    '<path d="M240,250 Q240,110 320,110 Q380,110 380,180 Q380,230 330,240 L330,260 L260,260 Z" fill="#0a0f1d" stroke="#5fc7f3" stroke-width="3"/>'
    '<g transform="translate(316,180)" stroke="#f4b65a" stroke-width="2.6" fill="none"><circle r="26"/><circle r="9"/>' + "".join(f'<line x1="{34*math.cos(math.radians(a)):.0f}" y1="{34*math.sin(math.radians(a)):.0f}" x2="{26*math.cos(math.radians(a)):.0f}" y2="{26*math.sin(math.radians(a)):.0f}"/>' for a in range(0,360,45)) + '</g>'
    '<text x="300" y="320" text-anchor="middle" font-family="playfair-display,serif" font-style="italic" font-size="24" fill="#ffe6ad">prima la testa, poi la mano</text>')

# mappa con casella 2 accesa
sc_map = S('<circle cx="300" cy="190" r="185" fill="url(#gGold)"/>'
    '<g fill="none" stroke="#7c8cab" stroke-width="2" opacity="0.7">' + "".join(f'<rect x="{160+(i%4)*80}" y="{140+(i//4)*72}" width="74" height="66" rx="6"/>' for i in range(8)) + '</g>'
    '<rect x="240" y="140" width="74" height="66" rx="6" fill="#f4b65a" opacity="0.30" stroke="#f4b65a" stroke-width="3"/>'
    '<text x="277" y="180" text-anchor="middle" font-family="space-mono,monospace" font-size="22" fill="#ffe6ad">2</text>'
    '<circle cx="277" cy="173" r="9" fill="none" stroke="#ec4899" stroke-width="3"/>')

# unita' nascosta -> casella 3
sc_unit = S('<circle cx="300" cy="180" r="180" fill="url(#gCyan)"/>'
    '<rect x="130" y="160" width="300" height="46" rx="6" fill="none" stroke="#5fc7f3" stroke-width="3"/>' +
    "".join(f'<line x1="{150+i*28}" y1="160" x2="{150+i*28}" y2="{178 if i%2 else 190}" stroke="#5fc7f3" stroke-width="2"/>' for i in range(10)) +
    '<circle cx="262" cy="183" r="18" fill="none" stroke="#ec4899" stroke-width="3"/>'
    '<g stroke="#f4b65a" stroke-width="3"><line x1="300" y1="260" x2="430" y2="260"/><polygon points="446,260 424,250 424,270"/></g>'
    '<text x="300" y="320" text-anchor="middle" font-family="space-mono,monospace" font-size="17" letter-spacing="2" fill="#ffe6ad">→ la MISURA · EP 03</text>')

slides = [
 {"type":"cover","kicker":"Episodio 2 · ⟡0 La Materia","scene":sc_cover,
  "title":"Il Soffio<br/>di Troppo","sub":"Il Mondo di Nina · Casella 2",
  "tag":"La precisione non è essere pignoli.<br/>È <i>un patto</i> tra te, la cosa e il suo uso."},

 {"type":"t","kicker":"Cold open · la Fucina","scene":sc_stairs,
  "lead":'La scala scende nel <span class="accent">caldo.</span>',
  "intro":'Dietro la libreria di Themis, una scala di ferro che puzza di legno bruciato e olio. In fondo, una luce arancione che pulsa. <span class="soft">È la Fucina.</span> Lì sotto Forge sta accoppiando due pezzi.',
  "seal":'«Accoppiare cosa?» «Due cose che devono stare insieme.»'},

 {"type":"t","kicker":"Cold open · il soffio","scene":sc_blow,
  "lead":'Solo un <span class="accent">soffio.</span>',
  "intro":'La sporgenza entra per metà, si ferma. Forge soffia — un soffio leggero, quasi niente — e il pezzo <span class="soft">scivola dentro fino in fondo.</span> Combacia.',
  "seal":'«La mano deve sapere prima.»'},

 {"type":"t","kicker":"Atto I · quanto è giusto","scene":sc_giusto,
  "lead":'Giusti rispetto <span class="pink">a cosa?</span>',
  "intro":'«Perché bastava un soffio e non di più?» «Perché erano… giusti?» «<span class="soft">Giusti rispetto a cosa?</span>» Il pizzicore dietro le orecchie: la domanda che Nina non si era ancora fatta.',
  "seal":'Rispetto all\'uso. Sempre rispetto all\'uso.'},

 {"type":"t","kicker":"Atto I · il patto","scene":sc_slide,
  "lead":'Mezzo <span class="accent">millimetro.</span>',
  "intro":'I due pezzi sono un mobile: devono scorrere. <span class="soft">Più stretti di mezzo mm si inceppano; più larghi, ballano.</span> Meno dello spessore di un\'unghia.',
  "seal":'«Esatto. Quello è il patto.»'},

 {"type":"t","kicker":"Per tutti · il test della sarta","scene":sc_thread2,
  "lead":'Stesse mani, due <span class="accent">tensioni.</span>',
  "intro":'Cuci un bottone sulla seta: tiri il filo piano. Lo stesso bottone sulla lana di uno zaino da montagna: <span class="soft">stringi quasi il doppio.</span> Stesso filo, stesso bottone.',
  "seal":'Eppure hai fatto due cose diverse.'},

 {"type":"t","kicker":"Atto I · la scoperta","scene":sc_relation,
  "lead":'Non è nel filo. È nella <span class="accent">relazione.</span>',
  "intro":'«Perché il tessuto è diverso. E lo zaino pesa.» «Hai trovato il problema dei problemi: <span class="soft">la precisione è la relazione</span> tra il filo, il tessuto e quello che deve reggere.»',
  "seal":'La precisione è una relazione, non un numero.'},

 {"type":"t","kicker":"Atto II · il soffio che rompe","scene":sc_fixed,
  "lead":'Stavolta deve stare <span class="accent">fisso.</span>',
  "intro":'Un terzo incastro: un\'asse portante, due pezzi uniti per sempre. <span class="soft">Forge non soffia.</span> Stesso incastro di prima — ma guarda la differenza.',
  "seal":'Deve portare peso, non scorrere.'},

 {"type":"t","kicker":"Atto II · preme","scene":sc_press,
  "lead":'Preme, non <span class="accent">soffia.</span>',
  "intro":'Forge spinge col palmo, tutto il peso: i pezzi entrano lenti, con resistenza. Quando sono dentro, <span class="soft">non si muovono di un millimetro.</span> L\'incastro è più stretto — quattro decimi.',
  "seal":'Forge sa a occhio. Tu, prima, con lo strumento.'},

 {"type":"t","kicker":"Atto II · gradi","scene":sc_degrees,
  "lead":'Una questione di <span class="accent">gradi.</span>',
  "intro":'Stesso gioco dello scorrevole? Cede sotto carico. Più stretto? Non entra, o spacca il legno. <span class="soft">«Un soffio di troppo»</span> non era una metafora.',
  "seal":'La differenza tra combacia e si rompe è gradi. Non sì o no.'},

 {"type":"t","kicker":"Per i grandi · la tolleranza","scene":sc_tolerance,
  "lead":'Nessuno è preciso <span class="accent">in assoluto.</span>',
  "intro":'La tolleranza non è un numero fisso: è lo scarto massimo accettabile, deciso dall\'uso. <span class="soft">Scorrevole ± 0,5 mm; portante ± 0,1 mm.</span> (Filo: 50-100 g su seta, 200-300 g su lana.)',
  "seal":'Lo stesso numero è preciso qui e sbagliato là.'},

 {"type":"t","kicker":"Atto II · la domanda giusta","scene":sc_conseq,
  "lead":'Cosa succede se <span class="pink">sbaglio?</span>',
  "intro":'«Come fa Forge a sapere la tolleranza giusta?» «Conosce il pezzo, l\'uso, il materiale. <span class="soft">E la conseguenza se sbaglia.</span>»',
  "seal":'Non «sono abbastanza preciso?» — ma «cosa succede se non lo sono?».'},

 {"type":"t","kicker":"Atto III · il patto","scene":sc_patto,
  "lead":'«Preciso» da solo è una parola <span class="accent">vuota.</span>',
  "intro":'«Preciso per scorrere in un mobile» è un\'informazione. «Preciso per reggere un solaio» è un\'altra. <span class="soft">Controlla i fatti, non le parole.</span>',
  "seal":'Il patto: tra te, il pezzo, e ciò che il pezzo deve fare.'},

 {"type":"t","kicker":"Atto III · l'ordine","scene":sc_head,
  "lead":'Prima la <span class="accent">testa.</span>',
  "intro":'Forge mette un altro blocco sul banco: Nina dovrà scegliere che incastro serve. <span class="soft">Prima di toccare lo strumento, deve sapere cosa deve reggere.</span>',
  "seal":'Prima la mano. E prima ancora, la testa.'},

 {"type":"t","kicker":"Chiusura","scene":sc_map,
  "lead":'La casella 2 si <span class="accent">accende.</span>',
  "intro":'Sulla Mappa Viva un quadrato caldo, arancione come la Fucina: la pedina di Nina avanza di un passo. Il calibro in tasca pesa poco, <span class="soft">ma lo sente.</span>',
  "seal":'«Ogni volta che qualcuno dice preciso, chiedi: preciso per fare cosa?»'},

 {"type":"close","kicker":"La casella dopo","scene":sc_unit,
  "lead":'Ogni domanda ha un\'unità <span class="accent">nascosta.</span>',
  "intro":'Se la precisione cambia con l\'uso, come fa Nina a scegliere quale, prima di costruire? <span class="soft">Deve imparare a trovare l\'unità di misura giusta</span> — chi non la trova, misura la cosa sbagliata.',
  "cta":'Provalo tu: la stessa linea a matita su carta, su carta bagnata, su vetro. Il gesto è uguale — il risultato no. Quale è «precisa» per ciò che volevi?',
  "seal":'→ Casella 3: la MISURA.'},
]

STYLE = '''<style>
* { margin:0; padding:0; box-sizing:border-box; }
html,body { background:#05070d; }
body { display:flex; flex-direction:column; align-items:center; gap:40px; padding:40px 0; }
.slide { position:relative; width:1080px; height:1350px; overflow:hidden;
  background: radial-gradient(120% 75% at 50% 34%, #1a2440 0%, #0c1122 46%, #05070d 100%);
  font-family:"source-sans-3",sans-serif; color:#eef2fb; }
.grid { position:absolute; inset:30px; opacity:0.04; background-image: linear-gradient(#5fc7f3 1px, transparent 1px), linear-gradient(90deg,#5fc7f3 1px, transparent 1px); background-size:54px 54px; }
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
.cta { font-family:"space-mono",monospace; font-size:20px; line-height:1.45; letter-spacing:1px; color:#5fc7f3; border:1px solid rgba(95,199,243,0.3); border-radius:14px; padding:18px 22px; }
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
            f'<div style="font-family:\'playfair-display\',serif;font-weight:800;font-size:84px;line-height:1.0;color:#f6f8ff;letter-spacing:-1px">{s["title"]}</div>'
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
        f'<title>Nina · {EPID} — Il Soffio di Troppo</title>',
        '<meta name="hz:slide-selector" content=".slide" />',
        '<meta name="hz:canvas-width" content="1080" />',
        '<meta name="hz:canvas-height" content="1350" />',
        '<link rel="stylesheet" href="https://use.typekit.net/zhv2kry.css">',
        STYLE,'</head>','<body>',DEFS]
for i,s in enumerate(slides):
    html.append(f"<!-- ===== {i+1} ===== -->"); html.append(render(s,i))
html += ['</body>','</html>']
open(os.path.join(HERE,"carosello.html"),"w",encoding="utf-8").write("\n".join(html))
print(f"{EPID} generato: {len(slides)} slide -> carosello.html")
