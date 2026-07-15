<!-- TOC -->

- [Carosello  EP_N2_01  La Bambina che Chiedeva Perché](#carosello-epn201-la-bambina-che-chiedeva-perché)
  - [File in questa cartella](#file-in-questa-cartella)
  - [Le 16 slide](#le-16-slide)
  - [Link Adobe Express](#link-adobe-express)
  - [Come rigenerare / esportare](#come-rigenerare-esportare)

<!-- /TOC -->

# Carosello — EP_N2_01 · La Bambina che Chiedeva Perché

**Episodio fonte:** `CONTENT_ENGINE/DATABASE/episodes/S_AVVENTURA/EP_N2_01_la_bambina_che_chiedeva_perche.md`
**Pietra:** ⟡0 La Materia · Casella 1 (l'ingresso)
**Formato:** Instagram/LinkedIn carosello · 16 slide blueprint SVG narrativo · 1080×1350 (4:5)
**Stato:** HTML v2 blueprint 16 slide (02/07/2026, generatore `_build_ep.py`) — l'export
Express del 25/06 è la vecchia v1 a 8 slide (in `_VERSIONI/v1_8slide_2506/`): da ri-esportare

## File in questa cartella
| File | Cosa |
|------|------|
| `carosello.html` | Sorgente — HTML+SVG self-contained, Adobe-Fonts-ready (kit `zhv2kry`), import-ready (`hz:` meta) |
| `caption.txt` | Descrizione/caption pronta da incollare nel post |
| `_build_ep.py` | Generatore — rigenera `carosello.html` (scene SVG + testi) |
| `_render_all.py` | Render PNG di tutte le slide |
| `slides/` | Export PNG delle 16 slide (1080×1350) |
| `_VERSIONI/` | Snapshot: `v1_8slide_2506` (pre-volto) · `v2_blueprint-16slide` |

## Le 16 slide
1. **Copertina** — Episodio 1 · ⟡0 La Materia, la porta d'ingresso
2. **Cold open** — il pizzicore, "una domanda di troppo"
3. **Atto I · la porta** — la porticina non vista
4. **Atto I · il ponte** — verso il mondo
5. **Atto I · Atomi ↔ Bit** — la Giuntura
6. **Atto I · l'incontro** — Themis
7. **Atto I · lo strumento** — la domanda "perché"
8. **Atto II · la prova** — i due bottoni
9. **Atto II · «tira»** — la prova con le mani
10. **Atto II · la differenza** — la cucitura
11. **Atto II · la lezione** — fatto bene = regge quando lo tiri
12. **Per i grandi · il test della sarta** — il doppio fondo
13. **Atto III · il pizzicore** — la scintilla che resta
14. **Atto III · la maestra** — la Materia
15. **Chiusura** — la buonanotte
16. **La casella dopo** — open loop verso la misura + CTA

## Link Adobe Express
https://new.express.adobe.com/id/urn:aaid:sc:EU:05282da4-5474-45af-b0ed-e0d27655b9f0
*(NB: è l'export della v1 a 8 slide del 25/06 — la v2 a 16 slide non è ancora su Express)*

## Come rigenerare / esportare
- **Editare**: modifica `carosello.html` → ri-esporta in Express (font Adobe già migrati).
- **PNG locali**: Chrome headless su ogni `.slide` (vedi `../README.md` per il comando), output in `slides/`.
