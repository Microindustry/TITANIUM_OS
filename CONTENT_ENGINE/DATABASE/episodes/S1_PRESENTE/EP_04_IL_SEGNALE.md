# EP_04 — IL SEGNALE
### "Ho costruito un'AI per la donna che amo. Si chiama Eva."

**Formato:** Video-podcast | Durata stimata: 10-12 min
**Tono:** Personale, caldo — l'unico episodio dove entra la vita reale non tecnica
**Personaggi attivi:** Matteo (voce), AVA (interfaccia), EVA (sistema, mai visibile)
**Fonte:** ASSOLUTO V6 — Atto VI §26, §28 (EVA, la Maria Rule)

---

## COLD OPEN

*[Schermata WhatsApp. Messaggio automatico da EVA: "Ciao! Ho notato che domani è il tuo compleanno. Vita Natura ti aspetta con un regalo speciale. Prenota qui: [link]"]*

> *Da EP_01: "Il vincolo creativo è il miglior ingegnere che esista."*
> *Da EP_03: "Parti con quello che hai, abbastanza preciso da funzionare adesso."*
> *La Maria Rule è la stessa logica — applicata a una persona, non a una macchina.*

> "Non l'ho scritto io.
> Non l'ha scritto Maria.
> L'ha scritto un sistema che sa quello che sai tu — ma non si dimentica mai nulla e non ha mai bisogno di dormire."

---

## ATTO I — VITA NATURA

Maria gestisce un centro estetico a Boffalora sopra Ticino.

Non è un dettaglio del mio ecosistema. È il motivo per cui l'ecosistema esiste nella forma in cui esiste.

Vita Natura ha clienti. Appuntamenti. Un calendario. Liste di attesa. Promemoria da mandare. Recensioni da raccogliere. Compleanni da ricordare. Promozioni da comunicare. Prodotti da riordinare quando le scorte scendono.

Tutto questo, ogni giorno, è lavoro manuale. Ripetitivo. Ad alto attrito cognitivo. Il tipo di lavoro che prende ore e non crea valore — gestisce solo quello che già esiste.

*[AVA mostra: lista 23 attività settimanali ripetitive nel business di un centro estetico.]*

Maria è brava nel suo lavoro. Non ha bisogno di essere brava anche in ogni compito burocratico che circonda il suo lavoro.

EVA è la risposta a questa differenza.

---

## ATTO II — LA MARIA RULE

C'è una regola che governa tutto lo sviluppo di EVA.

Una sola regola. Non negoziabile.

**Per Maria deve essere zero-click. Semplice magia.**

Non "facile da usare". Non "intuitivo". Non "con un breve tutorial". Zero-click.

EVA funziona, o non esiste.

*[AVA mostra: schema architettura EVA — tutto il backend complesso visibile; interfaccia verso Maria = un messaggio WhatsApp normale.]*

Dal punto di vista di Maria, EVA è un assistente che le manda messaggi. Risponde alle domande dei clienti. Gestisce le prenotazioni. Ricorda i compleanni. Manda i promemoria.

Dal nostro punto di vista, EVA è:
- Python 3.12 su VPS
- API WhatsApp Business via n8n
- Google Calendar per la lettura degli slot
- Database clienti JSON con storico completo
- LLM (Claude) per la generazione dei messaggi
- Logica condizionale per promozioni, follow-up, stagionalità

La complessità è nostra. La semplicità è sua.

Questa è ingegneria del software orientata a una persona reale, non a un utente astratto.

---

## ATTO III — COSA FA EVA OGNI GIORNO

*[AVA genera timeline giornaliera EVA: ogni azione mappata con orario.]*

**08:00** — EVA legge il calendario. Identifica gli appuntamenti del giorno. Manda i promemoria automatici ai clienti.

**08:05** — EVA controlla le ricorrenze. Compleanni nei prossimi 3 giorni? Messaggio personalizzato con offerta.

**10:00** — Un cliente chiede via WhatsApp: "Avete disponibilità per giovedì pomeriggio?" EVA legge il calendario, trova il primo slot libero, risponde con il link di prenotazione precompilato.

**18:00** — Fine giornata. EVA analizza gli appuntamenti completati. Manda automaticamente i messaggi di follow-up: "Come è andata? Ci farebbe piacere una tua recensione."

**23:00** — Report serale per Maria: appuntamenti domani, messaggi inviati, prenotazioni ricevute. Un messaggio. Una lettura. Trenta secondi.

Revenue automatica stimata anno 1: €1,500/mese. Non perché faccia miracoli. Perché **il ripetitivo eseguito perfettamente ogni giorno si accumula**.

---

## ATTO IV — PERCHÉ QUESTO APPARTIENE ALL'ECOSISTEMA

EVA non è un progetto separato. È il ramo finanziatore dell'ecosistema.

Anno 1, mentre la V32 è ancora in assemblaggio e MIMS è ancora in prototipazione, EVA genera cash flow. Quello stesso cash flow va in componenti: il mandrino 2.2kW, le viti per l'asse Y, il quadro IP54.

*[AVA mostra il flusso: EVA revenue → V32 upgrade → MIMS produzione → marketplace revenue → V32 Mk2]*

Ma c'è un secondo motivo più sottile.

EVA è il primo client zero dell'intero stack Genesis. Tutto quello che costruisco per EVA — l'architettura multi-agente, l'integrazione con WhatsApp, il sistema di memoria clienti, la logica di calendario — è la stessa infrastruttura che poi diventa Genesis per altri business.

EVA è il prototipo che si paga da solo mentre viene sviluppato.

---

## CHIUSURA

*[Schermata telefono di Maria: notifica EVA, tre prenotazioni ricevute stanotte.]*

Ho costruito EVA per un motivo semplice.

Maria è brava nel suo lavoro. Ha costruito qualcosa di reale in un posto piccolo, con clienti veri che tornano ogni mese. Merita che le parti ripetitive del suo lavoro vengano gestite da qualcosa che non si stanca, non dimentica, non ha brutte giornate.

Il codice Python è complesso. L'integrazione n8n è articolata. La logica di gestione degli stati conversazionali ha richiesto settimane di iterazione.

Ma quello che Maria vede è un assistente che risponde ai suoi clienti, ricorda i compleanni, e ogni mattina alle 8 le dice cosa ha da fare.

La tecnologia più sofisticata è quella che sembra magia a chi la usa.

> "Per Maria deve essere zero-click. Semplice magia.
> Per noi è codice Python e n8n complesso."
> — La Maria Rule. Prima e unica regola di sviluppo EVA.

E mentre EVA lavora di notte — mentre i messaggi partono, i promemoria arrivano, le prenotazioni si accumulano — quella stessa notte la V32 fresa. I dati dai sensori IFM si registrano. Il ciclo amplificante gira.

È il 2026. Non sai ancora come andrà. Ma il sistema è in moto.

---

> *Ponte → EP_05:*
> Luglio 2030. Il display del comparatore segna ancora 0.008 mm.
> Le stesse mani. Lo stesso numero.
> Cosa è cambiato, e cosa non lo sarà mai.

*Continua in EP_05 — Il Verdetto*
