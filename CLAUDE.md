<!-- TOC -->

- [TITANIUM_OS  CLAUDE.md](#titaniumos-claudemd)
  - [CHI È MATTEO](#chi-è-matteo)
  - [INIZIO SESSIONE (protocollo fisso)](#inizio-sessione-protocollo-fisso)
  - [FILESYSTEM  dove va ogni file (non inventare)](#filesystem-dove-va-ogni-file-non-inventare)
    - [SISTEMA](#sistema)
    - [MICROINDUSTRY (dati lavoro)](#microindustry-dati-lavoro)
    - [Tabella rapida](#tabella-rapida)
  - [DATI MASTER (verificati fisicamente  non inventare)](#dati-master-verificati-fisicamente-non-inventare)
  - [MILESTONE ATTUALE](#milestone-attuale)
  - [GENESIS STACK  nodi attivi](#genesis-stack-nodi-attivi)
  - [PERSONAGGI AI](#personaggi-ai)
  - [LE 10 REGOLE  TITANIUM_OS OPERATING PRINCIPLES](#le-10-regole-titaniumos-operating-principles)
  - [SETUP MACCHINA (fissa DESKTOP-IFACE2R)](#setup-macchina-fissa-desktop-iface2r)
  - [REGOLE CODICE (non negoziabili)](#regole-codice-non-negoziabili)
  - [PIPELINE CONOSCENZA (il loop che si autoalimenta)](#pipeline-conoscenza-il-loop-che-si-autoalimenta)

<!-- /TOC -->

# TITANIUM_OS — CLAUDE.md
*Versione: 4.1.0 | Aggiornato: 2026-06-07 | Macchina: fissa DESKTOP-IFACE2R (utente `teo`, 24/7)*

## CHI È MATTEO
Matteo Benenati — artigiano industriale + system builder.
- 15+ anni industria: TIG/MIG titanio (MotoGP @ SCProject), robot (ESSEGI), presse (DATWLER), QC (LU.VE)
- ADHD probabile: TITANIUM_OS è il suo scaffolding cognitivo — ogni nodo elimina un carico mentale
- Compagna: Maria → Vita Natura (centro estetico, Boffalora sopra Ticino, MI)
- OS: Windows 10 Pro | IDE: Cursor + Claude Code | Macchina: fissa DESKTOP-IFACE2R (24/7) — migrazione dal Getac 02/06/2026

---

## INIZIO SESSIONE (protocollo fisso)

```
1. Leggi DA_FARE_FATTO.md       → la BUSSOLA: cosa è fatto / cosa resta (scaletta viva)
2. Leggi RIAVVIO_SESSIONE.txt   → di cosa stavamo parlando l'ultima sessione
3. Leggi BRAIN/STATE.json       → milestone attivo + pilastri + blockers
3b. Triage notturno (5 sec)     → DATA/audit/system_health.json `log_issues`: se la notte
    ha lasciato crash/rate-limit, max 3 righe di nota PRIMA di aprire altro (non ignorare gli agenti)
4. Enunci in <10 sec: dove eravamo + prossimo step + SEMPRE 2 righe su cosa hanno
   fatto/prodotto gli AGENTI NOTTURNI (generazione EP/caroselli, bozze, audit, retention —
   da system_health.json + tasks_history.json + code caroselli) — zero domande
5. Lavora — aggiorna DA_FARE_FATTO.md STRADA FACENDO (non solo a fine)
6. Fine sessione → aggiorna DA_FARE_FATTO.md + STATE.json + RIAVVIO + commit + push
```

Non chiedere "da dove partiamo?". Leggi DA_FARE_FATTO.md e RIAVVIO_SESSIONE.txt prima di tutto.

**Vista CONTROLLO (dashboard):** il *Centro di Controllo* è il posto unico che elenca
ogni strumento/nodo in italiano semplice (cosa fa · come si usa · se è acceso) — è lì che
Matteo governa il sistema senza tenerlo a mente. Tienilo aggiornato quando aggiungi nodi.

**BUSSOLA (DA_FARE_FATTO.md):** scaletta condivisa io↔Matteo. Regole: non si cancella
mai (si cambia stato `[✓]/[◐]/[ ]/[✗]/[💡]`), append in cima, canonica nel repo. Il
Desktop `da fare e cosa ho fatto.txt` è un **mirror puro auto-aggiornato** (lo scrive
`AUTOMATIONS/core/sync_dashboard.py` a fine sessione, hook Stop — non editarlo a mano).
Il PIANO completo (P0-P8) vive solo in `PROSSIMA_SESSIONE.md`.

---

## FILESYSTEM — dove va ogni file (non inventare)

### SISTEMA
```
C:\Users\teo\TITANIUM_OS\      ← repo git (PIATTO) — TUTTO IL CODICE QUI
  _VAULT\KEYS\      ← .env, API keys (MAI git)
  _VAULT\ACCOUNTS\  ← credenziali
  _VAULT\BACKUPS\   ← AES-256 da deep_freeze.py
C:\Users\teo\MICROINDUSTRY\    ← dati lavoro (MENTE = fonte RAG), fuori dal repo
```
*NB: struttura PIATTA sul fisso. Sul vecchio Getac era annidata `…\TITANIUM_OS\TITANIUM_OS\`;*
*qui il repo è direttamente `C:\Users\teo\TITANIUM_OS`. Nel codice: mai path assoluti,*
*si deriva da `Path(__file__).parents[N]` / `TI_ROOT` / `MENTE_DIR` (vedi REGOLE CODICE).*

### MICROINDUSTRY (dati lavoro)
```
MENTE\              ← FONTE RAG — metti qui ogni documento da ricordare
  V32\              ← CNC: BOM, schemi, note officina, decisioni
  MIMS\             ← moduli: design, protocollo fisico
  VITA_NATURA\      ← centro estetico: sito, EVA, procedure
  OFFICINA\         ← attrezzatura, fornitori, TIG/MIG
  KNOWLEDGE\        ← libri, corsi, repo di riferimento
  SESSIONI\         ← cattura decisioni dalle chat Claude (usa _TEMPLATE.md)
CAD\                ← STL, STEP, DXF (per progetto)
FOTO\               ← documentazione visiva build
CONTENT_ENGINE\     ← YouTube, LinkedIn, podcast, script
FINANCE\            ← fatture, BEP, ROI, fornitori
```

### Tabella rapida
| Tipo file | Dove |
|-----------|------|
| Codice Python/JS/TS | `C:\Users\teo\TITANIUM_OS\` (sottocartelle NODES/AUTOMATIONS/…) |
| API keys / .env | `_VAULT/KEYS/` |
| Note V32 / decisioni officina | `MENTE/V32/` |
| Decisioni dalle chat | `MENTE/SESSIONI/YYYY-MM-DD_tema.md` |
| File CAD (STL/STEP/DXF) | `CAD/[progetto]/` |
| Foto build | `FOTO/V32_BUILD/` |
| Script episodi podcast | `CONTENT_ENGINE/produzione_contenuti/` |
| Documenti personali | `PERSONALE/DOCUMENTI/[categoria]/` |

---

## DATI MASTER (verificati fisicamente — non inventare)
- Investimento V32: EUR 2.250
- Massa V32: 178 kg **di progetto** — **corpo unico** (non più su molle — decisione strutturale maggio 2026).
  ⚠ NON ancora pesata: la macchina è al telaio (Matteo, 15/07/2026). Nei CONTENUTI PUBBLICI
  non si dichiara il peso come fatto — si dice lo stato reale (telaio + componentistica scelta).
- Precisione RSS: ±0.019 mm (IT6-IT7) — **calcolo di progetto**, non misura: stessa regola
  pubblica del peso (canon_guard.scan_public li blocca entrambi nei caroselli)
- BEP V32: 61 ore = 1.4 mesi | ROI Anno 1: 322%
- Tariffa Precision Lab: EUR 45/h
- Target capannone: 15 Luglio 2030

## MILESTONE ATTUALE
Config G — Rinforzi colonne Z+U (gusset 200mm + diagonali + tiranti M10)
Completamento: 65% | Sessione: #4
Blocker attivo: Manca mandrino 2.2kW ER20 — da ordinare

---

## GENESIS STACK — nodi attivi

| Nodo | Comando | Stato |
|------|---------|-------|
| MCP Server | auto (`.claude/settings.json`) | ATTIVO — 5 tool |
| MENTE RAG | `rag "query"` / `rag-update` / `rag-rebuild` | ATTIVO v4.0 — hybrid BM25+semantico+CrossEncoder — incrementale |
| Daily Brief | `brief` | ATTIVO → `DATA/daily_brief_last.md` |
| MENTE Scanner | `python NODES/MENTE_SCANNER/scanner.py` | ATTIVO → `MICROINDUSTRY/MENTE/` |
| MENTE Watcher | watch fs → `/api/scan` | ATTIVO |
| API Server | `start-api` (porta 5001) | ATTIVO |
| Dashboard | `start-dashboard` (porta 5173) | ATTIVO |
| n8n | `npx n8n` (porta 5678) | ATTIVO |
| EVA WhatsApp | — | PENDING |

**Dopo ogni modifica a MENTE/ → esegui `rag-update` (incrementale, <20 sec).**
Usa `rag-rebuild` solo per reset completo (es. cambio chunk config). RAG v4.0:
- Semantico: ChromaDB + `paraphrase-multilingual-MiniLM-L12-v2` (384-dim, IT/EN/DE/FR)
- Keyword: TF-IDF BM25 (sklearn, ngram 1-2) — ricorda termini tecnici esatti
- Reranker: `cross-encoder/ms-marco-MiniLM-L-6-v2` — riordina top-15 → top-5
- Merge: Reciprocal Rank Fusion (k=60)
- Chunk: 512 chars / stride 200 — ottimale per Q&A tecnico

---

## PERSONAGGI AI

| Nome | Ruolo | Stato |
|------|-------|-------|
| **THEMIS** | Esecuzione tecnica, codifica, analisi V32/GENESIS | Attivo |
| **EVA** | WhatsApp automation, prenotazioni Vita Natura | In sviluppo |
| **AVA** | YouTube avatar, script, reel | Pianificato |
| ARIA | Life OS, ADHD scaffolding, scheduling | Futuro |
| NEXUS | Orchestratore agenti | Futuro |
| TESLA | Hardware, elettronica, CNC, IoT | Futuro |
| FORGE | Meccanica, officina, saldatura, MIMS | Futuro |

---

## LE 10 REGOLE — TITANIUM_OS OPERATING PRINCIPLES

> *Un sistema che gira da solo vale più di 10 abitudini che dipendono dalla volontà.*

1. **Niente è finito — ogni cosa è una versione.**
   Non aspettare la perfezione. Una versione funzionante oggi > una versione perfetta mai.

2. **Identifica → Automatizza → Scala.**
   Se lo fai 3 volte: script. Se lo fai ogni giorno: nodo. Se il nodo produce valore: scala.

3. **Cattura mentre costruisci — non ricordare, documenta.**
   Ogni decisione tecnica in `MENTE/`. Ogni sessione Claude in `MENTE/SESSIONI/`. Il RAG la recupera domani.

4. **Leva cognitiva: 1 input → N output.**
   Un milestone → episodio + reel + LinkedIn + RAG update. Ogni azione deve produrre più artefatti.

5. **Costruisci ciò che usi — meta-ricorsività.**
   TITANIUM_OS gestisce la costruzione di TITANIUM_OS. Il sistema si autoalimenta.

6. **Output misurabile prima di tutto.**
   Se non posso misurarlo (mm, ore, euro, chunk RAG, commit), non esiste.

7. **Tutto si connette — nessun silo.**
   V32 → episodio → dataset LLM → RAG → Claude più informato su V32. Il loop è intenzionale.

8. **Proteggi il sapere.**
   `_VAULT/` per i segreti. RAG per la conoscenza. Git per il codice. Backup AES-256 per tutto.

9. **Reinvesti il margine — 60% anno 1.**
   BEP V32 = 61 ore. Ogni ora sopra il BEP è reinvestita in strumenti, formazione, scala.

10. **Libertà sopra profitto.**
    Il capannone entro 2030 non è un obiettivo lavorativo — è un obiettivo di sovranità.

---

## SETUP MACCHINA (fissa DESKTOP-IFACE2R)

```
Username:   teo
Python:     C:\Users\teo\AppData\Local\Programs\Python\Python311\python.exe (3.11.9)
Node/npm:   C:\Program Files\nodejs\ (node v24)
GitHub CLI: C:\Program Files\GitHub CLI\gh.exe
Env vars:   _VAULT/KEYS/titanium_os.env
TI_ROOT:    C:\Users\teo\TITANIUM_OS
PYTHONPATH: C:\Users\teo\TITANIUM_OS
MENTE_DIR:  C:\Users\teo\MICROINDUSTRY\MENTE
GPU:        GTX 1070 8GB (CUDA) · RAM 16GB · IP LAN 192.168.0.112 · Tailscale 100.125.152.124
```
*NB: gli script notturni NON hardcodano questi path — `AUTOMATIONS/core/_ti_paths.bat`*
*risolve TI_ROOT da `%~dp0`, Python/gh dal PATH (fallback LocalAppData / Program Files).*
*Restano da de-hardcodare alcuni script legacy in `AUTOMATIONS/tools/` (vedi bussola).*

---

## REGOLE CODICE (non negoziabili)

```python
# header obbligatorio ogni file Python:
# nome_modulo.py | TITANIUM_OS / NODO / SOTTOSISTEMA | vX.Y | YYYY-MM-DD

# path: sempre così
from pathlib import Path
BASE = Path(__file__).resolve().parents[N]
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))

# MAI così:
# "C:\\Users\\benen\\..."   ← hardcoded, rompe su qualsiasi altra macchina
# "C:\\Users\\Matteo\\..."  ← username sbagliato
```

---

## PIPELINE CONOSCENZA (il loop che si autoalimenta)

```
Officina / Chat / Web
        ↓
MENTE/SESSIONI/YYYY-MM-DD_tema.md   ← cattura manuale (60 sec)
        ↓
rag-rebuild                          ← indicizza in ChromaDB
        ↓
Claude conosce quella info nelle sessioni future
        ↓
Migliore output → migliore documentazione → RAG più ricco
```

Questo è il compounding del sapere. Ogni documento aggiunto vale per sempre.
