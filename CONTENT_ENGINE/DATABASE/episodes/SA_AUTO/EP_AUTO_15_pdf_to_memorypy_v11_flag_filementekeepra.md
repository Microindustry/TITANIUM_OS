<!-- TOC -->

- [EP_AUTO_15  Milestone](#epauto15-milestone)
    - [pdf_to_memory.py v1.1 - flag --file/--mente/--keep/--rag (28](#pdftomemorypy-v11---flag---file--mente--keep--rag-28)
- [IL SISTEMA  Episodio 23](#il-sistema-episodio-23)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema della Memoria Morta](#atto-i-il-problema-della-memoria-morta)
  - [ATTO II  Quattro Flag, Una Decisione](#atto-ii-quattro-flag-una-decisione)
  - [ATTO III  Cosa Si Sblocca Adesso](#atto-iii-cosa-si-sblocca-adesso)

<!-- /TOC -->

# EP_AUTO_15 — Milestone
### "pdf_to_memory.py v1.1 - flag --file/--mente/--keep/--rag (28"

---
id: EP_AUTO_15
title: "pdf_to_memory.py v1.1 - flag --file/--mente/--keep"
sottotitolo: "La memoria esternalizzata"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-28
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "pdf_to_memory.py v1.1 - flag --file/--mente/--keep/--rag (28 Mag 2026)"
---

# IL SISTEMA — Episodio 23

## COLD OPEN

Ho passato tre anni a costruire macchine che ricordano. Oggi ho finito di costruire lo strumento che insegna loro come farlo.

---

## ATTO I — Il Problema della Memoria Morta

Lasciami spiegare una cosa che in pochi capiscono finché non ci sbattono la testa.

Hai un sistema intelligente. Gli dai documenti — manuali, schede tecniche, specifiche di progetto, tutto quello che hai scritto e accumulato in anni di lavoro. Il sistema li legge, ti risponde, sembra che sappia. Poi la conversazione finisce. Riapri il giorno dopo. Ricomincia da zero.

Questo era il problema di GENESIS fino a qualche settimana fa. Non un problema di intelligenza — gli agenti erano già lì, la dashboard v7.0 funzionava, il RAG v4.0 stava prendendo forma. Il problema era l'ingresso. Come trasformi un PDF — un documento statico, morto — in qualcosa che il sistema può usare davvero? Non leggere. Usare. Cercare. Incrociare con altre informazioni. Ragionare sopra.

Io costruisco macchine fisiche. La V32 — la mia fresatrice CNC tre assi — è al 65%, Config G coi rinforzi in corso. La VULCAN, la pressa polimeri, aspetta in coda. La MIMS, i connettori modulari, aspetta che la catena V32-VULCAN sia completa per avere senso di procedere. Ogni pezzo fisico ha una logica di dipendenza, una sequenza. Non puoi fresare prima di avere la struttura. Non puoi pressare prima di avere lo stampo.

Il software funziona esattamente allo stesso modo. E `pdf_to_memory.py` era il pezzo mancante all'ingresso della catena.

---

## ATTO II — Quattro Flag, Una Decisione

Il 28 maggio 2026 ho rilasciato la versione 1.1.

Non è stata una riscrittura totale — la v1.0 esisteva già, faceva il lavoro grezzo di parsing. Ma era rigida. Prendeva un file, lo processava in un modo solo, lo buttava nella pipeline. Funzionava. Non era abbastanza.

La v1.1 ha quattro flag e ognuno risolve un problema specifico che mi ero trovato davanti nelle settimane precedenti.

`--file` è il base. Gli dici quale documento processare. Sembra ovvio ma nella v1.0 il path era hardcoded — vergogna tecnica che ho rimandato troppo a lungo.

`--mente` è quello che mi interessa di più. Quando usi questo flag, il documento non va solo nel RAG come chunk di testo indicizzato. Va nella memoria strutturata del sistema — quello che chiamo la mente di GENESIS. C'è una differenza enorme tra avere un documento recuperabile e avere un concetto integrato. Il primo è una biblioteca. Il secondo è capire. `--mente` è il flag che decide se stai archiviando o se stai insegnando.

`--keep` gestisce la persistenza. Alcuni documenti devono rimanere in memoria attiva a lungo termine. Altri sono contestuali — li carichi per una sessione specifica, per un problema specifico, poi puoi toglierli senza perdere niente di importante. Prima questa distinzione non esisteva. Tutto restava o tutto spariva al reset. Adesso puoi scegliere.

`--rag` forza l'indicizzazione nel sistema di retrieval aumentato senza passare dalla memoria strutturata. È il canale veloce. Hai un documento tecnico di cento pagine che non ti serve interiorizzare ma devi poter interrogare? `--rag`. Niente overhead, niente elaborazione profonda, ma disponibile per la ricerca semantica in trenta secondi.

Quattro flag. Quattro comportamenti distinti. Sembra poco. In realtà è la differenza tra un sistema che accumula dati e un sistema che costruisce conoscenza in modo intenzionale.

Ho testato sulla documentazione di EVA — il pilota AI per Vita Natura, il centro estetico. Caricato il manuale operativo con `--mente --keep`, le schede trattamenti con `--rag`, i protocolli di prenotazione con `--mente`. Tre comportamenti diversi per tre tipi di informazione diversa. Il sistema adesso risponde in modo diverso a seconda di dove ha trovato l'informazione — e questo è esattamente quello che volevo.

---

## ATTO III — Cosa Si Sblocca Adesso

GENESIS è all'78% e questa milestone sposta degli equilibri precisi.

Il RAG v4.0 aveva bisogno di un ingresso controllato per funzionare bene. Adesso ce l'ha. Lo Story Agent — l'agente che costruisce narrative di progetto, che tiene traccia dell'evoluzione nel tempo — può finalmente ricevere documentazione strutturata invece di testo grezzo. La MatteoSection della dashboard, dove tengo il CV aggiornato e le capabilities di Claude integrate nel sistema, può aggiornarsi in modo programmatico quando c'è qualcosa di nuovo da memorizzare.

Per Vita Natura significa che EVA smette di essere un pilota generico e diventa un assistente che conosce davvero i protocolli del centro. Non simula conoscenza. La ha, nel senso tecnico del termine.

Per la V32 e per tutto il ciclo fisico — la documentazione tecnica della Config G, i parametri di rinforzo, le specifiche di tolleranza — entra nel sistema in modo permanente. Quando arriverà il momento di costruire la MIMS, GENESIS avrà già in memoria la logica meccanica che collega la fresatrice alla pressa.

Un sistema che costruisce macchine deve ricordare come