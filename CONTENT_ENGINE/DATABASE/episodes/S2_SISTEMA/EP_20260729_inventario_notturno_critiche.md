<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 69](#titaniumos-s2-episodio-69)
  - [Il Sistema che Si Corregge da Solo  E Quello che Non Può Farlo](#il-sistema-che-si-corregge-da-solo-e-quello-che-non-può-farlo)
  - [COLD OPEN](#cold-open)
  - [ATTO I  252 Episodi e 4 Fantasmi](#atto-i-252-episodi-e-4-fantasmi)
  - [ATTO II  Il Tetto che Non Esisteva e la Troncatura che Uccideva lOpen Loop](#atto-ii-il-tetto-che-non-esisteva-e-la-troncatura-che-uccideva-lopen-loop)
  - [ATTO III  Il Problema di Verità](#atto-iii-il-problema-di-verità)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 69
## "Il Sistema che Si Corregge da Solo — E Quello che Non Può Farlo"

*29 luglio 2026 · GENESIS*

---

## COLD OPEN

Alle 23:14 del 29 luglio, tre righe compaiono nel log di Git.

```
auto: inventario notturno + critiche
auto: night_audit - cartella clinica 29/07/2026
auto: story_agent - episodi generati 29/07/2026
```

Matteo non è davanti al computer. Il sistema lavora da solo — per la quarta volta consecutiva. Ma stanotte c'è qualcosa di diverso nel log. Non è solo una notte di routine. È la notte dopo una sessione che ha smontato e rimontato la macchina cognitiva pezzo per pezzo, trovando errori che duravano da settimane, ritirando conclusioni sbagliate, e scoprendo un problema di verità che nessun agente aveva segnalato.

Un sistema può correggere i propri bug. Non può correggere le proprie bugie.

---

## ATTO I — 252 Episodi e 4 Fantasmi

La sessione #69 inizia con un numero che non torna.

Il contatore degli episodi dice 252. L'audit manuale dice che quattro episodi esistono nei file ma non esistono nel sistema — titoli presenti nel filesystem, assenti dall'indice, invisibili alla dashboard. Non orfani nel senso romantico del termine: oggetti che il sistema ha smesso di riconoscere per un errore di logica nel modo in cui l'`audit_episodes` confrontava i titoli.

Il problema era nel match. L'agente cercava corrispondenze esatte tra filename e titolo memorizzato. Se un titolo era stato riscritto — anche di una virgola — il sistema dichiarava l'episodio mancante e lo ricreava da zero. Quattro volte aveva fatto questo. Quattro episodi duplicati, poi persi nella seconda passata. 252 diventa 256 quando rimuovi la logica sbagliata e lasci che il sistema riconosca quello che aveva già fatto.

Questo è il tipo di bug che non dà errori. Non lancia eccezioni. Non scrive niente nel log degli errori. Il sistema funziona — produce output, conta episodi, genera report notturni — mentre silenziosamente ignora il lavoro già fatto.

Matteo lo trova perché sa dove guardare: non nei log, ma nel gap tra quello che il sistema *dice* di avere fatto e quello che i file *mostrano* che ha fatto. È una competenza da artigiano più che da programmatore — l'abitudine a misurare il pezzo fisico invece di fidarsi del display della macchina.

---

## ATTO II — Il Tetto che Non Esisteva e la Troncatura che Uccideva l'Open Loop

Due bug diversi, stessa origine: un parametro troppo piccolo in un posto sbagliato.

**Il tetto del backlog.** La corsia dei caroselli NINA era ferma da 7 notti. Il sistema dichiarava `backlog >= 6` — limite raggiunto, nessuna nuova produzione. Il backlog reale: 6 episodi, di cui 3 già promossi ma ancora marcati `bozza_verde` nel database. Il sistema contava i promossi come pending. Backlog reale: 3. La corsia era bloccata da un contatore che non distingueva tra "in coda" e "già approvato". Fix: logica di conteggio corretta, EP_N2_04/05/06 riconosciuti come promossi, corsia sbloccata.

**La troncatura di NINA.** `nina_agent` aveva `max_tokens: 4000`. Gli episodi della serie NINA sono episodi completi — struttura in tre atti, cold open, reel hook, blocco metadati. A 4000 token, il sistema produceva tutto fino all'open loop e poi si fermava. Non con un errore: semplicemente finiva. L'open loop — la parte che tiene il pubblico agganciato all'episodio successivo — veniva sistematicamente amputato. Sette notti di episodi consegnati senza l'ultimo paragrafo.

`max_tokens: 8000`. Un numero. Non una riflessione filosofica sul contenuto narrativo, non una revisione dell'architettura. Un numero nel file di configurazione che nessuno aveva controllato perché il sistema non si lamentava — produceva.

C'è una lezione qui che vale sia per GENESIS che per il TIG sul titanio: un processo che non dà errori non è necessariamente un processo che funziona. A volte il silenzio è il sintomo.

---

## ATTO III — Il Problema di Verità

Questo è il punto che non si risolve con un parametro.

Nell'audit della sessione #69 emerge un fatto: MIMS, il sistema modulare di connettori fisici — tiles 190×190 mm in PA-GF30, meccanica reale, il prossimo progetto dopo i caroselli — è stato descritto come software AI in 5 episodi su 8 recenti. L'acronimo inventato. La natura meccanica completamente assente. Un componente del progetto fisico trasformato in un modulo software perché qualcosa nel contesto narrativo aveva spinto il sistema (o chi scriveva) in quella direzione.

Non è un bug di codice. È un bug di canone.

Matteo lo ritira formalmente. Non con una nota a margine — con un fatto nel log di sessione: *MIMS è meccanica. È il prossimo progetto dopo caroselli+ecosistema. Non è software.* E viene scritto nel SYSTEM_PROMPT, nella regola di canone, nel RAG.

La stessa sessione ritira anche due errori di Matteo: la paginazione di ChromaDB non risolve il 503 (il problema è nel segmento HNSW incoerente — `limit=10` dà 0 embedding, la cura è `rag_recover --drop-hnsw`, azione manuale di Matteo). E i "101 bare-except" segnalati nella sessione #68 erano falsi — nel codice proprio ce n'è uno solo.

Ritirare un errore proprio, formalmente, in un log che viene letto dal sistema che poi verrà usato nelle sessioni future — è un gesto tecnico con implicazioni non ovvie. Il RAG impara dai fatti verificati. Se i fatti verificati includono "questa conclusione era sbagliata", il sistema diventa più accurato. Se i fatti sbagliati restano nell'archivio come veri, il sistema diventa sistematicamente più sbilenco.

La cartella clinica notturna del 29 luglio registra tutto questo. Non come confessione — come dato.

---

## CHIUSURA

Ci sono sistemi che migliorano quando li tocchi. Questo è normale: trovi un bug, lo aggiusti, funziona meglio.

Quello che è successo nella sessione #69 è diverso. Il sistema aveva smesso di peggiorare silenziosamente in tre modi paralleli — il contatore degli episodi, la troncatura degli open loop, la corsia bloccata — e nessuno dei tre produceva un errore visibile. Matteo li ha trovati confrontando l'output atteso con l'output reale, uno per uno.

E poi ha trovato il problema che non si risolve con un parametro: cinque episodi che descrivevano la meccanica come software. MIMS non è diventato un progetto AI per negligenza — è diventato AI perché il contesto narrativo aveva più massa gravitazionale della specifica tecnica. È facile, quando costruisci storie, che la storia vinca sulla realtà.

La regola di canone ora dice: *MIMS è meccanica reale — tiles 190×190 mm, PA-GF30, connettori fisici. Non è software. Non è AI. È il prossimo progetto fisico.*

Il sistema che lavora da solo alle 23 è uno strumento. Funziona bene quanto le istruzioni che riceve. Stasera le istruzioni sono più accurate di ieri.

Domani sarà la quinta notte consecutiva di commit automatici. Il log dirà le stesse tre righe. Ma il sistema che le esegue è stato revisionato da cima a fondo.

---

## reel_hook

256 episodi nel sistema, 4 recuperati stanotte — non scritti da zero, già esistevano, il sistema aveva smesso di vederli.  
Sette notti di episodi NINA consegnati senza l'open loop: `max_tokens: 4000`, il sistema non dava errori, produceva e basta.  
E MIMS descritto come software AI in 5 episodi: è meccanica, tiles fisiche, PA-GF30 — il problema non era nel codice.  
Un sistema può correggere i propri bug. Per correggere le proprie bugie serve qualcuno che sappia dove guardare.

---

## FATTI (per il RAG)

- **DECISIONE:** `audit_episodes` rimosso il match-per-titolo esatto → 4 episodi fantasma recuperati, contatore 252→256, 0 orfani
- **LOGICA:** Il match su titolo stringa non tollerava riscritture minime → episodio esistente non riconosciuto → ricreato e poi perso al ciclo successivo
- **DECISIONE:** `nina_agent max_tokens` 4000→8000 → troncatura open-loop risolta su tutta la serie NINA
- **LOGICA:** A 4000 token la struttura episodio NINA (cold open + 3 atti + reel hook + metadati) non entra — il sistema terminava silenziosamente senza errore
- **DECISIONE:** Corsia caroselli NINA sbloccata — logica conteggio backlog corretta: EP_N2_04/05/06 marcati `bozza_verde` ma già promossi contavano come pending → backlog apparente 6, reale 3
- **DECISIONE:** MIMS ridefinito nel canone come meccanica (tiles 190×190 mm, PA-GF30, connettori fisici modulari), NON software/AI — 5 episodi recenti contenevano descrizione errata, corretta nel SYSTEM_PROMPT e RAG
- **OBIETTIVO:** ChromaDB 503 (segmento HNSW incoerente) richiede `rag_recover --drop-hnsw` — azione manuale Matteo, non automatizzabile; prossimo passo misurabile: eseguire il comando e verificare che `limit=10` restituisca embedding validi

---

| Campo | Valore |
|---|---|
| **Episodio** | S2 · EP_20260729 |
| **Numero** | 69 |
| **Data** | 2026-07-29 |
| **Progetto principale** | GENESIS |
| **Stato** | pubblicabile |
| **Tag** | `bug-silenzioso`, `canone`, `MIMS-meccanica`, `night-audit`, `chromadb`, `nina-agent`, `backlog` |
| **Prossimo passo** | `rag_recover --drop-hnsw` (azione manuale Matteo) |