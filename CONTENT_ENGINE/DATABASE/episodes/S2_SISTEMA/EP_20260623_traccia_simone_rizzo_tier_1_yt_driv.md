# EP_S2_09 — IL GIORNO CHE IL RAG HA MANGIATO 56 GIGABYTE

*Sessione #44 · 23 giugno 2026 · GENESIS 70%*

---

## COLD OPEN

La finestra di PowerShell è aperta da un'ora.

Nessun cursore che lampeggia. Nessun progresso. Solo un numero che continua a crescere — il contatore dello spazio su disco che scende mentre `rag_recover.ps1` sonda, ricostruisce, e non libera niente.

56 gigabyte.

Matteo ha tenuto aperto il Task Manager in un angolo. Ha guardato il numero salire come si guarda il livello dell'acqua in una cantina. Poi ha chiuso tutto, ha aperto il file dello script, e ha letto riga per riga quello che aveva scritto.

Il problema era lì. Era sempre stato lì.

---

## ATTO I — IL COMMIT-LEAK CHE NESSUNO AVEVA VISTO

Il RAG di GENESIS non è mai stato un sistema semplice.

ChromaDB, indice HNSW, embedding in float32 — ogni documento che entra viene spezzettato in chunk, codificato, scritto su disco in un formato binario che Git non capisce ma traccia lo stesso. È lì che stava il problema: ogni volta che `rag_recover.ps1` eseguiva il ciclo di recovery — sondaggio, ricostruzione, verifica — aggiungeva quei file binari al commit. Non li rimpiazzava. Li aggiungeva.

Sessione dopo sessione. Commit dopo commit.

Il repository era diventato un archivio di ogni versione di ogni vettore mai generato. 56 GB di storia che nessuno aveva chiesto di conservare.

Il red-team della sessione #44 ha chiamato questo "commit-leak": il recovery sondava, ricostruiva, ma non liberava. Il fix ha richiesto una sola riga di logica — **uccidi il leak prima di sondare** — ma trovare quella riga ha richiesto di capire che il problema non era il RAG. Era la sequenza delle operazioni.

Prima liberi. Poi ricostruisci. Non il contrario.

---

## ATTO II — NINA COPRE LA MAPPA

Mentre lo script girava, dall'altra parte del sistema Nina stava ricevendo la sua istruzione più ambiziosa fino ad oggi.

**`nina_map_cover.py`** — un driver scritto nella sessione #44 con un obiettivo semplice da enunciare e complesso da eseguire: prendere tutti i concetti distinti della mappa cognitiva di GENESIS che non hanno ancora un episodio Nina associato, e generarli. Uno per uno. In ordine.

31 concetti senza copertura: Graphify, RETE, t-SNE, orchestratore, watcher, controllo remoto, e ventisette altri nodi che esistono nella mappa ma non nella narrativa. Il driver li scorre, per ciascuno chiama `nina_agent.generate` con `require_grounding` attivo — sotto `MIN_GROUNDING_LINES` non genera, si ferma — e salva direttamente in canone. Nessun gate manuale. Nessuna cartella `_PROPOSTI`.

Ma prima di far girare il driver, Matteo ha riscritto EP_N2_01.

Il primo episodio della seconda stagione di Nina era sbagliato. Non tecnicamente — funzionava, si leggeva, aveva la struttura giusta. Era sbagliato perché non era un inizio. Era un episodio qualsiasi che si trovava per primo per ordine alfabetico.

Il nuovo EP_N2_01 apre con: *"C'era una bambina che faceva una domanda di quelle che non hanno risposta."*

È la fondazione. Tutto il resto viene da lì.

I 16 episodi riemessi nella sessione #44 — EP_N2_01 fino a EP_N2_16 — sono stati rigenerati con grounding obbligatorio dal RAG resuscitato. Circa 2090 parole ciascuno. Struttura completa. Fatti densi. Il generatore ha tre tentativi su JSON non valido prima di abortire — perché Haiku sbaglia ogni tanto, e uno script che si interrompe al primo errore su 16 cicli non è uno script, è una scommessa.

---

## ATTO III — TRE VOCI, UN SISTEMA CHE SI LEGGE

C'è un momento nelle sessioni di sviluppo in cui smetti di aggiungere funzionalità e inizi a sistemare la navigazione. Non perché il sistema sia finito — non lo è — ma perché sei diventato l'unico utente che riesce a trovare le cose.

