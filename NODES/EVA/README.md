<!-- TOC -->

- [EVA  Assistente WhatsApp (Vita Natura)](#eva-assistente-whatsapp-vita-natura)
  - [File](#file)
  - [Provare subito (offline, zero setup)](#provare-subito-offline-zero-setup)
  - [Collegare WhatsApp vero (quando pronti)](#collegare-whatsapp-vero-quando-pronti)
  - [Note di design](#note-di-design)
  - [Prossimi step](#prossimi-step)

<!-- /TOC -->

# EVA — Assistente WhatsApp (Vita Natura)

> Stato: **pilot v0.2** — scaffold dry-run + prenotazione multi-turno (slot-filling).
> Persona: EVA (WhatsApp automation, prenotazioni Vita Natura). Vedi `CLAUDE.md` › PERSONAGGI AI.

EVA risponde su WhatsApp a orari, servizi e richieste di prenotazione. La logica vive
in `eva_brain.py` (rule-based, sostituibile con NLU LLM); il webhook Meta in `eva_server.py`.

## File

| File | Ruolo |
|------|-------|
| `eva_brain.py` | Classifica l'intento e compone la risposta. Testabile offline. |
| `eva_session.py` | Stato conversazione: prenotazione multi-turno (servizio→giorno→ora→nome). |
| `eva_inbox.py` | Inbox handoff: registra le richieste passate all'operatore in `DATA/eva/handoffs.jsonl`. |
| `eva_server.py` | Webhook Flask per WhatsApp Cloud API. Dry-run di default. |
| `test_eva.py` | Test offline (intenti + flusso prenotazione). `python NODES\EVA\test_eva.py`. |
| `config.example.json` | Template (orari, servizi, risposte). Copia in `config.json`. |
| `config.json` | Dati reali del centro — **gitignored**, non versionato. |

> I **segreti** (token, app secret) NON stanno qui: vanno in `_VAULT/KEYS/titanium_os.env`.

## Provare subito (offline, zero setup)

```powershell
python NODES\EVA\eva_brain.py "vorrei prenotare una pulizia viso"
python NODES\EVA\eva_brain.py --repl
```

Avvio webhook in dry-run (logga le risposte invece di inviarle):

```powershell
python NODES\EVA\eva_server.py
# poi:  curl http://localhost:5055/health
```

## Collegare WhatsApp vero (quando pronti)

1. **Meta for Developers** → crea app *Business* → aggiungi prodotto **WhatsApp**.
2. Ottieni: *Phone Number ID*, *token permanente* (System User), *App Secret*.
3. Scegli un *Verify Token* a piacere (stringa segreta tua).
4. Metti in `_VAULT/KEYS/titanium_os.env`:
   ```
   EVA_WHATSAPP_TOKEN=...
   EVA_PHONE_NUMBER_ID=...
   EVA_VERIFY_TOKEN=...
   EVA_APP_SECRET=...
   EVA_DRY_RUN=0
   ```
5. Esponi la porta 5055 con un tunnel pubblico HTTPS (es. `ngrok http 5055` o Cloudflare Tunnel).
6. Nel pannello Meta → WhatsApp → *Configuration*: Callback URL = `https://<tunnel>/webhook`,
   Verify Token = quello scelto. Sottoscrivi il campo **messages**.
7. Manda un messaggio al numero: EVA risponde.

## Note di design

- **Dry-run di sicurezza**: senza token EVA non invia nulla, logga e basta. Nessun rischio
  di scrivere ai clienti durante i test.
- **Handoff umano**: per prenotazioni/annullamenti EVA conferma di passare a una persona del
  centro (`handoff=true`), invece di garantire slot che non puo' verificare. L'aggancio reale
  all'agenda (Google Calendar MCP / n8n) e' lo step successivo.
- **Inbox handoff**: ogni handoff viene registrato in `DATA/eva/handoffs.jsonl` (gitignored, PII).
  L'operatore lo legge con `python NODES\EVA\eva_inbox.py --nuovi` o via `GET /inbox` del webhook.
  E' la base per le notifiche n8n al centro.
- **NLU**: `classify_intent()` e' rule-based; si sostituira' con Claude o LLM locale tenendo la
  stessa firma `handle_message(text) -> {intent, reply, handoff}`.

## Prossimi step

- [x] Flusso prenotazione multi-turno (slot-filling: servizio → giorno → ora → nome → handoff).
- [x] Inbox handoff persistente (`DATA/eva/handoffs.jsonl`) + CLI/endpoint per l'operatore.
- [ ] Collegare l'agenda reale (Google Calendar) per slot/disponibilita'.
- [ ] Wiring in n8n: leggere `/inbox` (status=nuovo) e notificare il centro all'handoff.
- [x] Persistere lo stato sessione (`DATA/eva/sessions.json`): sopravvive ai restart del webhook.
- [ ] Sostituire la NLU rule-based con LLM (intent + estrazione entita').
