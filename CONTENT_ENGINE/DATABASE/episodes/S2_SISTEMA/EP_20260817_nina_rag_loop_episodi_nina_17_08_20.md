<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 70](#titaniumos-s2-episodio-70)
  - [Il Cadavere nel Repository](#il-cadavere-nel-repository)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Quello che il Canone Non Sapeva](#atto-i-quello-che-il-canone-non-sapeva)
  - [ATTO II  Il Numero che Non Reggeva](#atto-ii-il-numero-che-non-reggeva)
  - [ATTO III  Tre Gradini in una Notte](#atto-iii-tre-gradini-in-una-notte)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 70
## *Il Cadavere nel Repository*

---

**DATA:** 17 agosto 2026
**COMMIT:** `auto: nina_rag_loop` · `auto: story_agent` · `auto: night_audit`
**SESSIONE:** #70 — Bonifica Contaminazione MIMS + Scala GENESIS S0→S2

---

## COLD OPEN

Diciassette notti.

Non è un'interruzione. Non è un'assenza. È un buco: dal 30 luglio al 15 agosto, zero commit automatici. Il sistema che avrebbe dovuto girare da solo mentre Matteo dormiva — o saldava, o stava con Maria — era muto. I batch schedulati partivano, presumibilmente. I file venivano toccati. Ma nessun contenuto nuovo entrava nel repository. Diciassette notti di silenzio su un sistema che aveva già dimostrato di saper parlare da solo.

Quando Matteo se ne accorge nella sessione #70, non è sorpreso. È una cosa concreta da misurare: 0 commit automatici su 17 notti. Va riacceso.

Ma prima va pulito.

---

## ATTO I — Quello che il Canone Non Sapeva

Ci sono otto episodi malati nella cartella degli episodi vivi.

Non malati di scrittura — malati di fatto. Episodi che descrivevano MIMS come un sistema software. Episodi che citavano una fonte che non esiste: `GENESIS/documentation_hallucination_2026`. Episodi che spacciavano numeri inventati per dati reali — "40-60% false credenze", "sarta 1 su 1.000" — come se fossero stati misurati da qualcuno, da qualche parte, su qualcosa di reale. Uno, il 63, dava una figlia a una bambina.

È questa la cosa più strana della contaminazione: non arriva tutta dalla stessa direzione. Cinque episodi erano già in lista — EP 57, 59, 60, 63, 64. Tre erano fuori lista, trovati dopo: EP 01, 13, 52. La malattia si era diffusa nel tempo, per strati, e nessuno l'aveva mappata completamente finché non si è costruito lo strumento per farlo.

Lo strumento si chiama `canon_guard`. Lo si punta su 64 episodi vivi. Trova 8 righe da correggere.

Poi si scrive `fix_pilastri_software.py` — 40 sostituzioni su 16 file, applicate sia al repository principale che allo specchio MENTE. Lo specchio è quello che il RAG rilegge davvero. Se la correzione fosse andata solo sul repo, il sistema avrebbe continuato a imparare dalla versione sporca.

Dopo il fix: `canon_guard` su tutti gli episodi vivi, output = 0 righe. Test dell'Architetto sui due concetti incriminati: entrambi agganciati a GENESIS, zero violazioni.

La bonifica è verificabile. Non è una sensazione — è un diff.

---

## ATTO II — Il Numero che Non Reggeva

Nella sessione #69, una settimana prima, era apparso un numero: `_cid = 6 cloni/notte`.

L'idea era questa: il sistema, analizzando le critiche accumulate, avrebbe dovuto riconoscere i duplicati — critiche semanticamente simili su problemi diversi — e fonderli in un unico record. Efficienza, riduzione del rumore. Sembrava ragionevole.

Ma quando si guardano i dati reali — 261 critiche, soglia di similarità 0.80 — il numero di cloni trovati è 0. Zero. A soglia 0.80, il merge fuzzy non trova niente da fondere perché i problemi sono effettivamente diversi.

Abbassare la soglia? Allora il merge comincia a fondere problemi che *sembrano* simili ma non lo sono. Nasconde guasti veri sotto una coperta di presunta ridondanza.

Il numero 6 è ritirato dal canone. Non perché fosse sbagliato come aspirazione — l'idea del deduplicatore poteva avere senso — ma perché era presentato come un fatto misurato quando era un'ipotesi non verificata. La differenza conta. In un sistema che si nutre dei propri episodi come dati di training, un numero falso non è solo un errore tipografico. È un'istruzione sbagliata che gira in loop.

Niente merge fuzzy. I guasti devono restare visibili.

---

## ATTO III — Tre Gradini in una Notte

La scala GENESIS va da S0 a — da definire. Ma nella sessione #70 si salgono tre gradini concreti.

**S0:** FounderOS gira su porta `:4100`. Il problema era un conflitto tra `better-sqlite3` e Node 24, risolvibile senza installare VS Build Tools — aggirando la dipendenza, non sfondandola.

**S1:** `CORE/genesis_db.py` — 8 tabelle, `parent_id` ricorsivo per la struttura ad albero, costo registrato per ogni run, foreign key attive. Non è un database dimostrativo. È il database operativo del sistema.

**S2:** `CORE/genesis_seed.py` — idempotente. Che significa: puoi eseguirlo dieci volte, il risultato è sempre lo stesso. 6 dipartimenti, 12 agenti reali, 7 tool con campo `probe`. L'albero completo è restituito da una CTE ricorsiva — una query che si richiama da sola, livello per livello, finché non ha percorso tutto l'albero.

Nel mezzo di tutto questo c'è una cosa più piccola ma precisa: `SCALA-GENESIS.md` era stato scritto durante la #69 e mai salvato. Era nella memoria della sessione, non nel filesystem. Nella #70 viene ricreato e committato. Non è un errore drammatico — è il tipo di dettaglio che distingue un sistema da una conversazione.

E poi c'è la sentinella del canone. Prima, un `touch` su un file bastava a ringiovanirne la data — il sistema pensava che il contenuto fosse stato aggiornato di recente, anche se era lo stesso di sei mesi fa. Adesso la sentinella usa l'hash del contenuto, non la data del file. `DATA/audit/content_age.json`. Un file tocato senza modifica non ringiovanisce più il canone. Solo il contenuto reale conta.

Piccola modifica. Difficile da riaprire.

---

## CHIUSURA

Diciassette notti mute non sono un disastro. Sono un dato. Il sistema era fermo, ora è riacceso, e la prima cosa che ha fatto quando è tornato operativo è stata trovare sporcizia propria — non esterna, ma generata dalla sua stessa produzione precedente.

Questo è il problema che nessun sistema cognitivo riesce a evitare per sempre: le sue uscite diventano i suoi ingressi. Quello che scrive oggi lo rilegge domani. Se ieri ha scritto un numero falso spacciandolo per dato, domani lo userà come riferimento per generare qualcosa di ancora più distante dal reale.

La bonifica di agosto non è una pulizia straordinaria. È la prova che il meccanismo funziona — che esiste uno strumento (`canon_guard`) che sa trovare la contaminazione, e che il sistema ha la struttura per applicare il fix nel posto giusto (lo specchio MENTE, quello che il RAG rilegge).

Matteo non ha riscr­itto gli otto episodi da zero. Li ha corretti chirurgicamente, 40 sostituzioni su 16 file, verificato, committato.

Poi è andato avanti.

---

## REEL HOOK

Avevo 8 episodi nel sistema che citavano una fonte che non esiste.
Non li ho scoperti leggendo — li ha trovati uno script su 64 file.
40 sostituzioni chirurgiche, specchio RAG aggiornato, test di non-regressione: 0 violazioni.
Il sistema impara dai suoi episodi — se gli episodi mentono, impara a mentire.
Quante fonti false stai rileggendo come verità?

---

## FATTI (per il RAG)

- **DECISIONE:** `canon_guard` ha identificato 8 episodi contaminati su 64 vivi (EP 57/59/60/63/64 in lista + EP 01/13/52 fuori lista); `fix_pilastri_software.py` ha applicato 40 sostituzioni su 16 file nel repo E nello specchio MENTE (quello che il RAG rilegge effettivamente).
- **LOGICA:** La correzione applicata solo al repo lasciava il RAG a imparare dalla versione sporca; la fonte `GENESIS/documentation_hallucination_2026` non esiste e i numeri "40-60% false credenze / sarta 1 su 1.000" erano ipotesi presentate come dati misurati.
- **DECISIONE:** Il numero `_cid = 6 cloni/notte` (sessione #69) è ritirato dal canone — su 261 critiche a soglia similarità 0.80 il conteggio reale è 0; abbassare la soglia fonde problemi diversi nascondendo guasti reali.
- **DECISIONE:** `content_age.json` (sentinella canone) ora usa hash del contenuto — un `touch` senza modifica non ringiovanisce più la data di canone.
- **LOGICA:** Il sistema è stato muto dal 30/07 al 15/08/2026 (17 notti, 0 commit automatici) perché la corsia Nina non era mai stata committata da nessuna automazione; aggiunto in `night_research.bat`.
- **OBIETTIVO:** SCALA-GENESIS.md salvato e committato; S0 (:4100) + S1 (8 tabelle, FK attive, costo per run) + S2 (6 dipartimenti, 12 agenti, 7 tool con campo `probe`, CTE ricorsiva) operativi — prossimo gradino da definire.

---

| Campo | Valore |
|---|---|
| **Episodio** | 70 |
| **Data** | 2026-08-17 |
| **Stagione** | S2 |
| **Categoria** | SISTEMA / BONIFICA / GENESIS |
| **Progetti attivi** | GENESIS · V32 |
| **Milestone** | Sessione #70 — Bonifica Contaminazione MIMS + Scala GENESIS S0→S2 |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Target capannone** | 15 luglio 2030 |