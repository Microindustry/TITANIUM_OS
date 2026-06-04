<!-- TOC -->

- [EP_AUTO_47  Milestone](#epauto47-milestone)
    - [Firewall 5173 aperto  Tailscale loggato sul fisso (100.125.](#firewall-5173-aperto-tailscale-loggato-sul-fisso-100125)
- [IL SISTEMA  Episodio: La Porta Aperta al Momento Giusto](#il-sistema-episodio-la-porta-aperta-al-momento-giusto)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Perché un IP fisso e una porta cambiano tutto](#atto-i-perché-un-ip-fisso-e-una-porta-cambiano-tutto)
  - [ATTO II  Porta 5173, IP 100.125.152.124, e la logica dello stack](#atto-ii-porta-5173-ip-100125152124-e-la-logica-dello-stack)
  - [ATTO III  Cosa si sblocca adesso e dove va il prossimo passo](#atto-iii-cosa-si-sblocca-adesso-e-dove-va-il-prossimo-passo)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_47 — Milestone
### "Firewall 5173 aperto + Tailscale loggato sul fisso (100.125."

---
id: EP_AUTO_47
title: "Firewall 5173 aperto + Tailscale loggato sul fisso"
sottotitolo: "Il sistema diventa visibile"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-06-03
data_generato: 2026-06-03
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Firewall 5173 aperto + Tailscale loggato sul fisso (100.125.152.124) — dashboard via LAN e da remoto (03/06/2026)"
---

# IL SISTEMA — Episodio: "La Porta Aperta al Momento Giusto"

---

## COLD OPEN

L'episodio scorso chiudeva con una frase precisa: un sistema che non si protegge è solo un archivio aperto. Avevo ruotato i token GitHub, messo un confine tra il codice e il mondo esterno. Bene. Ma un confine senza accesso controllato è solo un muro cieco — e io ho bisogno di vedere dentro la macchina anche quando non ci sono fisicamente. Il 3 giugno 2026 ho aperto la porta giusta, nella direzione giusta, con la serratura giusta. Porta 5173. Firewall. Tailscale. E tutto quello che stava aspettando in coda ha cominciato a muoversi.

---

## ATTO I — Perché un IP fisso e una porta cambiano tutto

Devo spiegare il contesto, perché altrimenti sembra una cosa tecnica da smanettoni e non lo è. È una decisione infrastrutturale che ha impatto diretto su V32, GENESIS, VULCAN, tutto.

A febbraio avevo fatto una migrazione importante. Il cervello del sistema — il PC fisso in taverna, quello con la GPU 1070 Ti — era diventato il nodo centrale. Il concetto era semplice: un cervello H24 che non si spegne, non va a letto, non deve ricaricarsi. Il Getac, il portatile militarizzato, diventa la mano mobile — lo porto in officina, lo porto dal cliente, lo uso sul campo. Ma il Getac ragiona grazie al fisso. Senza quella connessione, è un terminale vuoto.

Il problema era questo: come faccio a far parlare il Getac con il fisso quando non sono sulla stessa rete locale? E soprattutto — come faccio a monitorare le dashboard di GENESIS, lo stato degli agenti AI, il flusso di n8n, da qualsiasi posto io sia?

La risposta teorica era già in archivio da settimane: Tailscale. Una VPN mesh che assegna IP stabili a ogni nodo della rete, cifra il traffico, bypassa i problemi di NAT domestico senza toccare il router in modo invasivo. Avevo già la guida scritta, il file `CONFIG_PC_FISSO_24H.txt` sulla chiavetta, il kit pronto. Ma il kit pronto e il kit funzionante non sono la stessa cosa. Ci sono sempre quei trenta minuti di incertezza in mezzo.

E c'era un'altra cosa in sospeso: il push su GitHub era bloccato. Un file da circa 1 GB aveva inquinato la storia del repository — roba da pulire a freddo, con `git filter-branch` o BFG, non qualcosa che fai di corsa tra un collaudo e l'altro. Quella pendenza pesava. Ogni volta che dovevo pushare aggiornamenti di configurazione, mi ritrovavo con la pipeline spezzata. L'infrastruttura stava crescendo ma con un'arteria ostruita.

---

## ATTO II — Porta 5173, IP 100.125.152.124, e la logica dello stack

Il 3 giugno ho dedicato la mattinata a chiudere questa cosa. Niente collaudi meccanici, niente fresatura, niente misure. Solo infrastruttura. Perché se il sistema nervoso non funziona, non ha senso muovere i muscoli.

Il primo passo è stato sul firewall del PC fisso. La porta 5173 — quella che Vite usa per servire le dashboard in sviluppo, ma che nel mio setup è diventata l'interfaccia web locale di GENESIS — era chiusa. Windows Firewall, regola in entrata, TCP, porta 5173: aperta. Non aperta a tutto il mondo — aperta alla rete Tailscale. Questo è il punto. Non stai bucando il firewall verso internet. Stai creando un corridoio cifrato tra nodi che conosci, autenticati, con IP assegnati dal tuo account Tailscale.

Poi ho loggato Tailscale sul fisso. L'IP assegnato: `100.125.152.124`. Quello è adesso l'indirizzo permanente del cervello centrale nella mia rete privata virtuale. Non cambia. Non dipende dal DHCP del router. Non dipende da quale WiFi uso. Da qualsiasi nodo Tailscale autenticato — il Getac, il telefono, un futuro Raspberry Pi in officina — posso raggiungere quel cervello su quell'IP, punto.

Ho verificato la connessione in due modi. Prima via LAN diretta, dal Getac sulla stessa rete fisica: `http://100.125.152.124:5173`. Dashboard caricata. Poi ho portato il Getac fuori dalla rete domestica, traffico sul 4G, e ho ripetuto. Stessa dashboard, stessa latenza accettabile, stessa autenticazione. Il tunnel c'era.

Questo si collega a qualcosa che stavo leggendo proprio in quei giorni, nei miei appunti sugli agenti AI e sull'architettura di GENESIS. C'è un principio che avevo scritto nero su bianco: un webhook aperto è pericoloso. Chiunque trovi l'URL può inviare dati falsi, attivare automazioni, inquinare il flusso. La soluzione era l'autenticazione via header — `x-api-key`. Ma quella soluzione presuppone che tu abbia già un perimetro. Tailscale è il perimetro. Prima metti il muro, poi metti la serratura sull'uscio interno. L'ordine conta.

L'ESP32 di GENESIS — quello che parla con n8n via webhook, quello che gestirà i sensori dell'asse rotativo e i feedback degli encoder — deve comunicare con il cervello centrale. Se il cervello centrale non è raggiungibile in modo stabile, quell'intera catena è teorica. Adesso non è più teorica. `100.125.152.124:5173` è un indirizzo reale su una rete reale con sicurezza reale. Posso costruire sopra.

---

## ATTO III — Cosa si sblocca adesso e dove va il prossimo passo

Le conseguenze concrete sono tre.

Prima: GENESIS passa da building astratto a building con endpoint reale. L'automazione può adesso ricevere e inviare dati verso un nodo centrale raggiungibile. Il flusso ESP32 → n8n → dashboard non è più un disegno su carta. Ha un indirizzo a cui arrivare.

Seconda: il monitoraggio di Vita Natura — il centro estetico con EVA — diventa remoto per davvero. Quando sono in officina sul V32 e EVA gestisce un flusso di prenotazioni o un'automazione CRM, posso vedere cosa sta succedendo senza alzarmi, senza tornare a casa. Vita Natura è al 40%, ma il 40% che c'è adesso è visibile da dove voglio io.

Terza, e forse la più concreta: MIMS è in `waiting_press`. Aspetta VULCAN. VULCAN è la pressa polimeri, e la pressa aspetta ancora alcune decisioni sul mix materiali — il delta V8 che ho in archivio parla di Epoxy Granite, quarzo 70/30 con resina epossidica 85/15 e grafite al 2-3% per lo smorzamento passivo. Quei numeri devono entrare nei disegni tecnici e nel BOM. Per farlo in modo ordinato, devo poter lavorare sul repository senza il blocco del file da 1 GB. Quella pulizia — BFG o filter-branch a freddo, con il fisso acceso e stabile — è il prossimo step. Non urgente come oggi lo era il firewall, ma è adesso la prossima arteria da sbloccare.

Il sistema ha adesso un indirizzo. Non metaforicamente. Letteralmente: `100.125.152.124`.

---

## CHIUSURA

*Aprire una porta non è mai il problema. Il problema è sapere dove porta, chi può usarla, e cosa succede se la lasci aperta al vento sbagliato. Il 3 giugno ho aperto la porta 5173 — ma l'ho aperta solo verso i nodi che conosco per nome.*

---