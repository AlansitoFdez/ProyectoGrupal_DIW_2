

<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$id_wallet = $_POST['id_wallet'];

// SQL
$sqlStocks = "DELETE FROM stocks WHERE wallet_id_FK = $id_wallet;";
$resultadoStocks = mysqli_query($conexion, $sqlStocks);

$sql = "DELETE FROM wallet WHERE id_wallet = $id_wallet;";
$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);