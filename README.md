# TITANIUM_OS

> *Quando il cervello non basta, costruisci un sistema.*

---

## La storia

Ci sono persone che lavorano il metallo di giorno e scrivono codice di notte.

Quindici anni di industria pesante: saldature TIG/MIG sul titanio per i team MotoGP, robot di assemblaggio, presse industriali, controllo qualità. Mani nell'acciaio, testa sempre su più fronti.

Il problema? Un cervello che funziona a raffica non può tenere tutto in memoria. Le idee arrivano a valanga, i progetti si moltiplicano, la concentrazione si spezza nel momento sbagliato. Un'agenda non basta. Un task manager non basta.

Serviva qualcosa di diverso: non uno strumento, ma un **sistema operativo per la mente**.

TITANIUM_OS è quel sistema. Costruito pezzo per pezzo, come si costruisce una macchina CNC — con precisione, con intenzione, senza sprechi.

---

## Cosa gestisce

| Pilastro | Cos'è | Stato |
|----------|-------|-------|
| **V32** | Fresatrice CNC 3 assi, 178 kg corpo unico — ±0.019 mm | Config G, 65% |
| **MIMS** | Sistema connettori modulari (prodotto industriale) | Attende pressa |
| **GENESIS** | Stack AI: RAG + MCP + automazioni + dashboard | Attivo |
| **VITA_NATURA** | Centro estetico — EVA bot WhatsApp per prenotazioni | In sviluppo |
| **IDENTITY** | Riposizionamento professionale | 20% |

---

## Architettura: 3 layer

```
┌──────────────────────────────────────────────┐
│  BRAIN / STATE.json   ← fonte unica di verità│
│  chi sono, dove sono, cosa faccio dopo       │
├──────────────────────────────────────────────┤
│  GENESIS STACK        ← il cervello AI       │
│  MCP server · RAG · daily brief · automazioni│
├──────────────────────────────────────────────┤
│  DASHBOARD React      ← il cruscotto visivo  │
│  stato live, nodi attivi, pilastri           │
└──────────────────────────────────────────────┘
```

### Layer 1 — BRAIN/STATE.json

Ogni sessione di lavoro inizia leggendo un file JSON. Contiene lo stato live di ogni progetto, il milestone attivo, i blockers, il prossimo step. Niente domande, niente recap. Operativi in 10 secondi.

```json
{
  "active_milestone": "Config G — Rinforzi colonne Z+U",
  "ciclo_position": "COSTRUISCI",
  "next_step": "Saldare 4 gusset 200mm sulla colonna Z sinistra",
  "blockers": ["Manca mandrino 2.2kW ER20 — da ordinare"],
  "pillars": {
    "V32": { "pct_complete": 65, "status": "in_progress" },
    "GENESIS": { "pct_complete": 40, "status": "building" }
  }
}
```

---

### Layer 2 — GENESIS Stack

Questo è il cuore del sistema. Quattro componenti che lavorano insieme.

#### 2a. MCP Server — `MCP/titanium_mcp_server.py`

Un **Model Context Protocol server** è il modo in cui Claude Code accede agli strumenti locali. Invece di leggere file manualmente ogni sessione, Claude carica il server e ha accesso diretto ai dati in tempo reale.

Il server espone 5 tool:

```
get_state          → legge BRAIN/STATE.json (o una sezione specifica)
update_milestone   → aggiorna milestone/pilastri/blockers direttamente
search_mente       → ricerca semantica su tutti i documenti in MENTE/
get_daily_brief    → genera il brief mattutino completo
list_content_ready → lista i file pronti per la pubblicazione
```

**Esempio pratico:** chiedo a Claude "qual è il prossimo step su V32?" — Claude chiama `get_state(section="pillars")` e risponde in tempo reale senza che io debba copiare/incollare niente.

Il server si carica automaticamente da `.claude/settings.json` ogni volta che si apre Claude Code.

---

#### 2b. RAG Engine — `NODES/MENTE_RAG/rag_engine.py`

