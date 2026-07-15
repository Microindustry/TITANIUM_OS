# DOMINIO 3 — NOTTURNE / AUTOMAZIONI

*ATTACCO #2 · 15/07/2026 · propose-only (nessun file modificato, nessun task toccato).
Prove: `schtasks /query /v`, DATA/logs/*, DATA/audit/*, sorgenti AUTOMATIONS/ e NODES/.*

## Quadro (5 righe)

1. **Nessun organo tace**: tutti gli `organi_vivi` a età 0–0.8 giorni (system_health.json:79-86 — il valore è età in giorni, non uno score). La catena 02:07→07:30 gira ed è sana.
2. **La notte lavora ~13 minuti su 323**: 96% del tempo macchina notturno è inutilizzato (timeline sotto). Il collo non è la capacità, è quanto le si chiede.
3. **~12 notti su 31 perse** (15/06→15/07, macchina spenta all'orario): ritmo effettivo ×0.61. I recuperi partono TUTTI INSIEME all'accensione (20/06 00:06, 13/07 09:20) → più processi GPU simultanei su 8GB.
4. **Throughput caroselli**: 1 bozza/notte a **~77 s/bozza** (misurato 2 volte). ~165 pianificati a questo ritmo = **~9 mesi**; con 3 bozze/notte = **~3 mesi**; con 5 = **<2 mesi**. Ma la coda ha solo **6 pending**: l'apprendista resta senza lavoro in 6 notti.
5. **Finetune finto-verde**: "COMPLETATO" in 10–46 s (impossibile per 69 step LoRA) e dataset fermo a 30 episodi/180 campioni identici ogni sabato, mentre gli episodi sono 272.

## Timeline notte reale (15/07, timestamp dai log)

```
02:07:01 ─ story_agent          ██ 2m26s   2 episodi (story_agent_run.log)
02:09:27 ─ (idle 75.5 min)
03:25:02 ─ ai_watch             ▏ <1s      0 sorgenti (tier 48h, atteso)
03:25:02 ─ (idle 12 min)
03:37:01 ─ night_research       ██████ 6m11s  self-heal RAG · topics · paper · nina EP_N2 ·
                                              riflusso 272 FATTI · wiki · rag-update (19603 chunk) ·
                                              snapshot · mente_version (night_research.log 03:43:12 done)
03:43:12 ─ (idle 8.8 min)
03:52:01 ─ night_audit          █ 39s      (system_health.json last_audit 03:52:40)
03:52:40 ─ (idle 14.3 min)
04:07:01 ─ night_push           █ 52s      push + profilo GitHub (night_push.log 04:07:53)
04:07:53 ─ (idle 7.1 min)
04:15:01 ─ night_caroselli      █ 1m19s    bozza EP_SG_01_02, 10 slide, QC verde (04:16:20)
04:16:20 ─ (idle 13.7 min)
04:30:01 ─ self_improve         █ 45s      3 proposte (self_improve.log 04:30:46)
04:30:46 ─ (idle 179.2 min)  ←──────────── il buco più grande: 3 ore
07:30:01 ─ daily_brief          ▏ 2s
```
**Occupato: ~12m34s / 323 min = 3.9%. Inutilizzati: ~310 min/notte.**
Domenica in più: TI_FineTune 01:00 + TI_DeepFreeze 03:00 (ultimo run reale: 13/07 09:20, recupero).

## Colli / sprechi (organo | prova | proposta additiva)

| # | Organo | Prova (file:riga / timestamp) | Proposta additiva |
|---|--------|-------------------------------|-------------------|
| 1 | **night_caroselli: 1 item/notte hard-coded** | `NODES/CAROSELLI_AGENT/night_caroselli.py:126-127` (`next(...)` un solo pending); bozza misurata 76–77 s (log 14/07 10:30:49→10:32:05 e 15/07 04:15:01→04:16:18); timeout 20 min riga 31 ne consentirebbe ~12 | Parametro `--count N` (default 1, notte a 2-3) con loop in serie nello stesso processo: il RAG è già caldo, la 2ª-3ª bozza costa ~40-60 s l'una. Tetto di sicurezza: stop se in `_BOZZE/` restano >N bozze non promosse (non creare debito di revisione) |
| 2 | **Coda caroselli quasi vuota** | `DATA/caroselli_queue.json`: 9 item totali, 6 pending, 3 promossi — vs ~165 pianificati (binari #58) | Nodo "refill" (anche settimanale, in coda a night_research): estrae i prossimi 10-20 item pending dai piani in MENTE (id/titolo/angolo/query), additivo sulla coda. Senza refill il collo n°1 diventa la penna di Matteo, non la notte |
| 3 | **~12 notti perse su 31 + recuperi simultanei** | date `avvio` in self_improve.log/ai_watch.log: buchi 19/06, 28/06–02/07, 06–07/07, 10–13/07; recuperi tutti-insieme 20/06 00:06:37-00:09 e 13/07 09:20:04-09:21 (deep_freeze 09:20:04, story_agent 09:20:11, ai_watch 09:20:14, finetune 09:20:17, self_improve 09:20:21) | (a) prendere atto che la macchina non è accesa ~4 notti/10 e valutare replica serale della catena (es. 21:30 se la notte è saltata); (b) scaglionare i recuperi con delay casuale per-task (schtasks `RandomDelay`) — al 13/07 giravano insieme story_agent (embeddings GPU) + finetune (LoRA GPU) su 8GB, la trappola MemoryError è nota |
| 4 | **Finetune verde ma probabilmente a 0 step** | finetune.log: 05/07 01:00:00→01:00:10 "COMPLETATO" (10 s), 13/07 09:20:17→09:21:03 (46 s) — il run vero del 21/06 impiegava >4 min solo a caricare i pesi (log riga 233); `night_finetune.bat:48` riusa sempre `MODELS\titanium_llm_v1` con checkpoint completo → trainer riparte "già finito" | Nel bat: output_dir versionato (o `--overwrite_output_dir`) + verifica misurabile post-run (es. mtime di `adapter_model.safetensors` cambiato, n. step >0 nel log) prima di marcare COMPLETATO |
| 5 | **Dataset training congelato** | night_push.log: ogni sabato "30 episodi… 180 campioni" identici (06/06 04:07, 13/06 04:07, 20/06 00:06 e 04:07 — doppio run stesso giorno); system_health.json:6 dice 272 episodi | episodes_to_dataset esteso a tutto il corpus (o a un sottoinsieme curato ma crescente): oggi il finetune domenicale — anche se girasse — reimpara sempre gli stessi 30 episodi. Nota: ogni EP appare 2 volte nel log (es. 04:07:12 e 04:07:17 EP_AUTO_002) — verificare doppio ciclo |
| 6 | **Log senza rotazione** | watcher.log 27 MB, mente_watcher.log 13 MB (dir DATA/logs); `AUTOMATIONS/core/watcher.py:76` usa `FileHandler` semplice | `RotatingFileHandler(maxBytes=5MB, backupCount=3)` nei due watcher; il night_audit li scandisce ogni notte — file più piccoli = audit più rapido |
| 7 | **night_caroselli: log muto a run riuscito** | log 15/07 12:15:36: START EP_SG_01_03 poi nulla — ma il run è FINITO (bozze_caroselli.json generated 12:16:38, status verde); causa: doppia mano sul log, `night_caroselli.py:47-52` ora ingoia il PermissionError (crash reale il 14/07 10:30:17, traceback nel log righe 2-31) | Quando gira sotto il bat (stdout già rediretto) scrivere SOLO su stdout: flag/env `NC_UNDER_BAT` o check `sys.stdout.isatty()`; il marker EXIT deve arrivare nel log in ogni caso |
| 8 | **Semantic Scholar 429** | system_health.json log_issues (15/07 03:40) | NOTO e gated — nessuna azione nuova (chiave API S2 già in valutazione altrove) |

## TOP 3 per leva

1. **Multi-bozza + refill coda (colli 1+2)** — sforzo: ~30 righe additive. Impatto: da ~9 mesi a **~3 mesi** per i ~165 caroselli (3 bozze/notte × ~4 min di macchina, costo API 3 chiamate sonnet/notte), con tetto anti-accumulo così la revisione diurna resta il ritmo regolatore. È la leva col rapporto più alto dell'intero dominio: la notte oggi usa il 3.9% di sé.
2. **Finetune vero + dataset vivo (colli 4+5)** — sforzo: 5 righe di bat + estensione dataset. Impatto: il "Personal LLM" domenicale oggi è teatro verde (10 s, 0 step, 30 episodi su 272); con la cura diventa l'unico consumatore reale delle 3 ore vuote 04:30→07:30 (un solo processo GPU, finestra libera).
3. **Notti perse + recuperi scaglionati (collo 3)** — sforzo: config schtasks + eventuale replica serale. Impatto: +39% di ritmo effettivo su TUTTI gli organi (12/31 notti saltate) e sparisce il rischio doppio-processo-GPU all'accensione, senza toccare una riga di codice degli agenti.
