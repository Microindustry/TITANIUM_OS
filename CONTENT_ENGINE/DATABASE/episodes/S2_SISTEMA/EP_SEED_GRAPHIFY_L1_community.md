---
id: EP_SEED_GRAPHIFY_L1_COMMUNITY
title: I 696 quartieri — la community detection
sottotitolo: Approfondimento LV1 · come un grafo si divide da solo in temi senza che nessuno glielo dica
stagione: ST
parent: EP_SEED_GRAPHIFY
level: 1
data_evento: 2026-06-07
tags: [graphify, community-detection, modularity, louvain, grafo, approfondimento]
status: ready
durata_min: 6
---
<!-- TOC -->

- [I 696 quartieri  la community detection](#i-696-quartieri-la-community-detection)
    - [Approfondimento LV1 di EP_SEED_GRAPHIFY  il grafo si divide da solo in temi](#approfondimento-lv1-di-epseedgraphify-il-grafo-si-divide-da-solo-in-temi)
  - [DA DOVE VIENE QUESTO APPROFONDIMENTO](#da-dove-viene-questo-approfondimento)
  - [LA DOMANDA](#la-domanda)
  - [COME FUNZIONA (semplice, poi preciso)](#come-funziona-semplice-poi-preciso)
  - [PERCHÉ CONTA PER IL SISTEMA](#perché-conta-per-il-sistema)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)

<!-- /TOC -->


# I 696 quartieri — la community detection
### Approfondimento LV1 di [[EP_SEED_GRAPHIFY]] · "il grafo si divide da solo in temi"

## DA DOVE VIENE QUESTO APPROFONDIMENTO

Nell'episodio principale (`EP_SEED_GRAPHIFY`) il dato passava veloce: *515 file → 5.966 nodi,
6.317 archi, **696 community** in 13,2 secondi*. Quel numero — **696** — meritava un livello in
più. Non l'ho deciso io a tavolino: i 696 gruppi sono **emersi** dalla struttura. Questo è
l'approfondimento che spiega *come*.

## LA DOMANDA

Hai una nuvola di 6.000 puntini legati da 6.000 fili. Nessuno ha mai messo un'etichetta. Eppure
alcuni puntini si tengono per mano fra loro molto più che col resto: i file dell'officina con i
file dell'officina, i moduli RAG coi moduli RAG, le notturne con le notturne.

La domanda è: **si possono trovare questi grumi senza saperli già?** Cioè — può il grafo
dividersi da solo nei suoi temi, invece che farmi taggare 515 file a mano?

## COME FUNZIONA (semplice, poi preciso)

**Semplice (il bambino / il papà fabbro):** immagina una festa. Non sai chi conosce chi, ma se
guardi *chi parla con chi*, vedi formarsi capannelli. Le persone che si parlano tanto fra loro,
e poco col resto, **sono un gruppo**. Nessuno ha fatto la lista degli invitati per tavolo: i
tavoli si sono formati da soli, guardando le chiacchiere.

**Preciso (l'esperto):** è la **community detection**. L'algoritmo cerca la divisione che
massimizza la **modularità** — una misura che premia i gruppi con *molti archi dentro* e *pochi
archi fuori*. Famiglia Louvain/Leiden: parte da ogni nodo come gruppo a sé, poi sposta i nodi nel
gruppo del vicino se questo **alza** la modularità, e ripete finché non migliora più. Il bello: è
quasi-lineare → per quello 6.000 nodi si chiudono in **secondi**, non in ore.

696 gruppi su 5.966 nodi vuol dire ~8-9 nodi a quartiere in media: una **granularità fine**, da
"sottosistema/tema", non da "tre macro-aree generiche". È il livello giusto per orientarsi.

## PERCHÉ CONTA PER IL SISTEMA

Tre cose concrete, non teoria:
1. **Orientamento gratis.** I quartieri sono un indice del repo che nessuno ha scritto a mano e
   che si **riaggiorna** quando il codice cambia. La mappa non invecchia.
2. **Trovare i ponti.** I nodi che stanno *fra* due quartieri (poche connessioni ma strategiche)
   sono i punti fragili: tocchi lì e muovi due mondi. La community detection li fa risaltare.
3. **Domande più strette.** Invece di "leggi tutto il repo", chiedo "cosa c'è nel quartiere RAG e
   come tocca quello delle notturne?" → meno token, risposta strutturale.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** `EP_SEED_GRAPHIFY` (la mappa intera, il salto RAG→Wiki).
- **Si lega in avanti (Nina):** è il "vero dietro" dei **quartieri** in `EP_AV_04 — La Grande Mappa`
  (i gruppi che si formano da soli, raccontati a un bambino). Questo LV1 è la fonte tecnica
  dettagliata su cui quella fiaba poggia.
- **Prossimi LV1 possibili sotto Graphify:** i *god-node* (i nodi-dio / centralità) · `query/path/explain`
  (come si interroga il grafo) · l'estrattore **ibrido** da `MENTE/` (sensibilità dei documenti).

> Questo è un episodio di **approfondimento (LV1)**: vive *sotto* il suo principale. Il sistema STORIE
> ora regge questa profondità — un episodio può avere figli, e i figli figli, all'infinito.
