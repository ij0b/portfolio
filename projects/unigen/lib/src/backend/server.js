import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { query } from "./db/client.js";
import { deploy } from "../automation/scripts/deploy.js";
import { log } from "../utils/helpers.js";

const app = express();
app.use(express.json());

const currentDir = path.dirname(fileURLToPath(import.meta.url));
// Поднимаемся из lib/src/backend в корень проекта unigen
const projectRoot = path.resolve(path.join(currentDir, "../../../"));

// 1. Раздача статики из public (для index.html)
app.use(express.static(path.join(projectRoot, "public")));

// 2. Раздача папки lib (чтобы браузер мог загрузить фронтенд-модули по прямым путям)
app.use("/lib", express.static(path.join(projectRoot, "lib")));

// Корневой маршрут на случай, если статика не подхватилась автоматически
app.get("/", (req, res) => {
    res.sendFile(path.join(projectRoot, "public", "index.html"));
});

// API-эндпоинт, связывающий всю цепочку: Frontend -> Backend -> DB -> Automation
app.post("/api/trigger-action", async (req, res) => {
    log("Получен запрос от фронтенда");
    try {
        await query("SELECT * FROM logs LIMIT 1");
        const status = await deploy();
        res.json({
            message: "Action triggered",
            automationStatus: status
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    log(`Server running on port ${PORT}`);
});
