import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

function renderTemplate(content, vars) {
    if (typeof content !== 'string') return content;
    return content.replace(/\{\{(.+?)\}\}/g, (match, p1) => {
        const key = p1.trim();
        return vars[key] !== undefined ? vars[key] : match;
    });
}

function askQuestion(query) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
}

export async function createProject(options) {
    const { name, features } = options;
    const targetProjectDir = path.resolve(name);

    console.log('\n🏗️  [CLI ДВИЖОК] Сборка нового проекта: ' + name);
    
    // 🧠 [CLI КЛИНИНГ] Умный интерактивный разбор существующего продукта перед генерацией
    if (fs.existsSync(targetProjectDir)) {
        console.log('⚠️  [!] [ВНИМАНИЕ] Продукт "' + name + '" уже существует в директории: ' + targetProjectDir);
        const overwriteAns = await askQuestion('    ❓ [?] [ЗАПРОС] Полностью удалить старый продукт и перезаписать содержимое? (y/n) [по умолчанию: y]: ');
        
        // Паттерн Default Enter: если прожали просто Enter, переменная пустая — трактуем как согласие (y)
        if (overwriteAns.trim().toLowerCase() === 'n') {
            console.log('  ❌ [x] [ОТМЕНА]           Генерация продукта прервана пользователем.');
            process.exit(0);
        }
        
        console.log('  🗑️  [-] [ОЧИСТКА]          Атомарное удаление старого продукта: ' + name);
        try {
            if (process.platform === 'win32') {
                child_process.execSync('rmdir /s /q "' + targetProjectDir + '"', { stdio: 'ignore' });
            } else {
                child_process.execSync('rm -rf "' + targetProjectDir + '"', { stdio: 'ignore' });
            }
        } catch (err) {
            console.log('  ⚠️  [БЛОКИРОВКА ОС]       Не удалось очистить папку продукта. Убедитесь, что батники oll.bat/chat.bat закрыты.');
            process.exit(1);
        }
    }

    console.log('📦  [ОПЦИИ] Настройка состава модулей продукта...');
    const includeCss = await askQuestion('    ❓ Включать базовые CSS стили для React? (y/n) [по умолчанию: y]: ');
    const includeAuto = await askQuestion('    ❓ Включать DevOps скрипты автоматизации деплоя? (y/n) [по умолчанию: y]: ');

    const vars = {
        PORT: 3000,
        NODE_VERSION: '18',
        BACKEND_PORT: 3000
    };

    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const factoryRoot = path.resolve(path.join(currentDir, '../../../'));
    const defaultTemplateDir = path.join(factoryRoot, 'templates/default');

    const copyManifest = [
        { from: path.join(factoryRoot, '.npmrc'), to: '.npmrc', type: 'copy' },
        { from: path.join(factoryRoot, '.gitignore'), to: '.gitignore', type: 'copy' },
        { from: path.join(factoryRoot, 'public/index.html'), to: 'public/index.html', type: 'copy' },
        { from: path.join(factoryRoot, 'lib'), to: 'lib', type: 'dir' }, 
        { from: path.join(defaultTemplateDir, 'config.js'), to: 'config.js', type: 'copy' },
        
        // ⚡ [ИНЪЕКЦИЯ КОНТЕНТА] Прямой проброс глобального контекста без Stale Closure коллизий
        { path: 'dev-runner.js', content: `import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function main() {
    console.log('🔍 [ДИСПЕТЧЕР] Проверка доступности Docker-инфраструктуры...');
    
    let hasDocker = false;
    try {
        execSync('docker-compose --version', { stdio: 'ignore' });
        hasDocker = true;
    } catch (e) {
        // Если docker-compose отсутствует, управление перейдет в блок catch
    }

    if (hasDocker) {
        console.log('🐳 [DOCKER] Оркестратор обнаружен. Запуск контейнеров PHP + MySQL + Nginx...');
        spawn('docker-compose', ['up'], { stdio: 'inherit', shell: true });
    } else {
        console.log('⚠️  [ИНФО] Утилита docker-compose не найдена в системе.');
        console.log('🧱 [РЕЗЕРВ] Переключение конвейера на локальный Node.js сервер фронтенда...');
        
        const fallbackScript = path.join(__dirname, 'lib/src/backend/local-fallback.js');
        spawn('node', [fallbackScript], { stdio: 'inherit', shell: true });
    }
}

main();
`, type: 'write' },
        { path: 'lib/src/backend/local-fallback.js', content: `import express from 'express';
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
    
    console.log('\\n============ 🔬 [СКВОЗНОЙ ТРЕЙСИНГ АРХИТЕКТУРЫ] ' + timestamp + ' ============');
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
                console.log('========================================================================\\n');
                
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
        console.log('========================================================================\\n');
        
        res.json({
            status: "error",
            model: "qwen2.5-coder:7b",
            ai_response: "⚠️ ИИ(LLM) вернул пустой ответ. Убедитесь, что oll.bat запущен на CPU/RAM и модель скачана через 'ollama pull qwen2.5-coder:7b'."
        });
    }
});

server.listen(3000, () => {
    console.log("▶ Запустить ИИ-Конвейер: http://localhost:3000");
    console.log("💡 [ПОДСКАЗКА] Вы можете полноценно вайб-кодить UI. Для включения PHP и MySQL установите Docker Desktop.\\u000A");
});
`, type: 'write' },
        
        // 🧬 [СИНЕРГИЯ СТЕКОВ] Трансляция RAM-утилит ИИ
        ...(fs.existsSync(path.join(factoryRoot, 'oll.bat')) ? [
            { from: path.join(factoryRoot, 'oll.bat'), to: 'oll.bat', type: 'copy' },
            { from: path.join(factoryRoot, 'chat.bat'), to: 'chat.bat', type: 'copy' }
        ] : []),

        { path: 'package.json', content: JSON.stringify({
            name: name,
            version: '1.0.0',
            type: 'module',
            scripts: { 
                "dev": "node dev-runner.js"
            },
            dependencies: {
                "express": "^4.18.2"
            }
        }, null, 4), type: 'write' }
    ];

    if (fs.existsSync(path.join(defaultTemplateDir, 'nginx_config/default.conf'))) {
        copyManifest.push(
            { from: path.join(defaultTemplateDir, 'nginx_config/default.conf'), to: 'nginx_config/default.conf', type: 'copy' },
            { from: path.join(defaultTemplateDir, 'src/backend/index.php'), to: 'lib/src/backend/index.php', type: 'copy' },
            { from: path.join(defaultTemplateDir, 'src/backend/db/client.php'), to: 'lib/src/backend/db/client.php', type: 'copy' }
        );
    }

    if (fs.existsSync(path.join(factoryRoot, 'lib/src/ai_core/predict.py'))) {
        copyManifest.push(
            { from: path.join(factoryRoot, 'lib/src/ai_core/requirements.txt'), to: 'lib/src/ai_core/requirements.txt', type: 'copy' },
            { from: path.join(factoryRoot, 'lib/src/ai_core/predict.py'), to: 'lib/src/ai_core/predict.py', type: 'copy' }
        );
    }

    copyManifest.push(
        { from: path.join(factoryRoot, 'lib/src/frontend/components/App.js'), to: 'lib/src/frontend/components/App.js', type: 'copy' },
        { from: path.join(factoryRoot, 'lib/src/frontend/hooks'), to: 'lib/src/frontend/hooks', type: 'dir' },
        { from: path.join(factoryRoot, 'lib/src/frontend/utils'), to: 'lib/src/frontend/utils', type: 'dir' },
        { from: path.join(factoryRoot, 'lib/src/frontend/index.js'), to: 'lib/src/frontend/index.js', type: 'copy' },
        { from: path.join(factoryRoot, 'lib/src/utils'), to: 'lib/src/utils', type: 'dir' },
        { path: 'lib/src/index.js', content: "export * from './utils/index.js';\nexport * from './frontend/index.js';", type: 'write' }
    );

    if (includeCss.toLowerCase() !== 'n') {
        copyManifest.push({ path: 'public/style.css', content: 'body { margin: 0; background: #fafafa; font-family: sans-serif; }', type: 'write' });
    }

    if (includeAuto.toLowerCase() !== 'n') {
        copyManifest.push(
            { from: path.join(factoryRoot, 'lib/src/automation'), to: 'lib/src/automation', type: 'dir' },
            { from: path.join(factoryRoot, 'scripts'), to: 'scripts', type: 'dir' },
            { from: path.join(factoryRoot, 'Makefile'), to: 'Makefile', type: 'copy' }
        );
    }

    if (features.includes('docker')) {
        copyManifest.push(
            { from: path.join(defaultTemplateDir, 'docker/Dockerfile.backend.template'), to: 'docker/Dockerfile.backend', type: 'render' },
            { from: path.join(defaultTemplateDir, 'docker/Dockerfile.frontend.template'), to: 'docker/Dockerfile.frontend', type: 'render' },
            { from: path.join(defaultTemplateDir, 'docker-compose.yml.template'), to: 'docker-compose.yml', type: 'render' }
        );
    }

    copyManifest.forEach(task => {
        const destPath = path.join(targetProjectDir, task.to || task.path || '');
        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        if (task.type === 'copy') {
            fs.copyFileSync(task.from, destPath);
        } else if (task.type === 'dir') {
            const copyDir = (src, dest) => {
                fs.mkdirSync(dest, { recursive: true });
                fs.readdirSync(src).forEach(file => {
                    const srcFile = path.join(src, file);
                    const destFile = path.join(dest, file);
                    if (fs.statSync(srcFile).isDirectory()) {
                        if (file !== 'node_modules' && file !== '.git') copyDir(srcFile, destFile);
                    } else {
                        fs.copyFileSync(srcFile, destFile);
                    }
                });
            };
            copyDir(task.from, destPath);
        } else if (task.type === 'render') {
            const rawContent = fs.readFileSync(task.from, 'utf8');
            const renderedContent = renderTemplate(rawContent, vars);
            fs.writeFileSync(destPath, renderedContent, 'utf8');
        } else if (task.type === 'write') {
            fs.writeFileSync(destPath, task.content, 'utf8');
        }
    });

    const indexHtmlPath = path.join(targetProjectDir, 'public/index.html');
    if (fs.existsSync(indexHtmlPath)) {
        let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
        if (includeCss.toLowerCase() !== 'n') {
            htmlContent = htmlContent.replace('</head>', '    <link rel="stylesheet" href="/style.css">\
</head>');
            fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
            console.log('    🎨 [СТИЛИ] Стили CSS успешно интегрированы в разметку index.html');
        }
    }

    fs.writeFileSync(path.join(targetProjectDir, 'README.md'), '# ' + name + '\\n\\nПроект успешно развернут по мультистековому пресету PHP + React.\\n', 'utf8');
    console.log('  ✨ [CLI ДВИЖОК] Проект "' + name + '" успешно сформирован!');
}
