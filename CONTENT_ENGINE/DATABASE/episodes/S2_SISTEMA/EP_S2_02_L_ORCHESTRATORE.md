<!-- TOC -->

- [EP_S2_02  LORCHESTRATORE](#eps202-lorchestratore)
    - [4.7 secondi. 13 fonti. Il sistema che coordina sé stesso.](#47-secondi-13-fonti-il-sistema-che-coordina-sé-stesso)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL PROBLEMA DELLA FINE SESSIONE](#atto-i-il-problema-della-fine-sessione)
  - [ATTO II  STOP HOOKS](#atto-ii-stop-hooks)
  - [ATTO III  RESEARCH AGENT v1.1](#atto-iii-research-agent-v11)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_S2_02 — L'ORCHESTRATORE
### "4.7 secondi. 13 fonti. Il sistema che coordina sé stesso."

**Formato:** Video-podcast | Durata stimata: 10-12 min
**Tono:** Tecnico denso — automazione come moltiplicatore di intenzione
**Data evento:** 28-29 maggio 2026
**Fonte:** Commit 8e33e09 + stop_hooks.py + research_agent v1.1 + flusso coscienza 28mag

---

> *C'è un momento in cui smetti di fare cose e inizi a progettare sistemi che fanno cose.*
> *Non è pigrizia. È leva.*

## COLD OPEN

*[Terminale. Claude Code chiude la sessione. 3 processi partono in parallelo. 4.7 secondi dopo: tre output, tre file aggiornati, RAG in background.]*

Non ho fatto nulla.

Il sistema ha fatto tutto.

---

## ATTO I — IL PROBLEMA DELLA FINE SESSIONE

Ogni sessione con Claude termina. E ogni volta che termina, perdi contesto.

Il problema non è la memoria di Claude — è la tua. Alla prossima sessione ricordi l'80% di quello che hai deciso. Il 20% che dimentichi è spesso il più importante: la ragione per cui hai scelto un'architettura, il numero che non ti tornava, la domanda che hai rimandato.

Per mesi il protocollo era manuale: fine sessione → aggiorna RIAVVIO_SESSIONE.txt → aggiorna STATE.json → aggiorna lista funzioni → eventualmente RAG rebuild.

Quattro operazioni. Dieci minuti. Spesso saltate perché eri stanco o di fretta. Il contesto perduto ogni volta si accumula in silenzio.

---

## ATTO II — STOP HOOKS

Il 29 maggio la soluzione diventa codice.

`stop_hooks.py` — orchestratore parallelo. Viene eseguito automaticamente quando Claude Code chiude la sessione. Non chiede permesso. Non aspetta. Parte.

Tre hook in parallelo su ThreadPoolExecutor:
- `generate_restart_prompt.py` → aggiorna RIAVVIO_SESSIONE.txt con lo stato attuale
- `generate_functions_list.py` → scansiona tutti i file Python e aggiorna FUNZIONI_SISTEMA.txt
- RAG incremental → se MENTE/ è stata toccata negli ultimi 120 minuti, avvia rebuild in background (detached — non blocca gli altri)

Timeout 45 secondi per processo. Log strutturato. Ogni hook riporta: stato, tempo, output.

4.7 secondi per i due hook sincroni. RAG in background non blocca nulla.

Dal giorno dopo: ogni fine sessione produce automaticamente un file di riavvio aggiornato. Il contesto non si perde. Non devi ricordare di salvarlo — il sistema lo salva per te.

Questo è il principio: il sistema deve fare automaticamente le cose che fai ogni volta che ci pensi. Perché ci saranno sessioni in cui non ci pensi.

---

## ATTO III — RESEARCH AGENT v1.1

L'altra automazione della stessa sessione è più ambiziosa.

Il flusso di coscienza del 28 maggio aveva una riga: *"Rendere automatica e universitaria — trovare file, testi, informazioni, tesi universitarie da tutto il mondo e farle diventare utili al progetto."*

Research Agent v1.1 implementa esattamente questo.

13 sorgenti in parallelo:
- **Accademiche**: arXiv, OpenAlex, Semantic Scholar, BASE (Bielefeld), POLITesi (tesi politecniche italiane), CNKI (cinese — ingegneria manifatturiera)
- **Open access**: Unpaywall (versioni gratuite di paper a pagamento)
- **Codice**: GitHub (repository, implementazioni, benchmark)
- **Brevetti e standard**: DOAJ, CORE, EurLex, CrossRef

Una query — per esempio "epoxy granite damping CNC machine tool" — viene inviata in parallelo a tutte le sorgenti, i risultati vengono aggregati per rilevanza, deduplicati, e opzionalmente indicizzati nel RAG.

Il risultato: invece di cercare manualmente paper su Google Scholar, il sistema porta le tesi direttamente nel knowledge base. La mattina dopo una ricerca su Epoxy Granite, hai i paper pertinenti già indicizzati, interrogabili con RAG.

Non stai navigando il web. Stai costruendo un corpus di conoscenza specializzata che cresce con ogni sessione.

---

## CHIUSURA

Due automazioni. Una sessione.

La prima (stop_hooks) risolve il problema della continuità: il contesto non si perde più. La seconda (Research Agent) risolve il problema della conoscenza: il sapere disponibile cresce da solo.

Entrambe fanno la stessa cosa su scale diverse: convertono un'azione manuale ripetitiva in un processo automatico affidabile.

Il principio è vecchio quanto l'ingegneria: qualsiasi cosa fai tre volte con lo stesso risultato può e deve diventare un processo. La domanda è solo quanto tempo ti vuoi prendere per costruirlo prima che il costo del manuale superi il costo dell'automazione.

Nel caso del contesto di sessione: il costo del manuale era dieci minuti per sessione, spesso saltati. Il costo del sistema è stato una sessione di quattro ore. Break even: 24 sessioni. Con le sessioni attuali: tre settimane.

> *Non automatizzare perché sei pigro. Automatizza perché il tuo tempo vale più dell'operazione ripetitiva.*

---

**reel_hook:** "Ogni volta che chiudi una sessione con un AI, perdi contesto. Lo sai. Lo sai e lo lasci accadere lo stesso perché aggiornare i file manualmente ogni volta è noioso. Ho costruito un orchestratore che parte automaticamente quando Claude Code chiude. 4.7 secondi. Tre processi in parallelo: aggiorna il file di riavvio, aggiorna la lista delle funzioni, avvia RAG in background se hai toccato la knowledge base. Il giorno dopo apri, leggi 30 secondi di contesto, sei dentro. Non ho più perso un thread di lavoro da quando l'ho messo in produzione. L'automazione che nessuno vede è quella che funziona meglio."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 02 |
| Arco | Dal manuale all'automatico — la leva dell'intenzione |
| Tecnologie | ThreadPoolExecutor, subprocess, stop hooks, API multi-sorgente |
| Connessione S2 | Il sistema che coordina sé stesso — anticipa EP_S2_05 |

## FATTI (per il RAG)

- **FATTO:** `stop_hooks.py` è un orchestratore parallelo che si esegue automaticamente alla chiusura di ogni sessione Claude Code, lanciando 3 hook su ThreadPoolExecutor: `generate_restart_prompt.py` (aggiorna RIAVVIO_SESSIONE.txt), `generate_functions_list.py` (aggiorna FUNZIONI_SISTEMA.txt), e un RAG incremental rebuild in background (detached). **LOGICA:** Automatizza 4 operazioni manuali (~10 min) che venivano spesso saltate per stanchezza o fretta, evitando perdita cumulativa di contesto.

- **PRECISIONE:** I due hook sincroni di stop_hooks.py completano in **4.7 secondi**. Il RAG rebuild parte in background detached e non blocca gli altri processi. Timeout impostato a **45 secondi** per processo.

- **DECISIONE:** Il RAG rebuild viene avviato solo se la cartella MENTE/ è stata modificata negli **ultimi 120 minuti**. **LOGICA:** Evita rebuild inutili a ogni sessione, limitandolo ai casi in cui la knowledge base è stata effettivamente aggiornata.

- **FATTO:** Research Agent v1.1 interroga **13 sorgenti in parallelo**: arXiv, OpenAlex, Semantic Scholar, BASE (Bielefeld), POLITesi, CNKI, Unpaywall, GitHub, DOAJ, CORE, EurLex, CrossRef. I risultati vengono aggregati per rilevanza, deduplicati e opzionalmente indicizzati nel RAG di GENESIS.

- **DECISIONE:** Il break-even del sistema stop_hooks è stato calcolato in **24 sessioni** (~3 settimane al ritmo attuale). **LOGICA:** Costo manuale = 10 min/sessione spesso saltati; costo di costruzione del sistema = una sessione da 4 ore.

- **FATTO:** Commit di riferimento per entrambe le automazioni (stop_hooks + Research Agent v1.1): **8e33e09**, datato 28-29 maggio 2026.
