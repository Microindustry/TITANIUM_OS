"""
========================================================
TITANIUM_OS — ELEVENLABS TEXT-TO-SPEECH (CE-5)
Modulo    : elevenlabs_tts.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Converte un testo (o file .md) in audio .mp3
            tramite ElevenLabs API.
            Salva in CONTENT_ENGINE/audio/
Input     : --file <md> o --text <stringa> o chiamata API
Output    : .mp3 in CONTENT_ENGINE/audio/
Config    : ELEVENLABS_API_KEY nell'ambiente
            ELEVENLABS_VOICE_ID (opzionale — default: Adam)
Avvio     : python elevenlabs_tts.py --file respiro_dei_dati_podcast.md
            python elevenlabs_tts.py --text "Testo da convertire"
========================================================
"""

import os
import re
import sys
import json
import logging
import argparse
import requests
from pathlib import Path
from datetime import datetime

ROOT         = Path(__file__).resolve().parent.parent.parent
CONTENT_ENGINE = Path(os.environ.get("CONTENT_ENGINE_DIR", str(Path.home() / "MICROINDUSTRY" / "CONTENT_ENGINE")))
AUDIO_DIR    = CONTENT_ENGINE / "audio"
LOG_PATH     = ROOT / "DATA" / "logs" / "elevenlabs_tts.log"

# ElevenLabs config
API_BASE     = "https://api.elevenlabs.io/v1"
DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"  # Adam — voce maschile neutra
DEFAULT_MODEL    = "eleven_multilingual_v2"  # supporta italiano

# Limite caratteri per chiamata (ElevenLabs max ~5000 per richiesta free)
CHUNK_MAX_CHARS = 4500

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [ELEVENLABS] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("elevenlabs_tts")


def _get_api_key() -> str:
    """Legge la chiave API dall'ambiente."""
    key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not key:
        # Prova a caricare da .env
        env_file = ROOT / ".env"
        if env_file.exists():
            for line in env_file.read_text(encoding="utf-8").splitlines():
                if line.startswith("ELEVENLABS_API_KEY="):
                    key = line.split("=", 1)[1].strip()
                    break
    if not key:
        log.error("ELEVENLABS_API_KEY non trovata. Aggiungila a TITANIUM_OS/.env")
        sys.exit(1)
    return key


def _clean_md_for_speech(content: str) -> str:
    """
    Rimuove sintassi Markdown non adatta alla voce:
    heading markers, link, code blocks, frontmatter.
    """
    # Rimuovi frontmatter
    content = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
    # Rimuovi blocchi codice
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    # Rimuovi heading markers ma mantieni il testo
    content = re.sub(r'^#{1,6}\s+', '', content, flags=re.MULTILINE)
    # Rimuovi bold/italic
    content = re.sub(r'\*{1,3}([^*]+)\*{1,3}', r'\1', content)
    # Rimuovi link [testo](url) → testo
    content = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', content)
    # Rimuovi commenti HTML
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    # Rimuovi righe che iniziano con | (tabelle)
    content = re.sub(r'^\|.*\|$', '', content, flags=re.MULTILINE)
    # Comprimi righe vuote multiple
    content = re.sub(r'\n{3,}', '\n\n', content)
    return content.strip()


def _split_into_chunks(text: str, max_chars: int = CHUNK_MAX_CHARS) -> list[str]:
    """
    Divide il testo in chunk sotto max_chars,
    rispettando i confini di paragrafo.
    """
    paragraphs = text.split("\n\n")
    chunks = []
    current = ""

    for para in paragraphs:
        if len(current) + len(para) + 2 <= max_chars:
            current = (current + "\n\n" + para).strip()
        else:
            if current:
                chunks.append(current)
            current = para[:max_chars]  # tronca paragrafi enormi

    if current:
        chunks.append(current)

    return chunks


def _call_tts_api(text: str, api_key: str, voice_id: str, model: str) -> bytes:
    """Chiama ElevenLabs TTS API e ritorna i bytes audio."""
    url = f"{API_BASE}/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "text": text,
        "model_id": model,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.3,
            "use_speaker_boost": True,
        }
    }
    response = requests.post(url, headers=headers, json=payload, timeout=60)
    if response.status_code != 200:
        raise RuntimeError(f"ElevenLabs API error {response.status_code}: {response.text[:200]}")
    return response.content


def convert_to_speech(text: str, output_name: str,
                      voice_id: str = None, model: str = DEFAULT_MODEL) -> Path:
    """
    Converte testo in .mp3. Gestisce testi lunghi dividendoli in chunk
    e concatenando i byte audio.
    """
    api_key  = _get_api_key()
    voice_id = voice_id or os.environ.get("ELEVENLABS_VOICE_ID", DEFAULT_VOICE_ID)

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    date_str  = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    out_path  = AUDIO_DIR / f"{output_name}_{date_str}.mp3"

    chunks = _split_into_chunks(text)
    log.info(f"TTS | chunk: {len(chunks)} | voice: {voice_id} | model: {model}")

    all_audio = b""
    for i, chunk in enumerate(chunks, start=1):
        log.info(f"Chunk {i}/{len(chunks)} ({len(chunk)} char)...")
        audio_bytes = _call_tts_api(chunk, api_key, voice_id, model)
        all_audio += audio_bytes

    out_path.write_bytes(all_audio)
    size_kb = len(all_audio) / 1024
    log.info(f"Audio salvato: {out_path.name} ({size_kb:.0f} KB)")
    return out_path


def convert_file(md_path: Path, voice_id: str = None) -> Path:
    """Legge un file .md, pulisce e converte in .mp3."""
    content = md_path.read_text(encoding="utf-8", errors="ignore")
    clean   = _clean_md_for_speech(content)
    name    = md_path.stem
    log.info(f"Conversione: {md_path.name} → {len(clean)} char puliti")
    return convert_to_speech(clean, output_name=name, voice_id=voice_id)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ElevenLabs TTS — .md → .mp3")
    parser.add_argument("--file",  type=str, help="File .md da convertire")
    parser.add_argument("--text",  type=str, help="Testo diretto da convertire")
    parser.add_argument("--name",  type=str, default="output", help="Nome base del file .mp3")
    parser.add_argument("--voice", type=str, help="ElevenLabs Voice ID (override default)")
    args = parser.parse_args()

    if args.file:
        path = Path(args.file)
        if not path.is_absolute():
            path = CONTENT_ENGINE / "produzione_contenuti" / path
        result = convert_file(path, voice_id=args.voice)
        log.info("Audio: %s", result)
    elif args.text:
        result = convert_to_speech(args.text, output_name=args.name, voice_id=args.voice)
        log.info("Audio: %s", result)
    else:
        parser.print_help()
