# research_agent.py | TITANIUM_OS / NODES / RESEARCH_AGENT | v1.1 | 2026-05-29
# Trova paper, tesi, libri tecnici dal web e li ingesta in MENTE/ → RAG

import os
import re
import sys
import time
import json
import hashlib
import logging
import argparse
import requests
from pathlib import Path
from datetime import datetime
from urllib.parse import quote_plus, urljoin

# Fix encoding Windows cp1252
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("research_agent")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [research_agent] %(levelname)s %(message)s")
    logger = logging.getLogger("research_agent")

MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
OUT_DIR = MENTE / "KNOWLEDGE" / "RESEARCH"
OUT_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

# ── SORGENTI ──────────────────────────────────────────────────────────────────

def search_arxiv(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su arXiv (papers tecnici/scientifici)."""
    url = (
        f"https://export.arxiv.org/api/query?"
        f"search_query=all:{quote_plus(query)}"
        f"&start=0&max_results={max_results}"
        f"&sortBy=relevance&sortOrder=descending"
    )
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        # Parse Atom XML manualmente
        entries = re.findall(r'<entry>(.*?)</entry>', r.text, re.DOTALL)
        results = []
        for e in entries:
            title   = re.search(r'<title>(.*?)</title>', e, re.DOTALL)
            summary = re.search(r'<summary>(.*?)</summary>', e, re.DOTALL)
            link    = re.search(r'<id>(.*?)</id>', e, re.DOTALL)
            authors = re.findall(r'<name>(.*?)</name>', e)
            if title and summary and link:
                results.append({
                    "source": "arxiv",
                    "title":   title.group(1).strip(),
                    "abstract": summary.group(1).strip(),
                    "url":     link.group(1).strip(),
                    "authors": ", ".join(authors[:3]),
                })
        return results
    except Exception as ex:
        logger.warning("[arxiv] %s", ex)
        return []


def search_semantic_scholar(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su Semantic Scholar (API gratuita)."""
    url = "https://api.semanticscholar.org/graph/v1/paper/search"
    params = {
        "query": query,
        "limit": max_results,
        "fields": "title,abstract,authors,year,url,externalIds",
    }
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=15)
        r.raise_for_status()
        data = r.json().get("data", [])
        results = []
        for p in data:
            abstract = p.get("abstract") or ""
            if len(abstract) < 50:
                continue
            doi = p.get("externalIds", {}).get("DOI", "")
            results.append({
                "source": "semantic_scholar",
                "title":   p.get("title", ""),
                "abstract": abstract,
                "url":     p.get("url", f"https://doi.org/{doi}" if doi else ""),
                "authors": ", ".join(a.get("name","") for a in p.get("authors", [])[:3]),
                "year":    p.get("year", ""),
            })
        return results
    except Exception as ex:
        logger.warning("[semantic_scholar] %s", ex)
        return []


def search_openlibrary(query: str, max_results: int = 5) -> list[dict]:
    """Cerca libri su Open Library."""
    url = f"https://openlibrary.org/search.json?q={quote_plus(query)}&limit={max_results}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        docs = r.json().get("docs", [])
        results = []
        for d in docs:
            title = d.get("title", "")
            authors = d.get("author_name", [])
            year = d.get("first_publish_year", "")
            olid = d.get("key", "")
            results.append({
                "source": "openlibrary",
                "title":   title,
                "abstract": f"Libro tecnico · Anno: {year} · Autori: {', '.join(authors[:2])}",
                "url":     f"https://openlibrary.org{olid}" if olid else "",
                "authors": ", ".join(authors[:2]),
                "year":    year,
            })
        return results
    except Exception as ex:
        logger.warning("[openlibrary] %s", ex)
        return []


