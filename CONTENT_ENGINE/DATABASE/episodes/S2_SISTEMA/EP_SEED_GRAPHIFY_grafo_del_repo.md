---
id: EP_SEED_GRAPHIFY
title: Graphify — il repo che si disegna da solo
sottotitolo: Da 515 file a una mappa di 5966 nodi in 13 secondi, tutta in locale. Il salto "Wiki" del sistema.
stagione: ST
data_evento: 2026-06-07
tags: [graphify, knowledge-graph, rag, wiki, locale, claude-code, genesis]
status: ready
durata_min: 7
---
<!-- TOC -->

- [Graphify  il repo che si disegna da solo](#graphify-il-repo-che-si-disegna-da-solo)
  - [COLD OPEN](#cold-open)
  - [IL PROBLEMA](#il-problema)
  - [LAZIONE](#lazione)
  - [IL RISULTATO](#il-risultato)
  - [REEL_HOOK](#reelhook)

<!-- /TOC -->


# Graphify — il repo che si disegna da solo

## COLD OPEN

515 file. Migliaia di import, funzioni che si chiamano fra cartelle, decisioni
sparse in cento markdown. Quando chiedevo a Claude "come funziona X?", il sistema
apriva i file uno per uno e bruciava token a leggere tutto. Capire il proprio
stesso codice costava ogni volta.

## IL PROBLEMA

Il RAG sa rispondere a *cosa c'è scritto* in un documento. Ma non sa dirti *come le
cose si tengono insieme*: chi chiama chi, quale modulo dipende da quale, dove vive
una decisione e cosa tocca. Quella è conoscenza **strutturale**, e fino a ieri viveva
solo nella mia testa. Era il salto mancante: dal RAG (testo) alla **Wiki** (mappa).

## L'AZIONE

Ho messo in produzione **Graphify**: trasforma qualsiasi input — codice, documenti,
note — in un *knowledge graph* persistente. God-node, community detection, query/path/explain.
Installato `uv`, esposto come **skill `/graphify` dentro Claude Code**. Tutto **100% locale,
licenza MIT**: nessuna chiamata esterna, nessun documento sensibile che esce.

Sul repo TITANIUM_OS, in un colpo:
- **515 file → 5.966 nodi, 6.317 archi**
- **696 community** (cluster tematici trovati da soli)
- **13,2 secondi**, su questa macchina, senza GPU richiesta

## IL RISULTATO

Adesso chiedo al **grafo**, non ai file. Una query mi dice come gira un sottosistema
senza che Claude rilegga niente: **zero token sprecati**, risposta strutturale immediata.
La conoscenza che era nella mia testa ora è un oggetto interrogabile — e domani vale
ancora. Sull'estrazione da `MENTE/` ho deciso un approccio **ibrido**: il 7B locale è
debole sui documenti sensibili, quindi lì il grafo si costruisce con cura, non a pioggia.

È il primo mattone della **Wiki** dell'arco macro: il sistema che spiega sé stesso.

## REEL_HOOK

Il mio progetto è 515 file. Capire come funziona, ogni volta, costava token e tempo.
Il problema: il RAG ti dice cosa c'è scritto, non come le cose si tengono insieme.
In 13 secondi ho trasformato l'intero repo in una mappa di 5.966 nodi e 696 cluster —
tutto in locale, zero cloud. Ora chiedo alla mappa, non ai file.
Il sistema ha iniziato a spiegare sé stesso.
