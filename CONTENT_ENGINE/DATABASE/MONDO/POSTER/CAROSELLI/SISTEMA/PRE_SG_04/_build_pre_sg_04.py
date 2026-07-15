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
    dict(social=True, scene="scintilla", kicker="PRIMA STAGIONE · COME NASCE",
         lead='Come <span class="accent">nasce</span><br>un sistema.',
         intro='Si parte dall\'inizio vero: la sera in cui un\'AI è entrata in taverna come attrezzo — <span class="soft">ed è diventata un socio</span>.'),
    dict(social=True, scene="scintilla", kicker="POI · LA MACCHINA",
         lead='Una macchina costruita<br>in <span class="cyan">casa</span>. Da zero.',
         intro='La caccia ai pezzi giusti, i tentativi sbagliati prima di quello buono, e un corpo d\'acciaio da 178 kg che non trema. <span class="soft">Ogni decisione, raccontata.</span>'),
    dict(social=True, scene="notte", kicker="POI · LA MENTE E LA NOTTE",
         lead='La memoria che non dimentica.<br>Gli aiutanti che <span class="cyan">non dormono</span>.',
         intro='Un cervello di software che archivia ogni decisione, e una squadra di programmi che lavora <span class="soft">mentre io dormo</span>.'),
    dict(social=False, scene="impalcatura", kicker="STAGIONE 2 · LA SALA MACCHINE",
         lead='Il dietro le quinte,<br>per chi vuole <span class="accent">scendere</span>.',
         intro='Le sessioni di lavoro una per una, le decisioni architetturali, la quota più tecnica. Stessa storia, un livello sotto.'),
    dict(social=True, scene="scintilla", kicker="PIÙ AVANTI · LA MACCHINA LAVORA",
         lead='Il giorno del primo<br><span class="cyan">truciolo</span>.',
         intro='La macchina che finalmente taglia, il primo pezzo di precisione, il giorno in cui inizia a <span class="soft">ripagarsi da sola</span>.'),
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
         lead='Quando <span class="cyan">escono</span>?<br>Quando succedono.',
         intro='Nessun calendario finto — vale la regola del capitolo scorso. <span class="soft">Il cantiere detta il ritmo del racconto.</span>',
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
         lead='Dal <span class="cyan">giorno zero</span>.',
         intro='La sera in cui tutto è cominciato: una taverna, uno schermo acceso, una domanda scritta a un\'intelligenza artificiale.'),
    dict(social=True, scene="scintilla", kicker="IL PRIMO EPISODIO",
         lead='«<span class="accent">Il Socio</span>»<br>sta arrivando.',
         intro='La storia di quella sera — con una piccola ospite che apre l\'episodio con la domanda giusta.',
         cta='SEGUI IL SISTEMA · primo episodio: «Il Socio» → attiva le notifiche'),
    dict(social=False, scene="mappa", kicker="LA MAPPA DEL PREAMBOLO",
         lead='Fine del preambolo:<br><span class="accent">4 di 4</span>.',
         intro='Chi parla → Cos\'è il Sistema → Il patto del racconto → <span class="g">La mappa delle stagioni</span>. Ora si comincia davvero.'),
]

if __name__ == "__main__":
    build(HERE, META, S)
