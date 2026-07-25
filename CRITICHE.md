<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  25/07/2026 03:52](#il-polso-25072026-0352)
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

## IL POLSO — 25/07/2026 03:52

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 30 aperte / 225 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · RICERCA]** Il research_agent è cieco su Semantic Scholar: il log del 25/07 mostra «2026-07-25 03:39:00 [research_agent] WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=machine+tool+frame+structural+rigidity+gu» seguito da «2026-07-25 03:39:00 [research_agent] INFO semantic_scholar -> 0 risultati». La ricerca su rigidità strutturale (argomento critico per V32) restituisce zero perché viene bloccata prima ancora di partire. Il blocker 'SEMANTIC_SCHOLAR_API_KEY' è già identificato ma non risolto.
  - *azione: Matteo aggiunge SEMANTIC_SCHOLAR_API_KEY gratuita nel .env (richiesta su semanticscholar.org/product/api in ~5 min). Senza questo, ogni notte di ricerca V32/GENESIS brucia quota anonima e torna a mani vuote.*
- [ ] **[alta · RICERCA]** La ricerca notturna del 24/07 è andata completamente a vuoto su Semantic Scholar per mancanza di API key autenticata: "2026-07-24 03:38:37 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e "2026-07-24 03:39:01 [research_agent] INFO semantic_scholar -> 0 risultati". Stesso pattern su arxiv: "2026-07-24 03:40:47 [research_agent] WARNING [arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)". Entrambe le sorgenti primarie fallite nella stessa notte: la ricerca notturna è de facto disabilitata.
  - *azione: Al rientro (30/07): aggiungere SEMANTIC_SCHOLAR_API_KEY al .env (key gratuita, basta registrarsi su semanticscholar.org/product/api) — già identificato come blocker. Separatamente, aumentare read timeout arxiv da 15s a 30-45s nel config dell'agent.*
- [ ] **[alta · RICERCA]** La ricerca notturna del 23/07 è andata completamente a vuoto per doppio guasto simultaneo: Semantic Scholar ha restituito 429 su entrambe le query («2026-07-23 03:38:52 WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s» e «2026-07-23 03:40:49 WARNING [backoff] ... HTTP 429 — attendo 4s»), producendo «0 risultati» in entrambi i casi; arxiv ha aggiunto timeout di rete («2026-07-23 03:41:27 WARNING [arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)»). La SEMANTIC_SCHOLAR_API_KEY è già in blockers come soluzione nota ma non ancora applicata: ogni notte senza chiave è una sessione di ricerca persa.
  - *azione: Inserire la SEMANTIC_SCHOLAR_API_KEY nel .env prima del rientro (o delegare in remoto se possibile); alzare il read timeout arxiv da 15s a 30-45s nel config del research_agent.*
- [ ] **[alta · RICERCA]** La ricerca notturna del 22/07 è cieca su Semantic Scholar: due query distinte colpiscono il rate-limit anonimo e restituiscono zero risultati. Log 03:39:14: "[semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=machine+tool+frame+structural+rigidity+gu" → "semantic_scholar -> 0 risultati". Log 03:41:51: "[semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=autonomous+AI+agent+orchestration+2025" → "semantic_scholar -> 0 risultati". La chiave API gratuita è già in lista blockers da sessioni precedenti: il problema è strutturale e si ripete ogni notte.
  - *azione: Al rientro (30/07): inserire SEMANTIC_SCHOLAR_API_KEY nel .env — azione già identificata come blocker, richiede solo esecuzione. Verificare poi nei log del 31/07 che i 429 scompaiano e i risultati tornino > 0.*
- [ ] **[alta · RICERCA]** La ricerca notturna è cieca su Semantic Scholar: i log del 21/07 mostrano due 429 consecutivi senza recupero — "2026-07-21 03:39:11 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e "2026-07-21 03:40:32 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 4s" — seguiti da zero risultati: "2026-07-21 03:40:53 [research_agent] INFO semantic_scholar -> 0 risultati". OpenAlex era già vuota in precedenza: "2026-07-21 03:39:10 [research_agent] INFO openalex -> 0 risultati". ArXiv ha aggiunto un timeout: "2026-07-21 03:39:58 [research_agent] WARNING [arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)". Risultato: la notte ha prodotto ricerca nulla su tutte e tre le sorgenti principali. Il blocker è già identificato nel sistema (SEMANTIC_SCHOLAR_API_KEY mancante in .env) ma non è stato applicato.
  - *azione: Inserire SEMANTIC_SCHOLAR_API_KEY in .env prima del rientro o delegare il passo a un promemoria 30/07 esplicito accanto ai 3 post Meta. È un'operazione da 5 minuti che sblocca l'intera corsia ricerca notturna.*
