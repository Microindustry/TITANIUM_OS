# api_server.py | ECOSYSTEM_OS | v1.5 | 2026-06-11
# v1.5: hardening sicurezza (red-team #38) — denylist .env/_VAULT in path_allowed,
#       validazione path-aware (no prefix-match), auth X-API-Key per chiamate remote
# Flask API server — serve dati reali al dashboard React
# Endpoints: STATE.json, mente_digest.json, trigger scanner, update state
# Run: python api_server.py  (porta 5001)

import sys
import os
import re
import json
import subprocess
import logging
import threading
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Processo hidden (avviato da watchdog/START_LOGIN con -WindowStyle Hidden):
# sys.stdout/stderr sono None. torch/HuggingFace/tqdm/chromadb scrivono progress
# bar e warning su stderr -> scrivere su None = crash nativo del worker (reset
# connessione, non eccezione Python). Reindirizza gli stream None su devnull cosi'
# qualunque libreria caricata in-process (es. rag_engine sul GPU) non puo' uccidere
# il processo. Additivo, nessun output utile perso (gira senza console). (#42 blackout)
_devnull = open(os.devnull, "w", encoding="utf-8")
if sys.stdout is None:
    sys.stdout = _devnull
if sys.stderr is None:
    sys.stderr = _devnull

sys.path.insert(0, str(Path(__file__).resolve().parent))
try:
    from CORE.log import get_logger
    logger = get_logger("api_server")
except Exception:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [api_server] %(levelname)s %(message)s")
    logger = logging.getLogger("api_server")

logger.info("api_server.py caricato")

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

