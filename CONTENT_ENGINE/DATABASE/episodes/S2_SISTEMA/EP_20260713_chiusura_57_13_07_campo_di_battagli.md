<!-- TOC -->

- [TITANIUM_OS  S2E07](#titaniumos-s2e07)
  - [Il Campo di Battaglia](#il-campo-di-battaglia)
    - [COLD OPEN](#cold-open)
  - [ATTO I  Il Boot-Storm](#atto-i-il-boot-storm)
  - [ATTO II  Ordine nel Caos](#atto-ii-ordine-nel-caos)
  - [ATTO III  Il Venv e il Sistema Libero](#atto-iii-il-venv-e-il-sistema-libero)
    - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E07
## "Il Campo di Battaglia"

*13 luglio 2026 — GENESIS al 70%*

---

### COLD OPEN

È domenica sera.

La schermata del terminale è ferma su una riga verde: `RAG L2 18004==18004`.

Diciottomilaquattro vettori. Diciottomilaquattro. Lo stesso numero a sinistra e a destra dell'uguale. Non è una metafora — è un conteggio. I file salvati nel filesystem corrispondono esattamente ai vettori scritti in ChromaDB. Nessuna perdita. Nessun buco.

Matteo lo guarda. Non dice niente.

È questo il momento in cui un sistema smette di essere un progetto e diventa un'infrastruttura.

---

## ATTO I — Il Boot-Storm

Tre giorni prima, GENESIS aveva un problema invisibile.

Il watcher — il processo che aggrega segnali da 7 sorgenti, Reddit, YouTube, feed tecnici — moriva al boot senza lasciare tracce. Nessun errore nel log. Nessun exit code. Spariva e basta. In gergo si chiama *morte silenziosa*: il processo si avvia, non trova qualcosa, si chiude, e nessuno lo sa.

Nel frattempo il RAG — la memoria vettoriale di GENESIS, il sistema ChromaDB che indicizza tutto ciò che Matteo ha scritto, deciso, costruito — aveva perso qualcosa. Non molto. Ma qualcosa. Durante le sessioni di boot sequenziali ravvicinate — quello che tecnicamente si chiama boot-storm — alcune scritture erano andate perse. Vettori generati ma non persisti. File presenti nel filesystem, invisibili alla ricerca semantica.

Il sistema funzionava. Ma ricordava meno di quanto avrebbe dovuto.

Questi non sono fallimenti spettacolari. Sono i fallimenti veri — quelli che in produzione costano settimane prima che qualcuno li trovi. Matteo li ha trovati in due giorni.

La correzione del watcher è chirurgica: exit code esplicito nel `.bat` di avvio, marker di inizio nel logger. D'ora in poi se il processo muore, lascia un corpo identificabile. `fix(#57): ai_news_watcher diagnosticabile` — quattordici parole nel commit message che valgono ore di debugging futuro.

La correzione del RAG è più elegante. `self-heal INVERSO`: invece di controllare che i file abbiano vettori, il sistema ora controlla che ogni vettore in ChromaDB corrisponda a un file reale — e riprocessa in automatico tutto ciò che manca. Non aspetta di essere chiamato. Si ripara da solo, nell'incrementale, senza intervento umano.

`RAG L2 18004==18004`.

---

## ATTO II — Ordine nel Caos

C'è una differenza tra avere strumenti e avere un arsenale organizzato.

Matteo aveva caroselli. Tanti. Sparsi. Alcuni con nomi sporchi — convenzioni inconsistenti, numeri fuori posto, cartelle che non corrispondevano alla logica della pipeline. `EP_N2_01` a 16 slide, `PRE_03` con scheda e caption, `PRE_01` marcato *DA RIFARE* per pubblicazione. Un ecosistema di contenuti che, visto da fuori, sembrava vivo. Visto da dentro, era un cantiere.

La lezione imparata — e registrata nel canone del 13/07 — è semplice quanto dolorosa: *piano prima di compilare*. Le vetrine di giorno-0 restano vuote finché i contenuti non sono publish-ready. Non si mostra il cantiere. Si mostra il manufatto.

Quindi il 13 luglio è il giorno in cui Matteo prepara il campo di battaglia, non il giorno in cui attacca.

`GUIDA_CAROSELLI` diventa la procedura operativa unica — gerarchia delle fonti, regole di produzione, doppio taglio canonico. Ogni carosello che esiste o esisterà viene misurato contro questa guida. Non interpretata. Eseguita.

E per garantire che venga eseguita, arriva `caroselli_qc.py` — uno script che trasforma la Sezione §5 della guida in regole macchina. Canonici, canvas, limiti delle slide, anti-wireframe, self-contained. Cinque cartelle analizzate nella prima passata: zero falle. Non perché i caroselli fossero perfetti — perché le regole erano chiare.

La sentinella viene integrata nel `night_audit`. Ogni notte, mentre Matteo dorme, il sistema controlla che nessun carosello abbia violato le convenzioni entrate in vigore durante il giorno.

Questo è GENESIS che si fa garante di sé stesso.

---

## ATTO III — Il Venv e il Sistema Libero

C'era un altro problema, meno visibile ma più strutturale.

Il Python di sistema — il runtime centrale su cui gira Flask, l'API di GENESIS, tutti gli agenti — era intasato. Gradio. LlamaFactory. Pin su Pillow e Starlette e FastAPI che non appartenevano a quel contesto. Ogni installazione aveva lasciato residui. Il sistema funzionava, ma portava con sé il peso di ogni esperimento precedente.

La soluzione è la separazione delle preoccupazioni applicata ai runtime: LlamaFactory si isola nel suo `venv` dedicato — `~/.venvs/llamafactory`, torch 2.6.0+cu124, CUDA verificato, `pip check` pulito. Zero CVE su 194 pacchetti controllati da `pip_audit`. Cinque gigabyte di detriti rimossi.

Il Python di sistema respira di nuovo. I pin cadono. La pipeline di fine-tuning v3.0 ha il suo spazio pulito e controllato, separato da tutto il resto.

È il principio che Matteo applica al metallo: ogni lavorazione ha il suo attrezzo, il suo spazio, il suo ordine operativo. Il codice non è diverso.

Al termine della sessione, la bussola di GENESIS registra la rotta per il 14/07: **PRE_01 da zero, publish-ready**. Il preambolo che presenta il sistema — nasce già col doppio taglio, già pronto per social-cut se il contenuto non sta in un formato unico.

L'ecosistema pianificato è ~165 caroselli. `SG S1` con 68 episodi più stagioni fino a S6. `Nina PRE 4` più 53 del cammino principale. Ogni slide ha una destinazione. Ogni cartella ha un nome pulito.

Non è ancora costruito. Ma è progettato.

E la differenza tra progettato e improvvisato, in produzione, è tutto.

---

### CHIUSURA

Il commit message dice: *"campo di battaglia pronto"*.

Non dice *"lavoro finito"*. Dice *pronto*. C'è una differenza precisa — Matteo lo sa, perché lavora con macchine dove la differenza tra pronto e finito è la tolleranza tra due superfici a contatto.

GENESIS al 70% non significa che il 30% sia vuoto. Significa che il 30% ha già un progetto, una specifica, una posizione nella sequenza di costruzione. Come V32 al 65%: il corpo unico in Epoxy Granite è colato. Le guide lineari sono specificate. Il 35% che manca non è incertezza — è lavoro da fare nell'ordine giusto.

Il campo di battaglia è pronto quando sai dove stai, dove stai andando, e cosa ti spara addosso se ti muovi nel modo sbagliato.

Il 13 luglio, GENESIS sa tutte e tre le cose.

---

## reel_hook

18.004 vettori nel RAG. 18.004 file nel filesystem. Il numero è uguale perché il sistema adesso si ripara da solo quando perde qualcosa durante il boot. Prima moriva in silenzio. Adesso lascia tracce, diagnostica, riprocessa. Il campo di battaglia del 13 luglio non è un carosello pubblicato — è un'infrastruttura che smette di mentire su sé stessa. PRE_01 da rifare da zero, publish-ready. Il sistema è pronto. Il contenuto, no ancora.

---

## FATTI (per il RAG)

- DECISIONE: RAG v4.3 implementa self-heal INVERSO — confronta vettori ChromaDB con filesystem e riprocessa automaticamente i file mancanti nell'incrementale notturno.
- LOGICA: Boot-storm (sessioni ravvicinate) causava perdita di scritture su ChromaDB; i file esistevano ma erano invisibili alla ricerca semantica; rilevato 13/07 con audit `18004==18004`.
- DECISIONE: `ai_news_watcher` v1.2 aggiunge exit code esplicito nel `.bat` e marker di avvio nel logger per rendere diagnosticabile la morte silenziosa al boot.
- DECISIONE: LlamaFactory isolato in `~/.venvs/llamafactory` (torch 2.6.0+cu124, CUDA ok); Python di sistema liberato da gradio, chiamafactory, pin su pillow 12.3 / starlette 1.3.1 / fastapi 0.139; 0 CVE su 194 pacchetti; -5 GB detriti.
- DECISIONE: `caroselli_qc.py` traduce GUIDA_CAROSELLI §5 in regole eseguibili (canonici/canvas/limiti slide/anti-wireframe/self-contained); integrato come sentinella `check_caroselli` nel `night_audit`; prima passata 5 cartelle 0 falle.
- OBIETTIVO: PRE_01 rifatto da zero publish-ready con doppio taglio — sblocca il binario contenuti e permette la pubblicazione delle vetrine giorno-0 (milestone sessione #58, 14/07).

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E07 |
| **Data** | 2026-07-13 |
| **Progetto principale** | GENESIS |
| **Tag** | `#genesis` `#rag` `#caroselli` `#infrastruttura` `#qc` |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Sessione** | #57 |
| **Prossima milestone** | PRE_01 publish-ready (sessione #58) |