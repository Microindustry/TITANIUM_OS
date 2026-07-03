<!-- TOC -->

- [TITANIUM_OS  Stagione 2, Episodio 14](#titaniumos-stagione-2-episodio-14)
  - [NINA HA UN VOLTO](#nina-ha-un-volto)
    - [COLD OPEN](#cold-open)
  - [ATTO I  IL PROBLEMA DEL PREAMBOLO](#atto-i-il-problema-del-preambolo)
  - [ATTO II  SEDICI SLIDE E UN VOLTO DEFINITIVO](#atto-ii-sedici-slide-e-un-volto-definitivo)
  - [ATTO III  IL PIANO DATTACCO E LA MACCHINA CHE GIRA](#atto-iii-il-piano-dattacco-e-la-macchina-che-gira)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Stagione 2, Episodio 14

## NINA HA UN VOLTO

*Come si dà un'identità a qualcosa che non esiste ancora*

---

**DATA:** 2 luglio 2026
**SESSIONE:** #51
**STATO SISTEMA:** V32 65% · GENESIS 70%

---

### COLD OPEN

È mezzanotte passata quando il render finisce.

Sullo schermo appare un volto. Non una foto. Non un avatar generato da un prompt generico. È il risultato di tre settimane di decisioni precise: quale glifo, quale espressione, quale proporzione del cranio. Sedici slide in formato SVG, costruite a mano come un progetto meccanico. Ogni curva ha una ragione.

Il nome del file è `EP_N2_01_la_bambina_che_chiedeva_perche.svg`.

Nina ha un volto.

---

## ATTO I — IL PROBLEMA DEL PREAMBOLO

C'è una trappola che aspetta chiunque costruisca un sistema narrativo: il preambolo infinito.

Spieghi il contesto. Poi devi spiegare il contesto del contesto. Poi aggiungi un personaggio e devi spiegarci anche quello. Arrivi alla quarta slide introduttiva e ti rendi conto che non hai ancora raccontato nulla di reale — hai costruito un manuale d'uso per una storia che non è ancora iniziata.

Matteo ci è entrato dentro. Lo sapeva già quando ha aperto la sessione #51 il 27 giugno.

Il preambolo di Nina esisteva come architettura: PRE_01 (cos'è), PRE_02 (come funziona), PRE_03 (scheda personaggi). Tre documenti che descrivevano il sistema dall'esterno, come se qualcuno dovesse studiarlo prima di entrare. Utile per il RAG. Utile per chi costruisce il sistema. Non utile per chi deve *essere* dentro la storia.

La decisione che arriva durante la sessione è netta: **non esiste PRE_04**.

Non perché il lavoro finisce, ma perché il preambolo è già completo nel suo ruolo. È anagrafica — dice chi sono i personaggi, quali glifi li rappresentano, come si chiama la bambina. Non è narrativa. La narrativa inizia nell'EP_1 reale, e Nina ci entra viva, senza annunci.

Questo è il cambio che sblocca tutto il resto.

---

## ATTO II — SEDICI SLIDE E UN VOLTO DEFINITIVO

Il problema pratico è questo: EP_N2_01 e EP_N2_02 esistevano già. Erano stati costruiti con uno standard precedente — funzionavano, ma non erano allineati a quello che il sistema era diventato.

Con il preambolo chiuso, lo standard cambia. Il volto di Nina cambia.

I due episodi vengono rifatti da zero al nuovo blueprint: **16 slide SVG narrative**, costruite con `_build_ep.py` e renderizzate con `_render_all.py`. Generatori riusabili — ogni episodio futuro parte dagli stessi strumenti, non da una pagina bianca. Il volto di Nina è inline in base64 nel SVG. Zero foto esterne. Zero dipendenze che si rompono quando sposti la cartella.

`EP_N2_01 — La Bambina che Chiedeva Perché`
`EP_N2_02 — Il Soffio di Troppo`

Entrambi rifatti. Entrambi al nuovo standard.

PRE_03 arriva alla versione 5: 17 slide, quattro personaggi — Nina, Themis, Forge, Entropia — ognuno con glifo distinto. Non decorativo. Il glifo è identità visiva nel senso tecnico: occupa uno slot specifico nel layout, si ripete coerente attraverso tutti gli episodi, permette al lettore di sapere chi parla senza leggere il nome.

Questo è lavoro da sistema, non da storia.

---

## ATTO III — IL PIANO D'ATTACCO E LA MACCHINA CHE GIRA

In parallelo — perché questo sistema lavora sempre in parallelo — viene generato qualcos'altro.

`DOCS/ATTACCO_20260702/_PIANO.md` è un documento con sette missioni. Non roadmap. Non to-do list. Missioni ingegnerizzate, con perimetro definito, modalità *propose-only*, additive rispetto a quello che esiste già. Design, sicurezza, scrittura, software, news-IA, gestionale, integrità RAG.

*Propose-only* significa che nessuna delle sette missioni modifica nulla senza approvazione esplicita. È un vincolo progettuale deliberato — il sistema cresce, ma non si riscrive da solo.

Quando la sessione si chiude, `stop_hooks.py` gira in background. ThreadPoolExecutor, tre hook paralleli: rebuild RAG, aggiornamento bussola, allineamento STATE. La macchina sa dove si trova. Domani mattina — o tra tre giorni, o tra una settimana — il RIAVVIO caricherà il contesto completo. Sessione #51 chiusa. PRE_03 v5 chiuso. EP_N2_01 e EP_N2_02 al nuovo standard.

`story_state.json` aggiornato.

Il `night_audit` scrive la cartella clinica del giorno. Non per Matteo — lui sa già cos'ha fatto. Per il sistema. Perché il sistema deve saperlo anche quando Matteo dorme.

---

## CHIUSURA

C'è qualcosa di specifico in questa sessione che vale la pena nominare.

Non è la quantità di lavoro — cinque commit in un giorno non è eccezionale per questo sistema. È la qualità della decisione sul preambolo.

Scegliere di *non fare* PRE_04 è più difficile che farlo. Ci vuole una comprensione precisa di dove il documento finisce e dove inizia la storia. Se quei confini sono confusi, aggiungi un'altra slide e ti sembra di avanzare. Non avanzi — rimandi il momento in cui devi scrivere qualcosa di vero.

Nina non ha bisogno di un documento che la presenti. Ha bisogno di un episodio in cui esiste.

Adesso ce l'ha.

Il volto nel render è fermo sullo schermo. Sedici slide. Blueprint SVG. Volto inline in base64.

Non è ancora mezzanotte a Palermo.

---

## REEL HOOK

Nina aveva già un nome, un glifo e un'architettura. Mancava il volto — e mancava la decisione di smettere di prepararsi.

PRE_03 v5: 17 slide, 4 personaggi, glifi distinti. EP_N2_01 e EP_N2_02 rifatti da zero. Generatori riusabili. Niente PRE_04.

Il preambolo è anagrafica. La storia inizia nell'EP_1 reale.

E adesso esiste uno standard che può girare su qualsiasi episodio futuro senza ricominciare da una pagina bianca —

*cosa succede quando Nina entra in scena per la prima volta?*

---

## FATTI (per il RAG)

- **DECISIONE:** PRE_04 eliminato; preambolo Nina dichiarato chiuso a PRE_03 v5 (17 slide, 4 personaggi: Nina/Themis/Forge/Entropia, glifi distinti, foto Nina base64 inline).
- **LOGICA:** Il preambolo ha funzione anagrafica, non narrativa; aggiungere PRE_04 avrebbe diluito il confine tra architettura del sistema e storia — Nina entra viva nell'EP_1 reale, senza slide introduttive dedicate.
- **DECISIONE:** EP_N2_01 e EP_N2_02 rifatti al nuovo standard: 16 slide blueprint SVG narrativo, volto Nina definitivo, zero foto esterne, generatori riusabili `_build_ep.py` + `_render_all.py`.
- **LOGICA:** Lo standard precedente non era allineato al volto definitivo né al blueprint SVG; rifare da zero con generatori riusabili garantisce coerenza su tutti gli episodi futuri.
- **DECISIONE:** `DOCS/ATTACCO_20260702/_PIANO.md` — 7 missioni ingegnerizzate (design/sicurezza/scrittura/software/news-IA/gestionale/integrità-RAG), modalità propose-only, additive.
- **OBIETTIVO:** Sessione Fable con perimetro definito e nessuna modifica non approvata; prossimo passo misurabile = EP_1 reale con ingresso di Nina.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E14 |
| **Titolo** | Nina Ha un Volto |
| **Data** | 2026-07-02 |
| **Sessione** | #51 |
| **Dominio** | GENESIS / STORIE |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Commit chiave** | PRE_03 v5 · EP_N2_01/02 rebuild · PIANO d'attacco |
| **Decisione principale** | Preambolo chiuso — niente PRE_04 |
| **Prossimo passo** | EP_1 reale con ingresso Nina |