app = Flask(__name__)
# CORS ristretto: solo dashboard locale, LAN privata e Tailscale — NON "*".
# L'API ha endpoint di lettura/scrittura file: con "*" qualsiasi pagina web aperta
# nel browser potrebbe chiamarla (drive-by su localhost). Niente IP hardcoded: regex di rete.
CORS(app, origins=[
    re.compile(r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"),
    re.compile(r"^https?://192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$"),     # LAN privata
    re.compile(r"^https?://100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}(:\d+)?$"),  # Tailscale CGNAT
])

_screen_jobs: dict = {}  # job_id → {status, task, result, thread}

# ── AUTH: localhost passa libero (la dashboard è same-host); le chiamate REMOTE
# (LAN/Tailscale) richiedono X-API-Key == TI_API_KEY. CORS difende il browser,
# non un curl diretto da un device della tailnet: questo sì. Fail-closed da remoto.
_API_KEY = os.environ.get("TI_API_KEY", "").strip()
_LOCAL_IPS = {"127.0.0.1", "::1", "localhost"}

@app.before_request
def _require_auth():
    if request.method == "OPTIONS" or request.path == "/api/health":
        return None
    if (request.remote_addr or "") in _LOCAL_IPS:
        return None                       # stessa macchina: la dashboard locale
    if _API_KEY and request.headers.get("X-API-Key", "") == _API_KEY:
        return None                       # remoto autenticato
    return jsonify({"ok": False, "error": "non autorizzato (chiamata remota senza X-API-Key valida)"}), 401

# ── PERCORSI ─────────────────────────────────────────────────
ROOT        = Path(__file__).parent
STATE_FILE  = ROOT / "BRAIN" / "STATE.json"
DIGEST_FILE = ROOT / "DATA" / "mente_digest.json"
SCANNER     = ROOT / "CORE" / "scanner.py"  # nuovo path post-riorganizzazione CORE/
SCANNER_LEGACY = ROOT / "NODES" / "MENTE_SCANNER" / "scanner.py"  # fallback se CORE/ non ancora migrato
if not SCANNER.exists() and SCANNER_LEGACY.exists():
    SCANNER = SCANNER_LEGACY

_home          = Path.home()
MENTE_DIR      = Path(os.environ.get("MENTE_DIR",          str(_home / "MICROINDUSTRY" / "MENTE")))
CONTENT_ENGINE = Path(os.environ.get("CONTENT_ENGINE_DIR", str(_home / "MICROINDUSTRY" / "CONTENT_ENGINE")))
CONTENT_DIR    = CONTENT_ENGINE / "produzione_contenuti"
FOTO_DIR       = Path(os.environ.get("FOTO_DIR",            str(_home / "MICROINDUSTRY" / "FOTO")))
MICROINDUSTRY  = _home / "MICROINDUSTRY"

# Radici consentite per /api/open e /api/media (sicurezza)
ALLOWED_ROOTS = [
    ROOT.resolve(),
    MENTE_DIR.resolve(),
    CONTENT_ENGINE.resolve(),
    FOTO_DIR.resolve(),
    MICROINDUSTRY.resolve(),
]

# File/cartelle con segreti: dentro ROOT ma MAI servibili via API.
# (.env e _VAULT/ vivono dentro ROOT → la sola allowlist non basta a proteggerli)
_DENY_NAMES = {".env"}
_DENY_DIRS  = {"_VAULT", "BACKUPS"}

def path_allowed(target: Path) -> bool:
    """Validazione path-aware: target dentro una radice consentita (no prefix-match
    su stringa, che lascerebbe passare TITANIUM_OS_OLD) e fuori dalla denylist segreti."""
    if target.name in _DENY_NAMES or any(part in _DENY_DIRS for part in target.parts):
        return False
    return any(target == r or r in target.parents for r in ALLOWED_ROOTS)

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

@app.get("/api/nina/status")
def nina_status():
    """Stato del nodo RAG Nina (canone sess.#44: generazione automatica).
    Conta gli EP_N2 nel canone, i semi archiviati (EP_AV in _ARCHIVIO) e riporta
    l'ultimo generato dal loop (DATA/nina_state.json). Alimenta il pannello RAG Nina."""
    av_dir   = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S_AVVENTURA"
    archivio = av_dir / "_ARCHIVIO"
    canon = sorted(p.name for p in av_dir.glob("EP_N2_*.md")) if av_dir.exists() else []
    semi  = sorted(p.name for p in archivio.glob("EP_AV_*.md")) if archivio.exists() else []
    st = read_json(ROOT / "DATA" / "nina_state.json")
    if "error" in st:
        st = {}
    return jsonify({
        "ok": True,
        "canon_count": len(canon),
        "seed_archive_count": len(semi),
        "generated_total": st.get("generated_total", 0),
        "last_generated": st.get("last_generated"),
        "last_loop": st.get("last_loop"),
        "seeds": semi,
        "auto": True,  # niente gate: il sistema genera e promuove da solo
    })

@app.get("/api/nina/archived")
def nina_archived():
    """Tutti gli episodi Nina ARCHIVIATI (per 'RAG Nina = tutti, anche quelli archiviati'):
    le ORIGINI (EP_AV, il mondo prima del canone EP_N2) e le VERSIONI PRECEDENTI (reemit).
    Sola lettura; il contenuto si apre via /api/file."""
    arch = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S_AVVENTURA" / "_ARCHIVIO"
    out = []
    if arch.exists():
        for p in sorted(arch.rglob("*.md")):
            rel = p.relative_to(ROOT).as_posix()
            categoria = "versione" if "reemit_" in rel else "origine"
            title = p.stem
            try:
                head = p.read_text(encoding="utf-8", errors="ignore")[:600]
                m = re.search(r"^title:\s*(.+)$", head, flags=re.M)
                if m:
                    title = m.group(1).strip()
            except Exception:
                pass
            mid = re.match(r"(EP_[A-Z0-9]+_(?:FIN_\d+|M\d+|\d+))", p.stem)
            out.append({
                "id": mid.group(1) if mid else p.stem,
                "title": title, "categoria": categoria,
                "file": p.name, "path": str(p),
            })
    origine = [e for e in out if e["categoria"] == "origine"]
    versioni = [e for e in out if e["categoria"] == "versione"]
    return jsonify({"ok": True, "total": len(out),
                    "origine": origine, "versioni": versioni})

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
    if not path_allowed(target):
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
    if not path_allowed(target):
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
    if not path_allowed(target) or not (target == ROOT.resolve() or ROOT.resolve() in target.parents):
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

@app.get("/api/rag/search")
def rag_search():
    """Ricerca semantica RAG su MENTE/ via ChromaDB."""
    q     = request.args.get("q", "").strip()
    top_k = int(request.args.get("top_k", 5))
    if not q:
        return jsonify({"ok": False, "error": "param q mancante"}), 400
    try:
        sys.path.insert(0, str(ROOT))
        from NODES.MENTE_RAG.rag_engine import search as rag_search_fn
        results = rag_search_fn(q, top_k=top_k)
        return jsonify({"ok": True, "query": q, "total": len(results), "results": results})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.post("/api/rag/rebuild")
def rag_rebuild():
    """Forza rebuild indice ChromaDB da MENTE/."""
    try:
        result = subprocess.run(
            [sys.executable, str(ROOT / "NODES" / "MENTE_RAG" / "rag_engine.py"), "--rebuild"],
            capture_output=True, text=True, timeout=300,
            encoding="utf-8", errors="replace",
            env={**os.environ, "MENTE_DIR": str(MENTE_DIR), "PYTHONPATH": str(ROOT)},
        )
        return jsonify({"ok": result.returncode == 0, "output": result.stdout[-500:]})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.post("/api/daily-brief")
def daily_brief():
    """Genera il brief giornaliero da AUTOMATIONS/core/daily_brief.py."""
    script = ROOT / "AUTOMATIONS" / "core" / "daily_brief.py"
    if not script.exists():
        return jsonify({"ok": False, "error": "daily_brief.py non trovato"}), 404
    try:
        result = subprocess.run(
            [sys.executable, str(script)],
            capture_output=True, text=True, timeout=120,
            encoding="utf-8", errors="replace",
            env={**os.environ, "PYTHONPATH": str(ROOT)},
        )
        if result.returncode != 0:
            return jsonify({"ok": False, "error": result.stderr[-500:]}), 500
        return jsonify({"ok": True, "message": "Brief generato", "output": result.stdout[-500:]})
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "timeout dopo 120s"}), 504
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.get("/api/health")
def health():
    rag_dir = ROOT / "NODES" / "MENTE_RAG" / "chroma_db"
    return jsonify({
        "status":         "ok",
        "time":           datetime.now().isoformat(),
        "state_exists":   STATE_FILE.exists(),
        "digest_exists":  DIGEST_FILE.exists(),
        "scanner_exists": SCANNER.exists(),
        "rag_exists":     rag_dir.exists(),
        "mente_dir":      str(MENTE_DIR),
    })

# ── CONTENT ENGINE — CE-1/CE-2/CE-3/CE-4 ─────────────────────

ARCHIVE_DIR   = CONTENT_ENGINE / "archive"
SA_AUTO_DIR   = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "SA_AUTO"

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


