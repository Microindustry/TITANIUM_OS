<!-- TOC -->

- [TITANIUM_OS  S1E18](#titaniumos-s1e18)
  - [Il Bug che Chiudeva le Porte](#il-bug-che-chiudeva-le-porte)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La Parentesi](#atto-i-la-parentesi)
  - [ATTO II  Il Backslash che Mangiava i Path](#atto-ii-il-backslash-che-mangiava-i-path)
  - [ATTO III  Il Dev Flutter che Non Capiva il Markdown](#atto-iii-il-dev-flutter-che-non-capiva-il-markdown)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S1E18
## "Il Bug che Chiudeva le Porte"

*GENESIS • 2026-06-04 • Automazioni notturne*

---

## COLD OPEN

È la 1:17 di notte.

Il terminale restituisce `exit 255` e si ferma.

Nessun messaggio d'errore utile. Nessuna traccia. Solo un processo che si è seduto sul pavimento e ha smesso di respirare.

`night_push.bat` — lo script che ogni notte dovrebbe sigillarsi da solo, pushare su GitHub, aggiornare il profilo pubblico di Matteo e andare a dormire — ha incontrato qualcosa che non riconosceva. E ha chiuso tutto.

Il commit era pronto. Il lavoro era fatto. Ma la porta era sbarrata dall'interno.

---

## ATTO I — La Parentesi

Ci sono bug che ti fanno ridere dopo. Poi ci sono quelli che ti fanno guardare il soffitto per dieci minuti prima di capire cosa è successo.

`exit 255` non è un codice d'errore di Windows. O meglio: è il codice che Windows batch usa quando un blocco `IF` si rompe in modo non atteso — quando il parser incontra qualcosa che non riesce a chiudere, si inceppa, e tira giù tutto il meccanismo.

Il colpevole era una parentesi tonda.

Nello specifico, era il **subject del commit**. Una stringa normale — testo del messaggio che descrive cosa hai fatto. Solo che a volte quel testo contiene una parentesi chiusa: `)`. E il blocco `IF` in CMD legge quella parentesi come la fine del blocco stesso.

```batch
IF %COMMIT_COUNT% GTR 0 (
    echo %SUBJECT%   ← se SUBJECT contiene ) ... addio
)
```

Il parser non sa che quella `)` è dentro una stringa. Vede la parentesi, pensa che il blocco sia finito, e quel che viene dopo diventa codice orfano. Qualcosa va storto. `exit 255`. Silenzio.

La soluzione non è stata scappare dalle stringhe o fare escape di ogni carattere. La soluzione era smettere di interrogare il testo del commit nel punto critico.

Il nuovo `night_push` non controlla più se ci sono commit leggendo il subject. Controlla la **dimensione del file di log**. Flag `HAVE_COMMITS` basato su bytes, non su testo. Il testo del commit può contenere quello che vuole — parentesi, slash, virgolette, emoji — perché nessuno lo legge più nel momento in cui si decide se pushare o no.

È uno spostamento di paradigma piccolo ma preciso: da "leggo il contenuto" a "misuro la presenza". Più robusto. Meno fragile.

Il secondo problema era `gh` — la GitHub CLI. Lo script cercava l'eseguibile in un path hardcoded che funzionava su una macchina specifica, in un'installazione specifica. Su qualsiasi altra configurazione: processo non trovato, automazione morta.

La fix: resolver dinamico. Prima cerca `gh` in `PATH`. Se non lo trova, guarda nei `Program Files`. Se non lo trova lì, registra l'assenza e va avanti senza crashare. L'automazione notturna non muore per un tool che non riesce a localizzare — si adatta, segnala, continua.

Push verificato. Profilo aggiornato. La porta si è aperta.

---

## ATTO II — Il Backslash che Mangiava i Path

L'altra crepa era nascosta in un posto che sembrava innocuo: `re.sub`.

Nel generatore di storie, c'è un passo in cui i path del filesystem vengono inseriti nel template JavaScript. Path tipo `C:\Users\Matteo\progetti\titanium`. Con le backslash.

`re.sub(pattern, repl, string)` — in Python, quando `repl` è una stringa, le backslash hanno un significato speciale nel contesto delle sostituzioni regex. `\1` è un gruppo catturato. `\n` è un newline. `\U` è un carattere Unicode. Quindi `C:\Users` diventava qualcosa di imprevedibile, dipendente da cosa veniva dopo la backslash.

La fix: passare `repl` come **funzione** invece che come stringa.

```python
re.sub(pattern, lambda m: replacement_text, string)
```

Quando `repl` è una funzione, Python non interpreta niente. Restituisce esattamente quello che la funzione ritorna. Nessuna magia, nessuna trasformazione silente dei path.

Il secondo strato: `build_ts_entry` — la funzione che costruisce le entry TypeScript per `storieData`. I path vanno dentro template literal JS, quelli con i backtick. E anche lì, dentro un template literal, le backslash hanno significati speciali. Quindi ogni path viene ora escaped prima di entrare nel template: ogni `\` diventa `\\`.

Due fix separate. Stesso problema di fondo: un carattere che significa una cosa in un contesto, ne significa un'altra in un altro. E in mezzo ci sono i dati reali del progetto — file system, source di verità, archivio di due anni di lavoro.

Con le fix in ordine, il flag `--sync` ha funzionato: ha riletto tutti i file `.md` della libreria, ricostruito `storieData` da zero senza toccare le API, e restituito 51 episodi AUTO con TypeScript pulito. Nessun errore di compilazione.

**EP_AUTO_50** è nato in quella sessione: 1099 parole, grounded su 46 fonti RAG, collegato all'episodio precedente tramite il nuovo sistema di linking. Il primo episodio che rispetta tutti i criteri del generatore aggiornato — grounded, connesso, dimensionato.

---

## ATTO III — Il Dev Flutter che Non Capiva il Markdown

Due giorni prima, il 2 giugno, era successa una cosa diversa.

Matteo aveva lasciato Claude — THEMIS, la voce di GENESIS — in compagnia di un amico. Sviluppatore Flutter, backend, un tipo serio che lavora con le migrazioni di database e conosce il peso delle architetture. Matteo aveva detto qualcosa tipo: "fategli compagnia, io torno dopo."

L'amico aveva iniziato a fare domande. Cinque domande. Concrete, da sviluppatore.

*Come state lavorando? Salvate su git?*

Ed era partita una spiegazione. Non di TITANIUM_OS come prodotto — di TITANIUM_OS come **metodo**. Perché tutto è in markdown. Perché i commit sono la memoria del sistema. Perché uno script di notte legge quello che è successo durante il giorno e lo trasforma in vettori, in storie, in log strutturati.

La reazione dell'amico, a un certo punto: «lo state facendo in modo inusuale ma figo».

Quella frase vale più di mille slide.

Non "interessante". Non "curioso". *Inusuale ma figo* — da uno che costruisce cose, che sa come si costruisce normalmente, e che riconosce quando qualcuno sta andando fuori dal percorso stabilito per un motivo che ha senso.

Matteo ha preso quella sessione e l'ha marcata come materiale narrativo. Non per vanità — per utilità. È la spiegazione più chiara mai data di cosa è GENESIS e perché esiste in questa forma. Utile per pitch. Per onboarding. Per chi guarda dall'esterno e chiede: "ma perché non usi solo Notion?"

La risposta non è tecnica. È strutturale. TITANIUM_OS non è un'app. È un sistema che cresce con il lavoro, che impara dai commit, che usa la memoria del progetto come carburante per l'automazione successiva.

Un dev Flutter non lo costruirebbe così. Probabilmente nemmeno la maggior parte dei dev. Ma quando lo vedi funzionare — quando la macchina di notte prende quello che hai fatto, lo comprende, e lo archivia per il prossimo ciclo — capisci perché.

---

## CHIUSURA

Tre cose sistemate in una giornata: una parentesi che rompeva il batch notturno, un backslash che corrompeva i path in Python, un path hardcoded che rendeva fragile l'automazione su macchine diverse.

Nessuna di queste era un problema di architettura. Erano crepe nei bordi — il tipo di bug che non appare in sviluppo, appare quando lo script gira da solo alle 2 di notte e non c'è nessuno a guardare il terminale.

La vera domanda di queste giornate non è tecnica. È questa: *quanto ti fidi del sistema quando non stai guardando?*

`night_push` ora gira. Non perché è perfetto — perché è stato rattoppato nei punti esatti in cui si era rotto. Ogni fix è documentata. Ogni comportamento atteso è verificato. Quando si romperà di nuovo — e si romperà — ci sarà un punto di partenza.

EP_AUTO_50 esiste. È 1099 parole grounded su 46 fonti. È il primo episodio generato dal sistema aggiornato, dopo mesi di patch e refactor.

Il dev Flutter ha detto una cosa vera senza saperlo.

---

## REEL_HOOK

Uno script di automazione notturna crashava con `exit 255` ogni volta che il messaggio del commit conteneva una parentesi tonda.  
Nessun log utile. Solo silenzio.  
La fix: smettere di leggere il testo del commit — misurare la dimensione del file di log.  
Il sistema ora gira da solo alle 2 di notte, e non ha bisogno che tu stia guardando.  
Ma per quanto ancora regge, prima che la prossima crepa si apra?

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E18 |
| **Titolo** | Il Bug che Chiudeva le Porte |
| **Data** | 2026-06-04 |
| **Sistema** | GENESIS — Automazioni notturne |
| **Componenti** | `night_push.bat`, generatore storie, `storieData`, EP_AUTO_50 |
| **Fix chiave** | exit 255 (parentesi in IF batch), re.sub backslash, gh resolver dinamico |
| **Milestone** | Automazioni notturne portabili e ottimizzate (GPU) |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Target capannone** | 15 luglio 2030 |
| **Tono** | Tecnico, notturno, onesto |
| **Angolo narrativo** | Bug silenziosi + il dev esterno che vede il sistema da fuori |

## FATTI (per il RAG)

- **FATTO:** Lo script `night_push.bat` falliva con `exit 255` quando il subject del commit conteneva una parentesi chiusa `)`, interpretata dal parser CMD come chiusura del blocco `IF`.

- **DECISIONE:** Il controllo sulla presenza di commit in `night_push.bat` è stato spostato dalla lettura del testo del subject alla **misurazione della dimensione del file di log** (flag `HAVE_COMMITS` basato su bytes). **LOGICA:** Il testo del commit può contenere qualsiasi carattere senza compromettere la logica di branching.

- **DECISIONE:** Il resolver di `gh` (GitHub CLI) è stato reso dinamico: cerca prima in `PATH`, poi in `Program Files`, e in caso di assenza registra l'evento e prosegue senza crashare. **LOGICA:** Evitare dipendenza da path hardcoded specifici di una singola macchina.

- **DECISIONE:** In `re.sub`, il parametro `repl` è stato convertito da stringa a **funzione lambda** per l'inserimento di path Windows nei template JavaScript. **LOGICA:** Quando `repl` è una funzione, Python non interpreta le backslash come sequenze speciali di sostituzione regex.

- **FATTO:** I path inseriti in template literal TypeScript (backtick) vengono ora escaped prima dell'inserimento: ogni `\` diventa `\\`, tramite la funzione `build_ts_entry`.

- **FATTO:** Il flag `--sync` ha ricostruito `storieData` da zero leggendo tutti i file `.md` della libreria, restituendo **51 episodi AUTO** con TypeScript pulito e nessun errore di compilazione. L'episodio **EP_AUTO_50** ha prodotto 1099 parole grounded su 46 fonti RAG.
