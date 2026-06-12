---
id: EP_SEED_WATCHER_L1_TIER
title: Chi guardare più spesso — il tier a rotazione 48h
sottotitolo: Approfondimento LV1 · come si segue chi conta senza rivedere sempre gli stessi e senza perdere gli altri
stagione: ST
parent: EP_SEED_WATCHER
level: 1
data_evento: 2026-06-07
tags: [watcher, tier, rotazione, scheduling, ridondanza, approfondimento]
status: ready
durata_min: 5
---
<!-- TOC -->

- [Chi guardare più spesso  il tier a rotazione 48h](#chi-guardare-più-spesso-il-tier-a-rotazione-48h)
    - [Approfondimento LV1 di EP_SEED_WATCHER  non tutti meritano la stessa attenzione, ogni giorno](#approfondimento-lv1-di-epseedwatcher-non-tutti-meritano-la-stessa-attenzione-ogni-giorno)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [COME FUNZIONA (semplice, poi preciso)](#come-funziona-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Chi guardare più spesso — il tier a rotazione 48h
### Approfondimento LV1 di [[EP_SEED_WATCHER]] · "non tutti meritano la stessa attenzione, ogni giorno"

## DA DOVE VIENE

Il principale nomina "tier con finestra 48h e rotazione" e tira dritto. È la logica che decide **dove
punta il radar ogni notte**: il pezzo che evita sia lo spreco sia i buchi. Qui la apro.

## LA DOMANDA

Ho 30+ creator da seguire. Se li guardo **tutti ogni notte**, sprecro tempo e rivedo le stesse cose
(ridondanza). Se ne guardo **pochi e sempre quelli**, perdo gli altri. La domanda: come do più attenzione
a chi conta di più, **senza** dimenticare il resto?

## COME FUNZIONA (semplice, poi preciso)

**Semplice (il papà meccanico):** i clienti grossi li chiami spesso, i piccoli a turno. Nessuno resta
senza chiamata, ma non chiami tutti ogni giorno.

**Preciso (l'esperto):** ogni fonte ha un **tier** (quanto conta). I tier alti vengono guardati a ogni
giro; i tier bassi **a rotazione**, un sottoinsieme diverso ogni volta. La **finestra 48h** evita la
ridondanza: se ho già visto una fonte di recente, non la rivedo subito. Risultato: copertura completa
**nel tempo**, costo basso **ogni notte**. È scheduling, non casualità.

## PERCHÉ CONTA

1. **Efficienza onesta:** spendi attenzione dove rende, senza fingere di leggere tutto.
2. **Niente buchi:** la rotazione garantisce che prima o poi tutti tornano.
3. **Regolabile:** alzi/abbassi un tier e cambi la priorità senza riscrivere il nodo.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_WATCHER]].
- **Fratelli LV1:** [[EP_SEED_WATCHER_L1_KEYLESS]] (da dove guarda), [[EP_SEED_WATCHER_L1_GATE]] (cosa tiene).
- **Aggancio Nina:** "i clienti grossi spesso, i piccoli a turno" — una lezione di **priorità e
  attenzione** semplicissima da animare.

> Approfondimento (LV1). Profondità libera.

## FATTI (per il RAG)

- **FATTO:** Il sistema Watcher gestisce 30+ creator/fonti da monitorare in parallelo.

- **DECISIONE:** Le fonti vengono classificate per **tier** (livello di importanza); i tier alti vengono controllati a ogni ciclo, i tier bassi a rotazione su un sottoinsieme diverso ogni volta. **LOGICA:** Evita sia la ridondanza (rivedere sempre gli stessi) sia i buchi (dimenticare i minori).

- **FATTO:** La **finestra di 48h** è il parametro che impedisce di riesaminare una fonte già vista di recente, abbassando il costo per ciclo notturno.

- **DECISIONE:** La copertura totale è garantita **nel tempo** (rotazione), non ogni singola notte. **LOGICA:** Scheduling deterministico, non casualità.
