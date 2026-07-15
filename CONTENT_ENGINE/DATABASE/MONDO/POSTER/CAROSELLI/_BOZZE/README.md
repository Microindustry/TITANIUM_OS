<!-- TOC -->

- [_BOZZE  la QUARANTENA dellapprendista notturno](#bozze-la-quarantena-dellapprendista-notturno)
  - [Il giro completo](#il-giro-completo)
  - [Storia utile (non ripetere gli errori)](#storia-utile-non-ripetere-gli-errori)

<!-- /TOC -->

# 🌒 _BOZZE — la QUARANTENA dell'apprendista notturno

**Sei in:** `POSTER/CAROSELLI/_BOZZE/` — qui l'apprendista (`night_caroselli`,
task `TI_NightCaroselli` @04:15) deposita UNA bozza a notte. **Niente di ciò che
sta qui è pubblicabile**: è materiale in attesa di revisione umana.

## Il giro completo

1. **La notte**: prende il primo `pending` da `DATA/caroselli_queue.json` →
   grounding RAG → bozza → render → QC (canon_guard incluso) → cartella qui.
   Se il grounding è debole si FERMA con onestà (status `grounding_debole`).
2. **Il mattino**: report in `DATA/audit/bozze_caroselli.json` ·
   log in `DATA/logs/night_caroselli.log` · Claude lo legge nel triage di sessione.
3. **La revisione** (di giorno, sempre): controllare canone (persone! numeri!),
   §7 (slide-carne, chiusura), copertina §2-bis.
4. **La PROMOZIONE** (mai automatica, passo per passo):
   - sposta la cartella in `../SISTEMA/<ID>/` (o `../NINA/<ID>/` se binario Nina)
   - aggiorna il README della cartella (chi ha corretto cosa)
   - spunta il piano in MENTE (`_PIANO_PRODUZIONE.md`: riga + contatori)
   - aggiorna lo status nella coda (`promosso`)
   - `render_queue.py` (re-render se corretta) + `grid_preview.py` (griglia)

## Storia utile (non ripetere gli errori)
- 14/07 EP_SG_01_01: l'apprendista inventò una parentela («Nina è mia figlia») —
  da lì canon_guard v1.1 [persone].
- 15/07 EP_SG_01_02: dichiarò 178 kg come fatto (macchina al telaio) — da lì
  canon_guard v1.2 [progetto-non-misurato].
