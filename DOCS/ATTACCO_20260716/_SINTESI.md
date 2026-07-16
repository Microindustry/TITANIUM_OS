<!-- TOC -->

- [ATTACCO 2  SINTESI (coordinatore Fable 5, 15/07/2026 sera)](#attacco-2-sintesi-coordinatore-fable-5-15072026-sera)
  - [Il quadro in una riga](#il-quadro-in-una-riga)
  - [Quadro per dominio](#quadro-per-dominio)
  - [TOP 10 per leva (impatto / sforzo)](#top-10-per-leva-impatto-sforzo)
  - [Ordine consigliato (ondate)](#ordine-consigliato-ondate)

<!-- /TOC -->

# ATTACCO #2 — SINTESI (coordinatore Fable 5, 15/07/2026 sera)

*4 report dominio in questa cartella, tutti propose-only con prova e file:riga.
NULLA è stato applicato: Matteo legge, decide, si esegue a ondate additive.*

## Il quadro in una riga

**La fabbrica produce e ricorda; non consegna e dorme.** Generazione episodi/bozze e
RAG sono vivi e sani; il collo è a valle (pubblicazione = 0) e la notte lavora al 3,9%
della sua capacità, saltando 4 notti su 10.

## Quadro per dominio

| Dominio | Stato | Finding chiave |
|---------|-------|----------------|
| 1 Pipeline contenuti | 🟡 | 14 caroselli QC-verdi, **0 pubblicati, 0 PDF**; coda apprendista muore il 21/07 (6 pending vs ~151 rimanenti); niente corsia Nina; ritmo attuale ~5-9 mesi vs ~3 possibili |
| 2 Conoscenza/RAG | 🟡 | vivo e segue il vault (19.635 chunk), MA **canon-pin promuove verità superate** (molle al rank 2 su «massa V32»), re-embed di massa da mtime (75-84% indice rifatto 3 volte in 6 gg), no lock, 14,8 GB detriti |
| 3 Notturne | 🔴 | notte usata **13 min su 323 (3,9%)**; 12 notti su 31 perse; **finetune FINTO-VERDE** (completa in 10-46 s riusando un checkpoint; dataset congelato a 30/272 episodi) |
| 4 Ricognizione GitHub | 🟢 | Postiz confermato vivo (il collo è l'app Meta, non lo strumento; ponte = ~80 righe Graph API) · Astro per il sito · **non-adozioni motivate**: Playwright, unsloth (GTX 1070 = Pascal sm_6.1, incompatibile), cron esterni, instagrapi; Kuma rimandato con trigger |

## TOP 10 per leva (impatto / sforzo)

1. **Coda apprendista: refill automatico dai piani + multi-bozza con tetto** — 1 bozza
   da 77 s in un timeout da 20 min = 5% usato; a 3/notte + coda che non muore si passa
   da ~9 mesi a **~3 mesi** sui ~151 rimanenti. *(D1+D3 · sforzo piccolo)*
2. **Corsia NINA nell'apprendista** — il SYSTEM prompt è SG-only (night_caroselli.py:68-77);
   i 53 testi EP_N2 sono GIÀ canone: metà del piano oggi non ha una corsia notturna.
   *(D1 · medio — richiede stampo v13 nel generatore, il precedente EP_N2_03 esiste)*
3. **Fix canon-pin (~5 righe)** — `_canon_stems()` pinna anche i wikilink «snapshot
   storico» di _CANONE: il grounding pesca le molle superate. È l'unico attrito che
   inquina OGGI le risposte. *(D2 · piccolo, impatto alto)*
4. **Consegna senza Meta: PDF LinkedIn batch + export Express dei 14** — pubblicabile
   già ora su LinkedIn (PDF) e da Express; oggi portare 1 carosello su IG costa a
   Matteo ~20-25 tap. *(D1 · piccolo-medio)*
5. **Finetune VERO** — output_dir riusato = «COMPLETATO» in 10-46 s senza allenare;
   dataset fermo a 30/272 episodi. Cura: reset checkpoint + dataset rigenerato; riempie
   il buco GPU 04:30→07:30 (3 ore vuote). *(D3 · medio)*
6. **Dieta RAG: hash nel manifest + lock su build_index + gate no-op** — stop ai
   re-embed di massa da touch (3 eventi in 6 gg), alle run interleaved (totali
   divergenti il 13/07) e alle 116/200 run a vuoto con fit completo. *(D2 · medio)*
7. **Igiene disco RAG: 14,8 GB di `chroma_db_reset_*` morti** (l'indice vivo è 201 MB)
   + escludere `.obsidian/` (53 chunk garbage) e doppioni `_copia` (336 chunk) —
   regola retention, non manuale. *(D2 · piccolo)*
8. **Recuperi scaglionati + replica serale dei task persi** — 12 notti su 31 saltate e
   i recuperi partono simultanei (rischio doppio processo GPU): +39% di ritmo senza
   toccare gli agenti. La radice (macchina spenta) → UPS, gated. *(D3 · piccolo-medio)*
9. **Fonti dei refill allineate** — contatore piano SG stale (dice 2/69, sono 3),
   _CANONE fermo a «EP_N2_01…53» con 55 episodi: se la coda si riempie DAI piani,
   i piani devono dire il vero. + watcher.log 27 MB senza rotazione. *(D1+D2+D3 · piccolo)*
10. **Gated Matteo (~1h totale)** — app Meta (sblocca Postiz/Graph API = 1 click a
    post), pin 5 repo profilo, UPS (radice delle notti perse e dei blackout HNSW).
    Rimandati con trigger scritto: Astro (quando parte il sito), Uptime Kuma (quando
    un servizio giù costa lavoro reale).

## Ordine consigliato (ondate)

- **ONDATA A (subito, tutto senza Matteo):** 3 (canon-pin) → 1 (coda+multi-bozza) →
  9 (fonti allineate) → 7 (igiene disco).
- **ONDATA B:** 2 (corsia Nina) → 4 (PDF+Express batch) → 6 (dieta RAG).
- **ONDATA C:** 5 (finetune vero) → 8 (replica serale).
- **In parallelo, quando Matteo ha 1h:** punto 10.

*Gate: nessuna di queste è applicata. Si parte quando Matteo dice quale ondata.*
