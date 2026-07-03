<!-- TOC -->

- [06  GESTIONALE / BUSINESS  audit economico e strategico](#06-gestionale-business-audit-economico-e-strategico)
  - [PRIORITÀ (in ordine di leva)](#priorità-in-ordine-di-leva)
  - [1. Stato dei numeri  cosa è verificato e cosa è narrativa](#1-stato-dei-numeri-cosa-è-verificato-e-cosa-è-narrativa)
  - [2. BEP connettori Via B  cosa si può calcolare oggi (e cosa no)](#2-bep-connettori-via-b-cosa-si-può-calcolare-oggi-e-cosa-no)
  - [3. Piano economico aggiornato (12 mesi, luglio 2026  luglio 2027)](#3-piano-economico-aggiornato-12-mesi-luglio-2026-luglio-2027)
  - [4. Coerenza pitch  findings (file:riga)](#4-coerenza-pitch-findings-fileriga)
  - [5. Rischi (ordinati per impatto  probabilità)](#5-rischi-ordinati-per-impatto-probabilità)
  - [6. Monetizzazione Nina / sistema](#6-monetizzazione-nina-sistema)
  - [7. LE 3 MOSSE A MAGGIOR LEVA (Regola 4: 1 input  N output)](#7-le-3-mosse-a-maggior-leva-regola-4-1-input-n-output)
  - [8. DATI MANCANTI DA PROCURARE (non inventati  vanno misurati o chiesti)](#8-dati-mancanti-da-procurare-non-inventati-vanno-misurati-o-chiesti)

<!-- /TOC -->

# 06 · GESTIONALE / BUSINESS — audit economico e strategico
*Attacco esercito 02/07/2026 · specialista gestionale (Fable 5) · propose-only, nessun file modificato oltre a questo report.*

> Regole rispettate: nessun contenuto brevettabile o ricetta da `MENTE/` è riportato qui (solo
> riferimenti a file e numeri economici aggregati). I componenti V32/VULCAN sono descritti per
> specifica tecnica e logica progettuale.

---

## ⚡ PRIORITÀ (in ordine di leva)

| # | Azione | Tipo | Perché |
|---|--------|------|--------|
| 1 | **Ordine unico: martinetto Vevor 20t + mandrino 2.2kW ER20 (~EUR 180) + UPS (~EUR 50-80)** — un solo checkout, tre blocker chiusi | QUICK-WIN (≤30 min) | Il blocker mandrino è "da ordinare" da ~4 mesi (fonte: `MENTE/V32/fatti_dalle_storie.md:98`, marzo 2026). Sblocca insieme: stampi su V32, prima colata VULCAN, e la corruzione HNSW ricorrente (`DA_FARE_FATTO.md:504`). Ogni mese di ritardo sposta a valle TUTTA la catena capannone. |
| 2 | **Prima colata di validazione = primo dato economico Via B** (costo/pz, tempo ciclo, scarto) | INGEGNERIZZAZIONE (dipende da #1) | Senza questi 3 numeri il BEP Via B **non è calcolabile** — oggi è dichiarato "da ricalcolare" e nessun documento lo ricalcola (`MENTE/MIMS/SCHEDA_PRODOTTO_MIMS_VULCAN.md:77-79`). |
| 3 | **Fix coerenza pitch — 3 errori fattuali nel repo pubblico** (molle, "recupero", doppia tabella revenue) | QUICK-WIN (≤30 min) | Dettaglio in §4. Un investitore che legge `PITCH_V32.md` e `ASSOLUTO_V7.md` trova contraddizioni con i dati master. |
| 4 | **Popolare `FINANCE/`** — oggi è **completamente vuota** (0 file in ANALISI/BEP_ROI, COSTI_V32, FATTURE, SPESE) | INGEGNERIZZAZIONE | L'investimento EUR 2.250 e il BEP 61h esistono solo in documenti narrativi: non c'è UNA fattura, ricevuta o foglio di calcolo a supporto. In due diligence questo è un problema; per la Regola 6 ("se non posso misurarlo non esiste") è un paradosso. |
| 5 | **Decisione esplicita: Nina NON si monetizza ora** (resta prodotto derivato/prova del metodo) | QUICK-WIN | Evita diluizione del focus; vedi §6. |

---

## 1. Stato dei numeri — cosa è verificato e cosa è narrativa

**Dati master (canone, non toccarli):** investimento V32 EUR 2.250 · BEP 61 ore = 1,4 mesi ·
ROI anno 1 322% · tariffa EUR 45/h · costi variabili EUR 8/h · margine netto EUR 37/h
(`DOCS/ASSOLUTO/ASSOLUTO_V7.md:809-820`, `DOCS/TITANIUM_OS_V1.md:106-109`).

**Verifica aritmetica del canone (fatta, regge con una nota):**
- BEP: 2.250 / 37 = **60,8 h → 61 ore ✓**
- Revenue anno 1: 200 h × 37 = **EUR 7.400 ✓** (`ASSOLUTO_V7.md:820`)
- ROI 322%: 7.400 / 2.250 = **329%** lordo; (7.400 − 2.250) / 2.250 = **229%** netto.
  Il 322% non corrisponde esattamente a nessuna delle due formule standard.
  ⚠ **Nota da definire prima di un pitch serio:** dichiarare la formula usata (ROI lordo ≈ 329%
  arrotondato? ROI netto 229%?). Un investitore la ricalcola in 10 secondi. Non cambio il canone,
  segnalo che serve la definizione. — QUICK-WIN: una riga di nota metodologica in `PITCH_1PAGER.md:45`.

**Cosa invece è solo narrativa (nessun documento sorgente):**
- TAM/SAM/SOM MIMS (4,2B / 180M / 300-450K) — già flaggato onestamente come "da consolidare"
  in `PITCH_1PAGER.md:59`. Bene il flag; manca però il modello bottom-up promesso.
- Le 200 h fatturate anno 1 (base del ROI) — ipotesi, nessun cliente pilota documentato.
- Il "BEP del capannone è calcolabile" (`ASSOLUTO_V7.md:1210`) — dichiarato calcolabile,
  **mai calcolato** da nessuna parte (né in repo né in `MENTE/` né in `FINANCE/`).

---

## 2. BEP connettori Via B — cosa si può calcolare oggi (e cosa no)

**Contesto (canone 24/06/2026):** i connettori si fanno per **Via B = compressione VULCAN**,
stesso impianto delle tiles; Via A (iniezione esterna: stampo EUR 15.000, EUR 2,50/pz, ciclo 45 s,
BEP tooling 1.578 pz) è scartata ma resta fallback a volume
(`MENTE/MIMS/SCHEDA_PRODOTTO_MIMS_VULCAN.md:64-75`, `MENTE/KNOWLEDGE/ASSOLUTO/ASSOLUTO_V9.md:120-122`).

**Formula (unica cosa onesta pubblicabile oggi):**

```
BEP_pz(Via B) = T_B / (P − C_B)

T_B  = tooling Via B = stampo giunto autofresato (acciaio + ore V32 a costo interno EUR 8/h)
       + quota impianto VULCAN attribuibile (~EUR 300-500 costruzione pressa, ASSOLUTO_V9.md:89)
       + martinetto Vevor 20t (costo da preventivo)
P    = prezzo vendita connettore (Via A assumeva EUR 12 — da riconfermare con finitura compressione)
C_B  = costo unitario a compressione (materia + energia + scarto) — DA RILEVARE alla prima colata
```

**Perché il BEP crolla di 1-2 ordini di grandezza (struttura, non numeri inventati):**
il tooling passa da EUR 15.000 (stampo esterno HRC50+, EDM) a un ordine "basse centinaia/basse
migliaia" di EUR perché lo stampo si fresa **internamente** su V32 (costo marginale EUR 8/h) e
l'impianto pressa è già capitale investito condiviso con le tiles. Anche assumendo un margine
unitario dimezzato rispetto a Via A, un tooling 10-20× più basso porta il BEP da **1.578 pz**
a un ordine di **decine/poche centinaia di pezzi**. Questa è la tesi economica di Via B: il
capitale si sposta dal tooling (esterno, morto) al processo (interno, moat-Formula).
**Il numero esatto non è pubblicabile finché mancano T_B e C_B: non lo invento.**

**Il vero prezzo di Via B non è il BEP — è la CAPACITÀ:**
- Via A: ciclo 45 s ⇒ ~80 pz/h. Via B: ciclo compressione (riscaldo+pressata+raffreddamento)
  tipicamente in minuti — **dato mancante n.2**, da cronometrare alla prima colata.
- Ordine di grandezza del vincolo: il SOM Y3 MIMS EUR 300-450K (`ASSOLUTO_V7.md:946`), se fatto
  di pezzi da ~EUR 12, significa ~25-37K pezzi/anno. Con un ciclo mono-cavità in minuti, VULCAN
  da sola **non ci arriva**. Conclusione strategica (già implicita in `ASSOLUTO_V9.md:122`, qui
  resa esplicita): **Via B è la via del margine e del moat per SEED/GROW; Via A è il trigger di
  scala.** Va definita la soglia: *"quando gli ordini superano X pz/mese per Y mesi, il margine
  accumulato finanzia lo stampo Via A"* — X calcolabile solo dopo la prima colata. Stampo
  multi-cavità Via B = tappa intermedia da valutare.

**Impatto sul brevetto B2 (coerente, nessuna azione):** B2 su processo proprietario invece che
standard = rivendicazione più difendibile ma da riscrivere — già tracciato in
`SCHEDA_PRODOTTO_MIMS_VULCAN.md:77-79` (vedi `MENTE/MIMS/brevetto_B2_bozza.md`, non riportato qui).

---

## 3. Piano economico aggiornato (12 mesi, luglio 2026 → luglio 2027)

Le due tabelle revenue di ASSOLUTO_V7 **divergono tra loro** (Anno 1: EUR 7.900-18.600 a
`ASSOLUTO_V7.md:801` vs EUR 5.600-13.900 a `ASSOLUTO_V7.md:1152`) e assumono milestone già
slittate (mandrino "Giu 2026" a `ASSOLUTO_V7.md:869` — oggi è luglio e non è ordinato). Piano
riallineato allo stato fisico reale (`MENTE/VULCAN/BUILD_REALE_20260622.md`):

| Fase | Periodo | Gate fisico | Output economico |
|------|---------|-------------|------------------|
| **0 — Sblocco** | Lug 2026 | Ordine martinetto + mandrino + UPS (~EUR 250-350 stimati, preventivi da fare) | Nessun ricavo. Chiude un ritardo di 4 mesi. |
| **1 — Prima colata** | Q3 2026 | Martinetto montato → colata test PP puro (`SCHEDA:95`) | **Primi 3 dati veri: C_B, ciclo, scarto → BEP Via B calcolato.** Aggiornare SCHEDA §4 + pitch. |
| **2 — Stampo tile definitivo** | Q4 2026 | Mandrino installato → fresatura stampo tile 190 su V32 | T_B misurato (ore V32 × EUR 8 + acciaio). Secondo dato del modello. |
| **3 — V32 Precision Lab** | Q1 2027 | Primo pezzo H7 (`ASSOLUTO_V7.md:875-876`) | Prime ore fatturate a EUR 45/h → il ROI 322% smette di essere stima. Target minimo realistico anno 1 Lab: 60-150 h (BEP–2,5×BEP), non 200 h. |
| **4 — MIMS pre-vendita** | Q1-Q2 2027 | 10-20 kit beta (Starter ~EUR 49, fonte pricing `MENTE/MIMS/PROTOCOLLO/stime_guadagni_moduli.md:26-28`) | Validazione willingness-to-pay PRIMA della produzione seriale. |
| **5 — MIMS in vendita** | Q3 2027 | Catalogo tile+giunti Via B | Unit economics veri sostituiscono la tabella `ASSOLUTO_V7.md:822-834` (che è ancora su costi pre-decisione Via B: giunti a EUR 0,30-1,50 non riconciliati con connettore EUR 2,50 Via A né con C_B ignoto). |

**Revenue 2026 realistiche:** con V32 non operativa fino a Q1 2027, i ricavi 2026 sono ~solo
EVA/contenuti → assumere **EUR 0-3.000**, non 7.900-18.600. Meglio un numero piccolo e vero
(Regola 6) — anche nel pitch: "anno 1 di costruzione, ricavi da Q1 2027".

**Roadmap capannone 15/07/2030 — il buco:** la catena `ASSOLUTO_V7.md:1196-1208` arriva a
"EUR 5K/mese stabile (Q2 2028) → capannone (Q3 2030)" ma **manca il modello del capannone**:
affitto/mq zona, capex allestimento, soglia di cassa cumulata che fa scattare la firma.
Senza quel numero il target 2030 non è falsificabile. — INGEGNERIZZAZIONE: 1 foglio in
`FINANCE/ANALISI/BEP_ROI/` con 3 scenari affitto (es. 200/400/600 mq Magentino) e la regola
di trigger (es. "cassa ≥ 12 mesi di affitto+fissi"). I dati di mercato immobiliare sono da procurare.

---

## 4. Coerenza pitch — findings (file:riga)

| # | Finding | Fonte | Fix | Tipo |
|---|---------|-------|-----|------|
| P1 | **"Sospensione su molle calibrate"** nel pitch V32 — contraddice il canone "corpo unico, non più su molle" (decisione maggio 2026, `CLAUDE.md` dati master e `ASSOLUTO_V7.md:234,244`) | `DOCS/PITCH_V32.md:25` | Sostituire la riga con la decisione corpo unico | QUICK-WIN |
| P2 | **"100% componenti recupero industriale"** e "macchina costruita con componenti recupero" — viola la regola di framing (mai "recuperati/usati"; sempre specifica tecnica + logica progettuale). ASSOLUTO_V9 (in MENTE) ha già la nota di canone corretta (`ASSOLUTO_V9.md:93`), ma V7 è quello nel **repo pubblico** | `DOCS/ASSOLUTO/ASSOLUTO_V7.md:236` e `:916` | Nota additiva in testa a V7: "superato da V9 per il framing componenti" + correzione delle 2 righe | QUICK-WIN |
| P3 | **Due tabelle revenue anno 1 divergenti nello stesso documento** (EUR 7.900-18.600 vs EUR 5.600-13.900) | `ASSOLUTO_V7.md:801` vs `:1152` | Dichiararne una canonica (o deprecare V7 a favore di un estratto V9 pubblico) | QUICK-WIN |
| P4 | **Unit economics MIMS pre-Via B**: giunti a costo EUR 0,30-1,50 da iniezione implicita; non riconciliati con la decisione Via B (costo da rilevare) | `ASSOLUTO_V7.md:822-834` vs `MENTE/MIMS/SCHEDA:64-79` | Banner "in ricalcolo post-Via B" sulla tabella; numeri veri dopo la prima colata | QUICK-WIN (banner) + INGEGNERIZZAZIONE (ricalcolo) |
| P5 | **Timeline pubblica scaduta**: mandrino "Giu 2026", primo tile "Q2 2027" vs prima colata di validazione Q3 2026 nel canone MENTE | `ASSOLUTO_V7.md:869,877` vs `SCHEDA:86` | Aggiornare le 2 righe di timeline | QUICK-WIN |
| P6 | **ROI 322% senza formula dichiarata** (lordo 329% / netto 229% — vedi §1) | `PITCH_1PAGER.md:45`, `ASSOLUTO_V7.md:819` | 1 riga di metodologia | QUICK-WIN |
| P7 | **Buona pratica già presente** (da mantenere): i caveat "numeri provvisori, da consolidare" in `PITCH_1PAGER.md:47,59` e `PITCH_V32.md:17` sono onesti e rari nei pitch — punto di forza col partner ("per-noi-più", non exit) | — | Nessuno | — |
| P8 | **Incoerenza di canone economicamente rilevante**: episodi narrativi dicono mandrino "ordinato dalla Germania" (`MENTE/V32/fatti_dalle_storie.md:56,70`, marzo 2026) mentre il master dice "DA ORDINARE" — il blocker è fermo da ~4 mesi ed è la voce con il più alto costo-opportunità del sistema | `MENTE/V32/v32_specifiche.md:37` | Ordinare (Priorità #1); per la pulizia narrativa → agente 07 (integrità RAG) | QUICK-WIN (l'ordine) |

---

## 5. Rischi (ordinati per impatto × probabilità)

1. **Ritardo d'esecuzione sui blocker fisici** (evidenza: 4 mesi di "da ordinare" per un pezzo
   da ~EUR 180, `ASSOLUTO_V7.md:393`). È il rischio n.1 perché blocca il *primo dato vero* di
   tutta l'economia. Mitigazione: Priorità #1 + regola "un blocker hardware non sopravvive a 2 sessioni".
2. **Bus factor = 1.** Tutto (saldatura, fresatura, Formula, sistema) dipende da Matteo.
   Mitigazione già in atto (documentazione MENTE/RAG = il sapere sopravvive alla persona);
   il pitch la usi come argomento, non solo come metodo.
3. **Rischio tecnico Via B**: geometria 3D del giunto a compressione, accettato come prezzo del
   moat (`SCHEDA:70-71`). Mitigazione: fallback Via A dichiarato + criterio go/no-go alla colata
   giunto (es. "se scarto > X% dopo N cicli → rivaluta").
4. **Capacità produttiva Via B** vs SOM Y3 (vedi §2): rischio di promettere volumi che il ciclo
   a compressione mono-cavità non regge. Mitigazione: soglia trigger Via A + multi-cavità.
5. **Due diligence scoperta**: FINANCE/ vuota + ROI senza formula + tabelle divergenti = un
   partner serio se ne accorge alla prima verifica. Mitigazione: Priorità #3 e #4.
6. **Concentrazione ricavi 2026-27 su Precision Lab** (un solo stream attivo prima di MIMS):
   il piano regge solo se V32 chiude Q1 2027. Ogni slittamento V32 sposta il BEP di sistema, non solo di macchina.

---

## 6. Monetizzazione Nina / sistema

- **Nina**: il pitch la definisce correttamente "prodotto derivato… predisposto, nel tempo, anche
  ai ricavi" (`DOCS/PITCH_NINA.md:49`, `PITCH_1PAGER.md:62`). Non esiste alcun modello di ricavo —
  ed è **giusto così** per ora. Proposta di decisione esplicita: **Nina non si monetizza prima che
  MIMS venda** (evita il terzo fronte aperto). Il suo valore economico attuale è triplo e non-monetario:
  (a) prova che l'engine 1→N funziona su un dominio non-tecnico (argomento pitch), (b) audience
  Instagram/caroselli = funnel futuro per il brand, (c) asset evergreen che si accumula a costo
  marginale ~0. Prima opzione di monetizzazione quando sarà il momento: formato libro/abbonamento
  su base episodi già generati (costo marginale zero, stessa logica di `ASSOLUTO_V7.md:1154-1167`).
- **Il sistema come prodotto** (memoria `project_vision_and_next`): il pitch 1-pager già vende
  "il loop è il prodotto" (`PITCH_1PAGER.md:30`). Coerente con l'ask "partner di scala, non exit"
  (`PITCH_1PAGER.md:68`). Nessuna azione oltre ai fix P1-P6: il posizionamento è solido.
- **Leva digitale a costo marginale zero già pronta**: keyword "vacuum compression molding DIY"
  a concorrenza quasi nulla (`ASSOLUTO_V7.md:1176,1180`) — la prima colata VULCAN filmata è
  esattamente quel video. Si incastra con la Mossa 1 qui sotto.

---

## 7. LE 3 MOSSE A MAGGIOR LEVA (Regola 4: 1 input → N output)

**MOSSA 1 — "Il checkout che sblocca tutto" (1 ordine → 5 output).**
Un solo ordine (martinetto Vevor 20t + mandrino ER20 ~EUR 180 + UPS ~EUR 50-80) produce:
① prima colata VULCAN (primo dato Formula) → ② BEP Via B calcolabile (C_B, ciclo, scarto) →
③ stampo tile fresabile su V32 → ④ fine corruzioni HNSW notturne → ⑤ l'episodio/reel della
prima colata (keyword a concorrenza zero, §6). Costo ~EUR 250-350, è il miglior rapporto
EUR/leva dell'intero sistema. — QUICK-WIN (l'ordine); il resto segue.

**MOSSA 2 — "Un foglio, quattro artefatti": BEP parametrico vivo in FINANCE/.**
Un unico foglio `FINANCE/ANALISI/BEP_ROI/bep_via_b.md` (o .csv) con la formula di §2 e le celle
[T_B, C_B, P, ciclo, cavità] vuote-ma-nominate. Ogni dato che arriva dalla prima colata aggiorna
in cascata: ① il BEP nel pitch, ② la SCHEDA §4, ③ il RAG (via `rag-update`), ④ la sezione
economia della dashboard. Include: formula ROI dichiarata (fix P6), modello capannone 3-scenari
(§3), e le prime fatture/scontrini scansionati in `FINANCE/SPESE/` — così EUR 2.250 diventa un
numero documentato, non narrato. — QUICK-WIN il file scheletro; INGEGNERIZZAZIONE il collegamento a dashboard.

**MOSSA 3 — "Vendere prima di produrre": pre-validazione MIMS a capitale zero.**
Con i prezzi già stimati (`stime_guadagni_moduli.md:26-28`: kit Starter ~EUR 49, Family ~EUR 199)
si monta una pagina "kit beta — lista d'attesa" + 2-3 CAD template a EUR 9 (costo marginale zero,
`ASSOLUTO_V7.md:1158`). Ogni iscritto/vendita è: ① validazione willingness-to-pay PRIMA dello
stampo definitivo, ② lead per il lancio Q3 2027, ③ contenuto ("N persone in lista"da usare nel
pitch), ④ primo ricavo digitale 2026 che rompe lo zero. Nessuna promessa di consegna: lista
d'attesa, non pre-ordine vincolante (finché C_B è ignoto non si fissa un prezzo definitivo). —
INGEGNERIZZAZIONE leggera (1 landing + Stripe/Gumroad).

---

## 8. DATI MANCANTI DA PROCURARE (non inventati — vanno misurati o chiesti)

| # | Dato | Come si ottiene | Sblocca |
|---|------|-----------------|---------|
| D1 | Costo unitario connettore a compressione **C_B** (materia+energia+scarto) | Prima colata giunto (dopo colata test PP) | BEP Via B |
| D2 | Tempo ciclo compressione + pezzi/ciclo (cavità stampo) | Cronometro alla prima colata | Capacità → trigger Via A |
| D3 | Costo stampo giunto Via B **T_B** (acciaio + ore fresatura V32) | Preventivo acciaio + log ore V32 | BEP Via B |
| D4 | Costo martinetto Vevor 20t | Preventivo (ordine Priorità #1) | Capex VULCAN completo |
| D5 | Prezzo di vendita connettore Via B confermato (EUR 12 era ipotesi Via A) e qualità finitura accettabile | Test mercato (Mossa 3) + prima colata | Margine unitario |
| D6 | Pezze giustificative dell'investimento EUR 2.250 (fatture/scontrini) | Scansione in `FINANCE/SPESE/` | Credibilità due diligence |
| D7 | Fonte verificabile TAM/SAM/SOM + modello bottom-up | Report Grand View/UCIMU citati in `ASSOLUTO_V7.md:944,952` da reperire davvero | Pitch difendibile |
| D8 | Costo affitto/mq capannone zona Magentino + capex allestimento | 3 preventivi immobiliari (anche online) | BEP capannone → target 2030 falsificabile |
| D9 | Ore Precision Lab realisticamente vendibili anno 1 (pipeline clienti pilota) | 5 conversazioni con officine/studi locali | ROI da stima a piano |

---

*Fonti principali: `MENTE/MIMS/SCHEDA_PRODOTTO_MIMS_VULCAN.md` · `MENTE/VULCAN/BUILD_REALE_20260622.md` ·
`MENTE/KNOWLEDGE/ASSOLUTO/ASSOLUTO_V9.md` · `DOCS/ASSOLUTO/ASSOLUTO_V7.md` (ATTO VII/VIII/X) ·
`DOCS/PITCH_1PAGER.md` · `DOCS/PITCH_V32.md` · `DOCS/PITCH_MIMS.md` · `DOCS/PITCH_NINA.md` ·
`MENTE/MIMS/PROTOCOLLO/stime_guadagni_moduli.md` · `FINANCE/` (vuota — è essa stessa un finding).*
