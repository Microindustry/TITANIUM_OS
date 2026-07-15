<!-- TOC -->

- [Carosello  EP_N2_02  Il Soffio di Troppo](#carosello-epn202-il-soffio-di-troppo)
  - [File](#file)
  - [Arco (16 slide)](#arco-16-slide)
  - [Rigenerare / esportare](#rigenerare-esportare)

<!-- /TOC -->

# Carosello — EP_N2_02 · Il Soffio di Troppo

**Episodio fonte:** `CONTENT_ENGINE/DATABASE/episodes/S_AVVENTURA/EP_N2_02_il_soffio_di_troppo.md`
**Pietra:** ⟡0 La Materia · Casella 2 (la precisione è una relazione)
**Formato:** Instagram/LinkedIn · 16 slide · 1080×1350 · blueprint SVG narrativo (no foto)
**Stile:** famiglia PRE_*/EP_N2_01 — gradiente blu + griglia + flusso continuo gold/cyan; scene SVG per ogni beat.

## File
| File | Cosa |
|------|------|
| `carosello.html` | Sorgente self-contained, Adobe-Fonts-ready (kit `zhv2kry`), import-ready (`hz:` meta) |
| `_build_ep.py` | Generatore (stile+flusso+scene+contenuti). Rigenera con `python _build_ep.py` |
| `_render_all.py` | Render PNG per-slide + contact sheet `_sheet.png` |
| `caption.txt` | Caption pronta per il post |
| `slides/` | PNG delle 16 slide |
| `_VERSIONI/` | Snapshot versioni |

## Arco (16 slide)
1. Cover · 2. la Fucina (cold open) · 3. il soffio · 4. giusto rispetto a cosa? · 5. mezzo mm = il patto ·
6. il test della sarta (seta/lana) · 7. la precisione è relazione · 8. l'incastro fisso · 9. preme non soffia ·
10. gradi non sì/no · 11. la tolleranza (±0,5 vs ±0,1) · 12. cosa succede se sbaglio? · 13. il patto ·
14. prima la testa · 15. chiusura (casella 2) · 16. open loop → la MISURA (EP_03) + provalo tu.

## Rigenerare / esportare
```
python _build_ep.py        # rigenera carosello.html
python _render_all.py      # render slides/ + _sheet.png
```
Export Adobe Express: `html_export_readiness_skill` → `export_html_to_express`.
