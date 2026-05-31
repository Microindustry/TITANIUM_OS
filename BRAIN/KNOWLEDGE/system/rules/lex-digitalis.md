<!-- TOC -->

- [lex-digitalis.md  system/rules  v1.0  2026-03-10](#lex-digitalismd-systemrules-v10-2026-03-10)
- [Protocollo Codice  LEX DIGITALIS](#protocollo-codice-lex-digitalis)
- [Fonte: ASSOLUTO V6  Blocco 6](#fonte-assoluto-v6-blocco-6)
  - [A. Commenti Logici](#a-commenti-logici)
  - [B. Sicurezza  Environment](#b-sicurezza-environment)
  - [C. Legge del Micro-Step](#c-legge-del-micro-step)
  - [D. Trasmissione Dati IoT](#d-trasmissione-dati-iot)
  - [E. Send-on-Delta (ESP32)](#e-send-on-delta-esp32)
  - [F. Sicurezza Webhook](#f-sicurezza-webhook)
  - [G. Visualizzazione Narrativa AVA HUD](#g-visualizzazione-narrativa-ava-hud)
  - [H. Header File Python (obbligatorio)](#h-header-file-python-obbligatorio)
  - [I. Percorsi](#i-percorsi)

<!-- /TOC -->

# lex-digitalis.md | system/rules | v1.0 | 2026-03-10
# Protocollo Codice — LEX DIGITALIS
# Fonte: ASSOLUTO V6 — Blocco 6

---

## A. Commenti Logici
- Lingua: ITALIANO (sempre — anche se il codice è in inglese)
- Formato: `// LOGICA: [motivo ingegneristico]`
- Commentare il PERCHÉ, non il COSA
- THEMIS ragiona internamente in inglese → output e commenti sempre in ITALIANO

## B. Sicurezza & Environment
- Zero-Trust: mai API key in chiaro nel codice
- Python: `os.getenv('KEY')` obbligatorio
- C++: `#include "secrets.h"` con secrets.h in .gitignore
- Anticipare conflitti versioni/librerie

## C. Legge del Micro-Step
- Scrivi una funzione singola alla volta
- Chiedi conferma: "Funzione compilata. Procedo?"
- Solo al "Sì" → prossimo step
- Mai blocchi monolitici

## D. Trasmissione Dati IoT
- POST per dati sensori, GET solo per query di stato
- JSON come "BOM digitale" — struttura standardizzata
- ArduinoJson.h obbligatoria per ESP32

## E. Send-on-Delta (ESP32)
- Inviare SOLO se valore cambiato significativamente
- Risparmio traffico/costi 90%
```cpp
// LOGICA: evitare invii ridondanti — risparmio 90% traffico
if (abs(attuale - precedente) > SOGLIA) { invia(); }
```

## F. Sicurezza Webhook
- Header Auth: `x-api-key` su ogni endpoint
- Parsing pulito in n8n prima di passare ad AI Agent
- Zero-Trust su credenziali webhook

## G. Visualizzazione Narrativa AVA HUD
- Alla fine di ogni blocco codice → `[AVA HUD VISUAL]`
- Formato: `🔴 [cosa mostrare] | 🟡 [azione] | 🟢 [risultato]`

## H. Header File Python (obbligatorio)
```python
# modulo: nome_modulo.py
# parte di: NOME_PROGETTO
# versione: X.Y.Z
# data: YYYY-MM-DD
```

## I. Percorsi
- Sempre relativi (`./data/file.json`)
- Mai assoluti hardcoded
- `Path(__file__).parent` per riferimento dinamico
