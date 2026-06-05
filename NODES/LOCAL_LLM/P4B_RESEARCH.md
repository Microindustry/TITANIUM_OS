# P4B — LLM locale per RAG offline: ricerca + decisione

*Ricerca: 2026-06-05 · fonte ispirazione: Simone Rizzo (richiesta di Matteo nel PIANO P4b)*

## Contesto
PIANO P4b: TinyLlama-1.1B = troppo piccolo (vanity) → pivot a **Ollama + 7B quantizzato**
per Q&A offline sul RAG. Claude resta motore qualità; il locale serve per
risposte offline/economiche su MENTE quando non serve Opus.
Hardware nostro: **GTX 1070 8GB VRAM** (CUDA), 16GB RAM (vedi STATE.machine).

## Cosa fa Simone Rizzo (verificato)
Rizzo AI Academy + canale @simonerizzo98: corso "AI Locale — non dipendere dal Cloud".
Metodo allineato al nostro pivot:
- **Model runner:** Ollama / LM Studio / HuggingFace Transformers
- **Quantizzazione** dei modelli per girare su GPU consumer
- **Hardware**: focus esplicito su requisiti VRAM
- **RAG 100% locale**: retrieval + generazione senza cloud
- Anche: training/fine-tune di un LLM sui propri dati (LLaMA 3.2) — coerente col
  nostro dataset episodi → few-shot.

→ Conferma che la direzione del PIANO è giusta; non reinventiamo, adottiamo il pattern.

## Decisione (calibrata su 8GB VRAM, da ricerca tecnica 2026)
| Scelta | Valore | Perché |
|--------|--------|--------|
| Runner | **Ollama** | standard, semplice, API HTTP locale (`localhost:11434`), già previsto |
| Modello | **Qwen2.5-7B-Instruct Q4_K_M** | consenso "best quality-per-VRAM" classe 7B per RAG/QA; ~4.5GB → entra in 8GB con headroom per KV-cache |
| Quant | **Q4_K_M** | sweet spot 6–8GB VRAM, perdita qualità 1–3% |
| Alternative | Llama 3.3 8B Q4 (instruction following migliore) · Phi-4-mini 4B (velocità, 120+ t/s) | fallback / modello veloce per task semplici |

Nota chiave dalla ricerca: un 7B Q4 su 8GB è **competitivo con GPT-3.5-class** per
chat/RAG/summarization. Sufficiente per il ruolo "offline/economico"; Claude resta
per il ragionamento profondo (architettura ibrida [[hybrid]]).

## Come si integra (NON ancora implementato — additivo, leva predisposta)
Il RAG retrieval esiste già (ChromaDB + BM25 + reranker). Manca solo il *generatore*
locale opzionale:
1. `ollama pull qwen2.5:7b-instruct-q4_K_M`
2. Endpoint `/api/llm/local` → prende la query, recupera i chunk con `rag_engine.search`,
   monta il prompt e chiama Ollama (`/api/generate`). Fallback a Claude se Ollama giù.
3. Toggle nella "chat RAG" della dashboard (P4a/P1d): locale vs Claude.
4. Riuso del dataset episodi come few-shot.

## Verdetto
Pronti a pivotare quando si vuole accendere la leva: **Ollama + Qwen2.5-7B-Q4_K_M**.
Costo zero (gira sulla nostra GPU), nessuna dipendenza cloud per il Q&A base.
Prerequisito unico: installare Ollama + pull del modello (~4.5GB).

## Fonti
- Rizzo AI Academy — https://www.rizzoaiacademy.com/
- @simonerizzo98 (Ollama, LLaMA locale) — https://www.youtube.com/watch?v=MnQ4F5v-0HQ · https://www.youtube.com/watch?v=UYOLlCuPFMc
- 8GB VRAM local LLM 2026 — https://9bench.com/articles/run-local-llm-on-8gb-vram-2026-reality-check/
- Quantization Q4_K_M vs Q8 — https://www.promptquorum.com/local-llms/llm-quantization-explained
- Best Ollama models RAG/agents — https://www.morphllm.com/best-ollama-models
