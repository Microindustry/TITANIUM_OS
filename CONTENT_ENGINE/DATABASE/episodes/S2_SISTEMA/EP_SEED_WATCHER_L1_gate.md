---
id: EP_SEED_WATCHER_L1_GATE
title: Il gate di rilevanza — tenere il segnale, buttare il rumore
sottotitolo: Approfondimento LV1 · 97 segnali grezzi non servono a niente se non separi ciò che conta da ciò che è chiasso
stagione: ST
parent: EP_SEED_WATCHER
level: 1
data_evento: 2026-06-07
tags: [watcher, rilevanza, filtro, segnale-rumore, min-rel, approfondimento]
status: ready
durata_min: 5
---
<!-- TOC -->

- [Il gate di rilevanza  tenere il segnale, buttare il rumore](#il-gate-di-rilevanza-tenere-il-segnale-buttare-il-rumore)
    - [Approfondimento LV1 di EP_SEED_WATCHER  raccogliere è facile, scegliere è il lavoro](#approfondimento-lv1-di-epseedwatcher-raccogliere-è-facile-scegliere-è-il-lavoro)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [COME FUNZIONA (semplice, poi preciso)](#come-funziona-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)

<!-- /TOC -->


# Il gate di rilevanza — tenere il segnale, buttare il rumore
### Approfondimento LV1 di [[EP_SEED_WATCHER]] · "raccogliere è facile, scegliere è il lavoro"

## DA DOVE VIENE

Il principale dice che la notizia arriva "già filtrata per rilevanza". Quel *filtrata* è la differenza tra
un radar utile e un altro feed che ti annega. Qui spiego il **gate**: la porta che decide cosa passa.

## LA DOMANDA

Al primo giro il watcher ha raccolto ~97 segnali grezzi. Ma 97 cose buttate addosso non sono informazione:
sono **rumore**. La domanda: come tengo i 5 che cambiano qualcosa per me e lascio fuori i 92 che non
contano — *senza* leggerli tutti a mano?

## COME FUNZIONA (semplice, poi preciso)

**Semplice (il papà meccanico):** il controllo qualità a fine linea. Non tieni tutti i pezzi: tieni quelli
dentro tolleranza, gli altri scartano. Il gate è il calibro: passa / non passa.

**Preciso (l'esperto):** ogni segnale prende un **punteggio di rilevanza** (quanto è vicino ai temi che mi
interessano). Una **soglia** (`min-rel`) fa da porta: sotto, scarta; sopra, tiene. È lo stesso principio del
gate che ho messo sulla ricerca notturna (`--min-rel`) per non infilare spazzatura nel RAG. Meglio **pochi
e veri** che tanti e a caso — la regola "niente teatro" applicata ai dati in ingresso.

## PERCHÉ CONTA

1. **Protegge la tua attenzione:** la risorsa più scarsa non è l'informazione, è il tempo per leggerla.
2. **Protegge il sistema a valle:** rumore filtrato a monte = RAG e brief più puliti.
3. **È una manopola:** alzi la soglia se arriva troppo, la abbassi se temi di perderti qualcosa.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_WATCHER]].
- **Fratelli LV1:** [[EP_SEED_WATCHER_L1_KEYLESS]], [[EP_SEED_WATCHER_L1_TIER]].
- **Aggancio Nina:** "il calibro passa/non passa" — una soglia è un concetto perfetto per i bambini: una
  porta che fa entrare solo le cose abbastanza importanti.

> Approfondimento (LV1). Nessun tetto di profondità.
