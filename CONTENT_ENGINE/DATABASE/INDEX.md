# CONTENT ENGINE — DATABASE EPISODI
## TITANIUM_OS — Archivio narrativo completo
*Aggiornato: 2026-05-29 | Episodi totali: 36+*

---

## STRUTTURA STAGIONI

```
S0 — Origini          → il seme (3 file, 150 livelli, prima foto)
S1 — Il Presente      → storia principale (skills → taverna → V32 → 2030)
S2 — Il Sistema       → maggio 2026: il sistema che impara (RAG, corpo unico, agenti)
S3 — La Costruzione   → build log fisici (gusset, epoxy, mandrino, primo pezzo H7)
AUTO                  → generati automaticamente da milestone STATE.json
```

---

## S0 — ORIGINI (pre-sistema)
*Il seme. Prima che ci fosse un sistema.*

| ID | File | Titolo | Data | Status |
|----|------|--------|------|--------|
| S0_00 | `S0_ORIGINI/EP_S0_00_IL_SOCIO.md` | Il Socio | pre-2026 | ready |
| S0_01 | `S0_ORIGINI/EP_S0_01_L_ORGANISMO.md` | L'Organismo | pre-2026 | ready |
| S0_02 | `S0_ORIGINI/EP_S0_02_LA_VERIFICA.md` | La Verifica | 2026-02-13 | ready |
| S0_03 | `S0_ORIGINI/EP_S0_03_LA_FORMULA.md` | La Formula | pre-2026 | ready |

---

## S1 — IL PRESENTE (storia principale)
*Da quindici anni di industria a 0.008 mm nel 2030.*

| ID | File | Titolo | Data | Status |
|----|------|--------|------|--------|
| S1_00 | `S1_PRESENTE/EP_00_ORIGINE.md` | Origine | 2026-03-01 | ready |
| S1_01 | `S1_PRESENTE/EP_01_LA_TAVERNA.md` | La Taverna | 2026-03-01 | ready |
| S1_02 | `S1_PRESENTE/EP_02_IL_REATTORE.md` | Il Reattore | 2026-03-01 | ready |
| S1_03 | `S1_PRESENTE/EP_03_IL_PARADOSSO.md` | Il Paradosso | 2026-03-01 | ready |
| S1_04 | `S1_PRESENTE/EP_04_IL_SEGNALE.md` | Il Segnale | 2026-03-01 | ready |
| S1_05 | `S1_PRESENTE/EP_05_IL_VERDETTO.md` | Il Verdetto | 2026-03-01 | ready |

**Documento compendio:** `MENTE/SESSIONI/STORIE/FILONE_UNICO.md` — S0+S1 come testo continuo

---

## S2 — IL SISTEMA (maggio 2026 — il sistema che impara)
*Ogni decisione aggiorna il sistema. Ogni aggiornamento cambia le decisioni future.*

| ID | File | Titolo | Nucleo | Status |
|----|------|--------|--------|--------|
| S2_00 | `S2_SISTEMA/EP_S2_00_IL_DISTACCO.md` | Il Distacco | Corpo unico vs molle — la scelta migliore | ready |
| S2_01 | `S2_SISTEMA/EP_S2_01_IL_CERVELLO_IBRIDO.md` | Il Cervello Ibrido | RAG v4.0 BM25+semantico+CrossEncoder | ready |
| S2_02 | `S2_SISTEMA/EP_S2_02_L_ORCHESTRATORE.md` | L'Orchestratore | stop_hooks 4.7s + Research Agent 13 fonti | ready |
| S2_03 | `S2_SISTEMA/EP_S2_03_LA_TELA.md` | La Tela | CanvasLayout v5→v6→v6.1 + MatteoSection | ready |
| S2_04 | `S2_SISTEMA/EP_S2_04_IL_CV_CHE_NESSUNO_CAPISCE.md` | Il CV che Nessuno Capisce | AI come competenza — GitHub come prova | ready |
| S2_05 | `S2_SISTEMA/EP_S2_05_IL_SILENZIO.md` | Il Silenzio | 63 giorni persi → story_agent automatico | ready |
| S2_AUTO | `S2_SISTEMA/EP_2026*` | Episodi auto (story_agent) | Generati ogni notte da git log | auto |

