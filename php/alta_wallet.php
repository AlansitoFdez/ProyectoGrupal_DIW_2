<?php
include_once("config.php");
$conexion = obtenerConexion();

date_default_timezone_set('Europe/Madrid');
$date = new DateTime();

// Recoger datos
$wallet = json_decode($_POST['wallet']);
$fecha_formato = $date->format('Y-m-d');

$sql = "INSERT INTO wallet (id_wallet, money_amount, wallet_name, wallet_active, creation_date, description, wallet_type_id_FK, customers_id_FK) 
        VALUES(null, $wallet->money_amount, '$wallet->wallet_name', $wallet->wallet_active, '$fecha_formato', '$wallet->description', $wallet->wallet_type_id_FK, $wallet->customers_id_FK); ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    responder(null, false, "Se ha dado de alta la wallet", $conexion);
}
?>