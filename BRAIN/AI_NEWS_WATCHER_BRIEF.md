# AI NEWS WATCHER — BRIEF
*Origine: sessione Claude desktop "AI News Watcher + Creator List" (spunto: reel di
dariofontanel.ai su LLM-Wiki di Karpathy). Catturato nel repo 07/06/2026 (sessione #34).*

> Sistema di monitoraggio AI per GENESIS OS: segue creator/fonti, estrae criticità
> rilevanti, le porta come segnali azionabili nel sistema. Logica a **tier** con
> rotazione automatica — non si controlla tutto ogni volta.

---

## 1. LISTA CREATOR (30+)

### Tecnici / LLM
- **Karpathy** — `github.com/karpathy` (LLM-Wiki, nanoGPT)
- **3Blue1Brown** — `github.com/3b1b`
- **Fireship** — `github.com/fireship-io`
- **Two Minute Papers**
- **Matthew Berman** — `github.com/TheMattBerman`

### Agenti / Builder — **PRIORITÀ ALTA**
- **Cole Medin** — `github.com/coleam00` (repo: Archon, ottomator-agents, context-engineering-intro)
- **AI Jason** — `github.com/JayZeeDesign` (repo: researcher-gpt, awesome-claude-skills)
- **Nate Herk** — `github.com/nateherkai`
- **Greg Isenberg** · **Liam Ottley** · **Alex Finn** · **Riley Brown** · **Corbin Brown** · **David Ondrej**
- **Sabrina Ramonov** — `github.com/SabrinaRamonov`
- **Simon Willison** — `github.com/simonw`
- **Eugene Yan** — `github.com/eugeneyan`
- **Swyx / Latent Space**

### News / Tool
- **Matt Wolfe** · **Wes Roth** · **AI Explained** · **The AI Advantage (Igor)** · **Skill Leap AI**

### Big Picture
- **Lex Fridman** · **Dwarkesh Patel** · **Y Combinator**

### Italiani — **PRIORITÀ ALTA**
- **Simone Rizzo** — `github.com/simone-rizzo`
- **Antonio Guadagno** · **dariofontanel.ai** · **gabriaprile** (IG) · **IA per Tutti**
- **Raffaele Gaito** · **Silvio Luchetti** · **Professor Glitch**

### Tool ufficiali
- **LangChain** — `github.com/langchain-ai`
- **AssemblyAI** · **IBM Technology**

### Nuovi da aggiungere
- **gabriaprile** — IG italiano, Claude Code pratico — Tier 2
- **safishamsi** — `github.com/safishamsi`, autore di **Graphify** — monitorare repo — Tier 2

---

## 2. LOGICA DI MONITORAGGIO (a tier)

| Tier | Frequenza | Chi |
|------|-----------|-----|
| **Tier 1** | ogni **48h** | solo chi ha già dimostrato utilità (max 8-10) |
| **Tier 2** | settimanale | tutti gli altri |
| **Tier 3** | sospesi | mai stati utili, rivalutazione solo manuale |

**Rotazione automatica:**
- Tier 2 → Tier 1: **2+ criticità rilevanti in 2 settimane**
- Tier 1 → Tier 2: **nessun segnale per 3 settimane**
- Tier 2 → Tier 3: **nessun segnale per 6 settimane**

**Output:** un item per criticità → `DATA/ai_news_watcher_state.json` (separato da `STATE.json`),
con: `fonte, url, sintesi (1 riga), rilevanza, stato, tier, visto_il`.

---

## 3. SORGENTI DA MONITORARE

- **GitHub**: profili creator · `github.com/topics/claude-code` · `github.com/topics/ai-agents` ·
  GitHub Trending Python (weekly) · query mirate: `site:github.com "claude code" skill`,
  `site:github.com "CLAUDE.md" context engineering`
- **YouTube**: nuovi video dei creator (YouTube Data API v3)
- **Instagram** (no API pubblica): @dariofontanel.ai, @gabriaprile, @simorizzo_ai,
  @antonio_guadagno_ita, @pillole.di.ai + hashtag #claudecode #aiagents #secondbrain #contextengineering
- **Siti**: anthropic.com/news, docs.anthropic.com, n8n.io/blog, blog.langchain.dev,
  simonwillison.net, karpathy.ai, latent.space, eugeneyan.com

---

## 4. DECISIONI IMPLEMENTATIVE (delegate al terminale)

1. **Architettura watcher**: job su `titanium-scanner` (GitHub Actions esistente) **oppure** repo separato — da decidere.
2. **Instagram**: nessuna API pubblica → approccio via RSS di terze parti / tool dedicati.
3. **Stato tier**: `DATA/ai_news_watcher_state.json` (separato dallo `STATE.json` principale).
4. **API necessarie**: YouTube Data API v3, GitHub REST API, fetch+parsing per i siti.

---

## 5. STATO IMPLEMENTAZIONE (07/06/2026)

- [✓] Brief catturato nel repo (questo file).
- [✓] **Graphify implementato** (criticità #1 di questa lista — vedi changelog RAG→Wiki).
- [✓] Scaffold stato tier: `DATA/ai_news_watcher_state.json`.
- [ ] Watcher 48h: architettura + wiring API (richiede chiavi YouTube/GitHub) — da costruire.
- [ ] Sorgente Instagram (RSS terze parti) — da valutare.

---

## NOTA OPERATIVA
Sessioni ordinarie GENESIS → risparmio token. **Sessioni di upgrade-sistema → massima potenza.**
