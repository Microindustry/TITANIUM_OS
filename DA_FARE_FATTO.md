<!-- TOC -->

- [DA FARE / COSA HO FATTO  la BUSSOLA viva di TITANIUM_OS](#da-fare-cosa-ho-fatto-la-bussola-viva-di-titaniumos)
  - [Sessione 36  10/06/2026  STORIE risanate  4 semi tecnici](#sessione-36-10062026-storie-risanate-4-semi-tecnici)
    - [STORIE  diagnosi completa del sistema (oltre al content gap)](#storie-diagnosi-completa-del-sistema-oltre-al-content-gap)
    - [Build potenziato (radice del problema metadati)](#build-potenziato-radice-del-problema-metadati)
    - [4 SEMI TECNICI scritti a mano (stagione ST, con REEL_HOOK)  il content gap chiuso](#4-semi-tecnici-scritti-a-mano-stagione-st-con-reelhook-il-content-gap-chiuso)
    - [Igiene episodes.json (additiva, nulla cancellato)](#igiene-episodesjson-additiva-nulla-cancellato)
    - [RIFARE LE STORIE  N-LIVELLI SUI CONTENUTI (il lavoro vero della sessione interrotta)](#rifare-le-storie-n-livelli-sui-contenuti-il-lavoro-vero-della-sessione-interrotta)
    - [parcheggio NINA RAG/Wiki (EP_AV_03/04)  scritti ma PREMATURI (Nina viene dopo)](#parcheggio-nina-ragwiki-epav0304-scritti-ma-prematuri-nina-viene-dopo)
  - [Sessione 35  10/06/2026](#sessione-35-10062026)
    - [STORIE  episodi reali del lavoro recente (FATTO in 36)](#storie-episodi-reali-del-lavoro-recente-fatto-in-36)
    - [NINA  PRODOTTO (derivazione educativa di MIMS)  visione 09/06, catturata](#nina-prodotto-derivazione-educativa-di-mims-visione-0906-catturata)
    - [SELF_IMPROVE  agente autonomo notturno (NODO, DOPO gli episodi) idea Matteo 10/06](#selfimprove-agente-autonomo-notturno-nodo-dopo-gli-episodi-idea-matteo-1006)
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
- Canonica = QUESTO file (repo, versionato). Il Desktop `da fare e cosa ho fatto.txt`
  è un **mirror PURO auto-aggiornato** (copia identica di questo file, scritta da
  `AUTOMATIONS/core/sync_dashboard.py` a fine sessione via hook Stop). Non si edita a mano.
- Il PIANO completo (visione, punti P0-P8) vive **solo** in `PROSSIMA_SESSIONE.md`
  (consolidato il 09/06; vecchia copia Desktop archiviata in `DOCS/_archivio_piano_desktop_20260609.txt`).
  Qui sta la scaletta operativa, non tutto il piano.

---

## Sessione #36 · 10/06/2026 — STORIE risanate + 4 semi tecnici

### [✓] STORIE — diagnosi completa del sistema (oltre al content gap)
- [✓] Sistema sano sul plumbing: 125 ep, 0 orfani, 0 mojibake reale (il `�` era solo
      il terminale cp1252 che non rende `—`/`→`; dati UTF-8 puliti), pipeline ok.
- [✓] 3 problemi reali trovati: (1) content gap sui 4 lavori recenti, (2) 13 recap con
      titolo-serie generico + 0 tag/sottotitolo, (3) data futura EP_S2_01 (2026-07-01).

### [✓] Build potenziato (radice del problema metadati)
- [✓] `build_episodes_json.py`: ora legge **frontmatter YAML** e lo **toglie dal contenuto**
      → ogni `.md` scritto a mano entra ricco (tag/sottotitolo) E renderizza pulito. Additivo.

### [✓] 4 SEMI TECNICI scritti a mano (stagione ST, con REEL_HOOK) — il content gap chiuso
- [✓] Graphify/RAG→Wiki (`EP_SEED_GRAPHIFY`) · RETE-grafo (`EP_SEED_RETE`) ·
      AI News Watcher (`EP_SEED_WATCHER`) · Centro di Controllo (`EP_SEED_CONTROLLO`).
- [✓] File rinominati `EP_SEED_*` per evitare collisione `derive_id_from_name` con date esistenti.
- [✓] Decisione presa (Matteo): scrittura a mano in S2_SISTEMA, non pipeline.

### [✓] Igiene episodes.json (additiva, nulla cancellato)
- [✓] 13 recap: promosso il **titolo reale** nascosto (`## "..."`) a `title`, serie→sottotitolo,
      tag derivati dal contenuto (`enrich_recap_episodes.py`).
- [✓] Data futura clampata a oggi. Stato finale: 129 ep · 0 titoli generici · 0 date future · 0 senza tag.
- [✓] Build TS dashboard verde (exit 0).

### [◐] RIFARE LE STORIE — N-LIVELLI SUI CONTENUTI (il lavoro vero della sessione interrotta)
> Correzione rotta: Matteo → "non Nina adesso, stavamo RIFACENDO LE STORIE, ottimizzato,
> cercando librerie GitHub". **Nina viene DOPO** e si baserà su queste storie (devono essere
> dettagliate). Pattern chiave: *lo stesso N-livelli del skill-tree, ma sui CONTENUTI*.
- [✓] Diagnosi: `episodes.json` era una **lista PIATTA** → impossibile appendere approfondimenti.
- [✓] Ricerca librerie: scartati framework pesanti (Astro/Contentlayer = riscrivere la dashboard,
      viola "additivo"). Adottato il modello **GitHub-Docs** (gerarchia via frontmatter), in-stack.
- [✓] `build_episodes_json.py`: legge `parent`/`level` dal frontmatter + `build_tree()` calcola
      `children[]` e il `level` dalla catena (anti-ciclo). Additivo: i 132 ep piatti restano LV0.
- [✓] Tipo TS `Episode` esteso (parent_id/level/children opzionali) — retrocompatibile.
- [✓] `StorieView` card **RICORSIVA**: un episodio con figli mostra gli approfondimenti annidati
      e indentati (profondità libera); le stagioni elencano solo i LV0 (no figli come fratelli).
- [✓] PROVA su contenuto vero: `EP_SEED_GRAPHIFY_L1_COMMUNITY` (community detection) agganciato a
      `EP_SEED_GRAPHIFY` → padre `children:[…]`, figlio `parent/level:1`. 133 ep · tsc exit 0.
- [✓] **Graphify completato a LV1** (4 approfondimenti, tutti agganciati a `EP_SEED_GRAPHIFY`):
      community detection · nodi-dio/centralità · query·path·explain · estrattore MENTE ibrido.
      136 ep · tsc exit 0. Voce 1ª persona · ~6 min · gancio Nina in coda a ognuno · LV illimitati.
- [✓] **MAPPA di Nina rifatta percorribile a LV** (indicazioni Matteo): `AvventuraMapView` ora è
      drill-down + briciole + "torna su"; verticali **Tech (7 Regioni)** + **Finanza (predisposto)**;
      profondità presa dall'**albero vero degli episodi** → si aggiorna da sola man mano che creo.
      Rinominata "Mappa Avventura" → **"Mappa"**; mappa di sistema → **"ARCHITETTURA"** (no collisione).
      LV **senza limite** + guardia anti-ciclo. Titolo "Mappa di Nina · le avventure".
- [✓] **Tutti e 4 i semi completi a LV1** (13 approfondimenti totali, build verde, 145 ep):
      · GRAPHIFY (4): community · nodi-dio · query/path/explain · estrattore MENTE ibrido
      · RETE (3): t-SNE 3D · toggle 2 sorgenti (stessa forma) · bug-di-stato (2 server + indice stale)
      · WATCHER (3): keyless (gh/RSS/YouTube) · tier 48h+rotazione · gate rilevanza (min-rel)
      · CONTROLLO (3): stato-live (vs promessa) · scaffolding cognitivo · cedibilità
      Ognuno ha "aggancio Nina" in coda → sono la fonte dettagliata su cui Nina poggerà.
- [✓] **LV2** fatti sui punti ricchi: modularità (sotto community) · t-SNE vs UMAP (sotto t-SNE) ·
      cammini/BFS (sotto query). Max profondità 2, build verde.

### [◐] NOTTE AUTONOMA #36b · 10/06 — allineato i N-livelli al tuo blueprint a 2 ASSI
> Trovato `CONTENT_ENGINE/DATABASE/STORIE_STRUTTURA_2ASSI.md` (spike 10/06): è il VERO "rifare le
> storie" — 2 assi (RUOLO=diario · NINA=percorso educativo), un FILONE "Dal metallo alla mente"
> (4 atti da ⟡0 LA MATERIA), libreria **NCP (Narrative Context Protocol, MIT)**, requisito
> `## FATTI (per il RAG)`. I miei N-livelli ci si incastrano: l'approfondimento = un giro di spirale.
- [✓] **2 assi rebuild-safe nel builder** (`apply_narrativa`): asse_ruolo (da stagione) su tutti i
      148 ep + asse_nina sui concetti (NINA_SEED) ereditato ai figli con giro_spirale +1. Lo spike
      scriveva nel json e si perdeva al rebuild → ora si ricalcola sempre. Tipo TS `narrativa` opz.
- [✓] asse_nina su 36 ep (i 4 semi + EP_AV_* + fonti tecniche dell'arco + loro approfondimenti).
- [✓] Recuperati i file spike non committati (canone 2assi, remap_pilot, enrich_recap, EP_FILONE_00).
- [✓] **Mappa data-driven da asse_nina**: Regioni ⟡0-⟡7 si popolano da sole (fonte+Nina, giro di spirale), approfondimenti annidati. Cresce da sola.
- [✓] **`## FATTI (per il RAG)`** sui 4 semi + riflusso in `MICROINDUSTRY/MENTE/KNOWLEDGE/genesis_nodi_fatti.md` (serve `rag-update` per indicizzare).
- [✓] **Aggiornamenti automatici compatibili**: story_agent rebuilda via build_episodes_json → gli AUTO prendono asse_ruolo + tree da soli. Nessun fix necessario.
- [✓] **3 LV2** (modularità, t-SNE↔UMAP, cammini/BFS) + **indice PIETRE.md** auto-generato (8/8 Pietre posate, 38 ep indicizzati).
- [✓] **ARCO NINA COMPLETO ⟡1→⟡7**: scritti `EP_AV_05` (Agenti) + `EP_AV_06` (Direttore/Orchestrazione, chiude l'arco e apre il senso-prodotto "tramandare").
- [ ] **DA DECIDERE con Matteo (NINA):** il Nina **⟡0 LA MATERIA** (prequel "dal metallo") riapre l'opening di `EP_AV_00` → scelta tua. Poi: Nina "lunghissima" multi-giro + il filo "Nina ha il suo OS/agente che si perde come me" (visione 10/06, da mettere a canone).
- [ ] **DA DECIDERE:** scalare asse_nina ai 129 (ora 38, solo concetti) · viste 2 assi in dashboard (timeline RUOLO) · `EP_AV_03/04` (parcheggiati) ora combaciano con l'arco: togliere il "parcheggio"?
- Stato notte: **150 ep · 16 approfondimenti (LV1-2) · arco Nina 7/7 (manca ⟡0) · build verde · 8 commit isolati su main (NO push)**.

### [✗→parcheggio] NINA RAG/Wiki (EP_AV_03/04) — scritti ma PREMATURI (Nina viene dopo)
- [✓] `EP_AV_03` Biblioteca delle Fonti (RAG) · `EP_AV_04` Grande Mappa (Wiki) scritti definitivi.
- [✗] Fuori sequenza: Matteo ha chiarito che Nina viene DOPO le STORIE rifatte. **Non cancellati**
      (additivo): restano come riferimento/stile per quando si riprende Nina (racconto lungo a livelli).

---

## Sessione #35 · 10/06/2026

### [✓] STORIE — episodi reali del lavoro recente (FATTO in #36)
- [✓] Diagnosi (09/06): 124 episodi ma quasi tutti AUTO/recap; il lavoro grosso recente
      ha **0 episodi** → graphify=0, watcher=0, wiki=0, controllo=0. AV (Nina) solo 3.
- [✓] **Creati i "semi" tecnici mancanti** (= materiale-fonte che poi nutre Nina):
      Graphify/RAG→Wiki · RETE-grafo · AI News Watcher · Centro di Controllo. Sorgenti in
      `CONTENT_ENGINE/DATABASE/episodes/` (S2_SISTEMA/SA_AUTO) → `scripts/build_episodes_json.py`.
- [✓] Deciso all'avvio: scrittura a mano (no pipeline `milestone_to_episode`).

### [💡] NINA = PRODOTTO (derivazione educativa di MIMS) — visione 09/06, catturata
- [✓] Canone aggiornato: `BIBBIA_DEL_MONDO.md` **§0-bis** + memoria durevole. Nina = versione
      educativa introduttiva di **MIMS**, scaletta/changelog-driven (la persona curiosa che
      *sbaglia→sistema→aggiorna*), scope > arco IA (anche "cos'è un ambiente Python") + verticale **finanza**.
- [ ] **Nina probabilmente da RIFARE DA ZERO**: impronta EP_AV_00/01/02 validata come STILE,
      ma struttura da agganciare alla scaletta reale. **Dopo** gli episodi reali.

### [ ] SELF_IMPROVE — agente autonomo notturno (NODO, DOPO gli episodi) [idea Matteo 10/06]
- **Cosa**: una sessione che si apre da sola, interroga il sistema, identifica errori/migliorie,
  **propone** le fix. Non parte da zero: estende `night_audit.py` (@03:52, Sonnet → cartella clinica).
- **Guardrail non negoziabile** (regola "additivo, mai cancella-e-rifai"): **read-only + propone
  su branch/PR, MAI merge automatico su `main`**. Tu approvi al mattino. Versioni, non verità.
- **Modelli**: Sonnet/Haiku per scansionare la notte, **Opus solo sulle decisioni** (regola lavoro continuo).
- [ ] Da costruire come nodo dopo le STORIE. [posizione in scaletta: dopo gli episodi, prima di scalare Nina]

---

## Sessione #34 · 07/06/2026

### [◐] INTERFACCIA — anti-sovraccarico ("troppi strumenti, non so gestire")
- [✓] **Vista PROCEDIMENTI** (09/06, richiesta Matteo "voglio consultarlo"): cliccando lo
      stato **"API live"** (footer sidebar) si apre una pagina che spiega — in italiano semplice —
      come gira il sistema: (1) apertura sessione, (2) il profilo, (3) aggiornamenti automatici
      a fine sessione, (4) notturne + **cosa otteniamo**. `ProcedimentiView.tsx`. Build verde.
- [✓] **Apertura sessione verificata** (09/06): collegamento Desktop "Claude Code [TI]" →
      `CLAUDE_CODE.bat` (risolve claude.exe v2.1.165 + prompt "Leggi DA_FARE_FATTO+RIAVVIO+STATE").
      "TITANIUM_OS [PS]" → PowerShell in TI_ROOT col profilo. Fix: commento `--continue` fuorviante
      nel bat corretto (apre sessione fresca by design). **Profilo PS de-hardcodato** ($env:USERPROFILE/
      LOCALAPPDATA/APPDATA, a prova di migrazione) + `.local\bin` nel PATH (graphify) — backup `.bak_20260609`.
      ⚠ Il profilo PS sta in Documents (non in git): valutare copia di riferimento nel repo per la prossima migrazione.
- [✓] **AGGIORNAMENTI AUTOMATIZZATI** (09/06, richiesta Matteo): `AUTOMATIONS/core/sync_dashboard.py`
      — rebuild STORIE (episodes.json) + refresh CRITICHE (bussola_todos) **solo se cambiano**
      (gate su mtime/hash, near-istantaneo). Agganciato all'**hook Stop** esistente
      (`generate_restart_prompt.bat`) → gira da solo a fine sessione. Già automatici prima:
      RIAVVIO (hook Stop), episodes nel story_agent notturno, bussola_todos nel night_audit @03:52.
- [✓] **Mirror Desktop PURO** (09/06, scelta B): il Desktop `da fare e cosa ho fatto.txt` è ora
      una copia identica auto-aggiornata di questo file (sync_dashboard → hook Stop). Il PIANO (P0-P8)
      vive **solo** in `PROSSIMA_SESSIONE.md`; vecchia copia Desktop archiviata in `DOCS/_archivio_piano_desktop_20260609.txt` (perdita zero).
- [✓] **STORIE → 2 sotto-voci** (09/06): sotto STORIE ora ci sono **NINA** (→ episodi, stagione AV)
      e **Mappa Avventura** (→ la mappa, indentata sotto Nina). [richiesta Matteo]
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
- [✓] **SISTEMA VERIFICA (09/06, sessione #35)**: check reale eseguito.
      Git pulito (origin/main 0↔0, solo `watchdog_status.json` auto-gen). Build TS dashboard
      **0 errori** (`tsc --noEmit`). RAG GPU CLI risponde corretto (Config G). API 5001 ✓ ·
      Dashboard 5173 ✓ · **n8n 5678 ✓** (`/healthz`={"status":"ok"}). **n8n installato GLOBALE**
      (`npm i -g n8n` → 2.25.6, binario `%AppData%\npm\n8n.cmd`): da ora `n8n start` parte
      subito senza reinstall npx. **[✓] avvio-al-login riagganciato** (09/06): `START_LOGIN.bat`
      step 4 ora usa `%N8N% start` (binario globale) con fallback a npx se assente — prima
      reinstallava ~4min a ogni login, ora parte in secondi. **RETE riparata
      live**: `/api/graph/graphify` e `/api/rag/vectors` davano 404/500 perché l'API girava
      il codice pre-notte → eseguito `restart_api.ps1` → entrambi **HTTP 200** (toggle
      Conoscenza/Sistema ora operativo). Resta aperto: path hardcoded `benen` in 6 file tools/ legacy.
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
