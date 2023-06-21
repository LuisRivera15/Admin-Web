<?php
require_once 'conexion.php';

$productId = $_GET['id'];

$sql = "SELECT * FROM Categories WHERE CatalgueId :id ";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $productId);
$stmt->execute();

$producto = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($producto);
?>