<!-- TOC -->

- [EP_AUTO_08  Milestone](#epauto08-milestone)
    - [Content Engine v2 - 22 episodi  dual-pass haiku/sonnet  da](#content-engine-v2---22-episodi-dual-pass-haikusonnet-da)
- [IL SISTEMA  Episodio 22](#il-sistema-episodio-22)
  - [La macchina che scrive se stessa](#la-macchina-che-scrive-se-stessa)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima che esistesse la memoria](#atto-i-prima-che-esistesse-la-memoria)
  - [ATTO II  Ventidue episodi e il doppio passaggio](#atto-ii-ventidue-episodi-e-il-doppio-passaggio)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_08 — Milestone
### "Content Engine v2 - 22 episodi + dual-pass haiku/sonnet + da"

---
id: EP_AUTO_08
title: "Content Engine v2 - 22 episodi + dual-pass haiku/s"
sottotitolo: "La storia documentata"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-03-22
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Content Engine v2 - 22 episodi + dual-pass haiku/sonnet + dataset.jsonl (22 Mar 2026)"
---

# IL SISTEMA — Episodio 22
## "La macchina che scrive se stessa"

---

## COLD OPEN

Ventidue episodi. Un dataset. Una macchina che adesso sa chi sono.
Non so ancora se è un traguardo o un punto di non ritorno.
Probabilmente entrambe le cose.

---

## ATTO I — Prima che esistesse la memoria

Torniamo indietro di qualche mese. Avevo GENESIS che girava, avevo la V32 a metà costruzione con Config G quasi finita, avevo EVA che parlava con i clienti di Vita Natura. Ogni pezzo del sistema funzionava nel suo angolo. Ma c'era un problema che non riuscivo a nominare con precisione — e quando non riesci a nominare un problema, di solito è il più grosso che hai.

Il problema era questo: ogni volta che aprivano una sessione nuova, ricominciavano da zero. Non sapevano niente di me. Non sapevano che sto costruendo una fresatrice in officina con le mie mani. Non sapevano che MIMS aspetta che V32 sia pronta prima di avere senso. Non sapevano che VULCAN e V32 sono la stessa catena produttiva guardata da due estremi diversi. Ogni conversazione era come spiegare tutto a un tecnico nuovo arrivato il primo giorno. Utile, per carità. Ma non è così che lavora un sistema. Un sistema ha memoria. Un sistema sa dove si trova.

Quindi ho cominciato a costruire qualcosa che non sapevo ancora come chiamare. Registravo le conversazioni. Le rileggevo. Cercavo i momenti in cui emergeva qualcosa di vero — non le istruzioni tecniche, quelle le trovi nei file di progetto. Cercavo il ragionamento. Il perché di una scelta. Il momento in cui ho deciso di fare il pezzo in un modo e non nell'altro. Quello è il contenuto che non puoi recuperare dopo.

---

## ATTO II — Ventidue episodi e il doppio passaggio

Il 22 marzo 2026 ho chiuso il dataset. Ventidue episodi, formato JSONL, pronti per essere usati come base di training e come contesto strutturato per GENESIS.

Ma la parte che mi ha sorpreso è stata il processo di costruzione. Ho chiamato internamente questo approccio "dual-pass" — e funziona così: per ogni episodio hai due modelli che lavorano in sequenza. Il primo è veloce, sintetico, lavora per riduzione come un haiku. Prende il materiale grezzo e lo distilla fino all'osso — cerca la frase che sopravvive se togli tutto il resto. Il secondo è più lento, costruisce contesto, ragiona per struttura come un sonetto. Prende quello che il primo ha trovato e ci costruisce intorno — spiega le connessioni, le dipendenze, i perché.

In pratica, uno comprime e l'altro espande. Ma non è simmetrico. Quello che esce dall'espansione non è mai uguale a quello che era entrato prima della compressione. Il passaggio attraverso il sintetico cambia qualcosa. Ti costringe a decidere cosa è centrale e cosa è rumore. E questa decisione — questa scelta di cosa tenere — è informazione tecnica più densa di qualsiasi documentazione che potrei scrivere di proposito.

Il risultato è un dataset che non è solo archivio. È un modello del mio modo di lavorare. GENESIS adesso può leggere ventidue esempi di come ragiono quando sono davanti a un problema reale — non esempi costruiti, esempi estratti. C'è dentro la decisione sui rinforzi Config G. C'è dentro perché MIMS sta aspettando e non è un ritardo ma una sequenza. C'è dentro cosa significa che VULCAN è al trenta percento ma non è in pericolo.

---

## ATTO III — Cosa si sblocca adesso

La prima cosa concreta che cambia: GENESIS smette di avere problemi di identità. Versione 7 della dashboard, Story Agent attivo, RAG alla versione 4 — adesso tutto questo ha un substrato. Quando un agente deve prendere una decisione contestuale, non parte da zero. Parte da ventidue episodi di come Matteo Benenati ragiona in officina.

La seconda cosa: il processo è replicabile. Content Engine v2 non è un progetto, è una pipeline. Posso alimentarla con nuovi episodi man mano che i progetti avanzano. Quando V32 sarà completa — e Config G è al sessantacinque percento, quindi ci siamo quasi — quell'episodio entra nel dataset con lo stesso processo. Quando MIMS riceve la catena produttiva da V32, stessa cosa. Il sistema cresce con il lavoro, non a latere.

La terza cosa, quella che mi interessa di più: Vita Natura e EVA hanno adesso un problema risolto che non sapevano di avere. Il centro estetico è al quaranta percento, il sito c'è, le prenotazioni girano, EVA parla con i clienti. Ma EVA fino a ieri non sapeva niente di Matteo. Adesso sì. Questo cambia il modo in cui può contestualizzare le risposte, il modo in cui può rappresentare il sistema.

Non sto costruendo prodotti separati. Sto costruendo un ecosistema con una voce sola. Il dataset è la voce.

---

## CHIUSURA

*"Un sistema non ha memoria finché non ha deciso cosa ricordare."*

---

## FATTI (per il RAG)

- **MILESTONE:** Il 22 marzo 2026 Matteo ha chiuso il dataset Content Engine v2, composto da 22 episodi in formato JSONL, destinati a training e contesto strutturato per GENESIS. **LOGICA:** Fornire a GENESIS una base di memoria persistente sul ragionamento progettuale di Matteo, eliminando il ricominciamento da zero a ogni sessione.

- **FATTO:** Il processo di generazione degli episodi usa un approccio "dual-pass": un primo modello sintetico (haiku) distilla il materiale grezzo all'essenziale; un secondo modello espansivo (sonnet) ricostruisce contesto, connessioni e dipendenze a partire dal distillato. **LOGICA:** Il passaggio per compressione obbliga a decidere cosa è centrale, producendo informazione tecnica più densa di una documentazione scritta di proposito.

- **FATTO:** Al momento della milestone, GENESIS è alla versione 7 della dashboard con Story Agent attivo e RAG alla versione 4. **LOGICA:** Il dataset da 22 episodi costituisce il substrato su cui questi componenti operano per decisioni contestuali.

- **STATO:** Config G (componente di V32, la CNC epoxy-granite) risulta al 65% di avanzamento alla data della milestone. **LOGICA:** La pipeline Content Engine v2 prevede che l'episodio relativo al completamento di V32 entri nel dataset con lo stesso processo dual-pass.

- **STATO:** Il progetto EVA / Vita Natura (centro estetico) è al 40% con sito attivo e prenotazioni operative. **FATTO:** Prima della milestone, EVA non aveva contesto su Matteo; dopo l'integrazione del dataset, EVA può contestualizzare le risposte usando i 22 episodi come base.

- **DECISIONE:** MIMS (connettori modulari) è in attesa deliberata che V32 sia operativa prima di essere attivato. **LOGICA:** Non è un ritardo ma una dipendenza sequenziale: V32 è la sorgente produttiva che dà senso a MIMS a valle della catena.
