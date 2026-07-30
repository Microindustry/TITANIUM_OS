<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  30/07/2026 03:52](#il-polso-30072026-0352)
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

## IL POLSO — 30/07/2026 03:52

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 30 aperte / 255 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · GENESIS]** La contaminazione MIMS-come-software/AI è strutturale e si autoalimenta: _CANONE.md non è mai iniettato nel prompt di nina_agent.py:188, retrieve_context() interroga il RAG sul concetto 'MIMS' e trova paper fuori tema in MENTE/KNOWLEDGE/RESEARCH/mims/ (specchiati da save_canon), lo slot 'aggancio_reale' viene riempito con acronimi inventati (EP_N2_64 «Machine-Induced Meaning Synthesis»). 5 episodi su 8 recenti sono contaminati (EP_N2_57/59/60/63/64) e alcune fonti nei FATTI sono path inesistenti (es. «GENESIS/documentation_hallucination_2026»). Il fix a monte (iniettare _CANONE.md + canon_guard) è il next_step #1 della sessione #69 ma non risulta committato in 2e98dfac.
  - *azione: Aprire nina_agent.py:188, caricare _CANONE.md come stringa e prependerla al prompt dell'Architetto con regola esplicita 'se MIMS compare come software/AI, lascia aggancio_reale vuoto'. Poi correggere manualmente EP_N2_57/59/60/63/64 e rimuovere i paper fuori tema da MENTE/KNOWLEDGE/RESEARCH/mims/ prima che vengano reindicizzati nel RAG.*
- [ ] **[alta · GENESIS]** La contaminazione MIMS nel RAG si autoalimenta: _CANONE.md non è mai iniettato nel prompt di nina_agent.py:188, retrieve_context() interroga solo il RAG sul concetto, e i paper fuori tema in MENTE/KNOWLEDGE/RESEARCH/mims/ vengono specchiati in RAG via save_canon. Il fix a913277f (commit 'ferma la contaminazione MIMS') è stato applicato stanotte, ma i 5 episodi già contaminati (EP_N2_57/59/60/63/64) restano su disco con acronimi inventati ('Machine-Induced Meaning Synthesis') e fonti fabbricate ('GENESIS/documentation_hallucination_2026', '1 sarta su 1.000'). Finché questi file vivono nel vault vengono re-ingestiti e rinforzano il falso.
  - *azione: Correggere manualmente i 5 episodi contaminati rimuovendo l'aggancio_reale inventato e le fonti fabbricate, poi eseguire rag_recover --reimport sui soli file corretti per sovrascrivere i chunk errati nell'indice. Verificare che il paper fuori tema in MIMS/KNOWLEDGE/RESEARCH/ sia escluso dai path di save_canon.*
- [ ] **[alta · GENESIS]** Il canone dichiara EP_N2_56 come massimo ma su disco esiste già EP_N2_64: "su disco EP_N2_64, il canone dichiara EP_N2_56: aggiornare _CANONE.md" (2026-07-28). Il delta è 8 episodi non registrati. Con 5 canon_violations già aperte e il dato confermato dal canone_vault (max_ep_disco: 64, max_ep_canone: 56), story_agent sta scrivendo episodi che il sistema non riconosce come canonici: il rischio concreto è rigenerazione di episodi esistenti o numerazione duplicata.
  - *azione: Al rientro (30/07), prima di caricare i 3 post schedulati, allineare _CANONE.md a EP_N2_64 e chiudere le 5 canon_violations: ogni sessione che parte con il canone sfasato amplia il gap.*
- [ ] **[alta · GENESIS]** Il canone dichiara EP_N2_56 come massimo ma su disco esiste già EP_N2_63: 7 episodi non canonizzati. Log 2026-07-27: "su disco EP_N2_63, il canone dichiara EP_N2_56: aggiornare _CANONE.md". Combinato con qc_episodi che riporta 32 episodi su 63 privi di open_loop e con le bozze EP_N2_58→61 citate in bussola_open come «da revisionare/promuovere», il gap si allarga ogni notte che l'agente genera senza che il canone venga allineato.
  - *azione: Al rientro (30/07), prima di caricare i 3 post social, aggiornare _CANONE.md portando max_ep_canone a 63 e classificare gli episodi EP_N2_57→63 come bozza/promosso/scartato. Blocca il canon_guard da segnalare falsi positivi ogni notte.*
