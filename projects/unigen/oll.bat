@echo off
chcp 65001 > nul
set OLLAMA_VULKAN=false
set OLLAMA_KEEP_ALIVE=30m
echo ⚙️ [OLLAMA] Запуск сервера в режиме CPU / Оперативной памяти...
"C:\Users\User\AppData\Local\Programs\Ollama\ollama.exe" serve