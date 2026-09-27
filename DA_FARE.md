<!-- TOC -->

- [DA FARE - la bussola viva di TITANIUM_OS](#da-fare---la-bussola-viva-di-titaniumos)
  - [ASPETTA MATTEO](#aspetta-matteo)
  - [Sessione 73  27/09/2026  PULIZIA DELLAVVIO (Claude  Windows)](#sessione-73-27092026-pulizia-dellavvio-claude-windows)
  - [Sessione 72  28/08/2026  IL PIANO COMPLETO (scritto prima di eseguirlo)](#sessione-72-28082026-il-piano-completo-scritto-prima-di-eseguirlo)
    - [BACKLOG EREDITATO - TRIATO IL 28/08 (193 voci - 47 vere)](#backlog-ereditato---triato-il-2808-193-voci---47-vere)
    - [SCALETTA - lordine in cui si fa, passo passo](#scaletta---lordine-in-cui-si-fa-passo-passo)

<!-- /TOC -->

# DA FARE - la bussola viva di TITANIUM_OS

*Cosa e' aperto, cosa e' in corso, cosa aspetta Matteo. **Nient'altro.***

> **Tagliata il 28/08/2026 (sessione #72).** Era arrivata a **2.858 righe, 40 sessioni,
> 209 voci aperte** che nessuno riguardava piu': un archivio travestito da bussola.
> Una cosa che devi scorrere non ti orienta.

| File | Cosa contiene | Si legge |
|---|---|---|
| **questo** | aperto - in corso - aspetta Matteo + la SCALETTA | **a inizio sessione** |
| `CRITICHE.md` | le critiche **aperte** (⌛ = scaduta: prima si riverifica) | quando lavori su una critica |
| `ABBIAMO_FATTO.md` | la storia: ci arriva da solo il taglio di questo file | quando serve il *perche'* |
| `BACKLOG_EREDITATO.md` | 209 voci vecchie **in quarantena** | a lotti, verificando |
| `CRITICHE_CHIUSE.md` · `DOCS/_archivio_*` | critiche risolte · piani e liste vecchie | mai a inizio sessione |

**Metro di collaudo: se questo file non sta in una schermata, ha fallito di nuovo.**

---


*Questa è la scaletta condivisa io↔Matteo: dove siamo, cosa è fatto, cosa resta.*
*Si legge a INIZIO sessione e si aggiorna STRADA FACENDO (non a fine soltanto).*

**REGOLE DELLA BUSSOLA (standard):**
- **Non si cancella mai.** Si cambia solo lo stato di una riga. Se una cosa salta,
  si scrive `[✗] non fatto — motivo`, non si toglie.
- **Append in cima**: il blocco della sessione più recente va in alto.
- Stati: `[✓] fatto` · `[◐] in corso` · `[ ] da fare` · `[✗] non fatto` · `[💡] idea`.
- Canonica = QUESTO file (repo, versionato). Il Desktop `da fare.txt` è uno **specchio PURO**
  (copia identica, scritta da `AUTOMATIONS/core/sync_dashboard.py` dall'hook Stop globale a fine
  turno). Non si edita a mano.
- **Il taglio lo fa il sistema** (R2, #73): ogni notte il night_audit, e al /salva,
  `AUTOMATIONS/core/bussola_taglio.py` sposta in `ABBIAMO_FATTO.md` le righe chiuse delle sessioni
  prima dell'ultima chiusa, col loro perche'. Un blocco senza piu' niente di aperto esce intero.
- Il piano vivo è la **SCALETTA** qui sotto (blocco #72). `PROSSIMA_SESSIONE.md` (fermo al 22/06) e
  `AZIONI_MATTEO.md` (fermo al 29/07) sono archiviati in `DOCS/_archivio_*` (#73).

---


## ⏳ ASPETTA MATTEO

*Quello che il sistema non puo' fare da solo: decisioni, hardware, chiavi, impostazioni tue.
Una lista sola: dal #73 assorbe `AZIONI_MATTEO.md` e la sezione H del piano. Quando ne fai una, dimmelo.*

**Decisioni** *(sbloccano la scaletta)*
- [ ] **A1 · le 5 riscritture mirate** (EP_N2_03, 05, 46, 48, 56) e **A2 · rigenerare EP_N2_28 e 55**: serve il tuo ok (P1)
- [ ] **F2 · il tag nuovo**: `v3.1.0` se conti i nodi, `v4.0.0` se conti il salto. La release la firma chi la fa
- [ ] **Titoli tripli** (19/56/63 e 45/53/60): rititolare o archiviare?

**Hardware** *(sbloccano MIMS e la V32)*
- [ ] **UPS 50-80€**: la cura alla radice della corruzione HNSW da power-loss (3 volte in 2 giorni)
- [ ] **Mandrino 2.2kW ER20**: prerequisito della fresatura stampi MIMS (fornitore + budget + data)
- [ ] **Martinetto Vevor 3 stadi 20t** da montare al centro della pressa VULCAN: prima colata, MIMS e' fermo al 30%
- [ ] **Le foto del ferro** (telaio V32, pressa, mattonelle) per il profilo GitHub (D6)

**Chiavi** *(~5 minuti l'una. NON in `TITANIUM_OS/.env`, nessuno lo legge: `setx NOME "valore"` oppure la riga in `_VAULT/KEYS/titanium_os.env`)*
- [ ] **Ruotare le chiavi del red-team #38**: esposte allora, ancora attive
- [ ] **SEMANTIC_SCHOLAR_API_KEY** (gratuita): azzera i 429 della ricerca notturna (81% di chiamate a vuoto, misurato al #69)
- [ ] *(opzionale)* **HF_TOKEN**: download dei modelli piu' rapidi, non bloccante

**Dati e impostazioni tue**
- [ ] **URL del sito di Maria** (Vita Natura): 30 secondi, poi l'agente chiude il collegamento da solo
- [ ] **App di avvio di Windows** (Gestione attivita' -> App di avvio): Steam, Edge, Chrome in background, Logitech Download Assistant
- [ ] **App Claude**: 6 plugin Cowork mai usati (21 server MCP mai autorizzati) e i connettori claude.ai che non usi
- [ ] **Claude CLI da terminale** scollegato (OAuth scaduto): `claude` poi `/login`, solo se ti serve
- [ ] **Due servizi locali accettano connessioni dalla rete**, non solo dal PC: e' voluto? (dettaglio nella chat del #73, non qui: il repo e' pubblico)
- [ ] **Svuotare il Cestino** quando vuoi: dentro ci sono i 1,24 GB di cloni orfani del #73

**Generazione a PC spento** *(il credito API e' finito e non si ricarica: resta l'abbonamento Pro)*
- [ ] **Riaprire un canale di pubblicazione** (Postiz/Docker, LinkedIn, Meta): senza, ogni carosello nuovo si accumula
  sulle 12 bozze. E' il prerequisito di tutto il resto
- [ ] **Routine cloud di Claude Code**: collegare GitHub a claude.ai/code, poi UNA routine settimanale (es. "prepara i
  prossimi 2 caroselli come PR su un branch `claude/`"). Consuma l'abbonamento, non il credito. Solo quando si pubblica
- [ ] **Dependabot** sul repo (gratis, GitHub): avvisi CVE per email a PC spento, al posto del pip-audit del sabato

---


## Sessione #73 · 27/09/2026 — PULIZIA DELL'AVVIO (Claude + Windows)

*Chiesta da Matteo: "controlla tutto cio' che c'e' all'avvio, pulisci, lascia cio' che serve".
L'handoff iniettato era quello del 27/08 spacciato per "#72": la #72 vera (28/08) non era mai stata salvata.*

- [✓] **137 cloni orfani** del marketplace plugin (`~/.claude/plugins/marketplaces/temp_*`, **1,24 GB**) -> Cestino.
  Causa: ogni avvio di Claude ri-clonava il marketplace e i processi concorrenti lasciavano i temp.
  Cura: `autoUpdate:false` (nessun plugin installato da li') + `installLocation` che puntava a `C:\Users\benen`
- [✓] Hook SessionStart -> `~/.claude/hooks/sessionstart_titanium.sh`: stampa **HANDOFF STANTIO** se ha >2 giorni
  o se la bussola e' piu' recente (= sessione chiusa senza /salva)
- [✓] `START_LOGIN.bat` v2.2: tolti Chrome 9222 (morto), API doppione (la tiene TI_Watchdog), finestra Claude CLI
- [✓] `ti_autorun.cmd` v1.2: cd/doskey/banner solo nelle console interattive (ogni `cmd /c` finiva in TITANIUM_OS
  col banner dentro l'output). Variabili e PATH restano per tutti
- [✓] commit `62cf999f`: il lavoro della #72, fermo da un mese. Esce col push notturno (repo PUBBLICO)
- [✓] Le 4 voci per Matteo della pulizia (app di avvio, plugin/connettori, CLI, servizi in rete) -> spostate in ⏳ ASPETTA MATTEO
- [✓] Task notturni col PC spento: all'accensione partono tutti insieme (StartWhenAvailable). Il 27/09 alle 11:09
  **6 su 11 interrotti** (0xC000013A) -> e' la voce H "replica serale della catena se la notte salta"
  → *#73: risolta col blocco AUTOMAZIONI qui sotto (una catena in fila invece di 11 task insieme).*

**✅ P0 DELLA SCALETTA — GLI STRUMENTI CHE CI ORIENTANO (su ordine Matteo)**
- [✓] **R7+R6 · la bussola si chiama `DA_FARE.md`** (`git mv`, storia intatta); `DA_FARE_FATTO.md` e' un cartello.
  Aggiornati i 9 punti vivi + l'hook globale. Le storie che la *raccontano* restano come sono.
- [✓] **Trovato per strada**: il parser della bussola contava i `[v]` della #72 come DA FARE. Ora `v`/`x` = fatto.
- [✓] **R4 · archivi fuori lettura.** Il RAG `search_mente` non li vedeva gia' (indicizza solo MENTE/): il peso stava
  nel grafo graphify, dove ABBIAMO_FATTO faceva **78 nodi** e la bussola **6**. Fonte unica `fuori_lettura.py` ->
  `.graphifyignore` (derivato da .gitignore, che graphify altrimenti smette di leggere) + ricerca `/api/search`.
- [✓] **R2 · il taglio lo fa il sistema**: `bussola_taglio.py` (prova di default, idempotente, prima la storia poi la
  bussola), agganciato al night_audit (commit a parte) e al /salva (`--chiusa N`). Primo taglio vero: la #71 e'
  uscita intera (130 righe) dopo aver chiuso le sue 7 voci aperte col loro seguito nel piano (A1-A3, B2, C, F).
- [✓] **Il guasto sotto R2: l'hook di fine sessione era MORTO dal 16/07.** Era `cmd /c ...` di progetto e Claude Code
  lo lancia da Git Bash, che trasforma `/c` in `C:/`. Da due mesi e mezzo niente handoff, specchio, CRITICHE,
  percentuali, e fuori da TITANIUM_OS non c'era proprio (per questo la #72 non ha lasciato traccia). Ora e' globale.
- [✓] **L'handoff non si intitola piu' col contatore finto** (`session_count` = 169): il numero lo da' la bussola (E3).
- [✓] **K1-K4 · CRITICHE**: `CRITICHE.md` solo aperte, le risolte in `CRITICHE_CHIUSE.md`; scadenza per critica
  (campo `verificata`): oggi **20 aperte su 20 sono ⌛ scadute** (84 giorni); regola K4 in testa (prima si verifica).
  Le automatiche chiuse da 30+ giorni vanno in archivio: il file vivo passa da 300 voci a ~24 (provato su copia).
- [✓] **R8 · il contorno**: AZIONI_MATTEO e PROSSIMA_SESSIONE in `DOCS/_archivio_*`; azioni vive in ⏳ ASPETTA MATTEO
  (i connettori MIMS erano gia' decisi, Via B 24/06). `active_milestone` da 1.459 a 107 caratteri e il profilo
  pubblico ne prende solo la prima frase. Specchio Desktop `da fare.txt` (il vecchio, fermo al 16/07, nel Cestino).
- [ ] **Da guardare alla prossima accensione**: il primo taglio automatico (le 7 righe `[v]` della #72), la prima
  rotazione dell'archivio critiche, i commit nuovi dell'audit (ora dentro la catena d'avvio).

**✅ AUTOMAZIONI: DA "NOTTURNE" AD "ALL'ACCENSIONE" (Matteo: PC quasi sempre spento, non uso gli agenti, niente credito)**
- [✓] **I fatti**: PC acceso 25 giorni su 40, di giorno. Il **credito API e' finito dal 16/09** ("credit balance too low"):
  audit LLM, corsia Nina, storie, caroselli, self-improve fallivano gia' tutti. Utili davvero: audit, inventario, push, RAG.
- [✓] **Catena d'avvio** = `night_research.bat` v3.0 (task TI_NightResearch, elevato): self-heal RAG -> riflusso ->
  wiki -> RAG incrementale -> snapshot -> versione MENTE -> **audit a regole + taglio bussola**, in fila. Gratis.
  La generazione (ricerca + episodio Nina) solo con `night_research.bat genera`. Provata con script finti.
- [✓] **Spenti** (Task Scheduler): TI_NightAudit (e' nella catena), TI_AiWatch, TI_SelfImprove (62 proposte mai lette),
  TI_NightCaroselli, TI_NightCaroselliNina. **Interruttore nello script** (elevati, senza admin non si disattivano):
  `run_story_agent.bat`, `night_finetune.bat` escono subito se non gli passi `genera`. Restano: Watchdog, NightPush,
  DeepFreeze (backup), DailyBrief (gratis). Tutto reversibile.
- [✓] **Ricerca "a PC spento, senza credito"**: le **routine di Claude Code** (cloud Anthropic, piano Pro, max 5 al
  giorno, consumano l'abbonamento, non l'API; clonano il repo e lavorano su branch `claude/`). GitHub Models: chiuso
  il 30/07. GitHub Actions col token dell'abbonamento: possibile ma piu' rischioso. -> decisione in ⏳ ASPETTA MATTEO.
- [✓] **Caroselli: controllo delle 12 bozze** (niente generato): 10 passano canon_guard e sono coerenti con l'episodio.
  **Da rivedere 3**: EP_SG_03_03 (±0,019 mm dato come fatto), EP_N2_10 (l'episodio e' cambiato il 27/08, dopo la
  bozza), EP_N2_09 (slide 2 senza illustrazione: la scena `biblioteca` manca). Il collo resta la pubblicazione.

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
2. `R7` cartello sul vecchio nome, poi `R6` rinomina --- *tocca 9 punti di codice + hook* --- **FATTO 27/09 (#73)**
3. `R4` escludere `ABBIAMO_FATTO` e `BACKLOG_EREDITATO` da RAG e lettura di sessione --- **FATTO 27/09 (#73)**
4. `R2` agganciare il taglio alla chiusura di sessione (se lo deve ricordare un umano, muore) --- **FATTO 27/09 (#73)**
5. `K1-K4` rimettere in sesto le CRITICHE (sotto): stessa malattia, stessa cura --- **FATTO 27/09 (#73)**
6. `R8` il resto del contorno: AZIONI_MATTEO (24/06), PROSSIMA_SESSIONE (09/06), STATE, Desktop --- **FATTO 27/09 (#73)**

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

- [✓] **K1 · La diagnosi**: il canone manuale e' **fermo da 49 giorni** con **19 critiche attive**
  che nessuno ha riverificato. Il night_audit intanto ne aggiunge di automatiche e ne chiude
  in automatico (l'ultima notte: +1 aggiunta, 6 auto-chiuse). Risultato: due flussi che non si
  parlano, e un file che cresce.
  → *#73: curata con K2+K3. I due flussi ora parlano la stessa lingua: scadenza per critica, anche nel night_audit.*
- [✓] **K2 · Lo stesso taglio della bussola**: `CRITICHE.md` tiene solo le **aperte**; le chiuse
  vanno in un file storico fuori dal percorso di lettura. Stessa regola, stesso motivo.
  → *#73: `CRITICHE.md` solo aperte, `CRITICHE_CHIUSE.md` fuori lettura; archivio `critiche_auto_archivio.jsonl` per le automatiche.*
- [✓] **K3 · La staleness deve VEDERSI**, come nell'handoff riparato nella #71: una critica non
  riverificata da 30+ giorni non e' "attiva", e' **scaduta**, e va marcata cosi'. Oggi una
  critica di giugno e una di ieri hanno lo stesso aspetto.
  → *#73: campo `verificata` per critica, soglia 30 giorni: `[⌛] scaduta · non riverificata da N giorni`.*
- [✓] **K4 · Il campione lo dimostra**: sul backlog vecchio **4 voci su 7 erano gia' fatte**.
  Non c'e' motivo di credere che le critiche stiano meglio. Prima di eseguirne una, si verifica.
  → *#73: la regola sta in testa a `CRITICHE.md` e in CLAUDE.md.*

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
- [✓] *#73: le 4 voci (UPS, mandrino+Vevor, chiavi+Semantic Scholar, foto del ferro) sono in ⏳ ASPETTA MATTEO, in testa.*

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
- [✓] **R2 · Il taglio lo fa il sistema, non noi.** Se dipende dal fatto che qualcuno se lo
  ricorda, muore: e' il pattern di questa casa (AZIONI_MATTEO fermo al 24/06,
  PROSSIMA_SESSIONE al 09/06, critiche a 49 giorni). Va agganciato alla chiusura di sessione,
  come lo specchio Desktop.
  → *#73: `bussola_taglio.py`, nel night_audit e al /salva. E sotto c'era l'hook Stop morto dal 16/07: riparato, globale.*
- [v] **R3 · FATTO (regola applicata subito): si taglia con UNA SESSIONE DI RITARDO, non appena e' `[v]`.** I blocchi fatti non
  contengono solo il *cosa*: contengono il **perche'** (perche' GENESIS era il pilastro
  sbagliato, perche' la scrittura non atomica ha rotto l'indice). Chiude la #73 -> si sposta la
  #72. Una sessione di sovrapposizione, e la memoria corta resta in vista.
- [✓] **R4 · LA TRAPPOLA - "non pesa" dipende da DOVE lo metti.** Il peso viene da due posti:
  Claude che lo legge a inizio sessione, e **il RAG che lo indicizza**. Se `ABBIAMO_FATTO.md`
  resta nel percorso di lettura del RAG, il peso non e' sparito: e' solo cambiato di file.
  Va escluso **esplicitamente** da entrambi. *Precedente gia' in casa e funzionante: i
  `changelog_archive_*.md` sono fuori da git per questo identico motivo.*
  → *#73: il RAG non lo vedeva gia' (solo MENTE/); fuori da graphify e da `/api/search` via `fuori_lettura.py`.*
- [v] **R5 · Struttura data (FATTO), resta da agganciarla a STORIE/profilo.** `ABBIAMO_FATTO.md` ha due usi veri e gia'
  presenti nel sistema: e' la **materia prima delle STORIE** (i milestone verificati diventano
  episodi) e la **crescita del profilo GitHub** (la barra dei mesi, le "10 notti su 11").
  Quindi non testo libero: **data - cosa - perche'**, leggibile a macchina.
- [✓] **R6 · IL NOME - valutato da Claude, come chiesto: SI RINOMINA.**
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
  → *#73: fatto, `git mv` a `DA_FARE.md`, i 9 punti vivi + l'hook aggiornati.*
- [✓] **R7 · Rete di sicurezza: il vecchio nome resta come CARTELLO.** `DA_FARE_FATTO.md`
  diventa un file di due righe che punta ai due nuovi. Cosi' se scappa un riferimento non si
  rompe in silenzio: **atterra su un'indicazione**. E' il principio di tutta la #71 - meglio
  un errore che si vede di un guasto muto.
  → *#73: fatto, `DA_FARE_FATTO.md` e' il cartello.*
- [✓] **R8 · Stessa cura al contorno**, che ha la stessa malattia (cresce e non si sfoltisce
  mai): `CRITICHE.md` - `AZIONI_MATTEO.md` (fermo al #45, 24/06) - `PROSSIMA_SESSIONE.md`
  (consolidato il 09/06) - lo specchio Desktop - `STATE.json`, il cui `active_milestone` e'
  un muro di testo che **finisce pubblico** sul profilo GitHub.
  → *#73: archiviati AZIONI_MATTEO e PROSSIMA_SESSIONE, STATE in una riga, specchio `da fare.txt`, CRITICHE = K.*

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
- [✓] **Revisione della BUSSOLA e di tutto il suo contorno** (ordine Matteo, 28/08).
  I file del protocollo — questo, `RIAVVIO_SESSIONE.txt`, `STATE.json`, `AZIONI_MATTEO.md`,
  `PROSSIMA_SESSIONE.md`, lo specchio Desktop — vanno guardati insieme: la #71 ha dimostrato
  che **due dei tre file letti a inizio sessione raccontavano il falso**. Prima si sistema
  lo strumento che ci orienta (**sezione R qui sopra**), poi si esegue il piano.
  → *#73: chiusa col P0 della scaletta.*

---

