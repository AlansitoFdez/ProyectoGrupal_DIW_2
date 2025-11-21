<?php
include_once("config.php");

try {
    $conexion = obtenerConexion();
    $currency_id = intval($_GET['currency_id']);

    $sql = "SELECT c.*, cu.currency_name AS currency_name
            FROM customers c
            JOIN currency cu ON c.currency_id_FK = cu.currency_id
            WHERE c.currency_id_FK = $currency_id
            ORDER BY c.id_customers";
    $res = $conexion->query($sql);

    $clientes = [];
    while ($fila = $res->fetch_assoc()) {
        $clientes[] = $fila;
    }

    echo json_encode([
        "ok" => count($clientes) > 0,
        "datos" => $clientes,
        "mensaje" => count($clientes) > 0 ? "Listado de clientes recuperado" : "No hay clientes con esa moneda"
    ]);
    $conexion->close();
} catch (Exception $e) {
    echo json_encode([
        "ok" => false,
        "datos" => [],
        "mensaje" => "Error: " . $e->getMessage()
    ]);
}
?>
