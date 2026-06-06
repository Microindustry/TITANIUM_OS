<!-- TOC -->

- [AGENTS  Audit roster (P5: verifica se sono perfetti per noi)](#agents-audit-roster-p5-verifica-se-sono-perfetti-per-noi)
  - [Roster attuale (agents_db.json, 9 agenti)](#roster-attuale-agentsdbjson-9-agenti)
  - [Mismatch col canone CLAUDE.md (PERSONAGGI AI)](#mismatch-col-canone-claudemd-personaggi-ai)
  - [Raccomandazione (DECISIONE A MATTEO)](#raccomandazione-decisione-a-matteo)
  - [Stato P5 già fatto (sessioni 30-31)](#stato-p5-già-fatto-sessioni-30-31)

<!-- /TOC -->

# AGENTS — Audit roster (P5: "verifica se sono perfetti per noi")

*06/06/2026 · sessione autonoma · richiesta di Matteo nel PIANO P5*

> Nota di Matteo (Desktop\TITANIUM_OS_PIANO.txt, P5): *"non so nemmeno se sono
> perfetti per noi, verifica e ottimizza."* Questo doc è la verifica. Il **prune
> del roster non l'ho fatto io**: è una decisione di visione (vedi sotto).

## Roster attuale (`agents_db.json`, 9 agenti)

| id | nome | ruolo | active | rag_domains | nel progetto? |
|----|------|-------|--------|-------------|---------------|
| tesla | TESLA ⚡ | elettrico industriale/civile | ✅ | V32, OFFICINA | **Sì** — quadri/VFD per V32 |
| forge | FORGE 🔧 | meccanico + officina | ✅ | V32, MIMS, OFFICINA | **Core** — saldatura/CNC/MIMS |
| aqua | AQUA 🌿 | acquaponica/serre/bioreattori | ✅ | KNOWLEDGE, acquaponica, serre | **❌ Fuori scope** — non esiste acquaponica in TITANIUM_OS; i domini RAG `acquaponica`/`serre` non esistono in MENTE/ |
| lex | LEX 📋 | tecnico-legale/normativo | ✅ | ASSOLUTO, MIMS | **Sì** — brevetti MIMS, CE |
| plc | SIEMENS 🖥️ | PLC Siemens S7/TIA | ✅ | V32, OFFICINA | **❓ Dubbio** — il V32 è una CNC hobby in taverna 12mq (controller tipo GRBL/LinuxCNC), non un impianto Siemens S7-1500. Sovradimensionato per ora |
| themis | THEMIS ⚖️ | analista sistema/V32/GENESIS | ✅ | ASSOLUTO, V32, MIMS, GENESIS | **Core** — già operativo (legge cartella clinica) |
| aria | ARIA 🧠 | Life OS / ADHD | ⬜ false | SESSIONI, PERSONALE | **Sì** (futuro) — coerente col canone |
| argus | ARGUS 👁️ | screen agent / computer-use | ✅ | — | **Sì** — desktop-agent reale |
| eva | EVA 💬 | WhatsApp / Vita Natura | ⬜ false | VITA_NATURA | **Core** (in sviluppo) |

## Mismatch col canone CLAUDE.md (PERSONAGGI AI)

Canone CLAUDE.md: **THEMIS, EVA, AVA, ARIA, NEXUS, TESLA, FORGE**.

- **Nel canone ma NON in agents_db:** `AVA` (avatar YouTube/reel), `NEXUS`
  (orchestratore agenti). → se sono personaggi reali, vanno aggiunti; se no,
  vanno tolti dal canone CLAUDE.md per coerenza.
- **In agents_db ma NON nel canone:** `aqua`, `lex`, `plc/SIEMENS`, `argus`.
  `argus` = lo screen agent reale (ok, solo da canonizzare). `aqua`/`plc` =
  probabili residui di un template agenti generico.

## Raccomandazione (DECISIONE A MATTEO)

Il sistema è "la base per QUALSIASI progetto" → `aqua`/`plc` **potrebbero** essere
generalità voluta per verticali futuri. Per questo NON ho pruunato il roster.
Opzioni, in ordine di quanto le consiglio:

1. **(consigliata) Curare il roster "per noi adesso":** `active:false` su `aqua`
   (fuori scope) e `plc` (sovradimensionato), così spariscono dalla chat attiva
   ma restano disponibili (reversibile, git li conserva). Allineare CLAUDE.md.
2. **Tenere tutto** se la visione multi-progetto è prioritaria: allora aggiungere
   `aqua`/`plc` al canone CLAUDE.md con la nota "verticali futuri".
3. **Aggiungere AVA + NEXUS** ad agents_db se diventano operativi (oggi non lo sono).

> Quando Matteo decide, l'azione è 1 riga per agente (`"active": false`) o
> l'aggiunta di una entry: additivo, isolato, reversibile.

## Stato P5 già fatto (sessioni #30-31)

- ✅ RAG grounding reale in `/api/agents/ask` (+fonti in UI) — basta teatro.
- ✅ THEMIS ruolo operativo: legge `DATA/audit/critiche_auto.json` (cartella clinica).
- ✅ Chat RAG diretta separata dagli agenti (`/api/rag/chat`).
- ⬜ Visibilità "sto interrogando gli agenti" nella chat Claude (richiesta P5):
  è comportamento mio in sessione, non codice — da rendere abitudine quando
  un task tecnico tocca un dominio agente (THEMIS↔sistema, FORGE↔MIMS/officina).
