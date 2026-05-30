<!-- TOC -->

- [EP_S2_00  IL DISTACCO](#eps200-il-distacco)
    - [Le molle erano giuste. Il corpo unico è meglio.](#le-molle-erano-giuste-il-corpo-unico-è-meglio)
  - [COLD OPEN](#cold-open)
  - [ATTO I  PERCHÉ LE MOLLE ERANO GIUSTE](#atto-i-perché-le-molle-erano-giuste)
  - [ATTO II  IL MOMENTO IN CUI CAMBIA TUTTO](#atto-ii-il-momento-in-cui-cambia-tutto)
  - [ATTO III  LA DECISIONE](#atto-iii-la-decisione)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_S2_00 — IL DISTACCO
### "Le molle erano giuste. Il corpo unico è meglio."

**Formato:** Video-podcast | Apertura Stagione 2 | Durata stimata: 10-12 min
**Tono:** Tecnico + filosofico — la differenza tra una scelta giusta e una scelta migliore
**Data evento:** 27 maggio 2026
**Fonte:** Sessione corpo unico + ASSOLUTO V7 + V8_DELTA.md

---

> *La Stagione 1 chiude con 0.008 mm e il capannone del 2030.*
> *La Stagione 2 apre con una decisione che nessuno ha visto arrivare.*
> *Le molle gialle stavano sotto la macchina da febbraio. Maggio le ha sepolte.*

## COLD OPEN

*[Immagine: quattro molle gialle ISO 90mm appoggiate sul banco. Accanto: una torcia TIG. Sullo sfondo: il telaio della V32.]*

Quattro molle. Ottanta euro l'una. Scelte con i dati — f₀ = 3.83 Hz, isolamento vibrazioni >99.9% sopra i 400 Hz. Non per istinto. Per calcolo.

Febbraio 2026 le ho messe sotto la macchina. Erano giuste.

A maggio le ho tolte.

---

## ATTO I — PERCHÉ LE MOLLE ERANO GIUSTE

Non si capisce una decisione se non si capisce la logica che l'ha generata.

Le molle gialle ISO 90mm k=15.8 N/mm nascono da un problema fisico preciso: la taverna ha un solaio domestico. Il pavimento trasmette vibrazioni — passi, camion sulla strada, risonanze strutturali dell'edificio. Una CNC di precisione su un solaio che vibra produce errori dimensionali che nessun asse servo può correggere in tempo reale. La fisica arriva prima del codice.

Il sistema classico è l'isolamento: interponi un elemento elastico tra la macchina e il pavimento. Le molle assorbono le vibrazioni del pavimento. La macchina fluttua sopra, isolata.

I dati IFM VSE150 avevano confermato: le molle verdi da 40mm non bastavano. Le gialle da 90mm sì. Frequenza naturale 3.83 Hz — sotto la frequenza di qualsiasi disturbo rilevante. Smorzamento ζ=0.032. Isolamento >99.9% sopra i 400 Hz.

Erano la scelta giusta. Supportata da dati. Verificata con sensori reali.

---

## ATTO II — IL MOMENTO IN CUI CAMBIA TUTTO

Config G. Maggio 2026. Gusset 200mm sulle colonne Z+U. Stai disegnando i rinforzi, stai ragionando sui carichi dinamici durante la fresatura, e a un certo punto guardi il sistema da lontano.

Non il singolo componente. Il sistema intero.

E vedi quello che i singoli calcoli non mostravano: le molle aggiungono un grado di libertà. La macchina non è più un corpo rigido ancorato — è un sistema dinamico con la sua frequenza propria, il suo comportamento sotto carico variabile, le sue risonanze possibili. Ogni lavorazione pesante eccita il sistema. I parametri cambiano nel tempo man mano che le molle si assestano, che i dadi si allentano sotto vibrazione, che la temperatura varia la rigidità dell'elastomero.

Non è un errore di progettazione. È una variabile aggiuntiva da gestire per i prossimi dieci anni.

E poi guardi i tubolari del telaio. Vuoti. Acciaio S235 nudo.

La soluzione era già nel progetto, scritta mesi prima: Epoxy Granite nei tubolari. Composito epossidico colato nel cavo del telaio. Smorzamento passivo per proprietà del materiale — δ=0.03-0.06 contro δ=0.002 dell'acciaio nudo. Fattore 15-30×. Zero parti in movimento. Zero setup. Zero variabili aggiuntive.

Non devi isolare la macchina dalle vibrazioni. La macchina assorbe le vibrazioni da sola.

---

## ATTO III — LA DECISIONE

Corpo unico.

La V32 non è più sospesa. È ancorata. Le molle spariscono. Il telaio diventa la struttura di smorzamento — non un intermediario elastico, ma il sistema di ammortizzazione integrato.

Rigidità asse Z Config G: 772 volte superiore alla baseline. Non è un'ottimizzazione — è un salto di categoria.

La decisione si prende in una sessione. Non è drammatica. Non è difficile. È conseguente — quando hai tutti i dati, la risposta emerge da sola.

Questo è il punto più importante di questo episodio, e lo voglio dire chiaramente:

**Le molle erano la scelta giusta a febbraio 2026 con le informazioni disponibili a febbraio 2026.**

**Il corpo unico è la scelta migliore a maggio 2026 con le informazioni disponibili a maggio 2026.**

Non c'è errore. Non c'è regressione. C'è evoluzione — che è esattamente quello che dovrebbe succedere in un sistema progettato per imparare da sé stesso.

---

## CHIUSURA

Le quattro molle gialle sono ancora in officina. Non le butti — costano €320 e un giorno potrebbero tornare utili per un'altra applicazione.

Ma non sono più sotto la V32.

Sotto la V32 c'è Epoxy Granite. Silenzio attivo. Un composito che assorbe quello che l'acciaio trasmette.

E la macchina — quella stessa macchina che a febbraio galleggiava su quattro molle calcolate con cura — adesso è un corpo unico. 178 kg ancorati. Stabili.

> *La prossima volta che qualcuno ti dice "hai sbagliato la decisione iniziale":*
> *chiedigli quanti dati aveva quando ha preso quella decisione.*
> *Poi mostragli i tuoi.*

---

**reel_hook:** "A febbraio ho messo quattro molle ISO 90mm sotto la mia CNC da 178 kg. Calcolate con sensori IFM reali, frequenza naturale 3.83 Hz, isolamento >99.9%. Erano la scelta giusta. A maggio le ho tolte. Non perché avevo sbagliato — ma perché con nuovi dati ho visto qualcosa che i calcoli di febbraio non potevano mostrare. La differenza tra una scelta giusta e una scelta migliore è sempre la stessa cosa: più informazioni. Il sistema che costruisci deve permetterti di aggiornarti. Se non puoi cambiare idea con i dati, non stai costruendo un sistema. Stai difendendo una posizione."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 00 — apertura |
| Arco | Da corpo sospeso a corpo unico |
| Connessione S1 | EP_S1_02 (le molle gialle) → questo episodio chiude l'arco |
| Connessione S2 | Introduce il principio dell'aggiornamento — filo conduttore di tutta S2 |
