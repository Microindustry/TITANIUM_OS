# CONTENT ENGINE — DATABASE EPISODI
## Dataset LLM Training + Podcast + YouTube + LinkedIn

---

## STAGIONE S0 — Le Origini (pre-sistema)

| ID | Titolo | Data | Status | Min |
|----|--------|------|--------|-----|
| EP_S0_00 | Il Socio | pre-2026 | source | 9 |
| EP_S0_01 | L'Organismo | pre-2026 | source | 11 |
| EP_S0_02 | La Verifica | 2026-02-13 | source | 13 |
| EP_S0_03 | La Formula | pre-2026 | source | 11 |

## STAGIONE S1 — Il Presente (storia principale)

| ID | Titolo | Data | Status | Min |
|----|--------|------|--------|-----|
| EP_00 | Origine | 2025-09-01 | source | 13 |
| EP_01 | La Taverna | 2025-10-01 | source | 11 |
| EP_02 | Il Reattore | 2025-11-01 | source | 19 |
| EP_03 | Il Paradosso | 2025-12-01 | source | 15 |
| EP_04 | Il Segnale | 2026-01-01 | source | 11 |
| EP_05 | Il Verdetto | 2026-02-01 | source | 17 |

## STAGIONE ST — Il Sistema (GENESIS, architettura, decisioni)

| ID | Titolo | Data | Status | Min |
|----|--------|------|--------|-----|
| EP_T01 | La Dashboard | 2026-03-09 | ready | 10 |
| EP_T02 | NeuroMap | 2026-03-15 | ready | 9 |
| EP_T03 | VULCAN | 2026-03-18 | ready | 11 |
| EP_T04 | SINAPSI | 2026-03-18 | ready | 9 |
| EP_T05 | Il Sistema Pensa | 2026-05-27 | ready | 12 |
| EP_T06 | Meno Parti | 2026-05-20 | ready | 11 |
| EP_T07 | Il Documento | 2026-05-27 | ready | 9 |

## STAGIONE S2 — La Costruzione (build log fisici)

| ID | Titolo | Data | Status | Min |
|----|--------|------|--------|-----|
| EP_S2_00 | Config G: Il Gusset Sinistro | 2026-06-01 | draft | 8 |
| EP_S2_01 | Epoxy Granite: Colata Zero | 2026-07-01 | draft | 10 |

## AUTO — Generati da STATE.json

| ID | Titolo | Data | Status | Min |
|----|--------|------|--------|-----|
| EP_AUTO_002 | 8 pezzi, geometria perfetta | 2026-03-22 | ready | 7 |
| EP_AUTO_003 | HMI acquisito, V32 respira | 2026-03-22 | ready | 7 |
| EP_AUTO_005 | Asse X: le guide parlano | 2026-03-22 | ready | 7 |
| EP_AUTO_006 | Dashboard Live: Il Sistema Vede | 2026-03-09 | ready | 7 |
| EP_AUTO_008 | Maggio 2026 — La Svolta Strutturale | 2026-05-27 | ready | 8 |
| EP_AUTO_010 | Fondamenta d'acciaio TIG | 2026-03-22 | ready | 8 |
| EP_AUTO_011 | Knowledge Base Popolata | 2026-03-10 | ready | 8 |
| EP_AUTO_012 | Componenti V32: dalla teoria alla fabbrica | 2026-03-22 | ready | 8 |

---

## Source directories

- `S0_ORIGINI/` → originali da MENTE/SESSIONI/STORIE/ — da migrare con frontmatter
- `S1_PRESENTE/` → originali da MENTE/SESSIONI/STORIE/ — da migrare con frontmatter
- `ST_SISTEMA/` → episodi con frontmatter LLM-ready ✓
- `S2_COSTRUZIONE/` → build log fisici — in produzione
- `AUTO/` → generati da content_trigger.py su milestone STATE.json

## Arco narrativo

```
S0 Origini        → il seme (tre file, 150 livelli, prima foto)
S1 Presente       → la storia principale (skills, taverna, V32, MIMS, EVA, verdetto 2030)
ST Sistema        → il sistema nervoso (Dashboard, GENESIS, decisioni architetturali)
S2 Costruzione    → build log fisici (gusset, Epoxy Granite, assi, primo pezzo)
AUTO              → milestone → episodio automatico
```

## Prossimi episodi da scrivere

- EP_S2_02: Asse Y — guida destra prima, poi sinistra
- EP_S2_03: Il Mandrino (quando arriva il 2.2kW ER20)
- EP_S2_04: Primo Pezzo H7 — il numero che chiude il ciclo
- EP_T08: Il Brevetto — come si costruisce un moat con la conoscenza di processo
- EP_S0_04: L'Investimento — EUR 2.250 e il recupero dell'81%
