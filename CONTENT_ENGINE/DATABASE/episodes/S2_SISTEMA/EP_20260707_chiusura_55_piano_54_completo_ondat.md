<!-- TOC -->

- [TITANIUM_OS  S2E17](#titaniumos-s2e17)
  - [Il Bug che Mentiva da Mesi](#il-bug-che-mentiva-da-mesi)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL CORPO DEL REATO](#atto-i-il-corpo-del-reato)
  - [ATTO II  IL BOOT SPORCO E IL WATCHDOG FANTASMA](#atto-ii-il-boot-sporco-e-il-watchdog-fantasma)
  - [ATTO III  IL CANONE CHE NESSUNO LEGGEVA](#atto-iii-il-canone-che-nessuno-leggeva)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E17
## "Il Bug che Mentiva da Mesi"

*2026-07-07 — GENESIS, taverna 12 m²*

---

## COLD OPEN

Lo schermo mostra 68 milestone. 107 sessioni.

Matteo li guarda un secondo, poi scrolla su — le percentuali sono tornate quelle giuste. Non le percentuali divergenti che si trascinavano da settimane, quelle che mostravano numeri diversi a seconda di dove guardavi. STATE.json era corrotto. Non ieri. Da mesi.

Il fatto è questo: il sistema ti mentiva e tu non lo sapevi.

---

## ATTO I — IL CORPO DEL REATO

Ogni mattina GENESIS caricava STATE.json e aggiornava i numeri del progetto. V32 al 65%. GENESIS al 70%. Sessioni completate, milestone attive, backlog in sospeso. La dashboard React li mostrava puliti, colorati, convincenti.

Il problema era a monte, silenzioso e vecchio.

Due processi scrivevano STATE.json in parallelo: `au08`, `gc04`, `cr_audit`. Nessuno dei tre sapeva degli altri. Quando i tre scrivevano quasi in contemporanea, l'ultimo a chiudere il file vinceva — sovrascrivendo i dati degli altri due. Non crash, nessun errore visibile. Solo numeri che non tornano, percentuali che sembrano plausibili ma non coincidono tra una vista e l'altra. Il tipo di bug che non urla, mormora.

Il clobber — così si chiama tecnicamente, quando un processo sovrascrive silenziosamente il file di un altro — viveva in GENESIS dall'inizio. Era diventato parte dell'arredamento.

La correzione ha richiesto due interventi chirurgici:

1. **Load fail-safe**: prima di ogni scrittura, GENESIS legge lo stato attuale dal disco. Se il file è corrotto o assente, non crasha — carica un default pulito e segnala.
2. **Write atomico**: la scrittura non avviene direttamente su `STATE.json`. Viene scritto su un file temporaneo, poi rinominato. Su qualsiasi sistema POSIX, `rename()` è un'operazione atomica — o la vedi completa, o non la vedi. Nessuna finestra in cui un lettore trova il file a metà.

Risultato: 68 milestone e 107 sessioni ripristinate. Non create — *ripristinate*. Erano nel file frammentato, sepolte sotto gli strati delle sovrascritture.

Il sistema non aveva perso la memoria. La stava solo leggendo storta.

---

## ATTO II — IL BOOT SPORCO E IL WATCHDOG FANTASMA

Prima ancora del clobber, c'era stato il mattino del 7 luglio.

Al login, la dashboard non si avviava. Terminale, `pnpm dev --silent` — silenzio, poi crash. Il flag `--silent` che Matteo usava per tenere i log puliti veniva inoltrato da pnpm direttamente a Vite 7, che lo interpretava come un argomento sconosciuto e si fermava con `CACError`. Una riga nel `package.json`, sistemata.

Ma la dashboard che non partiva era il sintomo minore. Il problema vero era che al boot apparivano due istanze di quasi tutto: due watchdog, due watcher, due processi API sulla porta 5001. GENESIS si sdoppiava.

La radice: `CORE/watchdog.py` — un processo legacy, scritto mesi prima, che al boot avviava il watchdog principale e poi si metteva in ascolto per rispawnarlo se moriva. Il nuovo sistema di orchestrazione faceva la stessa cosa, in modo più intelligente. Ma `CORE/watchdog.py` nessuno lo aveva rimosso. Viveva tranquillo nel boot sequence, invisibile, e ogni volta che il sistema partiva creava il suo doppio.

La soluzione non è stata un workaround. È stata una singola regola applicata ovunque: **single-instance enforcement**. Watchdog, watcher, API — ognuno controlla all'avvio se un processo gemello è già attivo. Se sì, il nuovo si chiude. La porta 5001 ha ora una guardia esplicita: se occupata, log chiaro e stop, non tentativo silenzioso di sopravvivere su una porta alternativa.

`START_ECOSYSTEM` è diventato uno stub documentato — non esegue logica, chiama i moduli giusti nell'ordine giusto. Il boot ora è deterministico. Parte una cosa per volta, nell'ordine stabilito, e puoi leggerlo.

---

## ATTO III — IL CANONE CHE NESSUNO LEGGEVA

`_CANONE.md` esisteva da settimane. Era il documento che definiva le regole di GENESIS: come si indicizzano i chunk, cosa entra nel RAG, cosa ne rimane fuori, quale versione di quale componente è quella ufficiale.

Era scritto bene. Era preciso. Non lo leggeva nessun agente.

Era un documento per umani in un sistema fatto di macchine. Claude lo leggeva quando Matteo glielo mostrava esplicitamente. Il retrieval RAG lo ignorava — non perché fosse escluso, ma perché non aveva peso privilegiato rispetto a qualunque altro documento del corpus. Una nota tecnica su un connettore MIMS poteva superarlo nel ranking semplicemente perché conteneva le parole giuste.

Il fix ha due parti.

**Canon-pin nel retrieval RRF**: il sistema di Reciprocal Rank Fusion che combina i risultati di ricerca ora identifica i documenti marcati con `_CANONE` e li promuove esplicitamente nella lista finale. 27 note di canone esistenti, tutte agganciate. Quando recuperi qualcosa sul RAG di GENESIS, le regole canoniche arrivano prima — non perché siano le più simili semanticamente, ma perché il sistema sa che sono la fonte di riferimento.

**Rebuild esclusivo verificato**: il processo di reindicizzazione che doveva escludere i vecchi chunk e ricostruire da zero aveva un bug silenzioso — completava senza errori ma lasciava chunk orfani. La verifica: `18113 == 18113`. Prima del fix, 535 chunk del corpus erano andati persi in rebuild precedenti. Recuperati.

In parallelo: **4 sentinelle notturne** aggiunte al ciclo `night_audit.py`.
- `organi_vivi.py`: verifica che i processi core siano attivi.
- `canone_vault.py`: controlla che i documenti canonici siano indicizzati e con il peso corretto.
- `pip_audit.py`: 42 CVE identificate come fixabili senza breaking changes.
- `qc_episodi.py`: 51 episodi esistenti controllati per integrità strutturale.

Le sentinelle girano la notte. Il mattino Matteo trova un referto, non un mistero.

Un ultimo taglio chirurgico: **NodeKit**. Il pattern di navigazione a N-livelli (`navStack`) viveva in 4 copie identiche nel codice React, ognuna con tema visivo diverso ma logica identica. `NodeTile` e `NodeLevel` sono stati estratti in un componente condiviso. -256 righe. Pixel-identici alla versione con 4 copie. Critica gc03 del backlog, chiusa.

---

## CHIUSURA

C'è un tipo di lavoro che non produce niente di visibile.

V32 è ancora al 65%. GENESIS è ancora al 70%. Nessun asse fresato, nessuna feature nuova per l'utente finale. Dal punto di vista di chiunque guardi da fuori, il 7 luglio è un giorno piatto.

Dal punto di vista del sistema, è il giorno in cui si è smesso di mentire.

STATE.json scriveva numeri sbagliati. Il boot caricava processi doppi. Il canone era un documento che nessun agente rispettava. Il watchdog legacy ghostava nell'ecosistema da mesi. Ognuna di queste cose era diventata normale — la normalità del sistema che si adatta ai propri difetti invece di correggerli.

La sessione #54 non ha costruito. Ha risanato. Ondate A, B, C — ogni ondata ha trovato qualcosa che sembrava funzionare e non funzionava davvero.

Il capannone è al 2030. C'è tempo. Ma i sistemi che si costruiscono su fondamenta mentite non arrivano al 2030 — arrivano a un punto in cui il peso di quello che non hai sistemato supera la voglia di continuare.

Il 7 luglio Matteo ha scelto di non posticipare.

---

## reel_hook

STATE.json scriveva numeri diversi a seconda di chi lo leggeva. Non da ieri — da mesi. 3 processi in parallelo, nessuna scrittura atomica, sovrascritture silenziose. 68 milestone e 107 sessioni erano lì, nel file frammentato, ma il sistema le leggeva storte. Fix: load fail-safe + write atomico POSIX. Ora i numeri sono uno solo. Il sistema smette di mentirti quando lo costringi a scrivere in modo che non possa mentire.

---

## FATTI (per il RAG)

- **DECISIONE**: STATE.json migrato a scrittura atomica (file temporaneo + `rename()` POSIX) + load fail-safe; clobber storico di `au08`/`gc04`/`cr_audit` eliminato alla radice
- **LOGICA**: 3 agenti scrivevano STATE.json in parallelo senza coordinazione; l'ultimo a chiudere sovrascriveva gli altri; nessun errore visibile, solo percentuali divergenti da mesi
- **DECISIONE**: single-instance enforcement su watchdog/watcher/API (porta 5001 con guardia esplicita); `CORE/watchdog.py` legacy rimosso — era il doppio fantasma che generava processi duplicati ad ogni boot
- **DECISIONE**: canon-pin RRF attivo — 27 note `_CANONE` promosse esplicitamente nel retrieval; rebuild esclusivo verificato a `18113 == 18113` (535 chunk recuperati)
- **DECISIONE**: `night_audit.py` esteso con 4 sentinelle (`organi_vivi`, `canone_vault`, `pip-audit` 42 CVE, `qc_episodi` 51 episodi); retention disco 5 regole R1-R5, risparmio da 2.24 GB → corpus `deep_freeze` 2035 MB → 216 MB senza ChromaDB
- **DECISIONE**: NodeKit refactor — `NodeTile`/`NodeLevel` da 4 copie a 1 componente condiviso, -256 righe, pixel-identici
- **OBIETTIVO**: fondamenta GENESIS risanate — prossimo step ordinabile (Vevor+ER20+UPS) e backlog 49 azioni approvabili su un sistema che ora legge e scrive la verità

---

| campo | valore |
|---|---|
| **episodio** | S2E17 |
| **data** | 2026-07-07 |
| **titolo** | Il Bug che Mentiva da Mesi |
| **progetto principale** | GENESIS |
| **progetti citati** | V32, MIMS |
| **sessione di riferimento** | #54 / #55 |
| **commit chiave** | `chore(salva): chiusura #55` |
| **stato V32** | 65% |
| **stato GENESIS**