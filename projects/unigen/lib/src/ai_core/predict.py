import sys
import json
import requests

if sys.platform == "win32":
    import io
    sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8')
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def main():
    try:
        input_data = sys.stdin.read()
        payload = json.loads(input_data)
        
        # 🧠 [STATEFUL INJECTION] Принимаем готовую цепочку истории или формируем новую
        history_messages = payload.get("messages", [])
        user_prompt = payload.get("prompt", "")
        
        ollama_url = "http://localhost:11434/api/chat"
        
        # Строим контекст: системные правила + накопленная история
        ollama_messages = [
            {
                "role": "system", 
                "content": "You are a professional web fullstack automation expert. ALWAYS respond strictly in Russian language. When asked for code, generate production-ready code with clean architecture and explanations in Russian."
            }
        ]
        
        # Если фронтенд прислал историю, склеиваем её (ограничиваем последними 100 сообщениями во избежание деградации CPU)
        if history_messages:
            ollama_messages.extend(history_messages[-100:])
        elif user_prompt:
            ollama_messages.append({"role": "user", "content": user_prompt})
            
        # 🧠 [DYNAMIC CONTRACT] Считываем модель от бэкенда, экранируя системную переменную
        target_model = payload.get("model", "qwen2.5-coder:7b")

        ollama_payload = {
            "model": target_model,
            "messages": ollama_messages,
            "stream": False
        }
        
        response = requests.post(ollama_url, json=ollama_payload, timeout=300)
        
        if response.status_code == 500:
            print(json.dumps({"status": "error", "message": "OLLAMA_SERVER_500_ERROR"}))
            return

        result = response.json()
        ai_text = result.get("message", {}).get("content", "")
        if not ai_text:
            ai_text = result.get("response", "")
            
        print(json.dumps({
            "status": "success",
            "ai_response": ai_text,
            "model": target_model
        }, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": str(e)
        }, ensure_ascii=False))

if __name__ == "__main__":
    main()
