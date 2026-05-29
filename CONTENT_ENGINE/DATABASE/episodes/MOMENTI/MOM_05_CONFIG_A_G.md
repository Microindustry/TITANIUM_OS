# MOMENTO — Config A→G
### "Sette configurazioni per trovare quella giusta"

**Formato:** Momento breve | 5-7 min | Inseribile tra S1_02 e S1_03
**Data:** febbraio → maggio 2026
**Fonte:** V8_DELTA.md + STATE.json + sessioni V32

---

Config G non è la prima configurazione. È la settima.

A→B→C→D→E→F→G. Sette versioni della stessa architettura, ognuna con una ragione per esistere e una ragione per essere superata.

Config A era il piano originale: guide Z sulle colonne, portale fisso, piastra porta-mandrino standard. Pulito sulla carta. Problematico nella realtà — le colonne a 40x40 non reggevano la rigidità necessaria per IT6 con carico dinamico.

Config B aggiungeva rinforzi laterali. Riduceva il problema, non lo eliminava.

Config C cambiava la geometria del portale. Migliore rigidità. Vincoli di altezza XY non rispettati (≥300mm guide Z richiesti, non ottenibili con quella geometria).

Config D tornava indietro su alcune scelte di C, provava colonne 60x60. Primo commit fisico verificato.

Config E introduceva le molle — isolamento vibrazioni passivo. Funzionava. Aggiungeva un grado di libertà che avrebbe creato variabili nel lungo periodo.

Config F era un'ottimizzazione di E con piastre XY ridisegnate. Quasi lì.

Config G — quella attuale — abbandona le molle, adotta corpo unico, aggiunge gusset 200mm sulle colonne Z+U, diagonali, tiranti M10. Epoxy Granite nel fill. Rigidità asse Z: 772 volte la baseline. Smorzamento: δ=0.03-0.06.

Il punto non è che ci sono volute sette configurazioni. Il punto è che ogni configurazione era la risposta corretta alle informazioni disponibili in quel momento. Non c'era un modo per saltare da Config A a Config G senza passare per B, C, D, E, F. Ogni step rivelava qualcosa che il precedente non poteva mostrare.

Questo è il processo reale dell'ingegneria: non trovare la soluzione perfetta al primo tentativo, ma creare un sistema in cui ogni tentativo insegna qualcosa che il tentativo successivo può usare.

**reel_hook:** "Ho progettato la mia CNC sette volte. Non perché avevo sbagliato — perché ogni versione mi dava informazioni che la versione precedente non poteva darmi. Config A→F hanno preso da gennaio a maggio 2026. Config G ha preso due settimane. Non le sei prima erano tempo sprecato: erano il costo di acquisizione delle informazioni necessarie per fare Config G nel modo giusto. Se hai un processo che non funziona e lo rifaresti uguale, stai sprecando tempo. Se ogni iterazione ti insegna qualcosa di nuovo, stai investendo."

---
*Stagione: S1 — Il Presente | Posizione: tra S1_02 (Il Reattore) e S1_03 (Il Paradosso)*
