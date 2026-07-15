<!-- TOC -->

- [ATTACCO 2  COLLI DI BOTTIGLIA nellecosistema (Fable 5)](#attacco-2-colli-di-bottiglia-nellecosistema-fable-5)
  - [Obiettivo (una riga)](#obiettivo-una-riga)
  - [P0  PREREQUISITI (si fanno PRIMA di lanciare gli agenti)](#p0-prerequisiti-si-fanno-prima-di-lanciare-gli-agenti)
  - [LATTACCO  5 agenti Fable in parallelo (propose-only)](#lattacco-5-agenti-fable-in-parallelo-propose-only)
  - [Gate](#gate)

<!-- /TOC -->

# ATTACCO #2 — COLLI DI BOTTIGLIA nell'ecosistema (Fable 5)

*Impostato 15/07/2026 a fine sessione #60 (ordine Matteo). Si esegue nella sessione #61.
Modello: Fable 5 (default). Stesso metodo dell'ATTACCO_20260702: propose-only, additivo,
ogni finding con file:riga, zero modifiche applicate senza ordine. Report in questa cartella.*

## Obiettivo (una riga)

Trovare i COLLI DI BOTTIGLIA che frenano l'ecosistema (produzione → conoscenza →
pubblicazione), **navigando anche GitHub** per strumenti open-source da integrare
dove un collo si risolve meglio adottando che costruendo.

## P0 — PREREQUISITI (si fanno PRIMA di lanciare gli agenti)

1. **Verifica AUTOGENERAZIONE EPISODI → RAG** (il loop che si autoalimenta, regola 7):
   - story_agent / night_research generano ancora? (ultimo EP_N2 auto in `_PROPOSTI`/
     episodes, data ultimo run nei log `DATA/logs/`, riga NINA_SEED)
   - il riflusso FATTI → MENTE gira? (`fatti_dalle_storie.md` fresco?)
   - il RAG cresce? (chunk count vs snapshot, `night_research.bat` step rag-update)
   - milestone→episodio: la chiusura #59/#60 ha prodotto episodi? QC 51+ EP_N2 verde?
   - Esito atteso: o "vivo e nutre il RAG" con numeri, o diagnosi+cura.
2. **Profilo GitHub personale aggiornato** (Microindustry):
   - README profilo aggiornato allo stato reale (3 facce, serie PRE completa, binario
     notturno) — repo pubblico: NIENTE segreti/ricette (regola repo-public)
   - pin dei 5 repo (memoria: azione manuale via browser, l'API non esiste —
     COMPUTER_USE/BrowserAgent può farla o si prepara la lista per Matteo)

## L'ATTACCO — 5 agenti Fable in parallelo (propose-only)

| # | Dominio | Domanda-guida | Dove guarda |
|---|---------|---------------|-------------|
| 1 | PIPELINE CONTENUTI | dov'è il collo tra bozza→revisione→pubblicazione? (il collo n°1 NOTO è la pubblicazione: prerequisiti Meta fermi — quantificare cosa si può sbloccare senza Matteo, es. export Express batch) | CAROSELLI/, night_caroselli, GUIDA, coda |
| 2 | CONOSCENZA/RAG | il loop episodi→RAG→generazione ha attriti? (chunk garbage, fonti stale, indici che derivano) | NODES/MENTE_RAG, MENTE/, audit |
| 3 | NOTTURNE/AUTOMAZIONI | quale organo tace o duplica lavoro? throughput reale per notte vs pianificato (165 caroselli al ritmo attuale = quanti mesi?) | AUTOMATIONS/, Task Scheduler, DATA/audit |
| 4 | RICOGNIZIONE GITHUB | per OGNI collo trovato dagli altri: esiste uno strumento top (stelle/manutenzione) da integrare invece di costruire? (regola: ricognizione prima di rifare) | GitHub via `gh` + web |
| 5 | INTEGRAZIONE/SINTESI | coordina: _SINTESI.md con TOP 10 per leva (impatto/sforzo), porta tutto in bussola come [ ] DA FARE | i 4 report |

**Regole d'ingaggio** (ereditate da ATTACCO_20260702 + #56 ingegnerizzato):
- propose-only: NESSUNA modifica al codice; ogni proposta additiva, con file:riga e prova
- misurabile: ogni collo con un NUMERO (tempo/notte, item/settimana, GB, click di Matteo)
- strumenti GitHub: solo repo vivi (commit recenti), licenza compatibile, si valuta
  costo di integrazione vs costo di costruzione — mai adottare per moda
- niente segreti nei report (la cartella è nel repo pubblico)
- output: `DOCS/ATTACCO_20260716/<dominio>.md` + `_SINTESI.md`

## Gate

Matteo legge la _SINTESI e decide cosa si esegue. Le ondate si fanno a commit isolati,
additivi, come le ONDATE A-B-C del primo attacco.
