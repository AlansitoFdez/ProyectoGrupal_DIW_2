<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$wallet_name = $_POST['wallet_name'];

// SQL
$sql = "SELECT w.*, c.customer_name AS customer_name, wt.wallet_type_name AS wallet_type_name FROM wallet w, customers c, wallet_type wt
WHERE w.customers_id_FK = c.id_customers
AND w.wallet_type_id_FK = wt.wallet_type_id
AND w.wallet_name LIKE '%$wallet_name%';";

$resultado = mysqli_query($conexion, $sql);

$datos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

if($resultado){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($datos, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe la wallet", $conexion);
}