def search_core_ac(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su CORE.ac.uk — 250M+ paper open access gratuiti."""
    url = "https://api.core.ac.uk/v3/search/works"
    params = {"q": query, "limit": max_results}
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=15)
        r.raise_for_status()
        results = []
        for item in r.json().get("results", []):
            abstract = item.get("abstract") or ""
            if len(abstract) < 30:
                continue
            results.append({
                "source": "core_ac",
                "title":   item.get("title", ""),
                "abstract": abstract[:800],
                "url":     item.get("downloadUrl", item.get("sourceFulltextUrls", [""])[0] if item.get("sourceFulltextUrls") else ""),
                "authors": ", ".join((item.get("authors") or [])[:3]),
                "year":   item.get("yearPublished", ""),
            })
        return results
    except Exception as ex:
        logger.warning("[core_ac] %s", ex)
        return []


def search_openalex(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su OpenAlex — 250M+ paper accademici (ex Microsoft Academic)."""
    url = "https://api.openalex.org/works"
    params = {
        "search": query,
        "per-page": max_results,
        "select": "id,title,abstract_inverted_index,authorships,publication_year,primary_location",
        "mailto": "benenatimatteo.mb@gmail.com",
    }
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=15)
        r.raise_for_status()
        results = []
        for item in r.json().get("results", []):
            # OpenAlex usa abstract_inverted_index — ricostruisci testo
            inv = item.get("abstract_inverted_index") or {}
            words = {v: k for k, positions in inv.items() for v in positions}
            abstract = " ".join(words[i] for i in sorted(words)) if words else ""
            if len(abstract) < 30:
                continue
            location = item.get("primary_location") or {}
            source_url = location.get("landing_page_url", "")
            authors = [a["author"]["display_name"] for a in (item.get("authorships") or [])[:3]]
            results.append({
                "source": "openalex",
                "title":   item.get("title", ""),
                "abstract": abstract[:800],
                "url":     source_url,
                "authors": ", ".join(authors),
                "year":    item.get("publication_year", ""),
            })
        return results
    except Exception as ex:
        logger.warning("[openalex] %s", ex)
        return []


