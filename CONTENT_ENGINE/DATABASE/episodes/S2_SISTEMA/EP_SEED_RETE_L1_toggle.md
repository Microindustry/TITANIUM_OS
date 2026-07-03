---
id: EP_SEED_RETE_L1_TOGGLE
title: Due verità dello stesso mondo — il toggle a due sorgenti
sottotitolo: Approfondimento LV1 · Conoscenza (cosa so) e Sistema (come sono fatto) nella stessa galassia, senza toccare il motore 3D
stagione: ST
parent: EP_SEED_RETE
level: 1
data_evento: 2026-06-10
tags: [rete, toggle, rag, graphify, contratto-dati, api, approfondimento]
status: ready
durata_min: 6
---
<!-- TOC -->

- [Due verità dello stesso mondo  il toggle a due sorgenti](#due-verità-dello-stesso-mondo-il-toggle-a-due-sorgenti)
    - [Approfondimento LV1 di EP_SEED_RETE_grafo_due_sorgentiEP_SEED_RETE  la stessa galassia, due modi di guardarla](#approfondimento-lv1-di-epseedretegrafoduesorgentiepseedrete-la-stessa-galassia-due-modi-di-guardarla)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [IL TRUCCO: STESSA FORMA, MOTORE INVARIATO](#il-trucco-stessa-forma-motore-invariato)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Due verità dello stesso mondo — il toggle a due sorgenti
### Approfondimento LV1 di [[EP_SEED_RETE_grafo_due_sorgenti|EP_SEED_RETE]] · "la stessa galassia, due modi di guardarla"

## DA DOVE VIENE

Nel principale la riparazione introduce un toggle: **Conoscenza (RAG)** e **Sistema (Graphify)**. Sembra
un dettaglio da bottone. È invece la decisione di architettura che ha reso la RETE riusabile. Qui spiego
perché.

## LA DOMANDA

Avevo due grafi diversi: uno dei **documenti** (cosa so — il RAG) e uno della **struttura** (come è fatto
il sistema — Graphify). Volevo vederli **entrambi** nella stessa galassia 3D. La domanda: lo riscrivo due
volte il motore di visualizzazione (uno per sorgente), o c'è un modo per non duplicare niente?

## IL TRUCCO: STESSA FORMA, MOTORE INVARIATO

**Semplice (il papà meccanico):** è come l'attacco rapido del mandrino. Cambi la punta, ma l'**attacco**
è sempre lo stesso, così la macchina non la tocchi. Le punte sono le due sorgenti; l'attacco è la *forma
dei dati*.

**Preciso (l'esperto):** ho dato alle due sorgenti lo **stesso contratto dati** in uscita — nuovo endpoint
`/api/graph/graphify` che parla *identica* la lingua di quello RAG (stessi campi: nodi, archi, posizioni).
Così il **motore 3D è rimasto invariato**: non sa nemmeno quale sorgente sta disegnando. Il toggle cambia
solo *da dove arrivano i dati*, non *come si disegnano*. Un'interfaccia, due implementazioni — è il
disaccoppiamento fatto bene.

## PERCHÉ CONTA

1. **Non duplichi il lavoro** (né i bug): un motore solo da mantenere.
2. **Aggiungere una terza sorgente domani** costa poco: basta che rispetti il contratto.
3. **Due verità affiancate:** la conoscenza e la struttura nello stesso spazio → vedi se *quello che so*
   e *come sono fatto* combaciano o no. È diagnostica, non estetica.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_RETE_grafo_due_sorgenti|EP_SEED_RETE]] (la RETE riparata).
- **Fratelli LV1:** [[EP_SEED_RETE_L1_TSNE]] (come si disegna), [[EP_SEED_RETE_L1_BUGSTATO]] (perché si era rotta).
- **Lega altrove:** la sorgente "Sistema" è il grafo di [[EP_SEED_GRAPHIFY_grafo_del_repo|EP_SEED_GRAPHIFY]] — qui lo si *guarda* in 3D.
- **Aggancio Nina:** "lo stesso attacco, due punte" — metafora pronta per spiegare un'**interfaccia** (un
  patto sulla forma) a chi non programma.

> Approfondimento (LV1). Nessun tetto di profondità.

## FATTI (per il RAG)

- **DECISIONE:** Creato endpoint `/api/graph/graphify` con lo stesso contratto dati dell'endpoint RAG (campi identici: nodi, archi, posizioni). **LOGICA:** Permettere al motore di visualizzazione 3D di restare invariato indipendentemente dalla sorgente attiva.

- **FATTO:** Il sistema RETE espone un toggle a due sorgenti: **Conoscenza (RAG)** (grafo dei documenti) e **Sistema (Graphify)** (grafo della struttura del sistema). Entrambe alimentano lo stesso motore 3D.

- **DECISIONE:** Il motore 3D di visualizzazione è disaccoppiato dalle sorgenti dati: non conosce quale sorgente sta disegnando, riceve solo dati conformi al contratto. **LOGICA:** Un'interfaccia, due implementazioni — evita duplicazione di codice e bug.

- **OBIETTIVO:** La visualizzazione affiancata delle due sorgenti nella stessa galassia 3D serve come strumento diagnostico: verificare se "quello che il sistema sa" e "come il sistema è fatto" combaciano.

- **FATTO:** L'architettura a contratto dati condiviso è estensibile: aggiungere una terza sorgente richiede solo che rispetti il contratto in uscita, senza modificare il motore.
