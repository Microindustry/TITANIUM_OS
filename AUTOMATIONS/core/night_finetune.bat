@echo off
:: night_finetune.bat | TITANIUM_OS | v1.0 | 2026-05-29
:: Fine-tuning notturno Personal LLM con LLaMA-Factory + LoRA su CPU

set PY=C:\Users\benen\tools\python311\python.exe
set TI=C:\Users\benen\TITANIUM_OS\TITANIUM_OS
set CONFIG=%TI%\CONTENT_ENGINE\DATABASE\training\train_config.yaml
set LOG=%TI%\DATA\logs\finetune.log
set MODELS=%TI%\MODELS

:: Carica env vars dal vault
for /f "tokens=1,2 delims==" %%a in (%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env) do (
    if not "%%a"=="" if not "%%b"=="" set "%%a=%%b"
)

cd /d "%TI%"

:: Crea cartella MODELS se non esiste
if not exist "%MODELS%" mkdir "%MODELS%"

echo [%date% %time%] Fine-tuning avviato >> "%LOG%"
echo Modello: TinyLlama-1.1B | Dataset: 180 ep | LoRA rank=8 >> "%LOG%"

:: Avvia training
%PY% -m llamafactory.train ^
    --stage sft ^
    --do_train true ^
    --model_name_or_path TinyLlama/TinyLlama-1.1B-Chat-v1.0 ^
    --dataset titanium_os ^
    --dataset_dir "%TI%\CONTENT_ENGINE\DATABASE\training" ^
    --template default ^
    --finetuning_type lora ^
    --lora_rank 8 ^
    --lora_alpha 16 ^
    --output_dir "%MODELS%\titanium_llm_v1" ^
    --num_train_epochs 3 ^
    --per_device_train_batch_size 1 ^
    --gradient_accumulation_steps 4 ^
    --learning_rate 0.0002 ^
    --save_steps 50 ^
    --logging_steps 10 ^
    --fp16 false ^
    --seed 42 >> "%LOG%" 2>&1

if errorlevel 1 (
    echo [%date% %time%] Fine-tuning FALLITO >> "%LOG%"
) else (
    echo [%date% %time%] Fine-tuning COMPLETATO — modello in %MODELS%\titanium_llm_v1 >> "%LOG%"
)
