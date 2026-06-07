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

### [ ] DA FARE (prossimo)
- [ ] EP_AV_01 "l'Automazione" → poi 02 Misura, 03 Forge, 04 Mappa. DEFINITIVI,
      non bozze. Un concetto per episodio.
- [ ] Critiche = quest · MAPPA = mondo (collegare l'avventura ai dati reali).
- [ ] UNIRE bussola ↔ CRITICHE: tocco notturno che, ogni tot, legge questo file
      e aggiorna/arricchisce la cartella clinica (o ne trova potenzialità).
      Standardizzare il percorso. [richiesta Matteo 07/06]
- [ ] Cablare MiniMax M3 nel toggle chat (serve key OpenRouter → `_VAULT/KEYS`).
- [ ] P1c: livelli (lv) che salgono da progressi reali.

### [💡] IDEE / NOTE
- [💡] La bussola può diventare un input del session_orienter / daily_brief, così
      anche le automazioni "sanno dove siamo", non solo io.
