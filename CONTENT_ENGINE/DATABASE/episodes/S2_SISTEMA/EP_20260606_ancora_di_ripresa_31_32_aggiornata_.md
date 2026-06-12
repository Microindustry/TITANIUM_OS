<!-- TOC -->

- [TITANIUM_OS  S2E12](#titaniumos-s2e12)
  - [La Macchina che Mente](#la-macchina-che-mente)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL SISTEMA CHE DICE DI STARE BENE](#atto-i-il-sistema-che-dice-di-stare-bene)
  - [ATTO II  LA SESSIONE CHE CAMBIA MACCHINA](#atto-ii-la-sessione-che-cambia-macchina)
  - [ATTO III  P2: LA STORIA DENTRO LA STORIA](#atto-iii-p2-la-storia-dentro-la-storia)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E12
## "La Macchina che Mente"

---

## COLD OPEN

Sono le 23:47.

Il PC fisso gira da solo nella taverna. Matteo dorme. O forse no — difficile dirlo, con lui.

Sullo schermo: una view di Notion chiamata **AUTOMAZ**. Colori verdi. Spunte ovunque. Tutto fila. Tutto gira. Il sistema respira.

Tranne che non è vero.

Quella view mente in due direzioni contemporaneamente.

---

## ATTO I — IL SISTEMA CHE DICE DI STARE BENE

C'è un problema sottile con i sistemi di monitoraggio: possono diventare cosmesi.

Non per cattiveria. Per inerzia. Una colonna aggiornata sei mesi fa che mostra "✅ attivo" perché nessuno ha mai scritto il codice per cambiarlo in "❌ morto". Un watcher che supervisiona processi che non esistono più. Una cron che non ha mai girato davvero, ma la tabella non lo sa.

GENESIS ha una vista chiamata **AUTOMAZ**. È lì da mesi. Elenca le automazioni attive: TI_NightPush, watchdog, mente_watcher, story_agent, night_audit. Verde, verde, verde.

Oggi — sessione #31 — Matteo ha fatto una cosa semplice e brutale: ha guardato davvero.

Ha aperto Task Scheduler. Ha controllato i PID reali. Ha interrogato i processi. Ha confrontato quello che AUTOMAZ dichiarava con quello che il sistema operativo confermava.

**Risultato dell'audit:**

| Automazione | AUTOMAZ dichiarava | Stato reale |
|---|---|---|
| TI_NightPush | ✅ verde | ❌ EXIT 255 stanotte |
| watchdog.py | ✅ attivo | ⚠️ loop da AtLogon, LastRun vecchio (corretto, ma non evidente) |
| mente_watcher | ✅ supervisionato | ✅ confermato |
| story_agent | ✅ girato | ✅ confermato |
| night_audit | ✅ girato | ✅ confermato |

Due direzioni in cui mentiva. Non una.

**Prima direzione:** TI_NightPush era uscito con codice 255 nella notte. Il motivo: `update_github_profile.py` chiamava `gh` — la GitHub CLI — con un path che non veniva trovato. Il processo si lanciava, sembrava girare, crashava in silenzio, e Notion non ne sapeva niente.

**Seconda direzione:** watchdog.py mostrava un LastRun che sembrava vecchio, segnale che normalmente indica un processo morto. In realtà è un loop persistente, non un one-shot: gira continuamente dall'avvio di sessione, e il LastRun di Task Scheduler non si aggiorna perché il task non "ri-parte", semplicemente non finisce mai. Non era un bug. Era una cattiva lettura della colonna.

Matteo ha fixato entrambi. Girato TI_NightPush a mano: EXIT=0. Aggiornato AUTOMAZ con la distinzione tra "loop persistente" e "one-shot schedulato". Committato.

*Tonight green.* Non come atto di fede. Come fatto verificato.

---

## ATTO II — LA SESSIONE CHE CAMBIA MACCHINA

Sotto al fix c'è qualcosa di più grande.

Questa è la sessione #31. Domani — o forse già oggi, guardando l'orario — arriva un PC nuovo. Non un aggiornamento. Un cambio fisico di macchina. GENESIS dovrà sapere dove si trovava, da dove ripartire, cosa era in volo.

I commit di chiusura sessione esistono già nella storia del progetto. Sono rituali consolidati. Ma questa volta il commit ha un peso diverso:

```
chore: snapshot chiusura sessione #31 — salva tutto per ripresa su PC nuovo
Consolida sessione autonoma #31 (P4a chat RAG + P4b leva locale + P1b cartella
```

Tre punti erano in volo contemporaneamente:

**P4a** — la chat RAG. ChromaDB + Flask + il meccanismo di retrieval che permette a GENESIS di rispondere a domande sulla propria storia. Non documentazione statica: memoria interrogabile.

**P4b** — la leva locale. Ollama con Qwen. Il modello gira in casa, su ferro Matteo, senza API key, senza latenza di rete, senza costi per token. `model_ready: true` nel config. Questo è il momento in cui GENESIS smette di dipendere interamente dal cloud per ragionare.

**P1b** — la cartella clinica. Il sistema che ogni notte scrive un riassunto dello stato del progetto: commit, metriche, anomalie. Memoria automatica che non dimentica anche quando Matteo dimentica.

Tutti e tre in uno snapshot unico, coerente, pushato su main prima che la macchina si spenga.

C'è qualcosa di artigianale in questo gesto. Non è diverso da finire un cordone TIG prima di staccare la maschera — lasciare il pezzo in uno stato in cui, se qualcosa va storto, si sa esattamente dove si era.

Il commit di riavvio dice: **"ancora di ripresa #31→#32 aggiornata (resume da qui in nuova sessione)"**.

Non è documentazione. È un punto di saldatura.

---

## ATTO III — P2: LA STORIA DENTRO LA STORIA

Poi c'è la cosa strana. Quella che non ti aspetti in un log di sistema.

Nel milestone attivo della sessione #32, tra le righe di config e le metriche di completamento, compare questo:

> *P2 binario AVVENTURA lanciato — bibbia del mondo + pilota EP_AV_00 "La Bambina e la Giuntura", stagione AV*

GENESIS non genera solo documentazione tecnica e audit di stato. Genera anche narrativa.

C'è un agente — story_agent — che gira la notte. Nella sessione #31 ha prodotto episodi. Nella sessione #32, Matteo ha aperto un binario nuovo: una stagione di racconti chiamata **AVVENTURA**. Con una bibbia di mondo. Con un episodio pilota. Con un titolo che ha la consistenza di una cosa vera: *La Bambina e la Giuntura*.

Non è un capriccio. È la logica portata fino in fondo.

Se GENESIS è un sistema cognitivo — se il punto è costruire qualcosa che pensa, che ricorda, che racconta — allora la narrativa non è un ornamento. È dimostrazione di capacità. Un sistema che può generare un episodio pilota coerente con una bibbia di mondo sta facendo esattamente quello che deve fare un agente con memoria: ragionare sul contesto, mantenere coerenza interna, produrre output con struttura.

*La Bambina e la Giuntura.* Non so ancora cosa sia questa storia. Ma il nome esiste in un file committato su main, e questo lo rende reale nel senso che conta.

---

## CHIUSURA

V32 è al 65%. GENESIS al 70%.

Questi numeri non dicono molto se non si sa cosa c'era prima. Dicono di più se si sa che tre settimane fa AUTOMAZ mentiva e nessuno lo sapeva ancora.

L'audit di oggi non ha trovato un disastro. Ha trovato due cose imprecise in un sistema che per il resto girava. EXIT 255 su TI_NightPush. Una colonna che interpretava male un loop persistente. Non drammatico. Ma reale.

La differenza tra un sistema che funziona e uno che sembra funzionare è esattamente questa granularità. Il verde che vale qualcosa versus il verde che è rimasto verde per inerzia.

Matteo lo sa da quando lavorava sul titanio MotoGP: il cordone che tiene non è quello che sembra tenere. È quello che hai controllato davvero.

La macchina nuova arriverà con `model_ready: true` e un'ancora di ripresa aggiornata.

*Tonight green.* Verificato.

---

## REEL_HOOK

La view diceva verde. Task Scheduler diceva EXIT 255.
Qualcuno dei due mentiva — e non era Task Scheduler.
Audit reale: 2 direzioni di menzogna trovate, fixate, committate.
La domanda è: quante altre view hai che non hai mai verificato davvero?

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E12 |
| **Titolo** | La Macchina che Mente |
| **Data registrazione** | 2026-06-06 |
| **Sessione GENESIS** | #31 → #32 |
| **Progetti coinvolti** | GENESIS, V32 |
| **Milestone chiave** | Audit AUTOMAZ reale · Leva locale Ollama/Qwen · Snapshot cambio macchina |
| **Completamento V32** | 65% |
| **Completamento GENESIS** | 70% |
| **Co-author AI** | Claude Opus 4.8 |
| **Tag narrativi** | `audit` `resilienza` `snapshot` `local-ai` `verità-vs-cosmesi` |
| **Prossima ancora** | Sessione #32 — P1a stato reale live, P2 AVVENTURA, Ollama warm |

## FATTI (per il RAG)

- **FATTO:** L'audit della sessione #31 ha rilevato che TI_NightPush usciva con codice **EXIT 255** a causa di `update_github_profile.py` che chiamava la GitHub CLI (`gh`) con un path non trovato. Fix manuale ha prodotto **EXIT=0**.

- **FATTO:** watchdog.py è classificato come **loop persistente** (AtLogon, non termina mai), non come one-shot schedulato; il campo LastRun di Task Scheduler non si aggiorna per i loop persistenti, rendendo necessaria una distinzione esplicita nella vista AUTOMAZ.

- **DECISIONE:** La sessione #31 è stata chiusa con uno snapshot unico su `main` contenente tre punti in volo simultanei: **P4a** (chat RAG con ChromaDB + Flask), **P4b** (Ollama/Qwen locale, `model_ready: true`), **P1b** (cartella clinica notturna automatica). **LOGICA:** Garantire ripresa coerente su nuovo PC fisico alla sessione #32.

- **FATTO:** P4b (leva locale) usa **Ollama con Qwen** su hardware Matteo: nessuna API key, nessuna latenza di rete, nessun costo per token.

- **OBIETTIVO:** Il commit di riavvio sessione #32 è marcato esplicitamente come **"ancora di ripresa #31→#32"** per consentire continuità di stato su cambio fisico di macchina.

- **FATTO:** Nella sessione #32 è stato avviato il binario narrativo **P2-AVVENTURA**, con bibbia di mondo e episodio pilota *"La Bambina e la Giuntura"* (EP_AV_00), generato dallo `story_agent` come dimostrazione di capacità cognitiva di GENESIS.
