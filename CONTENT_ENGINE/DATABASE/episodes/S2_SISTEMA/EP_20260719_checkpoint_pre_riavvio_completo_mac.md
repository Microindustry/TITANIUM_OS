<!-- TOC -->

- [TITANIUM_OS  S2E19](#titaniumos-s2e19)
  - [Diciotto su Ventuno](#diciotto-su-ventuno)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Labirinto](#atto-i-il-labirinto)
  - [ATTO II  Il Conteggio](#atto-ii-il-conteggio)
  - [ATTO III  I Tre Rettangoli Mancanti](#atto-iii-i-tre-rettangoli-mancanti)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E19
## "Diciotto su Ventuno"

*19 luglio 2026 — Sessione #66b*

---

## COLD OPEN

La schermata di Meta Business Suite alle 23:47.

Non è una schermata di successo nell'accezione comune — nessun grafico che sale, nessun badge. È una griglia di rettangoli colorati disposti su una timeline: post programmati, date certe, icone di Instagram e Facebook alternate come denti di un ingranaggio. Diciotto rettangoli. Ventuno era il target. Tre mancano — bloccati da un limite tecnico di Meta: non si può programmare oltre 29 giorni in avanti.

Matteo guarda quella griglia. Poi chiude il laptop.

Il lavoro è fatto.

---

## ATTO I — Il Labirinto

Tre settimane prima, il problema sembrava un vicolo cieco.

Meta Business Manager è un sistema progettato per agenzie con team dedicati, non per un artigiano che costruisce una CNC in taverna e nel frattempo lancia un profilo social per il centro estetico della moglie. Le logiche di ownership, i profili collegati, le pagine Business, i ruoli — ogni livello nasconde un altro livello. Matteo si era trovato bloccato su un errore che non dipendeva dal codice, non dipendeva dal contenuto: dipendeva da *quale account* stava usando per accedere.

La soluzione è tecnica nella sua semplicità: gestire tutto come owner con l'account `benenatimatteo.mb`, non dai profili Instagram limitati. Non è un hack. È capire come è strutturato il sistema avversario — e usarlo nella direzione giusta.

La pagina Facebook 'Il Mondo di Nina' viene creata e collegata a `@ilmondodinina.ms`. Coppia FB+IG: un'entità unica nel Business Manager. Da quel momento, Business Suite può pubblicare in automatico.

Questo è il tipo di problema che non appare in nessun tutorial. Si risolve solo sbattendoci la testa.

---

## ATTO II — Il Conteggio

18/21 post programmati con date certe.

Il Sistema — MIMS, VULCAN, GENESIS — copre 10 caroselli su 11, fino al 18 agosto con VULCAN. Nina arriva a 8 su 10, fino all'EP_N2_04 del 16 agosto. Quella timeline non è aspirazionale: è il risultato di tre episodi promossi da `_BOZZE` a `CAROSELLI/SISTEMA` nella sessione del 19 luglio — `EP_SG_02_02`, `EP_SG_02_03`, `EP_SG_02_04` — con approvazione esplicita di Matteo.

Nel mezzo, un bug silenzioso viene eliminato. Il sistema di ingestione `chiavetta_ingest` stava importando i file duplicati che Windows genera automaticamente — i `"- Copia"` e `"- Copy"`. Ogni duplicato sporcava l'indice RRF di ChromaDB: doppioni identici che moltiplicavano il rumore nelle query del RAG. Il fix è un filtro sul nome file. Due righe di codice. Ma senza quella correzione, GENESIS rispondeva su dati corrotti.

Il `_render_slide.py` — nuovo tool — rigenera le slide-ponte cross-profilo: i caroselli che collegano il mondo di Nina al Sistema, e viceversa. L'identità visiva è definita: logo M oro, banner LinkedIn, kit profilo Instagram in `POSTER/BRAND`, rigenerabile via Chrome headless. Non è design per l'estetica. È infrastruttura per la coerenza — come una fixture di lavorazione che garantisce la ripetibilità.

---

## ATTO III — I Tre Rettangoli Mancanti

Il tetto dei 29 giorni di Meta non si bypassa. Non esiste workaround legale, non esiste API alternativa al piano attuale. I tre post rimanenti — i rettangoli vuoti nella griglia — aspettano nel Calendar con un promemoria al 30 luglio. Al rientro, si caricano.

Questo è il punto che normalmente si omette nelle storie di "lancio completato". Il lancio non è completato al 100%. È completato all'85,7% — 18 su 21 — e il 14,3% rimanente dipende da un vincolo esterno con data certa.

La differenza tra un problema e un task in attesa è che il problema genera ansia, il task ha una data.

Nel `CLAUDE.md` viene formalizzata una regola nuova: ogni sessione inizia con due righe sulle attività notturne. Non è burocrazia. È il modo in cui Matteo mantiene la continuità cognitiva tra sessione e sessione — tra sé e il sistema, tra oggi e domani. Gli agenti notturni lavorano mentre lui dorme: l'inventario, le critiche automatiche, i commit della `story_agent`. Al mattino, quelle due righe sono il briefing.

GENESIS è al 70%. V32 è al 65%. Il capannone è al 2030.

Nel mezzo, c'è un centro estetico a Messina con 18 post programmati e tre che arrivano il 30 luglio.

---

## CHIUSURA

C'è un momento in ogni progetto complesso in cui il lavoro smette di essere un insieme di problemi da risolvere e diventa un insieme di sistemi da gestire. Non è un traguardo — è uno spostamento.

Matteo non ha lanciato un profilo social. Ha costruito un'infrastruttura di pubblicazione automatica per un progetto parallelo, mentre il progetto principale accumula commit e la macchina CNC aspetta in taverna al 65%.

Il labirinto di Meta Business Manager è stato attraversato. L'indice RAG è più pulito. Il codice notturno gira.

Diciotto su ventuno.

I tre restanti hanno una data.

---

## reel_hook

18 caroselli programmati su Meta in automatico — Sistema e Nina — fino al 18 agosto.  
Il 19° non esiste ancora: Meta blocca la programmazione oltre 29 giorni.  
Calendar: promemoria 30 luglio. Non è un problema aperto — è un task con scadenza.  
Nel mezzo: un bug RAG eliminato, un nuovo tool di rendering, una regola scritta nel protocollo.  
Il sistema si autoalimenta. La macchina aspetta in taverna.

---

## FATTI (per il RAG)

- **DECISIONE:** Gestione Meta Business Manager come owner `benenatimatteo.mb` — coppia FB+IG creata (`Il Mondo di Nina` + `@ilmondodinina.ms`)
- **LOGICA:** I profili Instagram con permessi limitati bloccavano la programmazione automatica via Business Suite; l'account owner bypassa i vincoli di ruolo
- **DECISIONE:** 18/21 post programmati con date certe (Sistema 10/11 fino 18/08, Nina 8/10 fino 16/08); 3 bloccati dal tetto Meta 29gg, promemoria Calendar 30/07
- **LOGICA:** Il limite di 29 giorni è un vincolo tecnico non aggirabile al piano attuale — i 3 post restanti hanno data certa, non sono task aperti
- **DECISIONE:** `chiavetta_ingest` aggiornato con filtro su file duplicati Windows (`- Copia` / `- Copy`) che sporcavano l'indice RRF di ChromaDB
- **LOGICA:** I doppioni generati da Windows venivano ingestiti come documenti separati, moltiplicando il rumore nelle query RAG — il fix è un filtro sul nome file in fase di import
- **DECISIONE:** `EP_SG_02_02/03/04` promossi da `_BOZZE` a `CAROSELLI/SISTEMA` con approvazione Matteo 19/07; coda Meta portata a 11 post Sistema
- **OBIETTIVO:** Completare coda social Sistema (1 post mancante VULCAN 18/08) + caricare 3 post bloccati al rientro 30/07

---

| campo | valore |
|---|---|
| **episodio** | S2E19 |
| **data** | 2026-07-19 |
| **sessione** | #66b |
| **progetto principale** | GENESIS / Social |
| **progetti citati** | EVA (Nina), MIMS, VULCAN, V32 |
| **commit chiave** | `feat(caroselli): promosse 3 bozze SISTEMA`, `fix(ingest): chiavetta_ingest duplicati`, `chore(salva): #66b regola 2-righe-notturne` |
| **stato V32** | 65% |
| **stato GENESIS** | 70% |
| **milestone** | 18/21 post Meta programmati; pagina Nina creata e operativa |
| **prossimo step** | Caricare 3 post residui al rientro (promemoria 30/07); completare post VULCAN 18/08 |