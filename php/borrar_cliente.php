<?php
include_once("config.php");

try {
    $conexion = obtenerConexion();

    $id_cliente = intval($_POST['id_cliente']); // Seguridad

    if (!$id_cliente) {
        responder(null, false, "No se recibió el id del cliente a borrar", $conexion);
        exit();
    }

    // 1. Buscar todos los wallets del cliente
    $sqlBuscaWallets = "SELECT id_wallet FROM wallet WHERE customers_id_FK = $id_cliente";
    $resultado = $conexion->query($sqlBuscaWallets);
    $idsWallets = [];
    while ($fila = $resultado->fetch_assoc()) {
        $idsWallets[] = $fila['id_wallet'];
    }

    // 2. Borrar stocks de CADA wallet
    if (count($idsWallets) > 0) {
        $idsWalletsList = implode(',', $idsWallets);
        $sqlBorraStocks = "DELETE FROM stocks WHERE wallet_id_FK IN ($idsWalletsList)";
        $conexion->query($sqlBorraStocks);
    }

    // 3. Borrar wallets del cliente
    $sqlWallet = "DELETE FROM wallet WHERE customers_id_FK = $id_cliente";
    $conexion->query($sqlWallet);

    // 4. Borrar el cliente en customers
    $sqlCliente = "DELETE FROM customers WHERE id_customers = $id_cliente";
    if ($conexion->query($sqlCliente)) {
        if ($conexion->affected_rows > 0) {
            responder(null, true, "Cliente eliminado correctamente", $conexion);
        } else {
            responder(null, false, "No existe ningún cliente con ese id", $conexion);
        }
    } else {
        responder(null, false, "Error al eliminar el cliente: " . $conexion->error, $conexion);
    }
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
?>
