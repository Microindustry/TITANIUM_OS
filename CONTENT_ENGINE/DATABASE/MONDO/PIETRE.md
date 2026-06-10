<!-- TOC -->

- [PIETRE  lindice dellarco (concetto  episodio)](#pietre-lindice-dellarco-concetto-episodio)
  - [0  LA MATERIA  (1 episodi)](#0-la-materia-1-episodi)
  - [1  LA TRACCIA  (2 episodi)](#1-la-traccia-2-episodi)
  - [2  LOFFICINA CHE GIRA SOLA  (6 episodi)](#2-lofficina-che-gira-sola-6-episodi)
  - [3  LA MENTE CHE PARLA  (2 episodi)](#3-la-mente-che-parla-2-episodi)
  - [4  LA BIBLIOTECA DELLE FONTI  (3 episodi)](#4-la-biblioteca-delle-fonti-3-episodi)
  - [5  LA GRANDE MAPPA  (15 episodi)](#5-la-grande-mappa-15-episodi)
  - [6  LESERCITO SILENZIOSO  (2 episodi)](#6-lesercito-silenzioso-2-episodi)
  - [7  IL DIRETTORE  (7 episodi)](#7-il-direttore-7-episodi)

<!-- /TOC -->

# PIETRE — l'indice dell'arco (concetto → episodio)

*Generato da `generate_pietre_index.py` il 2026-06-10 — VISTA dell'`asse_nina`*
*in `episodes.json`. Non si edita a mano: si rigenera dopo `build_episodes_json.py`.*

> Ogni **Pietra** ⟡n è un concetto fondante dell'arco "storia dell'IA". Sotto ciascuna:
> gli episodi che la **fondano** o **approfondiscono**, in ordine di *giro di spirale*
> (1 = base, 2+ = più a fondo). `fonte` = materiale tecnico · `adattato` = episodio di Nina.

---

## ⟡0 · LA MATERIA  (1 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_FILONE_00` La Materia — il telaio, la scelta, il controllo | la materia: scelta, controllo, precisione | fonte | — |

## ⟡1 · LA TRACCIA  (2 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_00` La Bambina e la Giuntura | il Grande Loop | adattato | — |
| 1 | `EP_S0_00` Il Socio | il Socio: un gesto, più frutti | fonte | — |

## ⟡2 · L'OFFICINA CHE GIRA SOLA  (6 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_01` L'Incantesimo che si Ripete | l'Automazione | adattato | ⟡1 |
| 1 | `MOM_01_LA_PRIMA_AUTOMAZIONE` La Prima Automazione | la prima automazione | fonte | ⟡1 |
| 2 | `EP_SEED_WATCHER` AI News Watcher — restare sul pezzo senza chiavi | stare informati senza farlo a mano | fonte | ⟡1 |
| 3 | `EP_SEED_WATCHER_L1_GATE` Il gate di rilevanza — tenere il segnale, buttare il rumore | stare informati senza farlo a mano | fonte | ⟡1 |
| 3 | `EP_SEED_WATCHER_L1_KEYLESS` Guardare senza chiavi — gh, RSS, YouTube | stare informati senza farlo a mano | fonte | ⟡1 |
| 3 | `EP_SEED_WATCHER_L1_TIER` Chi guardare più spesso — il tier a rotazione 48h | stare informati senza farlo a mano | fonte | ⟡1 |

## ⟡3 · LA MENTE CHE PARLA  (2 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_02` La Mente che Parla | l'LLM, la mente che parla | adattato | ⟡1 |
| 1 | `EP_S2_01_IL_CERVELLO_IBRIDO` Il Cervello Ibrido | il cervello ibrido: cloud + locale | fonte | ⟡1 |

## ⟡4 · LA BIBLIOTECA DELLE FONTI  (3 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_03` La Biblioteca delle Fonti | il RAG, la biblioteca delle fonti | adattato | ⟡3 |
| 1 | `EP_T05` Il Sistema Pensa | il sistema pensa: recupero con fonti | fonte | ⟡3 |
| 2 | `EP_T04` SINAPSI | SINAPSI: la memoria che collega | fonte | ⟡3 |

## ⟡5 · LA GRANDE MAPPA  (15 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_04` La Grande Mappa | la Wiki, la grande mappa | adattato | ⟡4 |
| 1 | `EP_SEED_GRAPHIFY` Graphify — il repo che si disegna da solo | la mappa della conoscenza | fonte | ⟡4 |
| 1 | `EP_T01` La Dashboard | la Dashboard: vedere il sistema | fonte | ⟡4 |
| 1 | `EP_T02` NeuroMap | NeuroMap: il sistema come mappa | fonte | ⟡4 |
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

## ⟡6 · L'ESERCITO SILENZIOSO  (2 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_05` L'Esercito Silenzioso | gli Agenti, l'esercito silenzioso | adattato | ⟡2 ⟡4 |
| 1 | `MOM_03_L_ESERCITO` L'Esercito | l'esercito: tante entità che fanno | fonte | ⟡2 ⟡4 |

## ⟡7 · IL DIRETTORE  (7 episodi)

| giro | episodio | concetto | stato | richiama |
|:--:|---|---|:--:|---|
| 1 | `EP_AV_06` Il Direttore | l'Orchestrazione, il direttore | adattato | ⟡5 ⟡6 |
| 1 | `EP_S2_02_L_ORCHESTRATORE` L'Orchestratore | l'orchestratore: chi fa cosa e quando | fonte | ⟡5 ⟡6 |
| 1 | `EP_SEED_CONTROLLO` Il Centro di Controllo — un posto solo da cui governare | un posto solo per governare il disordine | fonte | — |
| 2 | `EP_S2_03_LA_TELA` La Tela | la Tela: il calendario notturno | fonte | ⟡6 |
| 2 | `EP_SEED_CONTROLLO_L1_CEDIBILE` Un sistema spiegato è un sistema cedibile | un posto solo per governare il disordine | fonte | — |
| 2 | `EP_SEED_CONTROLLO_L1_SCAFFOLDING` Il carico va sullo schermo, non nella testa | un posto solo per governare il disordine | fonte | — |
| 2 | `EP_SEED_CONTROLLO_L1_STATOLIVE` Se è acceso, non se dovrebbe — lo stato live | un posto solo per governare il disordine | fonte | — |

---

**Regola dei prerequisiti (spirale macro):** un episodio non può usare una Pietra non
ancora posata. `richiama` elenca le Pietre già note che riattiva (ripetizione spaziata).
⟡0 (la materia) è la radice: la posa per prima, la richiamano tutte.
