<?php
include_once("config.php");
$conexion = obtenerConexion();

$phone = $_POST['phone'];

$sql = "SELECT id_customers, customer_name FROM customers WHERE phone = $phone;";

$resultado = mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    if($row = mysqli_fetch_assoc($resultado)){
         responder(['id_customers' => $row['id_customers']], false, "ID encontrado", $conexion);
    }
}

?>