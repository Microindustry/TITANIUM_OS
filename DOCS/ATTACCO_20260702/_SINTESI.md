<!-- TOC -->

- [_SINTESI  ATTACCO ESERCITO (7 specialisti)  02-03/07/2026](#sintesi-attacco-esercito-7-specialisti-02-03072026)
  - [Quadro dinsieme (una riga per dominio)](#quadro-dinsieme-una-riga-per-dominio)
  - [TOP 10 AZIONI (ordinate per leva)](#top-10-azioni-ordinate-per-leva)
    - [1. MOSSA 1  Il checkout che sblocca tutto (06 1)  QUICK-WIN (lordine)](#1-mossa-1-il-checkout-che-sblocca-tutto-06-1-quick-win-lordine)
    - [2. RAG P0  Ripuntare _CANONE.md alla verità V32 VERA (07 P0)  QUICK-WIN](#2-rag-p0-ripuntare-canonemd-alla-verità-v32-vera-07-p0-quick-win)
    - [3. RAG P0  Escludere dal canone 55 file di versioni superate (07 P0)  QUICK-WIN](#3-rag-p0-escludere-dal-canone-55-file-di-versioni-superate-07-p0-quick-win)
    - [4. Sicurezza EVA  bind 127.0.0.1  auth /inbox  APP_SECRET obbligatorio in LIVE (02 F1F2)  QUICK-WIN](#4-sicurezza-eva-bind-127001-auth-inbox-appsecret-obbligatorio-in-live-02-f1f2-quick-win)
    - [5. Sicurezza IP  Spostare VULCAN_MANIFESTO.md ( mims IP) fuori dal repo pubblico (02 F3  06 P2)  QUICK-WIN](#5-sicurezza-ip-spostare-vulcanmanifestomd-mims-ip-fuori-dal-repo-pubblico-02-f3-06-p2-quick-win)
    - [6. RAG  Guardia anti commit-leak in api_server (04 1)  INGEGNERIZZAZIONE leggera](#6-rag-guardia-anti-commit-leak-in-apiserver-04-1-ingegnerizzazione-leggera)
    - [7. Software  Igiene .env/segreti in root (04 2)  QUICK-WIN](#7-software-igiene-envsegreti-in-root-04-2-quick-win)
    - [8. News-IA  Riparare il watcher: Anthropic feed  filtro stelle  schedulazione (05 P1-P3)  QUICK-WIN](#8-news-ia-riparare-il-watcher-anthropic-feed-filtro-stelle-schedulazione-05-p1-p3-quick-win)
    - [9. Scrittura  Indice/canone storie  EP_N2_03 la Misura (03 12)  QUICK-WIN  contenuto](#9-scrittura-indicecanone-storie-epn203-la-misura-03-12-quick-win-contenuto)
    - [10. Design  Quick-win CSS  template canonico caroselli PRIMA di EP_N2_03 (01 P1-P3, P11)  QUICK-WIN  INGEGNERIZZAZIONE](#10-design-quick-win-css-template-canonico-caroselli-prima-di-epn203-01-p1-p3-p11-quick-win-ingegnerizzazione)
  - [Seconda fascia (in bussola come  , dopo la prima ondata)](#seconda-fascia-in-bussola-come-dopo-la-prima-ondata)
  - [Note di metodo](#note-di-metodo)

<!-- /TOC -->

# _SINTESI — ATTACCO ESERCITO (7 specialisti) · 02-03/07/2026

*Coordinatore: Fable 5. I 7 agenti (design · sicurezza · scrittura · software · news-IA · gestionale · integrità-RAG) hanno girato su Fable, additivo/propose-only, ognuno con `file:riga`. Qui la sintesi: le TOP 10 azioni ordinate per **leva (impatto / rischio)**. Nessuna modifica applicata — questo è il piano; le migliori entrano in `DA_FARE_FATTO.md` come `[ ] DA FARE` e si eseguono a ondate col gate SELF_IMPROVE (propose-only).*

Report sorgente: `01_design.md` · `02_sicurezza.md` · `03_scrittura.md` · `04_software.md` · `05_news_ia.md` · `06_gestionale.md` · `07_integrita_rag.md`.

---

## Quadro d'insieme (una riga per dominio)
- **01 Design** — identità visiva forte, ma **sistema a metà**: token incompleti, componenti N-livelli quadruplicati, accessibilità mai iniziata; caroselli coerenti al 95% ma tenuti dal copia-incolla.
- **02 Sicurezza** — repo pulito (zero segreti reali, `api_server.py` ben hardenato); l'unico buco di rete è **EVA** (bind 0.0.0.0 + `/inbox` con PII senza auth) + IP VULCAN nel repo pubblico.
- **03 Scrittura** — la prosa dei 51 episodi regge (3 strati ovunque); è **l'indice/canone** ad essere derivato: `INDICE_CAMMINO` scaduto, catena open-loop 2→3 rotta, doppioni dal batch auto.
- **04 Software** — `rag_engine` e auth fatti bene; da chiudere il **commit-leak RAG senza guardia**, `.env` in root, NEXUS codice morto "active", 2+ GB di detriti su disco.
- **05 News-IA** — **Anthropic News (Tier1) morta dal giorno 1** (zero segnali in 25 gg); tier degenera per volume; topic GitHub pieni di spam. Watchlist +12 sorgenti keyless pronta.
- **06 Gestionale** — i numeri master reggono l'aritmetica ma **FINANCE/ è vuota** e il **BEP Via B non è calcolabile** finché non c'è la prima colata; 3 errori fattuali nel pitch pubblico.
- **07 Integrità-RAG** — catena storie→RAG→Nina sana come *meccanica* (semantico==bm25==25119, self-heal ok), ma **la "verità" puntata dal `_CANONE.md` è quella vecchia e vietata** (V32 su molle + framing "recuperato") e 55 file di versioni superate competono nel retrieval.

**Filo rosso:** il sistema *gira*, ma in tre punti **la fonte di verità è stantia** (canone RAG, indice storie, pitch) e in un punto **un solo ordine hardware sblocca l'intera catena economica**. Le azioni sotto attaccano prima quelli.

---

## 🎯 TOP 10 AZIONI (ordinate per leva)

### 1. MOSSA 1 — "Il checkout che sblocca tutto" (06 #1) — QUICK-WIN (l'ordine)
Un solo ordine: **martinetto Vevor 20t + mandrino 2.2kW ER20 (~180€) + UPS (~50-80€)**. Chiude in un colpo 3 blocker fermi da ~4 mesi e innesca 5 output: ① prima colata VULCAN → ② BEP Via B calcolabile → ③ stampo tile fresabile su V32 → ④ **fine corruzioni HNSW notturne** (l'UPS è la cura alla radice, non un accessorio) → ⑤ episodio/reel della prima colata (keyword a concorrenza ~0). Miglior rapporto €/leva del sistema. — *06:29, blocker in `DA_FARE_FATTO.md`.*

### 2. RAG P0 — Ripuntare `_CANONE.md` alla verità V32 VERA (07 P0) — QUICK-WIN
`MENTE/_CANONE.md:13` indica come "verità tecnica" `v32_analisi_tecnica_reale.md` + `v32_la_mappa_vivente.md`, che descrivono la macchina **su 4 molle ISO verdi** (superata: corpo unico, maggio 2026) con 7 righe di framing vietato "recuperato/81%/Euro 0". Nina e `story_agent` groundano su questi come "reale". Inoltre `canon_guard.clean` **non matcha** queste righe ("Euro" vs "EUR" nei PAIRS). Fix: ripuntare il canone ai doc corretti (corpo unico) + estendere i PAIRS di `canon_guard`. — *È la falla più grave: la verità unica punta al falso.*

### 3. RAG P0 — Escludere dal canone 55 file di versioni superate (07 P0) — QUICK-WIN
`ASSOLUTO/VERSIONI` (13) + `KNOWLEDGE/SINAPSI/ARCHIVIO` (32, con copie duplicate delle note V32) + `ARCHIVE_V6` (10) sono indicizzati perché le esclusioni (`rag_engine.py:134,143`) coprono solo `_ARCHIVIO`/`_PROPOSTI`/`RESEARCH`. Archivi senza underscore competono col reale in retrieval. Fix: estendere le exclusions (o rinominare con `_`). *Da fare a GPU libera, UN rebuild solo (no martello: commit-leak/OOM).*

### 4. Sicurezza EVA — bind 127.0.0.1 + auth `/inbox` + `APP_SECRET` obbligatorio in LIVE (02 F1+F2) — QUICK-WIN
`NODES/EVA/eva_server.py:162` fa `app.run(host="0.0.0.0")` e `/inbox` (`:139`) restituisce gli handoff con **PII clienti Vita Natura** (numero WhatsApp, intent, messaggi) **senza auth**: leggibile da chiunque su LAN/Tailscale. `valid_signature()` (`:88`) ritorna `True` se `EVA_APP_SECRET` è vuoto (fail-open). Fix: bind localhost, `X-API-Key` come `api_server`, secret obbligatorio quando il nodo va LIVE. — *Unica esposizione di rete con PII.*

### 5. Sicurezza IP — Spostare `VULCAN_MANIFESTO.md` (+ mims IP) fuori dal repo pubblico (02 F3 + 06 P2) — QUICK-WIN
`MATTEO/PROGETTI/VULCAN/VULCAN_MANIFESTO.md` (e valutare `BRAIN/KNOWLEDGE/mims/protocol.md`, `fit-park-specs.md`) dichiara nel **repo pubblico** dove sarà il moat (formula polimerica), i target Shore e la strategia brevetto = competitive-intelligence servita. Non ci sono formule reali (ricette a 0%) ma va in `MICROINDUSTRY/MENTE/MIMS/`. Nota: resta in git history → decidere con Matteo se ripulire (`git filter-repo`). — *Coerente con policy `project_repo_public`/`project_mims_ip`.*

### 6. RAG — Guardia anti commit-leak in `api_server` (04 #1) — INGEGNERIZZAZIONE leggera
`api_server.py:383,1085,1164` importano `rag_engine` per-request dentro il `try`: se il primo load fallisce (il MemoryError già vissuto), **ogni richiesta ritenta e riserva GB di commit** → satura Windows. Fix additivo: lock + failure-latch con cooldown 300s. — *Ripara alla radice il `feedback_rag_commit_leak`.*

### 7. Software — Igiene `.env`/segreti in root (04 #2) — QUICK-WIN
`.env` in root del repo contiene una `sk-ant-api03-…` completa + un `gho_` (gitignored, **non** nel repo pubblico — verificato), ma datato 02/06 (pre-rotazione): il `gho_` è quasi certo il vecchio già revocato, **la `sk-ant` va verificata/ruotata** e il file spostato in `_VAULT/KEYS/`. Bonus: file vuoto `perfetta` è **tracciato** nel repo pubblico → `git rm`. — *Allineato al blocker "chiavi .env da ruotare" (STATE).*

### 8. News-IA — Riparare il watcher: Anthropic feed + filtro stelle + schedulazione (05 P1-P3) — QUICK-WIN
`watcher.py:88` punta a `anthropic.com/news` (HTML, non feed) → **fonte n.1 morta silenziosamente da 25 gg** (`_parse_feed` fallisce e ritorna `[]` senza log). Fix: feed RSS comunitario keyless (Alan Turing Institute) + WARNING su feed vuoto; `stars:>=20` sui topic GitHub (oggi entra spam SEO ★0-2); da terminale reale verificare le **5 notti saltate** (28/06→01/07) con `schtasks`. Bonus pronto: watchlist +12 sorgenti keyless (OpenAI, HuggingFace, HN filtrato…). — *Recupera il canale che porta le release Claude/Fable.*

### 9. Scrittura — Indice/canone storie + EP_N2_03 "la Misura" (03 #1+#2) — QUICK-WIN + contenuto
`INDICE_CAMMINO.md:29` (che si autodichiara "una sola verità") ha **9/15 titoli sbagliati**, si ferma a 15 caselle su 51 episodi e la sezione proposte punta all'episodio sbagliato → **generarlo da `episodes.json`** come già fa `generate_pietre_index.py` per PIETRE. Poi 2 micro-edit per riagganciare la catena open-loop **EP_N2_02→03** (oggi rotta, `:202`/`:211`). **EP_N2_03 "la Misura":** niente episodio nuovo — l'attuale "Mille Volte Uguale" è già misura-centrico; serve il **carosello 16 slide** che consegna la lente promessa da EP_N2_02 (quaderno→deriva→Entropia→riferimento fermo→i 20 chiodi di FORGE→open loop). — *Primo punto contenuti dopo l'attacco (era già il #1 della bussola).*

### 10. Design — Quick-win CSS + template canonico caroselli PRIMA di EP_N2_03 (01 P1-P3, P11) — QUICK-WIN + INGEGNERIZZAZIONE
Quattro fix additivi a rischio ~0 in `index.css`: ① keyframe `nl-fadeUp` orfano (4 view non animano finché non si apre una view legacy); ② `@media (prefers-reduced-motion)` assente su ~15 animazioni infinite (dashboard 24/7); ③ contrasto `--color-slate-600/700` ridefiniti PIÙ scuri del default → testo sidebar a ~1.6-2.4:1 (sotto WCAG); ④ `focus-visible` esteso a link/select. **E prima di generare EP_N2_03:** cartella `CAROSELLI/_TEMPLATE/` (tokens.css + base 16 slide) — il drift copia-incolla è già misurabile (`.lead` 60→62→66px); farlo dopo consolida l'entropia. — *01:283-304.*

---

## Seconda fascia (in bussola come `[ ]`, dopo la prima ondata)
- **NEXUS codice morto ma "active"** (04 #3): `nexus.py` irraggiungibile (`mcpServers` vuoto) mentre `genesisData.ts:134,274` lo dice "active/done" → archiviare + allineare i data file.
- **Detriti su disco** (04): 2.24 GB `chroma_db_*` + 1.1 GB `BACKUPS` → pulizia (fuori repo, gitignored).
- **`ecosystemTree.ts:14` hardcoda `_u='benen'`** (04): path sbagliati in dashboard → derivare come gli altri script.
- **4 agenti notturni senza retry LLM** (04): fix da 1 riga (`max_retries=4` nel client).
- **De-quadruplicare N-livelli** → `nlevel/NLevelExplorer.tsx` (01 P8): prerequisito per "scalare il pattern su tutto il sito" senza moltiplicare il debito.
- **FINANCE/ vuota + BEP Via B parametrico vivo** (06 #4, Mossa 2): file scheletro `FINANCE/ANALISI/BEP_ROI/bep_via_b.md` con celle [T_B, C_B, P, ciclo, cavità] che si riempiono alla prima colata.
- **Fix coerenza pitch pubblico** (06 P1-P6): molle→corpo unico, "recupero"→specifica tecnica, doppia tabella revenue divergente, ROI 322% senza formula dichiarata.
- **Pre-commit hook con `sanitizer.py`/`gitleaks`** (02 F4) + `pip-audit` notturno.
- **Gate di rilevanza LLM locale sul watcher** (05 #1, ROI ★★★★★): trasforma il digest da 40 link a "3 cose da integrare"; ripara anche la rotazione tier.
- **Doppioni episodi** (03 #3): EP_N2_51≈08 (collide "Casella 7" con 07), EP_N2_17≈10; "guardiano" su 2 Pietre diverse diluisce il dual coding.

---

## Note di metodo
- Tutto **propose-only**: nessun file di progetto è stato toccato, nessun commit/push, `_VAULT/` intatto.
- Le azioni RAG (2, 3, 6) toccano l'indice: **un solo rebuild seriale a GPU libera** (API spenta), mai a martello — vincoli noti `chromadb 0.5.23` + `torch 2.6.0+cu124` (`project_rag_fix`, `feedback_rag_commit_leak`).
- Prima di ogni modifica UI: screenshot con `dash_shot.bat` (regola additivo/reversibile).
