# api_server.py | ECOSYSTEM_OS | v1.1 | 2026-03-16
# Flask API server — serve dati reali al dashboard React
# Endpoints: STATE.json, mente_digest.json, trigger scanner, update state
# Run: python api_server.py  (porta 5001)

import sys
import os
import json
import subprocess
from pathlib import Path
from datetime import datetime

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permetti richieste da localhost:5173 (Vite)

# ── PERCORSI ─────────────────────────────────────────────────
ROOT        = Path(__file__).parent
STATE_FILE  = ROOT / "BRAIN" / "STATE.json"
DIGEST_FILE = ROOT / "DATA" / "mente_digest.json"
SCANNER     = ROOT / "CORE" / "scanner.py"  # nuovo path post-riorganizzazione CORE/
SCANNER_LEGACY = ROOT / "NODES" / "MENTE_SCANNER" / "scanner.py"  # fallback se CORE/ non ancora migrato
if not SCANNER.exists() and SCANNER_LEGACY.exists():
    SCANNER = SCANNER_LEGACY

CONTENT_ENGINE = Path(r"C:\Users\Matteo\Desktop\CONTENT_ENGINE")
CONTENT_DIR    = CONTENT_ENGINE / "produzione_contenuti"

# Radici consentite per /api/open (sicurezza)
ALLOWED_ROOTS = [
    ROOT.resolve(),
    Path(r"C:\Users\Matteo\Desktop\LA MIA MENTE").resolve(),
    CONTENT_ENGINE.resolve(),
]

# ── HELPERS ──────────────────────────────────────────────────

