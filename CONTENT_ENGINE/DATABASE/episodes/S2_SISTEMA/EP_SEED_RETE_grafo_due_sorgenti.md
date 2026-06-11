---
id: EP_SEED_RETE
title: La RETE — vedere il sistema in 3D
sottotitolo: Una galassia t-SNE che era rotta. Due api_server in lotta, un indice vecchio, e il giorno in cui i 404 sono tornati 200.
stagione: ST
data_evento: 2026-06-10
tags: [rete, grafo, t-sne, three.js, graphify, rag, api, debugging, genesis]
status: ready
durata_min: 7
---
<!-- TOC -->

- [La RETE  vedere il sistema in 3D](#la-rete-vedere-il-sistema-in-3d)
  - [COLD OPEN](#cold-open)
  - [IL PROBLEMA](#il-problema)
  - [LAZIONE](#lazione)
  - [IL RISULTATO](#il-risultato)
  - [REEL_HOOK](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# La RETE — vedere il sistema in 3D

## COLD OPEN

La RETE è la galassia del sistema: ogni documento e ogni nodo come un punto nello
spazio, proiettati in 3D con t-SNE dentro Three.js. Ci ruoti dentro, vedi i grappoli,
capisci a colpo d'occhio cosa sta vicino a cosa. Bellissima — quando funziona.
Quel giorno non funzionava.

## IL PROBLEMA

La vista era **rotta**, e per un motivo doppio e infido:
- **due `api_server` in esecuzione** che si calpestavano sulla stessa porta;
- un **indice stale**, vecchio, che serviva dati che non c'erano più.

Risultato: gli endpoint della RETE rispondevano **404 e 500**. La galassia restava nera.
E una vista che non si fida dei suoi dati è peggio di una vista che non c'è.

## L'AZIONE

Due interventi, in ordine.

Primo, **architettura**: ho dato alla RETE due **sorgenti commutabili** con un toggle —
**Conoscenza (RAG)** e **Sistema (Graphify)**. Stessa identica *forma* dei dati in uscita,
così il **motore 3D è rimasto invariato**: nuovo endpoint `/api/graph/graphify` che parla
la stessa lingua di quello RAG, che ho **blindato** contro gli indici stale.

Secondo, **operazione**: un **restart pulito dell'API** ha ucciso il doppione e
ricaricato l'indice giusto. `/api/graph/graphify` e `/api/rag/vectors`:
**da 404/500 → 200**. Toggle Conoscenza/Sistema di nuovo **LIVE**.

## IL RISULTATO

La RETE ora mostra **due verità dello stesso mondo**: la conoscenza (cosa so, dal RAG)
e il sistema (come è fatto, da Graphify), nella stessa galassia navigabile. Verifica della
sessione: git pulito, build TypeScript a **0 errori**, RAG su GPU confermato. Non è solo
"riparato" — è diventato il punto da cui *guardo* il sistema invece di ricordarmelo.

La lezione vera: un bug di **due processi** sembrava un bug di codice. Era un bug di
**stato**. Il sistema me l'ha fatto vedere solo quando ha avuto una vista di sé stesso.

## REEL_HOOK

La vista più bella del mio sistema — una galassia 3D di tutti i miei dati — era nera.
Endpoint a 404 e 500. Il colpevole non era il codice: erano **due server** in lotta
sulla stessa porta e un indice vecchio.
Un toggle a due sorgenti, un restart pulito, e i 404 sono tornati 200.
Adesso il sistema non lo ricordo: lo guardo ruotare.

## FATTI (per il RAG)

- **FATTO:** la RETE è la galassia del sistema: ogni nodo/documento come punto, proiettato in 3D con **t-SNE** dentro **Three.js**, navigabile.
- **CAUSA (bug):** era rotta (endpoint a **404/500**) per **due `api_server` sulla stessa porta** + un **indice stale**. Bug di **STATO**, non di codice.
- **AZIONE:** toggle a **2 sorgenti** — **Conoscenza (RAG)** e **Sistema (Graphify)** — con *stessa forma dati* → motore 3D invariato; nuovo endpoint `/api/graph/graphify`; **restart pulito** → 200.
- **DECISIONE:** contratto dati identico tra le due sorgenti (disaccoppiamento: un'interfaccia, due implementazioni).
- **LOGICA:** una vista di sé stesso ha fatto trovare il bug; lo stato (processi/porte/indici) è invisibile finché non lo si guarda.
