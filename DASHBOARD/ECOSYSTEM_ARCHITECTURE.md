# ECOSYSTEM_ARCHITECTURE.md | v2.0 | 2026-03-16
# Basato su ASSOLUTO V6.0 — 15 ATTI
# Concetto: 1024 assi — sistema ricorsivo che si autoalimenta

---

## VISIONE (ATTO XIV — La Libertà Industriale)

> "Non costruiamo prodotti. Costruiamo libertà."
> Target: 15 Luglio 2030 — Matteo 35 anni, IL CAPANNONE operativo.

---

## CICLO RICORSIVO (ATTO VI)

```
COSTRUISCI → DOCUMENTI → INSEGNI → SBLOCCHI → PROGETTI → PRODUCI → VENDI → REINVESTI
     ↑                                                                              |
     └──────────────────────────────── loop ∞ ─────────────────────────────────────┘
```

Ogni nodo dell'ecosistema nutre tutti gli altri.
Posizione attuale: **COSTRUISCI** (Config G — V32 rinforzi strutturali)

---

## ALBERO CARTELLE — TITANIUM_OS (v2.0 — 2026-03-16)

```
TITANIUM_OS\                           ← Root sistema operativo cognitivo
│
├── BRAIN\                             ← Cuore — memoria persistente
│   ├── STATE.json                     ← stato live: milestone, next step, blockers
│   └── KNOWLEDGE\                     ← conoscenza accumulata
│
├── AUTOMATIONS\                       ← 28 automazioni attive
│   ├── AUTOMATIONS_MASTER.md          ← FONTE PRIMARIA — lista completa 28 auto + 7 CE
│   └── core\                          ← moduli Python (tutti standalone + integrati in watcher)
│       ├── watcher.py                 ← #1  Watchdog FS — trigger per tutti gli altri
│       ├── backup.py                  ← #2  Versioning snapshot
│       ├── changelog_writer.py        ← #3  Log modifiche → VERSIONS/changelog.md
│       ├── state_updater.py           ← #4  Aggiorna BRAIN/STATE.json
│       ├── session_orienter.py        ← #5  Brief avvio sessione → INBOX/
│       ├── milestone_tracker.py       ← #6  Daily brief ore 08:00
│       ├── pdf_to_memory.py           ← #7  PDF → MD (drag-drop in PDF_DROP/)
│       ├── cross_ref_engine.py        ← #8  Sync valori cross-documento
│       ├── assoluto_splitter.py       ← #9  Split/compose ASSOLUTO V6
│       ├── automation_watchdog.py     ← #14 Monitora processi — riavvia se down
│       ├── deep_freeze.py             ← #15 Backup AES-256 settimanale
│       ├── sanitizer.py               ← #16 Scan API key/PII prima del sync cloud
│       ├── ghost_sync.py              ← #17 Git push/pull bidirezionale (newer wins)
│       ├── md_validator.py            ← #18 Valida sintassi .md (heading/code/link/FM)
│       ├── auto_linker.py             ← #19 Fix link interni .md se file spostato
│       ├── semantic_indexer.py        ← #20 Tag + keyword → SQLite semantic_index.db
│       ├── toc_compiler.py            ← #21 TOC inline via <!-- TOC --> markers
│       ├── sentiment_topic.py         ← #22 Classifica .md in workspace tematici
│       ├── acl_manager.py             ← #23 Frontmatter → permessi NTFS Windows
│       ├── deep_link.py               ← #24 Shortcut .lnk per aprire .md in Cursor
│       ├── md_view_pipeline.py        ← #25 MD → JSON per dashboard React
│       ├── archivista.py              ← #26 Archive → Claude API → storytelling .md
│       ├── content_pipeline.py        ← #27 Storytelling → 3 formati (LI+podcast+video)
│       ├── elevenlabs_tts.py          ← CE-5 TTS: .md → .mp3 via ElevenLabs
│       ├── video_generator.py         ← CE-6 Video: script → .mp4 via HeyGen/D-ID
│       └── social_distributor.py      ← CE-7 Distribuisce su LinkedIn + Telegram
│   └── deploy\
│       └── n8n\
│           ├── docker-compose.yml     ← n8n + PostgreSQL + Traefik (Oracle Cloud)
│           └── workflow_content_engine.json  ← workflow CE-1→CE-7 (importa in n8n)
│
├── NODES\                             ← Nodi specializzati
│   ├── MENTE_SCANNER\                 ← Legge LA MIA MENTE → mente_digest.json
│   └── MENTE_WATCHER\
│
├── DATA\                              ← Output processato
│   ├── mente_digest.json              ← output MENTE_SCANNER
│   ├── semantic_index.db              ← SQLite indicizzazione semantica (#20)
│   ├── file_index.json                ← indice path .md (#19)
│   ├── view_index.json                ← indice view React (#25)
│   ├── watchdog_status.json           ← stato processi monitorati (#14)
│   ├── sanitizer_report.json          ← ultimo scan dati sensibili (#16)
│   ├── ghost_sync_report.json         ← ultimo sync cloud (#17)
│   ├── views\                         ← JSON strutturati per dashboard (#25)
│   ├── shortcuts\                     ← shortcut .lnk (#24)
│   └── logs\                          ← log di tutti i moduli
│
├── DASHBOARD\                         ← React frontend (Vite + react-grid-layout)
│   ├── src\
│   │   ├── App.tsx
│   │   ├── components\
│   │   │   ├── EcosystemGrid.tsx
│   │   │   ├── EcoTreeView.tsx        ← questo albero — interattivo
│   │   │   ├── WarehouseView.tsx
│   │   │   ├── VincenteView.tsx
│   │   │   └── CatalogView.tsx
│   │   └── data\
│   │       ├── bomData.ts
│   │       └── ecosystemTree.ts
│   └── ECOSYSTEM_ARCHITECTURE.md     ← questo documento
│
├── CONTENT_ENGINE\  [Desktop separato] ← Pipeline creativa
│   ├── archive\                        ← storico storytelling
│   ├── produzione_contenuti\           ← output .md pronti (LinkedIn+podcast+video)
│   ├── audio\                          ← .mp3 ElevenLabs
│   ├── video\                          ← .mp4 HeyGen/D-ID
│   ├── distribuiti\                    ← log distribuzione social
│   └── templates\                      ← template LinkedIn / podcast / video
│
├── BACKUPS\                           ← snapshot incrementali (backup.py)
│   └── deep_freeze\                   ← .zip AES-256 settimanali (deep_freeze.py)
│
├── VERSIONS\                          ← changelog + snapshot storici
│   └── changelog.md                   ← log modifiche auto-generato
│
├── BRAIN\STATE.json                   ← stato live sistema
├── api_server.py                      ← Flask API v1.2 — 20+ endpoint → localhost:5001
├── CLAUDE.md                          ← istruzioni locali Claude Code
└── requirements.txt                   ← tutte le dipendenze Python
```

