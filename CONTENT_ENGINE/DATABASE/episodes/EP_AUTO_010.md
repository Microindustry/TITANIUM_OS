---
id: "EP_AUTO_010"
milestone: "Basamento traliccio saldato TIG"
title: "Fondamenta d'acciaio TIG"
sottotitolo: "La struttura che sostiene la precisione"
stagione: "AUTO"
data_evento: "2026-03-22"
tags: ["saldatura", "struttura", "CNC"]
status: "ready"
durata_min: 8
generated: "2026-03-22T18:26:01.175771"
---
<!-- TOC -->

- [Fondamenta dacciaio TIG](#fondamenta-dacciaio-tig)
- [V32 Build Log  Ep. 07: Basamento Traliccio](#v32-build-log-ep-07-basamento-traliccio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Fondamenta d'acciaio TIG

# V32 Build Log — Ep. 07: Basamento Traliccio

---

> "Se questo non tiene a 178 chili di macchina sopra, non è un errore di calcolo — è un errore mio."

---

Era martedì. Le 21:40.

Officina mia, non quella di SCProject. Luce al neon destra che sfarfalla da tre settimane, non l'ho ancora cambiata. Sul banco: profili in acciaio S355, 60x60x4mm, tagliati a misura la settimana prima con il flex. Squadra da carpentiere. Morsetti Bessey da 300mm — quattro. Maschera TIG sul banco, Fronius TT 230i già acceso, gas argon aperto, portata a 12 l/min.

Ho preso la gusset sinistra — piastra triangolare, 150x150x6mm, S355 — e l'ho posizionata al nodo del traliccio. Incrocio tra longherina orizzontale e diagonale a 45°. Ho puntato. Tre punti, 60A, distanza 80mm tra loro. Ho controllato con la squadra. 0.3mm di errore in angolo. Ho battuto piano con il martelletto. Ri-controllato. Zero virgola uno. Accettabile.

Poi ho saldato. TIG, corrente a 95A, tungsteno da 2.4mm, bacchetta ER70S-6 da 1.6mm. Passata di radice prima. Poi il riempimento. Il suono del TIG su acciaio spesso è diverso dal titanio — più pesante, meno cristallino. Il titanio canta. L'acciaio lavora.

---

Prima di quella sera, il basamento era un'idea su FreeCAD e tre fogli A3 sul muro.

Il problema era strutturale — non estetico. Il traliccio deve reggere il portale Y da 47kg in movimento, accelerazioni fino a 800mm/s², più le vibrazioni della fresatura a piena portata. Senza i gusset nei nodi, il traliccio lavora a flessione nei punti peggiori. Con i gusset, i carichi si distribuiscono. Cambia tutto.

Ho simulato in FreeCAD FEM prima. Mesh automatica, carico puntuale da 500N sul nodo critico, vincoli fissi ai quattro piedini. Senza gusset: deformazione massima 0.31mm nel nodo centrale. Con gusset: 0.07mm. Tolleranza di lavoro della V32 è ±0.019mm — il basamento deve starci abbondantemente sotto quella soglia, altrimenti le guide lineari lavorano fuori specifica da subito.

La gusset sinistra era il nodo più carico. L'ho saldata per prima.

---

Questo pezzo — questo specifico triangolo di acciaio a 150x150x6mm — è il primo componente fisico che entra in TITANIUM_OS come oggetto tracciato.

Ho un file: `v32_bom_live.json`. Ogni componente ha un ID. La gusset sinistra è `STR-GUS-L-001`. Quando l'ho saldata, ho aperto il terminale:

```bash
python3 titanium_cli.py update --id STR-GUS-L-001 --status welded --operator MB --timestamp auto
```

TITANIUM_OS ha aggiornato la Kanban board. Config G è passata da `in_progress` a `partial_complete`. Perché Config G ha anche la gusset destra, ancora da fare, e lì c'è il blocker attivo: **manca il mandrino 2.2kW ER20**. Stima ordine: questa settimana. Stima consegna: 8-10 giorni. Stima officina per completare Config G una volta sbloccato: 3 ore.

MIMS entra dopo — quando il basamento sarà finito, i connettori modulari fisici si integrano sui pannelli laterali. Ma serve prima che la struttura portante sia certificata geometricamente. Sto aspettando quel punto.

EVA ha già mandato un reminder a Maria: "Matteo stasera non cena, è in officina." Lei non ha risposto. Sa già.

---

Il traliccio non è bello. È rigido.

## FATTI (per il RAG)

- **FATTO:** Il basamento traliccio V32 è costruito con profili in acciaio S355, sezione 60x60x4mm; i nodi sono rinforzati con gusset triangolari 150x150x6mm in S355.

- **DECISIONE:** Saldatura TIG eseguita a 95A con tungsteno da 2.4mm e bacchetta ER70S-6 da 1.6mm; punti di tack a 60A, tre punti distanziati 80mm, tolleranza angolare accettata a 0.1mm. **LOGICA:** Garantire allineamento geometrico prima della passata di radice e riempimento.

- **FATTO:** Simulazione FEM in FreeCAD (carico puntuale 500N, vincoli fissi ai 4 piedini): deformazione massima nel nodo critico senza gusset = 0.31mm; con gusset = 0.07mm. Tolleranza di lavoro V32 = ±0.019mm.

- **FATTO:** Il portale Y pesa 47kg, si muove con accelerazioni fino a 800mm/s² e il basamento deve sostenere un peso complessivo macchina di 178kg.

- **DECISIONE:** Il primo componente fisico tracciato in TITANIUM_OS è la gusset sinistra, ID `STR-GUS-L-001`, aggiornata via CLI con stato `welded`; la Config G risulta `partial_complete` per blocker attivo: mancanza mandrino 2.2kW ER20 (stima consegna 8-10 giorni, stima completamento post-sblocco 3 ore).

- **PRECISIONE:** Gas argon utilizzato alla portata di 12 l/min durante la saldatura TIG del basamento.
