@echo off
chcp 65001 > nul
set OLLAMA_OPTIONS=num_ctx=8192
echo 💬 [OLLAMA] Привязка контекста 8К к модели qwen2.5-coder:7b...
"C:\Users\User\AppData\Local\Programs\Ollama\ollama.exe" run qwen2.5-coder:7b
pause