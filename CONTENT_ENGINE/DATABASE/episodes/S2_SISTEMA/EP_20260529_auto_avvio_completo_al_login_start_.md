<!-- TOC -->

- [TITANIUM_OS  Episodio 2.08](#titaniumos-episodio-208)
  - [Il Sistema Che Si Ricorda di Sé](#il-sistema-che-si-ricorda-di-sé)
  - [COLD OPEN](#cold-open)
  - [ATTO I  342 PRINT CHE URLANO NEL VUOTO](#atto-i-342-print-che-urlano-nel-vuoto)
  - [ATTO II  UN LOGGER, 34 FILE, UN UNICO FILO](#atto-ii-un-logger-34-file-un-unico-filo)
  - [ATTO III  IL SISTEMA CHE SI AVVIA DA SOLO](#atto-iii-il-sistema-che-si-avvia-da-solo)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 2.08
## "Il Sistema Che Si Ricorda di Sé"

---

## COLD OPEN

Sono le 10:31 di un giovedì mattina.

Il file si chiama `RIAVVIO_SESSIONE.txt` e viene scritto sul desktop ogni volta che il computer si accende. Non perché Matteo se lo dimentichi — ma perché *il sistema* non deve dimenticare niente.

150 chunk nel RAG. 8 sessioni caricate. Stato dirty sul branch main.

Nella taverna da 12 m², la V32 aspetta. Config G è in corso — quattro gusset da 200mm sulla colonna Z sinistra devono ancora essere saldati. Ma oggi Matteo non ha ancora preso il TIG.

Oggi ha aperto un terminale.

---

## ATTO I — 342 PRINT CHE URLANO NEL VUOTO

C'è un momento preciso in cui capisci che un sistema ha smesso di essere un prototipo e ha bisogno di diventare una macchina.

Non è quando funziona. È quando cominci a non capire *perché* funziona.

GENESIS aveva 342 chiamate `print()` sparse in decine di file Python. Alcune loggavano errori. Alcune loggavano stato. Alcune erano lì dai primissimi giorni — quando bastava vedere qualcosa passare nel terminale per sentirsi dire che andava tutto bene.

Il problema con i `print()` è che sono sordi. Non sanno l'ora. Non sanno da dove vengono. Non si salvano da nessuna parte. Spariscono non appena chiudi la finestra — e se il processo gira in background con `pythonw`, non le vedi nemmeno.

`sys.stdout è None.`

Quella riga nel commit dice tutto. Un processo figlio avviato con `DETACHED_PROCESS` — il modo in cui Windows lancia i programmi senza aprire una finestra — non ha stdout. Ogni `print()` lanciata in quel contesto è un urlo in una stanza senza aria. Il messaggio esiste. Non arriva da nessuna parte.

La soluzione non era silenziare gli errori. Era costruire un sistema che sapesse *dove stava parlando* prima di aprire bocca.

---

## ATTO II — UN LOGGER, 34 FILE, UN UNICO FILO

`CORE/log.py` è 40 righe di Python.

Fa una cosa sola: quando un modulo vuole loggare qualcosa, chiama `get_logger()` con il suo nome e riceve un logger configurato — `RotatingFileHandler` da 5MB con tre file di rotazione, output in `DATA/logs/`, più `StreamHandler` per il terminale quando c'è un terminale disponibile.

Il guard per `sys.stdout` è lì: se lo stdout non esiste, il `StreamHandler` non viene agganciato. Nessuna eccezione. Nessun crash silenzioso.

34 file aggiornati in un giorno.

`watchdog.py` migrato. `api_server.py` migrato. Il modulo story agent migrato. L'updater del profilo GitHub migrato. Ogni file che prima urlava nel vuoto ora scrive in `DATA/logs/` con timestamp, nome modulo, livello di severità.

I `print()` rimasti sono 131. Erano 342.

Non è ancora zero — e probabilmente non sarà mai zero, perché alcuni `print()` sono output intenzionale verso l'utente, non diagnostica interna. Ma la distinzione ora esiste. Prima non esisteva.

C'è una differenza sottile tra un sistema che *funziona* e un sistema che *sa di funzionare*. Il primo va bene finché non si rompe. Il secondo, quando si rompe, ti dice dove.

---

## ATTO III — IL SISTEMA CHE SI AVVIA DA SOLO

`START_LOGIN.bat v1.2` è un file batch di Windows che gira all'avvio della sessione utente.

In ordine: avvia il Watchdog da `CORE/`. Avvia la Dashboard. Lancia il rebuild del RAG. Avvia n8n. Apre Windows Terminal.

`mente_watcher` è incremental — non ricostruisce tutto da zero ogni volta, controlla i delta.

`/api/restart` è un endpoint POST su Flask. Quando viene chiamato, avvia un thread che aspetta 0.5 secondi e poi chiama `os._exit(0)`. Il delay esiste perché la risposta HTTP deve tornare al client prima che il processo muoia. Senza quello, la connessione si chiude bruscamente e il client non sa se il restart è partito o se qualcosa è andato storto.

`RunLevel Highest` nell'aggiornamento del profilo GitHub significa che il task scheduler di Windows esegue lo script con privilegi elevati. Aggiorna il README del profilo Microindustry/Microindustry con lo stato live di GENESIS — completamento, milestone attivo, ultimo commit.

Tutto questo insieme fa una cosa: quando Matteo accende il computer la mattina, GENESIS è già sveglio. Non deve avviare processi. Non deve aspettare. Il file `RIAVVIO_SESSIONE.txt` è già lì, sul desktop, con i metadati della sessione precedente, pronto per essere incollato in Claude.

Il sistema si ricorda di sé. Questo era il punto.

---

## CHIUSURA

C'è una sensazione strana nel lavorare su un sistema che documenta sé stesso mentre lo costruisci.

Il RAG ha 150 chunk. Sono estratti di sessioni, decisioni, specifiche tecniche, errori corretti. Ogni volta che Matteo riapre una sessione, parte del contesto è già lì — non perché lo ha scritto a mano, ma perché il sistema lo ha salvato mentre lavorava.

La colonna Z della V32 aspetta ancora i suoi quattro gusset da 200mm. Config G è al 65% come il giorno prima. Il titanio non si salda da solo.

Ma c'erano 342 chiamate `print()` che urlavano nel vuoto. Ora ci sono 131, e le altre 211 hanno trovato un posto dove andare.

A volte il lavoro non è avanzare. È sistemare il terreno su cui camminerai dopo.

Il dirty flag sul branch main verrà risolto. I gusset verranno saldati. Il capannone è ancora al 2030.

Intanto, il sistema si è ricordato di sé.

---

## REEL_HOOK

342 `print()` in un sistema che gira senza terminale. Stdout era None — ogni log spariva nel nulla. In un giorno: CORE/log.py, 34 file migrati, 211 chiamate convertite. Non perché GENESIS non funzionasse. Perché quando si romperà, voglio sapere esattamente dove.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E08 |
| **Titolo** | Il Sistema Che Si Ricorda di Sé |
| **Data** | 2026-05-29 |
| **Progetto primario** | GENESIS |
| **Milestone** | Logging centralizzato completato |
| **Componenti** | CORE/log.py · watchdog.py · api_server.py · START_LOGIN.bat · mente_watcher |
| **Metrica chiave** | print() ridotti da 342 a 131 — 34 file migrati |
| **V32 completamento** | 65% — Config G in corso |
| **GENESIS completamento** | 78% |
| **Prossimo step** | Saldare 4 gusset 200mm — colonna Z sinistra |
| **Target capannone** | 15 luglio 2030 |
| **Tag narrativo** | infrastruttura · resilienza · auto-avvio · logging |

## FATTI (per il RAG)

- **FATTO:** GENESIS aveva 342 chiamate `print()` sparse in decine di file Python prima della migrazione al sistema di logging strutturato.

- **DECISIONE:** Creato `CORE/log.py` (40 righe) come logger centralizzato con `RotatingFileHandler` da 5MB, 3 file di rotazione, output in `DATA/logs/`, e `StreamHandler` condizionale — agganciato solo se `sys.stdout` non è `None` (guard per processi `DETACHED_PROCESS` su Windows). **LOGICA:** I processi avviati senza finestra non hanno stdout; i `print()` in quel contesto vengono persi silenziosamente.

- **FATTO:** In un giorno migrati 34 file (tra cui `watchdog.py`, `api_server.py`, story agent, updater profilo GitHub). Dopo la migrazione le chiamate `print()` residue sono 131 su 342 originali (211 convertite).

- **FATTO:** `START_LOGIN.bat v1.2` si esegue all'avvio della sessione utente Windows e avvia in sequenza: Watchdog da `CORE/`, Dashboard, rebuild RAG (incrementale, solo delta), n8n, Windows Terminal. Scrive `RIAVVIO_SESSIONE.txt` sul desktop con i metadati della sessione precedente.

- **DECISIONE:** L'endpoint `/api/restart` (POST, Flask) avvia un thread con delay di 0.5 secondi prima di chiamare `os._exit(0)`. **LOGICA:** Il delay garantisce che la risposta HTTP torni al client prima che il processo termini, evitando chiusura brusca della connessione.

- **FATTO:** Il RAG di GENESIS al momento dell'episodio contiene 150 chunk estratti da 8 sessioni caricate. La colonna Z della V32 (Config G) è al 65% — mancano 4 gusset da 200mm da saldare.
