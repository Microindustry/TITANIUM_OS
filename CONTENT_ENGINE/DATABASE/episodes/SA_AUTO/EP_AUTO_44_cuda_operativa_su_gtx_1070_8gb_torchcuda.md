<!-- TOC -->

- [EP_AUTO_44  Milestone](#epauto44-milestone)
    - [CUDA operativa su GTX 1070 8GB (torch.cuda.is_availableTrue](#cuda-operativa-su-gtx-1070-8gb-torchcudaisavailabletrue)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema che Non Avevo Ancora Risolto](#atto-i-il-problema-che-non-avevo-ancora-risolto)
  - [ATTO II  torch.cuda.is_available()  True](#atto-ii-torchcudaisavailable-true)
  - [ATTO III  Cosa Si Sblocca Adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_44 — Milestone
### "CUDA operativa su GTX 1070 8GB (torch.cuda.is_available=True"

---
id: EP_AUTO_44
title: "CUDA operativa su GTX 1070 8GB (torch.cuda.is_avai"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-06-03
data_generato: 2026-06-03
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "CUDA operativa su GTX 1070 8GB (torch.cuda.is_available=True)"
---

---

## COLD OPEN

La settimana scorsa avevamo chiuso con lo stack Python RAG che girava — torch caricato, moduli attivi, il Getac che rispondeva senza che io dovessi metterci le mani. Infrastruttura invisibile, dicevo. Bene. Oggi quella stessa infrastruttura ha fatto un passo avanti che cambia tutto: ho aperto il terminale sul PC fisso in taverna, ho lanciato due righe di Python, e ho letto `True`.

---

## ATTO I — Il Problema che Non Avevo Ancora Risolto

Devo fare un passo indietro di qualche settimana per spiegare perché quel `True` vale quello che vale.

Quando ho iniziato a costruire GENESIS — il modulo di automazione intelligente di TITANIUM_OS — ho capito subito che il punto critico non era il codice. Il codice lo scrivi, lo correggi, lo riscrivi. Il punto critico era il modello. Un LLM locale, addestrato su dati miei, che conosce le mie macchine, il mio linguaggio, i miei processi. Non un modello generico che mi spiega come fare il pane.

Il percorso logico era chiaro: prendi gli episodi del podcast, costruisci un `dataset.jsonl`, fai fine-tuning con LoRA su un modello base. Fine. Semplice sulla carta.

Il problema è che fine-tuning su CPU è una sofferenza. Non un'opinione, un dato. Ho documentato tutto nel file `finetune_llm_local_cpu_2025.md` — quello che sto costruendo come base di ricerca per GENESIS. C'è un paper uscito a luglio 2025, arXiv:2507.01806, che si chiama *"LoRA Fine-Tuning Without GPUs: A CPU-Efficient Meta-Generation Framework for LLMs"*. L'ho letto. Framework interessante, lavoro serio — rende LoRA eseguibile su CPU senza CUDA. Ma quando leggi un paper che spiega come sopravvivere senza GPU, la prima domanda che ti fai non è "come lo implemento?" È: "posso evitare di doverlo usare?"

Quella domanda aveva una risposta. Ma prima dovevo verificarla.

Il contesto è questo: da febbraio, la logistica di TITANIUM_OS si divide su due macchine. Il Getac è il terminale mobile — lo porto in officina, in trasferta, ovunque. Il PC fisso sta in taverna, sempre acceso, sempre connesso via Tailscale. È il cervello 24/7. Quando ho migrato su quella macchina, ho messo tutto su chiavetta — kit di installazione, guida `CONFIG_PC_FISSO_24H.txt`, tutto documentato. Il PC fisso ha una GTX 1070 con 8GB di VRAM. Non è un H100. Non è nemmeno una 3090. È una scheda del 2016 che costa meno di duecento euro usata e che, se funziona con CUDA, cambia completamente l'equazione del fine-tuning locale.

La domanda era: funziona?

---

## ATTO II — `torch.cuda.is_available() = True`

Ieri sera mi sono seduto in taverna. Il PC fisso era acceso, come sempre. Ho aperto il terminale, sono entrato nell'ambiente virtuale di GENESIS, e ho lanciato questo:

```python
import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0))
```

`True`. `NVIDIA GeForce GTX 1070`.

Sembrano due righe banali. Non lo sono.

Quello che significano concretamente: torch 2.6.0+cu124 — lo stesso stack installato sul Getac la settimana scorsa — riconosce la GPU, ci parla, e la rende disponibile per il calcolo tensoriale. CUDA 12.4 funziona sulla 1070. Gli 8GB di VRAM sono accessibili. Il bridge tra Python e l'hardware Nvidia è operativo.

Ho fatto subito un secondo test, quello che mi interessa davvero per GENESIS:

```python
device = torch.device("cuda")
x = torch.randn(1000, 1000).to(device)
y = torch.randn(1000, 1000).to(device)
z = torch.mm(x, y)
print(z.shape)
```

Output: `torch.Size([1000, 1000])`. Calcolo eseguito su GPU. Nessun errore, nessun fallback su CPU silenzioso.

La GTX 1070 non è potente. Ma è incomparabilmente più veloce della CPU per moltiplicazioni matriciali — che è esattamente quello che fa LoRA quando aggiorna i pesi. Con 8GB di VRAM posso caricare modelli quantizzati a 4-bit nella fascia dei 7 miliardi di parametri — Mistral 7B, LLaMA 3.1 8B con quantizzazione aggressiva, Qwen2.5 7B. Non in floating point pieno. Ma in inferenza e fine-tuning LoRA con batch piccoli, ci siamo.

Il confronto con il paper arXiv:2507.01806 è illuminante proprio adesso. Quel framework esiste per chi non ha scelta — e fa un lavoro onesto nel rendere il fine-tuning su CPU meno impossibile. Ma "meno impossibile" non è la stessa cosa di "praticabile con i miei tempi". Fine-tuning LoRA su CPU su un dataset di qualche centinaio di esempi significa ore. Su GPU, anche una 1070, significa minuti. Quella differenza non è un comfort, è la differenza tra fare iterazioni o non farne.

Parallelamente ho verificato LLaMA-Factory — versione 0.9.2, che è quella testata e documentata nel mio archivio. Supporta Windows 10/11, supporta LoRA, e adesso che CUDA è operativa, posso usarla con il backend GPU invece del fallback CPU. La guida che avevo salvato nelle discussioni GitHub, quella al thread 7733, era scritta per CPU-only. Adesso non mi serve più quel workaround.

C'è ancora una cosa in sospeso sul PC fisso: il push GitHub è bloccato perché c'è un file da circa 1GB nel repo che non ho ancora pulito. È nel backlog, da fare a freddo, non è urgente — ma prima o poi devo toglierlo di mezzo per avere un flusso di versioning pulito tra Getac e taverna.

---

## ATTO III — Cosa Si Sblocca Adesso

GENESIS è al 70%. Costruzione, non ancora in produzione. La CUDA operativa sposta il collo di bottiglia.

Prima di ieri sera, il piano per il fine-tuning del modello GENESIS era condizionale — dipendeva dal paper arXiv:2507.01806 e dalla sua implementazione su CPU, oppure da una soluzione cloud che non voglio usare perché i dati sono miei e rimangono in locale. Adesso il piano è diretto: il dataset.jsonl che sto costruendo dagli episodi del podcast va in input a LLaMA-Factory con backend CUDA, modello base quantizzato a 4-bit, LoRA rank 16 o 32 a seconda della VRAM disponibile, addestramento sul PC fisso in taverna.

Questo ha conseguenze anche su EVA, il modulo AI di Vita Natura. Vita Natura è al 40% — attivo ma non completo. EVA deve poter rispondere a domande sui trattamenti, gestire prenotazioni, dare informazioni coerenti con il protocollo del centro. Per farlo bene serve un modello fine-tuned sul contesto specifico, non un modello generico con un prompt lungo. Adesso ho l'infrastruttura per costruirlo senza dipendere da servizi esterni.

Sulle macchine fisiche: V32 è al 65%, i rinforzi Config G sono montati, i sensori IFM VSE150 sono imballati e pronti. MIMS aspetta la pressa — VULCAN non è ancora operativa, quindi i connettori modulari restano in attesa. VULCAN è il punto di blocco fisico in questo momento. Ma il lavoro di GENESIS può andare avanti in parallelo, indipendente dalla meccanica.

Il prossimo passo concreto è semplice: preparare i primi cinquanta esempi del dataset.jsonl, fare un run di test con LLaMA-Factory su GPU, misurare i tempi e la perdita. Non sto ancora addestrando il modello finale. Sto verificando che la pipeline funzioni end-to-end prima di investire tempo su dati seri.

---

## CHIUSURA

*Quando costruisci un sistema, i momenti che contano non sono sempre quelli che sembrano grandi. A volte è due righe di Python e una parola: True. Poi sai dove sei, e puoi andare avanti.*

---