<!-- TOC -->

- [DA FARE - la bussola viva di TITANIUM_OS](#da-fare---la-bussola-viva-di-titaniumos)
  - [ASPETTA MATTEO](#aspetta-matteo)
  - [Sessione 74  28/09/2026  ANALISI PER LUNITÀ GRAFICA (il ferro al centro)](#sessione-74-28092026-analisi-per-lunità-grafica-il-ferro-al-centro)
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
- [✓] **A1 · le 5 riscritture mirate** (EP_N2_03, 05, 46, 48, 56) e **A2 · rigenerare EP_N2_28 e 55**: serve il tuo ok (P1) → *ok dato e fatti il 27/09 (#73)*
- [ ] **F2 · il tag nuovo**: `v3.1.0` se conti i nodi, `v4.0.0` se conti il salto. La release la firma chi la fa
- [ ] **Titoli tripli** (19/56/63 e 45/53/60): rititolare o archiviare?
- [ ] **Bonifica dei 33 agganci inventati** negli episodi gia' usciti (la guardia ferma solo quelli nuovi): svuotarli e basta, o riscriverli insieme ai FATTI come l'EP_N2_16?
- [✓] **Per il rifacimento grafico** (analisi #74, sez. 6) → *risposte del 28/09*: VULCAN **diventa un pilastro** ·
  FIT-PARK **esce** ("era un'idea") · la dashboard **solo dal PC** per ora, un giorno anche da mostrare · le foto
  del ferro **le organizzi tu** · le distinte **le gestisco io**
- [ ] **Le domande delle distinte** (righe "da verificare", in fondo a ogni `MENTE/<PROGETTO>/DISTINTA_*.md`), quando vuoi.
  *Il martinetto e' risposto (28/09): va comprato, non adesso.*

**Hardware** *(sbloccano MIMS e la V32)*
- [ ] **UPS 50-80€**: la cura alla radice della corruzione HNSW da power-loss (3 volte in 2 giorni)
- [ ] **Mandrino 2.2kW ER20**: prerequisito della fresatura stampi MIMS (fornitore + budget + data)
- [ ] **Martinetto Vevor 3 stadi 20t** — **da comprare, non adesso** (28/09): poi si monta al centro della pressa VULCAN
  e si fa la prima colata. Fino ad allora VULCAN e' in attesa e MIMS resta al 30%
- [ ] **Le foto del ferro** (telaio V32, pressa, mattonelle) — *le organizzi tu (28/09)*: in
  `MICROINDUSTRY/FOTO/V32_BUILD|VULCAN_BUILD|MIMS/<AAAAMMGG>/`, cosi' la dashboard nuova le trova da sola. Servono anche al profilo GitHub (D6)

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


## Sessione #74 · 28/09/2026 — ANALISI PER L'UNITÀ GRAFICA (il ferro al centro)

*Matteo: "e' complicato, prima analizzalo" — si riparte perche' MIMS, la fresa (V32) e VULCAN cresceranno molto.*

- [✓] **Prima accensione con la catena nuova, verificata** (28/09, 13:06-13:08): self-heal RAG, generazione saltata,
  audit a regole (LLM senza credito, come previsto), taglio della bussola (niente da spostare), **critiche 300 -> 19 voci**
  (282 in `critiche_auto_archivio.jsonl`), push dei 6 commit della #73. Esito 0 per catena e push.
- [ ] Il push parte insieme alla catena e finisce prima dell'audit: il commit dell'audit esce all'accensione dopo.
  Da valutare un `git push` in coda alla catena.
- [✓] **Controllo "organi vivi" reso onesto**: il riflusso aveva un falso allarme fisso da 37 giorni (guardava un file che
  nessuno scrive: era la voce G4); Nina e il watcher AI, spenti di proposito, si misurano ma non sono piu' guasti.
- [✓] **Analisi scritta**: `DOCS/ANALISI_74_UNITA_GRAFICA.md`. In breve: **VULCAN non c'e' da nessuna parte** (ne' vista, ne'
  db GENESIS, ne' pilastro in STATE); la catena V32 -> stampi -> VULCAN -> connettori e pelle di MIMS e' gia' scritta nelle
  note (`MENTE/VULCAN/vulcan_e_mims.md`); ~2.500 righe morte e 11 dipendenze inutili; 395 testi da 6-9 px, 6 "neri",
  10 `aria-*`; i dati del ferro fermi (distinta V32 al 16/03). Le ricette VULCAN sono segrete: mai nel repo pubblico.
- [✓] **Le decisioni di Matteo applicate** (28/09): **VULCAN pilastro** in `STATE.json` (38% = 3 voci su 8 della Fase 1 del
  manifesto, fonte scritta accanto), nel db GENESIS (`dep_vulcan`, ordine della catena V32 -> VULCAN -> MIMS), in `pct_sync`
  e nella barra di stato della dashboard. **FIT-PARK fuori** dal db (`RIMOSSI` in `CORE/genesis_seed.py`) e critica mc02 chiusa.
- [💡] **FIT-PARK** parcheggiato: era il primo caso d'uso pensato per MIMS (manifesto operativo VULCAN, 18/03; specifiche in
  `MENTE/MIMS/MIMS_FIT_PARK_SPECS.md`). Se torna, riparte da una riga in `DEPARTMENTS`.
- [✓] **Le tre distinte, fonte unica, in MENTE** (privato, mai nel repo): `MENTE/V32/DISTINTA_V32.md` (51 righe: le 45 del
  16/03 riviste sulle note piu' nuove, molle fuori, telaio 60×60), `MENTE/VULCAN/DISTINTA_VULCAN.md` (la prima: 18 righe),
  `MENTE/MIMS/DISTINTA_MIMS.md` (pezzi, prototipi, i 19 disegni dei PROTOTIPI V1). Ognuna: cosa blocca, legami con le altre
  macchine, domande "da verificare". Puntatori nel `_CANONE.md` (che diceva ancora "Via A o B aperta": sistemato).
- [✓] **Il martinetto Vevor non c'e': va comprato, non adesso** (Matteo 28/09; le note dicevano "da montare"). Allineati
  distinte, manifesto, build reale, scheda MIMS e STATE: VULCAN passa a **in attesa** (`waiting_jack`); la prima colata
  prevista nel Q3 slitta.
- [ ] **Vincolo di disegno** (decisione 3): la dashboard nuova e' **da PC**; un giorno si fa vedere, quindi **mai dati
  sensibili nel codice**: le distinte e le ricette si leggono in locale dall'API.
- [ ] **Errore React gia' presente**: in console "due figli con la stessa chiave: `home`" a ogni apertura della home.
  C'era gia' prima (verificato il 28/09 togliendo le modifiche della #74): da togliere con la pulizia.
- [ ] **Prossimo**: pulizia (codice morto, dipendenze) -> fonte dati del ferro (l'API legge le distinte, MENTE, FOTO) ->
  brief e token -> la mappa della catena -> le tre stanze del ferro (ordine nella sez. 8 dell'analisi).

---


## Sessione #73 · 27/09/2026 — PULIZIA DELL'AVVIO (Claude + Windows)

*Chiesta da Matteo: "controlla tutto cio' che c'e' all'avvio, pulisci, lascia cio' che serve".
L'handoff iniettato era quello del 27/08 spacciato per "#72": la #72 vera (28/08) non era mai stata salvata.*


**✅ P0 DELLA SCALETTA — GLI STRUMENTI CHE CI ORIENTANO (su ordine Matteo)**

**✅ AUTOMAZIONI: DA "NOTTURNE" AD "ALL'ACCENSIONE" (Matteo: PC quasi sempre spento, non uso gli agenti, niente credito)**

**✅ P1 (prima parte): A3 + I2 (su ordine Matteo, "intanto fai A3 e I2")**
- [ ] **Trovato: le correzioni agli episodi non arrivano in dashboard.** `build_episodes_json.py` e' solo additivo:
  EP_N2_16 in dashboard aveva ancora il testo di PRIMA del batch 3 (#71). Vale per ogni episodio corretto.
  Serve un refresh del `content` quando il .md cambia (voce B, robustezza). *Nina riallineati a mano il 27/09; restano 86 voci EP_AUTO/SEED/S2 con testo diverso dal .md (non toccate: cambia la struttura).*
- [ ] **Trovato: 33 agganci su 42** esistenti non passano la guardia (versioni inventate, MIMS software, agenti
  che non esistono...). `python AUTOMATIONS/core/aggancio_guard.py` li elenca. Bonifica retroattiva: decide Matteo.

**➡ PROSSIMA SESSIONE (#74) — L'UNITÀ GRAFICA NUOVA** *(Matteo: "completamente tua, senza reference; dividi i progetti,
un grafico a rami che si uniscono a livelli per legare i punti comuni")*
- [✓] *(fatta al #74: `DOCS/ANALISI_74_UNITA_GRAFICA.md`, con le risposte di Matteo)* **PRIMA L'ANALISI, POI IL DISEGNO** (Matteo, 27/09 sera: "e' complicato, prima analizzalo"). E il PERCHE' si riparte:
  **MIMS, la fresa (V32) e VULCAN si svilupperanno molto di piu'**. La nuova unita' grafica nasce per il ferro, non per il
  sistema. Da capire prima di una riga di codice: (1) quali viste di oggi servono, quali sono teatro, quali mostrano dati
  finti; (2) cosa serve per seguire la costruzione (distinta materiali, decisioni, prove, foto, blocchi hardware, tempi);
  (3) da dove arrivano i dati (MENTE: V32 7 note, MIMS 36, VULCAN 5; db GENESIS; git); (4) i punti in comune fra i tre
  (materiali, giunti, stampi, officina) = dove i rami della mappa si uniscono.
- [ ] **Lo strumento giusto, gia' sul PC**: il plugin ufficiale Anthropic `frontend-design` e' nel marketplace clonato
  (`~/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design`). Serve proprio a dare un'identita'
  visiva distintiva senza reference ed evitare l'aspetto "generato". Installarlo: `/plugin install frontend-design@claude-plugins-official`.
  Accanto, `playwright` (stesso marketplace) per verificare le schermate a vista.
- [ ] **Brief prima del codice** (e' il metodo del plugin): soggetto = officina + sistema ("artigiano industriale"),
  pubblico = Matteo ogni giorno + chi guarda da fuori; una direzione estetica decisa, tipografia non di default,
  un colore dominante con un accento, UN solo momento di movimento. Si decide una volta, poi si costruisce.
- [ ] **Token di design in Tailwind 4** (`@theme`): un nero solo, una scala tipografica, tema chiaro e scuro dagli
  stessi token. Chiude insieme i debiti della voce C (4 neri, 239 `text-[7px]`, zero `aria-*`, tema light a meta').
- [ ] **La mappa a rami che si uniscono a livelli** = un DAG, il "tangled tree": V32, MIMS, VULCAN, GENESIS, Nina,
  Vita Natura, Identity come rami che si toccano nei punti comuni (materiali, MENTE, officina, GENESIS). Tecnica:
  React Flow (`@xyflow/react`) + layout ELK "layered" (o d3 per il tangled tree). Dati DERIVATI, non scritti a mano:
  db GENESIS (chi ci lavora) + vault (cosa sappiamo) + git (quanto si e' mosso) = C1-C3 della scaletta.
- [◐] **Via il teatro**: `three`/`@react-three/*`, `tsparticles`, i force-graph che non servono piu', ~2,5k righe di
  codice morto (voce C). Prima si misura cosa si usa davvero, poi si toglie. *Misurato al #74 (analisi sez. 2):
  5 componenti + 3 file dati morti, 9 dipendenze mai usate + 2 usate solo dal codice morto. Togliere = il prossimo passo.*
- [ ] **Stesso lavoro, due vetrine**: la mappa finita va anche sul profilo GitHub (voce D).

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
7. `A1` le 5 riscritture mirate --- **FATTO 27/09 (#73)**
8. `A2` rigenerare EP_N2_28 e 55 --- **FATTO 27/09 (#73)**, riparati invece che rigenerati
9. `A3` togliere i 2 numeri inventati dell'EP_N2_16 --- **FATTO 27/09 (#73)**
10. `I2` far mordere la regola "meglio vuoto che inventato" sullo slot `aggancio_reale` --- **FATTO 27/09 (#73)**

**P2 - LA MAPPA** *(un lavoro solo che serve due volte: dashboard + profilo)*
→ *#74 (ordine Matteo 27/09): diventa il RIFACIMENTO DELL'UNITÀ GRAFICA della dashboard, con la mappa a rami come cuore. Piano nel blocco #73, sezione PROSSIMA SESSIONE.*
→ *#74 (28/09): analisi fatta (`DOCS/ANALISI_74_UNITA_GRAFICA.md`), decisioni di Matteo prese e applicate (VULCAN pilastro, FIT-PARK fuori, distinte del ferro in MENTE). Si parte dalla pulizia (sez. 8 dell'analisi).*
11. `B1` allineare i nomi dei due alberi, `B2` GENESIS 7o dipartimento (copiare dal vault)
12. `C1-C3` S4: la mappa unica in dashboard
13. `D1-D5` la stessa mappa sul profilo GitHub + crescita + badge + racconto
14. `D6` le foto del ferro --- **le ha Matteo**: le organizza lui in `FOTO/<PROGETTO>/<AAAAMMGG>/` (28/09)
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

**FUORI SCALETTA - solo Matteo:** `F2` il tag della release - `H` hardware (UPS, ER20, Vevor: "non adesso", 28/09),
chiavi da ruotare, API key Semantic Scholar.

---

**🔧 K — LE CRITICHE: riconfigurarle perche' funzionino (ordine Matteo 28/08)**

*Stessa identica malattia della bussola: crescono, non si sfoltiscono, e nessuno le rilegge.*


---

**🔴 A — CANONE: chiude il gate a zero (restano 8 righe, tutte nei 7 sospesi)**

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
- [ ] **G5** · Il controllo orfani gira su **333 note su 667**: meta' vault non e' mai stata
  controllata. Non vuol dire che sia scollegata — vuol dire che non lo sappiamo.

**⚪ H — SOLO MATTEO (non delegabili, gia' in AZIONI_MATTEO.md)**

**🩶 I — DEBITO VECCHIO, ancora lì**
- [ ] **I1** · EP_N2_04 uscito il 16/08 alle ~09:00 invece che alle 21:00: se Business Suite
  pubblica quando gli pare, la coda programmata non e' affidabile.

**🧭 R — RIORGANIZZARE LA BUSSOLA (si fa PRIMA di tutto il resto, ordine Matteo 28/08)**

*Il problema in una riga: questo file ha smesso di essere una bussola ed e' diventato un
archivio travestito. Per arrivare a oggi si scorrono 100 righe di indice e tre mesi di storia.
Una cosa che devi scorrere non ti orienta.*


**✅ FONTE DI CONCETTO — le due linee (28/08, da NotebookLM)**
- [💡] **Avvertenza sulla voce, da decidere**: meta' di quei documenti e' scritta da un
  assistente AI che parla *a* Matteo ("Ricevuto, Matteo", "Socio, il Board dei 7 specialisti
  e' riunito nella War Room"). Quell'epica militare **e' il tono dell'AI, non il tuo**.
  Sotto pero' c'e' roba vera: la densita' tecnica, il rifiuto del pressapochismo, il
  cameratismo asciutto - «la disciplina del metallo e quella del corpo sono una cosa sola».
- [ ] **Da qui esce la riga della vetrina** (sezione D4): la frase che lega crescita e albero
  puo' venire da qui invece che essere inventata.

**◐ IN CORSO ADESSO**

---

