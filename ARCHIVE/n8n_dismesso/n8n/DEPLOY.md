<!-- TOC -->

- [DEPLOY.md  AUTOMATIONS/deploy/n8n  v1.1  2026-03-10](#deploymd-automationsdeployn8n-v11-2026-03-10)
- [Guida deploy n8n su Oracle Cloud Free Tier (GRATIS)](#guida-deploy-n8n-su-oracle-cloud-free-tier-gratis)
  - [Perche Oracle Cloud Free Tier](#perche-oracle-cloud-free-tier)
  - [1. Crea account Oracle Cloud](#1-crea-account-oracle-cloud)
  - [2. Crea VM Always Free](#2-crea-vm-always-free)
  - [3. Apri porte firewall](#3-apri-porte-firewall)
    - [3a. Security List (OCI Console)](#3a-security-list-oci-console)
    - [3b. iptables (sul server via SSH)](#3b-iptables-sul-server-via-ssh)
  - [4. Setup server (SSH)](#4-setup-server-ssh)
  - [5. Configura](#5-configura)
  - [6. DNS](#6-dns)
  - [7. Avvia](#7-avvia)
  - [8. Verifica](#8-verifica)
  - [9. Primo workflow: Webhook ESP32](#9-primo-workflow-webhook-esp32)
  - [Costo mensile](#costo-mensile)
  - [Manutenzione](#manutenzione)
  - [Limiti da sapere](#limiti-da-sapere)

<!-- /TOC -->

# DEPLOY.md | AUTOMATIONS/deploy/n8n | v1.1 | 2026-03-10
# Guida deploy n8n su Oracle Cloud Free Tier (GRATIS)

---

## Perche' Oracle Cloud Free Tier

| Voce | Oracle Free | Hetzner CX22 |
|------|-------------|---------------|
| CPU | 4 OCPU ARM (Ampere A1) | 2 vCPU |
| RAM | 24 GB | 4 GB |
| Storage | 200 GB | 40 GB |
| Traffico | 10 TB/mese | 20 TB/mese |
| Costo | **EUR 0/mese (sempre)** | EUR 4.35/mese |
| Scadenza | Mai (Always Free, non trial) | Mensile |

Oracle Free Tier e' "Always Free" — non scade dopo 30 giorni. Risorse 6x superiori a Hetzner CX22, costo zero.

---

## 1. Crea account Oracle Cloud

- Vai su https://cloud.oracle.com/
- Registrati (serve carta di credito per verifica, NON viene addebitato nulla)
- Region: **eu-milan-1** (Milano) o **eu-frankfurt-1**
- Dopo la registrazione: attendi attivazione (pochi minuti)

## 2. Crea VM Always Free

- Console OCI > Compute > Instances > Create Instance
- Impostazioni:
  - **Shape**: VM.Standard.A1.Flex (ARM Ampere)
  - **OCPU**: 4 (max gratuito)
  - **RAM**: 24 GB (max gratuito)
  - **OS**: Ubuntu 24.04 (Canonical)
  - **Boot volume**: 100 GB (max gratuito 200 GB)
  - **SSH Key**: carica la tua chiave pubblica
  - **Networking**: crea VCN + subnet pubblica (wizard automatico)

## 3. Apri porte firewall

Oracle ha 2 livelli di firewall: Security List (OCI) + iptables (OS).

### 3a. Security List (OCI Console)
- Networking > Virtual Cloud Networks > la tua VCN > Security Lists
- Aggiungi Ingress Rules:
  - Porta 80 (HTTP): Source 0.0.0.0/0, TCP
  - Porta 443 (HTTPS): Source 0.0.0.0/0, TCP

### 3b. iptables (sul server via SSH)
```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

## 4. Setup server (SSH)

```bash
# Connettiti
ssh ubuntu@<IP_PUBBLICO>

# Aggiorna e installa Docker
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# Rientra per applicare il gruppo
exit
ssh ubuntu@<IP_PUBBLICO>

# Crea cartella deploy
mkdir -p ~/n8n && cd ~/n8n
```

Copia i file sul server:
```bash
# Dal tuo PC Windows (Git Bash o PowerShell)
scp docker-compose.yml .env.example ubuntu@<IP_PUBBLICO>:~/n8n/
```

## 5. Configura

```bash
cd ~/n8n
cp .env.example .env
nano .env
# Compila: dominio, password DB, password n8n
```

## 6. DNS

Punta il dominio all'IP pubblico Oracle:
- Record A: `auto` -> `<IP_PUBBLICO>`
- TTL: 300 (poi alza a 3600 dopo verifica)

Alternativa gratis senza dominio: usa un servizio DNS gratuito (es. DuckDNS, FreeDNS).

## 7. Avvia

```bash
cd ~/n8n
docker compose up -d

# Verifica
docker compose ps
docker compose logs -f n8n
```

## 8. Verifica

- Apri `https://<tuo-dominio>`
- Login con N8N_USER / N8N_PASSWORD
- SSL automatico via Let's Encrypt

## 9. Primo workflow: Webhook ESP32

1. Crea nuovo workflow in n8n
2. Aggiungi nodo "Webhook" -> POST `/esp32-data`
3. Aggiungi nodo "Function" per parsing payload
4. Aggiungi nodo "HTTP Request" per forward a TITANIUM_OS API

---

## Costo mensile

| Voce | EUR/mese |
|------|----------|
| Oracle Cloud Free Tier | 0.00 |
| Dominio (opzionale) | 0.00 (DuckDNS) o ~1.00 (.it) |
| **Totale** | **EUR 0.00** |

---

## Manutenzione

```bash
# Aggiorna n8n
cd ~/n8n
docker compose pull
docker compose up -d

# Backup database
docker compose exec postgres pg_dump -U n8n n8n > backup_$(date +%Y%m%d).sql
```

## Limiti da sapere

- L'istanza puo' essere reclamata da Oracle se idle per 7 giorni consecutivi (risolvibile con cron job `curl localhost:5678` ogni giorno)
- Ampere A1 e' ARM: tutte le immagini Docker usate (n8n, postgres, traefik) supportano ARM nativamente
- Se la region Milano e' piena, prova Frankfurt o Amsterdam
