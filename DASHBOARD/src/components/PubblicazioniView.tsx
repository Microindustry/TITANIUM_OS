// PubblicazioniView.tsx | TITANIUM_OS / DASHBOARD | v2.0 | 2026-07-19
// La terza faccia dell'ecosistema: l'output verso il mondo.
// v2.0 (#66, 19/07): il lancio È PARTITO. La pagina non racconta più un piano futuro
// ma lo stato reale — identità, account, Postiz vivo (bloccato sul timbro LinkedIn),
// code impacchettate e programmate, primo dato dal campo. Sezioni: dove siamo ORA ·
// cosa abbiamo trovato (ricerca #54 + verifica 08/07) · la pipeline · i criteri ·
// cosa è fatto e cosa resta. Stile Centro di Controllo, italiano semplice.

import {
  Send, Search, Hammer, Scale, ListOrdered, CheckCircle2, Circle, Lock,
  Radio, Instagram, Linkedin,
} from "lucide-react";

// ── DATI ─────────────────────────────────────────────────────────────────────

// Dove siamo ORA — lo stato reale del lancio (#66, 19/07/2026)
type OraStato = "fatto" | "pronto" | "vivo" | "bloccato" | "dato";
const ORA: { icona: typeof Send; tit: string; stato: OraStato; testo: string }[] = [
  {
    icona: Instagram, tit: "Identità + account microindustry", stato: "fatto",
    testo: "Logo (M oro + spark ciano) e banner «COSTRUIRE, MODULO A MODULO» in POSTER/BRAND, rigenerabili da HTML via Chrome headless. IG @microindustry.ms passato a Business; Pagina LinkedIn microindustry (company/136056455) collegata. Kit profilo (bio/categoria) in IG_PROFILO.md.",
  },
  {
    icona: Send, tit: "Strategia SPLIT — un canale, due passi", stato: "fatto",
    testo: "Decisa #66: LinkedIn apre BEST-FIRST (il pezzo più forte per primo — V32 — pubblicato a mano). Meta (FB+IG) fa il preambolo IN ORDINE. Cadenza: Meta mar+ven 10:00 · Nina mer+dom 21:00. Regola caption a canone: hook + domanda + hashtag nel primo commento.",
  },
  {
    icona: Radio, tit: "Postiz — il motore, acceso", stato: "vivo",
    testo: "Self-host VIVO sul fisso: Docker Desktop 4.82, 8 container sani, UI su localhost:4007, admin creato. App LinkedIn «microindustry-postiz» (id 247572507) creata e VERIFICATA, redirect risolto. BLOCCO: pubblicare su una Pagina richiede lo scope organization = Community Management API, in attesa di concessione LinkedIn (muro esterno, non config). Alla concessione: 1 click e automatizza.",
  },
  {
    icona: ListOrdered, tit: "Code impacchettate e programmate", stato: "pronto",
    testo: "_SOCIAL_QUEUE (Meta): 11 caroselli fino al 21/08 — 8 confermati (PRE_SG_01-04 + EP_SG_01_01/02/03 + EP_SG_02_01) + 3 bozze SISTEMA (MIMS/VULCAN/GENESIS) da approvare di giorno. _SOCIAL_QUEUE_NINA: 10 post fino al 23/08 (PRE_01-04 + EP_N2_01-06). Ogni cartella: 10 slide JPG (ordine 01→10 fixato) + descrizione + primo commento + data. Account Nina @ilmondodinina preparato (foto dal volto PRE_03).",
  },
  {
    icona: Linkedin, tit: "Primo dato dal campo (PRE_SG_01)", stato: "dato",
    testo: "Test su LinkedIn: targeting PERFETTO (saldatori / metalmeccanica / Milano) → valida il binario «parla ai pari». Engagement sottile (2 reazioni, 0 salvataggi) → la leva è hook + chiusura, non il formato (4:5 già a norma). Prossimo colpo forte: V32 (EP_SG_02_01), a mano, lun 20/07.",
  },
];

