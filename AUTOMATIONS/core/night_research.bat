@echo off
:: night_research.bat | TITANIUM_OS | v1.0 | 2026-05-29
:: Research Agent notturno — cerca paper su topic V32/MIMS/Epoxy Granite
:: Eseguito da Task Scheduler ogni notte (ore diverse da StoryAgent per non sovraccaricare)

set TITANIUM_ROOT=C:\Users\benen\TITANIUM_OS\TITANIUM_OS
set PYTHON=C:\Users\benen\tools\python311\python.exe
set ENV_FILE=C:\Users\benen\TITANIUM_OS\_VAULT\KEYS\titanium_os.env

for /f "usebackq tokens=1,2 delims==" %%a in ("%ENV_FILE%") do (
    if not "%%a"=="" if not "%%b"=="" set "%%a=%%b"
)

cd /d "%TITANIUM_ROOT%"

echo [night_research] avvio %DATE% %TIME%

:: topic fissi — V32 e materiali (sintassi corretta argparse)
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "epoxy granite vibration damping CNC machine tool" --domain V32 --rag --max 5
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "linear guide preload stiffness precision machining" --domain V32 --rag --max 5
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "polymer composite injection molding tile manufacturing" --domain MIMS --rag --max 5
"%PYTHON%" NODES\RESEARCH_AGENT\research_agent.py "AI agent LLM automation 2025" --domain GENESIS --rag --max 5

:: RAG update incrementale dopo la ricerca
"%PYTHON%" NODES\MENTE_RAG\rag_engine.py --incremental

echo [night_research] done
