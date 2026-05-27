# TITANIUM_OS — CLAUDE.md
*Versione: 4.0.0 | Aggiornato: 2026-05-27 | Macchina: Getac (benen)*

## CHI È MATTEO
Matteo Benenati — artigiano industriale + system builder.
- 15+ anni industria: TIG/MIG titanio (MotoGP @ SCProject), robot (ESSEGI), presse (DATWLER), QC (LU.VE)
- ADHD probabile: TITANIUM_OS è il suo scaffolding cognitivo — ogni nodo elimina un carico mentale
- Compagna: Maria → Vita Natura (centro estetico, Boffalora sopra Ticino, MI)
- OS: Windows 10 Pro | IDE: Cursor + Claude Code | Macchina: Getac

---

## INIZIO SESSIONE (protocollo fisso)

```
1. Leggi BRAIN/STATE.json       → riassunto in <10 secondi, zero domande
2. Enunci: milestone attivo + prossimo step + blockers
3. Lavora — ogni frammento utile va catturato
4. Fine sessione → aggiorna STATE.json + commit + push
```

Non chiedere "da dove partiamo?". Lo stato è in STATE.json. Leggilo.

---

## FILESYSTEM — dove va ogni file (non inventare)

### SISTEMA
```
C:\Users\benen\TITANIUM_OS\
  TITANIUM_OS\      ← repo git — TUTTO IL CODICE QUI
  _VAULT\KEYS\      ← .env, API keys (MAI git)
  _VAULT\ACCOUNTS\  ← credenziali
  _VAULT\BACKUPS\   ← AES-256 da deep_freeze.py
  WORKSPACE\        ← progetti locali pre-git
```

### MICROINDUSTRY (dati lavoro)
```
MENTE\              ← FONTE RAG — metti qui ogni documento da ricordare
  V32\              ← CNC: BOM, schemi, note officina, decisioni
  MIMS\             ← moduli: design, protocollo fisico
  VITA_NATURA\      ← centro estetico: sito, EVA, procedure
  OFFICINA\         ← attrezzatura, fornitori, TIG/MIG
  KNOWLEDGE\        ← libri, corsi, repo di riferimento
  SESSIONI\         ← cattura decisioni dalle chat Claude (usa _TEMPLATE.md)
CAD\                ← STL, STEP, DXF (per progetto)
FOTO\               ← documentazione visiva build
CONTENT_ENGINE\     ← YouTube, LinkedIn, podcast, script
FINANCE\            ← fatture, BEP, ROI, fornitori
```

### Tabella rapida
| Tipo file | Dove |
|-----------|------|
| Codice Python/JS/TS | `TITANIUM_OS/TITANIUM_OS/` |
| API keys / .env | `_VAULT/KEYS/` |
| Note V32 / decisioni officina | `MENTE/V32/` |
| Decisioni dalle chat | `MENTE/SESSIONI/YYYY-MM-DD_tema.md` |
| File CAD (STL/STEP/DXF) | `CAD/[progetto]/` |
| Foto build | `FOTO/V32_BUILD/` |
| Script episodi podcast | `CONTENT_ENGINE/produzione_contenuti/` |
| Documenti personali | `PERSONALE/DOCUMENTI/[categoria]/` |

---

## DATI MASTER (verificati fisicamente — non inventare)
- Investimento V32: EUR 2.250
- Massa V32: 178 kg — **corpo unico** (non più su molle — decisione strutturale maggio 2026)
- Precisione RSS: ±0.019 mm (IT6-IT7)
- BEP V32: 61 ore = 1.4 mesi | ROI Anno 1: 322%
- Tariffa Precision Lab: EUR 45/h
- Target capannone: 15 Luglio 2030

## MILESTONE ATTUALE
Config G — Rinforzi colonne Z+U (gusset 200mm + diagonali + tiranti M10)
Completamento: 65% | Sessione: #4
Blocker attivo: Manca mandrino 2.2kW ER20 — da ordinare

---

## GENESIS STACK — nodi attivi

| Nodo | Comando | Stato |
|------|---------|-------|
| MCP Server | auto (`.claude/settings.json`) | ATTIVO — 5 tool |
| MENTE RAG | `rag "query"` / `rag-rebuild` | ATTIVO — 39 chunk |
| Daily Brief | `brief` | ATTIVO → `DATA/daily_brief_last.md` |
| MENTE Scanner | `python NODES/MENTE_SCANNER/scanner.py` | ATTIVO → `MICROINDUSTRY/MENTE/` |
| MENTE Watcher | watch fs → `/api/scan` | ATTIVO |
| API Server | `start-api` (porta 5001) | ATTIVO |
| Dashboard | `start-dashboard` (porta 5173) | ATTIVO |
| n8n | `npx n8n` (porta 5678) | ATTIVO |
| EVA WhatsApp | — | PENDING |

