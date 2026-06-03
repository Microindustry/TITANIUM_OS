# infer.py | TITANIUM_OS / NODES / LOCAL_LLM | v1.0 | 2026-06-03
# Inferenza sul Personal LLM fine-tunato (TinyLlama-1.1B + LoRA prodotto da night_finetune).
# E' il CONSUMATORE del modello che night_finetune.bat produce -> chiude il loop GENESIS.
# Caricamento pigro (singleton). is_ready() = False finche' il primo finetune non ha girato.

import sys
from pathlib import Path
from functools import lru_cache

ROOT        = Path(__file__).resolve().parents[2]
ADAPTER_DIR = ROOT / "MODELS" / "titanium_llm_v1"
BASE_MODEL  = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"


def is_ready() -> bool:
    """True solo se l'adapter LoRA esiste (night_finetune ha gia' girato almeno una volta)."""
    return (ADAPTER_DIR / "adapter_config.json").exists()


@lru_cache(maxsize=1)
def _load():
    import torch
    from transformers import AutoModelForCausalLM, AutoTokenizer
    from peft import PeftModel
    device = "cuda" if torch.cuda.is_available() else "cpu"
    tok = AutoTokenizer.from_pretrained(BASE_MODEL)
    base = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    )
    model = PeftModel.from_pretrained(base, str(ADAPTER_DIR))
    model.to(device).eval()
    return tok, model, device


def generate(prompt: str, max_new_tokens: int = 256, temperature: float = 0.7) -> str:
    """Genera una risposta col modello locale. Solleva RuntimeError se non pronto."""
    if not is_ready():
        raise RuntimeError("modello locale non ancora addestrato (esegui night_finetune)")
    import torch
    tok, model, device = _load()
    text = f"<|user|>\n{prompt}</s>\n<|assistant|>\n"   # template chat TinyLlama
    inputs = tok(text, return_tensors="pt").to(device)
    with torch.no_grad():
        out = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=temperature,
            do_sample=temperature > 0,
            pad_token_id=tok.eos_token_id,
        )
    full = tok.decode(out[0], skip_special_tokens=True)
    return full.split("<|assistant|>")[-1].strip() if "<|assistant|>" in full else full[len(text):].strip()


if __name__ == "__main__":
    if not is_ready():
        print("[local_llm] NON pronto — il modello si crea col primo night_finetune (domenica 01:00).")
        print(f"[local_llm] atteso in: {ADAPTER_DIR}")
        sys.exit(2)
    q = " ".join(sys.argv[1:]) or "Chi e' Matteo Benenati e cosa sta costruendo con TITANIUM_OS?"
    print(generate(q))
