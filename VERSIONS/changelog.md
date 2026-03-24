# TITANIUM_OS — CHANGELOG

## 2026-03-25 — v5.0.0 — DASHBOARD REBRANDING + ENGINE OVERHAUL

### State Management — Context → Zustand + TanStack Query
- **Zustand store** (`stores/systemStore.ts`): UI state centralizzato (view, focusTarget, expandedCell, navigateTo)
- **TanStack Query** (`hooks/useSystemQuery.ts`): server state con cache condivisa, polling 10s, stale-while-revalidate
- **Bridge backward-compatible** (`hooks/SystemStateContext.tsx`): `useGlobalState()` ora delega a `useSystemQuery()`
- Eliminati 3 polling indipendenti (App 10s, NeuroOS 30s, Ecosystem 15s) → singola cache condivisa
- Selector hooks: `usePillar()`, `useMdFiles()`, `useContentFiles()`, `useFile()`, `useDigest()`

### Network — localhost:5001 → Vite Middleware
- Tutte le API calls ora relative (`/api/state`, `/api/md-files`, `/api/content-files`, `/api/file`)
- Dashboard funziona senza Flask (Vite middleware serve read ops)
- Flask resta solo per operazioni pesanti (scan, TTS, video, semantic search)
- Fix: `NeuroOSLayout`, `EcosystemView`, `EcosystemGrid`, `NeuroMapView`, `useSystemState` — rimosso hardcoded localhost

### Navigazione Guidata — VIEW_NAV System
- Ogni vista ha ruolo, descrizione, cross-links verso viste correlate
- **GuideBar** in App.tsx: mostra ruolo corrente + suggerimenti navigazione
- CANVAS primo nell'ordine (punto di partenza operativo)
- `navigateTo(view, target)` da qualsiasi componente via Zustand

### CanvasLayout — Celle Rinominate + Interattive
- COMANDO → "AZIONE · COSA FARE ORA"
- NODI · GENESIS → "NODI · INFRASTRUTTURA" — click nodo → naviga a MAPPA
- PILASTRI → "PROGETTI · CLICK PER DETTAGLI" — click pilastro → naviga a SINAPSI
- ECOTREE → "ARCHITETTURA · FILE SYSTEM"
- NEURO MAP → "INTELLIGENCE · MENTE SCANNER"
- MENTE → "RICERCA · DECISIONI" — cross-link "vedi rete →"
- CONTENT → "CONTENUTI · EPISODI" — cross-link "vista completa →" a STORIE

### Componenti Aggiornati
- `NeuroOSLayout.tsx`: rimosso polling locale, usa cache TanStack condivisa
- `EcosystemView.tsx`: nuovo file, rimosso fetch diretto, usa `useGlobalState()`
- `EcosystemGrid.tsx`: date celle da cache condivisa
- `MdManager.tsx`: migrato a `useMdFiles()` hook
- `StorieView.tsx`: conteggio episodi live da `/api/content-files`, cross-links
- `App.tsx` v5.0: `QueryClientProvider`, prefetch su cambio vista, GuideBar

### Infrastruttura
- `package.json`: +zustand, +@tanstack/react-query
- `vite.config.ts`: middleware API ampliato
- `.gitignore`: +node_modules, +dist, +.vite

## 2026-03-10 — v2.1.0
- [KNOWLEDGE] Creati 15 file .md in BRAIN/KNOWLEDGE/ (economics, technical, mims, system)
- [KNOWLEDGE] Aggiunti 4 file post-audit: genesis-architecture, the-board-prompts, revenue-target-y1, tech-stack-unified, fit-park-specs
- [BOM] Aggiunti: 4× Molle Gialle 90N Config G + 2× Piastre XY V32 in bomData.ts
- [DASHBOARD] ecosystemTree.ts: nodo KNOWLEDGE con 4 sottocartelle (active)
- [STATE] v2.1.0 — session_count 2, GENESIS 25%, milestone KNOWLEDGE popolata
- [CLAUDE.md] Fix: "Prossima milestone" → "Milestone attuale (in corso — 65%)"
- [CONFIGS] configurations.md v1.1: costi marcati come STIME + procedura smontaggio per tutti e 3 i livelli
- [LEX] lex-digitalis.md: lingua commenti definitiva → ITALIANO sempre

## 2026-03-09 11:49:54
- [SETUP] Setup iniziale TITANIUM_OS v1.0.0 completato

