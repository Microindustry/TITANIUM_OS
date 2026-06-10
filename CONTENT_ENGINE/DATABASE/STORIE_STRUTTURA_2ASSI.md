<!-- TOC -->

- [STORIE  Struttura a 2 Assi (spike)](#storie-struttura-a-2-assi-spike)
  - [Fondamenta (repo/framework reali su cui ci appoggiamo)](#fondamenta-repoframework-reali-su-cui-ci-appoggiamo)
  - [IL FILONE UNICO  Dal metallo alla mente (la spina dorsale)](#il-filone-unico-dal-metallo-alla-mente-la-spina-dorsale)
  - [I DUE ASSI](#i-due-assi)
    - [Asse 1  RUOLO (il diario del sistema)  per documentazione e podcast Il Sistema](#asse-1-ruolo-il-diario-del-sistema-per-documentazione-e-podcast-il-sistema)
    - [Asse 2  NINA (il percorso educativo)  per il prodotto educativo](#asse-2-nina-il-percorso-educativo-per-il-prodotto-educativo)
  - [TERZO REQUISITO  UTILE AL RAG / WIKI (non solo bello e raccontabile)](#terzo-requisito-utile-al-rag-wiki-non-solo-bello-e-raccontabile)
  - [Schema del campo narrativa (NCP-compatibile, additivo)](#schema-del-campo-narrativa-ncp-compatibile-additivo)
  - [Mappatura del PILOTA (5 episodi, validazione)](#mappatura-del-pilota-5-episodi-validazione)
  - [Cosa NON è deciso ancora (dopo la validazione del pilota)](#cosa-non-è-deciso-ancora-dopo-la-validazione-del-pilota)

<!-- /TOC -->

# STORIE — Struttura a 2 Assi (spike)

*Versione: 0.1 (spike di validazione) | 2026-06-10 | Canone vivo — additivo, non distruttivo*

> **Perché esiste questo file.** La "stagione" oggi fa due lavori con un asse solo:
> è insieme *diario cronologico del sistema* **e** *percorso tematico/educativo*. Un asse
> solo non può servire due scopi opposti — per questo non era ottimizzata né per il suo
> ruolo (documentazione/podcast) né per Nina (prodotto educativo). Qui separiamo i due assi.
>
> **Regola d'oro:** non si cancella e non si riscrive nulla. Si **aggiunge** un campo
> `narrativa` agli episodi. La `stagione` resta dov'è (retrocompatibile). Riusiamo i 129
> episodi come materiale grezzo; cambia solo *come li indicizziamo e li leggiamo*.

---

## Fondamenta (repo/framework reali su cui ci appoggiamo)

- **Narrative Context Protocol (NCP)** — schema JSON, MIT, attivo (v1.3.0, feb 2026). Modella
  *storyform* (beat/thread), *ideation* (concetti), *moments* (scene che referenziano i beat).
  → Mappiamo: **episodio = moment**, **Regione/Pietra = storyform thread**, **concetto reale = ideation node**, **richiami = riferimenti cross-narrativi**.
- **Spiral Curriculum (Bruner)** — stesso concetto rivisitato a profondità crescente.
  → È l'ordinamento dell'**asse Nina** (il "giro" di spirale dentro ogni concetto).
- **AIStoryWriter / pipeline a ruoli** — outline → beat → prosa → revisione.
  → Modello per *generare* i prossimi episodi (Nina), non per questa indicizzazione.

---

## IL FILONE UNICO — "Dal metallo alla mente" *(la spina dorsale)*

> Decisione (Matteo, 10/06): **si parte dalla MECCANICA** — il telaio, le scelte
> strutturali, il controllo. Non stagioni-silo: **un solo filone**, dove ogni atto
> nasce dal precedente. È la regola 7 (*tutto si connette*) applicata al racconto.

Una sola storia, quattro atti. La materia è la radice: non automatizzi un gesto che non
hai prima fatto bene a mano sul metallo.

| Atto | Nome | Cos'è | Pietra-radice |
|:--:|---|---|:--:|
| **I** | **LA MATERIA** | il telaio, la scelta, il controllo, la precisione (V32) | ⟡0 |
| **II** | **IL SECONDO CERVELLO** | per costruire bene devo scaricare la mente → GENESIS, dashboard, automazione | ⟡1·⟡2 |
| **III** | **LA MENTE CHE IMPARA** | il sistema impara: LLM, RAG, il grafo, gli agenti | ⟡3–⟡6 |
| **IV** | **IL MONDO** | tramandare tutto questo: Nina e l'arco educativo | ⟡7 + tutte |

L'`asse_ruolo` (sotto) dice *in quale atto* sta un episodio. Il filone è continuo: gli
episodi si numerano lungo la spina, non dentro silos separati.

---

## I DUE ASSI

Ogni episodio vive su **uno o due** assi ortogonali. Stesso contenuto, due viste.

### Asse 1 — RUOLO (il diario del sistema) · *per documentazione e podcast "Il Sistema"*
Risponde a: *quando è successo, che tipo di cosa è.* Ordinato per `data_evento`.

| `tipo` | Cos'è | Ex-stagione |
|--------|-------|-------------|
| `origine` | prima del sistema | S0 |
| `presente` | la storia principale di Matteo | S1 |
| `sistema` | dev-log GENESIS / dashboard / AI | ST · S2_SISTEMA |
| `costruzione` | build fisici V32 | S2 |
| `momento` | momenti chiave isolati | MOM |
| `auto` | generati automaticamente | AUTO · SA |
| `avventura` | episodi educativi di Nina | AV |

### Asse 2 — NINA (il percorso educativo) · *per il prodotto educativo*
Presente **solo** se l'episodio insegna un concetto reale dell'arco IA. Ordinato per
Regione + giro di spirale. Allineato 1:1 a `MONDO/MAPPA_AVVENTURA.md`.

**Le 7 Regioni = le Pietre ⟡1–⟡7 (l'arco: la storia dell'IA):**

| Regione | Nome (mondo) | Concetto reale | Pietra |
|:--:|---|---|:--:|
| **0** | **LA MATERIA** | **il gesto fisico: la scelta, il controllo, la precisione** | **⟡0** |
| 1 | LA TRACCIA | il Grande Loop (un gesto, più frutti) | ⟡1 |
| 2 | L'OFFICINA CHE GIRA SOLA | l'Automazione | ⟡2 |
| 3 | LA MENTE CHE PARLA | l'LLM | ⟡3 |
| 4 | LA BIBLIOTECA DELLE FONTI | il RAG | ⟡4 |
| 5 | LA GRANDE MAPPA | la Wiki / il grafo | ⟡5 |
| 6 | L'ESERCITO SILENZIOSO | gli Agenti | ⟡6 |
| 7 | IL DIRETTORE | l'Orchestrazione | ⟡7 |

**Regola dei prerequisiti (spirale macro):** un episodio non può *usare* una Pietra non
ancora posata. `richiama` elenca le Pietre già note che l'episodio riattiva (ripetizione spaziata).
⟡0 (la materia) è la radice: la posa per prima, la richiamano tutte.

---

## TERZO REQUISITO — UTILE AL RAG / WIKI *(non solo bello e raccontabile)*

> Matteo (10/06): *"oltre bello, ricco, colto e raccontabile, deve essere utile al RAG, Wiki, ecc."*

Un episodio del filone **non è solo contenuto**: è un **artefatto di conoscenza**. Deve
chiudere il loop della regola 7: *V32 → episodio → RAG/Wiki → Claude più informato su V32 →
episodio migliore.* Tre obblighi operativi:

1. **Blocco `## FATTI (per il RAG)`** in coda a ogni episodio del filone: fatti atomici,
   con numeri e decisioni (DECISIONE/LOGICA/OBIETTIVO), in forma che il RAG recupera secco.
   È la differenza fra "una bella storia" e "una storia che insegna al sistema".
2. **Riflusso in `MENTE/`**: i FATTI diventano (o aggiornano) una nota-fonte in
   `MICROINDUSTRY/MENTE/<dominio>/` → `rag-update` li indicizza. *(Il gap trovato il 10/06:
   `MENTE/V32/` aveva 1 solo file mentre 110/129 episodi toccano la meccanica — il racconto
   era ricco, la fonte vuota. Questo requisito lo chiude.)*
3. **`narrativa` → grafo**: `concetto`, `regione`, `pietra`, `richiama` sono nodi/archi per
   Graphify. La struttura narrativa diventa struttura del knowledge graph.

> Niente segreti nel repo pubblico: ricette/brevetti restano in `MENTE/` + `_VAULT/`
> (regola 8). I FATTI negli episodi sono specifiche e logica progettuale, **mai** ricette.

---

## Schema del campo `narrativa` (NCP-compatibile, additivo)

```json
"narrativa": {
  "asse_ruolo": {
    "tipo": "sistema",
    "fase_sistema": "GENESIS"            // libero, opzionale
  },
  "asse_nina": {                          // OMESSO se l'episodio non insegna un concetto
    "concetto": "la mappa della conoscenza",
    "regione": 5,
    "regione_nome": "LA GRANDE MAPPA",
    "pietra": "⟡5",
    "giro_spirale": 1,                    // 1=base ... (Bruner: profondità crescente)
    "richiama": ["⟡4"],                   // Pietre prerequisito riattivate
    "stato_nina": "fonte"                 // fonte = materiale grezzo | adattato = episodio Nina scritto
  }
}
```

- I campi esistenti (`stagione`, `tags`, `content`…) **non si toccano**.
- La UI può ignorare `narrativa` finché non aggiungiamo le viste (TS resta verde: campo extra).
- `stato_nina: "fonte"` segna gli episodi-sistema che sono *materiale-fonte* per Nina;
  `"adattato"` gli `EP_AV_*` già scritti per i bambini. È il ponte fonte → prodotto.

---

## Mappatura del PILOTA (5 episodi, validazione)

| id | asse_ruolo.tipo | concetto | Regione · Pietra | giro | stato_nina |
|---|---|---|---|:--:|---|
| `EP_SEED_CONTROLLO` | sistema | un posto solo per governare il disordine | 7 · ⟡7 | 1 | fonte |
| `EP_SEED_WATCHER` | sistema | stare informati senza farlo a mano | 2 · ⟡2 | 2 | fonte |
| `EP_SEED_GRAPHIFY` | sistema | la mappa della conoscenza | 5 · ⟡5 | 1 | fonte |
| `EP_SEED_RETE` | sistema | vedere il sistema come una mappa | 5 · ⟡5 | 2 | fonte |
| `EP_AV_00` | avventura | il Grande Loop | 1 · ⟡1 | 1 | adattato |

> Nota: il pilota mostra i due assi che convivono — 4 dev-log (asse Ruolo = sistema, ma
> già agganciati a una Regione di Nina come *fonte*) + 1 episodio Nina (`adattato`).
> Mostra anche la **spirale**: Graphify (giro 1) → RETE (giro 2) sullo stesso concetto ⟡5.

---

## Cosa NON è deciso ancora (dopo la validazione del pilota)
- Se scalare `narrativa` a tutti i 129 (script di rimappatura assistito).
- Viste dashboard sui due assi (timeline Ruolo · mappa Regioni per Nina).
- Riconciliazione dell'incoerenza ⟡ già a bussola (Entropia=⟡2 nel pilota vs Automazione=⟡2 nell'arco).
