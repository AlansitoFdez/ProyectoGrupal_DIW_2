<?php

require_once('config.php');

try {
    $conexion = obtenerConexion();

    $sql = "SELECT w.*, c.customer_name AS customer_name, wt.wallet_type_name AS wallet_type_name FROM wallet w, customers c, wallet_type wt
            WHERE w.customers_id_FK = c.id_customers
            AND w.wallet_type_id_FK = wt.wallet_type_id;";

    $resultado = mysqli_query($conexion, $sql);

    $datos = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    }

    responder($datos, true, "Datos recuperados correctamente", $conexion);

} catch (mysqli_sql_exception $e) {
    
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    // Captura cualquier otra excepción / error inesperado
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}