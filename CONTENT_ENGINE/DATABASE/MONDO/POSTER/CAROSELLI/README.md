<!-- TOC -->

- [CAROSELLI  la linea di produzione (Nina  Sistema)](#caroselli-la-linea-di-produzione-nina-sistema)
  - [Struttura (una cartella per carosello)](#struttura-una-cartella-per-carosello)
  - [Regole](#regole)
  - [Formato standard](#formato-standard)
  - [Serie PRE  i preamboli (due binari, si presentano a vicenda)](#serie-pre-i-preamboli-due-binari-si-presentano-a-vicenda)
  - [Episodi](#episodi)
  - [Lapprendista notturno (_BOZZE)](#lapprendista-notturno-bozze)

<!-- /TOC -->

# CAROSELLI — la linea di produzione (Nina + Sistema)

Ogni carosello vive nella **sua cartella**, con file canonici identici ovunque —
così ogni script (render_queue, caroselli_qc, grid_preview, night_caroselli) cicla
su tutte le cartelle. Impostata sess.#48; riorganizzata sess.#59 (15/07/2026).

## Struttura (una cartella per carosello)
```
CAROSELLI/
  NINA/                    🌙 il binario educativo (favola vera) → vedi NINA/README.md
    PRE_01/ PRE_02/ PRE_03/ EP_N2_01/ EP_N2_02/ …
  SISTEMA/                 🔧 il binario reale, voce Matteo → vedi SISTEMA/README.md
    PRE_SG_01…04/ EP_SG_01_01/ EP_SG_01_02/ …
  _BOZZE/                  🌒 quarantena apprendista notturno → vedi _BOZZE/README.md
  _TEMPLATE/               🧩 base per nuovi caroselli → vedi _TEMPLATE/README.md
  _griglia_ig.png          anteprima griglia profilo IG (grid_preview.py)

  dentro OGNI cartella carosello (convenzione identica, a ogni profondità):
    carosello.html         sorgente HTML+SVG (la verità; Express-ready, hz: meta)
    caption.txt            caption pronta da postare
    README.md              scheda: fonte, revisioni, stato pubblicazione
    slides/                render PNG (1080×1350) — derivato, rigenerabile
    slides_ig/             render JPEG per feed IG (≤8MB) — derivato
    _build_*.py            builder della versione VIVA (se generato via script)
    _VERSIONI/             archivio additivo: ogni redesign salvato, INDEX.md
```
*Gli script (render_queue, caroselli_qc, grid_preview) scoprono le cartelle in modo
RICORSIVO (ovunque ci sia un `carosello.html`, esclusi `_BOZZE/_TEMPLATE/_VERSIONI`) —
puoi aggiungere sottocartelle di binario senza toccare il codice (riordino #59).*
**Procedura e regole publish-ready: `MENTE/KNOWLEDGE/MONDO/GUIDA_CAROSELLI.md`
(fonte unica operativa) — QC: `python CONTENT_ENGINE/scripts/caroselli_qc.py`.**

## Regole
- **UN taglio, sempre ≤10 slide** (riconciliazione Matteo 14/07, GUIDA §1.0):
  il materiale extra = un carosello in più, mai comprimere né buttare.
  *(supera il "formato doppio" 16+social: `social.html` sopravvive solo nei legacy)*
- **Copertina = poster** (GUIDA §2-bis): `class="cover-title"`, safe-zone 1:1,
  gancio mai riassunto, un solo punto focale. Volti: liberi, MAI chiusi in forme
  geometriche (regola Matteo 15/07 — dissolvenza radiale).
- **Numeri**: solo misure vere (GUIDA §7.7 — mai numeri di progetto come fatti;
  canon_guard v1.2 `scan_public` li blocca).
- **Additivo**: nuova cartella da `_TEMPLATE/carosello_base.html`; i redesign
  archiviano il vivo in `_VERSIONI/` prima di sovrascrivere.
- **Serie = collezione**: stesso stampo per serie (PRE Nina = stampo PRE_01 v13,
  onde di sfondo in fase continua tra i caroselli: PRE_01=1-10, 02=11-20, 03=21-30).

## Formato standard
Canvas **1080×1350 (4:5)** · Playfair Display (titoli) + Space Mono (etichette) +
Source Sans 3 (corpo), kit Typekit `zhv2kry` · slide 1 = copertina/gancio ·
ultima slide = perché restare + open loop con assaggio (GUIDA §7).

## Serie PRE — i preamboli (due binari, si presentano a vicenda)

| ID | Binario | Titolo | Slide | Stato |
|----|---------|--------|-------|-------|
| PRE_01 | Nina | Il Mondo di Nina | 10 | **v13 — rifatto da 0 INSIEME (15/07 #59)**, volto libero |
| PRE_02 | Nina | Come funziona Nina | 10 | **v2 — a standard (15/07 #59)**, 16→10 |
| PRE_03 | Nina | I Personaggi | 10 | **v6 — a standard (15/07 #59)**, 17→10, volto in copertina |
| PRE_04 | Nina | Tutto è vero | — | **DA CREARE** (patto di verità + presenta il binario Sistema) |
| PRE_SG_01 | Sistema | Chi parla | 10 | prodotto #58 — test LinkedIn (carica Matteo, `linkedin.txt`) |
| PRE_SG_02 | Sistema | Cos'è il Sistema | 10 | prodotto #58 · de-numeri-progetto 15/07 |
| PRE_SG_03 | Sistema | Il patto del racconto | 10 | prodotto #58 (de-insider) |
| PRE_SG_04 | Sistema | La mappa delle stagioni | 10 | prodotto #58 · presenta Nina (1 slide) · de-numeri 15/07 |

## Episodi

| ID | Binario | Titolo | Slide | Stato |
|----|---------|--------|-------|-------|
| EP_N2_01 | Nina | La Bambina che Chiedeva Perché (⟡0) | 16 | legacy formato doppio — a standard ≤10 quando toccato |
| EP_N2_02 | Nina | Il Soffio di Troppo (⟡0) | 16 | legacy formato doppio — a standard ≤10 quando toccato |
| EP_SG_01_01 | Sistema | Il primo prompt | 10 | bozza notturna 14/07 → corretta (canone) e promossa 15/07 |
| EP_SG_01_02 | Sistema | La Taverna | 10 | bozza notturna 15/07 → corretta (de-numeri) e promossa 15/07 |
| EP_SG_01_03 | Sistema | Il Distacco | 10 | bozza notturna 15/07 → corretta (§7.5) e promossa 15/07 (fine rodaggio 3/3) |
| EP_SG_02_01 | Sistema | V32 — il cuore che taglia | 10 | bozza notturna 16/07 → revisione §7.7 (slide 9 STATO REALE) e promossa 16/07 (apertura CAP 2) |

*Il piano completo dei 69 caroselli S1 sistema: `MENTE/STORIE/SG_GIORNO0/_PIANO_PRODUZIONE.md`.
Il cammino Nina (57 caroselli): `MENTE/KNOWLEDGE/MONDO/PIANO_PRODUZIONE_NINA.md`.*

## L'apprendista notturno (_BOZZE)

`night_caroselli` (task `TI_NightCaroselli` @04:15) prende un item `pending` da
`DATA/caroselli_queue.json`, fa grounding RAG → bozza → render → QC e la lascia in
`_BOZZE/<ID>/`. **Mai promozione automatica**: la promozione (di giorno, dopo revisione)
= spostare la cartella qui fuori, spuntare il piano in MENTE, rigenerare `_griglia_ig.png`,
generare il PDF LinkedIn (`python CONTENT_ENGINE/scripts/pdf_export.py <ID>`).
Report del mattino: `DATA/audit/bozze_caroselli.json` · log: `DATA/logs/night_caroselli.log`.

## Il PDF LinkedIn (un documento per episodio)

Ogni cartella ha il suo `carosello.pdf` (una pagina per slide, 1080×1350) generato da
`pdf_export.py` (batch su tutte le cartelle, o `pdf_export.py <ID>` per una). È il
formato del post-DOCUMENTO LinkedIn (sfogliabile). Canale NON-Meta: pubblicabile
subito, si carica a mano dal profilo. Rigenera il PDF quando cambi le slide.
