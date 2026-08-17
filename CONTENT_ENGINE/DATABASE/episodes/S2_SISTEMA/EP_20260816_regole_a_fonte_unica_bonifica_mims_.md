<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 70](#titaniumos-s2-episodio-70)
  - [La Bonifica](#la-bonifica)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Cadavere nella Fonte](#atto-i-il-cadavere-nella-fonte)
  - [ATTO II  Lo Strumento che Bonifica](#atto-ii-lo-strumento-che-bonifica)
  - [ATTO III  Tre Gradini](#atto-iii-tre-gradini)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 70
## *La Bonifica*

**DATA:** 16 agosto 2026 — taverna 12 m², ore non specificate

---

## COLD OPEN

Schermo. Terminale. Una riga che non dovrebbe esistere:

```
EP_N2_63 — WARNING: figlia attribuita a una bambina
```

Non è un errore di sistema. È peggio. È una cosa scritta, firmata, indicizzata, restituita come *fatto* — per settimane — dentro il cervello di GENESIS. Qualcuno aveva dato una figlia a una bambina. Non per malvagità. Per scivolamento. Per accumulo silenzioso di piccole imprecisioni che nessuno aveva fermato perché nessuno le aveva cercate attivamente.

Matteo guarda lo schermo. Poi apre `canon_guard`. Poi aspetta.

---

## ATTO I — Il Cadavere nella Fonte

La sessione #70 nasce da una scoperta scomoda: tre liste di regole divergenti.

`CLAUDE.md`, `BRAIN/RULES.md` (congelato al 2 giugno, settantacinque giorni di deriva silenziosa), e una terza fonte che aveva cominciato a vivere di vita propria. Tre versioni del canone. Tre risposte possibili alla stessa domanda. Un sistema cognitivo che, a seconda di quale file veniva letto per primo, poteva restituire tre versioni diverse della realtà di Matteo.

Questo è il tipo di guasto che non si vede. Non produce crash. Non genera eccezioni. Produce solo un lento spostamento della verità — millimetro per millimetro, commit per commit — fino a quando il sistema smette di essere uno specchio e diventa qualcosa di diverso. Qualcosa di *plausibile ma sbagliato*.

La prima cosa che emerge dall'audit è che A1 e A2 erano già risolti. Il commit `a77256f3` del 28 luglio li aveva chiusi — diciannove giorni prima. Nessuno li aveva verificati, quindi erano rimasti nella lista come *aperti*. Non erano aperti. Erano *non visti*. La distinzione è importante: un sistema che non distingue tra "non fatto" e "non verificato" non è un sistema di controllo — è un registro di intenzioni.

A3 era il pezzo vero.

`canon_guard` su 64 episodi EP_N2 vivi: 8 sporchi. I cinque segnalati nella lista (#57, #59, #60, #63, #64) più tre fuori lista — #01, #13, #52 — che nessuno aveva messo in agenda perché nessuno sapeva che fossero contaminati. Tra le contaminazioni: MIMS descritto come *software*, una fonte citata come `GENESIS/documentation_hallucination_2026` (non esiste, non è mai esistita, è un percorso che il sistema aveva *inventato* e iniziato a trattare come reale), due numeri spacciati per dati verificati — "40-60% di false credenze" e "una sarta ogni mille" — che non avevano una sorgente tracciabile.

E la falla di EP_N2_63. Una bambina a cui era stata attribuita una figlia. Piccolo, in apparenza. Devastante nella logica del sistema: se il RAG restituisce quel fatto, GENESIS costruisce ragionamenti sopra. E i ragionamenti sopra un fatto falso sono falsi con architettura coerente — il tipo di errore più difficile da smontare.

---

## ATTO II — Lo Strumento che Bonifica

`AUTOMATIONS/tools/fix_pilastri_software.py`.

Non è un nome elegante. È un nome preciso. Il tool ha girato su repo e specchio MENTE — che è quello che il RAG rilegge — e ha applicato **40 sostituzioni su 16 file**. Non ha riscritto nulla a mano. Ha eseguito regole: MIMS-come-software → GENESIS, rimozione della fonte fabbricata, cancellazione dei numeri senza sorgente, correzione della falla sulle persone.

Poi `canon_guard` di nuovo. Questa volta: **0 righe** sugli episodi vivi.

Poi il test di non-regressione dell'Architetto sui due concetti incriminati. Entrambi agganciati a GENESIS. Zero violazioni.

Il numero ritirato del #69 merita una riga separata. "_cid = 6 cloni/notte" — scritto nell'episodio precedente, entrato nel canone, sembrava solido. Poi Matteo ha guardato i dati: 0 cloni a similarità 0.80 su 261 critiche. Abbassare la soglia avrebbe fatto girare il merge, sì — ma avrebbe fuso problemi *diversi* tra loro. Avrebbe nascosto guasti reali sotto una coerenza artificiale. Niente merge fuzzy. Il numero è stato ritirato formalmente. Non modificato, non riformulato — **ritirato**. Questo è diverso.

Poi il silenzio: dal 30 luglio al 15 agosto, 17 notti, 0 commit automatici. Il sistema era muto. Non rotto — muto. `night_research.bat` non committava la corsia Nina perché nessuna automazione l'aveva mai presa in carico. B3 aperto da settimane per una ragione semplice: la suddivisione dei compiti tra gli agenti aveva lasciato un corridoio buio. Non un fallimento drammatico. Una dimenticanza strutturale.

La sentinella canone ora gira sull'hash del contenuto — `DATA/audit/content_age.json`. Un `touch` su un file non ringiovanisce più il canone. La firma `_sig()` sull'identificatore di sessione `_cid` è stabile. Sono dettagli di ingegneria che non fanno notizia ma che cambiano la natura del sistema: da un sistema che si *fida della data* a un sistema che si *fida del contenuto*.

---

## ATTO III — Tre Gradini

`SCALA-GENESIS.md` era stato scritto nella sessione #69. Non era mai stato salvato.

Questo tipo di perdita — non un crash, non un errore di sintassi, ma un documento pensato, articolato, e poi non committato — è la versione cognitiva di un pezzo lavorato che cade sul pavimento della taverna. Esiste nell'esperienza, non nel sistema.

È stato ricreato. E nella ricostruzione sono stati saliti tre gradini:

**S0 — FounderOS** gira su `:4100`. Il problema era `better-sqlite3` incompatibile con Node 24 senza VS Build Tools — un blocco che su Windows si trasforma facilmente in un pomeriggio perso tra dipendenze native e compilatori assenti. Aggirato. Il servizio gira.

**S1 — CORE/genesis_db.py**: 8 tabelle. `parent_id` ricorsivo. Costo nel run. Foreign key attive. Non è un database provvisorio — è uno schema che conosce la propria struttura gerarchica e sa quanto costa ogni operazione.

**S2 — CORE/genesis_seed.py**: idempotente. 6 dipartimenti, 12 agenti reali, 7 tool con campo `probe`. L'albero viene restituito da una CTE ricorsiva — una Common Table Expression che percorre la gerarchia degli agenti senza ricorsione applicativa, dentro il motore SQL. È il tipo di scelta che non cambia cosa vedi ma cambia quanto il sistema regge quando scala.

Tre gradini in una sessione che era nata per fare pulizia.

---

## CHIUSURA

C'è qualcosa di specifico nel lavoro di bonifica che lo distingue dal lavoro di costruzione. Quando costruisci, aggiungi. C'è un senso di progressione, di accumulo, di avanzamento misurabile. Quando bonifichi, togli. E quello che togli era lì — indicizzato, restituito, usato — senza che nessuno lo avesse messo deliberatamente.

Il sistema era muto da diciassette notti. Non perché fosse rotto. Perché un corridoio era stato lasciato buio per una suddivisione dei compiti non completata. Il tipo di silenzio che non suona come silenzio — perché le altre parti continuano a girare, i commit automatici continuano su altri rami, la dashboard mostra attività. Solo quel corridoio, buio.

40 sostituzioni su 16 file. Un numero ritirato. Una fonte rimossa che non era mai esistita. Una bambina a cui è stata tolta una figlia inesistente.

GENESIS è al 70%. V32 è al 65%. Il capannone è al 2030.

Il sistema è stato riacceso.

---

## reel_hook

8 episodi sporchi su 64. Una fonte citata 11 settimane che non era mai esistita. Un numero ritirato perché i dati non reggevano. canon_guard: 0 righe. Il sistema era muto da 17 notti — non rotto, solo nessuno aveva acceso quel corridoio. Adesso gira.

---

## FATTI (per il RAG)

- **DECISIONE:** canon_guard ha identificato 8 episodi EP_N2 contaminati su 64 vivi (#57, #59, #60, #63, #64 + fuori lista #01, #13, #52); fix_pilastri_software.py ha applicato 40 sostituzioni su 16 file (repo + specchio MENTE).
- **LOGICA:** tre liste di regole divergenti (CLAUDE.md, BRAIN/RULES.md fermo al 02/06, terza fonte autonoma) producevano risposte canone incoerenti; la fonte `GENESIS/documentation_hallucination_2026` era un percorso inventato indicizzato come reale; EP_N2_63 attribuiva una figlia a una bambina.
- **DECISIONE:** ritirato il numero "_cid = 6 cloni/notte" da EP_69 — 0 cloni a similarità 0.80 su 261 critiche; merge fuzzy a soglia bassa fondeva problemi distinti nascondendo guasti reali.
- **DECISIONE:** sentinella canone ora su hash del contenuto (DATA/audit/content_age.json); un `touch` non ringiovanisce più il canone; firma `_sig()` stabile sul `_cid`.
- **OBIETTIVO:** GENESIS S0 (:4100) + S1 genesis_db.py (8 tabelle, parent_id ricorsivo, FK attive) + S2 genesis_seed.py (6 dipartimenti, 12 agenti, 7 tool con campo probe, CTE ricorsiva) — tre gradini saliti nella stessa sessione di bonifica.
- **LOGICA:** sistema muto 30/07–15/08 (17 notti, 0 commit automatici) per corridoio Nina non assegnato ad alcuna automazione; risolto aggiungendo commit in night_research.bat.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2 · #70 |
| **Data** | 2026-08-16 |
| **Titolo** | *La Bonifica* |
| **Tag** | GENESIS, canone, RAG, bonifica, canon_guard, scala S0-S2 |
| **Stato progetto** | V32 65% · GENESIS 70% |
| **Milestone** | Sessione #70 chiusa — sistema riacceso dopo 17 notti di sil