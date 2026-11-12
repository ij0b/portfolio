/**
 * ============================================================================
 * 🖼️ UI-КОМПОНЕНТ: МНОГОУРОВНЕВЫЙ ИИ-ПУЛЬТ УПРАВЛЕНИЯ UNIGEN (Structure1)
 * ============================================================================
 */

export default function App() {
    // Хранилище контекстной памяти диалога на стороне клиента (максимум 100 промптов)
    let chatHistory = [];

    const promptLibrary = {
        tests: {
            title: "⚙️ МИНИМАЛЬНЫЙ РАБОЧИЙ MVP СТЕКОВ",
            tabLabel: "⚙️ MVP стеков",
            sub: {
                frontend: {
                    title: "🖥️ Слой UI & Клиента",
                    items: {
                        html_css: "Напиши MVP разметку HTML5 с центрированной Flexbox картой товара и CSS градиентным фоном.",
                        js_core: "Напиши функцию на чистом JS (ES6), которая принимает массив объектов и группирует их по полю категории.",
                        react_core: "Сгенерируй изолированный React компонент счетчика (useState) со стильными кнопками плюс и минус."
                    }
                },
                backend: {
                    title: "🧠 Серверный слой & Данные",
                    items: {
                        php_core: "Напиши строго типизированную функцию на PHP 8.3 для фильтрации и очистки входящего массива строк.",
                        db_mysql: "Сгенерируй SQL запрос создания таблицы пользователей с автоинкрементом, уникальным email и индексом.",
                        node_core: "Создай minimal эндпоинт на Express.js, возвращающий текущее системное время в JSON."
                    }
                },
                infrastructure: {
                    title: "📦 ИИ, Python & Инфраструктура",
                    items: {
                        python_ai: "Напиши легковесный скрипт на Python, отправляющий POST запрос с JSON payload через библиотеку requests.",
                        devops_docker: "Напиши минимальный Dockerfile для изоляции Node.js приложения на базе alpine образа.",
                        auto_flow: "Сгенерируй скрипт на Node.js для рекурсивного обхода и вывода всех файлов в папке проекта."
                    }
                }
            }
        },
        web: {
            title: "🌐 ФУЛСТАК-РАЗРАБОТКА (PHP 8.3 + React)",
            tabLabel: "🌐 Фулстак-Разработка",
            sub: {
                ui: {
                    title: "🖱️ Компоненты UI (React)",
                    items: {
                        crud: "Сгенерируй полноценную CRUD-форму на React с валидацией полей, обработкой ошибок ввода и отправкой через fetch(). Поясни архитектурные trade-offs как топ-специалист.",
                        stats: "Напиши изолированный код компонента StatisticsPage на React. Используй только нативный JS/CSS без внешних библиотек. Сгенерируй прогресс-бары, анимированные галочки чек-листов (SVG/CSS) и встроенную функцию расчета процентов успешности тестов.",
                        toggleButton: "Сгенерируй изолированный HTML/CSS/JS код современной кнопки. Добавь стильные CSS-эффекты при наведении и JS-скрипт, который при клике интерактивно переключает (тогглит) текст внутри кнопки с 'Активно' на 'Выключено'."
                    }
                },
                backend: {
                    title: "🧠 Серверная логика (PHP 8.3)",
                    items: {
                        controller: "Напиши REST API контроллер на PHP 8.3 для сущности каталога. Используй строгую типизацию параметров, защищенные методы и возврат заголовков JSON.",
                        gateway: "Реализуй класс-шлюз безопасности на PHP 8.3: проверка авторизационных токенов Bearer и защита от перегрузки запросов (Rate-Limiting)."
                    }
                },
                data: {
                    title: "🔌 Слой данных (MySQL)",
                    items: {
                        migration: "Создай SQL-миграцию таблиц с JOIN и внешними ключами (FOREIGN KEY). Оптимизируй индексы под тяжелую выборку."
                    }
                }
            }
        },
        devops: {
            title: "🤖 АВТОМАТИЗАЦИЯ (Скрипты и Рутины)",
            tabLabel: "🤖 Автоматизация",
            sub: {
                docker: {
                    title: "🐳 Оркестрация (Docker/Nginx)",
                    items: {
                        optimize: "Оптимизируй Dockerfile бэкенда: примени паттерн многоэтапной сборки (Multi-stage build) для уменьшения веса Alpine образа. Поясни преимущества.",
                        nginx: "Настрой правила проксирования путей API и заголовки CORS для локальной раздачи статики внутри конфигурационного файла nginx.conf."
                    }
                },
                scripts: {
                    title: "🛠️ Скрипты и Рутины (Node.js/CMD)",
                    items: {
                        watcher: "Напиши автоматический watcher скрипт на Node.js, который следит за папкой src/ и инициирует сборку при изменении файлов.",
                        etl: "Сгенерируй легковесный скрипт для парсинга и импорта данных из файлов CSV/Excel напрямую в реляционные таблицы СУБД."
                    }
                }
            }
        },
        qa_testing: {
            title: "🧪 СИСТЕМНОЕ ТЕСТИРОВАНИЕ КОДА",
            tabLabel: "🧪 Тестирование",
            sub: {
                api_tests: {
                    title: "🔗 Шлюзы и Интеграция API",
                    items: {
                        fetch_test: "Напиши юнит-тест на Jest для проверки fetch-запросов к API: эмулируй успешный ответ (mock 200 OK) и обработку сетевого сбоя (500 Error).",
                        php_api_test: "Сгенерируй легковесный тестовый скрипт на PHP для отправки cURL запросов к роутеру и валидации JSON структуры ответа."
                    }
                },
                logic_tests: {
                    title: "🧩 Бизнес-Логика и Валидаторы",
                    items: {
                        validator_test: "Напиши сквозной тест функции валидации форм на чистом JS: проверь граничные значения, пустые строки, некорректный email и спецсимволы.",
                        db_mock_test: "Создай тест-скрипт на Node.js, который имитирует транзакцию в MySQL, проверяет корректность rollback при ошибке и выводит статус в консоль."
                    }
                }
            }
        },
        validation: {
            title: "🛡️ ВАЛИДАЦИЯ (Аудит, Безопасность и Оптимизация)",
            tabLabel: "🛡️ Валидация",
            sub: {
                audit: {
                    title: "📊 Анализ и Аудит",
                    items: {
                        security: "Проверить код на уязвимости (OWASP Top 10, SQL-инъекции). Предложи патчи безопасности.",
                        race: "Поиск логических ошибок, гонок данных (Race Conditions) и утечек памяти в асинхронных потоках."
                    }
                },
                docs: {
                    title: "📖 Самоучитель и Документация",
                    items: {
                        explain: "Сгенерируй README-документацию по текущему модулю. Поясни логику кода, как будто ты обучаешь стажёра («Поясни как топ-специалист»)."
                    }
                }
            }
        }
    };

    const handlePromptSelect = (promptText) => {
        const input = document.getElementById("promptInput");
        if (input) input.value = promptText;
    };

    const handleClearTerminal = () => {
        const terminal = document.getElementById("terminalOutput");
        if (terminal) {
            terminal.innerHTML = "📟 [ИНФО] Универсальный пульт Structure1 успешно очищен и готов к работе...";
        }
    };

    // 📋 Функция сброса контекста без удаления логов, выводящая сервисное уведомление
    window.resetContext = () => {
        chatHistory = []; // Полностью очищаем массив памяти на клиенте
        const terminal = document.getElementById("terminalOutput");
        if (terminal) {
            terminal.innerHTML += "⏳ [ОБРАБОТКА] Текущий контекст диалога удален из оперативной памяти ИИ...\n";
            terminal.scrollTop = terminal.scrollHeight;
        }
    };

    window.switchTab = (tabId) => {
        document.querySelectorAll('.unigen-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.unigen-tab-content').forEach(content => content.classList.remove('active'));
        
        const targetBtn = document.getElementById('tab-btn-' + tabId);
        const targetContent = document.getElementById('tab-content-' + tabId);
        
        if (targetBtn && targetContent) {
            targetBtn.classList.add('active');
            targetContent.classList.add('active');
        }
    };

    const handleSendPrompt = async () => {
        const input = document.getElementById("promptInput");
        const btn = document.getElementById("sendBtn");
        const terminal = document.getElementById("terminalOutput");

        if (!input || !input.value.trim()) return;

        if (btn) btn.disabled = true;
        
        const currentPrompt = input.value;
        // 🛡️ [PROMPT ESCAPER] Безопасно экранируем текст запроса пользователя перед выводом в чат консоли
        const escapedPrompt = currentPrompt
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        terminal.innerHTML += `
            <div class="terminalOutput__prompt">
                <div class="terminalOutput__h1"></div>
                <div class="terminalOutput__prompt-txt">${escapedPrompt}</div>
                <div class="terminalOutput__h2"><div class="terminalOutput__h2-txt">Ответ ИИ:</div></div>
            </div>⏳ [ОБРАБОТКА] Запрос отправлен ИИ и обробатывается...\n
        `;
        terminal.scrollTop = terminal.scrollHeight;

        // Вшиваем текущий промпт пользователя в массив истории перед отправкой
        chatHistory.push({"role": "user", "content": currentPrompt});
        try {
            const response = await fetch("/api/trigger-action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    prompt: currentPrompt,
                    messages: chatHistory
                })
            });
            const res = await response.json();
            
            if (res.status === "success" || res.ai_response) {
                let textResponse = res.ai_response || res.response || "⚠️ ИИ(LLM) вернул пустой ответ. Проверьте логи Ollama.";
                
                // Фиксируем ответ модели в историю для поддержания непрерывного контекста
                chatHistory.push({"role": "assistant", "content": textResponse});

                textResponse = textResponse
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                terminal.innerHTML += `\n🤖 [OLLAMA ${res.model || "Локальный инференс"}]:\n${textResponse}\n`;
            } else {
                terminal.innerHTML += `\n❌ [ОШИБКА ЯДРА]: ${res.message || JSON.stringify(res)}\n`;
            }
        } catch (e) {
            terminal.innerHTML += `\n❌ [СЕТЕВОЙ СБОЙ]: ${e.message}\n💡 [ПОДСКАЗКА] Работает резервный Node.js сервер. КодStructure1 успешно имитирует трассировку.\n`;
        } finally {
            if (btn) btn.disabled = false;
            terminal.scrollTop = terminal.scrollHeight;
        }
    };

    const container = document.createElement("div");
    container.className = "unigen-panel-container";

    let tabsHeaderHtml = `<div class="unigen-tabs">`;
    let tabsContentHtml = `<div class="unigen-tabs-container">`;
    
    let isFirst = true;
    for (let tabKey in promptLibrary) {
        const cat = promptLibrary[tabKey];
        const activeClass = isFirst ? "active" : "";
        
        tabsHeaderHtml += `<button id="tab-btn-${tabKey}" onclick="window.switchTab('${tabKey}')" class="unigen-tab-btn ${activeClass}">${cat.tabLabel}</button>`;
        
        tabsContentHtml += `<div id="tab-content-${tabKey}" class="unigen-tab-content ${activeClass}">`;
        
        for (let subKey in cat.sub) {
            const sub = cat.sub[subKey];
            tabsContentHtml += `<div class="unigen-card">
                <b class="unigen-card__title">${cat.title}</b>
                <span class="unigen-card__subtitle">${sub.title}</span>`;
            for (let itemKey in sub.items) {
                const text = sub.items[itemKey];
                
                let btnLabel = itemKey;
                if (itemKey === 'html_css') btnLabel = '🎨 Разметка HTML5+CSS';
                if (itemKey === 'js_core') btnLabel = '🗨 Код на JS Core';
                if (itemKey === 'react_core') btnLabel = '⚛️ Компонент React';
                if (itemKey === 'php_core') btnLabel = '🐘 Скрипт PHP 8.3';
                if (itemKey === 'db_mysql') btnLabel = '📊 Таблицы MySQL';
                if (itemKey === 'node_core') btnLabel = '🟢 Express API';
                if (itemKey === 'python_ai') btnLabel = '🐍 Python Requests';
                if (itemKey === 'devops_docker') btnLabel = '🐳 Контейнер Docker';
                if (itemKey === 'auto_flow') btnLabel = '🛠️ Node.js Обходчик';
                
                if (itemKey === 'fetch_test') btnLabel = ' Шлюзы fetch()';
                if (itemKey === 'php_api_test') btnLabel = '🐘 Тест cURL PHP';
                if (itemKey === 'validator_test') btnLabel = '🗨 Тест Валидации';
                if (itemKey === 'db_mock_test') btnLabel = '📊 Тест Тразнакций';
                
                if (itemKey === 'crud') btnLabel = '🗂️ CRUD-формы React';
                if (itemKey === 'stats') btnLabel = '📊 Интерактивная статистика';
                if (itemKey === 'toggleButton') btnLabel = '🖱️ Интерактивная кнопка';
                if (itemKey === 'controller') btnLabel = '🧠 REST API PHP 8.3';
                if (itemKey === 'gateway') btnLabel = '🔐 Шлюз безопасности';
                if (itemKey === 'migration') btnLabel = '🔌 SQL Миграция';
                if (itemKey === 'optimize') btnLabel = '🐳 Оптимизация Docker';
                if (itemKey === 'nginx') btnLabel = '⚙️ Config Nginx';
                if (itemKey === 'watcher') btnLabel = '🛠️ Node.js Watcher';
                if (itemKey === 'etl') btnLabel = '🗀 ETL парсер CSV';
                if (itemKey === 'security') btnLabel = '🔍 Аудит OWASP10';
                if (itemKey === 'race') btnLabel = '⚡ Гонки данных (Race)';
                if (itemKey === 'explain') btnLabel = '📖 Поясни как ТОП';

                tabsContentHtml += `<button onclick="window.selectPrompt('${text.replace(/'/g, "\\'")}')" class="unigen-prompt-link">• ${btnLabel}</button>`;
            }
            tabsContentHtml += `</div>`;
        }
        tabsContentHtml += `</div>`;
        isFirst = false;
    }
    tabsHeaderHtml += `</div>`;
    tabsContentHtml += `</div>`;

    container.innerHTML = `
        <h2>🏗️ Инструмент для программирования</h2>
        <p class="unigen-panel-subtitle">Мультистековый комплекс инструментов: Фронтенд + Бэкенд + Automation + ИИ + Вайб-кодинг</p>
        
        <h4 class="unigen-panel-section-title">🗂️ Меню промтов (prompts):</h4>
        ${tabsHeaderHtml}
        ${tabsContentHtml}

        <div class="unigen-input-zone">
            <textarea id="promptInput" class="unigen-textarea" placeholder="Выберите готовый запрос из "Меню промтов (prompts)" или сформулируйте новый и нажмите кнопку "Отправить запрос"..."></textarea>
            
            <div class="unigen-actions-row">
                <button id="sendBtn" onclick="window.sendPrompt()" class="unigen-btn unigen-btn--success">▶ Отправить запрос</button>
                
                <div class="unigen-btn-group">
                    <button onclick="window.clearTerminal()" class="unigen-btn unigen-btn--secondary">🗑️ Очистить консоль</button>
                    <button onclick="window.resetContext()" class="unigen-btn unigen-btn--secondary">❌ Удалить контекст</button>
                </div>
            </div>
        </div>

        <div class="unigen-output-zone">
            <h4 class="unigen-panel-section-title">📟 Диалог с ИИ:</h4>
            <pre id="terminalOutput" class="terminalOutput">📟 [ИНФО] Успех! Всё готово для начала работы...</pre>
        </div>
    `;

    window.selectPrompt = handlePromptSelect;
    window.sendPrompt = handleSendPrompt;
    window.clearTerminal = handleClearTerminal;
    return container;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root');
        if (root) {
            root.innerHTML = "";
            root.appendChild(App());
        }
    });
}