@app.get("/api/tasks/notturne")
def tasks_notturne():
    """Stato live dei task notturni da Windows Task Scheduler (TI_*).
    Usa Get-ScheduledTask via PowerShell: State/LastTaskResult sono enum/codici
    indipendenti dalla lingua (a differenza del CSV di schtasks, localizzato)."""
    ps = (
        "$ErrorActionPreference='SilentlyContinue';"
        "@(Get-ScheduledTask -TaskName 'TI_*' | ForEach-Object {"
        "  $i=$_|Get-ScheduledTaskInfo;"
        "  [pscustomobject]@{"
        "    name=$_.TaskName; state=[string]$_.State;"
        "    next=if($i.NextRunTime){$i.NextRunTime.ToString('yyyy-MM-dd HH:mm')}else{''};"
        "    last=if($i.LastRunTime){$i.LastRunTime.ToString('yyyy-MM-dd HH:mm')}else{''};"
        "    result=[int]$i.LastTaskResult"
        "  }}) | ConvertTo-Json -Compress"
    )
    RESULT_LABELS = {
        0: "OK", 1: "errore generico",
        267009: "in esecuzione", 267010: "pronto", 267011: "mai eseguito",
        267014: "terminato", 2147750687: "istanza gia' attiva",
    }
    try:
        r = subprocess.run(
            ["powershell", "-NoProfile", "-NonInteractive", "-Command", ps],
            capture_output=True, text=True, timeout=25,
            encoding="utf-8", errors="replace",
        )
        out = (r.stdout or "").strip()
        if not out:
            return jsonify({"ok": True, "tasks": {}, "note": "nessun task TI_ trovato"})
        parsed = json.loads(out)
        if isinstance(parsed, dict):
            parsed = [parsed]
        tasks = {}
        for t in parsed:
            res = t.get("result")
            tasks[t.get("name", "?")] = {
                "state":       t.get("state", ""),
                "next_run":    t.get("next", ""),
                "last_run":    t.get("last", ""),
                "last_result": res,
                "last_result_label": RESULT_LABELS.get(res, (f"0x{res:08X}" if isinstance(res, int) else str(res))),
                "active":      t.get("state") in ("Ready", "Running"),
            }
        return jsonify({"ok": True, "tasks": tasks})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/llm/local/status")
def llm_local_status():
    """Stato del Personal LLM locale: pronto solo dopo il primo night_finetune."""
    try:
        sys.path.insert(0, str(ROOT))
        from NODES.LOCAL_LLM.infer import is_ready, ADAPTER_DIR
        return jsonify({"ok": True, "ready": is_ready(), "model": "titanium_llm_v1", "path": str(ADAPTER_DIR)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.post("/api/llm/local")
def llm_local():
    """Inferenza sul Personal LLM locale (TinyLlama+LoRA prodotto da night_finetune).
    Consuma il modello che il finetune produce -> chiude il loop. 503 se non ancora addestrato."""
    data   = request.get_json(force=True, silent=True) or {}
    prompt = (data.get("prompt") or "").strip()
    if not prompt:
        return jsonify({"ok": False, "error": "campo 'prompt' obbligatorio"}), 400
    try:
        sys.path.insert(0, str(ROOT))
        from NODES.LOCAL_LLM.infer import is_ready, generate
        if not is_ready():
            return jsonify({"ok": False, "ready": False,
                            "error": "modello locale non ancora addestrato (primo finetune domenica 01:00)"}), 503
        answer = generate(prompt, max_new_tokens=int(data.get("max_tokens", 256)))
        return jsonify({"ok": True, "ready": True, "model": "titanium_llm_v1", "answer": answer})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/llm/ollama/status")
def llm_ollama_status():
    """Stato della leva locale Ollama+Qwen (P4b) per il toggle della chat RAG.
    available=False quando la leva e' spenta (Ollama non installato): la chat
    fa fallback a Claude, niente teatro."""
    try:
        sys.path.insert(0, str(ROOT))
        from NODES.LOCAL_LLM.ollama_client import status as ollama_status
        return jsonify({"ok": True, **ollama_status()})
    except Exception as e:
        return jsonify({"ok": False, "available": False, "error": str(e)}), 200


@app.get("/api/critiche/auto")
def critiche_auto():
    """Cartella clinica viva (P1b): le critiche generate dal self-audit
    notturno (night_audit.py su Sonnet). La dashboard le mostra LIVE accanto
    al canone manuale (criticheData.ts) -> le critiche crescono da sole."""
    f = ROOT / "DATA" / "audit" / "critiche_auto.json"
    if not f.exists():
        return jsonify({"ok": True, "findings": [], "total": 0, "open": 0}), 200
    try:
        items = json.loads(f.read_text(encoding="utf-8"))
        if not isinstance(items, list):
            items = []
        open_n = sum(1 for c in items if c.get("status") == "open")
        # piu' recenti prima
        items.sort(key=lambda c: c.get("last_seen") or c.get("date") or "", reverse=True)
        return jsonify({"ok": True, "findings": items, "total": len(items), "open": open_n})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e), "findings": []}), 500


@app.get("/api/bussola/todos")
def bussola_todos():
    """Bussola viva (DA_FARE_FATTO.md) -> todo strutturati per la vista CRITICHE.
    Il file e' rigenerato dal night_audit (deterministico): la scaletta da-fare/fatto
    di Matteo appare in dashboard accanto alle critiche di sistema."""
    f = ROOT / "DATA" / "audit" / "bussola_todos.json"
    if not f.exists():
        return jsonify({"ok": True, "todos": [], "total": 0, "open": 0}), 200
    try:
        items = json.loads(f.read_text(encoding="utf-8"))
        if not isinstance(items, list):
            items = []
        open_n = sum(1 for t in items if t.get("stato") in ("da_fare", "in_corso", "non_fatto"))
        return jsonify({"ok": True, "todos": items, "total": len(items), "open": open_n})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e), "todos": []}), 500


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

