# PRE_01 — Versioni del carosello "Il Mondo di Nina"

*Archivio additivo: ogni stato di design è salvato qui, niente si sovrascrive.*
*Render di studio = `anteprima_slide2-3.png` (slide 2 e 3 affiancate, per vedere la giuntura grafica).*
*Strumento: `python _render_pair.py <carosello.html> <out.png> "2,3"`.*

| Versione | Cos'è | Flusso di sfondo | Stato |
|----------|-------|------------------|-------|
| **v1_originale-magra** | Lo stato di partenza (sess #48): slide 2 con lead + 1 paragrafo | nessuno (filo dritto in basso) | archiviata |
| **v2_buonanotte-no-flusso** | Stile "buonanotte" ricco: apertura calda + 3 orecchie come parole illustrate + sigillo | nessuno (filo dritto) | archiviata |
| **v3_flusso-onda-oro** | v2 + onda d'oro continua in basso con luci che scorrono | onda sinusoidale oro (1 filo) | candidata |
| **v4_intreccio-atomi-bit** | v2 + due fili intrecciati oro(Atomi)↔ciano(Bit), Giuntura ⟡ agli incroci | doppio filo intrecciato (significativo) | candidata |

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
