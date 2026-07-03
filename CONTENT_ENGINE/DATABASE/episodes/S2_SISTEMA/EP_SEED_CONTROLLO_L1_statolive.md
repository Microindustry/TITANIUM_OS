---
id: EP_SEED_CONTROLLO_L1_STATOLIVE
title: Se è acceso, non se dovrebbe — lo stato live
sottotitolo: Approfondimento LV1 · la differenza tra un quadro che promette e uno che dice la verità adesso
stagione: ST
parent: EP_SEED_CONTROLLO
level: 1
data_evento: 2026-06-07
tags: [controllo, stato-live, watchdog, badge, verita, anti-teatro, approfondimento]
status: ready
durata_min: 5
---
<!-- TOC -->

- [Se è acceso, non se dovrebbe  lo stato live](#se-è-acceso-non-se-dovrebbe-lo-stato-live)
    - [Approfondimento LV1 di EP_SEED_CONTROLLO_anti_sovraccaricoEP_SEED_CONTROLLO  stato vero, non promesse](#approfondimento-lv1-di-epseedcontrolloantisovraccaricoepseedcontrollo-stato-vero-non-promesse)
  - [DA DOVE VIENE](#da-dove-viene)
  - [LA DOMANDA](#la-domanda)
  - [COME FUNZIONA (semplice, poi preciso)](#come-funziona-semplice-poi-preciso)
  - [PERCHÉ CONTA](#perché-conta)
  - [IL FILO CON GLI ALTRI LIVELLI](#il-filo-con-gli-altri-livelli)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Se è acceso, non se dovrebbe — lo stato live
### Approfondimento LV1 di [[EP_SEED_CONTROLLO_anti_sovraccarico|EP_SEED_CONTROLLO]] · "stato vero, non promesse"

## DA DOVE VIENE

Il principale lo elenca come una delle tre cose per nodo: **se è acceso (stato live, non una promessa)**.
È la riga che separa il Centro di Controllo da un bel disegno. Qui spiego perché "live" è tutto.

## LA DOMANDA

Una dashboard può scrivere "n8n: ATTIVO" perché *qualcuno l'ha scritto una volta*. Ma è acceso **adesso**?
La domanda: come faccio in modo che il quadro dica la verità di *questo momento*, non un'intenzione vecchia?

## COME FUNZIONA (semplice, poi preciso)

**Semplice (il papà meccanico):** la spia dell'olio non è un adesivo che dice "olio a posto". È una spia
**collegata** al sensore: se si accende, è perché *ora* manca. Un adesivo mente; una spia no.

**Preciso (l'esperto):** il badge di ogni nodo non è un testo fisso, è **collegato a un controllo reale** —
lo stato arriva da un watchdog che verifica davvero (il processo risponde? la porta è aperta? l'ultimo giro
è andato a buon fine?). Verde = verificato adesso. È l'opposto del **dashboard-teatro**: niente cosa
dichiarata "attiva" che non lo è. Se non posso misurarlo, non lo scrivo verde.

## PERCHÉ CONTA

1. **Ti puoi fidare del quadro:** decidi guardando, senza andare a controllare a mano (è tutto il punto del
   Centro di Controllo).
2. **Niente teatro** (regola di casa): uno stato falso è peggio di nessuno stato — ti fa credere che vada,
   e non te ne accorgi finché non si rompe qualcosa.
3. **Scopre i bug di stato:** è proprio una vista live che ha fatto trovare i due server in lotta della RETE
   ([[EP_SEED_RETE_L1_BUGSTATO]]).

## IL FILO CON GLI ALTRI LIVELLI

- **Sale al principale:** [[EP_SEED_CONTROLLO_anti_sovraccarico|EP_SEED_CONTROLLO]] (il posto unico da cui governo).
- **Fratelli LV1:** [[EP_SEED_CONTROLLO_L1_SCAFFOLDING]] (perché togliermi carico), [[EP_SEED_CONTROLLO_L1_CEDIBILE]] (perché in italiano semplice).
- **Aggancio Nina:** "la spia collegata vs l'adesivo" — una metafora pulita per insegnare la differenza tra
  *dire* una cosa e *verificarla*.

> Approfondimento (LV1). Profondità libera.

## FATTI (per il RAG)

- **FATTO:** Il Centro di Controllo di TITANIUM_OS distingue tra "stato dichiarato" e "stato live": il badge di ogni nodo è collegato a un watchdog che verifica attivamente (processo risponde? porta aperta? ultimo ciclo andato a buon fine?), non a un testo fisso scritto una volta.

- **DECISIONE:** Verde su un badge = verificato in tempo reale dal watchdog. **LOGICA:** Uno stato falso è considerato peggiore di nessuno stato — fa credere che tutto funzioni e ritarda la scoperta del problema.

- **PRINCIPIO:** Se uno stato non è misurabile in tempo reale, non viene scritto verde. **LOGICA:** Anti-teatro: nessun nodo viene dichiarato attivo se non è verificabile adesso.

- **FATTO:** Una vista live ha individuato un conflitto tra due server nella rete di TITANIUM_OS (episodio di riferimento: EP_SEED_RETE_L1_BUGSTATO), citato come esempio concreto dell'utilità del monitoraggio in tempo reale rispetto allo stato dichiarato.
