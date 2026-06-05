# ollama_client.py | TITANIUM_OS / LOCAL_LLM | v1.0 | 2026-06-05
# Leva P4b — generatore locale opzionale per la chat RAG.
# Decisione P4B_RESEARCH.md: Ollama + Qwen2.5-7B-Instruct-Q4_K_M su GTX 1070 8GB.
# Leva PREDISPOSTA: se Ollama non e' installato/non risponde -> is_available()=False
# e la chat RAG fa fallback a Claude. Nessun teatro: o gira davvero o lo dice.

from __future__ import annotations
import json
import urllib.request
import urllib.error

OLLAMA_URL   = "http://127.0.0.1:11434"  # 127.0.0.1 non localhost: rifiuto immediato se giu' (no fallback IPv6)
DEFAULT_MODEL = "qwen2.5:7b-instruct-q4_K_M"   # vedi P4B_RESEARCH.md
_TIMEOUT      = 1.5    # ping veloce: la dashboard non deve appendere


def _get(path: str, timeout: int = _TIMEOUT):
    req = urllib.request.Request(OLLAMA_URL + path, method="GET")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8"))


def is_available() -> bool:
    """True solo se il server Ollama risponde davvero su localhost:11434."""
    try:
        _get("/api/tags")
        return True
    except Exception:
        return False


def list_models() -> list[str]:
    """Modelli scaricati localmente (vuoto se Ollama giu')."""
    try:
        data = _get("/api/tags")
        return [m.get("name", "") for m in data.get("models", [])]
    except Exception:
        return []


def has_model(model: str = DEFAULT_MODEL) -> bool:
    names = list_models()
    return any(model.split(":")[0] in n for n in names)


def status() -> dict:
    """Stato sintetico per la UI — UNA sola chiamata a /api/tags (ping veloce)."""
    up, models = False, []
    try:
        data = _get("/api/tags")
        up = True
        models = [m.get("name", "") for m in data.get("models", [])]
    except Exception:
        pass
    return {
        "engine":      "ollama",
        "available":   up,
        "model":       DEFAULT_MODEL,
        "model_ready": any(DEFAULT_MODEL.split(":")[0] in m for m in models),
        "models":      models,
        "hint":        None if up else
                       "Leva spenta: installa Ollama + `ollama pull " + DEFAULT_MODEL + "`",
    }


def generate(prompt: str, system: str = "", model: str = DEFAULT_MODEL,
             max_tokens: int = 512, timeout: int = 120) -> str:
    """Generazione locale (non-stream). Solleva se Ollama non risponde."""
    payload = {
        "model":   model,
        "prompt":  prompt,
        "system":  system,
        "stream":  False,
        "options": {"num_predict": max_tokens, "temperature": 0.3},
    }
    req = urllib.request.Request(
        OLLAMA_URL + "/api/generate",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    return (data.get("response") or "").strip()


if __name__ == "__main__":
    import sys
    print(json.dumps(status(), indent=2, ensure_ascii=False))
    if is_available() and len(sys.argv) > 1:
        print("\n--- generate ---")
        print(generate(" ".join(sys.argv[1:])))
