---
id: "EP_AUTO_015"
milestone: "Ottimizzazione Claude Code — .claudeignore, settings.json, rules/, skills portabili (26 Mar 2026)"
title: "Portabilità delle skill: il framework invisibile"
sottotitolo: "Come replicare sistemi complessi senza ricominciare da zero"
stagione: "AUTO"
data_evento: "2026-03-26"
tags: ["system-building", "automazione", "claude-code", "artigianato-digitale", "scalabilità"]
status: "ready"
durata_min: 8
reel_hook: "Tre progetti diversi: una fresatrice, un software di gestione, un bot WhatsApp. Io ricomincio da zero ogni volta, tre volte lo stesso lavoro. Poi ho centralizzato tutto in rules, skills portabili e settings.json condivisi. Una sola volta scrivo bene, infinite volte lo riuso. Non è solo velocità, è moltiplicare quello che funziona senza riscrivere. Vuoi sapere qual è stata la prima skill che mi ha salvato il tempo?"
generated: "2026-05-27T11:30:42.781587"
---
<!-- TOC -->

- [Portabilità delle skill: il framework invisibile](#portabilità-delle-skill-il-framework-invisibile)
- [Config G e il terminale alle 23:00](#config-g-e-il-terminale-alle-2300)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->


# Portabilità delle skill: il framework invisibile

# Config G e il terminale alle 23:00

> "Se lo strumento non capisce il contesto, stai programmando nel buio."

---

**Giovedì, 26 marzo 2026. 22:47.**

Sono seduto al banco, non in officina. La gusset sinistra aspetta — il mandrino 2.2kW ER20 non è ancora arrivato, Config G è al 65% e non si muove. Niente da fare con il metallo stanotte.

Apro il terminale. Cursor lampeggia.

Digito:

```bash
touch .claudeignore
mkdir rules/
```

Due comandi. Tre secondi. Sembrano poco.

---

**Il problema era questo.**

Claude Code vedeva tutto. `node_modules/`, i log temporanei di TITANIUM_OS, i file `.pyc`, i dump di STATE.json datati tre settimane fa. Ogni sessione di lavoro ricominciava con il contesto sporco. Io dicevo "continua dal punto di ieri" — e il sistema mi rispondeva come se "ieri" fosse un concetto astratto.

Con l'ADHD questo è letale. Non ho margine per ricostruire il contesto manualmente. Se il tool non sa dove siamo, ci perdiamo entrambi.

Avevo già perso due sessioni così. Una su MIMS — stavo definendo i pin di connessione modulari, 2.54mm pitch, tolleranza ±0.05mm — e Claude mi ha rigenerato un file che avevo già scritto. Non si era accorto che esisteva. Stava fuori dal contesto attivo.

Una su VULCAN — ricette polimeri, temperatura stampo 185°C, pressione 18.5t — stesso problema. Rumore di fondo che copre il segnale.

---

**Cosa cambia adesso.**

`.claudeignore` taglia il rumore. Fuori i temporanei, fuori i `__pycache__/`, fuori tutto quello che non è codice vivo.

`settings.json` definisce il modello di lavoro: quale directory è attiva, quale è il progetto corrente, qual è il file STATE da leggere per primo.

`rules/` è la parte che conta di più. Ho scritto tre file:

- `rules/v32.md` — contesto fresatrice: assi, tolleranze, stato attuale build
- `rules/titanium_os.md` — stack React+Python, convenzioni, endpoint attivi
- `rules/workflow.md` — come si lavora qui: STATE.json è verità, non i commenti nel codice

Sono *skills portabili*. Li copio su qualsiasi macchina, in qualsiasi progetto futuro. Non devo rispiegare chi sono ogni volta. Il sistema sa già che lavoro a ±0.019mm, che MIMS ha connettori fisici modulari, che EVA risponde su WhatsApp a Maria.

---

**Come si innesta nel sistema.**

TITANIUM_OS legge STATE.json ad ogni avvio. Ora Claude Code fa lo stesso — parte da `rules/` invece che dal vuoto. I due layer parlano la stessa lingua.

Per V32: quando riprendo Config G con il mandrino montato, Claude sa già che siamo al 65%, sa che la gusset sinistra è il prossimo pezzo, sa che il materiale è S235, sa che il giunto anteriore ha già passato il fit-check. Non devo riscrivere il brief.

Per MIMS al 30%: ho già aggiunto `rules/mims.md` con lo stato dei connettori fisici e le decisioni di progetto prese. La prossima sessione parte da lì.

Per VULCAN: le ricette polimeri sono in `rules/vulcan.md`. Pressione, temperatura, ciclo. Dati reali, non appunti.

---

Il contesto non si perde più se lo scrivi prima di chiudere il terminale.

## FATTI (per il RAG)

- **FATTO:** Claude Code vedeva file irrilevanti (`node_modules/`, `.pyc`, dump di STATE.json) causando perdita di contesto tra sessioni; soluzione adottata: file `.claudeignore` per escluderli.

- **DECISIONE:** Creare directory `rules/` con file markdown per progetto (`v32.md`, `titanium_os.md`, `workflow.md`, `mims.md`, `vulcan.md`) come layer di contesto persistente portabile tra sessioni e macchine. **LOGICA:** Evitare di ricostruire il brief manualmente ad ogni sessione, particolarmente critico con ADHD.

- **FATTO:** `settings.json` definisce directory attiva, progetto corrente e file STATE da leggere per primo all'avvio di Claude Code.

- **FATTO:** TITANIUM_OS legge STATE.json ad ogni avvio; con questa configurazione Claude Code legge `rules/` allo stesso modo — i due layer condividono la stessa convenzione di inizializzazione.

- **PRECISIONE:** Episodio connettori MIMS: pin a passo 2.54mm, tolleranza ±0.05mm — sessione persa perché Claude rigenerò un file già esistente fuori dal contesto attivo.

- **STATO:** Config G (V32) al 65% alla data dell'episodio (26 marzo 2026); gusset sinistra come prossimo pezzo; materiale S235; giunto anteriore già fit-check superato.
