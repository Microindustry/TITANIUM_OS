# AUTOMATIONS MASTER LIST
**Versione**: 1.1
**Aggiornato**: 2026-03-16
**Fonte**: Lista consolidata da esplorazione progetto + Protocollo Evolutivo MD-Cloud

---

## LEGENDA
- ✅ ATTIVA — in esecuzione
- 🔧 DA IMPLEMENTARE — priorità alta
- 🟡 DA IMPLEMENTARE — priorità media
- 🟢 DA IMPLEMENTARE — priorità bassa
- 🔗 INTEGRAZIONE — dipende da servizi esterni

---

## ATTIVE (28)

| # | Nome | File/Path | Trigger | Note |
|---|------|-----------|---------|------|
| 1 | **Watchdog File-System** | `AUTOMATIONS/core/watcher.py` | Avvio sistema | Monitora tutti i change in TITANIUM_OS (watchdog) |
| 2 | **Backup Versioning** | `AUTOMATIONS/core/backup.py` | Da watcher (MODIFIED/CREATED) | Snapshot → BACKUPS/[timestamp]/, max 30 versioni per file |
| 3 | **Changelog Writer** | `AUTOMATIONS/core/changelog_writer.py` | Da watcher per ogni evento | Scrive VERSIONS/changelog.md con emoji + auto-archivia >2000 righe |
| 4 | **State Updater** | `AUTOMATIONS/core/state_updater.py` | Da watcher per ogni evento | Aggiorna BRAIN/STATE.json, pillar mapping, session counter |
| 5 | **Session Orienter** | `AUTOMATIONS/core/session_orienter.py` | Manuale (SESSION_START.bat) | Brief avvio sessione → .md in INBOX/ + prompt per Claude |
| 6 | **Milestone Tracker** | `AUTOMATIONS/core/milestone_tracker.py` | Task Scheduler Windows 08:00 | Daily brief → INBOX/daily_brief_[data].md |
| 7 | **PDF to Memory** | `AUTOMATIONS/core/pdf_to_memory.py` | Drag-drop in PDF_DROP/ | PDF → Markdown, classifica ATTO/INFO, versioning |
| 8 | **Cross-Ref Engine** | `AUTOMATIONS/core/cross_ref_engine.py` | CLI manuale | Sync valori cross-documento (prezzi, misure, date) |
| 9 | **Assoluto Splitter** | `AUTOMATIONS/core/assoluto_splitter.py` | CLI manuale | Split/compose documento master ASSOLUTO V6 |
| 10 | **Mente Scanner** | `NODES/MENTE_SCANNER/scanner.py` | API `/api/trigger/scanner` o manuale | Scansiona `LA MIA MENTE/` → DATA/mente_digest.json (818 estrazioni) |
| 11 | **API Server** | `api_server.py` | Avvio con START_ECOSYSTEM.bat | Flask localhost:5001 → serve dati al dashboard React |
| 12 | **n8n Engine** | `AUTOMATIONS/deploy/n8n/docker-compose.yml` | Sempre attivo (Oracle Cloud) | n8n + PostgreSQL + Traefik, localhost:5678 |
| 13 | **Batch Launchers** | `*.bat` (7 file root) | Manuale doppio click | START/STOP/SESSION/SETUP/ECOSYSTEM/PDF/CLAUDE |
| 14 | **Automation Watch-Dog** | `AUTOMATIONS/core/automation_watchdog.py` | Task Scheduler / standalone | Monitora watcher.py + api_server.py, riavvia se down. Status → DATA/watchdog_status.json |
| 15 | **Backup Deep Freeze** | `AUTOMATIONS/core/deep_freeze.py` | Task Scheduler (domenica 03:00) / CLI | Zip AES-256 crittografato. Rotazione 8 freeze. Manifest in BACKUPS/deep_freeze/manifest.json |
| 16 | **Sanitizzazione Dati Sensibili** | `AUTOMATIONS/core/sanitizer.py` | Pre-sync / CLI / pre-commit hook | 15 pattern (API keys, token, PII, IBAN). Exit 1 se CRITICAL. Report in DATA/sanitizer_report.json |
| 17 | **Ghost Sync Bidirezionale** | `AUTOMATIONS/core/ghost_sync.py` | CLI / schedulato | Git push/pull, conflict resolution (newer wins), sanitizer pre-push. Report in DATA/ghost_sync_report.json |
| 18 | **Validatore Sintassi MD** | `AUTOMATIONS/core/md_validator.py` | Da watcher / CLI / pre-commit | Heading hierarchy, code blocks, link, frontmatter YAML. Exit 1 se errori |
| 19 | **Auto-Linker Riferimenti** | `AUTOMATIONS/core/auto_linker.py` | Da watcher (on_moved) / CLI | Fix path link interni .md se file spostato. Indice in DATA/file_index.json |
| 20 | **Indicizzazione Semantica** | `AUTOMATIONS/core/semantic_indexer.py` | Da watcher / CLI | Frontmatter + keyword extraction → SQLite DATA/semantic_index.db. Query CLI |
| 21 | **Compiler Documentale TOC** | `AUTOMATIONS/core/toc_compiler.py` | Da watcher / CLI | Genera/aggiorna TOC inline via marcatori <!-- TOC -->. Min 3 heading |
| 26 | **Archivista Creativo** | `AUTOMATIONS/core/archivista.py` | CLI manuale | Archive → Claude API → storytelling multicanale .md in CONTENT_ENGINE/produzione_contenuti/ |
| 22 | **Analisi Sentiment & Topic** | `AUTOMATIONS/core/sentiment_topic.py` | CLI / --api per Claude | Classifica .md in workspace (tecnico/creativo/progetto/operativo/personale). Arricchisce semantic_index.db |
| 23 | **Gestione Permessi ACL** | `AUTOMATIONS/core/acl_manager.py` | CLI / on_modified | Frontmatter 'accesso' → permessi NTFS Windows (pubblico/privato/sola_lettura/archivio) |
| 24 | **Deep-Link Windows** | `AUTOMATIONS/core/deep_link.py` | CLI manuale | Shortcut .lnk in DATA/shortcuts/ per aprire .md in Cursor/VSCode/Obsidian/Notepad |
| 25 | **Pipeline Deploy "View"** | `AUTOMATIONS/core/md_view_pipeline.py` | Da watcher / CLI --rebuild | MD → JSON strutturato per dashboard React. Indice in DATA/view_index.json |
| 27 | **Multi-format Content Pipeline** | `AUTOMATIONS/core/content_pipeline.py` | CLI / --source o --tema | Storytelling sorgente → 3 formati (LinkedIn + podcast + video) via Claude API |

