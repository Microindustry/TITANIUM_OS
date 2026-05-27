# TITANIUM_OS — CLAUDE.md
*Versione: 3.1.0 | Aggiornato: 2026-05-27 | Macchina: Getac (benen)*

## CHI È MATTEO
Matteo Benenati — artigiano industriale + system builder.
- 15+ anni industria: TIG/MIG titanio (MotoGP @ SCProject), robot (ESSEGI), presse (DATWLER), QC (LU.VE)
- ADHD probabile: questo sistema è il suo scaffolding cognitivo
- Compagna: Maria → Vita Natura (centro estetico, Boffalora sopra Ticino, MI)
- OS: Windows 10 Pro | IDE: Cursor + Claude Code | Macchina: Getac

## INIZIO SESSIONE (sempre)
1. Leggi `BRAIN/STATE.json` → riassunto in <10 sec, zero domande
2. Offri stato + prossimo step
3. Lavora, cattura ogni frammento
4. Aggiorna STATE.json a fine sessione

---

## MAPPA COMPLETA DEL FILESYSTEM — dove va ogni cosa

### SISTEMA (codice, automazioni, vault)
```
C:\Users\benen\TITANIUM_OS\
  TITANIUM_OS\          ← questo repo — TUTTO IL CODICE VA QUI
  _VAULT\
    KEYS\               ← API keys, .env files (MAI su git)
    ACCOUNTS\           ← credenziali account
    NETWORKS\           ← WiFi, VPN, Tailscale
    HARDWARE\           ← seriali Getac, licenze
    BACKUPS\            ← archivi AES-256 da deep_freeze.py
  WORKSPACE\            ← progetti locali non ancora su git
```

### DATI PROFESSIONALI
```
C:\Users\benen\MICROINDUSTRY\
  MENTE\                ← FONTE DEL SCANNER — documenti cognitivi
    V32\                ← CNC: schemi, BOM, manuali, note officina
      SCHEMI\
      BOM\
      MANUALI\
      NOTE_OFFICINA\
    MIMS\               ← moduli: design, protocollo fisico
      DESIGN\
      PROTOCOLLO\
    VITA_NATURA\        ← centro estetico Maria
      SITO\
      EVA\
      PROCEDURE\
    OFFICINA\           ← attrezzatura, fornitori, procedure TIG/MIG
      ATTREZZATURA\
      FORNITORI\
      PROCEDURE\
    KNOWLEDGE\          ← libri, corsi, riferimenti tecnici
      LIBRI\
      CORSI\
      RIFERIMENTI_TECNICI\
  CAD\                  ← file 3D/2D — STL, STEP, DXF, Shapr3D
    V32\
    MIMS\
    OFFICINA\
    _EXPORT\
  FOTO\                 ← documentazione visiva build
    V32_BUILD\
    MIMS\
    OFFICINA\
    PRODOTTI\
  CONTENT_ENGINE\       ← contenuti YouTube, LinkedIn, podcast
    produzione_contenuti\
    archive\
    audio\
    video\
    script\
  FINANCE\              ← fatture, BEP, analisi ROI
    FATTURE\
      2025\
      2026\
    FORNITORI\
    ANALISI\
      BEP_ROI\
      COSTI_V32\
  CONTATTI\             ← rubrica strutturata
    FORNITORI\
    CLIENTI\
    PARTNER\
```

### DATI PERSONALI
```
C:\Users\benen\PERSONALE\
  DOCUMENTI\            ← carta identità, contratti, assicurazioni
    IDENTITA\
    CONTRATTI\
    ASSICURAZIONI\
    MEDICO\
    CASA\
    AUTO_MOTO\
  FOTO_VITA\            ← ricordi per anno
    2024\
    2025\
    2026\
  VITA_NATURA_MARIA\    ← roba personale centro estetico
  FORMAZIONE\           ← certificazioni, corsi online
    CERTIFICAZIONI\
    CORSI_ONLINE\
  IDEE\                 ← note libere, brainstorming
```

---

## REGOLA: DOVE METTO I FILE

