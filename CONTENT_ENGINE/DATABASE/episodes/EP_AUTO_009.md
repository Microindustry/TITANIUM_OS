---
id: "EP_AUTO_009"
milestone: "Componenti V32 presenti (foto 13 Feb 2026)"
title: "Componenti V32 in Campo"
sottotitolo: "La fresatrice prende forma davanti all'obiettivo"
stagione: "AUTO"
data_evento: "2026-03-22"
tags: ["hardware", "CNC", "milestone", "progress"]
status: "ready"
durata_min: 8
generated: "2026-03-22T18:25:24.497080"
---

# Componenti V32 in Campo

# V32 — 13 Febbraio 2026

> "Ho 178 chili di macchina in testa e ancora non ho il mandrino. Ma i pezzi ci sono. Sono qui."

---

Erano le 11:20.

Officina. Luce fredda al neon, quella che non mente.

Ho appoggiato i componenti sul banco uno per uno. Non per fare una foto bella — per contarli. Testa, portautensili, guide lineali Hiwin serie HG, viti a ricircolo di sfere C5, piastre in acciaio C45 lavorate a spessore. Il telaio è lì. Reale. Pesa.

Ho scattato la foto alle 11:34. Tredici febbraio duemilaventisei.

Era un inventario fisico, non una celebrazione.

---

**Cosa andava male prima.**

Da tre settimane avevo il progetto aperto su tre monitor e niente in mano. TITANIUM_OS girava in staging, i config file si moltiplicavano — `v32_axis_config.json`, `spindle_params.yaml`, `toolchange_sequence.py` — ma in officina c'era solo ferro grezzo e un disegno tecnico appeso al muro con il nastro adesivo.

L'ADHD lavora così: se non c'è un oggetto fisico davanti, il progetto non esiste davvero. Esiste come ansia. Come lista infinita. Come task aperti nel terminale mentale che non si chiudono mai.

La foto del 13 febbraio era il mio checkpoint. Il sistema che mi dico di avere mi chiedeva: *prova che esiste*.

Esisteva.

---

**Config G: gusset sinistra.**

Tre ore di officina stimate. Forse tre e mezza — dipende da come si comporta la fresa a candela Ø8 sul C45 quando arrivi sullo smusso a 45°. Quella geometria lì porta tensione nell'angolo. Se sbagli l'approccio, il pezzo lavora male e la rigidità del telaio ne risente. ±0.019mm di tolleranza globale non si ottiene se il primo giunco cede.

Ma c'è il blocker.

Manca il mandrino. 2.2kW, attacco ER20, refrigerazione ad aria, inverter Huanyang già configurato. Senza quello non monto, non testo, non chiudo l'asse Z in configurazione reale.

L'ordine non è partito ancora. Non perché non sappia cosa ordinare — so esattamente cosa ordinare. È che ogni volta che apro la pagina fornitore c'è un'altra cosa urgente davanti. EVA che aspetta un webhook. MIMS che ha un tolleranza di accoppiamento da rivedere. Maria che mi chiede una cosa per Vita Natura e ha ragione a chiederla.

Il mandrino lo ordino oggi. Scritto qui. Pubblico.

---

**Come si innesta nel sistema grande.**

V32 non è solo una fresatrice. È il banco di test fisico di TITANIUM_OS.

Quando il mandrino gira, TITANIUM_OS legge RPM in real-time, li confronta con `spindle_params.yaml`, decide se la sequenza di toolchange è sicura, logga tutto in un database locale che poi sincronizza. React sul frontend, Python sul backend, WebSocket tra i due. Il codice gira già — `python manage.py runserver` alle 23:00 sul laptop vicino al banco è la normalità.

MIMS si aggancia dopo: i connettori modulari fisici che sto progettando nascono dalla necessità di questo sistema. Ogni modulo di V32 deve potersi smontare e rimontare senza ricalibrare da zero. Quella filosofia viene direttamente dal titanio che ho saldato TIG per SCProject anni fa — dove un giunto sbagliato sul collettore di scarico ti costa un weekend di gara.

VULCAN aspetta V32 per avere un banco lavorazioni interno. La pressa da 20 tonnellate e i polimeri hanno bisogno di pezzi fresati con tolleranze che adesso pago fuori.

Tutto dipende da tutto.

---

Il mandrino lo ordino. I gusset aspettano. La macchina esiste.
