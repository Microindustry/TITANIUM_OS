<!-- TOC -->

- [TITANIUM_OS  S2E15](#titaniumos-s2e15)
  - [IL GIORNO IN CUI IL SISTEMA HA DETTO LA VERITÀ](#il-giorno-in-cui-il-sistema-ha-detto-la-verità)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LA MENZOGNA BENEVOLA](#atto-i-la-menzogna-benevola)
  - [ATTO II  TRE FACCE, UNA FONTE](#atto-ii-tre-facce-una-fonte)
  - [ATTO III  IL MOTORE E LA NOTA SERALE](#atto-iii-il-motore-e-la-nota-serale)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E15
## IL GIORNO IN CUI IL SISTEMA HA DETTO LA VERITÀ

*8 luglio 2026 — Taverna, 22:47*

---

## COLD OPEN

Lo schermo della dashboard mostra due badge verdi: **ag05 LIVE**, **gr05 DONE**.

Matteo ci passa sopra il cursore. Poi apre `nexus.py`.

`mcpServers: {}`

Vuoto.

Il codice non è mai stato cablato. NEXUS non è mai stato raggiungibile. Quei badge verdi mentivano da settimane — forse da mesi — e nessuno se n'era accorto perché il sistema non aveva un modo per accorgersene. O meglio: aveva tutti i pezzi per accorgersene, ma erano sparsi. La verità era sparsa.

Questa è la storia di una sessione dedicata a raccoglierla.

---

## ATTO I — LA MENZOGNA BENEVOLA

C'è un tipo di bug che non rompe nulla.

Non blocca un agente, non fa crashare la Flask API, non genera un errore nel log. Continua semplicemente a mostrare uno stato che non corrisponde alla realtà. Verde dove c'è vuoto. *Active* dove c'è silenzio.

Il fix **`genesisData — NEXUS allineato alla verità`** era tecnicamente banale: tre righe. Il punto non è il codice — è che quelle tre righe hanno richiesto di guardare il sistema negli occhi e ammettere che `ag05` e `gr05` dichiaravano *live/done* su un'infrastruttura che non esisteva ancora. `nexus.py` era lì, nel repo, ma `mcpServers` era un dizionario vuoto. NEXUS era irraggiungibile. Il commit dice la verità senza giri di parole.

Questa cosa — chiamarla col suo nome — è più difficile di quanto sembri quando sei dentro a un sistema che hai costruito tu.

Il bias del costruttore è sottile: tendi a leggere lo stato che *vuoi* vedere, non quello che c'è. La dashboard mostrava verde perché era stata scritta per mostrare verde quando certi campi erano popolati. Ma i campi erano stati popolati a mano, ottimisticamente, senza che il codice sottostante esistesse. Un placeholder diventato verità ufficiale per inerzia.

La sessione #56 è iniziata qui: decidere che il sistema deve dire la verità. Anche quando fa male.

---

## ATTO II — TRE FACCE, UNA FONTE

Il secondo problema era più strutturale.

La **"verità sparsa"** — questo è il nome che Matteo ha dato al problema nel commit — è quando le stesse informazioni esistono in posti diversi, in forme diverse, e nessuno dei posti è la fonte. Ogni aggiornamento deve essere fatto tre volte. Ogni volta che dimentichi uno dei tre posti, il sistema si desincronizza. Silenziosamente.

Il fix del **punto 1** ha impostato tre decisioni di architettura che cambiano la geometria dei dati:

**au18 — Mappa derivata.** `mappaData.ts` diventa la fonte unica da cui V32, GENESIS, MIMS derivano i loro stati. Prima esistevano come isole separate. Ora c'è una sorgente che si propaga. `sync_valore.py` fa lo stesso per `valoreData.json`: legge dal documento fonte in MENTE, scrive il JSON che la dashboard consuma. Un solo punto di modifica. Zero deriva.

**au09 — Percentuali con nome esplicito.** Sembrava un dettaglio. Non lo è. Quando una percentuale non ha un nome — quando è solo un numero — ogni lettore la interpreta a modo suo. Il 65% di V32 con nome esplicito significa una cosa precisa. Senza nome, significa tutto e niente.

**au16 — MASTER declassato ad archivio.** Questa è la decisione che costa di più. C'era un file che si chiamava MASTER e che per un certo periodo era stato la fonte di verità. Non lo è più — ma continuava a esistere con quel nome, con quel peso. Declassarlo non è cancellarlo: è essere onesti sul suo ruolo attuale. È igiene. È chiarire la gerarchia di chi comanda sui dati.

E poi le **TRE FACCE**: la sidebar diventa TITANIUM / NINA / PUBBLICAZIONI. Non è una scelta estetica — è una scelta di identità. Il sistema ha tre anime distinte che non devono confondersi. TITANIUM è il progetto fisico e cognitivo. Nina è il personaggio, la voce, la pipeline di contenuto. PUBBLICAZIONI è l'output — quello che il sistema produce verso il mondo esterno.

Prima erano mischiati. Ora hanno una porta ciascuno.

La vista PUBBLICAZIONI ha portato con sé una ricognizione del sistema: Postiz + Graph API, IG max 10 slide, LinkedIn in formato PDF, slide già a 1080x1350, Postiz con MCP server verificato, scaletta di attivazione in 9 passi. Non è stato fatto tutto — ma è stato *mappato* tutto. È diverso.

---

## ATTO III — IL MOTORE E LA NOTA SERALE

Due cose minori che non sono minori.

**`max_retries=4`** — `story_agent`, `self_improve`, `night_audit`, `nina_agent`: quattro agenti notturni che usavano il default SDK di Anthropic, che è 2 retry. Il backlog #52 lo segnalava. Ora è 4. Non è un numero magico — è il punto in cui un errore transitorio dell'API ha abbastanza tentativi per risolversi da solo senza che l'agente crolli silenziosamente e non lasci nessun artefatto. Un agente che crasha a notte fonda senza retry non produce nulla. Quattro retry sono la differenza tra una notte produttiva e una notte persa.

**La card VALORE — IL MOTORE.** `sync_valore.py` non è solo igiene: è il momento in cui il grafo del sistema diventa una mappa leggibile. Grafo → mappa LV → Nina. Il messaggio fondante. È la prima volta che la home della dashboard mostra non solo *cosa esiste* ma *perché esiste* — la logica di connessione tra le parti. Questo importa perché tra sei mesi, riaprendo il sistema, la domanda non sarà "cosa c'è qui" ma "perché è fatto così". Il MOTORE risponde a quella domanda.

E poi c'è il commit di chiusura: **`RIAVVIO — nota serale`**.

Non è un commit tecnico. È Matteo che lascia un messaggio a se stesso per la prossima apertura. Cosa è stato fatto. Quali sono le priorità riviste. Cosa non deve essere dimenticato.

È il sistema che si parla da solo attraverso il tempo. Il commit con co-author Claude Fable 5 — perché quella nota è stata scritta insieme, un fatto reale di questo progetto — e poi la sessione si chiude.

---

## CHIUSURA

Una sessione come questa non produce niente che si vede.

Non c'è un componente fresato, non c'è un asse che si muove, non c'è un pannello MIMS stampato. C'è un sistema che è diventato più onesto su sé stesso. Badge che non mentono più. Percentuali che hanno un nome. Un MASTER che sa di essere un archivio. Tre porte invece di una stanza confusa.

Il lavoro di igiene non è glamour. Ma è quello che decide se il sistema funziona ancora tra un anno o se diventa il tipo di cosa che non riesci più a toccare senza rompere qualcosa.

V32 è al 65%. GENESIS è al 70%. Il target è luglio 2030. Tra il punto in cui siamo e il capannone c'è ancora molta strada — e quella strada si percorre solo se il sistema che la mappa dice la verità.

Stasera il sistema dice la verità.

È un buon punto da cui ricominciare.

---

## reel_hook

`mcpServers: {}` — NEXUS dichiarato live da settimane, codice mai scritto. Badge verde su vuoto assoluto. Oggi ho aperto `nexus.py` e l'ho guardato in faccia. Fix: tre righe. Costo reale: ammettere che costruire il sistema e costruire la mappa del sistema sono due cose diverse — e che la seconda stava mentendo sulla prima. Il prossimo passo è che non menta più.

---

## FATTI (per il RAG)

- **DECISIONE:** `mcpServers` in `nexus.py` era vuoto — ag05/gr05 dichiaravano `live/done` senza codice funzionante; allineato allo stato reale (NEXUS irraggiungibile).
- **LOGICA:** I campi erano stati popolati manualmente come placeholder ottimistici; nessun check automatico verificava la corrispondenza tra dichiarazione e codice effettivo.
- **DECISIONE:** `max_retries=4` impostato sui 4 agenti notturni (story_agent, self_improve, night_audit, nina_agent) — default SDK Anthropic era 2.
- **LOGICA:** Con 2 retry un errore transitorio API a notte fonda abbatte l'agente senza produrre artefatti; 4 retry coprono i picchi di latenza tipici.
- **DECISIONE:** au18 — `mappaData.ts` fonte unica; au09 — percentuali con nome esplicito; au16 — MASTER declassato da fonte-verità ad archivio.
- **LOGICA:** Verità sparsa su più file senza gerarchia chiara genera deriva silenziosa a ogni aggiornamento parziale.
- **DECISIONE:** Sidebar ristrutturata in tre sezioni distinte: TITANIUM / NINA / PUBBLICAZIONI.
- **OBIETTIVO:** Separazione identitaria che permette a ogni "faccia" del sistema di evolvere indipendentemente; prossimo passo misurabile = attivazione pipeline pubblicazioni (scaletta 9 passi verificata con Postiz MCP + Graph API).

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E15 |
| **Data** | 2026-07-08 |
| **Sessioni di riferimento** | #56, #57 |
| **Sistemi coinvolti** | GENESIS, dashboard React |
| **Commit chiave** | fix(#57) genesisData, feat(#56) LE 3 FACCE, feat(#56) verita sparsa pt.1, fix(#57) max_retries=4, feat(#57) card VALORE |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Tag narrativo** | igiene sistema, verità dei dati, identità, architettura informazione |
| **Target capannone** | 15 luglio 2030 |