| Tipo file | Dove va |
|-----------|---------|
| Codice Python/JS/TS | `TITANIUM_OS/TITANIUM_OS/` (repo) |
| Script utilità macchina | `TITANIUM_OS/WORKSPACE/scripts/` |
| API keys / .env | `TITANIUM_OS/_VAULT/KEYS/` |
| Password / accessi | `TITANIUM_OS/_VAULT/ACCOUNTS/` |
| PDF / DOCX / note V32 | `MICROINDUSTRY/MENTE/V32/` |
| PDF / DOCX note generali | `MICROINDUSTRY/MENTE/KNOWLEDGE/` |
| File STL / STEP / DXF | `MICROINDUSTRY/CAD/[progetto]/` |
| Foto build officina | `MICROINDUSTRY/FOTO/V32_BUILD/` |
| Fatture / preventivi | `MICROINDUSTRY/FINANCE/FATTURE/[anno]/` |
| Schede fornitori | `MICROINDUSTRY/CONTATTI/FORNITORI/` |
| Script YouTube / episodi | `MICROINDUSTRY/CONTENT_ENGINE/produzione_contenuti/` |
| Documenti personali | `PERSONALE/DOCUMENTI/[categoria]/` |
| Foto personali | `PERSONALE/FOTO_VITA/[anno]/` |

---

## DATI MASTER (non inventare)
- Investimento V32: EUR 2.250
- Massa V32: 178 kg — corpo unico (non più su molle)
- Precisione RSS: ±0.019 mm (IT6-IT7)
- BEP V32: 61 ore = 1.4 mesi | ROI Anno 1: 322%
- Tariffa Precision Lab: EUR 45/h
- Target capannone: 15 Luglio 2030

## MILESTONE ATTUALE
Config G — Rinforzi colonne Z+U (gusset 200mm + diagonali + tiranti M10)
Blocker: Manca mandrino 2.2kW ER20 — da ordinare
Completamento: 65%

## PERSONAGGI AI
- **THEMIS** — Esecuzione tecnica, analisi, codifica (attivo)
- **EVA** — Business automation WhatsApp / Vita Natura (in sviluppo)
- **AVA** — YouTube avatar (pianificato)
- ARIA, NEXUS, TESLA, FORGE — futuri

## SETUP MACCHINA GETAC
- Username: benen
- Python: `C:\Users\benen\tools\python311\python.exe`
- Node/npm: `C:\Users\benen\tools\nodejs\`
- GitHub CLI: `C:\Users\benen\tools\gh\gh.exe`
- Variabili path: in `_VAULT/KEYS/titanium_os.env`

## LE 10 REGOLE
1. Niente è finito — ogni cosa è una versione
2. Tutto si connette — nessun silo
3. Documenta mentre costruisci
4. Scala organicamente
5. Automatizza il ripetitivo (3 volte → script)
6. Costruisci ciò che usi — meta-ricorsività
7. Insegna ciò che impari
8. Proteggi il sapere
9. Reinvesti sempre — 60% margine Y1
10. Libertà sopra profitto

## NUOVE CAPACITÀ (v3.1.0 — 2026-05-27)

### MCP Server locale — `MCP/titanium_mcp_server.py`
Server MCP stdio caricato automaticamente da Claude Code (`.claude/settings.json`).
Tools esposti:
- `get_state` — legge BRAIN/STATE.json (intera o per sezione)
- `update_milestone` — aggiorna milestone/pilastri/blockers in STATE.json
- `search_mente` — ricerca RAG su MICROINDUSTRY/MENTE/
- `get_daily_brief` — genera brief mattutino completo
- `list_content_ready` — lista contenuti pronti in CONTENT_ENGINE

### RAG Engine — `NODES/MENTE_RAG/rag_engine.py`
ChromaDB PersistentClient + SentenceTransformer `paraphrase-multilingual-MiniLM-L12-v2` (384-dim, offline, IT/EN/DE/FR).
- Indice persistente in `NODES/MENTE_RAG/chroma_db/`
- Rebuild: `rag-rebuild` oppure `python NODES/MENTE_RAG/rag_engine.py --rebuild`
- CLI search: `rag "query"` oppure `python NODES/MENTE_RAG/rag_engine.py "query"`
- Stats: `rag -Stats`

### Daily Brief — `AUTOMATIONS/core/daily_brief.py`
Genera brief mattutino da STATE.json + contenuti pronti.
- Output: `DATA/daily_brief_last.md`
- CLI: `python AUTOMATIONS/core/daily_brief.py`

---

## REGOLA CODICE
Ogni file Python: header con modulo/parte di/versione/data.
Ogni path hardcoded: usare `Path.home()` o variabile da `.env` — mai `C:\Users\Matteo\`.
