<!-- TOC -->

- [EP_02  IL REATTORE](#ep02-il-reattore)
    - [178 kg di precisione assoluta. Costruiti a mano.](#178-kg-di-precisione-assoluta-costruiti-a-mano)
  - [COLD OPEN](#cold-open)
  - [ATTO I  PERCHÉ NON HAI COMPRATO UNA CNC](#atto-i-perché-non-hai-comprato-una-cnc)
  - [ATTO II  LE MOLLE GIALLE](#atto-ii-le-molle-gialle)
  - [ATTO III  LE 9 PIASTRE E I 8 CUSTODI](#atto-iii-le-9-piastre-e-i-8-custodi)
  - [ATTO IV  IL CERVELLO](#atto-iv-il-cervello)
  - [ATTO V  IL NUMERO](#atto-v-il-numero)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_02 — IL REATTORE
### "178 kg di precisione assoluta. Costruiti a mano."

**Formato:** Video-podcast con timelapse costruzione | Durata stimata: 18-20 min
**Tono:** Tecnico ma narrativo — ogni scelta ha una storia
**Personaggi attivi:** Matteo (costruisce + spiega), AVA (dati fisici in overlay)
**Fonte:** ASSOLUTO V6 — Atto III (Titanium V32, Cap. 1-11)

---

> *Da EP_00: "Quello zero virgola uno che senti nelle mani prima ancora di misurarlo."*
> *Il comparatore torna in EP_05 — stessa mano, stesso gesto, diverso anno. Le molle gialle scelte qui le ritrovi in EP_05 ancora ferme sotto il basamento.*

## COLD OPEN

*[Comparatore digitale appoggiato su una superficie fresata. Display: 0.008 mm.]*

> "H7. Tolleranza IT7. Ottomillesimi di millimetro.
> Questo non è il risultato di una macchina comprata.
> È il risultato di ogni scelta fatta prima ancora di iniziare a saldare."

*[Cut a: la struttura grezza del basamento, prima della finitura. Cordoni di saldatura TIG su tubolari 40x40x2.]*

---

## ATTO I — PERCHÉ NON HAI COMPRATO UNA CNC

La risposta breve: perché puoi costruirne una migliore.

La risposta lunga:

Una CNC hobbyistica da 3.000 euro ha vibrazioni che rendono impossibile IT6-IT7 su metallo. Una CNC industriale che le elimina parte da 40.000 euro.

Il gap non è nei motori. Non nelle guide. Non nell'elettronica.

**Il gap è nel basamento.**

Ogni vibrazione che non elimini alla fonte — nella struttura, prima che arrivi all'utensile — si traduce in errore dimensionale. Non c'è elettronica che lo compensi. Non c'è controllo che lo corregga. È fisica.

*[AVA mostra grafico: frequenza naturale vs. smorzamento per diversi materiali.]*

La soluzione industriale standard è il granito. Pesante, stabile, costoso, non lavorabile in casa.

La nostra soluzione è l'**Epoxy Granite** — un composito proprietario di aggregati inerti e resina epossidica — colato tra le piastre d'acciaio come un'anima. Il basamento della V32 non è acciaio. Non è granito. È un sandwich ibrido che prende il meglio di entrambi.

Risultato: frequenza naturale f₀ = 3.83 Hz. Smorzamento ζ = 0.032. Rigidità sull'asse Z: 772 volte superiore alla configurazione baseline.

---

## ATTO II — LE MOLLE GIALLE

*[Dettaglio: 4 molle ISO 90mm gialle, visibili sotto il basamento.]*

Questo è il dettaglio che nessuno si aspetta da una CNC.

La Titanium V32 non è appoggiata al pavimento. **È sospesa.**

Quattro molle ISO 90mm, costante k = 15.8 N/mm, frequenza di risonanza 3.83 Hz. Taratura su 4 punti per isolare la macchina dalle vibrazioni del pavimento — e per isolare il pavimento dalle vibrazioni della macchina.

Perché questo conta:

Una CNC rigida trasmette le vibrazioni del mandrino attraverso la struttura fino alle guide, fino all'utensile, fino al pezzo. Ogni passaggio amplifica. Una CNC isolata lascia che le vibrazioni si dissolvano nel sistema di sospensione prima di raggiungere l'utensile.

Le molle gialle sono l'equivalente meccanico degli antivibranti negli studi di registrazione. La differenza è che qui le tolleranze non sono in dB — sono in millesimi di millimetro.

*[AVA mostra: confronto vibrazioni con molle verdi 40mm vs molle gialle 90mm. Delta significativo.]*

La decisione di upgrade dalle verdi 40mm alle gialle 90mm non è stata estetica. È stata il risultato di test con IFM VSE150 — tre sensori, dati reali, grafico di smorzamento a confronto.

---

## ATTO III — LE 9 PIASTRE E I "8 CUSTODI"

*[Timelapse: assemblaggio del sandwich strutturale XY.]*

Nove piastre d'acciaio rettificato, 15mm di spessore. Più due aggiuntive per il sandwich XY.

Non è un basamento semplice. È una struttura stratificata:
- Piastra inferiore + traliccio 40x40x2 saldato TIG
- Colata Epoxy Granite che riempie le cavità
- Profili alluminio 90x45 a 6 cave (asse Y) + 45x45 a 4 cave (asse X)
- Interfaccia XY/basamento: gli **8 Custodi**

Gli 8 Custodi sono 8 pezzi lavorati CNC con scalino e foro D26, abbinati a bronzine CuSn8 e barre rettificate D20. L'interfaccia tra la struttura XY e il basamento. Il punto critico dove la rigidità dell'intera macchina dipende dalla precisione di accoppiamento.

4 superiori + 4 inferiori. Geometria simmetrica. Carico distribuito uniformemente.

> "Non hai assemblato una macchina. Hai progettato un sistema di trasferimento delle forze."

---

## ATTO IV — IL CERVELLO

*[Inquadratura sul quadro elettrico in assemblaggio.]*

L'hardware fisico è la struttura. Il cervello è il PLC Siemens S7-314C.

Non un Arduino. Non un GRBL su scheda cinese. Un controllore industriale reale, lo stesso tipo che trovi nelle linee di produzione automotive.

La scelta non è sentimentale — è pratica. Il PLC Siemens ha:
- Ciclo di scansione deterministico: 0.1ms. Il segnale arriva quando deve arrivare, non "più o meno".
- Integrazione nativa con HMI TP900 Comfort via PROFIBUS DP.
- Diagnostica integrata: se un sensore muore, il sistema ti dice quale, quando, e perché.
- Scalabilità: la stessa logica PLC che gestisce la V32 può gestire la pressa MIMS, l'automazione del laboratorio, i sensori del capannone.

*[AVA mostra architettura di controllo: PLC → servo → guide → utensile → pezzo.]*

Tre encoder. Due assi servo. Un asse stepper per Y. Sensori IFM VSE150 per le vibrazioni in tempo reale. Camera Basler per il controllo qualità visivo.

Non stai controllando una macchina. Stai costruendo un sistema di sensing e attuazione integrato.

---

## ATTO V — IL NUMERO

Alla fine, conta un solo numero.

**0.019 mm.** Tolleranza RSS dell'asse X dopo calibrazione.

Non è il numero che ti aspetti da una macchina costruita in una taverna con componenti industriali selezionati e saldature TIG fatte a mano.

Ma è il numero che ottieni quando ogni scelta — le molle, il composito, gli 8 Custodi, la rigidità Z 772x, il controllo PLC deterministico — è stata fatta con un obiettivo: eliminare l'errore alla fonte, non compensarlo dopo.

IT6-IT7. Tolleranze da lavorazione meccanica di precisione. Su una macchina che costa meno di un quarto di qualsiasi equivalente industriale.

---

## CHIUSURA

*[La piastra fresata sul banco. Il comparatore. 0.008 mm.]*

La Titanium V32 non è un prodotto da vendere.

È il reattore nucleare che alimenta tutto il resto.

Ogni stampo MIMS che fresa è un prodotto vendibile. Ogni pezzo conto terzi è cash flow. Ogni lavorazione è contenuto. Ogni upgrade che produce su se stessa è meta-ricorsività in azione.

178 kg. 3.83 Hz. ±0.019 mm.

Non sono numeri tecnici. Sono la distanza tra la dipendenza e la libertà industriale.

E c'è ancora qualcosa. Mentre costruisci la V32 con componenti MIMS prototipati, e prototiphi MIMS perché la V32 non esiste ancora — emerge una domanda che sembra impossibile finché non capisci che non è un paradosso. È lo stesso principio della taverna. Lo stesso principio del CV.

Parti da dove sei. Costruisci abbastanza da costruire qualcosa di meglio.

---

> *Ponte → EP_03:*
> La macchina costruisce i pezzi che costruiscono la macchina.
> Se sembra un loop chiuso senza uscita, è perché cerchi l'inizio nel posto sbagliato.

*Continua in EP_03 — Il Paradosso*

## FATTI (per il RAG)

- **FATTO:** Il basamento della Titanium V32 è un sandwich ibrido acciaio/Epoxy Granite con frequenza naturale f₀ = 3.83 Hz, smorzamento ζ = 0.032 e rigidità sull'asse Z 772 volte superiore alla configurazione baseline.

- **DECISIONE:** Upgrade delle molle di isolamento da molle verdi 40mm a molle gialle ISO 90mm (costante k = 15.8 N/mm, frequenza di risonanza 3.83 Hz), disposta su 4 punti. **LOGICA:** I test con sensori IFM VSE150 (3 sensori) hanno dimostrato un delta di smorzamento significativo a favore delle gialle 90mm rispetto alle verdi 40mm.

- **FATTO:** La struttura portante comprende 9 piastre d'acciaio rettificato da 15mm di spessore (più 2 aggiuntive per il sandwich XY), traliccio tubolare 40x40x2 saldato TIG, profili alluminio 90x45 a 6 cave (asse Y) e 45x45 a 4 cave (asse X).

- **FATTO:** L'interfaccia XY/basamento è realizzata tramite 8 Custodi — pezzi lavorati CNC con scalino e foro D26, abbinati a bronzine CuSn8 e barre rettificate D20 — disposti 4 superiori + 4 inferiori in geometria simmetrica.

- **DECISIONE:** Il controllo macchina è affidato a un PLC Siemens S7-314C con ciclo di scansione deterministico di 0.1ms, interfacciato con HMI TP900 Comfort via PROFIBUS DP. **LOGICA:** Garantisce determinismo del segnale, diagnostica integrata per sensori e scalabilità verso altri sottosistemi (pressa MIMS, automazione capannone).

- **FATTO:** La V32 monta 3 encoder, 2 assi servo, 1 asse stepper (Y), sensori IFM VSE150 per vibrazioni in tempo reale e camera Basler per controllo qualità visivo.