---

## DA IMPLEMENTARE — PRIORITÀ ALTA (3)

| # | Nome | Funzione | Stack | Status |
|---|------|----------|-------|--------|
| ~~14~~ | ~~Automation Watch-Dog~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~15~~ | ~~Backup Deep Freeze~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~16~~ | ~~Sanitizzazione Dati Sensibili~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |

---

## DA IMPLEMENTARE — PRIORITÀ MEDIA (6)

| # | Nome | Funzione | Stack | Status |
|---|------|----------|-------|--------|
| ~~17~~ | ~~Ghost Sync Bidirezionale~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~18~~ | ~~Validatore Sintassi MD~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~19~~ | ~~Auto-Linker Riferimenti~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~20~~ | ~~Indicizzazione Semantica~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~21~~ | ~~Compiler Documentale TOC~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~26~~ | ~~Archivista Creativo~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |

---

## DA IMPLEMENTARE — PRIORITÀ BASSA (5)

| # | Nome | Funzione | Stack | Status |
|---|------|----------|-------|--------|
| ~~22~~ | ~~Analisi Sentiment & Topic~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~23~~ | ~~Gestione Permessi ACL~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~24~~ | ~~Deep-Link Windows~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~25~~ | ~~Pipeline Deploy "View"~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |
| ~~27~~ | ~~Multi-format Content Pipeline~~ | ~~Implementato — vedi ATTIVE~~ | — | ✅ |

---

## CONTENT ENGINE — PIPELINE CREATIVA (nuova architettura)

> Vive in `C:\Users\Matteo\Desktop\CONTENT_ENGINE\` — separata da TITANIUM_OS

### Flusso
```
EVENTO MILESTONE (STATE.json)
    ↓
n8n (Oracle Cloud) — orchestratore
    ├─→ legge STATE.json + archivio via API
    ├─→ chiama Claude API → genera storytelling .md
    ├─→ salva in CONTENT_ENGINE/produzione_contenuti/
    ├─→ chiama ElevenLabs API → genera audio .mp3
    ├─→ chiama HeyGen/Runway API → genera video
    └─→ distribuisce → LinkedIn / Telegram / Drive
```

### Step da costruire
| # | Step | Tool | Status |
|---|------|------|--------|
| CE-1 | Trigger milestone → webhook n8n | `POST /api/content/trigger` | ✅ |
| CE-2 | Lettura STATE.json + archivio | `GET /api/state` + `/api/content/archive` | ✅ |
| CE-3 | Generazione storytelling .md | `POST /api/content/generate` → archivista.py | ✅ |
| CE-4 | Salvataggio file .md | produzione_contenuti/ + ghost_sync.py | ✅ |
| CE-5 | Text-to-Speech | `POST /api/content/tts` → elevenlabs_tts.py | ✅ |
| CE-6 | Avatar / Video animato | `POST /api/content/video` → video_generator.py | ✅ |
| CE-7 | Distribuzione social | `POST /api/content/distribute` → social_distributor.py | ✅ |
| n8n  | Workflow orchestratore | `AUTOMATIONS/deploy/n8n/workflow_content_engine.json` | ✅ importa in n8n |

### Struttura cartelle CONTENT_ENGINE
```
CONTENT_ENGINE/
    /archive              ← storico versioni storytelling
    /produzione_contenuti ← output .md pronti
    /audio                ← output ElevenLabs .mp3
    /video                ← output animazioni
    /distribuiti          ← già pubblicati (log)
    /templates            ← template per formato (LinkedIn, podcast, video)
```

---

## REGOLE DI AGGIORNAMENTO

1. Ogni nuova automazione aggiunge una riga alla tabella corretta
2. Quando un'automazione passa da "da implementare" a "attiva" → sposta alla sezione ATTIVE
3. Aggiornare il campo **Aggiornato** in cima ad ogni modifica
4. Versioning: questo file è tracciato da `backup.py` automaticamente

---

## STATS
- **Attive**: 28 (tutte completate)
- **Da implementare**: 0
- **Content Engine step**: 7
- **Totale automazioni ecosistema**: 27 + 7 CE = **34**
