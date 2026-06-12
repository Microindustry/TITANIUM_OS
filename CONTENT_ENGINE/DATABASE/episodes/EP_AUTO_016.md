---
id: "EP_AUTO_016"
milestone: "Dashboard v5.0 — Zustand + TanStack Query + navigazione guidata (27 Mag 2026)"
title: "Dashboard che parla il tuo linguaggio"
sottotitolo: "Zustand + Query: la rivoluzione del flusso dati"
stagione: "AUTO"
data_evento: "2026-05-27"
tags: ["dashboard", "frontend", "Zustand", "TanStack Query", "navigazione", "state management", "CNC", "artigiano tech"]
status: "ready"
durata_min: 8
reel_hook: "Guarda, fino a tre settimane fa la dashboard della fresatrice mi mandava il dato ma non sapevo se era aggiornato davvero. Aspettavo, ricaricavo, perdevo minuti su minuti. Poi ho collegato Zustand per la cache locale e TanStack Query per il sincronismo real-time. Ora apro il pannello e il dato c'è già, fresco, pronto. Ma aspetta, perché i dati di production sono ancora fermi al caricamento precedente? Scopri come l'ho risolto."
generated: "2026-05-27T11:31:12.038949"
---
<!-- TOC -->

- [Dashboard che parla il tuo linguaggio](#dashboard-che-parla-il-tuo-linguaggio)
- [Dashboard v5.0  Quando il sistema smette di mentire](#dashboard-v50-quando-il-sistema-smette-di-mentire)
  - [Il bivio](#il-bivio)
  - [Connessione al sistema](#connessione-al-sistema)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Dashboard che parla il tuo linguaggio

# Dashboard v5.0 — Quando il sistema smette di mentire

---

> "Prima mi diceva che tutto andava bene. Mentiva."

---

Officina, 27 maggio 2026, 23:15.

Il laptop è sul banco di lavoro. Accanto: la gusset sinistra in attesa — alluminio 6082, grezzo, ancora da fissare al telaio della V32. Non la tocco stasera. Stasera è software. Digito `npm run dev`, aspetto il bundle. Il cursore lampeggia. La dashboard si apre.

Per la prima volta in mesi, vedo cosa sta succedendo davvero.

---

## Il bivio

Il problema non era la UI. Era lo stato.

Le versioni precedenti della dashboard usavano `useState` locale sparso su dodici componenti. Ogni widget sapeva solo i fatti suoi. Chiedevi allo stato della V32 — rispondeva. Chiedevi a MIMS — rispondeva qualcosa di diverso, aggiornato venti secondi prima. I dati non si parlavano. La dashboard sembrava coerente ma era un teatro.

Ho scoperto che tenevo due versioni del reality in memoria: quella sullo schermo e quella reale in officina. Divergevano sempre. Con ADHD, quella divergenza è veleno. Non sai da dove ripartire.

Zustand risolve la prima metà: un unico store globale, sincrono, senza Redux hell. Scrivo `useV32Store()` in qualsiasi componente — ho sempre lo stesso dato. Nessuna prop drilling. Nessuna copia fantasma.

TanStack Query risolve la seconda metà: le chiamate al backend Python non sono più fuochi e dimentica. Sono query con cache, retry, `staleTime` configurato. Se il server non risponde — lo so, vedo lo stato `error`, non un silenzio opaco. Il blocco attivo di stasera è scritto lì: **mandrino 2.2kW ER20 — da ordinare.** Non è nascosto in un commento su Notion. È nella dashboard, è nello stato, è reale.

---

## Connessione al sistema

La V32 è al 65%. La gusset sinistra aspetta tre ore di officina. Ma quelle tre ore funzionano solo se so esattamente dove ero rimasto. `BRAIN/STATE.json` mi dice il contesto. La dashboard v5.0 lo rende visibile in tempo reale — non a fine sessione quando ho già dimenticato.

TITANIUM_OS adesso ha una spina dorsale leggibile. Il tab navigazione guidata è la cosa che cambia il flusso: non apro più la pagina sbagliata al momento sbagliato. Il sistema mi porta dove devo essere. Step corrente, step successivo, blocker evidenziato in rosso. Mandrino mancante — rosso. Gusset in attesa — arancio. Fresatura asse Z — verde quando ci sarò.

MIMS è al 30% e i connettori modulari hanno bisogno di specifiche di montaggio tracciabili. Zustand mi permette di agganciare il modulo MIMS allo stesso store senza rifondare niente — è una slice separata, stessa architettura. Stesso discorso per VULCAN: quando caricherò le ricette polimeri, la dashboard le vedrà. Nessuna app parallela. Un sistema unico.

EVA per Maria gira su WhatsApp, lato Python. La dashboard non la gestisce direttamente — ma quando EVA scrive in `STATE.json`, TanStack Query legge il cambiamento entro trenta secondi. Il loop è chiuso.

---

La dashboard adesso non mi racconta storie.

## FATTI (per il RAG)

- **FATTO:** Dashboard EVA/TITANIUM_OS aggiornata alla versione 5.0 in data 2026-05-27, con stack frontend basato su Zustand (state management globale) + TanStack Query (sincronismo dati backend).

- **DECISIONE:** Abbandonato `useState` locale distribuito su 12 componenti in favore di un unico store globale Zustand (`useV32Store()`), per eliminare dati divergenti tra widget. **LOGICA:** Con ADHD, la divergenza tra dato a schermo e realtà in officina rendeva impossibile sapere da dove ripartire.

- **FATTO:** TanStack Query gestisce le chiamate al backend Python con cache, retry e `staleTime` configurato; lo stato `error` è visibile esplicitamente invece di produrre silenzio opaco.

- **FATTO:** La V32 è al 65% di completamento al 27/05/2026; blocker attivo identificato: mandrino 2.2kW ER20 — da ordinare (evidenziato in rosso nella navigazione guidata).

- **FATTO:** EVA (WhatsApp/Python) scrive su `BRAIN/STATE.json`; TanStack Query rileva il cambiamento entro 30 secondi, chiudendo il loop senza dashboard dedicata.

- **FATTO:** MIMS è al 30%; l'integrazione nello store Zustand è prevista come slice separata sulla stessa architettura, senza rifondare il sistema esistente.
