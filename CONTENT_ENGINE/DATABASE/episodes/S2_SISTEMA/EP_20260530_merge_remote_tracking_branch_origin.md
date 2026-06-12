<!-- TOC -->

- [TITANIUM_OS  S2E09](#titaniumos-s2e09)
  - [Gli Occhi del Sistema](#gli-occhi-del-sistema)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema degli Agenti Ciechi](#atto-i-il-problema-degli-agenti-ciechi)
  - [ATTO II  159 Elementi, Zero Chiamate](#atto-ii-159-elementi-zero-chiamate)
  - [ATTO III  Il Sistema che si Guarda](#atto-iii-il-sistema-che-si-guarda)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E09
## "Gli Occhi del Sistema"

*2026-05-30 — Sessione 16 — GENESIS 83%*

---

## COLD OPEN

La taverna è buia tranne lo schermo.

Sul monitor, una griglia di rettangoli colorati sovrapposta allo schermo del desktop — come una radiografia. Ogni pulsante, ogni campo di testo, ogni icona ha un contorno. Il sistema ha appena guardato se stesso per la prima volta, e ha trovato 159 cose.

Nessuna chiamata API. Nessun costo. Il modello gira in locale, sulla CPU, silenziosa come un motore a riposo.

Matteo guarda il log. `local=1 llm=0`.

---

## ATTO I — Il Problema degli Agenti Ciechi

C'è una cosa che nessuno dice quando costruisce un sistema di agenti AI: sono ciechi.

GENESIS, a maggio 2026, ha otto agenti operativi. C'è il RAG che recupera contesto dai documenti. C'è NEXUS che orchestra le richieste in parallelo. C'è il watchdog che controlla i processi ogni trenta secondi. C'è l'MCP server che espone gli strumenti a Claude. Ma nessuno di loro può guardare lo schermo.

Se vuoi che un sistema automatizzi qualcosa su un computer — aprire un file, cliccare un pulsante, leggere un campo — devi o scrivere codice esplicito per ogni azione, o dai occhi al sistema.

Matteo aveva scelto la prima opzione per mesi. Funzionava. Era laborioso.

Il problema vero non era tecnico: era economico. Ogni volta che serviva interpretare un'interfaccia grafica, la soluzione naturale era mandare uno screenshot a un modello vision. GPT-4o, Claude, qualcosa con gli occhi. Ma ogni chiamata costa. Trecento screenshot al giorno, in un sistema che gira h24 verso il 2030, diventano un numero che non sta in un budget da taverna.

Allora è entrato in gioco OmniParser.

---

## ATTO II — 159 Elementi, Zero Chiamate

OmniParser è un modello Microsoft open source. Prende uno screenshot e restituisce una lista strutturata di elementi UI: posizione, tipo, testo. Gira in locale. Gira sulla CPU. Non chiede niente a nessuno.

Il problema pratico era un path sbagliato.

ARGUS v1.0 era stato integrato il giorno prima — agente visivo, occhi del desktop, stilizzato in rosso nella dashboard (`glow ef4444, border red-500`). Ma al primo test reale, si bloccava. Il modello non veniva trovato. Il file si chiamava `model.pt`, non `best.pt` come il codice si aspettava.

Un carattere di differenza. Un'ora di debug.

Fix applicato. ARGUS v2 parte.

```
159 elementi rilevati
CPU, local=1 llm=0
```

Questo è il numero che conta. Non 159 come valore assoluto — un'interfaccia complessa ne ha di più, una semplice meno. Conta `llm=0`. Conta che il sistema ha analizzato uno schermo intero senza spendere nulla.

La strategia ibrida è questa: OmniParser locale gestisce l'ottanta percento dei task visivi — quelli semplici, quelli ripetitivi, quelli dove basta sapere dove cliccare. Il restante venti percento — interpretazione ambigua, testo complesso, ragionamento — passa a Claude Sonnet. Il costo complessivo scende dell'ottanta percento rispetto a mandare tutto al cloud.

Non è eleganza ingegneristica. È sopravvivenza economica per un progetto che deve durare anni.

---

## ATTO III — Il Sistema che si Guarda

C'è qualcosa di strano nel momento in cui ARGUS diventa operativo.

GENESIS, finora, era un sistema che *sapeva* cose — tramite il RAG, tramite i documenti, tramite la memoria delle sessioni. Ora è un sistema che può anche *vedere* cose. La differenza non è solo funzionale. È una soglia.

Il RAG graph-aware ha 114 nodi e 218 archi. C'è una catena hardcoded `V32→MIMS→VITA_NATURA` che rappresenta come i progetti si connettono tra loro nella testa di Matteo. NEXUS orchestra tre agenti in parallelo. Il watchdog non è più sequenziale — usa thread separati, risponde più veloce.

Ogni sessione aggiunge qualcosa. Non è accumulo casuale. C'è una direzione.

Però la taverna è ancora una taverna. Il V32 è al sessantacinque percento. La Config G — rinforzi colonne Z e U — è il milestone attivo. Il capannone è nel 2030. Tra il sistema software che guarda lo schermo e la macchina CNC da 178 kg che deve fare pezzi in titanio, c'è ancora tanta distanza.

ARGUS è il nono agente. Era uno slot vuoto nella lista.

Adesso ha gli occhi rossi sulla dashboard, e li usa.

---

## CHIUSURA

Alle 23:47 Matteo chiude il terminale.

Il commit è fatto. `fix: argus_v2 path pesi model.pt`. Sette parole per un'ora di lavoro. Nel git log sembrerà un dettaglio minore tra feature più grandi.

Ma la differenza tra un sistema che può vedere e uno che non può è questa: il path giusto sul file giusto. Non c'è niente di cinematografico in questo. C'è solo il momento prima — sistema bloccato — e il momento dopo — 159 elementi, zero chiamate.

Il codice non sa di essere importante. Lo schermo non sa di essere guardato.

Qualcuno tiene traccia, però. È per questo che esiste il log.

---

## reel_hook

159 elementi rilevati dallo schermo. Costo: zero. Ogni chiamata a un modello vision costa frazioni di centesimo — moltiplicale per un sistema che gira h24 per quattro anni verso il 2030. Ho installato gli occhi locali su GENESIS. Ma il path del modello era sbagliato. Un carattere. Un'ora. Poi ha visto.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E09 |
| **Titolo** | Gli Occhi del Sistema |
| **Data** | 2026-05-30 |
| **Sessione** | #16 |
| **Tag principali** | ARGUS, OmniParser, GENESIS, vision, local-AI |
| **Progetti coinvolti** | GENESIS, V32 |
| **GENESIS completamento** | 83% |
| **V32 completamento** | 65% |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Agenti totali** | 9 (ARGUS = #9) |
| **Metrica chiave** | 159 elementi rilevati, `local=1 llm=0`, costo -80% |
| **Co-autore commit** | Claude Sonnet 4.6 |
| **Prossimo target** | Capannone 15 luglio 2030 |

## FATTI (per il RAG)

- **FATTO:** ARGUS è il nono agente di GENESIS, agente visivo basato su OmniParser (Microsoft, open source), stilizzato in rosso nella dashboard (`glow ef4444, border red-500`). **LOGICA:** Aggiunge capacità di visione del desktop al sistema senza dipendere da API cloud.

- **DECISIONE:** OmniParser gira in locale su CPU con flag `local=1 llm=0`, senza chiamate a modelli esterni. Al primo test reale ha rilevato 159 elementi UI su uno screenshot. **LOGICA:** Eliminare il costo per ogni frame analizzato in un sistema h24.

- **DECISIONE:** Strategia ibrida visione: OmniParser locale gestisce l'80% dei task visivi (semplici, ripetitivi); il restante 20% (interpretazione ambigua, testo complesso) passa a Claude Sonnet. **LOGICA:** Riduzione stimata dell'80% del costo rispetto a inviare tutti gli screenshot al cloud.

- **FATTO:** Bug risolto in ARGUS v1.0→v2: il file pesi si chiamava `model.pt`, non `best.pt` come atteso dal codice. Commit: `fix: argus_v2 path pesi model.pt`. **LOGICA:** Un path errato bloccava l'intero agente visivo; fix richiesto ~1 ora di debug.

- **FATTO:** Al 2026-05-30 (Sessione #16): GENESIS al 83% di completamento, V32 al 65%. Il RAG graph-aware conta 114 nodi e 218 archi, con catena hardcoded `V32→MIMS→VITA_NATURA`. Milestone attivo V32: Config G — Rinforzi colonne Z e U.

- **FATTO:** GENESIS conta otto agenti operativi prima di ARGUS: RAG, NEXUS (orchestrazione parallela), watchdog (polling ogni 30 secondi, su thread separati), MCP server. ARGUS è lo slot nove.