def read_json(path: Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        return {"error": str(e)}

def write_json(path: Path, data: dict):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

# ── ROUTES ───────────────────────────────────────────────────

@app.get("/api/state")
def get_state():
    """Legge BRAIN/STATE.json live."""
    return jsonify(read_json(STATE_FILE))

@app.patch("/api/state")
def patch_state():
    """Aggiorna campi specifici di STATE.json (merge superficiale)."""
    state = read_json(STATE_FILE)
    patch = request.get_json(force=True) or {}
    state.update(patch)
    state["last_update"] = datetime.now().isoformat()
    write_json(STATE_FILE, state)
    return jsonify({"ok": True, "state": state})

@app.patch("/api/state/pillar/<pillar_id>")
def patch_pillar(pillar_id: str):
    """Aggiorna un pillar specifico."""
    state = read_json(STATE_FILE)
    patch = request.get_json(force=True) or {}
    if "pillars" not in state:
        state["pillars"] = {}
    state["pillars"].setdefault(pillar_id, {}).update(patch)
    state["last_update"] = datetime.now().isoformat()
    write_json(STATE_FILE, state)
    return jsonify({"ok": True, "pillar": state["pillars"][pillar_id]})

@app.get("/api/digest")
def get_digest():
    """Legge DATA/mente_digest.json."""
    if not DIGEST_FILE.exists():
        return jsonify({"error": "digest non trovato — esegui scanner prima"}), 404
    return jsonify(read_json(DIGEST_FILE))

@app.post("/api/scan")
def run_scan():
    """Lancia MENTE_SCANNER e restituisce il digest aggiornato."""
    try:
        result = subprocess.run(
            [sys.executable, str(SCANNER)],
            capture_output=True, text=True, timeout=120,
            encoding="utf-8", errors="replace"
        )
        if result.returncode != 0:
            return jsonify({"ok": False, "error": result.stderr[-500:]}), 500
        digest = read_json(DIGEST_FILE)
        return jsonify({"ok": True, "digest": digest, "stdout": result.stdout[-1000:]})
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "timeout dopo 120s"}), 504
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.get("/api/file")
def read_file():
    """Restituisce il contenuto testo di un file (max 100KB) per preview nel dashboard."""
    raw = request.args.get("path", "").strip()
    if not raw:
        return jsonify({"ok": False, "error": "path mancante"}), 400
    target = Path(raw).resolve()
    if not any(str(target).startswith(str(r)) for r in ALLOWED_ROOTS):
        return jsonify({"ok": False, "error": "percorso non consentito"}), 403
    if not target.exists():
        return jsonify({"ok": False, "error": f"non trovato: {target}"}), 404
    if target.is_dir():
        # Per le cartelle: elenca i figli
        children = [
            {"name": p.name, "is_dir": p.is_dir(), "size_kb": round(p.stat().st_size / 1024, 1) if p.is_file() else None}
            for p in sorted(target.iterdir(), key=lambda p: (p.is_file(), p.name))
        ]
        return jsonify({"ok": True, "type": "dir", "path": str(target), "children": children})
    size = target.stat().st_size
    if size > 200_000:
        return jsonify({"ok": False, "error": f"file troppo grande ({size // 1024}KB) — apri esternamente"}), 413
    try:
        text = target.read_text(encoding="utf-8", errors="replace")
        return jsonify({"ok": True, "type": "file", "path": str(target), "content": text, "size_kb": round(size / 1024, 1)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.post("/api/open")
def open_path():
    """Apre un file o cartella con l'applicazione predefinita Windows (os.startfile)."""
    data = request.get_json(force=True) or {}
    raw  = data.get("path", "").strip()
    if not raw:
        return jsonify({"ok": False, "error": "path mancante"}), 400
    target = Path(raw).resolve()
    # Verifica che il path sia dentro una radice consentita
    if not any(str(target).startswith(str(r)) for r in ALLOWED_ROOTS):
        return jsonify({"ok": False, "error": "percorso non consentito"}), 403
    if not target.exists():
        return jsonify({"ok": False, "error": f"non trovato: {target}"}), 404
    try:
        os.startfile(str(target))
        return jsonify({"ok": True, "opened": str(target)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.get("/api/md-files")
def list_md_files():
    """Lista tutti i file .md in TITANIUM_OS, ordinati per data modifica decrescente."""
    SKIP_DIRS = {"BACKUPS", "VERSIONS", "node_modules", "__pycache__", ".git", "venv", ".venv"}
    files = []
    for p in ROOT.rglob("*.md"):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        try:
            stat = p.stat()
            files.append({
                "path": str(p),
                "rel":  str(p.relative_to(ROOT)),
                "name": p.name,
                "size_kb":  round(stat.st_size / 1024, 1),
                "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
            })
        except Exception:
            pass
    files.sort(key=lambda f: f["modified"], reverse=True)
    return jsonify({"ok": True, "total": len(files), "files": files})

@app.post("/api/md-save")
def save_md():
    """Salva contenuto in un file .md esistente (solo dentro ROOT)."""
    data = request.get_json(force=True) or {}
    path_str = data.get("path", "").strip()
    content  = data.get("content", "")
    if not path_str:
        return jsonify({"ok": False, "error": "path mancante"}), 400
    target = Path(path_str).resolve()
    if not str(target).startswith(str(ROOT.resolve())):
        return jsonify({"ok": False, "error": "percorso non consentito"}), 403
    if target.suffix.lower() != ".md":
        return jsonify({"ok": False, "error": "solo file .md consentiti"}), 400
    if not target.exists():
        return jsonify({"ok": False, "error": "file non trovato"}), 404
    target.write_text(content, encoding="utf-8")
    return jsonify({"ok": True, "saved": str(target), "size_kb": round(len(content.encode()) / 1024, 1)})

@app.get("/api/digest/search")
def search_digest():
    """Cerca nel digest. Query param: q=testo. Cerca in decisions, specs, milestones, path file."""
    q = request.args.get("q", "").strip().lower()
    if not q:
        return jsonify({"ok": False, "error": "param q mancante"}), 400
    if not DIGEST_FILE.exists():
        return jsonify({"ok": False, "error": "digest non trovato — esegui scanner prima"}), 404

    digest = read_json(DIGEST_FILE)
    results = []

    for file_entry in digest.get("by_file", []):
        hits = []
        extracts = file_entry.get("extracts", {})

        # Cerca in ogni categoria
        for category, items in extracts.items():
            for item in items:
                if q in item.lower():
                    hits.append({"category": category, "text": item})

        # Cerca anche nel path file
        if q in file_entry.get("path", "").lower():
            hits.append({"category": "filename", "text": file_entry["path"]})

        if hits:
            results.append({
                "file": file_entry["path"],
                "type": file_entry.get("type", ""),
                "hits": hits,
            })

    return jsonify({
        "ok": True,
        "query": q,
        "total_results": len(results),
        "results": results[:50],  # max 50 file
    })

@app.get("/api/content-files")
def list_content_files():
    """Lista i file .md in CONTENT_ENGINE/produzione_contenuti/, ordinati per data decrescente."""
    if not CONTENT_DIR.exists():
        return jsonify({"ok": True, "total": 0, "files": []})
    files = []
    for p in sorted(CONTENT_DIR.glob("*.md"), key=lambda x: x.stat().st_mtime, reverse=True):
        try:
            stat = p.stat()
            files.append({
                "path":     str(p),
                "name":     p.name,
                "size_kb":  round(stat.st_size / 1024, 1),
                "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
            })
        except Exception:
            pass
    return jsonify({"ok": True, "total": len(files), "files": files})

@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "time": datetime.now().isoformat(),
        "state_exists": STATE_FILE.exists(),
        "digest_exists": DIGEST_FILE.exists(),
        "scanner_exists": SCANNER.exists(),
    })

# ── CONTENT ENGINE — CE-1/CE-2/CE-3/CE-4 ─────────────────────

ARCHIVE_DIR = CONTENT_ENGINE / "archive"

@app.post("/api/content/trigger")
def content_trigger():
    """
    CE-1 — Webhook trigger per n8n.
    Payload: {"tema": str, "formato": str, "source": str (opz)}
    Lancia archivista.py in background e ritorna job_id.
    """
    data   = request.get_json(force=True) or {}
    tema   = data.get("tema", "").strip()
    formato = data.get("formato", "full").strip()
    if not tema:
        return jsonify({"ok": False, "error": "campo 'tema' obbligatorio"}), 400

    archivista = ROOT / "AUTOMATIONS" / "core" / "archivista.py"
    if not archivista.exists():
        return jsonify({"ok": False, "error": "archivista.py non trovato"}), 500

    try:
        # Avvia in background — n8n non aspetta la risposta
        import threading
        def _run():
            subprocess.run(
                [sys.executable, str(archivista), "--tema", tema, "--formato", formato],
                cwd=str(ROOT), capture_output=True
            )
        t = threading.Thread(target=_run, daemon=True)
        t.start()

        job_id = f"{tema.replace(' ','_')}_{datetime.now().strftime('%H%M%S')}"
        return jsonify({"ok": True, "job_id": job_id, "tema": tema, "formato": formato})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/content/archive")
def get_archive():
    """
    CE-2 — Legge l'archivio per n8n.
    Query params: tema (opz), limit (default 10)
    Ritorna lista file con excerpt.
    """
    tema  = request.args.get("tema", "").strip().lower()
    limit = int(request.args.get("limit", 10))

    results = []
    for d in [ARCHIVE_DIR, ROOT / "ARCHIVE"]:
        if not d.exists():
            continue
        for f in d.rglob("*.md"):
            try:
                content = f.read_text(encoding="utf-8", errors="replace")
                relevant = not tema or tema in content.lower()[:500] or tema in f.name.lower()
                if relevant:
                    results.append({
                        "file": f.name,
                        "path": str(f),
                        "excerpt": content[:800],
                        "size": len(content),
                    })
            except IOError:
                continue

    # Ordina per dimensione decrescente, limita
    results.sort(key=lambda x: -x["size"])
    results = results[:limit]
    return jsonify({"ok": True, "total": len(results), "archive": results})


@app.post("/api/content/generate")
def generate_content():
    """
    CE-3 — Genera storytelling via Claude API (sincrono).
    Payload: {"tema": str, "formato": str, "archive_excerpts": [...] (opz)}
    Ritorna: {"ok": true, "file": path, "content": testo}
    """
    data    = request.get_json(force=True) or {}
    tema    = data.get("tema", "").strip()
    formato = data.get("formato", "full")
    if not tema:
        return jsonify({"ok": False, "error": "campo 'tema' obbligatorio"}), 400

    archivista_path = ROOT / "AUTOMATIONS" / "core" / "archivista.py"
    if not archivista_path.exists():
        return jsonify({"ok": False, "error": "archivista.py non trovato"}), 500

    try:
        result = subprocess.run(
            [sys.executable, str(archivista_path), "--tema", tema, "--formato", formato],
            capture_output=True, text=True, timeout=120,
            encoding="utf-8", errors="replace", cwd=str(ROOT)
        )
        if result.returncode != 0:
            return jsonify({"ok": False, "error": result.stderr[-500:]}), 500

        # Trova il file generato più recente in produzione_contenuti
        output_dir = CONTENT_ENGINE / "produzione_contenuti"
        files = sorted(output_dir.glob("*.md"), key=lambda f: f.stat().st_mtime, reverse=True)
        if not files:
            return jsonify({"ok": False, "error": "nessun file generato"}), 500

        latest = files[0]
        return jsonify({
            "ok": True,
            "file": str(latest),
            "name": latest.name,
            "content": latest.read_text(encoding="utf-8", errors="replace"),
        })
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "timeout dopo 120s"}), 504
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/view/<path:rel_path>")
def get_view(rel_path: str):
    """
    CE-4 + #25 — Serve la view JSON strutturata di un .md.
    Generata da md_view_pipeline.py.
    Se non esiste, la genera al volo.
    """
    views_dir = ROOT / "DATA" / "views"
    view_key  = rel_path.replace("/", "__") + ".json"
    view_path = views_dir / view_key

    if not view_path.exists():
        # Genera al volo
        md_path = ROOT / rel_path
        if not md_path.exists():
            return jsonify({"ok": False, "error": f"file non trovato: {rel_path}"}), 404
        try:
            sys.path.insert(0, str(ROOT / "AUTOMATIONS" / "core"))
            from md_view_pipeline import deploy_view
            deploy_view(md_path)
        except Exception as e:
            return jsonify({"ok": False, "error": str(e)}), 500

    if view_path.exists():
        return jsonify(json.loads(view_path.read_text(encoding="utf-8")))
    return jsonify({"ok": False, "error": "view non generabile"}), 500


