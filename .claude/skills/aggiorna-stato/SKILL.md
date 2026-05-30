---
name: aggiorna-stato
description: Aggiorna STATE.json di TITANIUM_OS con un nuovo milestone verificato. Usa dopo aver completato un pezzo fisico, un feature del software, o una fase del progetto. Aggiunge il milestone, fa commit git, e offre di generare l'episodio.
argument-hint: [descrizione-milestone es. "Asse Y assemblato (Mar 2026)"]
allowed-tools: Read, Bash
disable-model-invocation: false
---
<!-- TOC -->

- [Aggiorna Stato  TITANIUM_OS](#aggiorna-stato-titaniumos)
  - [Milestone da aggiungere](#milestone-da-aggiungere)
  - [Steps](#steps)
  - [Formato milestone standard](#formato-milestone-standard)

<!-- /TOC -->


# Aggiorna Stato — TITANIUM_OS

Aggiunge nuovo milestone verificato a `BRAIN/STATE.json`.

## Milestone da aggiungere
$ARGUMENTS

## Steps

1. Leggi `BRAIN/STATE.json` — mostra milestones.verified esistenti
2. Aggiungi `$ARGUMENTS` in fondo all'array `milestones.verified`
3. Aggiorna `focus_today` se rilevante
4. Valida JSON (no trailing comma, encoding corretto)
5. Salva il file

```bash
cd "$HOME/TITANIUM_OS/TITANIUM_OS"
git add BRAIN/STATE.json
git commit -m "state: nuovo milestone — $ARGUMENTS"
git push origin main
```

6. Chiedi: "Vuoi generare l'episodio podcast per questo milestone ora? → /genera-episodio"

## Formato milestone standard
`"Descrizione azione completata (Mese Anno)"`
Esempio: `"Asse Y assemblato con vite SFU1605 (Mar 2026)"`
