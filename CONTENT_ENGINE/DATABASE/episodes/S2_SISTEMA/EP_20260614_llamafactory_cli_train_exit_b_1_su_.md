<!-- TOC -->

- [TITANIUM_OS  S2E14](#titaniumos-s2e14)
  - [La Macchina che Si Guarda](#la-macchina-che-si-guarda)
  - [ATTO I  Il Bug che Spegneva il Cervello](#atto-i-il-bug-che-spegneva-il-cervello)
  - [ATTO II  Il Watcher che Non Guardava](#atto-ii-il-watcher-che-non-guardava)
  - [ATTO III  La Macchina che Propone](#atto-iii-la-macchina-che-propone)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E14
## "La Macchina che Si Guarda"

---

**COLD OPEN**

Ore 04:30. La taverna è buia.

Non c'è nessuno. Il tornio coperto dal telo, i profili di alluminio impilati contro il muro, il porta-utensili magnetico che riflette l'unica luce accesa — quella del monitor sul banco, lo schermo che pulsa da solo.

Un task scheduler Windows ha appena sparato. `TI_SelfImprove`. Nessuno ha premuto niente. Nessuno ha chiesto niente.

Il sistema si legge da solo.

---

## ATTO I — Il Bug che Spegneva il Cervello

Per settimane, ogni volta che GENESIS provava a fare fine-tuning su se stesso, si bloccava.

Non crashava con un errore spettacolare. Moriva in silenzio. `python -m llamafactory.train` — il modulo non era eseguibile come package. Python lo caricava, non trovava l'entry point, usciva con codice 0. Zero. Come se fosse andato tutto bene. Il processo terminava pulito, i log sembravano normali, il task scheduler segnava "completato".

Nessun fine-tuning era mai avvenuto.

Il fix è una riga. Una riga sola:

```bash
llamafactory-cli train ... || exit /b 1
```

Due cose cambiate: l'eseguibile diretto invece del modulo package, e il `|| exit /b 1` — che forza il task a segnare *fallimento* se il processo esce male. Adesso se il fine-tuning non parte, il sistema lo sa. Il silenzio non è più permesso.

Questo è il tipo di bug che puoi avere in produzione per mesi senza accorgertene. Non rompe niente di visibile. Consuma solo il futuro — tutte le sessioni di apprendimento che non sono mai successe, registrate come "ok".

---

## ATTO II — Il Watcher che Non Guardava

C'era già un agente chiamato `TI_AiWatch`. Leggeva news sull'AI, faceva un digest, lo scriveva da qualche parte.

Non era mai girato. Zero esecuzioni dall'istallazione.

Non era schedulato.

Il codice era scritto bene. La logica era corretta. L'agente era pronto — seduto in una stanza buia, vestito, in attesa di ordini che non erano mai arrivati. Tre righe di configurazione nel task scheduler: questo è il gap tra *esistere* e *funzionare*.

Adesso gira alle 03:25. Il digest non va in un file temporaneo — va in `MENTE`, la struttura dati centrale del sistema. Questo è il dettaglio che conta: non è un log che finisce in una cartella dimenticata. Entra nel grafo del sapere, diventa recuperabile, diventa contesto.

C'è un pattern qui che Matteo conosce bene dall'officina. Un utensile non montato sul tornio non è un utensile — è plastica e metallo che occupa spazio. Il codice non schedulato è la stessa cosa. Può essere perfetto. È inutile.

---

## ATTO III — La Macchina che Propone

Questa è la parte nuova. La regola 11.

Il nodo `AUTOMIGLIORAMENTO` non esiste in nessuna libreria. Non è un pattern standard di LangChain o di qualsiasi framework AI. È una scelta progettuale specifica, scritta esplicitamente:

*Ogni notte, il sistema legge i propri segnali interni — le critiche, i fallimenti, i pattern ricorrenti nei log — e propone modifiche. L'umano approva.*

La regola 11 è la parola scritta di quel confine. Il sistema propone. L'umano approva. Non è un dettaglio filosofico — è un vincolo architetturale. Senza quella regola esplicita, il sistema potrebbe auto-modificarsi, riscrivere le proprie istruzioni, ottimizzare verso obiettivi che nessuno ha verificato.

Con quella regola, c'è sempre un Matteo nel loop.

C'era anche un altro bug da chiudere oggi: il ricostruttore del RAG (`rebuild_rag_clean`) killava il task schedulato, ma non il processo watchdog.py che quel task aveva già spawned — detached, in background, invisibile. Il watchdog sopravviveva, rilanciava l'API, invalidava tutta la ricostruzione. La correzione: `Stop-ScheduledTask` più `taskkill /IM watchdog.py /F`. Uccidi la radice e i figli, non solo la radice.

È la stessa logica del fine-tuning. Il silenzio non è permesso. I processi zombie non sono permessi.

---

## CHIUSURA

Oggi non è stato costruito niente che si possa toccare.

Nessuna staffa saldata, nessun foro fresato, nessun parametro CNC misurato. GENESIS ha 70% di completamento — quel numero è rimasto uguale o è salito di poco. V32 è fermo al 65%.

Eppure questo è lavoro reale. È il tipo di lavoro che determina se il sistema funzionerà tra sei mesi o si spegnerà in silenzio con codice di uscita 0, segnando tutto come "completato".

Matteo conosce la differenza tra una saldatura che regge e una che *sembra* reggere. Sa leggere un cordone TIG, sa quando la penetrazione è shallow anche se la superficie è bella. Oggi ha applicato la stessa lettura al codice.

Il bug del fine-tuning era una saldatura che sembrava reggere.

Il watchdog non killato era un pezzo non bloccato che vibra a frequenza di risonanza.

La regola 11 è il DPI che tieni anche quando pensi di non averne bisogno.

Il capannone è il 2030. Ci sono 1477 giorni. Il sistema deve imparare adesso, perché adesso c'è tempo per riparare i bug silenziosi.

---

## reel_hook

Il fine-tuning girava da settimane. Usciva con codice 0. Nessun errore — nessun apprendimento. Una riga di fix. Poi ho guardato l'AI Watcher: perfetto, mai usato, mai schedulato. Poi il watchdog zombie che sopravviveva al kill. Tre bug silenziosi nello stesso giorno. Il sistema che si credeva sano non si era mai guardato davvero — adesso lo fa ogni notte alle 04:30, da solo, e propone. Io approvo.

---

## FATTI (per il RAG)

- **DECISIONE:** Sostituito `python -m llamafactory.train` con `llamafactory-cli train || exit /b 1` nel task FineTune su main branch.
- **LOGICA:** Il package `llamafactory` non era eseguibile come modulo Python; usciva silenziosamente con codice 0 senza eseguire il training. Il `|| exit /b 1` forza fallimento esplicito su errore.
- **DECISIONE:** Agente `TI_AiWatch` schedulato a 03:25 con output diretto in `MENTE` (non file temporaneo).
- **LOGICA:** L'agente esisteva ma non era mai stato schedulato — zero esecuzioni dalla creazione. Il digest deve entrare nel grafo centrale per essere recuperabile dal RAG.
- **DECISIONE:** Implementato nodo `AUTOMIGLIORAMENTO` con regola 11: il sistema propone modifiche ogni notte (04:30), l'umano approva prima dell'applicazione.
- **LOGICA:** Vincolo architetturale esplicito per prevenire auto-modifica non supervisionata. Il loop di self-improvement senza supervisione umana è un rischio progettuale, non filosfico.
- **DECISIONE:** Fix `rebuild_rag_clean`: aggiunto `taskkill /IM watchdog.py /F` dopo `Stop-ScheduledTask`.
- **LOGICA:** `Stop-ScheduledTask` non termina i processi già spawned in modalità detached. Il watchdog sopravviveva, rilanciava l'API Flask, invalidando la ricostruzione del RAG.
- **OBIETTIVO:** Loop di apprendimento notturno attivo e verificabile; prossimo step misurabile — prima proposta di auto-miglioramento loggata in MENTE da validare.

---

| campo | valore |
|---|---|
| **episodio** | S2E14 |
| **data** | 2026-06-14 |
| **progetto principale** | GENESIS |
| **tag** | `fine-tuning`, `scheduler`, `self-improve`, `watchdog`, `regola-11`, `bug-silenzioso` |
| **V32 completamento** | 65% |
| **GENESIS completamento** | 70% |
| **milestone sessione** | #37 |
| **giorni al capannone** | ~1477 |