@app.get("/api/view-index")
def get_view_index():
    """Ritorna DATA/view_index.json — indice di tutte le view disponibili."""
    index_path = ROOT / "DATA" / "view_index.json"
    if not index_path.exists():
        return jsonify({"ok": False, "error": "indice non trovato — esegui md_view_pipeline --rebuild"}), 404
    return jsonify(json.loads(index_path.read_text(encoding="utf-8")))


@app.get("/api/semantic/search")
def semantic_search():
    """
    Ricerca semantica nel database SQLite.
    Query param: q=keyword, limit (default 20)
    """
    q     = request.args.get("q", "").strip()
    limit = int(request.args.get("limit", 20))
    if not q:
        return jsonify({"ok": False, "error": "param q mancante"}), 400

    try:
        sys.path.insert(0, str(ROOT / "AUTOMATIONS" / "core"))
        from semantic_indexer import search
        results = search(q, limit=limit)
        return jsonify({"ok": True, "query": q, "total": len(results), "results": results})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/watchdog/status")
def watchdog_status():
    """Legge DATA/watchdog_status.json — stato ultimo ciclo watchdog."""
    status_path = ROOT / "DATA" / "watchdog_status.json"
    if not status_path.exists():
        return jsonify({"ok": False, "error": "watchdog non ancora avviato"}), 404
    return jsonify({"ok": True, **json.loads(status_path.read_text(encoding="utf-8"))})