- [ ] **[alta · ROADMAP]** L'UPS (~50-80€) è il terzo episodio di corruzione HNSW da power-loss in 2 giorni (blocker esplicito). Con 20.784 chunk RAG e la rebuild BGE-M3 in attesa di essere eseguita (bussola_open), un quarto evento di corruzione durante o dopo la rebuild potrebbe richiedere ore di ripristino da snapshot. Il rischio non è futuro: è già occorso 3 volte e Matteo rientra il 30/07.
  - *azione: Acquistare UPS prima o contestualmente al rientro — non dopo la rebuild BGE-M3. L'ordine logico è: UPS installato → rebuild RAG → 3 post caricati. Costo/rischio: 50-80€ contro potenziale perdita dell'intero indice semantico.*
- [ ] **[alta · ROADMAP]** L'UPS (~50-80€) è in lista blockers da almeno 2 sessioni, la corruzione HNSW da power-loss è avvenuta 3 volte in 2 giorni, e Matteo parte stasera per 7 giorni lasciando il sistema in autonomia completa. Se si verifica un quarto episodio durante l'assenza, non c'è presidio per il ripristino e i 20.533 chunk RAG sono a rischio. L'acquisto non è rimandabile a dopo il mare: può essere ordinato online oggi in pochi minuti prima della partenza.
  - *azione: Ordinare l'UPS online prima di partire stasera (es. Amazon con consegna al rientro 29-30/07). In parallelo: eseguire uno snapshot manuale del chroma_db adesso, così il rollback è disponibile anche senza UPS per i prossimi 7 giorni.*
- [ ] **[alta · SISTEMA]** Tre organi vitali risultano piatti (0.0) stanotte: nina-loop, snapshot RAG e AI news watcher. Il dato è nel campo organi_vivi del report corrente, non in un log con riga datata, quindi non è possibile citare un errore esplicito — ma il pattern è costante e il sistema è in stato di manutenzione ridotta mentre Matteo è assente 7 giorni. Se snapshot RAG rimane a 0.0, un power-loss (già occorso 3 volte in 2 giorni per assenza UPS) corrompe HNSW senza checkpoint recente da cui recuperare.
  - *azione: Verificare al rientro (30/07) perché snapshot RAG non gira: controllare il cron/task scheduler e il log del servizio. Nel frattempo l'UPS (~50-80€) resta il presidio fisico immediato da ordinare prima di qualsiasi altra spesa hardware.*
- [ ] **[alta · SISTEMA]** Il canone su disco ha raggiunto EP_N2_60 ma _CANONE.md dichiara max EP_N2_56: "su disco EP_N2_60, il canone dichiara EP_N2_56: aggiornare _CANONE.md" (2026-07-24). Con 4 episodi non registrati nel canone e canon_violations=4, il canon_guard sta operando su una baseline sfasata. Ogni controllo di integrità o QC che usa il canone come riferimento è sistematicamente sbagliato di 4 unità.
  - *azione: Allineare _CANONE.md a EP_N2_60 appena possibile (non serve aspettare il rientro: è un'operazione da 2 minuti se c'è accesso remoto, altrimenti prima cosa al 30/07 prima di caricare i 3 post Meta).*
- [ ] **[alta · SISTEMA]** Tre organi vitali mostrano uptime 0.0 stanotte: nina-loop, snapshot RAG, AI news watcher. Il riflusso FATTI segna 3.1 (anomalo rispetto al valore atteso normalizzato). Non ci sono righe di log che spieghino il motivo dello stop — il sistema non sta loggando i fallimenti di questi organi, li sta semplicemente saltando in silenzio. Questo è coerente con il noto problema dei 101 except larghi in 47 file (bussola_open B).
  - *azione: Verificare al rientro perché nina-loop e snapshot RAG non si sono avviati: controllare i log di avvio dei rispettivi servizi (non i log di esecuzione — quelli sono vuoti). Se il problema è il boot (come suggerisce anche il caso Vite/dashboard in bussola_open), auditare START_LOGIN per i servizi mancanti.*