def search_theses_fr(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su theses.fr — tesi universitarie francesi (spesso in inglese)."""
    url = f"https://www.theses.fr/?q={quote_plus(query)}&format=json&rows={max_results}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        results = []
        for item in r.json().get("response", {}).get("docs", []):
            title = item.get("titrePrincipal") or item.get("titreAutreLangue", "")
            abstract = item.get("resumes", {}).get("fr", "") or item.get("resumes", {}).get("en", "")
            if not abstract:
                abstract = f"Tesi di dottorato · {item.get('etabSoutenance_s','')} · {item.get('anneeSoutenance','')}"
            results.append({
                "source": "theses_fr",
                "title":   title,
                "abstract": abstract[:800],
                "url":     f"https://theses.fr/{item.get('id','')}",
                "authors": item.get("auteur_s", ""),
                "year":    item.get("anneeSoutenance", ""),
            })
        return results
    except Exception as ex:
        logger.warning("[theses_fr] %s", ex)
        return []


def search_dart_europe(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su DART-Europe — 1.3M tesi universitarie europee."""
    url = f"https://www.dart-europe.org/basic-search.php?query={quote_plus(query)}&format=json&rows={max_results}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        # DART-Europe non ha API JSON pulita — usa semplice HTML parse
        # Fallback: restituisce info ricerca
        return [{
            "source": "dart_europe",
            "title": f"Cerca manualmente su DART-Europe: {query}",
            "abstract": f"DART-Europe raccoglie 1.3M tesi EU. URL ricerca diretto:",
            "url": f"https://www.dart-europe.org/basic-search.php?query={quote_plus(query)}",
            "authors": "",
            "year": "",
        }]
    except Exception as ex:
        logger.warning("[dart_europe] %s", ex)
        return []


def search_baidu_scholar(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su Baidu Scholar — enorme database paper cinesi (molti in inglese)."""
    # Baidu Scholar non ha API pubblica — usiamo il loro endpoint di ricerca
    url = f"https://xueshu.baidu.com/s?wd={quote_plus(query)}&tn=SE_baiduxueshu_c1gjeupa&ie=utf-8"
    headers_cn = {**HEADERS, "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"}
    try:
        r = requests.get(url, headers=headers_cn, timeout=15)
        # Parse HTML risultati
        titles   = re.findall(r'<a[^>]+class="[^"]*title[^"]*"[^>]*>(.*?)</a>', r.text, re.DOTALL)
        abstracts = re.findall(r'class="[^"]*abstract[^"]*"[^>]*>(.*?)</div>', r.text, re.DOTALL)
        results = []
        for i, title in enumerate(titles[:max_results]):
            t = re.sub(r'<[^>]+>', '', title).strip()
            a = re.sub(r'<[^>]+>', '', abstracts[i]).strip() if i < len(abstracts) else ""
            if t:
                results.append({
                    "source": "baidu_scholar",
                    "title": t,
                    "abstract": a[:600] if a else f"Paper da Baidu Scholar — ricerca: {query}",
                    "url": f"https://xueshu.baidu.com/s?wd={quote_plus(t)}",
                    "authors": "",
                    "year": "",
                })
        if not results:
            # Fallback URL manuale
            results = [{
                "source": "baidu_scholar",
                "title": f"Ricerca Baidu Scholar: {query}",
                "abstract": "Baidu Scholar — 400M+ paper, forte su manifattura, CNC, ingegneria materiali cinese.",
                "url": url,
                "authors": "",
                "year": "",
            }]
        return results
    except Exception as ex:
        logger.warning("[baidu_scholar] %s", ex)
        return []


def search_cnki_free(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su CNKI (中国知网) — il più grande database accademico cinese."""
    # CNKI ha accesso limitato senza abbonamento. Usiamo il portale gratuito.
    url = f"https://kns.cnki.net/kns8s/defaultresult/index?kw={quote_plus(query)}&korder=&dbcode=CJFD"
    try:
        # CNKI richiede JS render — restituiamo link diretto per ricerca manuale
        return [{
            "source": "cnki",
            "title": f"CNKI — 中国知网 — ricerca: {query}",
            "abstract": (
                "CNKI è il maggiore database accademico cinese (60M+ paper). "
                "Forte su: manifattura CNC, materiali compositi, saldatura, automazione. "
                "Molti paper hanno abstract in inglese. Accesso gratuito limitato via OpenAthens nelle università."
            ),
            "url": url,
            "authors": "",
            "year": "",
        }]
    except Exception as ex:
        logger.warning("[cnki] %s", ex)
        return []


def search_github_repos(query: str, max_results: int = 5) -> list[dict]:
    """Cerca repository GitHub rilevanti — ottimo per CNC, RAG, automazione."""
    url = "https://api.github.com/search/repositories"
    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": max_results,
    }
    try:
        r = requests.get(url, params=params, headers={**HEADERS, "Accept": "application/vnd.github+json"}, timeout=15)
        r.raise_for_status()
        results = []
        for repo in r.json().get("items", []):
            results.append({
                "source": "github",
                "title": f"{repo['full_name']} [{repo.get('stargazers_count',0)} stars]",
                "abstract": repo.get("description", "") or f"Repository GitHub: {repo['full_name']}",
                "url": repo["html_url"],
                "authors": repo.get("owner", {}).get("login", ""),
                "year": repo.get("pushed_at", "")[:4],
            })
        return results
    except Exception as ex:
        logger.warning("[github] %s", ex)
        return []


def search_base(query: str, max_results: int = 5) -> list[dict]:
    """BASE (Bielefeld Academic Search Engine) — 300M+ doc, include repo italiani."""
    url = "https://api.base-search.net/cgi-bin/BaseHttpSearchInterface.fcgi"
    params = {
        "func": "PerformSearch",
        "query": query,
        "hits": max_results,
        "offset": 0,
        "format": "json",
    }
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=15)
        r.raise_for_status()
        docs = r.json().get("response", {}).get("docs", [])
        results = []
        for d in docs:
            title    = d.get("dctitle", [""])[0] if isinstance(d.get("dctitle"), list) else d.get("dctitle", "")
            abstract = d.get("dcdescription", [""])[0] if isinstance(d.get("dcdescription"), list) else d.get("dcdescription", "")
            link     = d.get("dclink", [""])[0] if isinstance(d.get("dclink"), list) else d.get("dclink", "")
            authors  = d.get("dccreator", [])
            year     = str(d.get("dcyear", ""))
            if not title or len(abstract) < 20:
                continue
            results.append({
                "source": "base",
                "title":   title,
                "abstract": str(abstract)[:800],
                "url":     link,
                "authors": ", ".join(authors[:3]) if isinstance(authors, list) else str(authors),
                "year":    year,
            })
        return results
    except Exception as ex:
        logger.warning("[base] %s", ex)
        return []


