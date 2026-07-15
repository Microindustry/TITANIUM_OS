<!-- TOC -->

- [BINARIO NINA  i caroselli del mondo di Nina](#binario-nina-i-caroselli-del-mondo-di-nina)
  - [Cosa cè qui](#cosa-cè-qui)
  - [Regole del binario (le fonti canoniche stanno in MENTE)](#regole-del-binario-le-fonti-canoniche-stanno-in-mente)
  - [Come si fa un carosello nuovo qui](#come-si-fa-un-carosello-nuovo-qui)

<!-- /TOC -->

# 🌙 BINARIO NINA — i caroselli del mondo di Nina

**Sei in:** `POSTER/CAROSELLI/NINA/` — qui vive SOLO il binario educativo
(favola vera, voce del narratore). Il binario gemello è `../SISTEMA/` (voce Matteo).

## Cosa c'è qui

| Cartella | Cos'è | Stato |
|----------|-------|-------|
| `PRE_01/` | Il Mondo di Nina — preambolo 1/4 | v13, rifatto da 0 (15/07), volto libero |
| `PRE_02/` | Come funziona Nina — preambolo 2/4 | v2, a standard (15/07) |
| `PRE_03/` | I Personaggi — preambolo 3/4 | v6, a standard (15/07) |
| *(PRE_04)* | Tutto è vero — preambolo 4/4 | **DA CREARE** |
| `EP_N2_01/` | La Bambina che Chiedeva Perché (⟡0) | legacy 16 slide — a standard quando toccato |
| `EP_N2_02/` | Il Soffio di Troppo (⟡0) | legacy 16 slide — a standard quando toccato |

## Regole del binario (le fonti canoniche stanno in MENTE)

- **Stampo serie**: PRE_01 v13 è lo stampo; le onde di sfondo CONTINUANO tra i
  caroselli (PRE_01=fase 1-10 · PRE_02=11-20 · PRE_03=21-30 · PRE_04=31-40).
- **Volti**: solo il volto definitivo di Nina (base64), sempre LIBERO — mai chiuso
  in cerchi/cornici (regola Matteo 15/07, dissolvenza radiale).
- **Voce**: narratore del mondo. Nina NON è una persona reale — mai parentele
  («mia figlia» = falla, canon_guard [persone]).
- Canone: `MENTE/KNOWLEDGE/MONDO/LINEA_GUIDA_NINA.md` + `BIBBIA_VISIVA_CAROSELLI.md`
  + `PONTE_SG_NINA.md` (interazioni col binario Sistema).

## Come si fa un carosello nuovo qui
1. Leggi `../README.md` (regole comuni) e la LINEA_GUIDA_NINA in MENTE.
2. Cartella da `../_TEMPLATE/carosello_base.html` — MAI copiare un carosello esistente.
3. Builder `_build_<id>.py` nella cartella; il vecchio vivo → `_VERSIONI/` PRIMA.
4. `python CONTENT_ENGINE/scripts/render_queue.py` → render+QC · poi `grid_preview.py`.
