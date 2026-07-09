// PubblicazioniView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-08
// La terza faccia dell'ecosistema: l'output verso il mondo.
// Contenuto: cosa abbiamo trovato (ricerca #54 + verifica 08/07) · come costruiremo
// il sistema · in base a cosa · scaletta di attivazione passo-passo (si fa insieme).
// Vista di DECISIONE (statica, in italiano semplice, stile Centro di Controllo);
// la coda live dei contenuti arriverà qui quando il motore sarà acceso.

import { Send, Search, Hammer, Scale, ListOrdered, CheckCircle2, Circle, Lock } from "lucide-react";

// ── DATI ─────────────────────────────────────────────────────────────────────

const TROVATO = [
  {
    nome: "Postiz — il motore",
    stato: "scelto",
    testo: "Scheduler social open source, self-hosted (AGPL, ~31k stelle, sviluppo vivissimo — v2.21.6 apr 2026, #1 Product Hunt mag 2026). API pubblica POST /public/v1/posts con tipo 'draft' = gate di approvazione nativo: il sistema spinge bozze via codice, Matteo approva nel calendario. NOVITÀ verificata 08/07: ha anche un MCP server → Claude può schedulare direttamente.",
  },
  {
    nome: "Graph API Meta — il canale ufficiale",
    stato: "scelto",
    testo: "Pubblicazione Instagram/Facebook SOLO via API ufficiale: sospensioni <0.5%/anno contro il 15-30% delle librerie non ufficiali (instagrapi SCARTATO). Per il proprio account basta l'app Meta in development mode → niente App Review. Aggregatori a pagamento (Ayrshare $149-599/mese) SCARTATI: Postiz fa lo stesso gratis.",
  },
  {
    nome: "Vincolo Instagram: max 10 slide (verificato sui doc Meta, 08/07)",
    stato: "vincolo",
    testo: "Carosello = array di max 10 elementi, JPEG, aspect ratio 4:5–1.91:1, 8 MB per immagine. Il nostro standard episodio è 16 slide → modello a 2 STRATI: social-cut ≤10 slide + slide CTA/QR che porta alla versione completa sul sito. Nessuna slide si butta: si spezza, non si comprime.",
  },
  {
    nome: "LinkedIn: carosello = documento PDF",
    stato: "vincolo",
    testo: "Su LinkedIn i caroselli sono PDF (max 300 pagine/100 MB, sweet spot 7-10). Stesso formato 1080×1350. Le nostre slide PNG si impacchettano in PDF con uno script (nessun redesign).",
  },
  {
    nome: "Le nostre slide sono GIÀ a norma",
    stato: "ok",
    testo: "Il template canonico (CAROSELLI/_TEMPLATE) è 1080×1350 = 4:5, il formato raccomandato sia da Instagram che da LinkedIn. Nessuna ricostruzione dimensionale: serve solo la variante social-cut e il bundle PDF.",
  },
  {
    nome: "Sito statico — la casa pubblica",
    stato: "scelto",
    testo: "Repo separato ('nina') su GitHub Pages, generato da episodes.json. Doppio uso: casa pubblica degli episodi completi (il QR/link in bio punta qui) E hosting degli URL pubblici che l'API Meta richiede per le immagini. Separato perché i PNG pesano (~9 MB/episodio) e non devono gonfiare TITANIUM_OS.",
  },
];

const PIPELINE = [
  { fase: "FONTE", cosa: "Il lavoro reale: officina, MENTE, STATE, commit. Già catturato ogni giorno dal sistema." },
  { fase: "STORIE", cosa: "Gli episodi (Nina EP_N2 + storie di sistema). Già generati e QC-ati ogni notte." },
  { fase: "BINARI", cosa: "Ogni storia si veste per il suo canale: carosello Nina (educativo) · carosello in prima persona (la voce di Matteo sulle storie di sistema) · domani HR, MIMS-edu. Aggiungere un binario = una config, non un rifacimento." },
  { fase: "FORMATI", cosa: "Da ogni carosello completo (16 slide, sito): social-cut ≤10 + CTA (Instagram) · PDF (LinkedIn) · reel_hook (già negli episodi). 1 input → N output, regola 4." },
  { fase: "CODA", cosa: "DATA/social_queue/ — ogni pezzo pronto entra con stato: bozza → pronto → pubblicato. La gestiscono le notturne come già fanno con episodi e critiche." },
  { fase: "PUBBLICAZIONE", cosa: "Il sistema spinge le bozze a Postiz via API (tipo 'draft'). Matteo apre il calendario, guarda, approva. Postiz pubblica via Graph API. Nulla esce senza il suo sì." },
];

