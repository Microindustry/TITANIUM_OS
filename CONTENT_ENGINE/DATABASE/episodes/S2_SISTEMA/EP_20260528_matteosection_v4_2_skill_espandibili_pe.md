# TITANIUM_OS — S1E09
## "La Macchina che Ricorda"

---

> *"Un sistema che dimentica non è un sistema. È solo un casino organizzato."*
> — nota a margine, MANUALE_SISTEMA.md v1.0, riga 3

---

## COLD OPEN

Ore 23:47. Il cursore lampeggia su un terminale Windows.

Il file si chiama `RIAVVIO_SESSIONE.txt`.

Non è un documento. È una promessa. Ogni volta che Matteo chiude Claude — ogni volta che la sessione si azzera, che il contesto evapora, che l'AI torna a essere una lavagna bianca — questo file esiste per ricominciare da dove si era rimasti. Non dall'inizio. Da *lì*.

```
Generato: 2026-05-29 10:31
STATE: v2.5.0
RAG: 150 chunk
Sessioni: #8
```

Sessione numero otto. Ogni numero è una cicatrice di lavoro reale.

---

## ATTO I — Il Problema che Nessuno Nomina

C'è una cosa che non si dice mai nei video dei maker su YouTube.

Ogni volta che riapri il progetto — il giorno dopo, tre giorni dopo, lunedì mattina prima del lavoro — devi *ricostruire il contesto nella testa*. Dove eri. Cosa avevi deciso. Perché avevi scelto quella soluzione e non l'altra. È un costo invisibile, silenzioso, che si accumula ogni sessione come interesse composto al contrario.

Per Matteo questo costo è doppio. C'è il progetto fisico — V32, colonne, gusset, epoxy granite — e c'è GENESIS, il sistema cognitivo che deve supportarlo. Due mondi paralleli, entrambi in costruzione, entrambi che si evolvono. Dimenticare un dettaglio in uno dei due può costare ore.

La soluzione tradizionale è un quaderno. Oppure un file Word pieno di note. Oppure — nella versione più ambiziousa — un sistema di documentazione che tutti iniziano e nessuno mantiene.

Matteo ha costruito qualcosa di diverso.

Ha costruito un sistema che ricorda per lui.

---

Il commit del 28 maggio non ha un singolo protagonista. Ha sei. E capire come stanno insieme è capire cosa sta diventando GENESIS.

Il primo: `generate_restart_prompt v1.2`.

Ogni volta che Matteo scrive `/stop` — fine sessione, Claude si spegne — un hook automatico salva lo stato in `MENTE/SESSIONI/`. Non solo un log. Un prompt già formattato, pronto per essere incollato all'apertura successiva. Il sistema scrive il suo stesso riavvio.

È una cosa piccola. È una cosa enorme.

Perché significa che la *continuità* smette di dipendere dalla memoria di Matteo. Smette di essere un atto di volontà. Diventa infrastruttura.

---

## ATTO II — RAG v4.0: Quando la Ricerca Smette di Essere Casuale

Il secondo protagonista del commit è più tecnico. E più importante.

`rag_engine.py v4.0`.

Per capire cosa cambia, bisogna capire cosa c'era prima.

RAG v3 era semantico puro. Prendevi una domanda, la convertivi in un vettore, trovavi i chunk più vicini nello spazio vettoriale. Funziona bene quando sai *come stai cercando*. Funziona male quando stai cercando *qualcosa di specifico* con parole esatte — un numero di commit, un nome di componente, una sigla.

I sistemi semantici puri hanno un punto cieco: la precisione lessicale.

v4.0 risolve con un approccio ibrido:

```
BM25 (TF-IDF) — ricerca keyword esatta
+
Semantico (embedding) — ricerca per significato
+
RRF (Reciprocal Rank Fusion) — fusione dei risultati
+
CrossEncoder reranker — riordina per rilevanza finale
```

Non è teoria. È la differenza tra chiedere *"cosa ho deciso sulle colonne Z"* e ricevere i 150 chunk ordinati per rilevanza reale, non per vicinanza vettoriale approssimata.

150 chunk. Otto sessioni. Ogni decisione presa, ogni spec tecnica scritta, ogni ragionamento documentato — tutto raggiungibile in sotto-secondo, con ranking che funziona.

Il sistema non è più una libreria. È una memoria che sa *dove guardare*.

---

Poi ci sono gli agenti.

`NODES/AGENTS/`: TESLA, FORGE, AQUA, LEX, SIEMENS, THEMIS, ARIA, EVA.

Otto validatori. Ognuno con un dominio. FORGE per la meccanica. LEX per i vincoli normativi. AQUA per i sistemi idraulici. THEMIS per la coerenza logica. EVA — lo stesso nome del progetto WhatsApp per Maria — qui è l'agente di interfaccia.

Non sono ancora attivi in modo completo. Ma la struttura esiste. E la struttura è il 70% del lavoro.

