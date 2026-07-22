<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  22/07/2026 03:52](#il-polso-22072026-0352)
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

## IL POLSO — 22/07/2026 03:52

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 18 aperte / 207 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · RAG]** Due file _copia attivi nel vault rubano slot RRF alla retrieval: (2026-07-19) "FINANZA\la_scienza_finanziaria_l_asimmetria_di_valore_copia.md accanto all'originale" e (2026-07-19) "KNOWLEDGE\PROMPTS\istruzioni_ia_copia.md accanto all'originale". La sentinella doppioni (backlog #6) li ha rilevati ma non sono stati rimossi: il problema è noto e aperto.
  - *azione: Aprire i due file, confrontare con l'originale, scegliere fondere o archiviare, eliminare i _copia. Poi rieseguire build_index incrementale per pulire i chunk duplicati da ChromaDB.*
- [ ] **[alta · RICERCA]** La ricerca notturna del 22/07 è cieca su Semantic Scholar: due query distinte colpiscono il rate-limit anonimo e restituiscono zero risultati. Log 03:39:14: "[semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=machine+tool+frame+structural+rigidity+gu" → "semantic_scholar -> 0 risultati". Log 03:41:51: "[semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=autonomous+AI+agent+orchestration+2025" → "semantic_scholar -> 0 risultati". La chiave API gratuita è già in lista blockers da sessioni precedenti: il problema è strutturale e si ripete ogni notte.
  - *azione: Al rientro (30/07): inserire SEMANTIC_SCHOLAR_API_KEY nel .env — azione già identificata come blocker, richiede solo esecuzione. Verificare poi nei log del 31/07 che i 429 scompaiano e i risultati tornino > 0.*
- [ ] **[alta · RICERCA]** La ricerca notturna è cieca su Semantic Scholar: i log del 21/07 mostrano due 429 consecutivi senza recupero — "2026-07-21 03:39:11 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e "2026-07-21 03:40:32 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 4s" — seguiti da zero risultati: "2026-07-21 03:40:53 [research_agent] INFO semantic_scholar -> 0 risultati". OpenAlex era già vuota in precedenza: "2026-07-21 03:39:10 [research_agent] INFO openalex -> 0 risultati". ArXiv ha aggiunto un timeout: "2026-07-21 03:39:58 [research_agent] WARNING [arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)". Risultato: la notte ha prodotto ricerca nulla su tutte e tre le sorgenti principali. Il blocker è già identificato nel sistema (SEMANTIC_SCHOLAR_API_KEY mancante in .env) ma non è stato applicato.
  - *azione: Inserire SEMANTIC_SCHOLAR_API_KEY in .env prima del rientro o delegare il passo a un promemoria 30/07 esplicito accanto ai 3 post Meta. È un'operazione da 5 minuti che sblocca l'intera corsia ricerca notturna.*
- [ ] **[alta · ROADMAP]** L'UPS (~50-80€) è in lista blockers da almeno 2 sessioni, la corruzione HNSW da power-loss è avvenuta 3 volte in 2 giorni, e Matteo parte stasera per 7 giorni lasciando il sistema in autonomia completa. Se si verifica un quarto episodio durante l'assenza, non c'è presidio per il ripristino e i 20.533 chunk RAG sono a rischio. L'acquisto non è rimandabile a dopo il mare: può essere ordinato online oggi in pochi minuti prima della partenza.
  - *azione: Ordinare l'UPS online prima di partire stasera (es. Amazon con consegna al rientro 29-30/07). In parallelo: eseguire uno snapshot manuale del chroma_db adesso, così il rollback è disponibile anche senza UPS per i prossimi 7 giorni.*
- [ ] **[alta · SISTEMA]** Tre organi vitali risultano spenti (score 0.0): nina-loop, snapshot RAG, AI news watcher. Con Matteo assente 7 giorni e nessun presidio manuale, un guasto non rilevato su nina-loop o snapshot RAG in questo intervallo non verrà scoperto fino al 29/07. In particolare, lo snapshot RAG a 0.0 lascia il database HNSW senza punto di ripristino — e la corruzione da power-loss è già avvenuta 3 volte in 2 giorni secondo i blockers.
  - *azione: Prima della partenza: verificare perché i tre organi hanno score 0.0 (processo crashato, servizio non avviato, o check_ecosistema non li vede). Priorità assoluta sullo snapshot RAG: se l'UPS non è ancora installato, almeno uno snapshot manuale pre-partenza garantisce un punto di rollback per i 7 giorni.*
- [ ] **[alta · SISTEMA]** Tre organi schedulati risultano morti (uptime 0.0): nina-loop, snapshot RAG, AI news watcher. Con Matteo assente 7 giorni, qualsiasi power-loss o riavvio non presidiato lascia il sistema senza snapshot di recovery e senza aggiornamento dell'indice Nina. Il blocker hardware UPS è già noto ("corruzione HNSW da power-loss ricorrente, 3 volte in 2gg") ma l'UPS non è ancora installato: durante l'assenza non c'è né protezione hardware né organo di snapshot attivo che limiti il danno.
  - *azione: Verificare prima della partenza (22/07 sera) perché nina-loop e snapshot RAG hanno uptime 0.0: se i processi sono crashati, riavviarli e controllare i log di errore. L'UPS resta priorità hardware al rientro — nel frattempo uno snapshot manuale di chroma_db prima di partire riduce l'esposizione.*
- [ ] **[alta · SISTEMA]** daily brief è piatto a 0.0 — unico organo vitale a zero su tutti i monitorati (nina-loop 1.9, RAG 1.9, watcher 1.9). Non è un rallentamento: è fermo. Nessun log di esecuzione rilevato stanotte.
  - *azione: Verificare il task scheduler del daily brief (bat/Task Scheduler Windows): controllare exit code, log di avvio e se il processo viene ucciso prima della scrittura. Stesso approccio usato per ai_news_watcher in fix(#57) — aggiungere marker avvio nel logger e exit code nel bat.*
- [ ] **[media · GENESIS]** Il canone dichiarato e il disco sono disallineati: log 22/07 "su disco EP_N2_59, il canone dichiara EP_N2_56: aggiornare _CANONE.md". Con 3 episodi non registrati nel canone e canon_violations=4, il tabellone di riferimento non riflette lo stato reale. Questo rischia di far rigenerare episodi già esistenti o saltare la numerazione nelle prossime sessioni di produzione.
  - *azione: Al rientro (30/07), prima di qualsiasi produzione Nina: aprire _CANONE.md, aggiornare max_ep da 56 a 59, verificare che EP_N2_57/58/59 abbiano scheda completa. Azzerare le 4 canon_violations rimaste.*
- [ ] **[media · GENESIS]** story_agent gira non autenticato su HuggingFace Hub: "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads" (2026-07-21). Con 7 notti autonome davanti, un rate-limit HF durante il download di un modello blocca silenziosamente la generazione episodi senza alert esplicito.
  - *azione: Aggiungere HF_TOKEN alle variabili d'ambiente del servizio story_agent (o in .env). Operazione da 2 minuti; previene interruzioni notturne non presidiate durante l'assenza.*
- [ ] **[media · GENESIS]** 30 episodi su 56 controllati (53%) mancano di open_loop (qc_episodi: open_loop_missing=30, structure_fail=0). La struttura regge ma l'aggancio narrativo che trascina il lettore all'episodio successivo è assente in oltre metà del catalogo pubblicato — difetto sistematico, non sporadico.
  - *azione: Definire la regola open_loop come check obbligatorio nel QC episodi (caroselli_qc.py o equivalente), produrre la lista dei 30 episodi colpevoli e inserire un batch di retrofit nella prossima ondata, prioritizzando i primi episodi di ogni serie (maggiore visibilità).*
- [ ] **[media · RAG]** Il canone episodi è sfasato: "su disco EP_N2_58, il canone dichiara EP_N2_56: aggiornare _CANONE.md" (2026-07-21). Con 4 canon_violations totali e lo sfasamento a +2 episodi, qualsiasi tool che si basa sul canone per decidere cosa promuovere o scartare opera su una mappa sbagliata. Durante i 7 giorni di assenza lo story_agent continuerà a generare episodi su un canone già stale.
  - *azione: Aggiornare _CANONE.md portando max_ep_canone da 56 a 58 (o al valore corretto verificato su disco) prima della partenza, così lo story_agent notturno ha un riferimento coerente per tutta la settimana.*
- [ ] **[media · RICERCA]** Nella stessa sessione di ricerca, arxiv ha restituito un timeout di rete: log 03:39:30 "[arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)". Il timeout a 15s è troppo stretto per export.arxiv.org nelle ore notturne. Combinato con il 429 su Semantic Scholar, la ricerca notturna del 22/07 ha operato con almeno due sorgenti primarie su tre degradate.
  - *azione: Aumentare il read timeout arxiv a 30-45s nel config del research_agent. Aggiungere un contatore di sorgenti-ok per notte nel report mattutino: se < 2 sorgenti attive, emettere un WARNING aggregato anziché log sparsi.*
- [ ] **[media · ROADMAP]** BGE-M3 è pronto al click da almeno 24 ore (snapshot già scattato il 20/07, script verificato) ma resta bloccato perché richiede UAC di Matteo. Non è un todo qualsiasi: ogni notte che passa, vault_intersect e linkgraph operano sul vecchio embedder, e al rientro ci sarà anche il backlog di episodi generati durante l'assenza da riallineare. Più si aspetta, più costosa è la calibrazione post-rebuild.
  - *azione: Eseguire rebuild_rag_bge_m3.ps1 la sera del 22/07 prima di partire (stima 15-20 min, macchina incustodita), oppure pianificarlo come primo atto tecnico del 30/07 prima di caricare i 3 post Meta — non dopo.*
- [ ] **[media · ROADMAP]** Il todo '2FA GitHub in attivazione (usare authenticator app + SALVARE recovery codes in _VAULT)' è aperto in bussola insieme alla nota 'Enea.2024 riusata = problema' sulla mail brand microindustry. Con Postiz live e credenziali LinkedIn/OAuth nel compose, la superficie di attacco è cresciuta questa settimana. Il blocker 'Chiavi .env da ruotare (red-team #38)' è già in lista ma la 2FA GitHub non ha ancora una sessione assegnata.
  - *azione: Dedicare i primi 15 minuti della sessione #66 (prima di toccare Docker) ad attivare la 2FA GitHub e salvare i recovery codes in _VAULT. Abbinare la rotazione delle chiavi .env nella stessa micro-sessione: sono entrambi task da tastiera, nessun prerequisito hardware.*
- [ ] **[media · SISTEMA]** story_agent gira senza token HF autenticato: log 22/07 "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads." Con Matteo assente 7 giorni, il rischio è che HF Hub imponga rate-limit sui download notturni e blocchi la generazione episodi — l'unica pipeline automatica attiva in questo periodo.
  - *azione: Aggiungere HF_TOKEN al .env prima della partenza (o delegare al sistema: il token è già disponibile nell'account HF di Matteo). Non richiede codice, solo una riga nel file di configurazione.*
- [ ] **[media · SISTEMA]** La corruzione HNSW da power-loss è avvenuta 3 volte in 2 giorni ed è listata come blocker esplicito. L'UPS da 50-80€ è identificato come cura alla radice ma non è ancora ordinato. Ogni ricostruzione dell'indice consuma tempo GPU notturno e rischia di lasciare vettori mancanti (il self-heal inverso di RAG v4.3 mitiga ma non elimina il rischio).
  - *azione: Ordinare l'UPS entro oggi, stesso momento in cui si ordina il mandrino ER20 — sono entrambi acquisti hardware bloccanti con importo definito. Finché non è in funzione, valutare uno shutdown controllato serale prima dello stop GPU invece dello spegnimento secco.*
- [ ] **[bassa · RAG]** Due orphan nel vault senza nessun link in ingresso: 'human_centeredness_in_translation' e 'quantum_espresso_a_modular_and_open_source_software_project_', entrambi in dominio KNOWLEDGE. Consumano chunk RAG e non sono raggiungibili da nessun percorso di retrieval contestuale.
  - *azione: Aprire i due file: se non pertinenti al dominio attivo (V32/MIMS/GENESIS/artigianato industriale), spostarli in ARCHIVIO o eliminarli. Se pertinenti, aggiungere almeno un wikilink da un nodo KNOWLEDGE attivo per renderli raggiungibili.*
- [ ] **[bassa · V32]** Il pillar V32 è al 65% ma i due prerequisiti fisici sequenziali (martinetto Vevor da montare → prima colata giunto; mandrino 2.2kW ER20 da ordinare → fresatura stampi MIMS) sono entrambi aperti e non hanno una data. Con Matteo fuori 7 giorni e MIMS al 30%, il rischio non è l'avanzamento questa settimana ma che al rientro il backlog social assorba tutta l'energia e i prerequisiti fisici slittino ancora.
  - *azione: Al rientro (30/07), prima di aprire Business Suite per i 3 post, dedicare 15 minuti a ordinare il mandrino ER20 (acquisto online, non richiede presenza fisica) così il lead time parte mentre si completano i post.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-07-22 03:52*
