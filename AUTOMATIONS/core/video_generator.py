"""
========================================================
TITANIUM_OS — VIDEO GENERATOR (CE-6)
Modulo    : video_generator.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Genera video avatar da testo tramite HeyGen API
            (o D-ID come fallback).
            Prende uno script video .md (formato CE),
            estrae il voiceover, genera il video,
            salva in CONTENT_ENGINE/video/
Input     : --file <script_video.md> o --text <str>
Output    : .mp4 in CONTENT_ENGINE/video/ + job metadata .json
Config    : HEYGEN_API_KEY nell'ambiente (o DID_API_KEY per fallback)
Avvio     : python video_generator.py --file script_video_2026-03-16.md
========================================================
"""

import os
import re
import sys
import json
import time
import logging
import argparse
import requests
from pathlib import Path
from datetime import datetime

ROOT           = Path(__file__).resolve().parent.parent.parent
CONTENT_ENGINE = Path("C:/Users/Matteo/Desktop/CONTENT_ENGINE")
VIDEO_DIR      = CONTENT_ENGINE / "video"
LOG_PATH       = ROOT / "DATA" / "logs" / "video_generator.log"

# HeyGen config
HEYGEN_API_BASE  = "https://api.heygen.com/v2"
HEYGEN_AVATAR_ID = "josh_lite3_20230714"  # avatar default — sostituibile
HEYGEN_VOICE_ID  = "en-US-BrianNeural"    # TTS interno HeyGen

# D-ID fallback
DID_API_BASE     = "https://api.d-id.com"
DID_PRESENTER_ID = "rian-pbMoTzs7an"

# Polling: controlla stato job ogni N secondi, max M tentativi
POLL_INTERVAL = 10
POLL_MAX      = 60  # 10 minuti max

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [VIDEO_GEN] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("video_generator")


def _get_key(name: str) -> str | None:
    """Legge una chiave API da ambiente o .env."""
    key = os.environ.get(name, "").strip()
    if not key:
        env_file = ROOT / ".env"
        if env_file.exists():
            for line in env_file.read_text(encoding="utf-8").splitlines():
                if line.startswith(f"{name}="):
                    key = line.split("=", 1)[1].strip()
                    break
    return key or None


def _extract_voiceover(script_content: str) -> str:
    """
    Estrae il testo VO (voiceover) da uno script video .md.
    Cerca pattern: **VO:** "testo" o **Audio/VO:** "testo"
    Concatena tutti i VO in ordine di scena.
    """
    # Pattern: VO: "testo" o VO:** testo
    vo_lines = re.findall(
        r'\*\*(?:Audio/)?VO:\*\*\s*["\']?([^"\'\n]+)["\']?',
        script_content, re.IGNORECASE
    )
    if vo_lines:
        return " ".join(vo_lines).strip()

    # Fallback: rimuovi markdown e prendi il testo pulito
    clean = re.sub(r'```.*?```', '', script_content, flags=re.DOTALL)
    clean = re.sub(r'^#+\s+', '', clean, flags=re.MULTILINE)
    clean = re.sub(r'\*{1,3}([^*]+)\*{1,3}', r'\1', clean)
    clean = re.sub(r'<!--.*?-->', '', clean, flags=re.DOTALL)
    clean = re.sub(r'^---.*?---\s*', '', clean, flags=re.DOTALL)
    return clean.strip()[:1000]  # HeyGen max ~1000 char per video


# ============================================================
# HEYGEN
# ============================================================

def _heygen_generate(text: str, api_key: str) -> dict:
    """Crea un job video su HeyGen. Ritorna job metadata."""
    headers = {
        "X-Api-Key": api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "video_inputs": [{
            "character": {
                "type":      "avatar",
                "avatar_id": HEYGEN_AVATAR_ID,
                "scale":     1.0,
            },
            "voice": {
                "type":     "text",
                "input_text": text,
                "voice_id": HEYGEN_VOICE_ID,
            },
            "background": {
                "type":  "color",
                "value": "#1a1a1a",
            }
        }],
        "aspect_ratio": "16:9",
        "test": False,
    }
    resp = requests.post(
        f"{HEYGEN_API_BASE}/video/generate",
        headers=headers, json=payload, timeout=30
    )
    if resp.status_code != 200:
        raise RuntimeError(f"HeyGen generate error {resp.status_code}: {resp.text[:200]}")
    return resp.json()


def _heygen_poll(video_id: str, api_key: str) -> str:
    """Aspetta che il video sia pronto. Ritorna URL del video."""
    headers = {"X-Api-Key": api_key}
    for attempt in range(POLL_MAX):
        resp = requests.get(
            f"{HEYGEN_API_BASE}/video/{video_id}",
            headers=headers, timeout=15
        )
        data = resp.json().get("data", {})
        status = data.get("status", "")
        log.info(f"HeyGen job {video_id} — status: {status} ({attempt+1}/{POLL_MAX})")

        if status == "completed":
            return data.get("video_url", "")
        if status in ("failed", "error"):
            raise RuntimeError(f"HeyGen job fallito: {data}")

        time.sleep(POLL_INTERVAL)

    raise TimeoutError(f"HeyGen job timeout dopo {POLL_MAX * POLL_INTERVAL}s")