- [ ] **[alta · GENESIS]** Il canone disco è 6 episodi avanti rispetto al canone dichiarato: log "2026-07-26: su disco EP_N2_62, il canone dichiara EP_N2_56: aggiornare _CANONE.md". Quattro canon_violations totali. Gli episodi EP_N2_57-62 esistono su disco ma sono invisibili al sistema di tracciamento: non vengono conteggiati nei controlli QC, non hanno stato (done/active), e possono essere sovrascritti o ignorati dal prossimo ciclo story_agent.
  - *azione: Aprire _CANONE.md, registrare EP_N2_57-62 con stato esplicito (bozza/da-revisionare), azzerare le 4 canon_violations. Farlo prima del rientro del 30/07 per non trovare il canone più sfasato.*
- [ ] **[alta · RAG]** Il loop HNSW corrotto non è stato ancora riparato: rag_recover --drop-hnsw richiede UAC di Matteo ed è nei blockers da sessione #69. Fino a quel momento ChromaDB restituisce 0 embedding su qualsiasi query (limit=10 → 0 risultati), il che significa che retrieve_context() nelle notti successive opera su contesto vuoto. Il RAG conta 21.614 chunk ma sono inaccessibili finché l'indice HNSW è incoerente. La corruzione si è ripresentata 3 volte in 2 giorni perché manca l'UPS hardware (~50-80 €).
  - *azione: Prima cosa al prossimo accesso: eseguire rag_recover --drop-hnsw (1 click UAC, ricostruzione automatica). Parallelamente ordinare l'UPS da affiancare a Vevor+ER20 per eliminare la causa radice dei power-loss ricorrenti.*
- [ ] **[alta · RAG]** L'indice HNSW di ChromaDB è corrotto per power-loss ricorrente (3 volte in 2 giorni, documentato nei blockers): limit=10 restituisce 0 embedding, la vista RETE 'Conoscenza' è inutilizzabile. Il blocco richiede un'azione manuale con UAC (rag_recover --drop-hnsw) che non è ancora stata eseguita. Ogni notte senza UPS espone il sistema allo stesso guasto: la causa radice non è toccata.
  - *azione: Priorità doppia: (1) Matteo esegue rag_recover --drop-hnsw con UAC per sbloccare la vista RETE stanotte stessa; (2) ordinare UPS (~50-80€, già identificato nel blocker accanto a Vevor+ER20) prima della prossima sessione di scrittura notturna — senza UPS il fix si ripeterà ciclicamente.*
- [ ] **[alta · RICERCA]** Semantic Scholar 429 ricorrente stanotte su almeno 4 chiamate distinte: «2026-07-30 03:40:14 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s» e «2026-07-30 03:39:09 [research_agent] WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=machine+tool+frame+structural+rigidity+gu». Senza API key autenticata il rate-limit è 100 req/5 min sul tier pubblico; il blocco produce ricerca a vuoto («2026-07-30 03:39:12 WARNING Nessun risultato sopra la soglia di rilevanza (0.40)») e un traceback la notte precedente («⚠ night_research.log: Traceback (most recent call last)», data 2026-07-29). La API key gratuita è già nei blockers da almeno una sessione ma non è ancora in variabili d'ambiente.
  - *azione: Matteo registra la chiave su semanticscholar.org (tier gratuito, ~1 min), la inserisce come variabile utente Windows SEMANTIC_SCHOLAR_API_KEY e verifica che research_agent.py la legga al prossimo avvio notturno. Zero codice da toccare se il loader la espone già.*
- [ ] **[alta · RICERCA]** Semantic Scholar blocca la ricerca notturna con 429 ripetuti e l'agent crasha: "2026-07-29 03:41:01 [...] HTTP 429 — attendo 1s" e "2026-07-29 03:41:24 [...] 429 Client Error: for url: ...query=local+large+language+model+fine-tuning+Lo" e "2026-07-29 03:40:06 [...] 429 Client Error: for url: ...query=CNC+spindle+ER20+runout+thermal+accuracy", seguiti da un Traceback (2026-07-29). La chiave API gratuita è già in .env ma non viene caricata: i log mostrano chiamate anonime che colpiscono il rate-limit pubblico (100 req/5min vs 1 req/s autenticato). Contemporaneamente arxiv va in timeout: "2026-07-29 03:40:57 [...] Read timed out. (read timeout=15)". L'81% delle chiamate notturne è a vuoto.
  - *azione: Matteo: impostare SEMANTIC_SCHOLAR_API_KEY come variabile utente Windows (non in .env — nessun load_dotenv() nel repo, il loader reale è _ti_paths.bat -> _VAULT/KEYS/titanium_os.env). Verificare che research_agent la legga via os.environ. Alzare il read timeout arxiv da 15s a 45s nel codice.*