@app.get("/api/episodes")
def get_episodes():
    """Lista episodi auto-generati da CONTENT_ENGINE/DATABASE/episodes/SA_AUTO/."""
    import re as _re
    if not SA_AUTO_DIR.exists():
        return jsonify({"ok": True, "total": 0, "episodes": []})
    episodes = []
    for md_file in sorted(SA_AUTO_DIR.glob("EP_AUTO_*.md"), key=lambda f: f.name):
        try:
            text = md_file.read_text(encoding="utf-8", errors="replace")
            fm_match = _re.search(r'---\n(.*?)\n---', text, _re.DOTALL)
            fm = {}
            if fm_match:
                for line in fm_match.group(1).splitlines():
                    if ":" in line:
                        k, _, v = line.partition(":")
                        fm[k.strip()] = v.strip().strip('"')
            body = text.split("---\n", 2)[-1] if text.count("---") >= 2 else text
            episodes.append({
                "id":       fm.get("id", md_file.stem),
                "title":    fm.get("title", md_file.stem),
                "sottotitolo": fm.get("sottotitolo", "Milestone verificato"),
                "stagione": fm.get("stagione", "AUTO"),
                "data_evento": fm.get("data_evento", ""),
                "status":   fm.get("status", "ready"),
                "durata_min": int(fm.get("durata_min", 8)),
                "tags":     [t.strip() for t in fm.get("tags", "").strip("[]").split(",") if t.strip()],
                "milestone": fm.get("milestone_originale", ""),
                "preview":  body.strip()[:200],
                "file":     md_file.name,
                "modified": datetime.fromtimestamp(md_file.stat().st_mtime).isoformat(),
            })
        except Exception:
            continue
    return jsonify({"ok": True, "total": len(episodes), "episodes": episodes})


# ── MEDIA — serve foto e PDF nel browser ─────────────────────

MEDIA_EXTENSIONS = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
    ".gif": "image/gif", ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".mp4": "video/mp4", ".mov": "video/quicktime",
}

@app.get("/api/media/<path:rel_path>")
def serve_media(rel_path: str):
    """
    Serve immagini e PDF inline nel browser.
    rel_path: percorso relativo a MICROINDUSTRY/
    Es: GET /api/media/FOTO/V32_BUILD/Config_G/stato_20260528/V32_20260528_01_telaio_frontale_taverna.jpeg
    """
    target = (MICROINDUSTRY / rel_path).resolve()
    if not path_allowed(target):
        return jsonify({"ok": False, "error": "percorso non consentito"}), 403
    if not target.exists() or not target.is_file():
        return jsonify({"ok": False, "error": "file non trovato"}), 404
    mime = MEDIA_EXTENSIONS.get(target.suffix.lower())
    if not mime:
        return jsonify({"ok": False, "error": "tipo file non supportato"}), 415
    return send_file(str(target), mimetype=mime)


@app.get("/api/photos")
def list_photos():
    """
    Lista foto in FOTO/V32_BUILD/ con URL servibili.
    ?subdir=Config_G/stato_20260528  filtra per sottocartella.
    """
    subdir = request.args.get("subdir", "")
    base   = FOTO_DIR / "V32_BUILD"
    if subdir:
        base = base / subdir
    if not base.exists():
        return jsonify({"ok": True, "total": 0, "photos": []})

    IMAGE_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
    photos = []
    for f in sorted(base.rglob("*")):
        if f.suffix.lower() not in IMAGE_EXT:
            continue
        rel = f.relative_to(MICROINDUSTRY).as_posix()
        stat = f.stat()
        photos.append({
            "name":     f.name,
            "rel_path": rel,
            "url":      f"/api/media/{rel}",
            "subdir":   str(f.parent.relative_to(FOTO_DIR / "V32_BUILD")),
            "size_kb":  round(stat.st_size / 1024, 1),
            "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
        })
    return jsonify({"ok": True, "total": len(photos), "photos": photos})


@app.get("/api/pdfs")
def list_pdfs():
    """Lista PDF in MENTE/ con URL per apertura inline."""
    pdfs = []
    for f in sorted(MENTE_DIR.rglob("*.pdf")):
        rel = f.relative_to(MICROINDUSTRY).as_posix()
        stat = f.stat()
        pdfs.append({
            "name":     f.name,
            "rel_path": rel,
            "url":      f"/api/media/{rel}",
            "subdir":   str(f.parent.relative_to(MENTE_DIR)),
            "size_kb":  round(stat.st_size / 1024, 1),
            "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
        })
    return jsonify({"ok": True, "total": len(pdfs), "pdfs": pdfs})


# ── PROGRAMMI — avvia/ferma processi sul PC ───────────────────

import shutil as _shutil

# Mappa nome → comando (usare sempre path assoluti o env var)
_SUMATRAPDF = str(Path(os.environ.get("LOCALAPPDATA","")) / "SumatraPDF" / "SumatraPDF.exe")
_FFMPEG_BIN = next(
    (str(p.parent) for p in Path(os.environ.get("LOCALAPPDATA","")).glob(
        "Microsoft/WinGet/Packages/Gyan.FFmpeg*/ffmpeg-*/bin/ffmpeg.exe"
    ) if p.exists()),
    "ffmpeg"
)

PROGRAMS = {
    "dashboard": {
        "cmd": ["cmd", "/c", "start", "http://localhost:5173"],
        "desc": "Apre Dashboard nel browser (localhost:5173)",
    },
    "n8n": {
        "cmd": ["cmd", "/c", "start", "http://localhost:5678"],
        "desc": "Apre n8n nel browser (localhost:5678)",
    },
    "explorer_foto": {
        "cmd": ["explorer", str(FOTO_DIR / "V32_BUILD")],
        "desc": "Apre Esplora File su FOTO/V32_BUILD/",
    },
    "explorer_mente": {
        "cmd": ["explorer", str(MENTE_DIR)],
        "desc": "Apre Esplora File su MENTE/",
    },
    "explorer_titanium": {
        "cmd": ["explorer", str(ROOT)],
        "desc": "Apre Esplora File su TITANIUM_OS/",
    },
    "explorer_assoluto": {
        "cmd": ["explorer", str(MENTE_DIR / "ASSOLUTO")],
        "desc": "Apre Esplora File su MENTE/ASSOLUTO/ (documenti V7/V8)",
    },
    "sumatrapdf": {
        "cmd": [_SUMATRAPDF],
        "desc": "Apre SumatraPDF (finestra vuota — poi trascina PDF)",
    },
}

