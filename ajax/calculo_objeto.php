<?php
    /* Connect To Database*/
    require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
    require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
    
    $id = $_POST["id"];
    $valor = $_POST["valor"];
    $importe = $_POST["importe"];

    $query_1 = mysqli_query($con, "SELECT * FROM perfil WHERE id_perfil = 1 ");
    $row1 = mysqli_fetch_array($query_1);
    $impuesto = $row_1['impuesto'];

    $iva_trasladado = $valor == 1 ? $_POST["importe"] * 0.16 : NULL;

    $sql="UPDATE detalle_factura SET obj_imp ='".$valor."', iva_trasladado='".$iva_trasladado."' WHERE id_detalle ='".$id."'";
		$query_update = mysqli_query($con,$sql);
        if ($query_update){
            echo 1;
        } else{
            echo "Lo siento algo ha salido mal intenta nuevamente. ".mysqli_error($con);
        }

?>