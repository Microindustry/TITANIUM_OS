<!-- TOC -->

- [Poster  il mondo di Nina (materiali visivi)](#poster-il-mondo-di-nina-materiali-visivi)
  - [Assets](#assets)
  - [Come rigenerare](#come-rigenerare)
  - [Palette Regioni (coerenza)](#palette-regioni-coerenza)
  - [Da abbinare al gioco](#da-abbinare-al-gioco)

<!-- /TOC -->

# Poster — il mondo di Nina (materiali visivi)

*Grafica del mondo di Nina. Tutto è **design HTML/SVG reso in PNG via headless Chrome**
(in questo ambiente non c'è generazione AI di immagini → niente scene dipinte, design
grafico vero). Rigenerabile, versionato. — sess.#44, 24/06/2026.*

## Assets

*Riorganizzata #59 (15/07/2026): tavole sciolte → `TAVOLE/`, produzione → `CAROSELLI/`.*

| Percorso | Cosa | Formato |
|----------|------|---------|
| `CAROSELLI/` | **La linea di produzione**, divisa per binario: `NINA/` (favola) e `SISTEMA/` (voce Matteo); `_BOZZE/` = quarantena apprendista notturno; `_griglia_ig.png` = anteprima profilo. Ogni livello ha il suo README | 1080×1350 |
| `TAVOLE/EP_N2_01_poster.html/.png` | Poster del **pilota** — la porta non vista + il ponte della Giuntura (Atomi/Bit) | A3 1123×1587 |
| `TAVOLE/mappa_mondo.html/.png` | **La mappa-mondo**: le 8 Pietre su un cammino unico ⟡0→⟡7 (dal metallo alla mente) | A3 1123×1587 |
| `TAVOLE/model_sheet_personaggi.html/.png` | **Model sheet del cast** — icone canoniche dei personaggi (fonte per BIBBIA_VISIVA e brief illustratore) | A3 |
| `regioni/regione_N_*.png` (×8) | **Collana delle 8 Regioni**: una card per Pietra ⟡0→⟡7, colore-tema + gemma + episodio-madre (le scrive `nina_region_posters.py`) | Social 1080×1350 |

## Come rigenerare

```bash
# collana 8 Regioni (legge episodes.json, colori per Pietra)
python CONTENT_ENGINE/scripts/nina_region_posters.py
# il poster pilota e la mappa-mondo sono HTML statici: aprili in Chrome headless
chrome --headless=new --window-size=1123,1587 --virtual-time-budget=7000 \
  --screenshot=out.png file:///.../TAVOLE/mappa_mondo.html
```

NB: i font sono Google Fonts via `@import` (Playfair Display + Space Mono) — servono
online al momento del render. Profilo Chrome separato (`--user-data-dir`) se Chrome è già aperto.

## Palette Regioni (coerenza)

⟡0 Materia `#f4b65a` · ⟡1 Traccia `#34d399` · ⟡2 Officina `#fb923c` · ⟡3 Mente `#a78bfa`
· ⟡4 Biblioteca `#38bdf8` · ⟡5 Grande Mappa `#818cf8` · ⟡6 Esercito `#fb7185` · ⟡7 Direttore `#fbbf24`

## Da abbinare al gioco
Le card-Regione sono la **legenda visiva** della mappa-gioco; la `mappa_mondo` è la
world-map. Un episodio = una casella; gli open-loop = gli archi del cammino (vedi
[[INDICE_CAMMINO]]). Riferimenti: [[PRODUZIONE_NINA]], [[PIETRE]].