const CRITERI = [
  "Canale ufficiale sempre: il rischio di sospensione (15-30% con librerie non ufficiali) non vale mai la scorciatoia — l'account è un asset.",
  "Gate umano alla pubblicazione: il sistema propone (draft), Matteo approva. Stessa filosofia di SELF_IMPROVE — verso l'esterno si esce col sì del titolare.",
  "Additivo: le versioni complete 16-17 slide restano vive (sito); il social-cut è una VERSIONE in più, non una sostituzione.",
  "Self-hosted e gratis: zero abbonamenti (Ayrshare scartato), i dati restano in casa, in linea con tutto l'ecosistema.",
  "Densità per canale (regola già a canone): preambolo/social snello per Instagram, episodi ricchi per il sito. Il canale detta il taglio.",
  "Un solo formato sorgente (1080×1350) che serve tutti i canali: IG nativo, LinkedIn via PDF, sito com'è.",
];

type StepStato = "gated" | "nostro" | "fatto";
const SCALETTA: { n: number; chi: StepStato; titolo: string; dettaglio: string }[] = [
  { n: 1, chi: "gated",  titolo: "Mail di progetto dedicata",           dettaglio: "Una casella nuova (no mail personale): sarà l'identità di tutti gli account social. Credenziali in _VAULT/ACCOUNTS." },
  { n: 2, chi: "gated",  titolo: "Pagina Facebook + profilo Instagram Business", dettaglio: "La pagina FB è obbligatoria per l'API. IG passa a Business/Creator e si collega alla pagina. 15 minuti, si fa insieme." },
  { n: 3, chi: "gated",  titolo: "App Meta developer (development mode)", dettaglio: "developers.facebook.com → app nuova → prodotti Instagram. Per il PROPRIO account non serve App Review. Token e secret in _VAULT/KEYS." },
  { n: 4, chi: "gated",  titolo: "Docker Desktop sul fisso",             dettaglio: "Richiesto da Postiz. Prima di installare: valutare il carico sui 16 GB di RAM (Postiz+Postgres+Redis ~1-1.5 GB; fattibile, ma va misurato con RAG attivo)." },
  { n: 5, chi: "nostro", titolo: "Postiz su questa macchina",            dettaglio: "docker compose up → collegare i canali (IG/FB/LinkedIn) via OAuth → API key. Test: 1 bozza via POST /public/v1/posts." },
  { n: 6, chi: "nostro", titolo: "Repo 'nina' + GitHub Pages",           dettaglio: "Sito statico generato da episodes.json: pagina per episodio con le slide complete. È la destinazione del CTA e l'hosting delle immagini per l'API." },
  { n: 7, chi: "nostro", titolo: "Variante social-cut nel _TEMPLATE",    dettaglio: "Regola di taglio 16→≤10 (quali slide tenere) + slide CTA/QR finale + script PNG→PDF per LinkedIn. I prossimi episodi nascono già doppi." },
  { n: 8, chi: "nostro", titolo: "Coda DATA/social_queue/",              dettaglio: "Stati bozza→pronto→pubblicato; le notturne la alimentano; push automatico delle bozze a Postiz via API (+ MCP per orchestrare da Claude)." },
  { n: 9, chi: "nostro", titolo: "Primo post di prova: PRE_01",          dettaglio: "Il preambolo spezzato in caroselli ≤10. Bozza su Postiz → approvazione Matteo → prima pubblicazione vera. Da lì, ritmo." },
];

// ── COMPONENTI ───────────────────────────────────────────────────────────────

function SezioneHeader({ icon: Icon, titolo, sotto }: { icon: typeof Send; titolo: string; sotto: string }) {
  return (
    <div className="flex items-start gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-lg border border-orange-500/30 bg-orange-500/5 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-orange-300" />
      </div>
      <div>
        <div className="text-[11px] font-black font-mono uppercase tracking-widest text-slate-200">{titolo}</div>
        <div className="text-[8px] font-mono text-slate-500 mt-0.5">{sotto}</div>
      </div>
    </div>
  );
}

