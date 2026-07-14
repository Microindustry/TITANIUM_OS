# components/ — gli asset canonici riutilizzabili (anti-drift)

*Creata 14/07/2026 (#58, collo di bottiglia n°5): i componenti si creano UNA volta e
ricompaiono IDENTICI in ogni carosello — è il dual coding della didattica (la key-image
che ricorre identica è l'àncora del ricordo) e l'anti-drift della produzione.*

## Contratto

1. **Un componente vive qui, i caroselli lo COPIANO** (inline, self-contained): mai
   ridisegnare a mano un asset che esiste qui — si incolla da qui.
2. Se un componente va migliorato: si migliora QUI, poi si propaga ai caroselli NUOVI
   (i vecchi restano com'erano — additivo). Versione nel nome se cambia davvero.
3. Ogni asset nuovo (THEMIS, FORGE, simboli...) entra qui PRIMA di apparire in un carosello.

## Asset presenti

| File | Cosa | Fonte canonica |
|------|------|----------------|
| `nina_foto.b64.txt` | il VOLTO definitivo di Nina (data-URI base64, canone #50 NINA_DESIGN_DEFINITIVO) | estratto da PRE_03 (unica base64 del file) |

## Asset da creare (entrano qui prima del primo uso)

- `pietra.svg` — l'anello ⟡ con numero (già presente negli HTML EP_N2: alla prossima
  produzione si estrae il blocco e si fissa qui)
- `simbolo_nina.svg` (il perché/porticina) · `simbolo_themis.svg` (il calibro)
- avatar blueprint-anime THEMIS/FORGE — quando ci sarà l'arte (bibbia §4: per ora simboli)

## Regole di stile (dalla bibbia visiva)

Monoline ciano/oro su fondo scuro · i valori (colori, misure) SOLO da `../tokens.css` ·
niente foto reali (eccezione unica: il volto generato di Nina).