**RAG** (Retrieval Augmented Generation) significa: invece di chiedere a un modello AI cosa sa di un argomento, gli dai tu i documenti giusti e lui risponde basandosi su quelli.

Tecnicamente:
- I documenti in `MICROINDUSTRY/MENTE/` vengono divisi in pezzi da 800 caratteri
- Ogni pezzo viene convertito in un vettore numerico da 384 dimensioni (un "embedding") usando il modello `paraphrase-multilingual-MiniLM-L12-v2` — funziona offline, capisce italiano/inglese/tedesco
- I vettori vengono salvati in **ChromaDB**, un database vettoriale locale
- Quando cerchi qualcosa, la query viene trasformata nello stesso tipo di vettore e ChromaDB trova i pezzi di documento più simili per significato (non solo per parole chiave)

```
MENTE/ (documenti) → embedding → ChromaDB → ricerca semantica
```

**Esempio pratico:** cerchi `rag "mandrino spindle V32"` → trova il documento con "Mandrino 2.2kW ER20 — DA ORDINARE" anche se non hai usato le stesse parole esatte.

```bash
rag "specifiche colonne Z"           # cerca per significato
rag-rebuild                          # ricostruisce l'indice dopo aver aggiunto documenti
rag --stats                          # 39 chunk indicizzati, modello, path
```

Indice attuale: **39 chunk** su V32, GENESIS, architetture AI, pattern di riferimento.

---

#### 2c. Daily Brief — `AUTOMATIONS/core/daily_brief.py`

Legge `BRAIN/STATE.json` e genera ogni mattina un report markdown pronto:

```markdown
# TITANIUM_OS — Daily Brief
**Wednesday 27 May 2026** | generato alle 07:30

## MILESTONE ATTUALE
Config G — Rinforzi colonne Z+U
Focus oggi: Saldare gusset sinistra — stima 3 ore officina

## BLOCKERS
  - Manca mandrino 2.2kW ER20 — da ordinare

## PILASTRI
  - V32 [in_progress] 65% → Gusset + diagonali + tiranti M10
  - GENESIS [building] 40% → MCP server operativo
```

Eseguibile con `brief` da terminale. Output salvato in `DATA/daily_brief_last.md`.

---

#### 2d. Automazioni Python — `AUTOMATIONS/core/`

Una pipeline silenziosa in background:

| Modulo | Cosa fa |
|--------|---------|
| `mente_watcher.py` | Guarda `MICROINDUSTRY/MENTE/` — quando aggiungi un file, trigghera `rag-rebuild` automaticamente |
| `archivista.py` | Backup con versionamento: 30 snapshot per file |
| `content_pipeline.py` | Documento grezzo → script LinkedIn + podcast + YouTube via Claude API |
| `elevenlabs_tts.py` | Testo → audio MP3 per episodi podcast |
| `social_distributor.py` | Distribuisce contenuti su più canali contemporaneamente |
| `deep_link.py` | Collega oggetti fisici (componenti V32) a documentazione digitale |

---

### Layer 3 — Dashboard React

Interfaccia stile terminale industriale. Legge `STATE.json` via `api_server.py` (porta 5001) e mostra tutto in tempo reale: milestone, nodi attivi, pilastri, content engine.

```bash
start-titanium    # avvia API + Dashboard in un comando
ti-status         # stato rapido da terminale
```

---

## Multi-Agente: THEMIS, EVA, AVA

Il sistema è progettato per ospitare agenti AI specializzati, ognuno con un dominio preciso:

| Agente | Ruolo | Stato |
|--------|-------|-------|
| **THEMIS** | Esecuzione tecnica — codice, analisi, V32, GENESIS | Attivo |
| **EVA** | Business automation — WhatsApp, prenotazioni Vita Natura | In sviluppo |
| **AVA** | YouTube avatar — script, reel, episodi podcast | Pianificato |
| ARIA | Life OS — scheduling, ADHD scaffolding | Futuro |
| NEXUS | Orchestratore — coordina gli altri agenti | Futuro |
| TESLA | Hardware/elettronica — CNC, PLC, IoT | Futuro |
| FORGE | Meccanica/officina — V32, MIMS, saldatura | Futuro |

