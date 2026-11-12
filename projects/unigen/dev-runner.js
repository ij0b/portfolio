import { execSync, spawn } from 'child_process';
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
