# TITANIUM_OS

> *Quando il cervello non basta, costruisci un sistema.*

---

## Cos'è

TITANIUM_OS è il sistema operativo cognitivo che gestisce **Microindustry** — un'entità operativa che produce valore fisico e digitale allo stesso tempo.

Non è un framework generico. È costruito intorno a un caso d'uso specifico: un artigiano industriale che costruisce una fresatrice CNC di precisione, un sistema di connettori modulari (MIMS) per sfidare l'alluminio estruso di mercato, e una pipeline automatizzata che trasforma ogni milestone in contenuto, conoscenza, e dataset AI.

Un uomo. Un sistema. Valore misurabile ogni giorno.

---

## La catena

```
OFFICINA                              GENESIS STACK
    │                                       │
    ▼                                       ▼
V32 CNC ──→ VULCAN pressa ──→ MIMS tiles ──→ FIT PARK 4.0
(±0.019mm)  (20t polimeri)   (vs alu estr.)  (prodotto mercato)
    │
    └──→ TITANIUM_OS
              ├── RAG ibrido           — ogni decisione tecnica ricercabile
              ├── 8 agenti AI          — ognuno nel suo dominio
              ├── Calendario notturno  — 5 task automatici mentre dormi
              ├── Content Engine       — da milestone a episodio podcast
              └── ARGUS v2            — computer use con visione AI
```

---

## Architettura: 3 layer

### Layer 1 — BRAIN/STATE.json

La fonte unica di verità. Ogni sessione inizia leggendo questo file: milestone attivo, blockers, prossimo step, stato di ogni pilastro. Nessuna domanda, nessun recap. Operativi in 10 secondi.

```json
{
  "active_milestone": "Config G — Rinforzi colonne Z+U",
  "next_step": "Saldare 4 gusset 200mm sulla colonna Z sinistra",
  "blockers": ["Manca mandrino 2.2kW ER20 — da ordinare"],
  "pillars": {
    "V32":     { "pct_complete": 65, "status": "in_progress" },
    "GENESIS": { "pct_complete": 83, "status": "building" },
    "MIMS":    { "pct_complete": 30, "status": "waiting_v32" }
  }
}
```

---

### Layer 2 — GENESIS Stack

#### MCP Server — `MCP/titanium_mcp_server.py`

Model Context Protocol server: Claude Code si collega e ha accesso diretto ai dati locali in tempo reale, senza copiare o incollare niente.

```
get_state          → legge STATE.json o una sezione specifica
update_milestone   → aggiorna milestone/pilastri/blockers
search_mente       → ricerca semantica su MENTE/ (RAG)
get_daily_brief    → brief mattutino completo
list_content_ready → file pronti per pubblicazione
nexus_query        → interroga lo swarm NEXUS
rag_update         → aggiorna indice RAG incrementalmente
```

---

#### RAG v4.0 — `NODES/MENTE_RAG/rag_engine.py`

Retrieval Augmented Generation ibrido — non risponde da training, risponde dai tuoi documenti.

```
Input: MICROINDUSTRY/MENTE/ (800+ documenti IT/EN/DE)
       ↓
Embedding: paraphrase-multilingual-MiniLM-L12-v2 (384-dim, offline)
       ↓
Indice dual: ChromaDB (semantico) + TF-IDF BM25 (keyword)
       ↓
Reranker: cross-encoder/ms-marco-MiniLM-L-6-v2 → top-5 da top-15
       ↓
Merge: Reciprocal Rank Fusion (k=60)
       ↓
Output: chunk rilevanti con score, usati da Claude come contesto
```

Incrementale: solo i file modificati vengono re-embeddati (<20 sec).

```bash
rag "specifiche colonne Z"    # ricerca per significato
rag-update                    # aggiorna solo file nuovi/modificati
rag-rebuild                   # reset completo
```

