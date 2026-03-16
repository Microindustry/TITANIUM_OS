# iot-automation.md | knowledge/technical | v1.0 | 2026-03-10
# Architettura IoT e Automazione — n8n + ESP32
# Fonte: ASSOLUTO V6 — Blocco 2

---

## Architettura n8n

- n8n = PLC di nuova generazione (quadro elettrico software)
- Nodi: Workflow, Trigger, Action, Merge, IF/Switch, Code
- **Self-Hosted su VPS** (€5-10/mese) — obbligatorio per libertà e costi
- Cloud: €20-120/mese (da evitare)

## Webhook

- URL unico che rimane in ascolto
- Metodo POST per dati sensori
- GET solo per query di stato
- Payload JSON = "BOM digitale"
- Separare Test URL da Production URL

## AI Agent (Nodo n8n) — 4 Componenti

| Componente | Funzione |
|-----------|---------|
| Modello (CPU) | Elaborazione intelligenza |
| Memoria (RAM) | Contesto conversazione |
| Tools (Attuatori) | Azioni eseguibili |
| Prompt (Manuale) | Istruzioni comportamento |

**Ciclo ReAct**:
```
Ricezione → Pensiero → Decisione → Azione → Osservazione → Risposta
```

- Per arresti emergenza: logica IF deterministica (mai AI)
- Per ottimizzazione energetica: AI perfetta

## ESP32

**Stack**:
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
```

**Loop base**:
```
Check WiFi → Leggi sensore → Crea JSON → POST webhook → Leggi risposta → Delay
```

**Tensione**: 3.3V — attenzione partitori su sensori 5V

**Send-on-Delta**:
```cpp
// LOGICA: invia solo se valore cambiato — risparmio 90% traffico
if (abs(attuale - precedente) > SOGLIA) {
    inviaWebhook(payload);
    precedente = attuale;
}
```

## Sicurezza IoT

- Header Auth: `x-api-key` su ogni webhook
- Parsing pulito in n8n prima di passare ad AI Agent
- Zero-Trust su credenziali
- Secrets mai nel codice sorgente

## Integrazione V32

- Sensori IFM VSA004 → ESP32 → n8n → AI Agent → allarme/log
- Soglie allarme calcolate su fn misurata (non stimata)
- OPC-UA via CP343 Ethernet per dati PLC Siemens S7-314C
