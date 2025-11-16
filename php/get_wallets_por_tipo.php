<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$wallet_type_id = $_GET['wallet_type_id'];

// SQL
$sql = "SELECT w.*, wt.wallet_type_name AS wallet_type_name, c.customer_name AS customer_name FROM wallet AS w, wallet_type AS wt, customers c 
WHERE w.wallet_type_id_FK = wt.wallet_type_id
AND w.customers_id_FK = c.id_customers
AND wt.wallet_type_id = $wallet_type_id;";

$resultado = mysqli_query($conexion, $sql);

$datos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, true, "Datos recuperados", $conexion);