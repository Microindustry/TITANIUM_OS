<!-- TOC -->

- [Bibbia Visiva  i Caroselli di Nina](#bibbia-visiva-i-caroselli-di-nina)
  - [1. Anima](#1-anima)
  - [2. Stile grafico](#2-stile-grafico)
  - [3. Marchio fisso (template intoccabile)](#3-marchio-fisso-template-intoccabile)
  - [4. Sistema identità  avatar  simbolo](#4-sistema-identità-avatar-simbolo)
  - [5. Formato](#5-formato)
  - [6. Architettura dei contenuti](#6-architettura-dei-contenuti)
    - [A) PREAMBOLO  serie di presentazione (PRIMA degli episodi)](#a-preambolo-serie-di-presentazione-prima-degli-episodi)
    - [B) EPISODI  un episodio  un carosello](#b-episodi-un-episodio-un-carosello)
  - [7. Produzione (onesto)](#7-produzione-onesto)
  - [8. Decisioni operative (sess48, 25/06/2026)](#8-decisioni-operative-sess48-25062026)

<!-- /TOC -->

# Bibbia Visiva — i Caroselli di Nina

*Lo standard visivo e narrativo di TUTTI i caroselli social di Nina. — sess.#48, 25/06/2026.*
*Canone deciso con Matteo. Si aggiorna additivamente (niente è finito, ogni cosa è una versione).*

---

## 1. Anima
Un **racconto della buonanotte**, da leggere ad alta voce. Non una infografica: una storia
illustrata che respira. Riferimento di tono e impaginazione: **Geronimo Stilton** —
parole-disegno, personaggi ricorrenti, mappe, mondo immersivo per bambini ma godibile da grandi.

## 2. Stile grafico
- **Ibrido blueprint-anime**: Nina e Themis sono *disegnate* (proporzioni/espressioni un po'
  anime) ma rese in **stile blueprint tecnico** — monoline, ciano/oro su fondo scuro. I
  personaggi sembrano *schemi vivi*: coerente con il mondo Atomi|Bit.
- **Parole illustrate (alla Geronimo Stilton)**: le keyword nel testo si colorano e portano un
  micro-segno (es. *porta* in oro con una porticina, *ponte* con un tratto-arcata, *bottone*
  con un cerchietto). Il testo stesso è grafica.
- **Niente foto reali**: solo immagini, schemi e mappe **generate** (SVG/HTML). Contesto e
  immersività vengono dal disegno, mai da fotografie.

## 3. Marchio fisso (template intoccabile)
Uguale su ogni slide di ogni carosello:
- **Cornice** sottile (`inset 30px`, `rgba(148,163,184,0.22)`).
- **Intestazione laterale/alto**: `TITANIUM OS · L'AVVENTURA` (Space Mono) + kicker di sezione (oro).
- **Piede**: ⟡Pietra · `NINA` · indice slide (`n / N`).
- **Il PONTE come filo conduttore**: un elemento (l'arcata della Giuntura / una linea / un filo)
  che **attraversa e collega le slide** — il carosello si legge come un nastro unico, non immagini staccate.

## 4. Sistema identità — avatar + simbolo
Ogni entità ricorrente ha un **avatar** (figura blueprint-anime) e un **simbolo** (come ⟡N delle Regioni):
| Entità | Avatar | Simbolo |
|--------|--------|---------|
| **Nina** | bambina blueprint-anime, ricorrente | il *perché* — punto interrogativo / la porticina |
| **Themis** | donna asciutta col calibro, ricorrente | il calibro / la misura (giustizia = misura) |
| **Atomi** | — | dado esagonale / la materia |
| **Bit** | — | nodo-circuito / la rete di luce |
| **Le 8 Pietre** | — | `⟡0 … ⟡7` (simbolo unico + numero dentro, GIÀ fatto) |

I personaggi vanno disegnati **una volta** come componenti SVG riutilizzabili e ricomparire
**identici** in ogni carosello (è questo che li rende riconoscibili).

## 5. Formato
- Canvas **1080×1350 (4:5)**. Carosello **15-20 slide** (entro il limite IG di 20).
- Palette Regioni (vedi `POSTER/README.md`): ⟡0 Materia `#f4b65a` · accento Nina `#ec4899` ·
  Atomi acciaio `#5d6f8c` · Bit ciano `#5fc7f3`. Fondo `radial #1a2440→#05070d`.
- Font (Adobe Fonts kit `zhv2kry`): Playfair Display (titoli) · Space Mono (etichette) · Source Sans 3 (corpo).
- 3 strati di lettura: **bambino** (la scena) · **curioso** (il concetto) · **grande** (il fatto misurabile).

## 6. Architettura dei contenuti
### A) PREAMBOLO — serie di presentazione (PRIMA degli episodi)
Si scopre il mondo: chi/cosa/come. Proposta (da confermare):
1. **Benvenuto nell'Avventura** — cos'è, il patto del lettore (buonanotte, una domanda alla volta).
2. **Nina** — avatar + simbolo; la superpotenza (chiedere *perché* + andare a vedere).
3. **Themis** — avatar + simbolo; la custode della Giuntura, la misura.
4. **Il Mondo: Atomi ↔ Bit** — la Giuntura, il ponte; il fisico e il digitale come una cosa sola.
5. **La Mappa: le 8 Pietre** — il cammino ⟡0→⟡7, come funziona il viaggio (le Regioni già a colori).

### B) EPISODI — un episodio = un carosello
`EP_N2_xx.md → carosello.html (15-20 slide) → export_html_to_express → Express + PNG`.
Vivono in `POSTER/CAROSELLI/<EP_ID>/` (vedi `POSTER/CAROSELLI/README.md`).

## 7. Produzione (onesto)
- Mappe/schemi/simboli: **generati a mano in SVG/HTML** (come le Regioni e il poster PORTA).
- Limite ambiente: **niente AI-immagine pittorica** qui.

## 8. Decisioni operative (sess#48, 25/06/2026)
- **Segni del mondo = DEFINITIVI** (Atomi dado · Bit nodi · Giuntura rombo-ponte · Pietra ⟡N).
  Icone canoniche, riusate identiche in ogni carosello. Fonte: `POSTER/TAVOLE/model_sheet_personaggi.html`
  (riga "I SEGNI DEL MONDO"). Bloccate, non si ridisegnano.
- **Personaggi (Nina, Themis) = via ILLUSTRATORE.** NON si disegnano a mano in SVG (il v0.1
  era mascotte-stickman, sotto lo standard Stilton-cartone). Brief in
  `MONDO/BRIEF_ILLUSTRATORE_PERSONAGGI.md`.
- **Slot-personaggio**: ogni carosello ha finestre dimensionate e marcate (`[ Nina ]` /
  `[ Themis ]`) dove l'arte dell'illustratore si innesta. Il sistema è production-ready senza
  i volti; i personaggi si incollano dopo, additivamente, senza rifare l'impaginazione.
- **Filo conduttore**: un thread oro orizzontale a Y costante attraversa ogni slide (entra a
  sinistra, esce a destra) con una bead-⟡ che avanza = progresso del cammino. È il "nastro unico".
