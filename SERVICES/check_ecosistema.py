# check_ecosistema.py | TITANIUM_OS / SERVICES | v1.0 | 2026-07-19
# Verifica LIVE che l'ecosistema sia su dopo un riavvio: porte, processi, RAG, task, git.
# Uso: python SERVICES/check_ecosistema.py
import socket, subprocess, sys, os
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
OK, KO = "[ OK ]", "[FALLO]"

def port(p, name):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.settimeout(1.5)
    up = s.connect_ex(("127.0.0.1", p)) == 0; s.close()
    print(f"  {OK if up else KO} {name} (porta {p})")
    return up

def main():
    print("=== PORTE (servizi vivi) ===")
    api = port(5001, "API server")
    dash = port(5173, "Dashboard")
    n8n = port(5678, "n8n")

    print("\n=== PROCESSI ===")
    try:
        import psutil
        names = {}
        for pr in psutil.process_iter(["name"]):
            n = (pr.info["name"] or "").lower()
            if n in ("pythonw.exe", "python.exe", "node.exe"):
                names[n] = names.get(n, 0) + 1
        for k in ("pythonw.exe", "python.exe", "node.exe"):
            print(f"  {k}: {names.get(k, 0)}")
    except Exception as e:
        print(f"  (psutil non disponibile: {e})")

    print("\n=== RAG (stack + device) ===")
    try:
        import torch, chromadb  # noqa
        dev = (BASE / "NODES/MENTE_RAG/rag_device.txt")
        dtxt = dev.read_text().strip() if dev.exists() else "?"
        print(f"  {OK} torch {torch.__version__} cuda={torch.cuda.is_available()} | chromadb {chromadb.__version__} | device={dtxt}")
    except Exception as e:
        print(f"  {KO} import RAG: {e}")

    print("\n=== TASK SCHEDULATI (TI_*) ===")
    try:
        out = subprocess.run(["powershell", "-NoProfile", "-Command",
            "Get-ScheduledTask | Where-Object { $_.TaskName -like 'TI_*' } | ForEach-Object { $_.TaskName + ' = ' + $_.State }"],
            capture_output=True, text=True, timeout=30)
        lines = [l for l in out.stdout.splitlines() if l.strip()]
        print(f"  {len(lines)} task TI_ trovati:")
        for l in lines:
            print("   ", l.strip())
    except Exception as e:
        print(f"  (task non leggibili: {e})")

    print("\n=== GIT ===")
    try:
        st = subprocess.run(["git", "status", "--short"], cwd=str(BASE), capture_output=True, text=True)
        n = len([l for l in st.stdout.splitlines() if l.strip()])
        up = subprocess.run(["git", "rev-list", "--count", "origin/main..main"], cwd=str(BASE), capture_output=True, text=True)
        print(f"  file non committati: {n} | commit non pushati: {up.stdout.strip()}")
    except Exception as e:
        print(f"  (git: {e})")

    print("\n=== VERDETTO ===")
    core = api and dash
    print(f"  {'TUTTO VIVO (core: API+Dashboard su)' if core else 'ATTENZIONE: qualche servizio core giu (rilancia START_LOGIN.bat)'}")
    return 0 if core else 1

if __name__ == "__main__":
    sys.exit(main())
