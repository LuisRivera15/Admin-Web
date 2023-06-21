<?php
require_once 'conexion.php';

$productId = $_GET['id'];

$sql = "SELECT p.ProductId, c.Name AS CategoryName, p.CatalogueId, p.Name, p.Stock, p.Price, p.Cost, p.DiscountPct, p.ImgPath
FROM Products p 
INNER JOIN Categories c ON p.CategoryId = c.CategoryId WHERE  ProductId = :id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $productId);
$stmt->execute();

$producto = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($producto);
?>