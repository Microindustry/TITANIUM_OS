---
id: "EP_AUTO_019"
milestone: "ASSOLUTO V7 — documento master unico, 10 ATTI unificati, aggiornato maggio 2026 (27 Mag 2026)"
title: "Dieci atti, un documento master"
sottotitolo: "Come Matteo ha unificato 65% della produzione CNC"
stagione: "AUTO"
data_evento: "2026-05-27"
tags: ["CNC", "system_building", "manufacturing", "automazione", "artigianato_industriale"]
status: "ready"
durata_min: 8
reel_hook: "Avevo dieci flussi di lavoro paralleli sulla fresatrice V32, ognuno con la sua documentazione, i suoi errori. Perdevo tre ore a settimana solo a sincronizzare le versioni. A maggio ho fatto una cosa: ho unificato tutto in ASSOLUTO V7, dieci atti in un documento unico. Dal giorno dopo, zero conflitti, zero rielaborazioni. Vuoi sapere il sistema che ho usato per non fare tornare indietro nemmeno un pezzo?"
generated: "2026-05-27T14:55:16.054586"
---
<!-- TOC -->

- [Dieci atti, un documento master](#dieci-atti-un-documento-master)
- [ASSOLUTO V7  Episodio Podcast](#assoluto-v7-episodio-podcast)
  - [La Scena](#la-scena)
  - [Il Bivio](#il-bivio)
  - [Connessione al Sistema](#connessione-al-sistema)
  - [Il Numero che Conta](#il-numero-che-conta)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Dieci atti, un documento master

# ASSOLUTO V7 — Episodio Podcast

---

> "Finalmente un documento che non mi tradisce quando sparisco tre giorni."

---

## La Scena

Officina, 27 maggio 2026, ore 22:15.

La V32 è ferma — manca ancora il mandrino 2.2kW ER20, ordine in sospeso.
Io sono al banco, non alla macchina.
Schermo aperto. BRAIN/STATE.json visibile nel terminale sinistro. Notion a destra.

Gesto preciso: copio l'ultimo blocco di ATTO VI, lo incollo nel master, sistemo l'indentazione YAML a mano.
Dita che si muovono piano. Non è codice. È architettura cognitiva.

Il file si chiama `ASSOLUTO_V7_MASTER.md`. 178 righe quando parto. 340 quando smetto.

---

## Il Bivio

**Prima di V7:**

Sei documenti separati. `V32_build_log.md`, `MIMS_notes.txt`, `VULCAN_ricette_v3.md`, tre chat Telegram con me stesso alle 3 di notte.
Il problema era semplice e brutale: rientro in officina dopo due giorni di cantiere, apro il laptop, e non so da dove ricominciare.
ADHD non perdona i gap. Se il contesto non è scritto, il contesto non esiste.

Ho perso una sessione intera a ricostruire dove avevo lasciato la gusset sinistra — Config G, spessore 6mm S235, fori M8 passo 1.25 ancora da maschiare.
Un'ora. Buttata.

**Dopo V7:**

Un file. Dieci ATTI. Struttura fissa.
Apro, leggo ATTO I — stato attuale. Trenta secondi. Sono dentro.

La citazione che mi sono scritto in cima al documento, quella di quella sera:
*"Il sistema funziona solo se non ti chiede di ricordare."*

---

## Connessione al Sistema

V7 non è documentazione. È scaffolding.

**V32 — 65% completamento:**
ATTO III contiene la sequenza esatta Config G. Gusset sinistra, gusset destra, traversa superiore. Ogni pezzo con materiale, quota critica, operazione pendente. Il blocker è lì, scritto nero su bianco: *mandrino 2.2kW ER20 — da ordinare — ETA sconosciuto*. Quando arriva, non devo pensare. Leggo, taglio.

**TITANIUM_OS:**
Il layer software sta sopra la macchina, ma si nutre di V7. Le automazioni AI leggono STATE.json. STATE.json si aggiorna da V7. È un ciclo chiuso. Se V7 è pulito, TITANIUM_OS ha contesto reale — non dati inventati dall'AI per sembrare utile.

**MIMS — 30% completamento:**
I connettori fisici modulari hanno un loro ATTO dedicato. Geometrie, tolleranze di accoppiamento, materiali testati. Il problema con MIMS era che ogni versione del connettore viveva in un posto diverso. Ora no. ATTO VII, sezione 2. Sempre lì.

**VULCAN:**
Le ricette polimeri sono in ATTO VIII. Temperatura stampo, pressione iniezione, tempi ciclo. Dati reali — non teorici. Ogni riga viene da una prova fisica con la pressa 20 tonnellate. V7 le contiene tutte, con data e risultato.

**EVA — WhatsApp AI per Maria:**
ATTO X. Prompt di sistema, log conversazioni critiche, prossimi sviluppi. Maria non sa che c'è un documento. Ma ogni risposta di EVA è più precisa perché il contesto è scritto da qualche parte.

---

## Il Numero che Conta

65% V32. 30% MIMS. Mandrino mancante.

Non è un ritardo — è uno stato. V7 lo sa. Quando rientro in officina domani mattina, lo so anch'io.

---

*Il documento non risolve i problemi. Li rende visibili.*

## FATTI (per il RAG)

- **FATTO:** Il documento master `ASSOLUTO_V7_MASTER.md` è cresciuto da 178 righe a 340 righe nella sessione del 27 maggio 2026, unificando 10 ATTI in un singolo file strutturato. **LOGICA:** Sostituisce 6 documenti separati (tra cui `V32_build_log.md`, `MIMS_notes.txt`, `VULCAN_ricette_v3.md`) per eliminare perdita di contesto tra sessioni di lavoro.

- **FATTO:** Il progetto V32 (CNC epoxy-granite) risulta al 65% di completamento al 27 maggio 2026. **LOGICA:** Il blocker identificato è il mandrino 2.2kW ER20 (ordine in sospeso, ETA sconosciuto); la prossima operazione documentata riguarda la gusset sinistra, Config G, spessore 6mm S235, fori M8 passo 1.25 da maschiare.

- **FATTO:** Il progetto MIMS (connettori modulari) risulta al 30% di completamento. **LOGICA:** La documentazione di geometrie, tolleranze di accoppiamento e materiali testati è centralizzata in ATTO VII, sezione 2 di ASSOLUTO V7.

- **DECISIONE:** STATE.json si aggiorna da V7 e viene letto dalle automazioni AI di TITANIUM_OS. **LOGICA:** Il ciclo chiuso V7 → STATE.json → AI garantisce che il layer software operi su contesto reale anziché su dati generati dall'AI.

- **FATTO:** Le ricette polimeri VULCAN (temperatura stampo, pressione iniezione, tempi ciclo) sono archiviate in ATTO VIII di V7, provenienti da prove fisiche con pressa da 20 tonnellate, ciascuna con data e risultato. **LOGICA:** I dati sono empirici, non teorici.
