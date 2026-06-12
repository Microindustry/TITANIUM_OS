---
id: "EP_AUTO_005"
milestone: "Asse X assemblato (guide+vite+servo)"
title: "Asse X: le guide parlano"
sottotitolo: "178 kg di precisione. Quando l'hardware diventa software."
stagione: "AUTO"
data_evento: "2026-03-22"
tags: ["V32", "CNC", "assembly", "precision", "milestone"]
status: "ready"
durata_min: 7
generated: "2026-03-22T17:47:03.008149"
---

# Asse X: le guide parlano

> *"Quando chiudi il ultimo bullone e la guida scorre senza attrito, capisci che il pezzo è vivo."*

Stamattina ho finito l'asse X della V32. Guide THK 25 mm, vite Hiwin a ricircolo da 16 mm, servo Nema 34 con drive Leadshine. Tre ore di assembly, due ore di test geometrico.

La sequenza è stata precisa: prima il basamento della guida sinistra, poi gli spacer di allineamento (±0.05 mm), montaggio della vite con precarico a 2 Nm, accoppiamento motore tramite giunto elastico, calibrazione del fine corsa con encoder. Standard, ma non banale.

Cosa è successo veramente? Ho trasformato 8 chilogrammi di acciaio e componenti in uno **stadio di movimento controllato**. Non è solo meccanica. È il primo sensore della macchina—il punto dove i comandi software incontrano la realtà fisica. Ogni movimento dell'asse X verrà registrato, misurato, corretto.

Questo mi serve per V32, certo. Ma il valore sta altrove.

La V32 è il prototipo. Quando sarà completata al 100%, diventerà un **nodo dentro TITANIUM_OS**. L'asse X non farà solo fresare: farà misura, feedback, adattamento. Ogni passata di utensile genererà dati. Quei dati alimenteranno il modello cognitivo del sistema—la macchina imparerà dagli scarti, dalla finitura, dalla geometria reale versus quella teorica.

Vedi il collegamento? MIMS (i connettori modulari) a 30% di sviluppo, sono qui per questo. Quando avrò altri assi pronti—Y, Z, mandrino—dovrò pluggarli senza rifare il wiring, senza ridefinire i protocolli. L'asse X è il primo test di quella modularità.

E il blocco attuale? Il mandrino 2.2 kW ER20 non è arrivato. Non posso procedere oltre fino a quando non lo ordino. Significa che **il valore di questa assembly non è bloccato**—procedo parallelo. Domani Config G, il gusset sinistro. Tre ore di fresatura, ma con gli strumenti manuali, nelle tre ore di officina che ho planificato.

Il motivo per cui questo momento conta non è la precisione—quella è scontata, è specifica tecnica. Il motivo è che ho chiuso il primo **ciclo di feedback reale**. Ho disegnato, ho costruito, ho testato, ho imparato dove la realtà devia dal CAD di 0.3 mm (la vite aveva precarico asimmetrico, le guide avevano un'usura micrometrica su un lato).

Questa informazione non la ricevo via email. La sento con le mani. E ora è codificata nel sistema.

Quando inizierò il training di TITANIUM_OS con i dati della V32, avrò già settimane di esperienza operativa. Non partirò da zero. Partirò dalla realtà assemblata.

Asse X: vivo. Sistema: respirando.

## FATTI (per il RAG)

- **FATTO:** L'asse X della V32 è composto da guide THK 25 mm, vite Hiwin a ricircolo da 16 mm, servo Nema 34 con drive Leadshine.

- **FATTO:** Il precarico della vite è stato impostato a 2 Nm; gli spacer di allineamento hanno tolleranza ±0.05 mm.

- **FATTO:** Durante il test geometrico è stata rilevata una deviazione di 0.3 mm tra il CAD e la realtà fisica, causata da precarico asimmetrico della vite e usura micrometrica asimmetrica delle guide.

- **DECISIONE:** L'asse X è progettato come nodo dati: ogni passata utensile genererà dati (misura, feedback, adattamento) da alimentare al modello cognitivo di TITANIUM_OS. **LOGICA:** La V32 è il prototipo operativo su cui costruire il training del sistema AI, partendo da esperienza reale e non da dati sintetici.

- **FATTO:** MIMS (connettori modulari) è al 30% di sviluppo; la sua funzione è permettere il plug-in di nuovi assi (Y, Z, mandrino) senza rifare wiring o ridefinire protocolli.

- **FATTO:** Il blocco corrente sull'asse X è la mancanza del mandrino 2.2 kW ER20, non ancora ordinato; l'attività parallela pianificata è la fresatura del gusset sinistro (Config G), stimata 3 ore con strumenti manuali.
