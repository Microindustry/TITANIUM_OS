---
id: EP_SEED_GRAPHIFY_L2_CAMMINI
title: I cammini — come si trova la strada tra due nodi
sottotitolo: Approfondimento LV2 · cosa succede davvero quando chiedo "path" al grafo: la ricerca della via più corta
stagione: ST
parent: EP_SEED_GRAPHIFY_L1_QUERY
level: 2
data_evento: 2026-06-07
tags: [graphify, path, bfs, cammino-minimo, grafo, lv2, approfondimento]
status: ready
durata_min: 5
---
<!-- TOC -->

- [I cammini  come si trova la strada tra due nodi](#i-cammini-come-si-trova-la-strada-tra-due-nodi)
    - [Approfondimento LV2 di EP_SEED_GRAPHIFY_L1_QUERY  cosa fa, dentro, il verbo path](#approfondimento-lv2-di-epseedgraphifyl1query-cosa-fa-dentro-il-verbo-path)
  - [DA DOVE VIENE (un livello più giù)](#da-dove-viene-un-livello-più-giù)
  - [LA DOMANDA](#la-domanda)
  - [COME SI CERCA LA STRADA (semplice, poi preciso)](#come-si-cerca-la-strada-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO](#il-filo)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# I cammini — come si trova la strada tra due nodi
### Approfondimento LV2 di [[EP_SEED_GRAPHIFY_L1_QUERY]] · "cosa fa, dentro, il verbo path"

## DA DOVE VIENE (un livello più giù)

Nel livello sopra ho detto che `path` "ti dà la catena di nodi che unisce due cose". Ma *come* la trova, tra
milioni di percorsi possibili? Qui scendo sul motore: la ricerca del **cammino più corto**.

## LA DOMANDA

Tra il watcher notturno e la dashboard ci sono mille strade nel grafo. Io ne voglio **una**, e la voglio
**corta** (i passaggi che contano, non un giro lunghissimo). Come la trovo senza provarle tutte?

## COME SI CERCA LA STRADA (semplice, poi preciso)

**Semplice (il papà meccanico):** parti dal punto A e ti allarghi a cerchi — prima tutti i vicini, poi i
vicini dei vicini — finché tocchi B. La prima volta che lo tocchi, **sei arrivato per la via più corta**,
perché ti sei allargato in modo ordinato.

**Preciso (l'esperto):** è una **BFS** (ricerca in ampiezza): esplori il grafo a strati di distanza
crescente. Il primo strato che raggiunge la destinazione è il **cammino minimo** in numero di salti. Se gli
archi hanno un "peso" (non tutti i legami contano uguale) si passa a **Dijkstra**, stessa idea ma a costo
minimo invece che a salti minimi. In entrambi i casi: niente forza bruta, si esplora con ordine e ci si
ferma appena si arriva.

## PERCHÉ CONTA

1. **Spiega le dipendenze:** il cammino più corto tra due nodi è *come* l'uno influenza l'altro — la catena
   reale, non una vaga "sono collegati".
2. **Trova i colli di bottiglia:** se tutti i cammini passano da un nodo, quello è un crocevia (lega i
   [[EP_SEED_GRAPHIFY_L1_GODNODE]]).
3. **È efficiente:** esplori solo quel che serve per arrivare, non tutto il grafo.

## IL FILO

- **Sale a:** [[EP_SEED_GRAPHIFY_L1_QUERY]] → [[EP_SEED_GRAPHIFY]].
- **Aggancio Nina:** "allargarsi a cerchi finché tocchi la meta" è un gioco da spiegare a un bambino (la
  caccia al tesoro in cui controlli prima le stanze vicine). È la BFS, senza la parola.

> Approfondimento (LV2). Profondità libera: sotto, A* e le euristiche (LV3).

## FATTI (per il RAG)

- **FATTO:** L'episodio è classificato come approfondimento LV2, figlio di EP_SEED_GRAPHIFY_L1_QUERY, e appartiene alla stagione ST del progetto TITANIUM_OS. Durata stimata: 5 minuti.

- **FATTO:** L'algoritmo descritto per trovare il cammino minimo su grafi con archi non pesati è la BFS (ricerca in ampiezza): esplora il grafo a strati di distanza crescente e si ferma al primo strato che raggiunge la destinazione, garantendo il minimo numero di salti.

- **FATTO:** Quando gli archi hanno un peso (i legami non contano tutti uguale), l'algoritmo indicato è Dijkstra, che opera a costo minimo invece che a salti minimi.

- **DECISIONE:** Il livello successivo di approfondimento previsto (LV3) riguarda A* e le euristiche, esplicitamente indicato come sviluppo futuro del cammino formativo su questo argomento.
