## Matteo Benenati — Microindustry

```
╔══════════════════════════════════════════════════════════════════════╗
║  ARTIGIANO INDUSTRIALE + SYSTEM BUILDER                              ║
║  15 anni di officina. Titanio, robot, presse, CNC da zero.           ║
║  Il codice è la mia seconda officina.                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

### Chi sono

Non vengo dal software. Vengo dall'officina.

Ho saldato scarichi in titanio per le moto del MotoGP da SCProject. Ho programmato robot ESSEGI per linee di packaging industriale. Ho operato presse DATWLER e fatto QC su impianti di refrigerazione LU.VE. Ho costruito macchine con le mani per 15 anni prima di scrivere la prima riga di codice seria.

Quando ho iniziato a costruire la mia fresatrice CNC da zero — 178 kg, 3 assi, ±0.019 mm — ho capito che avevo bisogno di un sistema per non perdere il filo. Da lì è nato TITANIUM_OS.

Nessuna laurea. Solo proof-of-work reali.

---

### Processo evolutivo

| Periodo | Evento |
|---------|--------|
| 2008–2011 | Saldatura TIG titanio — scarichi MotoGP @ SCProject |
| 2012–2014 | Programmazione robot ESSEGI — packaging industriale |
| 2015–2023 | Operatore presse DATWLER · QC LU.VE refrigerazione · officina propria |
| Gen 2024 | Inizio costruzione fresatrice CNC V32 da zero — primo pezzo in Alu 7075 |
| Gen 2025 | TITANIUM_OS v1.0 — scaffolding Python + STATE.json + prime automazioni |
| Ago 2025 | V32 Config G: basamento saldato TIG, asse X assemblato (guide+vite+servo) |
| Feb 2026 | V32: 178 kg assemblati · HMI TP900 acquisito · 8 pezzi interfaccia lavorati |
| Mar 2026 | TITANIUM_OS v2.1 — Dashboard React live, 28 automazioni, Content Engine base |
| Mar 2026 | TITANIUM_OS v3.0 — NeuroMapView SVG immersiva (dark glow + spring animation) |
| Mar 2026 | TITANIUM_OS v3.2 — NeuroOSLayout, StorieView podcast, SINAPSI, MATTEO map |
| Mar 2026 | Content Engine live — 8 episodi auto-generati da STATE.json via Claude API |

---

### Progetti attivi

**🔩 V32 — Fresatrice CNC 3 assi**
Costruzione da zero. Struttura in alluminio 7075, viti a ricircolo di sfere, servo Siemens. Stato: `Config G — 65%`. Target: ±0.019 mm. Obiettivo finale: lavorazione MIMS tiles in produzione.

**🧠 TITANIUM_OS — Sistema operativo cognitivo personale**
Dashboard React 19 + Vite + Tailwind v4. 34 automazioni Python + n8n. Mappe SVG drill-down immersive, Content Engine con auto-generazione episodi podcast da STATE.json, database SINAPSI strutturato per progetti. `v3.2 live`.

**🔌 MIMS — Connettori modulari fisici**
Protocollo proprietario di connettori fisici modulari. Tile lavorabili su V32. Applicazione prevista: Fit Park 4.0 (area fitness con tornello MIMS proprietario). `Prototipo`.

**⚡ VULCAN — Pressa 20t + ricette polimeri**
Pressa Vevor 20t + colonne guida DATWLER + ricette polimeri A/B/C target. Brevetto di processo in sviluppo. Moat competitivo per MIMS tiles. Sequenza: STRUTTURA → RICETTE → BREVETTO → MIMS TILE → FIT PARK. `R&D`.

**🤖 EVA — AI assistant per Vita Natura**
WhatsApp bot + Claude API per centro estetico (Boffalora sopra Ticino). Gestione appuntamenti, FAQ automatiche, follow-up clienti. `Beta`.

**📡 SINAPSI — Memoria navigabile ecosistema**
Documentazione strutturata dell'ecosistema: CV a layer, VULCAN, MIMS, EVA. Database per istruire LLM proprietario futuro. `WIP`.

---

### TITANIUM_OS — Architettura v3.2

```
TITANIUM_OS/
├── DASHBOARD/                React 19 + Vite + Tailwind v4
│   ├── NeuroMapView          Mappa SVG drill-down — dark glow + spring animation
│   ├── NeuroOSLayout         Vista mappa: dot grid + pulse rings + drillZoom burst
│   ├── CanvasLayout          Vista canvas draggabile per stato progetti
│   ├── LayersView (SINAPSI)  Database layer strutturato per progetto
│   └── StorieView            22 episodi podcast (14 manuali + 8 auto) + LLM dataset
├── AUTOMATIONS/              34 automazioni (13 attive · 14 WIP · 7 Content Engine)
│   └── core/                 state_updater · content_pipeline · social_distributor
├── BRAIN/
│   ├── STATE.json            Stato live: milestone · WIP · focus · blockers
│   └── KNOWLEDGE/            15 file contesto LLM (sistema · progetti · CV)
├── CONTENT_ENGINE/           Pipeline auto-generazione episodi da milestone
│   ├── scripts/              milestone_to_episode.py · state_watcher.py
│   └── DATABASE/episodes/    .md frontmatter LLM-ready · auto-update storieData.ts
├── MATTEO/                   Mappa SVG ecosistema personale (vanilla JS · drill-down)
└── SINAPSI/                  Documentazione: CV · VULCAN · MIMS · EVA · Manifesti
```

---

### Stack

```
Frontend    React 19 · TypeScript · Vite · Tailwind v4 · Lucide Icons · SVG custom
Backend     Python 3.14 · Flask · SQLite · n8n · Claude API (Anthropic haiku-4-5)
AI          Claude claude-sonnet-4-6 (orchestrazione) · haiku-4-5 (content gen)
Hardware    TIG/MIG titanio · Alluminio 7075 CNC · Siemens S7-314C · Saldatura
Infra       Git · GitHub Actions · self-hosted Windows · Vite dev server
```

---

### Content Engine — come funziona

```
STATE.json                     storieData.ts
milestones.verified  →  milestone_to_episode.py  →  EP_AUTO_XXX.md  →  StorieView
     ↑                         ↑                          ↓
 Aggiornato                Claude API               LLM training
 manualmente              haiku-4-5               dataset futuro
