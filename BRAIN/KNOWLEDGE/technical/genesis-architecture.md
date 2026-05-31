<!-- TOC -->

- [genesis-architecture.md  knowledge/technical  v1.0  2026-03-10](#genesis-architecturemd-knowledgetechnical-v10-2026-03-10)
- [GENESIS  Architettura Infrastruttura Digitale](#genesis-architettura-infrastruttura-digitale)
- [Fonte: ASSOLUTO V6  STATE.json  AUTOMATIONS/core/](#fonte-assoluto-v6-statejson-automationscore)
  - [Cosè GENESIS](#cosè-genesis)
  - [Stato attuale: 25 completato](#stato-attuale-25-completato)
  - [Architettura (3 Layer)](#architettura-3-layer)
  - [Nodi Pianificati](#nodi-pianificati)
    - [MENTE_SCANNER (priorità ALTA)](#mentescanner-priorità-alta)
    - [Watcher PDF_DROP (priorità ALTA)](#watcher-pdfdrop-priorità-alta)
    - [n8n Self-Hosted (priorità MEDIA)](#n8n-self-hosted-priorità-media)
    - [EVA WhatsApp Bot (priorità MEDIA)](#eva-whatsapp-bot-priorità-media)
    - [V32_WATCHER (priorità BASSA  post assemblaggio)](#v32watcher-priorità-bassa-post-assemblaggio)
  - [Roadmap GENESIS](#roadmap-genesis)

<!-- /TOC -->

# genesis-architecture.md | knowledge/technical | v1.0 | 2026-03-10
# GENESIS — Architettura Infrastruttura Digitale
# Fonte: ASSOLUTO V6 + STATE.json + AUTOMATIONS/core/

---

## Cos'è GENESIS

Infrastruttura digitale dell'ecosistema. Tutto ciò che non è fisico: automazioni, dashboard, AI, dati.

## Stato attuale: 25% completato

| Componente | Stato | Dove vive |
|-----------|-------|-----------|
| Dashboard React | LIVE v1.0 | `DASHBOARD/` — Vite + React 19 + Tailwind |
| STATE.json | OPERATIVO | `BRAIN/STATE.json` — stato live sistema |
| KNOWLEDGE base | POPOLATA (15 file) | `BRAIN/KNOWLEDGE/` — 4 domini |
| Api Server Flask | OPERATIVO | `api_server.py` — porta :5001 |
| pdf_to_memory.py | OPERATIVO | `AUTOMATIONS/core/` — processa PDF |
| assoluto_splitter.py | OPERATIVO | `AUTOMATIONS/core/` — splitta ATTI |
| session_orienter.py | OPERATIVO | `AUTOMATIONS/core/` — orienta sessione |
| state_updater.py | OPERATIVO | `AUTOMATIONS/core/` — aggiorna STATE |
| MENTE_SCANNER | DA TESTARE | `NODES/MENTE_SCANNER/scanner.py` |
| watcher.py | DA AVVIARE | `AUTOMATIONS/core/` — monitora PDF_DROP |
| n8n Self-Hosted | NON DEPLOYATO | Da installare su VPS (€5-10/mese) |
| ESP32 IoT | NON CONFIGURATO | Hardware presente, firmware da scrivere |
| EVA WhatsApp | PENDING | Nodo n8n + Python — Maria Rule |

## Architettura (3 Layer)

```
LAYER 1: SENSORI + INPUT
  ESP32 → webhook n8n (POST JSON)
  PDF_DROP → watcher.py → pdf_to_memory.py
  MENTE_SCANNER → mente_digest.json
  Utente → Claude Code (THEMIS)

LAYER 2: LOGICA + PROCESSING
  n8n (Self-Hosted VPS) → AI Agent ReAct
  AUTOMATIONS/core/ (8 moduli Python)
  Flask API :5001 → routing dati

LAYER 3: OUTPUT + VISUALIZZAZIONE
  Dashboard React :5173 → legge STATE.json + DATA/
  AVA HUD VISUAL → YouTube
  EVA → WhatsApp bot per Maria
```

## Nodi Pianificati

### MENTE_SCANNER (priorità ALTA)
- **Cosa fa**: legge `%USERPROFILE%\MICROINDUSTRY\MENTE\` → estrae decisioni, spec, milestone (env: MENTE_DIR)
- **Output**: `DATA/mente_digest.json`
- **Comando**: `cd NODES/MENTE_SCANNER && python scanner.py`
- **Stato**: script scritto, da testare su dati reali

### Watcher PDF_DROP (priorità ALTA)
- **Cosa fa**: monitora `PDF_DROP/` in background, auto-processa nuovi PDF
- **Comando**: `python AUTOMATIONS/core/watcher.py`
- **Frequenza**: poll ogni 10s (configurabile)
- **Stato**: script scritto, da avviare

### n8n Self-Hosted (priorità MEDIA)
- **Cosa fa**: PLC software — orchestrazione webhook, AI Agent, automazioni
- **Deploy**: VPS Linux (€5-10/mese) con Docker
- **Prerequisito**: dominio + SSL per webhook production
- **Stato**: NON deployato — attende decisione hosting

### EVA WhatsApp Bot (priorità MEDIA)
- **Cosa fa**: gestione appuntamenti + compleanni + marketing per Vita Natura
- **Stack**: n8n → WhatsApp Business API → Python backend
- **Vincolo**: Maria Rule — zero complessità visibile per Maria
- **Stato**: PENDING — attende n8n deployment

### V32_WATCHER (priorità BASSA — post assemblaggio)
- **Cosa fa**: telemetria CNC in tempo reale
- **Sensori**: IFM VSE150 (vibrazioni) + VSA004 (accelerometro) via IO-Link
- **Protocollo**: OPC-UA via CP343 Ethernet + ESP32 per sensori analogici
- **Stato**: FUTURE — attende V32 assemblata e operativa

## Roadmap GENESIS

| Fase | Target | Azioni |
|------|--------|--------|
| G1 (ora) | Stabilizzare base | Testare MENTE_SCANNER, avviare watcher, aggiornare changelog |
| G2 (Q2 2026) | n8n live | Deploy VPS, primo webhook produzione, EVA WhatsApp pilot |
| G3 (Q3 2026) | Telemetria | ESP32 firmware, IFM VSA004 collegato, dashboard real-time |
| G4 (Q4 2026) | Autonomia | Sistema si auto-mantiene: backup, alert, report automatici |