---

## S3 — LA COSTRUZIONE (in produzione — build log fisici)
*Dalla progettazione alla macchina reale. Ogni pezzo documentato.*

| ID | File | Titolo | Status |
|----|------|--------|--------|
| S3_00 | — | Il Gusset Sinistro | da scrivere (dopo saldatura) |
| S3_01 | — | Epoxy Granite — Colata Zero | da scrivere (dopo fill) |
| S3_02 | — | Il Mandrino | da scrivere (dopo ordine + montaggio) |
| S3_03 | — | Il Primo Pezzo H7 | da scrivere (chiude il ciclo S1) |

---

## MOMENTI — Episodi intermezzo (5-7 min)
*Singola decisione, scoperta o svolta. Inseribili tra qualsiasi episodio principale.*

| ID | File | Titolo | Posizione narrativa | Status |
|----|------|--------|---------------------|--------|
| MOM_01 | `MOMENTI/MOM_01_LA_PRIMA_AUTOMAZIONE.md` | La Prima Automazione | S1_05 → S2_00 | ready |
| MOM_02 | `MOMENTI/MOM_02_LA_MAPPA.md` | La Mappa | S1_05 → S2_00 | ready |
| MOM_03 | `MOMENTI/MOM_03_L_ESERCITO.md` | L'Esercito | S2_02 → S2_03 | ready |
| MOM_04 | `MOMENTI/MOM_04_IL_DOCUMENTO_MASTER.md` | Il Documento Master | S1_05 → S2_00 | ready |
| MOM_05 | `MOMENTI/MOM_05_CONFIG_A_G.md` | Config A→G | S1_02 → S1_03 | ready |

---

## AUTO — Generati da milestone STATE.json
*Legacy — vecchio content_trigger.py. Da riorganizzare in S0/S1/S2.*

| ID | Titolo | Data | Status |
|----|--------|------|--------|
| EP_AUTO_002 | 8 pezzi, geometria perfetta | 2026-03-22 | ready |
| EP_AUTO_003 | HMI acquisito, V32 respira | 2026-03-22 | ready |
| EP_AUTO_005 | Asse X: le guide parlano | 2026-03-22 | ready |
| EP_AUTO_006 | Dashboard Live: Il Sistema Vede | 2026-03-09 | ready |
| EP_AUTO_008 | Maggio 2026 — La Svolta Strutturale | 2026-05-27 | ready |
| EP_AUTO_010 | Fondamenta d'acciaio TIG | 2026-03-22 | ready |
| EP_AUTO_011 | Knowledge Base Popolata | 2026-03-10 | ready |
| EP_AUTO_012 | Componenti V32 | 2026-03-22 | ready |
| EP_AUTO_013-019 | Vari milestone | 2026-05-27/28 | ready |

---

## AUTOMAZIONE STORY AGENT

**Script:** `NODES/STORY_AGENT/story_agent.py`
**Cron Windows:** ogni notte alle 02:07 — `TITANIUM_OS_StoryAgent`
**Stop hook:** ogni fine sessione Claude Code — genera bozza immediata
**Output:** `S2_SISTEMA/EP_YYYYMMDD_*.md` + mirror in `MENTE/SESSIONI/STORIE/S2_SISTEMA/`

**Comando manuale:**
```powershell
# episodi nuovi (commit dall'ultima run)
python NODES\STORY_AGENT\story_agent.py

# backfill completo storico
python NODES\STORY_AGENT\story_agent.py --backfill --max 20
```

---

## VISION FUTURA — S4+

```
S4 — La Scala      → dal lab al laboratorio (2027-2028)
S5 — Il Mercato    → MIMS nel marketplace, primi clienti B2B
S6 — Il Capannone  → luglio 2030, fine del ciclo, inizio del prossimo
```

**Avatar futuro (AVA):** navigazione interattiva degli episodi nella dashboard,
movimento 3D tra stagioni, generazione reel automatica da episodio selezionato.
Questo è S4+ lavoro — il materiale narrativo lo generiamo adesso.
