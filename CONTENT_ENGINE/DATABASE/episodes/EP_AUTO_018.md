---
id: "EP_AUTO_018"
milestone: "Dashboard v5.1 — CommandBar Ctrl+K + storieData v2.0 (10 ep rich) + proxy fix (27 Mag 2026)"
title: "Dashboard che comanda tutto: Ctrl+K"
sottotitolo: "CommandBar, storie ricche e la fix che cambia tutto"
stagione: "AUTO"
data_evento: "2026-05-27"
tags: ["dashboard", "automation", "cnc", "artigianalità-digitale", "system-building"]
status: "ready"
durata_min: 8
reel_hook: "Tre settimane fa controllavo la fresatrice con sette click diversi. Adesso premo Ctrl+K e ho tutto sotto le dita: parametri CNC, log delle storieData, stato della pressa VULCAN. Non è magia, è architettura. Abbiamo risolto anche quel bug del proxy che ci mangiava tre ore di downtime al mese. Il dato che non ti aspetti? Il tempo di setup è sceso da dodici minuti a trentasei secondi. Come cambierebbe il tuo flusso di lavoro se avessi il controllo totale con una scorciatoia?"
generated: "2026-05-27T11:32:13.899896"
---

# Dashboard che comanda tutto: Ctrl+K

# Episodio 23 — CommandBar, Proxy e la Gusset Sinistra

---

> "Il Ctrl+K funziona. Il proxy funziona. Ora posso tornare in officina."

---

Martedì 27 maggio, 23:14.
Schermo con tre terminali aperti.
Uno ha `npm run dev`. Uno ha il log del proxy Python. Uno ha `tail -f BRAIN/STATE.json`.

Digito `Ctrl+K`.

La CommandBar appare.
Scrivo "v32". Mi restituisce lo stato corrente del progetto, i blocker, il completamento: 65%.
Tre secondi. Prima ci volevano quattro click e due file aperti.

Questo è il milestone 27 maggio.

---

**Il problema era semplice e stupido.**

La dashboard parlava con il backend Python sulla porta 8000.
Il frontend React era sulla 3000.
CORS bloccava tutto.

Ho perso quaranta minuti a leggere stack trace inutili prima di capire che non era un bug — era una configurazione mancante.
Un proxy. Tre righe in `vite.config.ts`.

```ts
proxy: {
  '/api': 'http://localhost:8000'
}
```

Fatto.
Questo è il tipo di problema che con ADHD ti mangia un pomeriggio intero se non hai un sistema.
Avevo scritto in STATE.json "proxy da configurare" tre sessioni fa.
Non l'avevo mai fatto.
Oggi l'ho fatto.

---

**La storieData v2.0 è diversa.**

Prima ogni episodio era un oggetto piatto: titolo, data, testo.
Ora è strutturato. Dieci episodi rich — ogni uno con milestone, contesto, blocker attivo, percentuale completamento progetto.

Il formato conta.
Quando la dashboard legge `blockers_attivi: ["Mandrino 2.2kW ER20 — da ordinare"]` lo può mostrare in cima, evidenziato, rosso.
Non devo cercarlo. È lì.

TITANIUM_OS adesso ha una memoria leggibile a colpo d'occhio.

---

**Il bivio sta qui.**

Prima della v5.1: aprivo tre file, cercavo a mano, perdevo il filo.
Dopo: `Ctrl+K` → scrivo quello che cerco → lo trovo.

È la stessa differenza tra cercare un utensile in un cassetto disordinato e averlo appeso sulla rastrelliera con la sagoma disegnata sotto.
L'officina fisica la organizzo così da anni.
Ho applicato la stessa logica al software.

Ci ho messo troppo tempo a farlo. Ora so che non avrei dovuto aspettare.

---

**Come si connette al resto.**

La V32 è al 65%.
Manca il mandrino — 2.2kW, attacco ER20, da ordinare questa settimana.
Manca la gusset sinistra — stimo 3 ore di officina, tubo 40x40, due giunti a T, saldatura MIG non TIG questa volta perché è strutturale non estetica.

Quando finisco la gusset, il telaio è chiuso su tre lati.
Posso montare la tavola Y.
Posso testare il movimento lineare.

MIMS è al 30% — i connettori fisici aspettano che la fresatrice giri per produrre i prototipi.
VULCAN aspetta MIMS per testare i polimeri sotto pressa.

È una catena. Un blocco rallenta tutto.
La dashboard v5.1 mi mostra la catena intera in una schermata.

---

Ordino il mandrino domani mattina, poi vado in officina.
