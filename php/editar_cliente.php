<?php
include_once("config.php");

try {
    $conexion = obtenerConexion();

    // Recibe todos los datos en el campo 'cliente' como JSON
    $data = json_decode($_POST['cliente'], true);

    $id_customers   = intval($data['id_customers']);
    $customer_name  = $data['customer_name'];
    $phone          = $data['phone'];
    $customer_active= intval($data['customer_active']);
    $birthdate      = $data['birthdate'];
    $currency_id    = intval($data['currency_id']);

    // Validar que el obligatorio llegó
    if (!$id_customers || !$customer_name) {
        responder(null, false, "Faltan datos obligatorios", $conexion);
        exit();
    }

    // Actualizar cliente en la base de datos
    $sql = "UPDATE customers SET 
                customer_name = '$customer_name',
                phone = '$phone',
                customer_active = $customer_active,
                birthdate = '$birthdate',
                currency_id_FK = $currency_id
            WHERE id_customers = $id_customers";

    if ($conexion->query($sql)) {
        if ($conexion->affected_rows > 0) {
            responder(null, true, "Cliente editado correctamente", $conexion);
        } else {
            responder(null, false, "No se realizaron cambios en el cliente", $conexion);
        }
    } else {
        responder(null, false, "Error al editar el cliente: " . $conexion->error, $conexion);
    }
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
?>
