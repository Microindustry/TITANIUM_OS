<!-- TOC -->

- [TITANIUM_OS  S2E15](#titaniumos-s2e15)
  - [Nina ha un Volto](#nina-ha-un-volto)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema dei Volti Generici](#atto-i-il-problema-dei-volti-generici)
  - [ATTO II  Come si Fissa un Viso](#atto-ii-come-si-fissa-un-viso)
  - [ATTO III  LInventario che Lavora da Solo](#atto-iii-linventario-che-lavora-da-solo)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E15

## "Nina ha un Volto"

*— 2026-07-02 · commit: auto: inventario notturno*

---

## COLD OPEN

È mezzanotte passata e lo schermo mostra un volto.

Non un wireframe. Non un placeholder. Un volto vero — mora, mix colombiana e sud Italia, coda alta, lentiggini sparse sul naso, uno sguardo che non chiede permesso. Matteo non ha disegnato niente. Ha preso decisioni. Tante, precise, alcune sbagliate e poi corrette. Alla fine è rimasto questo viso sullo schermo — e non ce n'è un altro uguale nel progetto.

Il log in basso scorre da solo:

```
[auto] inventario notturno — completato
[auto] night_audit — 2026-07-02 — OK
[auto] story_agent — in coda
```

Il sistema lavora. Lui guarda il volto.

---

## ATTO I — Il Problema dei Volti Generici

Costruire un personaggio AI è più difficile di costruire una macchina.

Con V32, Matteo ha un telaio da 178 kg, quote in disegno, tolleranze IT6-IT7. Ogni decisione è verificabile con un calibro. Con Nina — il personaggio che porta la voce di TITANIUM_OS verso l'esterno — le variabili erano diverse: estetica, identità, coerenza visiva tra sessioni. E i modelli di immagine non sono il CNC: danno output diversi ogni volta che respiri.

Il problema era reale. Sessione dopo sessione, Nina usciva diversa. Bionda, poi bruna, poi con il logo stampato sulla maglietta come un gadget aziendale. Ogni variazione era tecnicamente accettabile, nessuna era *Nina*. Un personaggio senza volto fisso non esiste — è solo un'idea che cambia forma.

La soluzione non è arrivata con un prompt migliore. È arrivata con una decisione di canone.

**Sessione #50, 26-27 giugno 2026**: Matteo blocca `nina_DEFINITIVA`. Un file Markdown in `MENTE/KNOWLEDGE/NINA_DESIGN_DEFINITIVO.md` che non è una descrizione generica — è una specifica tecnica. Mora. Mix colombiana e sud Italia. Coda alta. Lentiggini. Sguardo sicuro. Pipeline: 3D via Gamma con stylePreset 3D, flux-2-klein. Versione vita: giacca denim. Slide_2 come riferimento vincente. NO bionda, NO logo.

Il canone è inderogabile. Come le tolleranze sul mandrino.

---

## ATTO II — Come si Fissa un Viso

La parola tecnica è *ancoraggio*.

In ingegneria, ancorare significa dare un riferimento che non si sposta. Il tastatore di misura su V32 si ancora al pezzo prima di rilevare — senza quel punto fisso, qualsiasi misura è rumore. Con Nina il problema era identico: senza un ancoraggio visivo preciso, ogni generazione era rumore estetico.

La soluzione è stata `nina_genio_1`: l'immagine di riferimento che ora vive come slide_2 nel carosello. Non un concept, non uno sketch. Un file prodotto, scelto tra diverse iterazioni, promosso a standard. Da quel momento, ogni futura Nina viene confrontata con quella slide. Se non regge il confronto, non è Nina.

Il carosello PRE_03 — *I Personaggi* — diventa il primo output concreto di questa decisione. Sei slide. Solo Nina, col volto vero. Gli altri personaggi del cast — VULCAN, il sistema, il capannone — restano simboli e pietre per ora. Non è pigrizia: è sequenza. Prima si fissa il protagonista, poi si popola il mondo.

Le scene riutilizzabili (`Nina/_SCENE`: studio, ponte) completano l'infrastruttura. Non si ridisegna ogni volta la stanza — si mette Nina nella stanza già costruita. Stessa logica dei fixture su V32: il pezzo cambia, il riferimento resta.

---

## ATTO III — L'Inventario che Lavora da Solo

Mentre Matteo guarda il volto di Nina, il sistema conta.

`inventario_notturno.py` è uno script che gira ogni notte senza essere chiamato. Legge lo stato del progetto — V32 al 65%, GENESIS al 70% — e scrive un log. Non decide niente. Non suggerisce. Conta e archivia. Sembra poco.

In realtà è la cosa più difficile che Matteo ha costruito in questo ciclo: un sistema che *sa* dove si trova senza che gli venga chiesto.

Il commit di stanotte — `auto: inventario notturno` — non è una feature nuova. È la conferma che la feature funziona. Il log esiste, è corretto, è datato 2026-07-02. Significa che qualcosa di fragile è diventato stabile. Non spettacolare. Stabile.

V32 è al 65%. GENESIS al 70%. Nina ha un volto. Il sistema sa contare.

Sono tre fatti diversi che descrivono la stessa cosa: il progetto ha una forma. Non è finito — mancano quattro anni al capannone, luglio 2030 — ma ha una forma. I pezzi si riconoscono. Il volto si riconosce.

Questo è quello che succede quando un inventario notturno funziona davvero: non ti dice dove devi andare. Ti dice dove sei.

---

## CHIUSURA

Il volto di Nina rimarrà sullo schermo ancora qualche minuto.

Poi Matteo chiuderà la sessione, il sistema scriverà il log, e domani il commit sarà già nel RAG — un fatto atomico tra migliaia di altri fatti atomici che tengono in piedi questa cosa impossibile che si costruisce in una taverna da 12 m² e in una cartella di Markdown e in una pressa che non ha ancora un nome definitivo per le sue guide.

Nina ha un volto. Il sistema conta. V32 è al 65%.

Si va avanti.

---

## reel_hook

Il modello di immagine dava Nina diversa ogni volta — bionda, brunetta, col logo, senza.
Ho scritto un file Markdown. Ora è una specifica tecnica inderogabile.
Se non regge il confronto con slide_2, non è Nina.
Stesso metodo del calibro su IT6. Prossimo step: gli altri personaggi.

---

## FATTI (per il RAG)

- **DECISIONE:** Bloccato canone visivo Nina in `MENTE/KNOWLEDGE/NINA_DESIGN_DEFINITIVO.md` — mora, mix colombiana+sud Italia, coda alta, lentiggini, sguardo sicuro; pipeline 3D via Gamma (stylePreset 3D, flux-2-klein); slide_2 come riferimento vincolante.
- **LOGICA:** Senza ancoraggio visivo fisso, ogni generazione produceva output incoerenti (bionda/logo/varianti non controllate); il canone funziona come tolleranza di progetto — o corrisponde o è scarto.
- **DECISIONE:** Pipeline immagine: versione vita = giacca denim; scene riutilizzabili in `Nina/_SCENE` (studio, ponte); altri personaggi restano simboli/pietre fino a definizione futura.
- **DECISIONE:** PRE_03 carosello *I Personaggi* = 6 slide, solo Nina col volto vero (nina_DEFINITIVA = nina_genio_1).
- **STATO:** V32 65% / GENESIS 70% al 2026-07-02; `inventario_notturno.py` operativo e autonomo.
- **OBIETTIVO:** Ogni futura generazione Nina viene validata contro slide_2; prossimo step = definizione altri personaggi del cast.

---

| campo | valore |
|---|---|
| **episodio** | S2E15 |
| **data** | 2026-07-02 |
| **commit** | auto: inventario notturno |
| **focus narrativo** | Nina — canone visivo definitivo |
| **stato V32** | 65% |
| **stato GENESIS** | 70% |
| **tag narrativo** | identità / canone / sistema / personaggio |
| **milestone** | Sessione #50 — Nina ha un volto |