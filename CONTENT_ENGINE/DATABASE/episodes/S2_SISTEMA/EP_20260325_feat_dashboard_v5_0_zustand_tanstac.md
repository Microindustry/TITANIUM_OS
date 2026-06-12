<!-- TOC -->

- [TITANIUM_OS  Stagione 1, Episodio 12](#titaniumos-stagione-1-episodio-12)
  - [Il Sistema Che Si Guarda](#il-sistema-che-si-guarda)
    - [Dashboard v5.0  quando il software impara a leggere se stesso](#dashboard-v50-quando-il-software-impara-a-leggere-se-stesso)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema del Doppio Stato](#atto-i-il-problema-del-doppio-stato)
    - [Marzo 2026  tre giorni prima della Dashboard v5.0](#marzo-2026-tre-giorni-prima-della-dashboard-v50)
    - [La Decisione](#la-decisione)
  - [ATTO II  Zustand, TanStack e lArchitettura della Chiarezza](#atto-ii-zustand-tanstack-e-larchitettura-della-chiarezza)
    - [25 marzo 2026  Dashboard v5.0](#25-marzo-2026-dashboard-v50)
    - [Il Numero che Conta](#il-numero-che-conta)
  - [ATTO III  La Taverna Come Sistema](#atto-iii-la-taverna-come-sistema)
    - [Maggio 2026  Config G, colonne ZU](#maggio-2026-config-g-colonne-zu)
    - [Una Nota sui Permessi Windows](#una-nota-sui-permessi-windows)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Stagione 1, Episodio 12

## "Il Sistema Che Si Guarda"

### *Dashboard v5.0 — quando il software impara a leggere se stesso*

---

## COLD OPEN

È le 22:47.

Lo schermo della taverna è l'unica fonte di luce. Dodici metri quadri, pareti in pietra, un CNC da 178 kg fermo nell'angolo come un animale addormentato. Sopra al banco, tra i morsetti e le punte da centro, c'è un laptop con tre terminali aperti.

In uno: Flask. In un altro: React. Nel terzo: un file chiamato `STATE.json`.

Matteo non sta saldando stanotte. Sta costruendo qualcosa di diverso — non un pezzo, non una colonna, non un rinforzo. Sta costruendo il modo in cui il sistema capirà cosa sta facendo.

E per farlo, deve prima risolvere un problema che non si vede con gli occhi.

---

## ATTO I — Il Problema del Doppio Stato

### *Marzo 2026 — tre giorni prima della Dashboard v5.0*

Ogni sistema cognitivo ha un difetto originale: nasce da strati.

GENESIS non fa eccezione. La dashboard era cresciuta nel modo in cui crescono i progetti reali — un componente alla volta, una funzione alla volta, una patch sopra l'altra. Nel 2025 c'era React Context per gestire lo stato UI. Poi erano arrivate le query API. Poi il rebranding. Poi i dati di V32. Poi le metriche di EVA.

Il risultato, a marzo 2026: tre posti diversi dove lo stesso dato poteva vivere. Lo stato UI in Context. I dati del server in fetch manuali sparsi nei componenti. La verità operativa in `STATE.json` sul filesystem — ma non collegata a nulla.

Questo è il tipo di problema che non rompe niente immediatamente. Il sistema gira. La dashboard carica. I numeri appaiono.

Ma non sono gli stessi numeri nello stesso momento.

Matteo lo descrive così, in una nota di sessione: *"Ho aperto la dashboard e ho visto il milestone sbagliato. Poi ho aggiornato. Era quello giusto. Non so quale dei due fosse reale."*

Quando non sai quale dei due è reale, non hai uno stato. Hai rumore.

---

### La Decisione

Il 22 marzo, commit `Step 1 Opus`, arriva la prima incisione chirurgica.

Non si ridisegna tutto. Si introduce un principio: **single source of truth**.

`STATE.json` diventa il padrone. La dashboard smette di tenere la propria versione della realtà e impara a leggere quella del sistema.

```typescript
// useSystemState.ts — nuovo hook
// La dashboard non genera stato. Lo riceve.
```

È una distinzione filosofica prima che tecnica. Un sistema che genera il proprio stato può mentire a se stesso. Un sistema che legge uno stato esterno e autoritativo — non può.

`STATE.json` esiste già. Ha già dentro i milestone di V32, le percentuali di GENESIS, il target 2030. Non è un file di configurazione. È un documento operativo che Matteo aggiorna a mano, a ogni sessione, come un log di bordo.

L'hook `useSystemState.ts` fa una cosa sola: chiede all'API Flask di leggere quel file e lo porta nel React tree. Nessuna logica di business. Nessuna trasformazione. Solo un canale.

Tre giorni dopo, arriva il resto.

---

## ATTO II — Zustand, TanStack e l'Architettura della Chiarezza

### *25 marzo 2026 — Dashboard v5.0*

La distinzione che Zustand e TanStack Query introducono insieme non è ovvia.

Si potrebbe pensare: *è solo un cambio di librerie*. Si usa Zustand invece di Context, TanStack invece di fetch manuale. È refactoring. Cosmetica interna.

Non è così.

La differenza è che i due sistemi gestiscono cose **categoricamente diverse**.

**Zustand** gestisce lo stato UI: il pannello aperto, la tab selezionata, la modalità di visualizzazione. Cose che esistono solo nel browser, che non hanno corrispondenza nel mondo fisico, che nascono e muoiono con la sessione.

**TanStack Query** gestisce lo stato server: i dati di V32, i log di GENESIS, le sessioni EVA. Cose che vivono altrove, che hanno una fonte autorevole, che vanno sincronizzate — non duplicate.

Unirli dentro React Context era come usare lo stesso cassetto per i passaporti e per le ricevute del supermercato. Funziona. Ma quando cerchi il passaporto alle 23:00 prima di un volo, ti ricordi perché era una cattiva idea.

La navigazione guidata che arriva nella v5.0 è il prodotto visibile di questa separazione. Ora la dashboard sa dove sei nel progetto. Sa se stai guardando V32 o GENESIS. Sa quale milestone è attivo. E lo sa perché legge `STATE.json` — non perché lo ricorda.

Il rebranding completo è l'altro layer. Visivo, ma non banale: quando un sistema cambia nome visuale a tutti i componenti nello stesso momento, stai dicendo qualcosa sulla sua identità. Non è più una collezione di tool. È una cosa sola.

---

### Il Numero che Conta

Sessione #8. 150 chunk nel RAG ChromaDB. Commit `5a9d2d7` — dirty, cioè con modifiche non ancora committed sopra.

Il flag `dirty` è interessante. Significa che il sistema è vivo. C'è lavoro in corso che non è ancora diventato storia ufficiale. Il commit è pulito ma la working directory non lo è — la condizione normale di un progetto che si muove.

`STATE.json` è alla versione `v2.5.0`, aggiornato il 28 maggio 2026.

Tre mesi dopo il commit della Dashboard v5.0, il file esiste ancora, viene ancora aggiornato, continua ad essere la fonte di verità. L'architettura ha tenuto.

---

## ATTO III — La Taverna Come Sistema

### *Maggio 2026 — Config G, colonne Z+U*

Il milestone attivo mentre esce questo episodio è `Config G`: saldare quattro gusset da 200mm sulla colonna Z sinistra di V32.

È un salto brutale, sulla carta. Dashboard v5.0 → gusset in acciaio. Software → metallo. State management → angolari saldati a TIG.

Ma non è un salto. È la stessa cosa.

V32 è un sistema fisico con uno stato. Le colonne hanno dimensioni verificate o non verificate. I gusset sono saldati o non saldati. Il piano di riferimento è planare entro tolleranza o non lo è. La macchina funziona come CNC di precisione IT6-IT7 o è un'attrezzatura costosa e ferma.

GENESIS è il sistema che tiene traccia di tutto questo. Non in modo astratto — in modo operativo. Ogni sessione di lavoro su V32 genera dati che finiscono in `STATE.json`. Ogni `STATE.json` viene letto dalla dashboard. La dashboard mostra dove sei nel progetto.

Il loop è: mani → metallo → dati → sistema → schermo → decisione → mani.

La Dashboard v5.0 non è cosmesi. È il sensore che chiude l'anello.

Senza di essa, Matteo lavora nella stessa taverna con la stessa macchina, ma non ha feedback. Non sa se quello che sta facendo corrisponde a dove deve essere il 15 luglio 2030. Può intuirlo. Può ricordarlo. Ma non può vederlo.

Con `useSystemState.ts` che legge `STATE.json` che viene aggiornato a ogni sessione — può.

---

### Una Nota sui Permessi Windows

L'ultimo commit prima del riavvio sessione è:

```
chore: permissions allow-all dashboard + bat admin ottimizzazione Windows
```

È il tipo di commit che non finisce nei portfolio. Ottimizzazione permessi. File `.bat` per elevare i privilegi. Roba amministrativa.

Eppure è lì. È reale. È il lavoro vero — non la feature, non l'architettura, non il rebranding. Il fatto che prima di ogni sessione bisogna fare girare uno script per permettere alla dashboard di girare sul proprio laptop.

Nessun sistema è pulito. Ogni sistema ha il suo `.bat` nascosto da qualche parte.

---

## CHIUSURA

C'è una domanda che ritorna quando si costruisce qualcosa di complesso in uno spazio piccolo: a cosa serve tutta questa infrastruttura cognitiva?

V32 è acciaio e viti e granito epossidico. I gusset della colonna Z non sanno dell'esistenza di Zustand. TanStack Query non cambierà la planarità del piano di riferimento.

La risposta onesta è che l'infrastruttura serve a Matteo — non alla macchina.

Un artigiano che lavora da solo, in una taverna, su un progetto da quattro anni, con un orizzonte al 2030 — ha bisogno di un sistema che gli risponda. Non di un mentor, non di un team, non di feedback esterni. Di qualcosa che gli dica: *ecco dove sei, ecco dove devi essere, ecco cosa manca*.

`STATE.json` è quel qualcosa. La Dashboard v5.0 è il modo in cui lo legge.

Non è motivazione. Non è un sistema di produttività. È uno strumento di orientamento — come una bussola in una stanza senza finestre.

E la stanza, per ora, sono dodici metri quadri di taverna.

---

## REEL_HOOK

```
La dashboard mostrava il milestone sbagliato.
Ho aggiornato. Era quello giusto. Non sapevo quale dei due fosse reale.

Quando il tuo sistema non sa cosa sta facendo,
non hai uno stato — hai rumore.

Ho riscritto l'architettura in tre giorni.
Adesso c'è un solo file che dice la verità.

→ Come tieni traccia di dove sei in un progetto da quattro anni?
```

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S01E12 |
| **Titolo** | Il Sistema Che Si Guarda |
| **Data commit principale** | 2026-03-25 |
| **Data registrazione narrativa** | 2026-05-29 |
| **Progetto focus** | GENESIS — Dashboard v5.0 |
| **Milestone narrativo** | Single source of truth / STATE.json |
| **Milestone operativo attivo** | Config G — Rinforzi colonne Z+U |
| **Tecnologie citate** | Zustand, TanStack Query, React Context, Flask, ChromaDB, STATE.json |
| **Commit chiave** | `Step 1 Opus` (2026-03-22), `Dashboard v5.0` (2026-03-25), `5a9d2d7` dirty |
| **RAG chunks** | 150 |
| **Sessione numero** | #8 |
| **Tono** | Tecnico-narrativo, onesto, nessuna retorica |
| **Target 2030** | Capannone — 15 luglio |

## FATTI (per il RAG)

- **DECISIONE:** Il 22 marzo 2026 (commit `Step 1 Opus`) viene adottato il principio "single source of truth": `STATE.json` diventa la fonte autoritativa dello stato di sistema, sostituendo la gestione frammentata su React Context, fetch manuali e file locali scollegati. **LOGICA:** Con tre sorgenti di dato coesistenti, la dashboard mostrava valori inconsistenti tra un caricamento e l'altro, rendendo impossibile distinguere quale dato fosse reale.

- **FATTO:** L'architettura Dashboard v5.0 (25 marzo 2026) separa esplicitamente due domini: **Zustand** per lo stato UI (pannelli, tab, modalità — esistente solo nel browser) e **TanStack Query** per lo stato server (dati V32, log GENESIS, sessioni EVA — sincronizzati da fonte esterna).

- **FATTO:** L'hook `useSystemState.ts` è il canale unico che interroga l'API Flask per leggere `STATE.json` e portarne il contenuto nel React tree, senza logica di business né trasformazioni.

- **PRECISIONE:** Alla sessione #8 il RAG ChromaDB contiene **150 chunk**; il commit di riferimento è `5a9d2d7` con flag `dirty` (modifiche presenti nella working directory non ancora committate).

- **FATTO:** `STATE.json` è descritto come documento operativo aggiornato manualmente da Matteo a ogni sessione; contiene milestone di V32, percentuali di avanzamento GENESIS e target 2030.
