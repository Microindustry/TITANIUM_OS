# episode_to_audio.py
# parte di: TITANIUM_OS / CONTENT_ENGINE
# versione: 1.0 / data: 2026-03-22
#
# Converte episodi .md in audio .wav per podcast
# Provider: Kokoro TTS (offline, gratuito) via RealtimeTTS
#
# Setup: pip install RealtimeTTS kokoro-onnx
# Uso:   python CONTENT_ENGINE/scripts/episode_to_audio.py [EP_AUTO_001]
#        senza argomenti: processa tutti gli episodi senza audio

import re
import sys
from pathlib import Path

ROOT       = Path(__file__).parent.parent.parent
EP_DIR     = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
AUDIO_DIR  = ROOT / "CONTENT_ENGINE" / "DATABASE" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)


def strip_markdown(text: str) -> str:
    """Rimuove markdown per TTS — titoli, bold, code, quote."""
    text = re.sub(r'^#{1,3}\s+', '', text, flags=re.MULTILINE)   # titoli
    text = re.sub(r'\*{1,2}(.+?)\*{1,2}', r'\1', text)           # bold/italic
    text = re.sub(r'`[^`]+`', '', text)                           # inline code
    text = re.sub(r'```[\s\S]*?```', '', text)                    # code blocks
    text = re.sub(r'^>\s*', '', text, flags=re.MULTILINE)         # blockquote
    text = re.sub(r'\n{3,}', '\n\n', text)                        # spazi multipli
    return text.strip()


def extract_content(md_path: Path) -> tuple[str, str]:
    """Ritorna (title, content_plain) da file .md con frontmatter."""
    raw = md_path.read_text(encoding="utf-8")
    # rimuovi frontmatter ---
    body = re.sub(r'^---[\s\S]+?---\n', '', raw).strip()
    # estrai titolo dal primo H1
    title_match = re.search(r'^#\s+(.+)$', body, re.MULTILINE)
    title = title_match.group(1) if title_match else md_path.stem
    content = strip_markdown(body)
    return title, content


def render_audio(ep_id: str, title: str, text: str) -> Path:
    """Genera .wav con Kokoro TTS via RealtimeTTS."""
    try:
        from RealtimeTTS import TextToAudioStream, KokoroEngine
    except ImportError:
        print("  INSTALL: pip install RealtimeTTS kokoro-onnx")
        return None

    out_path = AUDIO_DIR / f"{ep_id}.wav"
    if out_path.exists():
        print(f"  gia presente: {out_path.name}")
        return out_path

    # Kokoro: voce italiana (fallback inglese se non disponibile)
    engine = KokoroEngine(voice="if_nicola")   # italiano maschile
    stream = TextToAudioStream(engine)

    print(f"  rendering audio ({len(text.split())} parole)...")
    stream.feed(text)
    stream.play_async()

    import wave, array
    frames = []
    while stream.is_playing():
        chunk = stream.get_audio_chunk()
        if chunk:
            frames.append(chunk)

    # salva .wav
    with wave.open(str(out_path), 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)
        wf.writeframes(b''.join(frames))

    return out_path


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else None

    if target:
        files = [EP_DIR / f"{target}.md"]
    else:
        files = sorted(EP_DIR.glob("EP_AUTO_*.md"))

    if not files:
        print("Nessun episodio trovato.")
        return

    print(f"episode_to_audio — {len(files)} episodi")
    print("-" * 40)

    for md_path in files:
        if not md_path.exists():
            print(f"  NON TROVATO: {md_path.name}")
            continue

        ep_id = md_path.stem
        title, content = extract_content(md_path)
        print(f"  {ep_id}: {title}")

        out = render_audio(ep_id, title, content)
        if out:
            kb = out.stat().st_size // 1024
            print(f"     salvato: {out.name} ({kb} KB)")

    print("-" * 40)
    print(f"audio in: {AUDIO_DIR}")


if __name__ == "__main__":
    main()
