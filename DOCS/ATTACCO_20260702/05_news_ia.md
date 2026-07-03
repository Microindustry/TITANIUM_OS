<!-- TOC -->

- [05  NEWS IA: audit watcher  integrazioni 2026](#05-news-ia-audit-watcher-integrazioni-2026)
  - [PRIORITÀ (massimo impatto / minimo rischio, in ordine)](#priorità-massimo-impatto-minimo-rischio-in-ordine)
  - [FINDINGS (con file:riga)](#findings-con-fileriga)
    - [F1  CRITICO  Anthropic News: sorgente Tier1 morta silenziosamente](#f1-critico-anthropic-news-sorgente-tier1-morta-silenziosamente)
    - [F2  ALTO  La rotazione promuove per volume, non per rilevanza  il tier system degenera](#f2-alto-la-rotazione-promuove-per-volume-non-per-rilevanza-il-tier-system-degenera)
    - [F3  ALTO  Topic GitHub senza filtro qualità: le criticità sono piene di spam SEO](#f3-alto-topic-github-senza-filtro-qualità-le-criticità-sono-piene-di-spam-seo)
    - [F4  MEDIO  Query topic malformata: lordinamento updated probabilmente non funziona](#f4-medio-query-topic-malformata-lordinamento-updated-probabilmente-non-funziona)
    - [F5  MEDIO  Dedup criticità assente  eviction casuale della finestra viste](#f5-medio-dedup-criticità-assente-eviction-casuale-della-finestra-viste)
    - [F6  MEDIO  Operativo: 5 notti saltate  ultimo run interrotto](#f6-medio-operativo-5-notti-saltate-ultimo-run-interrotto)
    - [F7  BASSO  Copertura brief: 17 sorgenti implementate su 30 dichiarate](#f7-basso-copertura-brief-17-sorgenti-implementate-su-30-dichiarate)
    - [F8  BASSO  Cap fresh:8 silenzioso: segnali contati ma non salvati](#f8-basso-cap-fresh8-silenzioso-segnali-contati-ma-non-salvati)
    - [F9  Cosmetici](#f9-cosmetici)
    - [Cose FATTE BENE (da preservare)](#cose-fatte-bene-da-preservare)
  - [WATCHLIST MIGLIORATA (tutta keyless, pronta per DEFAULT_SOURCES)](#watchlist-migliorata-tutta-keyless-pronta-per-defaultsources)
    - [Correzioni (P1)](#correzioni-p1)
    - [Nuove  buchi di copertura 2026 (P4)](#nuove-buchi-di-copertura-2026-p4)
  - [5 INTEGRAZIONI IA 2026  ordinate per ROI (valore/sforzo)](#5-integrazioni-ia-2026-ordinate-per-roi-valoresforzo)
    - [1. Gate di rilevanza con LLM locale (triage notturno dei segnali)  ROI](#1-gate-di-rilevanza-con-llm-locale-triage-notturno-dei-segnali-roi)
    - [2. Upgrade local LLM: Qwen3.5-9B Q4_K_M via Ollama  ROI](#2-upgrade-local-llm-qwen35-9b-q4km-via-ollama-roi)
    - [3. RAG: BGE-M3 come embedder unificato (dense  sparse  late-interaction)  ROI](#3-rag-bge-m3-come-embedder-unificato-dense-sparse-late-interaction-roi)
    - [4. Vista NEWS in dashboard  ciclo di vita criticità  ROI](#4-vista-news-in-dashboard-ciclo-di-vita-criticità-roi)
    - [5. Agente schedulato settimanale cosa integriamo? (pattern self-improving 2026)  ROI](#5-agente-schedulato-settimanale-cosa-integriamo-pattern-self-improving-2026-roi)
  - [FONTI WEB (verifica novità 2026)](#fonti-web-verifica-novità-2026)

<!-- /TOC -->

# 05 — NEWS IA: audit watcher + integrazioni 2026
*Attacco 02/07/2026 — agente NEWS IA. Propose-only: nessun file di progetto toccato.*
*Bersaglio: `NODES/AI_NEWS_WATCHER/watcher.py` (407 righe) + `BRAIN/AI_NEWS_WATCHER_BRIEF.md` + `DATA/ai_news_watcher_state.json`.*

---

## PRIORITÀ (massimo impatto / minimo rischio, in ordine)

| # | Azione | Tipo | Impatto |
|---|--------|------|---------|
| P1 | **Anthropic News è MORTA dal giorno 1** (Tier1, zero segnali in 25 giorni) → sostituire l'URL con un feed RSS vero | QUICK-WIN ≤10 min | Recupera la fonte n.1 del progetto (release Claude/Fable) |
| P2 | **Filtro stelle sui topic GitHub** (oggi entrano repo spam ★0-★2 SEO) | QUICK-WIN ≤15 min | Toglie ~60% del rumore dalle criticità |
| P3 | **Verificare la schedulazione**: 5 notti saltate (28/06→01/07) + run del 02/07 15:43 interrotto a metà | QUICK-WIN ≤10 min (da terminale reale, serve `schtasks`) | Il watcher che non gira = zero segnali |
| P4 | **Watchlist +12 sorgenti keyless** (OpenAI, HuggingFace, HN filtrato, r/LocalLLaMA, YouTube mancanti dal brief) | QUICK-WIN ≤30 min | Copre i buchi grossi (open-source LLM, community) |
| P5 | **Gate di rilevanza con LLM locale** (integrazione #1 sotto) | INGEGNERIZZAZIONE ~1g | Trasforma il digest da lista grezza a segnale azionabile; ripara anche la rotazione tier |
| P6 | Fix rotazione (promozione per rilevanza, non per volume) + dedup criticità | INGEGNERIZZAZIONE ~2h | Il tier system oggi degenera: tutto ciò che è attivo diventa Tier1 |

---

## FINDINGS (con file:riga)

### F1 — CRITICO · Anthropic News: sorgente Tier1 morta silenziosamente
- `NODES/AI_NEWS_WATCHER/watcher.py:88` — handle = `https://www.anthropic.com/news`, che è una **pagina HTML**, non un feed. Anthropic non pubblica RSS ufficiale (confermato via web, giu 2026).
- `watcher.py:251-258` (`fetch_site`) scarica l'HTML, `watcher.py:225-227` (`_parse_feed`) fallisce `ET.fromstring` e ritorna `[]` **senza log di errore** → la sorgente sembra "in cooldown", in realtà non ha mai prodotto nulla.
- Prova: `DATA/ai_news_watcher_state.json:433-441` — `last_seen: []`, `signals: []` dopo 25 giorni di run.
- Il brief lo sapeva: `BRAIN/AI_NEWS_WATCHER_BRIEF.md:124-125` ("Anthropic News non ha RSS → da agganciare diversamente") ma è rimasto nel roster com'è.
- **Fix (QUICK-WIN)**: sostituire l'handle con un feed comunitario mantenuto, keyless:
  - `https://raw.githubusercontent.com/alan-turing-institute/ai-rss-feeds/refs/heads/main/feeds/anthropic-news.xml` (Alan Turing Institute — affidabile)
  - \+ aggiungere `.../feeds/anthropic-research.xml` e `.../feeds/claude-blog.xml` come sorgenti separate Tier1.
- **Fix strutturale (≤15 min)**: in `fetch_site`, se `_parse_feed` ritorna vuoto su HTTP 200, loggare `WARNING "feed vuoto/non-XML"` — mai più sorgenti morte invisibili.

### F2 — ALTO · La rotazione promuove per volume, non per rilevanza → il tier system degenera
- `watcher.py:375-376`: promozione T2→T1 se `2+ signals in 2 settimane`. Ma `signals` (`watcher.py:338`) = "la sorgente ha pubblicato qualcosa di nuovo", non "qualcosa di utile". Il brief chiede "2+ **criticità rilevanti**" (`AI_NEWS_WATCHER_BRIEF.md:79`).
- `watcher.py:345`: `rilevanza: "da_valutare"` — nessuno la aggiorna mai, non esiste feedback loop. `stato: "nuovo"` (`watcher.py:346`) non transita mai.
- Effetto misurato: Latent Space e Matt Wolfe erano Tier2 di default (`watcher.py:91,94`) e si sono auto-promossi Tier1 (`state.json:547`, `state.json:653`). Qualsiasi blog attivo finisce Tier1 → polling 48h per tutti → il concetto di tier evapora.
- `state.json:13`: `tier1.max_sources: 10` esiste in config ma **non è applicato da nessuna parte nel codice**.
- **Fix**: promozione basata su criticità con `rilevanza != "da_valutare"` (richiede il gate di rilevanza, integrazione #1) + enforcement `max_sources` in `_apply_rotation` (`watcher.py:360-380`).

### F3 — ALTO · Topic GitHub senza filtro qualità: le criticità sono piene di spam SEO
- `watcher.py:204-218` (`fetch_github_topic`): nessun filtro stelle. Il campo `stars` viene raccolto (`watcher.py:213,217`) ma **mai usato come filtro**.
- Prova: `state.json:904-1061` — criticità Tier1 tipo `onlymuneeb38-glitch/ios-agent-skills-evaluator ★1`, `flow-gated-planning ★0`, `Quant_Trading_Portfolio- ★0`, keyword-stuffing "2026" nel titolo: repo spam generati per farming.
- 15 item/passata × 2 topic = i topic dominano il digest (cap 40, `watcher.py:47`) e affogano i segnali veri.
- **Fix (QUICK-WIN)**: `stars:>=20` nella query (o `if stars < 20: continue` nel loop) + `created:>YYYY-MM-DD` per pescare repo *nuovi* invece di repo *aggiornati*.

### F4 — MEDIO · Query topic malformata: l'ordinamento "updated" probabilmente non funziona
- `watcher.py:206-210`: la costruzione `f"...&sort:updated..." .replace("&sort:updated", "+sort:updated")` produce `q=topic:X+sort:updated`. Nella REST API il sort è un **parametro separato** (`&sort=updated`), non un qualifier dentro `q`; il qualifier `sort:` è sintassi della web UI. Risultato: ordinamento best-match (≈ popolarità), non per aggiornamento → i "nuovi" segnali sono in realtà churn casuale della prima pagina.
- **Fix (QUICK-WIN)**: `search/repositories?q=topic:{topic}+created:>{cutoff}&sort=updated&order=desc&per_page=15`.

### F5 — MEDIO · Dedup criticità assente + eviction casuale della finestra "viste"
- `watcher.py:339-349`: insert in `criticita` senza controllo id esistente. Stesso repo in due topic = doppione: vedi `topic:1247102103` sia sotto `ai-agents` (`state.json:904`) sia sotto `claude-code` (`state.json:1034`).
- `watcher.py:335`: `src["last_seen"] = ([it["id"] for it in items] + list(seen))[:200]` — `seen` è un `set`, quindi `list(seen)` ha **ordine non deterministico**: l'eviction dal cap 200 è casuale e un item vecchio può rientrare come "nuovo".
- **Fix (≤20 min)**: dedup per id prima dell'insert; mantenere `last_seen` come lista ordinata (nuovi in testa) senza passare da set.

### F6 — MEDIO · Operativo: 5 notti saltate + ultimo run interrotto
- `DATA/logs/night_ai_watch.log`: run notturni regolari alle 03:25 fino al **27/06**, poi nulla fino al **02/07 15:43**. 5 notti perse (PC spento? task disabilitato?).
- Il run del 02/07 15:43 è **anomalo**: logga `[github] Simone Rizzo -> 1 nuovi` poi `done` senza le righe finali `digest`/`Passata`/`OK` → processo uscito/killato a metà passata (nessun traceback nel log).
- **Fix**: da terminale reale (la sandbox non vede i task): `schtasks /query /fo list /v | findstr /i ai_watch` — verificare che il task esista e sia `Ready`; valutare trigger "at startup + daily" per coprire il PC spento di notte.

### F7 — BASSO · Copertura brief: ~17 sorgenti implementate su 30+ dichiarate
- `AI_NEWS_WATCHER_BRIEF.md:32-66` elenca 30+ creator; in `DEFAULT_SOURCES` (`watcher.py:73-98`) ce ne sono 17. Blocchi interi mai implementati benché keyless via YouTube RSS: News/Tool (Wes Roth, AI Explained, The AI Advantage), Big Picture (Lex Fridman, Dwarkesh, YC), Italiani (Antonio Guadagno, Raffaele Gaito, IA per Tutti…), 3Blue1Brown, Nate Herk, David Ondrej, Swyx YT. Vedi watchlist sotto.

### F8 — BASSO · Cap `fresh[:8]` silenzioso: segnali contati ma non salvati
- `watcher.py:339` salva max 8 criticità per sorgente/passata, ma `watcher.py:350` conta tutte le fresh → il log dice "48 segnali nuovi" (27/06) mentre in `criticita` ne atterrano meno. Segnali persi senza traccia. Fix: loggare `salvati X/Y`.

### F9 — Cosmetici
- `watcher.py:7` e `watcher.py:10`: doppio `import os`.
- `watcher.py:2-4`: header dice "v1.0 | 2026-06-07" — aggiornare quando si tocca.

### Cose FATTE BENE (da preservare)
- State gitignored (`.gitignore:51`) — repo pubblico pulito. ✓
- Digest in `MENTE/KNOWLEDGE/AI_NEWS_RECENTI.md` (`watcher.py:38,42-67`) → entra davvero nel RAG (verificato in `NODES/MENTE_RAG/rag_corpus.jsonl`, chunk `KNOWLEDGE_AI_NEWS_RECENTI_md_*`). ✓
- Guard anti-falsa-retrocessione (`watcher.py:362-380`). ✓
- Resolver YouTube @handle→channelId con pattern espliciti, niente fallback cieco (`watcher.py:261-289`). ✓
- Zero chiavi, zero dipendenze extra (stdlib + requests + gh). ✓

---

## WATCHLIST MIGLIORATA (tutta keyless, pronta per `DEFAULT_SOURCES`)

### Correzioni (P1)
| Sorgente | kind | handle | Tier |
|---|---|---|---|
| Anthropic News (fix) | site | `https://raw.githubusercontent.com/alan-turing-institute/ai-rss-feeds/refs/heads/main/feeds/anthropic-news.xml` | 1 |
| Anthropic Research | site | `https://raw.githubusercontent.com/alan-turing-institute/ai-rss-feeds/refs/heads/main/feeds/anthropic-research.xml` | 1 |
| Claude Blog | site | `https://raw.githubusercontent.com/alan-turing-institute/ai-rss-feeds/refs/heads/main/feeds/claude-blog.xml` | 2 |

### Nuove — buchi di copertura 2026 (P4)
| Sorgente | kind | handle | Tier | Perché |
|---|---|---|---|---|
| OpenAI News | site | `https://openai.com/news/rss.xml` | 1 | RSS ufficiale; il concorrente frontier non era coperto |
| Hugging Face Blog | site | `https://huggingface.co/blog/feed.xml` | 1 | Fonte n.1 per modelli open che girano sulla 1070 |
| Hacker News (filtro qualità) | site | `https://hnrss.org/newest?q=Claude+OR+RAG+OR+%22local+LLM%22&points=100` | 1 | Auto-curato dai punti: rumore quasi zero, è il "tier automatico" perfetto |
| r/LocalLLaMA | site | `https://www.reddit.com/r/LocalLLaMA/.rss` | 2 | Community di riferimento per LLM locali (serve UA browser, già in `HEADERS`) |
| arXiv cs.CL | site | `https://arxiv.org/rss/cs.CL` | 2 | Paper RAG/retrieval; volume alto → ha senso SOLO dopo il gate di rilevanza |
| MarkTechPost | site | `https://www.marktechpost.com/feed/` | 2 | News tecniche quotidiane |
| Wes Roth | youtube | `@WesRoth` | 2 | Dal brief §1, mai implementato |
| AI Explained | youtube | `@aiexplained-official` | 2 | Dal brief §1 |
| David Ondrej | youtube | `@DavidOndrej` | 2 | Dal brief §1 (builder agenti) |
| Dwarkesh Patel | youtube | `@DwarkeshPatel` | 2 | Dal brief §1 (big picture) |
| 3Blue1Brown | youtube | `@3blue1brown` | 2 | Dal brief §1 |
| Antonio Guadagno | youtube | `@AntonioGuadagno` | 2 | Italiani = priorità alta del brief |

Note: handle YouTube da verificare al primo run (il resolver logga se non trova il channelId — `watcher.py:285`). Retrocessioni suggerite: `topic:ai-agents` → Tier2 finché non c'è il filtro stelle (oggi è la sorgente più rumorosa: F3).

---

## 5 INTEGRAZIONI IA 2026 — ordinate per ROI (valore/sforzo)

### 1. Gate di rilevanza con LLM locale (triage notturno dei segnali) — ROI ★★★★★
**Cosa**: dopo la passata del watcher, un secondo step passa le criticità `da_valutare` al 7B locale (o Haiku a costo ~zero) con un profilo di progetto fisso ("RAG ibrido, agenti, Nina/contenuti educativi, CNC/V32, Claude Code") e classifica: `rilevante | forse | scarta` + 1 riga di perché. Solo i `rilevante` entrano nel digest RAG; la rotazione tier (F2) conta questi, come il brief ha sempre chiesto.
**Perché 2026**: è il pattern LLM-as-filter/curator ormai standard (vedi gli AI news curator con n8n+Claude); il vostro `night_audit.py` con Sonnet è già il precedente architetturale in casa.
**Sforzo**: ~1 giorno (nuovo `triage.py` nel nodo + chiamata dal `.bat`). Rischio: basso, additivo puro.
**Valore**: ripara F2+F3+F10 insieme; il digest smette di essere una lista di 40 link e diventa "3 cose da integrare".

### 2. Upgrade local LLM: Qwen3.5-9B Q4_K_M via Ollama — ROI ★★★★☆
**Cosa**: sostituire il 7B "debole sui doc" (nota memoria graphify) con Qwen3.5-9B quantizzato Q4_K_M: ~5-7 GB, sta nella GTX 1070, 32k di contesto, riferimento 2026 per la fascia 8GB (54-58 tok/s su hardware simile). Alternativa minima per il solo triage: Phi-4-mini 3.8B (~3.5 GB) e la VRAM restante resta al RAG.
**Sforzo**: 2-4 ore (pull modello + swap endpoint negli script che chiamano il locale). Rischio: basso, reversibile.
**Valore**: alza la qualità di triage (#1), estrattore MENTE ibrido e graphify locale senza toccare Claude.

### 3. RAG: BGE-M3 come embedder unificato (dense + sparse + late-interaction) — ROI ★★★☆☆
**Cosa**: sostituire `paraphrase-multilingual-MiniLM-L12-v2` (384-dim) + BM25 sklearn con **BGE-M3**: un solo forward pass produce embedding densi (1024-dim), sparsi (tipo BM25 appreso) e multi-vettore ColBERT-style; 8192 token di contesto, multilingua IT/EN/DE/FR. Il CrossEncoder resta come rerank finale (o si prova il rerank late-interaction, più economico).
**Sforzo**: 1-2 giorni + rebuild indice (attenzione ai vincoli noti: chromadb 0.5.23, torch 2.6.0+cu124 — `project_rag_fix`). Su Pascal l'encoding è lento ma è batch notturno, non interattivo.
**Valore**: recall migliore su query tecniche miste IT/EN, un componente in meno da mantenere (via TF-IDF sklearn). Da fare DOPO #1-#2: il RAG oggi funziona, questo è ottimizzazione.

### 4. Vista NEWS in dashboard + ciclo di vita criticità — ROI ★★★☆☆
**Cosa**: view React (pattern N-livelli esistente) che legge `ai_news_watcher_state.json` via API server (5001): lista segnali con badge tier/fonte e due bottoni — "utile" / "scarta" — che aggiornano `rilevanza`/`stato` nello state. È il feedback umano che alimenta la rotazione vera; con #1 attivo, Matteo giudica solo i `forse`.
**Sforzo**: mezza giornata (endpoint GET/POST + view; il Centro di Controllo va aggiornato di conseguenza).
**Valore**: chiude il loop uomo-macchina; 30 secondi al giorno di triage al posto di zero triage.

### 5. Agente schedulato settimanale "cosa integriamo?" (pattern self-improving 2026) — ROI ★★☆☆☆
**Cosa**: un run Claude schedulato (skill `/schedule`, o slot nel notturno esistente) che ogni domenica legge `AI_NEWS_RECENTI.md` + il profilo progetto e produce in `MENTE/SESSIONI/` una proposta concreta: "queste 2-3 novità valgono un nodo/upgrade, ecco il piano in 5 righe". È il pattern 2026 "scheduled memory review / self-improving skills" dell'Agent SDK applicato al vostro loop conoscenza.
**Sforzo**: ~1 giorno (prompt + schedulazione + template output). Rischio: basso (propone, non esegue).
**Valore**: trasforma il watcher da "raccoglitore" a "consigliere"; dipende da #1 per non lavorare sul rumore.

**Ordine consigliato**: P1-P4 (quick-win, stessa sessione) → #1 → #2 → #4 → #5 → #3.

---

## FONTI WEB (verifica novità 2026)
- [Best Open Source LLM 8GB VRAM 2026 (Pactentia)](https://pactentia.com/blog/best-open-source-llm-8gb-vram-2026) · [Best Ollama Models 8GB (Local AI Master)](https://localaimaster.com/blog/best-local-ai-models-8gb-ram) · [Local LLMs 8GB benchmarks (LocalLLM.in)](https://localllm.in/blog/best-local-llms-8gb-vram-2025)
- [Embedding models 2026 (MasterPrompting)](https://masterprompting.net/blog/embedding-models-comparison-2026) · [8 embedding models benchmark (Tensoria)](https://tensoria.fr/en/blog/embedding-models-2026-guide) · [Reranking & Cross-Encoders 2026 (Local AI Master)](https://localaimaster.com/blog/reranking-cross-encoders-guide) · [RAG patterns 2026 (DEV)](https://dev.to/young_gao/rag-is-not-dead-advanced-retrieval-patterns-that-actually-work-in-2026-2gbo)
- [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) · [Claude Code 2026 features (MarkTechPost)](https://www.marktechpost.com/2026/06/14/claude-code-guide-2026-25-features-with-examples-demo/)
- [ai-rss-feeds (Alan Turing Institute)](https://github.com/alan-turing-institute/ai-rss-feeds) · [Best AI RSS feeds 2026 (Readless)](https://www.readless.app/blog/best-ai-news-rss-feeds-2026) · [HN RSS 2026 (Dupple)](https://dupple.com/blog/hacker-news-rss) · [AI news curator n8n+Claude (DEV)](https://dev.to/hackceleration/building-an-ai-news-curator-with-n8n-claude-and-rss-feeds-fmm)