const TROVATO = [
  {
    nome: "Postiz — il motore",
    stato: "scelto",
    testo: "Scheduler social open source, self-hosted (AGPL, ~31k stelle, sviluppo vivissimo). API pubblica POST /public/v1/posts con tipo 'draft' = gate di approvazione nativo: il sistema spinge bozze via codice, Matteo approva nel calendario. Ha anche un MCP server → Claude può schedulare direttamente. AGGIORNAMENTO: da 'scelto' a INSTALLATO E VIVO (#65) — vedi «dove siamo ora».",
  },
  {
    nome: "Graph API Meta — il canale ufficiale",
    stato: "scelto",
    testo: "Pubblicazione Instagram/Facebook SOLO via API ufficiale: sospensioni <0.5%/anno contro il 15-30% delle librerie non ufficiali (instagrapi SCARTATO). Per il proprio account basta l'app Meta in development mode → niente App Review. Aggregatori a pagamento (Ayrshare $149-599/mese) SCARTATI: Postiz fa lo stesso gratis. App Meta (~1h) ancora da configurare: fino ad allora Meta si programma a mano da Business Suite.",
  },
  {
    nome: "Vincolo Instagram: max 10 slide (verificato sui doc Meta, 08/07)",
    stato: "vincolo",
    testo: "Carosello = array di max 10 elementi, JPEG, aspect ratio 4:5–1.91:1, 8 MB per immagine. I nostri episodi nascono già riconciliati a ≤10 slide (serie PRE 4×10, EP_N2 impaginati ≤10). Nessuna slide si butta: si spezza, non si comprime.",
  },
  {
    nome: "LinkedIn: carosello = documento PDF",
    stato: "vincolo",
    testo: "Su LinkedIn i caroselli sono PDF (max 300 pagine/100 MB, sweet spot 7-10), stesso formato 1080×1350. RISOLTO: pdf_export.py impacchetta le slide PNG in un carosello.pdf per episodio (15/15 generati). Nessun redesign.",
  },
  {
    nome: "Le nostre slide sono GIÀ a norma",
    stato: "ok",
    testo: "Il template canonico (CAROSELLI/_TEMPLATE) è 1080×1350 = 4:5, il formato raccomandato sia da Instagram che da LinkedIn. Confermato dal primo test sul campo (formato non è la leva). Nessuna ricostruzione dimensionale.",
  },
  {
    nome: "Sito statico — la casa pubblica",
    stato: "aperto",
    testo: "Repo separato ('nina') su GitHub Pages, generato da episodes.json. Doppio uso: casa pubblica degli episodi completi (il QR/link in bio punta qui) E hosting degli URL pubblici che l'API Meta richiede per le immagini. Separato perché i PNG pesano (~9 MB/episodio) e non devono gonfiare TITANIUM_OS. ANCORA DA COSTRUIRE.",
  },
];

const PIPELINE = [
  { fase: "FONTE", cosa: "Il lavoro reale: officina, MENTE, STATE, commit. Già catturato ogni giorno dal sistema." },
  { fase: "STORIE", cosa: "Gli episodi (Nina EP_N2 + storie di sistema EP_SG). Generati e QC-ati ogni notte dagli apprendisti notturni." },
  { fase: "BINARI", cosa: "Ogni storia si veste per il suo canale: carosello Nina (educativo, @ilmondodinina) · carosello in prima persona (voce Matteo, storie di sistema) · domani HR, MIMS-edu. Aggiungere un binario = una config, non un rifacimento." },
  { fase: "FORMATI", cosa: "Da ogni carosello: versione ≤10 slide (IG nativo) · PDF (LinkedIn, pdf_export.py) · reel_hook (già negli episodi). 1 input → N output, regola 4." },
  { fase: "CODA", cosa: "_SOCIAL_QUEUE (Meta) + _SOCIAL_QUEUE_NINA: ogni pezzo pronto entra con slide ordinate + caption + data. Impacchettate e programmate fino ad agosto." },
  { fase: "PUBBLICAZIONE", cosa: "Oggi: a mano (LinkedIn best-first + Meta via Business Suite), con canon_guard.scan_public che blinda i numeri di progetto in uscita. Domani, appena LinkedIn concede l'API: il sistema spinge le bozze a Postiz (tipo 'draft'), Matteo approva nel calendario, Postiz pubblica. Nulla esce senza il suo sì." },
];

