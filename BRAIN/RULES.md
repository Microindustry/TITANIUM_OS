<!-- TOC -->

- [LE 12 REGOLE DELLECOSISTEMA](#le-12-regole-dellecosistema)
  - [1. Niente è finito  ogni cosa è una versione.](#1-niente-è-finito-ogni-cosa-è-una-versione)
  - [2. Identifica  Automatizza  Scala.](#2-identifica-automatizza-scala)
  - [3. Cattura mentre costruisci  non ricordare, documenta.](#3-cattura-mentre-costruisci-non-ricordare-documenta)
  - [4. Leva cognitiva: 1 input  N output.](#4-leva-cognitiva-1-input-n-output)
  - [5. Costruisci ciò che usi  meta-ricorsività.](#5-costruisci-ciò-che-usi-meta-ricorsività)
  - [6. Output misurabile prima di tutto.](#6-output-misurabile-prima-di-tutto)
  - [7. Tutto si connette  nessun silo.](#7-tutto-si-connette-nessun-silo)
  - [8. Proteggi il sapere.](#8-proteggi-il-sapere)
  - [9. Reinvesti il margine  60 anno 1.](#9-reinvesti-il-margine-60-anno-1)
  - [10. Libertà sopra profitto.](#10-libertà-sopra-profitto)
  - [11. Il sistema PROPONE, lumano APPROVA.](#11-il-sistema-propone-lumano-approva)
  - [12. Insegna ciò che impari.](#12-insegna-ciò-che-impari)
  - [REGOLE SISTEMA  PDF_TO_MEMORY](#regole-sistema-pdftomemory)
    - [Gerarchia output](#gerarchia-output)
    - [Regole versioning](#regole-versioning)
    - [Regole classificazione ATTO](#regole-classificazione-atto)
    - [Flusso drag  drop](#flusso-drag-drop)
    - [Come avviare](#come-avviare)

<!-- /TOC -->

<!-- REGOLE:start (derivato da CLAUDE.md — non editare a mano) -->

# LE 12 REGOLE DELL'ECOSISTEMA
*Vincoli operativi — ogni decisione viene filtrata qui.*

> ⚠ **File DERIVATO.** La fonte unica è `CLAUDE.md` §LE REGOLE.
> Si rigenera con `python AUTOMATIONS/tools/sync_regole.py`. Non editare a mano:
> la prossima esecuzione sovrascrive. Per cambiare una regola, si cambia CLAUDE.md.

---

## 1. Niente è finito — ogni cosa è una versione.
Non aspettare la perfezione. Una versione funzionante oggi > una versione perfetta mai.

## 2. Identifica → Automatizza → Scala.
Se lo fai 3 volte: script. Se lo fai ogni giorno: nodo. Se il nodo produce valore: scala.

## 3. Cattura mentre costruisci — non ricordare, documenta.
Ogni decisione tecnica in `MENTE/`. Ogni sessione Claude in `MENTE/SESSIONI/`. Il RAG la recupera domani.

## 4. Leva cognitiva: 1 input → N output.
Un milestone → episodio + reel + LinkedIn + RAG update. Ogni azione deve produrre più artefatti.

## 5. Costruisci ciò che usi — meta-ricorsività.
TITANIUM_OS gestisce la costruzione di TITANIUM_OS. Il sistema si autoalimenta.

## 6. Output misurabile prima di tutto.
Se non posso misurarlo (mm, ore, euro, chunk RAG, commit), non esiste.

## 7. Tutto si connette — nessun silo.
V32 → episodio → dataset LLM → RAG → Claude più informato su V32. Il loop è intenzionale.

## 8. Proteggi il sapere.
`_VAULT/` per i segreti. RAG per la conoscenza. Git per il codice. Backup AES-256 per tutto.

## 9. Reinvesti il margine — 60% anno 1.
BEP V32 = 61 ore. Ogni ora sopra il BEP è reinvestita in strumenti, formazione, scala.

## 10. Libertà sopra profitto.
Il capannone entro 2030 non è un obiettivo lavorativo — è un obiettivo di sovranità.

## 11. Il sistema PROPONE, l'umano APPROVA.
Nessun agente modifica codice, chiavi o canone da solo: scrive una proposta, decide Matteo.
*Era già legge nel codice* (`SELF_IMPROVE` propose-only, `STATE.self_improve.human_approval_required`,
gate `[approvazione]`) ma era stata tolta dal testo il 20/06: una regola che comanda il
sistema e non è scritta nella lista delle regole. Rimessa il 16/08 (#70).
**Eccezione a canone:** la corsia Nina è AUTO — genera e auto-promuove da sola (#44).

## 12. Insegna ciò che impari.
Spiegare forza la chiarezza (effetto Feynman): se non sai raccontarlo, non l'hai capito.
Ogni concetto tecnico diventa un episodio, un carosello, un post.
*Recuperata da `BRAIN/RULES.md` il 16/08 (#70): era l'unica regola che viveva solo lì.
È il principio su cui poggia tutto il binario Nina.*

---
*Target: 15 Luglio 2030 — Matteo Benenati, 35 anni: LIBERO.*
<!-- derivato il 2026-08-16 da CLAUDE.md -->
<!-- REGOLE:end -->
---

## REGOLE SISTEMA — PDF_TO_MEMORY

### Gerarchia output
| Tipo documento | Destinazione | Criterio |
|---|---|---|
| ATTO | `BRAIN/ASSOLUTO/` | ≥2 keyword legali/burocratiche |
| INFO | `BRAIN/KNOWLEDGE/` | Tutto il resto |

### Regole versioning
- Ogni documento ha una versione corrente e uno storico completo in `DATA/pdf_versions.json`
- Il documento è sempre "in corso" — non esistono versioni definitive
- Una nuova versione NON cancella la precedente: PDF originale → `PDF_DROP/_PROCESSED/`
- Il `.md` corrente è sempre quello con numero versione più alto

### Regole classificazione ATTO
Parole chiave che triggherano classificazione ATTO (soglia: 2 hits):
`delibera, decreto, atto n., contratto, verbale, certificato, fattura, ricevuta,
autorizzazione, ordinanza, circolare, normativa, regolamento, art., comma, legge n.,
d.lgs, d.p.r., allegato, sentenza, provvedimento, dichiarazione, omologazione, collaudo`

### Flusso drag & drop
```
PDF_DROP/               ← trascina qui
  _PROCESSED/           ← PDF archiviati post-elaborazione (con versione nel nome)
  _ERRORS/              ← PDF falliti (es: solo immagini scansionate)
BRAIN/KNOWLEDGE/        ← output INFO (.md)
BRAIN/ASSOLUTO/         ← output ATTI (.md)
DATA/pdf_versions.json  ← database versioni
```

### Come avviare
```bash
# Processa tutto ciò che è in PDF_DROP ora
python AUTOMATIONS/core/pdf_to_memory.py

# Modalità watch (gira sempre in background)
python AUTOMATIONS/core/pdf_to_memory.py --watch
```
