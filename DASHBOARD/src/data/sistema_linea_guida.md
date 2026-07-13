# Linea guida provvisoria — le storie di sistema (EP_SG)

> Tutti i dati del terreno di sviluppo, fissati qui perché non si perdano. **Fonte canonica:**
> `MENTE/STORIE/SG_GIORNO0/_PIANO_PRODUZIONE.md` (indicizzata nel RAG) + `MENTE/KNOWLEDGE/MONDO/PONTE_SG_NINA.md`
> (le interazioni con Nina). Questa pagina è lo specchio di consultazione — provvisoria finché il binario non è rodato.

## La regola del binario

- Voce: **Matteo, prima persona**. Gestione: **Claude al 100%** (grounding RAG + canon_guard + caroselli_qc + additivo).
- Ogni episodio = **doppio**: completo 16 slide (sito/LinkedIn-PDF) + social-cut ≤10 (Instagram) = 1 carosello.
- **N-livelli**: capitolo portante `EP_SG_NN` (apre e promette) + approfondimenti `EP_SG_NN_XX` (figli annidati).
- Provenienza componenti: **«comprati su canale usato»** — mai «recuperati», mai prezzi per-pezzo; acquisti futuri = materiale nuovo.
- Il grezzo si **riscrive, non si copia**; i doppioni del grezzo si consolidano in 1.
- Un carosello alla volta: stampo → grounding → build → QC → Express → vetrina. QC verde prima del successivo.

## Stagione 1 — 9 capitoli → 68 caroselli (9 portanti + 59 approfondimenti)

**≈1.088 slide complete + ≈650 social.** Titoli di lavoro ancorati al grezzo reale (157 episodi di sistema).

**CAP 1 · IL SOCIO — 4** *(cameo Nina: apre)*
- 01_01 Il primo prompt · 01_02 La Taverna · 01_03 Il Distacco

**CAP 2 · L'ORGANISMO — 7**
- 02_01 V32 il cuore · 02_02 MIMS il LEGO d'acciaio · 02_03 VULCAN la pelle · 02_04 GENESIS il sistema nervoso · 02_05 Vita Natura la prova reale · 02_06 Il Reattore

**CAP 3 · LA VERIFICA — 4**
- 03_01 La prima foto · 03_02 La Formula · 03_03 Il Verdetto

**CAP 4 · LA MACCHINA — 12** *(cameo Nina: chiude)*
- 04_01 L'occhio (canale usato) · 04_02 La BOM · 04_03 Meno Parti · 04_04 La saga delle Config A→G · 04_05 Il corpo unico (178 kg) · 04_06 Colata Zero (epoxy) · 04_07 Il Gusset · 04_08 ±0.019 · 04_09 Il mandrino che manca · 04_10 La Pelle del Cavallo (VULCAN) · 04_11 Il martinetto (nuovo)

**CAP 5 · LA MENTE — 10**
- 05_01 MENTE nasce · 05_02 Il primo RAG · 05_03 Il giorno che il RAG ha mangiato 56 GB · 05_04 Il Blackout · 05_05 Il cervello ibrido · 05_06 La ricetta v4 · 05_07 Graphify · 05_08 La RETE 3D · 05_09 Obsidian (561 note)

**CAP 6 · LA NOTTE — 12**
- 06_01 La prima automazione · 06_02 Il cane da guardia · 06_03 Gli occhi del sistema · 06_04 Dorme ma non riposa · 06_05 La cartella clinica · 06_06 Il Silenzio (10 notti di log muto) · 06_07 La luce che se ne va · 06_08 Gli zombie · 06_09 Il brief del mattino · 06_10 La scuola notturna (TinyLlama) · 06_11 Organi vivi

**CAP 7 · LE STORIE — 8**
- 07_01 Il motore · 07_02 Il dev Flutter e il markdown · 07_03 Il teatro finisce qui · 07_04 Nasce Nina · 07_05 La bibbia visiva · 07_06 Il formato doppio · 07_07 Il QC

