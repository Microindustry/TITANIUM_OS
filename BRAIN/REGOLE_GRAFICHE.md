# REGOLE GRAFICHE — dashboard TITANIUM_OS

*Scritte il 16/08/2026 (#70). Erano segnate "da fare insieme" dalla #57 (8-9 luglio) e
ripetute due volte nella bussola senza mai essere scritte.*

**Come sono state decise:** non a gusto. Ho contato cosa la dashboard usa **davvero**
oggi (68 file `.tsx`/`.ts` in `DASHBOARD/src`) e ho promosso a regola ciò che era già
dominante, ritirando i doppioni. È il modo meno invasivo: quasi tutto il codice è già
a norma, e non serve ridipingere niente in blocco.

---

## 1 · PALETTE — 5 accent + neutro + allarme

Sette famiglie Tailwind. **Nessun'altra.**

| Ruolo | Famiglia | Significato | Uso reale oggi |
|---|---|---|---|
| **Neutro** | `slate` | sfondo, testo, bordi, tutto ciò che non parla | 1509 occorrenze · 50 file |
| Accent 1 | `emerald` | **vivo / fatto / ok** — ciò che gira adesso | 340 · 38 file |
| Accent 2 | `cyan` | **sistema / dati** — RAG, grafo, automazioni, numeri | 224 · 33 file |
| Accent 3 | `amber` | **in corso / attenzione** — non è un errore, è un "guarda qui" | 211 · 34 file |
| Accent 4 | `indigo` | **Nina / contenuti** — episodi, caroselli, il binario narrativo | 115 · 19 file |
| Accent 5 | `rose` | **persone / identità** — CV, HR, Matteo, Vita Natura | 95 · 17 file |
| **Allarme** | `red` | **rotto / bloccante** — solo quando serve un intervento | 22 · 7 file |

### Doppioni ritirati (e dove vanno)

| Ritirata | Va in | Perché |
|---|---|---|
| `zinc`, `gray`, `neutral`, `stone` | `slate` | erano un secondo neutro: 103 occorrenze in soli 4 file |
| `green`, `teal` | `emerald` | stesso significato, tre famiglie |
| `sky`, `blue` | `cyan` | idem |
| `yellow`, `orange` | `amber` | idem |
| `violet`, `purple`, `fuchsia` | `indigo` | idem |
| `pink` | `rose` | idem |

### Come si applica
**Additiva, non un repaint.** Regola 1 (*niente è finito*) e canone operativo #1
(*additivo, mai cancella-e-rifai*): il codice nuovo nasce a norma, il vecchio si
converte **quando si tocca quel file per altro**. Nessun commit "ridipingo 68 file":
sarebbe un diff enorme a rischio regressione per zero valore funzionale.

### Come si controlla
```bash
cd C:/Users/teo/TITANIUM_OS/DASHBOARD/src && grep -roE "(text|bg|border|ring|from|to|via)-(zinc|gray|neutral|stone|green|teal|sky|blue|yellow|orange|violet|purple|fuchsia|pink)-[0-9]{2,3}" --include=*.tsx --include=*.ts . | sort | uniq -c | sort -rn | head -30
```

---

## 2 · LINGUA ICONE — lucide nell'interfaccia, emoji nel contenuto

Oggi convivono: **41 file** importano `lucide-react`, **43 file** contengono emoji,
93 emoji distinte per 523 occorrenze. Due lingue nello stesso posto: è la cosa che
Matteo aveva segnalato.

### La regola

**`lucide-react` per l'INTERFACCIA.** Bottoni, sidebar, header, stati, azioni, tab,
badge. Motivo concreto: le icone lucide ereditano `currentColor` (quindi seguono la
palette e il tema da sole), hanno spessore di tratto uniforme, e sono già in 41 file
su 68 — sono di fatto la lingua della casa.

**Emoji solo nel CONTENUTO.** Testo degli episodi, caption social, stati della bussola
(`[✓] [◐] [ ] [✗] [💡]`), simboli del mondo di Nina (`⟡` Pietre). Lì l'emoji è **dato**,
non decorazione dell'interfaccia: viaggia col testo, finisce nei caroselli e nel RAG,
e cambiarla cambierebbe il contenuto.

**Le frecce tipografiche non sono icone.** `→` da solo fa 261 delle 523 occorrenze
(metà del totale): è punteggiatura dentro le frasi (`V32 → episodio → RAG`) e resta.
Ma dentro un bottone o un link ci va `<ArrowRight />` di lucide, non il carattere.

### Il confine, in una riga
> Se l'utente ci clicca sopra o gli dice lo stato del sistema → **lucide**.
> Se è una parola scritta che finirebbe uguale in un episodio → **emoji**.

### Come si controlla
Un file `View.tsx` che contiene emoji fuori dalle stringhe di contenuto è da guardare:
```bash
cd C:/Users/teo/TITANIUM_OS/DASHBOARD/src && grep -rlP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" --include=*.tsx components/ | head -20
```

---

## Cosa NON è deciso qui
- **Tipografia** (scala dei corpi): il pattern *hero* della #57 è già in 16 viste e regge — non serve una regola scritta finché non si rompe.
- **Spaziature**: idem.
- **Palette dei CAROSELLI**: è un'altra cosa e ha già il suo canone in `CONTENT_ENGINE/DATABASE/MONDO/BIBBIA_VISIVA_CAROSELLI.md`. Questo documento riguarda **solo la dashboard**.
