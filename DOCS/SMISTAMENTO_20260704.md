<!-- TOC -->

- [SMISTAMENTO 2026-07-04  Desktop  chiavetta  cartelle giuste](#smistamento-2026-07-04-desktop-chiavetta-cartelle-giuste)
  - [Legenda destinazioni (tabella CLAUDE.md)](#legenda-destinazioni-tabella-claudemd)
  - [A  CREDENZIALI (in chiaro sul Desktop  _VAULT)](#a-credenziali-in-chiaro-sul-desktop-vault)
  - [B  SAPERE  MENTE](#b-sapere-mente)
  - [C  CAD](#c-cad)
  - [D  ARCHIVIO STORICO  MICROINDUSTRY/_ARCHIVIO/CHIAVETTA_20260704/](#d-archivio-storico-microindustryarchiviochiavetta20260704)
  - [E  REPO](#e-repo)
  - [F  DESKTOP a fine giro](#f-desktop-a-fine-giro)
  - [NON toccato (decisione Matteo)](#non-toccato-decisione-matteo)

<!-- /TOC -->

# SMISTAMENTO 2026-07-04 — Desktop + chiavetta → cartelle giuste
*Ondata A del piano #54 (bussola). Regola: NIENTE delete di contenuto — solo MOVE tracciati.*
*Questa è la mappa vecchio→nuovo: ogni riga è reversibile (sposti indietro e torna tutto com'era).*

## Legenda destinazioni (tabella CLAUDE.md)
- Sapere → `MICROINDUSTRY/MENTE/` (entra nel RAG all'incrementale notturno)
- Credenziali → `TITANIUM_OS/_VAULT/ACCOUNTS/` (gitignored, verificato con check-ignore)
- CAD → `MICROINDUSTRY/CAD/`
- Storia/superato → `MICROINDUSTRY/_ARCHIVIO/CHIAVETTA_20260704/` (cold storage, fuori RAG)
- Codice utile → repo `TITANIUM_OS/`

## A — CREDENZIALI (in chiaro sul Desktop → _VAULT) 🔴
| Da | A |
|---|---|
| `chiavetta\CREDENZIALI_BACKUP.md` | `_VAULT/ACCOUNTS/CHIAVETTA/` |
| `chiavetta\Credentials - n8n[DEV].url` | `_VAULT/ACCOUNTS/CHIAVETTA/` |
| `chiavetta\MARI DOC\becap gmail.pdf` | `_VAULT/ACCOUNTS/CHIAVETTA/` |
| `Desktop\dati getac.txt` | `_VAULT/ACCOUNTS/CHIAVETTA/` |

## B — SAPERE → MENTE
| Da | A | Perché |
|---|---|---|
| `chiavetta\MARI DOC\` (resto) | `MENTE/VITA_NATURA/MARI_DOC/` | listini/brand/audit Vita Natura |
| `chiavetta\logo mari.JPG` | `MENTE/VITA_NATURA/MARI_DOC/` | brand asset |
| `chiavetta\vita_natura_master_data.json` | `MENTE/VITA_NATURA/` | dati master centro |
| `chiavetta\pedana\` (5 PDF) | `MENTE/OFFICINA/PEDANA/` | progetto fisico, versioni |
| `Desktop\RISPIEGAMI LA TUA VISIONE NEL DETTAGLIO.md` | `MENTE/SESSIONI/2026-06-24_visione_libro_ia_rispiegata.md` | visione Nina/Libro-IA (doppio fondo, 3 strati) |

## C — CAD
| Da | A |
|---|---|
| `chiavetta\50\` (28 .shapr + 26 .pdf — gancio GV, prototipi V1) | `MICROINDUSTRY/CAD/GANCIO_50/` |

## D — ARCHIVIO STORICO → `MICROINDUSTRY/_ARCHIVIO/CHIAVETTA_20260704/`
| Cartella | Cos'è |
|---|---|
| `SINAPSI/` | il sistema PRE-TITANIUM (preistoria del progetto: ASSOLUTO, STORIE, STATE.md) |
| `LA MIA MENTE/` | precursore di MENTE (ASSOLUTO v1-v6, EPISODI, MIMS vecchi) |
| `Nuova cartella/` → `STAGIONE_0_ORIGINI/` | episodi origine EP_00-05 + FILONE_UNICO |
| `TITANIUM_OS/` | copia VECCHIA del repo (227MB, superata dal repo vivo con git history) |
| `TITANIUM_OS_MIGRATION/` | bundle migrazione Getac→fisso (2GB, migrazione verificata 02/06) |
| `AI_Dashboard/` | esperimento Flask superato dalla DASHBOARD attuale |
| `vita natura/` | progetto Next.js sito (superato; se serve si ripesca) |
| `CONTENT_ENGINE/` | copia vecchia della cartella repo |
| `gio/` | side project GIVEME (immagini+script py) |
| loose: `atti_*`, `estratto_*`, `extract_log`, `files.zip`, `list.html`, `lovable Index.tsx`, `viewer v1 sito base.html`, `BRIEF_CLAUDE_CODE.md`, `Nuovo documento di testo.txt`, `Screenshot - collegamento.lnk` | estratti/bozze lavoro V6 (feb-apr 2026), superati |
| `Desktop\teacher-avatar.png` | avatar vecchio (superato da Nina definitiva) |
| `Desktop\Nuovo documento di testo.txt` | vuoto (0 KB) |

## E — REPO
| Da | A | Perché |
|---|---|---|
| `DATA/tmp_kill_api.ps1` | `AUTOMATIONS/core/kill_api.ps1` | utility legittima (kill API elevata + watchdog, serve nei recovery) — promossa con header |
| `INBOX/*.md` (4 brief vecchi) | `DOCS/_archivio_inbox_20260704/` | brief consumati |

## F — DESKTOP a fine giro
Restano SOLO: shortcut (`TITANIUM/`, `.lnk`), i 2 mirror auto (`da fare e cosa ho fatto.txt`, `STATO_SISTEMA.txt`), `APRI_MENTE_Obsidian.bat`. Rimosse le cartelle vuote `FOTO REALI/`, `chiavetta/` (dopo svuotamento), `Nuova cartella (2)/` (già vuota).

## NON toccato (decisione Matteo)
- `Downloads/`: 1.8GB di installer ri-scaricabili (Ollama 1.3GB, Git x2, Obsidian, Telegram…) — da
  cancellare quando vuoi, non li tocco io.
