<!-- TOC -->

- [EP_AUTO_37  Milestone](#epauto37-milestone)
    - [Migrazione PC fisso (DESKTOP-IFACE2R) completata  02/06/202](#migrazione-pc-fisso-desktop-iface2r-completata-0206202)
- [Il Sistema  Episodio: Il Cervello Fisso](#il-sistema-episodio-il-cervello-fisso)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema che Non Sembrava un Problema](#atto-i-il-problema-che-non-sembrava-un-problema)
  - [ATTO II  Taverna, 1070 Ti, e un File da un Gigabyte](#atto-ii-taverna-1070-ti-e-un-file-da-un-gigabyte)
  - [ATTO III  Cosa Cambia Adesso](#atto-iii-cosa-cambia-adesso)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_37 — Milestone
### "Migrazione PC fisso (DESKTOP-IFACE2R) completata — 02/06/202"

---
id: EP_AUTO_37
title: "Migrazione PC fisso (DESKTOP-IFACE2R) completata —"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-06-03
data_generato: 2026-06-03
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Migrazione PC fisso (DESKTOP-IFACE2R) completata — 02/06/2026"
---

# Il Sistema — Episodio: "Il Cervello Fisso"
*Migrazione DESKTOP-IFACE2R completata — 02/06/2026*

---

## COLD OPEN

L'episodio scorso chiudevo con una frase secca: una mappa che non ti dice dove sei fermo è solo decorazione. Bene. Adesso ti dico dove ero fermo io: su un portatile che faceva tutto, mal, ovunque, senza continuità. Oggi ti racconto come ho messo un cervello fisso sotto il pavimento della casa.

---

## ATTO I — Il Problema che Non Sembrava un Problema

Lasciami spiegare la situazione reale, perché dall'esterno sembra una cosa banale: "hai spostato dei file su un altro computer". No. Non è quello.

Il Getac — il portatile da campo che uso in officina, sul banco, davanti alla fresatrice — stava portando troppa roba. Era il terminale mobile, ma stava diventando anche il server dei ragionamenti, il posto dove giravan i modelli, il posto dove tenevo lo stato del sistema. Ogni volta che lo spegnevo o lo portavo fuori rete, il Sistema si fermava. Non perché ci fosse un errore — perché non c'era continuità fisica. Un artigiano industriale non può permettersi che il cervello del progetto si spenga quando esce a prendere un caffè.

Il punto di rottura l'ho toccato quando ho capito che GENESIS era al 70% e non potevo lasciarlo girare in background su una macchina mobile. GENESIS è automazione — è codice che deve rispondere, che deve essere raggiungibile, che deve essere lì quando chiami. Lo stesso vale per EVA, che è il modello di gestione di Vita Natura: se il centro estetico ha un'operatrice che manda un messaggio su WhatsApp e il sistema non risponde perché il portatile è in standby in officina, non hai un sistema. Hai un'illusione di sistema.

Poi c'era il numero che mi pesava davvero: V32 al 65%. La fresatrice CNC è il cuore di tutto — è il pezzo fisico, meccanico, reale del progetto. Ma attorno alla V32 ho bisogno di calcoli, simulazioni, log di lavorazione. Ho bisogno che quando mando un programma alla macchina, dall'altra parte ci sia qualcosa che registra, che risponde, che tiene traccia. Con un portatile mobile questo ciclo si spezza ogni volta che cambio stanza.

Quindi il problema non era "ho bisogno di un computer più potente". Il problema era: ho bisogno di un nodo fisso, 24 ore su 24, 7 giorni su 7, con una GPU decente, in un posto che non si sposta.

---

## ATTO II — Taverna, 1070 Ti, e un File da un Gigabyte

Il posto era già lì. La taverna. Sotto casa, temperatura costante, corrente dedicata, nessuno che ci passa. Ho preso il PC fisso — DESKTOP-IFACE2R — con la sua GTX 1070 Ti, e l'ho configurato come nodo centrale del Sistema.

Il piano era preciso: DESKTOP-IFACE2R diventa il cervello 24/7. Il Getac rimane il terminale mobile, ma connesso via Tailscale. Tailscale è la parte che risolve il problema di rete senza aprire porte sul router, senza VPN aziendale, senza configurazioni complicate: crei una rete privata virtuale tra i tuoi dispositivi, punto. Dal Getac in officina mi connetto al fisso in taverna come se fossero sulla stessa scrivania.

Ho preparato un kit su chiavetta — tutto quello che serve per rimettere in piedi la macchina da zero: configurazioni, variabili d'ambiente, dipendenze, il file CONFIG_PC_FISSO_24H.txt con la sequenza esatta di setup. Non è documentazione per altri. È documentazione per me tra sei mesi quando devo ricostruire l'ambiente e non voglio passare tre ore a ricordarmi perché avevo scelto quella porta invece di quella.

Poi è arrivato il blocco. Push su GitHub bloccato perché c'era un file da 1 GB nel repository. Non un file utile — un artefatto, qualcosa che si era accumulato durante le sessioni di sviluppo. GitHub non accetta file sopra i 100 MB senza LFS, e io avevo pushato senza controllare. Risultato: il repository bloccato, la cronologia sporca, il push rifiutato.

La decisione è stata semplice: non risolverlo a caldo. Pulire a freddo. Significa: prendo il repository, faccio il rebase della storia, rimuovo il file con git filter-branch o BFG Repo Cleaner, forzo il push pulito. Non è una cosa da fare di fretta mentre stai anche configurando una macchina nuova. L'ho segnato come task aperto, ho continuato con la migrazione, e il problema del repository lo risolvo in una sessione dedicata. Questa è una decisione tecnica precisa: non blocco la migrazione per un problema di repository. Separo i problemi, risolvo in ordine.

La 1070 Ti non è l'ultima generazione — è una scheda del 2017 — ma per quello che mi serve adesso va bene. Gira i modelli locali, supporta CUDA per le operazioni che ne hanno bisogno, consuma meno di una scheda moderna e la taverna non diventa una sauna. Quando V32 sarà al 100% e inizierò a fare simulazioni pesanti, valuterò un upgrade. Adesso è una scelta consapevole: non sovradimensionare l'hardware finché non so esattamente quale carico devo sostenere.

Lo stato del sistema in quel momento: V32 al 65% con il blocco reale del mandrino da 2.2kW ER20 ancora da ordinare. MIMS al 30%, in attesa della pressa — VULCAN — che è il collo di bottiglia fisico per i connettori modulari. GENESIS al 70%, che stava diventando il beneficiario principale di questa migrazione. VITA_NATURA al 40%, con EVA che aspettava un ambiente stabile per il pilot su WhatsApp. IDENTITY al 50%.

Tutto questo viveva nel RIAVVIO_SESSIONE.txt e nel BRAIN/STATE.json — i due file che tengono la memoria del sistema tra una sessione e l'altra. Con il fisso in taverna, questi file adesso hanno una casa permanente. Non si spostano. Non vanno in standby. Sono lì.

---

## ATTO III — Cosa Cambia Adesso

La migrazione completata il 2 giugno 2026 non è una milestone estetica. Cambia tre cose concrete.

Prima: GENESIS può girare continuo. L'automazione ha un nodo fisso su cui appoggiarsi. Questo sblocca il prossimo step di sviluppo — non posso costruire un sistema di automazione industriale su un computer che si sposta.

Seconda: EVA ha un server. Il pilot WhatsApp per Vita Natura — che era in lista come thread aperto — adesso ha l'infrastruttura sotto. Prima mancava il posto fisico dove far girare il servizio. Adesso c'è. Posso procedere.

Terza, e forse la più importante: io posso portare il Getac in officina, lavorare sulla V32, prendere misure, fare test sul mandrino quando arriva, e sapere che dall'altra parte c'è qualcosa che registra e risponde. Il cervello non si sposta con me. Resta fisso. Io mi muovo, il sistema no.

Il prossimo passo immediato è doppio: ordinare il mandrino 2.2kW ER20 — che è il blocker fisico sulla V32 — e risolvere il push GitHub a freddo. Due problemi separati, due sessioni separate, nessuna interferenza.

I silent blocks v.A vs v.B sulla fresatrice restano aperti. È una decisione che prendo solo con il mandrino in mano, non prima.

---

## CHIUSURA

*Un cervello mobile è uno strumento. Un cervello fisso è un'infrastruttura. E un artigiano che confonde i due non sta costruendo un sistema — sta portando tutto con sé e chiamandolo autonomia.*

---