@app.get("/api/programs")
def list_programs():
    """Lista programmi/azioni avviabili via API."""
    return jsonify({
        "ok": True,
        "programs": [{"id": k, "desc": v["desc"]} for k, v in PROGRAMS.items()]
    })

@app.post("/api/programs/<name>/run")
def run_program(name: str):
    """Avvia un programma/azione registrata."""
    prog = PROGRAMS.get(name)
    if not prog:
        return jsonify({"ok": False, "error": f"programma non trovato: {name}"}), 404
    try:
        subprocess.Popen(prog["cmd"], shell=False)
        return jsonify({"ok": True, "launched": name, "desc": prog["desc"]})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ── AGENTS ───────────────────────────────────────────────────

AGENTS_DB = ROOT / "NODES" / "AGENTS" / "agents_db.json"

@app.get("/api/agents")
def get_agents():
    """Lista agenti da agents_db.json."""
    if not AGENTS_DB.exists():
        return jsonify({"agents": {}}), 404
    data = json.loads(AGENTS_DB.read_text(encoding="utf-8"))
    return jsonify(data)

@app.post("/api/agents/ask")
def agents_ask():
    """Invia domanda a un agente e restituisce la risposta."""
    body = request.get_json(silent=True) or {}
    agent_key = body.get("agent", "").strip()
    question  = body.get("question", "").strip()
    use_rag   = body.get("use_rag", True)   # default ON: l'agente DEVE ancorarsi a MENTE

    if not agent_key or not question:
        return jsonify({"ok": False, "error": "agent e question obbligatori"}), 400

    # carica agenti
    if not AGENTS_DB.exists():
        return jsonify({"ok": False, "error": "agents_db.json non trovato"}), 500
    db = json.loads(AGENTS_DB.read_text(encoding="utf-8"))
    agents = db.get("agents", {})
    agent = agents.get(agent_key)
    if not agent:
        return jsonify({"ok": False, "error": f"agente '{agent_key}' non trovato"}), 404

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return jsonify({"ok": False, "error": "ANTHROPIC_API_KEY mancante"}), 500

    try:
        import anthropic as _ant
        client = _ant.Anthropic(api_key=api_key)

        # RAG grounding: l'agente recupera DAVVERO da MENTE prima di rispondere.
        # Prima la UI prometteva "accesso al knowledge base" ma /ask lo ignorava
        # (use_rag mai usato) -> era teatro. Ora e' reale e ritorna le fonti.
        rag_context, sources = "", []
        if use_rag:
            try:
                sys.path.insert(0, str(ROOT))
                from NODES.MENTE_RAG.rag_engine import search as rag_search_fn
                seen_src = set()
                for h in rag_search_fn(question, top_k=5):
                    src = h.get("source", "?")
                    txt = (h.get("text") or h.get("preview") or "").strip()
                    if txt:
                        rag_context += f"\n[{src}]\n{txt}\n"
                        if src not in seen_src:          # dedup fonti per file
                            seen_src.add(src)
                            sources.append({"source": src, "score": round(float(h.get("score", 0)), 3)})
            except Exception as _re:
                app.logger.warning("agents_ask: RAG non disponibile (%s) - rispondo senza", _re)

        # Ruolo operativo (P5): THEMIS (analista sistema) legge la CARTELLA CLINICA
        # — le critiche del self-audit notturno. Vive in DATA/audit, FUORI dal RAG
        # (escluso dal canone), quindi serve un hook dedicato, non la ricerca.
        if agent_key == "themis":
            crit_f = ROOT / "DATA" / "audit" / "critiche_auto.json"
            if crit_f.exists():
                try:
                    aperte = [c for c in json.loads(crit_f.read_text(encoding="utf-8"))
                              if c.get("status") == "open"][:12]
                    if aperte:
                        rag_context += "\n[CARTELLA CLINICA — critiche aperte dal self-audit notturno]\n"
                        for c in aperte:
                            rag_context += f"- ({c.get('severity')}/{c.get('area')}) {c.get('finding')} → {c.get('azione')}\n"
                except Exception as _ce:
                    app.logger.warning("agents_ask: critiche non lette (%s)", _ce)

        system_prompt = f"""Sei {agent['name']} {agent.get('emoji','')} — {agent['role']}.

EXPERTISE:
{chr(10).join(f"- {e}" for e in agent.get('expertise', []))}

TONO: {agent.get('tone', '')}

Sei integrato in TITANIUM_OS, il sistema cognitivo di Matteo Benenati (artigiano industriale, ADHD, CNC V32 in taverna 12mq, Milano).
Rispondi in italiano. Sii tecnico, preciso, diretto. Non c'è limite di lunghezza — rispondi quanto serve.

REGOLA GLOSSARIO: Quando usi un termine tecnico o sigla che potrebbe non essere familiare, subito dopo la parola aggiungi una mini-spiegazione tra parentesi quadre in corsivo piccolo, es: "profilato HEA [¹ sezione d'acciaio a doppio T, ottimizzata per carichi flessionali]". Per i termini più importanti della risposta, aggiungi al fondo una sezione "📖 GLOSSARIO RAPIDO" con 2-3 righe max per termine: nome → definizione pratica → perché conta in questo contesto."""

        if rag_context:
            system_prompt += f"""

CONTESTO DAL KNOWLEDGE BASE (MENTE/ via RAG) — usa questi estratti come fonte
primaria e cita la fonte tra [ ]. Se il contesto non basta, dillo invece di inventare:
{rag_context}"""

        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            system=system_prompt,
            messages=[{"role": "user", "content": question}],
        )
        answer = response.content[0].text
        return jsonify({"ok": True, "agent": agent_key, "answer": answer,
                        "model": "claude-haiku-4-5",
                        "sources": sources, "rag_used": bool(rag_context)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.post("/api/rag/chat")
def rag_chat():
    """Chat RAG VERA (PUNTO 4a): chiedi -> risposta + fonti, ancorata a MENTE.
    Toggle motore (PUNTO 4b): 'claude' (haiku, sempre attivo) o 'local'
    (Ollama+Qwen, leva predisposta). Se 'local' e Ollama e' giu' -> fallback
    onesto a Claude con flag, niente teatro. RETE resta mappa, questa e' il RAG."""
    body     = request.get_json(silent=True) or {}
    question = (body.get("question") or "").strip()
    engine   = (body.get("engine") or "claude").strip().lower()
    top_k    = int(body.get("top_k", 5))
    if not question:
        return jsonify({"ok": False, "error": "campo 'question' obbligatorio"}), 400

    # 1 — Retrieval reale dal RAG (CANONE MENTE + ricerca), con fonti
    rag_context, sources = "", []
    try:
        sys.path.insert(0, str(ROOT))
        from NODES.MENTE_RAG.rag_engine import search as rag_search_fn
        seen = set()
        for h in rag_search_fn(question, top_k=top_k):
            src = h.get("source", "?")
            txt = (h.get("text") or h.get("preview") or "").strip()
            if txt:
                rag_context += f"\n[{src}]\n{txt}\n"
                if src not in seen:
                    seen.add(src)
                    sources.append({"source": src, "score": round(float(h.get("score", 0)), 3)})
    except Exception as e:
        return jsonify({"ok": False, "error": f"RAG non disponibile: {e}"}), 503

    if not rag_context:
        return jsonify({"ok": True, "answer": "Nessun chunk rilevante in MENTE per questa domanda. "
                        "Aggiungi un documento e lancia rag-update.", "sources": [],
                        "engine_used": "none"}), 200

    system_prompt = (
        "Sei l'assistente RAG di TITANIUM_OS, il sistema cognitivo di Matteo Benenati "
        "(artigiano industriale, CNC V32, Milano). Rispondi in italiano, tecnico e diretto. "
        "USA SOLO il contesto qui sotto come fonte primaria e cita i file tra [ ]. "
        "Se il contesto non basta, dillo invece di inventare.\n\n"
        "CONTESTO DAL KNOWLEDGE BASE (MENTE/ via RAG):\n" + rag_context
    )

    # 2 — Generazione: motore locale (leva) o Claude (default), con fallback onesto
    fallback = False
    if engine == "local":
        try:
            from NODES.LOCAL_LLM.ollama_client import is_available, has_model, generate as ollama_gen, DEFAULT_MODEL
            if is_available() and has_model(DEFAULT_MODEL):
                answer = ollama_gen(question, system=system_prompt, max_tokens=512)
                return jsonify({"ok": True, "answer": answer, "sources": sources,
                                "engine_used": "local", "model": DEFAULT_MODEL})
            fallback = True   # leva spenta -> Claude
        except Exception as _oe:
            app.logger.warning("rag_chat: Ollama ko (%s) -> fallback Claude", _oe)
            fallback = True

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return jsonify({"ok": False, "error": "ANTHROPIC_API_KEY mancante (e motore locale non disponibile)"}), 500
    try:
        import anthropic as _ant
        client = _ant.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            system=system_prompt,
            messages=[{"role": "user", "content": question}],
        )
        return jsonify({"ok": True, "answer": response.content[0].text, "sources": sources,
                        "engine_used": "claude", "model": "claude-haiku-4-5",
                        "fallback": fallback})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/rag/vectors")
def rag_vectors():
    """
    Proiezione 2D degli embedding ChromaDB via t-SNE.
    Un punto per documento (centroide dei suoi chunk).
    Cached in DATA/rag_vectors_cache.json — invalida quando count cambia.
    """
    import numpy as np
    cache_path = ROOT / "DATA" / "rag_vectors_cache.json"

    try:
        import chromadb as _chroma
        chroma_path = ROOT / "NODES" / "MENTE_RAG" / "chroma_db"
        client = _chroma.PersistentClient(path=str(chroma_path))
        col = client.get_collection("mente")
        total_chunks = col.count()

        # Usa cache se il count non è cambiato (e contiene i links — invalida i
        # cache vecchi pre-P4a). ?force=1 la bypassa (il frontend lo manda già).
        force = request.args.get("force")
        if cache_path.exists() and not force:
            cached = json.loads(cache_path.read_text(encoding="utf-8"))
            if cached.get("chunk_count") == total_chunks and "links" in cached:
                return jsonify({"ok": True, **cached})

        # Carica tutti gli embedding
        result = col.get(include=["embeddings", "metadatas"], limit=total_chunks)
        embeddings = np.array(result["embeddings"], dtype=np.float32)
        sources    = [m.get("source", "unknown") for m in result["metadatas"]]

        # Raggruppa per documento — centroide degli embedding
        from collections import defaultdict
        doc_embs: dict[str, list] = defaultdict(list)
        for emb, src in zip(embeddings, sources):
            doc_embs[src].append(emb)

        doc_ids      = list(doc_embs.keys())
        doc_centroids = np.array([np.mean(v, axis=0) for v in doc_embs.values()], dtype=np.float32)
        doc_chunks   = [len(doc_embs[d]) for d in doc_ids]

        # t-SNE 3D (perplexity adattiva al dataset)
        from sklearn.manifold import TSNE
        perp = min(30, max(5, len(doc_ids) // 4))
        tsne = TSNE(n_components=3, perplexity=perp, random_state=42, max_iter=1000)
        coords_3d = tsne.fit_transform(doc_centroids)

        # Normalizza in [-1, 1] per asse
        for axis in range(3):
            mn, mx = coords_3d[:, axis].min(), coords_3d[:, axis].max()
            if mx > mn:
                coords_3d[:, axis] = 2 * (coords_3d[:, axis] - mn) / (mx - mn) - 1

        # ── Archi semantici: similarita' coseno REALE tra centroidi documento ──
        # P4a "RETE alimentata dal RAG": gli archi nascono dagli embedding del RAG
        # (non da euristiche folder/keyword del vecchio rag_graph.pkl). Per ogni
        # nodo i suoi top-K vicini sopra soglia. Indici allineati a `points`.
        norm = doc_centroids / (np.linalg.norm(doc_centroids, axis=1, keepdims=True) + 1e-8)
        sim  = norm @ norm.T
        np.fill_diagonal(sim, -1.0)
        SIM_THRESH, SIM_TOPK = 0.55, 4
        links, seen_pairs = [], set()
        for i in range(len(doc_ids)):
            for j in np.argsort(sim[i])[::-1][:SIM_TOPK]:
                w = float(sim[i, int(j)])
                if w < SIM_THRESH:
                    continue
                a, b = (i, int(j)) if i < int(j) else (int(j), i)
                if (a, b) in seen_pairs:
                    continue
                seen_pairs.add((a, b))
                links.append({"source": a, "target": b, "weight": round(w, 3)})

        def _folder(src: str) -> str:
            parts = src.replace("\\", "/").split("/")
            return parts[0] + "/" if parts else src

        points = []
        for i, doc_id in enumerate(doc_ids):
            src_norm = doc_id.replace("\\", "/")
            folder = _folder(src_norm)
            label  = src_norm.split("/")[-1]
            points.append({
                "id":          src_norm,
                "label":       label,
                "folder":      folder,
                "chunk_count": doc_chunks[i],
                "x":           round(float(coords_3d[i, 0]), 4),
                "y":           round(float(coords_3d[i, 1]), 4),
                "z":           round(float(coords_3d[i, 2]), 4),
            })

        payload = {
            "ok":          True,
            "chunk_count": total_chunks,
            "doc_count":   len(points),
            "points":      points,
            "links":       links,
        }
        cache_path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
        return jsonify(payload)

    except Exception as e:
        # Indice stale nel processo long-running (es. dopo un rebuild senza restart):
        # invalida la cache e dai un messaggio azionabile invece di un 500 nudo.
        try:
            if cache_path.exists():
                cache_path.unlink()
        except Exception:
            pass
        return jsonify({
            "ok": False,
            "error": f"RAG index non leggibile ({e}). Riavvia l'API: SERVICES/restart_api.ps1",
        }), 503


@app.get("/api/graph/graphify")
def graphify_graph():
    """Grafo Graphify (knowledge graph del repo) nella STESSA forma di /api/rag/vectors,
    cosi' la vista RETE lo renderizza senza modifiche al motore 3D.
    Layout 3D per community (fibonacci sphere + jitter deterministico). Cache su disco."""
    import math, random
    gpath = ROOT / "graphify-out" / "graph.json"
    cache_path = ROOT / "DATA" / "graphify_layout_cache.json"
    if not gpath.exists():
        return jsonify({"ok": False,
                        "error": "graphify-out/graph.json assente — esegui `graphify update .`"}), 404
    try:
        g = json.loads(gpath.read_text(encoding="utf-8"))
        nodes = g.get("nodes", [])
        links_raw = g.get("links", g.get("edges", []))
        commit = g.get("built_at_commit", "")

        force = request.args.get("force")
        if cache_path.exists() and not force:
            cached = json.loads(cache_path.read_text(encoding="utf-8"))
            if cached.get("doc_count") == len(nodes) and cached.get("commit") == commit:
                return jsonify({"ok": True, **cached})

        ids = [n.get("id") for n in nodes]
        idx = {nid: i for i, nid in enumerate(ids)}

        # grado (per dimensionare i nodi)
        deg = [0] * len(ids)
        edges = []
        for l in links_raw:
            s, t = idx.get(l.get("source")), idx.get(l.get("target"))
            if s is None or t is None or s == t:
                continue
            deg[s] += 1; deg[t] += 1
            edges.append({"source": s, "target": t, "weight": round(float(l.get("weight", 1.0)), 3)})

        # centri community su una sfera di fibonacci -> cluster separati e leggibili
        comms = sorted({n.get("community", 0) for n in nodes})
        cmap = {c: i for i, c in enumerate(comms)}
        C = max(1, len(comms))
        ga = math.pi * (3 - math.sqrt(5))
        def center(i):
            y = 1 - (i / (C - 1)) * 2 if C > 1 else 0.0
            r = math.sqrt(max(0.0, 1 - y * y))
            th = ga * i
            return (math.cos(th) * r, y, math.sin(th) * r)
        centers = [center(i) for i in range(C)]

        coords = []
        for n in nodes:
            cx, cy, cz = centers[cmap.get(n.get("community", 0), 0)]
            rnd = random.Random(hash(str(n.get("id"))) & 0xffffffff)
            jit = 0.22
            coords.append([cx * 2 + (rnd.random() - .5) * jit,
                           cy * 2 + (rnd.random() - .5) * jit,
                           cz * 2 + (rnd.random() - .5) * jit])
        # normalizza in [-1,1] per asse
        for ax in range(3):
            vals = [c[ax] for c in coords]
            mn, mx = min(vals), max(vals)
            if mx > mn:
                for c in coords:
                    c[ax] = 2 * (c[ax] - mn) / (mx - mn) - 1

        def _folder(src):
            src = (src or "").replace("\\", "/")
            return (src.split("/")[0] + "/") if "/" in src else (src or "·")

        points = []
        for i, n in enumerate(nodes):
            points.append({
                "id": n.get("id"),
                "label": n.get("label") or (n.get("id") or "")[:24],
                "folder": _folder(n.get("source_file")),
                "chunk_count": max(1, deg[i]),
                "x": round(coords[i][0], 4), "y": round(coords[i][1], 4), "z": round(coords[i][2], 4),
            })

        payload = {"ok": True, "doc_count": len(points), "chunk_count": len(points),
                   "community_count": len(comms), "commit": commit,
                   "points": points, "links": edges}
        try:
            cache_path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
        except Exception:
            pass
        return jsonify(payload)
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.get("/api/rag/graph")
def rag_graph_data():
    """Esporta il grafo RAG v5 come JSON per react-force-graph-2d."""
    try:
        import pickle as _pickle
        graph_path = ROOT / "NODES" / "MENTE_RAG" / "rag_graph.pkl"
        if not graph_path.exists():
            return jsonify({"ok": False, "error": "rag_graph.pkl non trovato — esegui rag_graph.py --build"}), 404
        with open(graph_path, "rb") as f:
            G = _pickle.load(f)

        nodes = []
        for node_id, data in G.nodes(data=True):
            nodes.append({
                "id":          node_id,
                "folder":      data.get("folder", ""),
                "chunk_count": data.get("chunk_count", 1),
                "label":       node_id.split("/")[-1] or node_id,
            })

        links = []
        for src, tgt, data in G.edges(data=True):
            links.append({
                "source": src,
                "target": tgt,
                "type":   data.get("type", ""),
                "weight": round(data.get("weight", 0.5), 3),
            })

        # Top hub nodes per grado (in+out)
        degree = sorted(G.degree(), key=lambda x: x[1], reverse=True)[:10]
        top_hubs = [{"id": n, "degree": d} for n, d in degree]

        return jsonify({
            "ok":      True,
            "nodes":   nodes,
            "links":   links,
            "stats":   {"nodes": len(nodes), "edges": len(links)},
            "top_hubs": top_hubs,
        })
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/api/screen", methods=["POST"])
def api_screen():
    """
    Avvia screen_agent in background.
    Body JSON: {"task": "...", "no_act": false, "save_shots": false, "cols": 20, "rows": 15}
    Ritorna subito job_id; usa GET /api/screen/<job_id> per il risultato.
    """
    data    = request.get_json(force=True, silent=True) or {}
    task    = data.get("task", "")
    if not task:
        return jsonify({"ok": False, "error": "task mancante"}), 400

    no_act     = bool(data.get("no_act",     False))
    save_shots = bool(data.get("save_shots", False))
    cols       = int(data.get("cols", 20))
    rows       = int(data.get("rows", 15))
    loops      = int(data.get("loops", 20))

    import uuid, time as _time
    job_id = str(uuid.uuid4())[:8]
    _screen_jobs[job_id] = {"status": "running", "task": task, "result": None, "started": _time.time()}

    py = str(Path(sys.executable))
    agent = str(ROOT / "NODES" / "COMPUTER_USE" / "screen_agent.py")

    def _run():
        args = [py, agent, task, "--cols", str(cols), "--rows", str(rows), "--loops", str(loops)]
        if no_act:     args.append("--no-act")
        if save_shots: args.append("--save-shots")
        try:
            r = subprocess.run(args, capture_output=True, text=True, timeout=300)
            out = r.stdout.strip()
            last = [l for l in out.splitlines() if l.startswith("Risultato:")]
            result = last[-1].replace("Risultato:", "").strip() if last else out[-500:]
            _screen_jobs[job_id]["status"] = "done"
            _screen_jobs[job_id]["result"] = result
            logger.info("screen job %s done: %s", job_id, result[:80])
        except Exception as e:
            _screen_jobs[job_id]["status"] = "error"
            _screen_jobs[job_id]["result"] = str(e)

    _screen_jobs[job_id]["thread"] = threading.Thread(target=_run, daemon=True)
    _screen_jobs[job_id]["thread"].start()
    logger.info("screen job %s avviato: %s", job_id, task[:60])
    return jsonify({"ok": True, "job_id": job_id, "task": task})


@app.route("/api/screen/<job_id>", methods=["GET"])
def api_screen_status(job_id):
    """Stato e risultato di un job screen_agent."""
    job = _screen_jobs.get(job_id)
    if not job:
        return jsonify({"ok": False, "error": "job non trovato"}), 404
    return jsonify({
        "ok": True,
        "job_id": job_id,
        "status": job["status"],
        "task":   job["task"],
        "result": job["result"],
    })


@app.route("/api/restart", methods=["POST"])
def api_restart():
    """Termina il processo — il watchdog riavvia con codice aggiornato."""
    logger.info("Restart richiesto via /api/restart")
    threading.Timer(0.5, lambda: os._exit(0)).start()
    return jsonify({"ok": True, "msg": "Riavvio in corso..."})


# ── MAIN ─────────────────────────────────────────────────────
if __name__ == "__main__":
    logger.info("ECOSYSTEM_OS API SERVER v1.3 — porta 5001")
    logger.info("STATE:  %s", STATE_FILE)
    logger.info("DIGEST: %s", DIGEST_FILE)
    app.run(port=5001, debug=False)
