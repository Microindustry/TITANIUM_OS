---
name: salva
description: Chiusura sessione TITANIUM_OS — "salva tutto". Aggiorna la bussola (DA_FARE.md) e la taglia, STATE.json (una riga), session_context + RIAVVIO_SESSIONE.txt; verifica storie e build; commit + push. Usa quando Matteo dice "salva" (di solito apre una nuova sessione subito dopo).
argument-hint: [opzionale: nota di chiusura]
allowed-tools: Read, Edit, Write, Bash
disable-model-invocation: false
---
<!-- TOC -->

- [SALVA  chiusura sessione TITANIUM_OS](#salva-chiusura-sessione-titaniumos)
  - [1. Bussola (la rotta condivisa)  DA_FARE.md](#1-bussola-la-rotta-condivisa-dafaremd)
  - [2. Taglio  una sessione di ritardo](#2-taglio-una-sessione-di-ritardo)
  - [3. Stato  BRAIN/STATE.json](#3-stato-brainstatejson)
  - [4. Ripresa  session_context  RIAVVIO_SESSIONE.txt](#4-ripresa-sessioncontext-riavviosessionetxt)
  - [5. Verifiche (niente teatro: numeri reali)](#5-verifiche-niente-teatro-numeri-reali)
  - [5b. Memoria  grafo (durata oltre la sessione)](#5b-memoria-grafo-durata-oltre-la-sessione)
  - [6. GitHub  commit  push](#6-github-commit-push)
  - [7. Conferma a Matteo](#7-conferma-a-matteo)

<!-- /TOC -->


# SALVA — chiusura sessione TITANIUM_OS

Quando Matteo dice **"salva"** sta per aprire una nuova sessione: tutto ciò che
serve per riprendere senza perdere nulla DEVE essere su disco, committato e pushato.
Esegui i passi in ordine. Nota di chiusura (se data): $ARGUMENTS

`N` = il numero di QUESTA sessione = il blocco `## Sessione #N` più in alto in `DA_FARE.md`.
**Non** `STATE.session_count`: quello conta le scritture di STATE.json, non le sessioni (E1).

## 1. Bussola (la rotta condivisa) — `DA_FARE.md`
- Nel blocco `## Sessione #N`: cambia lo stato di ciò che si è chiuso (`[✓]/[◐]/[ ]/[✗]/[💡]`),
  **non cancellare** righe. Se una cosa salta: `[✗]` + il motivo.
- Aggiungi i nuovi `[ ]` emersi. Ciò che può fare **solo Matteo** va in `## ⏳ ASPETTA MATTEO`
  (in testa alla bussola), non sparso nei blocchi.
- Se hai chiuso un punto della **SCALETTA**, scrivilo lì (`--- FATTO gg/mm`).
- Lo specchio Desktop `da fare.txt` **non si tocca**: lo riscrive l'hook Stop.

## 2. Taglio — una sessione di ritardo
```bash
python AUTOMATIONS/core/bussola_taglio.py --chiusa N            # prova: dice cosa sposterebbe
python AUTOMATIONS/core/bussola_taglio.py --chiusa N --applica  # le righe chiuse delle sessioni < N -> ABBIAMO_FATTO.md
```
Il blocco di N resta in bussola (memoria corta). Lo stesso taglio lo rifà da solo il
night_audit ogni notte: qui serve a chiudere pulito.

## 3. Stato — `BRAIN/STATE.json`
- `active_milestone` = **UNA riga, max ~120 caratteri**: cosa si è chiuso in sessione.
  Finisce sul profilo GitHub pubblico: il racconto lungo sta nella bussola, non qui.
- `next_step` = **una riga**: il primo punto aperto della SCALETTA. `last_action` = una riga.
- Aggiungi 1 riga a `milestones.verified` per ogni pezzo verificato (build verde).
- Valida il JSON (`python -c "import json;json.load(open('BRAIN/STATE.json',encoding='utf-8'))"`).

## 4. Ripresa — `session_context` + `RIAVVIO_SESSIONE.txt`
Il server MCP `titanium-os` non è collegato alle sessioni: `DATA/session_context.json` si
scrive da qui, altrimenti l'handoff dice (giustamente) "contesto fermo al ...".
```bash
python - <<'EOF'
import json, datetime
ctx = {
  "session_number": "N",
  "session_date": datetime.date.today().isoformat(),
  "last_updated": datetime.date.today().isoformat(),
  "last_discussed": "<3-5 righe: cosa si e' fatto e perche'>",
  "active_topics": ["<topic 1>", "<topic 2>"],
  "decisions_made": ["<decisione presa, da chi>"],
  "open_threads": ["<cosa resta aperto>"],
  "next_action": "<il primo punto della bussola>",
}
json.dump(ctx, open("DATA/session_context.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
EOF
python generate_restart_prompt.py
```

## 5. Verifiche (niente teatro: numeri reali)
```bash
python CONTENT_ENGINE/scripts/audit_episodes.py        # 0 orfani atteso
python CONTENT_ENGINE/scripts/build_episodes_json.py   # importa eventuali nuovi .md
cd DASHBOARD && npx tsc -b 2>&1 | grep "error TS"      # vuoto = verde (tsc -b va in OOM: conta solo "error TS")
python NODES/AUDIT_AGENT/night_audit.py --bussola-only # refresh bussola per la dashboard
```

## 5b. Memoria + grafo (durata oltre la sessione)
- **Memorie**: se sono emersi fatti durevoli (decisioni, preferenze di Matteo, stato
  progetti non deducibile dal codice), aggiorna `.claude/.../memory/` + 1 riga in `MEMORY.md`.
  Non duplicare ciò che è già nel repo/git.
- **Grafo Graphify** (se installato): `graphify update .` (output `graphify-out/`, gitignored).
  Gli archivi restano fuori: `.graphifyignore` lo genera `sync_dashboard.py` da `fuori_lettura.py`.

## 6. GitHub — commit + push
Il repo è **PUBBLICO**: quello che va su main esce online (stanotte lo fa comunque TI_NightPush).
```bash
git add -A
git commit -m "chore(salva): chiusura sessione #N — <riassunto>"
git push origin main          # se il push è bloccato: lo farà TI_NightPush
git rev-list --count origin/main..main   # deve dire 0 (tutto pushato)
```

## 7. Conferma a Matteo
Una riga: "Salvato. Prossima sessione si riparte da: <primo punto bussola>."

> Regola d'oro: non si perde nulla. Se qualcosa non si è potuto salvare (es. push
> bloccato), DILLO esplicitamente e indica chi lo recupererà (es. TI_NightPush).
