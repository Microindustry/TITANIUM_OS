<!-- TOC -->

- [02  AUDIT SICUREZZA DIFENSIVO (repo pubblico)](#02-audit-sicurezza-difensivo-repo-pubblico)
  - [SINTESI (priorità: impatto alto / rischio basso in cima)](#sintesi-priorità-impatto-alto-rischio-basso-in-cima)
  - [COSA È GIÀ A POSTO (confermato)](#cosa-è-già-a-posto-confermato)
  - [FINDINGS DETTAGLIATI](#findings-dettagliati)
    - [F1   EVA webhook bind 0.0.0.0  /inbox senza autenticazione](#f1-eva-webhook-bind-0000-inbox-senza-autenticazione)
    - [F2   Firma Meta bypassabile se EVA_APP_SECRET assente](#f2-firma-meta-bypassabile-se-evaappsecret-assente)
    - [F3   Divulgazione IP strategica (VULCAN) su repo pubblico](#f3-divulgazione-ip-strategica-vulcan-su-repo-pubblico)
    - [F4   Sanitizer non agganciato come pre-commit hook](#f4-sanitizer-non-agganciato-come-pre-commit-hook)
    - [F5   .env.example (informativo, nessuna azione)](#f5-envexample-informativo-nessuna-azione)
  - [DIPENDENZE](#dipendenze)
  - [AZIONI CONSIGLIATE (ordine)](#azioni-consigliate-ordine)

<!-- /TOC -->

# 02 — AUDIT SICUREZZA DIFENSIVO (repo pubblico)
**Specialista:** Sicurezza Difensiva · **Data:** 2026-07-02 · **Scope:** repo `Microindustry/TITANIUM_OS` (pubblico) + `api_server.py` + `NODES/EVA` + DASHBOARD
**Regola report:** repo pubblico → nessun valore di segreto o ricetta è riportato qui; solo `file:riga` e tipo.

---

## SINTESI (priorità: impatto alto / rischio basso in cima)

| # | Severità | Finding | Tipo fix | File |
|---|----------|---------|----------|------|
| F1 | 🟠 MEDIA | `eva_server.py` bind `0.0.0.0` + `/inbox` senza auth → PII clienti Vita Natura raggiungibile da LAN/Tailscale | QUICK-WIN | `NODES/EVA/eva_server.py:162` |
| F2 | 🟠 MEDIA | `/webhook` POST accetta tutto se `EVA_APP_SECRET` non impostato (`valid_signature` ritorna `True`) | QUICK-WIN | `NODES/EVA/eva_server.py:88-90` |
| F3 | 🟡 BASSA | Divulgazione IP strategica su repo pubblico: manifesto VULCAN (moat = formula polimerica + target Shore + strategia brevetto) | QUICK-WIN (spostamento) | `MATTEO/PROGETTI/VULCAN/VULCAN_MANIFESTO.md` |
| F4 | 🟡 BASSA | Sanitizer esiste ma NON è agganciato a un pre-commit hook → nessuna barriera automatica anti-segreto | INGEGNERIZZAZIONE | `.git/hooks/` (assente) · `AUTOMATIONS/core/sanitizer.py` |
| F5 | 🟢 INFO | `.env.example` con password placeholder `CAMBIAMI_...` (nessun segreto reale) | Nessuna | `ARCHIVE/n8n_dismesso/n8n/.env.example:11,15` |

**Nessun segreto reale trovato nei file tracciati né nella history recente** (dettaglio sotto). `api_server.py` risulta **già ben hardenato** (red-team #38): CORS ristretto, auth fail-closed da remoto, path-traversal chiuso, denylist `.env`/`_VAULT`/`BACKUPS`.

---

## COSA È GIÀ A POSTO (confermato)

- **Segreti committati:** ZERO. Scan pattern (sk-ant-, ghp_/gho_/github_pat_, AKIA, AIza, xox*, JWT) su tutti i file tracciati → nessun match reale.
- **History recente:** i match della pickaxe (`gho_`/`ghp_`/`sk-ant-`) sono **falsi positivi** — sono le *regex del detector* in `AUTOMATIONS/core/sanitizer.py:64,84` e un episodio che *parla* di token ruotato (`CONTENT_ENGINE/DATABASE/episodes/SA_AUTO/EP_AUTO_46_*.md`), nessun valore reale.
- **`.gitignore`** robusto e ben commentato: `_VAULT/`, `.env`, `ti_autorun.cmd` (GH_TOKEN), `NODES/EVA/config.json` (dati centro), `DATA/eva/` (PII handoff), ChromaDB, `MODELS/`, `*.safetensors`, `graphify-out/`. `git ls-files` conferma: nulla sotto `_VAULT/` è tracciato.
- **`api_server.py` — superficie d'attacco controllata:**
  - CORS: whitelist regex (localhost/LAN/Tailscale), **non `"*"`** — `api_server.py:50-54`.
  - Auth: `before_request` fail-closed — remoto senza `X-API-Key` valida → 401; con `TI_API_KEY` vuota il ramo remoto è chiuso — `api_server.py:64-72`.
  - Bind: `app.run(port=5001)` → **solo 127.0.0.1** (default Flask), non 0.0.0.0 — `api_server.py:1597`.
  - Path traversal: `path_allowed()` usa `.resolve()` + check `parents` (no prefix-match string) + denylist `.env`/`_VAULT`/`BACKUPS` — `api_server.py:104-109`; applicato in `/api/file`, `/api/open`, `/api/media`, `/api/md-save`.
  - `subprocess` sempre `shell=False` e liste argv (no shell injection); `PROGRAMS` è un dict fisso (no comando arbitrario) — `api_server.py:986-1035`.

---

## FINDINGS DETTAGLIATI

### F1 — 🟠 EVA webhook bind 0.0.0.0 + `/inbox` senza autenticazione
**File:** `NODES/EVA/eva_server.py:162` (`app.run(host="0.0.0.0", port=port)`), endpoint `/inbox` a `NODES/EVA/eva_server.py:139-145`.
**Problema:** a differenza di `api_server.py` (127.0.0.1 + auth), `eva_server.py` si lega a **tutte le interfacce** e l'endpoint `/inbox` restituisce gli handoff — che contengono **PII dei clienti** (numero mittente WhatsApp, intent, messaggi) — **senza alcun controllo**. Chiunque sulla LAN o sulla tailnet può fare `GET /inbox` e leggere i contatti del centro estetico. `/health` espone anche lo stato di configurazione.
**Nota:** oggi il nodo è in DRY-RUN/pilot e (probabilmente) non avviato 24/7; il rischio si concretizza appena viene messo in ascolto. La cartella dati è gitignored (`DATA/eva/`), quindi il leak è di rete, non di repo.
**Fix (QUICK-WIN):**
1. Bind a `127.0.0.1` di default; esporre pubblicamente solo dietro reverse-proxy/tunnel con TLS quando Meta dovrà raggiungerlo (il webhook Meta richiede URL pubblico → usare Cloudflare Tunnel/ngrok con auth, non 0.0.0.0 diretto).
2. Proteggere `/inbox` con la stessa logica `X-API-Key` di `api_server.py` (o binding localhost-only + lettura via `api_server`).

### F2 — 🟠 Firma Meta bypassabile se `EVA_APP_SECRET` assente
**File:** `NODES/EVA/eva_server.py:88-90` — `valid_signature()` ritorna `True` quando `APP_SECRET` è vuoto.
**Problema:** combinato con F1 (0.0.0.0), un attore di rete può fare POST `/webhook` con payload arbitrario e far processare messaggi finti da `eva_brain` (e, in modalità LIVE, innescare risposte WhatsApp reali). In pilot è accettabile, ma è un fail-open.
**Fix (QUICK-WIN):** quando il nodo passa a LIVE, rendere `APP_SECRET` obbligatorio (fail-closed: se manca e non è dry-run → 503/403). Documentare che senza secret il webhook resta solo-localhost.

### F3 — 🟡 Divulgazione IP strategica (VULCAN) su repo pubblico
**File:** `MATTEO/PROGETTI/VULCAN/VULCAN_MANIFESTO.md` (sezioni "Le Ricette", "Il Brevetto", "Dipendenze e Sequenza").
**Problema:** il repo è **pubblico**. Il manifesto **non contiene formule reali** (le ricette sono a 0%, non sviluppate) — quindi *non c'è leak di trade-secret vero e proprio* — ma dichiara apertamente **dove sarà il moat** (la formula polimerica, non pressa né geometria), i **target di durezza per applicazione** e la **strategia di deposito brevetto**. È competitive-intelligence servita a un concorrente. In linea con la policy "MIMS IP → mai IP sensibile nel repo pubblico" (memoria progetto), la sede corretta è `MICROINDUSTRY/MENTE/` (fuori dal repo) o `_VAULT/`.
**Fix (QUICK-WIN, propose-only):** spostare il manifesto (e valutare `BRAIN/KNOWLEDGE/mims/protocol.md`, `fit-park-specs.md`) fuori dal repo pubblico → `MICROINDUSTRY/MENTE/MIMS/`; nel repo lasciare al più il 1-pager marketing già pubblico (`DOCS/PITCH_MIMS.md`, `DASHBOARD/src/data/mimsData.ts` — materiale volutamente vetrina). **Attenzione:** anche dopo lo spostamento il contenuto resta nella *git history* pubblica; se ritenuto sensibile, serve riscrittura history (`git filter-repo`) + force-push — valutare col proprietario.

### F4 — 🟡 Sanitizer non agganciato come pre-commit hook
**File:** `.git/hooks/` (nessun hook attivo oltre i `.sample`); detector presente in `AUTOMATIONS/core/sanitizer.py` (14 pattern regex).
**Problema:** esiste un buon detector di segreti ma gira solo on-demand; nulla impedisce a un futuro commit di introdurre una chiave. Per un repo pubblico è la difesa più preziosa.
**Fix (INGEGNERIZZAZIONE):** aggiungere un pre-commit hook (o `pre-commit` framework / `gitleaks`) che esegua `sanitizer.py` sui file staged e blocchi il commit su match. Additivo, non tocca il codice esistente.

### F5 — 🟢 `.env.example` (informativo, nessuna azione)
**File:** `ARCHIVE/n8n_dismesso/n8n/.env.example:11,15` — password segnaposto `CAMBIAMI_password_sicura_32char`. Corretto: è un template, nessun segreto reale. Nessun `.env` reale è tracciato (`.gitignore:6`).

---

## DIPENDENZE
- Nessuna versione palesemente vulnerabile hardcodata. Pin RAG verificati (`requirements-rag.txt`: `torch==2.6.0+cu124`, `chromadb==0.5.23` — scelte deliberate e documentate).
- `flask>=3.0.0`, `flask-cors>=4.0.0`, `requests>=2.31.0`, `anthropic>=0.40.0` sono `>=` (prendono l'ultima) → OK; la config CORS è comunque manuale e ristretta, non dipende dai default della libreria.
- **Raccomandazione (INGEGNERIZZAZIONE):** aggiungere `pip-audit` allo sweep notturno per allerta CVE sulle dipendenze installate.

---

## AZIONI CONSIGLIATE (ordine)
1. **F1+F2 (QUICK-WIN):** `eva_server.py` → bind `127.0.0.1`, auth su `/inbox`, `APP_SECRET` obbligatorio in LIVE. *(chiude l'unica esposizione di rete con PII)*
2. **F3 (QUICK-WIN):** spostare `VULCAN_MANIFESTO.md` (+ eventuale `mims/protocol.md`, `fit-park-specs.md`) in `MICROINDUSTRY/MENTE/MIMS/`; decidere col proprietario se ripulire la history.
3. **F4 (INGEGNERIZZAZIONE):** pre-commit hook con `sanitizer.py`/`gitleaks`.
4. **Dep (INGEGNERIZZAZIONE):** `pip-audit` nel notturno.

*Tutte le proposte sono additive/propose-only: nessun file del progetto è stato modificato, nessun commit/push, `_VAULT/` non toccato.*
