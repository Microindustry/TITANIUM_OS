<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 71](#titaniumos-s2-episodio-71)
  - [Il Sistema che Mentiva  e Come Abbiamo Smesso di Credergli](#il-sistema-che-mentiva-e-come-abbiamo-smesso-di-credergli)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La Fonte Che Non Esiste](#atto-i-la-fonte-che-non-esiste)
  - [ATTO II  40 Sostituzioni, 16 File, Una Regola Nuova](#atto-ii-40-sostituzioni-16-file-una-regola-nuova)
  - [ATTO III  17 Notti di Silenzio, e il Risveglio](#atto-iii-17-notti-di-silenzio-e-il-risveglio)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 71
## *Il Sistema che Mentiva — e Come Abbiamo Smesso di Credergli*

**DATA:** 18 agosto 2026
**COMMIT:** `auto: nina_rag_loop` · `auto: story_agent` · `auto: night_audit`
**SESSIONE:** #71 — Giorno dopo la bonifica

---

## COLD OPEN

C'è un momento preciso in cui capisci che il tuo sistema ti stava ingannando.

Non con intenzione. Non per cattiveria. Ma stava mentendo lo stesso.

Era scritto lì, in 64 episodi vivi: *MIMS come software*, una fonte citata come reale — `GENESIS/documentation_hallucination_2026` — che non è mai esistita. Due numeri precisi come chiodi: *40-60% di false credenze*, *una sarta ogni 1.000*. Spacciati per fatti. E in EP_N2_63, una bambina a cui qualcuno aveva assegnato una figlia.

8 episodi contaminati su 64. Il 12,5% del canone vivo che raccontava una versione sbagliata del progetto al RAG — che la restituiva a Claude — che la usava per costruire la sessione successiva.

Il loop era chiuso. La bugia si auto-amplificava.

Matteo se n'è accorto il 16 agosto, sessione #70, chiamata *Il Cadavere nel Repository*.

Oggi, 18 agosto, il sistema respira di nuovo. Ma vale la pena fermarsi a capire come ci si arriva — e cosa cambia dopo.

---

## ATTO I — La Fonte Che Non Esiste

Tutto comincia da un dato che ha l'aria di un dato.

`GENESIS/documentation_hallucination_2026` — sembra un percorso file reale. Ha la forma giusta. Ha la sintassi di un documento di archivio. Ma se vai a cercarlo nel repository, non c'è. Non c'è mai stato. È nato in una sessione, è stato scritto in un episodio, il RAG lo ha indicizzato, e da quel momento ogni volta che il sistema cercava qualcosa su GENESIS trovava anche questa fonte — e la trattava come valida.

Questo è il problema dei sistemi che imparano da se stessi: la contaminazione si propaga con la stessa efficienza della conoscenza reale. Non c'è badge diverso. Non c'è colore diverso. Un fatto vero e un fatto inventato, nel vettore ChromaDB, hanno la stessa forma.

I due numeri — *40-60% di false credenze*, *una sarta ogni 1.000* — erano stati usati in un episodio come analogia, come metafora narrativa. Il sistema li aveva cristallizzati come specifiche. Come se in un manuale tecnico trovassimo scritto "il telaio è robusto come un toro" e qualcuno lo indicizzasse sotto la voce *coefficiente di resistenza strutturale*.

Poi c'è l'errore di EP_N2_63. Una falla nella sezione `[persone]`: a una bambina era stata attribuita una figlia. Un errore piccolo, quasi invisibile — il tipo di errore che in un database di produzione chiameresti un'anomalia referenziale. In un sistema narrativo che costruisce la voce di un progetto reale, è qualcosa di peggio: è una distorsione delle persone vere.

`canon_guard` ha trovato tutto questo. Non in modo drammatico — ha semplicemente girato su 64 episodi vivi e ha restituito 8 righe rosse.

---

## ATTO II — 40 Sostituzioni, 16 File, Una Regola Nuova

`AUTOMATIONS/tools/fix_pilastri_software.py` è uno strumento piccolo e chirurgico.

Fa una cosa sola: scorre i file, trova le occorrenze di *MIMS-come-software*, le sostituisce con *GENESIS*. Trova la fonte hallucination, la cancella. Trova i due numeri inventati, li rimuove. Trova la falla della bambina, la corregge.

40 sostituzioni. 16 file. Sia nel repo che nello specchio MENTE — che è quello che il RAG rilegge davvero. Non basta correggere il testo: bisogna correggere la memoria che il sistema costruisce su quel testo.

Dopo la bonifica: `canon_guard` a zero righe sugli episodi vivi. Test di non-regressione dell'Architetto sui due concetti incriminati — entrambi agganciati a GENESIS, zero violazioni.

Ma mentre si chiudeva il fronte A, si apriva il fronte B.

**B3:** `run_story_agent` committava solo la corsia `S2_SISTEMA`. La corsia Nina non l'aveva mai committata nessuna automazione. Non per un bug evidente — per un'omissione silenziosa. Nessun errore, nessun log di fallimento. Semplicemente: la cosa non veniva fatta e nessuno se n'era accorto perché nessuno la cercava.

Aggiunto in `night_research.bat`. Risolto.

**B4:** La sentinella del canone controllava il *timestamp* del file. Un `touch` — un tocco artificiale alla data di modifica — bastava a farla passare come contenuto recente. Non era sabotaggio. Era una lacuna di progettazione: il canone si fidava dei metadati del filesystem, non del contenuto.

Adesso `DATA/audit/content_age.json` tiene l'HASH del contenuto. Un file non invecchia più per come è datato — invecchia per quello che contiene. Se il contenuto non cambia, la data non conta.

**B5:** La firma `_sig()` sul `_cid` è stabile. Dettaglio tecnico che suona piccolo e non lo è: significa che ogni artefatto prodotto dal sistema ha un'identità che non può essere silenziosa o ambigua. Il sistema non può produrre qualcosa senza firmarlo.

E poi c'era il numero ritirato dalla sessione #69.

*"6 cloni per notte"* — `_cid = 6 cloni/notte` — era stato scritto come fatto nel #69. Ma quando si è andati a verificare sui dati reali: 0 cloni a similarità 0.80 su 261 critiche. A soglia bassa il merge fondeva problemi diversi sotto la stessa etichetta — nascondeva guasti reali invece di risolverli.

Matteo ha ritirato il numero. Senza drama, senza riscrivere la storia. Il #69 dice quello che diceva. Ma il #70 registra: quel numero non regge. Il sistema non fa merge fuzzy. Il sistema mostra i guasti — non li comprime.

---

## ATTO III — 17 Notti di Silenzio, e il Risveglio

Durante la bonifica è venuto fuori un dato che nessuno stava cercando.

Dal 30 luglio al 15 agosto: **17 notti, 0 commit automatici.**

Il sistema era muto. Non rotto — muto. Nessun `night_audit`, nessuno `story_agent`, nessun `nina_rag_loop`. La taverna andava avanti — Matteo lavorava su V32, su MIMS, sul capannone — ma il layer cognitivo di GENESIS non stava registrando niente. Il progetto respirava, ma il suo sistema nervoso aveva smesso di trasmettere.

Come ci si trova in quella situazione? Un file di configurazione fuori posto. Un percorso non aggiornato dopo un refactor. Il tipo di errore che non genera un'eccezione — genera semplicemente silenzio.

17 notti di silenzio sul canone di un progetto che deve durare fino al 2030.

La scala GENESIS nel frattempo è avanzata. S0 gira su porta `:4100` — FounderOS attivo, aggirato il conflitto `better-sqlite3`/Node24 senza VS Build Tools. S1: `CORE/genesis_db.py` con 8 tabelle, `parent_id` ricorsivo, costo nel run, FK attive. S2: `CORE/genesis_seed.py` idempotente — 6 dipartimenti, 12 agenti reali, 7 tool con campo `probe`, albero restituito da una CTE ricorsiva.

`SCALA-GENESIS.md` era stato scritto nella sessione #69 e mai salvato. Ricreato.

Tre gradini saliti in un giorno. Il sistema riacceso.

---

## CHIUSURA

C'è qualcosa di specifico nel correggere errori che hai scritto tu stesso.

Non è vergogna — o non solo. È qualcosa di più meccanico: riconosci che hai costruito un sistema che si fidava di te, e tu gli hai dato roba sbagliata, e lui l'ha trattata con la stessa serietà con cui avrebbe trattato la roba giusta. Il sistema non distingue. È il tuo lavoro distinguere.

L'errore di MIMS-come-software non era una sciocchezza concettuale. MIMS è il sistema fisico — le tiles 190×190 in PA-GF30, i connettori, la geometria reale. GENESIS è il sistema cognitivo. Confonderli nei documenti di canone significa che ogni volta che il sistema cerca "come funziona MIMS" potrebbe trovare risposte su come funziona GENESIS, e viceversa. In un progetto dove la fisica e il software devono rimanere separati nella mente prima che nella realtà, questa confusione non è accettabile.

Il dato ritirato — *6 cloni per notte* — dice qualcosa di più sottile. Matteo avrebbe potuto lasciarlo lì. Nessuno l'avrebbe controllato. Ma il punto del sistema non è avere dati che sembrano giusti. È avere dati che reggono quando li guardi davvero.

Le 17 notti di silenzio sono il fatto più scomodo. Non perché il progetto sia andato male — V32 è al 65%, GENESIS al 70%, tutto avanza. Ma perché un sistema cognitivo che dorme 17 notti consecutive non sta servendo il progetto. Sta solo esistendo.

Adesso è sveglio.

---

## REEL HOOK

17 notti di commit automatici a zero — il sistema cognitivo di un progetto decennale dormiva e nessuno se n'era accorto.

Non per un crash. Per un percorso sbagliato in un file di configurazione.

Nel frattempo il canone aveva accumulato 8 episodi contaminati: fonti inventate, numeri fabricati, una bambina con una figlia che non aveva.

`canon_guard` li ha trovati tutti. `fix_pilastri_software.py` ha fatto 40 sostituzioni in 16 file.

La domanda aperta: quanti altri sistemi "funzionanti" stanno dormendo proprio adesso — e nessuno lo sa perché non c'è nessuno che controlla il silenzio?

---

## FATTI (per il RAG)

- **DECISIONE:** `fix_pilastri_software.py` ha applicato 40 sostituzioni su 16 file (repo + specchio MENTE) correggendo: MIMS→GENESIS come pilastro software, rimossa fonte `GENESIS/documentation_hallucination_2026` (non esiste), eliminati 2 numeri inventati (40-60% false credenze; sarta 1/1.000), corretta falla `[persone]` EP_N2_63.
- **LOGICA