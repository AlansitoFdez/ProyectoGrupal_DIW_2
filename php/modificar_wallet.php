<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$wallet = json_decode($_POST['wallet']);

$sql = "UPDATE wallet
        SET wallet_name = '" . $wallet->wallet_name . "', 
            description = '" .  $wallet->description . "', 
            wallet_type_id_FK = $wallet->wallet_type_id_FK 
        WHERE id_wallet = $wallet->id_wallet;";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    responder(null, false, "Se ha modificado la wallet", $conexion);
}
?>
