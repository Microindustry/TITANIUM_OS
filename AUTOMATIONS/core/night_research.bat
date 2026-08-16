@echo off
:: night_research.bat | TITANIUM_OS | v2.1 | 2026-06-11
:: Research Agent notturno - cerca paper su topic V32/MIMS/Epoxy Granite
:: Eseguito da Task Scheduler ogni notte (ore diverse da StoryAgent)
:: v2.0: path portabili via _ti_paths.bat (no hardcode benen)
:: v2.1: + riflusso FATTI episodi -> MENTE prima del rag-update (chiude il loop regola 7)

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\night_research.log"
echo [night_research] avvio %DATE% %TIME% >> "%LOG%"
echo [night_research] PYTHON=%PYTHON% >> "%LOG%"

if not defined PYTHON (
    echo [night_research] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

:: SELF-HEAL RAG a 2 LIVELLI (regola 11): questo task gira ELEVATO, quindi recovery
:: esclusivo senza UAC. rag_recover e' idempotente e copre ENTRAMBI i guasti:
::   - CORRUZIONE (query crasha, es. blackout): L1 sposta solo il segmento HNSW e
::     Chroma lo ricostruisce da sqlite (no ri-embed, secondi); L2 rebuild da corpus.
::   - DIVERGENZA (semantico!=bm25, incrementale interrotto): L2 riallinea.
:: Se il RAG e' gia' sano E allineato non fa nulla. (sostituisce rebuild_rag_clean, #42)
:: v2.2 (#53): il recovery logga su file SUO. Cintura oltre al fix in rag_recover.ps1:
:: se mai un figlio ereditasse di nuovo un handle di log, si locka rag_recover.log
:: (che powershell riapre a ogni run), NON questo log — e il bat continua comunque.
echo [night_research] self-heal RAG a 2 livelli (dettaglio in rag_recover.log) >> "%LOG%"
powershell -NoProfile -ExecutionPolicy Bypass -File "%TI_ROOT%\SERVICES\rag_recover.ps1" >> "%TI_ROOT%\DATA\logs\rag_recover.log" 2>&1
echo [night_research] self-heal concluso (errorlevel %ERRORLEVEL%) >> "%LOG%"

:: topic GUIDATI da STATE + RAG (night_topics.py scrive DATA\night_topics.txt)
"%PYTHON%" AUTOMATIONS\core\night_topics.py >> "%LOG%" 2>&1

set "TOPICS=%TI_ROOT%\DATA\night_topics.txt"
if exist "%TOPICS%" (
    :: un research per ogni riga "query|dominio" - letto da FILE (nessun sub-shell)
    for /f "usebackq tokens=1,2 delims=|" %%q in ("%TOPICS%") do (
        echo [night_research] topic: %%q [dominio %%r] >> "%LOG%"
        "%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "%%q" --domain %%r --rag --max 5 >> "%LOG%" 2>&1
    )
) else (
    echo [night_research] night_topics.txt assente - fallback topic fissi >> "%LOG%"
    "%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "epoxy granite vibration damping CNC machine tool" --domain V32 --rag --max 5 >> "%LOG%" 2>&1
    "%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "AI agent LLM automation 2025" --domain GENESIS --rag --max 5 >> "%LOG%" 2>&1
)

:: RAG NINA: il nodo "vede gli archiviati e continua a generarli" (canone sess.#44,
:: tutto automatico). Genera 1 episodio EP_N2 auto-promosso (canone + MENTE), che il
:: rag-update qui sotto indicizza nello stesso passaggio (niente processo GPU in piu').
echo [night_research] RAG Nina: genera dal prossimo seme archiviato >> "%LOG%"
"%PYTHON%" NODES\NINA_AGENT\nina_rag_loop.py --count 1 >> "%LOG%" 2>&1

:: COMMIT della corsia NINA (#70). run_story_agent.bat committa solo S2_SISTEMA: gli
:: episodi di Nina restavano untracked finche' non passava un umano (in #69 EP_N2_62/63/64
:: sono entrati nel repo solo col commit di chiusura a mano). Stesso schema del gemello:
:: pathspec ESPLICITO, cosi' non si mette in staging altro che i processi notturni toccano.
git add CONTENT_ENGINE\DATABASE\episodes\S_AVVENTURA\ DATA\nina_state.json
git diff --cached --quiet -- CONTENT_ENGINE\DATABASE\episodes\S_AVVENTURA\ DATA\nina_state.json
if errorlevel 1 (
    git commit -m "auto: nina_rag_loop - episodi Nina %DATE%" -- CONTENT_ENGINE\DATABASE\episodes\S_AVVENTURA\ DATA\nina_state.json >> "%LOG%" 2>&1
    echo [night_research] commit corsia Nina fatto >> "%LOG%"
) else (
    echo [night_research] nessun episodio Nina nuovo - skip commit >> "%LOG%"
)

:: RIFLUSSO: i FATTI degli episodi (generati da story_agent alle 02:07) tornano in
:: MENTE/<dominio>/ — la conoscenza INTERNA del progetto entra nel RAG. Chiude il loop
:: (regola 7). Va PRIMA del rag-update, cosi episodi + paper si indicizzano in un colpo.
echo [night_research] riflusso FATTI episodi -> MENTE >> "%LOG%"
"%PYTHON%" CONTENT_ENGINE\scripts\fatti_reflux.py >> "%LOG%" 2>&1

:: WIKI: rigenera HOME.md + indici di dominio (vault Obsidian sempre aggiornato).
"%PYTHON%" CONTENT_ENGINE\scripts\genera_wiki_index.py >> "%LOG%" 2>&1

:: RAG update incrementale: indicizza paper ESTERNI (ricerca) + FATTI INTERNI (riflusso)
"%PYTHON%" NODES\MENTE_RAG\rag_engine.py --incremental >> "%LOG%" 2>&1

:: SNAPSHOT known-good di chroma_db in _VAULT/BACKUPS (rotazione ultimi 3): indice
:: appena riallineato dall'incrementale -> restore istantaneo senza ri-embed in caso
:: di corruzione HNSW da blackout (cura accanto all'UPS, prima del power-loss).
"%PYTHON%" NODES\MENTE_RAG\rag_engine.py --snapshot >> "%LOG%" 2>&1

:: VERSIONA IL SAPERE: committa l'evoluzione di MENTE nel suo git locale (regola 1).
:: Cosi i fatti vecchi non spariscono quando il riflusso li riscrive: restano nello storico.
call "%~dp0mente_version.bat" >> "%LOG%" 2>&1

echo [night_research] done %DATE% %TIME% >> "%LOG%"
