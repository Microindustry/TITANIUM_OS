<!-- TOC -->

- [EP_AUTO_32  Milestone](#epauto32-milestone)
    - [Logging centralizzato - CORE/log.py  34 file aggiornati, Ro](#logging-centralizzato---corelogpy-34-file-aggiornati-ro)
- [Il Sistema  Episodio 23](#il-sistema-episodio-23)
  - [342 Voci nel Buio](#342-voci-nel-buio)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Rumore di Fondo](#atto-i-il-rumore-di-fondo)
  - [ATTO II  CORE/log.py](#atto-ii-corelogpy)
  - [ATTO III  Cosa Si Sblocca](#atto-iii-cosa-si-sblocca)

<!-- /TOC -->

# EP_AUTO_32 — Milestone
### "Logging centralizzato - CORE/log.py + 34 file aggiornati, Ro"

---
id: EP_AUTO_32
title: "Logging centralizzato - CORE/log.py + 34 file aggi"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-29
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Logging centralizzato - CORE/log.py + 34 file aggiornati, RotatingFileHandler DATA/logs/, print ridotti da 342 a 131 (29 Mag 2026)"
---

# Il Sistema — Episodio 23
## "342 Voci nel Buio"

---

## COLD OPEN

Trecentoquarantadue print sparsi in trentaquattro file. Trecentoquarantadue righe che urlavano in console senza che nessuno stesse ad ascoltare. Il 29 maggio 2026 ho smesso di urlare nel vuoto e ho cominciato a scrivere su carta.

---

## ATTO I — Il Rumore di Fondo

Quando costruisci qualcosa di grande, c'è una fase che nessuno ti racconta. È la fase in cui il progetto cammina, ma non sai esattamente dove mette i piedi. TITANIUM_OS a quel punto aveva già una forma riconoscibile: V32 era in costruzione con i rinforzi di Config G al sessantacinque percento, GENESIS girava con la Dashboard v7.0, gli agenti lavoravano, il RAG era alla quarta versione. EVA gestiva il pilota di Vita Natura. C'era roba dappertutto, e tutta quella roba produceva messaggi.

Il problema non era che i messaggi non esistessero. Il problema era dove finivano. Finivano in console. Finivano a schermo in quella sessione di terminale aperta in quel momento, su quel computer, da quella persona. E poi sparivano. Chiudevi la finestra, perdevi tutto. Riavviavi il processo, perdevi tutto. Andavi a dormire, perdevi tutto.

In officina la chiamo la sindrome del truciolo: se non raccogli mentre lavori, alla fine cammini sul problema senza vederlo. Con il software è uguale. I print erano i miei trucioli. Trecento e rotti messaggi che mi dicevano cose importanti — errori silenziosi, stati di sistema, conferme di processo — e che io lasciavo cadere per terra ogni giorno.

Quando GENESIS ha cominciato a coordinarsi con più agenti in parallelo, quando V32 ha iniziato a produrre dati di lavorazione, quando le prenotazioni di Vita Natura hanno cominciato a passare per EVA, ho capito che non potevo più permettermi quel lusso. Non era una questione di ordine. Era una questione di controllo. Un sistema industriale senza log strutturati non è un sistema: è una scatola nera con una speranza attaccata sopra.

---

## ATTO II — CORE/log.py

La soluzione era concettualmente semplice. L'esecuzione ha richiesto una giornata intera e la stessa attenzione che darei a una passata di finitura su V32.

Ho scritto CORE/log.py. Un modulo centrale, un punto unico da cui ogni componente del sistema chiede un logger. Dentro: RotatingFileHandler. Significa che i log scrivono su file in DATA/logs/, ruotano automaticamente quando raggiungono una certa dimensione, conservano la storia senza occupare disco all'infinito. Ogni modulo ha il suo canale nominato. GENESIS scrive su genesis.log. EVA scrive su eva.log. V32 scriverà su v32.log quando sarà operativa. Tutto leggibile, tutto separato, tutto conservato.

Poi è venuta la parte meccanica: trentaquattro file aperti uno per uno. In ognuno ho cercato ogni print, ho valutato cosa stava comunicando, ho deciso il livello giusto — debug, info, warning, error, critical — e ho sostituito. Non è stato un trova-e-sostituisci cieco. Ogni riga aveva un contesto. Un print che diceva "connessione stabilita" diventava un info. Un print che diceva "valore fuori range" diventava un warning. Un print che compariva solo quando qualcosa si rompeva diventava un error.

Alla fine dei trentaquattro file, i print erano passati da trecentoquarantadue a centotrentuno. Non li ho eliminati tutti. Alcuni print sono giusti che rimangano — output che deve andare a schermo per l'operatore, conferme immediate, interfaccia utente. Ma quelli diagnostici, quelli di sistema, quelli che parlano allo sviluppatore e non all'utente: quelli adesso scrivono su file, con timestamp, con nome del modulo, con livello di severità.

Centododici messaggi che prima sparivano adesso rimangono. Per sempre. Consultabili. Filtrabili. Ricercabili.

---

## ATTO III — Cosa Si Sblocca

Il logging centralizzato non è una funzionalità. È un'infrastruttura. È la differenza tra costruire su sabbia e costruire su cemento.

Adesso quando GENESIS ha un comportamento anomalo, apro genesis.log e leggo la storia minuto per minuto. Quando EVA fa una prenotazione, c'è traccia. Quando V32 sarà operativa e farà la prima passata su un pezzo reale, quel momento sarà scritto da qualche parte con il suo timestamp esatto. MIMS, quando entrerà nella catena produttiva V32-VULCAN, si collegherà a un sistema che già sa come parlare. VULCAN, la pressa polimeri, troverà il canale pronto.

Questo è il tipo di lavoro che non vedi finché non ti manca. È il lavoro che fa sì che tra sei mesi, quando qualcosa va storto alle tre di notte, io non debba ricostruire il passato a memoria. Ce l'ho scritto.

C'è anche un'altra cosa. Il logging mi ha costretto a rileggere trentaquattro file e capire esattamente cosa comunicava ogni parte del sistema. È stato un audit involontario. Ho trovato due logiche ridondanti in GENESIS. Ho trovato un percorso di errore in EVA che non gestiva un caso limite. Li ho corretti mentre ero lì. Non 