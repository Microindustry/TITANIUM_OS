---
name: salva
description: Chiusura sessione TITANIUM_OS — "salva tutto". Aggiorna la bussola (DA_FARE_FATTO.md) + mirror Desktop, STATE.json, RIAVVIO_SESSIONE.txt; verifica storie e build; commit + push. Usa quando Matteo dice "salva" (di solito apre una nuova sessione subito dopo).
argument-hint: [opzionale: nota di chiusura]
allowed-tools: Read, Edit, Write, Bash
disable-model-invocation: false
---
<!-- TOC -->

- [SALVA  chiusura sessione TITANIUM_OS](#salva-chiusura-sessione-titaniumos)
  - [1. Bussola (la rotta condivisa)  DA_FARE_FATTO.md](#1-bussola-la-rotta-condivisa-dafarefattomd)
  - [2. Stato  BRAIN/STATE.json](#2-stato-brainstatejson)
  - [3. Ripresa  RIAVVIO_SESSIONE.txt](#3-ripresa-riavviosessionetxt)
  - [4. Verifiche (niente teatro: numeri reali)](#4-verifiche-niente-teatro-numeri-reali)
  - [5. GitHub  commit  push](#5-github-commit-push)
  - [6. Conferma a Matteo](#6-conferma-a-matteo)

<!-- /TOC -->


# SALVA — chiusura sessione TITANIUM_OS

Quando Matteo dice **"salva"** sta per aprire una nuova sessione: tutto ciò che
serve per riprendere senza perdere nulla DEVE essere su disco, committato e pushato.
Esegui i passi in ordine. Nota di chiusura (se data): $ARGUMENTS

## 1. Bussola (la rotta condivisa) — `DA_FARE_FATTO.md`
- Sposta in `[✓] FATTO` ciò che è stato completato in sessione (NON cancellare le
  righe vecchie: cambia solo lo stato `[✓]/[◐]/[ ]/[✗]/[💡]`).
- Aggiungi i nuovi `[ ] DA FARE` emersi.
- **Riordina** i DA FARE per priorità: in cima il primo punto da cui ripartire.
- Allinea il mirror Desktop `da fare e cosa ho fatto.txt` (stesso contenuto del
  blocco DA FARE/FATTO).

## 2. Stato — `BRAIN/STATE.json`
- `active_milestone` = cosa si è chiuso in sessione · `last_action` · `next_step`
  = il primo punto della bussola.
- Aggiungi 1 riga a `milestones.verified` per ogni pezzo verificato (build verde).
- Valida il JSON (`python -c "import json;json.load(open('BRAIN/STATE.json',encoding='utf-8'))"`).

## 3. Ripresa — `RIAVVIO_SESSIONE.txt`
- Rigenera: dove siamo (<10 sec), fatto in sessione (commit), prossimo lavoro,
  blockers, ultimi commit.

## 4. Verifiche (niente teatro: numeri reali)
```bash
python CONTENT_ENGINE/scripts/audit_episodes.py        # 0 orfani atteso
python CONTENT_ENGINE/scripts/build_episodes_json.py   # importa eventuali nuovi .md
cd DASHBOARD && npx tsc -b                              # build deve essere verde
```
- Refresh bussola per la dashboard: `python NODES/AUDIT_AGENT/night_audit.py --bussola-only`

## 4b. Memoria + grafo (durata oltre la sessione)
- **Memorie**: se sono emersi fatti durevoli (decisioni, preferenze di Matteo, stato
  progetti non deducibile dal codice), aggiorna `.claude/.../memory/` + 1 riga in `MEMORY.md`.
  Non duplicare ciò che è già nel repo/git.
- **Grafo Graphify** (se installato): rinfresca il grafo del codice — veloce, locale, no LLM:
  `graphify update .` (output `graphify-out/`, gitignored). Tiene il "Wiki" allineato al repo.

## 5. GitHub — commit + push
```bash
git add -A
git commit -m "chore(salva): chiusura sessione — <riassunto>"
git push origin main          # se il push è bloccato: lo farà TI_NightPush
git rev-list --count origin/main..main   # deve dire 0 (tutto pushato)
```

## 6. Conferma a Matteo
Una riga: "Salvato. Prossima sessione si riparte da: <primo punto bussola>."

> Regola d'oro: non si perde nulla. Se qualcosa non si è potuto salvare (es. push
> bloccato), DILLO esplicitamente e indica chi lo recupererà (es. TI_NightPush).
