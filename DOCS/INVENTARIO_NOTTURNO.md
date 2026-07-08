<!-- TOC -->

- [Inventario  cosa abbiamo costruito (notte per notte)](#inventario-cosa-abbiamo-costruito-notte-per-notte)
  - [2026-07-08  15 commit](#2026-07-08-15-commit)
  - [2026-07-06  2 commit](#2026-07-06-2-commit)
  - [2026-07-05  13 commit](#2026-07-05-13-commit)
  - [2026-07-04  8 commit](#2026-07-04-8-commit)
  - [2026-07-03  8 commit](#2026-07-03-8-commit)
  - [2026-07-02  2 commit](#2026-07-02-2-commit)
  - [2026-06-27  6 commit](#2026-06-27-6-commit)
  - [2026-06-26  13 commit](#2026-06-26-13-commit)
  - [2026-06-25  25 commit](#2026-06-25-25-commit)
  - [2026-06-24  40 commit](#2026-06-24-40-commit)
  - [2026-06-23  8 commit](#2026-06-23-8-commit)
  - [2026-06-22  2 commit](#2026-06-22-2-commit)
  - [2026-06-21  9 commit](#2026-06-21-9-commit)
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

## 2026-07-08 · 15 commit
- `389936fb` auto: night_audit - cartella clinica 08/07/2026
- `2e63de91` auto: story_agent - episodi generati 08/07/2026
- `97feab3e` chore(salva): chiusura #55 — piano #54 COMPLETO (ondate A-B-C) + verita sparsa + STATE salvato
- `1e4daf0c` feat(#54): STATE snapshot giornaliero + vista CRITICHE eliminata -> CRITICHE.md
- `bb9bc59f` chore(#54): critica gc01 (NodeTile 4 copie) chiusa nel canone live
- `9c840650` fix(#54): STATE.json clobber curato alla radice + STATE ripristinato integrale
- `74053de9` refactor(#54): NodeKit - NodeTile/NodeLevel condivisi, via 4 copie (critica gc03)
- `56c3cfb9` feat(#54): ondata C completata - 4 sentinelle notturne + pip-audit + graphify refresh
- `0b6d10e9` feat(#54): canone ENFORCED - canon-pin nel retrieval + sentinelle night_audit (07 P1)
- `23c705e9` feat(#54): TOP10 #3 chiuso (rebuild esclusivo) + guardia API + indici-verita' agganciati
- `ad380b83` fix(#54): doppio watchdog risolto alla radice + gitignore logs + indice core
- `dc72c8b6` feat(#54): retention.py - regola scritta detriti disco + fix deep_freeze chroma
- `cd386b5a` fix(boot): dashboard 5173 non partiva - vite 7 rifiuta --silent passato da pnpm
- `fef982ea` auto: story_agent - episodi generati 07/07/2026
- `8c6c88b8` auto: night_audit - cartella clinica 07/07/2026

_episodi: 263 · critiche aperte: 24 (129 risolte) · RAG: 18276 chunk_



## 2026-07-06 · 2 commit
- `6e4c5157` chore(#54): bussola — critiche live fatte (2b8bfafe), Nina v1.1 verificata in produzione (EP_N2_51 stanotte)
- `2b8bfafe` feat(#54): critiche dash LIVE — canone manuale da criticheData.ts a JSON servito da /api

_episodi: 259 · critiche aperte: 24 (117 risolte) · RAG: 17141 chunk_



## 2026-07-05 · 13 commit
- `3621a09a` auto: night_audit - cartella clinica 05/07/2026
- `e67f2fdb` auto: story_agent - episodi generati 05/07/2026
- `d40d4cda` fix(#54): nina_rag_loop v1.1 — lost-update stato + deadlock fine-giro
- `b977d8a7` feat(#54): ondata A — smistamento Desktop/chiavetta completo + piano d'attacco ecosistema in bussola
- `34b1508e` chore(#53): bussola ondata 2 — TOP 10 software completata (7/9/10 + guardia gemelli Nina); resta #1 hardware (Matteo) + carosello EP_N2_03 + backlog
- `ffc62019` feat(#53): TOP10 completato — CAROSELLI/_TEMPLATE (tokens.css fonte di verita' + carosello_base.html standard EP_N2_02) + nomi file canonici carosello.html (F13, gli script gia' se lo aspettavano) + regola nel README
- `3ce48236` feat(#53): TOP9 completato + fix generatore Nina (attacco 03 F2+F3) — catena open-loop 2->3 riagganciata (EP_N2_03 'Dove siamo' + Pietre richiamate), EP_N2_51/52 archiviati (doppioni lezione EP_N2_08 da semi gemelli EP_AV_02/02_2), guardia anti-gemelli in nina_rag_loop (1 rigenerazione per regione per giro, dry-run verificato), indici rigenerati (50 caselle)
- `0885e2b4` chore(#53): bussola — TOP 3/4/5/6/8 fatti, 9/10 a meta' (restano contenuti/caroselli); 1/7 in mano a Matteo
- `c1089ff0` feat(#53): TOP10 CSS — nl-fadeUp globale (4 view animavano 'a fortuna'), prefers-reduced-motion, contrasto slate-600/700 alzato a soglia WCAG (verificato con screenshot), focus-visible esteso 2px, rimosse 2 regole CSS invalide; fix dash_shot.bat (echo -> redirigeva testo nel png)
- `7f0dd59b` sec(#53): TOP4 — EVA hardening (attacco 02 F1+F2): bind 127.0.0.1 default (EVA_BIND per tunnel), /inbox con X-API-Key fail-closed da remoto (PII clienti), APP_SECRET obbligatorio in LIVE (fail-closed, dry-run invariato)
- `72619583` feat(#53): TOP6 — guardia RAG in api_server (lock + failure-latch 300s sui 3 punti di import per-request): cura alla radice il commit-leak da load falliti a martello (attacco 04 P2). Attiva dal prossimo restart API (notturna)
- `7ed248c0` sec(#53): TOP5+TOP7bis — IP fuori dal repo PUBBLICO (VULCAN_MANIFESTO, mims protocol, fit-park-specs -> MENTE, restano in history: valutare filter-repo con Matteo) + rm file vuoto 'perfetta' tracciato
- `230769d6` feat(#53): TOP3+TOP9 — exclusions RAG (ASSOLUTO/VERSIONI + ARCHIVIO + ARCHIVE_V6, 441->388 file, rebuild-hard verificato) + INDICE_CAMMINO generato da episodes.json (52 caselle, mai piu' titoli scaduti) + vault_intersect skip archivi

_episodi: 259 · critiche aperte: 24 (117 risolte) · RAG: 17141 chunk_



## 2026-07-04 · 8 commit
- `7bd29e89` auto: night_audit - cartella clinica 04/07/2026
- `e62983eb` auto: story_agent - episodi generati 04/07/2026
- `8ca84ab8` chore(#53): bussola — guasto 7 (notturna/Nina) diagnosticato+fixato+verificato, guasto grafo chiuso
- `36c85bf3` fix(#53): notturna morta dal 23/06 — Start-Process -RedirectStandardOutput ereditava l'handle del log del bat (lock eterno, tutti gli step post-recovery saltati: topics/Nina/riflusso). Fix: cmd intermedio senza inheritance in 4 script SERVICES + log separato rag_recover.log. Riprodotto e verificato con test elevato
- `65f6c606` chore(#53): bussola — RAG incidente HNSW risolto (drop-hnsw + incremental + snapshot)
- `688becca` chore(#53): episodes.json collegati ricalcolati (storie_intersect 1109 legami) + vault_orphans rinfrescato
- `3fadcca4` feat(#53): ecosistema Obsidian vero — sync MONDO nel vault, fix wikilink EP_SEED alla fonte, canon_guard PAIRS 'Euro X,XXX' (07 P0.1), bussola #53
- `a194760b` chore(salva): chiusura #52 — ATTACCO ESERCITO completo (7/7 report + _SINTESI) + TOP 10 e backlog completo in bussola; prossima sessione #53 = Obsidian/ecosistema vero su Fable 5

_episodi: 257 · critiche aperte: 18 (117 risolte) · RAG: 17520 chunk_



## 2026-07-03 · 8 commit
- `993c5da5` auto: night_audit - cartella clinica 03/07/2026
- `d4faf548` auto: story_agent - episodi generati 03/07/2026
- `8b1bbba8` chore(salva): chiusura sessione — RAG rebuild verificato + STATE/bussola/RIAVVIO allineati per sessione Fable
- `4b9559a0` chore: PIANO D'ATTACCO esercito (da eseguire su Fable) + infra refresh (dashboard/Obsidian/Pietre) + default Fable
- `436be627` chore: gitignore .claude/settings.local.json (preferenze locali di macchina)
- `b454d39d` chore(salva): chiusura #51 — preambolo Nina CHIUSO (PRE_03 v5 personaggi) + EP_N2_01/02 al nuovo standard (16 slide blueprint SVG)
- `e5040098` auto: story_agent - episodi generati 02/07/2026
- `679cf214` auto: night_audit - cartella clinica 02/07/2026

_episodi: 255 · critiche aperte: 12 (117 risolte) · RAG: 25120 chunk_



## 2026-07-02 · 2 commit
- `730d6f69` chore(salva): pulizia bozze avatar (tieni solo Nina definitiva + deliverable) + PRE_03 redesign (meno immagini/più testo) in bussola
- `0b836e97` chore(salva): chiusura #50 — Nina volto DEFINITIVO (3D Gamma) + versione vita denim + PRE_03 'I Personaggi' (solo Nina, volto vero) + 8 Pietre con icone (PRE_01 s11)

_episodi: 252 · critiche aperte: 22 (95 risolte) · RAG: 24882 chunk_



## 2026-06-27 · 6 commit
- `02b96f8e` auto: night_audit - cartella clinica 27/06/2026
- `f01d9c24` auto: story_agent - episodi generati 27/06/2026
- `0b8e74e7` chore(salva): chiusura sessione #49 — serie preambolo Nina (PRE_01+PRE_02), RIAVVIO #50
- `60757da2` feat(nina): PRE_02 "Come funziona Nina" — 2° carosello del preambolo (16 slide)
- `45147d5c` feat(nina): PRE_01 v11 — preambolo allineato alla visione (Mappa Viva, tre fondi, libro vivo, diario)
- `c55cbd20` chore(salva): chiusura sessione #49 — PRE_01 preambolo a 17 slide (v10) + RIAVVIO #50

_episodi: 252 · critiche aperte: 22 (95 risolte) · RAG: 24882 chunk_



## 2026-06-26 · 13 commit
- `838a5349` auto: night_audit - cartella clinica 26/06/2026
- `4f0c7699` auto: story_agent - episodi generati 26/06/2026
- `bde13b8e` feat(nina): PRE_01 v10 — preambolo a 17 slide che spiega il progetto
- `d25bc91d` feat(nina): PRE_01 v7 — testo arricchito su 8 slide
- `92fcd9f1` feat(nina): PRE_01 — stile buonanotte + flusso sfumato continuo su 8 slide
- `0be8e667` feat(nina): Adobe Express + caroselli — porta→carosello, preambolo PRE_01
- `72f34e69` chore(salva): chiusura sessione #47 — filone visivo RETE (Konik + Hermes)
- `98fd7109` feat(rete): transizioni morbide — scena persistente + fade-in al filtro
- `91fb8672` feat(rete): RETE viva — freschezza + hub + memoria a 2 livelli (Konik+Hermes)
- `b3675b3c` feat(rete): colora gli orfani di RETE nel grafo 3D (Konik fase 2)
- `38bd6fc0` feat(audit): segnale orfani di RETE nella cartella clinica (tesi Konik)
- `a0a01fbf` chore(salva): chiusura sessione #46 — RAG v4.2 + _ARCHIVIO fuori canone + Nina auto
- `9e3bde3a` docs(nina): allinea l'header alla regola reale — AUTO-PROMOZIONE, niente revisione

_episodi: 251 · critiche aperte: 18 (93 risolte) · RAG: 24762 chunk_



## 2026-06-25 · 25 commit
- `a9038cea` auto: night_audit - cartella clinica 25/06/2026
- `be6a6e3c` auto: story_agent - episodi generati 25/06/2026
- `a0f6a9b9` chore(rag): escludi _ARCHIVIO (ex _DA_ORDINARE) dal canone + esito migrazione v4.2
- `79908408` feat(rag): v4.2 — chunking heading-aware + snapshot _VAULT + GraphRAG-lite wikilink
- `fef28ba5` chore(salva): record START_GETAC rimosso — bussola/STATE/RIAVVIO allineati
- `de5a514d` chore(root): rimuovo START_GETAC.bat (launcher Getac morto, superato da START_LOGIN.bat)
- `0b04416b` chore(salva): chiusura sessione #45 — CRITICHE azzerate (3 fonti) + de-hardcode/rimozione benen
- `1a5570dc` chore(tools): rimuovo i 5 registrar legacy ridondanti (superati dai portabili)
- `1397b0ee` fix(tools): de-hardcoda C:\Users\benen nei 5 registrar legacy (portabili)
- `d7d6312f` chore(salva): coda changelog/state hook (sess.#44)
- `50040096` chore(salva): chiusura sessione #44 — verifiche verdi (50 ep Nina, build TS ok)
- `e65bdbd0` chore(bussola): groom — 20 todo gia' fatti/superati chiusi (41->21 aperti)
- `566da4b9` sweep+header: 8 critiche manuali chiuse + header CRITICHE per-fonte
- `8200ab07` fix(dash): deep-link hash per view + bug 42 todo-fantasma nella bussola
- `e338ce6d` feat(MIMS): connettori = Via B deciso + triage notturno nel protocollo
- `3919e0fa` chore(critiche): chiuse 18 critiche risolte/stale/decise — sidebar 31->13
- `a2f8b419` docs(self-improve): documenta il gate propose-only (sostituisce ex-regola 11)
- `473a06d0` chore(rag): zittisci warning HF Hub non-autenticato (rumore log notturno)
- `c638edbf` feat(research): query broadening su 0 risultati + summary diagnostico (v1.3)
- `2bdbbf3e` chore(repo): gitignore DATA/views cache (340 file auto-gen) — diff puliti
- `143da749` chore(salva): coda churn views (sess.#44)
- `725481cd` chore(salva): chiusura sessione #44 — sweep auto (TOC/links/views/state notturni)
- `34843828` chore(bussola): aggiornato #44 col lavoro del mattino (view fix, stabilità, watcher YT)
- `fa4b0997` fix(watcher): resolver YouTube robusto + RSS con UA browser — Simone Rizzo si pesca (sess.#44)
- `9ecbc03a` fix(storie): RAG Nina vs Nina dal giorno 0 inequivocabili (sess.#44)

_episodi: 249 · critiche aperte: 14 (91 risolte) · RAG: 24574 chunk_



## 2026-06-24 · 40 commit
- `e642fa8e` auto: night_audit - cartella clinica 24/06/2026
- `61fe20c5` auto: story_agent - episodi generati 24/06/2026
- `643cca74` content(nina): 4 script reel stile Simone Rizzo — l'AI spiegata come a un bambino (sess.#44)
- `9ec8f55d` docs(nina): catalogo poster del mondo (pilota + 8 regioni + mappa-mondo) (sess.#44)
- `dfbb2712` docs(nina): rigenerato PIETRE.md — 50 EP_N2 indicizzati per Pietra (sess.#44)
- `d9ce8dbd` design(nina): poster MAPPA-MONDO — il cammino ⟡0→⟡7 in una tavola (sess.#44)
- `b3092194` docs(nina): verifica qualità batch copertura-mappa — 31 ep OK, 0 violazioni (sess.#44)
- `41e6a548` design(nina): collana 8 card-Regione (Pietre ⟡0→⟡7) — il mondo come gioco (sess.#44)
- `3edcf2c6` chore: changelog auto + archivio reemit EP_N2 (origine, additivo) (sess.#44)
- `ea14c83a` fix(nina): robustezza generatore — _retry backoff su API/JSON (battle-tested batch #44)
- `e798d7ef` chore(data): sweep view mirrors + stati auto-generati (sess.#44)
- `18bc9808` chore(salva): chiusura sessione #44 — bussola + STATE + RIAVVIO
- `773da908` design(nina): poster pilota EP_N2_01 "La Bambina che Chiedeva Perche" (sess.#44)
- `ca919d9f` content(nina): copertura mappa — 31 concetti distinti → 50 episodi EP_N2 (sess.#44)
- `06126ee3` docs(map): vetrina pubblica + manifest ai 15 nodi reali (sess.#44)
- `f30c3582` feat(watcher+nina): traccia Simone Rizzo (tier 1 YT) + driver copertura-mappa (sess.#44)
- `b488df17` fix(rag-recover): uccidi il commit-leak (>15GB) PRIMA di sondare (auto-hardening sess.#44)
- `19749906` feat(dashboard): 3 voci Storie a livello principale (Sistema · Nina archivio · Nina dal giorno 0)
- `2b7d8c00` feat(nina): EP_N2_01 riscritto come vero inizio + lettore archiviati (sess.#44)
- `64b09b10` fix(storie): RAG Nina archiviati visibili — proxy /api/nina + id archivio (sess.#44)
- `36bf46ed` feat(storie): separa RAG Nina (solo archiviati) da Nina dal giorno 0 (nuovi e definitivi) (sess.#44)
- `dc5d47c9` feat(storie): Sistema mostra tutto (anche bozze/AUTO), RAG Nina include gli archiviati, giorno 0 col cammino (sess.#44)
- `e53e570b` content(nina): 16 episodi RI-EMESSI dal vero (grounding obbligatorio) + originali archiviati (sess.#44)
- `e2df5674` fix(nina): robustezza generatore — retry architetto, no-crash batch/loop, FATTI sempre densi (sess.#44)
- `699fe12f` feat(nina): grounding OBBLIGATORIO + re-emit di tutti gli episodi (sess.#44)
- `5db8402d` feat(nina): 'Nina dal giorno 0' rifatta = documento fondativo dal vero; RAG Nina = tutti gli episodi (sess.#44)
- `f5bcc563` feat(storie): voci sidebar — Storie di Sistema · RAG Nina · Nina dal giorno 0 (sess.#44)
- `9bb1c399` feat(storie): selettore Sistema|Nina + pannello RAG Nina + Nina dal giorno 0 (sess.#44)
- `4b66e31e` feat(nina): generazione AUTOMATICA definitiva — niente _PROPOSTI, loop RAG dai semi archiviati (sess.#44)
- `46b05c51` chore(salva): chiusura sessione #43 — Nina definitiva, RAG pulito, grafo ecosistema; animatic in pausa
- `4683b91d` feat(obsidian): più ponti — meno zone (sess.#43)
- `608b965d` chore(salva): reflux RAG fatto + dashboard su + grafo ecosistema (sess.#43)
- `496e96d9` feat(obsidian): ecosistema non zone — vault_intersect premia i ponti cross-dominio (sess.#43)
- `7c371655` fix(rag): l'accesso esclusivo ferma ANCHE watcher.py (sess.#43)
- `e358b2ee` fix(obsidian): escludi _ARCHIVIO/_PROPOSTI dai tool del vault (sess.#43)
- `9cd6e5ba` chore(salva): bussola + STATE — arco NINA DEFINITIVA 6/6 (sess.#43)
- `d95b3a0b` feat(nina): kit di produzione animazione+voce (sess.#43, step 6/6)
- `c1c67c02` fix(rag): escludi _ARCHIVIO/_PROPOSTI dall'indice — una sola verità (sess.#43, step 3/6)
- `37fe55f0` feat(nina): indice-cammino canonico + open-loop espliciti (sess.#43, step 2/6)
- `fb7f71cb` feat(nina): canone unico EP_N2 — archiviati i vecchi EP_AV (sess.#43, step 1/6)

_episodi: 248 · critiche aperte: 31 (68 risolte) · RAG: 34158 chunk_



## 2026-06-23 · 8 commit
- `a114aba8` auto: night_audit - cartella clinica 23/06/2026
- `40cf1b0b` auto: story_agent - episodi generati 23/06/2026
- `e14f2075` chore(salva): sessione #42 — blackout RAG recovery 2-livelli + Obsidian titoli/intersect
- `04c3f71a` feat(rag): reset fisico chroma_db + fix titoli vault Obsidian
- `d1863576` fix(rag): recovery 2-livelli post-blackout + research_agent resiliente + GPU
- `78358d57` chore(salva): visione NINA ZERO confermata — film istruttorio che genera il CV
- `ad9d663a` chore(salva): sessione #41 — PUNTO 0, RAG integrato+self-healing, generatore Nina grounded
- `d9489e76` chore(salva): sessione #40 — RAG sbloccato+ottimizzato GPU, MIMS/VULCAN, canone veritiero, ASSOLUTO V9

_episodi: 191 · critiche aperte: 25 (68 risolte) · RAG: 33167 chunk_



## 2026-06-22 · 2 commit
- `84463a59` auto: night_audit - cartella clinica 22/06/2026
- `932fe7e9` auto: story_agent - episodi generati 22/06/2026

_episodi: 188 · critiche aperte: 28 (59 risolte) · RAG: 29113 chunk_



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

