# night_caroselli.py | TITANIUM_OS / CAROSELLI_AGENT | v1.0 | 2026-07-14
# L'APPRENDISTA NOTTURNO (design DOCS/DESIGN_NIGHT_CAROSELLI.md, approvato Matteo 14/07):
# la notte prepara UNA bozza di carosello in quarantena (_BOZZE/), il giorno promuove.
# LA NOTTE NON PROMUOVE MAI e non tocca le vetrine.
#   1. QUEUE   : DATA/caroselli_queue.json — primo item "pending" (mai gli "insieme")
#   2. GROUND  : rag_engine.search_and_format (grounding debole -> STOP con report)
#   3. DRAFT   : Claude API (sonnet, come night_audit) -> slide DATA in JSON
#   4. BUILD   : sg_builder (scene SOLO dalla libreria; canon_guard su ogni testo)
#   5. RENDER  : slides/ PNG + slides_ig/ JPEG (stesse funzioni di render_queue)
#   6. QC      : checks di caroselli_qc sul risultato -> report bozze_caroselli.json
# Guardie: lock single-instance · timeout 20 min · exit-code + marker nel log ·
#          1 bozza/notte · nessun push · additivo (tutto sotto _BOZZE/).

import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

BASE      = Path(__file__).resolve().parents[2]
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"
BOZZE     = CAROSELLI / "_BOZZE"
QUEUE     = BASE / "DATA" / "caroselli_queue.json"
REPORT    = BASE / "DATA" / "audit" / "bozze_caroselli.json"
LOG       = BASE / "DATA" / "logs" / "night_caroselli.log"
LOCK      = BASE / "DATA" / "night_caroselli.lock"

MODEL       = "claude-sonnet-4-6"   # economico, NO Opus (regola notturne)
MAX_MINUTES = 20
MIN_DOSSIER = 400                    # sotto questa soglia il grounding e' DEBOLE -> stop

sys.path.insert(0, str(CAROSELLI / "_TEMPLATE"))
sys.path.insert(0, str(BASE / "CONTENT_ENGINE" / "scripts"))
sys.path.insert(0, str(BASE / "NODES" / "MENTE_RAG"))
sys.path.insert(0, str(BASE / "AUTOMATIONS" / "core"))

_START = time.time()


def log(msg: str) -> None:
    line = f"[{datetime.now():%d/%m/%Y %H:%M:%S}] [pid {os.getpid()}] {msg}"
    print(line, flush=True)  # sotto il bat lo stdout finisce GIA' nel log (>>)
    # scrittura diretta solo se il file non e' tenuto dal redirect del bat
    # (lezione handle-lock: mai due mani sullo stesso log)
    try:
        LOG.parent.mkdir(parents=True, exist_ok=True)
        with LOG.open("a", encoding="utf-8") as f:
            f.write(line + "\n")
    except PermissionError:
        pass


def _timeout() -> bool:
    return (time.time() - _START) > MAX_MINUTES * 60


def _save_report(item: dict, status: str, issues: list, folder: str = "") -> None:
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    rep = {"generated": datetime.now().isoformat()[:19],
           "item": item.get("id", "?"), "title": item.get("title", ""),
           "status": status, "issues": issues, "folder": folder}
    REPORT.write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    log(f"report: {rep['item']} -> {status} ({len(issues)} issue)")


SYSTEM = """Sei l'apprendista notturno di TITANIUM_OS: scrivi la BOZZA di un carosello
Instagram per le storie di sistema (voce di Matteo, artigiano: 15 anni di industria,
saldatura TIG titanio, ADHD dichiarato, costruisce una fresatrice CNC in taverna con
un socio AI). REGOLE NON NEGOZIABILI:
- USA SOLO i fatti del DOSSIER fornito. Se un fatto non c'e', non lo inventi.
- Voce: prima persona, diretta, concreta, zero motivazionale. Italiano.
- MAI: "recuperato/gratis/seconda mano" per i componenti (di' "comprato su canale usato"
  se serve), MAI prezzi dei singoli pezzi, MAI codici interni (EP_SG, S1, RAG, chunk...)
  nel testo per il pubblico — parole piane.
- Max 10 slide. Slide 1 = COPERTINA: titolo-gancio max 2 righe corte (e' un poster).
- Ogni slide: kicker (etichetta MAIUSCOLA breve), lead (titolo, HTML con al piu'
  <span class="accent|cyan|pink"> e <br>), intro (2-3 frasi, puo' usare
  <span class="soft|g|cyan">), opzionali seal (frase-sigillo breve) e cta (solo ultima).
- scene: scegli SOLO da questa lista: {scenes}
- Ultima slide: open loop + cta verso il prossimo episodio.
Rispondi SOLO con JSON valido:
{{"caption": "caption IG con hashtag", "slides": [{{"kicker": "...", "lead": "...",
"intro": "...", "seal": "", "cta": "", "scene": "..."}}]}}"""


def draft_with_claude(item: dict, dossier: str, scenes: list[str]) -> dict:
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"], max_retries=3)
    user = (f"EPISODIO DA SCRIVERE: {item['title']}\n"
            f"ANGOLO: {item.get('angolo','')}\n"
            f"CAPITOLO: {item.get('cap','')}\n\n"
            f"DOSSIER (fatti veri dal sistema, con fonti):\n{dossier}")
    msg = client.messages.create(model=MODEL, max_tokens=4000,
                                 system=SYSTEM.format(scenes=", ".join(scenes)),
                                 messages=[{"role": "user", "content": user}])
    txt = msg.content[0].text.strip()
    m = re.search(r"\{.*\}", txt, re.S)
    return json.loads(m.group(0))


