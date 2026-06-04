<!-- TOC -->

- [EP_AUTO_41  Milestone](#epauto41-milestone)
    - [MICROINDUSTRY  OmniParser weights migrati](#microindustry-omniparser-weights-migrati)
- [IL SISTEMA  Episodio: MICROINDUSTRY  OmniParser Weights Migrati](#il-sistema-episodio-microindustry-omniparser-weights-migrati)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema che Non Si Vede dal Budget](#atto-i-il-problema-che-non-si-vede-dal-budget)
  - [ATTO II  159 Elementi, Zero Chiamate](#atto-ii-159-elementi-zero-chiamate)
  - [ATTO III  Cosa Si Sblocca Adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_41 — Milestone
### "MICROINDUSTRY + OmniParser weights migrati"

---
id: EP_AUTO_41
title: "MICROINDUSTRY + OmniParser weights migrati"
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
milestone_originale: "MICROINDUSTRY + OmniParser weights migrati"
---

# IL SISTEMA — Episodio: MICROINDUSTRY + OmniParser Weights Migrati

---

## COLD OPEN

La settimana scorsa abbiamo posato le fondamenta digitali — Python 3.11, Node.js, gh CLI, tutto in fila. E ho chiuso dicendo che le fondamenta non si vedono quando l'edificio è in piedi. Si vedono quando trema. Bene. Questa settimana l'edificio ha tremato, e le fondamenta hanno tenuto. Parliamo di cosa è successo dopo.

---

## ATTO I — Il Problema che Non Si Vede dal Budget

Devo spiegarti una cosa che sembra tecnica ma è sostanzialmente un problema di soldi e di controllo.

TITANIUM_OS vive su GitHub. Il repository si chiama, appunto, `github.com/Microindustry/TITANIUM_OS`. Quel nome — Microindustry — non è un dettaglio casuale. È l'identità sotto cui sto costruendo tutto: la fresatrice V32 al 65%, GENESIS all'incirca al 70%, MIMS fermo in attesa della pressa, VULCAN ancora da definire, e Vita Natura attivo al 40%. Un ecosistema che esiste prima in codice, poi in metallo.

Il problema è questo: quando costruisci automazione su un'interfaccia grafica — un gestionale, un pannello di controllo, qualsiasi cosa abbia bottoni, campi, finestre — hai bisogno che qualcosa "veda" quello che vede l'occhio umano. Tradizionalmente hai due strade. Prima strada: le API. Chiami il software direttamente, passi dati strutturati, ricevi risposte. Pulito, veloce, affidabile. Il problema è che le API costano. Non sempre in senso economico diretto, ma in termini di accesso: o il fornitore te le dà, o non te le dà. E nella mia filiera — tra gestionali per centri estetici, software di produzione, interfacce di macchine — ci sono sistemi che non hanno API aperte. Punto. Seconda strada: i modelli di visione cloud. Mandi uno screenshot a un servizio, lui ti dice cosa c'è. Funziona. Ma ogni chiamata ha un costo. Moltiplica per le sessioni di EVA che gestisce Vita Natura, moltiplica per le automazioni di GENESIS, e arrivi a un numero che non sta in un budget da taverna. Un numero che non voglio pagare a tempo indeterminato per qualcosa che posso risolvere in locale.

Quindi il problema reale non era tecnico. Era di architettura economica del sistema.

---

## ATTO II — 159 Elementi, Zero Chiamate

OmniParser è un modello open source di Microsoft. Lo dico chiaramente perché "Microsoft open source" suona strano, ma è quello che è. Prende uno screenshot, lo processa, restituisce una lista strutturata di elementi UI: posizione sullo schermo, tipo di elemento, testo associato. Gira in locale. Non chiama nessun server. Non manda dati fuori. Zero costo per inferenza, zero dipendenza da connessione, zero costo variabile per volume.

Il punto critico — quello che ha richiesto lavoro vero — non è stato installarlo. È stato migrare i weights, cioè i pesi del modello, dentro la struttura di TITANIUM_OS in modo che fossero disponibili offline, versionati, e riproducibili su qualsiasi macchina del sistema. I weights di un modello di visione non sono piccoli. Non sono un file di configurazione che metti in una cartella e sei a posto. Devi decidere dove vivono nell'architettura del repository, come vengono caricati, se vengono inclusi nel versioning o gestiti separatamente, e come si integrano con il layer che chiamerai da GENESIS o da EVA quando hai bisogno di analizzare un'interfaccia.

La decisione che ho preso è stata di tenerli fuori dal versioning di Git — perché Git non è fatto per file binari pesanti — ma dentro una struttura referenziata dal repository, con un processo di download e verifica automatizzato che fa parte del setup di TITANIUM_OS. Questo significa che chiunque cloni `github.com/Microindustry/TITANIUM_OS` su una nuova macchina ha uno script che sa dove andare a prendere i weights, li verifica tramite hash, e li posiziona dove il sistema se li aspetta. Riproducibile. Documentato. Offline dal secondo avvio in poi.

Il risultato concreto: OmniParser su un'interfaccia standard restituisce mediamente 159 elementi UI strutturati. Centocinquantanove. Bottoni, label, campi input, icone, pannelli. Tutto con coordinate, tutto con tipo, tutto con testo. Senza una singola chiamata API. Senza un singolo centesimo di costo variabile. Questo è il tipo di infrastruttura che cambia le equazioni economiche di un progetto.

E questo si collega direttamente a qualcosa che stavo portando avanti in parallelo sul fronte fisico: i print di debug nel codice sono scesi da 342 a 131 su 34 file migrati. Non è pulizia estetica. È che ogni print inutile in un sistema di produzione è rumore che maschera il segnale. Quando GENESIS deve interpretare output di macchina in tempo reale, o quando EVA deve processare dati di Vita Natura, il codice deve essere silenzioso tranne quando ha qualcosa di importante da dire. Stessa logica del modello visione: zero overhead inutile.

---

## ATTO III — Cosa Si Sblocca Adesso

Con OmniParser integrato e i weights migrati, GENESIS può adesso leggere interfacce grafiche senza dipendere da API esterne. Questo sblocca un layer di automazione che prima era condizionale — "funziona se il fornitore ci dà accesso" — e lo rende incondizionato. Non chiedo più il permesso al software per leggerlo.

Per Vita Natura e il modulo EVA, questo è diretto: il centro estetico usa software gestionali che non hanno un'API pubblica utilizzabile. Adesso EVA ha uno strumento per interagire con quelle interfacce in modo strutturato. Al 40% di completamento, Vita Natura aveva ancora questo collo di bottiglia aperto. Adesso è chiuso.

Per V32 al 65%, il legame è più indiretto ma esiste. La fresatrice ha un controller. Il controller ha un'interfaccia. Quando il sistema di supervisione deve leggere stati, parametri, allarmi, la visione locale è un'opzione reale. Non è il canale primario — il primario è il protocollo diretto — ma è il fallback robusto quando il protocollo primario non è disponibile o non è stato ancora implementato su quella specifica macchina.

Il prossimo passo fisico è già definito: saldare 4 gusset da 200 mm sulla colonna Z sinistra di V32. Config G, rinforzi colonne Z e U. La macchina esiste nello spazio fisico, non solo nel repository. E ogni settimana i due mondi si avvicinano: il codice diventa più solido, il metallo prende forma. Il target del capannone è luglio 2030. Mancano anni, ma la distanza si misura in milestone, non in calendario.

MIMS è ancora fermo in attesa della pressa. Quella dipendenza non è risolta da software. VULCAN deve nascere. Ma il sistema che li governa tutti — TITANIUM_OS, su GitHub, sotto il nome Microindustry — adesso ha un paio di occhi che funzionano senza chiedere nulla a nessuno.

---

## CHIUSURA

*Un sistema autonomo non è quello che non dipende da niente. È quello che ha scelto consapevolmente da cosa dipendere — e ha eliminato tutto il resto.*