<!-- TOC -->

- [PRE_02  Come funziona Nina (carosello del preambolo, 16 slide)](#pre02-come-funziona-nina-carosello-del-preambolo-16-slide)
  - [Arco (16 slide)](#arco-16-slide)
  - [Rigenerare](#rigenerare)

<!-- /TOC -->

# PRE_02 — "Come funziona Nina" (carosello del preambolo, 16 slide)

Secondo carosello della **serie preambolo** di Nina. Mentre [PRE_01](../PRE_01/) è
l'**overview** del mondo, PRE_02 **scende nel dettaglio del meccanismo** — integra la
visione "Organismo Narrativo Dinamico / Libro-IA" (vedi
`MENTE/KNOWLEDGE/NINA_VISIONE_ORGANISMO_NARRATIVO.md`) in lingua semplice.

- `carosello.html` — sorgente (generato da `_build_pre02.py`)
- `slides/slide_1..16.png` — le 16 immagini singole (1080×1350)
- `caption.txt` — testo per il post
- stesso sistema visivo di PRE_01: stile "buonanotte" + **flusso sfumato continuo**

## Arco (16 slide)
1. Cover — Come funziona Nina
2. Un organismo (Libro-IA: vero, vivo, infinito)
3. La Mappa Viva (coordinate, non pagine)
4. Il doppio fondo (ogni casella è una sonda verticale)
5. Strato 1 · La Fiaba (il gancio del cuore, l'Entropia)
6. Strato 2 · Il test della sarta (si spiega con le mani)
7. Strato 3 · Sotto i piedi (il sistema vero, RAG/GPU del papà)
8. Ancoraggio (ogni parola è vera e verificabile)
9. Il motore infinito (il progetto insegna a Nina, Nina insegna a te)
10. Cresce da sé (il codice nuovo diventa capitolo, da solo)
11. Niente bozze (una verità sola, definitiva)
12. Si allarga (una materia nuova = una terra nuova sulla mappa)
13. Provalo tu (la sfida pratica, con le mani)
14. Cosa sai fare — **Nina ↔ HR** (sblocchi competenze; lo stesso motore dei CV)
15. L'eredità (il diario di un papà per la figlia)
16. Episodio 1 (un gesto vero come chiave) + CTA

## Rigenerare
```
python _build_pre02.py          # riscrive carosello.html
python _render_pair.py carosello.html out.png "1,2,3,4"   # studio giunture
```
