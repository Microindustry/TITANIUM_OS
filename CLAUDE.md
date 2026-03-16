# TITANIUM_OS — CLAUDE.md
*Versione: 2.0.0 | Aggiornato: 2026-03-16*

## CHI È MATTEO
Matteo Benenati — Artigiano industriale + system builder.
- 15+ anni industria: TIG/MIG titanio (MotoGP @ SCProject), robot (ESSEGI), presse (DATWLER), QC (LU.VE)
- ADHD probabile: questo sistema è il suo scaffolding cognitivo
- Compagna: Maria → Vita Natura (centro estetico, Boffalora sopra Ticino, MI)
- OS: Windows | IDE: Cursor + Claude Code

## IL SISTEMA — TITANIUM VENTURES
| Pilastro | Descrizione | Status |
|----------|-------------|--------|
| **V32** | CNC 3 assi, 178kg, ±0.019mm, PLC Siemens S7-314C | In costruzione |
| **MIMS** | Micro Industry Modulo System — protocollo fisico modulare | Design OK, attende pressa |
| **GENESIS** | AI interno Python-only: watcher + scanner + api + dashboard | In build |
| **VITA NATURA / EVA** | Centro estetico Maria + AI assistant WhatsApp | In sviluppo |

## STRUTTURA CARTELLE
```
TITANIUM_OS/
  BRAIN/          <- STATE.json (stato live), RULES.md, KNOWLEDGE/, ASSOLUTO/
  CORE/           <- tutto il codice Python (watchdog, scanner, moduli)
  AUTOMATIONS/    <- core/ (moduli attivi), AUTOMATIONS_MASTER.md
  DATA/           <- JSON dati/stato + DATA/logs/
  DASHBOARD/      <- React app (Vite + Tailwind) porta 5173
  INBOX/          <- session brief (ultimi 10), idee
  ARCHIVE/        <- backup, versioni vecchie, n8n dismesso
```

## INIZIO SESSIONE (sempre)
1. Leggi `BRAIN/STATE.json` → riassunto in <10 sec, zero domande
2. Offri stato + prossimo step
3. Lavora, cattura ogni frammento
4. Aggiorna STATE.json a fine sessione

## DATI MASTER (non inventare)
- Investimento V32: EUR 2.250
- Massa V32: 178 kg (69 non sosp. + 109 sosp.)
- Precisione RSS: ±0.019 mm (IT6-IT7)
- BEP V32: 61 ore = 1.4 mesi | ROI Anno 1: 322%
- Tariffa Precision Lab: EUR 45/h
- Target capannone: 15 Luglio 2030

## MILESTONE ATTUALE
🔴 **Config G** — Rinforzi colonne Z+U (gusset 200mm + diagonali + tiranti M10)
Blocker: Manca mandrino 2.2kW ER20 — da ordinare
Completamento: 65%

## PERSONAGGI AI
- **THEMIS** — Esecuzione tecnica, analisi, codifica (attivo)
- **EVA** — Business automation WhatsApp / Vita Natura (in sviluppo)
- **AVA** — YouTube avatar (pianificato)
- ARIA, NEXUS, TESLA, FORGE — futuri

## LE 10 REGOLE (non negoziabili)
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

## REGOLA CODICE
Ogni file Python: header con modulo/parte di/versione/data + docstring input/output + commenti inline su ogni step non ovvio.
