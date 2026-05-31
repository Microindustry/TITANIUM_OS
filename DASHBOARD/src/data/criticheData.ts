// criticheData.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Critiche, suggerimenti e miglioramenti per progetto — aggiornabile ogni sessione

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
            crit("v32c06", "pct 65% in STATE vs dati inconsistenti nei view", "active",
              "STATE.json dice 65%, ma skillTreeData e MappaView hanno valori diversi. Sincronizzare."),
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
              "MatteoSection, MimsSection, GenesisSection hanno la stessa logica copiata. Estrarre in componenti condivisi."),
            crit("gc02", "Errori TS ignorati: EcosystemView, MappaView useMemo", "active",
              "Build fallisce silenziosamente. Fixare o silenziare con // @ts-ignore con commento."),
            crit("gc03", "CanvasLayout.tsx > 650 righe — monolite", "future",
              "Ogni Room dovrebbe essere un file separato. Refactor quando si aggiunge la prossima sezione."),
            crit("gc04", "Dati duplicati: SYSTEM_TREE in MappaView vs genesisData/mimsData", "active",
              "Se aggiorni mimsData.ts non si aggiorna MappaView. Unica fonte di verità necessaria."),
            crit("gc05", "GENESIS pct 83% in STATE ≠ genesisData pct reale", "future",
              "I due sistemi non si parlano. La dashboard mostra dati diversi a seconda della view."),
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
              "Se n8n si spegne o si resetta, quali automazioni si perdono? Documentare in AUTOMATIONS_MASTER.md."),
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

  ],
};