Un sistema ad agenti validatori significa questo: quando Matteo prende una decisione su V32 — un materiale, una tolleranza, un giunto — non è più solo lui a valutarla. Ogni agente passa la decisione attraverso il proprio filtro. FORGE dice se regge meccanicamente. LEX dice se ci sono vincoli che non ha considerato. THEMIS dice se è coerente con le decisioni precedenti.

È un sistema progettato per trovare i propri errori prima che diventino metallo.

---

## ATTO III — Il Manuale. E Cosa Significa Scriverlo.

Il commit che colpisce di più non è il più tecnico.

È questo: `MANUALE_SISTEMA.md v1.0 — guida completa consumer-friendly`.

Matteo ha scritto un manuale. Per se stesso.

Non per gli utenti. Non per GitHub. Per il Matteo delle 7:00 di lunedì mattina, caffè in mano, prima di andare in fabbrica, con venti minuti per aprire una sessione e non ricordare come funziona il comando `rag-update`.

*Consumer-friendly* non è un termine aziendale in questo contesto. È un atto di rispetto verso una versione futura di sé stesso che sarà stanca, o di fretta, o semplicemente distratta.

Il manuale copre:
- RAG v4.0 — comandi, differenza tra `rag-update` (incrementale) e `rag-rebuild` (full)
- Sistema agenti — come interrogarli, quando usarli
- Research agent — come delegare la ricerca
- Git — workflow del progetto, come leggere i commit
- `FUNZIONI_SISTEMA.txt` — la lista auto-generata di tutte le funzioni disponibili

Quest'ultima è un dettaglio che dice tutto: `generate_functions_list.py` genera automaticamente la lista di cosa il sistema sa fare. Non è documentazione statica. Si aggiorna quando il sistema si aggiorna.

Il sistema documenta se stesso. Il sistema si riavvia da solo. Il sistema valida le proprie decisioni.

---

C'è anche il commit del storytelling. `Fix 6 bottleneck + Dashboard v2.1`. Cinque nuovi episodi. Il fix narrativo sull'evoluzione *molle → corpo unico* — quella svolta tecnica di V32 che nella dashboard era raccontata in modo confuso, e che ora ha la sua sequenza corretta.

La storia del progetto, dentro il progetto stesso.

---

## CHIUSURA

Matteo non ha saldato niente il 28 maggio.

Il Milestone attivo è Config G — *Rinforzi colonne Z+U*. I gusset da 200mm sulla colonna Z sinistra aspettano. Il ferro aspetta. La taverna da 12 m² aspetta.

Ma quello che è stato costruito in questa sessione reggerà ogni sessione futura.

C'è una differenza tra costruire *cose* e costruire *la capacità di costruire cose*. Entrambe sono necessarie. Spesso, nel mezzo di un progetto fisico, la seconda sembra meno urgente. Sembra overhead. Sembra che stai perdendo tempo mentre il vero lavoro aspetta.

Poi arriva lunedì. E il sistema si riavvia da solo. E RAG trova il chunk giusto in 80 millisecondi. E il manuale risponde alla domanda prima che tu la finisca di formulare.

E capisci che la taverna da 12 m² non è più solo il posto dove c'è la macchina.

È il posto dove c'è anche il sistema che la sta costruendo.

`STATE v2.5.0. Sessioni: #8. RAG: 150 chunk.`

Il capannone è il 15 luglio 2030.

Mancano 1509 giorni.

Il contatore non si azzera più.

---

## REEL_HOOK

> RAG v4.0 su GENESIS: BM25 + semantico + CrossEncoder. 150 chunk, 8 sessioni, sotto-secondo.
> Il problema non era la ricerca. Era che ogni lunedì mattina il sistema dimenticava tutto.
> Ora si riavvia da solo — prompt generato all'Stop hook, context già caricato.
> Prossimo: 4 gusset da 200mm. Colonna Z sinistra. Config G.
> *Vediamo se il sistema regge quando torna il ferro.*

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E09 |
| **Titolo** | La Macchina che Ricorda |
| **Data registrazione** | 2026-05-28 |
| **STATE** | v2.5.0 |
| **Sessione** | #8 |
| **Commit principale** | `5a9d2d7` + multipli 28/05 |
| **Focus narrativo** | GENESIS — memoria, continuità, auto-documentazione |
| **Progetto fisico** | V32 — Config G (in attesa) |
| **Milestone prossimo** | Gusset 200mm colonna Z sinistra |
| **RAG chunks** | 150 |
| **Agenti definiti** | 8 (TESLA, FORGE, AQUA, LEX, SIEMENS, THEMIS, ARIA, EVA) |
| **Tag** | `#GENESIS` `#RAG` `#automazione` `#continuità` `#V32` `#artigianato_cognitivo` |
| **Target capannone** | 15 luglio 2030 |
| **Giorni rimanenti** | ~1509 |