# ============================================================
# D-ID (FALLBACK)
# ============================================================

def _did_generate(text: str, api_key: str) -> dict:
    """Crea un job video su D-ID."""
    headers = {
        "Authorization": f"Basic {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "script": {
            "type":  "text",
            "input": text,
        },
        "source_url": f"https://d-id-talks-prod.s3.us-west-2.amazonaws.com/auth0|{DID_PRESENTER_ID}/image.jpeg",
    }
    resp = requests.post(
        f"{DID_API_BASE}/talks",
        headers=headers, json=payload, timeout=30
    )
    if resp.status_code not in (200, 201):
        raise RuntimeError(f"D-ID create error {resp.status_code}: {resp.text[:200]}")
    return resp.json()


def _did_poll(talk_id: str, api_key: str) -> str:
    """Aspetta che il video D-ID sia pronto."""
    headers = {"Authorization": f"Basic {api_key}"}
    for attempt in range(POLL_MAX):
        resp = requests.get(
            f"{DID_API_BASE}/talks/{talk_id}",
            headers=headers, timeout=15
        )
        data = resp.json()
        status = data.get("status", "")
        log.info(f"D-ID talk {talk_id} — status: {status} ({attempt+1}/{POLL_MAX})")

        if status == "done":
            return data.get("result_url", "")
        if status in ("error", "rejected"):
            raise RuntimeError(f"D-ID job fallito: {data}")

        time.sleep(POLL_INTERVAL)

    raise TimeoutError(f"D-ID job timeout dopo {POLL_MAX * POLL_INTERVAL}s")


# ============================================================
# DOWNLOAD VIDEO
# ============================================================

def _download_video(url: str, out_path: Path):
    """Scarica il video dall'URL e lo salva su disco."""
    log.info(f"Download video: {url[:60]}...")
    resp = requests.get(url, stream=True, timeout=120)
    resp.raise_for_status()
    with open(out_path, "wb") as f:
        for chunk in resp.iter_content(chunk_size=65536):
            f.write(chunk)
    size_mb = out_path.stat().st_size / (1024 * 1024)
    log.info(f"Video salvato: {out_path.name} ({size_mb:.1f} MB)")


# ============================================================
# FUNZIONE PRINCIPALE
# ============================================================

def generate_video(text: str, output_name: str) -> Path:
    """
    Genera un video avatar. Prova HeyGen, fallback su D-ID.
    Ritorna il path del .mp4 salvato.
    """
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    date_str = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    out_path = VIDEO_DIR / f"{output_name}_{date_str}.mp4"
    meta_path = VIDEO_DIR / f"{output_name}_{date_str}_meta.json"

    heygen_key = _get_key("HEYGEN_API_KEY")
    did_key    = _get_key("DID_API_KEY")

    if not heygen_key and not did_key:
        log.error("Nessuna API key trovata. Aggiungi HEYGEN_API_KEY o DID_API_KEY a .env")
        sys.exit(1)

    provider = None
    video_url = None

    if heygen_key:
        try:
            log.info("Tentativo HeyGen...")
            job = _heygen_generate(text, heygen_key)
            video_id = job.get("data", {}).get("video_id", "")
            if not video_id:
                raise RuntimeError(f"video_id assente: {job}")
            video_url = _heygen_poll(video_id, heygen_key)
            provider = "heygen"
        except Exception as e:
            log.warning(f"HeyGen fallito: {e} — provo D-ID...")

    if not video_url and did_key:
        try:
            log.info("Tentativo D-ID...")
            job = _did_generate(text, did_key)
            talk_id = job.get("id", "")
            if not talk_id:
                raise RuntimeError(f"talk_id assente: {job}")
            video_url = _did_poll(talk_id, did_key)
            provider = "d-id"
        except Exception as e:
            log.error(f"D-ID fallito: {e}")
            sys.exit(1)

    if not video_url:
        log.error("Nessun video URL ottenuto.")
        sys.exit(1)

    _download_video(video_url, out_path)

    # Salva metadata
    meta = {
        "timestamp": datetime.now().isoformat(),
        "provider":  provider,
        "video_url": video_url,
        "output":    str(out_path),
        "text_chars": len(text),
    }
    meta_path.write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")

    return out_path


def generate_from_script(md_path: Path) -> Path:
    """Legge uno script video .md, estrae VO, genera video."""
    content = md_path.read_text(encoding="utf-8", errors="ignore")
    vo_text = _extract_voiceover(content)
    log.info(f"VO estratto da {md_path.name}: {len(vo_text)} char")
    return generate_video(vo_text, output_name=md_path.stem)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Video Generator — script .md → .mp4")
    parser.add_argument("--file", type=str, help="Script video .md")
    parser.add_argument("--text", type=str, help="Testo VO diretto")
    parser.add_argument("--name", type=str, default="video", help="Nome base output")
    args = parser.parse_args()

    if args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = CONTENT_ENGINE / "produzione_contenuti" / path
        result = generate_from_script(path)
        print(f"\nVideo: {result}")
    elif args.text:
        result = generate_video(args.text, output_name=args.name)
        print(f"\nVideo: {result}")
    else:
        parser.print_help()
