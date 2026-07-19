# CRITICHE — la cartella clinica di TITANIUM_OS

*Vista FILE delle critiche (la vista dashboard è stata eliminata il 07/07/2026 su*
*decisione di Matteo). Fonti di verità = `DATA/audit/critiche_manuali.json` (canone)*
*+ `DATA/audit/critiche_auto.json` (self-audit notturno). Questo file si RIGENERA*
*(night_audit, ogni notte): NON editarlo a mano — per cambiare stato di' a Claude*
*o edita il JSON. La terza fonte (bussola) vive già in `DA_FARE_FATTO.md`.*

Stati: `[ ]` attiva · `[◐]` bloccata · `[💡]` futura (idea/dopo) · `[✓]` risolta

## IL POLSO — 19/07/2026 00:23

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 24 aperte / 195 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · GENESIS]** Il canone vault dichiara EP_N2_53 come episodio massimo ma su disco esiste EP_N2_56: "su disco EP_N2_56, il canone dichiara EP_N2_53: aggiornare _CANONE.md" (2026-07-16). Tre episodi esistono fuori canone. Con 4 canon_violations totali e lo story_agent che ha già girato stanotte (commit 018ec938), il rischio è che il prossimo ciclo notturno generi EP_N2_57+ prendendo come base uno stato del canone sfasato di 3 episodi — producendo buchi di continuità non rilevabili dal QC automatico.
  - *azione: Aggiornare _CANONE.md portando max_ep_canone da 53 a 56 e verificare che i tre episodi extra (54, 55, 56) abbiano struttura conforme prima che story_agent giri di nuovo stanotte. Operazione da fare in ONDATA A, prima del ciclo notturno.*
