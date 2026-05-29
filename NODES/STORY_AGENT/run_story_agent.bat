@echo off
:: story_agent nightly | TITANIUM_OS | v1.0 | 2026-05-29
:: Eseguito da Windows Task Scheduler ogni notte — genera episodi da commit recenti

set TITANIUM_ROOT=C:\Users\benen\TITANIUM_OS\TITANIUM_OS
set PYTHON=C:\Users\benen\tools\python311\python.exe
set ENV_FILE=C:\Users\benen\TITANIUM_OS\_VAULT\KEYS\titanium_os.env

:: carica variabili d'ambiente dal vault
for /f "usebackq tokens=1,2 delims==" %%a in ("%ENV_FILE%") do (
    if not "%%a"=="" if not "%%b"=="" (
        set "%%a=%%b"
    )
)

cd /d "%TITANIUM_ROOT%"

:: genera max 10 gruppi tematici — poi commita
"%PYTHON%" NODES\STORY_AGENT\story_agent.py --max 10

:: se ci sono file nuovi, committa
git add CONTENT_ENGINE\DATABASE\episodes\S2_SISTEMA\
git add NODES\STORY_AGENT\story_state.json

git diff --cached --quiet
if errorlevel 1 (
    git commit -m "auto: story_agent — episodi generati %DATE%"
    echo [story_agent] commit fatto
) else (
    echo [story_agent] nessun episodio nuovo — skip commit
)
