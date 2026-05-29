# MANUALE TITANIUM_OS — Guida completa al sistema
*Versione: 1.0 | 2026-05-28 | Aggiornato: ad ogni sessione significativa*

> **Come usare questo manuale**
> Leggi dall'inizio per capire il sistema nella sua totalità.
> Oppure vai diretto alla sezione che ti serve — ogni sezione è autonoma.
> Ogni comando è mostrato prima in forma semplice, poi con tutti i parametri disponibili.

---

## INDICE

1. [Cos'è TITANIUM_OS](#1-cosè-titanium_os)
2. [Aprire il sistema](#2-aprire-il-sistema)
3. [Navigazione rapida](#3-navigazione-rapida)
4. [RAG — la tua memoria esternalizzata](#4-rag--la-tua-memoria-esternalizzata)
5. [Agenti validatori](#5-agenti-validatori)
6. [Research Agent — ricerca accademica](#6-research-agent--ricerca-accademica)
7. [Claude Code — il tuo co-pilot](#7-claude-code--il-tuo-co-pilot)
8. [Dashboard e API Server](#8-dashboard-e-api-server)
9. [Git — salva e sincronizza il lavoro](#9-git--salva-e-sincronizza-il-lavoro)
10. [Media — PDF e foto](#10-media--pdf-e-foto)
11. [Controllo sistema](#11-controllo-sistema)
12. [Flussi di lavoro completi](#12-flussi-di-lavoro-completi)
13. [Troubleshooting](#13-troubleshooting)
14. [Glossario tecnico](#14-glossario-tecnico)
15. [Come aggiornare questo manuale](#15-come-aggiornare-questo-manuale)

---

## 1. Cos'è TITANIUM_OS

TITANIUM_OS è il tuo sistema operativo cognitivo personale. Non è un programma singolo — è un ecosistema di strumenti che lavorano insieme per:

- **Ricordare al posto tuo** (RAG, MENTE/)
- **Validare decisioni tecniche** (Agenti: tesla, forge, aqua, ecc.)
- **Trovare ricerca accademica** (Research Agent, 11 sorgenti)
- **Tenere traccia dello stato del progetto** (STATE.json, Dashboard)
- **Automatizzare le operazioni ripetitive** (Hook, script, alias)

### Struttura a livello alto

```
C:\Users\benen\
├── TITANIUM_OS\
│   ├── TITANIUM_OS\        ← TUTTO IL CODICE (repo git)
│   │   ├── BRAIN\          ← STATE.json (stato del sistema)
│   │   ├── NODES\          ← moduli attivi (RAG, Agenti, Research...)
│   │   ├── AUTOMATIONS\    ← script automatici
│   │   ├── DASHBOARD\      ← interfaccia web React
│   │   ├── MCP\            ← integrazione con Claude Code
│   │   └── DOCS\           ← questo manuale
│   └── _VAULT\KEYS\        ← API keys e segreti (MAI nel git)
│
├── MICROINDUSTRY\
│   ├── MENTE\              ← LA TUA BASE DI CONOSCENZA (fonte del RAG)
│   │   ├── V32\            ← tutto sul CNC V32
│   │   ├── OFFICINA\       ← attrezzatura, fornitori
│   │   ├── SESSIONI\       ← note di ogni sessione Claude
│   │   └── ASSOLUTO\       ← documenti master (V7, V8...)
│   ├── CAD\                ← file 3D (STL, STEP, DXF)
│   ├── FOTO\               ← documentazione visiva build
│   └── FINANCE\            ← conti, BEP, ROI
│
└── Desktop\
    ├── RIAVVIO_SESSIONE.txt  ← prompt pronto per riaprire Claude
    └── FUNZIONI_SISTEMA.txt  ← lista di tutti i comandi disponibili
```

### Concetto chiave: il loop che si autoalimenta

```
Lavori in officina / leggi qualcosa / prendi una decisione
        ↓
Scrivi una nota in MENTE/SESSIONI/  (60 secondi)
        ↓
rag-update  (20 secondi — indicizza la nota)
        ↓
La prossima volta che chiedi a Claude, sa già quella cosa
        ↓
Risposta migliore → decisione migliore → altra nota → loop
```

Ogni documento aggiunto a MENTE/ vale per tutte le sessioni future. È interesse composto sulla conoscenza.

---

## 2. Aprire il sistema

### Apertura rapida (modo normale)

Apri PowerShell e digita:

```powershell
claude-ti
```

Questo:
1. Ti porta nella cartella `TITANIUM_OS/TITANIUM_OS/`
2. Apre Claude Code con tutti i permessi abilitati
3. Claude legge automaticamente `STATE.json` e ti dice dove eri rimasto

### Apertura da zero (dopo riavvio PC)

```powershell
start-titanium   # avvia API (porta 5001) + Dashboard (porta 5173)
claude-ti        # apre Claude Code
```

### Riaprire una sessione interrotta

Sul Desktop hai `RIAVVIO_SESSIONE.txt`. Contiene un prompt pronto. Procedura:

1. Apri Claude Code (`claude-ti`)
2. Copia il testo da `RIAVVIO_SESSIONE.txt`
3. Incollalo come primo messaggio
4. Claude sa esattamente dove eri rimasto

### Aggiornamento automatico al login (se configurato)

Se hai configurato `START_LOGIN.bat`, al login di Windows si apre automaticamente un terminale con Claude Code già pronto in `TITANIUM_OS/`.

---

## 3. Navigazione rapida

Tutti questi comandi sostituiscono `cd C:\Users\benen\...` con una parola sola.

### Navigazione TITANIUM_OS

| Comando | Dove va | Quando usarlo |
|---------|---------|---------------|
| `ti` | `TITANIUM_OS/TITANIUM_OS/` | lavorare sul codice |
| `tiv` | `TITANIUM_OS/_VAULT/` | gestire segreti/API keys |
| `tirepo` | `TITANIUM_OS/` | root del repository git |
| `tiw` | `TITANIUM_OS/WORKSPACE/` | progetti locali pre-git |

### Navigazione MICROINDUSTRY

| Comando | Dove va | Quando usarlo |
|---------|---------|---------------|
| `mi` | `MICROINDUSTRY/` | root progetti |
| `mente` | `MICROINDUSTRY/MENTE/` | base di conoscenza |
| `cad` | `MICROINDUSTRY/CAD/` | file 3D |
| `foto` | `MICROINDUSTRY/FOTO/` | documentazione visiva |
| `fin` | `MICROINDUSTRY/FINANCE/` | finanza |
| `ce` | `MICROINDUSTRY/CONTENT_ENGINE/` | YouTube, podcast, script |
| `ws` | `MICROINDUSTRY/WORKSPACE/` | lavoro corrente |
| `pers` | `PERSONALE/` | documenti personali |
| `inbox` | `Desktop/INBOX/` | drop zone per file da processare |

### Comandi di apertura file/cartelle

| Comando | Cosa fa |
|---------|---------|
| `exp` | apre Explorer nella cartella corrente |
| `vault` | apre Explorer in `_VAULT/` |
| `docs` | apre Explorer in Documenti |
| `mappa` | apre `MAPPA_SISTEMA.md` in Cursor/Notepad |

**Esempio pratico:**
```powershell
# Voglio vedere le note sul V32
mente
exp       # si apre Explorer in MENTE/

# Voglio modificare un file CAD
cad
exp       # si apre Explorer in CAD/
```

---

## 4. RAG — la tua memoria esternalizzata

### Cosa è il RAG (in parole semplici)

RAG = Retrieval-Augmented Generation. In pratica: quando fai una domanda a Claude, invece di rispondere solo con quello che sa dall'addestramento, Claude prima **cerca nei tuoi documenti** in `MENTE/` e poi risponde usando quelle informazioni specifiche.

È come avere un assistente che prima di rispondere va a controllare tutti i tuoi appunti.

### Come funziona tecnicamente (v4.0)

```
La tua domanda: "Qual è il BEP del V32?"
        ↓
1. RICERCA SEMANTICA: trova chunk di testo simili per significato
   (usa embedding — vettori matematici che catturano il "senso")
        ↓
2. RICERCA KEYWORD (BM25): trova chunk che contengono le parole esatte
   (come una ricerca testuale, ottimo per numeri e termini tecnici)
        ↓
3. MERGE RRF: combina i due risultati (prende i migliori di entrambi)
        ↓
4. RERANKER: ordina i 15 migliori con un modello più preciso → top 5
        ↓
Claude risponde usando quei 5 chunk come contesto
```

**Perché due tipi di ricerca?** La semantica trova concetti simili ma può mancare termini esatti. La keyword trova "V32", "Ø18", "Config G", "EUR 2.250" esattamente. Insieme sono molto più potenti.

### Comandi RAG

```powershell
# Cercare qualcosa
rag 'dimensioni telaio V32'
rag 'BEP ore lavoro'
rag 'come si salda TIG titanio'

# Aggiornare l'indice dopo aver aggiunto file a MENTE/
rag-update              # incrementale: solo file nuovi/modificati (<20 sec)
rag-rebuild             # reset completo (~1-3 min) — solo se necessario

# Vedere le statistiche
rag -Stats
```

**Esempio output di una ricerca:**
```
## RAG v4 — 'BEP V32'

1. ASSOLUTO/V7_master.md  (score: 8.23)
   ...BEP V32: 61 ore = 1.4 mesi | ROI Anno 1: 322% | Tariffa: EUR 45/h...

2. V32/note_economiche.md  (score: 6.11)
   ...investimento totale EUR 2.250 — recuperato in 61 ore di lavoro...
```

### Cosa mettere in MENTE/

**Regola**: se lo sai ora e potresti doverlo ricercare in futuro → scrivi in MENTE/.

```
MENTE/
├── SESSIONI/         ← note di ogni sessione (decisioni prese, cose scoperte)
├── V32/              ← tutto sulla CNC: misure, BOM, note officina, errori
├── OFFICINA/         ← fornitori, prezzi, procedure saldatura
├── ASSOLUTO/         ← documenti master (V7, V8, FILONE_UNICO)
├── KNOWLEDGE/        ← libri letti, corsi, ricerche
│   └── RESEARCH/     ← output del Research Agent
└── VITA_NATURA/      ← tutto sul centro estetico
```

**Come aggiungere un appunto veloce:**

Crea un file `.md` in MENTE/SESSIONI/ con questa struttura:
```markdown
# YYYY-MM-DD — tema breve
*nota rapida*

## Decisioni prese
- ho scelto il silentblock versione B (Ø18 h30) perché...

## Misure/dati
- altezza colonna: 905mm effettivi (non 900mm come in V7)

## Da fare
- ordinare mandrino 2.2kW ER20
```

Poi esegui `rag-update` e quella info è disponibile in tutte le sessioni future.

### Quando il RAG si aggiorna automaticamente

Lo Stop hook (eseguito alla chiusura di ogni sessione Claude) esegue automaticamente `rag --incremental`. Quindi ogni volta che chiudi Claude, l'indice viene aggiornato con i file aggiunti in quella sessione.

---

## 5. Agenti validatori

### Cosa sono

Gli agenti sono istanze specializzate di Claude con un profilo tecnico preciso. Invece di fare una domanda generica, la fai a un "esperto" specifico che ha: conoscenza del dominio, accesso al tuo RAG, e un tono appropriato.

### Agenti disponibili

| Comando | Agente | Specializzazione |
|---------|--------|-----------------|
| `ask -Agent tesla` | TESLA ⚡ | Elettrica civile/industriale, quadri, VFD, normativa CEI |
| `ask -Agent forge` | FORGE 🔧 | Meccanica, officina, saldatura, CNC, tolleranze |
| `ask -Agent aqua` | AQUA 🌿 | Acquaponica, bioreattori, serre, idronica |
| `ask -Agent lex` | LEX ⚖️ | Normativa, sicurezza macchine, marcatura CE, brevetti |
| `ask -Agent plc` | PLC 🖥️ | Siemens S7, TIA Portal, HMI, motion control |
| `ask -Agent themis` | THEMIS 🔮 | Analisi V32/GENESIS, validazione progetto completo |

### Come usarli

```powershell
# Forma base
ask -Agent forge -Question "Quanto regge un gusset 200mm in S235 con carico laterale?"

# Senza RAG (risposta più veloce, solo conoscenza dell'agente)
ask -Agent tesla -NoRag -Question "Riassumi CEI 64-8 sezione 4"

# Lista agenti disponibili
agents
```

### Esempi pratici per ogni agente

**TESLA — domande elettriche:**
```powershell
ask -Agent tesla -Question "Come dimensiono il cablaggio del VFD per il mandrino 2.2kW a 400V trifase?"
ask -Agent tesla -Question "Che sezione cavo uso per 16A a 10 metri?"
ask -Agent tesla -Question "Differenza tra messa a terra TN-S e TN-C-S per un laboratorio?"
```

**FORGE — domande meccaniche:**
```powershell
ask -Agent forge -Question "Saldatura TIG su S235: parametri per spessore 3mm?"
ask -Agent forge -Question "Tolleranza IT6 su foro Ø18 — quale alesatoio uso?"
ask -Agent forge -Question "Come calcolo la freccia di un profilato 60x60x3 con carico a mezza campata di 500mm?"
```

**AQUA — acquaponica/biologia:**
```powershell
ask -Agent aqua -Question "Rapporto pesce/piante per sistema chiuso con tilapia?"
ask -Agent aqua -Question "Come calibro un bioreattore a media fissa per 500L?"
```

**LEX — normativa:**
```powershell
ask -Agent lex -Question "Quali direttive si applicano a una macchina CNC autocostruita per uso proprio?"
ask -Agent lex -Question "Ho bisogno della marcatura CE per vendere pezzi lavorati dalla V32?"
```

**PLC — Siemens/automazione:**
```powershell
ask -Agent plc -Question "Come configuro un asse lineare in TIA Portal con drive Siemens V20?"
ask -Agent plc -Question "Differenza tra FB e FC in Siemens S7?"
```

**THEMIS — analisi strategica:**
```powershell
ask -Agent themis -Question "Dove siamo con la V32 e qual è il prossimo step critico?"
ask -Agent themis -Question "Ha senso partire con la versione B silent blocks o salto a corpo unico senza?"
```

### Come funziona internamente

1. Carichi il profilo dell'agente da `agents_db.json`
2. Si cerca nel RAG con i domini dell'agente (es. forge cerca in "V32, OFFICINA, meccanica")
3. Claude riceve: profilo agente + contesto RAG + domanda → risponde come quell'esperto

### Aggiungere un nuovo agente

Apri `NODES/AGENTS/agents_db.json` e aggiungi un blocco:
```json
"mio_agente": {
  "name": "NOME",
  "emoji": "🔬",
  "role": "Ruolo in una frase",
  "active": true,
  "expertise": ["area 1", "area 2"],
  "tone": "Tecnico, preciso, con esempi pratici",
  "rag_domains": ["dominio1", "dominio2"],
  "tags": ["tag1", "tag2"]
}
```

Nessun altro file da modificare — il validator_agent.py lo carica automaticamente.

---

## 6. Research Agent — ricerca accademica

### A cosa serve

Cerca automaticamente paper, tesi, libri e repository su 11 sorgenti accademiche. Utile per trovare ricerche su materiali, tecniche, normative, senza cercare manualmente su Google Scholar.

### Comandi

```powershell
# Ricerca base
research -Query "epoxy granite vibration damping CNC"

# Con dominio (usa preset di keywords aggiuntive)
research -Query "damping machine tools" -Domain V32

# Con RAG integrato (salva in MENTE/ e indicizza)
research -Query "aquaponics biofilter design" -Domain acquaponica -Rag

# Specificare sorgenti
research -Query "tilapia density recirculating" -Sources "openalex,theses_fr"

# Più risultati
research -Query "epoxy granite" -Max 10

# Anteprima senza eseguire
research -Query "silent block vibration isolation" -DryRun
```

### Sorgenti disponibili

| Sorgente | Contenuto | Usa per |
|----------|-----------|---------|
| `openalex` | 250M paper open access | ricerca generale |
| `semantic_scholar` | 250M paper con abstract | ricerca con abstract |
| `arxiv` | preprint tecnici/scientifici | ricerca più recente |
| `core_ac` | 200M paper full-text | testi completi |
| `theses_fr` | tesi dottorali EU | approfondimento tecnico |
| `dart_europe` | 1.3M tesi universitarie EU | idem |
| `openlibrary` | libri tecnici open access | libri di testo |
| `doaj` | articoli peer-reviewed | qualità verificata |
| `baidu_scholar` | 400M+ paper cinesi | CNC, manifattura |
| `cnki` | 60M paper CNKI | DB accademico cinese |
| `github` | repository open source | codice, strumenti |

**Quando usare le sorgenti cinesi**: per CNC, manifattura, lavorazione metalli — la Cina ha una produzione accademica enorme su questi temi, spesso con informazioni pratiche non trovabili altrove.

### Preset domini disponibili

```powershell
-Domain V32          # CNC, macchine utensili, epoxy granite, linear guides
-Domain acquaponica  # hydroponics, aquaponics, biofilter, recirculating
-Domain CNC          # CNC machining, servo control, G-code
-Domain PLC          # Siemens, TIA Portal, ladder logic
-Domain AI           # machine learning, LLM, RAG, embedding
-Domain elettrica    # electrical, CEI, IEC, VFD, motor
-Domain gomma        # rubber, silicone, elastomers, mold
```

### Output

I risultati vengono salvati automaticamente in:
```
MENTE/KNOWLEDGE/RESEARCH/[domain]/YYYY-MM-DD_query.md
```

Con flag `-Rag` vengono anche indicizzati nel RAG dopo il salvataggio.

---

## 7. Claude Code — il tuo co-pilot

### Aprire Claude Code

```powershell
claude-ti     # apre Claude Code in TITANIUM_OS/ con tutti i permessi
```

### Principi di utilizzo

**Non spiegare, chiedi di fare.** Claude ha accesso completo ai file e può modificarli direttamente. Invece di "puoi spiegarmi come..." usa "fai...".

**Esempi di comandi efficaci:**

```
# Meno efficace:
"Puoi spiegarmi come funziona il rag_engine.py?"

# Più efficace:
"Leggi rag_engine.py e dimmi se c'è qualcosa da ottimizzare"
"Aggiungi la funzione X a rag_engine.py"
"Trova tutti i file che usano chromadb e dimmi se c'è consistenza"
```

### Come Claude legge il contesto

All'apertura, Claude legge automaticamente:
- `BRAIN/STATE.json` → dove eri rimasto, milestone attivo, blockers
- `.claude/CLAUDE.md` (TITANIUM_OS) → regole operative del progetto
- `~/.claude/CLAUDE.md` (globale) → regole globali di Matteo

Non devi riepilogare la sessione precedente — Claude sa già tutto.

### MCP Server (integrazione avanzata)

Il sistema ha un server MCP che dà a Claude tool specializzati:

```
get_state          → legge STATE.json completo
update_milestone   → aggiorna lo stato di un pillar
search_mente       → cerca nel RAG direttamente
get_daily_brief    → legge l'ultimo brief
list_content_ready → lista contenuti pronti per pubblicazione
```

Questi si attivano automaticamente — non devi fare nulla.

### Stop Hook — cosa succede alla chiusura

Ogni volta che chiudi Claude Code, vengono eseguiti automaticamente:
1. `generate_restart_prompt.py` → aggiorna `RIAVVIO_SESSIONE.txt` sul Desktop
2. `generate_functions_list.py` → aggiorna `FUNZIONI_SISTEMA.txt` sul Desktop
3. `rag_engine.py --incremental` → aggiorna l'indice RAG con i nuovi file

### /compact — gestire il contesto lungo

Quando la sessione diventa molto lunga (risposte lente, Claude "dimentica" cose dette prima), usa:
```
/compact
```
Questo comprime la storia della conversazione mantenendo il contesto essenziale. Non perde il lavoro in corso.

---

## 8. Dashboard e API Server

### Avvio

```powershell
start-titanium    # avvia tutto (API porta 5001 + Dashboard porta 5173)
start-api         # solo API server
start-dashboard   # solo dashboard
```

### Dashboard (http://localhost:5173)

Interfaccia grafica del sistema. Contiene:
- **Tela** — pannello principale con tutti i nodi attivi
- **Stato V32** — avanzamento build
- **STORIE** — archivio episodi
- **MatteoSection** — profilo skill, interessi, principi, orizzonte 2030
- **CommandBar** — `Ctrl+K` per accesso rapido a tutto

### API Server (http://localhost:5001)

Backend Flask che espone i dati del sistema. Endpoint principali:

```
GET  /api/health              → stato server
GET  /api/state               → tutto STATE.json
PATCH /api/state              → aggiorna STATE.json
GET  /api/daily-brief         → legge ultimo brief
POST /api/daily-brief         → genera nuovo brief
GET  /api/photos              → lista foto con URL
GET  /api/pdfs                → lista PDF in MENTE/
POST /api/rag/rebuild         → avvia rebuild RAG in background
GET  /api/rag/status          → statistiche RAG
```

### Daily Brief

```powershell
brief   # genera e mostra il brief del giorno
```

Il brief contiene: milestone attivo, step successivo, blockers, ultime note in MENTE/.

---

## 9. Git — salva e sincronizza il lavoro

Il codice vive in `TITANIUM_OS/TITANIUM_OS/` ed è sincronizzato su GitHub.

### Comandi base

```powershell
gs                  # git status — vedi cosa è cambiato
gp                  # git pull — scarica aggiornamenti da GitHub
glog                # git log — ultimi 20 commit in formato grafico

# Commit e push in un comando
gpush               # commit con messaggio "update" e push
gpush "messaggio"   # commit con messaggio personalizzato
```

**Esempi:**
```powershell
# Dopo una sessione di sviluppo
gpush "feat: aggiunto agente AQUA v2 con parametri bioreattore"

# Dopo aver aggiornato documenti
gpush "docs: V8 completo con decisione silent blocks v.B"

# Salvataggio rapido
gpush
```

### Cosa NON va nel git

```
_VAULT/KEYS/          ← API keys, .env → MAI nel git
NODES/MENTE_RAG/chroma_db/   ← ChromaDB binary → MAI (già in .gitignore)
```

### Convenzioni per i messaggi commit

```
feat: nuova funzionalità
fix: correzione bug
docs: aggiornamento documentazione
refactor: riscrittura senza cambiare comportamento
chore: manutenzione (aggiornamento dipendenze, ecc.)
```

---

## 10. Media — PDF e foto

### Aprire PDF

```powershell
# Apre la cartella MENTE/ASSOLUTO/ in Explorer (tutti i PDF)
pdf

# Apre un PDF specifico per nome (cerca in MENTE/ASSOLUTO/)
pdf V7_X_v8.md

# Apre un PDF con path completo
pdf "C:\Users\benen\Downloads\datasheet.pdf"
```

### Aprire foto

```powershell
# Apre la cartella foto build V32 (default: V32_BUILD)
apri-foto

# Apre una sottocartella specifica
apri-foto V32_BUILD\Config_G\stato_20260528
```

### Lista media via browser

```powershell
open-pdf      # apre http://localhost:5001/api/pdfs nel browser
open-photos   # apre http://localhost:5001/api/photos nel browser
```

### Convertire PDF in note (pdf_to_memory)

```powershell
# Estrai testo da PDF e salvalo in MENTE/
python NODES\PDF_TO_MEMORY\pdf_to_memory.py --file "documento.pdf"

# Con flag --rag: aggiorna automaticamente l'indice dopo l'estrazione
python NODES\PDF_TO_MEMORY\pdf_to_memory.py --file "documento.pdf" --rag
```

---

## 11. Controllo sistema

### Stato rapido

```powershell
ti-status    # API server attivo? GitHub auth? milestone? blockers?
```

**Output esempio:**
```
  TITANIUM_OS STATUS
  -----------------------------------
  API Server:  ATTIVO
  GitHub:      autenticato
  Milestone:   Config G — Rinforzi colonne Z+U
  Next:        Saldare 4 gusset 200mm sulla colonna Z sinistra
```

### Avvio e arresto

```powershell
start-titanium    # avvia API (5001) + Dashboard (5173)
stop-titanium     # ferma tutti i processi Python
start-api         # solo API
start-dashboard   # solo Dashboard
start-scanner     # avvia MENTE_SCANNER (estrazione documenti)
```

### Aggiornamento file di stato

```powershell
reload             # ricarica il profilo PowerShell (dopo modifiche al profilo)
update-restart     # aggiorna RIAVVIO_SESSIONE.txt manualmente
update-funzioni    # aggiorna FUNZIONI_SISTEMA.txt manualmente
```

### Utilità

```powershell
which python      # trova il path di un eseguibile
mkcd nuova-dir    # crea cartella e ci entra
```

---

## 12. Flussi di lavoro completi

### Flusso A — Sessione di sviluppo software

```powershell
# 1. Apri il sistema
claude-ti

# 2. Claude legge STATE.json e ti dice dove sei
# (nessun input necessario — avviene automaticamente)

# 3. Lavori con Claude — chiedi, modifica, crea

# 4. Fine sessione — salva
# (avviene automaticamente allo Stop hook:
#  aggiorna RIAVVIO_SESSIONE.txt + FUNZIONI_SISTEMA.txt + RAG)
```

### Flusso B — Sessione officina → documentazione

```powershell
# Dopo una giornata in officina, documenta le decisioni prese

# 1. Vai in MENTE/SESSIONI/
cd "C:\Users\benen\MICROINDUSTRY\MENTE\SESSIONI"

# 2. Crea nota (nome file: YYYY-MM-DD_descrizione.md)
# Esempio: 2026-05-29_gusset_sinistra_saldato.md

# 3. Aggiorna RAG
rag-update

# 4. Opzionale: chiedi a Claude cosa cambia nel progetto
claude-ti
# "Ho saldato il gusset sinistro. Aggiorna STATE.json e dimmi il prossimo step."
```

### Flusso C — Domanda tecnica con validazione

```powershell
# Hai un dubbio tecnico — lo vuoi validare

# 1. Usa l'agente appropriato
ask -Agent forge -Question "Il profilato 40x40x3 S235 regge 50kg di testa tool + mandrino su 300mm di sbalzo?"

# 2. Se vuole anche ricerca accademica
research -Query "CNC spindle cantilever deflection S235 steel" -Domain V32

# 3. Salva la risposta in MENTE/ per le sessioni future
# (copia la risposta in MENTE/V32/calcoli_strutturali.md)
rag-update
```

### Flusso D — Ricerca accademica per un problema

```powershell
# Hai un problema specifico — cerchi se qualcuno l'ha già risolto

# 1. Ricerca con dominio e RAG
research -Query "epoxy granite damping ratio CNC machine tool" -Domain V32 -Rag -Max 8

# I risultati vengono salvati in MENTE/KNOWLEDGE/RESEARCH/V32/
# E indicizzati nel RAG automaticamente (con -Rag)

# 2. Poi chiedi al RAG quello che hai trovato
rag "epoxy granite smorzamento vibrazione"

# 3. O chiedi a Claude direttamente
# "Ho appena aggiunto ricerche su epoxy granite. Dimmi cosa ci serve per il riempimento V32."
```

### Flusso E — Riavvio di una sessione interrotta

```powershell
# Metodo 1 — automatico (usa RIAVVIO_SESSIONE.txt)
claude-ti
# incolla il contenuto di Desktop\RIAVVIO_SESSIONE.txt come primo messaggio

# Metodo 2 — da zero
claude-ti
# "Leggi STATE.json e MAPPA_SISTEMA.md, poi dimmi dove siamo."
```

---

## 13. Troubleshooting

### "Il RAG non trova quello che ho appena scritto"

```powershell
rag-update    # hai aggiunto file a MENTE/ ma non hai aggiornato l'indice?
```

### "Claude non conosce la V32" / "non sa del gusset"

1. La nota è in `MENTE/`? Controlla con `mente` poi `exp`
2. Il RAG è aggiornato? `rag -Stats` mostra il numero di file indicizzati
3. Forza rebuild: `rag-rebuild`

### "API Server non risponde"

```powershell
ti-status         # controlla lo stato
stop-titanium     # ferma tutto
start-api         # riavvia l'API
```

### "Dashboard non si apre (localhost:5173)"

```powershell
stop-titanium
start-dashboard   # riavvia solo la dashboard
```

### "Errore 'command not found' per python/pip/node"

Il profilo PowerShell non è caricato. Esegui:
```powershell
reload            # ricarica il profilo
```

Se non funziona, apri un nuovo terminale PowerShell — il profilo si carica automaticamente.

### "rag-rebuild va in timeout"

Con v4.0 usa `rag-update` invece di `rag-rebuild`. Se devi fare un full rebuild, eseguilo in una finestra separata:
```powershell
Start-Process powershell -ArgumentList "-NoExit -Command `"ti; python NODES\MENTE_RAG\rag_engine.py --rebuild`""
```
Il rebuild continua in background — puoi continuare a lavorare.

### "Claude sembra 'dimenticare' cose dette nella stessa sessione"

Il contesto è troppo lungo. Usa:
```
/compact
```
Questo comprime la storia mantenendo l'essenziale. Non perdi il lavoro.

### "Un agente non risponde"

```powershell
agents    # lista agenti disponibili — controlla che sia attivo
ask -Agent forge -NoRag -Question "test"    # prova senza RAG
```

### "GitHub auth scaduta"

```powershell
ti-status    # mostra se sei autenticato
! gh auth login    # riesegui il login (usa ! per eseguire nel terminale)
```

---

## 14. Glossario tecnico

**Chunk** — un pezzo di testo estratto da un documento. Il RAG divide ogni file in chunk da ~512 caratteri con overlap, per poter recuperare le parti rilevanti senza caricare tutto.

**Embedding** — rappresentazione matematica di un testo come vettore di numeri. Testi simili nel significato hanno vettori "vicini". Il modello usato è `paraphrase-multilingual-MiniLM-L12-v2` (384 dimensioni, funziona in italiano).

**BM25** — algoritmo di ricerca testuale che pesa le parole chiave per frequenza e rarità. Ottimo per trovare termini tecnici esatti. Nel sistema è implementato via TF-IDF sklearn.

**RRF (Reciprocal Rank Fusion)** — algoritmo di merge. Combina i ranking di due liste (semantica + BM25) in un unico ranking. Formula: `score = Σ 1/(k + rank)` dove k=60. Il vantaggio è che funziona bene anche quando i due sistemi hanno scale di score diverse.

**CrossEncoder / Reranker** — modello che prende (query, documento) come coppia e dà un punteggio di rilevanza più preciso degli embedding. Più lento ma più accurato. Nel sistema: fetch-15 → rerank → top-5.

**ChromaDB** — database vettoriale embedded (gira in locale, nessun server). Salva gli embedding e permette ricerche per similarità coseno.

**STATE.json** — il file JSON che contiene lo stato completo del sistema: milestone, pillar, blockers, sessioni, nodi. È la "fonte unica di verità" del progetto.

**Hook Stop** — script che vengono eseguiti automaticamente quando Claude Code viene chiuso. Nel sistema: aggiorna RIAVVIO_SESSIONE.txt, FUNZIONI_SISTEMA.txt, e l'indice RAG.

**MCP (Model Context Protocol)** — protocollo di Anthropic per dare a Claude strumenti personalizzati. Il server MCP di TITANIUM_OS espone `get_state`, `search_mente`, ecc.

**Pillar** — uno dei 5 progetti principali tracciati in STATE.json: V32, MIMS, GENESIS, VITA_NATURA, IDENTITY. Ognuno ha % completamento, fase, prossimo step.

**Manifest (RAG)** — file JSON (`rag_manifest.json`) che tiene traccia di mtime e dimensione di ogni file in MENTE/. Il rebuild incrementale confronta questi valori e riprocessa solo i file cambiati.

---

## 15. Come aggiornare questo manuale

Questo manuale si aggiorna a ogni sessione significativa, esattamente come STATE.json.

### Quando aggiornare

- Aggiunti nuovi comandi al profilo PS → aggiorna sezione 3 o sezione relativa
- Nuovo nodo/agente → aggiorna sezione 5 o 6
- Cambiata architettura RAG → aggiorna sezione 4
- Nuovo flusso di lavoro scoperto → aggiungi in sezione 12
- Nuovo problema risolto → aggiungi in sezione 13

### Come aggiornare

```
claude-ti
"Aggiorna DOCS/MANUALE_SISTEMA.md con il nuovo comando X che fa Y"
```

Claude si occupa della modifica — tu descrivi cosa aggiungere.

### Versioning

Aggiorna la riga in cima al file:
```markdown
*Versione: 1.1 | 2026-05-29 | aggiunta sezione RAG v4.1*
```

---

---

## 16. Content Engine — Episodi e Story Agent

### Struttura stagioni

```
S0 — Origini        → 4 ep  — il seme (pre-sistema)
S1 — Il Presente    → 6 ep  — storia principale (skills → 2030)
S2 — Il Sistema     → 6+ ep — maggio 2026, il sistema che impara
S3 — Costruzione    → da scrivere — build log fisici (gusset, mandrino, primo pezzo)
AUTO                → generati da milestones — legacy content_trigger
MOMENTI             → episodi brevi (5-7 min) — singola decisione o scoperta
```

### Story Agent — generazione automatica

Lo story agent analizza git commits e sessioni recenti e genera automaticamente bozze di episodi.

```powershell
# manuale — episodi dai commit recenti non processati
python NODES\STORY_AGENT\story_agent.py

# backfill — tutto lo storico git
python NODES\STORY_AGENT\story_agent.py --backfill --max 20

# alias PS
new-episode          # equivalente al comando manuale sopra
```

**Automatismi:**
- **Stop hook** — ogni fine sessione Claude Code lancia story_agent in background
- **Task Scheduler** — ogni notte alle 02:07 (`TITANIUM_OS_StoryAgent`)

Output: `CONTENT_ENGINE/DATABASE/episodes/S2_SISTEMA/EP_YYYYMMDD_*.md`
Mirror automatico: `MICROINDUSTRY/MENTE/SESSIONI/STORIE/S2_SISTEMA/`

### Episodi Intermezzo (MOMENTI)

I Momenti sono episodi brevi (5-7 min) per catturare una singola decisione, scoperta o svolta senza aspettare un episodio principale. Formato:

```markdown
# MOMENTO — [Titolo breve]
**Data:** YYYY-MM-DD | **Durata:** 5-7 min | **Tipo:** decisione/scoperta/svolta

[2-3 paragrafi narrativi + reel_hook]
```

**Quando usarli:** decisione tecnica singola, fix importante, insight di officina, acquisto strategico.
**Dove salvarli:** `CONTENT_ENGINE/DATABASE/episodes/MOMENTI/`

### INDEX episodi

Vedi `CONTENT_ENGINE/DATABASE/INDEX.md` per la lista completa aggiornata di tutti gli episodi.
Il manuale non duplica l'INDEX — vai direttamente lì per lo stato aggiornato.

---

*Manuale aggiornato in sessione #9 — 2026-05-29*
*Story agent attivo: cron 02:07 + stop hook ogni sessione.*
