@echo off
:: night_finetune.bat | TITANIUM_OS | v2.0 | 2026-06-03
:: Fine-tuning notturno Personal LLM con LLaMA-Factory + LoRA su GPU (GTX 1070, CUDA)
:: v2.0: path portabili via _ti_paths.bat (no hardcode benen) + GPU fp16 + guard llamafactory

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "CONFIG=%TI_ROOT%\CONTENT_ENGINE\DATABASE\training\train_config.yaml"
set "LOG=%TI_ROOT%\DATA\logs\finetune.log"
set "MODELS=%TI_ROOT%\MODELS"

if not exist "%MODELS%" mkdir "%MODELS%"

if not defined PYTHON (
    echo [%date% %time%] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

:: Guard: llamafactory installato? Se no, logga e esci pulito (no crash criptico)
"%PYTHON%" -c "import llamafactory" 2>nul
if errorlevel 1 (
    echo [%date% %time%] SKIP: llamafactory non installato - esegui: pip install llamafactory >> "%LOG%"
    exit /b 0
)

echo [%date% %time%] Fine-tuning avviato (GPU/fp16) >> "%LOG%"
echo Modello: TinyLlama-1.1B ^| Dataset: titanium_os ^| LoRA rank=8 >> "%LOG%"

:: Training su GPU (fp16 true). batch=2 ok su 8GB con TinyLlama-1.1B LoRA.
:: NB: "-m llamafactory.cli train" — "-m llamafactory.train" e' un package NON eseguibile
:: (falliva in silenzio da settimane segnando comunque LastTaskResult=0). Fix 14/06.
"%PYTHON%" -m llamafactory.cli train ^
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
) else (
    echo [%date% %time%] Fine-tuning COMPLETATO - modello in %MODELS%\titanium_llm_v1 >> "%LOG%"
)
