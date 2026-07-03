# 04 · SOFTWARE / ARCHITETTURA — Attacco 20260702
*Specialista: software/architettura · Modalità: PROPOSE-ONLY, additivo · Data: 2026-07-03*
*Bersaglio: NODES/**, AUTOMATIONS/**, api_server.py, DASHBOARD (TS). Grafo: graphify-out/ (5966 nodi · 6317 archi, costruito su commit 8f0ea224 → **stale**, HEAD è e1179c2f: proporre `graphify update .`)*

---

## PRIORITÀ (massimo impatto / minimo rischio, in ordine)

### P1 — `.env` in root repo con chiavi in chiaro (igiene locale, NON leak pubblico)
- **Dove:** `C:\Users\teo\TITANIUM_OS\.env:1` (ANTHROPIC_API_KEY `sk-ant-api03-…` completa) e `.env:6` (GITHUB_TOKEN `gho_…`).
- **Stato verificato:** il file è **gitignored** (`.gitignore:6`) e **non tracciato** (`git ls-files .env` vuoto) → non è nel repo pubblico. `api_server.py:99-101` lo denylista dalla API (`_DENY_NAMES = {".env"}`). Nessuna copia in `BACKUPS/` (verificato con find).
- **Ma:** viola la regola CLAUDE.md "API keys → `_VAULT/KEYS/`"; il file è datato 02/06 (PRIMA della rotazione token del 03/06) → il `gho_` è quasi certamente il **vecchio token revocato** (rumore), mentre la `sk-ant-` potrebbe essere ancora viva. EP_AUTO_46 (`CONTENT_ENGINE/DATABASE/episodes/SA_AUTO/EP_AUTO_46_*.md:106`) dice che una `sk-ant-api03-` di marzo era "segnalata per rotazione pianificata" — verificare che sia stata ruotata.
- **Proposta (10 min, additiva):** verificare quale chiave è attiva in `_VAULT/KEYS/titanium_os.env`; se `.env` root è un duplicato stantio → svuotarlo lasciando un commento `# spostato in _VAULT/KEYS/titanium_os.env` (decisione Matteo, io non tocco chiavi). Se la `sk-ant-` root è quella viva e mai ruotata dal marzo → ruotarla.

### P2 — Commit-leak RAG: nessun "failure latch" su `/api/rag/search`
- **Dove:** `api_server.py:383` e `api_server.py:1164` (`from NODES.MENTE_RAG.rag_engine import search` dentro il try, per-request) e `api_server.py:1085` (`/api/agents/ask`).
- **Problema:** se il primo load dei modelli fallisce (il caso documentato: torch+cu124 dopo riavvio sporco → MemoryError da commit esaurito), **ogni richiesta successiva ritenta l'import da zero**, e ogni tentativo fallito riserva GB di commit Windows finché il sistema satura (è esattamente il "RAG commit leak" già vissuto: la dashboard che martella `/api/rag/search` a freddo). Oggi non c'è né warm-up seriale né memoria del fallimento.
- **Proposta (ingegnerizzazione piccola, ~1h, additiva):** in `api_server.py` un modulo-level guard:
  ```python
  _rag_lock = threading.Lock()
  _rag_state = {"fn": None, "failed_at": 0.0}   # cooldown 300s dopo un load fallito
  def _get_rag_search():
      with _rag_lock:
          if _rag_state["fn"]: return _rag_state["fn"]
          if time.time() - _rag_state["failed_at"] < 300:
              raise RuntimeError("RAG in cooldown dopo load fallito (riprova tra qualche minuto)")
          try:
              from NODES.MENTE_RAG.rag_engine import search as fn
              _rag_state["fn"] = fn; return fn
          except Exception:
              _rag_state["failed_at"] = time.time(); raise
  ```
  e sostituire i 3 import inline con `_get_rag_search()`. Lock = un solo load alla volta (scalda 1 volta seriale); cooldown = niente martellamento a freddo. Zero cambi a `rag_engine.py` (che è già ben corazzato: kill-switch CUDA `rag_engine.py:15-24,78-95`, recovery HNSW L1/L2 `rag_engine.py:739-760`).

### P3 — 2.24 GB di detriti ChromaDB + 1.1 GB BACKUPS su disco
- **Dove:** `NODES/MENTE_RAG/` contiene **7 cartelle morte**: `chroma_db_CORROTTO_20260622_171159` (424M), `chroma_db_corrupt_20260623_000501` (134M), `chroma_db_partial_001449` (100M), `chroma_db_reset_20260623_012419` (655M), `chroma_db_reset_20260623_033814` (254M), `chroma_db_reset_20260623_104611` (311M), `chroma_db_reset_20260624_033804` (365M). Più `BACKUPS/` = 1.1 GB (30 snapshot completi, molti dello stesso giorno).
- **Stato:** tutte gitignorate (nessun impatto sul repo pubblico), ma il RAG funziona da giorni: i "corrotti" del 22-24/06 non servono più.
- **Proposta (quick-win 15 min, decisione Matteo):** script one-shot `AUTOMATIONS/tools/purge_debris.py` che sposta in cestino (`send2trash` o rename in `ARCHIVE/_trash_YYYYMMDD/`) le cartelle `chroma_db_*` più vecchie di 7 giorni e i `BACKUPS/` oltre gli ultimi 5. Reversibile, additivo. Bonus: retention automatica in `AUTOMATIONS/core/backup.py`.

### P4 — NEXUS: codice morto dichiarato "active" in dashboard
- **Dove:** `NODES/NEXUS/nexus.py:1-178` (swarm ThreadPoolExecutor, 3 agenti registry). Unico consumer: `MCP/titanium_mcp_server.py:326-328` (tool `nexus`). **Ma** `.claude/settings.json` non ha `mcpServers` (verificato — coerente con memoria "mcpServers vuoto") → il tool MCP non è raggiungibile → nexus.py è **irraggiungibile in produzione**.
- **Incoerenza:** `DASHBOARD/src/data/genesisData.ts:134` lo dichiara `"active"` ("Live: NODES/NEXUS/nexus.py + tool MCP 'nexus'") e `genesisData.ts:274` `"done"`; `skillTreeData.ts:219` `"done"`. Intanto `avventuraMapData.ts:50,140-141` lo dice correttamente "futuro" e `criticheData.ts:331` lo chiama teatro. La dashboard si contraddice da sola.
- **Proposta (quick-win 20 min):** decisione binaria — (a) archiviare: spostare `NODES/NEXUS/` in `ARCHIVE/` + togliere il tool `nexus` da `titanium_mcp_server.py` + genesisData → `"future"`; oppure (b) riattivare registrando l'MCP server. Dato che il ruolo orchestratore è assegnato al futuro NEXUS-personaggio, (a) è la scelta onesta: oggi è teatro che gonfia la percezione di capacità (parole di criticheData). In ogni caso allineare i 3 data file.

### P5 — Username `benen` hardcoded residuo nella dashboard (dati visualizzati sbagliati)
- **Dove (bug reale):** `DASHBOARD/src/data/ecosystemTree.ts:14` → `const _u = 'benen';` usato per costruire tutti i path mostrati nell'albero ecosistema (es. riga 69 ``path: `${R}/BRAIN/ASSOLUTO/V7` ``). Sul fisso l'utente è `teo` → la vista mostra path inesistenti e i click "apri" falliscono.
- **Dove (fallback difensivi, ok ma da aggiornare):** `DASHBOARD/vite.config.ts:14,153,187` — fallback `'benen'` usato solo se `USERNAME`/`USERPROFILE` mancano; innocuo ma il default giusto oggi sarebbe derivare e basta.
- **Proposta (quick-win 10 min):** in `ecosystemTree.ts` non hardcodare: l'albero è dati statici, quindi o (a) usare path **relativi alla root** e risolverli lato API (`/api/open` conosce ROOT), o (b) minimal: `const _u = 'teo';` con commento TODO. (a) è la fix portabile vera.

### P6 — File spazzatura TRACCIATO nel repo pubblico
- **Dove:** `perfetta` (file vuoto, 0 byte, root repo, creato 24/06 — probabile redirect accidentale `> perfetta`) è **tracciato in git** (`git ls-files perfetta` lo conferma) → visibile su github.com/Microindustry/TITANIUM_OS.
- **Proposta (quick-win 2 min):** `git rm perfetta` al prossimo commit di Matteo. Nessun contenuto, zero rischio.

---

## QUICK-WIN (≤30 min ciascuno)

### Q1 — Path MENTE hardcoded `C:/Users/teo/...` (rompe la regola "mai path assoluti")
- `CONTENT_ENGINE/scripts/setup_obsidian.py:19` → `MENTE = Path("C:/Users/teo/MICROINDUSTRY/MENTE")`
- `CONTENT_ENGINE/scripts/riordina_mente.py:13` → idem
- `CONTENT_ENGINE/scripts/genera_wiki_index.py:14` → idem
- `DASHBOARD/src/components/InventarioView.tsx:11` → `const VAULT = "C:\\Users\\teo\\MICROINDUSTRY\\MENTE";`
- **Patch (Python, 3 righe):** `MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))` — pattern già canonico in CLAUDE.md e usato in `api_server.py:83`. Per InventarioView: il path serve solo come label/prefisso → farselo dare dall'API (`/api/health` o endpoint config) o costruirlo lato server nel proxy vite (che già risolve `MENTE_DIR`, `vite.config.ts:153`).

### Q2 — Retry LLM assente in 4 agenti notturni (nina ce l'ha, gli altri no)
- `NODES/NINA_AGENT/nina_agent.py:35-47` ha `_retry()` (4 tentativi, backoff esponenziale) — fatto bene.
- **Mancano retry** (una chiamata secca `client.messages.create`, se becca 429/529/overload di notte l'agente muore e si vede solo al mattino):
  - `NODES/STORY_AGENT/story_agent.py:318`
  - `NODES/AUDIT_AGENT/night_audit.py:338`
  - `NODES/SELF_IMPROVE/self_improve.py:104`
  - `NODES/AGENTS/validator_agent.py:189`
- **Patch minima (5 min):** `anthropic.Anthropic(api_key=key, max_retries=4)` — l'SDK ha già il backoff integrato su 429/5xx, basta il parametro nel costruttore (righe: story_agent.py:268, night_audit.py:337, self_improve.py:103, validator_agent.py:161). Alternativa più ricca: estrarre `_retry` di nina in un modulo condiviso (vedi I2).

### Q3 — Grafo graphify stale
- `graphify-out/GRAPH_REPORT.md` è costruito sul commit `8f0ea224` (07/06); HEAD è `e1179c2f` (03/07) — un mese di drift, e il report ha 696 community senza label semantiche. **Proposta:** `graphify update .` (costo 0 dichiarato dal report stesso) come step del rituale notturno o dello `/salva`.

### Q4 — Server Flask di sviluppo in produzione 24/7
- `api_server.py:1597` → `app.run(port=5001, debug=False)`: è il dev server Werkzeug, single-process, non pensato per girare sempre acceso (e il processo è elevato: kill solo da admin, quindi quando si incastra è doloroso).
- **Proposta (20 min, additiva):** `waitress` (già Windows-friendly, zero config): `from waitress import serve; serve(app, host="127.0.0.1", port=5001, threads=8)` dietro un flag/env `TI_PROD=1` per non cambiare il default finché non testato. NB: con più thread il guard P2 (lock RAG) diventa necessario, non opzionale — le due proposte vanno insieme.

### Q5 — Riferimenti `benen` cosmetici (bassa priorità, batch unico)
- `migrate_to_new_pc.ps1:4,11-13,19-20,40,46,133-141` — script di migrazione ormai storico (la migrazione è fatta, e su questa macchina l'utente è `teo` non `benen` come dice il commento). Proposta: spostarlo in `ARCHIVE/` o aggiornare l'header con una riga "storico — usato per la migrazione Getac→fisso 06/2026".
- `AUTOMATIONS/core/mente_version.bat:18` — email hardcoded nel commit auto di MENTE: ok funzionalmente, ma derivabile da `git config user.email`.
- `NODES/RESEARCH_AGENT/research_agent.py:199,454` — email hardcoded come `mailto` Unpaywall/CrossRef: accettabile (è un contatto API), ma meglio `os.environ.get("TI_CONTACT_EMAIL", ...)`.

### Q6 — Scanner: doppio path con fallback fantasma
- `api_server.py:77-81`: `SCANNER = ROOT/"CORE"/"scanner.py"` con fallback a `NODES/MENTE_SCANNER/scanner.py` "se CORE/ non ancora migrato". CLAUDE.md documenta ancora solo il path NODES. Se la migrazione CORE/ è avvenuta → aggiornare CLAUDE.md e togliere il fallback; se no → invertire default e fallback. Micro-incoerenza che confonde chi legge.

---

## INGEGNERIZZAZIONE (interventi più grossi, da pianificare)

### I1 — Test: esiste UN solo file di test in tutto il repo
- Unico test: `NODES/EVA/test_eva.py` (+ copie nei BACKUPS). Zero test per: `rag_engine.py` (891 righe, il nodo più critico), `api_server.py` (1597 righe, 40+ endpoint), `canon_guard.py`, `sanitizer.py`, `night_audit.py`, `build_episodes_json.py` (ha `audit_episodes.py` come check di integrità, che è già qualcosa).
- **Proposta (mezza giornata, incrementale):** cartella `tests/` + pytest con 3 livelli:
  1. **Smoke senza modelli** (CI-able): `path_allowed()` di `api_server.py:103-108` (è security-critical: 6 casi — traversal, `.env`, `_VAULT`, BACKUPS, root esterna, path valido); regex di `sanitizer.py:64,84`; parsing manifest di `rag_engine.py`.
  2. **Contract test API**: Flask test client su `/api/health`, `/api/state`, auth 401 remota (`api_server.py:63-71` — mockare `remote_addr`).
  3. **RAG integration** (opt-in, marker `@pytest.mark.gpu`): 1 query nota → risultato atteso, per accorgersi di regressioni dopo rebuild.
- Aggancio: gli endpoint smoke in un task notturno (`AUTOMATIONS/core/`) che scrive in `DATA/audit/system_health.json`, già letto dal triage mattutino.

### I2 — Modulo condiviso `NODES/common/` (retry, client anthropic, env loading)
- Duplicazione oggi: ogni agente rifà da solo (a) load `ANTHROPIC_API_KEY` (story_agent.py:264, night_audit.py:327, self_improve.py:97, nina_agent.py:410, validator_agent.py:157), (b) import anthropic con try/except (5 copie), (c) retry (solo nina), (d) `sys.path.insert(0, ROOT)` sparso.
- **Proposta:** `NODES/common/llm.py` con `get_client(max_retries=4)` + `retry()` estratto da nina_agent.py:35-47 + caricamento `_VAULT/KEYS/titanium_os.env` se la env manca. ~-100 righe duplicate, un solo punto di manutenzione quando cambia modello/SDK. Additivo: gli agenti migrano uno alla volta.

### I3 — Dashboard: NodeTile/NodeLevel quadruplicati
- Confermato: `const NodeTile` definito 4 volte — `DASHBOARD/src/components/MatteoSection.tsx`, `MimsSection.tsx`, `GenesisSection.tsx`, `CriticheSection.tsx` (già segnalato in `criticheData.ts:137`: "identici, cambia solo il colore accent → estrarre in `<NodeTile accent=...>` → -180 righe"). Ora le copie sono 4, non 3: il pattern N-livelli è LA base architettonica dichiarata (memoria: da scalare su tutto il sito) — più si aspetta, più copie nascono.
- **Proposta:** `DASHBOARD/src/components/shared/NodeTile.tsx` + `NodeLevel.tsx` con prop `accent`; migrazione un componente per commit (regola additiva di Matteo: screenshot prima/dopo con `dash_shot.bat`).

### I4 — Componenti monstre della dashboard
- `NeuroOSLayout.tsx` (1001 righe), `AutomationsView.tsx` (969), `NeuroMapView.tsx` (809), `EcosystemLayout.tsx` (757): i layout mescolano dati statici inline + logica + UI. `AutomationsView.tsx:170` contiene *descrizioni prose dei .bat* dentro il TSX → ogni modifica a un'automazione richiede toccare un componente React.
- **Proposta:** spostare i cataloghi statici in `src/data/` (pattern già usato: `episodes.json`, `bussolaTodos.ts`) o, meglio, generarli — `AUTOMATIONS/AUTOMATIONS_MASTER.md` esiste già come fonte: uno script tipo `sync_dashboard.py` può emettere `automationsData.json`. Un input → N output (regola 4).

### I5 — `/api/restart` e processi orfani
- `api_server.py:1584-1588`: `os._exit(0)` dopo 0.5s — hard kill senza flush dei log né chiusura dei thread `_screen_jobs` (`api_server.py:1547-1563`, subprocess fino a 300s che restano orfani). Localhost-only (l'auth di `api_server.py:63` passa libero da 127.0.0.1), quindi non è un buco di sicurezza, ma è fragile.
- **Proposta:** shutdown a 2 fasi — segnare `_screen_jobs` come cancellati, `sys.exit(0)` nel main thread via `werkzeug.server.shutdown` (o, post-waitress, un flag su cui il supervisore fa restart). Insieme a Q4.

### I6 — episodes.json da 2.0 MB dentro il bundle sorgente
- `DASHBOARD/src/data/episodes.json` (2.0 MB, tracciato) viene importato staticamente → finisce nel bundle JS iniziale (o in un chunk enorme). Con 114+ episodi in crescita continua (story_agent notturno) il peso sale a ogni notte.
- **Proposta:** servirlo via API/fetch (`/api/episodes` con il file letto da disco) o `import()` dinamico con lazy loading — la dashboard ha già le lazy-loading rules per le view; qui manca per i dati. Beneficio: primo paint più rapido + il JSON esce dalla storia git del bundle.

### I7 — RAG: manifest/artefatti multipli senza retention
- `NODES/MENTE_RAG/` accumula anche `rag_manifest_CORROTTO_20260622_171159.json`, `rag_corpus.jsonl`, `rag_tfidf.pkl`, `rag_graph.pkl`, `rag_linkgraph.json` — nessuna policy di rotazione. Insieme a P3: una funzione `cleanup_artifacts(days=7)` dentro `rag_engine.py` richiamata a fine `--rebuild` chiuderebbe il problema alla fonte (i detriti nascono proprio dai rebuild/recovery).

---

## NOTE POSITIVE (cose fatte bene, da NON toccare)
- `rag_engine.py` è il file più maturo del repo: kill-switch CUDA pre-import (righe 15-24), device override a 2 canali env+file (78-95), recovery HNSW a 2 livelli L1 chirurgico/L2 reset (739-760), CLI con `--drop-hnsw`/`--rebuild-hard` (838-857) pensata per subprocess (un SIGSEGV non uccide il chiamante — commento riga 845).
- `api_server.py`: auth fail-closed per chiamate remote (63-71), CORS ristretto non-`*` (47-50), denylist `.env`/`_VAULT`/`BACKUPS` sul file serving (99-108), timeout su tutti i `subprocess.run` visti.
- `research_agent.py:46-57`: backoff esponenziale sui 429/503 — il pattern giusto, da copiare negli altri agenti (Q2).
- Portabilità batch: `_ti_paths.bat` ha davvero eliminato gli hardcode `benen` dagli script notturni (verificato: i match "benen" nei .bat sono tutti commenti "no hardcode benen").
- Repo pubblico pulito sui segreti: `.env`/`_VAULT`/BACKUPS/chroma non tracciati; i match `sk-ant`/`gho_` tracciati sono le regex del detector (`sanitizer.py:64,84`) e prose di un episodio — coerente col report 02_sicurezza.

---
*Metodo: grafo graphify (summary/EXTRACTED 100%) + grep mirati + letture puntuali. Nessun file modificato, nessun commit. Tutte le proposte sono additive e reversibili.*
