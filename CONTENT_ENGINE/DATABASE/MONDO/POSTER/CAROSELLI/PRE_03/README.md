# Carosello — PRE_03 · I Personaggi (la scheda del cast)

**Fonte:** serie PREAMBOLO (non legato a un episodio) — character bible del Mondo di Nina.
Canone personaggi: `MENTE/KNOWLEDGE/NINA_DESIGN_DEFINITIVO.md` + BIBBIA del mondo.
**Formato:** Instagram/LinkedIn carosello · 17 slide · 1080×1350 (4:5)
**Stato:** v5 "personaggi profondi" (02/07/2026) — HTML+PNG. Scarti v2/v3/v4 in `_VERSIONI/`.
**Regola:** PRE_03 è l'anagrafica statica del cast; Nina si presenta VIVA dentro EP_N2_01
(preambolo = anagrafica, episodi = storia — decisione sess.#51).

## File in questa cartella
| File | Cosa |
|------|------|
| `carosello.html` | Sorgente — HTML self-contained (foto Nina base64 inline, export Express ok) |
| `caption.txt` | Descrizione/caption pronta da incollare nel post |
| `_build_pre03.py` | Generatore v2.0 — rigenera `carosello.html` (glifi SVG + testi) |
| `_render_all.py` | Render PNG di tutte le slide |
| `img/` | Foto di Nina (volto definitivo 3D) |
| `slides/` | Export PNG delle 17 slide (1080×1350) |
| `_VERSIONI/` | Snapshot: v1 nina-solo · v2 redesign-testo · v3 continuo-studio · v4 stile-episodi · v5 personaggi-profondi |

## Le 17 slide
1. **Copertina** — I Personaggi del Mondo di Nina
2. **L'eroina** — Nina, il volto vero (foto definitiva)
3. **Nina · com'è fatta** — carattere
4. **Nina · luci e ombre** — pregi e difetti (personaggio vero, non santino)
5. **Nina · come la riconosci** — aspetto
6. **Nina · come cresce** — l'arco
7. **Il cast · non è sola** — panoramica
8. **Themis · chi è** — il custode della misura
9. **Themis · cosa fa per Nina**
10. **Forge · chi è** — il fabbro
11. **Forge · cosa fa per Nina**
12. **Insieme · misura e martello** — la coppia complementare
13. **L'Entropia · l'avversario** — il disordine che disfa
14. **L'Entropia · come la incontri** — mai un mostro, sempre un effetto
15. **Il duello · ordine vs disordine**
16. **Altri volti · il mondo è grande** — il cast futuro (solo simboli, per ora)
17. **Si parte** — CTA verso gli episodi

## Come rigenerare / esportare
- **Editare**: modifica `_build_pre03.py` → rigenera `carosello.html` → ri-esporta in Express.
- **PNG locali**: `_render_all.py` (Chrome headless), output in `slides/`.
