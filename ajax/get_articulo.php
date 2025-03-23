<?php

	require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
   require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
	
	$id_item = $_POST['idtmp']; //ID_table de la tabla plantillas_estructuras_menus

    $queryM = "SELECT * FROM products";
    $result = mysqli_query($con, $queryM);
    $countp=mysqli_num_rows($result);
    $html= "<option value=''> </option>";
    while($row = mysqli_fetch_array($result)) {
		 $seleccion = $row['codigo_producto'] == $id_item ? 'selected' : '';
		 $html.= "<option value='".$row['codigo_producto']."' ". $seleccion." >".$row['nombre_producto']."</option>";
		
     }
    echo $html;
   
 ?>