def search_politesi(query: str, max_results: int = 5) -> list[dict]:
    """POLITesi — tesi magistrali e dottorali Politecnico di Milano via OAI-PMH."""
    url = "https://www.politesi.polimi.it/oai/request"
    params = {
        "verb": "ListRecords",
        "metadataPrefix": "oai_dc",
    }
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=20)
        r.raise_for_status()
        records = re.findall(r'<record>(.*?)</record>', r.text, re.DOTALL)
        query_words = set(query.lower().split())
        results = []
        for rec in records:
            title_m    = re.search(r'<dc:title>(.*?)</dc:title>', rec, re.DOTALL)
            desc_m     = re.search(r'<dc:description>(.*?)</dc:description>', rec, re.DOTALL)
            creator_m  = re.findall(r'<dc:creator>(.*?)</dc:creator>', rec, re.DOTALL)
            id_m       = re.search(r'<dc:identifier>(https?://[^<]+)</dc:identifier>', rec)
            date_m     = re.search(r'<dc:date>(\d{4})', rec)
            if not title_m:
                continue
            title    = re.sub(r'<[^>]+>', '', title_m.group(1)).strip()
            abstract = re.sub(r'<[^>]+>', '', desc_m.group(1)).strip() if desc_m else ""
            # Filtra per query match
            text_lower = (title + " " + abstract).lower()
            if not any(w in text_lower for w in query_words):
                continue
            results.append({
                "source": "politesi",
                "title":   title,
                "abstract": abstract[:800] if abstract else f"Tesi Politecnico Milano: {title}",
                "url":     id_m.group(1) if id_m else "https://www.politesi.polimi.it",
                "authors": ", ".join(creator_m[:2]),
                "year":    date_m.group(1) if date_m else "",
            })
            if len(results) >= max_results:
                break
        if not results:
            return [{
                "source": "politesi",
                "title": f"POLITesi — ricerca: {query}",
                "abstract": "Repository tesi Politecnico Milano (magistrali e dottorali). Forte su: meccanica, meccatronica, manifattura, automazione, ingegneria dei materiali.",
                "url": f"https://www.politesi.polimi.it/handle/10589/1?mode=simple&query={quote_plus(query)}",
                "authors": "",
                "year": "",
            }]
        return results
    except Exception as ex:
        logger.warning("[politesi] %s", ex)
        return []


def enrich_with_unpaywall(results: list[dict], email: str = "benenatimatteo.mb@gmail.com") -> list[dict]:
    """Arricchisce risultati con PDF gratuiti via Unpaywall (per DOI trovati)."""
    enriched = 0
    for r in results:
        doi = None
        url = r.get("url", "")
        if "doi.org/" in url:
            doi = url.split("doi.org/")[-1].strip()
        if not doi:
            continue
        try:
            resp = requests.get(
                f"https://api.unpaywall.org/v2/{doi}?email={email}",
                headers=HEADERS, timeout=8
            )
            if resp.status_code == 200:
                data = resp.json()
                best = data.get("best_oa_location")
                if best and best.get("url_for_pdf"):
                    r["pdf_url"] = best["url_for_pdf"]
                    r["abstract"] += f"\n\n**PDF gratuito:** {best['url_for_pdf']}"
                    enriched += 1
        except Exception:
            continue
    if enriched:
        logger.info("[unpaywall] %d PDF gratuiti trovati", enriched)
    return results


def search_doaj(query: str, max_results: int = 5) -> list[dict]:
    """Cerca su DOAJ (Directory of Open Access Journals)."""
    url = f"https://doaj.org/api/search/articles/{quote_plus(query)}?pageSize={max_results}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        results_raw = r.json().get("results", [])
        results = []
        for item in results_raw:
            bibjson = item.get("bibjson", {})
            abstract = bibjson.get("abstract", "")
            if len(abstract) < 30:
                continue
            links = bibjson.get("link", [])
            url_item = links[0].get("url", "") if links else ""
            results.append({
                "source": "doaj",
                "title":  bibjson.get("title", ""),
                "abstract": abstract,
                "url":    url_item,
                "authors": ", ".join(a.get("name","") for a in bibjson.get("author",[])[:2]),
                "year":   bibjson.get("year", ""),
            })
        return results
    except Exception as ex:
        print(f"  [doaj] Errore: {ex}")
        return []


# ── INGESTIONE ────────────────────────────────────────────────────────────────

def slug(text: str) -> str:
    s = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[\s-]+', '_', s)[:60]


