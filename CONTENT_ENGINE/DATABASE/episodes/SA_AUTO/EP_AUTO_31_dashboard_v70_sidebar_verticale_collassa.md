<!-- TOC -->

- [EP_AUTO_31  Milestone](#epauto31-milestone)
    - [Dashboard v7.0 - sidebar verticale collassabile  AgentsView](#dashboard-v70---sidebar-verticale-collassabile-agentsview)
- [Il Sistema  Episodio 14](#il-sistema-episodio-14)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima del vetro](#atto-i-prima-del-vetro)
  - [ATTO II  v7.0 e il momento in cui il sistema si è visto](#atto-ii-v70-e-il-momento-in-cui-il-sistema-si-è-visto)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_31 — Milestone
### "Dashboard v7.0 - sidebar verticale collassabile + AgentsView"

---
id: EP_AUTO_31
title: "Dashboard v7.0 - sidebar verticale collassabile + "
sottotitolo: "Il sistema diventa visibile"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-29
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Dashboard v7.0 - sidebar verticale collassabile + AgentsView glassmorphism + dot grid + API /api/agents (29 Mag 2026)"
---

# Il Sistema — Episodio 14

## COLD OPEN

Erano le undici di sera, la luce al neon dell'officina era ancora accesa, e io stavo guardando uno schermo che finalmente mi rispondeva come doveva. Non con un log di errori. Non con un timeout. Con una sidebar che scorreva, un'interfaccia che respirava, e ventinove maggio duemilaventisei scritto nel commit come una firma.

---

## ATTO I — Prima del vetro

Devo spiegarti cosa c'era prima, altrimenti non capisci perché quella sera contava.

GENESIS è il sistema nervoso di tutto. Non è "il software" — è la cosa che tiene insieme la V32 mentre la costruisco, che parla con VULCAN quando VULCAN esiste, che gestirà EVA nel centro estetico, che sa dove sono i connettori MIMS anche quando io non lo so. È il cuore di TITANIUM_OS. E per mesi, quel cuore aveva un'interfaccia che sembrava un foglio Excel dimenticato sul desktop di un ufficio contabilità del 2009.

Non sto esagerando. La dashboard era funzionale — gli agenti giravano, il RAG v4.0 recuperava contesto, lo Story Agent scriveva, i dati si muovevano. Ma guardare quella roba era come guardare dentro un motore attraverso un foro di tre millimetri. Vedevi qualcosa. Non capivi niente. E soprattutto non riuscivi a spiegarlo a nessuno, perché non c'era nessun punto d'appoggio visivo, nessuna gerarchia, nessun posto dove i tuoi occhi potevano atterrare e dire "ok, sono qui."

Quando costruisci qualcosa di fisico — una fresatrice, una pressa — sai sempre dove sei. La Config G dei rinforzi della V32 ha un angolo, una dimensione, una relazione spaziale con il resto del telaio. È concreta. Un sistema software invece può espandersi in tutte le direzioni senza che te ne accorga, e a un certo punto ti ritrovi a navigare qualcosa che hai costruito tu, ma che non riesci più a leggere.

Quello era il problema. GENESIS aveva smesso di essere leggibile.

---

## ATTO II — v7.0 e il momento in cui il sistema si è visto

La Dashboard v7.0 non è arrivata in una notte. È arrivata dopo una serie di decisioni precise, una dietro l'altra, come quando stai facendo un piano di lavorazione e sai che l'ordine conta.

Prima la sidebar verticale collassabile. Sembra banale. Non lo è. Una sidebar collassabile significa che il sistema ha una spina dorsale che può farsi da parte quando devi lavorare, e tornare quando devi orientarti. Non è estetica — è architettura. Quando lavoro sulla V32 ho bisogno di vedere il piano completo, e quando lavoro pezzo per pezzo ho bisogno che il piano non mi sia davanti agli occhi. Stessa cosa qui.

Poi AgentsView. Questo è il pezzo che mi ha fermato davanti allo schermo.

Glassmorphism — ovvero vetro, trasparenza, profondità — applicato alla vista degli agenti. Gli agenti di GENESIS non sono processi anonimi in una lista. Sono entità che fanno cose specifiche: recuperano documenti, generano testo, coordinano workflow, parlano con l'API. E adesso li vedi. Vedi la loro presenza nello spazio dell'interfaccia come oggetti distinti, separati, riconoscibili. Il dot grid sullo sfondo non è decorazione — è griglia, è struttura, è la sensazione che tutto quello che vedi abbia coordinate.

E poi l'API. `/api/agents`. Ventinove caratteri che aprono GENESIS al mondo. Non devi più guardare dentro il sistema dalla dashboard — puoi interrogarlo dall'esterno, puoi farci parlare altri sistemi, puoi costruire sopra. VULCAN un giorno parlerà con quella API. EVA probabilmente anche.

Quella sera ho fatto girare il primo test sull'endpoint. Ha risposto in centottantadue millisecondi. Ho chiuso il terminale e sono andato a dormire.

---

## ATTO III — Cosa si sblocca adesso

GENESIS è all'settantotto percento. Non è finito, ma adesso ha una forma che puoi mostrare a qualcuno senza dover spiegare per venti minuti cosa stai guardando. Questo conta più di quanto pensi, perché TITANIUM_OS non è solo roba mia — prima o poi deve parlare con clienti, con fornitori, con chi gestirà Vita Natura, con chi comprerà i connettori MIMS.

La V32 è al sessantacinque percento con la Config G. I rinforzi del telaio sono il lavoro fisico più impegnativo del progetto in questo momento. Ma quando la V32 sarà completa, GENESIS sarà il sistema che la monitora, che registra i cicli di lavorazione, che connette quella macchina alla catena V32→VULCAN che MIMS aspetta per avanzare oltre il trenta percento.

EVA e Vita Natura sono al quaranta percento. Il sito c'è, le prenotazioni ci sono, il pilot è partito. Adesso che GENESIS ha un'API stabile e una dashboard leggibile, EVA ha un cervello a cui agganciarsi in modo pulito.

Tutto si connette. Non in modo romantico — in modo tecnico. Un endpoint chiama un agente, un agente recupera contesto dal RAG, il RAG sa quello che è successo in officina la settimana scorsa. Questo è TITANIUM_OS: un sistema che si ricorda di se stesso.

---

## CHIUSURA

*"Non costruisci un'interfaccia perché sia bella. La costruisci perché il sistema possa finalmente di