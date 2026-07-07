<!-- TOC -->

- [TITANIUM_OS  S2E16](#titaniumos-s2e16)
  - [La Fonte di Verità](#la-fonte-di-verità)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema che Nessuno Vede Subito](#atto-i-il-problema-che-nessuno-vede-subito)
  - [ATTO II  Ottanta Foglie](#atto-ii-ottanta-foglie)
  - [ATTO III  Il Gate](#atto-iii-il-gate)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E16
## "La Fonte di Verità"

*5 luglio 2026*

---

## COLD OPEN

Una dashboard. React, bianco sporco, dati in movimento.

In alto a destra: un badge verde. **LIVE.**

Non è una simulazione. Non è un mock. Il JSON che alimenta quella schermata viene da un file reale — `critiche_manuali.json` — e il file è servito da un'API reale. Ottanta foglie. Ogni foglia è una critica manuale, catalogata, verificabile, recuperabile in meno di 200 millisecondi.

Fino a ieri sera, quella stessa dashboard leggeva da un file TypeScript hardcodato. Un file che nessun agente poteva toccare senza ricompilare. Una fonte di verità che non era davvero una fonte — era un muro.

Adesso il muro non c'è più.

---

## ATTO I — Il Problema che Nessuno Vede Subito

Ci sono corruzioni nel sistema che non si manifestano come errori. Non crashano niente. Non producono stack trace. Vivono silenziosamente, e li scopri solo quando provi a fare qualcosa di reale — qualcosa che conta.

L'ATTACCO ESERCITO del 2-3 luglio ha portato in superficie esattamente questo: in tre punti del sistema, la fonte di verità era stantia.

Il primo: `_CANONE.md`, riga 13 — il documento che dovrebbe essere la legge del sistema puntava ancora a V32-su-molle, alla versione che non esiste più. Il corpo unico in Epoxy Granite, il telaio da 178 kg che Matteo sta costruendo nella taverna di 12 m² — quello non era ancora scritto nel canone. Il sistema parlava di una macchina del passato.

Il secondo: `INDICE_CAMMINO` — 9 titoli su 15 sbagliati. Il filo narrativo che dovrebbe connettere tutto, la spina dorsale della storia, con i due terzi delle etichette non allineate alla realtà.

Il terzo: il pitch. Tre errori. Non di forma — di sostanza.

Sette specialisti, sette file `NN_*.md` nella cartella `ATTACCO_20260702/`, una sintesi coordinata. TOP 10 per leva. Quarantanove voci nel backlog. E la conclusione era semplice quanto scomoda: il sistema gira, ma gira su fondamenta che a tratti non descrivono più quello che è.

Questo è il tipo di lavoro che non si vede dall'esterno. Non produce un pezzo fisico. Non genera un rumor di fresa. Ma è esattamente il lavoro che determina se il resto tiene.

---

## ATTO II — Ottanta Foglie

La decisione tecnica è questa: spostare le `critiche_manuali` da una costante TypeScript compilata — `criticheData.ts` — a un file JSON canonico servito via API Flask. `DATA/audit/critiche_manuali.json`. Ottanta foglie.

La logica è banale una volta che la vedi. Un file `.ts` è codice. Per modificarlo devi aprire l'editor, cambiare la costante, ricompilare, ridistribuire. Un agente non può farlo. Claude non può farlo. Nina non può farlo. È un dato vestito da codice — e i dati non dovrebbero essere codice.

Un file JSON servito da `/api` è diverso. È una fonte che il sistema può leggere, interrogare, aggiornare. È qualcosa che il RAG può indicizzare. È qualcosa che Nina può portare in conversazione.

Il dump è meccanico: `tsc → cjs`, estrazione delle foglie, scrittura del JSON. Novanta minuti di lavoro, probabilmente meno. Ma la decisione dietro ci ha messo settimane a maturare — perché prima dovevi capire che il problema esisteva.

Questa notte Nina v1.1 è andata in produzione. L'episodio `EP_N2_51` è girato stanotte. Bussola completata. Critiche live.

---

## ATTO III — Il Gate

C'è una cosa che non è stata committata.

Nell'ATTACCO ESERCITO, i sette specialisti hanno proposto codice. Modifiche concrete, verificate, con file e riga. Il gate `SELF_IMPROVE` esiste per una ragione: niente codice proposto entra nel sistema senza che Matteo lo abbia letto, capito, approvato. Non è burocrazia — è il contrario della burocrazia. È il riconoscimento che un sistema che si modifica senza supervisione umana non è un sistema che appartieni.

Quindi il backlog ha quarantanove voci. Tutte come `[ ] DA FARE`. Nessuna committata.

E c'è un ordine hardware che aspetta: Vevor + ER20 + UPS, 250-350 euro. Materiale che sblocca la catena economica e risolve le corruzioni HNSW nell'indice vettoriale. Un numero piccolo che abilita un effetto sproporzionato — esattamente il tipo di decisione che il sistema sa riconoscere ma che richiede una firma fisica.

V32 è al 65%. GENESIS è al 70%. La data sul calendario dice 5 luglio 2026. Sul target del capannone mancano quattro anni.

Quattro anni sembrano tanti. Ma il lavoro di questa settimana — il JSON canonico, la bussola, la pulizia del canone — è esattamente il tipo di lavoro che determina se quei quattro anni sono produttivi o se li passi a correggere derivazioni che si sono accumulate in silenzio.

Il sistema adesso sa dove guarda. È una cosa piccola. È anche la cosa più importante fatta questa settimana.

---

## CHIUSURA

Matteo Benenati non ha saldato niente oggi. Non ha toccato la fresa, non ha misurato tolleranze, non ha caricato un elettrodo TIG.

Ha spostato dei dati da un posto sbagliato a un posto giusto.

Nella taverna ci sono 178 kg di ghisa e resina epossidica in attesa. VULCAN aspetta. Il capannone aspetta.

Ma un sistema che racconta di sé in modo sbagliato costruisce male. E lui lo sa.

Il badge verde sulla dashboard dice LIVE.

Per ora basta così.

---

## reel_hook

80 foglie di critiche stavano in un file TypeScript che nessun agente poteva toccare.
Stavano lì da mesi. Il sistema girava — ma girava su una bugia silenziosa.
Oggi sono diventate un JSON canonico servito da API.
Una fonte di verità che il sistema può leggere per davvero.
Chi costruisce la prossima macchina su dati sbagliati — e non lo sa ancora?

---

## FATTI (per il RAG)

- **DECISIONE:** `critiche_manuali` migrata da costante TypeScript (`criticheData.ts`) a `DATA/audit/critiche_manuali.json` (80 foglie), servita via endpoint Flask `/api` — commit `feat(#54)` del 2026-07-05.
- **LOGICA:** Una costante `.ts` richiede ricompilazione per ogni modifica e non è accessibile agli agenti AI né al RAG; un JSON canonico via API è leggibile, aggiornabile e indicizzabile in tempo reale.
- **OBIETTIVO:** Sblocca Nina e gli agenti GENESIS dalla dipendenza da codice compilato per le critiche; allinea la dashboard alle fonti vive del sistema.
- **DECISIONE:** ATTACCO ESERCITO (2-3/07) ha identificato 3 fonti di verità stantie: `_CANONE.md:13` (puntava a V32-su-molle), `INDICE_CAMMINO` (9/15 titoli errati), pitch (3 errori di sostanza) — 49 azioni generate come `[ ] DA FARE` in `DA_FARE_FATTO.md`.
- **LOGICA:** Gate `SELF_IMPROVE` attivo: nessuna delle 49 azioni è stata committata senza approvazione diretta di Matteo; il codice proposto dagli specialisti resta in staging.
- **OBIETTIVO:** Ordine hardware Vevor + ER20 + UPS (250-350 EUR) sblocca catena economica + risolve corruzioni HNSW nell'indice vettoriale ChromaDB — prossimo step misurabile.

---

| campo | valore |
|---|---|
| **episodio** | S2E16 |
| **data** | 2026-07-05 |
| **titolo** | La Fonte di Verità |
| **progetto principale** | GENESIS |
| **progetti citati** | V32, VULCAN, EVA (Nina) |
| **commit di riferimento** | `2b8bfafe`, `feat(#54)` |
| **stato V32** | 65% |
| **stato GENESIS** | 70% |
| **prossimo step** | Ordine Vevor+ER20+UPS · approvazione 49 azioni backlog |
| **tag** | `canone`, `RAG`, `Nina`, `critiche-live`, `fonte-di-verità`, `GENESIS` |