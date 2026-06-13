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

:: RIFLUSSO: i FATTI degli episodi (generati da story_agent alle 02:07) tornano in
:: MENTE/<dominio>/ — la conoscenza INTERNA del progetto entra nel RAG. Chiude il loop
:: (regola 7). Va PRIMA del rag-update, cosi episodi + paper si indicizzano in un colpo.
echo [night_research] riflusso FATTI episodi -> MENTE >> "%LOG%"
"%PYTHON%" CONTENT_ENGINE\scripts\fatti_reflux.py >> "%LOG%" 2>&1

:: WIKI: rigenera HOME.md + indici di dominio (vault Obsidian sempre aggiornato).
"%PYTHON%" CONTENT_ENGINE\scripts\genera_wiki_index.py >> "%LOG%" 2>&1

:: RAG update incrementale: indicizza paper ESTERNI (ricerca) + FATTI INTERNI (riflusso)
"%PYTHON%" NODES\MENTE_RAG\rag_engine.py --incremental >> "%LOG%" 2>&1

:: VERSIONA IL SAPERE: committa l'evoluzione di MENTE nel suo git locale (regola 1).
:: Cosi i fatti vecchi non spariscono quando il riflusso li riscrive: restano nello storico.
call "%~dp0mente_version.bat" >> "%LOG%" 2>&1

echo [night_research] done %DATE% %TIME% >> "%LOG%"