Repo standalone: [hybrid-rag](https://github.com/Microindustry/hybrid-rag)

---

#### NEXUS Swarm — `NODES/NEXUS/nexus.py`

Orchestratore multi-agente con ThreadPoolExecutor. Query complessa → NEXUS distribuisce agli agenti specializzati in parallelo → aggrega i risultati.

```
nexus "analisi strutturale colonna Z V32"
    ├── THEMIS   → analisi tecnica codice/sistema
    ├── FORGE    → meccanica, saldatura, officina
    └── TESLA    → elettronica, sensori, PLC
    → risultato aggregato in <5 sec
```

---

#### ARGUS v2 — `NODES/COMPUTER_USE/argus_v2.py`

Computer use con architettura ibrida a 3 livelli — costo API -80% rispetto a Sonnet puro.

```
L1 — OmniParser locale (YOLO + OCR)   → fast, gratis, preciso per elementi standard
L2 — Text matching                     → cerca testo esatto nell'output L1
L3 — Claude Sonnet fallback            → solo se L1/L2 falliscono
```

Repo standalone: [desktop-agent](https://github.com/Microindustry/desktop-agent)

---

#### Story Agent — `NODES/STORY_AGENT/story_agent.py`

Ogni notte alle 02:07 legge i commit Git delle ultime 24h e genera episodi podcast narrativi in automatico.

```
git log → milestone estratti → Claude Haiku (draft) → Claude Sonnet (final)
       → EP_AUTO_XXX.md con frontmatter → storieData.ts aggiornato
       → dataset LLM training (.jsonl)
```

36+ episodi generati. Ogni milestone diventa prova documentata.

Repo standalone: [git-narrator](https://github.com/Microindustry/git-narrator)

---

#### Calendario notturno

| Ora | Task | Descrizione |
|-----|------|-------------|
| 02:07 | Story Agent | Genera episodi dai commit |
| 03:00 | Deep Freeze | Backup AES-256 + snapshot |
| 03:37 | Night Research | Scansiona 13 database scientifici |
| 04:07 | Night Push | `git push` automatico |
| 07:30 | Daily Brief | Report mattutino in `DATA/daily_brief_last.md` |

Repo ricerca standalone: [multi-source-research](https://github.com/Microindustry/multi-source-research)

---

### Layer 3 — Dashboard v7.0

React 19 + Vite + Tailwind v4. Legge `STATE.json` via API server (porta 5001).

```
Views principali:
  AgentsView      — stato live 8 agenti, glassmorphism + dot grid
  MAPPA v2.0      — drill-down SVG immersiva, pilastri cliccabili
  RETE t-SNE 3D   — Three.js, nodi knowledge base in spazio 3D
  StorieView      — 36+ episodi, timeline narrativa
  MatteoSection   — CV immersivo: skill tree + principi + timeline
  CanvasView      — canvas draggabile, milestone live
```

---

## 8 Agenti AI

| Agente | Dominio |
|--------|---------|
| **THEMIS** | Tecnico: codice, analisi, V32, GENESIS |
| **FORGE** | Meccanica: officina, saldatura, MIMS, CNC |
| **TESLA** | Hardware: elettronica, PLC Siemens, IoT |
| **LEX** | Legale: brevetti, GDPR, contratti |
| **SIEMENS** | Automazione: S7, HMI TP900, Profinet |
| **AQUA** | Fluidodinamica e materiali |
| **ARIA** | Life OS: ADHD scaffolding, scheduling |
| **EVA** | Business: WhatsApp, prenotazioni Vita Natura |

Tutti accedono alla stessa knowledge base RAG. Ognuno opera solo nel suo dominio.

```bash
ask FORGE "qual è il gioco ottimale per i tiranti M10 Config G?"
ask TESLA "compatibilità encoder Siemens con drive attuale V32?"
```

---

## MIMS — sfidare l'alluminio estruso

Il mercato delle strutture modulari industriali è dominato da profili in alluminio estruso (Item, Bosch Rexroth, MayTec). Standard, costosi, supply chain lunga, zero lock-in.

MIMS rompe questo schema:
- **Tiles in polimero composito** — prodotte da VULCAN (pressa 20t + ricette proprietarie A/B/C)
- **Connettore fisico brevettato** — non interoperabile con standard di mercato
- **Produzione locale on-demand** — V32 produce le tiles, niente supply chain esterna
- **Prima applicazione**: Fit Park 4.0 — area fitness con tornello MIMS proprietario

La catena: V32 produce → VULCAN stampa → MIMS connette → FitPark installa.

---

## Stack tecnico

```
Fisico      TIG/MIG titanio · Alu 7075 CNC · Siemens S7+TP900 · Pressa VEVOR 20t
AI          Claude Sonnet 4.6 (orchestrazione) · Haiku 4.5 (content gen)
            OmniParser + YOLO (ARGUS v2) · CrossEncoder (RAG rerank)
Backend     Python 3.11 · Flask · ChromaDB · SentenceTransformer · MCP Anthropic
Frontend    React 19 · TypeScript · Vite · Tailwind v4 · Three.js · Zustand · TanStack Query
Automation  n8n (locale) · Task Scheduler Windows · Git hooks
Integraz.   Gmail MCP · Google Calendar MCP · IFTTT
Infra       GitHub · Windows 10 Pro Getac · self-hosted
```

---

## Struttura repo

```
TITANIUM_OS/
├── BRAIN/
│   ├── STATE.json              ← fonte unica di verità
│   ├── KNOWLEDGE/              ← documenti tecnici interni
│   └── RULES.md                ← regole operative sistema
├── MCP/
│   └── titanium_mcp_server.py  ← 7 tool esposti a Claude Code
├── NODES/
│   ├── MENTE_RAG/              ← RAG v4.0 ibrido BM25+semantico+CrossEncoder
│   ├── NEXUS/                  ← swarm orchestrator multi-agente
│   ├── AGENTS/                 ← agents_db.json + validator_agent.py
│   ├── STORY_AGENT/            ← generazione episodi da git log
│   ├── COMPUTER_USE/           ← ARGUS v2 + ScreenAgent
│   ├── RESEARCH_AGENT/         ← 13 sorgenti scientifiche
│   ├── MENTE_SCANNER/          ← estrazione doc da PDF/DOCX
│   └── MENTE_WATCHER/          ← watch fs → trigger RAG update
├── AUTOMATIONS/
│   └── core/                   ← daily_brief · night_push · deep_freeze
├── DASHBOARD/                  ← React 19 + Vite (porta 5173)
├── CONTENT_ENGINE/             ← 36+ episodi · dataset .jsonl
├── DATA/                       ← output JSON · logs · brief · views
└── api_server.py               ← Flask porta 5001
```

---

## Avviare il sistema

```powershell
start-titanium        # API server + Dashboard
brief                 # daily brief
rag "query"           # ricerca semantica su MENTE/
rag-update            # aggiorna RAG incrementalmente
screen "azione"       # ARGUS v2 computer use
ask AGENTE "query"    # interroga un agente specifico
nexus "query"         # swarm tutti gli agenti rilevanti
ti-status             # controlla stato sistema
```

---

## Repo standalone delle automazioni

| Repo | Cosa fa |
|------|---------|
| [hybrid-rag](https://github.com/Microindustry/hybrid-rag) | RAG locale ibrido BM25+semantico+CrossEncoder |
| [git-narrator](https://github.com/Microindustry/git-narrator) | Da git log a episodi podcast narrativi |
| [desktop-agent](https://github.com/Microindustry/desktop-agent) | Computer use: controlla qualsiasi finestra o browser |
| [claude-session-bridge](https://github.com/Microindustry/claude-session-bridge) | Continuità di sessione zero-friction per Claude Code |
| [multi-source-research](https://github.com/Microindustry/multi-source-research) | Ricerca su 13 database scientifici in un comando |

---

## Chi costruisce questo

Nessuna laurea in informatica. 15 anni di industria pesante: TIG/MIG titanio scarichi MotoGP @ SCProject, robot ESSEGI, presse DATWLER, QC LU.VE.

TITANIUM_OS è lo scaffolding cognitivo di chi costruisce macchine fisiche e sistemi digitali allo stesso tempo. È anche la dimostrazione che chiunque — con abbastanza ostinazione — può costruire il proprio sistema operativo personale.

---

*Versione: 7.0.0 | Aggiornato: 2026-05-31 | Macchina: Getac*
