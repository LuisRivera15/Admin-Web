<?php
$hostname = "medicalsantacruz.com";
$username = "msc";
$password = "Medical@SantaCruz05";
$database = "MedStaCruz";

try {
    // Crear una nueva instancia de PDO
    $dsn = "mysql:host=$hostname;dbname=$database";
    $conn = new PDO($dsn, $username, $password);

    // Configurar el modo de error para que lance excepciones
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retornar la conexión
    return $conn;
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>