def relevance_score(result: dict, query: str) -> float:
    """Frazione di keyword (>3 char) della query presenti in titolo+abstract.
    Gate anti garbage-in: openalex/semantic_scholar a volte restituiscono paper
    larghi (es. '6G networks', 'service robots 2018') che non c'entrano con la
    query. Sotto soglia -> scartati prima di toccare il disco."""
    kws = {w for w in re.findall(r"[a-zA-Zàèéìòù]+", query.lower()) if len(w) > 3}
    if not kws:
        return 1.0
    hay = (result.get("title", "") + " " + result.get("abstract", "")).lower()
    return sum(1 for w in kws if w in hay) / len(kws)


def save_result(result: dict, query: str, domain: str) -> Path:
    """Salva un risultato come markdown in MENTE/KNOWLEDGE/RESEARCH/."""
    subdir = OUT_DIR / slug(domain) if domain else OUT_DIR
    subdir.mkdir(parents=True, exist_ok=True)

    fname = f"{slug(result['title'])}.md"
    fpath = subdir / fname

    content = f"""---
source: {result['source']}
query: "{query}"
domain: "{domain}"
title: "{result['title']}"
authors: "{result.get('authors','')}"
year: "{result.get('year','')}"
url: "{result.get('url','')}"
date_ingested: "{datetime.now().strftime('%Y-%m-%d')}"
---

# {result['title']}

**Fonte:** {result['source']} | **Anno:** {result.get('year','')} | **Autori:** {result.get('authors','')}

## Abstract / Descrizione

{result.get('abstract','')}

## Link

{result.get('url','')}
"""
    fpath.write_text(content, encoding="utf-8")
    return fpath


def run_rag_rebuild():
    py = Path.home() / "tools" / "python311" / "python.exe"
    rag = Path(__file__).parents[2] / "NODES" / "MENTE_RAG" / "rag_engine.py"
    if py.exists() and rag.exists():
        import subprocess
        subprocess.Popen([str(py), str(rag), "--rebuild"])
        logger.info("[RAG] rebuild avviato in background")


# ── MAIN ──────────────────────────────────────────────────────────────────────

SOURCES = {
    "arxiv":            search_arxiv,
    "semantic_scholar": search_semantic_scholar,
    "openalex":         search_openalex,
    "core_ac":          search_core_ac,
    "theses_fr":        search_theses_fr,
    "dart_europe":      search_dart_europe,
    "openlibrary":      search_openlibrary,
    "doaj":             search_doaj,
    "baidu_scholar":    search_baidu_scholar,
    "cnki":             search_cnki_free,
    "github":           search_github_repos,
    "base":             search_base,
    "politesi":         search_politesi,
}

DEFAULT_SOURCES = ["openalex", "semantic_scholar", "arxiv"]

SOURCE_DESCRIPTIONS = {
    "arxiv":            "Paper preprint tecnici/scientifici (fisica, ingegneria, CS)",
    "semantic_scholar": "250M paper accademici cross-domain con abstract",
    "openalex":         "250M paper open access (ex Microsoft Academic)",
    "core_ac":          "200M paper full-text open access",
    "theses_fr":        "Tesi dottorali universitarie francesi/europee",
    "dart_europe":      "1.3M tesi universitarie europee",
    "openlibrary":      "Libri tecnici open access (Internet Archive)",
    "doaj":             "Articoli peer-reviewed open access",
    "baidu_scholar":    "400M+ paper cinesi — forte su CNC, manifattura, materiali",
    "cnki":             "60M paper CNKI cinesi — il più grande DB accademico cinese",
    "github":           "Repository GitHub — CNC, RAG, automazione, codice open source",
    "base":             "300M+ documenti accademici incl. repository italiani (Bielefeld)",
    "politesi":         "Tesi magistrali e dottorali Politecnico di Milano (OAI-PMH)",
}

