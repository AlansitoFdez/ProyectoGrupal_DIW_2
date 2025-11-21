<?php
// Devuelve el listado de clientes en formato JSON para JS
require_once("config.php");
$conn = obtenerConexion(); 

$sql = "SELECT c.*, cu.currency_name AS currency_name
        FROM customers c
        JOIN currency cu ON c.currency_id_FK = cu.currency_id
        ORDER BY c.id_customers";
        
$res = mysqli_query($conn, $sql);

$clientes = [];
while ($fila = mysqli_fetch_assoc($res)) {
    $clientes[] = $fila;
}

// RESPUESTA COMO JSON PARA AJAX
header("Content-Type: application/json");
echo json_encode([
    "ok"      => count($clientes) > 0,
    "datos"   => $clientes,
    "mensaje" => count($clientes) > 0 ? "Listado de clientes recuperado" : "No hay clientes en la base de datos"
]);
if ($conn) { $conn->close(); }
exit();
?>
