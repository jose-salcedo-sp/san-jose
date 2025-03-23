<?php

   require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
   require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
	
	$seleccion = $_POST['seleccion'];

    $queryM = "SELECT * FROM regimenes WHERE tipo = '$seleccion'";
    $result = mysqli_query($con, $queryM);
    $countp=mysqli_num_rows($result);
    $html= "<option value='' disabled selected>-- Seleccione --</option>";
    while($row = mysqli_fetch_array($result))
     {
		$html.= "<option value='".$row['clave']."'>". $row['clave']. " ". strtoupper($row['regimen_sat'])."</option>";
     }

    echo $html;
   
 ?>