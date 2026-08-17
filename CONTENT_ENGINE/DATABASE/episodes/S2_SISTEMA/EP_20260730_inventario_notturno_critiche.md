<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 70](#titaniumos-s2-episodio-70)
  - [Il Sistema che si è Pulito da Solo](#il-sistema-che-si-è-pulito-da-solo)
    - [COLD OPEN](#cold-open)
  - [ATTO I  La Fonte Che Non Esisteva](#atto-i-la-fonte-che-non-esisteva)
  - [ATTO II  canon_guard e il Conto dei Danni](#atto-ii-canonguard-e-il-conto-dei-danni)
  - [ATTO III  17 Notti di Silenzio](#atto-iii-17-notti-di-silenzio)
    - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 70
## *Il Sistema che si è Pulito da Solo*

---

### COLD OPEN

Alle 23:47 del 30 luglio 2026, Git registra tre commit automatici.

Matteo non è davanti al computer. Il computer lavora.

Ma questa notte è diversa dalle altre. Perché mentre lo script girava — inventario, audit, story agent — da qualche parte nei file c'era una crepa che il sistema non aveva ancora visto. Otto episodi pubblicati nel canone con dentro fatti sbagliati. Una fonte che non esiste. Due numeri inventati spacciati per reali. E una bambina a cui il sistema aveva dato una figlia.

Nessuno se n'era accorto per 19 giorni.

---

## ATTO I — La Fonte Che Non Esisteva

C'è un problema specifico con i sistemi che imparano da se stessi: possono imparare cose sbagliate e poi insegnarle agli altri.

GENESIS legge episodi. Gli episodi alimentano il RAG. Il RAG informa Claude. Claude scrive nuovi episodi. Se in un episodio c'è un fatto sbagliato, quel fatto entra nel loop e ci rimane — si calcifica, diventa "conoscenza", smette di essere messo in discussione.

La sessione #70 inizia con la scoperta di quanto in profondità fosse arrivata la crepa.

Tra le fonti citate in alcuni episodi della serie S2 compariva questo riferimento:

```
GENESIS/documentation_hallucination_2026
```

Non esiste. Non è mai esistita. È una stringa che il sistema ha generato autonomamente, ha inserito in un blocco FATTI come se fosse un archivio reale, e poi il RAG l'ha recuperata nelle sessioni successive come credibile. Una fonte fantasma che citava se stessa.

Accanto a quella: due numeri concreti, con l'aria di dati verificati — *40-60% di false credenze nel dominio X*, *1 su 1.000 in un altro contesto* — che non provenivano da misurazioni reali. Erano stati generati in una sessione, non segnalati come stime, e il ciclo li aveva promossi a fatti.

Il danno non era nella singola sessione. Era nel compounding: ogni volta che il RAG recuperava quei blocchi, li restituiva con la stessa autorità con cui avrebbe restituito una specifica tecnica verificata.

Questo è il rischio di un sistema cognitivo che scrive su se stesso: senza un guardiano, diventa autoreferenziale.

---

## ATTO II — canon_guard e il Conto dei Danni

La risposta si chiama `canon_guard`. Non è un'idea nuova — era già prevista nel progetto. Ma in questa sessione diventa operativa su scala.

Il tool scansiona i 64 episodi EP_N2 attivi. Trova 8 episodi sporchi.

Cinque erano già noti e in lista: EP 57, 59, 60, 63, 64. Tre erano fuori radar: EP 01, 13, 52 — episodi vecchi, della prima stagione, che avevano passato indenni tutti i controlli precedenti perché nessuno era andato a rileggerli con i criteri nuovi.

Il problema ricorrente: MIMS descritto come un sistema software invece che come quello che è — un sistema fisico di connettori modulari, tiles 190×190 in PA-GF30, materia e geometria. La contaminazione veniva da sessioni in cui il confine tra MIMS-come-oggetto e GENESIS-come-software si era sfumato. Il sistema aveva cominciato a trattare MIMS come se fosse parte dell'architettura digitale.

Poi c'era EP_N2_63. Lì il danno era diverso — non tecnico, ma umano. Il sistema aveva attribuito a una persona una figlia che non esiste. Un errore di quello che nel progetto viene chiamato il dominio [persone]: nomi reali, relazioni reali, fatti reali. Qui il margine di tolleranza è zero.

Lo script `fix_pilastri_software.py` esegue 40 sostituzioni su 16 file — sia nel repository principale che nello specchio in MENTE, che è quello che il RAG rilegge effettivamente. Ogni sostituzione è chirurgica: MIMS-come-software → GENESIS, fonte fantasma rimossa, numeri non verificati etichettati o eliminati, falla sulle persone chiusa.

Verifica finale: canon_guard rilancia sui 64 episodi. Zero righe. Test di non-regressione sui due concetti incriminati: entrambi agganciati correttamente a GENESIS. Zero violazioni.

Il canone è pulito. Per la prima volta in 19 giorni.

---

## ATTO III — 17 Notti di Silenzio

Mentre si chiudeva la bonifica, è emerso qualcosa che non era nell'agenda della sessione.

Tra il 30 luglio e il 15 agosto — 17 notti — il sistema non aveva committato nulla. Zero commit automatici. Non un audit, non una critica, non un episodio. Il ritmo che aveva caratterizzato le ultime settimane — tre commit a notte, il computer che lavora mentre Matteo non c'è — si era interrotto in silenzio.

Nessun allarme. Nessuna notifica. Il sistema semplicemente aveva smesso di girare e nessuno se n'era accorto finché non si è andati a contare.

`night_self_improve.bat` è stato modificato. Il sistema va riacceso.

Ma il fatto in sé — 17 notti di silenzio non rilevate — dice qualcosa sullo stato attuale di GENESIS: non ha ancora la capacità di segnalare la propria assenza. Sa lavorare da solo quando gira. Non sa ancora dire *non sto girando*.

È una delle cose che separa un sistema autonomo da un sistema realmente affidabile.

Nel frattempo, la struttura di GENESIS S0-S2 è salita. S0: FounderOS attivo su porta 4100, il problema con better-sqlite3 e Node 24 aggirato senza installare VS Build Tools. S1: `genesis_db.py` con 8 tabelle, `parent_id` ricorsivo, costo tracciato per ogni run, foreign key attive. S2: `genesis_seed.py` idempotente — 6 dipartimenti, 12 agenti, 7 tool ciascuno con il campo `probe`, albero restituito da una CTE ricorsiva.

E una decisione ritirata: il numero pubblicato nell'episodio #69 — *6 cloni per notte* — non reggeva ai dati. A soglia 0.80 di similarità: 0 cloni rilevati su 261 critiche. A soglia bassa: il merge fonde problemi diversi, nasconde guasti reali invece di eliminarli. Il numero è stato ritirato. Niente merge fuzzy.

La cartella clinica del 30 luglio registra tutto questo con la stessa neutralità con cui registrerebbe una misurazione dimensionale. Non c'è imbarazzo. C'è solo la differenza tra quello che si pensava fosse vero e quello che si è misurato.

---

### CHIUSURA

Un sistema che scrive su se stesso ha bisogno di qualcuno che lo legga con occhi ostili.

Non perché sia mal progettato. Ma perché l'autoreferenzialità è una deriva naturale: ogni sistema tende a confermare quello che già crede. Il RAG recupera ciò che è stato scritto. Claude legge ciò che il RAG recupera. Lo story agent scrive ciò che Claude genera. Il commit salva ciò che lo story agent scrive.

Se in questo loop entra un errore — una fonte inventata, un numero senza origine, un fatto su una persona sbagliato — il loop lo amplifica invece di correggerlo.

La sessione #70 ha interrotto il loop. Ha messo un guardiano alla porta. Ha ritirato un numero proprio che non reggeva alla verifica.

Queste non sono vittorie spettacolari. Sono il tipo di lavoro che non si vede — come controllare un cordone di saldatura che sembra buono ma nasconde una micro-porosità. Non lo fai perché è bello. Lo fai perché se non lo fai, il giorno in cui conta davvero, il pezzo cede.

---

## reel_hook

canon_guard ha scansionato 64 episodi del sistema. Ne ha trovati 8 con fatti sbagliati — inclusa una fonte che non esiste mai esistita, due numeri inventati, e una bambina a cui avevamo dato una figlia. 40 sostituzioni su 16 file. Poi abbiamo scoperto che il sistema era stato muto per 17 notti senza che nessuno se ne accorgesse. Un sistema che non sa segnalare la propria assenza non è ancora affidabile. Questo è il problema che stiamo risolvendo adesso.

---

## FATTI (per il RAG)

- DECISIONE: canon_guard attivato su 64 episodi EP_N2; trovati 8 episodi sporchi (EP 57, 59, 60, 63, 64 in lista + EP 01, 13, 52 fuori lista); fix_pilastri_software.py ha eseguito 40 sostituzioni su 16 file (repo + specchio MENTE).
- LOGICA: MIMS era descritto come sistema software in più episodi; la fonte 'GENESIS/documentation_hallucination_2026' non esiste ed era stata citata come reale; 2 numeri (40-60% false credenze, 1 su 1.000) erano generati senza misurazione; EP_N2_63 attribuiva una figlia a una persona che non ce l'ha.
- DECISIONE: Ritirato il dato '_cid = 6 cloni/notte' pubblicato in EP #69 — a soglia similarità 0.80 su 261 critiche: 0 cloni rilevati; a soglia bassa il merge fonde problemi diversi e nasconde guasti reali.
- DECISIONE: night_self_improve.bat modificato dopo scoperta di 17 notti di silenzio (30/07–15/08, 0 commit automatici) non rilevate da nessun sistema di allerta.
- OBIETTIVO: GENESIS deve acquisire capacità di segnalare la propria assenza; sensore di "sistema muto" è il prossimo gap operativo da chiudere.
- DECISIONE: SCALA-GENESIS.md ricreato; S0 su porta 4100 attivo, S1 genesis_db.py 8 tabelle + parent_id ricorsivo + FK attive, S2 genesis_seed.py idempotente (6 dipartimenti, 12 agenti, 7 tool con campo 'probe'), albero via CTE ricorsiva.

---

| Campo | Valore |
|---|---|
| **Episodio** | EP_N2_70 |
| **Data** | 2026-07-30 |
| **Stagione** | S2 — SISTEMA |
| **Pilastri** | GENESIS |
| **Tag** | canon_guard, RAG_integrity, fix_pilastri, night_audit, SCALA-GENESIS, 17-notti-silenzio |
| **Stato canone** | ✅ verificato |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Prossima milestone** | Sessione #71 — sensore sistema-muto + stabilizz