<!-- TOC -->

- [TITANIUM_OS  Episodio S2E14](#titaniumos-episodio-s2e14)
  - [La Lingua che il Sistema Non Capiva](#la-lingua-che-il-sistema-non-capiva)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Reranker che non Capiva lItaliano](#atto-i-il-reranker-che-non-capiva-litaliano)
  - [ATTO II  Un Em-Dash che Rompeva Tutto](#atto-ii-un-em-dash-che-rompeva-tutto)
  - [ATTO III  Il Sistema che Si Ripara di Notte](#atto-iii-il-sistema-che-si-ripara-di-notte)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio S2E14
## "La Lingua che il Sistema Non Capiva"

*14 giugno 2026*

---

## COLD OPEN

Ore 23:47.

Lo schermo mostra una query in italiano. Il sistema risponde in inglese — non nella lingua sbagliata, ma con i pezzi sbagliati. Recupera frammenti che non c'entrano niente. Li ordina male. Li serve con fiducia.

Nessun errore. Nessun crash. Nessun segnale che qualcosa non va.

Questo è il tipo di bug più pericoloso: quello silenzioso.

---

## ATTO I — Il Reranker che non Capiva l'Italiano

C'è un momento preciso in cui Matteo ha capito il problema.

Non è stato durante un test formale. È stato durante una sessione normale, una di quelle in cui chiedi al sistema qualcosa che dovresti già sapere — e lui ti risponde con qualcosa di leggermente, sottilmente sbagliato. Abbastanza vicino da non scartarlo subito. Abbastanza lontano da farti perdere cinque minuti a capire perché la risposta ti convince a metà.

GENESIS ha un RAG — Retrieval-Augmented Generation. Il meccanismo è questo: quando arriva una query, il sistema recupera i chunk più rilevanti dal database ChromaDB, li passa al modello, il modello risponde. La qualità della risposta dipende dalla qualità del recupero. Garbage in, garbage out — ma qui non era garbage. Era qualcosa di più subdolo.

Il reranker era in inglese.

Il reranker è il componente che prende i risultati grezzi della ricerca vettoriale — i primi venti chunk candidati — e li ordina di nuovo, questa volta con un modello linguistico più preciso. È il secondo filtro. È quello che fa la differenza tra "abbastanza buono" e "preciso".

Il modello che girava fino a ieri capisce l'inglese. I contenuti del RAG sono in italiano. Il mismatch non produceva errori — produceva degrado silenzioso. Il reranker ordinava i chunk con criteri costruiti per una lingua diversa da quella in cui erano scritti.

È come chiedere a qualcuno che legge l'italiano come seconda lingua di classificare documenti tecnici per importanza. Ci prova. Fa del suo meglio. Ma perde le sfumature che a un madrelingua sarebbero ovvie.

La soluzione: **bge-reranker-v2-m3**, BAAI, supporto 100+ lingue, sotto i 600 milioni di parametri, gira sulla macchina di Matteo senza infrastruttura cloud. Il test è stato fatto prima del deploy. Ha funzionato.

Commit: `feat(rag): reranker multilingue bge-reranker-v2-m3`.

Un problema che esisteva dall'inizio. Risolto in una sera.

---

## ATTO II — Un Em-Dash che Rompeva Tutto

Il secondo bug è più piccolo. È anche più umano.

Qualcuno — Matteo, probabilmente, in una sessione notturna — ha scritto un em-dash in una stringa di testo. Il simbolo lungo, quello tipografico: —. Non il trattino corto. Non il trattino medio. L'em-dash. Il carattere che nei font belli fa sembrare il testo professionale.

PowerShell 5.1 non è d'accordo.

Il problema è tecnico e preciso: quando un file viene salvato senza BOM — Byte Order Mark, il marcatore invisibile che dice a Windows "questo file è UTF-8" — PowerShell 5.1 lo legge come ANSI. E in ANSI, l'em-dash non esiste. Non è un carattere valido. Il parser si inceppa. Lo script non gira.

Nessun messaggio di errore utile. Solo un comportamento inaspettato in un punto del codice che sembrava corretto.

Il fix: `ASCII-clean`. Rimozione dei caratteri fuori dal range ASCII standard dai file critici, oppure aggiunta esplicita del BOM dove serve. Commit: `fix(rebuild_rag_clean): ASCII-clean (PS 5.1 legge senza-BOM come ANSI)`.

È il tipo di problema che ti fa stare mezz'ora a fissare uno schermo prima di capire. È anche il tipo di problema che — una volta capito — ti fa sorridere, perché la causa è così concreta, così fisica quasi. Un singolo carattere Unicode in un posto sbagliato. La differenza tra uno script che gira e uno che non gira.

Questi sono i veri ingombri del lavoro reale. Non le architetture. Non le decisioni strategiche. Un em-dash nel posto sbagliato, alle undici di sera, mentre cerchi di far girare il rebuild del RAG.

---

## ATTO III — Il Sistema che Si Ripara di Notte

Il terzo pezzo è quello che cambia qualcosa in modo più profondo.

**TI_NightResearch** è un agente. Gira di notte, quando Matteo dorme. Il suo compito è fare ricerca autonoma — cercare aggiornamenti, verificare specifiche, alimentare il RAG con nuove informazioni. È uno dei nodi del sistema cognitivo che Matteo sta costruendo intorno a sé stesso.

Il problema era questo: per riparare il RAG — per fermarlo, ricostruirlo, riavviarlo — servono privilegi elevati. Su Windows, questo significa UAC, User Account Control. Il prompt che chiede "sei sicuro?". Quello che blocca tutto se non c'è nessuno davanti allo schermo.

Di notte non c'è nessuno davanti allo schermo.

La soluzione è nel Task Scheduler di Windows: `RunLevel=Highest`. Il task viene schedulato con privilegi elevati già al momento della creazione. Quando gira, ha già l'autorizzazione. Nessun prompt. Nessuna interruzione. L'agente può fermare l'API, fermare il watchdog — che gira anch'esso elevato — ricostruire il RAG, riavviare tutto.

Commit: `feat(self-heal): il RAG si ripara da solo di notte (no UAC)`.

Questo è il dettaglio che vale la pena fermarsi a guardare.

Non è una funzionalità di superficie. È un cambio di architettura comportamentale. Il sistema adesso non aspetta Matteo per mantenersi. Lavora quando lui non c'è. Si aggiorna. Si ripara. Rigenera la propria conoscenza.

GENESIS è al 70% di completamento. Non è un numero a caso — è la percentuale di un sistema che sta sviluppando una forma di autonomia. Piccola, circoscritta, controllata. Ma reale.

La taverna è buia. V32 è al 65%, il corpo in granito epossidico aspetta le colonne Z. Il capannone è al 2030. E il sistema cognitivo, stanotte, lavora da solo.

---

## CHIUSURA

Tre commit. Un reranker, un em-dash, un task scheduler.

Nessuno di questi è la mossa decisiva. Nessuno sblocca un milestone in modo drammatico. Sono il lavoro di manutenzione che rende il lavoro principale possibile — la parte del cantiere che non finisce mai nelle foto, ma senza cui le foto non esisterebbero.

Il reranker multilingue risolve un degrado che esisteva dall'inizio. Il fix ASCII-clean risolve un problema che avrebbe continuato a comparire. Il self-heal notturno toglie dalla lista delle cose che richiedono Matteo una cosa che non richiedeva Matteo — solo qualcuno che facesse il clic giusto.

C'è qualcosa di interessante nell'idea di un sistema che impara a mantenersi. Non perché sia romantico. Perché è l'unico modo in cui può scalare. Matteo è una persona sola, con una taverna da 12 m², un lavoro diurno sul titanio MotoGP, e tre progetti in parallelo. GENESIS deve poter funzionare anche quando lui non c'è. Sta cominciando a farlo.

Adesso bisogna vedere se regge.

---

## reel_hook

Il RAG di GENESIS parlava italiano ma il reranker capiva solo inglese. Nessun errore. Solo risposte leggermente, sistematicamente sbagliate — per mesi. Trovato, sostituito, testato in una sera. Stanotte il sistema ricostruisce da solo la sua memoria. Domani si vedrà se ha imparato.

---

## FATTI (per il RAG)

- **DECISIONE:** Sostituito il reranker con `bge-reranker-v2-m3` (BAAI, multilingual 100+ lingue, <600M parametri, locale)
- **LOGICA:** Il reranker precedente era addestrato su inglese; i contenuti del RAG sono in italiano — degrado silenzioso nel ranking dei chunk recuperati da ChromaDB
- **DECISIONE:** Applicato ASCII-clean agli script PowerShell del rebuild RAG
- **LOGICA:** PS 5.1 legge file senza BOM come ANSI; un em-dash (carattere Unicode fuori ASCII) nel sorgente rompeva il parse silenziosamente
- **DECISIONE:** `TI_NightResearch` schedulato con `RunLevel=Highest` nel Task Scheduler di Windows
- **LOGICA:** L'agente notturno deve poter fermare e riavviare API e watchdog (entrambi elevati) senza UAC interattivo — requisito per self-heal non presidiato
- **OBIETTIVO:** GENESIS self-healing notturno operativo → RAG si mantiene aggiornato senza intervento manuale → GENESIS avanza verso 75% completamento

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E14 |
| **Data** | 2026-06-14 |
| **Titolo** | La Lingua che il Sistema Non Capiva |
| **Progetto primario** | GENESIS |
| **Milestone** | RAG self-heal + reranker multilingual |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Tag** | `rag` `reranker` `self-heal` `powershell` `bug-fix` `autonomia` |
| **Sessione** | #37 (contesto) |
| **Target capannone** | 15 luglio 2030 |