- `2026-03-10 20:25:06` ✨ CREATED — DATA\test_watcher_ping.txt
- `2026-03-10 20:25:07` ✏️ MODIFIED — **CLAUDE.md**
- `2026-03-10 20:25:07` ✏️ MODIFIED — requirements.txt
- `2026-03-10 20:25:17` 🗑️ DELETED — DATA\test_watcher_ping.txt
- `2026-03-10 20:26:50` ✨ CREATED — AUTOMATIONS\deploy\n8n\docker-compose.yml.tmp.10152.1773170810314
- `2026-03-10 20:26:57` ✨ CREATED — AUTOMATIONS\deploy\n8n\.env.example.tmp.10152.1773170817597
- `2026-03-10 20:27:16` ✨ CREATED — AUTOMATIONS\deploy\n8n\DEPLOY.md.tmp.10152.1773170836093
- `2026-03-10 20:28:30` ✨ CREATED — AUTOMATIONS\deploy\n8n\DEPLOY.md.tmp.10152.1773170910377
- `2026-03-10 20:28:30` 🗑️ DELETED — AUTOMATIONS\deploy\n8n\DEPLOY.md
- `2026-03-10 20:28:54` ✏️ MODIFIED — **DATA\projects.json**
- `2026-03-10 20:29:06` ✨ CREATED — DATA\costs.json.tmp.10152.1773170946734
- `2026-03-10 20:29:57` ✨ CREATED — AUTOMATIONS\deploy\n8n\docker-compose.yml.tmp.10152.1773170997264
- `2026-03-10 20:29:57` 🗑️ DELETED — AUTOMATIONS\deploy\n8n\docker-compose.yml
- `2026-03-10 20:30:30` ✨ CREATED — AUTOMATIONS\deploy\n8n\DEPLOY.md.tmp.10152.1773171030089
- `2026-03-10 20:30:30` 🗑️ DELETED — AUTOMATIONS\deploy\n8n\DEPLOY.md
- `2026-03-10 20:30:44` ✨ CREATED — DATA\costs.json.tmp.10152.1773171044696
- `2026-03-10 20:30:44` 🗑️ DELETED — DATA\costs.json
- `2026-03-10 20:33:08` ✏️ MODIFIED — DASHBOARD\index.html
- `2026-03-10 20:40:55` ✏️ MODIFIED — DASHBOARD\start-dev.mjs
- `2026-03-10 20:40:55` ✏️ MODIFIED — DASHBOARD\package.json
- `2026-03-10 20:40:55` ✏️ MODIFIED — DASHBOARD\tsconfig.json
- `2026-03-10 20:40:55` ✏️ MODIFIED — DASHBOARD\vite.config.ts
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\src\main.tsx
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\tsconfig.app.json
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\tsconfig.node.json
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\src\App.tsx
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\src\index.css
- `2026-03-10 20:40:56` ✏️ MODIFIED — .gitignore
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\.gitignore
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\src\components\EcosystemLayout.tsx
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\.claude\launch.json
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\start-dev.js
- `2026-03-10 20:40:56` ✏️ MODIFIED — DASHBOARD\.claude\settings.local.json
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\.cursorrules
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\TITANIUM_MANIFESTO.md
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\.vscode\settings.json
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\EcosystemGrid.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\ECOSYSTEM_ARCHITECTURE.md
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\assets\react.svg
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\EcoTreeView.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\eslint.config.js
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\public\vite.svg
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\UIComponents.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\CatalogView.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\README.md
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\VincenteView.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\CellShell.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\data\bomData.ts
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\DashboardView.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\data\ecosystemTree.ts
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\components\WarehouseView.tsx
- `2026-03-10 20:40:57` ✏️ MODIFIED — DASHBOARD\src\App.css
- `2026-03-10 20:41:56` ✨ CREATED — BRAIN\STATE.json.tmp.10152.1773171716253
- `2026-03-10 20:42:05` ✨ CREATED — BRAIN\STATE.json.tmp.10152.1773171725359
- `2026-03-10 20:48:17` ✨ CREATED — AUTOMATIONS\deploy\n8n\workflow_mente_scanner.json.tmp.10152.1773172097466
- `2026-03-10 20:48:47` ✨ CREATED — AUTOMATIONS\deploy\n8n\workflow_mente_scanner.json.tmp.10152.1773172127303
- `2026-03-10 20:48:47` 🗑️ DELETED — AUTOMATIONS\deploy\n8n\workflow_mente_scanner.json
- `2026-03-10 20:56:54` ✨ CREATED — DASHBOARD\src\index.css.tmp.10152.1773172614859
- `2026-03-10 20:56:54` 🗑️ DELETED — DASHBOARD\src\index.css
- `2026-03-10 20:57:00` ✨ CREATED — DASHBOARD\src\App.css.tmp.10152.1773172620416
- `2026-03-10 20:57:00` 🗑️ DELETED — DASHBOARD\src\App.css
- `2026-03-10 20:57:37` ✨ CREATED — DASHBOARD\src\App.tsx.tmp.10152.1773172657043
- `2026-03-10 20:57:37` 🗑️ DELETED — DASHBOARD\src\App.tsx
- `2026-03-10 20:58:33` ✨ CREATED — DASHBOARD\src\data\ecosystemTree.ts.tmp.10152.1773172713089
- `2026-03-10 20:58:33` 🗑️ DELETED — DASHBOARD\src\data\ecosystemTree.ts
- `2026-03-10 21:21:15` ✏️ MODIFIED — START_ECOSYSTEM.bat
- `2026-03-10 21:21:16` ✏️ MODIFIED — api_server.py
