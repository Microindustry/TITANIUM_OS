---
name: dataset
description: Converte tutti gli episodi TITANIUM_OS in dataset JSONL per fine-tuning LLM. Esegue episodes_to_dataset.py e riporta statistiche. Usa quando vuoi aggiornare il training dataset del tuo LLM personale.
argument-hint: [opzionale: filtro stagione es. AUTO]
allowed-tools: Bash, Read
disable-model-invocation: false
---
<!-- TOC -->

- [Dataset LLM  TITANIUM_OS Content Engine](#dataset-llm-titaniumos-content-engine)
  - [Steps](#steps)
  - [Formato output (standard 2025)](#formato-output-standard-2025)
  - [Pipeline completa](#pipeline-completa)

<!-- /TOC -->


# Dataset LLM — TITANIUM_OS Content Engine

Genera dataset di training da episodi podcast.

## Steps

1. Conta episodi disponibili in `CONTENT_ENGINE/DATABASE/episodes/`
2. Esegui lo script:

```bash
cd "$HOME/TITANIUM_OS/TITANIUM_OS"
ANTHROPIC_API_KEY=!`cat .env 2>/dev/null | grep ANTHROPIC_API_KEY | cut -d= -f2` PYTHONIOENCODING=utf-8 python CONTENT_ENGINE/scripts/episodes_to_dataset.py $ARGUMENTS
```

3. Leggi il dataset generato e mostra statistiche:
   - Totale campioni (instruction/input/output)
   - Media lunghezza output in parole
   - Split consigliato: 80% train / 20% validation
   - Path file: `CONTENT_ENGINE/DATABASE/training/dataset.jsonl`

4. Mostra 2 esempi casuali dal dataset per verifica qualità

5. Suggerisci prossimo step: LlamaFactory per fine-tune locale

## Formato output (standard 2025)
```json
{"instruction": "Sei Matteo Benenati...", "input": "Milestone: X", "output": "episodio..."}
```

## Pipeline completa
`/genera-episodio` → episodio .md → `/dataset` → dataset.jsonl → LlamaFactory → LLM tuo
