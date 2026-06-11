---
id: EP_SEED_RETE_L1_BUGSTATO
title: Non era un bug di codice, era un bug di stato
sottotitolo: Approfondimento LV1 · due server sulla stessa porta e un indice vecchio: il guasto più infido di tutti
stagione: ST
parent: EP_SEED_RETE
level: 1
data_evento: 2026-06-10
tags: [rete, debugging, stato, processi, porta, indice-stale, approfondimento]
status: ready
durata_min: 6
---
<!-- TOC -->

- [Non era un bug di codice, era un bug di stato](#non-era-un-bug-di-codice-era-un-bug-di-stato)
    - [Approfondimento LV1 di EP_SEED_RETE  il codice era giusto, il mondo intorno no](#approfondimento-lv1-di-epseedrete-il-codice-era-giusto-il-mondo-intorno-no)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [I DUE GUASTI DI STATO](#i-due-guasti-di-stato)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)

<!-- /TOC -->


# Non era un bug di codice, era un bug di stato
### Approfondimento LV1 di [[EP_SEED_RETE]] · "il codice era giusto, il mondo intorno no"

## DA DOVE VIENE

Il principale lo dice in una riga, ma è la lezione vera dell'episodio: *"un bug di due processi sembrava
un bug di codice. Era un bug di stato."* Qui la apro, perché è il tipo di guasto che ti fa perdere ore se
non lo riconosci.

## LA DOMANDA

La RETE era nera, gli endpoint a 404 e 500. Istinto: *ho sbagliato il codice*. Ho riletto, riletto,
riletto. Era giusto. La domanda allora cambia: *e se il codice fosse corretto, ma lo **stato** in cui gira
fosse sbagliato?*

## I DUE GUASTI DI STATO

**Semplice (il papà meccanico):** la macchina è a posto, ma hai **due operai** che premono lo stesso
pulsante in contemporanea e il pezzo che leggi è di **ieri**. Non è la macchina rotta: è la situazione
intorno.

**Preciso (l'esperto):** due guasti, nessuno nel codice.
1. **Due `api_server` sulla stessa porta:** due processi vivi che si calpestano — le richieste finiscono
   ora all'uno ora all'altro, in modo non deterministico. Il codice di entrambi è corretto; è *averli
   accesi tutti e due* a essere sbagliato.
2. **Indice stale:** il motore serviva un indice **vecchio**, dati che non c'erano più → 404/500 su roba
   che "doveva esserci".

La cura non è stata toccare il codice: **restart pulito** (uccide il doppione) + ricarico l'indice giusto.
404/500 → **200**.

## PERCHÉ CONTA

1. **Cambia dove guardi.** Davanti a un guasto, prima chiediti: *è il codice o è lo stato?* (processi vivi,
   porte, cache, indici, variabili d'ambiente). Metà delle ore perse sono qui.
2. **Lo stato è invisibile.** Non sta nei file: sta in cosa è *acceso adesso*. Per questo serve una vista
   dello stato (lega il Centro di Controllo, [[EP_SEED_CONTROLLO]]).
3. **Una vista di sé** te lo fa vedere: il sistema ha trovato il bug solo quando ha avuto uno specchio.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_RETE]] (la galassia riparata).
- **Fratelli LV1:** [[EP_SEED_RETE_L1_TSNE]], [[EP_SEED_RETE_L1_TOGGLE]].
- **Aggancio Nina:** "la macchina è giusta ma la situazione no" — un concetto potente per un bambino:
  l'errore non è sempre *nella cosa*, a volte è in *come è messa*. Candidato fonte per un'avventura di Nina.

> Approfondimento (LV1). Profondità libera.
