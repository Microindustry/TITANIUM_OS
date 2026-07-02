<!-- TOC -->

- [Carosello  PRE_01  Il Mondo di Nina (preambolo)](#carosello-pre01-il-mondo-di-nina-preambolo)
  - [File](#file)
  - [Le 8 slide](#le-8-slide)
  - [Stile](#stile)
  - [Rigenerare](#rigenerare)

<!-- /TOC -->

# Carosello — PRE_01 · Il Mondo di Nina (preambolo)

**Tipo:** Preambolo / presentazione (PRIMA degli episodi). Introduce il mondo.
**Formato:** Instagram/LinkedIn carosello · 8 slide · 1080×1350 (4:5)
**Stato:** ◐ bozza ricca resa in PNG (25/06/2026) — da esportare in Express quando approvato

## File
| File | Cosa |
|------|------|
| `carosello.html` | Sorgente — HTML+SVG self-contained, Adobe-Fonts-ready, scene illustrate con glow |
| `caption.txt` | Descrizione pronta da postare |
| `slides/` | `slide_1.png … slide_8.png` — le 8 immagini pronte |

## Le 8 slide
1. **Copertina** — la porta che brilla + ponte Atomi|Bit
2. **Il Patto** — buonanotte, lettura ad alta voce, le 3 orecchie (bambino/curioso/grande)
3. **Nina** — la bambina che chiede perché (simbolo ?)
4. **Themis** — la custode della Giuntura (simbolo calibro)
5. **Atomi ↔ Bit** — due mondi? no, lo stesso mondo
6. **La Giuntura** — il ponte che li tiene insieme
7. **La Mappa** — le 8 Pietre ⟡0→⟡7, dal metallo alla mente
8. **Si parte** — la porta è aperta · ⟡0 La Materia → Episodio 1

## Stile
Vedi `MONDO/BIBBIA_VISIVA_CAROSELLI.md`. Scene illustrate atmosferiche (glow), filo-ponte oro
che attraversa le slide (bead avanza = progresso), niente griglia a vista, niente slot vuoti.
Slot-personaggio (Nina/Themis illustrati) si innestano dopo — vedi `MONDO/BRIEF_ILLUSTRATORE_PERSONAGGI.md`.

## Rigenerare
Modifica `carosello.html` → render Chrome headless striscia 1080×11200 → slice Python in `slides/`.
Export Adobe Express: `export_html_to_express` (HTML già import-ready).
