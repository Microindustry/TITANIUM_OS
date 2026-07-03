<!-- TOC -->

- [PIANO DATTACCO  esercito di specialisti (da eseguire su FABLE 5)](#piano-dattacco-esercito-di-specialisti-da-eseguire-su-fable-5)
  - [Come si lancia (allavvio della sessione Fable)](#come-si-lancia-allavvio-della-sessione-fable)
  - [FASE 0  pre-attacco (già fatta il 02/07, ri-verifica)](#fase-0-pre-attacco-già-fatta-il-0207-ri-verifica)
  - [LESERCITO  7 attacchi specifici (missioni già ingegnerizzate)](#lesercito-7-attacchi-specifici-missioni-già-ingegnerizzate)
    - [01  DESIGN   01_design.md](#01-design-01designmd)
    - [02  SICUREZZA (difensiva, repo proprio)   02_sicurezza.md](#02-sicurezza-difensiva-repo-proprio-02sicurezzamd)
    - [03  SCRITTURA / NARRATIVA   03_scrittura.md](#03-scrittura-narrativa-03scritturamd)
    - [04  SOFTWARE / ARCHITETTURA   04_software.md](#04-software-architettura-04softwaremd)
    - [05  NEWS IA   05_news_ia.md](#05-news-ia-05newsiamd)
    - [06  GESTIONALE / BUSINESS   06_gestionale.md](#06-gestionale-business-06gestionalemd)
    - [07  INTEGRITÀ RAG / CONOSCENZA (attacco aggiunto)   07_integrita_rag.md](#07-integrità-rag-conoscenza-attacco-aggiunto-07integritaragmd)
  - [Dopo lattacco](#dopo-lattacco)

<!-- /TOC -->

# PIANO D'ATTACCO — esercito di specialisti (da eseguire su FABLE 5)

> **Deciso da Matteo (02/07/2026):** questo attacco NON si esegue su Opus.
> Si lancia nella **prossima sessione, aperta con Fable 5** (default già impostato in
> `.claude/settings.local.json`). Opus = solo coordinamento/decisioni; l'esercito gira su Fable.

## Come si lancia (all'avvio della sessione Fable)
1. Ri-verifica che la FASE 0 (sotto) sia a posto (RAG rebuild concluso, dashboard su).
2. Lancia i 7 agenti in **parallelo**, ognuno con `subagent_type: general-purpose` e
   `model: "fable"`. Ogni agente scrive UN report in `DOCS/ATTACCO_20260702/NN_<dominio>.md`
   e ritorna un riassunto di 5-8 righe.
3. **Regole per OGNI agente (non negoziabili):**
   - Repo **PUBBLICO** (`Microindustry/TITANIUM_OS`) → mai esporre segreti/brevetti/ricette
     (stanno in `_VAULT/` e in `MENTE/`, fuori repo). Se ne trovi in chiaro nel repo → è un finding.
   - **Solo additivo, propose-only**: NON cancellare-e-rifare, NON committare, NON pushare,
     NON toccare `_VAULT`/chiavi. Scrivi proposte + patch suggerite, non applicare modifiche distruttive.
   - Cita sempre `file:riga`. Distingui **quick-win** (≤30 min) da **ingegnerizzazione** (più grossa).
   - Priorità in cima. Massimo impatto / minimo rischio prima.
4. Dopo il rientro dei 7: io (coordinatore) **sintetizzo** in `DOCS/ATTACCO_20260702/_SINTESI.md`
   (top 10 azioni ordinate), e le porto in **bussola** come `[ ] DA FARE`.

## FASE 0 — pre-attacco (già fatta il 02/07, ri-verifica)
- [✓] Dashboard riavviata (5173).  - [✓] Ecosistema+Obsidian (595 note · 3230 ponti · 2 isolate).
- [✓] Indice Pietre (9/82) · 0 orfani episodi · `_CANONE.md` presente · 0 violazioni framing.
- [◐] RAG full rebuild (rag_update_exclusive.ps1) — **verifica** `--stats` (semantico==bm25) prima di partire.

---

## L'ESERCITO — 7 attacchi specifici (missioni già ingegnerizzate)

### 01 · DESIGN  → `01_design.md`
Bersaglio: `DASHBOARD/src/**` (views, componenti, temi) + caroselli Nina in
`CONTENT_ENGINE/DATABASE/MONDO/POSTER/CAROSELLI/**`.
Attacca: coerenza visiva tra le view, gerarchia/leggibilità, accessibilità (contrasto/motion),
coerenza dello stile "blueprint-anime" dei caroselli, pattern N-livelli. Proponi micro-refactor UI
additivi + una palette/tipografia di sistema se manca. Quick-win vs redesign.

### 02 · SICUREZZA (difensiva, repo proprio)  → `02_sicurezza.md`
Bersaglio: tutto il repo pubblico + `api_server.py` + `DASHBOARD`.
Attacca: segreti/token/chiavi committati per errore, `.env` esposti, brevetti/ricette MIMS/VULCAN
finiti nel repo invece che in `_VAULT`/`MENTE`, superficie d'attacco di `api_server.py` (CORS,
endpoint aperti, path traversal, input non validato), dipendenze vulnerabili. Solo **difensivo**.
Output: lista leak con `file:riga` + fix additivi (gitignore, spostamento in vault, hardening endpoint).

### 03 · SCRITTURA / NARRATIVA  → `03_scrittura.md`
Bersaglio: mondo Nina — `CONTENT_ENGINE/DATABASE/**` (episodi EP_N2_*, PRE_01/02/03, BIBBIA, PIETRE).
Attacca: coerenza di canone (una verità), qualità dell'arco, i 3 strati (bambino/grande/cuore),
ritmo dei caroselli 16-slide blueprint, distinzione preambolo(anagrafica) vs episodi(storia).
Segnala buchi, ripetizioni, incastri deboli. Proponi i prossimi episodi (EP_N2_03 "la Misura" incluso).

### 04 · SOFTWARE / ARCHITETTURA  → `04_software.md`
Bersaglio: `NODES/**`, `AUTOMATIONS/**`, `api_server.py`, `DASHBOARD` TS.
Attacca: codice morto (es. `NODES/NEXUS/nexus.py`), path hardcoded residui, robustezza
(gestione errori/retry), il `rag_engine` (GPU/commit-leak/HNSW), portabilità, test mancanti,
duplicazione. Proponi refactor additivi isolati + eventuale suite di smoke-test.

### 05 · NEWS IA  → `05_news_ia.md`
Bersaglio: `NODES/AI_NEWS_WATCHER/**` + `BRAIN/AI_NEWS_WATCHER_BRIEF.md`.
Attacca: copertura sorgenti, logica tier/rotazione, segnali persi. **Ingegnerizza**: quali
tecniche/modelli IA nuovi (2026) integrare in TITANIUM_OS (RAG, agenti, local LLM, Fable/Opus),
con priorità e sforzo. Output: watchlist + 5 integrazioni candidate ordinate per ROI.

### 06 · GESTIONALE / BUSINESS  → `06_gestionale.md`
Bersaglio: MIMS/VULCAN (economia, BEP Via B, connettori), pitch investitori, roadmap capannone 2030,
monetizzazione Nina/sistema.
Attacca: numeri BEP/ROI da ricalcolare sul tooling Via B, rischi, leve di ricavo, go-to-market.
Output: piano economico aggiornato + 3 mosse a maggior leva (regola 4: 1 input→N output).

### 07 · INTEGRITÀ RAG / CONOSCENZA (attacco aggiunto)  → `07_integrita_rag.md`
Bersaglio: la catena **storie → RAG → Nina** e la **verità unica + incastrabilità**.
Attacca: orfani (episodi/vault), divergenza semantico≠bm25, violazioni canone, `_CANONE.md` come
unica fonte, tracciabilità (ogni affermazione risale a una nota), sinergie mancanti tra i mondi.
Output: mappa dei buchi di incastrabilità + fix per garantire "sempre la verità" e reversibilità.

---

## Dopo l'attacco
- Sintesi coordinata → `DOCS/ATTACCO_20260702/_SINTESI.md` (top 10 ordinate).
- Le migliori → bussola `[ ] DA FARE` (additivo), poi si eseguono a ondate.
- Nessuna modifica distruttiva senza ok di Matteo (gate SELF_IMPROVE: propose-only).
