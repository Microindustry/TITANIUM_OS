<!-- TOC -->

- [PROSSIMA SESSIONE  Piano (lista da seguire punto per punto)](#prossima-sessione-piano-lista-da-seguire-punto-per-punto)
  - [VISIONE 2026 (la più aggiornata)](#visione-2026-la-più-aggiornata)
  - [AZIONI  punto per punto](#azioni-punto-per-punto)
    - [PUNTO 0  AUTONOMIA (prima di tutto)](#punto-0-autonomia-prima-di-tutto)
    - [PUNTO 1  DATI VIVI (uccidere il dashboard-teatro)](#punto-1-dati-vivi-uccidere-il-dashboard-teatro)
    - [PUNTO 2  STORIA-AVVENTURA (binario nuovo, in PARALLELO ai tecnici)](#punto-2-storia-avventura-binario-nuovo-in-parallelo-ai-tecnici)
    - [PUNTO 3  NON PERDERE EPISODI  LEGGIBILITÀ](#punto-3-non-perdere-episodi-leggibilità)
    - [PUNTO 4  RAG vero  LLM](#punto-4-rag-vero-llm)
    - [PUNTO 5  AGENTI usati davvero](#punto-5-agenti-usati-davvero)
    - [PUNTO 6  RICERCA come compito  LEVE predisposte](#punto-6-ricerca-come-compito-leve-predisposte)
    - [PUNTO 7  NOTTURNE ridecise dalla salute del sistema](#punto-7-notturne-ridecise-dalla-salute-del-sistema)
    - [PUNTO 8  RIORGANIZZAZIONE FILESYSTEM (PC)](#punto-8-riorganizzazione-filesystem-pc)
  - [ATTACCO A 360 (il cattivo)  guida laudit](#attacco-a-360-il-cattivo-guida-laudit)
  - [STATO ATTUALE (già fatto e funzionante)](#stato-attuale-già-fatto-e-funzionante)
  - [COME RIPRENDERE](#come-riprendere)

<!-- /TOC -->

# PROSSIMA SESSIONE — Piano (lista da seguire punto per punto)
*Consolidato sessione #20-21 · 04/06/2026 · gemello di `Desktop/TITANIUM_OS_PIANO.txt`*

> Regola d'oro: **completare e far FUNZIONARE l'ecosistema prima dei soldi.**
> Additivo, reversibile, committato. **Non perdere episodi/contenuti.** Ibrido (locale+Claude, RETE+RAG).
> Generazione episodi: **decide Claude il metodo e lo consegna funzionante** (basta che funzioni).
> **NON FERMARTI finché non si esaurisce il limite dell'abbonamento di Matteo:** avanza in continuo senza aspettare input ad ogni passo; il grosso su modelli economici, Opus solo per le decisioni. Mai lasciare il sistema fermo.

---

## VISIONE 2026 (la più aggiornata)
Il sistema NON è lo scaffolding personale di Matteo: è **la base per QUALSIASI progetto**. Noi → CNC, un altro → un'altra cosa. GENESIS = **piattaforma + servizio di scalabilità + product studio**.

**Cosa vendiamo:**
- **(A) Il sistema/engine** — il metodo idea→prodotto, riusabile e scalabile.
- **(B) La "cartella clinica" del sistema/macchina** — le *critiche* sono la diagnostica che "accende la lampadina" all'ingegnere. Storia clinica viva di una macchina = IP vendibile.
- **(C) L'universo-storie EDUCATIVO** — avventure (animate/YouTube/ebook) che spiegano la tecnologia del 2026 a un bambino del 2024 → cresce predisposto a modelli sempre più complessi. Prodotto + missione + audience.

**Go-to-market:** brand personale di Matteo — non famoso ma **riconoscibile** (rete reale, figlio, aperitivi, LinkedIn con buona visibilità). Si sta posizionando "attraente" verso partner/investitori. **NIENTE sul progetto su LinkedIn finché non funziona** ("prima deve funzionare"). V32/MIMS/capannone = vetrina + hobby, pagati dal sistema.

**Modo di lavorare:** "va fatto tutto insieme" (olistico), Matteo in hyperfocus, ci mette tutto (ha famiglia, "un po' qua un po' là"), mi chiama **socio**. Mio compito: cavalcare l'energia ma tenerla olistica-MA-sequenziata (una cosa che funziona, non 10 a metà) + proteggere la sostenibilità. Paletto: **niente teatro** — se è prodotto, dev'essere reale/autonomo/dimostrabile.

**Accessi:** ci sono **name & pass in `_VAULT/ACCOUNTS`** (LinkedIn ecc.). Regola: verifico la visibilità **pubblica** (read-only / Google), **NON** mi loggo con le password (sicurezza). LinkedIn = canale che funziona, da sfruttare **quando il progetto funziona**.

**Economia modelli (Matteo brucia Opus + reset):** Opus solo strategia/architettura, risposte brevi. Routine → Sonnet/Haiku. Ripetitivo/notturno → script + n8n + LLM locale. *Non far fare a Opus ciò che fa uno script.*

**TODO comandi:** riscrivere `CLAUDE.md` con questa visione (oggi descrive solo "scaffolding personale" + path Getac/benen residui).

---

## AZIONI — punto per punto

### PUNTO 0 — AUTONOMIA (prima di tutto)
*"Io mi blocco, tu ti blocchi, tutto si blocca."* Il sistema non avanza senza Matteo.
- 0a. Claude gira dopo la sessione **solo** via agenti schedulati (cron/routine).
- 0b. **Agente notturno autonomo** che ogni notte, da solo, e committa: ricerca → aggiorna RAG → genera 1 episodio-avventura → **self-audit che AGGIUNGE critiche** → aggiorna livelli su progressi reali → commit.
- 0c. Gira su modelli **economici** (no Opus), guardrail additivi/reversibili.

### PUNTO 1 — DATI VIVI (uccidere il "dashboard-teatro")
- 1a. 🟡 **AUDIT FATTO (06/06)** — `AUTOMATIONS/AUTOMATIONS_AUDIT.md`: la view mente in 2 direzioni — ~14 voci "(da creare)" inesistenti listate come reali (teatro) + 5 moduli reali event-driven (md_validator/semantic_indexer/toc_compiler/auto_linker/md_view_pipeline) marcati "da creare". Reale: 3 processi persistenti + 6 scheduled (4 con esito 0 OK, verificati) + event-driven via watcher. **Anomalia:** TI_NightAudit risulta "mai eseguito" via scheduler ma critiche_auto.json ha dati 05/06 → task da riparare. **Resta (il grosso):** riscrivere l'array a livelli + stato live (come Notturne) + separare le "pianificate". Non fatto qui: tocca la UI, additivo con calma.
- 1b. ✅ **FATTO (06/06)** — **Critiche LIVE = cartella clinica viva.** La vista CRITICHE innesta un ramo "🔬 Auto-audit notturno" dai findings che night_audit (Sonnet) genera in `critiche_auto.json` (`GET /api/critiche/auto` + `criticheAuto.ts`). Crescono da sole, canone manuale intatto in testa, badge "N live · M aperti". Testato: 6 findings reali. (Resta: chiudere il loop status open→done quando una critica è risolta.)
- 1c. **Livelli (lv):** non salgono da soli → collegarli a progressi reali.
- 1d. **SOTTOCASELLE sidebar** (come 🌙 Notturne: sotto-voce piccola colorata; ognuna con la sua vista, niente link morti):
  - sotto **AUTOMAZ**: 🌙 Notturne (blu, fatto) · ⚙ Watchdog (verde = stato servizi live) · 🔬 Ricerca (ambra = "cosa ho scoperto stanotte", lega col Punto 6b)
  - sotto **STORIE**: 🐍 Avventura (viola = nuova stagione educativa, Punto 2e) · 📖 Tecnici (slate = dev-log/milestone)
  - sotto **GENESIS**: 🧠 RAG chat (ciano = chiedi→risposta+fonti, Punto 4a) ✅ **FATTO** — col toggle motore Claude/Locale integrato (4b). · 🤖 LLM locale come voce indigo separata: opzionale, per ora vive nel toggle della chat.

### PUNTO 2 — STORIA-AVVENTURA (binario nuovo, in PARALLELO ai tecnici)
NON la biografia di Matteo. Avventura fantastica **educativa** per bambini/non-tecnici che spiega *man mano* architettura e principi.
- 2a. **PROTAGONISTI = personaggi NUOVI che costruisce Claude a DOC** (informati dalla ricerca 2g). Gli **agenti AI** (THEMIS, EVA, AVA, ARIA, NEXUS, TESLA, FORGE) **hanno un ruolo** nel mondo (sono nell'ecosistema) ma **non sono automaticamente i protagonisti**.
- 2b. **Bibbia personaggi a DOC**: ruolo, carattere, "potere" (= funzione reale nel sistema) — sia protagonisti nuovi sia agenti-comprimari.
- 2c. **Mondo:** ambientazione tipo Python (o più adatta — decide Claude) = regno del codice + officina.
- 2d. **Critiche = quest/avventure**; **MAPPA = mappa del mondo** (aggiornabile).
- 2e. **Sottocartella/stagione "Avventura" sotto Storie** (manca ancora).
- 2f. 1 episodio-avventura **pilota**. Il pilota-biografia "Il Mondo" si ridimensiona (non si butta).
- 2g. **RICERCA PROTAGONISTI (prima di scrivere):** cosa rende "vincenti" i personaggi educativi, casi "da 0 ce l'hanno fatta" → scegliere/costruire i protagonisti. **Tono: tecnico spiegato in modo SEMPLICE**, non oltre un certo punto.
- 2h. Formati: testo ora; animazioni/YouTube/ebook = **leve predisposte, SPENTE** (non ora).

### PUNTO 3 — NON PERDERE EPISODI + LEGGIBILITÀ
- 3a. ✅ **VERIFICATO FATTO (06/06)** — `audit_episodes.py`: 0 orfani, 114 voci in episodes.json, ogni .md su disco è in dashboard. Nessun content vuoto/corto (tutti i 114 hanno testo pieno).
- 3b. ✅ **GIÀ OK (06/06)** — StorieView ha un renderer markdown (MdLine: h1/h3/bold/paragrafi): all'espansione mostra `ep.content` **per intero**. La preoccupazione "testi tagliati" era pre-renderer. (Eventuale redesign "vista lettura" dedicata = nice-to-have, non urgente.)

### PUNTO 4 — RAG vero + LLM
- 4a. ✅ **FATTO (06/06)** — **Chat RAG vera** in dashboard: sotto-voce ciano "Chat RAG" sotto GENESIS, `POST /api/rag/chat` retrieval reale da MENTE/ + sintesi + **fonti citate** (testato: "178 kg corpo unico" cita v32_specifiche.md). RETE resta mappa, non è il RAG. (Resta aperto lo sdoppio CANONE vs RICERCA — già mitigato dal purge -448 chunk garbage della notte precedente.)
- 4b. 🟡 **LEVA PREDISPOSTA (06/06)** — pivot deciso: **Ollama + Qwen2.5-7B-Q4** (P4B_RESEARCH.md). `ollama_client.py` + toggle Claude/Locale nella chat + `GET /api/llm/ollama/status`. Leva ONESTA: oggi `available=false` → fallback a Claude con flag, niente teatro. **Manca solo:** installare Ollama + `ollama pull qwen2.5:7b-instruct-q4_K_M` per accenderla. Dataset episodi → few-shot per Claude (TODO). Claude resta motore qualità.

### PUNTO 5 — AGENTI usati davvero
- AgentsView + `/api/agents/ask` esistono ma scollegati; non li interrogo mai, non li usi.
- Dare ruolo **operativo** (THEMIS sui fix critiche, FORGE su MIMS…) + farli comparire **nella storia come parte dell'ecosistema** (NON per forza protagonisti → vedi 2a/2g).

### PUNTO 6 — RICERCA come compito + LEVE predisposte
- 6a. **Ricerca di mercato** (MIMS/Microindustry) + **ricerca geometrie adatte** (MIMS) come task ricorrenti del research agent.
- 6b. Le ricerche "per migliorare il sistema" devono avere **output visibile** in dashboard ("cosa ho scoperto stanotte") — oggi girano di notte ma non si vedono.
- 6c. Social/LinkedIn/animazione: **non ora**. Se una ricerca trova un modo economico/sub-ottimale per noi → **predisporre la leva** (pronta, spenta).

### PUNTO 7 — NOTTURNE ridecise dalla salute del sistema
- Non orari arbitrari: event-driven dove possibile, notturno solo per batch pesante. Ogni automazione con **output misurabile** e un perché.

### PUNTO 8 — RIORGANIZZAZIONE FILESYSTEM (PC)
- Riposizionare i file per ottimizzazione; **cartelle utili su Desktop**; **eliminare la chiavetta** (consolidare i contenuti); sistemare in modo intelligente. Prerequisito: audit (vedi Attacco) di file/cartelle/**librerie che non portano a nulla**.

---

## ATTACCO A 360° (il cattivo) — guida l'audit
1. **Single point of failure: Matteo.** Il sistema lo accudisce invece di liberarlo. → risolto solo dal Punto 0.
2. **Complessità > valore.** RIBALTATO dalla Visione: se il sistema È il prodotto, ok — ma dev'essere vendibile/dimostrabile (no teatro). Resta vero: serve ALMENO una cosa end-to-end da mostrare.
3. **Zero ricavi.** EVA pending; capannone senza soldi. (Accettato: prima far funzionare.)
4. **Dashboard-teatro.** Critiche/livelli/automazioni statici = quadro falso → Punto 1.
5. **MIMS IP scoperto.** Brevetto B2 urgente, trade secret in chiaro. **Da proteggere a prescindere.**
6. **Fragilità tecnica.** Rotture ripetute (storieData, path Getac, escaping, exit 255) → mitigato con `episodes.json`.
7. **Audience che forse non esiste.** Brand prima del prodotto = vanità → per questo "prima deve funzionare". Giusto.
8. **LLM locale = vanity compute** → Punto 4b (pivot).
9. **Pitch debole** se IP traballa + zero trazione + metriche-teatro → Punti 1 + 5.
10. **Costo-opportunità.** RIBALTATO: se GENESIS è il prodotto, le ore su GENESIS sono sul prodotto. Resta valido solo per MIMS IP.
+ **Audit richiesto:** struttura del sistema, priorità reali, **librerie/file che non portano a nulla** (dead code, orfani, dipendenze inutili) → input per il Punto 8.

---

## STATO ATTUALE (già fatto e funzionante)
- Automazioni notturne portabili + 6 task schedulati + watchdog vivo (api_server + mente_watcher).
- RAG ~6654 chunk; ricerca notturna guidata da STATE.
- Episodi migrati a `episodes.json` (bulletproof, 88 episodi); `sync_storie.py` ritirato.
- Dashboard stabile (Vite OK), n8n attivo (0 workflow), Flask :5001, Vite :5173.
- ✅ **Chat RAG vera (P4a) + leva LLM locale (P4b)** — commit `1bd09e5`, build `tsc -b` verde, endpoint testato via test_client. Vedi Punto 4.
- llamafactory installato ma finetune locale = da pivotare (Punto 4b → deciso Ollama+Qwen).

> ⚠ **NOTA RESTART (06/06):** api_server gira elevato (spawnato dal watchdog Highest); una shell normale non può ucciderlo. Gli endpoint nuovi vanno **live da soli al prossimo login** (watchdog AtLogon ricarica il codice). Per attivarli **subito**: doppio click su `SERVICES/restart_api.ps1` (si auto-eleva via UAC).

## COME RIPRENDERE
Matteo dice: **"parti dal punto N"**. Default consigliato: **0 (autonomia) → 1 (dati vivi) → 3 (non perdere + leggibilità) → 2 (avventura)**. Su modelli economici (non bruciare Opus).