@app.get("/api/sanitizer/report")
def sanitizer_report():
    """Legge l'ultimo report del sanitizer."""
    report_path = ROOT / "DATA" / "sanitizer_report.json"
    if not report_path.exists():
        return jsonify({"ok": False, "error": "nessun report — esegui sanitizer.py prima"}), 404
    return jsonify({"ok": True, **json.loads(report_path.read_text(encoding="utf-8"))})

# ── CONTENT ENGINE CE-5 / CE-6 / CE-7 ────────────────────────

CORE_PATH = ROOT / "AUTOMATIONS" / "core"

@app.post("/api/content/tts")
def content_tts():
    """CE-5 — Converte file .md in .mp3 tramite ElevenLabs."""
    data  = request.get_json(force=True) or {}
    fname = data.get("file", "").strip()
    if not fname:
        return jsonify({"ok": False, "error": "campo 'file' obbligatorio"}), 400
    md_path = CONTENT_DIR / fname
    if not md_path.exists():
        return jsonify({"ok": False, "error": f"file non trovato: {fname}"}), 404
    tts_script = CORE_PATH / "elevenlabs_tts.py"
    try:
        result = subprocess.run(
            [sys.executable, str(tts_script), "--file", str(md_path)],
            capture_output=True, text=True, timeout=180,
            encoding="utf-8", errors="replace"
        )
        if result.returncode != 0:
            return jsonify({"ok": False, "error": result.stderr[-300:]}), 500
        audio_dir = CONTENT_ENGINE / "audio"
        mp3_files = sorted(audio_dir.glob("*.mp3"), key=lambda f: f.stat().st_mtime, reverse=True)
        if not mp3_files:
            return jsonify({"ok": False, "error": "nessun .mp3 generato"}), 500
        latest = mp3_files[0]
        return jsonify({"ok": True, "audio_file": latest.name, "path": str(latest), "source": fname})
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "timeout TTS (180s)"}), 504
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.post("/api/content/video")
def content_video():
    """CE-6 — Genera video avatar da script .md tramite HeyGen/D-ID."""
    data  = request.get_json(force=True) or {}
    fname = data.get("file", "").strip()
    if not fname:
        return jsonify({"ok": False, "error": "campo 'file' obbligatorio"}), 400
    md_path = CONTENT_DIR / fname
    if not md_path.exists():
        return jsonify({"ok": False, "error": f"file non trovato: {fname}"}), 404
    video_script = CORE_PATH / "video_generator.py"
    try:
        result = subprocess.run(
            [sys.executable, str(video_script), "--file", str(md_path)],
            capture_output=True, text=True, timeout=600,
            encoding="utf-8", errors="replace"
        )
        if result.returncode != 0:
            return jsonify({"ok": False, "error": result.stderr[-300:]}), 500
        video_dir = CONTENT_ENGINE / "video"
        mp4_files = sorted(video_dir.glob("*.mp4"), key=lambda f: f.stat().st_mtime, reverse=True)
        if not mp4_files:
            return jsonify({"ok": False, "error": "nessun .mp4 generato"}), 500
        latest = mp4_files[0]
        return jsonify({"ok": True, "video_file": latest.name, "path": str(latest), "source": fname})
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "timeout video (600s)"}), 504
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.post("/api/content/distribute")
def content_distribute():
    """CE-7 — Pubblica .md su LinkedIn e/o Telegram."""
    data     = request.get_json(force=True) or {}
    fname    = data.get("file", "").strip()
    channels = [c.strip() for c in data.get("channels", "linkedin,telegram").split(",")]
    if not fname:
        return jsonify({"ok": False, "error": "campo 'file' obbligatorio"}), 400
    md_path = CONTENT_DIR / fname
    if not md_path.exists():
        return jsonify({"ok": False, "error": f"file non trovato: {fname}"}), 404
    dist_script = CORE_PATH / "social_distributor.py"
    flags = ["--file", str(md_path)]
    if "linkedin" in channels:
        flags.append("--linkedin")
    if "telegram" in channels:
        flags.append("--telegram")
    try:
        result = subprocess.run(
            [sys.executable, str(dist_script)] + flags,
            capture_output=True, text=True, timeout=60,
            encoding="utf-8", errors="replace"
        )
        return jsonify({
            "ok": result.returncode == 0,
            "channels": channels, "source": fname,
            "output": result.stdout[-500:],
            "error": result.stderr[-200:] if result.returncode != 0 else None,
        })
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "timeout (60s)"}), 504
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

# ── MAIN ─────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("  ECOSYSTEM_OS API SERVER v1.0")
    print(f"  Porta: 5001")
    print(f"  STATE:  {STATE_FILE}")
    print(f"  DIGEST: {DIGEST_FILE}")
    print("=" * 50)
    app.run(port=5001, debug=False)