const CRITERI = [
  "Canale ufficiale sempre: il rischio di sospensione (15-30% con librerie non ufficiali) non vale mai la scorciatoia — l'account è un asset.",
  "Gate umano alla pubblicazione: il sistema propone (draft), Matteo approva. Stessa filosofia di SELF_IMPROVE — verso l'esterno si esce col sì del titolare.",
  "SPLIT per canale: LinkedIn premia il pezzo migliore (best-first, a mano); Meta racconta il preambolo in ordine. Pubblico diverso, taglio diverso.",
  "Verità pubblica blindata: canon_guard.scan_public toglie i numeri di progetto (178kg / ±0,019) dalle caption — la macchina è al telaio, i contenuti dicono lo stato reale.",
  "Self-hosted e gratis: zero abbonamenti (Ayrshare scartato), i dati restano in casa, in linea con tutto l'ecosistema.",
  "Un solo formato sorgente (1080×1350) che serve tutti i canali: IG nativo, LinkedIn via PDF, sito com'è.",
];

type StepStato = "gated" | "nostro" | "fatto";
const SCALETTA: { n: number; chi: StepStato; titolo: string; dettaglio: string }[] = [
  { n: 1, chi: "fatto",  titolo: "Identità microindustry",              dettaglio: "Logo M oro + spark ciano, banner «COSTRUIRE, MODULO A MODULO», kit IG. In POSTER/BRAND, rigenerabili da HTML via Chrome headless." },
  { n: 2, chi: "fatto",  titolo: "IG Business + Pagina LinkedIn",       dettaglio: "IG @microindustry.ms passato a Business; Pagina LinkedIn microindustry (company/136056455) collegata all'app." },
  { n: 3, chi: "fatto",  titolo: "Docker Desktop + Postiz self-host",   dettaglio: "Docker Desktop 4.82, 8 container sani, UI su localhost:4007, admin creato. Config in _VAULT/ACCOUNTS/postiz.md." },
  { n: 4, chi: "fatto",  titolo: "App LinkedIn microindustry-postiz",   dettaglio: "App (id 247572507) creata e verificata dall'admin Pagina; Client ID/Secret nel compose; redirect_uri risolto (OIDC + Share concessi)." },
  { n: 5, chi: "fatto",  titolo: "Slide a norma + PDF LinkedIn",        dettaglio: "Episodi riconciliati a ≤10 slide (IG); pdf_export.py impacchetta un carosello.pdf per episodio (15/15) per LinkedIn." },
  { n: 6, chi: "fatto",  titolo: "Code impacchettate e programmate",    dettaglio: "_SOCIAL_QUEUE (11 Meta, fino 21/08) + _SOCIAL_QUEUE_NINA (10, fino 23/08): slide ordinate 01→10 + descrizione + primo commento + data per ognuno." },
  { n: 7, chi: "gated",  titolo: "Creare account IG Nina",              dettaglio: "@ilmondodinina — kit pronto (foto dal volto PRE_03, bio buonanotte in NINA_IG_PROFILO.md). Manca la creazione vera dell'account. 10 min." },
  { n: 8, chi: "gated",  titolo: "Programmare i post (Business Suite)", dettaglio: "Da PC con Pagina FB collegata (o app IG): Meta oggi 10:30 PRE_SG_01 poi mar/ven; Nina mer/dom 21:00. Manuale finché Postiz non è sbloccato." },
  { n: 9, chi: "gated",  titolo: "Community Management API (LinkedIn)",  dettaglio: "Lo scope organization per pubblicare sulla Pagina. Richiesto #65, in attesa di concessione. Muro esterno: alla mail di ok, Postiz automatizza in 1 click." },
  { n: 10, chi: "nostro", titolo: "App Meta developer (~1h)",           dettaglio: "developers.facebook.com → app + prodotti Instagram. Per il proprio account niente App Review. Sblocca la pubblicazione IG/FB via Graph API (oggi manuale)." },
  { n: 11, chi: "nostro", titolo: "Repo 'nina' + GitHub Pages",         dettaglio: "Sito statico da episodes.json: casa pubblica degli episodi completi (destinazione del CTA) e hosting immagini per l'API Meta. Ancora da costruire." },
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
  aperto:  { label: "APERTO",  cls: "text-slate-400 border-slate-600/40 bg-slate-800/30" },
};

