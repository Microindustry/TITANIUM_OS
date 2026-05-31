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
