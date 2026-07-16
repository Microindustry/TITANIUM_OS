<!-- TOC -->

- [POSTIZ  piano di montaggio (sessione 64)](#postiz-piano-di-montaggio-sessione-64)
  - [Cosa risolve](#cosa-risolve)
  - [Prerequisiti GATED (Matteo  meglio pre-farli, sbloccano la sessione)](#prerequisiti-gated-matteo-meglio-pre-farli-sbloccano-la-sessione)
  - [Passi sessione (esecuzione)](#passi-sessione-esecuzione)
  - [Note tecniche](#note-tecniche)
  - [Fonti](#fonti)

<!-- /TOC -->

# POSTIZ — piano di montaggio (sessione #64)

*Creato 16/07/2026 (#63). Obiettivo: aprire il **collo n°1 = PUBBLICAZIONE**.*

## Cosa risolve
Pubblicazione LinkedIn **automatica**, via **OAuth** (niente password in chiaro).
Postiz prende le nostre `slides/` di un episodio → le impacchetta in **PDF documento LinkedIn**
(il "carosello" nativo dal 2023 è un post-documento) → pubblica o **programma**.
`postiz-agent` è una **CLI collegabile a Claude** → il sistema pubblica da solo, anche di notte.

Stack già deciso da Matteo (memoria `project_social_stack`): Postiz self-hosted. I forum lo confermano.

---

## Prerequisiti GATED (Matteo — meglio pre-farli, sbloccano la sessione)

- [ ] **Docker Desktop for Windows** — NON presente ora (`docker: command not found`).
      Scarica da docker.com/products/docker-desktop → installa → richiede **WSL2 + riavvio** (UAC/admin = Matteo).
      Verifica dopo: `docker compose version`.
- [ ] **App LinkedIn Developer** — su developer.linkedin.com → *Create app* (associata alla **Pagina brand microindustry**).
      Prodotti da aggiungere: **"Sign In with LinkedIn using OpenID Connect"** + **"Share on LinkedIn"**.
      Ti dà **Client ID + Client Secret** + serve impostare il **Redirect URL** (lo diamo noi in step 3).
      ⚠ L'approvazione dei prodotti LinkedIn è il gate (come l'app Meta) — può richiedere una revisione.
- [ ] **Account brand microindustry** — creato. Se la verifica Gmail è bloccata dal "telefono usato troppe volte",
      va bene lo stesso per iniziare: Postiz usa l'OAuth della **Pagina LinkedIn**, non la Gmail.

---

## Passi sessione (esecuzione)

1. `docker compose version` → conferma Docker vivo.
2. `git clone https://github.com/gitroomhq/postiz-docker-compose` in una cartella **fuori dal repo pubblico**
   (es. `C:\Users\teo\tools\postiz\`) — NON dentro TITANIUM_OS (segreti + repo pubblico).
3. Config env (in `postiz.env` o `.env`):
   - `MAIN_URL` / `FRONTEND_URL` / `NEXT_PUBLIC_BACKEND_URL` → `http://localhost:4007`
     (o LAN `http://192.168.0.112:4007` / Tailscale se vogliamo accesso da fuori)
   - `JWT_SECRET` → genera random forte
   - `DATABASE_URL` (postgres bundled) · `REDIS_URL` (redis bundled)
   - `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` (dall'app LinkedIn)
   - **Redirect URL** dell'app LinkedIn = `http://localhost:4007/settings` (verificare nel provider doc)
   - 🔒 **Tutti i segreti → `_VAULT/KEYS` o `_VAULT/ACCOUNTS`, MAI nel repo pubblico.**
4. `docker compose up -d` → apri `http://localhost:4007`.
5. Crea utente admin Postiz.
6. **Collega il canale LinkedIn** (Pagina microindustry) via OAuth → autorizzi una volta, niente password.
7. **Test reale**: carica le `slides/` di un episodio (es. EP_SG_02_01) → Postiz fa il PDF → pubblica di prova / programma.
8. `postiz-agent` (github.com/gitroomhq/postiz-agent) → collega a Claude → comando che pubblica dai nostri `CAROSELLI/`.
9. **Integrazione TITANIUM**: nodo/comando che prende un `EP_ID` → Postiz → LinkedIn. Il collo n°1 si apre.

---

## Note tecniche

- **Porte**: 4007 (frontend), 8080 (temporal monitoring). Aprire firewall solo se serve accesso LAN.
- **Requisiti minimi** provati: 2 GB RAM, 2 vCPU — la macchina fissa li supera largamente.
- **Perché non upload PDF diretto via API**: LinkedIn `/public` API non supporta l'upload documento diretto
  (issue Postiz #1381/#1278 aperte); Postiz aggira facendo **immagini→PDF sulla Pagina**. Il nostro output `slides/` è già pronto.
- **Sempre** ripullare il `docker-compose.yml` dalla repo Postiz (variabili/servizi cambiano tra release), non copiare snapshot.

## Fonti
- Postiz docker-compose: https://github.com/gitroomhq/postiz-docker-compose
- Postiz LinkedIn Page: https://docs.postiz.com/providers/linkedin-page
- postiz-agent CLI: https://github.com/gitroomhq/postiz-agent
- Issue upload PDF: https://github.com/gitroomhq/postiz-app/issues/1381
