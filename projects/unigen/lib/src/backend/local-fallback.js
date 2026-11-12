import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import child_process from 'child_process';

const server = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, '../../../'));

server.use(express.json());
server.use(express.static(path.join(projectRoot, 'public')));
server.use('/lib', express.static(path.join(projectRoot, 'lib')));

server.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'public', 'index.html'));
});

server.post('/api/trigger-action', (req, res) => {
    const timestamp = new Date().toLocaleTimeString();
    const userPrompt = req.body.prompt || "";
    
    console.log('\n============ 🔬 [СКВОЗНОЙ ТРЕЙСИНГ АРХИТЕКТУРЫ] ' + timestamp + ' ============');
    console.log('  [ШАГ 1: КЛИЕНТ]   -> Браузер успешно вызвал fetch() к API эндпоинту.');
    console.log('  [ШАГ 2: ШЛЮЗ]     -> Запрос перехвачен резервным Node.js прокси-сервером.');
    console.log('  [ШАГ 3: МАРШРУТ]  -> Роутер перенаправил промпт в локальное ядро Python...');

    const scriptPath = path.join(projectRoot, 'lib/src/ai_core/predict.py');
    const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
    
    try {
        const pythonProcess = child_process.spawn(pyCmd, [scriptPath]);
        
        let responseData = "";
        let errorData = "";

        // Пробрасываем всю структуру данных (включая накопленный массив сообщений) в stdin Python
        pythonProcess.stdin.write(JSON.stringify({ 
            prompt: userPrompt,
            messages: req.body.messages || [],
            // Исправлено: экранирование гарантирует проброс жесткой модели после опросника
            model: "qwen2.5-coder:7b"
        }));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => { responseData += data.toString(); });
        pythonProcess.stderr.on('data', (data) => { errorData += data.toString(); });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('  [ШАГ 4: AI_CORE]  -> Локальный Python успешно отработал синтаксический пайп.');
                console.log('  [ШАГ 5: ОТВЕТ]    -> Результат генерации отправлен обратно в React UI.');
                console.log('========================================================================\n');
                
                try {
                    const parsedResult = JSON.parse(responseData.trim());
                    
                    // Гарантируем контракт полей: если Python вернул сырой ответ Ollama, маппим его в ai_response
                    if (parsedResult.response && !parsedResult.ai_response) {
                        parsedResult.ai_response = parsedResult.response;
                    }
                    if (parsedResult.status === undefined) {
                        parsedResult.status = "success";
                    }
                    if (!parsedResult.model) {
                        parsedResult.model = "qwen2.5-coder:7b";
                    }
                    res.json(parsedResult);
                } catch(e) {
                    res.json({ status: "success", model: "qwen2.5-coder:7b", ai_response: responseData });
                }
            } else {
                throw new Error(errorData || "Python process exited with code " + code);
            }
        });

    } catch (err) {
        console.log('  ⚠️  [КРИТИЧЕСКИЙ СБОЙ ЯДРА] -> Ошибка инференса: ' + err.message);
        console.log('========================================================================\n');
        
        res.json({
            status: "error",
            model: "qwen2.5-coder:7b",
            ai_response: "⚠️ ИИ(LLM) вернул пустой ответ. Убедитесь, что oll.bat запущен на CPU/RAM и модель скачана через 'ollama pull qwen2.5-coder:7b'."
        });
    }
});

server.listen(3000, () => {
    console.log("▶ Запустить ИИ-Конвейер: http://localhost:3000");
    console.log("💡 [ПОДСКАЗКА] Вы можете полноценно вайб-кодить UI. Для включения PHP и MySQL установите Docker Desktop.\u000A");
});
