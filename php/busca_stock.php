<?php
include_once("config.php");

$conexion = obtenerConexion();

$stock_name = $_GET['stock_name'];

// ¡ESCAPA el nombre de stock para evitar SQL injection!
$stock_name_escaped = mysqli_real_escape_string($conexion, $stock_name);

$sql = "SELECT s.*, st.*, w.* 
        FROM stocks s 
        INNER JOIN stock_type st ON s.stock_type_id_FK = st.stock_type_id 
        INNER JOIN wallet w ON s.wallet_id_FK = w.id_wallet  
        WHERE s.stock_name = '$stock_name_escaped'";

// ¡GUARDA el resultado en $result!
$result = mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    $datos = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        $datos[] = $fila;
    }
    responder($datos, true, "Stocks encontrados", $conexion);
}
?>