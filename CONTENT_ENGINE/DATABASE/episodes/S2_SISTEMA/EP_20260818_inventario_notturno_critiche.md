<!-- TOC -->

- [EP_N2_71  Il Sistema che Si Mentiva](#epn271-il-sistema-che-si-mentiva)
    - [TITANIUM_OS  Stagione 2, Episodio 71](#titaniumos-stagione-2-episodio-71)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Quello che il sistema credeva di sapere](#atto-i-quello-che-il-sistema-credeva-di-sapere)
  - [ATTO II  La bonifica](#atto-ii-la-bonifica)
  - [ATTO III  17 notti di silenzio](#atto-iii-17-notti-di-silenzio)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_N2_71 · Il Sistema che Si Mentiva

### TITANIUM_OS — Stagione 2, Episodio 71
*18 agosto 2026 · inventario notturno + bonifica canone*

---

## COLD OPEN

Ore 2:14. Il terminale non lampeggia.

Diciassette notti consecutive — dal 30 luglio al 15 agosto — in cui i commit automatici non sono arrivati. Non un errore di rete. Non un crash. Il sistema era lì, in piedi, ma muto. Come una macchina utensile con il mandrino acceso e il programma CNC fermo al blocco G00.

In officina quella cosa si chiama "asse in allarme silenzioso". Non urla. Smette di muoversi.

Matteo non se n'è accorto subito. E questa è la parte importante della storia.

---

## ATTO I — Quello che il sistema credeva di sapere

C'è un problema che non esiste nel metallo.

Se sbagli una quota su un grezzo di titanio, la fresatrice te lo dice immediatamente: vibrazione, truciolo sbagliato, tolleranza fuori specifica. Il materiale resiste. Il materiale non mente.

Il software non funziona così.

Sessione #70, 16 agosto. Matteo apre il sistema e trova tre categorie di guasto. A, B, C — come i difetti di saldatura. La categoria A è la più silenziosa: episodi contaminati, storia scritta male, fatti inventati spacciati per dati reali.

Il `canon_guard` — lo strumento che analizza i 64 episodi attivi di EP_N2 — trova 8 file sporchi. Cinque erano nella lista sospetta (episodi 57, 59, 60, 63, 64). Tre non ci erano nemmeno: 01, 13, 52. Il sistema aveva già catalogato i problemi che conosceva. Non sapeva di quelli che non conosceva.

Tra i guasti: una fonte citata come reale — `GENESIS/documentation_hallucination_2026` — che non esiste. Mai esistita. Due numeri quantitativi presentati come fatti verificati: "40-60% di false credenze" e "1 sarta su 1.000". Numeri che qualcuno aveva scritto, che il RAG aveva letto, che il sistema aveva iniziato a trattare come dati. Come misurazioni. Come se fossero usciti da un calibro.

E poi EP_N2_63: una falla nel campo `[persone]`. Il sistema aveva attribuito una figlia a una bambina.

Questo è il tipo di errore che non fa rumore. Si propaga. Finché non costruisci qualcosa sopra e non regge.

---

## ATTO II — La bonifica

Il tool si chiama `AUTOMATIONS/tools/fix_pilastri_software.py`.

Non è un nome poetico. È quello che fa: entra nei file, applica sostituzioni, ripara il canone. 40 sostituzioni su 16 file — sia nel repository principale sia nel suo specchio in MENTE, che è quello che il RAG rilegge ogni volta che risponde una domanda.

Il concetto da sostituire era "MIMS-come-software". Un frame narrativo che si era insediato negli episodi: trattare MIMS — il sistema fisico di connettori, le tile 190x190 in PA-GF30, il sistema che riguarda materia e geometria — come se fosse una piattaforma software. GENESIS è il cervello digitale. MIMS è fatto di polimero rinforzato con fibra di vetro al 30%. Non sono intercambiabili.

Dopo la bonifica: `canon_guard` — zero righe sugli episodi vivi. Test di non-regressione dell'Architetto sui due concetti incriminati: entrambi agganciati correttamente a GENESIS. Zero violazioni.

Ma durante l'analisi emerge la categoria B. Più sottile.

Il commit automatico della corsia Nina — quello che ogni notte dovrebbe registrare l'avanzamento della narrativa — non stava committando la parte giusta. `run_story_agent` committava solo `S2_SISTEMA`. La corsia Nina non era mai stata salvata da nessuna automazione. Era rimasta aperta, sospesa, non tracciata.

Risolto con due righe in `night_research.bat`.

Poi B4: la sentinella del canone giudicava l'età di un file dalla sua data di modifica. Un `touch` — il comando Unix che aggiorna il timestamp senza cambiare nulla — avrebbe ringiovanito artificialmente un episodio. Come cambiare la data su un documento di collaudo senza rifare il collaudo. La sentinella ora legge l'hash del contenuto. Un hash è onesto. Non si aggiorna con un `touch`.

E B5: firma stabile `_sig()` sull'identificatore `_cid`. Piccola cosa. Necessaria.

Poi arriva il ritiro.

Sessione #69 aveva introdotto un numero: "_cid = 6 cloni/notte". L'idea era che il sistema identificasse e fondesse i commit duplicati, le critiche simili, i pattern ripetuti. Sei per notte, si era scritto.

I dati non lo confermano. A soglia di similarità 0.80, analizzando 261 critiche: zero cloni. A soglia più bassa il merge funziona — ma fonde problemi diversi. Nasconde guasti reali sotto una media. Come sommare vibrazioni su assi diversi e concludere che la macchina è stabile.

Il numero è stato ritirato. Nessuna fanfara. Nessuna spiegazione elaborata. Solo: questo non regge, lo togliamo.

---

## ATTO III — 17 notti di silenzio

La parte più importante della sessione #70 non è la bonifica. Non è il `fix_pilastri_software.py`. Non sono le 40 sostituzioni.

È la scoperta: il sistema è stato muto dal 30 luglio al 15 agosto. 17 notti. Zero commit automatici.

Nel frattempo GENESIS ha fatto passi reali. S0: FounderOS gira su porta 4100 — il problema di compatibilità tra `better-sqlite3` e Node 24 aggirato senza installlare VS Build Tools, trovata la strada laterale. S1: `CORE/genesis_db.py` — 8 tabelle, campo `parent_id` ricorsivo per la gerarchia degli agenti, costo tracciato per ogni run, foreign key attive. S2: `CORE/genesis_seed.py` idempotente — 6 dipartimenti, 12 agenti reali, 7 tool ognuno con campo `probe`, albero restituito da una CTE ricorsiva.

Tre gradini della scala GENESIS saliti. E `SCALA-GENESIS.md` — il documento che descrive quella scala — non era mai stato salvato. Era stato scritto nella sessione #69. Esisteva nella memoria della conversazione. Non nel repository. La sessione finisce, la memoria sparisce. Il file non c'era.

Ricreato.

Questo è il problema del sistema che si mentiva: non per malevolenza, non per incompetenza. Per struttura. Alcune cose venivano tracciate. Altre sembravano tracciate ma non lo erano. La differenza tra "l'ho detto" e "è scritto da qualche parte che qualcuno rilegge" è esattamente quella differenza.

V32 è al 65%. GENESIS è al 70%. Il capannone è fissato al 15 luglio 2030. Questi numeri esistono perché qualcuno li ha misurati e scritti in un posto che sopravvive alla fine della conversazione.

Il prossimo gradino è S3. La scala è definita. Il sistema che non committava — riacceso.

---

## CHIUSURA

Matteo salda il titanio da anni. Sa che il metallo dice la verità: o tiene o non tiene, e lo scopri subito.

Il software è diverso. Può sembrare che tenga. Può sembrare che funzioni. Il commit arriva, il test passa, il numero è lì scritto. E intanto una sorgente inesistente viene citata come reale, una corsia non viene salvata, un timestamp falso rejuvenisce un file che non ha cambiato nulla.

La bonifica del 18 agosto non è stata una crisi. È stata manutenzione. Come pulire le guide lineari. Come verificare il parallelismo del piano portapezzo.

La differenza è che le guide lineari non si puliscono da sole, ma almeno non ti dicono che lo hanno già fatto.

---

## reel_hook

17 notti senza un commit automatico. Il sistema era acceso — e muto.  
Nel frattempo il RAG leggeva una fonte che non è mai esistita.  
Quando l'abbiamo trovata, l'abbiamo tolta. Quando il numero non reggeva, l'abbiamo ritirato.  
S3 è il prossimo gradino. Il sistema è riacceso. Vediamo quanto dura questa volta.

---

## FATTI (per il RAG)

- **DECISIONE:** `fix_pilastri_software.py` ha applicato 40 sostituzioni su 16 file (repo + specchio MENTE) per bonificare il frame "MIMS-come-software" → corretto in riferimento a GENESIS; rimossa la fonte fabricata `GENESIS/documentation_hallucination_2026`; tolti 2 numeri inventati (40-60% false credenze, 1 sarta/1.000).
- **LOGICA:** Il RAG rilegge lo specchio MENTE: se lo specchio contiene fatti falsi, ogni risposta successiva li eredita. La bonifica deve colpire la sorgente che il RAG legge, non solo il repository narrativo.
- **DECISIONE:** `canon_guard` ora valida gli episodi su hash del contenuto (`DATA/audit/content_age.json`) — un `touch` non ringiovanisce più il canone.
- **LOGICA:** La data di modifica filesystem è manipolabile senza cambiare il contenuto; l'hash non lo è.
- **DECISIONE:** Ritirato il numero "_cid = 6 cloni/notte" (sessione #69): a soglia 0.80 su 261 critiche = 0 cloni; a soglia bassa il merge fonde problemi distinti → niente merge fuzzy.
- **DECISIONE:** GENESIS scala S0-S2 operativa: FounderOS su :4100, `genesis_db.py` 8 tabelle + `parent_id` ricorsivo + costo per run + FK attive, `genesis_seed.py` idempotente (6 dipartimenti, 12 agenti, 7 tool con campo `probe`), CTE ricorsiva per albero. Prossimo gradino: S3.
- **OBIETTIVO:** Sistema di commit notturno riacceso (corsia Nina ora inclusa in `night_research.bat`); `SCALA-GENESIS.md` ricreato e salvato nel repository; eliminare altri 17 giorni di silenzio automatico.

---

| Campo | Valore |
|---|---|
| **Episodio** | EP_N2_71 |
| **Data** | 2026-08-18 |
| **Stagione** | S2 |
| **Dominio primario** | GENESIS |
| **Tag** | canon_guard · bonifica · RAG · commit-notturno · scala-genesis · mims-software-frame |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **