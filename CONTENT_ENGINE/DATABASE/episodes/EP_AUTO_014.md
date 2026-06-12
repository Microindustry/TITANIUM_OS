---
id: "EP_AUTO_014"
milestone: "Content Engine v2 — 22 episodi + dual-pass haiku/sonnet + dataset.jsonl (22 Mar 2026)"
title: "22 episodi: il motore dei contenuti"
sottotitolo: "Dual-pass haiku/sonnet che scalano industriale"
stagione: "AUTO"
data_evento: "2026-03-22"
tags: ["content-engine", "automation", "podcast", "dataset", "haiku-sonnet"]
status: "ready"
durata_min: 8
reel_hook: "Ho appena finito di costruire un content engine che produce 22 episodi al mese con dataset pulito e due livelli di scrittura: haiku per l'impatto visivo, sonnet per la profondità narrativa. Prima gestivo tutto a manuale, perdevo tre giorni di lavoro solo per organizzare i materiali. Adesso carico i dati grezzi, il sistema passa prima sulla forma breve, poi sulla forma estesa, e mi consegna tutto pronto. Come scalereste questo per 100 episodi senza impazzire?"
generated: "2026-05-27T11:30:14.766042"
---
<!-- TOC -->

- [22 episodi: il motore dei contenuti](#22-episodi-il-motore-dei-contenuti)
- [Content Engine v2  Episodio: Il Sistema Che Scrive Se Stesso](#content-engine-v2-episodio-il-sistema-che-scrive-se-stesso)
  - [Scena](#scena)
  - [Il Bivio](#il-bivio)
  - [Connessione al Sistema](#connessione-al-sistema)
  - [Chiusura](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# 22 episodi: il motore dei contenuti

# Content Engine v2 — Episodio: Il Sistema Che Scrive Se Stesso

---

> "Ventidue episodi. Non li ho scritti io. Li ho costruiti come costruisco un asse."

---

## Scena

Giovedì sera. 22:15. Schermo del laptop riflesso sul piano in acciaio della V32 — la macchina è ferma, gusset sinistra ancora da fare, mandrino 2.2kW ER20 non è arrivato.

Non posso fresare. Quindi costruisco l'altro sistema.

Terminale aperto. `content_engine/` nella directory. Due modelli in pipeline: haiku per il draft veloce, sonnet per il secondo passaggio. Il dual-pass non è eleganza — è necessità. Haiku sbozza in 4 secondi. Sonnet lima. Io decido cosa tenere.

```bash
python engine.py --episodes 22 --pass dual --output dataset.jsonl
```

Cursore lampeggia. 3 secondi. `dataset.jsonl` creato. 22 righe. Ogni riga è un episodio completo più metadata: `topic`, `voice_score`, `revision_flag`.

---

## Il Bivio

Prima: scrivevo quando avevo energia. Cioè quasi mai.

L'ADHD funziona così: l'idea arriva alle 2 di notte mentre saldo, non il mercoledì mattina davanti allo schermo. Risultato: zero episodi pubblicati in tre mesi. Zero. Non perché mancassero le cose da dire — ne avevo 40 in testa. Mancava il sistema che trasformasse il pensiero in testo senza aspettare che avessi voglia.

Il Content Engine v2 risolve questo con una logica brutale: separa la generazione dalla revisione.

Haiku genera il grezzo — veloce, sporco, utilizzabile. Sonnet fa il secondo passaggio — struttura, voce, coerenza. Io faccio il terzo passaggio — 10 minuti, non un'ora. Taglio quello che non suona come me. Aggiungo un numero reale, un gesto fisico, un errore preciso.

Il `dataset.jsonl` non è solo output. È training data per la prossima versione. Ogni episodio che approvo diventa un campione di voce. Il sistema impara cosa significa suonare come Matteo Benenati.

---

## Connessione al Sistema

Tutto si innesta.

**V32**: il blocker attivo — mandrino mancante — mi ha forzato a stare al laptop. Non è tempo perso. È tempo riallocato. `STATE.json` lo registra: `"blocker_v32": "mandrino ER20 — ordine pendente"`, `"task_switched": "content_engine_v2"`. L'ADHD vuole saltare. Il sistema tiene traccia di dove ero quando ho saltato.

**TITANIUM_OS**: il Content Engine gira dentro l'OS. Stessa architettura React+Python del pannello macchina. L'endpoint `/api/content/generate` è lo stesso pattern dell'endpoint `/api/machine/status`. Non ho scritto due sistemi — ho scritto un sistema con due facce.

**MIMS**: ogni episodio che spiega MIMS è anche documentazione. Il connettore fisico modulare è difficile da spiegare senza mostrarlo. Il podcast è il modo in cui lo mostro a chi non può essere in officina. 22 episodi = 22 angolazioni dello stesso oggetto.

**VULCAN**: episodio 14 parla della pressa 20t e delle ricette polimeri. Il `revision_flag` su quell'episodio dice `"check_numbers"` — devo rileggere le pressioni di iniezione prima di pubblicare. Non invento dati. Mai.

---

## Chiusura

Il sistema scrive il sistema, e io smetto di aspettare l'umore giusto.

## FATTI (per il RAG)

- **FATTO:** Il Content Engine v2 è configurato per produrre 22 episodi al mese con un singolo comando (`python engine.py --episodes 22 --pass dual --output dataset.jsonl`), con output in formato `dataset.jsonl` (22 righe, una per episodio).

- **DECISIONE:** Architettura dual-pass: modello haiku per il draft veloce (~4 secondi), modello sonnet per il secondo passaggio di struttura e coerenza. **LOGICA:** Separare generazione e revisione per non dipendere dalla disponibilità cognitiva (ADHD); il terzo passaggio umano è stimato in 10 minuti, non un'ora.

- **FATTO:** Ogni riga del `dataset.jsonl` contiene i campi `topic`, `voice_score`, `revision_flag`. Il file funge anche da training data per versioni future del sistema (campioni di voce approvati).

- **DECISIONE:** Il Content Engine gira dentro TITANIUM_OS con la stessa architettura React+Python del pannello macchina; l'endpoint `/api/content/generate` replica il pattern di `/api/machine/status`. **LOGICA:** Un solo sistema con due facce, non due sistemi separati.

- **FATTO:** Il blocco della V32 (mandrino ER20 2.2kW non arrivato) viene registrato in `STATE.json` con i campi `"blocker_v32"` e `"task_switched"`, consentendo il riallocamento del task in corso senza perdere il contesto.
