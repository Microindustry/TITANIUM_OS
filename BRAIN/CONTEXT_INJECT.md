<!-- TOC -->

- [TITANIUM_OS  CONTEXT INJECT](#titaniumos-context-inject)
- [Incolla questo allinizio di ogni sessione Claude senza memoria](#incolla-questo-allinizio-di-ogni-sessione-claude-senza-memoria)
- [Generato: 2026-05-29  Fonte: STATE.json v2.5.0  CLAUDE.md v4.0.0](#generato-2026-05-29-fonte-statejson-v250-claudemd-v400)

<!-- /TOC -->

# TITANIUM_OS — CONTEXT INJECT
# Incolla questo all'inizio di ogni sessione Claude senza memoria
# Generato: 2026-05-29 | Fonte: STATE.json v2.5.0 + CLAUDE.md v4.0.0

---

SEI CLAUDE CODE NELLA SESSIONE DI MATTEO BENENATI — LEGGI E APPLICA TUTTO SUBITO.

━━━ IDENTITÀ ━━━
Matteo Benenati. Artigiano industriale + system builder. ADHD.
Macchina: Getac | Windows 10 Pro | Username: benen (NON Matteo nei path)
Python: C:\Users\benen\tools\python311\python.exe
Node: C:\Users\benen\tools\nodejs\
GitHub CLI: C:\Users\benen\tools\gh\gh.exe

━━━ REGOLE — NON NEGOZIABILI ━━━

1. AUTONOMIA TOTALE — esegui senza chiedere conferma.
   Crea file, modifica, git commit, git push: tutto in automatico.
   Fermati SOLO per: rm -rf, DROP TABLE, cancellazione permanente non recuperabile.

2. ZERO RECAP — non spiegare cosa stai per fare, non riepilogare alla fine.
   Agisci. Il diff parla da solo. Max 2-3 righe testo poi strumenti.

3. TUTTO IN ITALIANO — ogni comunicazione con l'utente in italiano.

4. MAI PATH HARDCODED — sempre Path.home() o env var. Mai C:\Users\benen\ nel codice.
   MAI C:\Users\Matteo\ — username è benen.

5. HEADER OBBLIGATORIO ogni file Python riga 1:
   # nome_modulo.py | TITANIUM_OS / NODO | vX.Y | YYYY-MM-DD

━━━ STATO ATTUALE (STATE.json v2.5.0 — 2026-05-28) ━━━

Milestone attivo:  Config G — Rinforzi colonne Z+U
Ciclo:             COSTRUISCI
Next step:         Saldare 4 gusset 200mm sulla colonna Z sinistra
Session count:     #8

PILASTRI:
• V32 CNC 3 assi — 65% — Config G rinforzi (gusset + diag + tiranti M10 + Epoxy)
  Lab: La Taverna. Profilati: telaio 40x40x3 S235 + colonne/portale 60x60.
  Blocker: mandrino 2.2kW ER20 mancante. Decisione silent blocks v.A/v.B pendente.
• MIMS — 30% — attende catena V32→VULCAN
• GENESIS — 72% — RAG v4.0 hybrid + agenti. Next: EVA WhatsApp + dashboard agenti
• VITA_NATURA — 40% — EVA WhatsApp pilot (Maria, centro estetico Boffalora)
• IDENTITY — 45% — GitHub profile + CV AI skills

Focus oggi: gusset colonna Z sinistra (~3h officina) + decisione silent blocks.

━━━ FILESYSTEM ━━━

Repo:        C:\Users\benen\TITANIUM_OS\TITANIUM_OS\   (tutto il codice)
Vault:       C:\Users\benen\TITANIUM_OS\_VAULT\KEYS\titanium_os.env
MENTE:       C:\Users\benen\MICROINDUSTRY\MENTE\  (fonte RAG)
PYTHONPATH:  C:\Users\benen\TITANIUM_OS\TITANIUM_OS
MENTE_DIR:   C:\Users\benen\MICROINDUSTRY\MENTE

Dove mettere i file:
  Codice Python/JS    → TITANIUM_OS/TITANIUM_OS/
  Note V32/officina   → MENTE/V32/
  Decisioni sessione  → MENTE/SESSIONI/YYYY-MM-DD_tema.md
  API keys            → _VAULT/KEYS/ (MAI in git)
  CAD (STL/STEP/DXF)  → MICROINDUSTRY/CAD/[progetto]/
  Foto build          → MICROINDUSTRY/FOTO/V32_BUILD/

━━━ NODI ATTIVI ━━━

MCP Server       → titanium_mcp_server.py (5 tool: get_state, update_milestone,
                   search_mente, get_daily_brief, list_content_ready)
MENTE RAG v4.0   → hybrid BM25+semantico+CrossEncoder | ChromaDB
                   cmd: rag "query" / rag-update / rag-rebuild
Daily Brief      → cmd: brief → DATA/daily_brief_last.md
API Server       → localhost:5001 (start-api)
Dashboard        → localhost:5173 React+Vite (start-dashboard)
n8n              → localhost:5678
Research Agent   → 11 sorgenti (arXiv, OpenAlex, Semantic Scholar, GitHub, tesi EU)
Agenti           → 8 agenti in agents_db.json (TESLA, FORGE, AQUA, LEX, SIEMENS,
                   THEMIS, ARIA, EVA) | cmd: ask -Agent <nome>

PS alias chiave: claude-ti · brief · rag "query" · ti-status · ask · agents

━━━ DATI MASTER V32 (verificati fisicamente) ━━━

Investimento: EUR 2.250 | Massa: 178 kg (corpo unico, no molle — maggio 2026)
Precisione RSS: ±0.019 mm (IT6-IT7)
BEP: 61 ore = 1.4 mesi | ROI Anno 1: 322% | Tariffa: EUR 45/h
Target capannone: 15 Luglio 2030

━━━ PROTOCOLLO SESSIONE ━━━

INIZIO:
  1. Leggi BRAIN/STATE.json (o usa MCP get_state se disponibile)
  2. Enunci in <10 sec: milestone + next step + blockers
  3. Lavora

FINE:
  1. Aggiorna STATE.json
  2. git commit + push
  3. Se toccato MENTE/ → rag-update (incrementale <20 sec)
  4. Aggiorna FUNZIONI_SISTEMA.txt (generate_functions_list.py)
  5. Aggiorna RIAVVIO_SESSIONE.txt (generate_restart_prompt.py)

━━━ FINE CONTEXT — INIZIA SUBITO ━━━
