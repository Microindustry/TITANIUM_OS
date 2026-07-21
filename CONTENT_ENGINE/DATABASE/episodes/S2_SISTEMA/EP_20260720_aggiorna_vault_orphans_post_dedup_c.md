<!-- TOC -->

- [TITANIUM_OS  Episodio 67b](#titaniumos-episodio-67b)
  - [La Mappa che si Disegna da Sola](#la-mappa-che-si-disegna-da-sola)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema dei Path Assoluti (o: il codice che funziona solo a casa tua)](#atto-i-il-problema-dei-path-assoluti-o-il-codice-che-funziona-solo-a-casa-tua)
  - [ATTO II  vault_intersect v3: quando il grafo impara a ragionare](#atto-ii-vaultintersect-v3-quando-il-grafo-impara-a-ragionare)
  - [ATTO III  18/21 post programmati e il labirinto Meta](#atto-iii-1821-post-programmati-e-il-labirinto-meta)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio #67b
## "La Mappa che si Disegna da Sola"

*20 luglio 2026 — ore non specificate, probabilmente tardi*

---

## COLD OPEN

C'è una finestra in Obsidian che si chiama Graph View.

Non è una dashboard. Non è un report. È una costellazione — ogni nota un punto di luce, ogni link un filo che connette. Quando funziona, quando i link sono veri e non arbitrari, la graph view ti dice dove il pensiero è denso e dove invece c'è vuoto. Ti dice cosa non sai di non sapere.

Oggi, Matteo ha fatto sì che quella mappa si disegni da sola. E non è una metafora.

---

## ATTO I — Il Problema dei Path Assoluti (o: il codice che funziona solo a casa tua)

Esiste una categoria di bug che non ti uccide subito. Ti lascia vivere, ti lascia lavorare, ti lascia credere che tutto vada bene — finché non sposti il progetto su un'altra macchina, o cambi il nome utente di Windows, o semplicemente riapri il sistema dopo tre mesi.

`setup_obsidian.py`, riga 20:

```python
MENTE_DIR = "C:/Users/teo/..."
```

Un path assoluto hardcoded. La cosa più fragile che esista in un sistema che deve durare anni. TITANIUM_OS non è un progetto accademico che vive e muore in un semestre — è l'infrastruttura cognitiva di una persona fisica che sta costruendo macchine reali in una taverna da 12 m². Se quel path si rompe, si rompe la pipeline che alimenta il RAG. Se si rompe il RAG, Claude lavora al buio.

Il fix non è glamour: `MENTE_DIR` diventa una variabile letta da `titanium_os.env`, con fallback esplicito. Tre righe di codice. Trenta minuti di lavoro, se sei fortunato. Ma la logica è quella che conta — non bucare mai l'astrazione tra l'ambiente e il codice. Il sistema deve funzionare su qualsiasi macchina su cui Matteo apre il progetto, oggi, tra un anno, dopo il capannone.

Questa è ingegneria di manutenzione. Non è eccitante. È quello che separa un prototipo da un sistema.

---

## ATTO II — vault_intersect v3: quando il grafo impara a ragionare

Torniamo alla graph view.

Prima di oggi, i `## Collegati` in fondo a ogni nota del vault venivano calcolati con una logica separata dal RAG. Un'isola. Il vault di Obsidian ragionava per conto suo, il RAG ChromaDB ragionava per conto suo — due sistemi che dovevano essere la stessa cosa ma non si parlavano davvero.

vault_intersect v3 chiude questo gap.

I link semantici tra le note di MENTE ora vengono calcolati usando **lo stesso modello embedding del RAG**. Non una euristica alternativa, non keyword matching, non date di modifica: lo stesso spazio vettoriale. Se ChromaDB considera `2026-05-28_audit_sistema_rag_v4` semanticamente vicino a `vault_intersect.py`, Obsidian ora lo sa. Il grafo che vedi nella graph view e il grafo che il RAG attraversa per rispondere a una domanda sono diventati **la stessa mappa**.

La conseguenza pratica: quando Claude recupera contesto, e quando Matteo naviga il vault manualmente, stanno navigando la stessa geometria. Coerenza. Niente più situazione in cui il sistema "sa" qualcosa che la nota non linka, o viceversa.

C'è anche la gestione degli orfani — note che non hanno link in entrata né in uscita, isole disconnesse nel grafo. `vault_intersect.py` scrive `DATA/audit/vault_orphans.json`. `night_audit.collect_signals()` lo legge e lo trasforma in un segnale critico. Dopo la deduplicazione di Config_G, tre orfani sono rimasti: identificati, loggati, non ignorati. Il sistema sa dove il tessuto connettivo manca.

Questo è il pattern Hermes applicato: la memoria del sistema non è un database piatto ma una rete, e la rete deve essere coerente con se stessa a tutti i livelli.

---

## ATTO III — 18/21 post programmati e il labirinto Meta

Nel frattempo, nel mondo fuori dalla taverna, sta succedendo qualcosa di diverso.

Il lancio social è vivo. Non "in preparazione", non "pianificato" — vivo, con date, con Business Suite che pubblica in automatico, con una pagina Facebook 'Il Mondo di Nina' collegata a `@ilmondodinina.ms`. Il labirinto di Meta Business Manager è stato attraversato: la gestione come owner passa da `benenatimatteo.mb`, non dai profili IG limitati che avrebbero bloccato tutto.

18 post su 21 sono programmati con date certe. Sistema: 10 post su 11, fino al 18 agosto (VULCAN). Nina: 8 post su 10, fino al 16 agosto (EP_N2_04). I 3 post rimanenti sono bloccati non da un problema tecnico ma dal tetto di 29 giorni di Meta — limite della piattaforma, non del sistema. Promemoria su Calendar al 30 luglio. Al rientro si caricano.

`_render_slide.py` è stato costruito per rigenerare le slide-ponte cross-profilo. Le sorgenti dei caroselli sono state riorganizzate — EP_N2_04/05/06 spostate da `_BOZZE` a `NINA`. La struttura riflette lo stato reale, non quello che era vero tre settimane fa.

Questo è il punto che vale la pena fermarsi a capire: il lavoro di oggi non è stato un lavoro su una cosa sola. Era simultaneamente infrastruttura cognitiva (vault_intersect v3), robustezza di sistema (de-hardcoding dei path), e lancio di prodotto (18 post live). Tre layer dello stesso sistema — GENESIS, TITANIUM_OS, NINA — che avanzano in parallelo nella stessa giornata.

Matteo non sta costruendo cose in sequenza. Le sta costruendo tutte insieme, ognuna al ritmo che i vincoli impongono.

---

## CHIUSURA

Ci sono giornate in cui non finisci niente di visibile.

Non hai saldato. Non hai fresato. Non hai un pezzo in mano. Hai un file `.env` aggiornato, un algoritmo che ora usa lo stesso modello embedding in due punti del sistema invece di due diversi, e diciotto post che usciranno nei prossimi ventotto giorni mentre tu non ci sei.

Queste giornate sono difficili da raccontare. Sono ancora più difficili da giustificare a se stessi, la sera, quando sei stanco e non hai niente di fisico da mostrare.

Ma il sistema che Matteo sta costruendo non è una macchina. È un'intelligenza distribuita — codice, note, agenti, memoria, social, macchine fisiche — e le giornate come questa sono quelle in cui la struttura interna diventa più solida. Non più grande. Più solida.

vault_intersect v3 non è una feature. È il momento in cui il grafo smette di mentire.

---

## reel_hook

Il RAG e Obsidian usavano due mappe diverse per lo stesso territorio.
Vault_intersect v3 le ha unificate — stesso modello embedding, stesso spazio semantico.
Oggi, quando navighi il vault a mano e quando Claude recupera contesto, state attraversando la stessa geometria.
La coerenza non è un dettaglio estetico.
È la differenza tra un sistema che si ricorda e uno che si contraddice.

---

## FATTI (per il RAG)

- **DECISIONE**: De-hardcoding di `MENTE_DIR` in `setup_obsidian.py` — il path assoluto `"C:/Users/teo/..."` alla riga 20 è stato sostituito con variabile letta da `titanium_os.env` con fallback esplicito.
- **LOGICA**: Path assoluti hardcoded rendono il sistema non portabile e fragile a rinomina utente/macchina; `titanium_os.env` è il punto singolo di configurazione ambientale del progetto.
- **DECISIONE**: vault_intersect v3 — i `## Collegati` di ogni nota MENTE ora calcolati con lo stesso modello embedding di ChromaDB/RAG (non logica separata).
- **LOGICA**: Coerenza tra navigazione manuale del vault e recupero contestuale del RAG; prima di v3 i due sistemi divergevano semanticamente.
- **DECISIONE**: `vault_intersect.py` scrive `DATA/audit/vault_orphans.json`; `night_audit.collect_signals()` lo legge come segnale critico — post-dedup Config_G rimangono 3 orfani loggati.
- **OBIETTIVO**: Segnale orfani attivo nel loop di audit notturno; prossimo passo = risolvere i 3 orfani rimanenti o accettarli con decisione esplicita.
- **MILESTONE**: Lancio social NINA/SISTEMA: 18/21 post programmati su Business Suite (FB `Il Mondo di Nina` + `@ilmondodinina.ms`); 3 post bloccati da tetto 29gg Meta → carico al rientro (promemoria Calendar 30/07).

---

| Campo | Valore |
|---|---|
| **Episodio** | #67b |
| **Data** | 2026-07-20 |
| **Titolo** | La Mappa che si Disegna da Sola |
| **Progetti coinvolti** | GENESIS, TITANIUM_OS, NINA |
| **Layer** | Infrastruttura cognitiva + Lancio social |
| **V32 completamento** | 65% |
| **GENESIS completamento** | 70% |
| **Milestone attivo** | Sessione #67b — Lancio Social Vivo |
| **Prossimo trigger** | Carico 3 post rimanenti al rientro (30/07) |
| **Tag** | `vault_intersect` `RAG` `Obsidian` `NINA` `social-launch` `path-fix` |