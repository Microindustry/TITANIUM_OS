# TITANIUM_OS — Struttura Versioni & Release

*Indice canonico delle release. Versione: 1.0 | 2026-05-31*

---

## SCHEMA DI VERSIONAMENTO

`vMAJOR.MINOR.PATCH` legato ai milestone reali, non al tempo.

| Componente | Quando sale |
|------------|-------------|
| **MAJOR** | Nuovo pilastro operativo o salto architetturale (es. GENESIS stack completo, V32 che produce il primo pezzo) |
| **MINOR** | Nuovo nodo/feature significativo (RAG, MCP, dashboard view, agente) |
| **PATCH** | Fix, coerenza dati, refactor, doc |

**Regola**: una release = un tag git annotato + una GitHub Release con note. La fonte di verità della cronologia fine è `git log`; `changelog.md` è auto-generato; gli `changelog_archive_*.md` sono ridondanti (gitignorati, non in repo).

---

## RELEASE

### v2.8.0 — *Ultima release pubblicata* (2026-05-30)
Tag: `v2.8.0` · GitHub Release pubblicata.
Stato al momento del tag: ecosistema GENESIS base, RAG ibrido v4.0, MCP, dashboard pre-N-livelli.

### v3.0.0 — *TAGGATA, Release GitHub MANCANTE* (2026-05-31, sessione 15) — **MAJOR**
GENESIS stack maturo + dashboard N-livelli + sistema di continuità sessione.

**Highlights:**
- Dashboard v7 — pattern N-livelli universale (MatteoSection, MimsSection, GenesisSection, CriticheSection, MappaView cerchi radiali)
- MCP server v1.4 — 10 tool (get_state, update_milestone, search_mente, get_daily_brief, list_content_ready, nexus, rag_update, update_session_context, screen_action, save_session)
- NEXUS swarm orchestrator v1.0 live + RAG graph-aware (rag_graph.py networkx)
- Sistema continuità sessione **self-healing** — RIAVVIO_SESSIONE deriva da git se il contesto è stale
- Audit Opus: criticheData v2.0 (18 findings), 8 incoerenze dati risolte
- VERSIONS ripulito: 408 archivi changelog disindicizzati da git

**Stato reale verificato il 27/08/2026 (sessione #71):**
- Tag `v3.0.0` **creato e pushato** su origin (`d2cf770`) — questo file diceva ancora "da pubblicare".
- **GitHub Release NON creata**: `gh release list` mostra solo v2.8.0. Metà del rito è saltata.
  La regola di questo file è esplicita — *una release = un tag annotato **+** una GitHub Release*.

```
gh release create v3.0.0 --title "TITANIUM_OS v3.0.0" --notes-file VERSIONS/RELEASES.md
```

---

### ⚠️ SCOPERTO IL 27/08/2026 — il profilo pubblico mostrava la versione SBAGLIATA

`AUTOMATIONS/core/update_github_profile.py` leggeva `STATE.json → meta.version` per la riga
"Stato Live". Ma `meta.version` è la versione **dello SCHEMA di STATE.json** (1.1.0), non del
progetto. Risultato: il README pubblico di `Microindustry/Microindustry` ha pubblicato
**"v1.1.0"** ogni notte — mentre i tag dicevano v3.0.0.

**Corretto**: la versione ora si deriva dal **tag git** (`git describe --tags --abbrev=0`) più
i commit di distanza — *`v3.0.0 · +646 commit`*. Coerente con la regola di questo file: la
fonte della versione è il tag, non un campo copiato a mano.

*(Stesso giro: il numero di chunk del RAG era scritto a mano nel template — `~19.600`, fermo
dal #61. Ora si legge da `DATA/audit/system_health.json`, che il night_audit riscrive ogni notte.)*

---

### `[ ]` PROSSIMA RELEASE — decisione di Matteo

Da v3.0.0 (31/05, sessione #15) a oggi (27/08, sessione #71) sono passati **646 commit e
~3 mesi** senza un tag. Applicando lo schema in cima a questo file:

| Se si guarda… | La regola dice | Versione |
|---|---|---|
| I nodi nuovi (RAG v4.2, Nina canone, apprendista notturno, self-improve, canon_guard, pipeline social) | *nuovo nodo/feature significativo* → **MINOR** | `v3.1.0` |
| Lo scheletro relazionale di GENESIS (db a 8 tabelle, organigramma ad albero, repository layer S0→S3) + il loop notturno che consegna da solo | *salto architetturale* → **MAJOR** | `v4.0.0` |

Non la decido io: una release è una dichiarazione, e la firma chi la fa.

---

## ALLINEAMENTO SESSIONE → VERSIONE

| Sessione | Tema | Versione |
|----------|------|----------|
| ~#13 | Ecosistema base, RAG v4.0 | v2.8.0 |
| #14 | NEXUS swarm, RAG graph v5, MCP v1.3 | (interna) |
| #15 | Dashboard N-livelli, audit Opus, handoff self-healing | **v3.0.0** |
| #37-46 | Arco Nina completo, RAG v4.2 (heading-aware + snapshot + GraphRAG-lite), loop autonomo | (interna) |
| #52-58 | Attacco esercito su Fable, ecosistema Obsidian, STORIE di sistema, HR a 3 strati | (interna) |
| #63-67b | Lancio social: identità microindustry, Postiz, 18/21 post programmati su 2 profili | (interna) |
| #69-70 | Bonifica contaminazione MIMS, regole a fonte unica, scala GENESIS S0-S2 | (interna) |
| #71 | Scala GENESIS **S3** (repository layer), view_index atomico, batch 3 gruppo 1 | (da taggare) |

> Aggiornare questo file ad ogni nuovo tag. È l'unico indice human-readable delle release.
