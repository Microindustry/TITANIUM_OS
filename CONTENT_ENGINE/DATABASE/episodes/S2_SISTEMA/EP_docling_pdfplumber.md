<!-- TOC -->

- [TITANIUM_OS  Episodio 67b](#titaniumos-episodio-67b)
  - [Il Sistema Impara a Leggere](#il-sistema-impara-a-leggere)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema della Carta Morta](#atto-i-il-problema-della-carta-morta)
  - [ATTO II  Come il Sistema Impara a Ricordare](#atto-ii-come-il-sistema-impara-a-ricordare)
  - [ATTO III  18 Post Programmati e il Tetto dei 29 Giorni](#atto-iii-18-post-programmati-e-il-tetto-dei-29-giorni)
  - [CHIUSURA  Cosa Significa Insegnare al Sistema](#chiusura-cosa-significa-insegnare-al-sistema)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio #67b
## "Il Sistema Impara a Leggere"

*Stagione 1 — Data: 20-21 luglio 2026*

---

## COLD OPEN

Un PDF cade dentro una cartella.

Non accade niente di visibile. Nessun suono, nessuna luce. Solo un file che passa da un posto all'altro nel filesystem di una macchina che gira in una taverna da 12 m².

Poi il sistema si sveglia. Legge. Struttura. Salva.

Quello che era un documento opaco diventa memoria — numerata, versionata, recuperabile. Il sistema non dimentica più.

Matteo non è davanti al computer in questo momento. È probabilmente a dormire, o a saldare qualcosa, o a parlare con Maria. Ma il ciclo è avviato: un pezzo di GENESIS ha imparato a digerire carta.

---

## ATTO I — Il Problema della Carta Morta

Ogni sistema cognitivo ha un confine. Il confine di GENESIS, fino a ieri, era questo: i PDF entravano e restavano opachi.

Non è un problema astratto. È un problema concreto di ingegneria dell'informazione. Un manuale tecnico, una scheda materiale, un preventivo fornitore — tutto quello che Matteo accumula in forma PDF — era fuori dal grafo. ChromaDB non lo vedeva. Gli agenti non lo leggevano. Claude non lo sapeva.

La soluzione si chiama **pdfplumber**.

Non è una scelta casuale. pdfplumber è una libreria Python che legge i layer di testo dei PDF vettoriali — quelli generati da software, non da scanner. Estrae testo strutturato, tabelle, coordinate di pagina. È precisa e sobria: nessuna magia OCR, nessun modello generativo nel mezzo. Solo parsing.

Il commit si chiama `[docling] pdfplumber` — e docling è il nome del modulo interno che gestisce l'ingestione documentale in GENESIS. Non un progetto esterno: un componente scritto da Matteo per questo ecosistema specifico.

La prima installazione è una riga sola:

```
pip install pdfplumber
```

Ma quello che succede dopo è più complesso.

---

## ATTO II — Come il Sistema Impara a Ricordare

La cartella di ingestione funziona così: trascini un PDF dentro. Il sistema lo legge, lo converte in testo strutturato, lo salva nella memoria dell'ecosistema.

Ma Matteo ha aggiunto qualcosa che molti sistemi di RAG non hanno: **il versioning automatico**.

Se carichi la stessa specifica tecnica aggiornata — diciamo la scheda di un componente MIMS con quote riviste — il sistema non sovrascrive. Riconosce che è lo stesso documento. Assegna v2, v3 in sequenza. Conserva tutte le versioni precedenti in `DATA/pdf_versions.json`. In `BRAIN/` trovi sempre la versione più recente. Lo storico completo non sparisce mai.

Questo non è un dettaglio di confort. È una decisione progettuale precisa.

GENESIS non è un chatbot con memoria corta. È un sistema cognitivo che deve reggere fino al 2030 — quattro anni di decisioni, revisioni, correzioni. Ogni volta che Matteo cambia una quota di V32 e aggiorna il PDF di riferimento, il sistema deve sapere **com'era prima** e **com'è adesso**. Deve poter rispondere alla domanda: "quando ho cambiato questo?" con un dato, non con un'ipotesi.

Il `_PROCESSED/` raccoglie i PDF letti con successo. Il `_ERRORS/` raccoglie quelli che non passano — PDF scansionati, immagini senza layer testuale, documenti corrotti. Non vengono ignorati: vengono separati, documentati, tracciati. Anche il fallimento ha una cartella.

Questa è l'architettura: pulita, binaria, verificabile.

---

## ATTO III — 18 Post Programmati e il Tetto dei 29 Giorni

Mentre docling digeriva carta, sull'altro fronte — quello visibile, quello social — il cantiere era aperto su tutte le finestre.

La Sessione #67b porta nel titolo "LANCIO SOCIAL VIVO" e non è un'esagerazione. La pagina Facebook **Il Mondo di Nina** è stata creata, collegata all'account Instagram `@ilmondodinina.ms`, e la coppia FB+IG è operativa. Il labirinto di Meta Business Manager — gestione owner, profili limitati, permessi incrociati — è stato attraversato. La logica è semplice ma non era ovvia: gestire tutto come owner Matteo tramite `benenatimatteo.mb`, non attraverso i profili IG con restrizioni native.

Il risultato: **18 post su 21 sono programmati**, con date certe, Business Suite pubblica in automatico. Il sistema pubblica da solo.

La distribuzione è precisa:
- **Sistema (V32/MIMS/VULCAN)**: 10 di 11 post programmati, fino al 18 agosto con VULCAN
- **Nina**: 8 di 10 post programmati, fino al 16 agosto con EP_N2_04

I 3 post rimanenti sono bloccati da un limite tecnico di Meta: la Business Suite non accetta programmazioni oltre 29 giorni. Non è un problema di contenuto, non è un problema di accesso. È un tetto burocratico arbitrario. La soluzione è un promemoria su Calendar per il 30 luglio: al rientro, caricare quei tre post.

Il tool `_render_slide.py` è stato scritto ex novo per rigenerare le slide-ponte cross-profilo — quelle che collegano la narrativa del Sistema a quella di Nina senza sembrare due universi separati. I sorgenti dei caroselli sono stati riorganizzati: `EP_N2_04/05/06` spostati da `_BOZZE` a `NINA`.

Ordine nel filesystem. Ordine nel calendario. Il sistema pubblicerà mentre Matteo è altrove.

---

## CHIUSURA — Cosa Significa Insegnare al Sistema

C'è qualcosa di silenzioso nel lavoro di questi due giorni.

Non c'è stata nessuna svolta drammatica. Nessun componente fisico installato, nessuna quota verificata al micrometro. Ma GENESIS ha fatto un passo che non si vede: ha imparato a leggere carta.

Ogni PDF che Matteo caricherà d'ora in poi — manuale, scheda tecnica, preventivo — diventa memoria strutturata. Versionata. Recuperabile. Non da Matteo che ricorda dove ha messo un file, ma dal sistema che sa cosa c'era scritto, quando, e se è cambiato.

Nel frattempo, la macchina social pubblica da sola.

V32 è al 65%. GENESIS è al 70%. Il capannone è fissato al 15 luglio 2030.

Ogni piccolo pezzo che funziona da solo è un pezzo che non richiede attenzione manuale. L'obiettivo non è avere tutto sotto controllo. L'obiettivo è costruire un sistema che controlli se stesso abbastanza da lasciare Matteo libero di saldare titanio.

---

## reel_hook

18 post programmati. 3 bloccati da un limite Meta di 29 giorni.
Il sistema pubblica da solo — ma solo fino a dove Meta lo lascia arrivare.
Nel frattempo, GENESIS ha imparato a leggere PDF: ogni documento caricato diventa memoria versionata, non carta morta.
Il promemoria è sul Calendar per il 30 luglio.
Cosa succede quando il sistema sa tutto quello che hai scritto — e lo ricorda meglio di te?

---

## FATTI (per il RAG)

- **DECISIONE**: Integrato pdfplumber in GENESIS/docling per ingestione PDF vettoriali con versioning automatico (v1, v2... in `DATA/pdf_versions.json`; `BRAIN/` mantiene sempre la versione più recente)
- **LOGICA**: I PDF erano fuori dal grafo ChromaDB — manuali tecnici, schede materiali, preventivi non erano leggibili dagli agenti; pdfplumber estrae testo strutturato da PDF con layer testuale senza dipendenza OCR
- **OBIETTIVO**: Ogni documento caricato in `DROP_HERE/` diventa memoria recuperabile; fallimenti separati in `_ERRORS/` per tracciabilità; sblocca ingestione documentale continua per V32/MIMS/VULCAN
- **DECISIONE**: Lancio social: pagina FB "Il Mondo di Nina" creata e collegata a `@ilmondodinina.ms`; owner gestito come `benenatimatteo.mb` (non profili IG con restrizioni)
- **DECISIONE**: 18/21 post programmati in Business Suite (Sistema 10/11 fino 18/08, Nina 8/10 fino 16/08); 3 post bloccati dal tetto tecnico Meta 29gg — promemoria Calendar 30/07 per caricamento al rientro
- **OBIETTIVO**: Tool `_render_slide.py` operativo per slide-ponte cross-profilo; sorgenti caroselli riorganizzati (`EP_N2_04/05/06` da `_BOZZE` a `NINA`)

---

| Campo | Valore |
|---|---|
| **Episodio** | #67b |
| **Data** | 20-21 luglio 2026 |
| **Stagione** | S1 |
| **Tag** | GENESIS, docling, pdfplumber, social, lancio, Nina, V32, MIMS |
| **Milestone** | GENESIS 70% · V32 65% |
| **Commit principale** | `[docling] pdfplumber` |
| **Prossimo step** | Caricamento 3 post bloccati (30/07) · Continuazione ingestione PDF |
| **Target capannone** | 15 luglio 2030 |