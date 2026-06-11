---
id: EP_SEED_RETE_L2_UMAP
title: t-SNE contro UMAP — due modi di fare la foto
sottotitolo: Approfondimento LV2 · perché esistono due tecniche per schiacciare le dimensioni, e quando scegliere l'una o l'altra
stagione: ST
parent: EP_SEED_RETE_L1_TSNE
level: 2
data_evento: 2026-06-10
tags: [rete, t-sne, umap, riduzione-dimensioni, struttura-globale, lv2, approfondimento]
status: ready
durata_min: 5
---
<!-- TOC -->

- [t-SNE contro UMAP  due modi di fare la foto](#t-sne-contro-umap-due-modi-di-fare-la-foto)
    - [Approfondimento LV2 di EP_SEED_RETE_L1_TSNE  non cè una sola foto giusta](#approfondimento-lv2-di-epseedretel1tsne-non-cè-una-sola-foto-giusta)
  - [DA DOVE VIENE (un livello più giù)](#da-dove-viene-un-livello-più-giù)
  - [LA DOMANDA](#la-domanda)
  - [LA DIFFERENZA (semplice, poi preciso)](#la-differenza-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO](#il-filo)

<!-- /TOC -->


# t-SNE contro UMAP — due modi di fare la foto
### Approfondimento LV2 di [[EP_SEED_RETE_L1_TSNE]] · "non c'è una sola foto giusta"

## DA DOVE VIENE (un livello più giù)

Nel livello sopra ho detto che il t-SNE "fa la foto" tenendo vicini i punti vicini. Ma non è l'unica
tecnica per farlo: c'è **UMAP**, e sceglierne una invece dell'altra cambia *cosa* vedi. Qui scendo sulla
differenza, perché spiega perché certe galassie sembrano fatte di isole e altre di continenti.

## LA DOMANDA

Schiacciare 384 dimensioni in 3 vuol dire **buttare via** informazione. La domanda è: *quale* informazione
tieni? Le vicinanze piccole (chi è vicinissimo a chi) o anche le distanze grandi (quanto sono lontane due
intere zone)?

## LA DIFFERENZA (semplice, poi preciso)

**Semplice (il papà meccanico):** due fotografi. Uno fa **ritratti** perfetti dei gruppetti ma sballa le
distanze tra i gruppi. L'altro fa una **foto aerea**: i gruppi sono meno nitidi, ma capisci come sono
disposti nel paesaggio.

**Preciso (l'esperto):**
- **t-SNE** = il ritrattista. Cura il **vicinato locale** (i grappoli sono bellissimi e separati), ma le
  **distanze tra grappoli non sono affidabili** — due isole vicine sullo schermo possono essere lontane
  davvero.
- **UMAP** = la foto aerea. Tiene meglio la **struttura globale** (le distanze tra zone hanno più senso) ed
  è di solito **più veloce** su tanti punti.

Nessuna delle due è "la verità": sono due compromessi diversi sullo stesso sacrificio.

## PERCHÉ CONTA

1. **Leggi la galassia giusta:** se ti interessano i temi (grappoli) → t-SNE; se ti interessa come i temi
   si relazionano nel grande → UMAP.
2. **Eviti l'errore classico:** dare peso alle distanze in un t-SNE. Sapere *che foto stai guardando* ti
   salva da conclusioni sbagliate.
3. **È una manopola di prodotto:** la RETE può offrire l'una o l'altra a seconda della domanda.

## IL FILO

- **Sale a:** [[EP_SEED_RETE_L1_TSNE]] → [[EP_SEED_RETE]].
- **Aggancio Nina:** "il ritratto e la foto aerea" — due modi di guardare la stessa cosa, perfetti per
  insegnare a un bambino che *ogni mappa sceglie cosa mostrare e cosa perdere*.

> Approfondimento (LV2). Profondità libera.
