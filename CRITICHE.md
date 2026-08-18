<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  17/08/2026 23:47](#il-polso-17082026-2347)
  - [CANONE MANUALE  per progetto](#canone-manuale-per-progetto)
    - [V32 CNC (2 da fare / 7)](#v32-cnc-2-da-fare-7)
    - [MIMS (7 da fare / 10)](#mims-7-da-fare-10)
    - [GENESIS / Dashboard (2 da fare / 12)](#genesis-dashboard-2-da-fare-12)
    - [Vita Natura (0 da fare / 3)](#vita-natura-0-da-fare-3)
    - [Identity (0 da fare / 3)](#identity-0-da-fare-3)
    - [Sistema (trasversale) (1 da fare / 5)](#sistema-trasversale-1-da-fare-5)
    - [Audit Trimestrale  Cosa Rimuovere (1 da fare / 5)](#audit-trimestrale-cosa-rimuovere-1-da-fare-5)
    - [Audit Opus  Dati live (1 da fare / 20)](#audit-opus-dati-live-1-da-fare-20)
    - [Audit 15/06  Opus (0 da fare / 6)](#audit-1506-opus-0-da-fare-6)
    - [Attacco Opus  17/06 (6 da fare / 9)](#attacco-opus-1706-6-da-fare-9)
  - [AUTO-AUDIT  aperte (cartella clinica notturna)](#auto-audit-aperte-cartella-clinica-notturna)

<!-- /TOC -->

# CRITICHE — la cartella clinica di TITANIUM_OS

*Vista FILE delle critiche (la vista dashboard è stata eliminata il 07/07/2026 su*
*decisione di Matteo). Fonti di verità = `DATA/audit/critiche_manuali.json` (canone)*
*+ `DATA/audit/critiche_auto.json` (self-audit notturno). Questo file si RIGENERA*
*(night_audit, ogni notte): NON editarlo a mano — per cambiare stato di' a Claude*
*o edita il JSON. La terza fonte (bussola) vive già in `DA_FARE_FATTO.md`.*

Stati: `[ ]` attiva · `[◐]` bloccata · `[💡]` futura (idea/dopo) · `[✓]` risolta

## IL POLSO — 17/08/2026 23:47

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 12 aperte / 267 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
- **Bussola**: i to-do vivono in `DA_FARE_FATTO.md` (non duplicati qui)

---

## CANONE MANUALE — per progetto

### V32 CNC (2 da fare / 7)
- [ ] **Fisico & Build** · Mandrino 2.2kW ER20 non ordinato
  - *BLOCKER CRITICO — senza mandrino V32 non funziona, VULCAN non parte, MIMS bloccato. Ordina entro questa settimana.*
- [◐] **Fisico & Build** · Gusset Z destra bloccato su sinistra
  - *Dipende dal completamento gusset sinistra. Non è un bug ma una dipendenza reale.*
- [💡] **Fisico & Build** · Verifica planarità dopo Config G
  - *Dopo rinforzi, ri-misurare basamento con comparatore. Target ±0.1mm.*
- [💡] **Fisico & Build** · Epoxy fill colonne — timing non definito
  - *Va fatto dopo saldatura finale, prima di montaggio assi. Mettere in checklist.*
- [💡] **Dati & Coerenza** · BEP 61 ore — aggiornato dopo Config G?
  - *Il BEP è calcolato su configurazione precedente. Rivalutare dopo completion.*
- [✓] **Fisico & Build** · Silent blocks v.A vs v.B — DECISO (v.B Ø18mm)
- [✓] **Dati & Coerenza** · pct V32 65% — verificato coerente ovunque

### MIMS (7 da fare / 10)
- [ ] **Prodotto** · Eco-Snap: €0.08 (V6) vs €0.30 (V7) — mai risolto
  - *Discrepanza +275% non chiarita da sessioni precedenti. Quale è il costo reale? Definire prima del GTM.*
- [ ] **Prodotto** · Fit Park dati base mancanti
  - *Dimensioni, attrezzi, costo kit non definiti. Rimuovere dalla roadmap o completare con dati reali.*
- [ ] **Prodotto** · Trade secrets: ricette non documentate in nessun posto sicuro
  - *Esistono solo in testa a Matteo. Scrivere in _VAULT con cifratura prima di avanzare.*
- [ ] **Business & GTM — (idea, non ancora)** · TAM €4.2B — fonte Grand View Research verificata?
  - *Citata ma mai linkato il report originale. Verificare che sia il mercato giusto (modular systems, non solo T-slot).*
- [ ] **Business & GTM — (idea, non ancora)** · Primo cliente MIMS: chi è?
  - *Il piano SEED parla di 10 beta. Identificare nome/profilo dei primi 3 prima di produrre.*
- [ ] **IP & Protezione** · B2 'dopo 100 pezzi venduti' — rischio prior art
  - *Se qualcuno brevetta la geometria 29.9mm nel frattempo, perdi tutto. Valutare provisional patent subito (costo ~€300).*
- [ ] **IP & Protezione** · Trade secrets non in _VAULT cifrato
  - *TS1-TS4 esistono solo in MENTE/MIMS/ (testo plain). Spostare in _VAULT/KEYS/ con cifratura.*
- [💡] **Prodotto** · MIMS-DMP: δ>0.05 — dato validato o stimato?
  - *Se è una stima, non usarlo come claim brevettuale. Serve test fisico con comparatore vibrazioni.*
- [💡] **Business & GTM — (idea, non ancora)** · SOM Y3 €300-450K — assunzioni di base?
  - *Non c'è un modello finanziario dietro. Costruire foglio di calcolo: unità × prezzo × canale.*
- [💡] **Business & GTM — (idea, non ancora)** · Competitor: nessuno Zero-tool modulare verificato?
  - *Blue ocean claim forte. Fare una ricerca su Kickstarter/Indiegogo prima di usarlo nel pitch.*

### GENESIS / Dashboard (2 da fare / 12)
- [ ] **UX / Interfaccia** · MappaView: label si sovrappongono con 6+ nodi
  - *Con 6 nodi (GENESIS) i testi si toccano. Aumentare R radiale o ridurre font.*
- [ ] **Infrastruttura** · n8n: 13 workflow non documentati
  - *AGGIORNATA 15/06: la contraddizione architetturale è RISOLTA — STATE conferma n8n self-hosted LOCALE (binario globale 2.25.6, localhost:5678, no cloud). Resta il gap doc: i 13 workflow non sono documentati da nessuna parte e AUTOMATIONS_MASTER.md è fermo (vedi au16). Esportare i 13 workflow in un...*
- [💡] **Codice** · CanvasLayout.tsx > 650 righe — monolite
  - *Ogni Room dovrebbe essere un file separato. Refactor quando si aggiunge la prossima sezione.*
- [💡] **UX / Interfaccia** · Sidebar 11 voci — affollamento cognitivo
  - *Per ADHD, meno è meglio. Valutare collasso EVA+IDENTITY in un gruppo, o hide dei meno usati.*
- [💡] **UX / Interfaccia** · CommandBar (Ctrl+K) non discoverable
  - *Nessun hint visibile nella UI. Aggiungere tooltip o hint nella sidebar.*
- [💡] **UX / Interfaccia** · NeuroOSLayout (neuro) e MappaView fanno cose simili
  - *Due topologie per lo stesso sistema. Valutare se neuro è ancora necessario o da rimuovere.*
- [✓] **Codice** · NodeTile/NodeLevel triplicato in 3 file
- [✓] **Codice** · Errori TS — verificato: nessuno
- [✓] **Codice** · Dati duplicati: SYSTEM_TREE in MappaView vs genesisData/mimsData
- [✓] **Codice** · GENESIS pct: TRE valori diversi nel codice
- [✓] **Infrastruttura** · RAG semantico a ZERO — RISOLTO (#40-44)
- [✓] **Infrastruttura** · RIAVVIO_SESSIONE.txt aggiornamento manuale

### Vita Natura (0 da fare / 3)
- [💡] Sito web Vita Natura: nessun progresso documentato
  - *Ogni sessione si menziona ma non si lavora. Decidere: priorità alta o rimuovere dalla roadmap attiva.*
- [💡] CRM prenotazioni — requisiti non scritti
  - *Prima di costruire il CRM, scrivere 5 user stories con Maria. Senza requisiti si costruisce due volte.*
- [✓] EVA WhatsApp — piattaforma REALE (#38)

### Identity (0 da fare / 3)
- [💡] Content Engine: quanti episodi pubblicati?
  - *La pipeline esiste ma non si sa se è stata usata. Contare episodi esistenti e pubblicati.*
- [💡] AVA avatar YouTube: nessuna azione concreta
  - *Da sessioni fa. Definire: quando? Cosa serve? O toglierla dalla roadmap attiva.*
- [✓] Pitch investitori — RISOLTO (#38)

### Sistema (trasversale) (1 da fare / 5)
- [ ] Nessun KPI misurabile settimana per settimana
  - *I % di completamento si aggiornano a mano senza criteri chiari. Definire: cosa significa +5%?*
- [💡] Backup _VAULT: AES-256 deep_freeze.py — ultimo run?
  - *Non c'è traccia dell'ultimo backup. Aggiungere timestamp in STATE.json: last_backup.*
- [💡] Capannone 2030: nessuna milestone intermedia con date
  - *L'obiettivo esiste ma non c'è un roadmap con checkpoint annuali. Aggiungere in STATE.json.*
- [💡] ADHD scaffolding: il sistema aiuta o complica?
  - *Ogni sessione si aggiungono cose. Fare un audit trimestrale: cosa NON uso? Rimuovere senza pietà.*
- [✓] Catena V32→VULCAN→MIMS — RIDIMENSIONATA

### Audit Trimestrale — Cosa Rimuovere (1 da fare / 5)
- [ ] Decidere insieme prima di togliere
  - *Questa lista è il PATTO: io segnalo, tu decidi, poi lo facciamo in un commit isolato. Nessuna sorpresa, niente lavoro perso.*
- [💡] View 'neuro' (NeuroOSLayout) — duplicato di MappaView
  - *Già fuori dalla sidebar (solo via Ctrl+K). Fa la stessa cosa di MappaView. Candidato #1 alla rimozione: meno confusione, una sola mappa. Recuperabile da git se serve.*
- [💡] View 'sinapsi' (LayersView) — legacy
  - *Terza topologia dello stesso sistema. Tieni MappaView, valuta di togliere questa. In git resta.*
- [💡] PILLARS_DATA + 8 export no-op in CanvasLayout
  - *Dead-code legacy (CellFocusStandalone & co). Si rimuove SOLO insieme a NeuroOSLayout che li importa. Un colpo solo, sicuro.*
- [💡] Sidebar 12 voci → troppe per ADHD
  - *Collassare il gruppo 'Sistema' a comparsa: a vista solo i 5 pilastri + HOME. Meno carico cognitivo, più presentabile.*

### Audit Opus — Dati live (1 da fare / 20)
- [ ] **Percentuali divergenti** · PILLARS_DATA legacy hardcoded in CanvasLayout
  - *PARZIALE: IDENTITY allineato 35→50. MA PILLARS_DATA è ancora importato da NeuroOSLayout (view legacy 'neuro') insieme a 8 export no-op (CellFocusStandalone & co.) → non cancellabile senza refactor di NeuroOSLayout. Vero fix: rimuovere la view 'neuro' (duplicato di MappaView, vedi gc09) e tutto il...*
- [💡] **STATE.json marcio** · meta.version '1.0.0' mentre il sistema è v6/v7
  - *STATE.meta.version='1.0.0' non significa nulla: App=v6.0, dashboard=v7, RAG=v5. Campo morto. O lo si allinea o si rimuove.*
- [✓] **STATE.json marcio** · STATE.blockers = [] vuoto → dashboard mostra 'zero blocker'
- [✓] **STATE.json marcio** · session_count = 6 ma sei alla sessione #15
- [✓] **STATE.json marcio** · active_milestone fermo a 'skillTreeData v3.0'
- [✓] **STATE.json marcio** · MIMS status 'waiting_press' non mappato nella UI
- [✓] **Percentuali divergenti** · GENESIS pct: 10 / 55 / 83 — tre numeri
- [✓] **Percentuali divergenti** · IDENTITY pct: 50 vs 35
- [✓] **Percentuali divergenti** · MIMS %: computato (NodeLevel) vs dichiarato (30)
- [✓] **Percentuali divergenti** · ROOT_NODE TITANIUM OS pct=60 inventato
- [✓] **Dati tecnici obsoleti** · MCP: data files dicono 5 tool — realtà 10 (v1.4)
- [✓] **Dati tecnici obsoleti** · NEXUS: 'done' in skillTree, 'future' in genesisData
- [✓] **Dati tecnici obsoleti** · RAG: mancava il layer grafo nei data file
- [✓] **Dati tecnici obsoleti** · React 18 scritto, React 19 installato
- [✓] **Dati tecnici obsoleti** · EVA: 4 status diversi nello stesso sistema
- [✓] **Documentazione divergente** · AUTOMATIONS_MASTER.md fermo al 2026-03-16
- [✓] **Documentazione divergente** · Scanner: doc diceva 'LA MIA MENTE/' (path morto)
- [✓] **Documentazione divergente** · VERSIONS: loop runaway changelog — 2 ROOT CAUSE fixate
- [✓] **Documentazione divergente** · STORIE: 11 episodi narrativi recuperati nella dashboard
- [✓] **Documentazione divergente** · Fonte unica di verità: nessuna. SYSTEM_TREE duplica i 3 data file

### Audit 15/06 — Opus (0 da fare / 6)
- [💡] Agenti-personaggio: teatro residuo nella vista AGENTI
  - *Gli agenti reali (story/research/audit/watcher/self_improve) girano. I 'personaggi' THEMIS/EVA/AVA/ARIA/NEXUS/TESLA/FORGE sono ancora dichiarati ma non operativi. O li si rende reali o si tolgono dalla vista: oggi è teatro che gonfia la percezione di capacità.*
- [✓] Chiavi API esfiltrabili NON ancora ruotate
- [✓] RAG semantico = 0 — RISOLTO (#40-44)
- [✓] critiche_auto rifira findings vecchi — RISOLTO (#38)
- [✓] Drift % pilastri (STATE ≠ dashboard) — RISOLTO con agente
- [✓] Nina v2 asse_nina/backfill — SUPERATO (#43-44)

### Attacco Opus — 17/06 (6 da fare / 9)
- [ ] Verità sparsa: i dati-pilastro vivono in 5+ posti (au18 VIVO)
  - *FRONTE DATI. Per cambiare lo stato di EVA ho dovuto editare 5 punti (genesisData ×2, MappaView ×2, + STATE). Finché non c'è UNA fonte, ogni verità si sdoppia e i pilastri ri-obsolescono da soli. AVANZATA 08/07 (sess #56): MappaView ×2 ELIMINATO — SYSTEM_TREE ora derivato da mappaData.ts (adapter ...*
- [ ] Il build di PRODUZIONE non completa (tsc -b / git push → OOM)
  - *FRONTE INFRA. `tsc --noEmit` è falso-verde; il gate vero `tsc -b` va in OOM (malloc 500MB) anche con RAM libera, e pure `git push` a volte. Conseguenza grave: non puoi fare `npm run build` né deployare la dashboard. Da indagare: bitness git, repo bloat (git gc), tetto memoria ambiente.*
- [ ] Chiavi API ancora NON ruotate (esposte, dimostrate)
  - *FRONTE SICUREZZA. Il fix /api/file è merged e live, ma le chiavi esfiltrate (ANTHROPIC/GITHUB via .env) restano compromesse finché non le RUOTI a mano. Azione tua, non rimandabile.*
- [ ] Pilastri FISICI fermi mentre il digitale sprinta
  - *FRONTE STRATEGIA. V32 (reddito vero) bloccato su mandrino ER20 + decisione silent blocks; MIMS al 30%. Decine di commit software, zero sul fronte fisico. Rischio: un sistema digitale bellissimo sopra un'officina ferma. La leva di reddito è lì, non nel codice.*
- [ ] asse_nina 59/182 + numeri pitch non verificati
  - *FRONTE CONTENUTO. asse_nina su 59/182 episodi (decisione 'scala' aperta → metadato parziale, ennesimo backfill in arrivo). Pitch: TAM €4.2B senza fonte, BOM vs €2250 incoerenti (già marcati provvisori). Da consolidare prima di un partner.*
- [ ] critiche_auto: il path a-regole genera rumore basso-segnale
  - *FRONTE META. Anche dopo il fix n03 (auto-close), la cartella clinica live mescola findings ricchi (Sonnet) e generici ('rilevato errore nelle ultime esecuzioni', regole). Proposta: usare il path-regole solo come ultima spiaggia e marcarlo a bassa severità.*
- [✓] EVA 'pending' mentre la piattaforma esiste — RISOLTO oggi
- [✓] RAG semantico = 0 — RISOLTO (#40-44)
- [✓] Lavoro UI verificato a vista — RISOLTO 17/06

---

## AUTO-AUDIT — aperte (cartella clinica notturna)

- [ ] **[alta · GENESIS]** Il canone si autoalimenta con falsi: la bussola del 2026-08-16 documenta che '_CANONE.md non è mai iniettato nel prompt' di nina_agent.py:188, il RAG viene interrogato sul concetto MIMS e restituisce il paper fuori tema in MENTE/KNOWLEDGE/RESEARCH/mims/, l'Architetto inventa 'MIMS (Machine-Induced Meaning Synthesis)' in EP_N2_64, e 'save_canon' specchia il risultato in MENTE — quindi il falso rientra nel RAG la notte stessa. Il log del 2026-08-16 conta 17 canon_violations attive. Con _CANONE.md fermo da 18 giorni (log: '_CANONE.md fermo da 18 giorni (soglia 14) mentre la serie si auto-genera ogni notte') il circolo si chiude senza freni.
  - *azione: Iniettare _CANONE.md nel prompt dell'Architetto (nina_agent.py:188) come step 1 del next_step già deciso. Poi correggere manualmente EP_N2_57/59/60/63/64 rimuovendo l'acronimo inventato e le fonti fabbricate (es. 'GENESIS/documentation_hallucination_2026' citata in bussola per EP_N2_64). Infine rimuovere o isolare il paper fuori tema da MENTE/KNOWLEDGE/RESEARCH/mims/ prima che venga re-indicizzato.*
- [ ] **[alta · RAG]** Il RAG conta 21.621 chunk contro i ~32.800 del 24/06: un calo di oltre 11.000 chunk (~34%) senza una causa documentata nei log. Finché non si sa se è un rebuild controllato o una perdita reale, il contesto iniettato a Nina è potenzialmente incompleto e i risultati di retrieve_context() sono inaffidabili.
  - *azione: Confrontare il manifest dell'ultimo snapshot RAG (rag_snapshots) con quello del 24/06 per identificare quali sorgenti sono sparite. Se è perdita, rieseguire l'ingestione dalle sorgenti mancanti; se è rebuild atteso, documentarlo nel canone così l'allarme non si ripete.*
- [ ] **[alta · RAG]** Il gate del canone è ambra: canon_violations = 26 e next_step dichiara esplicitamente "il gate è ambra fino al batch 3". Il log_issues (2026-08-17) conferma che canon_guard segnala ancora 22 righe sugli episodi vivi. Finché il batch 3 non viene eseguito, ogni nuova notte di generazione può produrre episodi che escono senza guardia attiva.
  - *azione: Portare Matteo alla decisione sul batch 3 (10 sicuri + 4 da giudicare + 2 da rigenerare) nella prossima sessione: preparare un riepilogo sintetico dei 4 episodi 'da giudicare' (03/05/48/56) con motivazione pro/contro correzione, così la decisione è a click e non a memoria.*
- [ ] **[alta · RAG]** La corruzione HNSW è ricorrente (3 volte in 2 giorni, segnalata nei blockers) e il suo effetto concreto è già visibile: 'limit=10 dà 0 embedding' — il RAG restituisce zero risultati su query legittime. Con snapshot fermo da 17.5 giorni (log 2026-08-16: 'snapshot RAG: ultimo output 17.5 giorni fa') non esiste checkpoint recente da cui ripristinare; ogni nuova corruzione resets tutto. L'UPS da 50-80€ è l'unica cura alla radice citata nei blockers, ma finché non è installato ogni power-loss rischia di riportare il sistema a zero.
  - *azione: Ordinare e installare l'UPS questa settimana (è già identificato e quotato nei blockers: '~50-80€ accanto a Vevor+ER20'). Nel frattempo eseguire 'rag_recover --drop-hnsw', poi forzare subito uno snapshot RAG manuale per avere un baseline ripristinabile prima della prossima notte automatica.*
- [ ] **[alta · SISTEMA]** Il log_issues riporta (2026-08-17): "canone manuale fermo da 40 giorni (>30) — 19 attive da riverificare" e "_CANONE.md fermo da 19 giorni (soglia 14) mentre la serie si auto-genera ogni notte". Con 301 episodi totali e 64 vivi, il canone manuale e il _CANONE.md sono la fonte di verità che Nina legge: se entrambi sono stantii, le regole che bloccano le invenzioni non riflettono lo stato reale del sistema.
  - *azione: Aprire critiche_manuali.json e riverificare le 19 critiche attive: chiudere quelle già risolte dalla bonifica #70, aggiornare quelle che cambiano stato. Poi aggiornare _CANONE.md (sezione fuori dai marker <!-- COLLEGATI -->) con le regole emerse dalla sessione #70 (fix pilastri, ban source hallucination, regola aggancio_reale).*
- [ ] **[alta · SISTEMA]** Cinque organi vitali sono fermi da 18-21 giorni, confermati dai log_issues con tipo 'organo silenzioso': "nina-loop: ultimo output 18.8 giorni fa (soglia 3)", "snapshot RAG: ultimo output 18.8 giorni fa (soglia 3)", "retention disco: ultimo output 18.8 giorni fa (soglia 3)", "AI news watcher: ultimo output 18.8 giorni fa (soglia 4)", "riflusso FATTI: ultimo output 20.9 giorni fa (soglia 7)" (2026-08-17). In parallelo l'API :5001 è giù (7 endpoint su 9 danno 500): il grounding di Nina regge solo sul fallback diretto, un singolo punto di cedimento.
  - *azione: Eseguire night_research.bat e verificare che tutti e cinque gli organi producano output stanotte. Contestualmente diagnosticare :5001 (log di avvio, import mancanti, variabili env) e riportarlo online prima della prossima sessione Nina.*
- [ ] **[alta · SISTEMA]** Zero commit negli ultimi 7 giorni (n_commits_7d: 0, commits_7d: []). La bussola del 2026-08-16 conferma che 'il loop Nina non committa mai (i commit auto: story_agent toccano solo S2_SISTEMA/)' e che EP_N2_62/63/64 non sono committati. Con il sistema che genera episodi ogni notte e l'HNSW che corrompe periodicamente, gli episodi Nina esistono solo su disco senza storia git: una corruzione o un reset li cancella senza recovery.
  - *azione: Aggiungere un commit automatico degli episodi Nina al termine del loop notturno (o come hook post-generazione). Come misura immediata: committare manualmente EP_N2_62/63/64 prima della prossima notte automatica.*
- [ ] **[alta · SISTEMA]** 6 organi vitali silenziosi da 17-19 giorni: i log del 2026-08-16 riportano esplicitamente 'nina-loop: ultimo output 17.5 giorni fa (soglia 3)', 'snapshot RAG: ultimo output 17.5 giorni fa (soglia 3)', 'inventario notturno: ultimo output 17.5 giorni fa (soglia 3)', 'retention disco: ultimo output 17.5 giorni fa (soglia 3)', 'AI news watcher: ultimo output 17.5 giorni fa (soglia 4)', 'riflusso FATTI: ultimo output 19.5 giorni fa (soglia 7)'. Non è un drift lento: tutti e sei hanno smesso lo stesso giorno (~29 luglio), suggerendo un evento sistemico singolo (probabile corruzone HNSW da power-loss segnalata nei blockers) che ha fermato l'intera pipeline notturna. Nel frattempo il RAG cresce cieco (21630 chunk, nessuno snapshot), Nina gira senza loop, il disco non viene ripulito.
  - *azione: Prima di qualsiasi fix software: eseguire 'rag_recover --drop-hnsw' (UAC Matteo, già schedulato) per riportare ChromaDB in stato coerente. Poi verificare il log del cron/scheduler intorno al 29/07 per identificare il trigger comune. Solo dopo riavviare i 6 organi uno per uno e confermare output nella notte successiva.*
- [ ] **[media · RICERCA]** Il log del 2026-08-16 segnala nei blockers 'API key Semantic Scholar gratuita in .env (SEMANTIC_SCHOLAR_API_KEY) — azzera i 429 della ricerca notturna'. Con AI news watcher silenzioso da 17.5 giorni (log: 'AI news watcher: ultimo output 17.5 giorni fa (soglia 4)') e la bussola che cita '81% delle chiamate a vuoto' per Semantic Scholar, la pipeline di ricerca notturna è di fatto cieca: non raccoglie segnale esterno, non alimenta il riflusso FATTI (fermo da 19.5 giorni), e il RAG non riceve aggiornamenti da fonti esterne.
  - *azione: Richiedere la API key Semantic Scholar gratuita (operazione da 5 minuti sul sito) e inserirla come variabile utente Windows seguendo il loader reale _ti_paths.bat → _VAULT/KEYS/titanium_os.env (non in .env come indica erroneamente AZIONI_MATTEO.md:32, segnalato in bussola).*
- [ ] **[media · ROADMAP]** La bussola_open segnala che la regola 'meglio vuoto che inventato' per lo slot aggancio_reale non è ancora operativa: l'LLM continua a inventare dentro GENESIS ('il sistema notturno di consolidamento dei pattern motori' non esiste). La bonifica #70 ha chiuso P0 su MIMS, ma lo stesso meccanismo generativo è ancora aperto su GENESIS. Con il sistema che si riaccende stanotte, la prossima generazione ripartirà dallo stesso bug strutturale.
  - *azione: Prima di riaccendere nina-loop, iniettare _CANONE.md nel prompt di nina_agent.py e aggiungere la guardia: se retrieve_context() restituisce meno di N chunk rilevanti per aggancio_reale, lo slot rimane vuoto invece di essere completato dall'LLM. È una modifica a nina_agent.py:188, non un task di ricerca.*
- [ ] **[media · ROADMAP]** Il canone manuale è fermo da 39 giorni con 19 critiche attive da riverificare (log 2026-08-16: 'canone manuale fermo da 39 giorni (>30) — 19 attive da riverificare'). Nel frattempo la serie ha prodotto episodi EP_N2_57–64, il problema MIMS è stato scoperto e catalogato, e le euristiche rumorose hanno generato falsi positivi che potrebbero essere tra le 19 attive. Critiche stantie su un sistema cambiato in 39 giorni perdono validità e consumano attenzione su problemi già risolti o mai esistiti.
  - *azione: Dedicare una sessione di 30-45 minuti a riverificare le 19 critiche attive contro lo stato corrente: scartare quelle risolte dai fix del #69, aggiornare quelle cambiate (specialmente quelle su MIMS e sulle euristiche), e ridurre il backlog a un numero gestibile prima di ripartire con le notti automatiche.*
- [ ] **[media · V32]** Il blocco hardware UPS (~50-80€) è listato come bloccante con la motivazione che la corruzione HNSW da power-loss è già avvenuta 3 volte in 2 giorni. Ogni corruzione forza un rebuild del RAG (potenzialmente la causa del -11.000 chunk) e blocca ore di lavoro notturno.
  - *azione: Ordinare l'UPS nella stessa sessione di acquisto del mandrino 2.2kW ER20: sono entrambi acquisti fisici, si smaltiscono in un'unica azione. Posizionarlo accanto a Vevor+ER20 come da nota blockers.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-08-17 23:47*
