<!-- TOC -->

- [EP_AUTO_39  Milestone](#epauto39-milestone)
    - [Push main  tag v3.0.0 su GitHub sbloccato e pushato](#push-main-tag-v300-su-github-sbloccato-e-pushato)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL BLOCCO CHE NON ERA UN BLOCCO TECNICO](#atto-i-il-blocco-che-non-era-un-blocco-tecnico)
  - [ATTO II  TRE WORKFLOW E UN TAG](#atto-ii-tre-workflow-e-un-tag)
  - [ATTO III  COSA CAMBIA ADESSO](#atto-iii-cosa-cambia-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_39 — Milestone
### "Push main + tag v3.0.0 su GitHub sbloccato e pushato"

---
id: EP_AUTO_39
title: "Push main + tag v3.0.0 su GitHub sbloccato e pusha"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-06-03
data_generato: 2026-06-03
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Push main + tag v3.0.0 su GitHub sbloccato e pushato"
---

---

## COLD OPEN

L'episodio scorso eravamo fermi davanti a una storia Git gonfia di 978 megabyte — quasi tutto un file di modello che non doveva stare lì. L'abbiamo pulita. 72 megabyte di storia vera, il resto eliminato. Adesso che il repo era onesto, mancava solo un'ultima cosa: mandarlo su. Push main. Tag v3.0.0. GitHub sbloccato.

---

## ATTO I — IL BLOCCO CHE NON ERA UN BLOCCO TECNICO

Quando dico "push bloccato" devo essere preciso, perché la parola "bloccato" può significare cose diverse.

Non era un errore di autenticazione. Non era un problema di rete. Era un file da un gigabyte che stava dentro la storia del repository — il `model.safetensors` che mi ero portato dietro per settimane senza accorgermene — e GitHub non accetta oggetti sopra i 100 megabyte. Punto. Nessuna eccezione, nessun workaround pigro. O pulisci, o non pusha.

Quello che avevo fatto nell'episodio precedente era appunto quello: riscrivere la storia con `git filter-repo`, rimuovere il blob da ogni commit che lo aveva toccato, verificare che il `.gitignore` fosse aggiornato per bloccare certi path in futuro. Tutto documentato, commit isolati, niente cancella-e-rifai — quella è una regola che mi sono dato e che non nego mai, perché in un sistema che costruisco da solo ho bisogno che la storia sia leggibile tra sei mesi quando non ricordo niente.

Però c'era ancora il blocco sulla migrazione dell'infrastruttura. Il 6 febbraio avevo spostato tutto verso il PC fisso in taverna — quello con la GPU 1070 Ti, che gira 24/7 come cervello del sistema. Il Getac lo uso in mobilità, connesso via Tailscale. La pulizia del repo l'avevo fatta a freddo, come da nota: "Push GitHub bloccato da file 1GB — da pulire a freddo." L'avevo pulita. Adesso era il momento di chiudere il cerchio.

Il repo si chiama `Microindustry/TITANIUM_OS`. Branch main. Non ho mai lavorato su branch separati per le funzionalità principali — non perché non lo sappia fare, ma perché quando lavori da solo su un sistema personale il branch proliferation è rumore, non segnale. Ogni commit è isolato e additivo. La storia deve raccontare cosa è stato aggiunto, non cosa è stato cancellato e rifatto.

---

## ATTO II — TRE WORKFLOW E UN TAG

Il giorno del push non ho fatto solo `git push origin main` e ho finito. Ho usato quel momento per sistemare tre cose che erano rimaste a metà.

La prima è il sistema di CI. Avevo dei workflow GitHub Actions che si attivavano solo su `push` e `pull_request`. Funzionava, ma mancava un trigger che per come lavoro io è fondamentale: `workflow_dispatch`. Sembra un dettaglio. Non lo è.

```yaml
on:
  push:
  pull_request:
  workflow_dispatch:
```

Quella terza riga significa che posso avviare un workflow manualmente dall'interfaccia di GitHub, senza dover pushare un commit finto solo per far partire una pipeline. Quando sei in fase di debug di un workflow — e ci sono stato parecchie volte — fare un push vuoto per triggerare la CI è una scocciatura e inquina la storia. Con `workflow_dispatch` clicco un pulsante e parte. Semplice, pulito.

La seconda cosa che ho sistemato sono gli errori TypeScript che si trascinano da episodi precedenti — import non utilizzati, variabili dichiarate e mai lette. In officina il cliente vede il pezzo. Qui nessuno vede il commit. Ma il sistema sì. E io sì. Lasciare un import inutilizzato in un file che ha già superato revisione è come lasciare una briciola di lavorazione dentro un canale di lubrificazione: probabilmente non succede niente, ma non è così che lavoro. Li ho rimossi. Il compilatore non si lamenta più.

La terza cosa è stata il tag. `v3.0.0`. Ho scelto semantica di versione classica — major.minor.patch — e il salto a 3 non è casuale. Non è marketing. È il riconoscimento che TITANIUM_OS adesso ha un'identità strutturale diversa da quello che era a gennaio: ha un'infrastruttura a due macchine con Tailscale, ha un sistema di sessioni in Markdown collegato a un RAG vettoriale, ha workflow automatizzati, ha un'identità pubblica su GitHub con un profilo che mostra lavoro reale. Non è la stessa cosa di prima. Versione 3.

Il push è andato. Zero errori. La storia era pulita, il file gigantesco non c'era più, il `.gitignore` stava facendo il suo lavoro. GitHub ha accettato tutto. Il tag è comparso sulla pagina del repo: `v3.0.0 — main`.

Ho guardato lo schermo per circa tre secondi. Poi sono andato a fare il caffè.

---

## ATTO III — COSA CAMBIA ADESSO

Avere il main su GitHub con un tag di versione non è un traguardo simbolico. È infrastruttura.

Primo: adesso il PC fisso in taverna e il Getac sono sincronizzati attraverso un punto di verità esterno. Non è Tailscale che fa da backup — Tailscale serve per accedere al cervello remoto, non per la versione del codice. Git su GitHub è il ground truth. Se domani il disco del fisso muore, tiro giù il repo e ricomincio da dove ero. Senza questo push, quel punto di verità non esisteva davvero.

Secondo: i workflow sono attivi. GENESIS è al 70% — è il modulo di automazione e quello che genera più codice CI/CD. Avere `workflow_dispatch` attivo significa che posso testare i workflow di GENESIS senza aspettare un evento esterno. Questo accelera. Non in modo astratto — in modo concreto: meno commit finti, meno rumore nella storia, più controllo su cosa parte quando.

Terzo: MIMS è in `waiting_press`. Il modulo dei connettori modulari aspetta che VULCAN — la pressa polimeri — sia operativa. VULCAN non è ancora costruita fisicamente, ma il sistema software che la gestirà fa parte di TITANIUM_OS. Avere il repo pulito e pushato significa che quando VULCAN sarà pronta, non dovrò recuperare debito tecnico nel codice — il codice è già in ordine.

V32 è al 65%. La fresatrice CNC avanza. EVA, il sistema AI per Vita Natura, è al 40% — il centro estetico è attivo, i processi sono in corso, ma l'integrazione AI è a metà. IDENTITY è al 50%, che vuol dire che il profilo pubblico — GitHub compreso — è visibile ma non ancora completo.

Il prossimo passo concreto è documentare l'architettura di GENESIS nei file di sessione, perché il RAG deve poter rispondere a domande su come funziona l'automazione senza che io debba riaprire tutto ogni volta. Non è pigrizia. È efficienza di sistema: io sto costruendo qualcosa che deve funzionare anche quando la mia memoria a breve termine è occupata da una fresatrice che va calibrata o da un appuntamento di Vita Natura.

La differenza tra un artigiano industriale e un hobbista non è la qualità del pezzo singolo. È che l'artigiano costruisce il sistema per fare il prossimo pezzo meglio, più in fretta, con meno errori. Questo push è parte di quel sistema.

---

## CHIUSURA

*Il tag non certifica che ho finito. Certifica che so da dove ricomincio.*

---

## FATTI (per il RAG)

- **FATTO:** Il repository `Microindustry/TITANIUM_OS` aveva una storia Git gonfia da 978 MB a causa del file `model.safetensors`; dopo la pulizia con `git filter-repo` la storia è scesa a 72 MB.

- **FATTO:** GitHub blocca il push di oggetti superiori a 100 MB; il file `model.safetensors` superava 1 GB ed era la causa diretta del push bloccato.

- **DECISIONE:** Aggiunto trigger `workflow_dispatch` ai workflow GitHub Actions esistenti (`push`, `pull_request`). **LOGICA:** Permette di avviare manualmente le pipeline senza dover fare commit vuoti, evitando inquinamento della storia Git durante il debug dei workflow.

- **FATTO:** Il tag `v3.0.0` è stato pushato sul branch `main` del repo `Microindustry/TITANIUM_OS` in data 2026-06-03.

- **DECISIONE:** Il salto di versione a `v3.0.0` (major) riflette una discontinuità strutturale: infrastruttura a due macchine con Tailscale (PC fisso con GPU GTX 1070 Ti in taverna + Getac in mobilità), sistema sessioni Markdown collegato a RAG vettoriale, workflow automatizzati e presenza pubblica su GitHub. **LOGICA:** Il numero di major versione non è marketing ma marcatore di identità architetturale.

- **FATTO:** GENESIS risulta al 70% di completamento al momento del push (dato troncato a fine episodio).
