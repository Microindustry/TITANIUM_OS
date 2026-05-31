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

### v3.0.0 — *Da pubblicare* (2026-05-31, sessione 15) — **MAJOR**
GENESIS stack maturo + dashboard N-livelli + sistema di continuità sessione.

**Highlights:**
- Dashboard v7 — pattern N-livelli universale (MatteoSection, MimsSection, GenesisSection, CriticheSection, MappaView cerchi radiali)
- MCP server v1.4 — 10 tool (get_state, update_milestone, search_mente, get_daily_brief, list_content_ready, nexus, rag_update, update_session_context, screen_action, save_session)
- NEXUS swarm orchestrator v1.0 live + RAG graph-aware (rag_graph.py networkx)
- Sistema continuità sessione **self-healing** — RIAVVIO_SESSIONE deriva da git se il contesto è stale
- Audit Opus: criticheData v2.0 (18 findings), 8 incoerenze dati risolte
- VERSIONS ripulito: 408 archivi changelog disindicizzati da git

**Tag suggerito:**
```
git tag -a v3.0.0 -m "TITANIUM_OS v3.0.0 — GENESIS stack N-livelli + continuità sessione"
git push origin v3.0.0
gh release create v3.0.0 --title "TITANIUM_OS v3.0.0" --notes-file VERSIONS/RELEASES.md
```

---

## ALLINEAMENTO SESSIONE → VERSIONE

| Sessione | Tema | Versione |
|----------|------|----------|
| ~#13 | Ecosistema base, RAG v4.0 | v2.8.0 |
| #14 | NEXUS swarm, RAG graph v5, MCP v1.3 | (interna) |
| #15 | Dashboard N-livelli, audit Opus, handoff self-healing | **v3.0.0** |

> Aggiornare questo file ad ogni nuovo tag. È l'unico indice human-readable delle release.
