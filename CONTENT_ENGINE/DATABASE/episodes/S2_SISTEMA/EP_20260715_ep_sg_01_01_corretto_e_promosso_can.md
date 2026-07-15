<!-- TOC -->

- [TITANIUM_OS  Episodio S2.E07](#titaniumos-episodio-s2e07)
  - [Il Canone Non Si Negozia](#il-canone-non-si-negozia)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LA FALLA](#atto-i-la-falla)
  - [ATTO II  LA BUSSOLA](#atto-ii-la-bussola)
  - [ATTO III  LICONA](#atto-iii-licona)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)
  - [reel_hook](#reelhook)

<!-- /TOC -->

# TITANIUM_OS — Episodio S2.E07
## "Il Canone Non Si Negozia"
*15 luglio 2026 · Sessione #59 · Commit: fix(#59) + docs(#59)*

---

## COLD OPEN

Una bozza notturna. Slide 9.

Nina, nella presentazione, viene descritta come una parente.

Il sistema l'ha scritto. Il sistema l'ha riletto. Il sistema non ha fermato niente.

Matteo apre il file la mattina dopo e vede l'errore. Non è un bug di codice — è peggio. È una falla di canone: una relazione reale, tra persone reali, descritta in modo sbagliato davanti a un pubblico che non ha contesto. Una cosa che, pubblicata, avrebbe richiesto una spiegazione che non avrebbe mai recuperato la fiducia persa.

Questo è il tipo di errore che non fa rumore finché non fa danni.

---

## ATTO I — LA FALLA

Ci sono due tipi di problemi in GENESIS.

Il primo è tecnico: il codice rompe, il RAG restituisce il chunk sbagliato, la pipeline si inceppa. Questi si trovano, si debuggano, si chiudono. Lasciano un commit pulito nel log e un test in più nella suite.

Il secondo è di canone: il sistema genera contenuto che è *tecnicamente* corretto ma *relazionalmente* sbagliato. Non un dato inventato — una classificazione errata di qualcosa che non si può classificare con una variabile booleana.

La bozza di EP_SG_01_01 era stata prodotta in modalità notturna. Il binario `night_caroselli` era partito alle 04:15, aveva superato il QC verde in `_BOZZE`, aveva piazzato l'episodio nella coda. Tutto regolare. Tranne slide 9.

La sessione #58-bis aveva già prodotto la serie PRE_SG_01-04 completa: 4 caroselli a 10 slide, QC verde, de-insider e de-dup applicati dopo il feedback di Matteo. Il title-scan su Obsidian era a 69 link attivi per S1. Il `render_queue` batch girava su PNG e JPEG. Il `grid_preview` componeva la griglia Instagram dalle copertine. Il sistema funzionava — e aveva sbagliato lo stesso.

Perché il canone non è una regola tecnica. Non è un parametro che si passa a una funzione. È una comprensione di contesto che o c'è o non c'è, e quando non c'è il sistema produce output plausibili e sbagliati.

La correzione è stata chirurgica: `fix(#59): EP_SG_01_01 corretto e promosso + canon_guard v1.1 famiglia [persone]`. Una riga di commit. Dietro quella riga: una review manuale di ogni relazione classificata nella famiglia semantica `[persone]`, e una versione aggiornata del guard che ora forza una verifica esplicita prima di attribuire qualsiasi ruolo relazionale a individui reali.

Non basta che sia plausibile. Deve essere vero.

---

## ATTO II — LA BUSSOLA

Stesso giorno. Stesso numero di sessione. Lavoro completamente diverso.

`docs(#59): bussola - primo fit esterno PRE distillato e adottato (GUIDA par.7 in MENTE)`

Il 15 luglio 2026 è la data in cui quattro AI concorrenti hanno letto i caroselli della serie SG e hanno restituito feedback. Non un test interno. Non un'autocritica del sistema. Un fit esterno reale — quattro punti di vista distinti su cosa funzionava e cosa no nel formato.

Il risultato è stato adottato nella GUIDA_CAROSELLI al paragrafo 7: *Taratura dal primo fit esterno*. Non come appendice. Come regola operativa, con peso pari alle altre sei sezioni.

Questo è il meccanismo che distingue un sistema che si aggiorna da uno che si consolida. GENESIS non ha ricevuto il feedback, lo ha archiviato e continuato come prima. Lo ha distillato: ha estratto i principi, li ha trasformati in vincoli operativi, li ha scritti nella GUIDA che ogni agente legge prima di produrre un carosello.

I vincoli emersi dal fit esterno sono quelli già visibili nelle regole: ancorato ai fatti, mai etichette ripetute, open loop con assaggio. Ma ora hanno una data di calibrazione — 15 luglio 2026 — e una fonte verificabile: quattro sistemi indipendenti che hanno letto lo stesso materiale e convergito sugli stessi problemi.

La bussola non dice dove andare. Dice quando stai deviando.

Parallelamente, il `docs(#59)` dello specchio dashboard ha aggiornato la sezione taratura con la stessa data di ingresso. Due documenti diversi, stesso evento, stesso aggiornamento coordinato. È il tipo di coerenza che non si vede dall'esterno ma che si sente quando il sistema produce output — tutto tira nella stessa direzione perché è stato calibrato dalla stessa fonte nello stesso momento.

---

## ATTO III — L'ICONA

C'è un terzo commit nella sessione #59. Il più piccolo. Quello che quasi non si racconta.

`chore(#59): collegamento Desktop ottimizzato — icona stabile claude.ico + hotkey Ctrl+Alt+T`

Il problema era banale: il file `.lnk` puntava a `claude-code\2.1.165`, una cartella rimossa dagli aggiornamenti automatici. Ogni volta che Claude Code si aggiornava, l'icona sul Desktop diventava un quadrato vuoto. Ctrl+Alt+T non funzionava. Il collegamento era rotto.

Tre righe di fix. Cartella stabile, icona reale, hotkey attiva.

Eppure questo commit racconta qualcosa di preciso su come lavora Matteo. Il sistema cognitivo più complesso che stia costruendo ha, come interfaccia primaria, un collegamento sul Desktop con una scorciatoia da tastiera. Non una dashboard elaborata. Non un launcher personalizzato. Una hotkey che apre lo strumento in due secondi.

La frizione è il nemico del lavoro. Non la difficoltà — la frizione inutile, quella che non aggiunge niente ma consuma attenzione. Un'icona rotta è frizione inutile. Si toglie.

Tre commit in una giornata: una falla di canone chiusa, una bussola calibrata da fonti esterne, un collegamento che ora funziona sempre. Nessuno dei tre è spettacolare. Tutti e tre sono necessari.

---

## CHIUSURA

Il 15 luglio 2026 è esattamente quattro anni prima della deadline del capannone.

Non è una coincidenza che Matteo stia costruendo, nello stesso periodo, sia V32 che GENESIS. Le due macchine hanno lo stesso problema fondamentale: tenere le tolleranze.

Per V32 le tolleranze sono IT6-IT7: errori di posizionamento inferiori ai 10 micron. Per GENESIS le tolleranze sono di canone: ogni persona nominata con il ruolo corretto, ogni fatto verificato, ogni relazione classificata senza errori.

V32 a 65% di completamento. GENESIS a 70%. Entrambi in costruzione nella stessa taverna da 12 m².

La differenza è che gli errori di GENESIS si propagano più velocemente. Un errore su slide 9 di una bozza notturna non rimane nella taverna — esce, viene letto, crea un'impressione che poi bisogna correggere con altro contenuto. Canon_guard v1.1 è l'equivalente di un controllo dimensionale prima del montaggio: più economico farlo adesso, molto più costoso dopo.

Quattro anni. Il sistema impara a non sbagliare le stesse cose due volte.

---

## FATTI (per il RAG)

- **DECISIONE:** canon_guard aggiornato a v1.1 con verifica esplicita sulla famiglia semantica `[persone]` — trigger: falla in EP_SG_01_01 slide 9 (Nina classificata come parente in bozza notturna).
- **LOGICA:** il sistema notturno (`night_caroselli`, avvio 04:15) produce output QC-verde su metriche formali ma non su coerenza relazionale; serve un guard dedicato al contesto umano, non solo ai parametri di formato.
- **DECISIONE:** GUIDA_CAROSELLI par.7 aggiornata con taratura da fit esterno del 15/07/2026 — 4 AI concorrenti hanno letto la serie SG e restituito feedback convergente, distillato in regole operative.
- **LOGICA:** la calibrazione esterna fissa una data e una fonte verificabile per i vincoli di formato; impedisce la deriva graduale dei criteri QC interni.
- **DECISIONE:** collegamento Desktop stabilizzato — `claude.ico` + hotkey `Ctrl+Alt+T`, puntamento a cartella stabile (non a versione specifica di `claude-code`).
- **OBIETTIVO:** prossimo step su SG è la produzione di EP_SG_01_01 nella versione promossa (post-fix); il piano di produzione S1 conta 69 caroselli totali (9 portanti + 60 approfondimenti), Cap.3 e Cap.4 in avanzamento attivo.

---

## reel_hook

Il sistema ha prodotto una bozza alle 04:15. QC verde. Slide 9 sbagliata.

Non era un bug — era una classificazione errata di una persona reale.

canon_guard v1.1 chiude quella falla. Stesso giorno, 4 AI esterni calibrano le regole di formato.

Il sistema che non corregge i propri errori li esporta.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2.E07 |
| **Data** | 2026-07-15 |
| **Sessione** | #59 |
| **Progetto primario** | GENESIS |
| **Commit chiave** | fix(#59), docs(#59) ×2, chore(#59) |
| **V32 completamento** | 65% |
| **GENESIS completamento** | 70% |
| **Tag** | `canon`, `QC`, `fit-esterno`, `GUIDA_CAROSELLI`, `night_caroselli` |
| **Prossimo step** | EP_SG_01_01 promosso in produzione |