---
id: EP_SEED_RETE_L1_TSNE
title: Da 5000 numeri a una galassia — il t-SNE
sottotitolo: Approfondimento LV1 · come si schiaccia un mondo a tante dimensioni in 3 che puoi ruotare con gli occhi
stagione: ST
parent: EP_SEED_RETE
level: 1
data_evento: 2026-06-10
tags: [rete, t-sne, embedding, dimensioni, three.js, approfondimento]
status: ready
durata_min: 6
---
<!-- TOC -->

- [Da 5000 numeri a una galassia  il t-SNE](#da-5000-numeri-a-una-galassia-il-t-sne)
    - [Approfondimento LV1 di EP_SEED_RETE_grafo_due_sorgentiEP_SEED_RETE  vedere con gli occhi una cosa che vive in 384 dimensioni](#approfondimento-lv1-di-epseedretegrafoduesorgentiepseedrete-vedere-con-gli-occhi-una-cosa-che-vive-in-384-dimensioni)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [COME FUNZIONA (semplice, poi preciso)](#come-funziona-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Da 5000 numeri a una galassia — il t-SNE
### Approfondimento LV1 di [[EP_SEED_RETE_grafo_due_sorgenti|EP_SEED_RETE]] · "vedere con gli occhi una cosa che vive in 384 dimensioni"

## DA DOVE VIENE

Nel principale dico che la RETE proietta ogni dato "in 3D con t-SNE dentro Three.js". Parola passata
veloce. Qui spiego il trucco che rende possibile *vedere* il sistema: come si passa da una montagna di
numeri a una galassia che puoi ruotare con il dito.

## LA DOMANDA

Ogni documento, nel RAG, è un **vettore**: una lista di ~384 numeri che ne cattura il significato. Il
computer ci lavora benissimo. Ma io ho due occhi e uno schermo: **non vedo in 384 dimensioni**. La
domanda è: come faccio a *guardare* qualcosa che vive in uno spazio che non posso immaginare?

## COME FUNZIONA (semplice, poi preciso)

**Semplice (il papà meccanico):** è come fare la **fotografia** di una scultura. La scultura è 3D, la
foto è 2D — perdi qualcosa, ma scegli l'angolo che tiene insieme le cose che stanno vicine. Il t-SNE fa
la foto: schiaccia tante dimensioni in poche, **tenendo vicini i punti che erano vicini davvero**.

**Preciso (l'esperto):** il **t-SNE** non conserva le distanze esatte, conserva il **vicinato**. Guarda
chi è simile a chi nello spazio grande e cerca una disposizione in 3D dove quei simili restano
raggruppati. Per questo vedi *grappoli*: non sono decorazione, sono temi che si tengono. (È il motivo
per cui non leggi i numeri sugli assi: contano le **vicinanze**, non le coordinate.)

## PERCHÉ CONTA

1. **Capisci a colpo d'occhio.** Un grappolo denso = un'area di sapere fitta; un punto isolato = una nota
   orfana. Lo vedi in un secondo, senza aprire niente.
2. **Trovi i buchi.** Spazi vuoti nella galassia = argomenti su cui ho poco. La mappa mostra anche ciò
   che *manca*.
3. **È onesto.** La foto può ingannare se la scambi per la realtà: il t-SNE avvicina, non misura. Saperlo
   ti tiene dal trarre conclusioni sbagliate dalle distanze.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_RETE_grafo_due_sorgenti|EP_SEED_RETE]] (la galassia 3D del sistema).
- **Fratelli LV1:** [[EP_SEED_RETE_L1_TOGGLE]] (le due sorgenti), [[EP_SEED_RETE_L1_BUGSTATO]] (il bug di stato).
- **Aggancio Nina:** "fare la foto di una cosa che non si può vedere tutta intera" — una metafora pronta
  per spiegare a un bambino cos'è un *embedding* senza dire la parola.

> Approfondimento (LV1). Profondità libera: sotto può stare un LV2 su PCA/UMAP vs t-SNE, se servirà.

## FATTI (per il RAG)

- **FATTO:** Ogni documento nel RAG di GENESIS è rappresentato come un vettore di ~384 numeri che ne cattura il significato semantico (embedding).

- **FATTO:** La visualizzazione della RETE usa t-SNE per ridurre i vettori a 384 dimensioni in 3 dimensioni, renderizzati via Three.js in una galassia interattiva ruotabile.

- **PRECISIONE:** Il t-SNE non conserva le distanze metriche esatte tra punti, ma conserva la struttura di **vicinato**: i punti simili nello spazio ad alta dimensione restano raggruppati nello spazio 3D ridotto.

- **FATTO:** Nella visualizzazione, grappoli densi indicano aree tematiche con molti documenti; punti isolati indicano note orfane; spazi vuoti indicano argomenti non coperti dalla base di conoscenza.
