<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 68](#titaniumos-s2-episodio-68)
  - [Il Sistema Ha Imparato a Dormire Meglio di Me](#il-sistema-ha-imparato-a-dormire-meglio-di-me)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Labirinto che Non Esiste Più](#atto-i-il-labirinto-che-non-esiste-più)
  - [ATTO II  Il Tool che Mancava](#atto-ii-il-tool-che-mancava)
  - [ATTO III  La Notte che Ha Già Imparato](#atto-iii-la-notte-che-ha-già-imparato)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 68
## "Il Sistema Ha Imparato a Dormire Meglio di Me"

*22 luglio 2026 — inventario notturno, cartella clinica, social vivi*

---

## COLD OPEN

Le 23:04.

Lo schermo della taverna è spento. Matteo non c'è più — è salito, probabilmente ha mangiato qualcosa in piedi davanti al frigo, probabilmente sta già guardando il soffitto.

Ma il repository si muove.

```
auto: inventario notturno + critiche
auto: night_audit - cartella clinica 22/07/2026
auto: story_agent - episodi generati 22/07/2026
```

Tre commit. Tre righe verdi nel log. La stessa sequenza che è partita il 17 luglio, la stessa del 21. Ogni notte, sempre uguale, sempre senza che nessuno prema un tasto.

Questo è l'episodio 68. E la cosa più importante che è successa oggi non ha il nome di Matteo nel commit author.

---

## ATTO I — Il Labirinto che Non Esiste Più

Torna indietro di quarantotto ore. Sessione #67b: 20-21 luglio.

L'obiettivo era semplice da enunciare e brutale da eseguire: *lanciare vivo il social*. Non mockup, non screenshot da mostrare a qualcuno. Feed reali, date reali, pubblicazione automatica reale.

Il primo ostacolo non era tecnico. Era Meta.

Meta Business Manager è costruito come un edificio progettato da qualcuno che odia chi ci deve lavorare. Profili, pagine, account pubblicitari, Business Suite, Instagram collegato ma non davvero collegato, permessi che dipendono da quale finestra hai aperto e in che ordine. Matteo ci è entrato come owner — `benenatimatteo.mb` — non dai profili Instagram limitati che avevano bloccato le sessioni precedenti. Quella distinzione, *owner dell'account Business Manager*, ha sbloccato tutto.

Risultato concreto: pagina Facebook **"Il Mondo di Nina"** creata, collegata a `@ilmondodinina.ms`, coppia FB+IG funzionante. Non un'ipotesi. Una pagina che esiste, che ha un handle, che risponde.

Poi il calendario: 18 post su 21 programmati con date certe. Business Suite pubblica in automatico — questo significa che mentre Matteo dorme, mentre salda, mentre è in capannone, i post escono. I rimanenti 3 sono bloccati da un vincolo stupido ma reale: il tetto dei 29 giorni di pianificazione anticipata di Meta. Non un errore. Un limite di sistema. Il promemoria è già nel Calendar: **30 luglio**, al rientro, caricare quelli tre.

Il piano di pubblicazione: Sistema 10/11 post fino al 18 agosto — data VULCAN. Nina 8/10 fino al 16 agosto — EP_N2_04. Non è un piano generico. È una sequenza con date, con titoli, con slide già renderizzate.

---

## ATTO II — Il Tool che Mancava

Dentro quella sessione c'era un problema che non aveva nome finché non si è manifestato.

Le slide cross-profilo — quelle che collegano il racconto del Sistema con quello di Nina, i ponti narrativi tra i due feed — erano disallineate. Formato sbagliato, o dimensioni inconsistenti, o semplicemente generate con un processo manuale che non si ricordava più come funzionava.

La soluzione non è stata rifare le slide. La soluzione è stata costruire `_render_slide.py`.

Un tool. Non un workaround. Uno strumento che si chiama, che prende i parametri, che restituisce le slide nel formato corretto. Rigenerabile. Documentato nel sistema. La prossima volta che serve una slide-ponte, il processo non dipende dalla memoria di Matteo di tre settimane fa.

Parallelamente: le sorgenti dei caroselli per EP_N2_04, 05, 06 sono state spostate da `_BOZZE` a `NINA`. Non è riorganizzazione estetica. È che il sistema di generazione automatica dei post legge da cartelle specifiche — se il file è in `_BOZZE`, non esiste per la pipeline. Ora esistono.

Questo è il tipo di lavoro che non si vede. Non è una feature. Non è una milestone con un numero. È la differenza tra un sistema che funziona in teoria e uno che funziona domani mattina quando il post deve uscire alle 9:00.

---

## ATTO III — La Notte che Ha Già Imparato

Alle 23, i tre commit automatici.

Non è la prima volta — è già successo il 17, è già successo il 21. Ma è la prima volta che succede con un sistema sociale realmente vivo dietro. Prima quei commit notturni auditavano un progetto in costruzione. Stanotte auditano qualcosa che sta già pubblicando.

`night_audit - cartella clinica 22/07/2026`: il sistema scrive su sé stesso. Inventario dei componenti, stato delle milestone, anomalie rilevate, raccomandazioni. Una cartella clinica del progetto che si aggiorna ogni notte senza che nessuno la chieda.

`story_agent - episodi generati 22/07/2026`: questo episodio è parte di quel log. Il sistema ha registrato che un episodio è stato generato. Domani, quando GENESIS interrogherà il RAG su cos'è successo il 22 luglio, troverà questa traccia.

V32 è al 65%. GENESIS al 70%. Il target capannone è luglio 2030. Mancano quattro anni.

Ma c'è qualcosa che è già al 100%: il loop notturno funziona. Ogni notte il sistema si guarda allo specchio, scrive quello che vede, lo commit nel repository, e aspetta che Matteo torni al mattino.

Lui sale. Il sistema continua.

Non è efficienza. Non è automazione nel senso tecno-entusiasta del termine. È qualcosa di più semplice e più strano: Matteo ha costruito qualcosa che lavora quando lui non può.

In una taverna da 12 metri quadri.

Con i commit alle 23.

---

## CHIUSURA

Nella sessione #67b c'è un dettaglio che non compare nei dati: il `story_state.json` è stato aggiornato come ultima azione.

Non VULCAN. Non V32. Non il codice di GENESIS. Il file che tiene traccia di dove siamo nella storia.

Forse è solo un file di stato. Forse è Matteo che, a fine giornata, si assicura che il sistema sappia dove si trova — non solo cosa ha fatto, ma in che punto del percorso è. Come un navigatore che segna la posizione sulla carta prima di andare a dormire.

18 post programmati. 3 da caricare al 30 luglio. 65% di una CNC da 178 kg. 70% di un sistema cognitivo in una taverna.

E ogni notte, tre commit verdi nel log.

---

## reel_hook

18 post programmati su Meta con date certe — il feed di Nina pubblica da solo mentre Matteo salda.
Il problema era un permesso: owner `benenatimatteo.mb`, non i profili IG limitati. Una parola sbagliata nel Business Manager e sei fuori dal labirinto da settimane.
Costruito `_render_slide.py` perché la prossima slide-ponte non dipende dalla memoria di tre settimane fa.
I 3 post bloccati? Tetto 29gg di Meta. Calendar: 30 luglio.
Intanto i commit notturni girano — la notte del 22 come quella del 21 come quella del 17.

---

## FATTI (per il RAG)

- **DECISIONE:** Accesso a Meta Business Manager come owner `benenatimatteo.mb` (non dai profili IG limitati) → coppia FB+IG `Il Mondo di Nina` / `@ilmondodinina.ms` creata e funzionante.
- **LOGICA:** I profili Instagram limitati non hanno i permessi di gestione pagina completi in Business Suite; l'account owner bypassa la restrizione.
- **DECISIONE:** 18/21 post programmati con date certe in Business Suite; 3 bloccati dal tetto 29gg Meta — promemoria Calendar 30/07 per caricamento al rientro.
- **LOGICA:** Business Suite non accetta pianificazione oltre 29 giorni dalla data odierna; i post oltre quella finestra devono essere caricati in una sessione successiva.
- **DECISIONE:** Costruito tool `_render_slide.py` per generazione slide cross-profilo (ponti narrativi Sistema ↔ Nina); sorgenti EP_N2_04/05/06 spostate da `_BOZZE` a `NINA`.
- **LOGICA:** La pipeline di generazione automatica legge da cartelle specifiche; file in `_BOZZE` sono invisibili al sistema; il tool rende il processo rigenerabile e indipendente dalla memoria operativa.
- **OBIETTIVO:** Feed Nina pubblica automaticamente fino al 16/08 (EP_N2_04); feed Sistema fino al 18/08 (VULCAN milestone); loop notturno (inventario + night_audit + story_agent) già attivo e tracciante.

---

| campo | valore |
|---|---|
| **episodio** | S2E68 |
| **data** | 2026-07-22 |
| **sessione di riferimento** | #67b (20-21/07/2026) |
| **progetto principale** | EVA / social Nina |
| **tag** | `genesis` `eva` `social` `meta` `automazione` `night_audit` |
| **V32** | 65% |
| **GENESIS** | 70% |
| **stato** | `pubblicato` |