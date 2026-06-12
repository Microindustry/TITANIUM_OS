<!-- TOC -->

- [EP_AUTO_19  Milestone](#epauto19-milestone)
    - [api_server.py - endpoint /api/media /api/photos /api/pdfs /a](#apiserverpy---endpoint-apimedia-apiphotos-apipdfs-a)
- [Il Sistema  Episodio 23](#il-sistema-episodio-23)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima del server, cera il caos dei file](#atto-i-prima-del-server-cera-il-caos-dei-file)
  - [ATTO II  api_server.py: quattro endpoint, una spina dorsale](#atto-ii-apiserverpy-quattro-endpoint-una-spina-dorsale)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_19 — Milestone
### "api_server.py - endpoint /api/media /api/photos /api/pdfs /a"

---
id: EP_AUTO_19
title: "api_server.py - endpoint /api/media /api/photos /a"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-28
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "api_server.py - endpoint /api/media /api/photos /api/pdfs /api/programs (28 Mag 2026)"
---

# Il Sistema — Episodio 23

## COLD OPEN

Ventotto maggio duemilавентisеi. Sono in officina, davanti allo schermo, e mando una richiesta HTTP a me stesso. Il server risponde. Non è magia — è un endpoint che finalmente sa dove mettere le mani.

---

## ATTO I — Prima del server, c'era il caos dei file

Devo spiegarti com'era prima, perché senza il prima non capisci perché questo giorno conta.

TITANIUM_OS non è un software. È un sistema nervoso — una cosa viva che collega una fresatrice che sto costruendo con le mani, un sistema di connettori che aspetta che quella fresatrice finisca, un'automazione che già ragiona da sola, una pressa polimeri ancora sulla carta, e un centro estetico che usa l'intelligenza artificiale per fare l'accoglienza. Queste non sono cose separate. Sono gli organi dello stesso corpo.

Il problema è che un corpo senza un sistema circolatorio è solo un mucchio di carne. E per mesi, TITANIUM_OS aveva esattamente questo problema: dati che giravano, file che esistevano, fotografie, PDF tecnici, programmi CNC, media di ogni tipo — ma non c'era un punto centrale che sapesse rispondere alla domanda più semplice del mondo. *Dove sta questa roba? Dammela.*

GENESIS, la mia dashboard v7.0, stava già girando. Story Agent funzionava. Il RAG v4.0 leggeva documenti. Gli agenti eseguivano task. Ma ogni volta che uno di questi componenti aveva bisogno di un file — un'immagine della V32 durante la Config G, un PDF del progetto MIMS, un programma G-code — doveva andare a cercarlo come un cieco in una stanza buia. Nessun protocollo. Nessuna via maestra. Solo percorsi hardcoded che funzionavano finché non cambiavi una cartella, e poi tutto si rompeva in silenzio.

Il problema dei sistemi complessi è che si rompono piano piano, e te ne accorgi tardi. Io me ne ero accorto abbastanza presto da fermarmi e risolvere la cosa alla radice.

---

## ATTO II — `api_server.py`: quattro endpoint, una spina dorsale

Ho aperto un file vuoto e l'ho chiamato `api_server.py`. Niente di poetico. Il nome dice quello che fa.

Quattro endpoint. Ognuno con un compito preciso, senza ambiguità.

`/api/media` — tutto il materiale multimediale del sistema. Quello che vedi, quello che mostri, quello che documenta. Una richiesta GET e ti torna l'inventario.

`/api/photos` — le fotografie. Questo sembra banale finché non ci pensi. La V32 è una macchina che costruisco pezzo per pezzo, e ogni fase ha una documentazione visiva. La Config G dei rinforzi — siamo al sessantacinque percento, lo so perché l'ho guardato stamattina — produce immagini che devono essere accessibili agli agenti di GENESIS quando ricostruiscono la storia del progetto per lo Story Agent. Senza un endpoint pulito, quella catena si spezzava ogni volta.

`/api/pdfs` — documenti tecnici. Qui dentro c'è il mondo: specifiche di MIMS, schemi di VULCAN, contratti, note di progetto. Il RAG v4.0 si nutre di PDF. Se i PDF non hanno un indirizzo stabile, il RAG lavora su dati vecchi o incompleti. È come dare a qualcuno una mappa del 2019 per muoversi in una città che è cambiata tre volte.

`/api/programs` — i programmi CNC. G-code, configurazioni, script di automazione. Questo endpoint è il ponte diretto tra il software e il ferro. La V32 un giorno prenderà questi programmi ed eseguirà tagli reali su materiale reale. GENESIS dovrà sapere quali programmi esistono, quali sono stati testati, quali sono pronti. Serve un indirizzo. Ora ce l'ha.

Ho scritto il server in Python, FastAPI, niente di esotico. L'ho tenuto semplice perché i sistemi complessi sopravvivono solo se le fondamenta sono leggibili. Ho testato ogni endpoint a mano — ho mandato le richieste, guardato le risposte, sistemato quello che non tornava. Poi l'ho integrato in GENESIS e ho aspettato. Il sistema ha risposto come se l'avesse sempre saputo fare.

---

## ATTO III — Cosa si sblocca adesso

GENESIS può adesso navigare il proprio patrimonio di dati senza inciampare. Lo Story Agent ha accesso alle fotografie della V32 per costruire narrazioni coerenti del progresso. Il RAG v4.0 trova i PDF dove li aspetta. I programmi CNC sono catalogati e raggiungibili.

Ma la cosa che mi interessa di più è un'altra. MIMS — i connettori modulari, fermi al trenta percento perché aspettano che la catena V32-VULCAN si stabilizzi — adesso ha un'infrastruttura dati su cui appoggiarsi quando sarà il momento. VITA_NATURA e il pilota EVA stanno crescendo lentamente, quaranta percento, e anche loro producono media, documenti, dati di prenotazione che devono fluire nel sistema. Ora c'è un modo per farlo fluire.

`api_server.py` non è un traguardo. È un'abilitazione. La differenza è sostanziale: i traguardi si celebrano, le abilitazioni si usano subito.

Domani si torna sulla V32. I rinforzi della Config G non si fresano da soli.

---

## CHIUSURA

*Un sistema è vivo quando le

## FATTI (per il RAG)

- **FATTO:** `api_server.py` implementa quattro endpoint REST: `/api/media`, `/api/photos`, `/api/pdfs`, `/api/programs`. **LOGICA:** Centralizza l'accesso ai file di TITANIUM_OS per tutti i componenti interni (GENESIS, Story Agent, RAG v4.0), eliminando percorsi hardcoded che si rompevano al cambio di cartella.

- **FATTO:** Il framework scelto per `api_server.py` è Python/FastAPI. **LOGICA:** Scelta per semplicità e leggibilità, principio esplicitato: "i sistemi complessi sopravvivono solo se le fondamenta sono leggibili."

- **FATTO:** Al 28 maggio 2026, la V32 (Config G — rinforzi) è al 65% di completamento. **LOGICA:** Dato rilevato direttamente da Matteo durante la sessione; le fotografie di questa fase devono essere accessibili via `/api/photos` allo Story Agent.

- **FATTO:** MIMS (connettori modulari) è fermo al 30% in attesa della stabilizzazione della catena V32-VULCAN. **LOGICA:** Il blocco è deliberato: MIMS si appoggerà all'infrastruttura dati di `api_server.py` quando la dipendenza a monte sarà risolta.

- **FATTO:** VITA_NATURA e il pilota EVA sono entrambi al 40% di avanzamento alla data dell'episodio. **LOGICA:** Anche questi sotto-progetti producono media, documenti e dati di prenotazione destinati a fluire nel sistema tramite gli endpoint appena creati.
