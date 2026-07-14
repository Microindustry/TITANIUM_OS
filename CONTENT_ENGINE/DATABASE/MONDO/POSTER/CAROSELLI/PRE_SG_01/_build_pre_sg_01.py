# _build_pre_sg_01.py | TITANIUM_OS / CAROSELLI / PRE_SG_01 | v1.0 | 2026-07-14
# PRE_SG_01 «Chi parla» — preambolo del binario sistema (voce Matteo, gestione Claude 100%).
# Fonti: canone CLAUDE.md (CHI È MATTEO, DATI MASTER) + EP_PILOTA_00 (grezzo, si riscrive).
# Genera ENTRAMBI i tagli via _TEMPLATE/sg_builder.py (CSS unico, anti-drift).

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "_TEMPLATE"))
from sg_builder import build  # noqa: E402

META = {
    "title": "Il Sistema · PRE_SG_01 — Chi parla",
    "toplabel": "TITANIUM OS · IL SISTEMA — PREAMBOLO 1 DI 4",
    "serie": "PRE_SG_01",
}

S = [
    # 1 · COVER (poster: gancio, un punto focale, safe-zone)
    dict(social=True, scene="scintilla", kicker="PRE 01 · CHI PARLA",
         lead='Quindici anni in fabbrica.<br>Poi ho costruito<br>il mio <span class="accent">socio</span>.',
         intro='Questa è la storia vera di un sistema che esiste — raccontata da chi lo sta costruendo.'),
    # 2 · il titanio
    dict(social=True, scene="scintilla", kicker="IL MESTIERE",
         lead='Il titanio<br>non perdona <span class="cyan">niente</span>.',
         intro='Saldatura TIG su componenti MotoGP: se tremi, se sei distratto, <span class="soft">il cordone te lo dice in faccia</span>. Lì ho imparato cos\'è la precisione.',
         seal='"La precisione non è una qualità: è una relazione."'),
    # 3 · il percorso
    dict(social=True, scene="percorso", kicker="QUINDICI ANNI",
         lead='Robot. Presse.<br>Controllo qualità.<br><span class="accent">Titanio</span>.',
         intro='Ogni posto mi ha dato un pezzo di vocabolario: <span class="g">automazione</span>, <span class="g">forza</span>, <span class="g">misura</span>, <span class="g">materia</span>. Sembravano lavori diversi.'),
    # 4 · il CV che nessuno capisce (solo completo)
    dict(social=False, scene="mappa", kicker="IL CV CHE NESSUNO CAPISCE",
         lead='Sulla carta sembrano<br><span class="cyan">salti</span>. Era una mappa.',
         intro='Un HR ci legge frammentazione. Ma robot, presse, qualità e saldatura sono <span class="soft">lo stesso problema</span>: trasformare materia grezza in qualcosa che funziona, con tolleranze strette, in modo ripetibile.'),
    # 5 · l'ADHD, onesto
    dict(social=True, scene="impalcatura", kicker="DETTO ONESTO",
         lead='Ho l\'ADHD.<br>La mia struttura interna<br>non è <span class="accent">affidabile</span>.',
         intro='Non lo dico per riempire spazio: è il punto di partenza di tutto. Il mio cervello non gestisce la dispersione <span class="soft">per default</span>.'),
    # 6 · la risposta
    dict(social=True, scene="impalcatura", kicker="LA RISPOSTA",
         lead='Così la struttura<br>l\'ho costruita <span class="cyan">fuori</span>.',
         intro='In software. Automazioni, memoria, controlli che non dipendono dalla mia volontà. <span class="soft">Un\'impalcatura cognitiva</span> che regge anche quando io non reggo.',
         seal='"Un sistema che gira da solo vale più di dieci abitudini."'),
    # 7 · la taverna
    dict(social=True, scene="taverna", kicker="DOVE",
         lead='Dodici metri quadri<br>di <span class="accent">taverna</span>.',
         intro='Il laboratorio peggiore del mondo — e la scelta migliore della mia vita. Da qui parte tutto quello che leggerete.'),
    # 8 · il socio
    dict(social=True, scene="socio", kicker="IL SOCIO",
         lead='Un\'AI che lavora<br>con me. <span class="cyan">Ogni giorno</span>.',
         intro='Non un chatbot a cui chiedo cose: <span class="soft">un socio operativo</span>. Legge, scrive, controlla, ricorda — dentro un sistema costruito su misura.'),
    # 9 · chi fa cosa (solo completo)
    dict(social=False, scene="socio", kicker="CHI FA COSA",
         lead='Io le <span class="accent">mani</span><br>e le decisioni.<br>Lui la <span class="cyan">memoria</span> e la notte.',
         intro='Io saldo, fresò, decido. Il sistema documenta, indicizza, sorveglia, genera — <span class="soft">anche mentre dormo</span>.'),
    # 10 · TITANIUM_OS (solo completo)
    dict(social=False, scene="pilastri", kicker="IL NOME",
         lead='Si chiama<br><span class="accent">TITANIUM_OS</span>.',
         intro='Il sistema operativo della mia testa: cinque pilastri — una fresatrice costruita da zero, connettori modulari, una pressa, il cervello software, un\'attività reale che lo usa ogni giorno.'),
    # 11 · perché racconto
    dict(social=True, scene="loop", kicker="PERCHÉ RACCONTO",
         lead='Il lavoro<br>si <span class="cyan">documenta</span> da solo.',
         intro='Ogni traguardo verificato diventa una storia: <span class="soft">non ricordare, documenta</span>. E la storia torna nel sistema, che diventa più bravo a raccontare la prossima.'),
    # 12 · il patto
    dict(social=True, scene="patto", kicker="IL PATTO",
         lead='Tutto quello che leggerete<br>è successo <span class="accent">davvero</span>.',
         intro='Niente inventato, niente gonfiato: ogni numero ha una fonte, ogni storia una prova. <span class="soft">Anche i guasti</span> — soprattutto i guasti.',
         seal='"Controlla i fatti, non le parole."'),
    # 13 · cosa troverete (solo completo)
    dict(social=False, scene="mappa", kicker="COSA TROVERETE",
         lead='La macchina. La mente.<br>La notte. <span class="cyan">I guasti veri</span>.',
         intro='La fresatrice costruita pezzo per pezzo · la memoria che non dimentica · gli agenti che lavorano al buio · e le volte che si è rotto tutto — raccontate senza trucco.'),
    # 14 · dove va (solo completo)
    dict(social=False, scene="stella", kicker="LA STELLA POLARE",
         lead='15 luglio 2030:<br>capannone <span class="accent">proprio</span>.',
         intro='Non è un obiettivo di carriera. È <span class="soft">sovranità</span>: controllo sui mezzi, sul software, sulla conoscenza, sul tempo.'),
    # 15 · open loop → PRE_SG_02
    dict(social=True, scene="pilastri", kicker="IL PROSSIMO PASSO",
         lead='Ma <span class="cyan">cos\'è</span>, esattamente,<br>questo Sistema?',
         intro='Cinque pilastri che si tengono in piedi a vicenda. Nel prossimo capitolo ve li faccio vedere uno per uno.',
         cta='SEGUI IL SISTEMA · prossimo: PRE_SG_02 «Cos\'è il Sistema» → salva il carosello'),
    # 16 · colophon serie (solo completo)
    dict(social=False, scene="porta_nina", kicker="LA MAPPA DEL PREAMBOLO",
         lead='Siete <span class="accent">qui</span>: 1 di 4.',
         intro='Chi parla → <span class="g">Cos\'è il Sistema</span> → Il patto del racconto → La mappa delle stagioni. E per chi vuole capirlo <span class="pink">giocando</span>, c\'è un\'altra porta: si chiama Nina.'),
]

if __name__ == "__main__":
    build(HERE, META, S)
