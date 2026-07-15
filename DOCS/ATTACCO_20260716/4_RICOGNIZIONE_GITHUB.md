# DOMINIO 4 — RICOGNIZIONE GITHUB (ATTACCO #2)

*15/07/2026 · **propose-only** — nessuna installazione, nessun clone, nessuna modifica.
Regola di casa: "ricognizione prima di rifare". Criteri: repo vivo (commit <6 mesi),
licenza ok, gira su Win10 + Python 3.11/Node, GPU esclusa (la 1070 è del RAG),
self-hosted. Ogni verdetto pesa ORE DI INTEGRAZIONE vs cosa sblocca.*

## Metodo

Dati verificati via `gh api` / `gh search repos` il 15/07/2026 (stelle, ultimo push,
licenza, ultima release). Bisogni dal _PIANO.md + bussola #61; gli altri report dominio
non erano ancora depositati — copertura sui 6 bisogni noti.

---

## 1. Pubblicazione social self-hosted (collo n°1 NOTO)

| Repo | Stelle / ultimo push | Licenza | Cosa sblocca | Ore | VERDETTO |
|---|---|---|---|---|---|
| gitroomhq/postiz-app | 33.3k / 15/07/2026 · rel. v2.21.10 (22/06) | AGPL-3.0 | scheduler completo IG+LinkedIn | 8-16 (Docker+app Meta) | **CONFERMA** — vivo e in salute, la decisione #56 regge |
| inovector/mixpost | 3.4k / 03/2026 | MIT | idem, PHP/Laravel | 12+ | scarta — stack PHP estraneo, feature chiave nella versione a pagamento |
| Anil-matcha/Free-AI-Social-Media-Scheduler | 449 / 06/2026 | — | "alternativa a Postiz" | 6-10 | scarta — troppo giovane (449★), nessun vantaggio su Postiz |
| subzeroid/instagrapi | 6.5k / 15/07/2026 | custom | IG senza app Meta (private API) | 3-4 | **scarta** — API non ufficiale, rischio ban account: inaccettabile sul canale Nina |
| linkedin-developers/linkedin-api-python-client | 261 / 04/2024 | other | LinkedIn ufficiale | — | scarta — stale (2024) e il PDF-document post richiede comunque approvazione app |

**Verdetto bisogno 1:** Postiz è VIVO (release mensili, push oggi) — non esiste il
"più leggero equivalente": chiunque pubblichi su IG passa dalla stessa Graph API con
gli stessi prerequisiti (app Meta + review). Il collo NON è lo strumento, è il
prerequisito Meta. **Ponte reale a costo zero repo:** una volta ottenuta l'app Meta,
il carosello IG si pubblica con ~80 righe di `requests` (endpoint `content_publishing`,
`media_type=CAROUSEL`) — Postiz dopo, quando serve calendario multi-canale. LinkedIn
PDF: nessuna scorciatoia FOSS seria; ponte = pubblicazione manuale (2 min/carosello)
finché l'app non c'è.

## 2. Render HTML→PNG batch

| Repo | Stelle / push | Licenza | Cosa sblocca | Ore | VERDETTO |
|---|---|---|---|---|---|
| microsoft/playwright | 92.9k / 15/07/2026 | Apache-2.0 | retry/timeout robusti, wait-for-font | 4-6 riscrittura render_queue | **scarta (per ora)** |
| simonw/shot-scraper | 2.5k / 07/2026 | Apache-2.0 | CLI batch screenshot su Playwright | 2-3 | rimanda |

**Verdetto bisogno 2:** come previsto dal piano — **no cambio**. `render_queue.py`
(Chrome headless) funziona e ha QC a valle che intercetta i render rotti; Playwright
darebbe robustezza marginale al costo di ~500MB di browser dedicati e una riscrittura.
Si riapre SOLO se compare un tasso misurabile di render falliti/notte (>1-2%). Lo
strumento di casa basta.

## 3. Sito statico caroselli/episodi (GitHub Pages)

