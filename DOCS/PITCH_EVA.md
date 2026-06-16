# EVA — 1-Pager (Vita Natura)

> *Un assistente AI che manda avanti un centro estetico — e dimostra che il sistema funziona su clienti veri.*

**Microindustry · TITANIUM_OS · pilastro VITA NATURA**
_Stato reale: pilot v0.3 (non "pending" — la piattaforma esiste, gira offline in dry-run)._

---

### Cos'è (davvero — non un placeholder)
**EVA** è la piattaforma di automazione del centro estetico di Maria. Non è un'idea: è codice che gira, in `NODES/EVA/`.
- **`eva_brain.py`** — classifica l'intento del messaggio e compone la risposta (rule-based, sostituibile con LLM a parità di firma).
- **`eva_session.py`** — **prenotazione multi-turno** vera (slot-filling: servizio → giorno → ora → nome), stato persistente su disco (sopravvive ai restart).
- **`eva_inbox.py`** — **handoff umano** persistente: ogni richiesta che EVA non può garantire viene passata all'operatore (`DATA/eva/handoffs.jsonl`) con CLI/endpoint per leggerla e chiuderla.
- **`eva_server.py`** — webhook Flask per **WhatsApp Cloud API**, **dry-run di sicurezza** (senza token non scrive ai clienti: logga e basta).
- **`test_eva.py`** — test offline su intenti + flusso prenotazione.

### Perché conta
È il **ponte**: porta **cashflow reale** (un centro con clienti veri) mentre V32/MIMS maturano, ed è la **prova su un caso reale** che il metodo TITANIUM_OS funziona fuori dal laboratorio. La "Maria Rule": complessità tutta nel backend, lato cliente solo un pulsante o un vocale.

### Stato e prossimi passi (reali)
- ✅ Flusso prenotazione multi-turno · ✅ inbox handoff persistente · ✅ sessioni su disco · ✅ dry-run sicuro.
- ⏳ Collegare l'**agenda reale** (Google Calendar) per disponibilità/slot.
- ⏳ Wiring **n8n**: notificare il centro all'handoff (legge `/inbox`).
- ⏳ Sostituire la NLU rule-based con **LLM** (intent + entità).
- 🔑 Per il WhatsApp live servono i token Meta in `_VAULT/KEYS` (setup, non sviluppo).

### In una riga
La piattaforma c'è e gira in sicurezza; manca solo l'aggancio all'agenda reale e i token per andare live. **Non è "pending": è un pilot pronto da collegare.**
