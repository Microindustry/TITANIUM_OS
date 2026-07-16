<!-- TOC -->

- [ATTACCO 2  DOMINIO 1  PIPELINE CONTENUTI (bozza  revisione  pubblicazione)](#attacco-2-dominio-1-pipeline-contenuti-bozza-revisione-pubblicazione)
  - [Quadro (5 righe)](#quadro-5-righe)
  - [Colli trovati (dal più grave)](#colli-trovati-dal-più-grave)
  - [Il calcolo dei mesi (165 caroselli, ritmo attuale)](#il-calcolo-dei-mesi-165-caroselli-ritmo-attuale)
  - [Quante azioni manuali OGGI per portare 1 carosello sui canali](#quante-azioni-manuali-oggi-per-portare-1-carosello-sui-canali)
  - [Sbloccabile SENZA Matteo vs gated](#sbloccabile-senza-matteo-vs-gated)
  - [TOP 3 per leva (impatto/sforzo)](#top-3-per-leva-impattosforzo)

<!-- /TOC -->

# ATTACCO #2 · DOMINIO 1 — PIPELINE CONTENUTI (bozza → revisione → pubblicazione)

*15/07/2026 — agente Fable 5, **propose-only**: nessun file esistente toccato, solo questo report.
Prove: conteggi su disco, log `DATA/logs/night_caroselli.log`, coda `DATA/caroselli_queue.json`,
QC `DATA/audit/caroselli_qc.json`. Niente segreti (report in repo pubblico).*

## Quadro (5 righe)

La fabbrica a monte è SANA: 14 caroselli publish-ready (QC 15/07 17:19 — `checked: 14, issues: 0`),
apprendista notturno vivo (3 bozze → 3 promosse, run di 62–77 secondi l'una). Ma il magazzino non
scarica: **0 caroselli pubblicati su 14** (ogni README: `[ ] pubblicato`), 0 PDF LinkedIn su disco,
0 export Express aggiornati (solo il link storico v1 di EP_N2_01), sito Pages deciso ma non creato.
E la generazione, oggi al 5% della sua capacità, si spegne da sola: **coda = 6 item → vuota il 21/07**.

## Colli trovati (dal più grave)

| # | Collo | Prova / numero | Impatto | Proposta additiva |
|---|-------|----------------|---------|-------------------|
| 1 | **PUBBLICAZIONE (noto)** — prerequisiti Meta fermi | `DASHBOARD/src/components/PubblicazioniView.tsx:65-68`: passi 1-4 tutti `gated` (mail, FB+IG Business, app Meta, Docker) ≈ 1h Matteo; 14 pronti / 0 pubblicati | il 100% dell'output resta in magazzino; ogni notte produttiva = +1 invenduto | i passi 1-4 restano gated; nel frattempo aprire i canali NON-Meta (vedi sotto: PDF LinkedIn, Pages, Express) |
| 2 | **Coda apprendista corta e a riempimento manuale** | `DATA/caroselli_queue.json`: 6 `pending` (EP_SG_02_01…06) vs 66 SG rimanenti; nota riga 2: "si estende dai piani man mano" (= a mano) | l'apprendista si ferma il **21/07** (6 notti); poi 0 bozze/notte finché qualcuno estende | script additivo `queue_refill.py`: legge `_PIANO_PRODUZIONE.md`, appende i prossimi N item pending (angolo+query dai titoli del piano), mai tocca i promossi |
| 3 | **CAP 1 bozza/notte = 5% della capacità** | `NODES/CAROSELLI_AGENT/night_caroselli.py:126-127` (prende il PRIMO pending e basta); run misurati 76s, 77s, 62s (log 14-15/07) su timeout 20 min (`:31`) | 66 SG rimanenti = **66 notti ≈ 9,5 settimane** solo per generarli; a 3/notte = 22 notti | parametro `MAX_BOZZE=2-3` (loop sugli item, stesso lock/timeout); il costo resta sonnet ~4k token/bozza (`:30,95`) |
| 4 | **Binario Nina SENZA corsia notturna** | `night_caroselli.py:68-77`: SYSTEM prompt = solo "voce di Matteo / storie di sistema" + scene da `sg_builder`; in coda 0 item Nina; Nina 7/57 fatti | 50 caroselli Nina solo "insieme" a 1-2/sessione = **25-50 sessioni (~3-6 mesi da soli)**, eppure i 53 testi EP_N2 ESISTONO già come canone (PIANO_PRODUZIONE_NINA: "i testi esistono già") | `night_caroselli_nina` gemello: input = testo EP_N2 canonico (niente invenzione), stampo PRE_01 v13, stesse guardie; PRE/episodi chiave restano `insieme: true` |
| 5 | **LinkedIn: il PDF non esiste** | `find CAROSELLI -name "*.pdf"` = **0 file**; GUIDA §2: "LinkedIn = documento PDF"; solo `PRE_SG_01/linkedin.txt` pronto (test gated riga 113 bussola) | canale LinkedIn (già testabile OGGI, zero prerequisiti Meta) fermo per mancanza di un derivato banale | `pdf_export.py` additivo: `slides/*.png` → `carosello.pdf` per cartella (Pillow già in uso in `render_queue.py:19`); batch = 14 PDF in un run |
| 6 | **Express: 0/14 export aggiornati** | unico link: EP_N2_01 README riga 28, "v1 8 slide: da ri-esportare"; ogni altro README: `[ ] export Express` | la via `export_html_to_express` (pipeline decisa, memoria Nina-caroselli) è ferma benché sia 100% lato Claude | sessione batch: 14 export via MCP (HTML già self-contained, QC verde 14/14) + link nel README di ogni cartella |
| 7 | **Sito GitHub Pages "nina" deciso, non nato** | `DA_FARE_FATTO.md:890-896`: repo separato deciso (casa episodi + hosting URL immagini che la Graph API richiederà); repo inesistente | quando Meta si sblocca mancherà comunque l'hosting immagini → gate in serie invece che in parallelo | creare ora repo `nina` + generatore statico da `episodes.json` (push dal terminale reale — sandbox non pusha, memoria Git/MCP) |
| 8 | **Revisione: touch-rate 100%** | 3/3 bozze promosse hanno richiesto correzioni umane (queue `note_revisione`: slide 9 canone · de-178kg · kicker §7.5) — ma le falle ricorrenti sono già diventate anticorpi (canon_guard v1.1/v1.2) | oggi NON è collo (1 revisione/giorno regge 1 bozza/notte); diventa collo a ≥3 bozze/notte | mantenere la regola "mai promozione automatica"; a CAP 3 servirà il pre-QC notturno esteso (scan_public già nel loop `:173`) |
| 9 | **Contatore piano stale** | `MENTE/STORIE/SG_GIORNO0/_PIANO_PRODUZIONE.md` STATO: "CAP 1 — 2/4 · TOTALE 2/69", ma i prodotti sono 3 (EP_SG_01_03 promosso 15/07 #60) | il piano è LA fonte del refill (collo 2): se sfasa, la coda si estende male | la promozione aggiorna anche il contatore (1 riga nella checklist di promozione, README CAROSELLI righe 92-94) |

## Il calcolo dei mesi (~165 caroselli, ritmo attuale)

- Fatti: **14/165** (SG 3/69 · Nina 7/57 · PRE_SG 4/4 · resto stagioni successive) → rimanenti ≈ 151.
- Ritmo attuale REALE: 1 bozza/notte SOLO binario SG e solo finché la coda ha item →
  **66 notti per la S1 sistema (~fine settembre)**, Nina esclusa → Nina a mano ≈ +3-6 mesi
  → **totale ~151 rimanenti ≈ 5+ mesi (dicembre 2026)** se tutto fila e la coda non muore mai.
- Con proposte 2+3+4 (coda auto + CAP 3 + corsia Nina): ~151/3 ≈ **50 notti ≈ 7 settimane**.
- Dove si perde di più: NON in generazione (77s/bozza) né in revisione (minuti/giorno) — in
  **pubblicazione**: throughput di uscita = 0/settimana da quando esistono caroselli pronti.

## Quante azioni manuali OGGI per portare 1 carosello sui canali

- **Instagram (senza API)**: i JPEG sono già a norma in `slides_ig/` (10 file ≤8MB, 4:5) —
  restano: trasferimento 10 JPEG al telefono + selezione ordinata nell'app + caption incollata
  ≈ **20-25 tap manuali, ~15-20 min, tutti di Matteo**. Con Postiz a regime: **1 click** (approva).
- **LinkedIn**: OGGI impossibile senza lavoro extra — il PDF non esiste (collo 5); col
  `pdf_export.py`: 1 upload + incolla `linkedin.txt` = **~5 azioni di Matteo**.
- **Sito**: nessun canale attivo (repo Pages non creato) = ∞.

## Sbloccabile SENZA Matteo vs gated

**Senza Matteo (tutto additivo, eseguibile subito):**
1. Estensione coda da piano (collo 2) — evita lo stop del 21/07.
2. CAP 2-3 bozze/notte (collo 3) — 66 SG in 22-33 notti.
3. Corsia notturna Nina da testi canonici (collo 4).
4. `pdf_export.py` batch → 14 PDF LinkedIn pronti (collo 5).
5. Export Express batch dei 14 QC-verdi + link nei README (collo 6).
6. Repo `nina` GitHub Pages + generatore statico (collo 7; solo il `git push` va dal terminale reale).
7. Fix contatore piano in checklist di promozione (collo 9).

**Gated Matteo (nessun workaround pulito):**
- Passi Meta 1-4 (≈1h insieme) → Postiz → Instagram/Facebook API (PubblicazioniView:65-68).
- Il click "pubblica" su LinkedIn personale (carica Matteo, come per il test PRE_SG_01).
- Esito del test LinkedIn PRE_SG_01 per tararsi (bussola riga 113).

## TOP 3 per leva (impatto/sforzo)

1. **Coda auto-alimentata + CAP 3 bozze/notte** (colli 2+3): ~30 righe di codice, porta la
   generazione SG da "muore in 6 notti" a "S1 completa in ~22 notti". Leva ≈ 10x, sforzo minimo.
2. **Aprire i canali NON-Meta ora** (colli 5+6+7): PDF batch + Express batch + repo Pages =
   il magazzino inizia a svuotarsi QUESTA settimana su LinkedIn/sito, mentre Meta resta gated;
   e il repo Pages toglie un gate futuro dalla serie (hosting immagini per la Graph API).
3. **Corsia notturna Nina** (collo 4): 53 testi già canonici che aspettano solo l'impaginazione —
   è il lavoro notturno più "sicuro" possibile (zero invenzione) e dimezza i mesi totali.
