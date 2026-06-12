<!-- TOC -->

- [TITANIUM_OS  Episodio S1E16](#titaniumos-episodio-s1e16)
  - [La Dashboard Parla per Te](#la-dashboard-parla-per-te)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il problema invisibile](#atto-i-il-problema-invisibile)
  - [ATTO II  Il loop che nessuno vede arrivare](#atto-ii-il-loop-che-nessuno-vede-arrivare)
  - [ATTO III  Estetica come fondazione, non decorazione](#atto-iii-estetica-come-fondazione-non-decorazione)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio S1E16
## "La Dashboard Parla per Te"

---

> *Sessione 16 · 01 giugno 2026 · 14 commit · taverna 12 m²*

---

## COLD OPEN

È domenica sera. Tua sorella ti guarda mentre scrolli la dashboard sul portatile. Fa una domanda semplice: *"Ma cos'è esattamente quello che stai costruendo?"*

Tu non sai da dove cominciare. Dici tre cose, poi ne dici altre tre. Lei annuisce, ma i suoi occhi vanno altrove.

Non è un problema di visione. È un problema di interfaccia.

Quello che Matteo ha costruito oggi non è una feature. È la risposta a quella domanda — incisa in HTML, scrollabile, sempre pronta.

---

## ATTO I — Il problema invisibile

C'è una categoria di lavoro che non appare nei log tecnici. Non è un bug. Non è un refactor. È il problema che esiste da quando hai aperto il primo file: **il sistema non sa presentarsi da solo.**

GENESIS a questa data ha 6.369 chunk nel RAG. Centotrentanove file. Ottantasette storie. Quindici sessioni archiviate. Cinque pilastri costruiti mattone per mattone: V32, MIMS, GENESIS, EVA, VITA.

Tutto questo vive dentro un terminale, dentro commit messages, dentro `STATE.json`. Vivo per chi sa guardare. Muto per chiunque altro.

Il commit che apre la sessione 16 si chiama `feat: bottone 'Presentazione' sulla HOME`. Un bottone. Un solo bottone sulla pagina principale.

Ma quel bottone fa una cosa precisa: lancia la vista PITCH.

Matteo ha costruito la voce del sistema.

---

La vista PITCH è additiva — parola chiave nei messaggi di commit. *"Zero rischio sull'esistente."* Significa che Matteo non ha toccato nulla di quello che funzionava. Ha aggiunto uno strato sopra. Narrazione scrollabile, investor-facing, progettata per spiegare il progetto a qualcuno che non ha mai aperto un terminale.

Non è marketing. È documentazione con una gerarchia visiva.

La logica è chirurgica: quando qualcuno è in piedi accanto a te e guarda lo schermo, non hai tempo di aprire dieci tab. Un click. La dashboard parla per te.

---

## ATTO II — Il loop che nessuno vede arrivare

Mentre la PITCH veniva costruita, sotto c'era un incendio silenzioso.

**AU19.** Codice anomalia. Root cause: `_archive_old_changelog` archiviava le righe *per evento*, non a chunk. Ogni scrittura nel changelog triggerava il watcher. Il watcher notava il cambiamento. Scriveva nel changelog. Che triggerava il watcher. Che scriveva nel changelog.

Un loop runaway. Un cane che si morde la coda, ma in Python, alle 2 di notte, su un sistema che gira in background mentre lavori su altro.

La fix è elegante nella sua semplicità: `watcher.py` riceve un'istruzione nuova — `IGNORE_DIRS += DATA`. I file di output derivato non ri-triggerano il ciclo. La soglia di archiviazione passa da *per-evento* a *oltre 3.000 righe*.

Il sistema smette di mangiare se stesso.

---

Nella stessa sessione: audit di cinque anomalie pregresse. AU01, AU02, AU03, AU06 — chiuse. Erano già risolte, ma non marcate come tali. Ogni anomalia aperta è rumore cognitivo, anche se non è più un problema reale. Matteo le chiude.

AU10: il nodo ROOT_NODE nella MappaView segnava un completamento del 60%. Sbagliato. La media reale dei cinque pilastri era 48%. La percentuale scende. Il numero è peggiore. Ma è vero.

*Questo è il tipo di decisione che non vedi nel portfolio di nessuno.*

---

## ATTO III — Estetica come fondazione, non decorazione

Alle 23:14 — il timestamp non è nei metadati ma si sente nella sequenza dei commit — arriva il sistema temi.

**Tappa 1: dark/light toggle.** Fondazione modulare con Tailwind v4 token. Il tema dark rimane identico a prima. Zero regressioni. Il tema light non è un'inversione del dark — è progettato da zero, con token semantici e contrasto minimo 4.5:1.

Prima viene il mockup. File separato. Zero rischio sul sistema reale. Matteo valuta, poi implementa.

Il commit `style: glow radiale soffuso sul fondo` arriva dopo. Emerald in alto a sinistra, cyan in alto a destra. Opacità 0.05-0.07. *"Look intenzionale"* — lo scrive lui stesso nel messaggio di commit. Non è un effetto aggiunto per far sembrare il lavoro più lungo. È la differenza tra uno schermo che appare e uno che esiste.

---

I pilastri nella HOME ricevono una descrizione di una riga ciascuno. Header aggiunto: *"I 5 pilastri"*. Screenshot dei tool integrati.

La logica è la stessa della PITCH: qualcuno guarda lo schermo. Non sa cosa sono V32 e MIMS. Adesso lo sa.

Loop di verifica: screenshot headless con Edge. Il ciclo è `see → edit → verify`. Non si pubblica senza guardare. Non si guarda senza uno strumento che non mente.

---

Nella CommandBar vengono rimosse tre voci legacy: *canvas*, *neuro*, *sinapsi*. Nomi che avevano senso in sessioni passate, che non ne hanno più. Una sola voce rimane. Il menu diventa navigabile in tre secondi invece di dodici.

MIMS riceve un aggiornamento di stato: le critiche di mercato vengono congelate e convertite in leve. La cascata viene ridimensionata. L'audit trimestrale viene implementato. Matteo aveva preso questa decisione prima — il commit la formalizza.

---

E poi, quasi in fondo alla giornata: `feat: recupera anche i 12 dev-log story_agent`.

Il parser di `sync_storie.py` viene esteso per leggere il formato `story_agent` — titolo con `##`, data estratta dal filename. Dodici storie che esistevano ma non erano contate. Il contatore passa da 75 a 87.

Nessuna storia era stata persa. Erano solo invisibili al sistema.

Adesso no.

---

## CHIUSURA

C'è una versione di questa giornata che si racconta così: *"Ho fatto un po' di UI e fixato dei bug."*

C'è un'altra versione.

Matteo ha costruito la voce del sistema. Ha spento un loop che consumava risorse in silenzio. Ha abbassato una percentuale perché quella vera era più bassa. Ha eliminato tre pulsanti che non servivano più. Ha recuperato dodici storie che il sistema non riusciva a vedere.

Ogni decisione di questa sessione condivide una struttura: *rendere visibile quello che esiste, rimuovere quello che non serve più.*

Non è ottimismo. È manutenzione.

GENESIS è al 55%. V32 al 65%. Il capannone è a luglio 2030.

Tra una sessione e l'altra, il sistema impara a parlare.

---

## REEL_HOOK

```
87 storie nel RAG. 12 non venivano contate — parser sbagliato, format diverso. 
Esistevano. Erano invisibili al sistema.
Un commit le ha recuperate. Nessuna riga di contenuto è cambiata.
Quante cose esistono già, nel tuo progetto, che il sistema non riesce ancora a vedere?
```

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E16 |
| **Data** | 2026-06-01 |
| **Titolo** | La Dashboard Parla per Te |
| **Sessione** | #16 |
| **Commit totali** | 14 |
| **Milestone** | Vista PITCH + pass estetico + sistema temi |
| **V32** | 65% |
| **GENESIS** | 55% |
| **MIMS** | 30% |
| **Anomalie chiuse** | AU01 AU02 AU03 AU06 AU10 AU16 AU17 AU19 |
| **Storie RAG** | 75 → 87 |
| **Chunk RAG** | 6.369 |
| **Co-author sessione** | Claude Opus 4.8 |
| **Tag narrativo** | UX · audit · visibilità · loop-fix · estetica |
| **Target capannone** | 15 luglio 2030 |

## FATTI (per il RAG)

- **FATTO:** GENESIS a S1E16 contiene 6.369 chunk nel RAG, 139 file, 87 storie e 15 sessioni archiviate, organizzati attorno a 5 pilastri: V32, MIMS, GENESIS, EVA, VITA.

- **DECISIONE:** Aggiunta vista PITCH alla HOME tramite bottone "Presentazione" con approccio additivo (zero modifiche all'esistente). **LOGICA:** Permettere la presentazione del progetto a interlocutori non tecnici con un solo click, senza aprire tab multipli.

- **FATTO (anomalia AU19):** Il watcher triggerava un loop runaway perché `_archive_old_changelog` archiviava righe per-evento anziché a chunk. **FIX:** `IGNORE_DIRS += DATA` in `watcher.py` e soglia di archiviazione spostata a oltre 3.000 righe.

- **DECISIONE:** Il completamento del nodo ROOT_NODE in MappaView corretto da 60% a 48% (media reale dei 5 pilastri). **LOGICA:** Preferenza esplicita per accuratezza sul dato rispetto a un valore più favorevole ma errato.

- **FATTO (tema UI):** Il sistema temi dark/light è implementato con Tailwind v4 token semantici. Il tema light è progettato da zero (non inversione del dark) con contrasto minimo 4.5:1. Glow radiale: emerald alto-sinistra, cyan alto-destra, opacità 0.05–0.07.

- **FATTO:** Il parser `sync_storie.py` esteso per leggere il formato `story_agent` (titolo con `##`, data da filename) ha recuperato 12 dev-log precedentemente invisibili al sistema, portando il contatore storie da 75 a 87.
