<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  09/07/2026 03:52](#il-polso-09072026-0352)
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

## IL POLSO — 09/07/2026 03:52

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 24 aperte / 159 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · GENESIS]** Cinque organi vitali su sette sono fermi o quasi: nina-loop=0.0, snapshot RAG=0.0, AI news watcher=0.0, riflusso FATTI=0.1. L'inventario notturno, la retention disco e il daily brief girano parzialmente (0.6). Con snapshot RAG=0.0, ogni power-loss (già accaduto 3 volte in 2gg secondo i blockers) corrode HNSW senza rete di sicurezza. Con nina-loop=0.0 la generazione episodi stanotte non ha avuto loop attivo (il commit "auto: story_agent" è presente ma il loop risulta piatto).
  - *azione: Prima di sessione #56: verificare i log di avvio di nina-loop e snapshot RAG per identificare se il blocco è un crash silenzioso, un lock non rilasciato o un processo mai partito. Riparare snapshot RAG ha priorità assoluta finché l'UPS non è installato.*
- [ ] **[alta · RAG]** Tre organi notturni su sei sono fermi (score 0.0): nina-loop, snapshot RAG, AI news watcher. Il riflusso FATTI è quasi assente (0.1). Il sistema genera episodi (commit 2026-07-09 "story_agent - episodi generati") ma senza nina-loop attivo la pipeline è cieca: produce contenuto senza retroalimentazione dal corpus. Lo snapshot RAG a zero significa che la protezione contro corruzione HNSW da power-loss — già occorsa 3 volte in 2 giorni per mancanza UPS — non ha un backup notturno fresco.
  - *azione: Verificare perché nina-loop e snapshot RAG risultano 0.0 stanotte (log di avvio, eventuale eccezione silenziosa). Priorità snapshot RAG: finché l'UPS non è installato è l'unica rete di sicurezza contro la corruzione HNSW ricorrente.*
- [ ] **[alta · RAG]** 1 canon_violation attiva segnalata dai dati di stanotte. Il milestone #52 identifica la causa: '_CANONE.md:13 punta a V32-su-molle/recuperato vietato'. Finché quella riga non viene corretta, ogni rebuild RAG indicizza materiale esplicitamente vietato, avvelenando il corpus con una fonte di verità stantia.
  - *azione: Aprire _CANONE.md, correggere la riga 13 con il riferimento aggiornato a V32-epoxy-granite, poi eseguire rebuild-hard RAG e verificare canon_violations=0 nell'inventario notturno successivo.*
- [ ] **[alta · RAG]** La corruzione HNSW da power-loss è ricorrente (3 volte in 2 giorni, dichiarato nei blockers) e il rimedio strutturale — UPS ~50-80€ — è identificato ma non ancora ordinato. Il fix software (drop-hnsw + incremental + snapshot, commit 65f6c606) cura il sintomo post-guasto, non la causa: ogni blackout ricrea il problema e costa una sessione di recovery.
  - *azione: Includere l'UPS nell'ordine hardware già pianificato (Vevor + ER20): è il componente a minor costo dell'ordine (~50-80€) e blocca un loop di guasto ricorrente che ha già consumato tempo di sessione misurabile. L'ordine è la singola azione con il rapporto costo/danno evitato più alto nell'intero backlog.*
- [ ] **[alta · RICERCA]** La ricerca notturna è cieca su Semantic Scholar: due sessioni di 429 consecutive con fallback a zero risultati. Log research_agent.log 2026-07-08: "2026-07-08 03:38:33 [...] HTTP 429 — attendo 1s" → "2026-07-08 03:38:56 [...] semantic_scholar -> 0 risultati". Log night_research.log 2026-07-08: "2026-07-08 03:40:02 [...] HTTP 429 — attendo 4s" → "2026-07-08 03:40:23 [...] semantic_scholar -> 0 risultati". La chiave gratuita è già nei blockers da sessioni precedenti; stanotte il danno è confermato nei log: zero paper acquisiti su entrambe le query (AI agent orchestration + machine tool rigidity).
  - *azione: Matteo inserisce SEMANTIC_SCHOLAR_API_KEY in .env (chiave gratuita, nessun costo). Verifica immediata: rieseguire manualmente una query e controllare che il 429 scompaia prima della sessione #56.*
- [ ] **[alta · RICERCA]** Semantic Scholar in throttling strutturale: "2026-07-05 03:39:24 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s" e "2026-07-05 03:39:57 [research_agent] WARNING [semantic_scholar] 429 Client Error: for url: https://api.semanticscholar.org/graph/v1/paper/search?query=local+large+language+model+fine-tuning+Lo". Il risultato diretto è "2026-07-05 03:39:57 [research_agent] INFO semantic_scholar -> 0 risultati": la sorgente primaria è degradata ogni notte senza API key autenticata. Parallelamente OpenAlex restituisce "2026-07-05 03:40:02 [research_agent] INFO openalex -> 0 risultati": la ricerca notturna è di fatto cieca su entrambe le sorgenti principali.
  - *azione: Registrare e inserire in .env la SEMANTIC_SCHOLAR_API_KEY gratuita (già identificata come blocker): alza il rate-limit da 1 req/s a 10 req/s senza costi. Per OpenAlex diagnosticare separatamente se il query term 'local+large+language+model+fine-tuning' è troppo specifico o se c'è un filtro data che azzera i risultati.*
- [ ] **[alta · ROADMAP]** L'UPS (~50-80€) è il blocker hardware più urgente del sistema ma resta in lista gated-Matteo senza data. La corruzione HNSW è già avvenuta 3 volte in 2 giorni e lo snapshot RAG notturno è a 0.0 stanotte: ogni black-out azzera ore di rebuild. Tutto il valore della pipeline (episodi, RAG, nina-loop) è appeso a un componente da 60€ non ancora ordinato. Il martinetto Vevor e il mandrino ER20 bloccano MIMS fisico, ma l'UPS blocca l'intero stack software ogni notte.
  - *azione: Matteo ordina UPS prima della sessione #57, separando questo acquisto dall'ordine Vevor+ER20 se necessario per velocità. È l'azione con il rapporto impatto/costo più alto dell'intero sistema.*
- [ ] **[alta · SISTEMA]** 42 CVE fixabili su 9 pacchetti restano in produzione. Il log del 2026-07-09 riporta: "42 CVE fixabili in 9 pacchetti: aiohttp 3.14.0 (8), cryptography 48.0.0 (1), gradio 5.50.0 (9), pillow 11.3.0 (7), pydantic-settings 2.14.1 (1), python-multipart 0.0.30 (1)". Cryptography e python-multipart esposti su un sistema che tratta PII clienti (EVA hardening fatto in #53 ma le librerie sotto restano vulnerabili). La sessione CVE è aperta in bussola da almeno due cicli senza esecuzione.
  - *azione: Sessione CVE dedicata: upgrade dei 9 pacchetti in ambiente isolato, poi test finetune + smoke test notturno prima di riportare in produzione. Bloccare il deploy di nuove feature finché cryptography e starlette non sono aggiornati.*
- [ ] **[alta · SISTEMA]** 42 CVE con fix disponibile confermati da pip_audit.json 2026-07-08: "42 CVE fixabili in 9 pacchetti: aiohttp 3.14.0 (8), cryptography 48.0.0 (1), gradio 5.50.0 (9), pillow 11.3.0 (7), pydantic-settings 2.14.1 (1), python-multipart 0.0.30 (1)" (più setuptools, starlette, yt-dlp dal campo pip_audit). Tra questi, cryptography e python-multipart espongono la superficie API/EVA; gradio e starlette espongono l'interfaccia web. Il fix esiste già per tutti e 42: il rischio è interamente evitabile e cresce ad ogni giorno di ritardo.
  - *azione: Eseguire la sessione CVE (bussola_open #3) come sessione dedicata: upgrade dei 9 pacchetti in ambiente isolato, test finetune subito dopo, niente altri task nella stessa sessione per non mischiare regressioni.*
- [ ] **[alta · SISTEMA]** L'UPS è listato come blocker esplicito: 'la corruzione HNSW da power-loss è ricorrente (3 volte in 2gg): è la cura alla radice'. Senza UPS ogni micro-blackout può richiedere drop-hnsw + rebuild (operazione che ha già impegnato una sessione intera il 04/07, commit 65f6c606). Il costo del downtime ricorrente supera già il costo dell'hardware (~50-80€).
  - *azione: Consolidare l'ordine UPS + Vevor + ER20 in un'unica transazione (già pianificata come TOP10 #1). Finché l'ordine non parte, ogni sessione con scritture RAG è a rischio ripetizione del guasto.*
- [ ] **[alta · SISTEMA]** Pagefile esaurito durante la generazione notturna: "2026-07-05 02:07:29 [story_agent] WARNING RAG context non disponibile (Il file di paging è troppo piccolo per essere completato. (os error 1455)) — episodio non grounded". L'episodio generato stanotte non è grounded sul RAG: il contenuto prodotto è scollegato dalla base di conoscenza, quindi potenzialmente incoerente col canone.
  - *azione: Alzare il pagefile di Windows a minimo 16 GB (impostazione manuale in Proprietà di sistema → Avanzate → Prestazioni), verificare RAM libera prima della finestra notturna. Aggiungere una guardia pre-run in story_agent che controlli memoria disponibile e abortisca con errore esplicito anziché produrre episodi non-grounded silenziosi.*
- [ ] **[alta · V32]** La corruzione HNSW da power-loss è ricorrente (3 volte in 2gg, dichiarato nei blockers) e lo snapshot RAG è a zero stanotte: il sistema è esposto a perdita del RAG ad ogni interruzione di corrente. L'UPS (~50-80€) è il rimedio hardware dichiarato nei blockers, ma non è ancora ordinato. Finché mancano sia l'UPS sia lo snapshot RAG funzionante, ogni blackout può richiedere un rebuild completo (535 chunk già persi in passato, recuperati manualmente).
  - *azione: Matteo ordina UPS contestualmente a Vevor+ER20 (un solo ordine, già raggruppati nei blockers). Nel frattempo, ripristinare snapshot RAG notturno come misura tampone immediata.*
- [ ] **[media · GENESIS]** Il canone dichiara max_ep_canone=52 ma su disco esiste EP_N2_53. Il log del 2026-07-09 riporta: "su disco EP_N2_53, il canone dichiara EP_N2_52: aggiornare _CANONE.md". Sono presenti 3 canon_violations totali. Un episodio fuori canone non viene indicizzato correttamente dal retrieval e può essere escluso o duplicato nelle prossime generazioni, rompendo la catena narrativa (EP_N2_03 dipende dalla continuità della serie).
  - *azione: Aprire _CANONE.md, registrare EP_N2_53 con i metadati corretti, rieseguire il rebuild incrementale degli indici. Verificare se le altre 2 canon_violations riguardano la stessa serie o domini diversi.*
- [ ] **[media · GENESIS]** 29 episodi su 53 (55%) mancano di open_loop (qc_episodi: open_loop_missing=29). La decisione di sessione #56 punta esplicitamente sulla pipeline come forza narrativa e su Nina come primo treno pubblico. Episodi senza open_loop non alimentano il riflusso FATTI (già a 0.1) e non creano aggancio tra puntate, svuotando proprio il vantaggio competitivo dichiarato della pipeline.
  - *azione: Prima di produrre EP_N2_03, passare il batch dei 29 episodi carenti attraverso uno script di patch open_loop (già il generatore lo gestisce per i nuovi: retroattivo sui vecchi). Misurare il riflusso FATTI dopo il fix.*
- [ ] **[media · RAG]** Disallineamento canone episodi confermato da _CANONE.md 2026-07-08: "su disco EP_N2_52, il canone dichiara EP_N2_51: aggiornare _CANONE.md". Il campo canone_vault riporta max_ep_disco=52 vs max_ep_canone=51. Con 28/52 episodi a open_loop_missing (QC), un episodio fuori canone che entra nel RAG introduce un nodo non verificato nella catena narrativa.
  - *azione: Aggiornare _CANONE.md portando max_ep_canone a 52, verificare che EP_N2_52 superi il QC strutturale, poi rieseguire il rebuild indici per agganciarlo correttamente.*
- [ ] **[media · RAG]** Il canone RAG presenta 1 violazione attiva (canon_violations: 1) e _CANONE.md:13 punta ancora a V32-su-molle/recuperato vietato (dichiarato nel milestone). Nessun codice legge _CANONE.md come fonte di verità (bussola_open: 'Canone enforced (07 P1): doppio EP_N2_01 attivo, _CANONE.md che nessun codice legge'): il file esiste ma non vincola nulla a runtime, quindi le violazioni possono accumularsi silenziosamente.
  - *azione: Come parte del blocco TOP10 #2/#3 già pianificato per la sessione #53: correggere _CANONE.md:13 (sostituire il riferimento V32-su-molle con il riferimento corretto) e aggiungere al pipeline notturno il controllo canon_guard che emette errore bloccante — non solo warning — se rileva violazioni, così il contatore diventa un allarme reale.*
- [ ] **[media · RICERCA]** Il research_agent ha colpito il rate-limit anonimo di Semantic Scholar stanotte: "2026-07-09 03:39:13 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s". Subito dopo OpenAlex ha restituito zero risultati: "2026-07-09 03:39:24 [research_agent] INFO openalex -> 0 risultati". La chiave SEMANTIC_SCHOLAR_API_KEY è listata come blocker gated-Matteo da sessioni precedenti: finché non è inserita in .env il research_agent lavora senza quota garantita ogni notte.
  - *azione: Matteo inserisce la chiave gratuita Semantic Scholar in .env (azione ~5 minuti, già richiesta). Sblocca le ricerche notturne senza tocere il codice.*
- [ ] **[media · RICERCA]** Il blocker 'API key Semantic Scholar gratuita in .env (SEMANTIC_SCHOLAR_API_KEY) — azzera i 429 della ricerca notturna' è presente da almeno due sessioni senza essere risolto. Gli errori 429 significano che la pipeline di ricerca notturna gira parzialmente o si interrompe silenziosamente, inquinando i dati aggregati senza log_issues visibili.
  - *azione: Matteo inserisce SEMANTIC_SCHOLAR_API_KEY valida in .env prima della prossima sessione notturna. Azione di 5 minuti che sblocca la pipeline di ricerca completa.*
- [ ] **[media · ROADMAP]** Il todo 'Sessione CVE' (bussola_open #3) è l'unico item che sblocca valore di sicurezza immediato senza dipendenze esterne: i 42 fix esistono già, non serve hardware né chiavi Matteo. Ogni sessione che lo salta accumula esposizione su cryptography (superficie EVA/API), starlette e gradio (interfaccia web). È anche il prerequisito implicito per qualsiasi hardening futuro: aggiornare dopo aver aggiunto feature aumenta il rischio di regressione.
  - *azione: Posizionare la sessione CVE PRIMA di EP_N2_03 nella pianificazione #56: è l'unico task ad alto impatto completabile in autonomia, senza sblocchi di Matteo, nella prossima finestra.*
- [ ] **[media · ROADMAP]** In bussola_open: 'TOP10 #3 — 55 file di versioni superate fuori dal canone RAG (estendere exclusions + 1 rebuild)' compare DUE volte nella lista (voci 5 e 16), segnale che è rimasto sospeso tra due sessioni. Con 17.141 chunk nel RAG e già 1 canon_violation attiva, ogni sessione che parte senza questo fix consolida ulteriormente materiale stantio nel corpus. È il prerequisito diretto della pulizia del canone.
  - *azione: Eseguire l'estensione delle exclusions RAG per i 55 file di versioni superate e il rebuild-hard nella prossima sessione, PRIMA di qualsiasi lavoro sui contenuti nuovi. Riduce il rumore RAG prima di aggiungere nuovi chunk.*
- [ ] **[media · ROADMAP]** Il todo '1 · MOSSA 1 checkout che sblocca tutto (06): 1 ordine = martinetto Vevor 20t + mandrino ER20 2.2kW + UPS' è aperto da almeno 11 giorni (blocker dichiarato dal 24/06) e sblocca in cascata tre catene indipendenti: (a) prima colata giunto MIMS/VULCAN, (b) eliminazione della corruzione HNSW ricorrente, (c) fresatura stampi. Ogni sessione che passa senza l'ordine è una sessione in cui MIMS resta a 30% e il RAG resta esposto a blackout. L'ordine è Matteo-gated e non richiede sessione tecnica: è una azione da 10 minuti fuori dal flusso di lavoro abituale.
  - *azione: Matteo apre lo store (Vevor + fornitore mandrino) e completa l'ordine prima della prossima sessione #53, non durante: è l'unico sblocco che non richiede Claude e che nessun commit può sostituire.*
- [ ] **[media · SISTEMA]** In bussola_open: 'Detriti disco (04 P3): 2.24 GB chroma_db_* + 1.1 GB BACKUPS/ → pulizia CON regola di [retention]'. Sono 3.34 GB di artefatti senza policy di rotazione automatica. Su una macchina che fa rebuild RAG ricorrenti, lo spazio disco è una variabile operativa: un disco pieno durante un rebuild può essere la prossima causa di corruzione.
  - *azione: Implementare la retention automatica notturna già pianificata (bussola: 'Retention automatica in coda notturna: chroma_db_* orfane, BACKUPS/ oltre rotazione'). Nel frattempo, pulizia manuale immediata dei chroma_db_* identificati come orfani.*
- [ ] **[media · SISTEMA]** Due note orfane nel vault (vault_orphans: 2): 'human_centeredness_in_translation' e 'quantum_espresso_a_modular_and_open_source_software_project_', entrambe in dominio KNOWLEDGE. Non sono collegate ad alcun episodio o MOC. In un vault che punta a zero orfani come obiettivo dichiarato (#53 Obsidian), queste note sono detriti che degradano la navigabilità e inquinano i risultati di vault_intersect.
  - *azione: Aprire le due note e decidere in 2 minuti ciascuna: collegare al MOC di dominio pertinente con wikilink, oppure eliminare se irrilevanti per il progetto. Non lasciare la decisione al prossimo sweep: il numero basso rende la pulizia banale ora, non lo sarà con 20 orfani.*
- [ ] **[bassa · SISTEMA]** In bussola_open: 'CSS invalido che dà falsa sicurezza: index.css:91 attr() in font-size (scartato dai browser) + :95 min-font-size inesistente (no-op)'. Queste regole non producono errori visibili né bloccano, ma i test visivi automatici (dash_shot.bat) passano su CSS che il browser ignora silenziosamente, rendendo i controlli di qualità inaffidabili per quelle proprietà.
  - *azione: Rimuovere le due regole invalide da index.css e applicare il floor font-size alternativo indicato (svg text{font-size:10px} o fontSize 7→9 in MappaView.tsx:296). Basso costo, elimina falsa sicurezza nei test.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-07-09 03:52*
