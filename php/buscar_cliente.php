<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger cadena del buscador (puede ser parcial)
$customer_name = $_POST['customer_name']; // En JS usa datos.append("customer_name", cadenaBuscada);

// Consulta LIKE para coincidencias parciales (sin sanitizar, sólo para pruebas)
$sql = "SELECT c.*, m.currency_name AS currency_name 
        FROM customers c 
        JOIN currency m ON c.currency_id_FK = m.currency_id 
        WHERE c.customer_name LIKE '%$customer_name%'";

$resultado = mysqli_query($conexion, $sql);

// Recoger todos los resultados (pueden ser varios)
$clientes = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $clientes[] = $fila;
}

if (count($clientes) > 0) { // Hay clientes encontrados
    responder($clientes, true, "Clientes recuperados", $conexion);
} else { // Ningún cliente
    responder(null, false, "No existe ningún cliente con ese nombre", $conexion);
}
?>