const STATO_CHIP: Record<string, { label: string; cls: string }> = {
  scelto:  { label: "SCELTO",  cls: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30" },
  vincolo: { label: "VINCOLO", cls: "text-amber-400 border-amber-500/40 bg-amber-950/30" },
  ok:      { label: "GIÀ OK",  cls: "text-cyan-400 border-cyan-500/40 bg-cyan-950/30" },
};

export function PubblicazioniView() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-5 py-5 space-y-6">

        {/* ── (#57 gerarchia) HERO: la regola di pubblicazione È il focale ── */}
        <div className="relative rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/[0.07] to-slate-900/60 p-6 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(251,146,60,0.10), transparent 70%)" }} />
          <div className="flex items-center gap-2 mb-3">
            <Send size={13} className="text-orange-300" />
            <span className="text-[10px] font-mono font-bold text-orange-300 uppercase tracking-[0.3em]">Pubblicazioni — la terza faccia</span>
            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-white leading-snug max-w-3xl">
            Il sistema prepara e propone, <span className="text-orange-300">Matteo approva</span>,
            il canale ufficiale pubblica.
          </p>
          <p className="text-[12px] text-slate-400 leading-relaxed mt-3 max-w-3xl">
            Tutto l'output verso il mondo, di qualunque binario: caroselli di Nina, storie di sistema
            in prima persona, reel, pitch. Ricerca #54 (04/07), vincoli ri-verificati sui documenti
            ufficiali Meta l'08/07. Stack DECISO — qui sotto cosa, come e in che ordine si accende.
          </p>
        </div>

        {/* ── 1 · Cosa abbiamo trovato ── */}
        <section>
          <SezioneHeader icon={Search} titolo="Cosa abbiamo trovato"
            sotto="ricerca #54 (7 fonti) + verifica 08/07 sui doc ufficiali — le decisioni e i vincoli" />
          <div className="space-y-2">
            {TROVATO.map(t => (
              <div key={t.nome} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[9px] font-bold font-mono text-slate-200">{t.nome}</span>
                  <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 ${STATO_CHIP[t.stato].cls}`}>
                    {STATO_CHIP[t.stato].label}
                  </span>
                </div>
                <p className="text-[8px] font-mono text-slate-500 leading-relaxed">{t.testo}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2 · Come costruiremo il sistema ── */}
        <section>
          <SezioneHeader icon={Hammer} titolo="Come costruiremo il sistema"
            sotto="la pipeline — Nina è il primo treno, non la ferrovia: ogni binario nuovo si aggancia qui" />
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            {PIPELINE.map((p, i) => (
              <div key={p.fase} className={`flex gap-3 p-3 ${i > 0 ? "border-t border-slate-800/60" : ""}`}>
                <div className="w-24 flex-shrink-0">
                  <span className="text-[8px] font-black font-mono text-orange-300 uppercase tracking-wider">{p.fase}</span>
                </div>
                <p className="text-[8px] font-mono text-slate-400 leading-relaxed flex-1">{p.cosa}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3 · In base a cosa ── */}
        <section>
          <SezioneHeader icon={Scale} titolo="In base a cosa"
            sotto="i criteri che hanno deciso lo stack — se un criterio cambia, si ridiscute la scelta" />
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 space-y-1.5">
            {CRITERI.map((c, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-orange-400/60 text-[8px] font-mono flex-shrink-0 mt-px">▸</span>
                <p className="text-[8px] font-mono text-slate-400 leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4 · Scaletta di attivazione ── */}
        <section>
          <SezioneHeader icon={ListOrdered} titolo="Scaletta di attivazione — passo passo"
            sotto="in ordine, si fa INSIEME al momento dell'attivazione: 🔒 = serve Matteo · ⚙ = lo costruisce Claude" />
          <div className="space-y-1.5">
            {SCALETTA.map(s => {
              const Icona = s.chi === "fatto" ? CheckCircle2 : s.chi === "gated" ? Lock : Circle;
              const col = s.chi === "fatto" ? "text-emerald-400" : s.chi === "gated" ? "text-amber-400" : "text-cyan-400";
              return (
                <div key={s.n} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                  <div className="flex items-center gap-2 flex-shrink-0 w-8">
                    <span className="text-[10px] font-black font-mono text-slate-600 tabular-nums">{s.n}</span>
                    <Icona size={11} className={col} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold font-mono text-slate-200">{s.titolo}</span>
                      <span className={`text-[7px] font-mono ${col}`}>{s.chi === "gated" ? "MATTEO" : s.chi === "fatto" ? "FATTO" : "CLAUDE"}</span>
                    </div>
                    <p className="text-[8px] font-mono text-slate-500 leading-relaxed mt-0.5">{s.dettaglio}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[8px] font-mono text-slate-600 mt-2 px-1">
            I passi 1-4 sono i prerequisiti gated (≈1 ora insieme). Dal 5 in poi costruisce Claude.
            Quando un passo è fatto, si dice a Claude e la riga diventa verde.
          </p>
        </section>

      </div>
    </div>
  );
}