- [ ] **[alta · SISTEMA]** Tre organi critici risultano fermi a 0.0: nina-loop, snapshot RAG e AI news watcher. Con Matteo al mare per 7 giorni e nessuna supervisione manuale, un eventuale crash notturno (aggravato dall'UPS mancante, già a 3 episodi di corruzione HNSW in 2 giorni) non verrebbe intercettato da nessun watchdog attivo.
  - *azione: Prima di partire: verificare perché i tre organi segnano 0.0 (crash, dipendenza mancante o task disabilitato) e ripristinare almeno nina-loop e snapshot RAG, che sono guardia diretta sulla produzione di contenuto e integrità del RAG.*
- [ ] **[alta · SISTEMA]** Il canone dichiara EP_N2_56 come massimo ma su disco esiste già EP_N2_60: «su disco EP_N2_60, il canone dichiara EP_N2_56: aggiornare _CANONE.md» (2026-07-23). Un delta di 4 episodi non tracciati significa che QC, retention e vault_intersect operano su una base incompleta. Con Matteo assente 7 giorni e lo story_agent attivo ogni notte, il gap crescerà ulteriormente.
  - *azione: Al rientro (o da remoto prima): aggiornare _CANONE.md a EP_N2_60, verificare che i 4 episodi non tracciati abbiano superato QC e non siano tra i 31 con open_loop_missing.*
- [ ] **[alta · SISTEMA]** Tre organi vitali risultano spenti (score 0.0): nina-loop, snapshot RAG, AI news watcher. Con Matteo assente 7 giorni e nessun presidio manuale, un guasto non rilevato su nina-loop o snapshot RAG in questo intervallo non verrà scoperto fino al 29/07. In particolare, lo snapshot RAG a 0.0 lascia il database HNSW senza punto di ripristino — e la corruzione da power-loss è già avvenuta 3 volte in 2 giorni secondo i blockers.
  - *azione: Prima della partenza: verificare perché i tre organi hanno score 0.0 (processo crashato, servizio non avviato, o check_ecosistema non li vede). Priorità assoluta sullo snapshot RAG: se l'UPS non è ancora installato, almeno uno snapshot manuale pre-partenza garantisce un punto di rollback per i 7 giorni.*
- [ ] **[alta · SISTEMA]** Tre organi schedulati risultano morti (uptime 0.0): nina-loop, snapshot RAG, AI news watcher. Con Matteo assente 7 giorni, qualsiasi power-loss o riavvio non presidiato lascia il sistema senza snapshot di recovery e senza aggiornamento dell'indice Nina. Il blocker hardware UPS è già noto ("corruzione HNSW da power-loss ricorrente, 3 volte in 2gg") ma l'UPS non è ancora installato: durante l'assenza non c'è né protezione hardware né organo di snapshot attivo che limiti il danno.
  - *azione: Verificare prima della partenza (22/07 sera) perché nina-loop e snapshot RAG hanno uptime 0.0: se i processi sono crashati, riavviarli e controllare i log di errore. L'UPS resta priorità hardware al rientro — nel frattempo uno snapshot manuale di chroma_db prima di partire riduce l'esposizione.*
- [ ] **[media · GENESIS]** Il canone dichiara EP_N2_56 come massimo episodio ma su disco esiste EP_N2_61: il log del 25/07 riporta «su disco EP_N2_61, il canone dichiara EP_N2_56: aggiornare _CANONE.md». Cinque episodi non sono registrati nel canone ufficiale. Con 32 episodi su 61 già privi di open_loop (qc_episodi) e 4 canon_violations attive, il delta cresce ogni notte in modo non supervisionato.
  - *azione: Allineare _CANONE.md a EP_N2_61 al rientro: aggiungere i 5 episodi mancanti con status corretto. Poi eseguire canon_guard per azzerare le 4 violations prima di generare nuovi episodi.*
- [ ] **[media · GENESIS]** 32 episodi su 61 mancano di open_loop (qc_episodi.open_loop_missing=32, pari al 52%). L'open_loop è il gancio narrativo che porta il lettore all'episodio successivo: la sua assenza dimezza il valore di retention della serie proprio mentre i post social stanno per uscire in automatico nei prossimi 7 giorni senza possibilità di intervento.
  - *azione: Prioritizzare la correzione degli open_loop sugli episodi già programmati per la pubblicazione (EP_N2_04→EP_N2_06, EP_SG_02_04) prima o subito dopo il rientro del 30/07, quando si caricano anche i 3 post rimasti.*
- [ ] **[media · GENESIS]** Su 60 episodi controllati dal QC, 31 hanno open_loop_missing (52%). Il sistema genera episodi senza gancio narrativo di chiusura in più della metà dei casi. Con n_episodes=291 totali, se il tasso è stabile, oltre 150 episodi nel vault mancano di open loop — un problema di qualità strutturale dello story_agent, non un caso isolato.
  - *azione: Verificare il prompt dello story_agent: l'open loop deve essere un campo obbligatorio con validazione pre-commit (se manca, il QC deve bloccare la scrittura su disco, non solo segnalarlo a posteriori). Priorità media perché Matteo è via — ma da mettere in agenda per la sessione #68.*
- [ ] **[media · GENESIS]** Il canone dichiarato e il disco sono disallineati: log 22/07 "su disco EP_N2_59, il canone dichiara EP_N2_56: aggiornare _CANONE.md". Con 3 episodi non registrati nel canone e canon_violations=4, il tabellone di riferimento non riflette lo stato reale. Questo rischia di far rigenerare episodi già esistenti o saltare la numerazione nelle prossime sessioni di produzione.
  - *azione: Al rientro (30/07), prima di qualsiasi produzione Nina: aprire _CANONE.md, aggiornare max_ep da 56 a 59, verificare che EP_N2_57/58/59 abbiano scheda completa. Azzerare le 4 canon_violations rimaste.*
- [ ] **[media · GENESIS]** story_agent gira non autenticato su HuggingFace Hub: "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads" (2026-07-21). Con 7 notti autonome davanti, un rate-limit HF durante il download di un modello blocca silenziosamente la generazione episodi senza alert esplicito.
  - *azione: Aggiungere HF_TOKEN alle variabili d'ambiente del servizio story_agent (o in .env). Operazione da 2 minuti; previene interruzioni notturne non presidiate durante l'assenza.*
- [ ] **[media · RAG]** 31 episodi su 60 controllati mancano di open_loop (open_loop_missing=31, 52%). Il campo open_loop è il gancio narrativo che alimenta l'engagement nei caroselli; episodi senza di esso entrano nel RAG come contenuto piatto e, se promossi, producono post senza call-to-action. Il problema è sistematico, non sporadico.
  - *azione: Aggiungere al QC notturno un flag esplicito che metta in quarantena gli episodi con open_loop_missing prima che raggiungano la coda caroselli; prioritizzare la correzione manuale sugli episodi già in coda social.*
- [ ] **[media · RAG]** Il canone episodi è sfasato: "su disco EP_N2_58, il canone dichiara EP_N2_56: aggiornare _CANONE.md" (2026-07-21). Con 4 canon_violations totali e lo sfasamento a +2 episodi, qualsiasi tool che si basa sul canone per decidere cosa promuovere o scartare opera su una mappa sbagliata. Durante i 7 giorni di assenza lo story_agent continuerà a generare episodi su un canone già stale.
  - *azione: Aggiornare _CANONE.md portando max_ep_canone da 56 a 58 (o al valore corretto verificato su disco) prima della partenza, così lo story_agent notturno ha un riferimento coerente per tutta la settimana.*
- [ ] **[media · RICERCA]** Nella stessa sessione di ricerca, arxiv ha restituito un timeout di rete: log 03:39:30 "[arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)". Il timeout a 15s è troppo stretto per export.arxiv.org nelle ore notturne. Combinato con il 429 su Semantic Scholar, la ricerca notturna del 22/07 ha operato con almeno due sorgenti primarie su tre degradate.
  - *azione: Aumentare il read timeout arxiv a 30-45s nel config del research_agent. Aggiungere un contatore di sorgenti-ok per notte nel report mattutino: se < 2 sorgenti attive, emettere un WARNING aggregato anziché log sparsi.*
- [ ] **[media · ROADMAP]** La bussola segnala che requirements.txt non ha nessuna versione pinnata (0 '=='): stessa classe di bug che ha già rotto un finetune in precedenza. Il sistema si auto-modifica ogni notte (33 commit in 7 giorni) con dipendenze fluttuanti. Durante i 7 giorni di assenza un aggiornamento silenzioso di una libreria può rompere un organo vitale senza che ci sia nessuno a intervenire.
  - *azione: Prima della prossima sessione di sviluppo: eseguire 'pip freeze > requirements.txt' nell'ambiente attivo e committare. Blocca il rischio di deriva delle dipendenze a costo zero.*
- [ ] **[media · ROADMAP]** Il todo BGE-M3 è pronto al click da almeno 3 giorni (snapshot scattato, script verificato) ma resta bloccato in attesa di Matteo. Ogni notte di story_agent e vault_intersect che gira ancora su embedding legacy produce collegamenti semantici di qualità inferiore, e il costo del rebuild cresce con i chunk (già 20.697). Sette giorni di assenza aggravano il ritardo: al rientro ci sarà anche il carico dei 3 post da caricare e il canone da aggiornare.
  - *azione: Calendarizzare BGE-M3 come prima azione tecnica al rientro del 29/07, prima di qualsiasi altra attività RAG; lo script è già pronto e il rollback è garantito dallo snapshot esistente.*
- [ ] **[media · ROADMAP]** BGE-M3 è pronto al click da almeno 24 ore (snapshot già scattato il 20/07, script verificato) ma resta bloccato perché richiede UAC di Matteo. Non è un todo qualsiasi: ogni notte che passa, vault_intersect e linkgraph operano sul vecchio embedder, e al rientro ci sarà anche il backlog di episodi generati durante l'assenza da riallineare. Più si aspetta, più costosa è la calibrazione post-rebuild.
  - *azione: Eseguire rebuild_rag_bge_m3.ps1 la sera del 22/07 prima di partire (stima 15-20 min, macchina incustodita), oppure pianificarlo come primo atto tecnico del 30/07 prima di caricare i 3 post Meta — non dopo.*
- [ ] **[media · SISTEMA]** Lo story_agent gira senza token HF autenticato: il log del 25/07 mostra «Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads.». Con Matteo assente 7 giorni e il loop notturno che genera episodi ogni notte, un rate-limit HF anonimo può interrompere la generazione senza che nessuno se ne accorga.
  - *azione: Aggiungere HF_TOKEN al .env (token gratuito su huggingface.co/settings/tokens). Da abbinare alla rotazione delle chiavi .env già schedulata (blocker red-team #38).*
- [ ] **[media · SISTEMA]** story_agent_run.log del 24/07 segnala: "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads." L'agent HuggingFace gira senza token: in caso di picco di traffico HF o rate-limit, i download di modelli fallirebbero silenziosamente durante le notturne — senza che ci sia un errore esplicito nel log.
  - *azione: Aggiungere HF_TOKEN al .env (token gratuito da huggingface.co/settings/tokens). Operazione da 5 minuti, da fare insieme alla rotazione chiavi e all'aggiunta di SEMANTIC_SCHOLAR_API_KEY al rientro.*
- [ ] **[media · SISTEMA]** HuggingFace Hub opera senza token ogni notte: «Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads» (2026-07-23). Con 7 notti di story_agent automatico, un rate-limit HF non autenticato può bloccare i download di modelli esattamente come il 429 di Semantic Scholar ha bloccato la ricerca.
  - *azione: Aggiungere HF_TOKEN al .env (token read-only gratuito sufficiente) prima della partenza; verificare che story_agent lo legga all'avvio.*
- [ ] **[media · SISTEMA]** story_agent gira senza token HF autenticato: log 22/07 "Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads." Con Matteo assente 7 giorni, il rischio è che HF Hub imponga rate-limit sui download notturni e blocchi la generazione episodi — l'unica pipeline automatica attiva in questo periodo.
  - *azione: Aggiungere HF_TOKEN al .env prima della partenza (o delegare al sistema: il token è già disponibile nell'account HF di Matteo). Non richiede codice, solo una riga nel file di configurazione.*
- [ ] **[bassa · V32]** Il pillar V32 è al 65% ma i due prerequisiti fisici sequenziali (martinetto Vevor da montare → prima colata giunto; mandrino 2.2kW ER20 da ordinare → fresatura stampi MIMS) sono entrambi aperti e non hanno una data. Con Matteo fuori 7 giorni e MIMS al 30%, il rischio non è l'avanzamento questa settimana ma che al rientro il backlog social assorba tutta l'energia e i prerequisiti fisici slittino ancora.
  - *azione: Al rientro (30/07), prima di aprire Business Suite per i 3 post, dedicare 15 minuti a ordinare il mandrino ER20 (acquisto online, non richiede presenza fisica) così il lead time parte mentre si completano i post.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-07-25 03:52*
