---
id: "EP_AUTO_013"
milestone: "BOM aggiornato: molle 4xGialle 90N + 2 piastre XY Config G (10 Mar 2026)"
title: "Molle gialle: la precisione che cambia tutto"
sottotitolo: "4 componenti, 90N, una fresatrice trasformata"
stagione: "AUTO"
data_evento: "2026-03-10"
tags: ["cnc", "engineering", "setup-machine", "artigianato-industriale", "system-builder"]
status: "ready"
durata_min: 8
reel_hook: "Ho appena montato quattro molle gialle da 90 Newton sulla mia fresatrice e il risultato è pazzesco. Prima, con le vecchie molle, l'asse XY ballava durante i passaggi veloci, creavo difetti che poi dovevo limmare manualmente. Oggi ho installato la config G con le due piastre dedicate e il sistema è stabile come non lo era mai. Ma la vera scoperta è come questo cambia anche la velocità di lavorazione. Vuoi sapere quanto ho guadagnato solo questa settimana?"
generated: "2026-05-27T11:29:47.118608"
---
<!-- TOC -->

- [Molle gialle: la precisione che cambia tutto](#molle-gialle-la-precisione-che-cambia-tutto)
- [V32  Episodio 14: Config G](#v32-episodio-14-config-g)
  - [Il bivio](#il-bivio)
  - [Connessione al sistema](#connessione-al-sistema)

<!-- /TOC -->


# Molle gialle: la precisione che cambia tutto

# V32 — Episodio 14: Config G

---

> "Le molle gialle reggono 90 newton ciascuna. Quattro. Fanno 360. Se la geometria non torna entro stasera, ordino il mandrino a vuoto."

---

Officina, martedì 10 marzo 2026, ore 21:15.

Ho il piatto della gusset sinistra in mano — acciaio S235, 8mm, tagliato a laser tre settimane fa. La luce fredda del neon batte sul bordo. Apro STATE.json dal telefono con il pollice, una mano sola, l'altra tiene il pezzo contro la luce per vedere le bave.

```bash
nano BRAIN/STATE.json
```

Scrivo: `"milestone": "BOM v2.1 — 4x molla gialla 90N + 2x piastra XY Config G"`. Data. Ora. Fatto.

---

## Il bivio

Prima di Config G, le piastre XY erano Config D.

Config D aveva un problema preciso: il vincolo di appoggio sulla slitta Y non era simmetrico. Quattro molle da 60N — troppo morbide. La ripetibilità andava a ±0.031mm sotto carico laterale. Fuori tolleranza. La V32 vuole ±0.019mm. Non è una preferenza. È il progetto.

Il passaggio a Config G risolve due cose insieme.

Primo: le molle gialle da 90N aumentano la rigidezza dell'accoppiamento senza cambiare ingombro. Stessa sede, stesso diametro esterno. Solo il rateo cambia.

Secondo: la gusset sinistra — quella che sto stimando tre ore di officina — irrigidisce il piano XY in quel punto critico dove il momento flettente era più alto. Ho calcolato il punto di applicazione con un foglio A4 e una riga. Niente FEM per adesso. FEM lo faccio quando ho il mandrino montato e posso validare in dinamica.

Il mandrino 2.2kW ER20 manca ancora. È il blocker. Senza quello la macchina non gira. Ma la meccanica posso finirla lo stesso — e devo, perché quando arriva il mandrino voglio trovare solo connessioni elettriche da fare.

---

## Connessione al sistema

La Config G non è solo meccanica V32.

MIMS al 30% — i connettori modulari che sto sviluppando in parallelo devono sopportare vibrazioni ripetute. Le stesse riflessioni sulle molle le sto portando lì: punto di applicazione del carico, simmetria del vincolo, rateo giusto. Non è casualità. È lo stesso problema con materiali diversi.

VULCAN — la pressa 20 tonnellate — aspetta che la V32 sia operativa. Perché alcune geometrie degli stampi le voglio fresare io, non subappaltarle. Finché la V32 è al 65%, VULCAN è in pausa sulla parte utensili.

TITANIUM_OS registra tutto. Ogni sessione ha un entry in `sessions_log.json`. Questa milestone diventa un nodo: prima e dopo Config G, la BOM è diversa. Chi legge il log tra sei mesi capisce esattamente dove eravamo.

EVA su WhatsApp ha già mandato un promemoria automatico: *"Ordine mandrino — verifica disponibilità fornitore IT"*. È uscito stamattina alle 9:00. Non l'ho impostato io ieri sera — l'avevo impostato dieci giorni fa quando ho visto il lead time.

Il sistema funziona perché l'ho costruito quando stavo bene, non quando stavo dimenticando.

---

La gusset sinistra ha tre ore di officina davanti, il mandrino non c'è ancora, e il numero che conta è ±0.019.
