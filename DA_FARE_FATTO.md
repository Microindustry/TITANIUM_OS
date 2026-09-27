<!-- TOC -->

- [DA FARE - la bussola viva di TITANIUM_OS](#da-fare---la-bussola-viva-di-titaniumos)
  - [Sessione 72  28/08/2026  IL PIANO COMPLETO (scritto prima di eseguirlo)](#sessione-72-28082026-il-piano-completo-scritto-prima-di-eseguirlo)
    - [BACKLOG EREDITATO - TRIATO IL 28/08 (193 voci - 47 vere)](#backlog-ereditato---triato-il-2808-193-voci---47-vere)
    - [SCALETTA - lordine in cui si fa, passo passo](#scaletta---lordine-in-cui-si-fa-passo-passo)
  - [Sessione 71  27/08/2026  IL SISTEMA NON ERA SPENTO  view_index resuscitato](#sessione-71-27082026-il-sistema-non-era-spento-viewindex-resuscitato)

<!-- /TOC -->

# DA FARE - la bussola viva di TITANIUM_OS

*Cosa e' aperto, cosa e' in corso, cosa aspetta Matteo. **Nient'altro.***

> **Tagliata il 28/08/2026 (sessione #72).** Era arrivata a **2.858 righe, 40 sessioni,
> 209 voci aperte** che nessuno riguardava piu': un archivio travestito da bussola.
> Una cosa che devi scorrere non ti orienta.

| File | Cosa contiene | Si legge |
|---|---|---|
| **questo** | aperto - in corso - aspetta Matteo | **a inizio sessione** |
| `ABBIAMO_FATTO.md` | la storia, sessioni #32-#70 | quando serve il *perche'* |
| `BACKLOG_EREDITATO.md` | 209 voci vecchie **in quarantena** | a lotti, verificando |

**Metro di collaudo: se questo file non sta in una schermata, ha fallito di nuovo.**

---


*Questa è la scaletta condivisa io↔Matteo: dove siamo, cosa è fatto, cosa resta.*
*Si legge a INIZIO sessione e si aggiorna STRADA FACENDO (non a fine soltanto).*

**REGOLE DELLA BUSSOLA (standard):**
- **Non si cancella mai.** Si cambia solo lo stato di una riga. Se una cosa salta,
  si scrive `[✗] non fatto — motivo`, non si toglie.
- **Append in cima**: il blocco della sessione più recente va in alto.
- Stati: `[✓] fatto` · `[◐] in corso` · `[ ] da fare` · `[✗] non fatto` · `[💡] idea`.
- Canonica = QUESTO file (repo, versionato). Il Desktop `da fare e cosa ho fatto.txt`
  è un **mirror PURO auto-aggiornato** (copia identica di questo file, scritta da
  `AUTOMATIONS/core/sync_dashboard.py` a fine sessione via hook Stop). Non si edita a mano.
- Il PIANO completo (visione, punti P0-P8) vive **solo** in `PROSSIMA_SESSIONE.md`
  (consolidato il 09/06; vecchia copia Desktop archiviata in `DOCS/_archivio_piano_desktop_20260609.txt`).
  Qui sta la scaletta operativa, non tutto il piano.

---


## Sessione #72 · 28/08/2026 — IL PIANO COMPLETO (scritto prima di eseguirlo)

*Ricapitolazione chiesta da Matteo: tutto quello che e' aperto, in un posto solo.*
*Nulla di questo e' ancora fatto. Prossimo passo deciso: revisionare la bussola e il suo contorno.*

### 🗂 BACKLOG EREDITATO - TRIATO IL 28/08 (193 voci -> 47 vere)

*Le 193 voci aperte delle sessioni #32-#70 sono state lette una per una. Non erano 193
problemi: erano **la stessa cosa ripetuta**, piu' un mucchio di roba gia' fatta che nessuno
aveva barrato. Sotto c'e' cosa resta davvero, per tema e non per sessione.*

**Il conto:**

| | voci | |
|---|---|---|
| **GIA' FATTE** e mai barrate | ~62 | verificate a campione e per conoscenza diretta |
| **DUPLICATE** (stessa cosa in 3-5 sessioni) | ~54 | "EP_N2_03 la Misura" x5 - "UPS+mandrino+Vevor" x5 - "chiave Semantic Scholar" x3 - "controllare PRE_01/02" x2 - "Nina officina/tech" x2 - "rag-update canone" x2 |
| **OBSOLETE** (il codice non esiste piu') | ~14 | NEXUS su `mcpServers` - `_CANONE.md:31` che parlava di "EP_N2_01…15" |
| **SUPERATE** dagli eventi | ~16 | le 3 finestre social del 30/07, il rebuild BGE-M3, l'attacco #52-prep |
| **VERE, RESTANO** | **47** | sotto |

---

**A · CANONE E CONTENUTO** *(entra nel RAG, quindi si propaga: priorita' alta)*
- [ ] `_CANONE.md:32` dichiara **EP_N2_01…64**, su disco c'e' il **67**. *Voce nata al #52 quando
  diceva "…15": e' la terza volta che si aggiorna a mano. **Serve un generatore**, non un altro edit.*
- [ ] Slot `aggancio_reale`: la regola "meglio vuoto che inventato" non morde ancora (#70)
- [ ] **QC esteso a tutto l'arco**: `QUALITA_BATCH_44` copre solo 20->50, gli EP 16-19 e 51 sono fuori
- [ ] **Canon-pin nel RRF**: nessun codice legge `_CANONE.md` per pesare il retrieval
- [ ] **Tracciabilita' del grounding**: ogni affermazione di Nina risale a una nota
- [ ] Doppioni di contenuto: EP_N2_51~08, EP_N2_17~10; "guardiano" su 2 Pietre diverse
- [ ] Titoli tripli (19/56/63 e 45/53/60): rititolare o archiviare? **decisione**
- [ ] EP_N2_09 slide 2 **vuota** (scena `biblioteca` non esiste in `sg_builder.SCENES`)
- [ ] EP_SG_03_03: `±0,019 mm` in contenuto pubblico + open-loop all'indietro
- [ ] EP_N2_64:78 anglicismo «*exquisitely* informata» in un testo per bambini
- [ ] **EP_N2_03 "la Misura"** - carosello 16 slide *(chiesto in #51, #53, #55, #56, #59: mai fatto)*
- [ ] 6-7 bozze pronte da far uscire (EP_N2_07, 08, EP_SG_02_05/06, 03_01/02, 04_01)

**B · ROBUSTEZZA DEL CODICE** *(verificate oggi, tutte ancora vere)*
- [ ] **1 solo file di test** su 157 `.py` - per un sistema che si auto-modifica e' il rischio n.1
- [ ] `requirements.txt` **0 pin su 36 righe** (verificato: zero `==`)
- [ ] 4 agenti notturni **senza retry LLM** (`max_retries=4`, fix di 1 riga)
- [ ] Sanitizer non agganciato -> pre-commit hook che blocca il commit sui segreti
- [ ] `except` larghi: i **nudi sono 1 solo** (la voce diceva 101, contava anche `except Exception`)

**C · DASHBOARD / UI**
- [ ] **La dashboard e' GIU' adesso** (5173 non risponde) - e non e' la prima volta: gia' al #68
      "non era in esecuzione". `START_LOGIN` non la rialza al boot.
- [ ] Tema light "tappa 2" mai fatta: cornice coi token, card interne dark hardcoded
- [ ] 4 "neri" diversi per il fondo -> `var(--shell-bg)`
- [ ] CSS invalido che da' falsa sicurezza (`attr()` in font-size, `min-font-size` inesistente)
- [ ] **Zero `aria-*`** in tutta l'app
- [ ] Scala tipografica mancante: 239 `text-[7px]/[8px]` curati con `!important`
- [ ] `NodeTile` duplicato in 4 componenti - `PageKicker` e consolidamento card
- [ ] `SYSTEM_TREE` duplicato in `MappaView` *(chiesto #54, #55: mai fatto)*
- [ ] Lint: 89 problemi - chiavi React duplicate in `CalendarioView.tsx:97`
- [ ] ~2,5k righe di dead code + 7 dipendenze non usate

**D · RAG E OBSIDIAN**
- [ ] **Controllo orfani su 333 note di 667**: meta' vault non e' mai stata guardata
- [ ] 55 file di versioni superate ancora nel RAG -> estendere le exclusions + 1 rebuild
- [ ] `INDICE_CAMMINO`: 9 titoli su 15 sbagliati -> rigenerare da `episodes.json`
- [ ] BGE-M3: script pronto da mesi, **1 click con UAC** (poi ricalibrare le soglie)
- [ ] LightRAG - pilota entita' sul vault via Ollama *(dopo BGE-M3)*
- [ ] Upgrade LLM locale a Qwen3.5-9B Q4_K_M

**E · AI NEWS WATCHER** *(tutto dal #52, mai toccato)*
- [ ] Query GitHub malformata: `sort:updated` dentro `q` -> l'ordinamento non funziona
- [ ] Dedup assente + eviction non deterministica -> un item vecchio rientra come "nuovo"
- [ ] **17 sorgenti su 30+**: mancano blocchi interi keyless
- [ ] Cap `fresh[:8]` silenzioso: segnali contati ma non salvati

**F · SOCIAL** *(fermo dal 30/07)*
- [ ] **3 post mai ricaricati**: la finestra dei 29 giorni e' passata il 30/07
- [ ] **Postiz e' giu'** (Docker non gira). LinkedIn era in attesa di approvazione
- [ ] App Meta (~1h) per automatizzare IG/FB
- [ ] Rifiniture profili: bio Nina, bio microindustry, PDF caroselli-ponte stale
- [ ] Naming caroselli non canonico (`ep 1.html` con spazi) -> `git mv` + fix riferimenti
- [ ] Peso repo: `PRE_03/` = 49 MB -> policy PNG prima dell'episodio 10

**G · BUSINESS / MIMS** *(nessuno ci ha piu' messo mano da luglio)*
- [ ] `FINANCE/` **vuota** -> scheletro BEP parametrico che si riempie alla prima colata
- [ ] **Fix coerenza pitch pubblico**: molle->corpo unico, "100% recupero", due tabelle revenue
      divergenti, timeline scaduta, ROI 322% senza formula
- [ ] Revenue 2026 al reale: **EUR 0-3.000**, non 7.900-18.600 - anche nel pitch
- [ ] Modello capannone: 3 scenari affitto + regola trigger, per rendere il 2030 falsificabile
- [ ] **D1-D9 dati da procurare, non inventare** (costo compressione, tempo ciclo, preventivo Vevor...)
- [ ] Pre-validazione MIMS a capitale zero: landing "kit beta" + CAD template
- [ ] Decisione scritta: **Nina non si monetizza prima che MIMS venda**
- [ ] Analisi VALORE per pilastro + **HR/CV vivo** (Matteo: "la vista CV oggi e' solo rumore")

**H · SISTEMA**
- [ ] **Detriti disco: BACKUPS 3.1 GB** *(era 1.1 al #52: e' peggiorata)* + `chroma_db_*` da pulire
- [ ] **Doppio watchdog** (2 istanze) da ridurre a 1
- [ ] `AUTOMATIONS/core` = ~30 script piatti da raggruppare - `INBOX/` da pulire
- [ ] Replica serale della catena se la notte salta (12 su 31 saltate)
- [ ] Sessione CVE: gli 8 fixabili di oggi + test finetune dopo

---

### 📋 SCALETTA - l'ordine in cui si fa, passo passo

*Regola: si scende. Non si apre un livello finche' quello sopra non e' chiuso.*

**P0 - PRIMA DI TUTTO: gli strumenti che ci orientano** *(se mentono, tutto il resto e' cieco)*
1. `R1` taglio della bussola --- **FATTO 28/08** (2.858 -> 300 righe)
2. `R7` cartello sul vecchio nome, poi `R6` rinomina --- *tocca 9 punti di codice + hook*
3. `R4` escludere `ABBIAMO_FATTO` e `BACKLOG_EREDITATO` da RAG e lettura di sessione
4. `R2` agganciare il taglio alla chiusura di sessione (se lo deve ricordare un umano, muore)
5. `K1-K4` rimettere in sesto le CRITICHE (sotto): stessa malattia, stessa cura
6. `R8` il resto del contorno: AZIONI_MATTEO (24/06), PROSSIMA_SESSIONE (09/06), STATE, Desktop

**P1 - IL CANONE** *(e' l'unica cosa che finisce dentro il RAG e quindi si propaga)*
7. `A1` le 5 riscritture mirate --- **serve l'ok di Matteo**
8. `A2` rigenerare EP_N2_28 e 55 --- **serve l'ok di Matteo**
9. `A3` togliere i 2 numeri inventati dell'EP_N2_16
10. `I2` far mordere la regola "meglio vuoto che inventato" sullo slot `aggancio_reale`

**P2 - LA MAPPA** *(un lavoro solo che serve due volte: dashboard + profilo)*
11. `B1` allineare i nomi dei due alberi, `B2` GENESIS 7o dipartimento (copiare dal vault)
12. `C1-C3` S4: la mappa unica in dashboard
13. `D1-D5` la stessa mappa sul profilo GitHub + crescita + badge + racconto
14. `D6` le foto del ferro --- **le ha Matteo**
15. `E1-E3` togliere il contatore finto (`D7` cade da solo)

**P3 - IGIENE E RILASCIO** *(si fanno tra una cosa e l'altra)*
16. `G2` `_CANONE.md`, `G3` gli 8 CVE, `G4` il riflusso FATTI muto
17. `G5` il controllo orfani che copre meta' vault
18. `F1` `gh release create v3.0.0` --- un comando
19. Detriti disco: BACKUPS a **3.1 GB** (era 1.1 al #52, e' peggiorata)

**P4 - IL BACKLOG EREDITATO** --- **TRIATO IL 28/08: 193 voci -> 47 vere** (sezione sopra)
20. `B` robustezza: i test, i pin, i retry LLM --- *e' il rischio n.1 di un sistema che si auto-modifica*
21. `C` la dashboard (**oggi e' giu'**) e il debito UI accumulato
22. `E` l'AI news watcher: 4 bug veri, mai toccati dal #52
23. `D` RAG: gli orfani non controllati, l'INDICE_CAMMINO sbagliato, BGE-M3 (1 click tuo)
24. `F` social: fermo dal 30/07, Postiz giu', 3 post persi
25. `G` business/MIMS: FINANCE vuota, il pitch incoerente, i dati D1-D9 da procurare
26. `H` sistema: 3.1 GB di BACKUPS, doppio watchdog, la catena serale
27. `G1` le 19 critiche manuali da riverificare

**FUORI SCALETTA - solo Matteo:** `F2` il tag della release - `H` hardware (UPS, ER20, Vevor),
chiavi da ruotare, API key Semantic Scholar.

---

**🔧 K — LE CRITICHE: riconfigurarle perche' funzionino (ordine Matteo 28/08)**

*Stessa identica malattia della bussola: crescono, non si sfoltiscono, e nessuno le rilegge.*

- [ ] **K1 · La diagnosi**: il canone manuale e' **fermo da 49 giorni** con **19 critiche attive**
  che nessuno ha riverificato. Il night_audit intanto ne aggiunge di automatiche e ne chiude
  in automatico (l'ultima notte: +1 aggiunta, 6 auto-chiuse). Risultato: due flussi che non si
  parlano, e un file che cresce.
- [ ] **K2 · Lo stesso taglio della bussola**: `CRITICHE.md` tiene solo le **aperte**; le chiuse
  vanno in un file storico fuori dal percorso di lettura. Stessa regola, stesso motivo.
- [ ] **K3 · La staleness deve VEDERSI**, come nell'handoff riparato nella #71: una critica non
  riverificata da 30+ giorni non e' "attiva", e' **scaduta**, e va marcata cosi'. Oggi una
  critica di giugno e una di ieri hanno lo stesso aspetto.
- [ ] **K4 · Il campione lo dimostra**: sul backlog vecchio **4 voci su 7 erano gia' fatte**.
  Non c'e' motivo di credere che le critiche stiano meglio. Prima di eseguirne una, si verifica.

---

**🔴 A — CANONE: chiude il gate a zero (restano 8 righe, tutte nei 7 sospesi)**
- [ ] **A1 · 5 riscritture mirate** — EP_N2_03, 05, 46, 48, 56. La regola generica
  `GENESIS/X → GENESIS` qui **sposta** il falso invece di toglierlo: il referente vero e'
  meccanico (V32 per ripetibilita' e calibrazione, MIMS/VULCAN per la golden template),
  il 48 si sgrammatica, il 46 e' misto (2 frasi software + «lo spazio fisico e' di 12 m²»).
- [ ] **A2 · 2 episodi da RIGENERARE** — EP_N2_28 e 55. Non sporchi: **troncati a meta'
  parola** dal bug max_tokens pre-#69. Nel 55 anche il frammento superstite e' inventato.
- [ ] **A3 · EP_N2_16** — 2 numeri inventati spacciati per FATTI («la struttura di validazione
  vale il 70% dell'affidabilita'», «errori da 10% a 2-3%»). Fuori batch: la regola non li vede.

**🟡 B — ALLINEARE I DUE ALBERI (prerequisito di C e D)**
- [ ] **B1 · Nomi**: `VITA-NATURA` (db GENESIS) vs `VITA_NATURA` (vault) · `FINANZE` vs `FINANZA`.
  Senza questo i riquadri non si agganciano.
- [ ] **B2 · GENESIS come 7° dipartimento** — il vault Obsidian ce l'ha gia' come dominio da
  mesi, il database no (per questo 11 agenti su 12 stanno parcheggiati sotto OFFICINA).
  **Non e' una decisione da prendere: e' una copia da fare.** Chiude la domanda aperta dal #70.

**🟢 C — S4: LA MAPPA UNICA (non piu' "solo l'organigramma")**
- [ ] **C1** · Un blocco per dipartimento con **3 dati**: chi ci lavora (db GENESIS) · cosa
  sappiamo (vault Obsidian) · quanto si e' mosso (git).
- [ ] **C2** · **I riquadri vuoti restano vuoti.** E' la parte piu' onesta: su V32 e MIMS il
  sapere c'e' (6 e 35 note) ma gli agenti sono **zero**. Non un buco da coprire: la roadmap.
- [ ] **C3** · In DASHBOARD. Costruito una volta, mostrato in due posti (vedi D2).

**🔵 D — PROFILO GITHUB: da cruscotto a vetrina**
- [ ] **D1 · Barra crescita per mesi** dai commit — 765 in 5 mesi. **Con le pause visibili**
  (aprile 0, agosto 35): una crescita che sale sempre non se la crede nessuno.
- [ ] **D2 · Albero disegnato** — lo stesso blocco di C, GitHub disegna i diagrammi da testo.
- [ ] **D3 · Badge veri** (colore, non caratteri): 5 mesi · 765 commit — 276 episodi —
  10 notti autonome su 11.
- [ ] **D4 · Una riga che lega**: «in 5 mesi il sistema ha costruito soprattutto se' stesso —
  e adesso si vede dove non e' ancora arrivato».
- [ ] **D5 · Dettagli tecnici e percentuali PIEGATI** sotto: sopra resta il racconto.
- [ ] **D6 · LE FOTO DEL FERRO** — telaio V32, pressa, mattonelle. *Le ha Matteo: chi legge
  "artigiano industriale" e non vede ferro non ci crede.*
- [ ] **D7** · Togliere «Sessione #162» dal profilo pubblico (vedi E).

**⚫ E — IL CONTATORE FINTO**
- [ ] **E1** · `state.session_count` **non conta sessioni, conta scritture di STATE.json**
  (`state_updater.py:200`): il 27/08 e' salito di 2 in un pomeriggio senza nuove sessioni.
  Compare in daily_brief, session_orienter, dashboard e profilo pubblico come "Sessioni totali".
- [ ] **E2 · Il danno vero**: `MCP/titanium_mcp_server.py:366` **copia il contatore finto sopra
  il numero buono** — il #71 del diario puo' diventare #162 da solo. Togliere quella riga.
- [ ] **E3** · Il numero vero resta quello della bussola. *NB: non e' una scoperta nuova —
  esiste gia' la critica «session_count = 6 ma sei alla sessione #15», chiusa come "done"
  con il fix strutturale rimandato "per non spendere". Il sintomo e' tornato.*

**🟣 F — VERSIONI**
- [ ] **F1** · `gh release create v3.0.0` — il tag esiste ed e' pushato, la GitHub Release
  non e' **mai** stata creata (online si vede ancora v2.8.0 di maggio). Un comando.
- [ ] **F2 · DECISIONE MATTEO — il tag nuovo**: 647 commit e 3 mesi senza tag.
  `v3.1.0` se conti i nodi · `v4.0.0` se conti il salto (GENESIS con db + organigramma +
  repository layer, e il loop notturno che consegna da solo). *Io direi v4.0.0.*

**🟤 G — IGIENE ARRETRATA (dal night_audit)**
- [ ] **G1** · Critiche stantie da **49 giorni** — 19 attive da riverificare.
- [ ] **G2** · `_CANONE.md` fermo a EP_N2_64 mentre su disco c'e' il **67**.
- [ ] **G3** · **8 CVE fixabili** in 4 pacchetti: aiohttp, cryptography, datasets, pip.
- [ ] **G4** · Riflusso FATTI **muto da 6 giorni**.
- [ ] **G5** · Il controllo orfani gira su **333 note su 667**: meta' vault non e' mai stata
  controllata. Non vuol dire che sia scollegata — vuol dire che non lo sappiamo.

**⚪ H — SOLO MATTEO (non delegabili, gia' in AZIONI_MATTEO.md)**
- [ ] UPS 50-80€ — cura alla RADICE della corruzione HNSW da power-loss
- [ ] Mandrino ER20 + martinetto Vevor — sbloccano MIMS, fermo al 30% "waiting_press"
- [ ] Ruotare le chiavi del red-team #38 · API key Semantic Scholar (gratuita, azzera i 429)
- [ ] Le foto del ferro per D6

**🩶 I — DEBITO VECCHIO, ancora lì**
- [ ] **I1** · EP_N2_04 uscito il 16/08 alle ~09:00 invece che alle 21:00: se Business Suite
  pubblica quando gli pare, la coda programmata non e' affidabile.
- [ ] **I2** · Lo slot `aggancio_reale` **non resta mai vuoto**: l'LLM ora inventa *dentro*
  GENESIS. La regola «meglio vuoto che inventato» non morde ancora (aperta dal #70).

**🧭 R — RIORGANIZZARE LA BUSSOLA (si fa PRIMA di tutto il resto, ordine Matteo 28/08)**

*Il problema in una riga: questo file ha smesso di essere una bussola ed e' diventato un
archivio travestito. Per arrivare a oggi si scorrono 100 righe di indice e tre mesi di storia.
Una cosa che devi scorrere non ti orienta.*

- [v] **R1 · Lo split - FATTO 28/08.** 2.858 righe -> 300. `DA_FARE.md` tiene **tre cose sole**: cosa e' aperto · cosa e' in corso
  adesso · cosa aspetta Matteo. Tutto il resto va in `ABBIAMO_FATTO.md`, in ordine di data.
  **Metro di collaudo: se non sta in una schermata, ha fallito di nuovo.**
- [ ] **R2 · Il taglio lo fa il sistema, non noi.** Se dipende dal fatto che qualcuno se lo
  ricorda, muore: e' il pattern di questa casa (AZIONI_MATTEO fermo al 24/06,
  PROSSIMA_SESSIONE al 09/06, critiche a 49 giorni). Va agganciato alla chiusura di sessione,
  come lo specchio Desktop.
- [v] **R3 · FATTO (regola applicata subito): si taglia con UNA SESSIONE DI RITARDO, non appena e' `[v]`.** I blocchi fatti non
  contengono solo il *cosa*: contengono il **perche'** (perche' GENESIS era il pilastro
  sbagliato, perche' la scrittura non atomica ha rotto l'indice). Chiude la #73 -> si sposta la
  #72. Una sessione di sovrapposizione, e la memoria corta resta in vista.
- [ ] **R4 · LA TRAPPOLA - "non pesa" dipende da DOVE lo metti.** Il peso viene da due posti:
  Claude che lo legge a inizio sessione, e **il RAG che lo indicizza**. Se `ABBIAMO_FATTO.md`
  resta nel percorso di lettura del RAG, il peso non e' sparito: e' solo cambiato di file.
  Va escluso **esplicitamente** da entrambi. *Precedente gia' in casa e funzionante: i
  `changelog_archive_*.md` sono fuori da git per questo identico motivo.*
- [v] **R5 · Struttura data (FATTO), resta da agganciarla a STORIE/profilo.** `ABBIAMO_FATTO.md` ha due usi veri e gia'
  presenti nel sistema: e' la **materia prima delle STORIE** (i milestone verificati diventano
  episodi) e la **crescita del profilo GitHub** (la barra dei mesi, le "10 notti su 11").
  Quindi non testo libero: **data - cosa - perche'**, leggibile a macchina.
- [ ] **R6 · IL NOME - valutato da Claude, come chiesto: SI RINOMINA.**
  *La domanda era: nome giusto o minor rischio? Il nome giusto - e non per estetica.*
  Se lo split si fa e il file continua a chiamarsi `DA_FARE_FATTO`, resta un nome che dice
  "FATTO" su un file che il fatto non ce l'ha piu' dentro. **E' esattamente la malattia
  diagnosticata al contatore `session_count`**: il nome dice una cosa, il codice ne fa
  un'altra, e chi legge si fida del nome. Non si cura un sintomo e si semina l'identico altrove.
  *Il rischio e' misurato, non stimato*: `DA_FARE_FATTO` compare in **27 file**, ma quelli
  **vivi** (che si romperebbero) sono **9 + l'hook globale**:
  `CLAUDE.md` - `NODES/AUDIT_AGENT/night_audit.py` - `api_server.py` - `CLAUDE_CODE.bat` -
  `AUTOMATIONS/core/critiche_md.py` - `AUTOMATIONS/core/sync_dashboard.py` -
  `.claude/skills/salva/SKILL.md` - `DASHBOARD/src/components/ProcedimentiView.tsx` -
  `DASHBOARD/src/data/bussolaTodos.ts` - + `SessionStart` in `~/.claude`.
  Gli altri 18 sono episodi e documenti che **raccontano** la bussola: restano come sono
  (regola della casa: non si riscrive la storia).
- [ ] **R7 · Rete di sicurezza: il vecchio nome resta come CARTELLO.** `DA_FARE_FATTO.md`
  diventa un file di due righe che punta ai due nuovi. Cosi' se scappa un riferimento non si
  rompe in silenzio: **atterra su un'indicazione**. E' il principio di tutta la #71 - meglio
  un errore che si vede di un guasto muto.
- [ ] **R8 · Stessa cura al contorno**, che ha la stessa malattia (cresce e non si sfoltisce
  mai): `CRITICHE.md` - `AZIONI_MATTEO.md` (fermo al #45, 24/06) - `PROSSIMA_SESSIONE.md`
  (consolidato il 09/06) - lo specchio Desktop - `STATE.json`, il cui `active_milestone` e'
  un muro di testo che **finisce pubblico** sul profilo GitHub.

**✅ FONTE DI CONCETTO — le due linee (28/08, da NotebookLM)**
- [v] **I notebook erano fermi dal 16 giugno**: 11 su 12 mai piu' aperti, ma dentro c'e' il
  materiale piu' denso del progetto - e' li' che le cose sono state dette la prima volta.
- [v] **Estratto e scritto**: `MENTE/KNOWLEDGE/VISIONE/le_due_linee_fonte_di_concetto.md`.
  Marcato **NON CANONE** in testa: e' una miniera per scrivere, non una fonte di FATTI.
  `canon_guard` sul file: **0 righe**.
- [v] **La scoperta**: la linea dell'azienda e quella delle storie **non sono due**. Sono la
  stessa idea in due materiali - la **reversibilita'**. MIMS non salda perche' il saldato non
  si disfa; Nina insegna che l'errore non e' definitivo. *Quello che non si puo' disfare non
  si puo' migliorare.* E la prova che c'era gia': **MIMS JUNIOR, "un giunto, tre vite"** - il
  kit che si trasforma mentre il bambino cresce. E' Nina in forma di oggetto.
- [v] **Quarantena numeri** scritta dentro il file: margini 79%, ROI 322%, BEP 1.578 pezzi,
  "si ripaga in 106 ore", "parita' industriale 15-18k", "costo zero". Sono calcoli di progetto
  mai dimostrati - la pressa non ha fatto una mattonella e la V32 e' al telaio.
  **La voce si prende tutta, i numeri no.**
- [💡] **Avvertenza sulla voce, da decidere**: meta' di quei documenti e' scritta da un
  assistente AI che parla *a* Matteo ("Ricevuto, Matteo", "Socio, il Board dei 7 specialisti
  e' riunito nella War Room"). Quell'epica militare **e' il tono dell'AI, non il tuo**.
  Sotto pero' c'e' roba vera: la densita' tecnica, il rifiuto del pressapochismo, il
  cameratismo asciutto - «la disciplina del metallo e quella del corpo sono una cosa sola».
- [ ] **Da qui esce la riga della vetrina** (sezione D4): la frase che lega crescita e albero
  puo' venire da qui invece che essere inventata.

**◐ IN CORSO ADESSO**
- [◐] **Revisione della BUSSOLA e di tutto il suo contorno** (ordine Matteo, 28/08).
  I file del protocollo — questo, `RIAVVIO_SESSIONE.txt`, `STATE.json`, `AZIONI_MATTEO.md`,
  `PROSSIMA_SESSIONE.md`, lo specchio Desktop — vanno guardati insieme: la #71 ha dimostrato
  che **due dei tre file letti a inizio sessione raccontavano il falso**. Prima si sistema
  lo strumento che ci orienta (**sezione R qui sopra**), poi si esegue il piano.

---

## Sessione #71 · 27/08/2026 — IL SISTEMA NON ERA SPENTO + view_index resuscitato

**Il RIAVVIO_SESSIONE.txt (scritto il 16/08) è STANTIO: dice che tutto è fermo. Non è vero.**

**✅ RILETTURA DELLA REALTÀ (fatti, non handoff)**
- [✓] **Il sistema si è riacceso da solo il 17/08** e ha lavorato **10 notti su 11** (17→26/08):
  `night_audit`, `inventario notturno`, `nina_rag_loop`, `story_agent` committano ogni notte
  (unico buco: 19/08). Il "fermo da 17,5 giorni" del next_step vale fino al 16/08, non oggi.
- [✓] **API :5001 NON è giù**: 17 endpoint su 18 rispondono 200. Il "7 su 9 danno 500" è superato.
  `md-files` non è rotto, è **lento** (4,0 s: `rglob` su tutta la ROOT) — con timeout 6 s sembrava morto.
  `sanitizer/report` dà 404 perché il report non esiste (semantico, non un crash).
- [✓] **RAG: era rientro, non perdita.** 21.630 chunk il 16/08 → **22.637 il 26/08**: cresce.
  Resta il delta con i ~32.800 del 24/06, ma la curva sale: non c'è emorragia in corso.
- [✓] **canon_guard sugli episodi vivi = 22 righe** (21 `[pilastri-fusi]` + 1 `[pilastri-software]`),
  identico al 16/08. Il gate è **ambra e fermo**: il batch 3 non è mai stato applicato.

**✅ TROVATO E RIPARATO (guasti veri, nessuno li aveva visti)**
- [✓] **`/api/view-index` dava 500 dal 20/08**: `DATA/view_index.json` era **TRONCATO a metà scrittura**
  (1749 righe, si interrompe dentro `"updated_at":`). Non un bug di rotta: un file corrotto.
- [✓] **La radice**: `md_view_pipeline._update_index()` riscriveva l'indice **INTERO** in modo
  **non atomico a ogni singolo file** — su 487 file sono 487 finestre di corruzione, e O(n²).
  Un'interruzione il 20/08 alle 16:00 ne ha centrata una. Corretto:
  · `_atomic_write_json()` = tmp + `fsync` + `os.replace` (con **retry**: su Windows il watcher
    tiene aperto il file un istante e `os.replace` dà WinError 5)
  · `_load_index()` tollerante: se l'indice è corrotto lo mette da parte e riparte, non si schianta
  · `rebuild_all()` costruisce l'indice **in memoria** e lo scrive **una volta sola** alla fine.
- [✓] **Indice ricostruito**: 487 view → **`/api/view-index` = 200**. Il file rotto è conservato
  in `DATA/view_index.json.corrotto` (non cancellato).
- [✓] **`canon_guard.py` non era eseguibile a mano**: crashava con `UnicodeEncodeError` sulla console
  cp1252 alla prima freccia `→`. Il gate del canone non si poteva nemmeno *leggere*. `sys.stdout`
  riconfigurato in utf-8. Ora gira intero (79 righe su tutto MENTE, 22 sugli episodi vivi).
- [✓] **Igiene sicurezza**: la view pipeline stava generando view servite dall'API a partire da
  `_VAULT/ACCOUNTS/CREDENZIALI_BACKUP.md` e `postiz.md`. `_VAULT` aggiunto a `SKIP_DIRS`, le 2 view
  cancellate, indice ripulito (485). *Nota: nessun leak in git — `_VAULT/` e `DATA/views/` sono
  già gitignorati, e da remoto l'API richiede `X-API-Key`.*

**✅ BATCH 3 — GRUPPO 1 APPLICATO (su ordine Matteo: "e valuta")**
- [✓] **Prima ho letto le frasi, non i nomi dei file.** La divisione del 16/08 (10 sicuri / 4 da
  giudicare / 2 rotti) è **slittata**: dal 16/08 sono nati altri episodi (siamo a EP_N2_67) e
  la regola generica `GENESIS/X → GENESIS` **non copriva** la variante `GENESIS/TITANIUM_OS`.
  Composizione vera al 27/08: **10 sicuri · 5 da giudicare · 2 rotti**.
- [✓] **10 APPLICATI** (16, 19, 35, 38, 41, 53, 54, 62 + **10 e 44** che il tool non vedeva):
  25 sostituzioni. Qui il software è davvero inventato — training set, BFS/Dijkstra, DAG +
  scheduler con worker THEMIS/EVA/FORGE, endpoint `/api/graph/graphify`, parsing AST,
  spazio dei pesi, heartbeat/health-check: l'aggancio giusto è GENESIS e basta.
- [✓] **Aggiunte 2 coppie mancanti al tool**: `GENESIS/TITANIUM_OS[/MIMS] → GENESIS`.
  TITANIUM_OS è il repo, non un pilastro: saldato con la barra faceva lo stesso danno.
- [✓] **Idempotente**: seconda corsa = 0 sostituzioni. Guardia carosello: 0 bloccati.
- [✓] **GATE: da 22 righe a 8.** Le 8 residue sono *esattamente* i 7 episodi sospesi, nient'altro.
  (Le altre 4 righe che canon_guard mostra sono in `_ARCHIVIO/`, snapshot congelato fuori canone.)

**⏸ SOSPESI — la mia valutazione, decide Matteo (`--anche-sospesi` per forzare)**
- [ ] **Il collasso generico su GENESIS è SBAGLIATO per tutti e 5.** Non ripulisce: *sposta* il
  falso dal pilastro meccanico a quello software.
  · **EP_N2_03** «la ripetibilità è il controllo di qualità» → è la **CNC**: il referente giusto è **V32**.
  · **EP_N2_05** «calibrazione manuale del gesto, qualificare il gesto a livello fisico» → **V32**.
  · **EP_N2_56** «golden template validata da sensori multipli, ogni ciclo produttivo» → **MIMS/VULCAN**.
    In più «*e nelle fabbriche smart reali*» mette MIMS (30%, waiting_press) accanto a fabbriche
    che esistono: è la stessa inflazione dei numeri tolti nella #70.
  · **EP_N2_48** «Nel sistema GENESIS/V32 **di MIMS**» → collassato diventa «Nel sistema GENESIS
    di MIMS»: sgrammaticato. Il contenuto (cedibilità) è di **metodo**, non di un pilastro.
  · **EP_N2_46** 2 occorrenze **miste**: il cruscotto/telemetria è software (ok GENESIS), ma
    «lo spazio fisico è di 12 m²» su GENESIS diventa un errore di categoria.
  → **Proposta: 5 riscritture mirate** (una frase l'una), non lo strip generico.
- [ ] **EP_N2_28 e 55 — RIGENERARE, confermato leggendoli.** Troncati a metà parola:
  `«In GENESIS/V32, M`  ·  `«...(architettura di fluidità narrativa), la g`.
  Nel 55 anche il frammento superstite è inventato (V32 non è un'architettura narrativa).
- [ ] **Fuori batch, trovato leggendo**: **EP_N2_16** porta due numeri inventati spacciati per
  FATTI — «la struttura di validazione vale il **70%** dell'affidabilità», «errori da **10%** a
  **2-3%**». Stessa famiglia dei due tolti nella #70. La regola generica non li vede.
- [ ] **Push**: 2 commit automatici del 26/08 non pushati + questi fix.

**✅ S3 SCALA GENESIS — CHIUSO (il gradino è salito)**
- [✓] **`CORE/repos.py`**: la SQL vive in un posto solo. Riceve una **connessione già aperta**
  (non apre sessioni, non sa dove sta il `.db`) — così il seed può contare le righe *dentro*
  la propria transazione, prima del commit. La CTE ricorsiva dell'albero è migrata qui.
- [✓] **`TABELLE` = whitelist**: SQLite non parametrizza i nomi di tabella, quindi il nome
  finisce per forza in una f-string; `conteggio()` rifiuta ciò che non è in lista. È l'unico
  punto del layer dove un identificatore entra nel testo di una query.
- [✓] **Condizione di chiusura verificata**: `grep -rn "SELECT" --include=*.py CORE/ | grep -v
  repos.py` → **vuoto**. Le 7 SELECT stanno tutte in `repos.py`.
- [✓] **Non-regressione**: `--info` (8 tabelle, 6 dip + 12 agenti + 7 tool) e `--albero`
  girano identici a prima.
- [✓] **Trovato salendo**: `genesis_seed.py --albero` non era **mai** arrivato in fondo su
  console Windows — `UnicodeEncodeError` sul box-drawing `└─`. Stessa famiglia del bug di
  `canon_guard`. Ora l'albero si legge intero.
- [💡] **Quello che si vede leggendo l'albero**: 9 agenti su 12 sono di CONTENUTO/SISTEMA e
  stanno parcheggiati sotto **OFFICINA** perché GENESIS non è uno dei 6 dipartimenti.
  La domanda del 7° dipartimento non è teorica: è scritta nell'organigramma.
- [ ] **Prossimo gradino: S4** — l'organigramma in DASHBOARD (oggi si vede solo da CLI).

**✅ INTEGRAZIONE ECOSISTEMA + VERSIONI + PROFILO GITHUB (su ordine Matteo)**
- [✓] **L'HANDOFF NON ERA STALE PER CASO: il generatore è ROTTO.** Ho lanciato
  `generate_restart_prompt.py` e ha prodotto *«RIAVVIO SESSIONE #21 — ultima sessione #20 del
  03/06»*. Tre mesi di contesto spacciati per attuali, **in silenzio**. La riga colpevole:
  `ctx_is_stale = ctx_date != today and bool(today_commits)` → **il rilevatore di staleness si
  spegneva proprio quando non c'era nulla su cui ripiegare**. Niente commit oggi = "non è stale"
  = stampa il vecchio senza avvisare. È così che stamattina il protocollo mi ha dato una realtà
  di 11 giorni fa. Corretto: stale = la data non è oggi, punto; e se non c'è da cosa derivare
  **lo dichiara** (`[NON LO SO: ...]`) invece di riempire il vuoto. Il numero di sessione, che
  arrivava sempre da `ctx` (fermo alla #20), quando il contesto è stale ora viene da STATE.
  *Testato in entrambi i rami: stale → avviso esplicito, fresco → handoff corretto (#72).*
- [✓] **`DATA/session_context.json` riempito** con il contesto vero della #71 — era fermo al
  **3 giugno**. È lui la fonte del handoff: senza, il generatore lavora alla cieca.
- [✓] **IL PROFILO GITHUB PUBBLICAVA LA VERSIONE SBAGLIATA, ogni notte.** Il README pubblico di
  `Microindustry/Microindustry` diceva **"v1.1.0"**: `update_github_profile.py` leggeva
  `STATE.json → meta.version`, che è la versione **dello SCHEMA di STATE**, non del progetto.
  I tag dicono **v3.0.0**. Ora la versione si deriva dal **tag git** (`v3.0.0 · +646 commit`),
  coerente con RELEASES.md — *«una release = un tag annotato»*.
- [✓] **Stesso giro, altro dato morto**: `~19.600 chunk` era scritto a mano nel template, fermo
  dal #61. Ora si legge da `DATA/audit/system_health.json` (che il night_audit riscrive ogni
  notte): **22.637**. Un dato vivo hardcodato invecchia e basta.
- [✓] **`BRAIN/profile_public.json` riscritto** — era di luglio (parlava della prima uscita
  LinkedIn come novità e di Postiz come "prossimo"). Ora racconta dove siamo davvero.
- [✓] **Guardia verificata**: `canon_guard.scan_public` sul README generato = **0 falle**.
- [✓] **`VERSIONS/RELEASES.md` allineato al reale**: il tag `v3.0.0` **esiste ed è pushato**
  (`d2cf770`) — il file diceva ancora "da pubblicare". Ma la **GitHub Release non è mai stata
  creata**: `gh release list` mostra solo v2.8.0. Metà del rito è saltata. Aggiunta la tabella
  sessioni #37→#71 e le due opzioni per il tag nuovo.
- [ ] **DECISIONE MATTEO — la release nuova**: da v3.0.0 (31/05) sono **646 commit e 3 mesi**
  senza tag. Applicando lo schema: `v3.1.0` se conti i nodi nuovi, `v4.0.0` se conti lo
  scheletro relazionale di GENESIS + il loop notturno che consegna da solo. Una release è una
  dichiarazione: la firma chi la fa. Manca anche `gh release create v3.0.0`.

---