---

## 4 PILASTRI (ASSOLUTO V6.0)

| Pilastro | Nome | Stato | ATTO |
|----------|------|--------|------|
| 1 | **V32** — La Macchina | `in_progress` 65% | II, VII, VIII |
| 2 | **MIMS** — Il Protocollo Fisico | `waiting_press` 30% | III, X |
| 3 | **Personaggi** — Sistema Vivente | `building` | IV |
| 4 | **GENESIS** — Infrastruttura Digitale | `building` 10% | V |

---

## PERSONAGGI (ATTO IV)

| Nome | Ruolo | Tecnologia | Stato |
|------|-------|-----------|-------|
| **THEMIS** | Esecuzione tecnica | Claude Code · zero fluff | OPERATIVO |
| **EVA** | Motore economico | Python + WhatsApp API | IN BUILD |
| **AVA** | Traduttrice empatica | YouTube · 3D Pixar | DEFINITA |
| **ARIA** | Esperta materiali | Polimeri · ricette | FUTURO |
| **NEXUS** | Ing. strutturale | FEM · certificazioni | FUTURO |
| **TESLA** | Elettronico | PLC · IoT · schemi | FUTURO |
| **FORGE** | Produttivo | CAM · toolpath | FUTURO |

> LOGICA: Un personaggio nasce quando sblocchi un Ramo Skill che richiede expertise specifica.

---

## V32 SPEC (ATTO II + VIII)

```
Massa totale:    178 kg  (69 non sospesa + 109 sospesa)
Precisione:      ±0.019 mm  (IT6-IT7)
f₀:              3.91 Hz  (4 molle gialle ISO 90mm, K=16.4 N/mm)
Deflessione Z:   0.0006 mm @ 100N  (Config G)
Attenuazione:    99.99% @ 400 Hz  (mandrino 24.000 rpm)
Investimento:    €2.250
ROI Y1:          322%  (BEP 61 ore = 1.4 mesi)
```

---

