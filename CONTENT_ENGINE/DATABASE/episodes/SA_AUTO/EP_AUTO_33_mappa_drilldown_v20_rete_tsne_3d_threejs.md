<!-- TOC -->

- [EP_AUTO_33  Milestone](#epauto33-milestone)
    - [MAPPA drill-down v2.0  RETE t-SNE 3D (Three.js raw)  watch](#mappa-drill-down-v20-rete-t-sne-3d-threejs-raw-watch)
- [Il Sistema  Episodio 23](#il-sistema-episodio-23)
  - [La Mappa che Respira](#la-mappa-che-respira)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima del 30 maggio esisteva solo il rumore](#atto-i-prima-del-30-maggio-esisteva-solo-il-rumore)
  - [ATTO II  Il 30 maggio: quando i dati iniziano a parlare in 3D](#atto-ii-il-30-maggio-quando-i-dati-iniziano-a-parlare-in-3d)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_33 — Milestone
### "MAPPA drill-down v2.0 + RETE t-SNE 3D (Three.js raw) + watch"

---
id: EP_AUTO_33
title: "MAPPA drill-down v2.0 + RETE t-SNE 3D (Three.js ra"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-30
data_generato: 2026-05-30
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "MAPPA drill-down v2.0 + RETE t-SNE 3D (Three.js raw) + watchdog psutil + lazy loading (30 Mag 2026)"
---

# Il Sistema — Episodio 23
## "La Mappa che Respira"

---

## COLD OPEN

Trentuno nodi. Tre dimensioni. Un sistema che finalmente si vede dall'alto.
Stamattina ho aperto il browser, ho guardato la rete ruotare su se stessa nel canvas Three.js, e per la prima volta ho pensato: *sì, questa roba esiste davvero.*

---

## ATTO I — Prima del 30 maggio esisteva solo il rumore

Devo spiegarti una cosa che non si capisce dall'esterno. Quando costruisci un sistema grande — intendo grande nel senso di tanti layer, tanti componenti che si parlano, tante dipendenze incrociate — arriva un momento in cui perdi il filo. Non perdi la direzione. Perdi la *mappa*. E senza mappa, ogni decisione costa il doppio perché prima devi ricostruire mentalmente dove sei.

Io avevo GENESIS che girava all'83%, con il suo swarm NEXUS, il RAG graph-aware alla versione 5, il protocollo MCP 1.3, e il watchdog swarm parallelo che monitora tutto. Avevo V32 in costruzione fisica — la Config G dei rinforzi, 65% completata, bulloni veri, alluminio vero, assi da allineare. Avevo MIMS che aspetta pazientemente che la catena V32-VULCAN si consolidi prima di esplodere. Avevo Vita Natura con EVA in fase pilota, il sito, le prenotazioni, una logica AI che deve girare in un contesto completamente diverso dall'officina. E avevo IDENTITY — il CV, la dashboard, la documentazione delle capabilities — che è forse il componente più sottovalutato di tutti, perché senza identità chiara non vendi niente a nessuno.

Cinque sistemi. Percentuali diverse. Dipendenze non ovvie. E io che tenevo tutto in testa come uno stivale pieno d'acqua.

La versione 1 della mappa era statica. Un documento, una tabella, qualcosa che guardavi e ti dava l'istantanea del momento. Utile, ma morta. Non ti diceva *perché* un componente era bloccato, non ti mostrava la tensione tra un sistema e l'altro, non ti faceva sentire il peso reale di quello che mancava.

---

## ATTO II — Il 30 maggio: quando i dati iniziano a parlare in 3D

L'idea era semplice in teoria e bastarda in pratica. Prendere tutti i nodi del sistema — ogni componente, ogni dipendenza, ogni stato — e proiettarli in uno spazio tridimensionale usando t-SNE. Non per fare la cosa bella. Per fare la cosa *vera*: il t-SNE collassa le distanze ad alta dimensionalità in qualcosa che occhi umani possono leggere. Se due nodi sono vicini nello spazio 3D, significa che hanno qualcosa in comune — dipendenze condivise, stati simili, pressione analoga nel sistema.

Ho implementato tutto in Three.js raw, senza framework sopra, perché volevo controllo totale sul rendering. Ogni nodo è una sfera. Il colore dice lo stato. La posizione dice la relazione. Puoi ruotare, zoomare, cliccare su un nodo e fare drill-down: vedi il dettaglio del componente, i blocchi attivi, le dipendenze upstream e downstream. La MAPPA v2.0 non è più statica. È una rete che respira.

Poi c'è il watchdog psutil. Questo è il pezzo che sembra banale e invece è fondamentale. psutil gira in background e monitora le risorse reali — CPU, memoria, processi — mentre il sistema lavora. Se qualcosa si inceppa, il watchdog lo vede prima che tu te ne accorga. L'ho integrato nel layer di monitoraggio di GENESIS, così lo swarm ha visibilità non solo sullo stato logico dei task, ma anche sullo stato fisico della macchina che li esegue.

Il lazy loading chiude il cerchio. Con trentuno nodi attivi e una rete 3D che gira nel browser, non puoi caricare tutto subito. Il lazy loading carica i dettagli solo quando li chiedi — click su un nodo, i dati arrivano. Tutto il resto rimane leggero. È la differenza tra uno strumento che usi e uno strumento che ti usa.

---

## ATTO III — Cosa si sblocca adesso

La mappa v2.0 non è un upgrade estetico. È un cambio di paradigma operativo.

GENESIS ora ha un pannello di controllo visivo che non esisteva prima. Posso vedere dove lo swarm sta lavorando, dove sta aspettando, dove c'è attrito. Posso prendere decisioni in secondi invece che in minuti. E con il watchdog psutil integrato, le decisioni sono informate anche dal piano fisico, non solo logico.

Per V32, che è ancora al 65% con i rinforzi Config G, la mappa mi dice esattamente perché MIMS è bloccato: finché la catena V32-VULCAN non è chiusa, certi connettori modulari non hanno un contesto fisico su cui appoggiarsi. Non è un problema di design — MIMS ha il design completo. È un problema di sequenza. Adesso lo vedo nel grafo, visivamente, senza doverlo ricostruire ogni volta.

Per Vita Natura e EVA, il drill-down mi mostra che il 40% di completamento nasconde una distribuzione asimmetrica: il sito e le prenotazioni sono più avanti, il pilota AI ha ancora punti ciechi. Con la mappa posso allocare il prossimo sprint in modo chirurgico.

IDENTITY al 45% sembrava un numero vago. Adesso è un nodo nel grafo con dipend

## FATTI (per il RAG)

- **FATTO:** GENESIS è al 83% di completamento, con swarm NEXUS, RAG graph-aware v5, protocollo MCP 1.3 e watchdog swarm parallelo integrati.

- **FATTO:** V32 (CNC epoxy-granite) è al 65% di completamento, fase Config G dei rinforzi; MIMS è bloccato in attesa che la catena V32-VULCAN si consolidi prima di procedere.

- **FATTO:** EVA (automazione centro estetico Vita Natura) è al 40% di completamento, con distribuzione asimmetrica: sito e prenotazioni più avanzati, pilota AI con punti ciechi ancora aperti.

- **FATTO:** IDENTITY (CV, dashboard, documentazione capabilities) è al 45% di completamento alla data dell'episodio (30 maggio 2026).

- **DECISIONE:** La MAPPA v2.0 è implementata in Three.js raw (senza framework) con proiezione t-SNE 3D, 31 nodi attivi, lazy loading on-click e watchdog psutil integrato nel layer di monitoraggio GENESIS. **LOGICA:** Three.js raw scelto per controllo totale sul rendering; lazy loading per mantenere il browser leggero con 31 nodi; psutil aggiunge visibilità sullo stato fisico della macchina (CPU, memoria, processi) oltre allo stato logico dei task.

- **FATTO:** Il blocco di MIMS è identificato come problema di sequenza, non di design: i connettori modulari richiedono un contesto fisico fornito dalla chiusura della catena V32-VULCAN per poter essere implementati.
