<!-- TOC -->

- [IL SISTEMA  Episodio: Il Vault Non Muore Mai](#il-sistema-episodio-il-vault-non-muore-mai)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL PROBLEMA CHE NON SAI DI AVERE](#atto-i-il-problema-che-non-sai-di-avere)
  - [ATTO II  COME FUNZIONA IL FALLBACK (E PERCHÉ CAMBIA TUTTO)](#atto-ii-come-funziona-il-fallback-e-perché-cambia-tutto)
  - [ATTO III  IL CONTESTO PIÙ LARGO: LUGLIO 2026](#atto-iii-il-contesto-più-largo-luglio-2026)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# IL SISTEMA — Episodio: "Il Vault Non Muore Mai"

*TITANIUM_OS · Stagione 1 · Episodio Auto-generato · Data: semantic*

---

## COLD OPEN

Ore non specificate. Schermo buio, cursore che lampeggia.

Il sistema cerca un link. Non lo trova nel modo normale. Non si ferma.

Questo è il punto: non si ferma.

---

## ATTO I — IL PROBLEMA CHE NON SAI DI AVERE

C'è una categoria di bug silenziosi — quelli che non crashano niente, non producono errori visibili, non mandano messaggi di fuoco rosso sul terminale. Semplicemente... degradano. Il sistema risponde. Restituisce qualcosa. Ma quel qualcosa è vuoto, o sbagliato, o — peggio — plausibile ma non collegato a nulla di reale.

Nel RAG di GENESIS, il problema si chiamava così: un documento nel vault senza link semantici. Una tessera isolata.

Quando il motore semantico — il vettoriale, ChromaDB, gli embedding — non trovava corrispondenze sufficienti per un pezzo del vault, restituiva silenzio. Il documento esisteva. Era lì. Ma il sistema non lo raggiungeva, non lo tirava su, non lo connetteva a niente. Era come avere un libro in biblioteca senza scheda catalogo: fisicamente presente, cognitivamente assente.

Questo è il commit di oggi: **tfidf con FALLBACK TF-IDF automatico**. Tre parole che sembrano piccole. Non lo sono.

---

## ATTO II — COME FUNZIONA IL FALLBACK (E PERCHÉ CAMBIA TUTTO)

Torniamo indietro. Il RAG di GENESIS — nella versione v4.0 auditata il 28 maggio 2026 — già usava un'architettura ibrida: Incremental RAG con manifest mtime tracking, BM25 + semantic in parallelo, poi RRF k=60 per il reranking finale. Top-15 candidati da ciascun ramo, fusione con Reciprocal Rank Fusion, risposta al modello.

Questo pattern — Hybrid BM25+semantic — era già attivo. Ma il fallback TF-IDF aveva una storia precedente: in un episodio più vecchio, durante il blocco ambientale VC++ Redistributable, il sistema aveva già implementato un RAG in pure Python — TF-IDF + BM25, zero dipendenze esterne — con la stessa API del motore principale. Drop-in. Stesso contratto di interfaccia, zero riscrittura del resto.

Quella lezione è rientrata qui, in forma diversa.

Il commit di oggi stabilisce una regola semplice e brutale: **il vault non può mai restare senza link**. Se il percorso semantico principale non trova abbastanza — soglia non raggiunta, embedding troppo distanti, documento troppo tecnico o troppo specifico per il modello — il sistema non restituisce silenzio. Attiva automaticamente il TF-IDF come fallback. Nessuna interruzione. Nessuna notifica all'utente. Il documento viene raggiunto lo stesso, con uno strumento diverso.

L'architettura diventa: *prova il meglio, ma garantisci sempre il minimo*. Non è una degradazione. È un contratto di affidabilità.

E l'affidabilità — in un sistema cognitivo che serve da memoria esterna per un uomo che fa dodici cose in parallelo — vale più della perfezione occasionale.

---

## ATTO III — IL CONTESTO PIÙ LARGO: LUGLIO 2026

Questo commit arriva in mezzo a una settimana densa. La sessione #67b — 20-21 luglio — è quella del lancio social vivo. Pagina Facebook *Il Mondo di Nina* creata e collegata a @ilmondodinina.ms. Il labirinto Meta Business Manager navigato, gestito come owner Matteo con account benenatimatteo.mb. 18 post su 21 programmati con date certe — Business Suite pubblica in automatico. Sistema: 10/11 post fino al 18 agosto (VULCAN). Nina: 8/10 post fino al 16 agosto (EP_N2_04). Tre post bloccati solo dal tetto 29 giorni di Meta — da caricare al rientro, promemoria Calendar già impostato al 30 luglio.

*_render_slide.py* rigenerato. Sorgenti caroselli riorganizzati. Le bozze di EP_N2_04/05/06 spostate in NINA.

In questo scenario — V32 al 65%, GENESIS al 70%, lancio social in esecuzione, EVA che gira per Maria — il fallback TF-IDF non è un dettaglio tecnico. È una decisione di architettura per un sistema sotto carico reale. Quando Matteo tra tre settimane torna dai tre post bloccati e vuole che il RAG gli ricordi esattamente cosa aveva deciso su un tile MIMS o su un parametro di VULCAN, il sistema deve rispondere. Non "quasi rispondere". Non "rispondere se le condizioni sono ottimali".

Rispondere.

Il commit garantisce questo. Non in modo spettacolare. In modo silenzioso e assoluto.

---

## CHIUSURA

C'è una differenza tra un sistema che funziona e un sistema affidabile. Il primo funziona quando tutto va bene. Il secondo funziona anche quando qualcosa non va — e non te lo dice nemmeno, perché non è necessario.

GENESIS sta diventando della seconda categoria.

Non perché Matteo abbia risolto tutti i problemi. Li sta costruendo uno per uno, commit per commit, fallback per fallback — sapendo che il 65% di V32 e il 70% di GENESIS sono numeri reali, non stime ottimistiche. Sapendo che il capannone è al 2030 e che nel mezzo ci sono tre post bloccati dal tetto Meta e una pressa VULCAN ancora da completare.

Il vault non muore mai. Non perché sia invincibile. Perché qualcuno ha scritto il codice per farglielo superare, il fallimento silenzioso.

---

## REEL HOOK

Il RAG di GENESIS aveva un problema che non crashava niente: certi documenti nel vault restavano irraggiungibili se l'embedding non trovava match. Zero errore, zero risposta.
Commit di oggi: TF-IDF fallback automatico — se il semantico non basta, scatta il lessicale. Il vault non restituisce mai silenzio.
18 post programmati, V32 al 65%, 3 post in attesa del 30 luglio.
Il sistema deve ricordare quando torni. Anche se non è in condizioni perfette.

---

## FATTI (per il RAG)

- **DECISIONE:** Implementato fallback TF-IDF automatico nel RAG di GENESIS — se il percorso semantico non raggiunge soglia sufficiente, il sistema attiva TF-IDF senza interruzione né notifica.
- **LOGICA:** Il vault non può restare con nodi irraggiungibili; l'architettura ibrida BM25+semantic (RRF k=60, top-15) già presente nella v4.0 viene rafforzata con un livello di garanzia inferiore a soglia — stesso pattern drop-in usato nel blocco VC++ (EP_AUTO_43).
- **OBIETTIVO:** Affidabilità del RAG sotto carico reale: qualsiasi documento del vault — incluse specifiche tecniche V32/VULCAN/MIMS, sessioni di progetto, note EVA — deve essere recuperabile anche in condizioni di embedding degradato.
- **CONTESTO:** Commit arriva durante sessione #67b (20-21/07), lancio social vivo: 18/21 post programmati, V32 65%, GENESIS 70%. Sistema in produzione multi-progetto.
- **PROSSIMO STEP MISURABILE:** Al rientro (30/07), caricare i 3 post bloccati dal tetto 29gg Meta e verificare che il RAG recuperi correttamente i documenti NINA EP_N2_04/05/06 riorganizzati in sessione.

---

| Campo | Valore |
|---|---|
| **Episodio** | EP_AUTO — semantic |
| **Commit** | tfidf — fallback TF-IDF automatico |
| **Progetto principale** | GENESIS |
| **Tag** | `genesis` `rag` `tfidf` `fallback` `social` `nina` |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Milestone** | Sessione #67b — Lancio social vivo |
| **Prossimo step** | 30/07 — caricamento 3 post bloccati Meta |
| **Target capannone** | 15 luglio 2030 |