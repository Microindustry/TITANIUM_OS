<!-- TOC -->

- [EP_AUTO_45  Milestone](#epauto45-milestone)
    - [Indice RAG buildato e verificato: 6497 chunk da 145 file MEN](#indice-rag-buildato-e-verificato-6497-chunk-da-145-file-men)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima del numero, cera il caos](#atto-i-prima-del-numero-cera-il-caos)
  - [ATTO II  6.497 chunk, 32 megabyte, una query](#atto-ii-6497-chunk-32-megabyte-una-query)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_45 — Milestone
### "Indice RAG buildato e verificato: 6497 chunk da 145 file MEN"

---
id: EP_AUTO_45
title: "Indice RAG buildato e verificato: 6497 chunk da 14"
sottotitolo: "La memoria esternalizzata"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-06-03
data_generato: 2026-06-03
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Indice RAG buildato e verificato: 6497 chunk da 145 file MENTE, query GPU OK"
---

## COLD OPEN

La volta scorsa avevamo acceso la GPU — `torch.cuda.is_available()` aveva restituito `True`, e avevo detto che quello era il momento che contava. Avevo ragione. Ma non sapevo ancora cosa significava davvero, finché non ho visto il numero: 6.497.

---

## ATTO I — Prima del numero, c'era il caos

Faccio un passo indietro. Perché per capire cos'è 6.497, devi sapere cos'era MENTE prima.

MENTE è la memoria del sistema. Non è una metafora — è una cartella piena di file Markdown. Ogni decisione presa su V32, ogni calcolo sui rinforzi delle colonne Z, ogni sessione di debug su GENESIS, ogni nota su EVA e Vita Natura: tutto scritto in testo, organizzato per data e argomento, salvato su disco. In maggio 2026 siamo migrati con SINAPSI — abbiamo rimesso in ordine l'archivio, riclassificato tutto, creato una struttura che reggesse il peso di quello che stavo costruendo. Il risultato è stato 145 file Markdown. Centoquarantacinque documenti che contengono la storia tecnica di TITANIUM_OS.

Il problema è che un file Markdown da solo non serve a niente se non riesci a interrogarlo. Puoi aprire ogni file, scorrere, cercare — ma non scala. Quando sei nel mezzo di una sessione di lavoro su GENESIS, non hai tempo di aprire 145 file per trovare la nota dove avevi scritto perché avevi scelto il CHUNK_SIZE a 512 caratteri invece di 256. Hai bisogno che il sistema risponda lui. Hai bisogno di un indice.

Prima del RAG v4, avevamo tentativi. Il commit `7f70dcb` — quello che vedo ancora nei log — dice: RAG 150 chunk, poi 327 chunk, sessione numero 8. Erano misure di sistema che crescevano, ma in modo artigianale. Ogni ricostruzione era parziale. Ogni sessione ripartiva da uno stato che non era mai completamente verificato. C'era un bug che mi aveva tenuto bloccato per più tempo di quanto voglio ammettere: `generate_restart_prompt.py` cercava una collection ChromaDB chiamata `"mente_knowledge"`. Il nome reale era `"mente"`. Una stringa sbagliata. Il risultato era che ogni volta che il sistema tentava di verificare lo stato RAG in fase di riavvio, tornava "non verificabile". Il sistema non sapeva dove stava, e io non sapevo se mi stava dicendo la verità.

Questo è il contesto. Non c'è retorica qui: avevo un archivio di 145 file, un indice rotto, e una GPU pronta a lavorare che aspettava qualcosa da fare.

---

## ATTO II — 6.497 chunk, 32 megabyte, una query

Il rebuild completo del RAG è partito con `rag-rebuild`. Non è un comando spettacolare — è uno script Python che legge tutti i `.md` in `MICROINDUSTRY/MENTE/`, li taglia, li indicizza e li salva in ChromaDB.

Il parametro chiave è nel codice: `CHUNK_SIZE=512` caratteri, `STRIDE=200`. Significa che ogni file viene spezzato in pezzi da 512 caratteri, con un overlap del 61% tra un pezzo e il successivo. Perché 61% di overlap? Perché un chunk non vive mai da solo — il contesto sta nel pezzo prima e nel pezzo dopo. Se tagli netto, perdi il filo. Con lo stride a 200 su 512, ogni concetto importante compare in almeno due chunk contigui. Più chunk totali, risposta più precisa. È un trade-off consapevole, documentato in `2026-05-28_audit_sistema_rag_v4.md`. Non è stato scelto a caso.

Il risultato: 145 file → 6.497 chunk → 6.497 vettori a 384 dimensioni ciascuno.

Apro `chroma.sqlite3` con un DB browser e guardo le tabelle. `embeddings`: 6.497 righe. `embedding_fulltext_search`: 6.497. `embedding_metadata`: 25.988 — quattro record di metadato per ogni chunk, come deve essere: file sorgente, posizione, timestamp, testo grezzo. `embeddings_queue`: 338, la coda di scrittura residua che ChromaDB mantiene internamente. Il file pesa 32 megabyte. Trentadue megabyte che contengono la memoria operativa di tutto il progetto.

Poi lancio la query di test. `rag "rinforzi colonne Z"`. Il sistema converte la query in un vettore, cerca i top-k chunk più vicini nello spazio a 384 dimensioni, restituisce i pezzi di testo più rilevanti. La risposta torna in meno di un secondo, con riferimenti corretti alla sessione S8, ai calcoli strutturali, alle decisioni prese sulla Config G. La GPU lavora — la GTX 1070 con 8GB VRAM che avevamo verificato la volta scorsa. `torch.cuda.is_available()` → `True` non era solo un test: era la precondizione perché questo momento fosse possibile.

Il bug sulla collection è risolto. Il nome è `"mente"`, scritto giusto, verificabile. Adesso quando il sistema si riavvia, legge lo stato RAG, trova 6.497 chunk, conferma. Non più "non verificabile" — adesso risponde con un numero.

C'è un'altra cosa che vale la pena dire: l'indice contiene anche 818+ estrazioni fatte dallo scanner su documenti non-Markdown. Contratti, specifiche tecniche, note su carta fotografate e processate. Quella roba è dentro, indicizzata, interrogabile. MENTE non è solo il diario di progetto — è tutto quello che ho prodotto e raccolto.

---

## ATTO III — Cosa si sblocca adesso

Adesso il sistema ha memoria operativa reale. Non simulata, non parziale — completa e verificata.

Cosa significa concretamente? Significa che quando riprendo una sessione su V32 — che è al 65%, con i lavori sui gruppi Z e U ancora aperti — posso interrogare MENTE e il sistema mi porta i chunk rilevanti senza che io debba ricordare in quale file ho scritto quella cosa. Significa che GENESIS, che è al 70% e sta entrando nella fase di test delle automazioni, può essere documentato in tempo reale e il sistema può rispondere a domande di coerenza: "questa logica l'abbiamo già implementata da qualche parte?" La risposta arriva dal RAG, non dalla mia memoria.

Per MIMS — ancora in waiting_press al 30%, bloccato su VULCAN che non è ancora operativa — questo significa che tutta la documentazione sui connettori modulari è indicizzata. Quando VULCAN sarà pronta e riprenderemo la pressatura, il contesto tecnico è lì, accessibile.

Per Vita Natura e EVA, che sono al 40% con il centro estetico gestito con AI in fase attiva, l'indice porta dentro anche quella documentazione. Il sistema non è frammentato per progetto — è unificato. Una query su "protocollo cliente EVA" tira fuori i chunk giusti come una query su "tolleranze fresatura V32".

Il prossimo passo tecnico è IDENTITY — al 50%, la parte del sistema che riguarda come TITANIUM_OS si presenta e si descrive. Adesso che l'indice è verificato, IDENTITY può attingere a MENTE per costruire descrizioni coerenti con quello che è stato davvero fatto, non con quello che si vorrebbe sembrasse fatto.

Il lavoro immediato è stress-test: cento query diverse, tipi di documento diversi, edge case. Voglio vedere dove l'indice va in crisi — se ci sono aree di MENTE sottorapresentate, se lo stride è sufficiente per i documenti tecnici lunghi, se 384 dimensioni tengono per i contenuti più specialistici. I numeri li ho. Adesso devo capire se reggono.

---

## CHIUSURA

*6.497 non è un traguardo. È una misura. E finalmente è una misura che il sistema può leggere da solo, verificare da solo, usare. Quando una macchina sa dove sta, smette di affidarsi alla tua memoria per funzionare. È questo il punto.*

## FATTI (per il RAG)

- **FATTO:** L'indice RAG v4 di MENTE è stato costruito a partire da 145 file Markdown, producendo 6.497 chunk e 6.497 vettori embedding a 384 dimensioni ciascuno. Il database ChromaDB risultante (`chroma.sqlite3`) pesa 32 megabyte.

- **DECISIONE:** Il chunking è configurato con `CHUNK_SIZE=512` caratteri e `STRIDE=200`, corrispondente a un overlap del ~61% tra chunk contigui. **LOGICA:** L'overlap garantisce che ogni concetto rilevante compaia in almeno due chunk contigui, evitando la perdita di contesto ai bordi del taglio. Parametro documentato in `2026-05-28_audit_sistema_rag_v4.md`.

- **FATTO:** La struttura interna di ChromaDB mostra: 6.497 righe in `embeddings`, 6.497 in `embedding_fulltext_search`, 25.988 record in `embedding_metadata` (4 metadati per chunk: file sorgente, posizione, timestamp, testo grezzo), 338 voci in `embeddings_queue`.

- **DECISIONE:** Il nome corretto della collection ChromaDB è `"mente"` (non `"mente_knowledge"`). **LOGICA:** Il bug sul nome stringa causava il fallimento della verifica dello stato RAG ad ogni riavvio di `generate_restart_prompt.py`, rendendo lo stato del sistema "non verificabile".

- **FATTO:** L'indice include anche 818+ estrazioni da documenti non-Markdown (contratti, specifiche tecniche, immagini processate dallo scanner), indicizzati insieme ai file Markdown di MENTE.

- **FATTO:** La GPU utilizzata per il RAG è una GTX 1070 con 8GB VRAM; la precondizione operativa è `torch.cuda.is_available()` → `True`, verificata nell'episodio precedente al presente milestone.
