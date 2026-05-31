// mimsData.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Albero N-livelli MIMS — Prodotto / Mercato / IP / Roadmap

import { type SkillNode, type SkillStatus } from "./skillTreeData";

const amber  = { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400"   };
const emerald= { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400" };
const orange = { color: "text-orange-400",  border: "border-orange-500/40",  bg: "bg-orange-950/20",  dot: "bg-orange-400"  };
const cyan   = { color: "text-cyan-400",    border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400"    };
const violet = { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400"  };
const rose   = { color: "text-rose-400",    border: "border-rose-500/40",    bg: "bg-rose-950/20",    dot: "bg-rose-400"    };
const teal   = { color: "text-teal-400",    border: "border-teal-500/40",    bg: "bg-teal-950/20",    dot: "bg-teal-400"    };
const slate  = { color: "text-slate-400",   border: "border-slate-600/30",   bg: "bg-slate-800/20",   dot: "bg-slate-500"   };

function leaf(id: string, label: string, status: SkillStatus, note?: string): SkillNode {
  const c = status === "done"    ? emerald
          : status === "active"  ? amber
          : status === "blocked" ? { color:"text-slate-500", border:"border-slate-700/30", bg:"bg-slate-900/40", dot:"bg-slate-600" }
          :                        { color:"text-slate-700", border:"border-slate-800/20", bg:"bg-slate-900/20", dot:"bg-slate-800" };
  return {
    id, label,
    icon: status === "done" ? "✓" : status === "active" ? "⚡" : status === "blocked" ? "○" : "◌",
    status, note, isLeaf: true, ...c,
  };
}

export const MIMS_ROOT: SkillNode = {
  id: "mims_root",
  label: "MIMS",
  icon: "⬡",
  status: "active",
  note: "Micro-Industry Modular System — Lego per l'industria pesante",
  ...amber,
  children: [

    // ── PRODOTTO ─────────────────────────────────────────────────────────────
    {
      id: "prodotto", label: "Prodotto", icon: "⬡", status: "active", ...amber,
      children: [

        {
          id: "connettori", label: "3 Giunti proprietari", icon: "🔗", status: "done", ...emerald,
          note: "Cavallo di Troia: Eco-Snap → Quick-Twist → Tech-Bolt",
          children: [
            leaf("cn01", "Eco-Snap — 0 utensili, 15-25 kg, €1.50 B2C", "done", "ABS/PA6 elastico — EN 71 giocattoli — entry"),
            leaf("cn02", "Quick-Twist — 0 utensili, 50-80 kg, €4.00 B2C", "done", "PA-GF30 + inserto acciaio — quarter-turn 90° — maker"),
            leaf("cn03", "Tech-Bolt — chiave 13mm, 200-400 kg, €7.00 B2C", "done", "42CrMo4 nitrurato — brevetto Presta e Blocca — industria"),
          ],
        },

        {
          id: "materiali", label: "7 Materiali — stesso stampo", icon: "🧪", status: "active", ...amber,
          note: "DNA 29.9mm invariante su tutti i materiali",
          children: [
            leaf("mt01", "MIMS-STD — PP+CaCO3+FV — €8/tile B2C", "active", "T 180-200°C, €1.80 costo — Q4 2026"),
            leaf("mt02", "MIMS-HVY — PA6-GF30 — €15/tile B2C", "active", "T 250-270°C, pre-essiccazione 4h obbligatoria — Q1 2027"),
            leaf("mt03", "MIMS-DMP — TPU+EPDM+grafite — δ>0.05", "future", "Antivibrante 2.5× Epoxy Granite — BREVETTABILE — Q2 2027"),
            leaf("mt04", "MIMS-ECO — PP riciclato 80% — €0.25-0.35/tile", "future", "Green, educativo, più economico in assoluto — H2 2027"),
            leaf("mt05", "MIMS-FLR — PA6/PP+EPDM — pavimentazione", "future", "Antiscivolo integrato, UV resistant — 2028"),
            leaf("mt06", "MIMS-ACS — EVA+sughero — assorbimento acustico >0.6", "future", "Studi, uffici, sale riunioni — 2028"),
            leaf("mt07", "MIMS-MET — Alu 6060-T5 / Acciaio fresato V32", "active", "Strutture ibride — prodotto da V32"),
          ],
        },

        {
          id: "tile_dna", label: "Geometria DNA", icon: "📐", status: "done", ...emerald,
          note: "Invariante — non negoziabile",
          children: [
            leaf("dna01", "Tile 190×190mm — multiplo 10, compatibile profili 40mm", "done"),
            leaf("dna02", "Sezione croce D29.9mm H7/g6 — fit scorrevole preciso", "done"),
            leaf("dna03", "Foro passante Ø16mm — tubi strutturali + cavi + fluidi", "done"),
            leaf("dna04", "Piastrina 40×40mm — ¼ tile, stesso schema fori", "done"),
            leaf("dna05", "Retrocompatibilità totale — ogni connettore futuro funziona", "done"),
          ],
        },

        {
          id: "kit", label: "Configurazioni & Kit", icon: "📦", status: "blocked", ...slate,
          note: "Attende MIMS-STD Q4 2026",
          children: [
            leaf("kt01", "Kit Entry — 4 tile + 4 Eco-Snap — €30-50", "blocked", "Entry point — barriera zero"),
            leaf("kt02", "Bench Base — 12 tile + giunti misti — €120", "blocked", "Isola lavoro 1 banco"),
            leaf("kt03", "Isola 1 banco — 20 tile — €350", "blocked"),
            leaf("kt04", "Isola 3 banchi — 60 tile — €1.100", "blocked", "82% margine B2C"),
            leaf("kt05", "Rack attrezzature — 30 tile — €500", "blocked"),
            leaf("kt06", "Sistema parete officina — 24 tile + accessori — €400", "blocked"),
          ],
        },

      ],
    },

    // ── PRODUZIONE ────────────────────────────────────────────────────────────
    {
      id: "produzione", label: "Produzione", icon: "🏭", status: "active", ...orange,
      children: [

        {
          id: "vulcan_prod", label: "VULCAN — Pressa VCM", icon: "🔥", status: "active", ...orange,
          children: [
            leaf("vp01", "Pressa 4 colonne 15-20 ton montata", "done"),
            leaf("vp02", "Edwards RV3 vacuum pump — 3 m³/h, <0.5 mbar", "blocked", "Da installare su pressa"),
            leaf("vp03", "ROPEX controllo termico ±0.5°C — 150-250°C", "blocked"),
            leaf("vp04", "VCM 18-step processo validato su MIMS-STD", "blocked", "Attende Edwards + ROPEX"),
            leaf("vp05", "Stampo alluminio 7075 per tile 190mm", "blocked", "Prodotto da V32"),
            leaf("vp06", "Primo tile MIMS-STD da VULCAN", "future", "Q4 2026 — milestone chiave"),
          ],
        },

        {
          id: "v32_prod", label: "V32 — Produzione stampi", icon: "🔩", status: "active", ...amber,
          children: [
            leaf("v32p01", "V32 operativa — assi X+Y+Z funzionanti", "active", "65% completamento — Config G"),
            leaf("v32p02", "Primo stampo tile in alluminio 7075", "blocked", "Attende V32 completamento"),
            leaf("v32p03", "Stampo piastrina 40mm", "blocked"),
            leaf("v32p04", "Meta-ricorsività: V32 produce stampi che producono MIMS", "future"),
          ],
        },

      ],
    },

    // ── MERCATO ───────────────────────────────────────────────────────────────
    {
      id: "mercato", label: "Mercato", icon: "📊", status: "active", ...cyan,
      children: [

        {
          id: "competitor", label: "Competitor", icon: "⚔", status: "done", ...emerald,
          note: "Blue ocean: prezzo basso + zero-tool = 90% mercato inesplorato",
          children: [
            leaf("cp01", "Bosch Rexroth — €15-40/m, MOQ €200+, zero zero-tool", "done"),
            leaf("cp02", "Item — €12-35/m, MOQ €150+, lock-in ALTO", "done"),
            leaf("cp03", "80/20 Inc — €18-45/m, MOQ €300+, solo alluminio", "done"),
            leaf("cp04", "Vention — €20-50/m, MOQ €500+, cloud chiuso", "done"),
            leaf("cp05", "MIMS — €8-15/m, MOQ €30, 7 materiali, zero lock-in", "done"),
          ],
        },

        {
          id: "applicazioni", label: "Applicazioni verticali", icon: "🎯", status: "active", ...cyan,
          note: "14 verticali — Fit Park è n.13",
          children: [
            leaf("ap01", "Banco lavoro maker — 1 banco configurabile", "active", "Prima da attaccare — Q4 2026"),
            leaf("ap02", "Rack utensili parete officina", "active", "Alto impatto YouTube — Q4 2026"),
            leaf("ap03", "Dime di fissaggio — fixture saldatura/assemblaggio", "active", "B2B immediato"),
            leaf("ap04", "Kit STEM educativo — Eco-Snap, €30-60", "active", "Volume alto, entry point"),
            leaf("ap05", "Supporto macchine CNC — tile DMP antivibrante", "blocked", "Attende MIMS-DMP Q2 2027"),
            leaf("ap06", "Isola lavoro lean PMI — 3 banchi", "blocked", "Tech-Bolt + HVY — €1.100/unità"),
            leaf("ap07", "Tavolo sacrificale V32 — tile DMP sotto", "blocked", "In casa, proof-of-concept"),
            leaf("ap08", "Armadio modulare garage/seminterrato", "blocked"),
            leaf("ap09", "Scaffalatura lean — kanban, 5S stand", "blocked"),
            leaf("ap10", "Architettura effimera — stand fiera, espositore", "future"),
            leaf("ap11", "Pannello acustico (tile ACS) — studio/ufficio", "future", "2028+"),
            leaf("ap12", "Pavimentazione modulare officine (tile FLR)", "future", "2028+"),
            leaf("ap13", "Fit Park 4.0 — fitness NFC €0.50/ingresso", "future", "Dati base non ancora definiti"),
            leaf("ap14", "Subscription box mensile — kit fisica/meccanica", "future", "Idea da rielaborare — ispirazione KiwiCo"),
          ],
        },

        {
          id: "gtm", label: "Go-To-Market", icon: "🚀", status: "active", ...cyan,
          children: [
            leaf("gtm01", "SEED — YT 500 sub, 10 beta, email 200 — €3K/mese", "active", "Q2-Q4 2026"),
            leaf("gtm02", "GROW — 3K sub, 200 clienti, configuratore MVP", "blocked", "Q1-Q4 2027"),
            leaf("gtm03", "SCALE — 10K sub, 1.500+ clienti, B2B contratti", "future", "2028+"),
            leaf("gtm04", "TAM €4.2B / SAM €180M / SOM Y3 €300-450K", "done", "Grand View Research 2024"),
            leaf("gtm05", "Keyword oro: 'vacuum compression molding DIY' — quasi zero competitor", "done"),
          ],
        },

      ],
    },

    // ── IP ────────────────────────────────────────────────────────────────────
    {
      id: "ip", label: "IP & Protezione", icon: "🔐", status: "active", ...violet,
      children: [

        {
          id: "brevetti", label: "3 Brevetti", icon: "📜", status: "active", ...violet,
          children: [
            leaf("br01", "B1 — MIMS-DMP composito (δ>0.05) — Q4 2027", "future", "Attende test validati — €3-5K"),
            leaf("br02", "B2 — Geometria 29.9mm + 3 giunti — Q2 2027 ⚠ URGENTE", "active", "Depositare dopo 100 pezzi venduti — €2.5-4K"),
            leaf("br03", "B3 — Processo VCM con stampo modulare — Q1 2028", "future", "Dopo 6 mesi produzione operativa — €2-3.5K"),
          ],
        },

        {
          id: "trade_secrets", label: "6 Trade Secrets", icon: "🔒", status: "done", ...emerald,
          note: "Analogia Coca-Cola — proteggono per sempre",
          children: [
            leaf("ts01", "TS1 — MIMS-STD ricetta completa", "done", "MAI pubblicare: percentuali, T/P/tempo esatti"),
            leaf("ts02", "TS2 — MIMS-HVY ricetta + pre-essicazione", "done", "MAI pubblicare: additivi specifici"),
            leaf("ts03", "TS3 — MIMS-DMP formula smorzamento", "done", "MAI pubblicare: rapporto TPU/EPDM, % grafite"),
            leaf("ts04", "TS4 — Ricette ECO/FLR/ACS complete", "done", "MAI pubblicare: 24 componenti totali"),
            leaf("ts05", "TS5 — VCM timing vacuum + rampe termiche", "done", "MAI pubblicare: timing esatto, gap O-ring"),
            leaf("ts06", "TS6 — Polimero proprietario v1-v2 (futuro)", "future", "In sviluppo"),
          ],
        },

        {
          id: "marchi", label: "4 Marchi & Design", icon: "®", status: "future", ...violet,
          children: [
            leaf("ma01", "M1 — TITANIUM VENTURES (denominativo) — Q1 2027", "future", "Classi 7, 6, 42 — €250-400"),
            leaf("ma02", "M2 — MIMS (denominativo) — Q1 2027", "future", "Classi 6, 20, 17 — €250-400"),
            leaf("ma03", "M3 — Logo TV + Logo MIMS (figurativo) — Q2 2027", "future", "€250-400 cad"),
            leaf("ma04", "M4 — Geometria piastrina 40mm (Design RCD EU) — Q2 2027", "future", "€350-500"),
          ],
        },

      ],
    },

    // ── ROADMAP ───────────────────────────────────────────────────────────────
    {
      id: "roadmap", label: "Roadmap", icon: "🗺", status: "active", ...teal,
      children: [

        {
          id: "rd_2026", label: "2026 — Prime tile", icon: "⚡", status: "active", ...teal,
          children: [
            leaf("rd26_01", "V32 completamento assi Y+Z — Q3 2026", "active"),
            leaf("rd26_02", "VULCAN Edwards RV3 + ROPEX installati", "blocked"),
            leaf("rd26_03", "Stampo tile alluminio 7075 da V32", "blocked"),
            leaf("rd26_04", "Prima serie MIMS-STD — 20 tile vendibili — Q4 2026", "blocked"),
            leaf("rd26_05", "YouTube SEED — 500 sub, 10 beta tester", "active"),
          ],
        },

        {
          id: "rd_2027", label: "2027 — Vendita + IP", icon: "📈", status: "future", ...teal,
          children: [
            leaf("rd27_01", "MIMS in vendita online — configuratore MVP — Q1 2027", "future"),
            leaf("rd27_02", "MIMS-HVY disponibile — Q1 2027", "future"),
            leaf("rd27_03", "MIMS-DMP disponibile — Q2 2027", "future"),
            leaf("rd27_04", "Brevetto B2 depositato — Q2 2027 URGENTE", "future"),
            leaf("rd27_05", "Maker Faire Roma/Milano", "future"),
            leaf("rd27_06", "200 clienti, €15K/mese — Q4 2027", "future"),
          ],
        },

        {
          id: "rd_2028", label: "2028+ — Scala", icon: "🎯", status: "future", ...teal,
          children: [
            leaf("rd28_01", "MIMS-FLR + MIMS-ACS disponibili", "future"),
            leaf("rd28_02", "Marketplace MIMS — royalty 10/5% designer", "future"),
            leaf("rd28_03", "1.500+ clienti, SOM €300-450K", "future"),
            leaf("rd28_04", "Polimero proprietario v1 — brevetto B1", "future"),
            leaf("rd28_05", "Capannone — produzione MIMS industriale", "future", "Target 15 Luglio 2030"),
          ],
        },

      ],
    },

  ],
};