- [ ] **[alta · RICERCA]** Semantic Scholar blocca la ricerca notturna con rate-limit persistente: "2026-07-28 03:38:51 WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e subito dopo "2026-07-28 03:39:14 WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=CNC+spindle+ER20+runout+thermal+accuracy&". La sorgente è la sola alternativa a OpenAlex, che stanotte ha restituito zero risultati ("2026-07-28 03:38:49 INFO openalex -> 0 risultati"). Con entrambe le sorgenti fuori uso la ricerca notturna gira a vuoto.
  - *azione: Inserire SEMANTIC_SCHOLAR_API_KEY nel .env (il blocco è già listato nei blockers): è l'unico passo bloccante, non richiede codice. Farlo prima del rientro del 30/07 per non perdere un'altra notte di ricerca.*
- [ ] **[alta · RICERCA]** Semantic Scholar blocca la ricerca notturna con 429 ripetuti e la query rimane senza risultati. Log 2026-07-27: "2026-07-27 03:39:08 [...] WARNING  [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e "2026-07-27 03:39:30 [...] WARNING  [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=CNC+spindle+ER20+runout+thermal+accuracy&". La causa è identificata nei blockers: SEMANTIC_SCHOLAR_API_KEY assente in .env. Stanotte l'agente ha girato a vuoto: "2026-07-27 03:39:05 [...] WARNING  Nessun risultato sopra la soglia di rilevanza (0.40)."
  - *azione: Richiedere la API key gratuita Semantic Scholar (modulo sul sito, risposta in ore) e inserirla in .env come SEMANTIC_SCHOLAR_API_KEY. È un blocker già censito: il passo concreto è aprire il form adesso, non rimandarla al rientro.*
- [ ] **[alta · RICERCA]** La ricerca notturna del 26/07 è andata a vuoto per rate-limit non autenticato su Semantic Scholar. Log: "2026-07-26 03:40:20 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 4s" e "2026-07-26 03:40:41 [research_agent] WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=autonomous+AI+agent+orchestration+2025" con esito "2026-07-26 03:40:41 [research_agent] INFO semantic_scholar -> 0 risultati". La chiave SEMANTIC_SCHOLAR_API_KEY è già presente in .env ma evidentemente non viene iniettata nell'agent al momento della chiamata: il client sta girando non autenticato.
  - *azione: Verificare che research_agent legga SEMANTIC_SCHOLAR_API_KEY da .env e la passi nell'header Authorization della richiesta HTTP. Testare con una chiamata curl autenticata prima del prossimo run notturno.*
- [ ] **[alta · ROADMAP]** L'UPS è listato come blocker per la corruzione HNSW da power-loss (3 episodi già avvenuti), il RAG conta 21.413 chunk, e la rebuild BGE-M3 è pronta al click ma non ancora eseguita. Fare la rebuild senza UPS installato espone il nuovo indice allo stesso rischio che ha già corrotto quello attuale tre volte. Il costo del blocco (~50-80€) è inferiore al costo di una quarta ricostruzione da zero.
  - *azione: Ordinare l'UPS contestualmente al mandrino ER20 (stesso fornitore o stessa spedizione): sblocca sia la protezione HNSW sia il via libera sicuro alla rebuild BGE-M3, che altrimenti resta un click ad alto rischio.*
- [ ] **[alta · SISTEMA]** story_agent opera senza token HF autenticato: "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads." (2026-07-28). Le richieste non autenticate sono soggette a rate-limit più bassi e a blocchi senza preavviso da parte di HF, il che può interrompere i run notturni in modo silenzioso.
  - *azione: Aggiungere HF_TOKEN al .env (token read-only da hf.co/settings/tokens è sufficiente). Zero costi, richiede 5 minuti.*
- [ ] **[alta · SISTEMA]** Tre organi dichiarati vivi mostrano score 0.0 stanotte: nina-loop, snapshot RAG, AI news watcher. Non ci sono log_issues che spieghino perché, ma il dato numerico è netto. In parallelo, bussola_open segnala che Vite/dashboard non si era rialzata al boot (START_LOGIN non l'ha ripartita). Un sistema che si auto-modifica ogni notte con organi vitali a zero e un servizio frontend che non torna su da solo è esposto a regressioni invisibili.
  - *azione: Verificare al rientro i log di nina-loop e snapshot RAG per la notte 27/07 e identificare se è un timeout, un crash silenzioso o un bare-except che ha ingoiato l'errore. Contemporaneamente diagnosticare START_LOGIN per Vite: aggiungere il processo al task scheduler o al gruppo di avvio con dipendenza dai servizi Python.*
- [ ] **[alta · SISTEMA]** Tre organi vitali risultano a zero nel run di stanotte: nina-loop=0.0, snapshot RAG=0.0, AI news watcher=0.0. Non ci sono log_issues che spieghino il perché: i processi o non sono partiti o hanno fallito silenziosamente. Con 101 bare-except in 47 file (dato bussola_open), il fallimento silenzioso è la spiegazione più probabile — ma senza smoke-test non è verificabile. Il sistema si auto-modifica (33 commit in 7 giorni) con 1 solo file di test su 157 .py.
  - *azione: Prima del prossimo ciclo notturno: controllare i log di avvio dei tre organi a zero per identificare se è un crash silenzioso o un mancato avvio. Questo sblocca anche la decisione tra i filoni A/B/C proposti in #68: il dato di stanotte rende il filone A (smoke-test organi vitali) non più opzionale.*
- [ ] **[media · GENESIS]** story_agent gira su HuggingFace Hub non autenticato: "2026-07-26: Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads." Stesso pattern del problema Semantic Scholar: token disponibile (o facilmente generabile) ma non iniettato. Il rischio concreto è un rate-limit HF in produzione notturna che blocca il download di modelli/tokenizer mid-run.
  - *azione: Generare un HF_TOKEN read-only su huggingface.co/settings/tokens, aggiungerlo a .env, verificare che story_agent lo legga via os.environ o huggingface_hub.login() all'avvio.*
- [ ] **[media · MIMS]** Il prerequisito fisico MIMS — martinetto Vevor 3 stadi da montare per la prima colata giunto VULCAN — è bloccato insieme all'ordine del mandrino 2.2kW ER20 (prerequisito fresatura stampi). Entrambi sono nei blockers da sessioni precedenti senza data di esecuzione. La decisione connettori Via B (24/06) è a canone (SCHEDA §5) ma l'economia/BEP su tooling Via B non è ricalcolata e la bozza B2 non rivendica il processo: il valore della decisione non è ancora cristallizzato in nessun documento consultabile.
  - *azione: Nella prossima sessione fisica: ordinare mandrino ER20 e UPS in un'unica sessione acquisti (entrambi bloccanti, entrambi sotto 200€ totali). Aprire una scheda BEP-Via-B in MIMS/ECONOMIA/ con i numeri del tooling Via B prima di avviare la prima colata — altrimenti la decisione del 24/06 rimane orale e non entra nel RAG.*
- [ ] **[media · NOTTURNE]** 24 episodi su 64 mancano dell'open-loop (qc_episodi.open_loop_missing=24), ma la sentinella QC_EP_OPEN_LOOP cerca l'etichetta testuale non il gancio narrativo reale, gonfiando il conteggio di falsi positivi (32→23 reali secondo bussola_open). Contemporaneamente nina_rag_loop.py:180 hardcoda 'casella': '?' in tutti gli episodi generati, producendo la dicitura 'casella ?' in 32 episodi su 64 in contraddizione con l'header dello stesso file. Due bug di qualità strutturale che inquinano ogni batch notturno senza bloccare la pipeline.
  - *azione: In nina_rag_loop.py:180 sostituire il literal '?' con la logica di lookup della casella effettiva (già presente nell'header del file). Per QC_EP_OPEN_LOOP: riscrivere il check cercando il collegamento narrativo (es. presenza di wikilink a episodio futuro) invece del tag testuale, e rivalutare i 24 flag aperti per eliminare i falsi positivi.*
- [ ] **[media · RAG]** 32 episodi su 64 controllati mancano di open_loop (qc_episodi open_loop_missing: 32, pari al 50%). Non è un dato nuovo, ma con EP_N2_58–61 già su disco e non ancora revisionati, e altri episodi in arrivo dagli agenti in vacanza, il problema si accumula ogni notte senza un gate che lo fermi.
  - *azione: Prima di promuovere a canone i nuovi EP_N2_58–61, eseguire un fix batch degli open_loop mancanti sugli episodi già canonici: lasciare il 50% senza open_loop degrada la coerenza narrativa e la qualità del RAG in modo misurabile.*
- [ ] **[media · RETE]** story_agent gira senza autenticazione HF Hub. Log 2026-07-27: "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads." Con 297 episodi generati e run notturne automatiche, un rate-limit HF non autenticato è lo stesso punto di rottura già visto con Semantic Scholar: funziona finché funziona, poi si ferma senza preavviso.
  - *azione: Generare un token HF (account → Settings → Access Tokens, scope read) e aggiungerlo in .env come HF_TOKEN. Costo zero, risolve in 5 minuti prima del prossimo run notturno.*
- [ ] **[media · ROADMAP]** Sei bozze risultano pronte al volo (EP_N2_07/08, EP_SG_02_05/06, EP_SG_03_01/02, EP_SG_04_01) ma la corsia SISTEMA è ferma per scelta e la corsia Nina è bloccata dall'HNSW corrotto. Se rag_recover --drop-hnsw non viene eseguito oggi, il batch di stanotte produrrà altri episodi su RAG vuoto, aggiungendo rumore al backlog invece di smaltirlo. Le 6 bozze pulite rischiano di restare in coda mentre si accumulano nuovi episodi da correggere.
  - *azione: Dopo rag_recover --drop-hnsw, decidere quale delle 6 bozze esce prima (EP_SG_02_05 o EP_N2_08 sono le più pulite secondo bussola_open) e sbloccare manualmente la corsia prima della sessione #70, così il batch notturno trova la coda già ridotta.*
- [ ] **[media · ROADMAP]** 6 bozze episodi Nina sono pronte al volo (EP_N2_07/08, EP_SG_02_05/06, EP_SG_03_01/02, EP_SG_04_01) ma la corsia è ferma per scelta, non per bug. Nel frattempo EP_N2_62/63/64 non sono mai committati dal loop Nina (i commit auto:story_agent toccano solo S2_SISTEMA/): tra due 'salva' manuali questi file sono a rischio perdita. Il valore pubblicabile è già prodotto e non esce.
  - *azione: Aggiungere al loop Nina un commit automatico degli episodi generati in S1_NINA/ (allineato a quanto già fatto per S2_SISTEMA/). Poi decidere l'ordine di uscita delle 6 bozze pulite nella prossima sessione: ogni notte che passano senza pubblicazione è una notte in cui la corsia caroselli — appena sbloccata dopo 7 notti ferme — non produce valore esterno.*
- [ ] **[media · ROADMAP]** Il punto C della bussola (requirements.txt non pinnato, 0 ==) è lo stesso vettore del bug torchaudio 2.11→2.6.0 appena fixato in sessione #68. Quel fix è nel venv isolato ma lo stack principale rimane flottante: la prossima pip install o aggiornamento automatico può reintrodurre la stessa classe di rottura su un organo diverso. Il rischio cresce ogni giorno che passa senza pinnare.
  - *azione: Eseguire `pip freeze > requirements.txt` nell'ambiente principale dopo il rientro, prima di qualsiasi altra modifica al codice. È il punto C già prioritizzato in #68: la sessione successiva è il momento giusto perché l'ambiente è appena stato verificato funzionante (run TI_FineTune 26/07 confermato).*
- [ ] **[media · ROADMAP]** Il filone C (pin requirements.txt) è rimasto aperto da #68 ma ha già una prova di danno reale nel milestone attivo: il bug torchaudio 2.11→2.6.0 ha richiesto un venv isolato e un fix dedicato. Con 33 commit in 7 giorni e il sistema in auto-modifica notturna, la prossima dipendenza non pinnata che rompe un agent potrebbe farlo in vacanza, senza che Matteo se ne accorga fino al 30/07.
  - *azione: Eseguire 'pip freeze > requirements.txt' nell'ambiente principale prima del rientro, identificare le 5-10 dipendenze critiche (torch, chromadb, langchain, torchaudio, flask) e fissarle con '=='. Non serve pinnare tutto: bastano i pacchetti che hanno già dimostrato di rompersi.*
- [ ] **[media · SISTEMA]** La sentinella canone in night_audit.py:635 misura mtime di _CANONE.md, che i blocchi auto <!-- COLLEGATI --> rinfrescano ogni notte: stale è sempre false anche se il contenuto curato è fermo al 16/07 (canone_manuale.file_age_days=21). La sentinella non segnala mai deriva reale. Problema distinto: il riflusso FATTI ha età 2.1 giorni (organi_vivi), il che significa che i FATTI estratti dagli episodi delle ultime due notti non sono ancora stati riflessi nel vault, lasciando potenzialmente fonti inventate (come quelle di EP_N2_64) non ripulite prima della prossima indicizzazione RAG.
  - *azione: In night_audit.py:635 misurare il mtime solo sulla porzione di _CANONE.md esterna ai marker <!-- COLLEGATI --> (es. hash della sezione manuale). Per il riflusso FATTI: verificare perché fact_reflux_agent non ha girato stanotte e forzare manualmente il run prima della prossima sessione notturna.*
- [ ] **[media · SISTEMA]** La sentinella canone in night_audit.py:635 misura mtime di _CANONE.md, che i blocchi auto (<!-- COLLEGATI -->) rinfrescano ogni notte: risultato 'stale: false' permanente anche se il contenuto curato è fermo al 16/07 (canone_manuale.file_age_days = 20). L'allarme non ha mai suonato e non suonerà mai con questa metrica. Parallelamente il campo canone_manuale mostra 19 active vs max_ep_disco=64: 45 episodi disco non mappati nel canone manuale, governance cieca su quasi il 70% del corpus.
  - *azione: Modificare night_audit.py:635 per calcolare il digest SHA della porzione di _CANONE.md fuori dai marker <!-- COLLEGATI --> ... <!-- /COLLEGATI --> e confrontarlo con il digest della notte precedente. Aggiornare a mano riga 32 e il footer di _CANONE.md per allineare il range dichiarato (01…56) a quello reale (01…64).*
- [ ] **[media · SISTEMA]** Tre organi vitali mostrano score 0.0 (nina-loop, snapshot RAG, AI news watcher) e riflusso FATTI è a 0.1. Non ci sono log_issues che spieghino il perché: l'assenza di errori espliciti rende impossibile distinguere tra «non è stato il turno stanotte» e «ha fallito silenziosamente». Con 101 bare-except aperti in 47 file (bussola_open B), la seconda ipotesi non è escludibile.
  - *azione: Aggiungere al prossimo smoke-test (proposta A della bussola) un controllo sul timestamp dell'ultimo run riuscito per ciascun organo: se supera la finestra attesa, il sistema deve emettere un WARNING esplicito anziché restituire 0.0 senza contesto.*
- [ ] **[media · V32]** Il mandrino 2.2kW ER20 e il martinetto Vevor sono entrambi non ordinati/non montati, e sono in sequenza dipendente: senza mandrino non si fresa, senza martinetto non si fa la prima colata VULCAN. Il pilastro V32 è al 65% ma il prossimo step fisico è bloccato da due prerequisiti hardware non ancora acquisiti, con la decisione Via B (connettori MIMS) già presa dal 24/06.
  - *azione: Ordinare mandrino ER20 e UPS nella stessa sessione di acquisto (l'UPS risolve anche il blocker HNSW): sono acquisti indipendenti che sbloccano due filoni paralleli. Montare il martinetto Vevor è il primo step fisico non dipendente da consegne.*
- [ ] **[bassa · V32]** Il blocker UPS è censito da almeno 3 episodi di corruzione HNSW e rimane hardware non ordinato. Il RAG ha 21245 chunk e il database vettoriale continua a girare senza protezione da power-loss. Non ci sono log_issues stanotte su HNSW, ma la frequenza passata (3 volte in 2 giorni) rende il prossimo evento statisticamente probabile.
  - *azione: Ordinare l'UPS (50-80€, già identificato) come primo acquisto al rientro, prima del mandrino ER20. Il mandrino è prerequisito per MIMS ma non protegge dati già esistenti; l'UPS protegge 21245 chunk RAG e 297 episodi da una corruzione che richiede rebuild completo.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-07-30 03:52*
