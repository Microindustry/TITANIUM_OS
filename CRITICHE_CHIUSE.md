<!-- TOC -->

- [CRITICHE CHIUSE  lo storico della cartella clinica](#critiche-chiuse-lo-storico-della-cartella-clinica)
  - [CANONE MANUALE  risolte](#canone-manuale-risolte)
    - [V32 CNC (2)](#v32-cnc-2)
    - [MIMS (1)](#mims-1)
    - [GENESIS / Dashboard (6)](#genesis-dashboard-6)
    - [Vita Natura (1)](#vita-natura-1)
    - [Identity (1)](#identity-1)
    - [Sistema (trasversale) (1)](#sistema-trasversale-1)
    - [Audit Opus  Dati live (18)](#audit-opus-dati-live-18)
    - [Audit 15/06  Opus (5)](#audit-1506-opus-5)
    - [Attacco Opus  17/06 (3)](#attacco-opus-1706-3)
  - [AUTO-AUDIT  chiuse ancora nel file vivo (11)](#auto-audit-chiuse-ancora-nel-file-vivo-11)

<!-- /TOC -->

# CRITICHE CHIUSE — lo storico della cartella clinica

*Rigenerato da `AUTOMATIONS/core/critiche_md.py`. **Fuori dal percorso di lettura** (K2, #73):*
*non si legge a inizio sessione, si apre quando serve sapere perché una cosa è stata chiusa.*
*Le critiche aperte sono in `CRITICHE.md`.*

## CANONE MANUALE — risolte

### V32 CNC (2)
- [✓] **Fisico & Build** · Silent blocks v.A vs v.B — DECISO (v.B Ø18mm)
  - *RISOLTO #45 (24/06): deciso v.B — silent block Ø18mm (V8_DELTA §2), scelta reversibile. Geometria già rilevata dalle foto, isolamento dal pavimento complementare all'Epoxy Granite. Resta solo il durometro (dettaglio materiale, non blocca il BOM).*
- [✓] **Dati & Coerenza** · pct V32 65% — verificato coerente ovunque
  - *VERIFICATO: STATE=65, MappaView=65, mimsData v32p01=65, PILLARS_DATA=65. V32 è l'unico pilastro coerente. Il problema vero è su GENESIS/IDENTITY → vedi cr_audit.*

### MIMS (1)
- [✓] **Prodotto** · Fit Park dati base mancanti — CHIUSA 28/09
  - *CHIUSA 28/09 (#74), decisione di Matteo: FIT-PARK esce dalla roadmap ('era un'idea, non una cosa cosi' importante'). Tolto dal db GENESIS (CORE/genesis_seed.py, RIMOSSI); l'idea resta parcheggiata in DA_FARE.md.*

### GENESIS / Dashboard (6)
- [✓] **Codice** · NodeTile/NodeLevel triplicato in 3 file
  - *CONFERMATA: MatteoSection, MimsSection, GenesisSection hanno NodeTile (~60 righe) + NodeLevel identici, cambia solo il colore accent (amber/cyan). Estrarre in <NodeTile accent=...> condiviso → -180 righe. || RISOLTO 07/07 (commit 74053de9): struttura estratta UNA volta in components/skilltree/Nod...*
- [✓] **Codice** · Errori TS — verificato: nessuno
  - *VERIFICATO Opus: npx tsc --noEmit --skipLibCheck → exit 0, zero errori. La build TS è pulita. Critica chiusa.*
- [✓] **Codice** · Dati duplicati: SYSTEM_TREE in MappaView vs genesisData/mimsData
  - *FIXATO Fable 08/07 (sess #56, au18): SYSTEM_TREE non è più una copia a mano — data/mappaData.ts lo DERIVA dagli alberi N-livelli (skillTreeData v32 / GENESIS_ROOT / MIMS_ROOT) con adapter SkillNode→MapNode; % sotto-nodi computate dalle foglie (nodeProgress), % pilastri live da STATE, ROOT = media...*
- [✓] **Codice** · GENESIS pct: TRE valori diversi nel codice
  - *FIXATO Opus 15/06: STATE era avanzato a 70 ma MappaView e PILLARS_DATA erano fermi a 55. Allineati entrambi a 70 (= STATE, fonte live letta dalle card). RESTA la causa-radice au18: sono const a mano non derivate → il drift tornerà al prossimo avanzamento di STATE.*
- [✓] **Infrastruttura** · RAG semantico a ZERO — RISOLTO (#40-44)
  - *RISOLTO #40-44: era doppio guasto (torch finito su cpu da llamafactory + chromadb 1.5.9 compactor rotto). Ripristinato torch 2.6.0+cu124 + chromadb 0.5.23 su GPU; semantico==bm25 (~34k chunk), self-heal orfani nell'incrementale + recovery a 2 livelli post-blackout. Non più 0. Vedi n02/att04 (stes...*
- [✓] **Infrastruttura** · RIAVVIO_SESSIONE.txt aggiornamento manuale
  - *RISOLTO: la skill salva (chiusura standard dalla #41) scrive RIAVVIO_SESSIONE.txt + STATE + bussola a ogni fine sessione — non è più un passo manuale dimenticabile.*

### Vita Natura (1)
- [✓] EVA WhatsApp — piattaforma REALE (#38)
  - *RISOLTO #38: EVA è pilot v0.3 reale (NODES/EVA: brain + prenotazione multi-turno + inbox handoff + webhook dry-run + test), non più 'pending'. Il vero bloccante residuo è solo il token WhatsApp Business + agenda — azione di Matteo (in AZIONI_MATTEO.md), non sviluppo.*

### Identity (1)
- [✓] Pitch investitori — RISOLTO (#38)
  - *RISOLTO #38: creati DOCS/PITCH_{NINA,MIMS,V32,GENESIS,EVA,HR}.md grounded + vista PITCH per-progetto in dashboard. Da rinfrescare i numeri (TAM/BOM, vedi mc05/att08) prima del partner, ma il documento formale c'è.*

### Sistema (trasversale) (1)
- [✓] Catena V32→VULCAN→MIMS — RIDIMENSIONATA
  - *CORRETTA (Matteo 01/06): non è un blocco drammatico. V32 si finirà ed è la FONTE PRIMARIA di reddito (oltre al lavoro). VULCAN ha già struttura + guide, manca solo il martinetto (~€50). A CNC ultimata si attivano gli stampi, che saranno comunque prototipati/prodotti in 3D. Il piano B (stampi 3D) ...*

### Audit Opus — Dati live (18)
- [✓] **STATE.json marcio** · STATE.blockers = [] vuoto → dashboard mostra 'zero blocker'
  - *FIXATO Opus: popolato STATE.blockers con i 2 reali (mandrino 2.2kW ER20, silent blocks v.A/v.B). Persistito tra i cicli del watcher. La dashboard ora mostra i blocker veri.*
- [✓] **STATE.json marcio** · session_count = 6 ma sei alla sessione #15
  - *FIXATO Opus: STATE.session_count 6→15, allineato a session_context.json. NB strutturale: state_updater.py non incrementa il contatore (va fatto a SessionStart) — fix profondo rimandato per non spendere.*
- [✓] **STATE.json marcio** · active_milestone fermo a 'skillTreeData v3.0'
  - *FIXATO Opus: STATE.active_milestone aggiornato a 'Audit Opus + handoff sessione self-healing (sessione 15)' + session_context recuperato. La Home ora mostra il milestone reale.*
- [✓] **STATE.json marcio** · MIMS status 'waiting_press' non mappato nella UI
  - *FIXATO Opus: PillarGrid ora usa rawStatus.startsWith('waiting') → ogni waiting_* mostra 'IN ATTESA'. tsc pulito.*
- [✓] **Percentuali divergenti** · GENESIS pct: 10 / 55 / 83 — tre numeri
  - *FIXATO Opus (31/05): unificato a 55. NB 15/06: STATE è poi avanzato a 70 e i due hardcoded erano rimasti a 55 → ri-allineati a 70 (vedi gc05). Conferma che senza fonte unica (au18) il drift è ricorrente.*
- [✓] **Percentuali divergenti** · IDENTITY pct: 50 vs 35
  - *FIXATO Opus: PILLARS_DATA IDENTITY allineato a 50 (= STATE). Ora STATE/MappaView/PILLARS_DATA concordano su 50.*
- [✓] **Percentuali divergenti** · MIMS %: computato (NodeLevel) vs dichiarato (30)
  - *DECISO+FIXATO Fable 08/07 (sess #56): i due numeri misurano cose diverse e restano ENTRAMBI, ma con nome esplicito e mai lo stesso — MimsSection/GenesisSection v1.1 ora mostrano 'X% delle voci di questa mappa fatte' (computato dalle foglie) e accanto 'pilastro (STATE): Y%' (dichiarato, live via u...*
- [✓] **Percentuali divergenti** · ROOT_NODE TITANIUM OS pct=60 inventato
  - *FIXATO Opus: ROOT_NODE.pct 60→48 = media dei 5 pilastri (65+30+55+40+50)/5. Coerente con STATE. (Futuro: calcolarla a runtime invece che hardcoded.)*
- [✓] **Dati tecnici obsoleti** · MCP: data files dicono 5 tool — realtà 10 (v1.4)
  - *FIXATO Opus: letto MCP/titanium_mcp_server.py v1.4 → 10 tool reali (get_state, update_milestone, search_mente, get_daily_brief, list_content_ready, nexus, rag_update, update_session_context, screen_action, save_session). Era sbagliato OVUNQUE (data file dicevano 5, RIAVVIO 7). genesisData + Mappa...*
- [✓] **Dati tecnici obsoleti** · NEXUS: 'done' in skillTree, 'future' in genesisData
  - *FIXATO Opus: verificato NODES/NEXUS/nexus.py esiste + è esposto come tool MCP 'nexus'. genesisData ag05→active e gr05→done. Ora coerente con skillTreeData e RIAVVIO.*
- [✓] **Dati tecnici obsoleti** · RAG: mancava il layer grafo nei data file
  - *CORRETTA Opus: rag_engine.py è davvero v4.0 (header) — i data file erano giusti sull'engine. Ma esiste rag_graph.py (networkx) non documentato. Aggiunto leaf 'RAG graph-aware' in genesisData + nota in MappaView gi-rag.*
- [✓] **Dati tecnici obsoleti** · React 18 scritto, React 19 installato
  - *FIXATO Opus: genesisData db01 e MappaView gi-dash → React 19 (= package.json ^19.2.4). Ora coerente con skillTreeData sw03.*
- [✓] **Dati tecnici obsoleti** · EVA: 4 status diversi nello stesso sistema
  - *FIXATO Opus: MappaView vn-eva 'building'→'pending' (= gi-eva). Ora EVA è pending/blocked ovunque (WhatsApp Business API setup pending), coerente con genesisData ag02 e skillTree sw11.*
- [✓] **Documentazione divergente** · AUTOMATIONS_MASTER.md fermo al 2026-03-16
  - *CHIUSA Fable 08/07 (sess #56): NON si rigenera — mantenere a mano una master-list era la causa della doc divergente. Il file è DECLASSATO ad archivio storico (v1.3) con banner che punta alle 4 fonti VIVE: AUTOMATIONS/core/README.md (indice ~44 script, creato 07/07), vista AUTOMAZIONI (stato live ...*
- [✓] **Documentazione divergente** · Scanner: doc diceva 'LA MIA MENTE/' (path morto)
  - *RISOLTO Opus: verificato scanner.py v1.3 → usa il path CORRETTO (MENTE_DIR env o Path.home()/MICROINDUSTRY/MENTE). Era solo la doc AUTOMATIONS_MASTER sbagliata → corretta a 'MICROINDUSTRY/MENTE/ (env MENTE_DIR)'. Il codice era a posto.*
- [✓] **Documentazione divergente** · VERSIONS: loop runaway changelog — 2 ROOT CAUSE fixate
  - *RISOLTO Opus (doppio fix + watcher riavviato, verificato 0 archivi/12s): (1) watcher.py IGNORE_DIRS += DATA (le scritture derivate ri-triggeravano changelog) + filtro .tmp/.db-journal. (2) changelog_writer.py archiviava l'overflow oltre 2000 a OGNI evento → 1 file-archivio per modifica. Ora archi...*
- [✓] **Documentazione divergente** · STORIE: 11 episodi narrativi recuperati nella dashboard
  - *RISOLTO Opus: scritto CONTENT_ENGINE/scripts/sync_storie.py (parser header markdown, ID univoci anti-collisione, idempotente). Recuperati 6 narrativi S2 (EP_S2_00..05) in stagione ST + 5 MOMENTI (MOM_01..05) in nuova stagione MOM. storieData 64→75 episodi. tsc pulito. NB: scoperta collisione ID (...*
- [✓] **Documentazione divergente** · Fonte unica di verità: nessuna. SYSTEM_TREE duplica i 3 data file
  - *FIXATO Fable 08/07 (sess #56, = au18/gc04): MappaView v5.1 ora CONSUMA i ROOT esistenti — data/mappaData.ts deriva V32/GENESIS/MIMS da skillTreeData/genesisData/mimsData (adapter SkillNode→MapNode, % computate da nodeProgress, pilastri live da STATE, ROOT=media). La duplicazione strutturale non e...*

### Audit 15/06 — Opus (5)
- [✓] Chiavi API esfiltrabili NON ancora ruotate
  - *RISOLTO #52-53: token GitHub ruotato via gh keyring (03/06, vecchio gho_ revocato — verificato 401); scan cieco 04/07 = zero sk-ant in qualunque .env; API hardenata con denylist (attacco 02 sicurezza 03/07: nessun segreto reale in repo/history).*
- [✓] RAG semantico = 0 — RISOLTO (#40-44)
  - *RISOLTO #40-44: torch 2.6.0+cu124 + chromadb 0.5.23 su GPU, semantico==bm25 (~34k chunk), self-heal orfani + recovery 2 livelli. La Regola 7 (riflusso MENTE→RAG) è di nuovo integra. Vedi gc11.*
- [✓] critiche_auto rifira findings vecchi — RISOLTO (#38)
  - *RISOLTO #38: night_audit ha l'auto-close (AUTO_CLOSE_DAYS=4) + dedup per id → una critica non più osservata da 4+ giorni si chiude da sola e riapre se ritorna (67→36 alla prima passata). Verificato #45: le voci a-regole pulite risultano resolved automaticamente.*
- [✓] Drift % pilastri (STATE ≠ dashboard) — RISOLTO con agente
  - *RISOLTO 15/06: creato NODES/PCT_SYNC/pct_sync.py — agente di coerenza che riallinea V32/MIMS/GENESIS/VITA/IDENTITY + ROOT(media) dalla FONTE UNICA STATE.json verso MappaView SYSTEM_TREE e PILLARS_DATA. Sostituisce solo cifre (non rompe il TS), idempotente, modi check/fix. Agganciato a sync_dashbo...*
- [✓] Nina v2 asse_nina/backfill — SUPERATO (#43-44)
  - *SUPERATO #43/#44: Nina è DEFINITIVA — canone unico EP_N2 (50 ep, mappa coperta in ampiezza ⟡0→⟡7), EP_AV archiviati, audit STORIE 0 violazioni. Il dilemma 'scalare asse_nina + ennesimo backfill' è chiuso dal canone nuovo data-driven.*

### Attacco Opus — 17/06 (3)
- [✓] EVA 'pending' mentre la piattaforma esiste — RISOLTO oggi
  - *RISOLTO 17/06: la piattaforma EVA è reale (NODES/EVA pilot v0.3: brain + prenotazione multi-turno + inbox handoff + webhook dry-run + test). Stato/desc corretti in genesisData + MappaView + pitch dedicato PITCH_EVA. Manca solo token WhatsApp + agenda.*
- [✓] RAG semantico = 0 — RISOLTO (#40-44)
  - *RISOLTO #40-44: vettoriale di nuovo vivo (semantico==bm25 ~34k chunk, GPU). Era torch-cpu + chromadb compactor rotto, non gli 'elevati'. Stesso guasto di n02/gc11.*
- [✓] Lavoro UI verificato a vista — RISOLTO 17/06
  - *RISOLTO 17/06: aperta la dashboard nel dev server (vite, porta 5174). VERIFICATI a schermo con ZERO errori console: sidebar pulita (RAG-chat/AGENTI accantonati; sotto-voci PITCH/CV-Nina/GIOCO/INVENTARIO), Mappa-Gioco (zone Lv + strade + monti, renderizza), CV unito (4 domini mano/mente/bio/voce +...*

---

## AUTO-AUDIT — chiuse ancora nel file vivo (11)

- [✓] **[alta · NOTTURNE]** story_agent_run.log: rilevato crash/eccezione nelle ultime esecuzioni. — *chiusa il 22/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[alta · NOTTURNE]** story_agent_run.log: rilevato errore esplicito nelle ultime esecuzioni. — *chiusa il 22/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[alta · NOTTURNE]** night_push.log: rilevato errore esplicito nelle ultime esecuzioni. — *chiusa il 22/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[alta · NOTTURNE]** research_agent.log: rilevato errore esplicito nelle ultime esecuzioni. — *chiusa il 16/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[alta · NOTTURNE]** night_research.log: rilevato errore esplicito nelle ultime esecuzioni. — *chiusa il 16/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[media · NOTTURNE]** research_agent.log: rilevato rate-limit sorgente nelle ultime esecuzioni. — *chiusa il 16/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[media · NOTTURNE]** research_agent.log: rilevato ricerca a vuoto nelle ultime esecuzioni. — *chiusa il 16/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[media · NOTTURNE]** night_research.log: rilevato rate-limit sorgente nelle ultime esecuzioni. — *chiusa il 16/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[media · NOTTURNE]** night_research.log: rilevato timeout di rete nelle ultime esecuzioni. — *chiusa il 15/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[media · NOTTURNE]** research_agent.log: rilevato timeout di rete nelle ultime esecuzioni. — *chiusa il 15/09/2026: auto: non più osservata da 4+ giorni*
- [✓] **[media · SISTEMA]** Nessun commit negli ultimi 7 giorni: il sistema non avanza. — *chiusa il 14/09/2026: auto: non più osservata da 4+ giorni*

*Le chiuse da più di 30 giorni: `DATA/audit/critiche_auto_archivio.jsonl` (282 righe).*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-09-28 13:29*
