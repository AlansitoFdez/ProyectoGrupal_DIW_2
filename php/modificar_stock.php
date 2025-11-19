<?php
include_once("config.php");

$conexion = obtenerConexion();

$id_stock = $_POST['id_stock'];
$stock_name = $_POST['stock_name'];
$quantity_new = $_POST['quantity'];
$stock_type_id = $_POST['stock_type_id'];

// OBTENER DATOS ANTIGUOS DEL STOCK PARA COMPARAR MODIFICACIONES
$sql_old = "SELECT quantity, wallet_id_FK, stock_type_id_FK FROM stocks WHERE id_stocks = $id_stock";
$result_old = mysqli_query($conexion, $sql_old);


$old_data = mysqli_fetch_assoc($result_old);
$quantity_old = $old_data['quantity'];
$wallet_id = $old_data['wallet_id_FK'];

// OBTENER EL PRECIO DEL NUEVO TIPO DE STOCK
$sql_price = "SELECT stock_type_quality FROM stock_type WHERE stock_type_id = $stock_type_id";
$result_price = mysqli_query($conexion, $sql_price);


$price_data = mysqli_fetch_assoc($result_price);
$precio_unitario = $price_data['stock_type_quality'];

// CALCULAR LA DIFERENCIA Y EL NUEVO IMPORTE
$diff = $quantity_new - $quantity_old;
$ajuste = $diff * $precio_unitario;

// ACTUALIZAR STOCK
$sql_update_stock = "UPDATE stocks SET stock_name = '$stock_name', quantity = $quantity_new, stock_type_id_FK = $stock_type_id WHERE id_stocks = $id_stock";
$ok_update = mysqli_query($conexion, $sql_update_stock);

// SI HAY DIFERENCIA, ACTUALIZAR WALLET
if ($diff !== 0) {
    $sql_update_wallet = "UPDATE wallet SET money_amount = money_amount + $ajuste WHERE id_wallet = $wallet_id";
    mysqli_query($conexion, $sql_update_wallet);
}

if ($ok_update) {
    responder(null, false, "Stock y saldo de wallet actualizados correctamente", $conexion);
} else {
    responder(null, true, "No se modificó el stock", $conexion);
}
?>