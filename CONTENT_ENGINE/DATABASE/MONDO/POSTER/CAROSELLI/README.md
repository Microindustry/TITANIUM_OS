<!-- TOC -->

- [CAROSELLI  i contenuti social di Nina (uno per episodio)](#caroselli-i-contenuti-social-di-nina-uno-per-episodio)
  - [Struttura (una cartella per carosello)](#struttura-una-cartella-per-carosello)
  - [Regole](#regole)
  - [Formato standard](#formato-standard)
  - [Pipeline (un episodio  un carosello)](#pipeline-un-episodio-un-carosello)
  - [Indice caroselli](#indice-caroselli)

<!-- /TOC -->

# CAROSELLI — i contenuti social di Nina (uno per episodio)

Ogni carosello vive nella **sua cartella**, con tutti i file divisi. Convenzione fissa
(scalabile sui 50+ episodi di Nina). — impostata sess.#48, 25/06/2026.

## Struttura (una cartella per carosello)
```
CAROSELLI/
  <EP_ID>/                 es. EP_N2_01, EP_N2_02, …
    carosello.html         sorgente HTML+SVG (Adobe-Fonts-ready, import-ready per Express)
    caption.txt            descrizione/caption pronta da postare
    README.md              scheda: episodio fonte, le slide, link Express, stato
    slides/                export PNG delle slide (1080×1350)
```

## Regole
- **Un episodio = una cartella `<EP_ID>/`.** Mai file di caroselli diversi mischiati.
- **Nomi file canonici e identici in ogni cartella**: `carosello.html`, `caption.txt`,
  `README.md`, `slides/`. Così uno script può ciclare su tutte le cartelle.
- **Additivo**: si aggiunge una cartella, non si tocca quelle esistenti.
- **Sorgente = HTML**: la verità è l'HTML nel repo (versionato, rigenerabile). Express e i
  PNG sono derivati. L'HTML nasce già Adobe-Fonts-ready (kit Typekit) e import-ready (`hz:`
  meta) → `export_html_to_express` lo trasforma in documento Express editabile + carosello.

## Formato standard
- Canvas: **1080×1350 (4:5)** — il formato re per carosello educativo IG/LinkedIn.
- Linguaggio visivo: palette Regioni (vedi `../README.md`), Playfair Display (titoli) +
  Space Mono (etichette) + Source Sans 3 (corpo), motivo Atomi|Bit, anello ⟡ per la Pietra.
- Slide 1 = copertina/hook · slide finali = open loop + CTA verso la Pietra successiva.

## Pipeline (un episodio → un carosello)
```
EP_N2_xx.md  →  carosello.html (8 slide)  →  export_html_to_express  →  Express + PNG
                       ↑ caption.txt (descrizione)
```

## Serie PREAMBOLO (più caroselli che introducono il mondo, prima degli episodi)
La serie `PRE_*` non è legata a un singolo episodio: introduce Nina su più caroselli
(15-17 slide l'uno), uno aiuta l'altro. Stile "buonanotte" + flusso sfumato continuo.
| PRE | Titolo | Cosa fa | Slide | Stato |
|-----|--------|---------|-------|-------|
| PRE_01 | Il Mondo di Nina | overview del mondo (cos'è, personaggi, simboli, cammino) | 17 | HTML+PNG, allineato visione |
| PRE_02 | Come funziona Nina | dettaglio meccanismo (Libro-IA, Mappa Viva, doppio fondo, motore, Nina↔HR, eredità) | 16 | HTML+PNG |

## Indice caroselli (episodi)
| EP | Titolo | Pietra | Stato |
|----|--------|--------|-------|
| EP_N2_01 | La Bambina che Chiedeva Perché | ⟡0 Materia | ✅ Express |
