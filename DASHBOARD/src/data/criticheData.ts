// criticheData.ts | TITANIUM_OS / DASHBOARD | v2.2 | 2026-07-05
// ⚠ SUPERSEDED (#54): la FONTE VIVA del canone manuale è DATA/audit/critiche_manuali.json
// (servita da /api/critiche/manuali, editabile senza rebuild — sweep/aggiornamenti vanno LÌ).
// Questo file resta SOLO come fallback offline della vista CRITICHE (e tiene le classi
// tailwind nel content-scan). Non aggiungere più critiche qui.
// Critiche, suggerimenti e miglioramenti per progetto — aggiornabile ogni sessione
// v2.0 (31/05) — audit Opus 4.8: verifica codice + dati live. tsc --noEmit pulito (exit 0).
// v2.1 (15/06) — Opus: re-verifica delle 23 attive sul codice attuale + nuova passata "Audit 15/06".
//   GENESIS pct ri-allineato a 70 (STATE era avanzato, hardcoded fermi a 55 → gc05 chiusa).
//   + agente NODES/PCT_SYNC/pct_sync.py: tiene le % allineate da STATE (n04 chiusa, au18/gc04 mitigate).

import { type SkillNode, type SkillStatus } from "./skillTreeData";

const rose    = { color: "text-rose-400",    border: "border-rose-500/40",    bg: "bg-rose-950/20",    dot: "bg-rose-400"    };
const amber   = { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400"   };
const emerald = { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400" };
const violet  = { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400"  };
const cyan    = { color: "text-cyan-400",    border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400"    };
const slate   = { color: "text-slate-400",   border: "border-slate-600/30",   bg: "bg-slate-800/20",   dot: "bg-slate-500"   };

// ── LEGENDA STATUS ────────────────────────────────────────────────────────────
// active  = da lavorare adesso
// blocked = dipende da qualcos'altro
// future  = bassa priorità, prossimo ciclo
// done    = risolto ✓

function crit(id: string, label: string, status: SkillStatus, note?: string): SkillNode {
  const c = status === "done"    ? emerald
          : status === "active"  ? rose
          : status === "blocked" ? { color:"text-slate-500", border:"border-slate-700/30", bg:"bg-slate-900/40", dot:"bg-slate-600" }
          :                        { color:"text-slate-700", border:"border-slate-800/20", bg:"bg-slate-900/20", dot:"bg-slate-800" };
  return {
    id, label,
    icon: status === "done" ? "✓" : status === "active" ? "!" : status === "blocked" ? "○" : "·",
    status, note, isLeaf: true, ...c,
  };
}

export const CRITICHE_ROOT: SkillNode = {
  id: "critiche_root",
  label: "Critiche & Miglioramenti",
  icon: "⚠",
  status: "active",
  note: "Audit continuo — aggiornato ogni sessione con Opus o Sonnet",
  ...rose,
  children: [

    // ── V32 ────────────────────────────────────────────────────────────────
    {
      id: "cr_v32", label: "V32 CNC", icon: "🔩", status: "active", ...amber,
      note: "Criticità fisiche e strategiche della fresatrice",
      children: [

        {
          id: "cr_v32_fisico", label: "Fisico & Build", icon: "🏗", status: "active", ...amber,
          children: [
            crit("v32c01", "Mandrino 2.2kW ER20 non ordinato", "active",
              "BLOCKER CRITICO — senza mandrino V32 non funziona, VULCAN non parte, MIMS bloccato. Ordina entro questa settimana."),
            crit("v32c02", "Silent blocks v.A vs v.B — DECISO (v.B Ø18mm)", "done",
              "RISOLTO #45 (24/06): deciso v.B — silent block Ø18mm (V8_DELTA §2), scelta reversibile. Geometria già rilevata dalle foto, isolamento dal pavimento complementare all'Epoxy Granite. Resta solo il durometro (dettaglio materiale, non blocca il BOM)."),
            crit("v32c03", "Gusset Z destra bloccato su sinistra", "blocked",
              "Dipende dal completamento gusset sinistra. Non è un bug ma una dipendenza reale."),
            crit("v32c04", "Verifica planarità dopo Config G", "future",
              "Dopo rinforzi, ri-misurare basamento con comparatore. Target ±0.1mm."),
            crit("v32c05", "Epoxy fill colonne — timing non definito", "future",
              "Va fatto dopo saldatura finale, prima di montaggio assi. Mettere in checklist."),
          ],
        },

        {
          id: "cr_v32_dati", label: "Dati & Coerenza", icon: "📐", status: "active", ...amber,
          children: [
            crit("v32c06", "pct V32 65% — verificato coerente ovunque", "done",
              "VERIFICATO: STATE=65, MappaView=65, mimsData v32p01=65, PILLARS_DATA=65. V32 è l'unico pilastro coerente. Il problema vero è su GENESIS/IDENTITY → vedi cr_audit."),
            crit("v32c07", "BEP 61 ore — aggiornato dopo Config G?", "future",
              "Il BEP è calcolato su configurazione precedente. Rivalutare dopo completion."),
          ],
        },

      ],
    },

    // ── MIMS ────────────────────────────────────────────────────────────────
    {
      id: "cr_mims", label: "MIMS", icon: "⬡", status: "future", ...violet,
      note: "IDEA in sviluppo (non ancora prodotto). Le critiche di mercato sono PREMATURE — qui diventano leve da girare a nostro vantaggio quando consolidiamo. Priorità reale ORA: solo i brevetti.",
      children: [

        {
          id: "cr_mims_prodotto", label: "Prodotto", icon: "⬡", status: "active", ...rose,
          children: [
            crit("mc01", "Eco-Snap: €0.08 (V6) vs €0.30 (V7) — mai risolto", "active",
              "Discrepanza +275% non chiarita da sessioni precedenti. Quale è il costo reale? Definire prima del GTM."),
            crit("mc02", "Fit Park dati base mancanti", "active",
              "Dimensioni, attrezzi, costo kit non definiti. Rimuovere dalla roadmap o completare con dati reali."),
            crit("mc03", "MIMS-DMP: δ>0.05 — dato validato o stimato?", "future",
              "Se è una stima, non usarlo come claim brevettuale. Serve test fisico con comparatore vibrazioni."),
            crit("mc04", "Trade secrets: ricette non documentate in nessun posto sicuro", "active",
              "Esistono solo in testa a Matteo. Scrivere in _VAULT con cifratura prima di avanzare."),
          ],
        },

        {
          id: "cr_mims_business", label: "Business & GTM — (idea, non ancora)", icon: "📊", status: "future", ...violet,
          note: "Domande di mercato CONGELATE finché l'idea non è consolidata. Non sono falle: sono i punti dove gireremo le critiche dei competitor a nostro vantaggio. Si riattivano quando MIMS passa da idea a progetto.",
          children: [
            crit("mc05", "TAM €4.2B — fonte Grand View Research verificata?", "active",
              "Citata ma mai linkato il report originale. Verificare che sia il mercato giusto (modular systems, non solo T-slot)."),
            crit("mc06", "SOM Y3 €300-450K — assunzioni di base?", "future",
              "Non c'è un modello finanziario dietro. Costruire foglio di calcolo: unità × prezzo × canale."),
            crit("mc07", "Primo cliente MIMS: chi è?", "active",
              "Il piano SEED parla di 10 beta. Identificare nome/profilo dei primi 3 prima di produrre."),
            crit("mc08", "Competitor: nessuno Zero-tool modulare verificato?", "future",
              "Blue ocean claim forte. Fare una ricerca su Kickstarter/Indiegogo prima di usarlo nel pitch."),
          ],
        },

        {
          id: "cr_mims_ip", label: "IP & Protezione", icon: "🔐", status: "active", ...rose,
          children: [
            crit("mc09", "B2 'dopo 100 pezzi venduti' — rischio prior art", "active",
              "Se qualcuno brevetta la geometria 29.9mm nel frattempo, perdi tutto. Valutare provisional patent subito (costo ~€300)."),
            crit("mc10", "Trade secrets non in _VAULT cifrato", "active",
              "TS1-TS4 esistono solo in MENTE/MIMS/ (testo plain). Spostare in _VAULT/KEYS/ con cifratura."),
          ],
        },

      ],
    },

    // ── GENESIS / DASHBOARD ─────────────────────────────────────────────────
    {
      id: "cr_genesis", label: "GENESIS / Dashboard", icon: "⬡", status: "active", ...cyan,
      note: "Codice, architettura, UX — debito tecnico e miglioramenti",
      children: [

        {
          id: "cr_cod", label: "Codice", icon: "💻", status: "active", ...cyan,
          children: [
            crit("gc01", "NodeTile/NodeLevel triplicato in 3 file", "active",
              "CONFERMATA: MatteoSection, MimsSection, GenesisSection hanno NodeTile (~60 righe) + NodeLevel identici, cambia solo il colore accent (amber/cyan). Estrarre in <NodeTile accent=...> condiviso → -180 righe."),
            crit("gc02", "Errori TS — verificato: nessuno", "done",
              "VERIFICATO Opus: npx tsc --noEmit --skipLibCheck → exit 0, zero errori. La build TS è pulita. Critica chiusa."),
            crit("gc03", "CanvasLayout.tsx > 650 righe — monolite", "future",
              "Ogni Room dovrebbe essere un file separato. Refactor quando si aggiunge la prossima sezione."),
            crit("gc04", "Dati duplicati: SYSTEM_TREE in MappaView vs genesisData/mimsData", "active",
              "Se aggiorni mimsData.ts non si aggiorna MappaView. AGGIORNATA 15/06: per le % dei PILASTRI il problema è risolto dall'agente pct_sync (n04). Resta per i dati non-% (struttura nodi/leaf/desc): fonte unica ancora da fare per il resto dell'albero (au18)."),
            crit("gc05", "GENESIS pct: TRE valori diversi nel codice", "done",
              "FIXATO Opus 15/06: STATE era avanzato a 70 ma MappaView e PILLARS_DATA erano fermi a 55. Allineati entrambi a 70 (= STATE, fonte live letta dalle card). RESTA la causa-radice au18: sono const a mano non derivate → il drift tornerà al prossimo avanzamento di STATE."),
          ],
        },

        {
          id: "cr_ux", label: "UX / Interfaccia", icon: "🖥", status: "active", ...cyan,
          children: [
            crit("gc06", "Sidebar 11 voci — affollamento cognitivo", "future",
              "Per ADHD, meno è meglio. Valutare collasso EVA+IDENTITY in un gruppo, o hide dei meno usati."),
            crit("gc07", "CommandBar (Ctrl+K) non discoverable", "future",
              "Nessun hint visibile nella UI. Aggiungere tooltip o hint nella sidebar."),
            crit("gc08", "MappaView: label si sovrappongono con 6+ nodi", "active",
              "Con 6 nodi (GENESIS) i testi si toccano. Aumentare R radiale o ridurre font."),
            crit("gc09", "NeuroOSLayout (neuro) e MappaView fanno cose simili", "future",
              "Due topologie per lo stesso sistema. Valutare se neuro è ancora necessario o da rimuovere."),
          ],
        },

        {
          id: "cr_infra", label: "Infrastruttura", icon: "🔌", status: "active", ...cyan,
          children: [
            crit("gc10", "n8n: 13 workflow non documentati", "active",
              "AGGIORNATA 15/06: la contraddizione architetturale è RISOLTA — STATE conferma n8n self-hosted LOCALE (binario globale 2.25.6, localhost:5678, no cloud). Resta il gap doc: i 13 workflow non sono documentati da nessuna parte e AUTOMATIONS_MASTER.md è fermo (vedi au16). Esportare i 13 workflow in un indice."),
            crit("gc11", "RAG semantico a ZERO — RISOLTO (#40-44)", "done",
              "RISOLTO #40-44: era doppio guasto (torch finito su cpu da llamafactory + chromadb 1.5.9 compactor rotto). Ripristinato torch 2.6.0+cu124 + chromadb 0.5.23 su GPU; semantico==bm25 (~34k chunk), self-heal orfani nell'incrementale + recovery a 2 livelli post-blackout. Non più 0. Vedi n02/att04 (stesso guasto)."),
            crit("gc12", "RIAVVIO_SESSIONE.txt aggiornamento manuale", "future",
              "Se si dimentica di aggiornarlo, la sessione successiva parte cieca. Automatizzare via hook post-sessione."),
          ],
        },

      ],
    },

    // ── VITA NATURA ─────────────────────────────────────────────────────────
    {
      id: "cr_vita", label: "Vita Natura", icon: "🌿", status: "active", ...violet,
      note: "EVA, sito, centro estetico Maria",
      children: [
        crit("vc01", "EVA WhatsApp — piattaforma REALE (#38)", "done",
          "RISOLTO #38: EVA è pilot v0.3 reale (NODES/EVA: brain + prenotazione multi-turno + inbox handoff + webhook dry-run + test), non più 'pending'. Il vero bloccante residuo è solo il token WhatsApp Business + agenda — azione di Matteo (in AZIONI_MATTEO.md), non sviluppo."),
        crit("vc02", "Sito web Vita Natura: nessun progresso documentato", "future",
          "Ogni sessione si menziona ma non si lavora. Decidere: priorità alta o rimuovere dalla roadmap attiva."),
        crit("vc03", "CRM prenotazioni — requisiti non scritti", "future",
          "Prima di costruire il CRM, scrivere 5 user stories con Maria. Senza requisiti si costruisce due volte."),
      ],
    },

    // ── IDENTITY ────────────────────────────────────────────────────────────
    {
      id: "cr_identity", label: "Identity", icon: "🧭", status: "future", ...slate,
      note: "Brand personale, contenuti, pitch",
      children: [
        crit("ic01", "Pitch investitori — RISOLTO (#38)", "done",
          "RISOLTO #38: creati DOCS/PITCH_{NINA,MIMS,V32,GENESIS,EVA,HR}.md grounded + vista PITCH per-progetto in dashboard. Da rinfrescare i numeri (TAM/BOM, vedi mc05/att08) prima del partner, ma il documento formale c'è."),
        crit("ic02", "Content Engine: quanti episodi pubblicati?", "future",
          "La pipeline esiste ma non si sa se è stata usata. Contare episodi esistenti e pubblicati."),
        crit("ic03", "AVA avatar YouTube: nessuna azione concreta", "future",
          "Da sessioni fa. Definire: quando? Cosa serve? O toglierla dalla roadmap attiva."),
      ],
    },

    // ── SISTEMA TRASVERSALE ─────────────────────────────────────────────────
    {
      id: "cr_sistema", label: "Sistema (trasversale)", icon: "⚙", status: "active", ...rose,
      note: "Problemi che toccano più pilastri contemporaneamente",
      children: [
        crit("sc01", "Catena V32→VULCAN→MIMS — RIDIMENSIONATA", "done",
          "CORRETTA (Matteo 01/06): non è un blocco drammatico. V32 si finirà ed è la FONTE PRIMARIA di reddito (oltre al lavoro). VULCAN ha già struttura + guide, manca solo il martinetto (~€50). A CNC ultimata si attivano gli stampi, che saranno comunque prototipati/prodotti in 3D. Il piano B (stampi 3D) esiste già nel piano."),
        crit("sc02", "Nessun KPI misurabile settimana per settimana", "active",
          "I % di completamento si aggiornano a mano senza criteri chiari. Definire: cosa significa +5%?"),
        crit("sc03", "Backup _VAULT: AES-256 deep_freeze.py — ultimo run?", "future",
          "Non c'è traccia dell'ultimo backup. Aggiungere timestamp in STATE.json: last_backup."),
        crit("sc04", "Capannone 2030: nessuna milestone intermedia con date", "future",
          "L'obiettivo esiste ma non c'è un roadmap con checkpoint annuali. Aggiungere in STATE.json."),
        crit("sc05", "ADHD scaffolding: il sistema aiuta o complica?", "future",
          "Ogni sessione si aggiungono cose. Fare un audit trimestrale: cosa NON uso? Rimuovere senza pietà."),
      ],
    },

    // ── AUDIT TRIMESTRALE — "COSA NON USO" ──────────────────────────────────
    {
      id: "cr_pulizia", label: "Audit Trimestrale — Cosa Rimuovere", icon: "🧹", status: "active", ...amber,
      note: "Regola ADHD: il sistema cresce, va POTATO. Ogni 3 mesi — cosa NON uso? Candidati elencati, MAI cancellati alla cieca (git li conserva). Prossimo audit: 2026-09-01.",
      children: [
        crit("pul01", "View 'neuro' (NeuroOSLayout) — duplicato di MappaView", "future",
          "Già fuori dalla sidebar (solo via Ctrl+K). Fa la stessa cosa di MappaView. Candidato #1 alla rimozione: meno confusione, una sola mappa. Recuperabile da git se serve."),
        crit("pul02", "View 'sinapsi' (LayersView) — legacy", "future",
          "Terza topologia dello stesso sistema. Tieni MappaView, valuta di togliere questa. In git resta."),
        crit("pul03", "PILLARS_DATA + 8 export no-op in CanvasLayout", "future",
          "Dead-code legacy (CellFocusStandalone & co). Si rimuove SOLO insieme a NeuroOSLayout che li importa. Un colpo solo, sicuro."),
        crit("pul04", "Sidebar 12 voci → troppe per ADHD", "future",
          "Collassare il gruppo 'Sistema' a comparsa: a vista solo i 5 pilastri + HOME. Meno carico cognitivo, più presentabile."),
        crit("pul05", "Decidere insieme prima di togliere", "active",
          "Questa lista è il PATTO: io segnalo, tu decidi, poi lo facciamo in un commit isolato. Nessuna sorpresa, niente lavoro perso."),
      ],
    },

    // ── AUDIT OPUS — INCOERENZE DATI VERIFICATE (31/05/2026) ─────────────────
    {
      id: "cr_audit", label: "Audit Opus — Dati live", icon: "🔬", status: "active", ...rose,
      note: "Findings verificati leggendo codice + STATE.json + data files. Ogni voce è riproducibile.",
      children: [

        {
          id: "cr_audit_state", label: "STATE.json marcio", icon: "💾", status: "active", ...rose,
          children: [
            crit("au01", "STATE.blockers = [] vuoto → dashboard mostra 'zero blocker'", "done",
              "FIXATO Opus: popolato STATE.blockers con i 2 reali (mandrino 2.2kW ER20, silent blocks v.A/v.B). Persistito tra i cicli del watcher. La dashboard ora mostra i blocker veri."),
            crit("au02", "session_count = 6 ma sei alla sessione #15", "done",
              "FIXATO Opus: STATE.session_count 6→15, allineato a session_context.json. NB strutturale: state_updater.py non incrementa il contatore (va fatto a SessionStart) — fix profondo rimandato per non spendere."),
            crit("au03", "active_milestone fermo a 'skillTreeData v3.0'", "done",
              "FIXATO Opus: STATE.active_milestone aggiornato a 'Audit Opus + handoff sessione self-healing (sessione 15)' + session_context recuperato. La Home ora mostra il milestone reale."),
            crit("au04", "meta.version '1.0.0' mentre il sistema è v6/v7", "future",
              "STATE.meta.version='1.0.0' non significa nulla: App=v6.0, dashboard=v7, RAG=v5. Campo morto. O lo si allinea o si rimuove."),
            crit("au05", "MIMS status 'waiting_press' non mappato nella UI", "done",
              "FIXATO Opus: PillarGrid ora usa rawStatus.startsWith('waiting') → ogni waiting_* mostra 'IN ATTESA'. tsc pulito."),
          ],
        },

        {
          id: "cr_audit_pct", label: "Percentuali divergenti", icon: "📊", status: "active", ...amber,
          children: [
            crit("au06", "GENESIS pct: 10 / 55 / 83 — tre numeri", "done",
              "FIXATO Opus (31/05): unificato a 55. NB 15/06: STATE è poi avanzato a 70 e i due hardcoded erano rimasti a 55 → ri-allineati a 70 (vedi gc05). Conferma che senza fonte unica (au18) il drift è ricorrente."),
            crit("au07", "IDENTITY pct: 50 vs 35", "done",
              "FIXATO Opus: PILLARS_DATA IDENTITY allineato a 50 (= STATE). Ora STATE/MappaView/PILLARS_DATA concordano su 50."),
            crit("au08", "PILLARS_DATA legacy hardcoded in CanvasLayout", "active",
              "PARZIALE: IDENTITY allineato 35→50. MA PILLARS_DATA è ancora importato da NeuroOSLayout (view legacy 'neuro') insieme a 8 export no-op (CellFocusStandalone & co.) → non cancellabile senza refactor di NeuroOSLayout. Vero fix: rimuovere la view 'neuro' (duplicato di MappaView, vedi gc09) e tutto il dead-code collegato."),
            crit("au09", "MIMS %: computato (NodeLevel) vs dichiarato (30)", "active",
              "MimsSection calcola pct = done/total foglie (può dare es. 22%), MappaView dichiara 30, STATE dice 30. Stesso pilastro, due metodi di calcolo. Decidere: % derivata dalle foglie OPPURE dichiarata, non entrambe."),
            crit("au10", "ROOT_NODE TITANIUM OS pct=60 inventato", "done",
              "FIXATO Opus: ROOT_NODE.pct 60→48 = media dei 5 pilastri (65+30+55+40+50)/5. Coerente con STATE. (Futuro: calcolarla a runtime invece che hardcoded.)"),
          ],
        },

        {
          id: "cr_audit_stale", label: "Dati tecnici obsoleti", icon: "🕸", status: "active", ...amber,
          children: [
            crit("au11", "MCP: data files dicono 5 tool — realtà 10 (v1.4)", "done",
              "FIXATO Opus: letto MCP/titanium_mcp_server.py v1.4 → 10 tool reali (get_state, update_milestone, search_mente, get_daily_brief, list_content_ready, nexus, rag_update, update_session_context, screen_action, save_session). Era sbagliato OVUNQUE (data file dicevano 5, RIAVVIO 7). genesisData + MappaView ora elencano i 10 veri. NB: anche l'header del server stesso citava solo 5 — da aggiornare."),
            crit("au12", "NEXUS: 'done' in skillTree, 'future' in genesisData", "done",
              "FIXATO Opus: verificato NODES/NEXUS/nexus.py esiste + è esposto come tool MCP 'nexus'. genesisData ag05→active e gr05→done. Ora coerente con skillTreeData e RIAVVIO."),
            crit("au13", "RAG: mancava il layer grafo nei data file", "done",
              "CORRETTA Opus: rag_engine.py è davvero v4.0 (header) — i data file erano giusti sull'engine. Ma esiste rag_graph.py (networkx) non documentato. Aggiunto leaf 'RAG graph-aware' in genesisData + nota in MappaView gi-rag."),
            crit("au14", "React 18 scritto, React 19 installato", "done",
              "FIXATO Opus: genesisData db01 e MappaView gi-dash → React 19 (= package.json ^19.2.4). Ora coerente con skillTreeData sw03."),
            crit("au15", "EVA: 4 status diversi nello stesso sistema", "done",
              "FIXATO Opus: MappaView vn-eva 'building'→'pending' (= gi-eva). Ora EVA è pending/blocked ovunque (WhatsApp Business API setup pending), coerente con genesisData ag02 e skillTree sw11."),
          ],
        },

        {
          id: "cr_audit_docs", label: "Documentazione divergente", icon: "📄", status: "active", ...cyan,
          children: [
            crit("au16", "AUTOMATIONS_MASTER.md fermo al 2026-03-16", "active",
              "MITIGATA Opus: aggiunta nota di staleness in testa (elenca cosa manca: MCP 10 tool, NEXUS, RAG hybrid+graph, Story Agent, hooks, ARGUS, watchdog) + data 01/06. Rigenerazione completa = TODO (richiede scan nodi attuali, non economico ora)."),
            crit("au17", "Scanner: doc diceva 'LA MIA MENTE/' (path morto)", "done",
              "RISOLTO Opus: verificato scanner.py v1.3 → usa il path CORRETTO (MENTE_DIR env o Path.home()/MICROINDUSTRY/MENTE). Era solo la doc AUTOMATIONS_MASTER sbagliata → corretta a 'MICROINDUSTRY/MENTE/ (env MENTE_DIR)'. Il codice era a posto."),
            crit("au19", "VERSIONS: loop runaway changelog — 2 ROOT CAUSE fixate", "done",
              "RISOLTO Opus (doppio fix + watcher riavviato, verificato 0 archivi/12s): (1) watcher.py IGNORE_DIRS += DATA (le scritture derivate ri-triggeravano changelog) + filtro .tmp/.db-journal. (2) changelog_writer.py archiviava l'overflow oltre 2000 a OGNI evento → 1 file-archivio per modifica. Ora archivia a chunk solo oltre 3000 righe (~1000x meno file). 766 archivi eliminati da disco, dir VERSIONS pulita."),
            crit("au20", "STORIE: 11 episodi narrativi recuperati nella dashboard", "done",
              "RISOLTO Opus: scritto CONTENT_ENGINE/scripts/sync_storie.py (parser header markdown, ID univoci anti-collisione, idempotente). Recuperati 6 narrativi S2 (EP_S2_00..05) in stagione ST + 5 MOMENTI (MOM_01..05) in nuova stagione MOM. storieData 64→75 episodi. tsc pulito. NB: scoperta collisione ID (disco EP_S2_00=IL DISTACCO vs storieData EP_S2_00=Gusset) → risolta con ID = stem completo."),
            crit("au18", "Fonte unica di verità: nessuna. SYSTEM_TREE duplica i 3 data file", "active",
              "MappaView ridefinisce a mano l'intero albero (SYSTEM_TREE) invece di importare genesisData/mimsData/skillTreeData. AGGIORNATA 15/06: la parte più velenosa — il pct dei PILASTRI — è ora auto-sanata dall'agente pct_sync (n04), quel drift non torna più. RESTA la duplicazione strutturale dei nodi non-pct (leaf/label/desc): refactor per cui MappaView dovrebbe consumare i ROOT esistenti. Proposta (regola 11)."),
          ],
        },

      ],
    },

    // ── AUDIT 15/06 — OPUS 4.8 (nuova passata sul sistema attuale) ───────────
    {
      id: "cr_audit_0615", label: "Audit 15/06 — Opus", icon: "🛰", status: "active", ...rose,
      note: "Nuove critiche dalla verifica del sistema reale al 15/06 (post NINA v2 + loop autonomo). Ogni voce è verificata o tracciabile.",
      children: [
        crit("n01", "Chiavi API esfiltrabili NON ancora ruotate", "active",
          "SICUREZZA. Un agente red-team ha dimostrato GET /api/file?path=…\\.env → ANTHROPIC_API_KEY + GITHUB_TOKEN in chiaro (API su Tailscale senza auth). Il fix (denylist .env/_VAULT + fail-closed) è sul branch fix/redteam-s38 NON merged. Finché non mergi+riavvii l'API le chiavi vanno considerate compromesse: RUOTARLE."),
        crit("n02", "RAG semantico = 0 — RISOLTO (#40-44)", "done",
          "RISOLTO #40-44: torch 2.6.0+cu124 + chromadb 0.5.23 su GPU, semantico==bm25 (~34k chunk), self-heal orfani + recovery 2 livelli. La Regola 7 (riflusso MENTE→RAG) è di nuovo integra. Vedi gc11."),
        crit("n03", "critiche_auto rifira findings vecchi — RISOLTO (#38)", "done",
          "RISOLTO #38: night_audit ha l'auto-close (AUTO_CLOSE_DAYS=4) + dedup per id → una critica non più osservata da 4+ giorni si chiude da sola e riapre se ritorna (67→36 alla prima passata). Verificato #45: le voci a-regole pulite risultano resolved automaticamente."),
        crit("n04", "Drift % pilastri (STATE ≠ dashboard) — RISOLTO con agente", "done",
          "RISOLTO 15/06: creato NODES/PCT_SYNC/pct_sync.py — agente di coerenza che riallinea V32/MIMS/GENESIS/VITA/IDENTITY + ROOT(media) dalla FONTE UNICA STATE.json verso MappaView SYSTEM_TREE e PILLARS_DATA. Sostituisce solo cifre (non rompe il TS), idempotente, modi check/fix. Agganciato a sync_dashboard.py: gira a ogni fine sessione se STATE è cambiato → il drift % non torna più da solo. (Primo run reale: corretta ROOT 48→51 rimasta indietro dopo GENESIS→70.)"),
        crit("n05", "Nina v2 asse_nina/backfill — SUPERATO (#43-44)", "done",
          "SUPERATO #43/#44: Nina è DEFINITIVA — canone unico EP_N2 (50 ep, mappa coperta in ampiezza ⟡0→⟡7), EP_AV archiviati, audit STORIE 0 violazioni. Il dilemma 'scalare asse_nina + ennesimo backfill' è chiuso dal canone nuovo data-driven."),
        crit("n06", "Agenti-personaggio: teatro residuo nella vista AGENTI", "future",
          "Gli agenti reali (story/research/audit/watcher/self_improve) girano. I 'personaggi' THEMIS/EVA/AVA/ARIA/NEXUS/TESLA/FORGE sono ancora dichiarati ma non operativi. O li si rende reali o si tolgono dalla vista: oggi è teatro che gonfia la percezione di capacità."),
      ],
    },

    // ── ATTACCO OPUS — 17/06 (red-team su tutti i fronti, come Opus vs Opus) ──
    {
      id: "cr_attacco_0617", label: "Attacco Opus — 17/06", icon: "⚔", status: "active", ...rose,
      note: "Opus interroga il progetto su tutti i fronti. Criticità reali viste in sessione; risolte marcate done. È lo scopo di questa sezione: ricevere l'attacco e segnarlo.",
      children: [
        crit("att01", "Verità sparsa: i dati-pilastro vivono in 5+ posti (au18 VIVO)", "active",
          "FRONTE DATI. Per cambiare lo stato di EVA ho dovuto editare 5 punti (genesisData ×2, MappaView ×2, + STATE). Finché non c'è UNA fonte, ogni verità si sdoppia e i pilastri ri-obsolescono da soli — è la causa-radice dei 'pilastri che non spiegano'. Fix vero: derivare le viste da una sola sorgente, non da copie."),
        crit("att02", "EVA 'pending' mentre la piattaforma esiste — RISOLTO oggi", "done",
          "RISOLTO 17/06: la piattaforma EVA è reale (NODES/EVA pilot v0.3: brain + prenotazione multi-turno + inbox handoff + webhook dry-run + test). Stato/desc corretti in genesisData + MappaView + pitch dedicato PITCH_EVA. Manca solo token WhatsApp + agenda."),
        crit("att03", "Il build di PRODUZIONE non completa (tsc -b / git push → OOM)", "active",
          "FRONTE INFRA. `tsc --noEmit` è falso-verde; il gate vero `tsc -b` va in OOM (malloc 500MB) anche con RAM libera, e pure `git push` a volte. Conseguenza grave: non puoi fare `npm run build` né deployare la dashboard. Da indagare: bitness git, repo bloat (git gc), tetto memoria ambiente."),
        crit("att04", "RAG semantico = 0 — RISOLTO (#40-44)", "done",
          "RISOLTO #40-44: vettoriale di nuovo vivo (semantico==bm25 ~34k chunk, GPU). Era torch-cpu + chromadb compactor rotto, non gli 'elevati'. Stesso guasto di n02/gc11."),
        crit("att05", "Chiavi API ancora NON ruotate (esposte, dimostrate)", "active",
          "FRONTE SICUREZZA. Il fix /api/file è merged e live, ma le chiavi esfiltrate (ANTHROPIC/GITHUB via .env) restano compromesse finché non le RUOTI a mano. Azione tua, non rimandabile."),
        crit("att06", "Lavoro UI verificato a vista — RISOLTO 17/06", "done",
          "RISOLTO 17/06: aperta la dashboard nel dev server (vite, porta 5174). VERIFICATI a schermo con ZERO errori console: sidebar pulita (RAG-chat/AGENTI accantonati; sotto-voci PITCH/CV-Nina/GIOCO/INVENTARIO), Mappa-Gioco (zone Lv + strade + monti, renderizza), CV unito (4 domini mano/mente/bio/voce + marcatori personale), pitch per-progetto (fallback corretto senza API). Il lavoro 'alla cieca' regge. Resta da rifinire il LAYOUT della mappa-gioco (zone addensate in basso) e vedere i pitch col markdown renderizzato (serve api_server su)."),
        crit("att07", "Pilastri FISICI fermi mentre il digitale sprinta", "active",
          "FRONTE STRATEGIA. V32 (reddito vero) bloccato su mandrino ER20 + decisione silent blocks; MIMS al 30%. Decine di commit software, zero sul fronte fisico. Rischio: un sistema digitale bellissimo sopra un'officina ferma. La leva di reddito è lì, non nel codice."),
        crit("att08", "asse_nina 59/182 + numeri pitch non verificati", "active",
          "FRONTE CONTENUTO. asse_nina su 59/182 episodi (decisione 'scala' aperta → metadato parziale, ennesimo backfill in arrivo). Pitch: TAM €4.2B senza fonte, BOM vs €2250 incoerenti (già marcati provvisori). Da consolidare prima di un partner."),
        crit("att09", "critiche_auto: il path a-regole genera rumore basso-segnale", "active",
          "FRONTE META. Anche dopo il fix n03 (auto-close), la cartella clinica live mescola findings ricchi (Sonnet) e generici ('rilevato errore nelle ultime esecuzioni', regole). Proposta: usare il path-regole solo come ultima spiaggia e marcarlo a bassa severità."),
      ],
    },

  ],
};
