@echo off
:: night_research.bat | TITANIUM_OS | v2.0 | 2026-06-03
:: Research Agent notturno - cerca paper su topic V32/MIMS/Epoxy Granite
:: Eseguito da Task Scheduler ogni notte (ore diverse da StoryAgent)
:: v2.0: path portabili via _ti_paths.bat (no hardcode benen)

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\night_research.log"
echo [night_research] avvio %DATE% %TIME% >> "%LOG%"
echo [night_research] PYTHON=%PYTHON% >> "%LOG%"

if not defined PYTHON (
    echo [night_research] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

:: topic fissi - V32 e materiali (sintassi corretta argparse)
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "epoxy granite vibration damping CNC machine tool" --domain V32 --rag --max 5 >> "%LOG%" 2>&1
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "linear guide preload stiffness precision machining" --domain V32 --rag --max 5 >> "%LOG%" 2>&1
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "polymer composite injection molding tile manufacturing" --domain MIMS --rag --max 5 >> "%LOG%" 2>&1
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "AI agent LLM automation 2025" --domain GENESIS --rag --max 5 >> "%LOG%" 2>&1

:: RAG update incrementale dopo la ricerca
"%PYTHON%" NODES\MENTE_RAG\rag_engine.py --incremental >> "%LOG%" 2>&1

echo [night_research] done %DATE% %TIME% >> "%LOG%"
