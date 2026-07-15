# 🧩 _TEMPLATE — la base per OGNI carosello nuovo

**Sei in:** `POSTER/CAROSELLI/_TEMPLATE/` — da qui si parte, SEMPRE.

| File | Cos'è |
|------|-------|
| `carosello_base.html` | Lo scheletro canonico (canvas 1080×1350, classi, meta `hz:`) — COPIA QUESTO per un carosello nuovo |
| `tokens.css` | I valori canonici spiegati (font, corpi, colori) — la difesa anti-drift |
| `sg_builder.py` | Il builder dell'apprendista notturno (scene SOLO dalla libreria; usato da `night_caroselli`) |
| `components/` | Componenti riusabili |

## LA regola (attacco #53, F12)
**MAI copiare un carosello esistente per farne uno nuovo** — il copia-incolla tra
episodi aveva già prodotto drift misurabile (`.lead` 60→62→66px). Si copia SOLO
`carosello_base.html`; i valori si prendono da `tokens.css`.
