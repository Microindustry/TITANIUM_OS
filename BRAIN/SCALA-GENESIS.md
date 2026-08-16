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
| **Gradino corrente** | S3 — Repository layer (S0, S1, S2 chiusi) |
| **Bloccanti** | nessuno sul software. (Hardware fuori scala: UPS, mandrino ER20, martinetto Vevor) |
| **Ultima sessione** | #70 — 2026-08-16 · scala ricreata, blocchi A e B chiusi, saliti 3 gradini |
| **Prossima mossa** | `repos.py`: portare dentro tutte le query, poi `grep SELECT` fuori = 0 |
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

### `[ ]` S3 — Repository layer
- [ ] `repos.py`: tutto l'accesso ai dati passa da lì
- [ ] nessuna SQL sparsa nei nodi

> **Chiude quando:** `grep SELECT` fuori da `repos.py` = 0.

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
