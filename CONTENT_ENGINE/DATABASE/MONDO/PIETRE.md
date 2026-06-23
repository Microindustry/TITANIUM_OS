<!-- TOC -->

- [PIETRE  lindice dei concetti (concetto  episodio)](#pietre-lindice-dei-concetti-concetto-episodio)
- [Verticale: Tech  la Storia dellIA](#verticale-tech-la-storia-dellia)
  - [0  LA MATERIA  (4 episodi)](#0-la-materia-4-episodi)
  - [1  LA TRACCIA  (2 episodi)](#1-la-traccia-2-episodi)
  - [2  LOFFICINA CHE GIRA SOLA  (7 episodi)](#2-lofficina-che-gira-sola-7-episodi)
  - [3  LA MENTE CHE PARLA  (3 episodi)](#3-la-mente-che-parla-3-episodi)
  - [4  LA BIBLIOTECA DELLE FONTI  (3 episodi)](#4-la-biblioteca-delle-fonti-3-episodi)
  - [5  LA GRANDE MAPPA  (16 episodi)](#5-la-grande-mappa-16-episodi)
  - [6  LESERCITO SILENZIOSO  (3 episodi)](#6-lesercito-silenzioso-3-episodi)
  - [7  IL DIRETTORE  (7 episodi)](#7-il-direttore-7-episodi)
- [Verticale: Finanza personale](#verticale-finanza-personale)
  - [1  IL VALORE  (1 episodi)](#1-il-valore-1-episodi)
  - [2  SPENDERE MENO DI QUANTO ENTRA  (0 episodi)](#2-spendere-meno-di-quanto-entra-0-episodi)
  - [3  IL CUSCINETTO  (0 episodi)](#3-il-cuscinetto-0-episodi)
  - [4  FAR LAVORARE I SOLDI  (0 episodi)](#4-far-lavorare-i-soldi-0-episodi)

<!-- /TOC -->

# PIETRE — l'indice dei concetti (concetto → episodio)

*Generato da `generate_pietre_index.py` il 2026-06-23 — VISTA dell'`asse_nina`*
*in `episodes.json`. Non si edita a mano: si rigenera dopo `build_episodes_json.py`.*

> Ogni **Pietra** è un concetto fondante. Due verticali: **Tech** (⟡, l'arco IA) e
> **Finanza** (₣, l'asse "di lato"). Sotto ciascuna Pietra gli episodi che la **fondano**
> o **approfondiscono**, per *giro di spirale*. `fonte` = tecnico · `adattato` = episodio Nina.

---

# Verticale: Tech · la Storia dell'IA

## ⟡0 · LA MATERIA  (4 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_FILONE_00` La Materia — il telaio, la scelta, il controllo | la materia: scelta, controllo, precisione | fonte | — |
| 1 | `EP_N2_01` La Bambina che Chiedeva Perché | il gesto fatto bene sulla materia vera | adattato | — |
| 2 | `EP_N2_02` Il Soffio di Troppo | la precisione e' una relazione (il soffio di troppo) | adattato | — |
| 3 | `EP_N2_03` Mille Volte Uguale | la ripetibilita': mille volte uguale, battere la deriva | adattato | — |

## ⟡1 · LA TRACCIA  (2 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_10` La Traccia | il Grande Loop: la traccia che resta | adattato | ⟡0 |
| 1 | `EP_S0_00` Il Socio | il Socio: un gesto, più frutti | fonte | — |

## ⟡2 · L'OFFICINA CHE GIRA SOLA  (7 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_05` Prima la Mano, Poi la Macchina | prima la mano poi la macchina (automazione) | adattato | ⟡0 |
| 1 | `EP_N2_06` L'Officina che Gira Sola | l'automazione: insegnare un gesto a chi non si stanca | adattato | ⟡0 |
| 1 | `MOM_01_LA_PRIMA_AUTOMAZIONE` La Prima Automazione | la prima automazione | fonte | ⟡1 |
| 2 | `EP_SEED_WATCHER` AI News Watcher — restare sul pezzo senza chiavi | stare informati senza farlo a mano | fonte | ⟡1 |
| 3 | `EP_SEED_WATCHER_L1_GATE` Il gate di rilevanza — tenere il segnale, buttare il rumore | stare informati senza farlo a mano | fonte | ⟡1 |
| 3 | `EP_SEED_WATCHER_L1_KEYLESS` Guardare senza chiavi — gh, RSS, YouTube | stare informati senza farlo a mano | fonte | ⟡1 |
| 3 | `EP_SEED_WATCHER_L1_TIER` Chi guardare più spesso — il tier a rotazione 48h | stare informati senza farlo a mano | fonte | ⟡1 |

## ⟡3 · LA MENTE CHE PARLA  (3 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_07` La Mente che Parla | l'LLM, la mente che parla: indovina la parola probabile | adattato | ⟡2 |
| 1 | `EP_S2_01_IL_CERVELLO_IBRIDO` Il Cervello Ibrido | il cervello ibrido: cloud + locale | fonte | ⟡1 |
| 2 | `EP_N2_08` Quando la Mente Inventa | l'allucinazione della mente: da dove lo sai? | adattato | — |

## ⟡4 · LA BIBLIOTECA DELLE FONTI  (3 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_09` La Biblioteca delle Fonti | il RAG, la biblioteca delle fonti | adattato | ⟡3 |
| 1 | `EP_T05` Il Sistema Pensa | il sistema pensa: recupero con fonti | fonte | ⟡3 |
| 2 | `EP_T04` SINAPSI | SINAPSI: la memoria che collega | fonte | ⟡3 |

## ⟡5 · LA GRANDE MAPPA  (16 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_04` La Mappa Viva | la mappa viva: il sistema che dice la verita' | adattato | ⟡0 |
| 1 | `EP_SEED_GRAPHIFY` Graphify — il repo che si disegna da solo | la mappa della conoscenza | fonte | ⟡4 |
| 1 | `EP_T01` La Dashboard | la Dashboard: vedere il sistema | fonte | ⟡4 |
| 1 | `EP_T02` NeuroMap | NeuroMap: il sistema come mappa | fonte | ⟡4 |
| 2 | `EP_N2_11` La Grande Mappa | la Grande Mappa: il sapere come grafo | adattato | ⟡4 |
| 2 | `EP_SEED_GRAPHIFY_L1_COMMUNITY` I 696 quartieri — la community detection | la mappa della conoscenza | fonte | ⟡4 |
| 2 | `EP_SEED_GRAPHIFY_L1_GODNODE` I nodi-dio — le stelle che tengono il grafo | la mappa della conoscenza | fonte | ⟡4 |
| 2 | `EP_SEED_GRAPHIFY_L1_MENTE` Perché MENTE si estrae a mano — l'estrattore ibrido | la mappa della conoscenza | fonte | ⟡4 |
| 2 | `EP_SEED_GRAPHIFY_L1_QUERY` Interrogare la mappa, non i file — query, path, explain | la mappa della conoscenza | fonte | ⟡4 |
| 2 | `EP_SEED_RETE` La RETE — vedere il sistema in 3D | vedere il sistema come una mappa | fonte | ⟡4 |
| 3 | `EP_SEED_GRAPHIFY_L2_CAMMINI` I cammini — come si trova la strada tra due nodi | la mappa della conoscenza | fonte | ⟡4 |
| 3 | `EP_SEED_GRAPHIFY_L2_MODULARITA` La modularità — il voto che decide i quartieri | la mappa della conoscenza | fonte | ⟡4 |
| 3 | `EP_SEED_RETE_L1_BUGSTATO` Non era un bug di codice, era un bug di stato | vedere il sistema come una mappa | fonte | ⟡4 |
| 3 | `EP_SEED_RETE_L1_TOGGLE` Due verità dello stesso mondo — il toggle a due sorgenti | vedere il sistema come una mappa | fonte | ⟡4 |
| 3 | `EP_SEED_RETE_L1_TSNE` Da 5000 numeri a una galassia — il t-SNE | vedere il sistema come una mappa | fonte | ⟡4 |
| 4 | `EP_SEED_RETE_L2_UMAP` t-SNE contro UMAP — due modi di fare la foto | vedere il sistema come una mappa | fonte | ⟡4 |

## ⟡6 · L'ESERCITO SILENZIOSO  (3 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_12` L'Esercito Silenzioso | gli agenti: l'esercito silenzioso | adattato | ⟡2 ⟡1 |
| 1 | `MOM_03_L_ESERCITO` L'Esercito | l'esercito: tante entità che fanno | fonte | ⟡2 ⟡4 |
| 2 | `EP_N2_13` Il Soldato Caduto in Silenzio | il guasto silenzioso e il guardiano | adattato | ⟡1 |

## ⟡7 · IL DIRETTORE  (7 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_14` Il Direttore | l'orchestrazione: il direttore | adattato | ⟡6 ⟡0 |
| 1 | `EP_S2_02_L_ORCHESTRATORE` L'Orchestratore | l'orchestratore: chi fa cosa e quando | fonte | ⟡5 ⟡6 |
| 1 | `EP_SEED_CONTROLLO` Il Centro di Controllo — un posto solo da cui governare | un posto solo per governare il disordine | fonte | — |
| 2 | `EP_S2_03_LA_TELA` La Tela | la Tela: il calendario notturno | fonte | ⟡6 |
| 2 | `EP_SEED_CONTROLLO_L1_CEDIBILE` Un sistema spiegato è un sistema cedibile | un posto solo per governare il disordine | fonte | — |
| 2 | `EP_SEED_CONTROLLO_L1_SCAFFOLDING` Il carico va sullo schermo, non nella testa | un posto solo per governare il disordine | fonte | — |
| 2 | `EP_SEED_CONTROLLO_L1_STATOLIVE` Se è acceso, non se dovrebbe — lo stato live | un posto solo per governare il disordine | fonte | — |

---

# Verticale: Finanza personale

## ₣1 · IL VALORE  (1 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_N2_15` Il Valore | il valore: i soldi sono lavoro conservato + fiducia condivisa | adattato | — |

## ₣2 · SPENDERE MENO DI QUANTO ENTRA  (0 episodi)

*(ancora nessun episodio — Pietra da posare)*

## ₣3 · IL CUSCINETTO  (0 episodi)

*(ancora nessun episodio — Pietra da posare)*

## ₣4 · FAR LAVORARE I SOLDI  (0 episodi)

*(ancora nessun episodio — Pietra da posare)*

---

**Regola dei prerequisiti (spirale macro):** un episodio non può usare una Pietra non
ancora posata. `richiama` elenca le Pietre già note che riattiva (ripetizione spaziata).
⟡0 (la materia) è la radice dell'arco Tech; la richiamano tutte.
