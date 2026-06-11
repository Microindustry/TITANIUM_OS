---
id: EP_SEED_WATCHER
title: AI News Watcher — restare sul pezzo senza chiavi
sottotitolo: 30 creator, 4 sorgenti, zero API key. Il nodo che guarda l'IA muoversi mentre io costruisco metallo.
stagione: ST
data_evento: 2026-06-07
tags: [ai-news-watcher, watcher, keyless, rss, github, youtube, automazione, genesis]
status: ready
durata_min: 6
---
<!-- TOC -->

- [AI News Watcher  restare sul pezzo senza chiavi](#ai-news-watcher-restare-sul-pezzo-senza-chiavi)
  - [COLD OPEN](#cold-open)
  - [IL PROBLEMA](#il-problema)
  - [LAZIONE](#lazione)
  - [IL RISULTATO](#il-risultato)
  - [REEL_HOOK](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# AI News Watcher — restare sul pezzo senza chiavi

## COLD OPEN

Il problema di chi costruisce con l'IA non è che le cose vanno veloci. È che vanno
veloci *mentre fai altro*. Io passo le giornate su titanio, BOM, mandrini. Intanto
escono modelli, repo, tecniche che cambiano cosa è possibile. Perdere il filo non è
una distrazione: è restare indietro su uno strumento che è metà del mio vantaggio.

## IL PROBLEMA

La soluzione ovvia — API a pagamento, scraper fragili, l'ennesimo servizio cloud da
gestire e da pagare — viola due regole della casa: **proteggi il sapere** e **non
dipendere da chiavi che possono scadere o costare**. Volevo un radar, non un altro
abbonamento.

## L'AZIONE

Ho prima **catturato il dominio**: `BRAIN/AI_NEWS_WATCHER_BRIEF.md` con **30+ creator**
(handle inclusi) e una logica a **tier con finestra 48h e rotazione** — chi conta di più
viene guardato più spesso, gli altri a turno, senza ridondanza.

Poi l'ho costruito **KEYLESS**: `NODES/AI_NEWS_WATCHER/watcher.py` + launcher
`night_ai_watch.bat`. **4 sorgenti, zero chiavi:**
- **GitHub** via la CLI `gh` (già autenticata sulla macchina)
- **siti** via RSS
- **YouTube** via RSS dei canali
- tier + rotazione dal brief

Testato a freddo: **67 + 30 segnali reali** raccolti al primo giro.

## IL RISULTATO

Adesso ho un radar che gira di notte e non costa niente da tenere acceso: nessuna API
key da ruotare, nessun servizio che può alzare il prezzo o chiudere. La notizia arriva
a me dentro il sistema, già filtrata per rilevanza, invece di rincorrerla su dieci feed.

È la regola 2 applicata a sé stessa: *se lo fai ogni giorno, diventa un nodo*. Stare
informato era un'abitudine che dipendeva dalla mia volontà. Ora è un processo che gira da solo.

## REEL_HOOK

L'IA non corre veloce: corre veloce **mentre fai altro**. E io faccio metallo tutto il giorno.
La soluzione ovvia era l'ennesima API a pagamento. L'ho rifiutata.
Ho costruito un radar a **zero chiavi**: GitHub, RSS, YouTube — 30 creator, tier a rotazione,
67 segnali reali al primo giro. Gira di notte, non costa niente da tenere acceso.
Restare sul pezzo ha smesso di dipendere dalla mia memoria.

## FATTI (per il RAG)

- **FATTO:** AI News Watcher **keyless**, 4 sorgenti — **GitHub via CLI `gh`**, **siti via RSS**, **YouTube via RSS dei canali**, tier dal brief. **30+ creator**; **67+30 segnali** al primo giro.
- **DECISIONE:** zero API key (no abbonamenti, no chiavi che scadono/costano) → costo di gestione zero.
- **LOGICA:** **tier con finestra 48h + rotazione** (i più importanti spesso, gli altri a turno, no ridondanza); **gate di rilevanza** (`min-rel`) filtra il rumore prima del RAG.
- **OBIETTIVO:** stare informati come **processo notturno**, non come abitudine che dipende dalla volontà (regola 2).
- **FILE:** `NODES/AI_NEWS_WATCHER/watcher.py` · launcher `night_ai_watch.bat` · brief `BRAIN/AI_NEWS_WATCHER_BRIEF.md`.
