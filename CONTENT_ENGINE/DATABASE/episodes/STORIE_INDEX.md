<!-- TOC -->

- [STORIE  Indice Episodi  Struttura](#storie-indice-episodi-struttura)
  - [STRUTTURA STAGIONI](#struttura-stagioni)
  - [RECUPERO COMPLETATO (31/05/2026)](#recupero-completato-31052026)
  - [STORICO DISALLINEAMENTO DISCO  DASHBOARD (pre-recupero)](#storico-disallineamento-disco-dashboard-pre-recupero)
    - [Episodi NARRATIVI presenti su disco ma NON in dashboard (priorità recupero):](#episodi-narrativi-presenti-su-disco-ma-non-in-dashboard-priorità-recupero)
    - [Azione di recupero](#azione-di-recupero)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# STORIE — Indice Episodi & Struttura

*Mappa canonica del podcast "Il Sistema". Versione: 1.0 | 2026-05-31*

---

## STRUTTURA STAGIONI

| Stagione | Cartella | Tema | Tipo |
|----------|----------|------|------|
| **S0** | `S0_ORIGINI/` | Le origini — prima di TITANIUM_OS | Narrativo (manuale) |
| **S1** | `S1_PRESENTE/` | Il presente — la costruzione attiva | Narrativo (manuale) |
| **S2** | `S2_SISTEMA/` | Il sistema — GENESIS, dashboard, AI | Misto narrativo + auto |
| **MOMENTI** | `MOMENTI/` | Momenti chiave isolati | Narrativo (manuale) |
| **AUTO (SA)** | `SA_AUTO/` | Generati da milestone/git via story_agent | Auto-generato |

**Generatori:**
- `NODES/STORY_AGENT/story_agent.py` v1.0 — episodi da git commit + sessioni + milestone (con `reel_hook`). Gira come Stop hook + cron notturno.
- `CONTENT_ENGINE/scripts/milestone_to_episode.py` v1.0 — legacy, solo da `STATE.milestones.verified` (single-pass, no reel_hook).

**Dashboard:** `DASHBOARD/src/data/storieData.ts` → view STORIE. Blocco auto tra `// AUTO_GENERATED_START/END`. Stagioni manuali hand-craft.

---

## ✅ RECUPERO COMPLETATO (31/05/2026)

11 episodi narrativi reimportati nella dashboard via `CONTENT_ENGINE/scripts/sync_storie.py`
(storieData 64 → 75 episodi). ID = stem completo per evitare collisioni con entry esistenti.
Rilanciabile in sicurezza: `python sync_storie.py` (dry-run) / `--write`.

- 6× `EP_S2_*` (IL DISTACCO, CERVELLO IBRIDO, ORCHESTRATORE, LA TELA, IL CV, IL SILENZIO) → stagione **ST**
- 5× `MOM_*` (PRIMA AUTOMAZIONE, LA MAPPA, L'ESERCITO, DOCUMENTO MASTER, CONFIG A→G) → stagione **MOM** (nuova)

---

## ⚠ STORICO DISALLINEAMENTO DISCO ↔ DASHBOARD (pre-recupero)

Conteggio .md su disco vs entry in `storieData.ts` (audit Opus 31/05):

| Stagione | .md su disco | in storieData.ts | Gap |
|----------|:---:|:---:|:---:|
| S0 | 4 | 4 | ✓ |
| S1 | 6 | 6 | ✓ |
| S2 | 17 | 2 | **−15** |
| MOMENTI | 5 | 0 | **−5** |
| AUTO | 36 | 45 | +9 (entry da .md rimossi?) |

### Episodi NARRATIVI presenti su disco ma NON in dashboard (priorità recupero):
**S2_SISTEMA (6 narrativi):**
- `EP_S2_00_IL_DISTACCO`
- `EP_S2_01_IL_CERVELLO_IBRIDO`
- `EP_S2_02_L_ORCHESTRATORE`
- `EP_S2_03_LA_TELA`
- `EP_S2_04_IL_CV_CHE_NESSUNO_CAPISCE`
- `EP_S2_05_IL_SILENZIO`

**MOMENTI (5):**
- `MOM_01_LA_PRIMA_AUTOMAZIONE`
- `MOM_02_LA_MAPPA`
- `MOM_03_L_ESERCITO`
- `MOM_04_IL_DOCUMENTO_MASTER`
- `MOM_05_CONFIG_A_G`

> Nulla è perso: tutti gli .md sono sul disco. Manca il **sync nella dashboard**.
> Gli 11 `EP_2026*` in S2 sono auto-style (rigenerabili), priorità bassa.

### Azione di recupero
Serve un sync `*.md (stagioni manuali) → storieData.ts` (oggi esiste solo per AUTO).
Procedura: estrarre frontmatter (id, title, sottotitolo, data, tags) + corpo da ogni
.md narrativo e aggiungere le entry nelle rispettive stagioni di `storieData.ts`.
Da automatizzare in `milestone_to_episode.py` (o nuovo `sync_storie.py`) per non
rifare il lavoro a mano ogni volta.

## FATTI (per il RAG)

- **FATTO:** Al 31/05/2026 la dashboard `storieData.ts` conteneva 64 episodi prima del recupero e 75 episodi dopo, con 11 episodi narrativi reimportati tramite `CONTENT_ENGINE/scripts/sync_storie.py`.

- **FATTO:** Il disallineamento disco ↔ dashboard pre-recupero era: S2 aveva 17 .md su disco ma solo 2 in dashboard (gap −15); MOMENTI aveva 5 .md su disco e 0 in dashboard (gap −5); AUTO aveva 36 .md su disco ma 45 entry in dashboard (+9).

- **DECISIONE:** Gli 11 episodi recuperati sono stati assegnati a due stagioni: 6 episodi S2 narrativi → stagione **ST**; 5 episodi MOMENTI → stagione **MOM** (nuova). **LOGICA:** Separazione tra contenuti narrativi stagionali e momenti chiave isolati.

- **DECISIONE:** Il campo `id` degli episodi reimportati è impostato come stem completo del file .md. **LOGICA:** Evitare collisioni con le entry già esistenti nella dashboard.

- **FATTO:** Esistono due generatori distinti: `story_agent.py` v1.0 (da git commit + sessioni + milestone, con `reel_hook`, gira come Stop hook + cron notturno) e `milestone_to_episode.py` v1.0 (legacy, solo da `STATE.milestones.verified`, single-pass, senza `reel_hook`).

- **FATTO:** Il blocco AUTO in `storieData.ts` è delimitato dai marker `// AUTO_GENERATED_START` / `// AUTO_GENERATED_END`; le stagioni manuali sono gestite manualmente (hand-craft).