## MIMS (ATTO III)

```
Piastra 40x40mm:  foro D16mm (standard) + croce D29.9mm H7/g6 + 4x D10mm angoli
Tile 190x190mm:   griglia 4x4 = 16 alloggiamenti MIMS, stampaggio compressione
6 Ricette:        STD · DAMP · FLEX · COND · HEAT · ECO
Pressa:           4 colonne, 20-50t, cilindri riciclati DATWLER
Stampo:           alluminio 7075 fresato dalla V32 stessa (meta-ricorsività)
```

---

## COMANDI RAPIDI

```bash
# ── AVVIO SISTEMA COMPLETO ────────────────────────────────────
START_ECOSYSTEM.bat                          # avvia tutto in sequenza

# ── SINGOLI PROCESSI ──────────────────────────────────────────
python api_server.py                         # API Flask :5001
pythonw AUTOMATIONS/core/watcher.py          # Watchdog FS (background)
python AUTOMATIONS/core/automation_watchdog.py  # Monitora processi

# ── DASHBOARD ─────────────────────────────────────────────────
cd DASHBOARD && npm run dev                  # React :5173

# ── CONTENT ENGINE ────────────────────────────────────────────
python AUTOMATIONS/core/archivista.py --tema "MIMS" --formato full
python AUTOMATIONS/core/content_pipeline.py --tema "V32" --formati linkedin,podcast
python AUTOMATIONS/core/elevenlabs_tts.py --file nome_podcast.md
python AUTOMATIONS/core/video_generator.py --file nome_script_video.md
python AUTOMATIONS/core/social_distributor.py --file post.md --all

# ── MANUTENZIONE ──────────────────────────────────────────────
python AUTOMATIONS/core/sanitizer.py         # scan dati sensibili
python AUTOMATIONS/core/deep_freeze.py       # backup AES-256 manuale
python AUTOMATIONS/core/ghost_sync.py --push # sync → GitHub
python AUTOMATIONS/core/semantic_indexer.py --reindex    # reindicizza tutto
python AUTOMATIONS/core/toc_compiler.py --all            # aggiorna tutti i TOC
python AUTOMATIONS/core/md_view_pipeline.py --rebuild    # rebuild view React

# ── INSTALL ───────────────────────────────────────────────────
pip install -r requirements.txt              # tutte le dipendenze

# ── API ENDPOINTS PRINCIPALI ──────────────────────────────────
# GET  :5001/api/state              → STATE.json live
# GET  :5001/api/health             → stato sistema
# POST :5001/api/content/trigger    → CE-1 lancia pipeline content
# POST :5001/api/content/generate   → CE-3 genera storytelling (sincrono)
# POST :5001/api/content/tts        → CE-5 .md → .mp3
# POST :5001/api/content/video      → CE-6 script → .mp4
# POST :5001/api/content/distribute → CE-7 pubblica su social
# GET  :5001/api/semantic/search?q= → ricerca semantica SQLite
# GET  :5001/api/view/<path>        → view JSON strutturata per React
# GET  :5001/api/watchdog/status    → stato processi monitorati
```

---

## STATO AUTOMAZIONI (2026-03-16)

| Categoria | Conteggio | Note |
|-----------|-----------|------|
| Automazioni attive | **28/28** | tutte completate |
| Content Engine step | **7/7** | CE-1→CE-7 completi |
| API endpoints | **20+** | Flask :5001 |
| Dipendenze Python | psutil · pyzipper · pywin32 · anthropic · flask · requests | `pip install -r requirements.txt` |
| Chiavi .env richieste | ANTHROPIC · ELEVENLABS · HEYGEN/DID · LINKEDIN · TELEGRAM | aggiungi a `TITANIUM_OS/.env` |

---

## TIMELINE (ATTO XII)

| Data | Milestone |
|------|-----------|
| 2026 Q1 | **[ATTIVO]** Rinforzi Config G (gusset + diag + tiranti M10) |
| 2026 Q2 | Colonne Z+U definitive + Epoxy fill |
| 2026 Q3 | V32 assemblaggio completo |
| 2027 Q1 | V32 operativa + primi stampi MIMS |
| 2027 Q4 | EVA €1.500/mese + polimero brevettato |
| 2028    | Precision Lab + Hub&Spoke + €2.000/mese |
| 2029    | V32 Mk2 + EVA SaaS + 50k iscritti |
| **Lug 2030** | **IL CAPANNONE** — Matteo 35 anni: LIBERO |
