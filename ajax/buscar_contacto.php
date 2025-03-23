<?php

	require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
    require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
	
	$cliente = $_POST['selected'];
	
	$queryM = "SELECT * FROM clientes WHERE id_cliente = '$cliente'";
	$resultadoM = $con->query($queryM);
	
	$html= "<option value='' disabled selected >Seleccionar contacto</option>";
	
	while($rowM = $resultadoM->fetch_assoc())
		
	{
		$html.= "<option value='".$rowM['contacto_cliente']."'>".$rowM['contacto_cliente']."</option>";
	}
	
	echo $html;

?>