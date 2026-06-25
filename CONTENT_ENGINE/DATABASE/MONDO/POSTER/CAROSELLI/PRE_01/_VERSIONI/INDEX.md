<!-- TOC -->

- [PRE_01  Versioni del carosello Il Mondo di Nina](#pre01-versioni-del-carosello-il-mondo-di-nina)
  - [Il concetto di flusso continuo](#il-concetto-di-flusso-continuo)
  - [Densità testo (decisa 25/06, Matteo)](#densità-testo-decisa-2506-matteo)
  - [Prossimo](#prossimo)

<!-- /TOC -->

# PRE_01 — Versioni del carosello "Il Mondo di Nina"

*Archivio additivo: ogni stato di design è salvato qui, niente si sovrascrive.*
*Render di studio = `anteprima_slide2-3.png` (slide 2 e 3 affiancate, per vedere la giuntura grafica).*
*Strumento: `python _render_pair.py <carosello.html> <out.png> "2,3"`.*

| Versione | Cos'è | Flusso di sfondo | Stato |
|----------|-------|------------------|-------|
| **v1_originale-magra** | Lo stato di partenza (sess #48): slide 2 con lead + 1 paragrafo | nessuno (filo dritto in basso) | archiviata |
| **v2_buonanotte-no-flusso** | Stile "buonanotte" ricco: apertura calda + 3 orecchie come parole illustrate + sigillo | nessuno (filo dritto) | archiviata |
| **v3_flusso-onda-oro** | v2 + onda d'oro continua in basso con luci che scorrono | onda sinusoidale oro (1 filo) | superata |
| **v4_intreccio-atomi-bit** | v2 + due fili intrecciati oro(Atomi)↔ciano(Bit), Giuntura ⟡ agli incroci | doppio filo intrecciato (significativo) | alternativa viva |
| **v5_flusso-onda-sfumata** | v3 ma onda **sfumata** (alone soffuso/blur, meno netta) | onda morbida diffusa | ← direzione scelta |
| **v6_propagato-completo** | flusso sfumato + stile buonanotte su **tutte le 8 slide** | onda sfumata su 1-8 | superata da v7 |
| **v7_arricchito-testo** | v6 con **più testo** (intro 2 frasi, punti più pieni, sigilli più evocativi) | onda sfumata su 1-8 | superata da v9/v10 |
| **v8_fumetto-vignette** | tentativo layout a **vignette/caselle** (stile fumetto) su slide 2 | onda sfumata | **scartata** (Matteo: "no per nulla") |
| **v9_progetto-12slide** | preambolo **rivisto a 12 slide** che spiega il progetto (Cos'è/Perché/Come funziona/Da dove nasce) | onda sfumata su 1-12 | superata da v10 |
| **v10_progetto-17slide** | v9 esteso a **17 slide**, linguaggio semplice (+Per chi è, I 4 simboli, Cosa imparerai, Si ripassa, La promessa) | onda sfumata su 1-17 | **ATTUALE** (= `carosello.html`) |

## Il concetto di "flusso continuo"
L'onda è calcolata sulla **posizione globale** `x_glob = (n-1)·1080 + x_locale`: essendo una
funzione continua di `x_glob`, **esce dal bordo destro della slide N ed entra alla stessa altezza
a sinistra della slide N+1**. In un carosello Instagram questo crea l'effetto di una corrente
unica che scorre sotto tutte le slide (il "filo-ponte" come fiume del racconto).

- **v3 (onda oro)**: più calma/sognante, un solo filo-luce.
- **v4 (intreccio)**: più ricca e *narrante* — i due mondi (Atomi/Bit) si intrecciano e dove si
  toccano nasce la Giuntura. È il simbolo-cardine del mondo reso movimento.

## Densità testo (decisa 25/06, Matteo)
Per il **preambolo / social** la densità resta snella (letta da Instagram funziona).
Gli **episodi veri** saranno più lunghi e ricchi.

## Prossimo
Scelta v3 vs v4 (o altra) → propagare flusso + stile a tutte le slide 1,4-8 → export Adobe Express.
