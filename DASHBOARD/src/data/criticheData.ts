// criticheData.ts | TITANIUM_OS / DASHBOARD | v2.0 | 2026-05-31
// Critiche, suggerimenti e miglioramenti per progetto — aggiornabile ogni sessione
// v2.0 — audit Opus 4.8: verifica codice + dati live. tsc --noEmit pulito (exit 0).

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
            crit("v32c02", "Silent blocks v.A vs v.B — decisione non presa", "active",
              "Prerequisito per V8. Definire criterio di scelta (smorzamento vs rigidità) e decidere."),
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
      id: "cr_mims", label: "MIMS", icon: "⬡", status: "active", ...rose,
      note: "Prodotto, business model, IP — audit completo",
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
          id: "cr_mims_business", label: "Business & GTM", icon: "📊", status: "active", ...rose,
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
              "Se aggiorni mimsData.ts non si aggiorna MappaView. Unica fonte di verità necessaria."),
            crit("gc05", "GENESIS pct: TRE valori diversi nel codice", "active",
              "CORRETTA: STATE.json=10%, MappaView SYSTEM_TREE=83%, CanvasLayout PILLARS_DATA=55%. La sidebar mostra 10 (STATE), la MAPPA mostra 83. Tre fonti, tre numeri. Decidere il valore vero e renderlo unico."),
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
            crit("gc10", "n8n: 13 workflow non documentati + architettura contraddittoria", "active",
              "CONFERMATA + AGGRAVATA: AUTOMATIONS_MASTER.md documenta 28 automazioni PYTHON ma NON i 13 workflow n8n (solo il Content Engine). Inoltre contraddizione architetturale: AUTOMATIONS_MASTER dice n8n su Oracle Cloud (docker-compose + PostgreSQL + Traefik), genesisData dice 'npx n8n locale, dati in ~/.n8n/'. Quale gira davvero?"),
            crit("gc11", "RAG rebuild necessario dopo questa sessione", "active",
              "Aggiunti file in MENTE/ senza rag-rebuild. Eseguire: rag-rebuild o /api/rag/rebuild."),
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
        crit("vc01", "EVA WhatsApp pending da troppe sessioni", "active",
          "Identificare il vero bloccante: API WhatsApp Business, n8n config, o tempo? Definire next action concreta."),
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
        crit("ic01", "Pitch investitori: nessun documento formale", "active",
          "Il partner software è imminente. Serve un 1-pager: problema, soluzione, mercato, Matteo, ask."),
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
        crit("sc01", "Dipendenza a cascata: V32→VULCAN→MIMS blocca tutto", "active",
          "Se V32 ritarda di 2 mesi, MIMS ritarda di 2+ mesi. Serve un piano B per testare VULCAN senza stampi V32."),
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

    // ── AUDIT OPUS — INCOERENZE DATI VERIFICATE (31/05/2026) ─────────────────
    {
      id: "cr_audit", label: "Audit Opus — Dati live", icon: "🔬", status: "active", ...rose,
      note: "Findings verificati leggendo codice + STATE.json + data files. Ogni voce è riproducibile.",
      children: [

        {
          id: "cr_audit_state", label: "STATE.json marcio", icon: "💾", status: "active", ...rose,
          children: [
            crit("au01", "STATE.blockers = [] vuoto → dashboard mostra 'zero blocker'", "active",
              "CRITICO: STATE.json ha blockers:[] ma RIAVVIO_SESSIONE lista 2 blocker reali (mandrino 2.2kW, silent blocks v.A/v.B). V32Room e Home leggono state.blockers → mostrano 'Nessun blocker / 0'. La dashboard MENTE. Fix: scrivere i blocker reali in STATE.blockers o farli derivare dalle foglie 'blocked'."),
            crit("au02", "session_count = 6 ma sei alla sessione #15", "active",
              "STATE.session_count=6, RIAVVIO_SESSIONE dice SESSIONE #15. Il contatore è desincronizzato di 9. state_updater.py non incrementa o STATE è stato sovrascritto a mano. Fonte unica di verità inaffidabile."),
            crit("au03", "active_milestone fermo a 'skillTreeData v3.0'", "active",
              "STATE.active_milestone non riflette il lavoro delle sessioni 14-15 (NEXUS swarm, RAG graph v5.0, MCP v1.3). Regola CLAUDE.md: 'ogni fine sessione → aggiorna STATE.json'. Non rispettata. La Home mostra un milestone vecchio di 9 sessioni."),
            crit("au04", "meta.version '1.0.0' mentre il sistema è v6/v7", "future",
              "STATE.meta.version='1.0.0' non significa nulla: App=v6.0, dashboard=v7, RAG=v5. Campo morto. O lo si allinea o si rimuove."),
            crit("au05", "MIMS status 'waiting_press' non mappato nella UI", "active",
              "BUG: STATE MIMS.status='waiting_press' ma PillarGrid (CanvasLayout) gestisce solo 'waiting_v32'. Risultato: la cella MIMS mostra la stringa grezza 'waiting_press' invece di 'IN ATTESA'. Aggiungere il case o normalizzare gli status."),
          ],
        },

        {
          id: "cr_audit_pct", label: "Percentuali divergenti", icon: "📊", status: "active", ...amber,
          children: [
            crit("au06", "GENESIS pct: 10 / 55 / 83 — tre numeri", "active",
              "STATE=10%, CanvasLayout PILLARS_DATA=55%, MappaView SYSTEM_TREE=83%. Tre file, tre verità. La sidebar dice 10, la mappa 83. Vedi anche gc05."),
            crit("au07", "IDENTITY pct: 50 vs 35", "active",
              "STATE=50%, MappaView=50%, ma CanvasLayout PILLARS_DATA=35%. PILLARS_DATA è legacy hardcoded e diverge. Allineare o cancellare PILLARS_DATA."),
            crit("au08", "PILLARS_DATA legacy hardcoded in CanvasLayout", "active",
              "CanvasLayout esporta PILLARS_DATA con pct fissi (65/30/55/40/35) che contraddicono STATE live. È dead-data: nessuna view la usa più ma resta come trappola. Rimuovere insieme a CellFocusStandalone & co. (8 export no-op)."),
            crit("au09", "MIMS %: computato (NodeLevel) vs dichiarato (30)", "active",
              "MimsSection calcola pct = done/total foglie (può dare es. 22%), MappaView dichiara 30, STATE dice 30. Stesso pilastro, due metodi di calcolo. Decidere: % derivata dalle foglie OPPURE dichiarata, non entrambe."),
            crit("au10", "ROOT_NODE TITANIUM OS pct=60 inventato", "future",
              "MappaView ROOT_NODE.pct=60 hardcoded, nessuna fonte. Dovrebbe essere la media pesata dei pilastri (oggi ~39 con STATE). Calcolarla o toglierla."),
          ],
        },

        {
          id: "cr_audit_stale", label: "Dati tecnici obsoleti", icon: "🕸", status: "active", ...amber,
          children: [
            crit("au11", "MCP: data files dicono 5 tool, realtà 7", "active",
              "genesisData (mcp01-05) e MappaView gi-mcp elencano 5 tool. RIAVVIO_SESSIONE: 'MCP v1.3 — 7 tool' (aggiunti nexus, rag_update, save_session). I file dashboard sono 2 versioni indietro. Aggiungere i 2 tool mancanti."),
            crit("au12", "NEXUS: 'done' in skillTree, 'future' in genesisData", "active",
              "CONTRADDIZIONE: skillTreeData sw06='Multi-agente NEXUS swarm' done + RIAVVIO dice 'NEXUS swarm v1.0 costruito (NODES/NEXUS/nexus.py)'. Ma genesisData ag05 e gr05 lo segnano 'future'. NEXUS esiste o no? Allineare a 'done/active'."),
            crit("au13", "RAG: data dice v4.0, realtà v5.0 graph-aware", "active",
              "genesisData nodo 'MENTE RAG v4.0' e MappaView gi-rag descrivono solo l'hybrid v4.0. RIAVVIO: 'RAG graph-aware v5.0 con networkx, 114 nodi, 218 archi, catene V32->MIMS->VITA_NATURA'. Manca tutto il layer grafo. Aggiornare."),
            crit("au14", "React 18 scritto, React 19 installato", "active",
              "genesisData db01 e MappaView gi-dash dicono 'React 18'. package.json: react ^19.2.4. skillTreeData sw03 dice giustamente React 19. Correggere i due data file."),
            crit("au15", "EVA: 4 status diversi nello stesso sistema", "active",
              "Stessa entità EVA: genesisData ag02='blocked', MappaView gi-eva='pending', vn-eva='building 40%', skillTree sw11='blocked'. Quattro file, quattro stati. Definire UN solo status per EVA e propagarlo."),
          ],
        },

        {
          id: "cr_audit_docs", label: "Documentazione divergente", icon: "📄", status: "active", ...cyan,
          children: [
            crit("au16", "AUTOMATIONS_MASTER.md fermo al 2026-03-16", "active",
              "2.5 mesi stale. Dichiara '34 automazioni, 0 da implementare' ma non include NEXUS, MCP server, stop hooks, RAG v4/v5, ARGUS computer-use, watchdog swarm v1.3. La 'master list' non è più master. Rigenerare o marcarla come storica."),
            crit("au17", "Scanner punta a 'LA MIA MENTE/' (path morto)", "active",
              "AUTOMATIONS_MASTER #10: Mente Scanner scansiona 'LA MIA MENTE/' → mente_digest.json. CLAUDE.md canonico: MICROINDUSTRY/MENTE/. Path divergente: o lo scanner gira su una cartella che non esiste più, o la doc è sbagliata. Verificare scanner.py."),
            crit("au18", "Fonte unica di verità: nessuna. SYSTEM_TREE duplica i 3 data file", "active",
              "MappaView ridefinisce a mano l'intero albero (SYSTEM_TREE) invece di importare genesisData/mimsData/skillTreeData. Ogni modifica va replicata in 2 posti → è la causa-radice di au06-au15. Fix architetturale: MappaView deve consumare i ROOT esistenti, non una copia."),
          ],
        },

      ],
    },

  ],
};