def main() -> int:
    # ── lock single-instance ────────────────────────────────────────────────
    if LOCK.exists() and (time.time() - LOCK.stat().st_mtime) < 3600:
        log("lock presente (<1h): un'altra istanza gira — esco pulito")
        return 0
    LOCK.write_text(str(os.getpid()), encoding="utf-8")
    try:
        return run()
    finally:
        LOCK.unlink(missing_ok=True)


def run() -> int:
    log(f"START night_caroselli (modello {MODEL})")
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log("ANTHROPIC_API_KEY assente — esco (exit 2)")
        return 2

    # 1 · QUEUE
    if not QUEUE.exists():
        log("coda assente — niente da fare (exit 0)")
        return 0
    queue = json.loads(QUEUE.read_text(encoding="utf-8"))
    item = next((i for i in queue.get("items", [])
                 if i.get("status") == "pending" and not i.get("insieme")), None)
    if item is None:
        log("coda vuota (nessun pending) — esco")
        return 0
    log(f"item: {item['id']} — {item['title']}")

    # 2 · GROUND (una sola accensione del motore RAG, query in serie)
    import rag_engine
    dossier_parts = []
    for q in item.get("queries", [item["title"]])[:3]:
        if _timeout():
            _save_report(item, "timeout", ["timeout in grounding"])
            return 3
        try:
            dossier_parts.append(f"### {q}\n" + rag_engine.search_and_format(q, top_k=5))
        except Exception as e:  # noqa: BLE001
            log(f"RAG errore su '{q}': {e}")
    dossier = "\n\n".join(dossier_parts)
    if len(dossier) < MIN_DOSSIER:
        item["status"] = "grounding_debole"
        QUEUE.write_text(json.dumps(queue, ensure_ascii=False, indent=2), encoding="utf-8")
        _save_report(item, "grounding_debole",
                     [f"dossier {len(dossier)} char < {MIN_DOSSIER}: servono fonti in MENTE"])
        return 0  # non e' un errore: e' il sistema che NON inventa

    # 3 · DRAFT
    from sg_builder import SCENES, build
    import canon_guard
    if _timeout():
        _save_report(item, "timeout", ["timeout pre-draft"])
        return 3
    try:
        data = draft_with_claude(item, dossier, list(SCENES.keys()))
    except Exception as e:  # noqa: BLE001
        _save_report(item, "errore", [f"draft fallito: {e}"])
        return 1
    slides = data.get("slides", [])[:10]
    issues: list[str] = []
    for s in slides:
        if s.get("scene") not in SCENES:
            issues.append(f"scena '{s.get('scene')}' fuori libreria -> tolta")
            s["scene"] = ""
        for k in ("lead", "intro", "seal", "cta", "kicker"):
            if s.get(k):
                s[k] = canon_guard.clean(s[k])
        hits = canon_guard.scan(" ".join(str(s.get(k, "")) for k in ("lead", "intro", "seal")))
        if hits:
            issues.append(f"canon_guard: {hits[0][:90]}")

    # 4 · BUILD (in quarantena)
    folder = BOZZE / item["id"]
    folder.mkdir(parents=True, exist_ok=True)
    meta = {"title": f"Il Sistema · {item['id']} — {item['title']}",
            "toplabel": item.get("toplabel", "TITANIUM OS · IL SISTEMA"),
            "serie": item["id"]}
    for s in slides:
        s["social"] = True
    build(folder, meta, slides)
    (folder / "caption.txt").write_text(data.get("caption", ""), encoding="utf-8")
    (folder / "README.md").write_text(
        f"# BOZZA · {item['id']} — {item['title']}\n\n*Generata dall'apprendista notturno "
        f"{datetime.now():%d/%m/%Y %H:%M} — NON promossa. Dossier RAG: {len(dossier)} char.*\n\n"
        f"Promozione (solo di giorno): sposta la cartella in CAROSELLI/{item['id']}/, "
        f"spunta il piano, rigenera la griglia.\n", encoding="utf-8")

    # 5 · RENDER (stesse funzioni del runner batch)
    import render_queue as rq
    if _timeout():
        _save_report(item, "timeout", issues + ["timeout pre-render"], str(folder))
        return 3
    outs = rq._render_html(folder / "carosello.html", folder / "slides", as_jpeg=False)
    rq._sheet(outs, folder / "_sheet.png")
    igdir = folder / "slides_ig"
    igdir.mkdir(exist_ok=True)
    from PIL import Image
    for png in outs:
        img = Image.open(png).convert("RGB")
        jpg = igdir / (png.stem + ".jpg")
        q = 92
        img.save(jpg, quality=q)
        while jpg.stat().st_size > rq.MAX_JPEG_BYTES and q > 40:
            q -= 10
            img.save(jpg, quality=q)

    # 6 · QC (checks eseguibili di caroselli_qc sul risultato)
    import caroselli_qc as qc
    html = folder / "carosello.html"
    n = qc._check_html(html, qc.MAX_COMPLETO, issues, item["id"], "bozza")
    qc._check_cover(html, issues, item["id"])
    if len(outs) != n:
        issues.append(f"render: {len(outs)} png su {n} slide")

    status = "verde" if not issues else "falle"
    item["status"] = "bozza_" + status
    item["bozza"] = str(folder.relative_to(BASE))
    QUEUE.write_text(json.dumps(queue, ensure_ascii=False, indent=2), encoding="utf-8")
    _save_report(item, status, issues, str(folder))
    log(f"END ok — bozza {item['id']} ({n} slide, QC {status})")
    return 0


if __name__ == "__main__":
    try:
        rc = main()
    except Exception as e:  # noqa: BLE001
        log(f"CRASH: {e!r}")
        rc = 1
    log(f"EXIT {rc}")
    sys.exit(rc)
