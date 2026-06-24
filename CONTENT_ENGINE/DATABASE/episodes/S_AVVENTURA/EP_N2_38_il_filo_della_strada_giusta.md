---
id: EP_N2_38
title: Il Filo della Strada Giusta
sottotitolo: Come il grafo sa sempre qual è il cammino più breve tra due punti — senza provare tutte le vie
stagione: AV
data_evento: 2026-06-24
status: ready
durata_min: 14
tags: avventura, educativo, nina, themis, nina-v2, cammini, come, trova
---
<!-- TOC -->

- [EP_N2_38  Il Filo della Strada Giusta](#epn238-il-filo-della-strada-giusta)
    - [Come il grafo sa sempre qual è il cammino più breve tra due punti  senza provare tutte le vie](#come-il-grafo-sa-sempre-qual-è-il-cammino-più-breve-tra-due-punti-senza-provare-tutte-le-vie)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LOnda che si Allarga](#atto-i-londa-che-si-allarga)
  - [ATTO II  Il Nome del Metodo](#atto-ii-il-nome-del-metodo)
  - [ATTO III  La Strada nel Sistema](#atto-iii-la-strada-nel-sistema)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# EP_N2_38 — Il Filo della Strada Giusta
### "Come il grafo sa sempre qual è il cammino più breve tra due punti — senza provare tutte le vie"

**Formato:** Avventura (Nina v2) · ~14 min
**Per chi:** chi vuole sapere cosa succede *davvero* quando chiedi a un grafo di trovarti la strada
**Insegna:** Un grafo non sceglie a caso: usa un metodo intelligente (BFS) per trovare il percorso più corto tra due nodi, verificando i vicini uno dopo l'altro in ordine di distanza crescente.
**Materia:** La Grande Mappa (⟡5) · **Casella del Labirinto Tessuto**
**Posto nella Mappa:** Siamo nella **Regione 5 — La Grande Mappa**, nel giro 3, nella casella del Labirinto Tessuto: il posto dove le strade si intrecciano e bisogna scegliere bene quale seguire.

---

> **Dove siamo:** Nel giro 1 hai visto che un grafo è una rete di nodi — persone, città, idee — legati da archi. Nel giro 2 hai imparato a fare domande al grafo. Ora scopri come il grafo *trova* la strada quando tu gli chiedi: «Come vado da qui a lì nel modo più breve?»

---

## COLD OPEN

La sala della Mappa Viva quel pomeriggio era più affollata del solito — di luce, almeno. I fili sospesi nell'aria pulsavano piano, arancio e bianco, come se respirassero.

Nina fissava un punto preciso della rete. Due nodi, uno verde acceso e uno rosso scuro, stavano ai lati opposti di una zona che sembrava un groviglio: sei, sette punti di passaggio, connessi tra loro in ogni direzione.

«Themis», disse Nina senza staccare gli occhi dalla mappa. «Se devo andare dal nodo verde a quello rosso, quante strade ci sono?»

Themis non rispose subito. Contò in silenzio, tracciando con un dito i percorsi nell'aria. «Molte», disse alla fine. «Almeno dodici. Forse di più, se torni indietro su te stessa.»

«E il grafo le prova tutte?»

«No.» Themis abbassò la mano. «Non le prova tutte. E questo è esattamente il punto interessante.»

Nina sentì il pizzicore dietro le orecchie. «Perché? Come fa a sapere qual è la più corta senza provarle?»

«Non lo sa in anticipo», disse Themis. «Ma usa un metodo. E il metodo garantisce che quando trova la strada, quella strada è la più breve.» Si girò verso Nina. «Vuoi vedere come funziona?»

Nina aveva già tirato fuori il calibro dalla tasca — il gesto automatico che aveva quando stava per imparare qualcosa di vero. «Mostrami.»

---

## ATTO I — L'Onda che si Allarga

Themis portò Nina al bordo della Mappa Viva e indicò il nodo verde. «Chiama questo START. Quello rosso è FINE. Adesso dimentica per un momento che vuoi arrivare a FINE. Pensa solo a una domanda: chi tocco se faccio *un passo* da START?»

Dalla mappa si sollevò un cerchio di luce: i tre nodi direttamente collegati a START si illuminarono in giallo.

«Questi», disse Nina.

«Esatto. Distanza uno. Ci vuole un arco per raggiungerli.» Themis fece una pausa. «Adesso fai la stessa domanda per ognuno di loro: chi tocco se faccio *un passo in più*?»

Un secondo cerchio si allargò verso l'esterno, più largo del primo, con i nodi successivi che si accendevano in arancione.

Nina capì immediatamente. «Come un sasso nell'acqua.»

«Esattamente così. I cerchi si allargano uno alla volta. Prima tutti quelli a distanza uno, poi tutti quelli a distanza due, poi tre — e avanti. Non salti mai un livello.»

«E quando arrivi a FINE?»

«Quando FINE si accende per la prima volta», disse Themis, «sai due cose: primo, ci sei arrivato. Secondo, il numero di cerchi che hai attraversato è il numero minimo di archi che separano START da FINE. Nessuna strada più corta esiste, perché avresti dovuto trovarlo prima.»

Nina rimase ferma un secondo. «Perché *prima*?»

«Perché il metodo visita i nodi in ordine di distanza crescente. Se FINE fosse raggiungibile con meno passi, sarebbe già apparso in un cerchio precedente. Non è apparso prima, quindi non esiste un cammino più corto.» Themis la guardò. «Non è magia. È ordine.»

> *(Esempio per tutti — il test della sarta: immagina una sarta con un gomitolo aggrovigliato, pieno di nodi in punti diversi. Vuole unire due nodi specifici con il tratto di filo più corto possibile. Non tira a caso: parte dal nodo di partenza, tocca i nodi più vicini — quelli raggiunti con un solo tratto di filo —, poi i vicini dei vicini, e così via. Se trova un'altra strada che passa per più nodi, la scarta. Quello che fa la sarta — avanzare per cerchi di distanza — è esattamente BFS: Breadth-First Search, ricerca in larghezza.)*

---

## ATTO II — Il Nome del Metodo

«Si chiama BFS», disse Themis. «Breadth-First Search. In italiano: ricerca in larghezza.»

«Perché larghezza?»

«Perché si allarga prima di andare in profondità. Invece di seguire una strada fino in fondo e poi tornare indietro, BFS guarda *tutti* i vicini di un nodo prima di passare al livello successivo.» Themis portò Nina davanti alla sezione della mappa con il nodo START illuminato. «Guarda. Il metodo tiene una lista — una coda. Prima entra START. Poi si estraggono i suoi vicini e si mettono in coda. Poi si estraggono i loro vicini. Mai al contrario.»

Nina seguì il movimento dei fili. «Come una fila alla cassa. Chi è arrivato prima esce prima.»

«Preciso. E ogni nodo che si visita viene segnato: *già visto*. Non si torna su un nodo che è già stato visitato.»

«Perché?»

«Perché se ci sei già passato, la strada che hai usato per arrivarci era già la più breve — per costruzione del metodo. Tornarci significherebbe fare più passi, non meno.»

Nina guardò il groviglio di archi nella mappa. «Quindi il grafo non "vede" tutto il percorso in un colpo solo. Lo costruisce passo per passo.»

«Lo costruisce passo per passo», confermò Themis. «E quando tocca FINE, ricostruisce all'indietro: da FINE, chi mi ha passato il segnale? E prima di lui? E prima ancora? Quel filo all'indietro è il cammino minimo.»

Nella mappa, un sottile filo luminoso si tracciò da FINE a START, percorrendo quattro nodi intermedi. Nina lo seguì con gli occhi.

«Quattro passi», disse.

«Quattro archi. Tre nodi intermedi. È il cammino minimo tra i due.»

Nina si girò verso Themis. «E se ci fossero due cammini della stessa lunghezza?»

«BFS ne trova uno. Quale dipende dall'ordine in cui sono stati caricati i vicini. Ma la lunghezza è garantita uguale per entrambi.»

Silenzio. Il filo luminoso restava sospeso nella mappa come una risposta scritta nell'aria.

«C'è però un limite», disse Themis dopo un momento.

Nina aspettò.

«BFS funziona quando tutti gli archi pesano uguale. Un passo è un passo, non importa quale. Ma se un arco "pesa" uno e un altro "pesa" dieci — se alcune strade sono più lunghe o più costose di altre — allora i cerchi non si allargano più in modo uniforme. BFS non basta.»

«Serve un altro metodo.»

«Sì.» Themis non aggiunse altro.

> *(Strato fondo — per il grande: BFS esplora il grafo livello per livello, partendo dal nodo sorgente. Ad ogni passo visita tutti i nodi a distanza d prima di visitarne uno a distanza d+1. La prima volta che raggiunge il nodo destinazione, il cammino è garantito minimo in numero di archi. Questo vale su grafi non pesati o a pesi uniformi. Su grafi con pesi diversi per arco — latenza, costo, distanza reale — BFS non è sufficiente: la correttezza del cammino minimo non è garantita perché un percorso con più archi può pesare meno di uno con meno archi. In quel caso si usa Dijkstra, che estende la stessa logica con una coda prioritaria ordinata per distanza cumulativa, non per numero di livelli.)*

---

## ATTO III — La Strada nel Sistema

Nina rimise il calibro in tasca. «Ma questo», disse, «non vale solo per le mappe.»

«No», disse Themis. «Vale per qualsiasi cosa si possa disegnare come grafo. Codice sorgente: se vuoi sapere come una funzione raggiunge un'altra funzione attraverso le chiamate, stai cercando un cammino. Reti di computer: il pacchetto che viaggia da un punto a un altro segue un cammino. Dipendenze tra componenti: chi chiama chi, e attraverso quanti passaggi.»

«E il sistema fa BFS automaticamente quando chiedi "trovami la strada"?»

«Quando chiedi `find_path(A, B)`, il motore di grafo esegue BFS — o Dijkstra, se gli archi hanno pesi diversi per criticità o latenza. La domanda sembra semplice. Il metodo sotto è preciso.»

Nina guardò di nuovo la mappa. Il filo luminoso era ancora lì, quattro archi, tre nodi intermedi.

«È come non ricordare, ma documentare», disse piano. «Il grafo non *ricorda* il cammino. Lo *ricostruisce* ogni volta, con metodo.»

Themis si fermò. La guardò un secondo più a lungo del solito. «Brava. Hai collegato.»

Non era un complimento per gentilezza. Era la registrazione di un fatto.

---

## CHIUSURA

Sulla Mappa Viva, la casella del Labirinto Tessuto si accese lentamente — un colore caldo, quasi ambra, che partì dal centro e raggiunse i bordi senza fretta.

Nina la guardò colorarsi.

«La prossima casella», disse Themis, «ha una domanda che questa non può rispondere.»

Nina aspettava.

«Hai visto che BFS conta i passi. Ma cosa succede se i passi non valgono tutti uguale? Se il primo arco costa dieci volte il secondo? Il filo non basta più: serve qualcosa che *pesi* le scelte mentre cammina.»

> *Il filo era la risposta giusta — finché tutti i tratti pesavano uguale. Ma nella casella dopo il Labirinto Tessuto, gli archi hanno pesi diversi. E allora BFS si ferma, e deve parlare un'altra voce: quella di un algoritmo che non conta i passi, ma somma i costi. Come fa il grafo a scegliere la strada quando le distanze non sono tutte uguali?*

---

*Provalo tu: prendi un foglio. Disegna 5-6 punti e collegali con linee a caso — non importa quanto è regolare il disegno. Segna un punto START e uno FINE. Adesso colora di giallo tutti i nodi che puoi raggiungere con un solo tratto da START. Poi colora di arancione tutti i nodi raggiungibili in due tratti. Continua finché non raggiungi FINE. Conta quanti livelli hai attraversato: quello è il numero minimo di archi del cammino più breve. Prova poi a segnare il percorso all'indietro: da FINE, chi ti ha passato il colore? Risali fino a START — hai trovato la strada.*

---

<!-- SCENE / KEY-IMAGE (per l'animazione) -->
1. Un grafo con 6-7 nodi disposti a rete irregolare; START verde acceso e FINE rosso scuro ai lati opposti, archi bianchi su sfondo scuro della Mappa Viva.
2. Un'onda di luce che si espande da START per cerchi concentrici — giallo al primo livello, arancione al secondo, con i nodi che si accendono in sequenza ordinata.
3. La sarta con il gomitolo aggrovigliato: le dita seguono il filo toccando i nodi vicini uno alla volta, rifiutando i tratti più lunghi; espressione concentrata, non frettolosa.
4. Il filo luminoso che si traccia all'indietro da FINE a START attraverso quattro nodi, sottile e preciso, mentre gli altri archi restano spenti — il cammino minimo isolato nella rete.
5. La casella del Labirinto Tessuto che si colora di ambra sulla Mappa Viva; accanto, la casella successiva ancora grigia, con i suoi archi etichettati da numeri diversi.

<!-- DIDATTICA -->
**Pietra:** `⟡5` La Grande Mappa (giro 3). *BFS trova il cammino minimo in un grafo non pesato esplorando i nodi per livelli di distanza crescente: la prima volta che raggiunge la destinazione, il cammino è garantito il più breve.*
**Pietre richiamate:** ⟡5 giro 1 (nodi e archi), ⟡5 giro 2 (query al grafo — `find_path`)
**3 strati:** bambino = l'onda che si allarga dal sasso nell'acqua, e il filo della sarta che tocca i vicini in ordine · curioso = BFS visita per livelli, tiene una coda, segna i nodi già visti, ricostruisce il cammino all'indietro · grande = BFS garantisce il cammino minimo in archi su grafi non pesati; su grafi pesati serve Dijkstra con coda prioritaria ordinata per distanza cumulativa
**Cuore:** la curiosità è un superpotere · fai bene le cose vere · gli strumenti, non le risposte
**Aggancio reale:** nel sistema GENESIS/V32, `find_path(A, B)` esegue BFS o Dijkstra (se gli archi sono pesati per criticità/latenza); trova il percorso più breve di dipendenza tra componenti — «chi chiama chi» nel codice sorgente, senza r

## FATTI (per il RAG)
- **FATTO:** EP_N2_38, casella ? (I cammini — come si trova la strada tra due nodi — Approfond) del viaggio Nina v2, regione 5 (LA GRANDE MAPPA).
- BFS (Breadth-First Search) trova il cammino minimo in un grafo non pesato o a pesi uniformi, visitando i nodi per livelli di distanza crescente.
- La visita procede 'per cerchi': dal nodo sorgente si visitano tutti i vicini (distanza 1), poi tutti i vicini dei vicini (distanza 2), e così via.
- Un cammino è una sequenza di archi che collegano il nodo sorgente al nodo destinazione senza ripetere nodi.
- La correttezza di BFS si poggia sul fatto che, se visita i nodi per distanza crescente, la prima volta che raggiunge la destinazione, il cammino è minimo.
- Su grafi con pesi diversi per arco (come latenza o costo), BFS non è sufficiente: serve l'algoritmo di Dijkstra, che estende il principio con una coda prioritaria.
