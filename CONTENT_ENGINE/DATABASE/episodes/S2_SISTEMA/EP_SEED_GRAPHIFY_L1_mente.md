---
id: EP_SEED_GRAPHIFY_L1_MENTE
title: Perché MENTE si estrae a mano — l'estrattore ibrido
sottotitolo: Approfondimento LV1 · il grafo del codice è automatico; quello dei documenti sensibili no, e c'è un motivo
stagione: ST
parent: EP_SEED_GRAPHIFY
level: 1
data_evento: 2026-06-07
tags: [graphify, mente, estrattore, ibrido, sensibilita, 7b-locale, approfondimento]
status: ready
durata_min: 6
---
<!-- TOC -->

- [Perché MENTE si estrae a mano  lestrattore ibrido](#perché-mente-si-estrae-a-mano-lestrattore-ibrido)
    - [Approfondimento LV1 di EP_SEED_GRAPHIFY  non tutto il sapere si dà in pasto a una macchina](#approfondimento-lv1-di-epseedgraphify-non-tutto-il-sapere-si-dà-in-pasto-a-una-macchina)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [LA SCELTA IBRIDA (semplice, poi preciso)](#la-scelta-ibrida-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Perché MENTE si estrae a mano — l'estrattore ibrido
### Approfondimento LV1 di [[EP_SEED_GRAPHIFY]] · "non tutto il sapere si dà in pasto a una macchina"

## DA DOVE VIENE

Il principale chiude con una riga importante: *"sull'estrazione da MENTE/ ho deciso un approccio
ibrido"*. Questo livello spiega quella decisione — è la più delicata di tutto Graphify, perché tocca
i **dati sensibili** (ricette, misure vere, IP).

## LA DOMANDA

Graphify sul codice è facile: il codice è pubblico nel repo, lo do in pasto al motore e in 13 secondi
ho la mappa. Ma `MENTE/` non è codice: sono i **documenti veri** — brevetti, ricette MIMS, decisioni
d'officina. La domanda è: *posso costruire il grafo anche di questi senza che escano e senza che un
modello debole li capisca male?*

## LA SCELTA IBRIDA (semplice, poi preciso)

**Semplice (il papà meccanico):** alcune cose le lasci fare alla macchina (tagliare cento pezzi uguali);
altre le fai a mano, con calma, perché sbagliare costa caro (la saldatura sul pezzo buono). MENTE è la
saldatura sul pezzo buono.

**Preciso (l'esperto):** il **7B locale** (il modello piccolo, in casa, sulla GPU) è bravo per il codice
ma **debole sui documenti sfumati** — su un testo tecnico-legale tira a indovinare le relazioni e crea
collegamenti falsi. E i documenti sensibili **non possono uscire** verso un modello in cloud. Quindi:
**ibrido**. Il codice → grafo automatico. MENTE → estrazione *curata*, costruita con cura sui pezzi che
contano, non a pioggia. Meglio meno nodi giusti che tanti nodi inventati su materiale che vale.

## PERCHÉ CONTA

1. **Protegge il sapere** (regola 8 del sistema): l'IP non si dà a un modello che potrebbe capirlo male
   o farlo uscire. *(lega [[project_mims_ip]])*
2. **Niente teatro:** un grafo di MENTE pieno di collegamenti sbagliati sarebbe peggio del niente —
   sembrerebbe sapere e mentirebbe. Meglio onesto e parziale.
3. **È una decisione, non una pigrizia:** l'automatico dove regge, la mano dove serve giudizio.

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_GRAPHIFY]] (il grafo del repo).
- **Tocca il RAG:** MENTE è anche la fonte del RAG ([[project_storie_n_livelli]] · l'arco ⟡4) — qui si
  decide *come* quella stessa fonte diventa grafo.
- **Aggancio Nina:** è la lezione "non tutto si dà in pasto alla macchina" — un concetto da papà che in
  Nina diventa una scelta del personaggio (cosa fidare alla Mente piccola e cosa tenere in casa).

> Episodio di **approfondimento (LV1)**. Profondità libera: sotto può nascere un LV2 sull'estrattore vero.

## FATTI (per il RAG)

- **DECISIONE:** L'estrazione del grafo da `MENTE/` (documenti sensibili) è ibrida: codice → grafo automatico; documenti MENTE → estrazione manuale e curata. **LOGICA:** Il modello 7B locale è considerato debole sui documenti sfumati e crea collegamenti falsi; i documenti sensibili non possono uscire verso modelli cloud.

- **FATTO:** Il grafo del codice (repo) viene costruito automaticamente dal motore Graphify in 13 secondi.

- **FATTO:** I documenti in `MENTE/` contengono materiale classificato come IP sensibile: brevetti, ricette MIMS, decisioni d'officina. Questi non vengono processati dal modello 7B locale né inviati a modelli cloud.

- **OBIETTIVO:** Il criterio di qualità del grafo MENTE è esplicito: preferire meno nodi corretti a tanti nodi inventati — un grafo con collegamenti falsi su materiale IP è considerato peggiore del niente.

- **DECISIONE:** Il modello utilizzato per l'estrazione automatica del codice è un 7B in esecuzione locale su GPU, non un modello cloud.