const ORA_CHIP: Record<OraStato, { label: string; cls: string; dot: string }> = {
  fatto:    { label: "FATTO",     cls: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30", dot: "bg-emerald-400" },
  pronto:   { label: "PRONTO",    cls: "text-cyan-400 border-cyan-500/40 bg-cyan-950/30",           dot: "bg-cyan-400" },
  vivo:     { label: "VIVO",      cls: "text-emerald-300 border-emerald-400/50 bg-emerald-950/40",  dot: "bg-emerald-300 animate-pulse" },
  bloccato: { label: "BLOCCATO",  cls: "text-amber-400 border-amber-500/40 bg-amber-950/30",        dot: "bg-amber-400" },
  dato:     { label: "1° DATO",   cls: "text-violet-300 border-violet-500/40 bg-violet-950/30",     dot: "bg-violet-300" },
};

export function PubblicazioniView() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-5 py-5 space-y-6">

        {/* ── HERO: la regola di pubblicazione È il focale ── */}
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
            ufficiali Meta l'08/07. Stack DECISO e ACCESO — il lancio è partito il 19/07 (#66):
            identità pronta, Postiz vivo, code programmate, primo dato dal campo.
          </p>
        </div>

        {/* ── 0 · Dove siamo ORA (lo stato reale del lancio) ── */}
        <section>
          <SezioneHeader icon={Radio} titolo="Dove siamo ORA"
            sotto="lancio partito il 19/07 (#66) — stato reale, non più un piano" />
          <div className="space-y-2">
            {ORA.map(o => {
              const Icona = o.icona;
              const chip = ORA_CHIP[o.stato];
              return (
                <div key={o.tit} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icona size={12} className="text-orange-300 flex-shrink-0" />
                      <span className="text-[9px] font-bold font-mono text-slate-200 truncate">{o.tit}</span>
                    </div>
                    <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 inline-flex items-center gap-1 ${chip.cls}`}>
                      <span className={`w-1 h-1 rounded-full ${chip.dot}`} />
                      {chip.label}
                    </span>
                  </div>
                  <p className="text-[8px] font-mono text-slate-500 leading-relaxed">{o.testo}</p>
                </div>
              );
            })}
          </div>
        </section>

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

        {/* ── 2 · La pipeline ── */}
        <section>
          <SezioneHeader icon={Hammer} titolo="La pipeline"
            sotto="Nina è il primo treno, non la ferrovia: ogni binario nuovo si aggancia qui" />
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

        {/* ── 4 · Cosa è fatto e cosa resta ── */}
        <section>
          <SezioneHeader icon={ListOrdered} titolo="Cosa è fatto e cosa resta"
            sotto="✓ = fatto · 🔒 = serve Matteo / muro esterno · ⚙ = lo costruisce Claude" />
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
            Il grosso è FATTO (1-6). Restano 2 gate esterni (account IG Nina · concessione LinkedIn) e
            2 costruzioni (app Meta · sito nina). Finché LinkedIn non concede l'API si pubblica a mano —
            le code sono già impacchettate e programmate.
          </p>
        </section>

      </div>
    </div>
  );
}
