# _build_pre_sg_02.py | TITANIUM_OS / CAROSELLI / PRE_SG_02 | v1.0 | 2026-07-14
# PRE_SG_02 «Cos'è il Sistema» — i 5 pilastri, l'organismo, il loop.
# Fonti: canone CLAUDE.md (GENESIS STACK, DATI MASTER, MILESTONE, 10 REGOLE) + STATE.json.

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "_TEMPLATE"))
from sg_builder import build  # noqa: E402

META = {
    "title": "Il Sistema · PRE_SG_02 — Cos'è il Sistema",
    "toplabel": "TITANIUM OS · IL SISTEMA — PREAMBOLO 2 DI 4",
    "serie": "PRE_SG_02",
}

S = [
    dict(social=True, scene="pilastri", kicker="PRE 02 · COS'È IL SISTEMA",
         lead='Non è un progetto.<br>È un <span class="accent">organismo</span>.',
         intro='Cinque pilastri che si tengono in piedi a vicenda — metallo, plastica, software e persone vere.'),
    dict(social=True, scene="socio", kicker="LA TESI",
         lead='Metallo e codice:<br>lo <span class="cyan">stesso</span> mestiere.',
         intro='Tutti e due trasformano energia in struttura. Io lavoro <span class="soft">alla giuntura tra i due</span> — è lì che succede tutto.',
         seal='"Non sono due mondi. Non lo sono mai stati."'),
    dict(social=True, scene="scintilla", kicker="PILASTRO 1 · V32",
         lead='Una fresatrice<br>costruita <span class="accent">da zero</span>.',
         intro='178 kg di corpo unico, precisione ±0,019 mm. Non l\'ho comprata: <span class="soft">l\'ho progettata e costruita</span>, pezzo per pezzo, in taverna.'),
    dict(social=False, scene="taverna", kicker="PERCHÉ COSTRUIRLA",
         lead='Costruire dà una cosa<br>che comprare <span class="cyan">non dà</span>.',
         intro='La conoscenza piena: ogni vincolo, ogni giunto, ogni punto debole. Quando qualcosa si rompe, <span class="soft">so già dove guardare</span>.'),
    dict(social=True, scene="pilastri", kicker="PILASTRO 2 · MIMS",
         lead='Il <span class="accent">LEGO</span> d\'acciaio.',
         intro='Connettori modulari con una geometria proprietaria: strutture che si montano e smontano come mattoncini — ma reggono da lavoro vero.'),
    dict(social=False, scene="pilastri", kicker="PILASTRO 3 · VULCAN",
         lead='La pressa che darà<br><span class="cyan">corpo</span> ai connettori.',
         intro='I pezzi non si fanno a mano: VULCAN è lo strumento di produzione di MIMS. Quattro colonne, polimeri, officina.'),
    dict(social=True, scene="notte", kicker="PILASTRO 4 · GENESIS",
         lead='Il <span class="cyan">cervello</span><br>di tutto quanto.',
         intro='Memoria che indicizza ogni decisione, agenti che lavorano di notte, automazioni che non dipendono dalla mia volontà. <span class="soft">È il pilastro che tiene insieme gli altri.</span>'),
    dict(social=True, scene="patto", kicker="PILASTRO 5 · VITA NATURA",
         lead='La prova sul<br>mondo <span class="accent">reale</span>.',
         intro='Il centro estetico di Maria, gestito con le automazioni del sistema: clienti veri, prenotazioni vere, <span class="soft">metriche vere</span>. Se funziona lì, funziona.'),
    dict(social=True, scene="loop", kicker="IL REATTORE",
         lead='Ogni pilastro<br><span class="cyan">alimenta</span> gli altri.',
         intro='La fresa produce i connettori · la pressa li moltiplica · il cervello coordina · il centro dimostra · e ogni passo diventa <span class="soft">conoscenza che resta</span>.',
         seal='"Tutto si connette. Nessun silo."'),
    dict(social=False, scene="mappa", kicker="LA MENTE",
         lead='Non ricordare.<br><span class="accent">Documenta</span>.',
         intro='Ogni decisione tecnica finisce in una memoria indicizzata — oltre diciottomila frammenti di conoscenza operativa. Il sistema <span class="soft">non dimentica</span>.'),
    dict(social=True, scene="notte", kicker="LA NOTTE",
         lead='Si mantiene<br><span class="cyan">da solo</span>.',
         intro='Mentre dormo: backup, controlli di salute, ricerca, generazione di contenuti. La mattina trovo il referto — <span class="soft">il sistema si è già visitato</span>.'),
    dict(social=False, scene="impalcatura", kicker="I NUMERI ONESTI",
         lead='V32 al 65%.<br>GENESIS al 70%.<br><span class="accent">Versioni</span>, non perfezione.',
         intro='Lo stato lo dichiaro sempre: è un cantiere che avanza, non una vetrina finita.'),
    dict(social=True, scene="loop", kicker="LA REGOLA 1",
         lead='Niente è finito.<br>Ogni cosa è<br>una <span class="cyan">versione</span>.',
         seal='"Una versione funzionante oggi vale più di una perfetta mai."'),
    dict(social=False, scene="patto", kicker="COSA NON È",
         lead='Niente corsi.<br>Niente <span class="accent">ricette</span> miracolose.',
         intro='Non vendo motivazione: racconto un metodo mentre lo uso — coi numeri, i tempi e gli errori veri.'),
    dict(social=True, scene="patto", kicker="IL PROSSIMO PASSO",
         lead='Ma come racconti tutto questo<br><span class="cyan">senza inventare</span>?',
         intro='C\'è un patto preciso — e un\'AI dichiarata che lo rispetta. Nel prossimo capitolo: come nascono queste storie.',
         cta='SEGUI IL SISTEMA · prossimo: PRE_SG_03 «Il patto del racconto» → salva il carosello'),
    dict(social=False, scene="porta_nina", kicker="LA MAPPA DEL PREAMBOLO",
         lead='Siete <span class="accent">qui</span>: 2 di 4.',
         intro='Chi parla → <span class="g">Cos\'è il Sistema</span> → Il patto del racconto → La mappa delle stagioni. L\'altra porta, quella <span class="pink">di Nina</span>, arriva alla fine.'),
]

if __name__ == "__main__":
    build(HERE, META, S)
