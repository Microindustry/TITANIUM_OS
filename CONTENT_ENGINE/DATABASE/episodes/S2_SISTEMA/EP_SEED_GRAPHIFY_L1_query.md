---
id: EP_SEED_GRAPHIFY_L1_QUERY
title: Interrogare la mappa, non i file — query, path, explain
sottotitolo: Approfondimento LV1 · come chiedo "come gira X?" senza che Claude rilegga il repo (zero token)
stagione: ST
parent: EP_SEED_GRAPHIFY
level: 1
data_evento: 2026-06-07
tags: [graphify, query, path, explain, grafo, token, approfondimento]
status: ready
durata_min: 6
---
<!-- TOC -->

- [Interrogare la mappa, non i file  query, path, explain](#interrogare-la-mappa-non-i-file-query-path-explain)
    - [Approfondimento LV1 di EP_SEED_GRAPHIFY  il grafo si interroga, non si rilegge](#approfondimento-lv1-di-epseedgraphify-il-grafo-si-interroga-non-si-rilegge)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [I TRE MODI DI CHIEDERE](#i-tre-modi-di-chiedere)
  - [PERCHÉ CONTA (il risparmio vero)](#perché-conta-il-risparmio-vero)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Interrogare la mappa, non i file — query, path, explain
### Approfondimento LV1 di [[EP_SEED_GRAPHIFY]] · "il grafo si interroga, non si rilegge"

## DA DOVE VIENE

Nel principale dico: *"adesso chiedo al grafo, non ai file — zero token sprecati"*. Questo livello
spiega **come** si interroga il grafo: i tre verbi che uso davvero — `query`, `path`, `explain`.

## LA DOMANDA

Prima, per sapere "come gira il sistema RAG?", Claude apriva i file uno per uno e bruciava token a
leggere tutto, ogni volta. La domanda: *posso avere la risposta strutturale senza far rileggere niente
a nessuno?*

## I TRE MODI DI CHIEDERE

- **`query` — trova.** "Dammi i nodi che parlano di RAG." Ti torna l'insieme giusto, non l'intero repo.
  È il punto di partenza: da dove guardo.
- **`path` — collega.** "Come arriva il watcher notturno fino alla dashboard?" Ti dà la **catena di
  nodi** che li unisce — i passaggi, non solo gli estremi. È la differenza tra sapere *che* due cose si
  toccano e sapere *come*.
- **`explain` — racconta.** "Spiegami questo sottosistema." Mette insieme nodi + archi + community e ti
  restituisce il senso strutturale: chi dipende da chi, dove vive la decisione.

Tre verbi, una mappa sola. Non leggo i fogli: chiedo alla mappa dei fogli.

## PERCHÉ CONTA (il risparmio vero)

**Semplice (il bambino):** invece di leggere tutto il libro per trovare una cosa, guardi l'indice e
vai dritto. **Vero dietro (l'esperto):** la risposta è O(sottografo), non O(repo) — non rileggo 515 file
da migliaia di token, interrogo una struttura già costruita. Il costo crolla, e la risposta è *più*
precisa perché è strutturale, non "ho letto e ho riassunto".

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_GRAPHIFY]] (perché esiste la mappa).
- **Usa gli altri LV1:** `query` ti porta nei [[EP_SEED_GRAPHIFY_L1_COMMUNITY]] (quartieri), `path`
  passa spesso dai [[EP_SEED_GRAPHIFY_L1_GODNODE]] (i nodi-dio sono i crocevia).
- **Aggancio Nina:** è il "come si usa" della Grande Mappa — Nina non legge tutti i fogli, *chiede alla
  mappa e segue i fili* (`EP_AV_04`).

> Episodio di **approfondimento (LV1)**. Nessun limite di profondità: sotto `path` ci può stare un LV2
> sugli algoritmi di cammino, se servirà.

## FATTI (per il RAG)

- **FATTO:** Il sistema Graphify introduce tre verbi di interrogazione del grafo: `query` (trova nodi), `path` (catena di nodi tra due punti), `explain` (struttura di un sottosistema con nodi + archi + community).

- **DECISIONE:** Interrogare il grafo invece di rileggere i file sorgente. **LOGICA:** La complessità scende da O(repo) a O(sottografo), evitando la rilettura di 515 file da migliaia di token per ogni domanda strutturale.

- **FATTO:** Il verbo `path` non restituisce solo gli estremi di una connessione ma la catena completa di nodi intermedi — risponde a *come* due componenti si toccano, non solo *che* si toccano.

- **FATTO:** Il verbo `explain` aggrega nodi, archi e community per restituire la struttura di dipendenza di un sottosistema (chi dipende da chi, dove vive la decisione), senza rileggere il codice sorgente.