| Repo | Stelle / push | Licenza | Cosa sblocca | Ore | VERDETTO |
|---|---|---|---|---|---|
| withastro/astro | 61k / 15/07/2026 | MIT (LICENSE multi-parte) | content collections da episodes.json/MD, image opt., zero JS in output | 6-10 primo sito | **ADOTTA** quando parte il sito (#56 lo prevede) |
| 11ty/buildawesome (ex eleventy — repo RINOMINATO) | 19.8k / 13/07/2026 | MIT | SSG minimale JS | 6-10 | riserva — più semplice ma meno struttura per collezioni |
| gohugoio/hugo | 89k / 13/07/2026 | Apache-2.0 | binario singolo, zero node_modules | 8-12 | scarta — Go templates estranei allo stack (casa = JS/React) |
| facebook/docusaurus | — | MIT | docs-site | — | scarta — pensato per documentazione, non per collezioni visuali |

**Verdetto bisogno 3:** **Astro** — una scelta sola (regola "decidi, non varianti"):
content collections mappano 1:1 su `episodes.json` + caroselli renderizzati, output
statico puro (manutenzione ~zero su Pages), e lo stack di casa è già Node/Vite quindi
niente linguaggi nuovi. Nota: il repo Eleventy oggi si chiama `11ty/buildawesome` —
se si cercano docs/tutorial, puntare al nome nuovo.

## 4. Scheduling/queue notturno

| Repo | Stelle / push | Licenza | Cosa sblocca | Ore | VERDETTO |
|---|---|---|---|---|---|
| jhuckaby/Cronicle | 5.8k / 09/07/2026 · v0.9.123 | MIT | cron UI + retry + log | 8+ | scarta — POSIX-first, su Windows non supportato ufficialmente; demone Node 24/7 in più |
| agronholm/apscheduler | 7.6k / 12/07/2026 | MIT | scheduler in-process Python con retry | 4-6 | rimanda — utile SOLO se un giorno si consolida tutto in un unico demone Python |
| healthchecks/healthchecks | 10.2k / 14/07/2026 | BSD-3 | dead-man switch per i job (ping o allarme) | 6-8 (Django self-hosted) | scarta — night_audit ha già le sentinelle log |

**Verdetto bisogno 4:** **lo strumento di casa basta.** Task Scheduler + bat +
single-instance è brutale ma nativo, sopravvive ai riavvii e non aggiunge demoni.
La fragilità storica (handle leak PS, CRLF) è già stata curata con anticorpi propri.
Un orchestratore esterno sposterebbe la fragilità, non la eliminerebbe. Se serve più
visibilità: è un problema di MONITORAGGIO (bisogno 6), non di scheduling.

## 5. Fine-tuning LLM locale su GTX 1070 8GB

| Repo | Stelle / push | Licenza | Cosa sblocca | Ore | VERDETTO |
|---|---|---|---|---|---|
| unslothai/unsloth | 68.3k / 15/07/2026 | Apache-2.0 | 2x speed, -70% VRAM | — | **scarta — incompatibile hardware** |
| meta-pytorch/torchtune | 5.8k / 15/07/2026 | BSD-3 | recipe ufficiali PyTorch | — | scarta — stessi limiti Pascal, meno maturo di LLaMA-Factory per QLoRA 8GB |
| hiyouga/LLaMA-Factory | 73.3k / 15/07/2026 · v0.9.5 (05/2026) | Apache-2.0 | (già in casa) | 0 | **CONFERMA** |

**Verdetto bisogno 5:** unsloth è il top del 2026 MA richiede Triton → CUDA capability
≥7.0 (il README ufficiale parte da RTX 30); la GTX 1070 è Pascal **sm_6.1**: non parte,
punto. LLaMA-Factory (73k★, release 05/2026, più stellato di unsloth) resta la scelta
GIUSTA per Pascal ed è già installato e vincolato allo stack torch 2.6.0+cu124 del RAG
— **non toccare niente**. L'upgrade vero qui è hardware (GPU sm_70+), non software.

## 6. Monitoraggio "organi vivi"

| Repo | Stelle / push | Licenza | Cosa sblocca | Ore | VERDETTO |
|---|---|---|---|---|---|
| louislam/uptime-kuma | 89.2k / 15/07/2026 · v2.4.0 (05/2026) | MIT | up/down real-time API:5001, dashboard:5173, n8n + heartbeat UI | 3-4 | **rimanda** |
| TwiN/gatus | 11.5k / 10/07/2026 | Apache-2.0 | idem, config-as-code Go | 4-5 | scarta — Kuma lo domina per il caso d'uso |

**Verdetto bisogno 6:** mezzo doppione. night_audit copre i JOB notturni (log, canone,
QC) e Kuma NON lo sostituirebbe; coprirebbe l'altra metà — i SERVIZI di giorno (API
5001 che muore, dashboard giù, n8n fermo) che oggi si scoprono solo quando Matteo li
usa. Costo: demone Node 24/7 su 16GB di RAM già tirati. Onesto: valore reale ma non è
un collo di bottiglia della pipeline contenuti → rimandare finché un servizio giù non
costa una notte di lavoro. La UI heartbeat è già stata copiata: il meglio di Kuma è
già in casa.

---

## TOP 3 ADOZIONI PER LEVA

1. **Ponte Meta Graph API diretto (nessun repo nuovo)** — il collo n°1 non si risolve
   con uno strumento: prerequisito app Meta, poi ~80 righe di `requests` pubblicano il
   carosello IG stanotte stessa. Postiz (confermato vivo, v2.21.10) arriva DOPO come
   calendario. Leva massima, zero dipendenze nuove.
2. **Astro per il sito statico** (61k★, MIT, push oggi) — quando si apre il cantiere
   sito #56: collezioni da episodes.json, output statico zero-manutenzione, stack già
   di casa. 6-10 ore per la prima versione pubblicabile.
3. **Uptime Kuma** (89k★, MIT) — unica adozione "monitoraggio" sensata, ma RIMANDATA
   con criterio esplicito: si installa il giorno in cui un servizio giù di giorno costa
   lavoro reale. 3-4 ore quando servirà.

**Non-adozioni deliberate (valgono quanto le adozioni):** Playwright (Chrome headless
di casa basta), unsloth (hardware Pascal incompatibile — LLaMA-Factory resta giusto),
orchestratori cron (Task Scheduler nativo basta), instagrapi (rischio ban, mai).
