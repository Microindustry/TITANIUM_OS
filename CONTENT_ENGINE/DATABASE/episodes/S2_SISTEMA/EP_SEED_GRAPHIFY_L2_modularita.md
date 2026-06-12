---
id: EP_SEED_GRAPHIFY_L2_MODULARITA
title: La modularità — il voto che decide i quartieri
sottotitolo: Approfondimento LV2 · la singola misura che dice se una divisione in gruppi è "buona", e come la si massimizza
stagione: ST
parent: EP_SEED_GRAPHIFY_L1_COMMUNITY
level: 2
data_evento: 2026-06-07
tags: [graphify, modularita, louvain, community, grafo, lv2, approfondimento]
status: ready
durata_min: 5
---
<!-- TOC -->

- [La modularità  il voto che decide i quartieri](#la-modularità-il-voto-che-decide-i-quartieri)
    - [Approfondimento LV2 di EP_SEED_GRAPHIFY_L1_COMMUNITY  come fa lalgoritmo a sapere se ha diviso bene?](#approfondimento-lv2-di-epseedgraphifyl1community-come-fa-lalgoritmo-a-sapere-se-ha-diviso-bene)
  - [DA DOVE VIENE (un livello più giù)](#da-dove-viene-un-livello-più-giù)
  - [LA DOMANDA](#la-domanda)
  - [COSA MISURA (semplice, poi preciso)](#cosa-misura-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO](#il-filo)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# La modularità — il voto che decide i quartieri
### Approfondimento LV2 di [[EP_SEED_GRAPHIFY_L1_COMMUNITY]] · "come fa l'algoritmo a sapere se ha diviso bene?"

## DA DOVE VIENE (un livello più giù)

Nel livello sopra (i quartieri) ho detto che l'algoritmo "massimizza la **modularità**" e sono andato
avanti. Ma quella parola è tutto il segreto: è il **voto** che dice se una divisione in gruppi è buona o
no. Qui scendo a vederla — è il punto in cui la community detection smette di essere magia.

## LA DOMANDA

Hai diviso 6.000 nodi in 696 gruppi. Come fai a sapere se è una **buona** divisione e non una a caso? Ti
serve un **numero unico** che premi le divisioni sensate e punisca quelle stupide. Qual è?

## COSA MISURA (semplice, poi preciso)

**Semplice (il papà meccanico):** un buon reparto è quello dove la gente parla **tanto dentro** e **poco
fuori**. Se due reparti si parlano più tra loro che al loro interno, li hai divisi male. La modularità
mette un voto a questo.

**Preciso (l'esperto):** la **modularità Q** confronta gli archi *dentro* i gruppi con quelli che ti
aspetteresti **per puro caso** (a parità di numero di connessioni per nodo). Q alto = i gruppi hanno molti
più legami interni del previsto → divisione vera, non casuale. Louvain/Leiden non fanno altro che cercare,
spostando nodi, la disposizione che **alza Q il più possibile**, fermandosi quando nessuno spostamento la
migliora. Una cosa onesta da sapere: Q ha un *limite di risoluzione* — sotto una certa scala tende a
fondere gruppetti veri; per quello a volte si gira con una "risoluzione" regolabile.

## PERCHÉ CONTA

1. **È un voto, non un'opinione:** la qualità della mappa dei quartieri è un numero, non un parere.
2. **Spiega la velocità:** massimizzare Q in modo goloso (greedy) è quasi-lineare → i 13 secondi del seme.
3. **Ti dice quando NON fidarti:** Q bassa = non ci sono veri gruppi, è tutto mescolato. Saperlo evita di
   inventare struttura dove non c'è (niente teatro).

## IL FILO

- **Sale a:** [[EP_SEED_GRAPHIFY_L1_COMMUNITY]] → [[EP_SEED_GRAPHIFY]].
- **Aggancio Nina:** "parlano tanto dentro e poco fuori" è la regola del buon gruppo, spiegabile a un
  bambino con i banchi di scuola. La modularità è il voto del maestro.

> Approfondimento (LV2). Si può scendere ancora: sotto qui ci starebbe la formula esatta di Q (LV3).

## FATTI (per il RAG)

- **FATTO:** La modularità Q è la metrica numerica usata per valutare la qualità di una divisione in community su grafi; confronta gli archi interni ai gruppi con quelli attesi per caso a parità di grado dei nodi.

- **FATTO:** L'algoritmo Louvain/Leiden massimizza Q in modo greedy (quasi-lineare), spostando nodi finché nessuno spostamento migliora ulteriormente il valore.

- **PRECISIONE:** Q presenta un limite di risoluzione: sotto una certa scala tende a fondere comunità piccole reali; è regolabile tramite un parametro di "risoluzione".

- **FATTO:** Un valore di Q basso indica assenza di struttura reale nel grafo (nodi mescolati), segnale che non esistono community genuine da rilevare.

- **FATTO:** Nel contesto del progetto GRAPHIFY, la massimizzazione greedy di Q su 6.000 nodi suddivisi in 696 gruppi è stata eseguita in 13 secondi (riferimento al "seme").
