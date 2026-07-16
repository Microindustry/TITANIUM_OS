@echo off
:: night_finetune.bat | TITANIUM_OS | v3.0 | 2026-07-13
:: Fine-tuning notturno Personal LLM con LLaMA-Factory + LoRA su GPU (GTX 1070, CUDA)
:: v2.0: path portabili via _ti_paths.bat (no hardcode benen) + GPU fp16 + guard llamafactory
:: v3.0: llamafactory VIVE NEL SUO VENV (%USERPROFILE%\.venvs\llamafactory, fuori dal
::       repo): il Python di sistema si libera dei pin gradio/pillow/starlette (23 CVE).
::       Il venv ha il SUO torch 2.6.0+cu124 (il vincolo NON-cpu vale anche qui).

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "CONFIG=%TI_ROOT%\CONTENT_ENGINE\DATABASE\training\train_config.yaml"
set "LOG=%TI_ROOT%\DATA\logs\finetune.log"
set "MODELS=%TI_ROOT%\MODELS"

if not exist "%MODELS%" mkdir "%MODELS%"

:: Python del venv dedicato (override possibile via env LF_PYTHON)
if not defined LF_PYTHON set "LF_PYTHON=%USERPROFILE%\.venvs\llamafactory\Scripts\python.exe"

:: Guard: venv+llamafactory presenti? Se no, logga e esci pulito (no crash criptico)
if not exist "%LF_PYTHON%" (
    echo [%date% %time%] SKIP: venv llamafactory assente - vedi bussola #57 13/07 ^(python -m venv %%USERPROFILE%%\.venvs\llamafactory + torch cu124 + llamafactory^) >> "%LOG%"
    exit /b 0
)
"%LF_PYTHON%" -c "import llamafactory" 2>nul
if errorlevel 1 (
    echo [%date% %time%] SKIP: llamafactory non installato nel venv - "%LF_PYTHON%" -m pip install llamafactory >> "%LOG%"
    exit /b 0
)

echo [%date% %time%] Fine-tuning avviato (GPU/fp16) >> "%LOG%"
echo Modello: TinyLlama-1.1B ^| Dataset: titanium_os ^| LoRA rank=8 >> "%LOG%"

:: Training su GPU (fp16 true). batch=2 ok su 8GB con TinyLlama-1.1B LoRA.
:: NB: "-m llamafactory.cli train" — "-m llamafactory.train" e' un package NON eseguibile
:: (falliva in silenzio da settimane segnando comunque LastTaskResult=0). Fix 14/06 + red-team #38.
"%LF_PYTHON%" -m llamafactory.cli train ^
    --stage sft ^
    --do_train true ^
    --model_name_or_path TinyLlama/TinyLlama-1.1B-Chat-v1.0 ^
    --dataset titanium_os ^
    --dataset_dir "%TI_ROOT%\CONTENT_ENGINE\DATABASE\training" ^
    --template default ^
    --finetuning_type lora ^
    --lora_rank 8 ^
    --lora_alpha 16 ^
    --output_dir "%MODELS%\titanium_llm_v1" ^
    --overwrite_output_dir true ^
    --num_train_epochs 3 ^
    --per_device_train_batch_size 2 ^
    --gradient_accumulation_steps 4 ^
    --learning_rate 0.0002 ^
    --save_steps 50 ^
    --logging_steps 10 ^
    --fp16 true ^
    --seed 42 >> "%LOG%" 2>&1

if errorlevel 1 (
    echo [%date% %time%] Fine-tuning FALLITO >> "%LOG%"
    exit /b 1
)

:: Verifica MISURABILE degli step reali (fix "finto-verde" attacco #2 #4): senza
:: --overwrite_output_dir il trainer riprendeva un checkpoint completo e usciva a
:: 0 step marcando COMPLETATO in 10-46 s. Ora si legge global_step da trainer_state.
"%LF_PYTHON%" -c "import json,os,sys; ts=os.path.join(r'%MODELS%\titanium_llm_v1','trainer_state.json'); s=(json.load(open(ts)).get('global_step',0) if os.path.exists(ts) else 0); print('global_step=%%d'%%s); sys.exit(0 if s>0 else 3)" >> "%LOG%" 2>&1
if errorlevel 1 (
    echo [%date% %time%] SOSPETTO: 0 step reali ^(finto-verde^) - il training non ha aggiornato l'adapter, controlla il log >> "%LOG%"
    exit /b 3
)
echo [%date% %time%] Fine-tuning COMPLETATO ^(step reali verificati^) - modello in %MODELS%\titanium_llm_v1 >> "%LOG%"
