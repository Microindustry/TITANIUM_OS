<!-- TOC -->

- [ATTACCO ECOSISTEMA  21/07/2026 (sessione 68)  TUTTO IL PROGETTO](#attacco-ecosistema-21072026-sessione-68-tutto-il-progetto)
  - [Quadro](#quadro)
  - [APPLICATO (basso rischio, reversibile)](#applicato-basso-rischio-reversibile)
  - [PROPOSTO (strutturale  decidi tu)](#proposto-strutturale-decidi-tu)
    - [A. Quasi zero test (rete di sicurezza assente)](#a-quasi-zero-test-rete-di-sicurezza-assente)
    - [B. 101 except larghi/nudi in 47 file](#b-101-except-larghinudi-in-47-file)
    - [C. requirements.txt non pinnato (0 , tutti )](#c-requirementstxt-non-pinnato-0-tutti)
  - [RIFINITURE / NOTE](#rifiniture-note)
  - [NOTA DI METODO (auto-correzioni fatte strada facendo)](#nota-di-metodo-auto-correzioni-fatte-strada-facendo)

<!-- /TOC -->

# ATTACCO ECOSISTEMA — 21/07/2026 (sessione #68) — TUTTO IL PROGETTO

> Diagnostica **live** (task pianificati, processi, log, git, disco, codice) fatta con gli
> strumenti di Claude Code, non a memoria. Scope: **tutto `C:\Users\teo\TITANIUM_OS`**, non solo #68.
> I fix a **basso rischio e reversibili** sono stati **APPLICATI** (regola 11: isolato/reversibile = si fa);
> quelli strutturali restano **PROPOSTI** (decidi tu).

## Quadro
- L'ecosistema **è vivo e sano**: API :5001 `status ok`, 4 servizi attivi, git allineato (#67b pushato).
- **Sicurezza del repo: buona** — 0 segreti hardcoded nel codice; `.env`/`_VAULT`/`chroma_db`/`BACKUPS` gitignorati; 0 segreti tracciati.
- 5 fix applicati (sotto), 3 filoni strutturali proposti (test, except larghi, deps non pinnate).

---

## ✅ APPLICATO (basso rischio, reversibile)

| # | Cosa | Reperto → Fix | Prova |
|---|------|---------------|-------|
| 1 | **Finetune riparato** | `TI_FineTune`=0x1: `torchaudio 2.11.0` incompatibile con `torch 2.6.0` (WinError 127). Installato `torchaudio==2.6.0+cu124 --no-deps` nel venv isolato | catena `torch→torchaudio→llamafactory.data.mm_plugin` importa OK; torch intatto |
| 2 | **Backup: esplosione fermata** | 42.141 cartelle `BACKUPS/2026*` (~900/gg, il watcher ne crea 1/evento); `retention R2` potava per **età (45gg)** = ~40k. Aggiunto tetto **keep-N=300** in `retention.py` + potatura | **42.036 rimosse, 700 MB liberati, 42k→373**; si auto-limita ogni notte |
| 3 | **Spam log API** | `api_server.err.log` 92% = `GET /api/health` ogni 32s | `logging.getLogger("werkzeug").WARNING` prima di `app.run` (attivo al prossimo restart API) |
| 4 | **Notti: flag task** | `TI_NightCaroselli` `StartWhenAvailable=False` (incoerente) | portato a `True` |
| 5 | **Path hardcoded** | `riordina_mente.py:13` + `genera_wiki_index.py:14` = `Path("C:/Users/teo/...")` viola REGOLA CODICE | resi env-derived (`MENTE_DIR` + fallback); compilano, path invariato |

Nota: i 2 doppioni `_copia` del report audit erano **già puliti** (l'audit del 19/07 era stale).

---

## 🟠 PROPOSTO (strutturale — decidi tu)

### A. Quasi zero test (rete di sicurezza assente)
- **1 solo file di test** (`NODES/EVA/test_eva.py`) su **157 `.py`**. Per un sistema che si **auto-modifica** (self_improve, notturne che committano) è il rischio più grosso: un fix notturno può rompere in silenzio.
- **Proposta:** smoke-test minimi sui percorsi critici — `state_updater` (salvataggio atomico, la causa storica del clobber STATE), `canon_guard` (numeri vietati), `rag_engine` (semantico==bm25), `retention` (dry-run). Non serve coprire tutto: bastano i 4-5 organi vitali.

### B. 101 `except` larghi/nudi in 47 file
- Errori ingoiati in silenzio = la tua "malattia del sistema silenzioso" a livello codice (api_server.py ne ha 9). Molti sono difensivi legittimi (`except OSError: pass` su stat), ma i **bare `except:`** vanno guardati.
- **Proposta:** audit mirato dei soli bare `except:` (loggare invece di ingoiare). Non un rewrite di massa.

### C. `requirements.txt` non pinnato (0 `==`, tutti `>=`)
- **È la stessa classe di bug che ha rotto il finetune** (torchaudio pescato a versione a caso). Il RAG ha già `requirements-rag.txt` "blindato"; il resto no.
- **Proposta:** pinnare almeno lo stack critico (torch/chromadb/sentence-transformers già noti) e le versioni che oggi funzionano.

---

## 🟢 RIFINITURE / NOTE
- **deep_freeze = 1,33 GB**: **NON è un problema** — esclude già `chroma_db` (`deep_freeze.py:87`), ruota a `MAX_FREEZE_FILES=8`. I 442M del 19/07 sono crescita reale del vault. Lasciato com'è.
- **pickle.load (4 punti)** + `model.eval()`: rischio locale trascurabile (file generati dal sistema, non input esterni).
- **doc-drift:** `STATE.json > nodes.MENTE_RAG` dice "~32800 chunk" ma il live è **19.952**. Cosmetico.
- **notti saltate (20/07):** radice = PC spento alle 02–04. Resta il tuo thread aperto "replica serale della catena" (BUS-374ec6b5) + blocker **UPS**.
- **monoliti:** `api_server.py` 71 KB, `rag_engine.py` 50 KB — tech-debt, non urgente.

---

## NOTA DI METODO (auto-correzioni fatte strada facendo)
1. `daily brief: 0.0` NON è "organo morto": in `night_audit.py:577` è *giorni dall'ultima scrittura* → 0.0 = il più fresco.
2. `deep_freeze` NON rizippa chroma: verificato che la esclude già. Sospetto iniziale ritirato.
