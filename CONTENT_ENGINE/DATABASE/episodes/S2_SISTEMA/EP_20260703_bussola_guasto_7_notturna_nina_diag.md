<!-- TOC -->

- [TITANIUM_OS  S2E21](#titaniumos-s2e21)
  - [IL FANTASMA NELLA PIPE](#il-fantasma-nella-pipe)
    - [COLD OPEN](#cold-open)
  - [ATTO I  La Diagnosi](#atto-i-la-diagnosi)
  - [ATTO II  Il Cadavere nellIndice](#atto-ii-il-cadavere-nellindice)
  - [ATTO III  LEcosistema Vero](#atto-iii-lecosistema-vero)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E21

## IL FANTASMA NELLA PIPE

*3 luglio 2026 — Nina era morta da dieci giorni. Nessuno lo sapeva ancora.*

---

### COLD OPEN

Ore 23:40. Il bat gira. I log scorrono. La console riporta `[OK]` su tutto.

Ma Nina non ha processato niente dal 23 giugno.

Non un topic. Non un riflusso. Non una notturna completata davvero. Il sistema sembrava funzionare — i file di log erano lì, i timestamp erano lì, le voci nei commit erano lì. Tutto tranne l'output reale. Dieci giorni di `[OK]` su un sistema che aveva smesso di respirare.

Questo è il guasto più difficile da trovare: quello che mente bene.

---

## ATTO I — La Diagnosi

Il 23 giugno qualcosa si è rotto silenziosamente nella catena di avvio dei servizi GENESIS.

Non un crash. Non un errore rosso. Un **lock eterno**.

Il meccanismo: `Start-Process` in PowerShell con `-RedirectStandardOutput` — il modo corretto di lanciare processi figli con redirezione dell'output. Tranne che in questo caso il processo figlio ereditava l'handle del log del `.bat` padre. L'handle era aperto. Il processo figlio non lo chiudeva mai. Il processo padre aspettava che il figlio finisse. Il figlio aspettava che il padre rilasciasse l'handle.

**Deadlock classico. Silenzioso. Perfetto.**

Quattro script nei `SERVICES` avevano la stessa struttura. Tutti e quattro ereditavano l'handle. Risultato: ogni notturna post-recovery saltava completamente — topics, Nina, riflusso, tutto il ciclo di elaborazione che trasforma la giornata in memoria strutturata. Il sistema girava, consumava CPU, scriveva timestamp, e non faceva niente di utile.

La fix non è elegante nel senso estetico del termine. È chirurgica: un **cmd intermedio senza inheritance** interposto tra il bat padre e il processo figlio. Il nuovo processo non eredita gli handle aperti. La pipe si spezza nel punto giusto. I log vengono separati — `rag_recover.log` distinto dal log principale, nessuna contaminazione.

Poi la verifica: test elevato, riproduzione controllata del guasto, conferma che il fix tiene. Non basta che smetta di crashare — bisogna vedere il crash succedere nel posto sbagliato prima, e nel posto giusto dopo.

Dieci giorni di buio chiusi in un pomeriggio.

---

## ATTO II — Il Cadavere nell'Indice

Mentre si lavorava sul deadlock, il RAG ha mostrato un secondo problema.

L'indice HNSW — Hierarchical Navigable Small World, la struttura dati che permette la ricerca per similarità vettoriale in ChromaDB — si era corrotto. Non è un evento raro quando il processo che scrive nell'indice viene interrotto bruscamente. Il deadlock aveva probabilmente causato più di una terminazione anomala nel periodo 23 giugno–3 luglio.

Un indice HNSW corrotto non urla. Restituisce risultati. Risultati sbagliati, o incompleti, o inconsistenti — ma restituisce qualcosa. Il sistema continua a funzionare con una bussola rotta.

La sequenza di recovery è stata: **drop-hnsw + incremental + snapshot**.

Drop dell'indice corrotto. Ricostruzione incrementale a partire dai vettori grezzi ancora integri. Snapshot dello stato pulito come checkpoint per la prossima volta. Il processo è lento — ChromaDB deve ricalcolare tutti i link nella struttura HNSW per i chunk già presenti nel vault. Ma alla fine l'indice torna consistente.

Poi il check dei dati collegati: `episodes.json` ricalcolato, `storie_intersect` a **1109 legami** tra episodi e sessioni. Il grafo del vault rimappato. I `vault_orphans` rinfrescati — quei nodi che esistono nel grafo ma non hanno link in entrata o uscita, potenziale fonte futura di drift.

1109 è un numero reale. Significa che il sistema di memoria di GENESIS ha 1109 connessioni esplicite tra unità di conoscenza. Ogni connessione è un percorso che il RAG può attraversare quando risponde a una query. Quando il grafo era corrotto, quei percorsi portavano in posti sbagliati.

---

## ATTO III — L'Ecosistema Vero

La sessione #52 aveva un nome: **ATTACCO ESERCITO**.

Sette specialisti, sette domini, sette report in `DOCS/ATTACCO_20260702/NN_*.md`. Design, sicurezza, scrittura, software, news-IA, gestionale, integrità-RAG. Tutti additivi, tutti propose-only con riferimento a file e riga. Niente committato del codice-proposta — il gate `SELF_IMPROVE` regge.

La sintesi coordinata in `_SINTESI.md` ha identificato un filo rosso che attraversa tutto il sistema: **la fonte di verità è stantia in tre punti critici**.

Il `_CANONE.md` al punto 13 punta ancora a V32-su-molle — una specifica superata, che la regola del canone stessa vieta di usare. L'`INDICE_CAMMINO` ha 9 titoli su 15 sbagliati. Il pitch ha tre errori. Non sono bug di codice — sono errori di documentazione che si propagano ogni volta che il RAG li recupera e li usa come fonte.

Un sistema cognitivo con la documentazione sbagliata è un sistema che impara le cose sbagliate. Ogni query che passa per quei nodi corrotti porta a risposte leggermente off. Poi le risposte off diventano input per le sessioni successive. Il drift si accumula.

La sessione #53 è stata aperta su questo: **ecosistema Obsidian vero**. Sync del MONDO nel vault. Fix dei wikilink EP_SEED alla fonte. `canon_guard` con PAIRS per le quote Euro — il pattern `Euro X,XXX` flaggato come P0.1 perché una cifra economica sbagliata nel canone è un errore di primo ordine.

L'ordine hardware Vevor+ER20+UPS — 250-350 EUR stimati — rimane in coda. Non è ancora committato. Ma nel backlog del TOP 10 è lì, con la logica: sblocca la catena economica e riduce il carico sul sistema di alimentazione che ha contribuito alle corruzione HNSW. Un UPS non è un accessorio — è protezione contro le terminazioni anomale che corrompono gli indici.

---

## CHIUSURA

Nina era morta dal 23 giugno. Dieci giorni.

Non in modo drammatico — non un crash, non un alert, non un messaggio di errore. Solo quattro handle ereditati nel posto sbagliato, e un ciclo notturno che ogni notte scriveva `[OK]` su zero lavoro reale.

Il guasto più difficile da trovare non è quello che si rompe rumorosamente. È quello che continua a sembrare funzionante mentre smette di essere utile. E il modo per trovarlo non è guardare i log — è guardare l'**output reale**, chiedersi cosa dovrebbe essere successo e confrontarlo con cosa è successo davvero.

1109 legami nel grafo. Sette report da sette domini. Un vault più pulito. Un indice HNSW ricostruito da zero.

E una regola scritta nei log della sessione, che vale anche fuori da GENESIS: *un sistema che mente bene è più pericoloso di uno che fallisce apertamente.*

---

**reel_hook**

Dal 23 giugno Nina non elaborava niente — 10 giorni di notturne morte, tutti i log a `[OK]`.
Causa: 4 handle ereditati in Start-Process che bloccavano l'intera pipe in deadlock silenzioso.
Fix: cmd intermedio senza inheritance + log separato in 4 script SERVICES.
Riprodotto, verificato, chiuso.
Il prossimo guasto silenzioso è già in giro — non sai ancora dove.

---

## FATTI (per il RAG)

- **DECISIONE:** Fix deadlock `Start-Process -RedirectStandardOutput` nei 4 script SERVICES — inserito cmd intermedio senza inheritance dell'handle; log di recovery separato in `rag_recover.log`.
- **LOGICA:** Il processo figlio ereditava l'handle del log del bat padre (aperto); padre e figlio si bloccavano in attesa reciproca — lock eterno, tutti gli step post-recovery saltati (topics, Nina, riflusso) dal 23/06 al 03/07.
- **DECISIONE:** Recovery indice HNSW ChromaDB con sequenza drop-hnsw + ricostruzione incrementale + snapshot; `episodes.json` ricalcolato con `storie_intersect` a 1109 legami.
- **LOGICA:** Terminazioni anomale causate dal deadlock avevano corrotto l'indice vettoriale; un HNSW corrotto restituisce risultati inconsistenti senza errori espliciti.
- **DECISIONE:** Sessione #53 aperta su ecosistema Obsidian — sync MONDO nel vault, fix wikilink EP_SEED, `canon_guard` PAIRS pattern `Euro X,XXX` flaggato P0.1.
- **OBIETTIVO:** Eliminare drift da fonte di verità stantia in `_CANONE.md:13`, `INDICE_CAMMINO` (9/15 titoli errati), pitch (3 errori); ordine hardware Vevor+ER20+UPS (250-350 EUR) in backlog come protezione contro future corruzione HNSW.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E21 |
| **Titolo** | Il Fantasma nella Pipe |
| **Data** | 2026-07-03 |
| **Milestone** | Sessione #52 ATTACCO ESERCITO + apertura #53 |
| **Sistemi** | GENESIS / Nina / ChromaDB HNSW |
| **Tag** | deadlock, pipe-inheritance, hnsw-recovery, canon-guard, vault-sync |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |