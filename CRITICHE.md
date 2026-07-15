<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS](#critiche-la-cartella-clinica-di-titaniumos)
  - [IL POLSO  15/07/2026 03:52](#il-polso-15072026-0352)
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

## IL POLSO — 15/07/2026 03:52

- **Canone manuale**: 19 attive · 1 bloccate · 23 future · 37 risolte
- **Auto-audit**: 18 aperte / 177 totali (si auto-chiudono dopo 4 giorni senza ri-osservazione)
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

- [ ] **[alta · RAG]** Il canone vault dichiara max_ep_canone=53 ma su disco esiste EP_N2_54, confermato dalla riga «su disco EP_N2_54, il canone dichiara EP_N2_53: aggiornare _CANONE.md» (2026-07-14). Con 4 canon_violations attive e il canone che già scivola di un episodio, il retrieval RAG rischia di escludere o misclassificare materiale reale. Il self-heal inverso (fix f26d3184) copre i vettori mancanti ma non corregge l'indice canone: sono due layer distinti.
  - *azione: Prima della prossima sessione di produzione: aggiornare _CANONE.md portando max_ep_canone a 54, poi rieseguire la sentinella canon-pin per azzerare le 4 violations. Bloccare la pipeline story_agent finché il canone non è allineato al disco.*
- [ ] **[alta · RICERCA]** Semantic Scholar ha bloccato entrambi i research agent per l'intera finestra notturna. Log esatti: '2026-07-15 03:38:35 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429 — attendo 1s' e '2026-07-15 03:38:58 [research_agent] INFO semantic_scholar -> 0 risultati'; identico pattern in night_research.log alle 03:40. La chiave API gratuita senza autenticazione è il collo di bottiglia dichiarato nei blockers ('SEMANTIC_SCHOLAR_API_KEY — azzera i 429 della ricerca notturna') ed è ancora assente.
  - *azione: Matteo deve registrare la API key gratuita su Semantic Scholar e inserirla in .env come SEMANTIC_SCHOLAR_API_KEY. Azione bloccante: finché non è in .env, ogni notte la ricerca accademica produce 0 risultati e consuma slot di retry inutilmente.*
- [ ] **[alta · RICERCA]** La ricerca notturna del 14/07 è sostanzialmente cieca: Semantic Scholar ha sparato 429 su entrambe le query principali («2026-07-14 03:44:05 [research_agent] WARNING [backoff] https://api.semanticscholar.org/graph/v1/paper/search HTTP 429» e «2026-07-14 03:42:25 [research_agent] WARNING [backoff] ... HTTP 429 — attendo 1s»), arxiv è andato in timeout («2026-07-14 03:44:45 [research_agent] WARNING [arxiv] HTTPSConnectionPool(host='export.arxiv.org', port=443): Read timed out. (read timeout=15)»), e il risultato netto è zero paper acquisiti («2026-07-14 03:44:29 [research_agent] INFO semantic_scholar -> 0 risultati»). Il blocker ha una soluzione già identificata (SEMANTIC_SCHOLAR_API_KEY in .env) ma non ancora applicata: ogni notte senza chiave è una notte di ricerca sprecata.
  - *azione: Matteo inserisce SEMANTIC_SCHOLAR_API_KEY in .env nella prossima apertura (gated, ~5 min). Nel frattempo alzare il read timeout arxiv da 15s a 30s nel codice per assorbire i picchi di latenza senza timeout secco.*
- [ ] **[alta · ROADMAP]** L'UPS è listato nei blockers come causa diretta di corruzioni HNSW ricorrenti ('corruzione HNSW da power-loss ricorrente, 3 volte in 2gg'). È un blocker hardware da 50-80€ che nessuna sessione software può aggirare: ogni power-loss futuro rischia di invalidare il vettorstore (18.791+ chunk). Il todo è nella lista da acquistare insieme a Vevor+ER20, ma non ha una data.
  - *azione: Acquistare UPS prima della prossima sessione hardware (Vevor+ER20): il rischio di perdere il vettorstore è concreto e si è già materializzato 3 volte. È il blocco più economico da togliere rispetto al danno potenziale.*
- [ ] **[alta · ROADMAP]** L'ordine hardware UPS è il prerequisito bloccante non eseguito con il rischio più alto di perdita dati: la corruzione HNSW da power-loss è già avvenuta 3 volte in 2 giorni (blocker esplicito) e il RAG conta 18594 chunk. Ogni rebuild HNSW post-corruzione costa tempo di sessione e degrada la continuità del sistema. Il todo 'MOSSA 1: 1 ordine = martinetto Vevor 20t + mandrino ER20 + UPS' è in bussola_open come GATED MATTEO ma non ha data né conferma di ordine effettuato.
  - *azione: Sbloccare l'ordine UPS (50-80€, costo irrisorio rispetto al rischio) prima o durante la sessione #57: è una decisione di 5 minuti che protegge tutto il lavoro notturno. Martinetto Vevor e mandrino ER20 possono seguire nello stesso ordine se conviene logisticamente.*
- [ ] **[alta · SISTEMA]** Tre organi chiave sono piatti a 0.0: 'nina-loop', 'snapshot RAG' e 'AI news watcher'. Non ci sono log_issues che spieghino il motivo, ma il dato di salute è inequivocabile: stanotte questi processi non hanno prodotto output. In parallelo, il RAG mostra '2026-07-15 03:27:02 [rag_engine] INFO Totale: 18791 chunk | +add:0 mod:0 skip:429 -del:0': 429 chunk saltati, zero aggiunti. Il vettorstore non è cresciuto.
  - *azione: Verificare i log di nina-loop e AI news watcher per exit code / eccezione silenziosa. Per snapshot RAG, capire se il blocco è a monte (sorgenti tutte a 429) o nel processo di scrittura. Risolvere in sequenza prima di considerare la notte 'produttiva' sul fronte dati.*
- [ ] **[alta · SISTEMA]** Tre organi core risultano a uptime 0.0 stanotte: nina-loop, snapshot RAG e AI news watcher. Quest'ultimo aveva già avuto una morte silenziosa al boot il 13/07 (fix 16609c5b). Il fatto che torni a 0.0 il 14/07 indica che il fix dell'exit-code/marker non ha reso il processo resiliente al riavvio, oppure che non è stato riavviato dopo il fix. In parallelo, il log del 13/07 segnala «[tasks_history] API non raggiungibile (<urlopen error [WinError 10061] Impossibile stabilire la connessione. Rifiuto persistente del computer di destinazione>) — nessuna tacca stanotte»: un servizio locale che rifiuta la connessione, non registrato come guasto risolto.
  - *azione: Verificare al mattino se ai_news_watcher è in esecuzione (task manager / bat exit code). Se morto di nuovo, aggiungere un auto-restart supervisionato (es. wrapper bat con loop o Task Scheduler con restart-on-failure). Per tasks_history investigare quale servizio locale rifiuta la porta e se è legato all'assenza di UPS (crash notturno).*
- [ ] **[alta · SISTEMA]** 5 organi automatici su 7 sono fermi da 4+ giorni: "nina-loop: ultimo output 4.2 giorni fa (soglia 3) — nina_state.json" (2026-07-13), "snapshot RAG: ultimo output 4.2 giorni fa (soglia 3) — rag_snapshots" (2026-07-13), "retention disco: ultimo output 4.2 giorni fa (soglia 3) — retention_last.json" (2026-07-13), "AI news watcher: ultimo output 4.2 giorni fa (soglia 4) — ai_news_watcher_state.json" (2026-07-13). Il blocco è coerente: stessa data di arresto su tutti e quattro, con 71 commit prodotti nel frattempo senza che nessun organo notturno abbia girato. Il sistema di automazione notturna non è affidabile come singolo punto di esecuzione.
  - *azione: Verificare il processo/scheduler che lancia gli organi notturni: log del cron o del processo padre dalla notte del 09/07. Capire se il crash HNSW da power-loss (3 volte in 2gg, blocker UPS già noto) ha abbattuto anche il demone che li orchestra. Riavviare manualmente i 4 organi e confermare output freschi prima di chiudere la sessione.*
- [ ] **[alta · SISTEMA]** 22 CVE fixabili sono presenti nelle dipendenze Python: "22 CVE fixabili in 3 pacchetti: gradio 5.50.0 (9), pillow 11.3.0 (7), starlette 0.52.1 (6)" (2026-07-13). Gradio e Starlette espongono superfici HTTP; Pillow elabora immagini nei flussi di generazione. Con 9 pacchetti già pianificati per upgrade in bussola_open ('Sessione CVE: upgrade dei 9 pacchetti (42 fix) CON test finetune dopo'), questa sessione è già in ritardo e il numero di CVE è cresciuto.
  - *azione: Eseguire la sessione CVE già pianificata: pip install --upgrade gradio pillow starlette, poi test finetune come da scaletta. Non farlo in background: il test finetune dopo ogni upgrade è il gating condition già deciso.*
- [ ] **[media · GENESIS]** Il 'riflusso FATTI' è a 0.1: il meccanismo che dovrebbe riportare nel sistema le informazioni raccolte durante la notte è quasi fermo. Con la ricerca a 0 risultati (429) e il RAG a +0 chunk, il ciclo informativo notturno è interrotto su tutti e tre gli strati: acquisizione, vettorizzazione, riflusso.
  - *azione: Identificare il punto di rottura specifico del riflusso FATTI (l'agente non riceve input perché la ricerca è vuota, o il processo di scrittura nel vault è bloccato indipendentemente?). Se dipende dai 429, si risolve con la API key. Se è un problema separato, loggare e isolare.*
- [ ] **[media · GENESIS]** 29 episodi su 53 (55%) mancano del campo open_loop nei metadati (qc_episodi: open_loop_missing=29, checked=53). L'open_loop è il gancio narrativo che collega un episodio al successivo e alimenta il RAG con continuità. Con 265 episodi totali e la pipeline 'storie di sistema in prima persona' dichiarata come nuovo binario, avere oltre metà del campione verificato senza questo campo significa che il RAG restituisce frammenti senza filo, e Nina non può costruire archi narrativi coerenti.
  - *azione: Identificare quali 29 episodi mancano dell'open_loop (probabilmente quelli pre-template). Decidere se rigenerarli con lo story_agent o aggiungere il campo manualmente per i più recenti. Priorità ai primi episodi di N2 che formano la serie pubblica.*
- [ ] **[media · RAG]** Il canone vault segnala uno scarto reale tra disco e canone dichiarato: 'su disco EP_N2_55, il canone dichiara EP_N2_53: aggiornare _CANONE.md' (2026-07-15). Sono 2 episodi fuori registro. In aggiunta, qc_episodi mostra 30 episodi su 55 con 'open_loop_missing': più della metà degli episodi esistenti manca del gancio narrativo previsto dal formato.
  - *azione: Aggiornare _CANONE.md portando max_ep_canone da 53 a 55 (operazione di 2 minuti, evita falsi allarmi futuri). Per open_loop_missing: valutare se è un gap di scrittura o un gap nel QC checker — se il checker non sa dove cercare l'open loop nel formato attuale, la metrica è rumore e va corretta alla fonte.*
- [ ] **[media · RAG]** Il bussola_open riporta 'TOP 10 #3 (55 file versioni superate nel RAG → estendere exclusions + 1 rebuild)' come prossimo della catena verità, e 'TOP 10 #9: INDICE_CAMMINO ora è UNA copia sola ma i 9/15 titoli sbagliati restano → rigenerarlo da episodes.json'. Con 18594 chunk nel RAG e snapshot fermo da 4.2 giorni, file obsoleti e titoli errati nell'indice stanno degradando attivamente la qualità del retrieval su ogni query Nina e ogni audit notturno.
  - *azione: Eseguire il rebuild RAG con exclusions estese (TOP 10 #3) e rigenerare INDICE_CAMMINO da episodes.json (TOP 10 #9) nella stessa sessione: i due task condividono il contesto RAG e fare uno senza l'altro lascia il problema a metà.*
- [ ] **[media · ROADMAP]** 'PRE_01 Nina INSIEME (rifatto da 0, ≤10)' è segnato come punto condiviso della rotta e appare più volte nella bussola_open, ma è gated sulla disponibilità di Matteo e non ha una scadenza. Nel frattempo PRE_02/03 Nina sono dichiarati esplicitamente bloccati su di esso ('DOPO che PRE_01 insieme ha fissato lo standard'). Se questo todo scivola, blocca l'intero binario Nina.
  - *azione: Fissare nella prossima sessione con Matteo una slot dedicata a PRE_01 Nina: è il prerequisito che sblocca PRE_02/03 e allinea lo standard del secondo binario. Senza una data, il binario Nina resta fermo indefinitamente mentre quello SISTEMA avanza.*
- [ ] **[media · ROADMAP]** Tre analisi richieste direttamente da Matteo (VALORE per pilastro, HR/CV vivo, Attivazione PUBBLICAZIONI) sono aperte in bussola da almeno una sessione e non compaiono nel next_step di stanotte. Con ~165 caroselli pianificati e la macchina produttiva che si avvia, queste analisi sono prerequisiti di allineamento strategico: senza di esse la produzione potrebbe ottimizzare metriche (slide contate, episodi generati) che Matteo non ha ancora validato come prioritarie. Il rischio non è il dimenticarle, ma l'accumulo di materiale da rivedere a valle.
  - *azione: Nella prima apertura con Matteo: dedicare 20 minuti alla revisione di questi tre punti prima di avviare la produzione PRE_SG. Se Matteo conferma la rotta attuale, chiudere i todo esplicitamente con data; altrimenti riorientare il batch notturno successivo.*
- [ ] **[media · SISTEMA]** Il QC episodi segnala open_loop_missing su 29 dei 54 episodi controllati (54%). La metrica è strutturata (structure_fail=0) ma più della metà degli episodi non ha il gancio narrativo richiesto. Con la produzione PRE_SG_01-04 pianificata per stanotte in autonomia Claude 100%, senza un fix alla regola o al template il problema si moltiplica: i nuovi episodi usciranno con lo stesso difetto sistemico.
  - *azione: Prima di avviare la produzione PRE_SG: verificare se open_loop_missing è un falso positivo (regola QC mal calibrata) o un difetto reale nel template. Se reale, aggiornare _TEMPLATE/components con il blocco open-loop obbligatorio, poi rigenerare i 29 episodi difettosi in batch.*
- [ ] **[media · SISTEMA]** 3 canon_violations attive non hanno finding associato nei log_issues: il dato è presente (canon_violations=3) ma nessuna riga di log specifica quale regola è violata o su quale file. Con canone_manuale a 19 item attivi e 4 giorni di età, le violazioni potrebbero essere accumulate durante i 71 commit della sessione #57 senza essere state intercettate dagli organi notturni fermi.
  - *azione: Eseguire manualmente il check canonico (lo stesso script che gira la notte) e leggere quali 3 violazioni emergono. Chiuderle prima di aprire nuovi cantieri: una violazione di canone non diagnosticata è un debito che cresce a ogni commit.*
- [ ] **[media · V32]** Il blocker UPS (~50-80€) è esplicitamente collegato a «corruzione HNSW da power-loss ricorrente (3 volte in 2gg)» e il log del 13/07 mostra già un servizio locale irraggiungibile nella notte. Ogni notte senza UPS è una notte a rischio di corruzione ChromaDB: il self-heal inverso (f26d3184) mitiga ma non elimina il rischio, e ogni rebuild HNSW costa tempo di calcolo e potenziale perdita di vettori non recuperabili. Il pilastro V32 è al 65% con MIMS al 30%: un altro crash sul RAG blocca entrambi.
  - *azione: Ordinare UPS insieme a Vevor+ER20 nella stessa transazione (sono tutti e tre hardware gated Matteo): trattarli come un unico ordine riduce la frizione decisionale. Nel frattempo eseguire un backup manuale di ChromaDB prima di ogni notte di produzione pesante.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-07-15 03:52*