```

Ogni milestone verificato in `STATE.json` diventa automaticamente un episodio podcast `.md` con frontmatter strutturato, pronto per:
- Pubblicazione podcast (voce + testo)
- Fine-tuning LLM proprietario
- Archivio proof-of-work navigabile

---

### Changelog TITANIUM_OS

```
v3.2  Mar 2026  NeuroOSLayout immersivo · StorieView 22 episodi · MATTEO map · SINAPSI
                Content Engine live: 8 episodi auto da STATE.json · Claude API integrata
v3.0  Mar 2026  NeuroMapView v3: SVG drill-down · dark glow · spring stagger · drillZoom
v2.1  Mar 2026  Dashboard React live · 28 automazioni · Content Engine base · n8n bridge
v2.0  Feb 2026  FileBrowser · MdManager · LayersView · CanvasLayout · StorieView base
v1.5  Feb 2026  API server Flask · state_updater.py · automazioni core · BRAIN/KNOWLEDGE
v1.0  Gen 2025  Scaffolding Python · STATE.json · primo sistema di tracking cognitivo
```

---

### Filosofia

> *Il sistema è lo scaffolding cognitivo.*
> *Ogni automazione è un'ora di attenzione recuperata.*
> *Ogni episodio del podcast è un mattone di proof-of-work documentato.*
> *Non costruisco per mostrare. Costruisco per capire.*
> *La V32 non è una macchina. È la prova che posso farlo.*

---

[![TITANIUM_OS](https://img.shields.io/badge/TITANIUM__OS-v3.2-10b981?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
[![V32](https://img.shields.io/badge/V32_CNC-65%25-f59e0b?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
[![Episodes](https://img.shields.io/badge/Podcast-22_episodi-a855f7?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
[![VULCAN](https://img.shields.io/badge/VULCAN-R%26D-ef4444?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
[![MIMS](https://img.shields.io/badge/MIMS-Prototipo-8b5cf6?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
[![EVA](https://img.shields.io/badge/EVA-Beta-3b82f6?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
[![Stack](https://img.shields.io/badge/Stack-React_19_·_Python_·_Claude_API-0ea5e9?style=flat-square)](https://github.com/Microindustry/TITANIUM_OS)
