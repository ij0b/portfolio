import { log } from '../lib/src/utils/helpers.js';

export const tasks = {
    dev: async () => {
        log('▶ Запуск режима разработки...');
    },
    build: async () => {
        log('🏗 Сборка проекта...');
    },
    deploy: async () => {
        log('📦 Деплой проекта...');
    }
};

export default async function runTask(taskName) {
    if (!tasks[taskName]) {
        throw new Error(`Задача "${taskName}" не найдена`);
    }
    log(`🎯 Запуск задачи "${taskName}"`);
    await tasks[taskName]();
    log(`✅ Задача "${taskName}" выполнена`);
}
