<!-- TOC -->

- [EP_01  LA TAVERNA](#ep01-la-taverna)
    - [Il laboratorio peggiore del mondo. La scelta migliore della mia vita.](#il-laboratorio-peggiore-del-mondo-la-scelta-migliore-della-mia-vita)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LE CONDIZIONI PERFETTE NON ESISTONO](#atto-i-le-condizioni-perfette-non-esistono)
  - [ATTO II  INVENTARIO DI GUERRA](#atto-ii-inventario-di-guerra)
  - [ATTO III  IL PARADOSSO DEL SOLAIO](#atto-iii-il-paradosso-del-solaio)
  - [ATTO IV  QUELLO CHE CÈ GIÀ](#atto-iv-quello-che-cè-già)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_01 — LA TAVERNA
### "Il laboratorio peggiore del mondo. La scelta migliore della mia vita."

**Formato:** Video-podcast | Durata stimata: 10-12 min
**Tono:** Pratico, senza romanticismo, quasi ironico
**Personaggi attivi:** Matteo (voce + presenza fisica), AVA (dati e overlay grafici)
**Fonte:** ASSOLUTO V6 — Atto I §1.4, §1.5

---

> *Da EP_00: "La risposta era nella dispensa."*
> *Questo episodio è quella dispensa. La stessa logica del vincolo creativo qui tornerà in EP_03 (bootstrap MIMS) e in EP_04 (la Maria Rule).*

## COLD OPEN

*[Inquadratura grandangolare: ~12 m² di spazio. Piastrelle da cucina sul pavimento. Soffitto basso. Al centro, una struttura in acciaio che non c'entra niente con l'ambiente circostante.]*

> "Questo è il laboratorio. Dodici metri quadri. Solaio domestico. Una finestra.
> Qui sta nascendo una macchina CNC di precisione industriale da 178 kg.
> Non è una scelta romantica. È una scelta tecnica."

---

## ATTO I — LE CONDIZIONI PERFETTE NON ESISTONO

Esiste una bugia che si racconta ogni artigiano, ogni ingegnere, ogni maker del mondo.

"Lo faccio quando avrò lo spazio giusto."
"Lo faccio quando avrò il capannone."
"Lo faccio quando avrò i fondi."

*[AVA mostra il countdown: "Persone che aspettano le condizioni perfette: in attesa da media 4.7 anni."]*

La taverna non è il piano B. È il piano A.

Non perché sia ideale — non lo è. Ma perché **il vincolo creativo è il miglior ingegnere che esista**.

---

## ATTO II — INVENTARIO DI GUERRA

*[AVA genera una tabella in overlay: ogni riga è un vincolo, ogni riga ha una soluzione.]*

**12 m² disponibili.**
Vincolo: impossibile assemblare la macchina intera in una volta.
Soluzione: assemblaggio modulare per sottogruppi. Bassamento → sospensione → sandwich XY → colonne Z. Un blocco per volta.

**230V monofase, 16A.**
Vincolo: no trifase, niente mandrino da >2.2kW.
Soluzione: VFD monofase-trifase. Mandrino 2.2kW ER20. Basta.

**Solaio domestico.**
Vincolo: carico massimo ~300 kg/m².
Soluzione: V32 = 178 kg su 0.8 m² = 222 kg/m². Dentro i limiti. Calcolato.

**No aspirazione industriale.**
Vincolo: polvere da fresatura, vapori resine.
Soluzione: aspiratore portatile + cappa DIY + maschera FFP3 per le resine.

**Pavimento non perfettamente piano.**
Vincolo: CNC di precisione su superficie irregolare.
Soluzione: piedini regolabili + livellamento con comparatore.

**Illuminazione domestica.**
Vincolo: insufficiente per controllo qualità.
Soluzione: lampade LED task + lente d'ingrandimento. Costo: €30.

Ogni vincolo ha una risposta. Non elegante. Funzionante.

> **"Se funziona in taverna, funziona ovunque."**
> Questo diventa il test di robustezza per ogni soluzione dell'ecosistema.

---

## ATTO III — IL PARADOSSO DEL SOLAIO

C'è una cosa che la taverna ha che nessun capannone affittato avrebbe.

Zero overhead.

Nessun affitto. Nessun contratto. Nessun mese in cui sei obbligato a produrre per coprire i costi fissi anche quando stai solo progettando.

L'anno 1 è zero spese di laboratorio. Tutto il cash flow — che al break-even sono 61 ore di lavoro conto terzi — va in materiali, componenti, upgrade.

Il capannone del 2030 si paga con i margini accumulati in taverna dal 2026.

*[AVA mostra il modello: freccia da "zero overhead anno 1" → "60% reinvestimento" → "cash flow Q2 2026" → "laboratorio 2028" → "capannone 2030"]*

Non è romantico. È geometria finanziaria.

---

## ATTO IV — QUELLO CHE C'È GIÀ

*[Panoramica sul banco: inventario fisico visibile]*

La gente vede la taverna e pensa: "poco".
Chi capisce vede: **un laboratorio con più intelligenza per metro quadro di qualsiasi startup finanziata.**

- PLC Siemens S7-314C: controllo macchina di livello industriale reale.
- HMI TP900 Comfort 9": interfaccia operatore da 2.800 euro. Più di quanto costa tutto l'investimento mancante.
- Sensori IFM VSE150 (x3): monitoraggio vibrazioni in tempo reale. Non "sento che vibra" — "0.003 mm/s RMS, dati registrati".
- Basler acA1920-25gm: camera industriale per controllo qualità visivo.
- Edwards RV3: pompa vacuum per stampaggio e bloccaggio pezzo.
- Bambu Lab P1S: stampa PA-GF30. Non PLA da hobbysti — poliammide rinforzata vetro.
- Saldatrice TIG + MIG: personali. Non a noleggio, non in condivisione.

> "Non sei un hobbista che ha comprato un kit CNC su Amazon. Sei un artigiano industriale che ha saldato titanio per MotoGP, programmato robot, manutenuto presse a 250 bar, e testato pezzi fino alla rottura."

---

## CHIUSURA

*[Slow zoom su basamento saldato. Le saldature TIG sono pulite. Non sembrano fatte in una taverna.]*

Apple è nata in un garage.
HP è nata in un garage.
Amazon è nata in un garage.

Nessuno di loro stava aspettando le condizioni perfette.

La differenza è che quella taverna ha un PLC Siemens, un HMI da 2.800 euro, e quindici anni di esperienza industriale consolidata.

Quando ti sposterai in un laboratorio vero — e succederà, 2028 nel piano — saprai già come ottimizzare ogni metro quadro, gestire ogni vincolo, produrre qualità in condizioni non ottimali.

La taverna non è il punto di partenza.
È la prima prova di concept.

E il test di robustezza — *"se funziona in taverna, funziona ovunque"* — non vale solo per la struttura fisica. Vale per ogni soluzione dell'ecosistema. Quando in EP_03 risolverai il paradosso MIMS↔V32 partendo da prototipi stampati in 3D, stai applicando la stessa logica: parti con quello che hai, abbastanza preciso da funzionare adesso, abbastanza robusto da costruire qualcosa di meglio. Quando in EP_04 costruirai EVA con il vincolo "zero-click per Maria", stai applicando la stessa logica: il vincolo è il requisito di progettazione più onesto che esiste.

---

> *Ponte → EP_02:*
> Perché non hai comprato una CNC?
> Non è una domanda retorica. La risposta cambia tutto.

*Continua in EP_02 — Il Reattore*

## FATTI (per il RAG)

- **FATTO:** Il laboratorio "La Taverna" ha una superficie di **12 m²**, con alimentazione **230V monofase 16A** e solaio domestico con portata massima stimata di **~300 kg/m²**.

- **DECISIONE:** V32 (CNC epoxy-granite) dimensionata a **178 kg su 0.8 m²** = **222 kg/m²**. **LOGICA:** Mantenersi entro i limiti del solaio domestico, calcolato preventivamente.

- **DECISIONE:** Mandrino scelto a **2.2 kW ER20** con **VFD monofase-trifase**. **LOGICA:** Vincolo alimentazione monofase 16A impedisce mandrini >2.2 kW; il VFD risolve l'assenza di trifase.

- **DECISIONE:** Assemblaggio V32 per sottogruppi sequenziali (bassamento → sospensione → sandwich XY → colonne Z). **LOGICA:** Impossibile assemblare la macchina intera nello spazio di 12 m² disponibile.

- **FATTO:** Inventario strumentale presente in laboratorio include: PLC Siemens S7-314C, HMI TP900 Comfort 9" (valore dichiarato **€2.800**), sensori IFM VSE150 ×3, camera Basler acA1920-25gm, pompa vacuum Edwards RV3, stampante Bambu Lab P1S (materiale PA-GF30).

- **OBIETTIVO:** Break-even anno 1 stimato a **61 ore di lavoro conto terzi**; overhead laboratorio anno 1 = **zero** (spazio domestico). Piano: laboratorio dedicato entro **2028**, capannone entro **2030**.
