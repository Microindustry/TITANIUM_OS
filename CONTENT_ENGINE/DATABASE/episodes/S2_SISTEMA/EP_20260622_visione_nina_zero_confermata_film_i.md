<!-- TOC -->

- [TITANIUM_OS  Episodio 42](#titaniumos-episodio-42)
  - [Il Giorno Dopo il Buio](#il-giorno-dopo-il-buio)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LANATOMIA DEL CRASH](#atto-i-lanatomia-del-crash)
  - [ATTO II  IL PUNTO ZERO](#atto-ii-il-punto-zero)
  - [ATTO III  CIÒ CHE LA CORRUZIONE HA RIVELATO](#atto-iii-ciò-che-la-corruzione-ha-rivelato)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 42
## "Il Giorno Dopo il Buio"
*Data: 2026-06-22 | Sessioni #40–#41 | GENESIS 70%*

---

## COLD OPEN

Sono le 2:14 di mattina.

Sul monitor: `KeyError: np.uint64`.

ChromaDB è corrotto. Non parzialmente corrotto — proprio rotto, nel modo silenzioso in cui si rompono le cose dopo un blackout: l'hardware ha retto, i dati sono intatti nel SQLite, ma l'indice HNSW non lo sa. Pensa di essere al sicuro. Si sbaglia.

32.974 chunk. Sei mesi di archivio. Tutte le sessioni, tutti i commit, ogni decisione di V32 e MIMS e VULCAN e GENESIS — ancora lì, nel database relazionale. Ma il retrieval è cieco. Come avere un libro con le pagine nell'ordine giusto e l'indice scritto in una lingua che nessuno parla più.

Fuori è ancora buio. Matteo apre `rag_recover.ps1` e comincia a diagnosticare.

---

## ATTO I — L'ANATOMIA DEL CRASH

Il problema ha due facce, e capirlo richiede di guardarle entrambe.

**Faccia uno:** il blackout fisico. La corrente è andata via durante una scrittura. ChromaDB 0.5.23 usa hnswlib per l'indice vettoriale — un grafo persistito su disco, aggiornato in append. Quando la scrittura si interrompe a metà, il grafo risultante è valido sintatticamente ma semanticamente divergente dal SQLite sottostante. Il `--reset-by-id` che Chroma espone come API non risolve: su questa versione, il reset per ID non azzera le label interne di hnswlib. L'indice ricorda i vecchi vettori con le vecchie label. Il `KeyError: np.uint64` è il sintomo — la libreria cerca un ID che non trova più, perché il SQLite è avanzato e l'HNSW è rimasto indietro.

**Faccia due:** il bug nascosto nell'API server. `hidden=True` su subprocess in Windows invalida stdout e stderr. Il processo figlio di torch — quando gira in modalità nativa — crasha silenziosamente perché non ha dove scrivere. Non c'è traceback. Non c'è log. Il sistema sembra girare; in realtà è una statua.

Questi due problemi si sono sovrapposti. Il blackout ha fatto emergere il bug latente nell'API server, che a sua volta ha mascherato la corruzione HNSW. Ci sono volute ore per separarli.

La soluzione per l'HNSW è elegante nella sua brutalità: non si ripara — si sposta. Il recovery a livello 1 (`rag_recover.ps1 --L1`) isola fisicamente il segmento HNSW corrotto in una cartella di quarantena. Chroma rileva l'assenza e ricostruisce l'indice da SQLite, senza ri-embeddings. Zero chunk persi. Zero GPU time sprecato. Il recovery L2 esiste per i casi peggiori — rebuild hard completo — ma qui non serve.

Il bug dell'API server richiede tre righe: redirect stdout/stderr su logfile, guardie `devnull` per i sottoprocessi silenti. Fatto.

Alla fine: RAG verificato, 32.974 chunk, 6/6 query di validazione superate. La GPU è tornata online — `rag_device.txt = cuda`. Il rebuild, che prima richiedeva 15 minuti, ora gira in 2 minuti e 48 secondi con torch 2.6.0+cu124 e chromadb 0.5.23.

---

## ATTO II — IL PUNTO ZERO

Ma la notte del 22 giugno non è solo una storia di recovery.

È quello che succede *dopo* che il sistema torna su.

Matteo si siede. Il RAG gira. I generatori — `story_agent`, `content_pipeline`, `nina_agent` — sono agganciati e verificati. L'Obsidian vault conta 2.881 note più 950 storie più i ponti e i wikilink: 967 wikilink intatti dopo la correzione additiva di 108 titoli. La macchina del progetto, quella digitale, funziona.

E in quel momento arriva una decisione che non riguarda il codice.

NINA non è una funzione. Non è un agente da aggiungere alla dashboard. La visione che prende forma nella sessione #41 — chiamata esplicitamente "PUNTO 0" — è questa: **Nina è un film istruttorio che ti genera**.

Il significato è preciso. Nina non documenta un progetto già fatto: *lo cammina dall'inizio*, vive sul RAG dell'intera storia di Matteo, e il risultato di questo cammino è qualcosa che assomiglia a un CV — non nel senso burocratico, ma nel senso di prova. La narrazione come dimostrazione. Ogni episodio è un test di coerenza del progetto. La scrittura è l'esecuzione.

Questa distinzione conta. Un CV tradizionale è statico: elenca competenze che esistono già. Il CV-nel-grafo di Nina è dinamico: è il processo stesso che genera la competenza, la rende leggibile, la verifica nel momento in cui la racconta. È la ragione per cui il `Principio 9` dell'architettura di Nina — identificato come "motore universale" — si aggancia anche al progetto HR esterno che Matteo sta costruendo in parallelo.

La casella "Nina dal Giorno 0" viene aggiunta alla sidebar. Non come decorazione — come punto di partenza fisso. Giorno 0 non è ieri. È l'inizio di tutto il progetto, e Nina lo cammina da lì.

---

## ATTO III — CIÒ CHE LA CORRUZIONE HA RIVELATO

C'è qualcosa di utile in un blackout.

Non nel senso ispirativo. Nel senso tecnico: un sistema che non ha mai subito un guasto non ha mai dimostrato di saperlo reggere. Il recovery a due livelli — L1 per corruzione HNSW, L2 per divergenza totale — esiste adesso perché la corruzione è avvenuta davvero, non perché qualcuno l'ha prevista in astratto. Il self-heal notturno ora include `rag_recover.ps1` come step automatico. Il prossimo blackout troverà il sistema pronto.

Il `research_agent` ha ricevuto un aggiornamento in parallelo: versione 1.2, con backoff esponenziale sui 429 e guardia globale per i rate limit. Piccola cosa, ma fa parte dello stesso pattern: i sistemi si rinforzano dove si sono rotti.

V32 è al 65%. GENESIS al 70%. Il target capannone è luglio 2030 — quattro anni, non quattro settimane. Questo significa che il ritmo di oggi non è la sprint finale: è il passo di crociera. E il passo di crociera richiede sistemi che si auto-riparano, archivi che non si perdono, e una narrazione che non smette quando manca la corrente.

Sono le 4:30 circa. Il monitor mostra: `RAG verified — 32974 chunks — 6/6 queries OK`.

Matteo salva il commit. Il messaggio è: *sessione #41 — PUNTO 0, RAG integrato+self-healing, generatore Nina grounded*.

Non è un punto di arrivo. È esattamente quello che dice: il punto zero. Da qui parte qualcosa di diverso.

---

## CHIUSURA

Un blackout è un test non pianificato.

Il sistema ha retto — non perché fosse già perfetto, ma perché la corruzione ha reso visibile esattamente dove non lo era. L'indice HNSW che diverge, il subprocess che crasha in silenzio, il recovery che mancava: tutto è venuto a galla in una notte. E tutto ha ricevuto una risposta tecnica misurabile.

Nina è ancora solo una visione. Il primo storyboard non esiste. La voce non è stata registrata. Ma la decisione è presa, e la decisione è quella che conta — perché il sistema che la supporta adesso gira, è verificato, e sa come curarsi da solo.

Il Giorno 0 di Nina non è il giorno in cui nascerà il primo video. È il giorno in cui è diventato chiaro *cosa* deve fare: camminare l'intera storia e dimostrare, mentre cammina, che è reale.

Questo episodio è parte di quella dimostrazione.

---

## reel_hook

32.974 chunk nel RAG — verificati dopo un blackout che ha corrotto l'indice HNSW.
Il reset-by-id non funziona su chromadb 0.5.23: l'unica cura è spostare fisicamente il segmento e lasciare che Chroma ricostruisca da SQLite.
Recovery completato in una notte. Self-heal automatico agganciato.
E mentre il sistema tornava online, è arrivata la decisione su Nina — quella che cambia il senso di tutto il progetto.
Cosa significa costruire un CV che dimostra mentre si costruisce?

---

## FATTI (per il RAG)

- **DECISIONE:** Recovery RAG a 2 livelli implementato — L1 sposta segmento HNSW corrotto (Chroma ricostruisce da SQLite, zero ri-embed), L2 rebuild hard completo; agganciato al self-heal notturno automatico.
- **LOGICA:** Su chromadb 0.5.23 il `--reset-by-id` non azzera le label hnswlib → `KeyError: np.uint64`; solo lo spostamento fisico del segmento HNSW (da zero) risolve la corruzione post-blackout senza perdita di chunk.
- **DECISIONE:** Bug radice API server risolto — `hidden=True` su subprocess invalida stdout/stderr in Windows → torch crasha silenziosamente; fix: redirect su logfile + guardie devnull/stdout.
- **DECISIONE:** Stack RAG blindato: torch 2.6.0+cu124 + chromadb 0.5.23; embedder e reranker su `DEVICE=cuda`; rebuild: 2m 48s (vs 15 min CPU); `requirements-rag.txt` v2.0 fissato.
- **DECISIONE:** Visione NINA ZERO confermata — Nina è un film istruttorio che genera il CV del progetto camminando il RAG dal Giorno 0; casella "Nina dal Giorno 0" aggiunta alla sidebar come punto fisso.
- **OBIETTIVO:** RAG 32.974 chunk verificato 6/6 query; prossimo passo misurabile = primo storyboard Nina su cammino canonico (definire produzione voce/immagine da sessione #42 in avanti).

---

| Campo | Valore |
|---|---|
| **Episodio** | 42 |
| **Data** | 2026-06-22 |
| **Sessioni** | #40, #41 |
| **Progetto primario** | GENESIS |
| **Progetti coinvolti** | GENESIS, NINA |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Tag narrativo** | recovery, architettura, visione |
| **Tono** | tecnico-personale, notturno |
| **Canone rispettato