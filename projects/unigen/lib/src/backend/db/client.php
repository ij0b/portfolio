<?php
// 🔌 [СЛОЙ ДАННЫХ] Единый источник правды для работы с СУБД MySQL
function getDbConnection() {
    $host = 'db';
    $db   = 'unigen_db';
    $user = 'root';
    $pass = 'root_password_123';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
         return new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
         // Для ИИ-агентов отдаем структурированный JSON-ошибку
         header('Content-Type: application/json', true, 500);
         echo json_encode(["status" => "error", "message" => "DB_CONNECTION_FAILED", "details" => $e->getMessage()]);
         exit;
    }
}