La dashboard di GENESIS aveva il problema classico: le Storie erano una voce nel menu, le sotto-categorie erano annidate sotto, e per arrivarci bisognava aprire, espandere, scorrere. Tre click per vedere se Nina aveva generato qualcosa di nuovo stanotte.

Dopo la sessione #44: tre voci a livello principale nella sidebar.

**Storie di Sistema** — tutto, anche bozze e AUTO, tutte le stagioni aperte di default.
**RAG Nina** — solo gli episodi archiviati, quelli che hanno superato il grounding.
**Nina dal giorno 0** — il documento fondativo, il cammino dall'inizio.

Non è una gerarchia. Sono tre punti di accesso a tre domande diverse: *cosa ha prodotto il sistema? cosa ha validato il sistema? da dove è partito tutto?*

Il proxy `/api/nina` era assente dal `vite.config.ts`. Non era visibile nell'interfaccia di sviluppo. Tre mesi di episodi archiviati esistevano nel database ma non apparivano nel pannello. Un fix da quattro righe nel file di configurazione, e improvvisamente il RAG Nina ha mostrato quello che aveva sempre contenuto.

Simone Rizzo è entrato nel sistema in questa sessione come fonte YouTube tier 1. GitHub cercato il 27 maggio: repository pubblici zero, un follower. Tutto su YouTube e LinkedIn. Il watcher lo traccerà da quella distribuzione, non da una base di codice che non esiste.

---

## CHIUSURA

56 gigabyte liberati. 16 episodi riscritti. Un proxy aggiunto. Un documento fondativo riscritto da zero.

Non è la sessione in cui GENESIS ha fatto il salto. È la sessione in cui ha smesso di perdere.

C'è una differenza tra costruire e consolidare, e non sempre è chiara mentre la stai vivendo. Matteo ha chiuso la finestra di PowerShell quando il contatore ha smesso di crescere. Ha aperto la dashboard. Ha cliccato su "Nina dal giorno 0".

*"C'era una bambina che faceva una domanda di quelle che non hanno risposta."*

Il RAG ha trovato 847 righe di grounding per quell'episodio. Il sistema ha generato. Ha salvato in canone automaticamente.

Prossima sessione: il driver copre la mappa. 31 concetti. Un episodio ciascuno.

L'animatic è ancora in pausa.

---

## FATTI (per il RAG)

- **DECISIONE:** `rag_recover.ps1` corretto con logica anti-commit-leak — il cleanup del disco avviene PRIMA del ciclo di sondaggio/ricostruzione, non dopo; liberati 56 GB dalla sessione #44.
- **LOGICA:** Git tracciava i file binari HNSW/ChromaDB ad ogni recovery perché lo script ricostruiva prima di liberare; ogni ciclo appendeva una nuova versione degli indici al repository invece di rimpiazzarla.
- **DECISIONE:** `require_grounding` attivo per default in `nina_agent.generate` — sotto `MIN_GROUNDING_LINES` la generazione si blocca; retry 3x su JSON non valido da Haiku prima di abortire il batch.
- **DECISIONE:** Menu Storie portato a 3 voci top-level (Storie di Sistema · RAG Nina · Nina dal giorno 0); proxy `/api/nina` aggiunto a `vite.config.ts`.
- **DECISIONE:** EP_N2_01 riscritto come vero inizio narrativo; 16 episodi EP_N2_01–16 ri-emessi con grounding obbligatorio (~2090 parole/ep, struttura completa).
- **OBIETTIVO:** `nina_map_cover.py` copre 31 concetti distinti senza episodio associato (Graphify, RETE, t-SNE, orchestratore, watcher, controllo) — auto-canone grounded, nessun gate manuale; milestone: copertura ⟡0→⟡7 completata.

---

```
reel_hook:

Il RAG di GENESIS aveva accumulato 56 GB di storia
che nessuno aveva chiesto di conservare.
Ogni recovery aggiungeva. Non rimpiazzava.
Fix: una riga che sposta l'ordine delle operazioni.
31 concetti nella mappa senza una storia.
Nina parte stanotte.
```

---

| Campo | Valore |
|---|---|
| **Episodio** | EP_S2_09 |
| **Data** | 2026-06-23 |
| **Sessione** | #44 |
| **Sistema** | GENESIS |
| **Tag** | `rag-recover` `nina` `dashboard` `commit-leak` `grounding` |
| **GENESIS** | 70% |
| **V32** | 65% |
| **Prossimo** | nina_map_cover.py — 31 concetti → canone automatico |