La logica: ogni agente accede alla stessa knowledge base (`MENTE/`) ma opera nel suo dominio. EVA non sa di codice, THEMIS non sa di prenotazioni estetiche.

---

## La macchina fisica: V32

Mentre il software gira, in officina c'è una fresatrice CNC da 178 kg in costruzione da zero.

- **Struttura**: corpo unico — telaio traliccio saldato TIG (non più su sistema a molle)
- **Controllo**: HMI TP900 Comfort + PLC Siemens
- **Investimento**: EUR 2.250
- **Precisione RSS**: ±0.019 mm (IT6-IT7, equivalente a uno spessore di capello umano)
- **BEP**: 61 ore di lavoro = 1.4 mesi a tariffa EUR 45/h
- **ROI anno 1**: 322%
- **Milestone attivo**: Config G — rinforzi colonne Z+U (gusset 200mm + diagonali + tiranti M10)

Il software serve anche a questo: ogni decisione tecnica, ogni spec, ogni componente è documentato in `MENTE/V32/` e ricercabile via RAG.

---

## Stack tecnico

```
Python 3.11        — automazioni, API server, MCP, RAG
ChromaDB 1.5.x     — database vettoriale locale per RAG
SentenceTransformer — embeddings multilingua offline (384-dim)
MCP (Anthropic)    — protocollo per tool use nativo con Claude Code
React + Vite       — dashboard locale
Tailwind CSS       — UI
Flask              — API server porta 5001
n8n (locale)       — workflow automation (localhost:5678)
Claude API         — content generation, THEMIS/EVA
Windows 10 Pro     — OS host (Getac)
```

---

## Struttura del repo

```
TITANIUM_OS/
├── BRAIN/
│   ├── STATE.json          ← fonte unica di verità
│   └── KNOWLEDGE/          ← documenti tecnici interni
├── MCP/
│   └── titanium_mcp_server.py  ← 5 tool esposti a Claude Code
├── NODES/
│   ├── MENTE_RAG/          ← ChromaDB + SentenceTransformer
│   │   ├── rag_engine.py
│   │   └── chroma_db/      ← indice vettoriale (gitignored)
│   ├── MENTE_SCANNER/      ← estrae decisioni/spec da PDF/DOCX
│   └── MENTE_WATCHER/      ← watch fs → trigger rebuild
├── AUTOMATIONS/
│   └── core/               ← pipeline Python (brief, content, backup...)
├── DASHBOARD/              ← React + Vite (porta 5173)
├── DATA/                   ← output JSON, logs, brief generati
└── api_server.py           ← Flask porta 5001
```

---

## Avviare il sistema

```powershell
# Da PowerShell (con profilo TITANIUM_OS caricato)
start-titanium        # API server + Dashboard

# Strumenti AI
brief                 # genera daily brief
rag "query"           # ricerca semantica su MENTE/
rag-rebuild           # ricostruisce indice RAG

# Stato rapido
ti-status             # controlla API, GitHub auth, STATE.json
```

---

## Aggiungere conoscenza al sistema

Il RAG migliora ogni volta che aggiungi documenti:

```
1. Crea un file in MICROINDUSTRY/MENTE/[categoria]/
   Formato: qualsiasi .md .txt .pdf .docx

2. Usa il template MENTE/SESSIONI/_TEMPLATE.md
   per catturare decisioni dalle conversazioni Claude

3. Esegui: rag-rebuild

4. Il sistema ora conosce quella informazione
   e la usa nelle ricerche e nel daily brief
```

---

## L'origine

Nessuna laurea in informatica. Solo 15 anni di officina, un cervello che non si ferma mai, e la necessità assoluta di costruire strumenti che funzionino davvero.

TITANIUM_OS è lo scaffolding cognitivo di chi costruisce macchine fisiche e sistemi digitali allo stesso tempo. È anche la dimostrazione che chiunque — con abbastanza ostinazione — può costruire il proprio sistema operativo personale.

---

*Versione: 3.1.0 | Aggiornato: 2026-05-27 | Macchina: Getac | Sessione: #4*
