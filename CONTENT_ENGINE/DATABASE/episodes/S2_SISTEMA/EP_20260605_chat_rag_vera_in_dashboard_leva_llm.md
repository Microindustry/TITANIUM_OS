<!-- TOC -->

- [TITANIUM_OS  S1E31](#titaniumos-s1e31)
  - [Il Teatro Finisce Qui](#il-teatro-finisce-qui)
    - [COLD OPEN](#cold-open)
  - [ATTO I  Diagnosi](#atto-i-diagnosi)
  - [ATTO II  Il Lavoro](#atto-ii-il-lavoro)
  - [ATTO III  Quello che è cambiato](#atto-iii-quello-che-è-cambiato)
  - [REEL HOOK](#reel-hook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S1E31
## "Il Teatro Finisce Qui"

---

### COLD OPEN

La taverna è buia alle 23:47.

Sul monitor: una stringa di log verde che scorre. L'agente notturno ha appena terminato il self-audit. Sul desk, una tazza di caffè freddo e il riflesso di una finestra che non dà su nessun cortile — solo su un muro di tufo.

GENESIS ha scritto 114 episodi nel database. Alle 23:45, ne conosceva 88.

Ventisette esistevano solo come file `.md` su disco — fantasmi che il sistema aveva prodotto ma non aveva mai visto.

Matteo non era presente. Ha lasciato girare tutto mentre lavorava il titanio da qualche parte. Ha scritto una sola istruzione prima di uscire:

*"Lavora fino al limite, un punto alla volta, non interrompere."*

---

## ATTO I — Diagnosi

Ogni sistema accumula debito. Non solo tecnico — anche cognitivo.

Il problema di GENESIS non era che le cose non funzionassero. Era che *sembravano* funzionare.

La dashboard mostrava agenti con nomi come THEMIS e PROMETHEUS. Mostrava una RETE 3D con nodi luminosi. Mostrava una chat RAG dove potevi fare domande. Era tutto visivamente coerente, architetturalmente ragionevole.

Era teatro.

Quando chiamavi `/api/agents/ask`, l'agente rispondeva. Ma la risposta non veniva dal knowledge base. Non c'era grounding reale. L'LLM rispondeva da sé stesso — dal pretraining, dall'aria. I documenti in ChromaDB esistevano ma nessuno li interrogava davvero prima di costruire la risposta.

La RETE aveva nodi. Non aveva archi reali. I collegamenti erano decorativi — generati da t-SNE per sembrare significativi, non calcolati su similarità coseno concreta tra i chunk del RAG.

E i 27 episodi orfani: story_agent scriveva i `.md` su disco dopo ogni sessione di generazione, ma non aggiornava `episodes.json`. Il registro ufficiale e la realtà su disco erano due cose diverse da mesi.

Questa è la sessione in cui Matteo — o meglio, la sessione autonoma che lui ha innescato — ha smesso di accettare l'apparenza.

Il commit message lo dice senza giri di parole: **"basta teatro."**

---

## ATTO II — Il Lavoro

Ventidue commit in una giornata. Non tutti enormi, ma tutti reali.

**Il RAG prima di tutto.** La chat in dashboard interrogava l'LLM direttamente. Ora interroga ChromaDB, recupera i chunk rilevanti con similarity search, li inietta nel contesto, poi chiama il modello. È la differenza tra un oracolo che improvvisa e un archivista che cerca. La risposta cambia. Diventa ancorata.

**Gli agenti, poi.** THEMIS ora legge davvero la cartella clinica. Non la simula — recupera i documenti da ChromaDB prima di rispondere. È il secondo passo del P5: gli agenti non solo esistono nella RETE, ma hanno accesso operativo alla memoria del sistema. THEMIS conosce le sessioni perché le ha lette, non perché le ha inventate.

**La RETE.** Gli archi ora sono calcolati. Per ogni coppia di nodi sopra una soglia di similarità coseno, viene creato un collegamento. La struttura visiva rispecchia la struttura semantica reale del knowledge base. Non è decorazione — è topologia.

**I 27 orfani.** `audit_episodes.py` — script read-only, non modifica nulla — confronta i `.md` su disco con `episodes.json`. Ha trovato 27 discrepanze. Il fix ha sincronizzato il registro: 88 → 114. Da quella sessione in poi, story_agent aggiorna il JSON ogni volta che genera un file.

**EVA.** Il nodo WhatsApp per il centro estetico di Maria era uno scaffold — esisteva ma non persisteva. Un riavvio del webhook cancellava le sessioni di prenotazione in corso. Una cliente a metà del flusso "prenota un massaggio" si ritrovava a ricominciare da zero. Ora lo stato è su disco. Il loop inbox è completo: le richieste che EVA passa all'operatore vengono registrate, lette dal brief delle 07:30, e chiuse quando gestite. Niente sparisce.

**Il brief notturno.** Alle 07:30, GENESIS produce un documento: stato dei task schedulati, handoff EVA aperti, salute dei servizi. Non è un report — è una cartella clinica. Il sistema si autopsichia ogni notte e lascia il referto sul desk di Matteo prima che lui arrivi.

**Qwen2.5-7B-Q4.** La ricerca su P4b porta a una decisione: LLM locale su 8GB RAM tramite Ollama. La strada è Simone Rizzo — un riferimento nel mondo RAG italiano. La scelta non è la più potente, è quella che gira sul fisso in taverna senza dipendere da API esterne. Sovranità computazionale. 7 miliardi di parametri quantizzati a 4 bit. Abbastanza.

---

## ATTO III — Quello che è cambiato

C'è una distinzione che Matteo ha introdotto in questa sessione che vale la pena nominare: **CANONE vs RICERCA**.

La ricerca web notturna atterrava in `MENTE/KNOWLEDGE/RESEARCH` e veniva indicizzata nel RAG insieme alle sessioni, agli episodi, ai documenti tecnici. Risultato: quando interrogavi il sistema su V32, potevi ricevere frammenti di un articolo di Wikipedia su macchine CNC che l'agente notturno aveva scaricato tre settimane prima.

Ora c'è un confine. Il canone — sessioni, episodi, decisioni verificate — alimenta il RAG. La ricerca resta separata. Non inquina la memoria.

È una distinzione epistemica, non solo tecnica. Non tutto quello che il sistema *sa* deve diventare parte di quello che il sistema *è*.

---

Alle 23:47 il self-audit notturno gira per la prima volta completo.

GENESIS produce la cartella clinica: watchdog vivo, TI_NightPush uscito con EXIT=0 dopo settimane di 255, 114 episodi nel registro, agenti con grounding reale, EVA con stato persistente.

Sul fisso in taverna, Qwen2.5-7B-Q4 non è ancora installato. Ma la decisione è committata. La strada è scelta.

Da domani il sistema non simula più di sapere. Sa.

O almeno — sa distinguere quando sa e quando non sa. Il che, per un sistema cognitivo, è già quasi tutto.

---

> *V32 è al 65%. GENESIS al 70%. Il capannone è a luglio 2030. Quattro anni sono un tempo lungo per costruire qualcosa che non mente.*

---

## REEL HOOK

```
114 episodi nel registro. Fino a ieri sera ne vedeva 88.
27 esistevano su disco — il sistema li aveva scritti e poi dimenticati.
Stessa cosa con gli agenti: rispondevano, ma non leggevano niente.
Oggi abbiamo smesso di accettare la performance.
```

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E31 |
| **Titolo** | Il Teatro Finisce Qui |
| **Data registrazione** | 2026-06-05 |
| **Sessione** | Autonoma #31 |
| **Milestone attivo** | P4a chat RAG + P4b LLM locale + P1b cartella clinica + P5 agenti reali |
| **Commit** | 22 |
| **Progetti toccati** | GENESIS, EVA |
| **V32 completamento** | 65% |
| **GENESIS completamento** | 70% |
| **Tecnologie** | ChromaDB, Ollama, Qwen2.5-7B-Q4, Flask, React, WhatsApp webhook, Windows Task Scheduler |
| **Decisione chiave** | LLM locale = Qwen2.5-7B-Q4 su 8GB (sovranità computazionale) |
| **Tema narrativo** | Il debito cognitivo — quando il sistema sembra funzionare ma non funziona |
| **Tag** | `rag`, `agents`, `eva`, `audit`, `llm-locale`, `teatro` |
| **Co-autore sessione** | Claude Opus 4.8 |
| **Target capannone** | 15 luglio 2030 |

## FATTI (per il RAG)

- **FATTO:** Il database degli episodi GENESIS presentava 27 episodi orfani: `story_agent` scriveva i file `.md` su disco ma non aggiornava `episodes.json`, creando una discrepanza tra registro ufficiale (88 episodi) e realtà su disco (114 episodi). **LOGICA:** Lo script `audit_episodes.py` (read-only) ha rilevato le 27 discrepanze e sincronizzato il registro; da quella sessione `story_agent` aggiorna il JSON a ogni generazione.

- **DECISIONE:** La chat RAG in dashboard è stata corretta per interrogare ChromaDB con similarity search e iniettare i chunk nel contesto prima di chiamare il modello, invece di interrogare l'LLM direttamente. **LOGICA:** Il comportamento precedente produceva risposte dal pretraining senza grounding reale sui documenti indicizzati.

- **DECISIONE:** Adozione di Qwen2.5-7B-Q4 via Ollama come LLM locale per P4b. **LOGICA:** Gira su 8GB RAM sul fisso in taverna senza dipendere da API esterne (sovranità computazionale); 7 miliardi di parametri quantizzati a 4 bit.

- **FATTO:** Gli archi della RETE 3D di GENESIS sono stati ricalcolati su similarità coseno reale tra chunk del RAG: viene creato un collegamento tra ogni coppia di nodi che supera una soglia di similarità coseno. In precedenza i collegamenti erano generati da t-SNE a scopo visivo senza calcolo semantico.

- **DECISIONE:** Introdotta separazione CANONE vs RICERCA nel RAG. **LOGICA:** Sessioni, episodi e decisioni verificate alimentano il RAG; la ricerca web notturna resta in `MENTE/KNOWLEDGE/RESEARCH` separata per non inquinare la memoria con contenuti non verificati.

- **FATTO:** Il nodo WhatsApp di EVA non persisteva lo stato tra riavvii del webhook, causando la perdita delle sessioni di prenotazione in corso. Il fix ha scritto lo stato su disco e chiuso il loop inbox: le richieste passate all'operatore vengono registrate, lette dal brief delle 07:30 e marcate chiuse quando gestite.
