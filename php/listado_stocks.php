<?php
include_once("config.php");
$conexion = obtenerConexion();

$sql = "SELECT s.*, w.wallet_name, st.stock_type_name
        FROM stocks s
        INNER JOIN wallet w ON s.wallet_id_FK = w.id_wallet
        INNER JOIN stock_type st ON s.stock_type_id_FK = st.stock_type_id";

$result = mysqli_query($conexion, $sql);
if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error $numerror: $descrerror", $conexion);
} else {
    $datos = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        $datos[] = $fila;
    }
    responder($datos, true, "Listado de todos los stocks", $conexion);
}
?>