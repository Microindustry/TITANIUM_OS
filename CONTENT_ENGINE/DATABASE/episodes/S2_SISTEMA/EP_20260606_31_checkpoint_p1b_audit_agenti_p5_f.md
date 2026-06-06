<!-- TOC -->

- [TITANIUM_OS  S01E14](#titaniumos-s01e14)
  - [Il Roster](#il-roster)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La domanda giusta](#atto-i-la-domanda-giusta)
  - [ATTO II  La cartella clinica che respira](#atto-ii-la-cartella-clinica-che-respira)
  - [ATTO III  Tre decisioni che aspettano](#atto-iii-tre-decisioni-che-aspettano)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [METADATI EPISODIO](#metadati-episodio)

<!-- /TOC -->

# TITANIUM_OS — S01E14
## "Il Roster"

---

## COLD OPEN

È sabato mattina, 6 giugno 2026.

Sul monitor della taverna c'è una tabella. Sette righe. Ogni riga è un agente — un pezzo del sistema nervoso di GENESIS che dovrebbe, in teoria, pensare per Matteo mentre lui lavora.

Accanto a due nomi, c'è scritto: **fuori scope.**
Accanto ad altri due: **mancanti.**

Matteo aveva scritto, giorni prima, una frase secca nel ticket di lavoro:

> *"non so se sono perfetti per noi"*

Quella frase è diventata un'intera sessione.

---

## ATTO I — La domanda giusta

C'è un momento, in ogni progetto serio, in cui smetti di costruire e inizi a guardare quello che hai costruito.

Non per ammirarti. Per capire se stai costruendo la cosa sbagliata.

La sessione #31 è partita da lì. Matteo aveva già fatto girare P4a — la chat RAG vera, quella che interroga ChromaDB con contesto reale — e P4b, la leva locale con Ollama. Due milestone concreti, due flag verdi nel board. Ma nel mezzo del lavoro era emersa una domanda che non stava nei ticket:

**Gli agenti che abbiamo nel roster — servono davvero?**

GENESIS è progettato per avere agenti specializzati. Ogni agente è un layer cognitivo: c'è chi gestisce la memoria a lungo termine, chi monitora i sistemi, chi risponde, chi pianifica. La logica è solida. Ma i nomi nel roster erano stati definiti mesi prima, in una fase in cui il sistema era ancora una sketch su carta.

Adesso il sistema gira. E alcune cose non tornano.

**AQUA** — l'agente pensato per la gestione idrica/ambientale del capannone. Ragionevole su carta. Ma il capannone è il 2030. Oggi c'è una taverna da 12 m². AQUA non ha niente da monitorare.

**PLC** — integrazione con i PLC industriali. Anche questo: futuro, non presente. V32 non ha ancora un asse in movimento.

Due agenti in standby per anni. Due slot occupati nel roster. Due voci che ogni volta che Matteo legge lo STATE generano confusione invece di chiarezza.

Fuori scope. Annotato. Rimosso dalla lista attiva.

Ma poi c'erano i buchi.

**AVA** e **NEXUS** — citati in vecchi documenti di architettura, mai implementati, mai definiti con precisione. Nomi senza corpo. Il tipo di debt che nei progetti piccoli diventa invisibile finché non ti inciampi sopra di notte cercando qualcos'altro.

L'audit di P5 li ha portati in superficie. Non per risolverli — non era quello il punto della sessione. Ma per nominarli. Per scrivere da qualche parte: *questi mancano, e lo sappiamo.*

È una distinzione sottile ma importante: un buco che conosci è diverso da un buco che scopri per caso.

---

## ATTO II — La cartella clinica che respira

Parallelo all'audit agenti, c'era un problema più vecchio.

La dashboard di GENESIS ha una sezione che Matteo chiama "cartella clinica" — una vista delle critiche al sistema. Cose che non funzionano, decisioni aperte, debiti tecnici. L'idea è buona: un posto dove il sistema è onesto su sé stesso.

Il problema era che quella vista era **morta**.

`criticheData.ts` — un file TypeScript aggiornato a mano. Ogni volta che emergeva una critica nuova, qualcuno (Matteo, o GENESIS stesso in una sessione autonoma) doveva aprire il file, aggiungere una riga, salvare, committare. Il che significa che nella pratica le critiche nuove aspettavano. O venivano dimenticate.

Una cartella clinica che aggiorni ogni tanto non è una cartella clinica. È un archivio.

P1b ha cambiato questo. Adesso le critiche emergono **live** dal self-audit: quando GENESIS fa girare un'analisi del proprio stato, le anomalie vengono estratte direttamente e popolano la vista in tempo reale. Nessun file da aggiornare a mano. Nessun ritardo.

È un cambiamento piccolo nell'architettura — una pipeline invece di un file statico — ma il significato è diverso. Prima la dashboard mostrava quello che Matteo *ricordava* di annotare. Adesso mostra quello che il sistema *trova*.

La differenza tra memoria e percezione.

---

Poi c'era il proxy.

`fix(llm-local): opener senza proxy per le chiamate a Ollama localhost` — un commit che sulla superficie sembra banale. Un fix. Tre righe di Python, forse quattro.

Ma il contesto è questo: l'ambiente Windows di Matteo ha `HTTP_PROXY` e `HTTPS_PROXY` impostati nell'env — probabilmente residui di configurazioni aziendali, o setup precedenti. Quando Flask chiamava Ollama su `localhost:11434`, Python's `urlopen` vedeva le variabili proxy e cercava di instradare la richiesta attraverso un proxy esterno.

Una chiamata locale che finiva in rete. O peggio, che falliva silenziosamente.

Il fix è un `opener` custom che bypassa il proxy per le chiamate localhost. Semplice. Ma senza questo fix, la leva LLM locale non funzionava in certi ambienti. E GENESIS gira sull'unica macchina che conta: quella di Matteo.

C'è una legge non scritta nello sviluppo su hardware proprio: *il tuo ambiente ha sempre un'anomalia che nessuna documentazione ufficiale ha mai incontrato prima.* Non è sfiga. È la natura dei sistemi costruiti da una persona sola su una macchina usata per tutto.

Il fix è stato committato. La leva locale accesa.

---

## ATTO III — Tre decisioni che aspettano

A fine sessione, lo STATE è stato aggiornato.

`story_state.json` — il file che traccia dove si trova GENESIS in ogni momento. Non è documentazione. È memoria operativa: dice al sistema (e a Matteo) cosa è stato fatto, cosa è in corso, cosa viene dopo.

Il campo `next_step` è stato ripulito. In cima, tre voci:

1. **Ollama pull** — quale modello tirare per la leva locale
2. *[seconda decisione — non ancora pubblica]*
3. *[terza decisione — non ancora pubblica]*

Tre decisioni che non può prendere GENESIS. Tre cose che aspettano Matteo.

Questo è il confine reale del sistema autonomo: non è dove finisce la tecnica, è dove inizia il giudizio. GENESIS può fare l'audit, trovare i buchi, tenere lo stato, far girare i servizi di notte. Ma non può scegliere quale modello linguistico vale la pena scaricare sul disco di casa di Matteo. Non può pesare il tradeoff tra dimensione del modello, velocità di risposta, qualità dei reasoning.

Quella scelta ha contesto che non sta in nessun file JSON.

---

C'è un dettaglio nella sessione #18 — quella in cui un amico developer Flutter aveva passato del tempo con GENESIS mentre Matteo non c'era — che vale la pena ricordare qui.

L'amico aveva detto: *"lo state facendo in modo inusuale ma figo."*

*Inusuale* è la parola giusta. Non c'è un framework standard per quello che è GENESIS. Non è un'app. Non è un agente AI nel senso commerciale del termine. È un sistema cognitivo costruito attorno a una persona specifica, con una memoria che cresce da una sessione all'altra, un roster di agenti che viene auditato e corretto, una cartella clinica che respira.

È inusuale perché è personale. Costruito per una vita specifica, non per un mercato.

L'audit di P5 non è stato un esercizio di architettura. È stato Matteo che guardava il suo sistema e si chiedeva: *questi pezzi servono davvero a me?*

La risposta onesta era: alcuni no. Non ancora. Forse mai.

E scrivere *fuori scope* è più utile di lasciare due agenti nel roster a fingere di servire qualcosa che non esiste.

---

## CHIUSURA

Build verde. Sei commit in un giorno.

V32 è al 65% — il corpo della macchina esiste, il granite è curato, le guide aspettano. GENESIS è al 70% — la chat RAG risponde, la leva locale gira, la cartella clinica vede.

Tre decisioni aspettano Matteo quando torna.

Il sistema sa dove si trova. Sa cosa manca. Sa cosa è fuori scope.

È già qualcosa — costruire qualcosa che è onesto su sé stesso.

---

## REEL HOOK

GENESIS ha 7 agenti nel roster. 2 non servono ancora — rimossi. 2 non esistono ancora — nominati. La cartella clinica era un file statico aggiornato a mano: adesso respira da sola. Tre decisioni aspettano Matteo. Qual è la differenza tra un sistema autonomo e uno che finge di esserlo?

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S01E14 |
| **Titolo** | Il Roster |
| **Data** | 2026-06-06 |
| **Sessione** | #31 |
| **Progetto primario** | GENESIS |
| **Milestone** | P4a chat RAG + P4b leva locale + P1b cartella clinica viva + audit agenti P5 |
| **Commit** | 6 |
| **Build** | verde |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Target capannone** | 15 luglio 2030 |
| **Tag narrativo** | audit · autonomia · confini · onestà tecnica |
| **Angolo scelto** | L'audit degli agenti come atto di onestà verso sé stessi |