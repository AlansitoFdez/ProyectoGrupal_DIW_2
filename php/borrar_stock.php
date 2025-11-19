<?php
require_once('config.php');
$conexion = obtenerConexion();

// ID recibido
$id_stock = $_POST['id_stock'];

//OBTENEMOS LOS DAOTS DEL STOCK QUE VAMOS A BORRAR PARA USAR EL QUANTITY
$sql_stock = "SELECT quantity, wallet_id_FK, stock_type_id_FK FROM stocks WHERE id_stocks = $id_stock";
$res_stock = mysqli_query($conexion, $sql_stock);

//GUARDAMOS LOS DATOS EN VARIABLES
$stock = mysqli_fetch_assoc($res_stock);
$quantity = $stock['quantity'];
$wallet_id = $stock['wallet_id_FK'];
$stock_type_id = $stock['stock_type_id_FK'];

//HACEMOS UNA CONSULTA PARA OBTENER EL QUALITY DEL STOCK TYPE EN CUESTION
$sql_precio = "SELECT stock_type_quality FROM stock_type WHERE stock_type_id = $stock_type_id";
$res_precio = mysqli_query($conexion, $sql_precio);

$precio_unitario = mysqli_fetch_assoc($res_precio)['stock_type_quality'];

//CREAMOS UNA VARIABLES CON EL IMPORTE A RESTAR AL MONEY_AMOUNT DE LA WALLET
$importe_restar = $quantity * $precio_unitario;

//HACEMOS EL BORRADO DEFINITIVO DEL STOCK
$sql_delete = "DELETE FROM stocks WHERE id_stocks = $id_stock";
if (!mysqli_query($conexion, $sql_delete)) {
    responder(null, true, "Error al borrar stock: " . mysqli_error($conexion), $conexion);
    exit;
}

//ACTUALIZAMOS LA WALLET RESTANDOLE EL IMPORTE CORRESPONDIENTE
$sql_update_wallet = "UPDATE wallet SET money_amount = money_amount - $importe_restar WHERE id_wallet = $wallet_id";
if (!mysqli_query($conexion, $sql_update_wallet)) {
    responder(null, true, "Error al actualizar wallet: " . mysqli_error($conexion), $conexion);
    exit;
}

responder(null, false, "Stock borrado y wallet actualizada correctamente", $conexion);
?>