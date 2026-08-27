<!-- TOC -->

- [SCALA GENESIS  la rotta a gradini](#scala-genesis-la-rotta-a-gradini)
  - [00  CATTURA](#00-cattura)
  - [01  STATO ATTUALE](#01-stato-attuale)
  - [SCALA](#scala)
    - [x S0  Ricognizione FounderOS  CHIUSO 16/08](#x-s0-ricognizione-founderos-chiuso-1608)
    - [x S1  Schema 8 tabelle  CHIUSO 16/08](#x-s1-schema-8-tabelle-chiuso-1608)
    - [x S2  Migrazione dati  CHIUSO 16/08](#x-s2-migrazione-dati-chiuso-1608)
    - [x S3  Repository layer  CHIUSO 27/08 (sessione 71)](#x-s3-repository-layer-chiuso-2708-sessione-71)
    - [S4  Org Chart in DASHBOARD](#s4-org-chart-in-dashboard)
    - [S5  Connector honesty](#s5-connector-honesty)
    - [S6  Run  costi USD](#s6-run-costi-usd)
    - [S7  Skills su schedule](#s7-skills-su-schedule)
    - [S8  Handoff di sessione](#s8-handoff-di-sessione)
  - [WORKSTREAM SOCIAL (W1-W3)](#workstream-social-w1-w3)
    - [W1  Coda programmata](#w1-coda-programmata)
    - [! W2  Postiz / LinkedIn Pagina](#w2-postiz-linkedin-pagina)
    - [W3  Bozze da far uscire](#w3-bozze-da-far-uscire)
  - [PARCHEGGIO](#parcheggio)
  - [SCARTATO](#scartato)
  - [CHANGELOG](#changelog)

<!-- /TOC -->

# SCALA GENESIS — la rotta a gradini

*Creato: 2026-08-16 (sessione #70) · Il file era stato scritto nella #69 ma mai salvato su disco: questa è la ricreazione.*

**Legenda:** `[ ]` da fare · `[~]` in corso · `[x]` fatto · `[!]` bloccato · `[-]` scartato

**Le due regole della scala:**
1. Un gradino si chiude solo quando **GIRA**, non quando è "quasi".
2. **Non si salgono due gradini insieme.** Se S1 non chiude, S2 non si apre.

> Cos'è: l'integrazione dello schema **FounderOS** (`github.com/Bennettxai/FounderOS-DEMO`, licenza MIT)
> dentro GENESIS. Oggi lo stato di GENESIS vive sparso tra JSON, file .md e la dashboard.
> FounderOS dà lo scheletro relazionale (dipartimenti → agenti → run → costi) che manca.
> Si prende lo **schema**, non il prodotto: il blocco social/funnel di FounderOS si scarta.

---

## 00 · CATTURA
*Zona buttadentro. Zero filtri, zero ordine, zero giudizio. Si scrive qui e basta — smistare è un altro lavoro.*

- 
- 
- 

---

## 01 · STATO ATTUALE

| | |
|---|---|
| **Gradino corrente** | S4 — Org Chart in DASHBOARD (S0, S1, S2, S3 chiusi) |
| **Bloccanti** | nessuno sul software. (Hardware fuori scala: UPS, mandrino ER20, martinetto Vevor) |
| **Ultima sessione** | #71 — 2026-08-27 · S3 chiuso (repos.py), batch 3 gruppo 1 applicato |
| **Prossima mossa** | S4: l'organigramma dal db in DASHBOARD (oggi l'albero si vede solo da CLI) |
| **Decisione aperta** | i 6 dipartimenti non hanno una casa per gli agenti di CONTENUTO/SISTEMA (GENESIS non è nella lista). Oggi stanno sotto OFFICINA. Serve un 7° dipartimento? |

---

## SCALA

### `[x]` S0 — Ricognizione FounderOS — **CHIUSO 16/08**
- [x] clone read-only in `ARCHIVE/REFERENCE/founderos` (MIT). Aggiunto a `.gitignore`: ha il suo `.git`, non entra nel nostro repo
- [x] `npm install` — **si è rotto e l'ho aggirato**: `better-sqlite3@11` non ha binari precompilati per Node v24 e la macchina non ha i VS Build Tools → `node-gyp` fallisce. Installato il resto con `--ignore-scripts` e affiancato `better-sqlite3@12.11.1` (che il prebuild per Node 24 ce l'ha) con `--no-save`, senza toccare il `package.json` altrui
- [x] `npm run seed` → 6 dipartimenti, 30 agenti, 36 tool, 13 roadmap
- [x] `npm run dev` su `:4100` — Next 14.2.35, `GET /org 200`
- [x] guardato: org chart ad albero (life areas → crew → agenti con tier → tool per agente)
- [x] cosa si prende: lo schema relazionale. Cosa si butta: social, funnel, broadcast, persona, metric, lead magnet

> **Chiude quando:** l'org chart gira con dati finti. ✔ gira.

---

### `[x]` S1 — Schema 8 tabelle — **CHIUSO 16/08**
- [x] `CORE/genesis_db.py` — SQLite stdlib, **zero dipendenze nuove**
- [x] `departments` · `agents` (tier `lead|specialist|worker` + **`parent_id` ricorsivo**) · `agent_runs` · `agent_tasks` · `agent_crons` · `skills` · `sop_tasks` · `tools`
- [x] scartato tutto il blocco social/funnel di FounderOS
- [x] tre scelte diverse da FounderOS, volute: **`parent_id`** (lì la gerarchia era solo implicita nel tier) · **costo nel run** (`model`, `tokens_in/out`, `cost_usd` — serve a S6) · **FOREIGN KEY attive** (`PRAGMA foreign_keys=ON`: l'integrità la tiene il db, non la buona volontà)

> **Chiude quando:** `genesis_db.init()` crea il `.db`. ✔ `DATA/genesis.db`, 8/8 tabelle, idempotente su due esecuzioni.

---

### `[x]` S2 — Migrazione dati — **CHIUSO 16/08**
- [x] `CORE/genesis_seed.py` **IDEMPOTENTE** (UPSERT su chiave stabile — rilanciato due volte: 6/12/7 invariati)
- [x] dipartimenti: V32 · MIMS · VITA-NATURA · FIT-PARK · FINANZE · OFFICINA
- [x] agenti: THEMIS · AVA · EVA + **9 worker veri** (NINA_AGENT, STORY_AGENT, AUDIT_AGENT, RESEARCH_AGENT, MENTE_RAG, AI_NEWS_WATCHER, CAROSELLI, RETENTION, SELF_IMPROVE) — ognuno col suo `entrypoint` reale
- [x] 7 strumenti con un campo `probe`: **come si verifica che sia vivo**, non "configurato" (predispone S5)
- [x] `STATE.json` **RESTA SEPARATO** — non toccato, non importato
- [!] **da decidere**: gli agenti di contenuto/sistema stanno sotto OFFICINA perché GENESIS non è uno dei 6 dipartimenti. Serve un 7° dipartimento o va bene così?

> **Chiude quando:** una query SQL ridà l'albero. ✔ CTE ricorsiva `WITH RECURSIVE albero(...)`, 3 lead + 9 worker annidati.

---

### `[x]` S3 — Repository layer — **CHIUSO 27/08 (sessione #71)**
- [x] `CORE/repos.py`: tutte le query stanno lì. Riceve una **connessione già aperta**
      (quella di `genesis_db.connect`, FK attive + `row_factory=Row`): non apre sessioni e
      non sa dove sta il `.db`. Serve a poter contare le righe **dentro** la transazione del
      seed, prima del commit — altrimenti il seed non vedrebbe la propria scrittura.
- [x] nessuna SQL sparsa: `genesis_db.info()` e `genesis_seed.seed()/albero()` chiamano `repos`.
      La CTE ricorsiva dell'albero è migrata da `genesis_seed` a `repos.ALBERO_SQL`.
- [x] `TABELLE` è la **whitelist**: SQLite non può parametrizzare un nome di tabella, quindi
      finisce per forza in una f-string — `conteggio()` rifiuta ciò che non è in lista.
      È l'unico punto del layer dove un identificatore entra nel testo della query.
- [x] **fix trovato salendo**: `genesis_seed.py --albero` non era mai arrivato in fondo su
      console Windows (`UnicodeEncodeError` sul box-drawing `└─`). `sys.stdout` in utf-8.

> **Chiude quando:** `grep SELECT` fuori da `repos.py` = 0. ✔ **verificato 27/08**:
> `grep -rn "SELECT" --include=*.py CORE/ | grep -v repos.py` → vuoto (7 SELECT, tutte in `repos.py`).
> Regressione: `--info` (8 tabelle, 6+12+7 righe) e `--albero` girano identici a prima.

---

### `[ ]` S4 — Org Chart in DASHBOARD
- [ ] endpoint che serve l'albero
- [ ] vista org chart, i 6 dipartimenti navigabili

> **Chiude quando:** vedi i 6 dipartimenti e ci clicchi dentro.

---

### `[ ]` S5 — Connector honesty
- [ ] ogni connettore dichiara se è davvero vivo (non "configurato")
- [ ] il contatore legge lo stato reale, non la config

> **Chiude quando:** "N/M systems live" dice il vero.

---

### `[ ]` S6 — Run + costi USD
- [ ] ogni run scrive in `agent_runs` (modello, token, esito)
- [ ] costo in USD calcolato per run

> **Chiude quando:** sai quanto costa GENESIS al giorno.

---

### `[ ]` S7 — Skills su schedule
- [ ] `skills` + `agent_crons` collegati allo scheduler reale
- [ ] una skill parte da sola, di notte

> **Chiude quando:** una cosa succede mentre dormi.

---

### `[ ]` S8 — Handoff di sessione
- [ ] lo stato di sessione si legge dal db, non dal racconto
- [ ] apertura sessione = lettura, non spiegazione

> **Chiude quando:** apri una sessione nuova e non devi spiegare niente.

---

## WORKSTREAM SOCIAL (W1-W3)
*Parallelo. **Non blocca la scala**: se W è fermo, S continua.*

### `[~]` W1 — Coda programmata
- [x] 18/21 post programmati su 2 profili (Business Suite auto-pubblica)
- [ ] i 3 rimasti (Nina EP_N2_05 + EP_N2_06, Sistema GENESIS EP_SG_02_04): erano bloccati dal tetto 29 giorni — **la finestra è passata, da riprogrammare**
- [ ] caption pronte in `POSTER/_NINA_/_SISTEMA_COPIA_INCOLLA.md`

### `[!]` W2 — Postiz / LinkedIn Pagina
- [!] pubblicare sulla Pagina richiede scope `organization` = Community Management API, **in attesa di concessione LinkedIn** (muro esterno, non config)
- [ ] alla concessione: `docker compose start` → connetti Pagina microindustry → test EP_SG_02_01

### `[ ]` W3 — Bozze da far uscire
- [ ] 6 bozze pronte: EP_N2_07/08 · EP_SG_02_05/06 · EP_SG_03_01/02 · EP_SG_04_01
- [ ] EP_N2_09: slide 2 vuota (scena `biblioteca` non è in `sg_builder.SCENES`)
- [ ] EP_SG_03_03: numero pubblico ±0,019 mm + open-loop all'indietro → da sistemare prima di uscire
- [ ] +3 bozze nuove trovate il 16/08: EP_N2_10/11/12 in `_BOZZE/`

---

## PARCHEGGIO
*Idee buone, momento sbagliato. Non si buttano, non si fanno adesso.*

- [ ] BGE-M3 come embedder (script one-click già pronto: `SERVICES/rebuild_rag_bge_m3.ps1`) — serve GPU libera + UAC
- [ ] LightRAG pilota
- [ ] `rag_recover --drop-hnsw` per il 503 su `/api/rag/vectors` — è un click di Matteo (UAC)

---

## SCARTATO
*Con il motivo. Serve a non riproporlo tra tre mesi.*

- [-] Regola "solo Python interno" — bloccava l'integrazione · 2026-08-07

---

## CHANGELOG

| Data | Sessione | Cosa |
|---|---|---|
| 2026-08-16 | #70 | File ricreato (era stato scritto nella #69 ma mai salvato). Scala S0→S8 posata. |
| 2026-08-16 | #70 | **S0 chiuso** — FounderOS clonato e girato su :4100 (aggirato il muro `better-sqlite3`/Node 24). |
| 2026-08-16 | #70 | **S1 chiuso** — `CORE/genesis_db.py`, 8 tabelle, `DATA/genesis.db` creato. |
| 2026-08-16 | #70 | **S2 chiuso** — `CORE/genesis_seed.py` idempotente, l'albero torna da una CTE ricorsiva. |
| 2026-08-16 | #70 | **REGOLE unificate** — `CLAUDE.md` fonte unica (12 regole: +11 propone/approva, +12 insegna), `BRAIN/RULES.md` derivato via `sync_regole.py`, tappata la radice in `setup.py`. |
| 2026-08-16 | #70 | **REGOLE GRAFICHE scritte** — `BRAIN/REGOLE_GRAFICHE.md`: palette 5 accent+neutro+allarme e lingua icone (lucide=interfaccia, emoji=contenuto). Erano ferme dalla #57. |