**Dopo ogni modifica a MENTE/ → esegui `rag-rebuild`.**
RAG usa ChromaDB + `paraphrase-multilingual-MiniLM-L12-v2` (offline, 384-dim, IT/EN/DE/FR).

---

## PERSONAGGI AI

| Nome | Ruolo | Stato |
|------|-------|-------|
| **THEMIS** | Esecuzione tecnica, codifica, analisi V32/GENESIS | Attivo |
| **EVA** | WhatsApp automation, prenotazioni Vita Natura | In sviluppo |
| **AVA** | YouTube avatar, script, reel | Pianificato |
| ARIA | Life OS, ADHD scaffolding, scheduling | Futuro |
| NEXUS | Orchestratore agenti | Futuro |
| TESLA | Hardware, elettronica, CNC, IoT | Futuro |
| FORGE | Meccanica, officina, saldatura, MIMS | Futuro |

---

## LE 10 REGOLE — TITANIUM_OS OPERATING PRINCIPLES

> *Un sistema che gira da solo vale più di 10 abitudini che dipendono dalla volontà.*

1. **Niente è finito — ogni cosa è una versione.**
   Non aspettare la perfezione. Una versione funzionante oggi > una versione perfetta mai.

2. **Identifica → Automatizza → Scala.**
   Se lo fai 3 volte: script. Se lo fai ogni giorno: nodo. Se il nodo produce valore: scala.

3. **Cattura mentre costruisci — non ricordare, documenta.**
   Ogni decisione tecnica in `MENTE/`. Ogni sessione Claude in `MENTE/SESSIONI/`. Il RAG la recupera domani.

4. **Leva cognitiva: 1 input → N output.**
   Un milestone → episodio + reel + LinkedIn + RAG update. Ogni azione deve produrre più artefatti.

5. **Costruisci ciò che usi — meta-ricorsività.**
   TITANIUM_OS gestisce la costruzione di TITANIUM_OS. Il sistema si autoalimenta.

6. **Output misurabile prima di tutto.**
   Se non posso misurarlo (mm, ore, euro, chunk RAG, commit), non esiste.

7. **Tutto si connette — nessun silo.**
   V32 → episodio → dataset LLM → RAG → Claude più informato su V32. Il loop è intenzionale.

8. **Proteggi il sapere.**
   `_VAULT/` per i segreti. RAG per la conoscenza. Git per il codice. Backup AES-256 per tutto.

9. **Reinvesti il margine — 60% anno 1.**
   BEP V32 = 61 ore. Ogni ora sopra il BEP è reinvestita in strumenti, formazione, scala.

10. **Libertà sopra profitto.**
    Il capannone entro 2030 non è un obiettivo lavorativo — è un obiettivo di sovranità.

---

## SETUP GETAC

```
Username:   benen
Python:     C:\Users\benen\tools\python311\python.exe
Node/npm:   C:\Users\benen\tools\nodejs\
GitHub CLI: C:\Users\benen\tools\gh\gh.exe
Env vars:   _VAULT/KEYS/titanium_os.env
PYTHONPATH: C:\Users\benen\TITANIUM_OS\TITANIUM_OS
MENTE_DIR:  C:\Users\benen\MICROINDUSTRY\MENTE
```

---

## REGOLE CODICE (non negoziabili)

```python
# header obbligatorio ogni file Python:
# nome_modulo.py | TITANIUM_OS / NODO / SOTTOSISTEMA | vX.Y | YYYY-MM-DD

# path: sempre così
from pathlib import Path
BASE = Path(__file__).resolve().parents[N]
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))

# MAI così:
# "C:\\Users\\benen\\..."   ← hardcoded, rompe su qualsiasi altra macchina
# "C:\\Users\\Matteo\\..."  ← username sbagliato
```

---

## PIPELINE CONOSCENZA (il loop che si autoalimenta)

```
Officina / Chat / Web
        ↓
MENTE/SESSIONI/YYYY-MM-DD_tema.md   ← cattura manuale (60 sec)
        ↓
rag-rebuild                          ← indicizza in ChromaDB
        ↓
Claude conosce quella info nelle sessioni future
        ↓
Migliore output → migliore documentazione → RAG più ricco
```

Questo è il compounding del sapere. Ogni documento aggiunto vale per sempre.
