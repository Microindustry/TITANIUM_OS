# tech-stack-unified.md | knowledge/technical | v1.0 | 2026-03-10
# Stack Tecnologico Completo — TITANIUM_OS

---

## Software Development

| Layer | Tecnologia | Versione | Stato |
|-------|-----------|----------|-------|
| Editor | Cursor + Claude Code | latest | OPERATIVO |
| Backend | Python | 3.10+ (3.14 installato) | OPERATIVO |
| Frontend | React 19 + Vite + Tailwind v4 | latest | OPERATIVO |
| API | Flask | 3.x | OPERATIVO (:5001) |
| AI locale | Ollama | latest | DA CONFIGURARE |
| AI cloud | OpenAI + Anthropic Claude | GPT-4 / Sonnet 4.6 | OPERATIVO |
| Versioning | Git | latest | OPERATIVO |
| OS | Windows 10 Pro | 10.0.19045 | — |

## IoT / Hardware

| Componente | Tecnologia | Stato |
|-----------|-----------|-------|
| Microcontroller | ESP32 (3.3V) | HARDWARE PRESENTE, firmware da scrivere |
| Stack firmware | WiFi.h + HTTPClient.h + ArduinoJson.h | DA IMPLEMENTARE |
| Sensore vibrazioni | IFM VSE150 (0-80mm/s, 4-20mA) | DISPONIBILE |
| Accelerometro | IFM VSA004 (triassiale, IEPE) | DISPONIBILE |
| IO-Link Master | Balluff BNI004L (8 porte) | DISPONIBILE |
| PLC | Siemens S7-314C-2 PtP | DISPONIBILE |
| Comunicazione | CP343 Ethernet/PROFINET + OPC-UA | DISPONIBILE |

## Automazione / Orchestrazione

| Componente | Tecnologia | Stato |
|-----------|-----------|-------|
| Orchestratore | n8n Self-Hosted | NON DEPLOYATO — target VPS Linux + Docker |
| Hosting VPS | TBD (Hetzner / Contabo) | DA SCEGLIERE — budget €5-10/mese |
| Webhook protocol | HTTPS POST + x-api-key header | DEFINITO, non implementato |
| WhatsApp API | WhatsApp Business API via n8n | PENDING — attende n8n |

## Dashboard / Visualizzazione

| Componente | Tecnologia | Porta | Stato |
|-----------|-----------|-------|-------|
| Dashboard web | React 19 + Vite | :5173 | LIVE |
| API backend | Flask | :5001 | LIVE |
| Data source | STATE.json + DATA/*.json | — | OPERATIVO |
| Video AI (AVA) | ElevenLabs + HeyGen/LivePortrait | — | PIANIFICATO |

## Database / Storage

| Dato | Formato | Dove |
|------|---------|------|
| Stato sistema | JSON | `BRAIN/STATE.json` |
| BOM V32 | TypeScript | `DASHBOARD/src/data/bomData.ts` |
| Albero ecosistema | TypeScript | `DASHBOARD/src/data/ecosystemTree.ts` |
| Knowledge base | Markdown (15 file) | `BRAIN/KNOWLEDGE/` |
| Digest mente | JSON | `DATA/mente_digest.json` |
| Milestone | JSON | `DATA/milestones.json` |

## Deployment

```
Locale (Windows):
  START_ECOSYSTEM.bat → Flask :5001 + Vite :5173 + browser

Futuro (VPS Linux):
  Docker Compose → n8n + webhook endpoint + SSL
```
