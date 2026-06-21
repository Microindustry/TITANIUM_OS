<!-- TOC -->

- [Inventario  cosa abbiamo costruito (notte per notte)](#inventario-cosa-abbiamo-costruito-notte-per-notte)
  - [2026-06-20  3 commit](#2026-06-20-3-commit)
  - [2026-06-20  5 commit](#2026-06-20-5-commit)
  - [2026-06-18  7 commit](#2026-06-18-7-commit)
  - [2026-06-17  14 commit](#2026-06-17-14-commit)
  - [2026-06-16  9 commit](#2026-06-16-9-commit)
  - [2026-06-15  12 commit](#2026-06-15-12-commit)

<!-- /TOC -->

# Inventario — cosa abbiamo costruito (notte per notte)

> Generato da `AUTOMATIONS/core/inventario_notturno.py` a ogni catena notturna.
> Ogni blocco = i commit di quel giro (il più recente in alto). I commit sono il fatto reale.

<!-- INVENTARIO:INSERT -->

## 2026-06-21 · 9 commit
- `15144de4` auto: night_audit - cartella clinica 21/06/2026
- `eca4bb17` auto: story_agent - episodi generati 21/06/2026
- `b71c8761` feat(ecosistema): ponti cross-mondo episodio<->sapere + RAG efficiente + manutenzione robusta
- `e3694655` chore(CLAUDE.md): elimina la regola 11 (su richiesta esplicita di Matteo)
- `51d8ee2a` docs(bussola): sessione #39 — ecosistema vault (vault_intersect v2, storie/pietre) + fix night_audit + riordino
- `3a41d06f` feat(vault_intersect): v2 legami sul contenuto (TF-IDF corpo) + rete storie/pietre rigenerata
- `decc485e` docs(bussola): punto 7 fatto — riordino _DA_ORDINARE + Obsidian Mari/VULCAN/MIMS (commit MENTE 604b5d2)
- `01c3cffc` fix(night_audit): parse LLM difensivo — chiude il guasto ricorrente "Unterminated string"
- `bc4a4d59` chore(salva): chiusura sessione — blockers ripuliti (pitch/pilastri risolti), next_step + focus allineati per il nuovo avvio

_episodi: 187 · critiche aperte: 23 (58 risolte) · RAG: 29113 chunk_



## 2026-06-20 · 3 commit
- `089af488` auto: story_agent - episodi generati 20/06/2026
- `67c17039` auto: story_agent - episodi generati 20/06/2026
- `e9a495a0` auto: night_audit - cartella clinica 20/06/2026

_episodi: 186 · critiche aperte: 13 (56 risolte) · RAG: 3873 chunk_



## 2026-06-20 · 5 commit
- `d3e671a9` chore(save): bussola #38 + STATE allineati ai fix (pitch/pilastri/calendario fatti)
- `a3bfe418` feat(dashboard): vista CALENDARIO — diario di bordo giorno per giorno
- `ffea8129` feat(pilastri): reintegra la room ricca sotto la spiegazione + animazioni motion
- `43e74471` fix(dashboard): pitch ora VISIBILI + denylist segreti su /api/file
- `b2f42331` chore(save/#38): bussola + STATE sincronizzati col debito reale + fix orienter cp1252

_episodi: 183 · critiche aperte: 14 (55 risolte) · RAG: 3873 chunk_



## 2026-06-18 · 7 commit
- `f0a99e9e` auto: night_audit - cartella clinica 18/06/2026
- `9bd62c45` auto: story_agent - episodi generati 18/06/2026
- `4438027b` feat(pilastri/#2): i pilastri come SPIEGAZIONE a livelli (non pitch)
- `38160198` polish(mappa-gioco): layout pieno + micro-interazioni leggere (ingresso a cascata + hover)
- `385b283d` critiche(att06): RISOLTO — UI verificata a vista nel dev server (zero errori)
- `fb3eff12` critiche(attacco-opus 17/06): red-team su tutti i fronti, segnato + risolto possibile
- `093884d9` cleanup(dashboard): accantona RAG-chat + AGENTI · EVA pending -> reale

_episodi: 183 · critiche aperte: 14 (55 risolte) · RAG: 3873 chunk_



## 2026-06-17 · 14 commit
- `29d26886` auto: night_audit - cartella clinica 17/06/2026
- `0e318183` auto: story_agent - episodi generati 17/06/2026
- `a0e84bce` feat(pitch): un pitch per progetto (la spiegazione vera, non i pilastri obsoleti)
- `ffd90598` content(origini): capitolizzo MIMS/VULCAN — la pelle + il Cavallo di Troia
- `efd00cee` content(origini): 2 episodi-origine dai manifesti NotebookLM (il passato del progetto)
- `de0ac6d1` auto: story_agent - episodi generati 17/06/2026
- `943d1cc7` feat(dashboard): CV di Nina come vista separata + Mappa-Gioco 2D annidata
- `80cb0e28` feat(cv): il CV di Nina — skill-tree gemello della Mappa, si riempie dagli episodi
- `16614567` feat(cv): profilo UNITO — competenze professionali + personali per dominio
- `a9e49caf` integra(nina/2a-passata): layer-gioco Real Life RPG + lente 3 Leggi
- `bda4a4f2` integra(nina+pitch): innesti NotebookLM nel canone + Asimmetria di Valore nel pitch
- `a7e2181a` docs(nina): review Storie/Nina vs notebook (Genius Loci) — build-on, non ripartire
- `112f064e` feat(notebooklm): capture script — notebook NotebookLM -> MENTE/_DA_ORDINARE
- `4c9ea0dd` chore(git): smetti di tracciare semantic_index.db + artefatti runtime (churn)

_episodi: 181 · critiche aperte: 20 (49 risolte) · RAG: 3873 chunk_



## 2026-06-16 · 9 commit
- `7fea5af0` auto: night_audit - cartella clinica 16/06/2026
- `a3d33de8` auto: story_agent - episodi generati 16/06/2026
- `6147d392` feat(dashboard/#4): vista CV vera (non solo il rename)
- `7adf940e` fix(dashboard/#1): MAPPA NINA dentro la grafica radiale dell'architettura (no doppione)
- `f80f26a5` docs(pitch/#5): 1-pager Nina dedicato + link dal pitch principale
- `bf60c1ba` feat(dashboard/#2): vista Automazioni aggiornata alle automazioni reali 15/06
- `991b9f68` feat(dashboard/#6): slot 'GRAFO' ripensato -> 'INVENTARIO' + grafo in Obsidian
- `b4cc84d5` feat(dashboard/#1,#4): ARCHITETTURA -> Mappa di Nina · IDENTITY -> CV
- `d06bfff8` feat(inventario/#7): inventario notturno cumulativo di cosa abbiamo costruito

_episodi: 175 · critiche aperte: 26 (43 risolte) · RAG: 3873 chunk_



## 2026-06-15 · 12 commit
- `b3916fb5` docs(pitch/ic01): 1-pager investor formale (problema/soluzione/mercato/team/ask)
- `ff4cec37` fix(audit/n03): cartella clinica auto-pulente — auto-close + reopen
- `0eb22df1` feat(critiche+pct): allinea critiche 15/06 + agente pct_sync (fonte unica STATE)
- `d123d62b` canon(nina v2): Character Bible — coerenza look/voce/modi per animazione e voce
- `36ad2b7a` content(nina v2): +10 episodi arco IA (06-15) lunghi e stratificati, integrati
- `037f948d` auto: night_audit - cartella clinica 15/06/2026
- `370cc1c9` auto: story_agent - episodi generati 15/06/2026
- `c827c62d` content(nina v2): i 5 episodi d'apertura del viaggio (ancorati a La Materia)
- `2221e7e9` canon(nina): filone unico navigabile (non stagioni) + infinito si coltiva + le Materie
- `3537e805` canon(nina): CV-che-si-genera = progetto HR (stesso engine) + l'effetto WOW
- `5c28b46e` canon(nina): modello narrativo - il libro e' il viaggio sulla mappa
- `47602ac7` canon(nina): architettura v2 — Nina evergreen + mappa navigabile (non racconto lineare)

_episodi: 174 · critiche aperte: 36 (31 risolte) · RAG: 3873 chunk_

