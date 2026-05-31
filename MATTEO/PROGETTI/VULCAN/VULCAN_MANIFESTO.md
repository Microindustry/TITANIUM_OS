<!-- TOC -->

- [VULCAN  Manifesto](#vulcan-manifesto)
  - [Cosè VULCAN](#cosè-vulcan)
  - [Perché esiste](#perché-esiste)
  - [Come funziona](#come-funziona)
  - [Le Ricette](#le-ricette)
  - [Il Brevetto](#il-brevetto)
  - [Dipendenze e Sequenza](#dipendenze-e-sequenza)
  - [Filosofia](#filosofia)
  - [Riferimenti](#riferimenti)

<!-- /TOC -->

# VULCAN — Manifesto
**Versione:** 1.0 | **Data:** 2026-03-18 | **Autore:** Matteo Benenati

---

## Cos'è VULCAN

VULCAN è la macchina che produce le tile MIMS.

Non è un prodotto. Non è un progetto a sé. È il gate d'ingresso obbligatorio per tutto ciò che viene dopo: senza VULCAN non esiste tile, senza tile non esiste MIMS, senza MIMS non esiste FIT PARK.

È una pressa a 3 stati costruita con materiali di recupero industriale che diventano infrastruttura di precisione.

---

## Perché esiste

Il problema di MIMS era la produzione: come si stampano tile polimeriche in modo ripetibile, calibrato, brevettabile?

La risposta non era comprare una pressa industriale da €80.000.
La risposta era costruirla con quello che c'era già.

Le colonne guida DATWLER — colonne che avevo già usato in un contesto di presse industriali — sono diventate la struttura portante. Il martinetto Vevor 20t è diventato l'attuatore a 3 stati. La logica è semplice: **il passato industriale diventa infrastruttura del futuro**.

---

## Come funziona

**Struttura fisica:**
- 4 colonne guida DATWLER come telaio strutturale
- Martinetto idraulico Vevor 20t come attuatore principale
- 3 stati operativi: `IDLE` / `SEMI` (pressione parziale) / `FULL` (pressione massima)
- Stampi intercambiabili per geometrie tile diverse

**Processo:**
1. Preparazione polimero secondo ricetta target
2. Carico in stampo preriscaldato
3. Pressione calibrata (stato `SEMI` → cura parziale → stato `FULL`)
4. Raffreddamento controllato
5. Estrazione tile → ispezione → archiviazione dati di produzione

**Parametri critici per ogni ricetta:**
- Temperatura (°C) al carico
- Pressione (bar) per stato SEMI e FULL
- Tempo di cura (min) per fase
- Durezza Shore target (A o D)
- Densità e porosità superficiale

---

## Le Ricette

Le ricette sono il vero valore di VULCAN.

Non è la pressa che crea il moat competitivo — una pressa si compra. È la formula polimerica che determina le proprietà fisiche della tile: resistenza al carico, comportamento al taglio, elasticità all'incastro, degradazione UV.

**Stato attuale:** 0% — da sviluppare completamente.

**Target:**
- Ricetta A: tile standard, durezza Shore D50-60, resistenza outdoor
- Ricetta B: tile flessibile, Shore D35-45, applicazioni indoor
- Ricetta C: tile rinforzata (carica minerale), Shore D70+, applicazioni industriali

Ogni ricetta andrà documentata con: materie prime, proporzioni, processo, test di accettazione, lotto di riferimento.

---

## Il Brevetto

La formula polimerica sarà brevettata.

Non la geometria della tile — quella si vede e si copia. Non la pressa — quella si compra.
La formula. Il processo. La combinazione specifica di polimero + parametri + geometria che produce **quella** proprietà meccanica.

Il brevetto trasforma MIMS da prodotto a barriera all'ingresso.

**Stato attuale:** 0% — richiede ricette consolidate come base documentale.

---

## Dipendenze e Sequenza

```
VULCAN STRUTTURA (20%) → completare telaio + martinetto
    ↓
VULCAN RICETTE (0%) → sviluppare formule A/B/C → test iterativi
    ↓
VULCAN BREVETTO (0%) → documentazione IP → deposito
    ↓
MIMS TILE → produzione in serie
    ↓
MIMS FIT PARK → installazione primo caso d'uso
```

**Blockers attuali:**
- Telaio: da completare il montaggio finale delle colonne guide
- Ricette: richiede accesso a materiali polimerici + laboratorio test
- Brevetto: richiede consulente IP (post-ricette)

---

## Filosofia

VULCAN non è solo una macchina.

È la prova che l'esperienza industriale accumulata in 15 anni — le presse di DATWLER, la precisione di SCProject, la qualità di LU.VE — si cristallizza in un sistema proprietario che nessuno può replicare senza lo stesso percorso.

Ogni cordone di saldatura fatto su scarichi MotoGP in titanio, ogni colonna guida montata su una pressa industriale, ogni ciclo di QC eseguito su uno scambiatore di calore: tutto converge qui.

**VULCAN è il distillato dell'artigiano.**

---

## Riferimenti

- Martinetto: Vevor 20t idraulico — specifiche tecniche in `BRAIN/KNOWLEDGE/`
- Colonne guida: DATWLER — riutilizzate da esperienza lavorativa precedente
- Pressa target MIMS: `BRAIN/STATE.json` → pillar `mims`
- Connessione con CV: `SINAPSI/index.html` → DATWLER → "guide→VULCAN"
