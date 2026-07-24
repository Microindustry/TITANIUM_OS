<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 68b](#titaniumos-s2-episodio-68b)
  - [Il Sistema Pubblica da Solo](#il-sistema-pubblica-da-solo)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Labirinto che Non Sapevi Stesse per Chiudersi](#atto-i-il-labirinto-che-non-sapevi-stesse-per-chiudersi)
  - [ATTO II  18 su 21](#atto-ii-18-su-21)
  - [ATTO III  La Notte che Lavora da Sola (Terza Volta)](#atto-iii-la-notte-che-lavora-da-sola-terza-volta)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 68b
## "Il Sistema Pubblica da Solo"

*23 luglio 2026*

---

## COLD OPEN

Il telefono di Matteo è sul tavolo della cucina, schermo spento.

Sono le 23 e qualcosa. La taverna è buia. Maria dorme. Nessuno sta guardando niente.

E in quel momento — senza che nessuno prema nulla — Meta Business Suite carica il trentacinquesimo post programmato. Un carosello. Tre slide. Il Sistema, nelle righe di testo scritte da Matteo tre giorni prima, racconta qualcosa di VULCAN a gente che non lo conosce ancora.

Il telefono non squilla. Non arriva nessuna notifica.

Il lavoro è già fatto.

---

## ATTO I — Il Labirinto che Non Sapevi Stesse per Chiudersi

Tre settimane fa, aprire una pagina Facebook sembrava una cosa da venti minuti.

Non lo era.

Meta Business Manager ha una geometria propria, fatta di account pubblicitari annidati dentro Business Portfolio annidati dentro profili personali, dove ogni operazione che provi a fare come "utente normale" ti rimanda a uno schermo grigio con su scritto *"Non hai i permessi per questa azione"*. Matteo ci è entrato come Matteo Benenati. Poi come benenatimatteo.mb. Poi come owner del portfolio MIMS. Tre identità diverse, tre set di permessi diversi, nessuno dei quali — da solo — faceva quello che serviva.

La soluzione non era tecnica nel senso classico del termine. Era procedurale: capire *come* Meta vuole che tu sia, in quale ruolo, in quale momento. Il profilo giusto era benenatimatteo.mb, gestito come owner. Non i profili Instagram limitati che sembravano più naturali da usare. Quella distinzione — una riga in un menu a tendina — era il cancello.

Sessione #67b, 20-21 luglio: il cancello si apre.

La pagina *Il Mondo di Nina* nasce. Viene collegata a @ilmondodinina.ms. La coppia FB+IG esiste. Non come bozza, non come test — come entità reale con una struttura di pubblicazione.

---

## ATTO II — 18 su 21

Il numero che conta non è quante ore ci hanno voluto. Il numero è **18/21**.

Diciotto post su ventuno hanno una data certa. Business Suite li pubblica in automatico. Non servono sveglie, non serve che Matteo sia davanti al computer, non serve che si ricordi di niente.

Il sistema di contenuto ha una sua timeline interna: **Sistema 10/11** (fino al 18 agosto, VULCAN come protagonista), **Nina 8/10** (fino all'EP_N2_04, 16 agosto). Ogni slot ha una slide, ogni slide ha una fonte. Il tool `_render_slide.py` è stato riscritto per generare materiale cross-profilo — la stessa bozza può diventare un post Sistema o un post Nina con parametri diversi, senza rifare tutto da capo.

Le sorgenti dei caroselli EP_N2_04, EP_N2_05, EP_N2_06 sono state spostate da `_BOZZE` a `NINA`. Non è un dettaglio di filesystem. È la differenza tra materiale che esiste e materiale che *appartiene a qualcosa*.

I tre post rimanenti — i bloccati — non sono bloccati per un problema di contenuto. Sono bloccati dal tetto dei 29 giorni di Meta: non puoi programmare oltre un certo orizzonte. Il promemoria nel Calendar dice **30 luglio**. Quando Matteo rientrerà, saranno tre click.

---

## ATTO III — La Notte che Lavora da Sola (Terza Volta)

Alle 23 del 23 luglio, quando Matteo ha smesso di toccare il computer, sono partiti tre commit automatici.

```
auto: inventario notturno + critiche
auto: night_audit - cartella clinica 23/07/2026
auto: story_agent - episodi generati 23/07/2026
```

È la stessa sequenza dell'Ep. 65. La stessa dell'Ep. 67. La stessa dell'Ep. 68.

C'è qualcosa di strano nel vederla ripetersi — non nel senso che sorprende, ma nel senso opposto: è diventata normale. GENESIS fa l'inventario, aggiorna la cartella clinica del progetto, genera le storie. Nessuno ha chiesto di farlo stanotte. Lo fa perché è stato costruito per farlo.

V32 è al 65%. GENESIS è al 70%. Il capannone è ancora lontano — luglio 2030, quattro anni — e di mezzo ci sono ancora il corpo in Epoxy Granite, le guide lineari, il mandrino, VULCAN con i suoi cilindri-guida, MIMS con le tiles PA-GF30.

Ma stanotte, mentre il sistema committa e Meta pubblica e il telefono sul tavolo della cucina non squilla, c'è qualcosa che funziona già.

Non è una promessa. È un dato nel log.

---

## CHIUSURA

C'è una domanda che Matteo non si fa spesso, ma che ogni tanto emerge: a che punto diventa un sistema e smette di essere una collezione di script?

Non c'è una risposta pulita. Forse quando smetti di doverti fidare della tua memoria per ricordare cosa deve succedere stanotte. Forse quando il lavoro che hai fatto tre giorni fa arriva a qualcuno che non ti conosce, senza che tu faccia nulla.

Tre commit automatici. Diciotto post programmati. Un cancello di permessi che si è aperto dopo ore di labirinto.

Nessuno di questi era garantito. Tutti e tre sono successi nella stessa settimana.

Il sistema è al 70%. Il che significa che il 30% mancante è ancora territorio sconosciuto — pezzi che non si connettono ancora, agenti che non parlano ancora tra loro, dati che non fluiscono ancora dove devono andare.

Ma il 70% funziona stanotte. Da solo. Nel buio della cucina.

---

## reel_hook

18 post programmati su Meta. Business Suite li pubblica da sola, Matteo dorme.

Il problema non era fare i contenuti — era capire in quale profilo Meta dovevi essere per avere i permessi giusti. Un menu a tendina. Ore di labirinto.

Tre giorni dopo, GENESIS committa l'inventario notturno, aggiorna la cartella clinica del progetto e genera questa storia. Senza che nessuno premi nulla.

Il sistema è al 70%. Il 30% mancante — quello lo scopriamo.

---

## FATTI (per il RAG)

- **DECISIONE:** Pagina Facebook *Il Mondo di Nina* creata e collegata a @ilmondodinina.ms usando il profilo owner benenatimatteo.mb (non i profili IG limitati) — Sessione #67b, 20-21 luglio 2026.
- **LOGICA:** Meta Business Manager assegna permessi diversi a seconda del ruolo e del profilo con cui si opera; il profilo owner del portfolio MIMS era l'unico con accesso completo alle funzioni di pubblicazione programmata.
- **DECISIONE:** 18/21 post programmati con date certe in Business Suite (Sistema 10/11 fino 18/08, Nina 8/10 fino 16/08); 3 post bloccati dal tetto 29gg Meta, promemoria Calendar al 30/07.
- **DECISIONE:** Tool `_render_slide.py` riscritto per generare slide cross-profilo; sorgenti EP_N2_04/05/06 spostate da `_BOZZE` a `NINA`.
- **OBIETTIVO:** Al rientro (30/07), caricare i 3 post rimanenti — chiude il piano editoriale fino al 18/08 senza interventi manuali giornalieri.
- **STATO:** V32 65%, GENESIS 70% al 23/07/2026; commit notturni automatici (inventario + night_audit + story_agent) confermati attivi sulla sequenza giornaliera.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2 · EP_20260723 |
| **Data** | 23 luglio 2026 |
| **Progetto principale** | EVA / GENESIS (social automation) |
| **Sessione di riferimento** | #67b (20-21/07/2026) |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Tag** | `social`, `automation`, `meta`, `EVA`, `nina`, `contenuti`, `programmazione` |
| **Prossimo step** | Caricare 3 post bloccati entro 30/07/2026 |