**CAP 8 · IL CAMPO DI BATTAGLIA — 6**
- 08_01 42→0 CVE · 08_02 Il venv · 08_03 Il Vault · 08_04 Il bug che chiudeva le porte · 08_05 La view che mentiva

**CAP 9 · LA STELLA POLARE — 5** *(cameo Nina: chiude la stagione)*
- 09_01 61 ore (BEP) · 09_02 Il CV che nessuno capisce · 09_03 Le 3 facce · 09_04 Il capannone

## Le interazioni con Nina (canone del PONTE — vale per i due binari)

- **Il ponte è LA DOMANDA di Nina**, mai la narrazione: Nina non narra in SG, Matteo non entra nel mondo fantastico di lei (Entropia, zone, Pietre = suo canone).
- **Cameo:** 1-2 slide max, volto definitivo, frasi-firma («Perché?» · «Da dove lo sai? Mostrami.» · «È come quando…»). Matteo non risponde con la morale: **mostra**.
- **I tre cameo decisi:** EP_SG_01 apre — «Papà… ma un computer può essere un socio?» · EP_SG_04 chiude — «Perché non l'hai comprata già fatta?» · EP_SG_09 chiude la stagione — «E quando arriviamo al capannone… cosa costruiamo dopo?»
- **Il ritorno lato Nina:** le domande dei cameo diventano semi EP_N2; quando germogliano, l'episodio Nina cita la prova REALE già raccontata in SG (stesso fatto, mai numeri diversi). Rimando incrociato leggero: uno racconta, l'altro rimanda — mai doppio racconto.
- **Guardie QC:** cameo >2 slide = falla · Nina narratrice in SG = falla · lessico fantastico in bocca a Matteo = falla · stesso fatto con numeri diversi nei due binari = falla di canone.

## La copertina (slide 1) — lo standard feed/griglia (fissato 14/07)

La slide 1 è **il poster**, non la prima pagina: nel feed decide l'apertura, nel profilo compone la griglia. Regole (canone in GUIDA_CAROSELLI §2-bis): **safe-zone** — titolo e segno focale dentro il crop centrale 1:1 (banda y 135–1215 su 1080×1350), il marchio può uscire, il messaggio no · **prova della miniatura** — leggibile a ~200px, titolo max 2 righe, o è falla · **un solo punto focale** (l'immagine-simbolo dell'episodio) · **titolo = gancio** (domanda/tensione), mai riassunto · **la griglia è una collezione** — stesso layout per serie, palette del capitolo, numero episodio nel kicker · **una sola copertina per i due tagli** (completo e social).

## Frontmatter motore (casella CV del capitolo — i figli specializzano)

- CAP 1 Metodo · lavorare con l'IA — CAP 2 Visione · architettura — CAP 3 QC · misura — CAP 4 Meccanica · progettazione + procurement — CAP 5 Software · knowledge engineering — CAP 6 Automazione · orchestrazione + debug — CAP 7 Comunicazione · content engineering — CAP 8 Sicurezza · hardening — CAP 9 Strategia · direzione

## Ordine, cadenza, scala

- Si parte da **EP_SG_01** (dopo PRE_01, che resta INSIEME). Dentro un capitolo: prima il portante, poi i figli. Tra capitoli: sequenziale 1→9, ma un milestone fresco può chiamare il suo figlio in anticipo.
- Ritmo: 1-2 caroselli per sessione; a regime anche in **notte autonoma** (la notte propone, il QC decide, in vetrina entra solo il verde).
- **Il binario non si chiude:** ogni milestone verificato → candidato EP_SG nel capitolo giusto; archi nuovi (Mandrino Day, Primo Pezzo H7…) = `EP_SG_10+`.

## Stato (0/68 — si aggiorna nel doc MENTE, mai cancellando)

Socio 0/4 · Organismo 0/7 · Verifica 0/4 · Macchina 0/12 · Mente 0/10 · Notte 0/12 · Storie 0/8 · Campo di Battaglia 0/6 · Stella Polare 0/5
