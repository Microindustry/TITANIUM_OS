---
name: genera-episodio
description: Genera un episodio podcast da un milestone di TITANIUM_OS. Usa quando vuoi convertire un milestone da STATE.json in un episodio narrativo completo con reel_hook. Esegue milestone_to_episode.py con dual-pass Claude haiku+sonnet.
argument-hint: [testo-milestone oppure vuoto per tutti i nuovi]
allowed-tools: Read, Bash, Grep
---

# Genera Episodio — TITANIUM_OS Content Engine

Genera episodio podcast da milestone TITANIUM_OS.

## Steps

1. Leggi `BRAIN/STATE.json` e mostra i milestones.verified disponibili
2. Se `$ARGUMENTS` è vuoto: esegui script per tutti i nuovi milestone non ancora coperti
3. Se `$ARGUMENTS` contiene testo: aggiungi temporaneamente il milestone e genera solo quello

```bash
cd C:/Users/Matteo/Desktop/TITANIUM_OS
ANTHROPIC_API_KEY=!`cat .env 2>/dev/null | grep ANTHROPIC_API_KEY | cut -d= -f2` PYTHONIOENCODING=utf-8 python CONTENT_ENGINE/scripts/milestone_to_episode.py
```

4. Mostra il frontmatter + reel_hook dell'episodio generato
5. Chiedi se vuoi fare commit su GitHub

## Output atteso
- Nuovo file `CONTENT_ENGINE/DATABASE/episodes/EP_AUTO_XXX.md`
- `DASHBOARD/src/data/storieData.ts` aggiornato
- Reel hook pronto da girare in camera
