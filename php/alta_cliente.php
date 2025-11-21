<?php
include_once("config.php");

try {
    $conexion = obtenerConexion();
    $cliente = json_decode($_POST['cliente']);

    if (!$cliente) {
        responder(null, false, "No se recibieron datos del cliente", $conexion);
    }

    $sql = "INSERT INTO customers (customer_name, phone, customer_active, birthdate, currency_id_FK)
            VALUES (
                '$cliente->customer_name', $cliente->phone, $cliente->customer_active, '$cliente->birthdate', $cliente->currency_id
            );";

    if ($conexion->query($sql)) {
        responder(null, true, "Cliente dado de alta correctamente", $conexion);
    } else {
        responder(null, false, "Error al dar de alta el cliente: " . $conexion->error, $conexion);
    }
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
?>
