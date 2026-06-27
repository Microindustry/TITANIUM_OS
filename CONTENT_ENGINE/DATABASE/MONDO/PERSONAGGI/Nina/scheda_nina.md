<!-- TOC -->

- [Nina  scheda personaggio](#nina-scheda-personaggio)
  - [Identità](#identità)
  - [Stato design (additivo  niente si cancella)](#stato-design-additivo-niente-si-cancella)
    - [Evoluzione 14enne (additivo  tutte in _VERSIONI/)](#evoluzione-14enne-additivo-tutte-in-versioni)
    - [Versioni-outfit (stesso volto/identità, cambia solo labito)](#versioni-outfit-stesso-voltoidentità-cambia-solo-labito)
  - [Due strade per lavatar (decidere con Matteo)](#due-strade-per-lavatar-decidere-con-matteo)
    - [Prompt di generazione (se si sceglie la strada 2)](#prompt-di-generazione-se-si-sceglie-la-strada-2)

<!-- /TOC -->

# Nina — scheda personaggio

*Casa canonica dei personaggi: `MONDO/PERSONAGGI/<Nome>/` — ognuno con il suo `_VERSIONI/`.*
*Riferimento stile: `Desktop/teacher-avatar.png` (3D amichevole, verde/teal + bianco, occhioni).*

## Identità
- **Chi è:** una bambina (~8-9 anni), curiosa, testarda nel modo giusto.
- **Superpotenza:** chiede **«perché?»** e poi **va a vedere davvero**. Apre porte che gli altri non vedono.
- **Simbolo:** il **`?`** + la **porticina** (la curiosità che apre).
- **Palette:** verde/teal `#34d399` · accento Nina rosa `#ec4899` · camice bianco · capelli castani.
- **Ruolo nel mondo:** la protagonista che attraversa la Mappa (⟡0→⟡7); si perde come Matteo,
  e il sistema (il papà-meccanico) le costruisce gli strumenti. La Mappa **è** il suo OS.

## Stato design (additivo — niente si cancella)
| Versione | Cos'è | Stato |
|----------|-------|-------|
| **v1_claude-design** | illustrazione vettoriale HTML/SVG (Claude Design): volto buffo/infantile, braccio da sistemare | superata |
| **v2_lineamenti-rifiniti** | volto rifinito hint latino, SVG; bocciata ("troppo bambina/infantile") | superata |
| **v3_3d-gamma** | **avatar 3D Pixar/Apple generato via Gamma (`flux-2-klein`, preset 3D)**: bambina ~9 anni, occhioni curiosi, sorriso coinvolgente, giacchina esploratrice verde-teal + rosa, molletta rosa. È IL look. `_GEN/nina_3d_01.png`. (anche `_benchmark-adulta.png` = test Hunziker/Themis) | **ATTUALE** |

> **Pipeline avatar DECISA:** generazione 3D via **Gamma** (`generate`, format social 1x1, `imageOptions.stylePreset:"3D"`, modello default `flux-2-klein`). Si scarica il `src` pulito dell'immagine (non la card), poi si toglie lo sfondo e si compone nella slide. Vale per tutti i personaggi (Themis, Forge) → stessa resa coerente.

### Evoluzione 14enne (additivo — tutte in `_VERSIONI/`)
| Versione | Cambiamento | Stato |
|----------|-------------|-------|
| v3 | bambina ~9 anni, primo 3D | superata |
| v4 | ~14 anni, più definita | superata |
| v5 | mix colombiana+sud Italia, capelli lisci scuri | superata |
| v6 | coda alta + lentiggini + toppa (logo bocciato) | superata |
| v7 | faccia meno rotonda, **giacca 1** (teal+bretelle rosa), no logo | superata |
| v8 | coda altissima ballet, lunga | superata |
| v9_marcata-ballet | lineamenti marcati/netti, fronte scoperta, coda ballet | superata (base mix) |
| **v10_DEFINITIVA** | **NINA UFFICIALE — scelta da Matteo** (`nina_genio_1`): mora, brava ragazza di buona famiglia + piccolo genio curioso; coda alta, giacca teal/rosa, lentiggini, occhi castano scuro. File: `nina_DEFINITIVA.png`. Slide-personaggio montata: `slide_personaggio.html/.png` (ritratto incorniciato sul fondo del mondo) | **DEFINITIVA ✅** |

*Bozze avatar RIMOSSE da disco 27/06 (Matteo, per non confondersi) — recuperabili dal commit git `0b836e97`. Tenuti solo: definitiva + deliverable (nina_DEFINITIVA/VITA/ritratto, `_SCENE`, slide, `_VERSIONI` v10-12).*
*Logo MIMS-Ponte in `MONDO/LOGHI/mims_ponte_badge.svg` — bocciato, NON usato (tenuto).*
### Versioni-outfit (stesso volto/identità, cambia solo l'abito)
- **VITA (mondo) — `v11_vita-denim`**: giacca **denim** a bottoni, pelle calda, sguardo sfrontato. File `nina_VITA.png` + slide `slide_personaggio.html/.png`. **ATTUALE per la serie Personaggi.** (Studi colore scartati in `_STUDI_GIACCA/`: senape/terracotta/bordeaux.)
- OFFICINA — da fare (tuta/grembiule, occhiali, guanti).
- TECH — da fare (look digitale).

*Da fare: scontorno vero (Adobe file-picker o rembg) per Nina "dentro la scena"; export Adobe Express della slide.*

## Due strade per l'avatar (decidere con Matteo)
1. **Claude Design (HTML/SVG)** — quella di v1. Pro: nostra, editabile, versionabile, importabile in
   Adobe Express (`import-claude-design-from-url`), zero dipendenze. Contro: vettoriale, non foto-3D.
2. **Generazione AI 3D** (stesso strumento del teacher-avatar) — Pro: look 3D pieno. Contro: esterno,
   da rigenerare per coerenza. In quel caso io fornisco il prompt sotto e poi monto/verso la slide.

### Prompt di generazione (se si sceglie la strada 2)
> *3D Pixar-style character render of a curious 8-year-old girl, friendly big expressive eyes,
> short brown bob with a small pink hair clip, light freckles, wearing a little white explorer/lab
> coat over a teal-green shirt with a small pink scarf; one hand raised with index finger pointing
> up (curiosity), warm soft studio lighting, glossy clean look, teal-green and white palette with
> pink accents, plain white background, full upper body, centered.*

Coerenza con gli altri: stesso render, stessa luce, stessa palette del mondo (Themis = misura/calibro,
Forge = il fare/officina). Vedi `BIBBIA_VISIVA_CAROSELLI.md` §4 (avatar + simbolo).
