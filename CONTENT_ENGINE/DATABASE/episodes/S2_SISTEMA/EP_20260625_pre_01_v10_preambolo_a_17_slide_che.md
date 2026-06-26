<!-- TOC -->

- [TITANIUM_OS  Episodio 49](#titaniumos-episodio-49)
  - [Il Mondo Spiegato in Diciassette Pagine](#il-mondo-spiegato-in-diciassette-pagine)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il problema che nessuno vede](#atto-i-il-problema-che-nessuno-vede)
  - [ATTO II  Dieci versioni per trovare una cosa](#atto-ii-dieci-versioni-per-trovare-una-cosa)
  - [ATTO III  Il problema collaterale: Adobe e gli orfani](#atto-iii-il-problema-collaterale-adobe-e-gli-orfani)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 49
## "Il Mondo Spiegato in Diciassette Pagine"

*Data di registrazione: 25 giugno 2026*

---

## COLD OPEN

Ore 23:47. Lo schermo mostra una griglia di rettangoli bianchi — diciassette, esatti. Non sono documenti. Non sono slide nel senso in cui li intende PowerPoint. Sono pagine. Come le pagine di un libro per bambini che qualcuno ha deciso di scrivere per adulti che non hanno tempo di essere bambini.

Matteo guarda il PNG numero uno: *Cover*. Poi il diciassettesimo: *Si parte.*

Dodici ore fa era la versione otto. Poi la nove. Poi la dieci.

Qualcuno in un'altra vita chiamerebbe questo *iterazione*. Lui lo chiama semplicemente: trovare le parole giuste.

---

## ATTO I — Il problema che nessuno vede

GENESIS ha settanta punti percentuale. V32 sessantacinque. Il capannone è al 2030.

Questi numeri non significano nulla a chi non sa cosa sia V32. O GENESIS. O perché un artigiano che salda titanio per la MotoGP stia costruendo un sistema cognitivo in una taverna di dodici metri quadri.

Il problema non è tecnico. Il problema è narrativo.

**Nina** è il progetto educativo che vive dentro GENESIS — il lato pubblico, la voce che spiega. Ma una voce senza preambolo è rumore. E il preambolo, fino a stamattina, non esisteva in forma che si potesse mostrare a qualcuno che non ha letto tutti gli altri novantacinque documenti nell'indice delle sessioni.

PRE_01 nasce da questa frattura: da un lato un sistema che funziona, dall'altro nessun modo semplice di dire *cosa è* a chi arriva da fuori.

Il carosello Instagram — 1080×1350 pixel per slide, formato verticale, pensato per scorrere con il pollice — è il ponte. Non il progetto. Il ponte verso il progetto.

---

## ATTO II — Dieci versioni per trovare una cosa

La sessione #49 inizia con la v1 già esistente: magra, essenziale, funzionante. Funzionante come funziona una bozza — tiene il posto, non occupa lo spazio.

Il percorso è documentato in `PRE_01/_VERSIONI/` con logica additiva: nulla viene cancellato, tutto viene stratificato. È la stessa filosofia del vault Obsidian — il sistema impara anche dagli scarti.

- **v1**: struttura base, 8 slide
- **v2**: stile *buonanotte* — il termine che Matteo usa per indicare un'estetica notturna, soffusa, che non stressa l'occhio — ancora senza il flusso visivo continuo
- **v3**: primo tentativo di flusso — un'onda d'oro, un solo filo che attraversa le slide
- **v4 / v5**: la direzione si definisce — alone soffuso, meno netto, propagazione parziale
- **v6**: propagazione completa del flusso su tutta la sequenza
- **v7**: testo arricchito sulle 8 slide originali — ogni punto illustrato più pieno, i sigilli più evocativi
- **v8**: tentativo con vignette, stile fumetto — scartata. Non per motivo estetico ma per motivo di coerenza: Nina non è un personaggio da fumetto, è un sistema che insegna. Il fumetto comunicava la persona sbagliata.
- **v9**: il preambolo si espande a **12 slide** e acquisisce struttura narrativa — *Cos'è / Perché / Come funziona*
- **v10**: 17 slide, versione corrente

La v10 ha un'architettura precisa. Non è una lista di feature. È una sequenza:

> Cover → Cos'è → Perché → Per chi è → Il Patto → Nina → Themis → Atomi↔Bit → I 4 simboli → La Giuntura → Le 8 Pietre → Cosa imparerai → Come funziona → Si ripassa → Da dove nasce → La promessa → Si parte

Ogni titolo è una promessa di lettura. *Il Patto* e *La promessa* non sono titoli da manuale tecnico — sono titoli da testo che sa di avere un lettore davanti.

Il flusso visivo — l'onda su X globale, lo sfumato continuo che attraversa le slide — non è decorazione. È la firma che dice: *queste diciassette pagine sono una cosa sola, non diciassette cose separate.*

---

## ATTO III — Il problema collaterale: Adobe e gli orfani

La sessione #49 non è solo PRE_01.

Parallelamente, Matteo testa l'integrazione con Adobe Express per l'export — `export_html_to_express`, autenticazione account — e si ferma. L'integrazione non è bloccante, ma il flusso non è abbastanza fluido da giustificare il tempo. Viene segnalata, documentata, accantonata. Non è un fallimento, è una priorità che si abbassa da sola.

Nell'altra metà della sessione — la #46 e #47 che si chiudono nelle stesse ore — RAG raggiunge la versione 4.2. Il grafo 3D del vault inizia a mostrare qualcosa che non ci si aspettava: **gli orfani di RETE**. Note MENTE senza legami, nodi isolati nel grafo Obsidian, visibili ora come punti colorati distinti nella visualizzazione WebGL.

Konik — il nome interno per questo sistema di diagnostica — trasforma il grafo da gingillo estetico a strumento clinico. Se una nota non ha legami, è visibile. Se è visibile, si può decidere cosa farne.

Hermes gestisce la memoria a due livelli: freschezza dei documenti + struttura hub. Ogni codifica visiva nel grafo corrisponde a una informazione utile, non a una scelta di stile.

Nel mezzo, un dettaglio che vale la pena registrare: un commento nel codice Nina diceva ancora la regola vecchia — `_PROPOSTI` / `proposto_da_validare`. La regola reale è AUTO-PROMOZIONE. Il commit `docs(nina): allinea l'header alla regola reale` dura forse trenta secondi. Ma allinea il codice alla realtà. Questo tipo di pulizia — piccolo, invisibile, necessario — è esattamente il lavoro che non appare nei portfolio.

---

## CHIUSURA

C'è un momento in ogni progetto in cui smetti di costruire *per te* e inizi a costruire *per chi non sa nulla*.

Non è un momento retorico. È un momento tecnico. Richiede di rimettere mano a cose che funzionano già, e rifarlo con occhi diversi — gli occhi di qualcuno che arriva da zero.

PRE_01 v10 non è la prima slide di un corso. È la risposta alla domanda che nessuno ha ancora fatto ad alta voce: *ma di cosa stai parlando, esattamente?*

Diciassette slide. Un flusso continuo. Un linguaggio semplice che non tradisce la complessità di quello che descrive.

Matteo chiude la sessione #49 con il `story_state.json` aggiornato e l'inventario notturno in esecuzione automatica. Domani il lavoro riprende dallo stesso punto. Il sistema sa dov'è.

---

## reel_hook

17 slide per spiegare un progetto che ha 95 note nel vault e 5 anni di orizzonte.

Non puoi mandare il vault a qualcuno che non sa cosa sia Obsidian.

Quindi costruisci un preambolo. Lo iteraggi 10 volte. Scarti il fumetto alla v8 perché comunica la persona sbagliata.

E alla v10 hai qualcosa che un estraneo può leggere sul telefono e capire.

---

## FATTI (per il RAG)

- **DECISIONE**: PRE_01 v10 — preambolo Nina fissato a 17 slide con sequenza narrativa Cover→Si parte; versioni archiviate additivamente in `PRE_01/_VERSIONI/`
- **LOGICA**: le versioni precedenti (v1-v9) non avevano struttura narrativa completa né flusso visivo continuo; la v8 stile fumetto scartata perché incoerente con il carattere del sistema Nina
- **DECISIONE**: flusso visivo = onda sfumata su X globale (alone soffuso, propagazione completa) — scelta confermata da Matteo alla v5 come direzione definitiva
- **LOGICA**: il flusso continuo tra slide segnala che le 17 pagine sono una sequenza unica, non 17 contenuti separati; funzionale alla lettura su mobile (formato 1080×1350)
- **DECISIONE**: integrazione Adobe Express (`export_html_to_express`) accantonata — flusso non abbastanza fluido da giustificare il tempo nella sessione corrente
- **OBIETTIVO**: PRE_01 v10 sblocca la pubblicabilità del progetto Nina su canali social; prossimo passo = validazione del carosello su pubblico reale e allineamento con NINA_STILE_E_PIANO

---

| Campo | Valore |
|---|---|
| **Episodio** | #49 |
| **Data** | 2026-06-25 |
| **Progetto principale** | GENESIS / Nina |
| **Componenti citati** | PRE_01 v10, RAG v4.2, Konik, Hermes, Adobe Express |
| **Versioni iterate** | v1 → v10 (10 iterazioni, 1 scartata: v8) |
| **Formato output** | 17 PNG 1080×1350 px |
| **Sessioni chiuse** | #46, #47, #49 |
| **Tag** | nina, caroselli, social, instagram, preambolo, RAG, grafo, orfani |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |