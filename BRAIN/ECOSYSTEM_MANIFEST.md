<!-- TOC -->

- [ECOSYSTEM MANIFEST  TITANIUM](#ecosystem-manifest-titanium)
  - [Identità](#identità)
  - [Gerarchia Layer](#gerarchia-layer)
  - [I 15 Nodi operativi (NODES/)](#i-15-nodi-operativi-nodes)
  - [Livelli di visibilità](#livelli-di-visibilità)
  - [Principio fondante](#principio-fondante)
  - [Origine](#origine)
  - [Visualizzazione target](#visualizzazione-target)

<!-- /TOC -->

# ECOSYSTEM MANIFEST — TITANIUM

> Il sistema nervoso digitale di Matteo Benenati.
> Costruito da un artigiano industriale con ADHD.
> Ogni nodo è un pezzo reale. Ogni connessione è un flusso vivo.

---

## Identità

**TITANIUM** è l'ecosistema. Non un progetto singolo — un organismo.

Nasce da ASSOLUTO V7 (il documento fondante) e si espande in nodi infiniti.
Ogni nodo ha un livello di visibilità. Ogni nodo può diventare un sotto-ecosistema.

---

## Gerarchia Layer

```
TITANIUM (brand / umbrella / identità)
│
├── GENESIS OS (cervello vivo)
│   ├── STATE.json — stato corrente, milestones, focus, blockers
│   ├── BRAIN/KNOWLEDGE/ — 15 file di contesto per LLM
│   ├── watcher / state_updater — sistema nervoso autonomo
│   └── agent_loop (futuro) — decisioni autonome
│
├── ECOSYSTEM (rete / API / connessioni)
│   ├── api_server.py — endpoints REST
│   ├── n8n_bridge.json — orchestrazione workflow
│   └── MCP servers — filesystem, github, fetch, sqlite
│
├── DASHBOARD (interfaccia visiva)
│   ├── NeuroMapView — mappa SVG drill-down immersiva
│   ├── NeuroOSLayout — vista mappa con dot grid + pulse
│   ├── CanvasLayout — canvas draggabile
│   ├── SINAPSI (LayersView) — database layer per progetto
│   ├── StorieView — episodi podcast + LLM dataset
│   └── EcosystemView (futuro) — la rete a nodi infinita
│
├── CONTENT ENGINE (storytelling / narrazione / brand)
│   ├── milestone_to_episode.py — STATE.json → episodio podcast
│   ├── episodes_to_dataset.py — episodi → training JSONL
│   ├── episode_to_audio.py — TTS Kokoro offline
│   ├── DATABASE/episodes/ — .md con frontmatter LLM-ready
│   └── reel_hook — script 60-80 parole per IG/YT
│
├── PRODOTTI FISICI
│   ├── V32 — fresatrice CNC 3 assi (178kg, ±0.019mm)
│   ├── MIMS — connettori modulari fisici
│   ├── VULCAN — pressa 20t + ricette polimeri + brevetto
│   └── FIT PARK 4.0 — area fitness con tornello MIMS
│
├── PRODOTTI DIGITALI
│   ├── EVA — AI assistant WhatsApp per Vita Natura
│   └── LLM Matteo (futuro) — modello fine-tuned sulla narrazione
│
└── IDENTITÀ PUBBLICA
    ├── GitHub Microindustry — repo + profilo README
    ├── CV Navigabile — layer espandibili, proof-of-work reali
    ├── Podcast — episodi audio da Content Engine
    ├── Social — reel IG/YT, LinkedIn, contenuto tecnico
    └── MATTEO map — mappa SVG standalone navigabile
```

---

## I 15 Nodi operativi (NODES/)

*La mappa concettuale sopra dice i **layer**; qui i **nodi reali** su disco (agg. 2026-06-24, sess.#44). Diverse voci "(futuro)" del 2025 sono ora vive: `agent_loop`→**SELF_IMPROVE**, `LLM Matteo`→**LOCAL_LLM**.*

| Cluster | Nodo | Cosa fa |
|---------|------|---------|
| **Conoscenza** | `MENTE_RAG` | RAG v4.0 ibrido (BM25+semantico+CrossEncoder), GPU |
| | `MENTE_SCANNER` | estrazione doc da PDF/DOCX → MENTE |
| | `MENTE_WATCHER` | watch fs → trigger RAG incrementale |
| | `RESEARCH_AGENT` | trova paper/tesi dal web → ingesta in MENTE |
| **Agenti** | `NEXUS` | swarm orchestrator multi-agente |
| | `AGENTS` | registry agenti + validator |
| **Contenuti** | `STORY_AGENT` | episodi dev-log da git log |
| | `NINA_AGENT` | avventure educative "Nina" grounded sul RAG (2 stadi) — 50 ep |
| | `AI_NEWS_WATCHER` | scouting keyless creator/repo AI (tier 48h) |
| **Auto-cura** | `AUDIT_AGENT` | self-audit notturno → cartella clinica |
| | `SELF_IMPROVE` | auto-miglioramento (regola 11): segnali interni+esterni → proposte |
| | `PCT_SYNC` | coerenza % pilastri ← STATE.json (fonte unica) |
| **Interfaccia** | `COMPUTER_USE` | ARGUS v2, computer use ibrido a 3 livelli |
| | `LOCAL_LLM` | inferenza LLM locale (Ollama) |
| | `EVA` | assistente WhatsApp (Vita Natura) · pilot |

---

## Livelli di visibilità

| Livello | Icona | Cosa contiene | Chi lo vede |
|---------|-------|---------------|-------------|
| **CORE** | 🔒 | STATE.json, blockers, ADHD scaffolding, note private | Solo Matteo |
| **SISTEMA** | 🔧 | Architettura, code, automazioni, knowledge graph | Matteo + Claude |
| **PROGETTO** | 📋 | V32 progress, MIMS spec, VULCAN ricette, EVA config | Collaboratori |
| **PUBBLICO** | 🌐 | Storytelling, CV, GitHub, podcast, reel, portfolio | Tutti |

---

## Principio fondante

> L'ecosistema non è un portfolio.
> Non è un prodotto.
> È il sistema nervoso di un artigiano con ADHD
> che costruisce macchine fisiche e software per non perdere il filo.
>
> La complessità non è un difetto — è il territorio.
> Il sistema la rende navigabile.

---

## Origine

Tutto parte da ASSOLUTO V7 — il documento che mappa ogni decisione,
ogni pezzo fisico, ogni connessione tra progetti.
È la Bibbia del sistema. Il resto è implementazione.

---

## Visualizzazione target

La dashboard deve mostrare questa rete come **nodi vivi connessi**:
- Centro: MATTEO
- Primo anello: layer (PRIVATO / PUBBLICO)
- Ogni nodo si espande in sotto-nodi
- Colori per tipo (fisico/digitale/narrazione/sistema)
- Connessioni animate tra nodi correlati
- Pulse sui nodi attivi (focus_today)
- Glow sui nodi con blocker
- Drill infinito: ogni nodo è un sotto-ecosistema

Riferimento visivo: @alexandra.kassis — rete di agenti con particelle colorate.
Tecnica: SVG + force-directed layout o radial tree, React, dati da STATE.json via API.