- [ ] **[alta · RAG]** Due file _copia attivi nel vault rubano slot RRF alla retrieval: (2026-07-19) "FINANZA\la_scienza_finanziaria_l_asimmetria_di_valore_copia.md accanto all'originale" e (2026-07-19) "KNOWLEDGE\PROMPTS\istruzioni_ia_copia.md accanto all'originale". La sentinella doppioni (backlog #6) li ha rilevati ma non sono stati rimossi: il problema è noto e aperto.
  - *azione: Aprire i due file, confrontare con l'originale, scegliere fondere o archiviare, eliminare i _copia. Poi rieseguire build_index incrementale per pulire i chunk duplicati da ChromaDB.*
- [ ] **[alta · RICERCA]** La ricerca notturna è cieca su Semantic Scholar: due query distinte falliscono con 429 e restituiscono zero risultati. Log 2026-07-17: "2026-07-17 03:38:52 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e "2026-07-17 03:39:16 [research_agent] INFO semantic_scholar -> 0 risultati"; identico pattern su night_research.log alle 03:40. Senza API key autenticata il rate-limit anonimo è 1 req/s condiviso: la sorgente accademica è di fatto spenta ogni notte.
  - *azione: Inserire SEMANTIC_SCHOLAR_API_KEY nel .env (chiave gratuita, richiesta in 5 minuti su semanticscholar.org/product/api): è già in lista blockers, va eseguito prima della prossima run notturna per sbloccare entrambi gli agenti.*
- [ ] **[alta · RICERCA]** La ricerca notturna su Semantic Scholar è bloccata da 429 senza fallback efficace: "2026-07-16 03:39:46 [research_agent] WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=machine+tool+frame+structural+rigidity+gu" e immediatamente dopo "2026-07-16 03:39:46 [research_agent] INFO semantic_scholar -> 0 risultati". Il blocker SEMANTIC_SCHOLAR_API_KEY è già censito ma non risolto. In parallelo arxiv è andato in timeout: "2026-07-16 03:40:31 [research_agent] WARNING [arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)". Risultato concreto: il RAG ha ingerito +1 chunk su una notte intera ("2026-07-16 03:45:17 [rag_engine] INFO Totale: 19814 chunk | +add:1 mod:5 skip:429 -del:944") — la ricerca su V32 (rigidità strutturale telaio macchina utensile) è stata azzerata.
  - *azione: Matteo inserisce SEMANTIC_SCHOLAR_API_KEY in .env prima di sessione #61 (è già in lista blockers, richiede 2 minuti). Per arxiv aumentare il read timeout da 15s a 45s nel client o aggiungere retry con backoff — un timeout da 15s su export.arxiv.org è troppo aggressivo.*
- [ ] **[alta · RICERCA]** Semantic Scholar ha bloccato entrambi i research agent per l'intera finestra notturna. Log esatti: '2026-07-15 03:38:35 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s' e '2026-07-15 03:38:58 [research_agent] INFO semantic_scholar -> 0 risultati'; identico pattern in night_research.log alle 03:40. La chiave API gratuita senza autenticazione è il collo di bottiglia dichiarato nei blockers ('SEMANTIC_SCHOLAR_API_KEY — azzera i 429 della ricerca notturna') ed è ancora assente.
  - *azione: Matteo deve registrare la API key gratuita su Semantic Scholar e inserirla in .env come SEMANTIC_SCHOLAR_API_KEY. Azione bloccante: finché non è in .env, ogni notte la ricerca accademica produce 0 risultati e consuma slot di retry inutilmente.*
- [ ] **[alta · ROADMAP]** L'UPS è listato nei blockers come causa diretta di corruzioni HNSW ricorrenti ('corruzione HNSW da power-loss ricorrente, 3 volte in 2gg'). È un blocker hardware da 50-80€ che nessuna sessione software può aggirare: ogni power-loss futuro rischia di invalidare il vettorstore (18.791+ chunk). Il todo è nella lista da acquistare insieme a Vevor+ER20, ma non ha una data.
  - *azione: Acquistare UPS prima della prossima sessione hardware (Vevor+ER20): il rischio di perdere il vettorstore è concreto e si è già materializzato 3 volte. È il blocco più economico da togliere rispetto al danno potenziale.*
- [ ] **[alta · SISTEMA]** daily brief è piatto a 0.0 — unico organo vitale a zero su tutti i monitorati (nina-loop 1.9, RAG 1.9, watcher 1.9). Non è un rallentamento: è fermo. Nessun log di esecuzione rilevato stanotte.
  - *azione: Verificare il task scheduler del daily brief (bat/Task Scheduler Windows): controllare exit code, log di avvio e se il processo viene ucciso prima della scrittura. Stesso approccio usato per ai_news_watcher in fix(#57) — aggiungere marker avvio nel logger e exit code nel bat.*
- [ ] **[alta · SISTEMA]** Il rischio di corruzione HNSW da power-loss è ancora aperto e dichiarato ricorrente (3 volte in 2 giorni nei blockers). Nessun log_issue lo registra stanotte, ma l'UPS da 50-80€ non è stato ordinato. Ogni boot senza UPS è un tentativo: con la GPU notturna attiva e lo stack Docker, un'altra caduta di corrente ricostruisce l'indice RAG da zero e blocca la sessione successiva.
  - *azione: Ordinare l'UPS oggi insieme al mandrino ER20: sono entrambi acquisti sotto i 100€ che sbloccano rispettivamente GENESIS (continuità RAG) e MIMS (fresatura stampi). Raggrupparli in un unico ordine elimina un'altra sessione di setup.*
- [ ] **[alta · SISTEMA]** Tre organi vitali registrano health=0.0 (nina-loop, snapshot RAG, AI news watcher) e uno è a 0.1 (riflusso FATTI). Non ci sono log_issues che spieghino le cause stanotte, ma quattro organi su sette non hanno girato: se il pattern si consolida, il sistema produce senza memoria aggiornata e senza segnali dal mercato.
  - *azione: Al riavvio #66 verificare i task scheduler dei quattro organi (exit code, log di avvio): identificare se il problema è il boot-storm post-sleep (già visto il 13/07, risolto con RandomDelay) oppure una regressione. Priorità: nina-loop e snapshot RAG perché alimentano la produzione di episodi.*
- [ ] **[alta · SISTEMA]** Tre organi vitali sono completamente spenti (score 0.0): 'nina-loop', 'snapshot RAG', 'AI news watcher'. Il 'riflusso FATTI' è quasi morto (0.1). Non si tratta di degrado: sono fermi. Senza nina-loop e riflusso FATTI, gli episodi generati stanotte non alimentano il RAG con i fatti narrativi — la memoria del sistema si disaccoppia dalla produzione di contenuti.
  - *azione: Prima di sessione #61, verificare perché i quattro processi non si sono avviati stanotte: controllare i log di avvio (exit code, bat, marker di avvio come introdotto in fix(#57)). Priorità: riflusso FATTI e nina-loop, che condizionano direttamente la qualità RAG degli episodi successivi.*
- [ ] **[alta · SISTEMA]** Tre organi chiave sono piatti a 0.0: 'nina-loop', 'snapshot RAG' e 'AI news watcher'. Non ci sono log_issues che spieghino il motivo, ma il dato di salute è inequivocabile: stanotte questi processi non hanno prodotto output. In parallelo, il RAG mostra '2026-07-15 03:27:02 [rag_engine] INFO Totale: 18791 chunk | +add:0 mod:0 skip:429 -del:0': 429 chunk saltati, zero aggiunti. Il vettorstore non è cresciuto.
  - *azione: Verificare i log di nina-loop e AI news watcher per exit code / eccezione silenziosa. Per snapshot RAG, capire se il blocco è a monte (sorgenti tutte a 429) o nel processo di scrittura. Risolvere in sequenza prima di considerare la notte 'produttiva' sul fronte dati.*
- [ ] **[media · GENESIS]** 30 episodi su 56 controllati (53%) mancano di open_loop (qc_episodi: open_loop_missing=30, structure_fail=0). La struttura regge ma l'aggancio narrativo che trascina il lettore all'episodio successivo è assente in oltre metà del catalogo pubblicato — difetto sistematico, non sporadico.
  - *azione: Definire la regola open_loop come check obbligatorio nel QC episodi (caroselli_qc.py o equivalente), produrre la lista dei 30 episodi colpevoli e inserire un batch di retrofit nella prossima ondata, prioritizzando i primi episodi di ogni serie (maggiore visibilità).*
- [ ] **[media · GENESIS]** Su 56 episodi controllati, 30 mancano dell'open-loop (qc_episodi: open_loop_missing=30, ovvero il 54%). L'open-loop è il gancio che trascina il lettore all'episodio successivo: con Postiz quasi operativo e EP_SG_02_01 pronto per il test LinkedIn, pubblicare episodi senza open-loop significa sprecare la distribuzione appena sbloccata.
  - *azione: Prima di pubblicare EP_SG_02_01 come secondo test LinkedIn, verificare che quell'episodio specifico abbia l'open-loop. Poi aprire un task batch per aggiungere l'open-loop ai 30 mancanti: è lavoro per l'apprendista notturno, non per Matteo.*
- [ ] **[media · GENESIS]** Su 56 episodi verificati, 30 hanno open_loop_missing (qc_episodi: checked 56, open_loop_missing 30) — oltre il 53% del catalogo manca del gancio narrativo di chiusura. Questo non è un dato nuovo ma il volume è cresciuto: con CAP 2 L'ORGANISMO a 6 item pending in coda apprendista e il cammino Nina appena partito (3/53), ogni nuovo episodio prodotto senza open loop corretto dilata il debito anziché ridurlo.
  - *azione: Inserire il controllo open_loop come condizione di promozione nello stampo episodi (non solo QC ex-post): un episodio senza open loop non entra in _CANONE. Per il debito esistente, processare i 30 in batch durante ONDATA B sfruttando lo stampo già a canone.*
- [ ] **[media · GENESIS]** Il 'riflusso FATTI' è a 0.1: il meccanismo che dovrebbe riportare nel sistema le informazioni raccolte durante la notte è quasi fermo. Con la ricerca a 0 risultati (429) e il RAG a +0 chunk, il ciclo informativo notturno è interrotto su tutti e tre gli strati: acquisizione, vettorizzazione, riflusso.
  - *azione: Identificare il punto di rottura specifico del riflusso FATTI (l'agente non riceve input perché la ricerca è vuota, o il processo di scrittura nel vault è bloccato indipendentemente?). Se dipende dai 429, si risolve con la API key. Se è un problema separato, loggare e isolare.*
- [ ] **[media · RAG]** Due file _copia sono ancora nell'indice e rubano slot RRF nelle query. Log vault MENTE 2026-07-17: "FINANZA\la_scienza_finanziaria_l_asimmetria_di_valore_copia.md accanto all'originale — si rubano slot RRF (fondere o archiviare)" e "KNOWLEDGE\PROMPTS\istruzioni_ia_copia.md accanto all'originale — si rubano slot RRF (fondere o archiviare)". La sentinella doppioni esiste (commit 928d1889) e li ha rilevati: il ciclo si chiude solo con la rimozione.
  - *azione: Aprire i due file, verificare che non contengano delta rispetto all'originale, quindi cancellarli o archiviarli fuori dal vault. Operazione da 5 minuti: eseguire prima del prossimo rebuild indice per non ri-embeddare i duplicati.*
- [ ] **[media · RAG]** Il canone vault segnala uno scarto reale tra disco e canone dichiarato: 'su disco EP_N2_55, il canone dichiara EP_N2_53: aggiornare _CANONE.md' (2026-07-15). Sono 2 episodi fuori registro. In aggiunta, qc_episodi mostra 30 episodi su 55 con 'open_loop_missing': più della metà degli episodi esistenti manca del gancio narrativo previsto dal formato.
  - *azione: Aggiornare _CANONE.md portando max_ep_canone da 53 a 55 (operazione di 2 minuti, evita falsi allarmi futuri). Per open_loop_missing: valutare se è un gap di scrittura o un gap nel QC checker — se il checker non sa dove cercare l'open loop nel formato attuale, la metrica è rumore e va corretta alla fonte.*
- [ ] **[media · ROADMAP]** Il todo '2FA GitHub in attivazione (usare authenticator app + SALVARE recovery codes in _VAULT)' è aperto in bussola insieme alla nota 'Enea.2024 riusata = problema' sulla mail brand microindustry. Con Postiz live e credenziali LinkedIn/OAuth nel compose, la superficie di attacco è cresciuta questa settimana. Il blocker 'Chiavi .env da ruotare (red-team #38)' è già in lista ma la 2FA GitHub non ha ancora una sessione assegnata.
  - *azione: Dedicare i primi 15 minuti della sessione #66 (prima di toccare Docker) ad attivare la 2FA GitHub e salvare i recovery codes in _VAULT. Abbinare la rotazione delle chiavi .env nella stessa micro-sessione: sono entrambi task da tastiera, nessun prerequisito hardware.*
- [ ] **[media · ROADMAP]** La decisione MIMS Via B (connettori VULCAN, presa il 24/06) non ha ancora prodotto né il ricalcolo BEP sul tooling né la bozza B2 aggiornata, e il prerequisito fisico (martinetto Vevor) è fermo. Il pillar MIMS è al 30%: con V32 al 65% e GENESIS al 70%, MIMS rischia di diventare il collo strutturale del progetto industriale mentre l'attenzione è tutta su Postiz. La prima colata del giunto sblocca dati reali che oggi mancano al business case.
  - *azione: Fissare nella bussola una data concreta per il montaggio Vevor (prerequisito zero-cost, martinetto già in casa): anche solo 2 ore dedicate aprono la corsia MIMS e permettono di ricalcolare il BEP su dati veri invece di stime.*
- [ ] **[media · ROADMAP]** L'ATTACCO #2 è stato impostato e i 4 report dominio prodotti (commit 037c4302), ma il piano è 'propose-only, zero applicato'. La bussola_open elenca ONDATA C (finetune VERO con checkpoint+dataset 272 episodi) come task autonomo senza Matteo — ma il dataset cresce ogni notte su un canone sfasato (EP_N2_53 vs 56 su disco) e con 30 episodi senza open loop. Avviare il finetune su dati non validati consolida i difetti strutturali nel modello.
  - *azione: Prima di avviare ONDATA C, completare la riconciliazione canone (EP_N2_53→56) e passare i 30 episodi open_loop_missing attraverso lo stampo correttivo. Solo dopo il dataset è abbastanza pulito da giustificare il costo GPU del finetune.*
- [ ] **[media · ROADMAP]** 'PRE_01 Nina INSIEME (rifatto da 0, ≤10)' è segnato come punto condiviso della rotta e appare più volte nella bussola_open, ma è gated sulla disponibilità di Matteo e non ha una scadenza. Nel frattempo PRE_02/03 Nina sono dichiarati esplicitamente bloccati su di esso ('DOPO che PRE_01 insieme ha fissato lo standard'). Se questo todo scivola, blocca l'intero binario Nina.
  - *azione: Fissare nella prossima sessione con Matteo una slot dedicata a PRE_01 Nina: è il prerequisito che sblocca PRE_02/03 e allinea lo standard del secondo binario. Senza una data, il binario Nina resta fermo indefinitamente mentre quello SISTEMA avanza.*
- [ ] **[media · SISTEMA]** La corruzione HNSW da power-loss è avvenuta 3 volte in 2 giorni ed è listata come blocker esplicito. L'UPS da 50-80€ è identificato come cura alla radice ma non è ancora ordinato. Ogni ricostruzione dell'indice consuma tempo GPU notturno e rischia di lasciare vettori mancanti (il self-heal inverso di RAG v4.3 mitiga ma non elimina il rischio).
  - *azione: Ordinare l'UPS entro oggi, stesso momento in cui si ordina il mandrino ER20 — sono entrambi acquisti hardware bloccanti con importo definito. Finché non è in funzione, valutare uno shutdown controllato serale prima dello stop GPU invece dello spegnimento secco.*
- [ ] **[media · V32]** Il blocker UPS è censito come 'cura alla radice' alla corruzione HNSW ricorrente (3 volte in 2 giorni), ma rimane hardware non ordinato. Nel frattempo il RAG ha perso 944 chunk in una notte sola ("skip:429 -del:944" da "2026-07-16 03:45:17 [rag_engine] INFO Totale: 19814 chunk | +add:1 mod:5 skip:429 -del:944") — e il self-heal inverso introdotto in fix(#57) non può distinguere tra chunk persi per power-loss e chunk eliminati legittimamente. Ogni power-loss non protetto è un'erosione silenziosa del knowledge base.
  - *azione: Ordinare l'UPS (~50-80€, già identificato) contestualmente al mandrino 2.2kW ER20 — un solo ordine. Nel frattempo configurare ChromaDB con WAL (write-ahead log) se non già attivo, per rendere le scritture atomiche indipendentemente dal self-heal.*
- [ ] **[bassa · RAG]** Due orphan nel vault senza nessun link in ingresso: 'human_centeredness_in_translation' e 'quantum_espresso_a_modular_and_open_source_software_project_', entrambi in dominio KNOWLEDGE. Consumano chunk RAG e non sono raggiungibili da nessun percorso di retrieval contestuale.
  - *azione: Aprire i due file: se non pertinenti al dominio attivo (V32/MIMS/GENESIS/artigianato industriale), spostarli in ARCHIVIO o eliminarli. Se pertinenti, aggiungere almeno un wikilink da un nodo KNOWLEDGE attivo per renderli raggiungibili.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-07-19 00:23*
