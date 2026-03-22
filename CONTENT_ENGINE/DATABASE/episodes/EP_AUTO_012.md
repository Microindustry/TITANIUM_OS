---
id: "EP_AUTO_012"
milestone: "Componenti V32 presenti (foto 13 Feb 2026)"
title: "Componenti V32: dalla teoria alla fabbrica"
sottotitolo: "65% fresatrice CNC, primo unboxing documentato"
stagione: "AUTO"
data_evento: "2026-03-22"
tags: ["CNC", "artigianato industriale", "system builder", "V32", "manufacturing"]
status: "ready"
durata_min: 8
reel_hook: "[Vedi questi 47 componenti V32 arrivati oggi]. [Prima erano solo CAD 3D, niente di concreto]. [Ho verificato tolleranze su fresatrice CNC al 65% di completamento, testato fit MIMS, fotografato tutto]. [Ma sai cosa succede quando assembliamo la pressa VULCAN 20t la prossima settimana? — guarda il prossimo episodio]"
generated: "2026-03-22T18:31:12.518594"
---

# Componenti V32: dalla teoria alla fabbrica

# Episodio 14 — I Componenti Ci Sono

---

> "Adesso è reale. Prima era un file CAD. Ora pesa."

---

Venerdì 13 febbraio 2026. Officina, 16:20.

Apro il cartone grande. Quello da 80x60x40. Dentro ci sono i profili estrusi per il telaio, le guide lineari THK SSR20, i cuscinetti SKF — tutto quello che nelle ultime settimane esisteva solo in un assembly Fusion 360 e in BRAIN/STATE.json.

Tiro fuori la guida Z. 600mm, acciaio temprato, rettificato. La appoggio sul banco. Pesa diversamente da come te la immagini sullo schermo.

Faccio la foto. 16:24. La carico nel log.

```
stato: "componenti_ricevuti"
data: "2026-02-13"
completamento_v32: 65%
prossimo_step: "Config G — gusset sinistra"
```

---

## Il Bivio

Prima di questa consegna, la V32 era un progetto.

Intendo: esisteva nei file, nei calcoli di rigidità, nelle simulazioni di deflessione del portale. Sapevo che con 178kg di struttura e ±0.019mm di tolleranza dovevo fare certi conti. Li avevo fatti. Ma erano numeri in un foglio.

Adesso il metallo è qui.

Il problema cambia natura. Non è più "questo design regge il carico?" — è "questo giunto specifico, con questa guida specifica, in questa sequenza di assemblaggio, funziona?". Diverso. Molto più concreto. Molto più difficile da delegare a un software.

La gusset sinistra — Config G — è il punto critico adesso. È il nodo strutturale dove il portale X si aggancia alla colonna verticale sinistra. Ho stimato 3 ore. Potrebbero essere 4. La variabile è la squadratura: se il tubo 60x60x4 in S235 non è perfettamente a 90° dopo la saldatura, tutto quello che viene dopo — le guide, il carro Y, la tavola — accumula errore.

Il mandrino 2.2kW ER20 manca ancora. Da ordinare. È il blocker principale per la fase di test. Ma non mi blocca adesso — adesso mi blocca zero cose. Posso assemblare il telaio completo senza mandrino.

---

## Connessione al Sistema

TITANIUM_OS legge lo STATE.json ogni volta che apro il terminale. Questo aggiornamento — `completamento_v32: 65%` — non è una nota. È un parametro operativo.

Quando Maria (EVA AI su WhatsApp) mi chiede "a che punto sei con la fresatrice", non risponde con una stima. Risponde con i dati del file. 65%. Prossimo step: gusset sinistra. Blocker: mandrino.

MIMS al 30% aspetta. I connettori modulari fisici hanno senso solo quando ho la V32 che taglia le piastre di accoppiamento a tolleranza. Non prima.

VULCAN — la pressa 20t — aspetta i polimeri. Aspetta i test di ricetta. Aspetta che io abbia tempo. Il tempo viene dalla V32 funzionante, che automatizza la lavorazione, che libera ore.

Tutto è in serie. Non in parallelo.

Questa foto del 13 febbraio è il punto di non ritorno.

---

I componenti ci sono. Ora si saldano.
