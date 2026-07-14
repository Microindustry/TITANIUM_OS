# _build_pre_sg_04.py | TITANIUM_OS / CAROSELLI / PRE_SG_04 | v1.0 | 2026-07-14
# PRE_SG_04 «La mappa delle stagioni» — cosa troverete (S1→S6) + la porta di Nina (ponte).
# Fonti: _PIANO_PRODUZIONE (stagioni S1-S6) + PONTE_SG_NINA (i preamboli si presentano a vicenda).

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "_TEMPLATE"))
from sg_builder import build  # noqa: E402

META = {
    "title": "Il Sistema · PRE_SG_04 — La mappa delle stagioni",
    "toplabel": "TITANIUM OS · IL SISTEMA — PREAMBOLO 4 DI 4",
    "serie": "PRE_SG_04",
}

S = [
    dict(social=True, scene="mappa", kicker="PRE 04 · LA MAPPA DELLE STAGIONI",
         lead='Sei stagioni.<br>Una storia <span class="accent">sola</span>.',
         intro='Dal primo prompt in taverna al capannone: ecco la mappa di quello che leggerete.'),
    dict(social=True, scene="scintilla", kicker="STAGIONE 1 · DAL GIORNO 0",
         lead='Come <span class="accent">nasce</span><br>un sistema.',
         intro='Nove capitoli: dal giorno in cui un\'AI è entrata in taverna come attrezzo — <span class="soft">ed è diventata un socio</span> — fino alla stella polare del 2030.'),
    dict(social=True, scene="mappa", kicker="DENTRO LA S1 · LA MACCHINA",
         lead='Sette configurazioni<br>per imparare a <span class="cyan">sbagliare</span> meglio.',
         intro='La fresatrice da zero: la caccia ai componenti giusti, la saga delle Config, la colata, il corpo unico da 178 kg. <span class="soft">Ogni decisione, raccontata.</span>'),
    dict(social=True, scene="notte", kicker="DENTRO LA S1 · LA MENTE E LA NOTTE",
         lead='La memoria che non dimentica.<br>Gli agenti che <span class="cyan">non dormono</span>.',
         intro='E i guasti veri: il giorno dei 56 GB, le dieci notti di silenzio, il sistema che impara a ricucirsi da solo.'),
    dict(social=False, scene="impalcatura", kicker="STAGIONE 2 · LA SALA MACCHINE",
         lead='Il dietro le quinte,<br>per chi vuole <span class="accent">scendere</span>.',
         intro='Le sessioni di lavoro una per una, le decisioni architetturali, la quota più tecnica. Stessa storia, un livello sotto.'),
    dict(social=True, scene="scintilla", kicker="STAGIONE 3 · LA MACCHINA LAVORA",
         lead='Dal primo <span class="cyan">truciolo</span><br>alle prime 61 ore.',
         intro='Quando arriva il mandrino: la macchina che finalmente taglia, il primo pezzo di precisione, il punto di pareggio <span class="soft">vissuto, non calcolato</span>.'),
    dict(social=False, scene="pilastri", kicker="STAGIONE 4 · LA FABBRICA",
         lead='La pressa, gli stampi,<br>i primi <span class="accent">connettori</span>.',
         intro='MIMS entra in produzione e va verso il mercato — dal basso, un pezzo alla volta.'),
    dict(social=False, scene="patto", kicker="STAGIONE 5 · IL MONDO REALE",
         lead='Clienti veri.<br>Numeri <span class="cyan">veri</span>.',
         intro='Le automazioni al servizio di un\'attività vera: il sistema che serve persone che non sanno — e non devono sapere — cosa c\'è sotto.'),
    dict(social=False, scene="mappa", kicker="STAGIONE 6 · IL MOTORE",
         lead='Il CV che si costruisce<br><span class="accent">da solo</span>.',
         intro='Ogni storia sblocca una competenza provata: alla fine il sistema è anche la mappa di cosa so fare — con le prove attaccate.'),
    dict(social=True, scene="loop", kicker="IL RITMO",
         lead='Le storie escono quando<br>il lavoro le <span class="cyan">produce</span>.',
         intro='Nessun calendario finto: la regola è <span class="soft">senza prova non entra</span>. Il cantiere detta il ritmo del racconto.',
         seal='"Prima il pezzo. Poi la storia del pezzo."'),
    dict(social=True, scene="mappa", kicker="DOVE SEGUIRE",
         lead='Qui il <span class="accent">gancio</span>.<br>Sul sito il viaggio.',
         intro='Su Instagram il taglio social di ogni storia; il percorso completo — piu profondo, con tutti i capitoli — vive sul sito.'),
    dict(social=True, scene="porta_nina", kicker="L'ALTRA PORTA",
         lead='C\'è anche una porta<br><span class="pink">rosa</span>.',
         intro='Si chiama <span class="pink">Nina</span>: lo stesso sistema, spiegato giocando — una bambina che chiede «perché?» a ogni cosa. Per i piccoli. <span class="soft">E per i grandi che vogliono capire davvero.</span>'),
    dict(social=False, scene="patto", kicker="IL PATTO, IN UNA RIGA",
         lead='Tutto <span class="accent">vero</span>.<br>Fonti, numeri, guasti.',
         intro='L\'AI che produce è dichiarata, il controllo è automatico, la voce è la mia.'),
    dict(social=True, scene="taverna", kicker="DA DOVE COMINCIARE",
         lead='Dal <span class="cyan">giorno 0</span>.',
         intro='Il primo episodio della stagione 1 è la sera in cui tutto è cominciato: un prompt, una taverna, un attrezzo che diventa socio.'),
    dict(social=True, scene="scintilla", kicker="IL PRIMO EPISODIO",
         lead='«<span class="accent">Il Socio</span>»<br>sta arrivando.',
         intro='La storia del giorno 0 — con una piccola ospite che apre l\'episodio con la domanda giusta.',
         cta='SEGUI IL SISTEMA · prossimo: EP_SG_01 «Il Socio» → attiva le notifiche'),
    dict(social=False, scene="mappa", kicker="LA MAPPA DEL PREAMBOLO",
         lead='Fine del preambolo:<br><span class="accent">4 di 4</span>.',
         intro='Chi parla → Cos\'è il Sistema → Il patto del racconto → <span class="g">La mappa delle stagioni</span>. Ora si comincia davvero.'),
]

if __name__ == "__main__":
    build(HERE, META, S)
