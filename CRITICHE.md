<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  21/08/2026 03:52](#il-polso-21082026-0352)
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

## IL POLSO — 21/08/2026 03:52

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 24 aperte / 285 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · RAG]** Il RAG ha perso circa 10.275 chunk rispetto al 24/06 (da ~32.800 a 22.525 stanotte). La causa non è determinata: può essere un rebuild parziale o una perdita reale di conoscenza indicizzata. Finché non si sa perché, il grounding di Nina opera su un corpus dimezzato senza saperlo.
  - *azione: Confrontare il manifest del rebuild più recente con l'inventario del 24/06 per stabilire quanti chunk mancano davvero e quali sorgenti sono scomparse; se è perdita reale, rieseguire l'ingestione delle sorgenti mancanti prima del prossimo ciclo Nina.*
- [ ] **[alta · RAG]** La sentinella canone è neutralizzata: log_issues riporta (2026-08-20) 'night_audit.py:635 misura il mtime di _CANONE.md, che i blocchi auto rinfrescano ogni notte → stale: false per sempre. Il contenuto curato è fermo al 16/07.' Il campo canone_age_days=2 in output è quindi un falso negativo strutturale: il canone reale non viene mai dichiarato stantio.
  - *azione: Modificare night_audit.py:635 per misurare il mtime o l'hash della porzione di _CANONE.md esterna ai marker <!-- COLLEGATI -->; rieseguire la guardia e verificare che rilevi correttamente la data reale dell'ultimo edit manuale (16/07).*
- [ ] **[alta · RAG]** I chunk RAG sono scesi da ~32.800 (24/06) a 22.273 stanotte: -10.500 chunk (-32%) senza che nessun rebuild documentato giustifichi la perdita. Se è perdita reale il RAG risponde su un corpus mutilato; se è rebuild incompleto il re-index va completato. La situazione è ambigua e non risolta.
  - *azione: Confrontare il conteggio dei file sorgente in MENTE con il manifest dell'ultimo rebuild completo; se i sorgenti sono intatti ma i chunk mancano, rilanciare l'indicizzazione completa e verificare che il contatore torni ≥32.800.*
- [ ] **[alta · RAG]** Il corpus RAG è sceso da ~32.800 chunk (24/06) a 22.014 oggi: un calo di ~10.786 chunk (~33%) senza una causa documentata nei log. next_step ammette 'capire se è rientro post-rebuild o perdita'. Se è perdita reale, ogni retrieve() di Nina lavora su un corpus monco e i falsi agganciamenti a MIMS/GENESIS già corretti in #70 potrebbero riemergere.
  - *azione: Confrontare il manifest dell'ultimo snapshot RAG (organo 'snapshot RAG' a 0.3 giorni, quindi generato stanotte) con quello del 24/06: contare i file sorgente indicizzati allora vs ora. Se mancano sorgenti, rieseguire l'ingestione sui file mancanti; se è rebuild atteso, documentarlo nel canone per silenziare l'allarme.*
- [ ] **[alta · RAG]** Il RAG conta 21.621 chunk contro i ~32.800 del 24/06: un calo di oltre 11.000 chunk (~34%) senza una causa documentata nei log. Finché non si sa se è un rebuild controllato o una perdita reale, il contesto iniettato a Nina è potenzialmente incompleto e i risultati di retrieve_context() sono inaffidabili.
  - *azione: Confrontare il manifest dell'ultimo snapshot RAG (rag_snapshots) con quello del 24/06 per identificare quali sorgenti sono sparite. Se è perdita, rieseguire l'ingestione dalle sorgenti mancanti; se è rebuild atteso, documentarlo nel canone così l'allarme non si ripete.*
- [ ] **[alta · RAG]** Il gate del canone è ambra: canon_violations = 26 e next_step dichiara esplicitamente "il gate è ambra fino al batch 3". Il log_issues (2026-08-17) conferma che canon_guard segnala ancora 22 righe sugli episodi vivi. Finché il batch 3 non viene eseguito, ogni nuova notte di generazione può produrre episodi che escono senza guardia attiva.
  - *azione: Portare Matteo alla decisione sul batch 3 (10 sicuri + 4 da giudicare + 2 da rigenerare) nella prossima sessione: preparare un riepilogo sintetico dei 4 episodi 'da giudicare' (03/05/48/56) con motivazione pro/contro correzione, così la decisione è a click e non a memoria.*
