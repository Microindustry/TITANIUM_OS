<!-- TOC -->

- [01  AUDIT DESIGN  Dashboard  Caroselli Nina](#01-audit-design-dashboard-caroselli-nina)
  - [PRIORITÀ (massimo impatto / minimo rischio prima)](#priorità-massimo-impatto-minimo-rischio-prima)
  - [FINDINGS DASHBOARD](#findings-dashboard)
    - [F1  Keyframe nl-fadeUp orfano: 4 view animano a fortuna (P1)](#f1-keyframe-nl-fadeup-orfano-4-view-animano-a-fortuna-p1)
    - [F2  prefers-reduced-motion: assente (P2)](#f2-prefers-reduced-motion-assente-p2)
    - [F3  Trappola contrasto: la palette RIDEFINISCE slate più scuro del default (P3)](#f3-trappola-contrasto-la-palette-ridefinisce-slate-più-scuro-del-default-p3)
    - [F4  CSS invalido che dà falsa sicurezza (P4)](#f4-css-invalido-che-dà-falsa-sicurezza-p4)
    - [F5  Quattro neri diversi per il fondo (P5)](#f5-quattro-neri-diversi-per-il-fondo-p5)
    - [F6  Focus visibile parziale (P6)](#f6-focus-visibile-parziale-p6)
    - [F7  Pattern N-livelli: 4 copie dello stesso componente, drift già iniziato (P8)](#f7-pattern-n-livelli-4-copie-dello-stesso-componente-drift-già-iniziato-p8)
    - [F8  Design system a metà: UIComponents esiste ma le view reinventano (P12)](#f8-design-system-a-metà-uicomponents-esiste-ma-le-view-reinventano-p12)
    - [F9  Tema light: la tappa 2 non è mai partita (P9)](#f9-tema-light-la-tappa-2-non-è-mai-partita-p9)
    - [F10  Accessibilità semantica: zero aria- in tutta lapp (P10)](#f10-accessibilità-semantica-zero-aria--in-tutta-lapp-p10)
    - [F11  Tipografia: il floor !important cura il sintomo (P12)](#f11-tipografia-il-floor-important-cura-il-sintomo-p12)
  - [FINDINGS CAROSELLI NINA (blueprint-anime)](#findings-caroselli-nina-blueprint-anime)
    - [F12  Coerenza visiva: PROMOSSA  ma tenuta insieme dal copia-incolla (P11)](#f12-coerenza-visiva-promossa-ma-tenuta-insieme-dal-copia-incolla-p11)
    - [F13  Naming file: la regola del README è violata da tutti i file vivi (P7)](#f13-naming-file-la-regola-del-readme-è-violata-da-tutti-i-file-vivi-p7)
    - [F14  Peso repo pubblico: PRE_03  49 MB (nota, non bloccante)](#f14-peso-repo-pubblico-pre03-49-mb-nota-non-bloccante)
    - [F15  Densità scene PRE (nota di direzione artistica)](#f15-densità-scene-pre-nota-di-direzione-artistica)
  - [QUICK-WIN (30 min luno)](#quick-win-30-min-luno)
  - [INGEGNERIZZAZIONE (interventi più grossi, in ordine di resa)](#ingegnerizzazione-interventi-più-grossi-in-ordine-di-resa)

<!-- /TOC -->

# 01 — AUDIT DESIGN · Dashboard + Caroselli Nina
*Esercito TITANIUM_OS — attacco 02/07/2026 · specialista DESIGN · propose-only (nessun file di progetto toccato)*

Bersaglio: `DASHBOARD/src/**` (41 componenti, ~14.300 righe) + `CONTENT_ENGINE/DATABASE/MONDO/POSTER/CAROSELLI/**` (PRE_01→03, EP_N2_01→02).

---

## PRIORITÀ (massimo impatto / minimo rischio prima)

| # | Finding | Tipo | Impatto | Rischio |
|---|---------|------|---------|---------|
| P1 | Keyframe `nl-fadeUp` definito solo in una view legacy ma usato da 4 view attive → animazione che non parte | QUICK-WIN | Alto (bug reale) | Zero |
| P2 | `prefers-reduced-motion` assente in tutto il progetto (0 occorrenze) con ~15 animazioni infinite | QUICK-WIN | Alto (a11y) | Zero |
| P3 | Contrasto testo: `slate-600/700` ridefiniti PIÙ SCURI del default e usati come colore testo → ratio ~1.6–2.4:1 | QUICK-WIN | Alto (leggibilità) | Basso |
| P4 | Due regole CSS invalide/no-op in `index.css` (falsa sicurezza sulla leggibilità SVG) | QUICK-WIN | Medio | Zero |
| P5 | 4 "neri" diversi come sfondo canvas (#050a14, #020617, #0a0612, #0a0a0f) | QUICK-WIN | Medio (coerenza) | Zero |
| P6 | `focus-visible` copre solo `button, input` — link e select esclusi | QUICK-WIN | Medio (a11y) | Zero |
| P7 | Caroselli: nomi file NON canonici (`ep 1.html`, `pre 01.html` con spazi) contro la regola del loro stesso README | QUICK-WIN | Medio (pipeline 50+ ep) | Zero |
| P8 | Pattern N-livelli QUADRUPLICATO (NodeTile/NodeLevel/ST copiati in 4 file, drift già iniziato) | INGEGNERIZZAZIONE | Alto | Medio |
| P9 | Tema light "tappa 2" mai fatta: solo la cornice ha i token, le card interne restano dark hardcoded | INGEGNERIZZAZIONE | Alto | Medio |
| P10 | Zero attributi `aria-*` nell'intera app; CommandBar è un dialog senza semantica né focus trap | INGEGNERIZZAZIONE | Medio | Basso |
| P11 | Caroselli: CSS copia-incollato in ogni HTML, drift misurabile (lead 60→62→66px) — serve template canonico | INGEGNERIZZAZIONE | Alto (scala 50+ ep) | Basso |
| P12 | Scala tipografica di sistema mancante: 239 occorrenze di `text-[7px]/text-[8px]` curate a valle con `!important` | INGEGNERIZZAZIONE | Medio | Medio |

Giudizio d'insieme: **l'identità visiva c'è ed è forte** (industrial dark, mono uppercase, dot-status, accent per pilastro — coerente da sidebar a StatusBar a CellShell). I problemi non sono di gusto ma di **sistema**: token incompleti, componenti duplicati invece che condivisi, accessibilità mai iniziata. I caroselli Nina sono la parte visivamente più matura: linguaggio blueprint-anime coerente al 95%, il rischio è solo il drift da copia-incolla.

---

## FINDINGS DASHBOARD

### F1 — Keyframe `nl-fadeUp` orfano: 4 view animano "a fortuna" (P1)
Il keyframe è definito **solo** dentro `NeuroOSLayout.tsx:749` (view *legacy*, lazy, raggiungibile solo da CommandBar). Ma lo usano 4 view attive:
- `DASHBOARD/src/components/StorieView.tsx:441`
- `DASHBOARD/src/components/ControlloView.tsx:153`
- `DASHBOARD/src/components/ProcedimentiView.tsx:69`
- `DASHBOARD/src/components/AvventuraMapView.tsx:129`

Finché NeuroOSLayout non viene montato almeno una volta, `animation: "nl-fadeUp 0.3s ease both"` punta a un keyframe inesistente → nessuna animazione (fail silenzioso); se poi la view legacy viene aperta, l'animazione "appare". Comportamento incoerente tra sessioni.

**Patch (additiva, in `index.css`):**
```css
/* ─── ENTRATA VIEW (condiviso — prima viveva solo in NeuroOSLayout) ── */
@keyframes nl-fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
(copiare i valori esatti da `NeuroOSLayout.tsx:749-752`; la definizione locale può restare, i keyframes duplicati non confliggono).

### F2 — `prefers-reduced-motion`: assente (P2)
`grep prefers-reduced-motion` → 0 risultati su tutto `src/`. Animazioni infinite attive: `animate-pulse` (top strip `App.tsx:413`, tile attive nei 4 N-livelli, `UIComponents.tsx:133`), `pulse-dot` (`index.css:172-176`), `scan-line` (`index.css:178-181`), `mappa-pulse-ring` (`MappaView.tsx:405`), `np`/`nc` (`NeuroMapView.tsx:439-440`). Per un utente con vestibular disorder — e per un dashboard che gira 24/7 su una macchina fissa — serve lo spegnimento globale.

**Patch (additiva, fine di `index.css`):**
```css
/* ─── ACCESSIBILITÀ: rispetta reduced motion ───────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### F3 — Trappola contrasto: la palette RIDEFINISCE slate più scuro del default (P3)
`index.css:17-25` sovrascrive la scala slate di Tailwind: `--color-slate-600: #3d3d52` (default Tailwind: `#475569`), `--color-slate-700: #2a2a3a` (default `#334155`). Conseguenza: **ogni** `text-slate-600`/`text-slate-700` dell'app è più scuro di quanto chiunque si aspetti scrivendo quella classe.

Su fondo `#050a14`:
- `text-slate-700` (#2a2a3a) ≈ **1.6:1** — praticamente invisibile. Usato per testo informativo: heading sidebar "Pilastri"/"Sistema" (`App.tsx:210,240` — per giunta a 7px), label "info" (`App.tsx:315`), milestone in StatusBar (`App.tsx:337`), link "STATE" (`App.tsx:434`), "Skill dirette" (`MimsSection.tsx:105`).
- `text-slate-600` (#3d3d52) ≈ **2.2:1** — sotto il minimo WCAG 3:1 anche per testo large. È il colore di default degli item sidebar non attivi (`App.tsx:148`) e di decine di label.

WCAG AA chiede 4.5:1 (testo normale). Qui siamo a un terzo.

**Patch (2 righe, solo token — zero modifiche ai componenti):**
```css
/* index.css @theme — alza i due gradini usati come TESTO */
--color-slate-600: #70708c;  /* prima #3d3d52 → ~4.6:1 su #050a14 */
--color-slate-700: #4e4e66;  /* prima #2a2a3a → ~3.1:1 (solo decorativo) */
```
Nota: `slate-700/800` sono usati anche come **bordi** (`border-slate-700`) — alzarli schiarisce leggermente i bordi, effetto gradevole ma da verificare a occhio con `dash_shot.bat`. Alternativa a rischio zero: introdurre token dedicati `--color-ink-dim` / `--color-ink-faint` e migrare solo i testi critici della sidebar/StatusBar.

### F4 — CSS invalido che dà falsa sicurezza (P4)
- `index.css:91` → `svg text { font-size: max(10px, attr(font-size)); }` — `attr()` non è supportato dentro `font-size` in nessun browser stabile: la dichiarazione è **scartata**. I testi SVG a 7px della mappa (`MappaView.tsx:296` usa `fontSize={7}`) restano a 7px, nonostante il commento "SVG text nodes (mappa)".
- `index.css:95` → `* { min-font-size: 0; }` — `min-font-size` **non è una proprietà CSS** (esiste solo come setting di alcuni browser). No-op totale.

**Patch:** rimuovere entrambe le righe e, per la mappa, un floor esplicito:
```css
/* floor leggibilità per i testi SVG (attr() in font-size non esiste) */
svg text { font-size: 10px; }           /* opzione drastica */
/* — oppure, mirato: alzare fontSize={7}→{9} in MappaView.tsx:296 */
```

### F5 — Quattro neri diversi per "il fondo" (P5)
- Cornice shell: `#050a14` (`index.css:60`)
- View interne: `bg-[#020617]` hardcoded (`StorieView.tsx:441`, `ControlloView.tsx:153`, `ProcedimentiView.tsx:69`)
- AvventuraMapView: `bg-[#0a0612]` (`AvventuraMapView.tsx:129`, tinta viola voluta? non documentato)
- Palette dichiarata: `--color-base-950: #0a0a0f` (`index.css:5`) — di fatto mai usata come canvas.

Navigando tra HOME (glow su #050a14) e STORIE (#020617) il fondo "salta" di tonalità e il dot-grid decorativo sparisce (le view col fondo opaco lo coprono). Inoltre i `bg-[#020617]` **rompono il tema light** (F9).

**Patch (quick):** sostituire i tre `bg-[#020617]` con sfondo trasparente o `style={{ background: "var(--shell-bg)" }}` — così ereditano anche il light. Se la tinta viola di AvventuraMapView è intenzionale, promuoverla a token `--canvas-avventura` con commento.

### F6 — Focus visibile parziale (P6)
`index.css:98-101` limita l'outline a `button:focus-visible, input:focus-visible`. Restano fuori: il link "STATE" (`App.tsx:433`), eventuali `select/textarea/a` nelle view, elementi con `tabIndex`.

**Patch:**
```css
:is(button, input, select, textarea, a, [tabindex]):focus-visible {
  outline: 2px solid #00d47e;   /* 1px a 13px di font è sotto soglia visiva */
  outline-offset: 1px;
}
```

### F7 — Pattern N-livelli: 4 copie dello stesso componente, drift già iniziato (P8)
`NodeTile` + `NodeLevel` + mappa stili `ST` + logica navStack sono **copiati integralmente** in:
- `MatteoSection.tsx:9-159` (originale, v3.0)
- `MimsSection.tsx:10-115`
- `GenesisSection.tsx:16-107`
- `CriticheSection.tsx:15-138`

Il drift è già misurabile: `CriticheSection.tsx:36` usa `hover:brightness-110` e `iconSize text-3xl` dove `MimsSection.tsx:31,25` usa `brightness-115` e `text-4xl`; CriticheSection usa `Clock` al posto di `Circle` per `blocked` e dot rosa per il pulse (`CriticheSection.tsx:44-46`). Ogni fix di leggibilità (es. i `text-[8px]` interni ai tile) va oggi ripetuto 4 volte — ed è il pattern che la memoria di progetto dice di voler **scalare su tutto il sito**: scalarlo per copia-incolla moltiplica il debito.

**Proposta additiva (nessun file esistente toccato finché non si migra):**
1. Nuovo `DASHBOARD/src/components/nlevel/NLevelExplorer.tsx` che esporta `NodeTile`, `NodeLevel`, `useNavStack(root)` e accetta un prop `accents?: Partial<typeof ST>` per le varianti (es. dot rosa delle Critiche).
2. Migrazione una sezione per volta (commit isolati, stile "additivo + reversibile"): prima MimsSection (la più fedele), screenshot prima/dopo con `dash_shot.bat`, poi le altre.
```tsx
// nlevel/NLevelExplorer.tsx — firma proposta
export function useNavStack<T>(root: T) {
  const [stack, setStack] = useState<T[]>([root]);
  return {
    current: stack[stack.length - 1],
    depth: stack.length,
    drillIn: (n: T) => { setStack(s => [...s, n]); window.scrollTo({ top: 0, behavior: "smooth" }); },
    back: () => setStack(s => (s.length > 1 ? s.slice(0, -1) : s)),
    reset: () => setStack([root]),
  };
}
```
Stima: 2–3 h inclusi screenshot di verifica. Beneficio: il "pattern N-livelli da scalare su tutto il sito" diventa UN import.

### F8 — Design system a metà: UIComponents esiste ma le view reinventano (P12)
`UIComponents.tsx` (Card/Badge/Progress/StatBlock/TimelineItem) è ben fatto ma convive con: `MacroCard.tsx:19` (`bg-slate-900 border-slate-700/60 rounded-2xl`), `Card` (`UIComponents.tsx:14`: `bg-slate-900/50 border-slate-800 rounded-xl`), `CellShell.tsx:33-40` (terza variante con colorMap propria), più decine di card inline nelle view. Tre raggi (xl/2xl), tre opacità di fondo, due scale di bordo — differenze non intenzionali ma da deriva.

Stesso discorso per il "kicker" di pagina (label mono uppercase in testa a ogni view): `tracking-[0.3em]` in `InventarioView.tsx:30` e `CalendarioView.tsx:66`, `tracking-[0.2em]` in `PitchProgettoView.tsx:56`, `tracking-widest` (=0.1em) in `App.tsx:480` e `StorieView.tsx:158`.

**Proposta:** aggiungere a `UIComponents.tsx` (additivo):
```tsx
export const PageKicker = ({ icon: Icon, color, children, sub }: {...}) => (
  <div className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
    {Icon && <Icon size={10} style={{ color }} />}
    <span style={{ color }}>{children}</span>
    {sub && <span className="text-slate-600">— {sub}</span>}
  </div>
);
```
e usarlo nelle prossime view nuove (le vecchie migrano quando le si tocca).

### F9 — Tema light: la "tappa 2" non è mai partita (P9)
Il commento in `index.css:57-58` lo dichiara esplicitamente ("Le card interne migreranno ai token alla tappa 2"). Stato reale: 8 componenti usano `var(--shell*)` (CalendarioView, CvView, InventarioView, MetodoView, NinaCvView, PitchProgettoView, PitchView, SpiegaPilastroView), mentre StorieView/ControlloView/ProcedimentiView hardcodano `bg-[#020617]` e tutto il resto (UIComponents, MacroCard, CellShell, i 4 N-livelli) è `bg-slate-900/*` + `text-white` fisso. Attivando il sole (`App.tsx:421`) si ottiene cornice chiara + interni dark: UI ibrida.

**Proposta (ingegnerizzazione, incrementale):** completare il set di token in `:root`/`[data-theme="light"]`:
```css
:root {
  --surface-1: rgba(15,17,26,0.55);   /* card */
  --surface-2: rgba(10,12,20,0.80);   /* card annidata / stat block */
  --text-1: #ededf4; --text-2: #b0b0c4; --text-3: #70708c;
  --line-1: rgba(148,163,184,0.14);
}
[data-theme="light"] {
  --surface-1: rgba(255,255,255,0.85); --surface-2: rgba(240,243,250,0.9);
  --text-1: #0f172a; --text-2: #334155; --text-3: #64748b;
  --line-1: rgba(15,23,42,0.12);
}
```
poi migrare `UIComponents.tsx` per primo (Card/StatBlock sono il moltiplicatore). Finché non si fa: valutare di **nascondere il toggle light** (`App.tsx:421-425`) per non esporre uno stato rotto — un solo attributo `hidden`, reversibile.

### F10 — Accessibilità semantica: zero `aria-*` in tutta l'app (P10)
`grep aria-` su `src/` → 0 risultati. I punti che contano:
- **CommandBar** (`CommandBar.tsx:50+`): è un command palette modale ma senza `role="dialog"`, `aria-modal="true"`, `role="listbox"`/`option` sugli item, né focus trap (Tab esce dal pannello verso la pagina sottostante). L'overlay chiude su click ma ESC/frecce sono gestite solo mentre l'input ha focus.
- **Sidebar** (`App.tsx:141-183`): i NavBtn attivi si distinguono solo per colore; manca `aria-current="page"`.
- **Progress bar** (`UIComponents.tsx:77-88`, StatusBar `App.tsx:350-352`): nessun `role="progressbar"`/`aria-valuenow`.
- Icone-only button (toggle tema `App.tsx:421`, collapse `App.tsx:319`): hanno `title` ma non `aria-label`.

**Patch campione (CommandBar):**
```tsx
<div className="cmd-overlay" role="presentation" onClick={onClose}>
  <div className="cmd-panel" role="dialog" aria-modal="true" aria-label="Command bar"
       onClick={e => e.stopPropagation()}>
    <input ref={inputRef} role="combobox" aria-expanded="true"
           aria-activedescendant={`cmd-${sel}`} ... />
    <ul role="listbox">{...<li id={`cmd-${i}`} role="option" aria-selected={i===sel} />}</ul>
```
Stima: 1–2 h per i 4 punti sopra. Non cambia un pixel.

### F11 — Tipografia: il floor `!important` cura il sintomo (P12)
`index.css:86-89` rimappa `text-[7px]→10px … text-[10px]→13px` con `!important`. Funziona, ma: (a) 239 occorrenze di `text-[7px]/text-[8px]` continuano a nascere nei sorgenti (il floor è invisibile a chi scrive); (b) chi legge il codice crede di lavorare a 8px mentre il rendering è 11px; (c) i `fontSize={7}` SVG non sono coperti (F4). Inoltre il `@font-face` a `index.css:79-82` dichiara la family `'JetBrains'` **mai referenziata** (l'app usa `'JetBrains Mono'`, `App.tsx:405`): dead code; e affidarsi a `local()` significa che su una macchina senza il font installato si scivola su Consolas senza accorgersene.

**Proposta:** scala tipografica nominale in `@theme` e lint-rule sociale "mai px sotto 10":
```css
@theme {
  --text-2xs: 10px;  /* label micro (ex text-[7/8px]) */
  --text-xs:  11px;  /* meta, kicker */
  --text-sm:  13px;  /* corpo — allineato a html { font-size:13px } */
}
```
Le nuove view usano `text-2xs/xs/sm`; il floor `!important` resta come rete di sicurezza per il legacy. Rimuovere il `@font-face` morto o self-hostare `JetBrainsMono-Regular.woff2` in `public/fonts/`.

---

## FINDINGS CAROSELLI NINA (blueprint-anime)

### F12 — Coerenza visiva: PROMOSSA — ma tenuta insieme dal copia-incolla (P11)
I 5 caroselli condividono davvero lo stesso linguaggio (verificato su sorgenti + PNG renderizzati): fondo `#05070d` con radial `#1a2440→#0c1122`, griglia blueprint `#5fc7f3` 54px a bassa opacità, oro `#f4b65a` per gli accenti, rosa `#ec4899` (Nina), ciano `#5fc7f3` (tech), Playfair Display (lead/seal) + Space Mono (label/kicker/footer) + Source Sans 3 (corpo), canvas 1080×1350, kit Typekit `zhv2kry` identico ovunque, footer a tre zone con Pietra ⟡. Le slide campione (EP_N2_01 slide_2, EP_N2_02 slide_8, PRE_03 slide_3) rispettano il feedback "caroselli ricchi": scena illustrata, niente griglie a vista né slot vuoti.

Il problema è **come** questa coerenza si mantiene: ogni HTML ridichiara ~200 righe di CSS a mano. Il drift è già iniziato:
| Selettore | PRE_01/02 | PRE_03 | EP_N2_01/02 |
|---|---|---|---|
| `.lead` font-size | 60px | 62px | 66px |
| `.scene` top | 230px | 222px | 210px |
| `.intro` font-size | 28px | 29px | 31px |
| `.mk` diametro | 46px | 48px | — |

Su 5 file è gestibile; su 50+ episodi (obiettivo dichiarato in `CAROSELLI/README.md`) diventa entropia — esattamente il nemico della serie.

**Proposta (additiva):** cartella `CAROSELLI/_TEMPLATE/` con:
- `tokens.css` — palette + type scale canonica commentata (fonte di verità);
- `carosello_base.html` — scheletro 16 slide con i token già inlinati;
- nota nel README: "nuovo episodio = copia `_TEMPLATE/carosello_base.html`, non l'episodio precedente".
L'HTML resta self-contained (requisito Express import) — il template serve solo come origine della copia. Se `.lead` 66px è la versione "vincente" (EP nuovi), va scritta nel template come standard.

### F13 — Naming file: la regola del README è violata da tutti i file vivi (P7)
`CAROSELLI/README.md` (sez. "Struttura" e "Regole") impone **nomi canonici identici in ogni cartella: `carosello.html`** "così uno script può ciclare su tutte le cartelle". File reali:
- `EP_N2_01/ep 1.html`, `EP_N2_02/ep 2.html`
- `PRE_01/pre 01.html`, `PRE_02/pre 2.html` (zero-padding incoerente pure tra loro), `PRE_03/pre 03.html`

Spazi nei filename + nomi tutti diversi = ogni script di pipeline (`_build_ep.py`, `_render_all.py`, futuri batch) deve fare glob euristici. Il `carosello.html` canonico esiste solo dentro `_VERSIONI/`.

**Patch (script, propose-only — decidere e applicare in sessione):**
```bash
cd CONTENT_ENGINE/DATABASE/MONDO/POSTER/CAROSELLI
for d in PRE_01 PRE_02 PRE_03 EP_N2_01 EP_N2_02; do
  f=$(ls "$d"/*.html | head -1)
  git mv "$f" "$d/carosello.html"   # git mv preserva la storia
done
# poi: grep -rn "ep 1.html\|pre 0" */_*.py README.md  → aggiornare i riferimenti
```

### F14 — Peso repo pubblico: PRE_03 = 49 MB (nota, non bloccante)
`PRE_03/` pesa 49 MB (HTML 419 KB con avatar `data:image` embedded + PNG 1080×1350 + `_sheet.png`), contro gli 11–13 MB degli altri. Con 50+ episodi a ~15–50 MB l'uno il repo pubblico supera il GB in fretta (già successo con `model.safetensors`: push bloccato). **Proposta:** policy nel README caroselli — PNG slide a qualità 85 / max ~700 KB l'una, `_sheet.png` opzionale non committato, e valutare `git lfs` o l'esclusione delle `slides/` (rigenerabili dall'HTML) prima dell'episodio 10.

### F15 — Densità scene PRE (nota di direzione artistica)
Nelle cover PRE (es. `PRE_03/slides/slide_1.png`) la scena centrale è composta da simboli piccoli in un campo scuro ampio: coerente con lo stile "buonanotte", ma è il punto dove il feedback "caroselli ricchi / mai wireframe" rischia di scivolare. Regola pratica da aggiungere alla bibbia visiva: la scena occupa **≥40% dell'altezza** con almeno un elemento dominante (come l'onda dorata di EP_N2_02 slide_8 o il sole di PRE_03 slide_3), i simboli piccoli solo come satelliti.

---

## QUICK-WIN (≤30 min l'uno)

1. **[P1]** Copiare `@keyframes nl-fadeUp` in `index.css` (da `NeuroOSLayout.tsx:749`). 5 min, sblocca l'animazione d'entrata di 4 view.
2. **[P2]** Blocco `@media (prefers-reduced-motion: reduce)` in coda a `index.css` (patch in F2). 5 min.
3. **[P4]** Rimuovere `index.css:91` (attr() invalido) e `index.css:95` (`min-font-size` inesistente); alzare `fontSize={7}→9` in `MappaView.tsx:296`. 10 min.
4. **[P3]** Alzare `--color-slate-600/700` in `index.css:22-23` (patch in F3) + screenshot prima/dopo con `dash_shot.bat`. 20 min.
5. **[P6]** Estendere il selettore focus-visible (`index.css:98`) con `:is(...)` e outline 2px. 5 min.
6. **[P5]** Sostituire i tre `bg-[#020617]` (`StorieView.tsx:441`, `ControlloView.tsx:153`, `ProcedimentiView.tsx:69`) con `var(--shell-bg)`. 15 min.
7. **[P7]** `git mv` dei 5 HTML caroselli a `carosello.html` + fix riferimenti negli script `_build_ep.py`/`_render_all.py`/README. 25 min.
8. Rimuovere il `@font-face 'JetBrains'` morto (`index.css:79-82`) o self-hostare il woff2. 10 min.
9. `aria-label` sui 3 bottoni icona-only (`App.tsx:319,421,427`) + `aria-current="page"` sui NavBtn attivi (`App.tsx:141`). 15 min.
10. Nota "scena ≥40% altezza, un elemento dominante" nella bibbia visiva caroselli (README). 5 min.

## INGEGNERIZZAZIONE (interventi più grossi, in ordine di resa)

1. **[P8] Estrazione `nlevel/NLevelExplorer.tsx`** — de-quadruplicare NodeTile/NodeLevel/ST/navStack (F7). ~2-3 h, migrazione una sezione per commit con screenshot. È il prerequisito per "scalare il pattern N-livelli su tutto il sito" senza moltiplicare il debito.
2. **[P11] Template canonico caroselli** (`CAROSELLI/_TEMPLATE/`) con tokens.css + base 16 slide (F12). ~2 h. Da fare PRIMA di generare EP_N2_03, o il drift si consolida.
3. **[P9] Tema light tappa 2** — token `--surface-1/2`, `--text-1/2/3`, `--line-1` e migrazione a partire da `UIComponents.tsx` (F9). ~4-6 h incrementali. Nel frattempo: nascondere il toggle.
4. **[P10] A11y CommandBar** — role dialog/combobox/listbox + focus trap (F10). ~1-2 h.
5. **[P12] Scala tipografica di sistema** — `--text-2xs/xs/sm` in `@theme`, adozione sulle view nuove, floor `!important` mantenuto come safety net per il legacy (F11). ~1 h + disciplina.
6. **[F8] `PageKicker` + consolidamento card** — un componente header di pagina, e regola "le card nuove usano `Card`/`StatBlock` di UIComponents". ~1 h.
7. **[F14] Policy peso caroselli** — compressione PNG, `_sheet` fuori repo, valutare LFS/esclusione `slides/`. ~1 h, da decidere prima dell'episodio 10.

---
*Metodo: analisi statica (nessun server lanciato, nessuna API chiamata, nessun file di progetto modificato). Verifica visiva sui PNG renderizzati dei caroselli. Contrasti calcolati sui valori esadecimali della palette custom, non sui default Tailwind.*
