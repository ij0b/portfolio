<?php
// 🧠 [БИЗНЕС-ЛОГИКА] Главный роутер серверных правил и ИИ-шлюз (PHP 8.3 REST Router)
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$requestUri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Универсальный ИИ-эндпоинт взаимодействия с Ollama через Python AI-пайп
if (strpos($requestUri, '/api/trigger-action') !== false && $method === 'POST') {
    try {
        // 1. Читаем входящий промпт от фронтенда на React
        $rawInput = file_get_contents('php://input');
        
        // 2. Настраиваем дескрипторы для открытия двустороннего системного пайпа с Python
        $descriptorspec = [
            0 => ["pipe", "r"], # stdin: PHP пишет данные в поток Python
            1 => ["pipe", "w"], # stdout: PHP читает ответ из потока Python
            2 => ["pipe", "w"]  # stderr: поток системных ошибок
        ];
        
        // Определяем кроссплатформенный путь к исполняемому файлу Python внутри .venv
        $pythonPath = (strpos(php_uname('s'), 'Windows') !== false) ? '..\\..\\..\\.venv\\Scripts\\python.exe' : '..\\..\\..\\.venv\\bin\\python';
        $scriptPath = __DIR__ . '/../../ai_core/predict.py';
        
        // 3. Запускаем изолированный процесс Python-ядра
        $process = proc_open("$pythonPath $scriptPath", $descriptorspec, $pipes);
        
        if (is_resource($process)) {
            // Передаем JSON-нагрузку в стандартный ввод Python
            fwrite($pipes[0], $rawInput);
            fclose($pipes[0]);
            
            // Читаем детерминированный JSON-ответ от Python из потока stdout
            $aiResponseJSON = stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            proc_close($process);
            
            // Отправляем чистый агрегированный результат обратно в React UI
            echo $aiResponseJSON;
        } else {
            throw new Exception("FAILED_TO_OPEN_PYTHON_PIPE_BRIDGE");
        }
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

// Заглушка дефолтного маршрута онбординга
echo json_encode(["status" => "alive", "engine" => "PHP-FPM 8.3 + Python3 Bridge"]);
exit;