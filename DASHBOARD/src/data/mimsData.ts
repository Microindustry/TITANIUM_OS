// mimsData.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Albero N-livelli MIMS — Prodotto / Mercato / IP / Roadmap

import { type SkillNode, type SkillStatus } from "./skillTreeData";

const amber  = { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400"   };
const emerald= { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400" };
const orange = { color: "text-orange-400",  border: "border-orange-500/40",  bg: "bg-orange-950/20",  dot: "bg-orange-400"  };
const cyan   = { color: "text-cyan-400",    border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400"    };
const violet = { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400"  };
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

            {
              id: "cn_eco", label: "Eco-Snap", icon: "🔗", status: "done", ...emerald,
              note: "Entry: 0 utensili — 15-25 kg — €1.50 B2C",
              children: [
                leaf("cn01_mat", "Materiale — ABS/PA6 + clip elastomero integrato", "done"),
                leaf("cn01_car", "Carico max 15-25 kg/tile — fit H7/g6 D29.9mm ±0.02mm", "done"),
                leaf("cn01_pro", "Produzione — stampo singola cavità, ciclo ~35s, assemblaggio zero", "done"),
                leaf("cn01_cer", "Certificazione — EN 71 giocattoli — barriera tecnica minima", "done"),
              ],
            },

            {
              id: "cn_qtwist", label: "Quick-Twist", icon: "🔗", status: "done", ...emerald,
              note: "Maker: 0 utensili — 50-80 kg — €4.00 B2C",
              children: [
                leaf("cn02_mat", "Materiale — PA-GF30 + inserto C45 temprato", "done"),
                leaf("cn02_car", "Carico max 50-80 kg/tile — quarter-turn 90° + spring clip", "done"),
                leaf("cn02_pro", "Produzione — 2 parti (corpo + inserto), assemblaggio automatico", "done"),
                leaf("cn02_tol", "Tolleranza — H7 D29.9mm, fit meccanico preciso, zero gioco assiale", "done"),
              ],
            },

            {
              id: "cn_tbolt", label: "Tech-Bolt", icon: "🔗", status: "done", ...emerald,
              note: "Industria: chiave 13mm — 200-400 kg — €7.00 B2C",
              children: [
                leaf("cn03_mat", "Materiale — 42CrMo4 nitrurato + dado M10 inox A4-70", "done"),
                leaf("cn03_car", "Carico max 200-400 kg/tile — coppia serraggio 25-35 Nm", "done"),
                leaf("cn03_bre", "Brevetto 'Presta e Blocca' — auto-bloccaggio sotto carico dinamico", "done"),
                leaf("cn03_tra", "Trattamento — nitrurazione gassosa 0.3mm profondità, HV 700+", "done"),
              ],
            },

          ],
        },

        {
          id: "materiali", label: "7 Materiali — stesso stampo", icon: "🧪", status: "active", ...amber,
          note: "DNA 29.9mm invariante — 1 stampo, 7 materiali",
          children: [

            {
              id: "mt_std", label: "MIMS-STD", icon: "🧪", status: "active", ...amber,
              note: "PP+CaCO3+FV — €8/tile B2C — Q4 2026",
              children: [
                leaf("mt01_cmp", "Composizione — PP base + CaCO3 (opacizzante+rigidità) + FV corta (rinforzo)", "active", "Ricetta completa: TS1 — MAI pubblicare %"),
                leaf("mt01_pro", "Processo VCM — T 180-200°C / vuoto <50 mbar / ciclo ~12 min", "active"),
                leaf("mt01_tgt", "Target — E>1.8 GPa / impatto>25 kJ/m² / costo prod. €1.80", "active"),
                leaf("mt01_sta", "Stato — Q4 2026, primo materiale, validazione 20 tile", "active"),
              ],
            },

            {
              id: "mt_hvy", label: "MIMS-HVY", icon: "🧪", status: "active", ...amber,
              note: "PA6-GF30 — €15/tile B2C — Q1 2027",
              children: [
                leaf("mt02_cmp", "Composizione — PA6 base + GF30 rinforzato + stabilizzatori termici", "active", "Ricetta: TS2 — MAI pubblicare additivi"),
                leaf("mt02_pro", "Processo VCM — T 250-270°C / pre-essicazione 4h 80°C / ciclo ~18 min", "active"),
                leaf("mt02_tgt", "Target — E>6 GPa / impatto>60 kJ/m² / costo prod. €3.20", "active"),
                leaf("mt02_sta", "Stato — Q1 2027, secondo materiale dopo STD validato", "active"),
              ],
            },

            {
              id: "mt_dmp", label: "MIMS-DMP", icon: "🧪", status: "future",
              color: "text-slate-700", border: "border-slate-800/20", bg: "bg-slate-900/20", dot: "bg-slate-800",
              note: "TPU+EPDM+grafite — δ>0.05 — BREVETTABILE — Q2 2027",
              children: [
                leaf("mt03_cmp", "Composizione — TPU elastomero + EPDM + grafite conduttiva + cariche minerali", "future", "Ricetta: TS3 — MAI pubblicare rapporto TPU/EPDM o % grafite"),
                leaf("mt03_pro", "Processo — variante VCM bassa T + vulcanizzazione parziale", "future"),
                leaf("mt03_tgt", "Target — loss factor δ>0.05 / Shore A 65-75 / smorzamento 2.5× Epoxy Granite", "future"),
                leaf("mt03_bre", "Brevettabile — δ>0.05 su tile modulare = claim unico — B1 Q4 2027", "future"),
              ],
            },

            {
              id: "mt_eco", label: "MIMS-ECO", icon: "🧪", status: "future",
              color: "text-slate-700", border: "border-slate-800/20", bg: "bg-slate-900/20", dot: "bg-slate-800",
              note: "PP riciclato 80%+ — €0.25-0.35/tile — H2 2027",
              children: [
                leaf("mt04_cmp", "Composizione — PP riciclato 80%+ + compatibilizzatore + pigmento naturale", "future", "Formula: TS4 parziale"),
                leaf("mt04_cer", "Certificazione — EN 15343 tracciabilità polimero riciclato", "future"),
                leaf("mt04_tgt", "Target — costo €0.25-0.35/tile, geometria identica STD", "future"),
                leaf("mt04_sta", "Stato — H2 2027, dopo MIMS-HVY validato", "future"),
              ],
            },

            {
              id: "mt_flr", label: "MIMS-FLR", icon: "🧪", status: "future",
              color: "text-slate-700", border: "border-slate-800/20", bg: "bg-slate-900/20", dot: "bg-slate-800",
              note: "PA6/PP+EPDM — pavimentazione industriale — 2028",
              children: [
                leaf("mt05_cmp", "Composizione — PA6/PP blend + superficie EPDM antiscivolo + UV-C resist", "future"),
                leaf("mt05_tgt", "Target — attrito >0.5 (wet) / UV 4000h xenon / carico >200 kg/tile", "future"),
                leaf("mt05_sta", "Stato — 2028, richiede validazione ambientale EN 13893", "future"),
              ],
            },

            {
              id: "mt_acs", label: "MIMS-ACS", icon: "🧪", status: "future",
              color: "text-slate-700", border: "border-slate-800/20", bg: "bg-slate-900/20", dot: "bg-slate-800",
              note: "EVA+sughero — NRC>0.60 — 2028",
              children: [
                leaf("mt06_cmp", "Composizione — EVA cella chiusa + granuli sughero naturale + binding agent", "future"),
                leaf("mt06_tgt", "Target — NRC>0.60 / densità 80-120 kg/m³ / certificazione ISO 354", "future"),
                leaf("mt06_sta", "Stato — 2028, mercato studio/ufficio/sala riunioni", "future"),
              ],
            },

            {
              id: "mt_met", label: "MIMS-MET", icon: "🧪", status: "active", ...amber,
              note: "Alu 6060-T5 / Acciaio — strutture ibride — prodotto da V32",
              children: [
                leaf("mt07_mat", "Materiale — Alu 6060-T5: σ_yield 160 MPa / Rm 215 MPa", "active"),
                leaf("mt07_pro", "Produzione — fresatura V32 / anodizzazione naturale 15-20μm", "active"),
                leaf("mt07_tol", "Tolleranza — fit H7/g6 D29.9 ±0.01mm — strutture ibride metallo/polimero", "active"),
                leaf("mt07_sta", "Stato — dipendente completamento V32 Config G", "active"),
              ],
            },

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