# Preset di ricerca per dominio
DOMAIN_PRESETS = {
    "V32":        ["openalex", "arxiv", "semantic_scholar", "baidu_scholar", "base"],
    "acquaponica": ["openalex", "semantic_scholar", "theses_fr", "baidu_scholar", "base"],
    "CNC":        ["openalex", "arxiv", "baidu_scholar", "cnki", "github", "politesi"],
    "PLC":        ["semantic_scholar", "openalex", "baidu_scholar", "github"],
    "AI":         ["arxiv", "semantic_scholar", "openalex", "github"],
    "elettrica":  ["openalex", "semantic_scholar", "theses_fr", "base"],
    "gomma":      ["openalex", "semantic_scholar", "baidu_scholar", "cnki"],
    "ITA":        ["politesi", "base", "dart_europe", "theses_fr", "doaj"],
    "brevetti":   ["base", "openalex", "semantic_scholar"],
    "MIMS":       ["openalex", "arxiv", "baidu_scholar", "politesi", "base"],
}


def main():
    parser = argparse.ArgumentParser(description="TITANIUM_OS Research Agent — trova paper/libri → MENTE")
    parser.add_argument("query",         help="Query di ricerca (es: 'epoxy granite CNC damping')")
    parser.add_argument("--domain",  "-d", default="", help="Sottodominio MENTE (es: V32, acquaponica, PLC)")
    parser.add_argument("--sources", "-s", default=",".join(DEFAULT_SOURCES),
                        help=f"Sorgenti separate da virgola: {', '.join(SOURCES.keys())}")
    parser.add_argument("--max",     "-n", type=int, default=5, help="Risultati per sorgente (default 5)")
    parser.add_argument("--rag",          action="store_true", help="Esegui rag-rebuild dopo ingestione")
    parser.add_argument("--dry-run",      action="store_true", help="Mostra risultati senza salvare")
    parser.add_argument("--enrich",       action="store_true", help="Arricchisci con PDF gratuiti via Unpaywall")
    parser.add_argument("--preset",  "-p", default="", help=f"Usa preset sorgenti per dominio: {', '.join(DOMAIN_PRESETS.keys())}")
    parser.add_argument("--min-rel", type=float, default=0.34,
                        help="Soglia rilevanza: frazione minima di keyword query nel risultato (default 0.34, 0=off)")
    args = parser.parse_args()

    # Preset dominio ha precedenza su --sources se specificato
    if args.preset and args.preset in DOMAIN_PRESETS:
        selected = DOMAIN_PRESETS[args.preset]
        if not args.domain:
            args.domain = args.preset
    else:
        selected = [s.strip() for s in args.sources.split(",") if s.strip() in SOURCES]
    if not selected:
        logger.error("Sorgenti non valide. Disponibili: %s", ", ".join(SOURCES.keys()))
        sys.exit(1)

    logger.info("query: '%s' | dominio: '%s' | sorgenti: %s | max %d",
                args.query, args.domain or "generale", ", ".join(selected), args.max)

    all_results = []
    for src in selected:
        logger.info("Ricerca su %s...", src)
        results = SOURCES[src](args.query, args.max)
        logger.info("%s -> %d risultati", src, len(results))
        all_results.extend(results)
        time.sleep(1)

    if not all_results:
        logger.warning("Nessun risultato trovato.")
        return

    seen = set()
    unique = []
    for r in all_results:
        k = r["title"].lower()[:80]
        if k not in seen:
            seen.add(k)
            unique.append(r)

    # Gate di rilevanza (anti garbage-in): scarta i risultati poco pertinenti.
    if args.min_rel > 0:
        before = len(unique)
        unique = [r for r in unique if relevance_score(r, args.query) >= args.min_rel]
        if before - len(unique):
            logger.info("gate rilevanza: %d/%d scartati (soglia %.2f)",
                        before - len(unique), before, args.min_rel)
        if not unique:
            logger.warning("Nessun risultato sopra la soglia di rilevanza (%.2f).", args.min_rel)
            return

    logger.info("%d risultati unici trovati:", len(unique))
    for i, r in enumerate(unique, 1):
        line = f"[{i:02d}] [{r['source']}] {r['title'][:80]}"
        if r.get("authors"):
            line += f" — {r['authors']} {r.get('year','')}"
        logger.info(line)

    if args.dry_run:
        logger.info("[dry-run] Nessun file salvato.")
        return

    saved = []
    for r in unique:
        path = save_result(r, args.query, args.domain)
        saved.append(path)
        logger.info("salvato: %s", path.name)

    logger.info("%d documenti salvati in %s", len(saved), OUT_DIR)

    if args.enrich:
        unique = enrich_with_unpaywall(unique)

    if args.rag:
        run_rag_rebuild()


if __name__ == "__main__":
    main()
