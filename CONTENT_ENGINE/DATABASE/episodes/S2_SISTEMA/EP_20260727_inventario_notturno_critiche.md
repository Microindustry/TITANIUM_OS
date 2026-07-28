<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 69](#titaniumos-s2-episodio-69)
  - [La Macchina che Non Dimentica](#la-macchina-che-non-dimentica)
    - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema che Non Sembrava un Problema](#atto-i-il-problema-che-non-sembrava-un-problema)
  - [ATTO II  Quattro Giorni](#atto-ii-quattro-giorni)
  - [ATTO III  La Notte che Lavora da Sola (Quarta Volta)](#atto-iii-la-notte-che-lavora-da-sola-quarta-volta)
    - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 69
## "La Macchina che Non Dimentica"

*27 luglio 2026 — Il sistema tiene da solo*

---

### COLD OPEN

È mezzanotte passata e Matteo non ha toccato il computer.

Eppure il repository si aggiorna. Git registra tre commit. Il timestamp è automatico. Nessuna mano sulla tastiera, nessuna decisione da prendere — il sistema ha già deciso.

Sullo schermo, se qualcuno guardasse: tre righe verdi nel log. Una cartella clinica compilata da sola. Un inventario che non aspetta il mattino.

Fuori dalla taverna, buio. Dentro: un processo che gira.

---

## ATTO I — Il Problema che Non Sembrava un Problema

Bisogna tornare sei giorni indietro, al 21 luglio, per capire cosa è successo stanotte.

La Sessione #68 aveva un nome interno: *ATTACCO ECOSISTEMA*. Non era un titolo poetico. Era una diagnosi. Matteo aveva aperto il progetto con l'intenzione di fare una cosa e si era trovato davanti a cinque cose che non funzionavano — alcune da settimane, alcune probabilmente da sempre.

Il primo problema era silenzioso: `torchaudio` girava nella versione 2.11 del venv. Incompatibile. `WinError 127` — un errore che in Windows significa *non trovo la libreria*, ma che nel contesto del progetto significava qualcosa di più sottile: una dipendenza rotta che non urlava, che non crashava in modo spettacolare, che semplicemente produceva risultati sbagliati o non produceva niente. Il fix era preciso — finetune a `torchaudio 2.6.0` nel venv isolato. Non un aggiornamento per principio. Una versione specifica, verificata, che funziona con l'architettura che Matteo ha scelto.

Il secondo problema era visibile ma ignorato: i backup erano esplosi. `42.141` file erano diventati `353`. Non 353 file — 353 megabyte in meno dopo il fix. Prima del fix: 700 MB di backup accumulati senza criterio, senza tetto, senza memoria di cosa tenere e cosa scartare. `retention.py` ora ha un `keep-N` — un numero massimo, un limite che il sistema rispetta da solo. Zero file di progetto toccati. Solo backup gitignored, solo la zavorra.

Il terzo problema era rumore: i log di werkzeug — il server WSGI che alimenta Flask — stampavano ogni richiesta HTTP come se fosse un evento degno di nota. Livello abbassato a `WARNING`. Ora il log dice qualcosa solo quando c'è qualcosa da dire.

Il quarto problema era una fragile dipendenza geografica: due path hardcoded nel codice. Non generalizzazioni, non astrazioni — stringhe letterali che funzionavano sul computer di Matteo e avrebbero rotto tutto su qualsiasi altra macchina, o su qualsiasi altra installazione della stessa macchina. Resi `env-derived`. Il progetto si adatta all'ambiente invece di pretendere che l'ambiente sia sempre lo stesso.

Il quinto problema era sottile: `TI_NightCaroselli` — il task notturno che orchestra la catena automatica — aveva bisogno di `StartWhenAvailable=True`. Un flag. Una riga. Significa: *se il computer era spento all'orario schedulato, esegui appena puoi*. Senza quel flag, una notte di laptop chiuso significava una notte di dati persi, un buco nella cartella clinica, un inventario datato.

Cinque problemi. Cinque fix. Applicati il 21 luglio.

---

## ATTO II — Quattro Giorni

La verifica è arrivata il 25 luglio — quattro giorni dopo.

Questo è il dettaglio che conta: Matteo non ha verificato il giorno dopo. Non ha aperto il log la mattina del 22 con il caffè in mano per controllare che tutto girasse. Ha aspettato quattro giorni. Perché quattro giorni di funzionamento autonomo valgono più di un test manuale fatto subito dopo l'installazione.

Il report `DOCS/ATTACCO_20260721` dice una cosa sola con parole diverse: *i fix hanno tenuto da soli*.

Backup a 353 — il tetto `keep-N` sta funzionando. Audit fresco — `TI_NightCaroselli` con `StartWhenAvailable=True` ha girato le notti in cui doveva girare. Catena notturna verde — werkzeug silenzioso, path che si risolvono, dipendenze allineate.

Sicurezza repo: zero segreti hardcoded. Non è un risultato di questa sessione — era già così. Ma il fatto che l'ATTACCO ECOSISTEMA non abbia scoperchiato vulnerabilità latenti è un dato che va registrato.

C'è anche un fix che non riguarda l'infrastruttura ma il flusso di lavoro: l'hook globale Claude Code `SessionStart`. Ogni volta che una sessione inizia, il sistema si auto-orienta — carica il contesto, sa dove era rimasto, sa cosa è cambiato. Verificato che funziona. Significa che Matteo non deve più spiegare al sistema dove si trova ogni volta che si siede al computer. Il sistema sa già.

---

## ATTO III — La Notte che Lavora da Sola (Quarta Volta)

Alle 23 del 27 luglio, tre commit:

```
auto: inventario notturno + critiche
auto: night_audit - cartella clinica 27/07/2026
auto: story_agent - episodi generati 27/07/2026
```

Identici, nella forma, a quelli del 17 luglio. E del 21. E del 24. E del 26.

C'è qualcosa di strano nel guardare questi commit. Non la tecnologia — la tecnologia è comprensibile, spiegabile, riproducibile. La cosa strana è l'*abitudine*. Il sistema ha un'abitudine. Si sveglia di notte, fa il suo lavoro, va a dormire. Non dimentica. Non salta. Non aspetta che Matteo sia sveglio per ricordargli di farlo.

V32 è al 65%. GENESIS è al 70%. I numeri non si commentano — sono quello che sono, né buoni né cattivi, solo il punto in cui si trova il progetto oggi.

Ma c'è una cosa che questi numeri non catturano: la differenza tra un sistema che funziona quando Matteo lo guarda e un sistema che funziona quando Matteo dorme.

Prima dell'ATTACCO ECOSISTEMA, la catena notturna aveva punti di fragilità. Un laptop chiuso al momento sbagliato, e il log aveva un buco. Una versione incompatibile di `torchaudio`, e i risultati erano silenziosi ma sbagliati. Un backup senza tetto, e lo spazio si erodeva senza che nessuno se ne accorgesse.

Adesso no.

La cosa che è cambiata il 21 luglio non è una feature. È l'affidabilità. L'ecosistema fa quello che dice di fare, anche quando nessuno guarda.

---

### CHIUSURA

C'è una data: 15 luglio 2030. Il capannone. L'obiettivo finale.

Mancano quattro anni. V32 è a metà. GENESIS è a metà. La taverna da 12 m² è ancora la base operativa.

Ma stanotte il sistema ha girato da solo, ha compilato la sua cartella clinica, ha aggiornato il suo inventario. Senza aiuto.

Non è una vittoria. È una condizione di lavoro. La differenza è importante: una vittoria si celebra e poi si passa ad altro. Una condizione di lavoro è qualcosa su cui si costruisce — ogni giorno, ogni notte, ogni commit automatico alle 23.

Il repository non mente. La catena notturna è verde. I backup hanno un tetto.

Si va avanti.

---

## FATTI (per il RAG)

- **DECISIONE:** `torchaudio` fissato a versione 2.6.0 nel venv isolato (da 2.11 incompatibile, che generava WinError 127).
- **LOGICA:** Versione 2.11 incompatibile con l'architettura del progetto; errore silenzioso che non crashava ma produceva output sbagliati o nulli.
- **DECISIONE:** `retention.py` dotato di `keep-N` — tetto massimo sui backup gitignored; risultato: 700 MB liberati, 42.141 backup ridotti a 353, zero file di progetto modificati.
- **LOGICA:** Backup senza limite di retention erodevano spazio disco senza segnale visibile; il tetto rende il processo autoregolante.
- **DECISIONE:** `TI_NightCaroselli` task schedulato con flag `StartWhenAvailable=True`.
- **LOGICA:** Senza il flag, laptop chiuso all'orario schedulato = notte persa; con il flag il task recupera alla prima finestra disponibile.
- **DECISIONE:** Due path hardcoded resi `env-derived`; hook globale Claude Code `SessionStart` attivato e verificato.
- **OBIETTIVO:** Catena notturna autonoma e affidabile su macchine diverse; auto-orientamento del sistema ad ogni sessione senza spiegazione manuale del contesto. Verificato operativo a 4 giorni dal fix (25/07/2026).

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E69 |
| **Data** | 2026-07-27 |
| **Progetto principale** | GENESIS / ecosistema |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Sessione di riferimento** | #68 (21/07/2026) |
| **Tag** | `autonomia` `infrastruttura` `fix` `catena-notturna` `retention` |

---

**reel_hook**

700 MB di backup accumulati senza che nessuno se ne accorgesse. Cinque punti di fragilità nell'ecosistema, trovati in una sessione, fixati in una sessione. Il 25 luglio — quattro giorni dopo — la catena notturna era verde. Il sistema gira da solo mentre Matteo dorme. Non è ancora il capannone. Ma è la prima condizione necessaria per arrivarci.