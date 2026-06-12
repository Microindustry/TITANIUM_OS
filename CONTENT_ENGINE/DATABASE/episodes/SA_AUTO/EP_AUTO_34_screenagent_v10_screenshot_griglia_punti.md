<!-- TOC -->

- [EP_AUTO_34  Milestone](#epauto34-milestone)
    - [ScreenAgent v1.0 - screenshot  griglia puntini rossi 20x15](#screenagent-v10---screenshot-griglia-puntini-rossi-20x15)
- [Il Sistema  Episodio 23](#il-sistema-episodio-23)
  - [ScreenAgent v1.0: Quando la macchina ha imparato a guardare](#screenagent-v10-quando-la-macchina-ha-imparato-a-guardare)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima cera solo testo](#atto-i-prima-cera-solo-testo)
  - [ATTO II  Trenta maggio 2026](#atto-ii-trenta-maggio-2026)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_34 — Milestone
### "ScreenAgent v1.0 - screenshot + griglia puntini rossi 20x15 "

---
id: EP_AUTO_34
title: "ScreenAgent v1.0 - screenshot + griglia puntini ro"
sottotitolo: "La memoria esternalizzata"
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
milestone_originale: "ScreenAgent v1.0 - screenshot + griglia puntini rossi 20x15 + Claude vision + click simulato + copy/drag/hotkey (30 Mag 2026)"
---

# Il Sistema — Episodio 23
## "ScreenAgent v1.0: Quando la macchina ha imparato a guardare"

---

## COLD OPEN

Tieni d'occhio lo schermo. Adesso ti mando uno screenshot. Aspetta che analizzi. Clicca lì. Copia. Sposta.

Questo è quello che fa una persona davanti a un computer. Da oggi, lo fa anche il sistema.

---

## ATTO I — Prima c'era solo testo

Devo spiegarti da dove vengo, altrimenti questo milestone non ti dice nulla.

GENESIS è il cervello di tutto. Swarm di agenti, RAG graph-aware alla versione cinque, orchestrazione MCP v1.3, watchdog parallelo che sorveglia gli altri agenti mentre lavorano. Siamo all'ottantatré percento. Non è poco. Ma c'era un problema strutturale che stava diventando sempre più evidente mentre costruivo: il sistema sapeva *leggere*, sapeva *ragionare*, sapeva *rispondere*. Non sapeva *guardare*.

Intendo guardare nel senso fisico del termine. Uno schermo. Un'interfaccia. Un'applicazione che non ha API, che non ha terminale, che non ti dà nessun output strutturato. Un software anni Novanta che gira su un PC industriale e che comunica solo attraverso finestre, pulsanti, menu a tendina. Roba che in officina conosci bene — i software dei controlli CNC, i gestionali vecchi, le interfacce proprietarie che il fornitore non aggiorna da dieci anni e che non aggiornerà mai.

Come ci parla un agente AI? Non ci parla. Punto. O almeno, non ci parlava.

Questa era la lacuna. Un sistema intelligente che si ferma davanti a qualsiasi cosa non abbia un'interfaccia pulita. Un meccanico bravissimo che non riesce ad aprire il cofano perché manca la chiave giusta.

---

## ATTO II — Trenta maggio 2026

ScreenAgent v1.0 nasce da una domanda semplice: cosa vede un essere umano davanti a uno schermo e cosa fa con quello che vede?

Vede un'immagine. La interpreta. Decide dove cliccare. Esegue.

Ho costruito esattamente questo, pezzo per pezzo. Prima il layer di acquisizione: screenshot in tempo reale dello schermo, catturato con precisione. Poi la griglia — una sovrapposizione venti per quindici di punti rossi, una mesh che trasforma ogni pixel dello schermo in una coordinata numerica precisa. Non è una soluzione elegante, è una soluzione *funzionante*, che è quello che conta.

Quella griglia è il dizionario. È il modo con cui dico a Claude Vision: "Questo schermo è uno spazio con quattrocentottantasei punti di riferimento. Dimmi dove guardare." Claude riceve lo screenshot con la griglia sovrapposta, analizza, restituisce una coordinata. Il sistema converte quella coordinata in un click simulato. Mouse, tastiera, hotkey, drag and drop — tutto eseguito programmaticamente, tutto invisibile, tutto automatico.

Il primo test lo ricordo bene. Ho aperto un'applicazione volutamente stupida, una di quelle con interfaccia grafica piatta e zero accesso esterno. Ho dato un'istruzione in linguaggio naturale. Il sistema ha fatto lo screenshot, ha sovrapposto la griglia, ha mandato tutto a Claude Vision, ha ricevuto la risposta, ha calcolato la coordinata, ha cliccato.

Ha cliccato nel posto giusto.

Non al secondo tentativo. Non dopo correzioni. Al primo.

Stavo in officina da solo e ho detto "ecco" a voce alta, come si fa quando una saldatura viene perfetta al primo passaggio e non c'è nessuno intorno ma devi comunque dirlo.

---

## ATTO III — Cosa si sblocca adesso

Cambia molto. Te lo dico in modo concreto, senza giri di parole.

V32 è la fresatrice CNC che sto costruendo, siamo al sessantacinque percento con i rinforzi della Config G. Quando sarà completa, dovrà dialogare con software di controllo industriale. Alcuni di quei software non hanno interfacce moderne. ScreenAgent è la mano che li tocca.

VULCAN, la pressa polimeri, stessa storia. MIMS aspetta che la catena V32-VULCAN sia completa per andare avanti. Ogni nodo della catena che diventa più robusto avvicina MIMS al suo trenta percento di avanzamento al prossimo step.

EVA, il sistema AI che gestisce Vita Natura, il centro estetico, deve operare su prenotazioni, calendari, interfacce web che cambiano. ScreenAgent le dà occhi. Non metaforicamente — operativamente.

Ma c'è qualcosa di più grande che voglio dirti. ScreenAgent v1.0 non è solo uno strumento. È una prova di concetto su un principio che guida tutto il progetto: nessun sistema dovrebbe fermarsi perché l'ambiente non è collaborativo. Un sistema robusto lavora con quello che trova, non con quello che vorrebbe trovare. Questa filosofia la applico in officina da vent'anni — adatti l'utensile al pezzo, non il pezzo all'utensile. L'ho messa dentro il codice.

Adesso GENESIS ha percezione visiva. È un salto di qualità, non di quantità.

---

## CHIUSURA

*La differenza tra un sistema che ragiona e un sistema che lavora è che uno dei due sa aprire il cofano da solo.*

---

Prossimo episodio: aggiornamento V32, Config G rinforzi — cosa significa davvero costruire una fresatrice con le proprie mani nel 2026.

## FATTI (per il RAG)

- **FATTO:** ScreenAgent v1.0 è stato completato il 30 maggio 2026 come milestone verificata in STATE.json, all'interno del progetto TITANIUM_OS/GENESIS.

- **DECISIONE:** La griglia di riferimento visivo scelta per ScreenAgent è una mesh 20×15 punti rossi sovrapposta allo screenshot, generando 300 coordinate numeriche discrete. **LOGICA:** Trasforma qualsiasi schermo in uno spazio indirizzabile da Claude Vision senza richiedere API o output strutturati dall'applicazione target.

- **FATTO:** Il flusso operativo di ScreenAgent v1.0 è: acquisizione screenshot in tempo reale → sovrapposizione griglia 20×15 → invio a Claude Vision → restituzione coordinata → conversione in azione simulata (click, drag, hotkey, copy).

- **FATTO:** GENESIS al momento del milestone è dichiarato all'83% di avanzamento, con RAG graph-aware v5, orchestrazione MCP v1.3 e watchdog parallelo attivi.

- **OBIETTIVO:** ScreenAgent è identificato come il layer di interfaccia tra GENESIS e software industriali senza API moderni, inclusi i software di controllo di V32 (CNC al 65% con rinforzi Config G) e VULCAN (pressa polimeri), e le interfacce web di EVA/Vita Natura.

- **LOGICA PROGETTUALE:** Il principio architetturale dichiarato è che nessun nodo del sistema deve bloccarsi per ambienti non collaborativi; ScreenAgent è l'implementazione di questo principio a livello di percezione visiva.
