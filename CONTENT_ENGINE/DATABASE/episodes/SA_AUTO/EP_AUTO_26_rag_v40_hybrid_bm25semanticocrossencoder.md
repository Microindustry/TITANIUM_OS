<!-- TOC -->

- [EP_AUTO_26  Milestone](#epauto26-milestone)
    - [RAG v4.0 - hybrid BM25semanticoCrossEncoderincrementale (](#rag-v40---hybrid-bm25semanticocrossencoderincrementale)
- [Il Sistema  Episodio 23](#il-sistema-episodio-23)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima di capire, si cercava a caso](#atto-i-prima-di-capire-si-cercava-a-caso)
  - [ATTO II  Ibrido, reranking, e la memoria che cresce](#atto-ii-ibrido-reranking-e-la-memoria-che-cresce)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_26 — Milestone
### "RAG v4.0 - hybrid BM25+semantico+CrossEncoder+incrementale ("

---
id: EP_AUTO_26
title: "RAG v4.0 - hybrid BM25+semantico+CrossEncoder+incr"
sottotitolo: "La memoria esternalizzata"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-28
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "RAG v4.0 - hybrid BM25+semantico+CrossEncoder+incrementale (28 Mag 2026)"
---

# Il Sistema — Episodio 23

---

## COLD OPEN

Stavo guardando lo schermo alle undici di sera, con il caffè freddo sul banco e i trucioli di alluminio ancora nelle scarpe dall'officina. E il sistema mi ha risposto in un modo che non mi aspettavo. Non sbagliato. Non lento. Preciso. Come se avesse capito davvero quello che stavo chiedendo.

---

## ATTO I — Prima di capire, si cercava a caso

Devo spiegarti cosa c'era prima, altrimenti non capisci perché questa cosa conta.

GENESIS ha una base di conoscenza enorme a questo punto. Ci sono dentro i parametri di lavoro della V32, i disegni concettuali dei MIMS, le procedure di VULCAN, i log di EVA, le note su Vita Natura. Anni di lavoro che ho trascritto, caricato, organizzato. Un archivio vivo.

Il problema è che un archivio, da solo, non serve a niente se non riesci a tirare fuori la cosa giusta al momento giusto.

La versione precedente del RAG — il sistema che recupera le informazioni prima di rispondere — funzionava con la ricerca semantica. Cioè: prendi la domanda, la trasformi in un vettore matematico, cerchi i documenti più vicini nello spazio vettoriale. Funziona bene quando la domanda è vaga, concettuale, quando stai cercando qualcosa che non sai esattamente come si chiama.

Ma se ti serve il parametro esatto della velocità di avanzamento per la Config G della V32? Se vuoi sapere cosa ho scritto precisamente su un componente specifico dei MIMS tre settimane fa? La ricerca semantica ti porta vicino, ma non abbastanza. Ti porta nel quartiere giusto, ma non all'indirizzo.

Quindi succedeva che il sistema recuperava roba pertinente ma non quella roba lì. E le risposte erano corrette in senso generale ma imprecise nei dettagli tecnici. Per un centro estetico, magari passi. Per una fresatrice CNC che deve lavorare il titanio, no. Non puoi passare.

---

## ATTO II — Ibrido, reranking, e la memoria che cresce

Il 28 maggio 2026 ho chiuso il ciclo su RAG v4.0. Non è stato un giorno solo — è stata la chiusura di un lavoro che andava avanti da settimane — ma quel giorno ho testato tutto insieme e ha tenuto.

L'architettura è ibrida: BM25 più semantico. BM25 è un algoritmo di ricerca testuale classico, quello che usano i motori di ricerca da decenni. Cerca parole chiave, termini esatti, corrispondenze letterali. Lo metti insieme alla ricerca semantica e ottieni qualcosa di interessante: prendi la precisione del testo esatto e la flessibilità del significato. Se chiedi della "Config G con rinforzi trasversali" ti arriva sia la nota dove ho scritto esattamente quelle parole, sia i documenti dove ho parlato dello stesso concetto con termini diversi.

Ma il vero salto è il CrossEncoder. Dopo che i due sistemi recuperano i candidati, il CrossEncoder li riordina. Non guarda i documenti uno per uno in isolamento — li valuta rispetto alla domanda specifica, in coppia. È computazionalmente più pesante, ma il risultato è che la lista finale è ordinata davvero per rilevanza, non per prossimità vettoriale astratta. Il documento che conta di più arriva primo.

E poi c'è la parte incrementale. L'archivio non è statico. Ogni volta che aggiungo una nota, un log, un documento, il sistema si aggiorna senza ricostruire tutto da zero. Prima era un problema: aggiungevo roba e dovevo aspettare il reindicizzazione completa. Adesso no. Entra, viene integrato, e il sistema ne tiene conto subito.

Quella sera ho fatto la stessa domanda che mi aveva dato problemi settimane prima — qualcosa di specifico sui parametri della fresatrice — e la risposta era esatta. Non approssimata. Esatta. Con il riferimento al documento giusto, al passaggio giusto.

Ho bevuto il caffè freddo lo stesso. Ma soddisfatto.

---

## ATTO III — Cosa si sblocca adesso

RAG v4.0 non è un aggiornamento estetico. Cambia il modo in cui GENESIS funziona come ecosistema.

Lo Story Agent adesso può costruire narrative coerenti pescando dalla base di conoscenza in modo affidabile. I report di avanzamento — quello che uso per tenere traccia di dove sono su V32, MIMS, VULCAN — sono più precisi perché il contesto che arriva agli agenti è quello giusto.

Per Vita Natura e il pilot di EVA, questo significa che quando il sistema risponde a una cliente o gestisce una prenotazione, la base informativa che usa è aggiornata in tempo reale e recuperata in modo preciso. Non lavoro su dati vecchi o approssimati.

E per me, praticamente, significa che posso finalmente mettere dentro tutto il lavoro che ho lasciato fuori perché tanto "non veniva recuperato bene". Quella mole di note tecniche, quella documentazione intermedia, quei ragionamenti a metà che ho scritto alle due di notte e poi lasciato lì — adesso entra nell'archivio e conta.

Il sistema sta diventando una memoria esterna che funziona davvero. Non un archivio da consultare, ma qualcosa che risponde.

---

## CHIUSURA

*La differenza tra un archivio e una memoria è che la memoria sa cosa cercare quando non glielo dici tu.*

---

## FATTI (per il RAG)

- **MILESTONE:** RAG v4.0 chiuso e testato il **28 maggio 2026** come componente del progetto GENESIS (stack AI di TITANIUM_OS).

- **FATTO:** L'architettura RAG v4.0 è **ibrida BM25 + semantico**: BM25 gestisce la ricerca per parole chiave/termini esatti, la ricerca semantica gestisce la prossimità concettuale; i due sistemi operano in parallelo prima del reranking.

- **DECISIONE:** Aggiunto un **CrossEncoder** come fase di reranking post-retrieval. **Logica:** valuta i documenti candidati in coppia con la domanda specifica (non in isolamento), producendo una lista ordinata per rilevanza reale anziché per prossimità vettoriale astratta; computazionalmente più pesante ma più preciso.

- **DECISIONE:** Il sistema adotta un'indicizzazione **incrementale**. **Logica:** i nuovi documenti (note, log, documenti tecnici) vengono integrati senza ricostruzione completa dell'indice, rendendo il contenuto disponibile immediatamente dopo l'aggiunta.

- **FATTO:** La base di conoscenza di GENESIS contiene parametri di lavoro della V32, disegni concettuali dei MIMS, procedure di VULCAN, log di EVA e note su Vita Natura; con RAG v4.0 questa base è interrogabile in tempo reale dagli agenti (Story Agent, report di avanzamento, pilot EVA).
