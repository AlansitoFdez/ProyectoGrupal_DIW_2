<?php
require_once('config.php'); 

$conexion = obtenerConexion();

$wallet_name = $_GET['wallet_name'];

$sql = "SELECT id_wallet FROM wallet WHERE wallet_name = '$wallet_name';";

$resultado = mysqli_query($conexion, $sql);

if ($resultado) {
    if ($fila = mysqli_fetch_assoc($resultado)) {
        responder($fila['id_wallet'], true, 'ID wallet obtenido', $conexion);
    } else {
        responder(null, false, 'No se encontró ninguna wallet con ese nombre', $conexion);
    }

} else {
    responder(null, false, 'Error en la consulta: ' . mysqli_error($conexion), $conexion);
}

?>