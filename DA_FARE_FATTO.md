# DA FARE / COSA HO FATTO — la BUSSOLA viva di TITANIUM_OS

*Questa è la scaletta condivisa io↔Matteo: dove siamo, cosa è fatto, cosa resta.*
*Si legge a INIZIO sessione e si aggiorna STRADA FACENDO (non a fine soltanto).*

**REGOLE DELLA BUSSOLA (standard):**
- **Non si cancella mai.** Si cambia solo lo stato di una riga. Se una cosa salta,
  si scrive `[✗] non fatto — motivo`, non si toglie.
- **Append in cima**: il blocco della sessione più recente va in alto.
- Stati: `[✓] fatto` · `[◐] in corso` · `[ ] da fare` · `[✗] non fatto` · `[💡] idea`.
- Canonica = QUESTO file (repo, versionato). Mirror per Matteo = Desktop
  `da fare e cosa ho fatto.txt`. Li tengo allineati.
- Il PIANO completo (visione, punti P1-P8) vive nel mirror Desktop + in
  `PROSSIMA_SESSIONE.md`. Qui sta la scaletta operativa, non tutto il piano.

---

## Sessione #32-33 · 06-07/06/2026

### [✓] FATTO
- [✓] P1a AUTOMAZ → view a stato operativo reale (persistente/event/scheduled/
      on-demand/dormiente) + badge live da `/api/watchdog/status` e
      `/api/tasks/notturne`. Scoperta: i ~14 file "(da creare)" esistevano già
      → "dormienti". (commit 5f148a7, b70b4e2)
- [✓] Leva LLM locale ACCESA: Ollama + Qwen2.5-7B sulla GPU (model_ready=true).
- [✓] P2 binario AVVENTURA: `BIBBIA_DEL_MONDO.md` + pilota `EP_AV_00` "La Bambina
      e la Giuntura" (Nina + THEMIS vs l'Entropia), in posizione definitiva.
      (commit 8979d14, bc9a86b)
- [✓] Sotto-voce "Avventura" nella sidebar sotto STORIE (rosa). (commit 95eb5fb)
- [✓] Anomalia TI_NightAudit risolta (gira @03:52 OK).
- [✓] Notte autonoma: story_agent 3 episodi + night_audit + push su GitHub.
- [✓] Decisione: l'Avventura RESTA sotto-voce (NON diventa front-page). [Matteo]
- [✓] Bussola standardizzata: questo file, letto a inizio sessione.
- [✓] UNITO bussola ↔ CRITICHE: il night_audit legge questa bussola, emette
      bussola_todos.json e la mostra come ramo "📋 Bussola" nella vista CRITICHE;
      i todo aperti vanno anche a Sonnet come contesto (area ROADMAP). Endpoint
      /api/bussola/todos. Si rigenera ogni notte. [richiesta Matteo 07/06 — FATTO]
      ⚠ va LIVE al riavvio di api_server (restart_api.ps1) o al prossimo login.
- [✓] Skill "salva" creata (.claude/skills/salva): chiusura sessione standardizzata
      (bussola+mirror, STATE, RIAVVIO, verifiche storie/build, commit+push).
- [✓] Processo episodi Nina DEFINITO (bibbia sez. 9): la fonte è il canone tecnico
      (1 concetto reale → 1 avventura); pipeline 2 stadi: auto estrae "concept brief",
      Claude scrive l'episodio DEFINITIVO (no bozze).
- [✓] Verificato 07/06: storie 0 orfani (120 in dashboard, 111 .md), GitHub allineato.

### [ ] DA FARE (prossimo — in ordine di priorità)
- [ ] **#1 AUTOMATIZZARE LE STORIE DI NINA** (candidato primo punto prossima sessione):
      passo auto che estrae i "concept brief" dai nuovi episodi tecnici e li mette in
      coda; poi Claude scrive l'episodio definitivo dal brief. Pipeline a 2 stadi
      (bibbia sez. 9). L'auto PREPARA, la scrittura resta di qualità.
- [ ] **#2 EP_AV_01 "l'Automazione"** — primo episodio Nina dopo il pilota (definitivo).
- [ ] **#3 RINOMINI dashboard** [richiesta Matteo 07/06]: MAPPA → **BUSSOLA**,
      RETE → **RAG**. ⚠ COLLISIONE NOME: oggi "Bussola" è già il ramo todo in CRITICHE.
      Da risolvere: il ramo todo si chiama "SCALETTA"/"ROTTA" (file resta DA_FARE_FATTO.md)
      e MAPPA prende "BUSSOLA". → CONFERMA Matteo prima di implementare.
- [ ] #4 Critiche = quest · MAPPA(→Bussola) = mondo (collegare avventura ai dati reali).
- [ ] #5 Cablare MiniMax M3 nel toggle chat (serve key OpenRouter → `_VAULT/KEYS`).
- [ ] #6 P1c: livelli (lv) che salgono da progressi reali.

### [💡] IDEE / NOTE
- [💡] La bussola può diventare un input del session_orienter / daily_brief, così
      anche le automazioni "sanno dove siamo", non solo io.
- [💡] "Concept brief" come tabella in dashboard: la coda dei concetti-tecnici pronti
      a diventare avventure di Nina (visibilità del processo).