- [ ] **[alta · RICERCA]** Semantic Scholar 429 ricorrente: i log mostrano due eventi distinti nella stessa notte. '2026-08-17 23:48:19 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429' e '2026-08-17 23:48:51 [research_agent] WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=CNC+spindle+ER20+runout+thermal+accuracy&'. La chiave gratuita è già in .env (blockers: 'SEMANTIC_SCHOLAR_API_KEY — azzera i 429') ma evidentemente non è ancora attiva o non viene letta. Rischio: la ricerca notturna su CNC/mandrino ER20 — pilastro V32 a 65 giorni — continua a girare a vuoto.
  - *azione: Verificare che SEMANTIC_SCHOLAR_API_KEY sia impostata come variabile utente Windows (non solo in .env, vedi bussola_open su _ti_paths.bat) e che research_agent.py la legga all'avvio. Dopo il fix, rieseguire manualmente una query CNC per confermare HTTP 200.*
- [ ] **[alta · SISTEMA]** L'API server :5001 è giù: 7 endpoint su 9 restituiscono 500. Il grounding di Nina ha retto solo grazie al fallback sul motore diretto, ma questo fallback non è garantito a ogni chiamata e maschera il guasto invece di risolverlo. Il dato è confermato sia da next_step sia da bussola_open: «API server (:5001) giù».
  - *azione: Avviare il server :5001 e loggare lo stacktrace dei 500; identificare se il problema è una dipendenza mancante post-rebuild (es. variabile d'ambiente, path CONTENT_ENGINE_DIR) e fixare prima della prossima sessione notturna.*
- [ ] **[alta · SISTEMA]** L'UPS hardware manca e la corruzione HNSW da power-loss è già avvenuta 3 volte in 2 giorni (blockers: 'la corruzione HNSW da power-loss è ricorrente (3 volte in 2gg)'). Ogni interruzione di corrente può di nuovo dimezzare l'indice RAG o corrompere GENESIS_DB — il rischio si ripete ogni notte finché il blocco hardware non è risolto.
  - *azione: Ordinare UPS (~50-80€) prima della prossima sessione notturna; nel frattempo abilitare checkpoint/WAL su genesis_db.py e uno snapshot HNSW post-run per limitare la perdita massima a una notte.*
- [ ] **[alta · SISTEMA]** API server :5001 giù: 7 endpoint su 9 danno 500. Il grounding di Nina ha retto solo grazie al fallback sul motore diretto — un secondo guasto concorrente (motore diretto offline) lascerebbe Nina senza RAG. Il dato è confermato da next_step ('API :5001 GIU') e da bussola_open ('API server (:5001) giù. Il grounding di Nina ha funzionato solo grazie al fallback sul motore diretto').
  - *azione: Avviare :5001 e testare i 9 endpoint uno per uno; isolare i 7 che danno 500 (log Flask), correggere prima quello che serve a retrieve_context(), poi gli altri in ordine di dipendenza.*
- [ ] **[alta · SISTEMA]** API server :5001 giù: il grounding di Nina ha funzionato solo per fallback sul motore diretto. Nessuna riga di log_issues certifica il 500, ma next_step dichiara esplicitamente '7 endpoint su 9 danno 500'. Il dato è nel report di sistema, non nei log estratti — va verificato in diretta.
  - *azione: Avviare il server :5001, leggere lo stderr dei 7 endpoint in 500, identificare la causa radice (variabile d'ambiente mancante? dipendenza non installata? CONTENT_ENGINE_DIR non impostata, già segnalata in bussola_open). Ripristinare prima di qualunque altra automazione notturna.*
- [ ] **[alta · SISTEMA]** AI news watcher silenzioso da 19.1 giorni: log_issues riporta '2026-08-18: AI news watcher: ultimo output 19.1 giorni fa (soglia 4) — ai_news_watcher_state.json'. L'organo è classificato come 'organo silenzioso' nel log_issues, non è un falso allarme. Il watcher era tra i servizi fermi durante i 17 notti di blackout (30/07-15/08) e non si è riacceso automaticamente con il sistema.
  - *azione: Verificare che ai_news_watcher sia incluso nel batch di riaccensione di next_step ('RIACCENDERE IL SISTEMA'). Controllare ai_news_watcher_state.json per capire se il processo è crashato o semplicemente non schedulato. Rieseguire manualmente e verificare output prima di affidarsi all'automazione.*
- [ ] **[alta · SISTEMA]** Il log_issues riporta (2026-08-17): "canone manuale fermo da 40 giorni (>30) — 19 attive da riverificare" e "_CANONE.md fermo da 19 giorni (soglia 14) mentre la serie si auto-genera ogni notte". Con 301 episodi totali e 64 vivi, il canone manuale e il _CANONE.md sono la fonte di verità che Nina legge: se entrambi sono stantii, le regole che bloccano le invenzioni non riflettono lo stato reale del sistema.
  - *azione: Aprire critiche_manuali.json e riverificare le 19 critiche attive: chiudere quelle già risolte dalla bonifica #70, aggiornare quelle che cambiano stato. Poi aggiornare _CANONE.md (sezione fuori dai marker <!-- COLLEGATI -->) con le regole emerse dalla sessione #70 (fix pilastri, ban source hallucination, regola aggancio_reale).*
- [ ] **[alta · SISTEMA]** Cinque organi vitali sono fermi da 18-21 giorni, confermati dai log_issues con tipo 'organo silenzioso': "nina-loop: ultimo output 18.8 giorni fa (soglia 3)", "snapshot RAG: ultimo output 18.8 giorni fa (soglia 3)", "retention disco: ultimo output 18.8 giorni fa (soglia 3)", "AI news watcher: ultimo output 18.8 giorni fa (soglia 4)", "riflusso FATTI: ultimo output 20.9 giorni fa (soglia 7)" (2026-08-17). In parallelo l'API :5001 è giù (7 endpoint su 9 danno 500): il grounding di Nina regge solo sul fallback diretto, un singolo punto di cedimento.
  - *azione: Eseguire night_research.bat e verificare che tutti e cinque gli organi producano output stanotte. Contestualmente diagnosticare :5001 (log di avvio, import mancanti, variabili env) e riportarlo online prima della prossima sessione Nina.*
- [ ] **[media · GENESIS]** Il canone dichiara EP_N2_64 come episodio massimo ma su disco esistono EP_N2_65, 66 e 67: "su disco EP_N2_67, il canone dichiara EP_N2_64: aggiornare _CANONE.md" (2026-08-21). Tre episodi prodotti e committati non sono riconosciuti dal canone, il che significa che canon_guard li tratta come esterni e i 26 canon_violations attivi potrebbero includere falsi allarmi generati proprio da questi episodi non registrati.
  - *azione: Editare manualmente _CANONE.md riga 32 e il footer per estendere il range a EP_N2_67; verificare poi se il contatore canon_violations scende dai 26 attuali dopo l'aggiornamento.*
- [ ] **[media · GENESIS]** Lo slot aggancio_reale continua a essere riempito con invenzioni LLM dentro GENESIS: bussola_open segnala '"il sistema notturno di consolidamento dei pattern motori" non esiste' e che la regola "meglio vuoto che inventato" non morde ancora. Il P0 MIMS è chiuso ma il meccanismo generatore del falso è ancora attivo sul pilastro GENESIS.
  - *azione: Iniettare _CANONE.md (sezione GENESIS) nel prompt di nina_agent.py prima della chiamata che riempie aggancio_reale; aggiungere un check post-generazione che rifiuti lo slot se contiene termini non presenti nel canone e lo lasci vuoto invece di passare il testo inventato.*
- [ ] **[media · RAG]** canon_guard segnala ancora 26 violazioni (campo canon_violations) e next_step dichiara 'il gate è ambra fino al batch 3'. I 18 episodi con 'GENESIS/V32' senza verbo software vicino (bussola_open: 'Batch 3 da decidere') sono in attesa di decisione di Matteo. Finché il gate resta ambra, ogni nuova generazione notturna di Nina pesca dal RAG episodi parzialmente contaminati e può propagare la stessa classe di errore appena bonificata in #70.
  - *azione: Portare Batch 3 a decisione nella prossima sessione: i 10 episodi di correzione sicura non richiedono giudizio e possono partire subito (dry-run già pronto). Sbloccarli porta canon_violations da 26 verso la soglia verde e riattiva il gate prima che Nina generi EP_N2_66+.*
- [ ] **[media · RICERCA]** Stanotte research_agent ha colpito il rate-limit di Semantic Scholar due volte consecutive e poi ha ottenuto zero risultati utili, perdendo anche arxiv per timeout: "2026-08-21 03:38:38 [...] HTTP 429" → "2026-08-21 03:39:01 [...] 429 Client Error" → "2026-08-21 03:39:04 [...] Nessun risultato sopra la soglia di rilevanza (0.40)" → "2026-08-21 03:39:52 [...] Read timed out. (read timeout=15)". La chiave API gratuita è già in .env secondo i blockers, ma evidentemente non è caricata o non è attiva: il blocker «SEMANTIC_SCHOLAR_API_KEY — azzera i 429» è aperto da più sessioni.
  - *azione: Verificare che SEMANTIC_SCHOLAR_API_KEY sia impostata come variabile utente Windows (non solo in .env) e che il loader la legga; testare una chiamata autenticata manuale prima della prossima notte notturna.*
- [ ] **[media · ROADMAP]** Il Batch 3 ha il dry-run pronto e 0 bloccati dalla guardia, ma attende la decisione di Matteo da almeno una sessione. I 2 episodi ROTTI (EP_N2_28 e 55 con aggancio troncato a metà parola) peggiorano ogni notte che passa perché vengono riletti dal RAG e potenzialmente usati come contesto da Nina. I 4 episodi «da giudicare» (03/05/48/56) bloccano la chiusura definitiva della bonifica MIMS.
  - *azione: Decidere nella prossima sessione di lavoro: approvare i 10 sicuri subito (rischio zero), pronunciarsi sui 4 da giudicare (la meccanica di ripetibilità/calibrazione di V32 non è un'invenzione), e schedulare la rigenerazione dei 2 ROTTI — ogni ulteriore rinvio li mantiene attivi nel RAG.*
- [ ] **[media · ROADMAP]** Il Batch 3 (18 episodi con EP_N2_28/55 da rigenerare + 4 da giudicare + 10 sicuri) è in attesa di decisione di Matteo, ma canon_guard segnala già 26 violazioni e il gate è dichiarato 'ambra'. Ogni notte che passa, nina-loop può produrre nuovi episodi sopra un canone non ancora bonificato, moltiplicando il debito. I due episodi ROTTI (28 e 55, aggancio troncato a metà parola) non possono aspettare: sono irrecuperabili senza rigenerazione.
  - *azione: Matteo decide oggi su i 4 episodi dubbi (03/05/48/56); i 10 sicuri e i 2 rotti non dipendono dalla decisione — eseguire subito dry-run→apply su quei 12, poi attendere il verdetto sui 4 prima di chiudere il batch.*
- [ ] **[media · ROADMAP]** Il blocker hardware UPS (~50-80€) è l'unica cura alla radice per la corruzione HNSW ricorrente (3 volte in 2 giorni, dichiarata in blockers). Senza UPS, ogni power-loss può azzerare il lavoro di rebuild del RAG appena avviato — incluso il recupero dei 10.786 chunk mancanti. Il costo è basso, il rischio di perdere un altro ciclo di ricostruzione è alto.
  - *azione: Ordinare l'UPS nella stessa sessione in cui si ordina il mandrino ER20 (entrambi in blockers, entrambi fisici): accorpare l'acquisto elimina il costo di un secondo ordine e sblocca la stabilità del sistema prima della prossima notte di rebuild pesante.*
- [ ] **[media · ROADMAP]** La bussola_open segnala che la regola 'meglio vuoto che inventato' per lo slot aggancio_reale non è ancora operativa: l'LLM continua a inventare dentro GENESIS ('il sistema notturno di consolidamento dei pattern motori' non esiste). La bonifica #70 ha chiuso P0 su MIMS, ma lo stesso meccanismo generativo è ancora aperto su GENESIS. Con il sistema che si riaccende stanotte, la prossima generazione ripartirà dallo stesso bug strutturale.
  - *azione: Prima di riaccendere nina-loop, iniettare _CANONE.md nel prompt di nina_agent.py e aggiungere la guardia: se retrieve_context() restituisce meno di N chunk rilevanti per aggancio_reale, lo slot rimane vuoto invece di essere completato dall'LLM. È una modifica a nina_agent.py:188, non un task di ricerca.*
- [ ] **[media · SISTEMA]** Il canone delle critiche manuali è fermo da 43 giorni con 19 critiche attive non riverificate: "canone manuale fermo da 43 giorni (>30) — 19 attive da riverificare" (2026-08-21). Nel frattempo il sistema ha subito la bonifica MIMS, la scala GENESIS S0-S2 e il muto di 17 notti: alcune di quelle 19 critiche potrebbero essere già chiuse o cambiate di priorità, altre potrebbero essere diventate più urgenti.
  - *azione: Aprire critiche_manuali.json e scorrere le 19 voci attive: chiudere quelle risolte dalla bonifica #70, aggiornare la severità delle restanti, datare la revisione — operazione manuale da fare in questa sessione prima che il file superi i 60 giorni.*
- [ ] **[media · V32]** Il blocco hardware UPS (~50-80€) è listato come bloccante con la motivazione che la corruzione HNSW da power-loss è già avvenuta 3 volte in 2 giorni. Ogni corruzione forza un rebuild del RAG (potenzialmente la causa del -11.000 chunk) e blocca ore di lavoro notturno.
  - *azione: Ordinare l'UPS nella stessa sessione di acquisto del mandrino 2.2kW ER20: sono entrambi acquisti fisici, si smaltiscono in un'unica azione. Posizionarlo accanto a Vevor+ER20 come da nota blockers.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-08-21 03:52*
