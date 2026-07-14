# _build_pre_sg_03.py | TITANIUM_OS / CAROSELLI / PRE_SG_03 | v1.0 | 2026-07-14
# PRE_SG_03 «Il patto del racconto» — come nascono queste storie: verità, fonti, AI dichiarata.
# Fonti: FORMATO_EPISODIO_DOPPIO + GUIDA_CAROSELLI (QC) + regola grounding/canone.

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "_TEMPLATE"))
from sg_builder import build  # noqa: E402

META = {
    "title": "Il Sistema · PRE_SG_03 — Il patto del racconto",
    "toplabel": "TITANIUM OS · IL SISTEMA — PREAMBOLO 3 DI 4",
    "serie": "PRE_SG_03",
}

S = [
    dict(social=True, scene="patto", kicker="PRE 03 · IL PATTO DEL RACCONTO",
         lead='Storie scritte<br>con un\'AI.<br>Vere fino al <span class="accent">bullone</span>.',
         intro='Come funziona il racconto di questo sistema — e perché potete fidarvi.'),
    dict(social=True, scene="mappa", kicker="IL PROBLEMA",
         lead='Online si <span class="cyan">gonfia</span>.<br>Lo sappiamo tutti.',
         intro='Numeri arrotondati, successi senza contesto, fallimenti spariti. <span class="soft">Qui si fa il contrario.</span>'),
    dict(social=True, scene="patto", kicker="LA LEGGE",
         lead='Senza <span class="accent">prova</span>,<br>non entra.',
         intro='Ogni fatto raccontato poggia su qualcosa di verificabile: una misura, una foto, un file, una riga di codice. <span class="soft">Se la prova è debole, si dice.</span>',
         seal='"Controlla i fatti, non le parole."'),
    dict(social=True, scene="mappa", kicker="DA DOVE VENGONO I FATTI",
         lead='Ogni giornata lascia<br>una <span class="cyan">traccia</span>.',
         intro='Le decisioni finiscono in una memoria indicizzata e interrogabile. Quando racconto, <span class="soft">il sistema mi passa i fatti</span> — non i ricordi.'),
    dict(social=False, scene="impalcatura", kicker="IL CANONE",
         lead='I numeri hanno<br><span class="accent">una</span> fonte sola.',
         intro='Massa, precisione, percentuali: vivono in un documento canonico verificato. Se un numero non è lì, <span class="soft">non lo leggerete qui</span>.'),
    dict(social=True, scene="loop", kicker="IL MOTORE",
         lead='Traguardo verificato<br>→ <span class="cyan">episodio</span>.',
         intro='Il sistema registra ogni milestone; ogni milestone diventa una storia. <span class="soft">Il lavoro si documenta da solo</span> — questo carosello ne è la prova.'),
    dict(social=False, scene="mappa", kicker="IL DOPPIO TAGLIO",
         lead='Qui il <span class="accent">gancio</span>.<br>Sul sito il percorso.',
         intro='Ogni storia nasce doppia: il taglio social (snello, per il feed) e il completo (lungo e ricco). Mai la versione lunga compressa a forza.'),
    dict(social=True, scene="socio", kicker="L'AI, DICHIARATA",
         lead='Claude <span class="cyan">produce</span>.<br>Il QC <span class="accent">controlla</span>.',
         intro='Testi, grafica e caroselli li genera il mio socio AI — dentro regole scritte: grounding obbligatorio, canone sui numeri, controlli automatici. <span class="soft">Niente viene inventato.</span>'),
    dict(social=False, scene="impalcatura", kicker="IL QC",
         lead='Le regole si verificano<br><span class="cyan">da sole</span>.',
         intro='Un controllo automatico passa ogni carosello: slide a norma, copertina leggibile, niente riempitivi. Se c\'è una falla, il pezzo non esce.'),
    dict(social=True, scene="notte", kicker="I GUASTI",
         lead='Anche i <span class="accent">disastri</span><br>sono storie.',
         intro='Dieci notti di log muto per un handle bloccato. Il giorno che la memoria si è mangiata 56 GB. <span class="soft">Li leggerete raccontati senza trucco</span> — con la diagnosi e la cura.'),
    dict(social=False, scene="loop", kicker="ADDITIVO",
         lead='Niente si <span class="cyan">cancella</span>.',
         intro='Tutto è versionato: ogni versione resta, ogni correzione è tracciata. Anche le storie sbagliate restano — segnate, non sparite.'),
    dict(social=False, scene="loop", kicker="COSA CI GUADAGNO",
         lead='Il racconto rende il sistema<br>più <span class="accent">bravo</span>.',
         intro='Ogni storia torna nella memoria del sistema: la conoscenza si accumula e la prossima storia nasce meglio. <span class="soft">Il loop è intenzionale.</span>'),
    dict(social=True, scene="impalcatura", kicker="COSA CI GUADAGNI TU",
         lead='Un <span class="cyan">metodo</span>,<br>non una promessa.',
         intro='Vedrete come si costruisce un sistema vero con budget veri: decisioni, numeri, errori. Da replicare, non da ammirare.'),
    dict(social=True, scene="scintilla", kicker="LA VOCE",
         lead='La voce è<br>la <span class="accent">mia</span>.',
         intro='Prima persona, quindici anni di officina. L\'AI è lo strumento — <span class="soft">potente, dichiarato</span> — ma chi parla sono io.',
         seal='"L\'attrezzo non firma il pezzo. Ma un buon attrezzo si vede."'),
    dict(social=True, scene="mappa", kicker="IL PROSSIMO PASSO",
         lead='Quante storie ci sono<br>qui dentro? <span class="cyan">Tante</span>.',
         intro='Sei stagioni pianificate, dal giorno 0 al capannone. Nel prossimo capitolo: la mappa completa.',
         cta='SEGUI IL SISTEMA · prossimo: PRE_SG_04 «La mappa delle stagioni» → salva il carosello'),
    dict(social=False, scene="porta_nina", kicker="LA MAPPA DEL PREAMBOLO",
         lead='Siete <span class="accent">qui</span>: 3 di 4.',
         intro='Chi parla → Cos\'è il Sistema → <span class="g">Il patto del racconto</span> → La mappa delle stagioni. E poi c\'è la porta <span class="pink">rosa</span>…'),
]

if __name__ == "__main__":
    build(HERE, META, S)
