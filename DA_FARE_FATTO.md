<!-- TOC -->

- [DA FARE / COSA HO FATTO  la BUSSOLA viva di TITANIUM_OS](#da-fare-cosa-ho-fatto-la-bussola-viva-di-titaniumos)
  - [Sessione 34  07/06/2026](#sessione-34-07062026)
    - [INTERFACCIA  anti-sovraccarico (troppi strumenti, non so gestire)](#interfaccia-anti-sovraccarico-troppi-strumenti-non-so-gestire)
    - [VERIFICA TOTALE (prima delle automazioni)](#verifica-totale-prima-delle-automazioni)
    - [GRAPHIFY  livello WIKI dellarco macro (RAGWiki)](#graphify-livello-wiki-dellarco-macro-ragwiki)
    - [AI NEWS WATCHER  lista creator (dalla chat desktop)](#ai-news-watcher-lista-creator-dalla-chat-desktop)
  - [Sessione 32-33  06-07/06/2026](#sessione-32-33-06-07062026)
    - [FATTO](#fatto)
    - [DA FARE (prossimo  in ordine di priorità)](#da-fare-prossimo-in-ordine-di-priorità)
    - [IDEE / NOTE](#idee-note)

<!-- /TOC -->

# DA FARE / COSA HO FATTO — la BUSSOLA viva di TITANIUM_OS

*Questa è la scaletta condivisa io↔Matteo: dove siamo, cosa è fatto, cosa resta.*
*Si legge a INIZIO sessione e si aggiorna STRADA FACENDO (non a fine soltanto).*

**REGOLE DELLA BUSSOLA (standard):**
- **Non si cancella mai.** Si cambia solo lo stato di una riga. Se una cosa salta,
  si scrive `[✗] non fatto — motivo`, non si toglie.
- **Append in cima**: il blocco della sessione più recente va in alto.
- Stati: `[✓] fatto` · `[◐] in corso` · `[ ] da fare` · `[✗] non fatto` · `[💡] idea`.
- Canonica = QUESTO file (repo, versionato). Mirror per Matteo = Desktop
  `da fare e cosa ho fatto.txt`. Li tengo allineati.
- Il PIANO completo (visione, punti P1-P8) vive nel mirror Desktop + in
  `PROSSIMA_SESSIONE.md`. Qui sta la scaletta operativa, non tutto il piano.

---

## Sessione #34 · 07/06/2026

### [◐] INTERFACCIA — anti-sovraccarico ("troppi strumenti, non so gestire")
- [✓] **CONTROLLO** (nuova vista, in cima a Sistema): un posto solo che elenca ogni
      strumento/nodo in italiano semplice — cosa fa · come si usa · se è acceso. Gruppi:
      Conoscenza, Occhi sul mondo, Automazioni, Contenuti, Personaggi, Infrastruttura.
      Righe cliccabili → portano alla vista. `ControlloView.tsx`. (commit 52518f4)
- [✓] **STORIE v3.0**: stagioni a fisarmonica (la divisione si vede subito), titoli
      leggibili, flood AUTO (66 ep) chiuso di default, apri/chiudi tutto. Dati intatti.
- [✓] **Revisione salva/apertura**: skill `salva` + step 4b (memorie durature + refresh
      grafo Graphify); `CLAUDE.md` apertura → puntatore a CONTROLLO. Build 0 errori TS.
- [✓] **RETE riparata + integrata Graphify** (la tua idea del RAG-Wiki/grafo): era rotta
      (500, due processi API sulla 5001 → indice stale; risolto col restart). Ora ha un
      **interruttore sorgente**: "Conoscenza" (grafo RAG, archi = coseno reale) ↔ "Sistema"
      (grafo Graphify, 5966 nodi/6317 archi/696 community, layout 3D per community). Nuovo
      endpoint `/api/graph/graphify` (stessa forma di /api/rag/vectors → motore 3D invariato).
      Endpoint RAG blindato (niente più 500 nudo: cache invalidata + messaggio azionabile).
      ⚠ il toggle "Sistema" va LIVE al prossimo restart API (carica l'endpoint nuovo).
- [◐] **MAPPA → base Avventura**: riusare il drill-down a N-livelli come mondo dove Nina
      si muove tra le tappe (Loop→…→Agenti). [deciso con Matteo]
  - [✓] **Bozza mappa multi-livello** scritta: `CONTENT_ENGINE/DATABASE/MONDO/MAPPA_AVVENTURA.md`
        — Mondo → 7 Regioni (l'arco IA) → episodi/semi tecnici → 3 strati + grafo Pietre.
        Ancorata al canone + materiale reale (ogni regione ha 9-25 episodi-fonte). Pronta
        ad albero per diventare i dati di una vista MAPPA navigabile.
  - [✓] **EP_AV_01 scritto** (definitivo): "L'Incantesimo che si Ripete" (l'Automazione,
        Regione 2) — Nina capisce che un gesto insegnato una volta si ripete da solo
        (watcher/notturne), open loop → l'LLM. Importato (123 ep, AV=2, 0 orfani).
  - [✓] **VISTA "Mappa dell'Avventura" costruita** (`AvventuraMapView.tsx` + `avventuraMapData.ts`):
        accordion a livelli — Mondo (luoghi/cast) → 7 Regioni → concetto/vero/pezzo reale/episodi/
        semi/Pietre. Additiva (non tocca la MAPPA sistema). Build verde (0 TS, vite ok).
  - [✓] **Avventura → NINA sotto STORIE** (09/06): la sotto-voce "Avventura" è diventata
        **NINA** e apre la **Mappa dell'Avventura** (è il posto giusto, non più nascosta in
        CONTROLLO). Mappa = hub: header con le due Terre (Atomi↔Bit) + "tutti gli episodi";
        episodi scritti cliccabili → reader. [richiesta Matteo: "troppo bella per stare là"]
  - [✓] **EP_AV_02 scritto** (definitivo): "La Mente che Parla" (l'LLM, Regione 3) — Nina
        scopre l'allucinazione (bugia con la faccia sicura) + il cervello ibrido (Claude/Qwen),
        open loop → RAG. Mini-arco Loop→Automazione→LLM completo. (AV=3, 0 orfani, build verde)
  - [ ] Scrivere gli episodi mancanti (Regioni 4-7: RAG, Wiki, Agenti, Orchestrazione).
  - [✓] **Incoerenza ⟡ RISOLTA** (09/06): convenzione a canone (PERCORSO_EVOLUTIVO §2) —
        `⟡1`–`⟡7` = le 7 tappe dell'arco; le forze fuori-arco usano una lettera → `⟡E`=l'Entropia.
        Aggiornati EP_AV_00 (⟡2→⟡E), EP_AV_01 (⟡2 Automazione), EP_AV_02 (⟡3 LLM) + MAPPA.
- [✓] **Nomi sidebar sistemati** (09/06): `AUTOMAZ.`→`AUTOMAZIONI` · `RETE`→`GRAFO`
      (ora è il grafo RAG+Wiki; CommandBar allineato, "rete" resta keyword). `MAPPA` tenuto
      (chiaro, evita la collisione con "Bussola" di CRITICHE).
- [ ] Altre viste da ripulire una a una (estetica/nomi) — dopo STORIE/CONTROLLO/RETE.
- [💡] STORIA: il Centro di Controllo + RAG→Wiki sono materiale episodio (sistema che si
      rende leggibile da solo).

### [◐] VERIFICA TOTALE (prima delle automazioni)
- [✓] **Git**: `origin/main` allineato (0↔0). Tutto il lavoro reale committato+pushato.
      Modifiche non committate = SOLO auto-generate (TOC skill, `DATA/views` rigenerati,
      `STATE.json`, changelog). Nessun lavoro umano in sospeso.
- [✓] **Cartelle (check in toto)**: 20 dir top-level, struttura coerente — AUTOMATIONS 59,
      NODES 67, CONTENT_ENGINE 131, BRAIN 39, DOCS 5, SERVICES 5, CORE 3.
- [✓] **CLAUDE.md AGGIORNATO** (07/06) — v4.1.0: header + FILESYSTEM (struttura PIATTA
      `C:\Users\teo\TITANIUM_OS`) + tabella + `SETUP MACCHINA` con path REALI verificati
      (Python AppData, Node/gh Program Files, TI_ROOT/PYTHONPATH/MENTE_DIR). Getac→fisso, benen→teo.
- [ ] **Path hardcoded `C:\Users\benen`** ⚠ (viola regola "MAI hardcode") in 6 file:
      `AUTOMATIONS/tools/{FIX_ADMIN_TASKS.bat, fix_tasks_admin.ps1, optimize_windows_admin.bat,
      SETUP_ADMIN_COMPLETE.ps1, set_tasks_hl.ps1}` + `migrate_to_new_pc.ps1`. De-hardcodare
      via `_ti_paths.bat`. NB: le notturne girano comunque (TI_NightAudit @03:52 OK) → i task
      attivi usano già il resolver portabile; questi script tools/ sono legacy.

### [◐] GRAPHIFY — livello WIKI dell'arco macro (RAG→Wiki)
- [✓] **GRAPHIFY IN PRODUZIONE** (07/06). Installato isolato (uv tool, MIT, gratis) +
      skill `/graphify` in Claude Code. **Grafo del repo: 515 file → 5966 nodi · 6317
      archi · 696 community in 13.2s**, 100% locale, zero API. Query verificata:
      `graphify query "RAG..."` ritorna all'istante `rag_engine.py:search()`,
      `rag_graph.py:build_graph()` con riga+community — *senza rileggere i file*
      (= il beneficio "zero token sprecati"). Output gitignored (`graphify-out/`).
- [✓] PoC: code-graph perfetto/istantaneo. Doc-graph via qwen-7B locale = scarso
      (il 7B torna prosa non-JSON, 11 nodi/4 doc in 5 min) → estrattore MENTE rinviato.
- [✓] DECISO: estrattore MENTE = **ibrido per sensibilità** (cloud per doc NON
      sensibili / locale-o-code-graph per i segreti V32-BOM/MIMS). NB: BRAIN/+CORE/
      sono già nel repo pubblico → nessun segreto, lì si può usare il cloud liberamente.
- [ ] Prossimo Graphify: (a) grafo semantico di BRAIN/ via skill in-sessione (modello
      dell'IDE, no chiave); (b) refresh automatico (`graphify watch`/`update`) come nodo;
      (c) valutare Graphify come backend reale della vista RETE.
- [💡] STORIA: `RAG→Wiki` è uno stadio dell'arco macro Nina → candidato episodio
      AV + milestone "spettacolare" su GitHub (richiesta Matteo).
- [ ] Fari di ricerca (NON ora): Anthropic "When AI builds itself" (RSI = regola #5
      in piccolo); RecursiveMAS (Stanford+NVIDIA, latente, −34÷75% token).

### [◐] AI NEWS WATCHER + lista creator (dalla chat desktop)
- [✓] Brief catturato in `BRAIN/AI_NEWS_WATCHER_BRIEF.md` (30+ creator con handle GitHub,
      logica tier 48h/settimanale/sospesi + rotazione, sorgenti, decisioni implementative).
- [✓] **WATCHER v1 KEYLESS COSTRUITO+TESTATO**: `NODES/AI_NEWS_WATCHER/watcher.py` + launcher
      `AUTOMATIONS/core/night_ai_watch.bat`. 4 sorgenti, ZERO chiavi: GitHub (gh: eventi
      utenti + topic claude-code/ai-agents), siti RSS, YouTube RSS (@handle→channel_id con
      cookie consenso). Verificato: 67+30 segnali reali (es. "Uber Caps Usage of AI Tools
      Like Claude Code"). Tier+rotazione con guard anti-falsa-retrocessione. Stato gitignored.
- [ ] Schedulare `night_ai_watch.bat` ogni 48h (Task Scheduler, richiede UAC) — prossimo step.
- [ ] Upgrade con 1 chiave Google: YouTube Data v3 (stats) + Gemini (grafo MENTE/ cloud).
- [ ] Instagram: rimandato (no API) — recuperare servizio terzo. `Anthropic News` non ha RSS.
- [ ] Opzionale: vista dashboard criticità + far sfociare i segnali utili in STATE/RAG.

---

## Sessione #32-33 · 06-07/06/2026

### [✓] FATTO
- [✓] P1a AUTOMAZ → view a stato operativo reale (persistente/event/scheduled/
      on-demand/dormiente) + badge live da `/api/watchdog/status` e
      `/api/tasks/notturne`. Scoperta: i ~14 file "(da creare)" esistevano già
      → "dormienti". (commit 5f148a7, b70b4e2)
- [✓] Leva LLM locale ACCESA: Ollama + Qwen2.5-7B sulla GPU (model_ready=true).
- [✓] P2 binario AVVENTURA: `BIBBIA_DEL_MONDO.md` + pilota `EP_AV_00` "La Bambina
      e la Giuntura" (Nina + THEMIS vs l'Entropia), in posizione definitiva.
      (commit 8979d14, bc9a86b)
- [✓] Sotto-voce "Avventura" nella sidebar sotto STORIE (rosa). (commit 95eb5fb)
- [✓] Anomalia TI_NightAudit risolta (gira @03:52 OK).
- [✓] Notte autonoma: story_agent 3 episodi + night_audit + push su GitHub.
- [✓] Decisione: l'Avventura RESTA sotto-voce (NON diventa front-page). [Matteo]
- [✓] Bussola standardizzata: questo file, letto a inizio sessione.
- [✓] UNITO bussola ↔ CRITICHE: il night_audit legge questa bussola, emette
      bussola_todos.json e la mostra come ramo "📋 Bussola" nella vista CRITICHE;
      i todo aperti vanno anche a Sonnet come contesto (area ROADMAP). Endpoint
      /api/bussola/todos. Si rigenera ogni notte. [richiesta Matteo 07/06 — FATTO]
      ⚠ va LIVE al riavvio di api_server (restart_api.ps1) o al prossimo login.
- [✓] Skill "salva" creata (.claude/skills/salva): chiusura sessione standardizzata
      (bussola+mirror, STATE, RIAVVIO, verifiche storie/build, commit+push).
- [✓] Processo episodi Nina DEFINITO (bibbia sez. 9): la fonte è il canone tecnico
      (1 concetto reale → 1 avventura); pipeline 2 stadi: auto estrae "concept brief",
      Claude scrive l'episodio DEFINITIVO (no bozze).
- [✓] Verificato 07/06: storie 0 orfani (120 in dashboard, 111 .md), GitHub allineato.
- [✓] FIX avvio sessione: CLAUDE_CODE.bat (lanciato dal collegamento Desktop
      "Claude Code [TI]") ora legge DA_FARE_FATTO.md + RIAVVIO_SESSIONE.txt +
      BRAIN/STATE.json (prima leggeva solo RIAVVIO+STATE, non la bussola).
- [✓] PERCORSO EVOLUTIVO a canone (PERCORSO_EVOLUTIVO.md): spirale + ripetizione
      spaziata + dual coding + sistema "Pietre" (i numerini di rimando) + 3 strati
      (bambino/curioso/esperto-papà-fabbro) + standard immagini per animazione.
      Pilota EP_AV_00 marcato con Pietre ⟡1 Grande Loop, ⟡2 Entropia.
- [✓] ARCO MACRO = "la storia dell'IA": spina dorsale Loop→Automazione→LLM→RAG→Wiki→
      Agenti→Orchestrazione (stile Simone Rizzo), ogni tappa ancorata a un pezzo REALE
      del progetto OS. VISIONE a canone (bibbia): libro di storia dell'IA per il bambino
      del 2024, sul progetto reale, dà valore a chi lo usa, predisposto ai ricavi (spenti).

### [ ] DA FARE (prossimo — in ordine di priorità)
- [ ] **#1 AUTOMATIZZARE LE STORIE DI NINA** (candidato primo punto prossima sessione):
      passo auto che estrae i "concept brief" dai nuovi episodi tecnici e li mette in
      coda; poi Claude scrive l'episodio definitivo dal brief. Pipeline a 2 stadi
      (bibbia sez. 9). L'auto PREPARA, la scrittura resta di qualità.
- [ ] **#2 EP_AV_01 "l'Automazione"** — tappa 2 dell'arco (poi LLM→RAG→Wiki→Agenti).
      Deve seguire PERCORSO_EVOLUTIVO.md: Pietre nuove/richiamate + 3 strati + key-image.
- [ ] **#2b indice PIETRE.md** (mappa concetto→episodio→richiami) + descrizione key-image
      di ogni Pietra (anche solo a parole finché l'animazione è spenta).
- [ ] **#3 RINOMINI dashboard** [richiesta Matteo 07/06]: MAPPA → **BUSSOLA**,
      RETE → **RAG**. ⚠ COLLISIONE NOME: oggi "Bussola" è già il ramo todo in CRITICHE.
      Da risolvere: il ramo todo si chiama "SCALETTA"/"ROTTA" (file resta DA_FARE_FATTO.md)
      e MAPPA prende "BUSSOLA". → CONFERMA Matteo prima di implementare.
- [ ] #4 Critiche = quest · MAPPA(→Bussola) = mondo (collegare avventura ai dati reali).
- [ ] #5 Cablare MiniMax M3 nel toggle chat (serve key OpenRouter → `_VAULT/KEYS`).
- [ ] #6 P1c: livelli (lv) che salgono da progressi reali.

### [💡] IDEE / NOTE
- [💡] La bussola può diventare un input del session_orienter / daily_brief, così
      anche le automazioni "sanno dove siamo", non solo io.
- [💡] "Concept brief" come tabella in dashboard: la coda dei concetti-tecnici pronti
      a diventare avventure di Nina (visibilità del processo).
