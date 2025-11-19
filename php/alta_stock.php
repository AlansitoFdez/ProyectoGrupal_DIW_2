<?php
require_once('config.php'); 

$conexion = obtenerConexion();

$stock = json_decode($_POST['stock']);

$sql = "INSERT INTO stocks VALUES (null, $stock->quantity, '$stock->stock_name', $stock->in_use, '$stock->added_date', $stock->wallet_id_FK, $stock->stock_type_id_FK);";

mysqli_query($conexion, $sql);

$sqlprecio = "SELECT stock_type_quality FROM stock_type WHERE stock_type_id = $stock->stock_type_id_FK;";

$resultadoprecio = mysqli_query($conexion, $sqlprecio);

$precio = 0;

if ($row = mysqli_fetch_assoc($resultadoprecio)) {
    $precio = $row['stock_type_quality'];
}

// 2. Calcular nuevo importe
$importe = $stock->quantity * $precio;

// 3. Actualizar wallet
$sqlUpdate = "UPDATE wallet SET money_amount = money_amount + $importe WHERE id_wallet = {$stock->wallet_id_FK}";
mysqli_query($conexion, $sqlUpdate);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,600600601$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta el stock", $conexion);
}
?>