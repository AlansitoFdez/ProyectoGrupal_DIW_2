<?php

require_once('config.php'); // Incluye obtenerConexion() y responder()

try {
    $conexion = obtenerConexion();

    $sql = "SELECT * FROM wallet_type;";
    $resultado = $conexion->query($sql);

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila; // cada $fila es un array asociativo (columna => valor)
    }

    responder($datos, true, "Datos recuperados correctamente", $conexion);

} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}

/*
  Notas para alumnos (breve):
   - Siempre validar y sanitizar la entrada del usuario en el frontend/back.
   - Para consultas que reciban parámetros externos, usar prepared statements:
       $stmt = $conexion->prepare('SELECT * FROM tipo WHERE id = ?');
       $stmt->bind_param('i', $id);
       $stmt->execute();
   - No mostrar información sensible en mensajes de error en producción.
   - Mantener la lógica de respuesta centralizada (como responder()) ayuda a
     que el frontend procese errores y datos de forma consistente.
*/
