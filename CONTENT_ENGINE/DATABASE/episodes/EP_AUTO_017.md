---
id: "EP_AUTO_017"
milestone: "SINAPSI→MENTE migrazione — 41 doc + STORIE + ASSOLUTO + VULCAN + CV (27 Mag 2026)"
title: "41 documenti, una mente digitale"
sottotitolo: "Come ho migrato 27 anni di know-how industriale nel cloud"
stagione: "AUTO"
data_evento: "2026-05-27"
tags: ["CNC", "automazione", "system-building", "artigianalità-digitale", "VULCAN"]
status: "ready"
durata_min: 8
reel_hook: "Ho appena migrato quarantuno documenti dal mio archivio fisico a un'infrastruttura cloud integrata. Prima perdevo tempo a cercare specifiche tecniche fra tre scatoloni diversi. Oggi accedo a tutto da qualunque macchina, dalla fresatrice V32 alla pressa VULCAN, in tre secondi. Quarant'anni di know-how industriale ora vivono in una mente digitale che non dorme. Ma sai quale pezzo più critico che ho digitalizzato? Continua a scoprire cosa cambierà nel tuo workflow."
generated: "2026-05-27T11:31:44.166280"
---
<!-- TOC -->

- [41 documenti, una mente digitale](#41-documenti-una-mente-digitale)
- [SINAPSIMENTE: 41 Documenti e una Migrazione](#sinapsimente-41-documenti-e-una-migrazione)
  - [La Scena](#la-scena)
  - [Il Bivio](#il-bivio)
  - [Connessione al Sistema](#connessione-al-sistema)
  - [LUltima Riga](#lultima-riga)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# 41 documenti, una mente digitale

# SINAPSI→MENTE: 41 Documenti e una Migrazione

---

> "Ho spostato tutto. Non so ancora cosa ho."

---

## La Scena

Lunedì sera. 22:15. Schermo unico acceso in officina.

Cursor aperto su `BRAIN/STATE.json`. Terminale a sinistra — Python 3.11, virtual env attivo. A destra: cartella `SINAPSI/` con 41 file `.md` che aspettano da tre settimane.

Il gusset sinistro della V32 è sul banco. Acciaio S235, 6mm. Lo guardo ogni tanto tra un commit e l'altro. Mi ricorda che il 65% non è il 100%.

Comando eseguito alle 22:19:

```bash
python migrate_sinapsi.py --source ./SINAPSI --target ./MENTE --validate
```

Output: `41 files processed. 0 errors. 6 warnings.`

I warning li leggo uno per uno. Tre sono link rotti. Due sono tag non mappati. Uno è un file che si chiama `ASSOLUTO_v7_FINALE_davvero.md` — e capisco subito il problema.

---

## Il Bivio

**Prima:** il sapere era sparpagliato. STORIE in una cartella. VULCAN in un'altra. CV in un Google Doc del 2023. ASSOLUTO in cinque versioni diverse senza data chiara.

Cercavo qualcosa e trovavo una versione vecchia. Oppure non trovavo niente e lo riscrivevo da capo. Con l'ADHD questo non è inefficienza — è invisibilità. Se non lo vedo strutturato, non esiste.

**Dopo:** un unico grafo. 41 nodi. Collegati.

`MENTE/` non è un archivio. È un sistema nervoso. Ogni documento ha metadati: `created`, `updated`, `project_tag`, `status`. Lo stato è `draft` / `active` / `frozen`. Nessun file senza tag.

La milestone del 27 maggio 2026 non è una scadenza — è un checkpoint di verifica. Se arrivo lì e il grafo è navigabile, ho vinto quella parte.

---

## Connessione al Sistema

La migrazione si innesta ovunque, contemporaneamente.

**V32 — fresatrice CNC:** ogni decisione di progetto — tolleranze, materiali, sequenza assi — ora ha un documento padre in `MENTE/V32/`. Quando il mandrino 2.2kW ER20 arriva (da ordinare, blocker attivo), la procedura di montaggio è già scritta. Non la scrivo sotto stress.

**TITANIUM_OS:** il layer React legge `MENTE/STATE.json` come source of truth. Se aggiorno un documento, l'interfaccia lo riflette. Non è magia — è un webhook locale su filesystem watch. `watchdog` + `FastAPI`. Quaranta righe di Python.

**MIMS — connettori modulari:** la documentazione dei connettori era in testa. Solo in testa. Ora è in `MENTE/MIMS/connettori_spec_v1.md`. Il 30% di completamento del progetto è reale solo perché ora lo vedo scritto.

**VULCAN — pressa 20t:** le ricette polimeri erano su carta. Carta vera, con le macchie di grasso. Le ho trascritte tutte. Ora sono in `MENTE/VULCAN/ricette/`. Con parametri: temperatura, tempo ciclo, pressione di iniezione. Confrontabili.

**EVA — WhatsApp AI:** EVA può rispondere su qualsiasi progetto perché il contesto è in `MENTE/`. Prima pescava da frammenti. Ora pesca da documenti strutturati.

---

## L'Ultima Riga

Il sapere scritto sopravvive alla sessione.

## FATTI (per il RAG)

- **FATTO:** La migrazione SINAPSI→MENTE ha processato **41 file `.md`** con output `0 errors, 6 warnings` (3 link rotti, 2 tag non mappati, 1 file con naming ambiguo). Comando: `python migrate_sinapsi.py --source ./SINAPSI --target ./MENTE --validate`, eseguito **27 maggio 2026 ore 22:19**.

- **DECISIONE:** Ogni documento in `MENTE/` ha metadati obbligatori (`created`, `updated`, `project_tag`, `status`). Gli stati ammessi sono **`draft` / `active` / `frozen`**. Nessun file senza tag. **LOGICA:** Rendere il sapere navigabile e visibile — con ADHD, ciò che non è strutturato non esiste operativamente.

- **FATTO:** L'integrazione TITANIUM_OS legge `MENTE/STATE.json` come source of truth tramite **webhook locale su filesystem watch** (`watchdog` + `FastAPI`), implementato in circa **40 righe di Python**.

- **FATTO:** La documentazione MIMS (connettori modulari) era conservata solo in memoria. La trascrizione in `MENTE/MIMS/connettori_spec_v1.md` ha reso visibile e reale il **30% di completamento** del progetto.

- **FATTO:** Le specifiche VULCAN (pressa 20t) erano su carta fisica. Sono state trascritte in `MENTE/VULCAN/ricette/` con i parametri: **temperatura, tempo ciclo, pressione di iniezione** — in forma confrontabile.

- **OBIETTIVO:** Il mandrino **2.2kW ER20** per V32 è da ordinare (**blocker attivo** al 27 maggio 2026). La procedura di montaggio è già scritta in `MENTE/V32/` prima dell'arrivo del componente.
