<?php
// Connection 
//session_start();
    require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
	require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
//$con=@mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
 $orden = $_GET['id_orden'];
 $cliente = $_GET['cliente'];
//mysqli_set_charset($con, 'latin1_swedish_ci');
$filename ="orden ".$orden.".xls";
$titulos = array("Cliente :".$cliente,"");


header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=\"$filename\"");

echo implode("\t", array_values($titulos)) . "\r\n";
// Download file

$user_query = mysqli_query($con, "select etiqueta, nombre_producto, unidad_producto, cantidad, precio_producto from detalle_factura,products where detalle_factura.numero_factura ='".$orden."' and detalle_factura.id_producto = products.id_producto");
// Write data to file
$flag = false;
while ($row = mysqli_fetch_assoc($user_query)) {
    if (!$flag) {
        // display field/column names as first row
        echo implode("\t", array_keys($row)) . "\r\n";
        $flag = true;
    }
    echo implode("\t", array_values($row)) . "\r\n";
}

exit();

?>