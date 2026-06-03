@echo off
:: _ti_paths.bat | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-06-03
:: Risolutore path PORTABILE - chiamato da tutti gli script notturni.
:: Niente piu' C:\Users\benen hardcoded: la root si deriva da %~dp0,
:: Python e gh si cercano nel PATH (con fallback), l'env file e' opzionale.
:: Imposta: TI_ROOT, PYTHON, GH, ENV_FILE

:: --- Root del repo = due livelli sopra AUTOMATIONS\core\ ---
for %%I in ("%~dp0..\..") do set "TI_ROOT=%%~fI"

:: --- Python: cerca nel PATH senza sub-shell, poi LocalAppData, poi tools (legacy) ---
:: NB: non usare for /f in ('where ...'): l'AutoRun di cmd stampa un banner che
:: verrebbe catturato al posto del path. La sintassi PATH-search del for e' sicura.
set "PYTHON="
for %%P in (python.exe) do set "PYTHON=%%~$PATH:P"
if not defined PYTHON if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" set "PYTHON=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
if not defined PYTHON if exist "%USERPROFILE%\tools\python311\python.exe" set "PYTHON=%USERPROFILE%\tools\python311\python.exe"

:: --- gh CLI: PATH -> Program Files ---
set "GH="
for %%G in (gh.exe) do set "GH=%%~$PATH:G"
if not defined GH if exist "%ProgramFiles%\GitHub CLI\gh.exe" set "GH=%ProgramFiles%\GitHub CLI\gh.exe"

:: --- Env file dal vault (opzionale: carica chiavi/segreti se presente) ---
set "ENV_FILE=%TI_ROOT%\_VAULT\KEYS\titanium_os.env"
if exist "%ENV_FILE%" (
    for /f "usebackq eol=# tokens=1,2 delims==" %%a in ("%ENV_FILE%") do (
        if not "%%a"=="" if not "%%b"=="" set "%%a=%%b"
    )
)

:: --- MENTE_DIR (usato da research_agent / RAG) ---
if not defined MENTE_DIR set "MENTE_DIR=%USERPROFILE%\MICROINDUSTRY\MENTE"
