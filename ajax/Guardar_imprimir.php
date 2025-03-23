<?php
	include('is_logged.php');//Archivo verifica que el usario que intenta acceder a la URL esta logueado
	/*Inicia validacion del lado del servidor*/
		/* Connect To Database*/
		require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
		require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
		// escaping, additionally removing everything that could be (html/javascript-) code

		$comedor=mysqli_real_escape_string($con,(strip_tags($_POST["comedor"],ENT_QUOTES)));
		$telefono=mysqli_real_escape_string($con,(strip_tags($_POST["tel1"],ENT_QUOTES)));
		//$email=mysqli_real_escape_string($con,(strip_tags($_POST["email"],ENT_QUOTES)));
		$contacto=mysqli_real_escape_string($con,(strip_tags($_POST["Solicita"],ENT_QUOTES)));
        $condiciones=$_POST["condiciones"];
        $semana=$_POST["semana"];
		$fecha=date("Y-m-d H:i:s");

        //Busca si existe cliente comedor
        $sql_search="SELECT * FROM clientes WHERE nombre_cliente ='".$comedor."'";
		$query = mysqli_query($con, $sql_search);
        $cuentacliente = mysqli_num_rows($query);
        if ($cuentacliente !=0){
			 $sqlA=mysqli_query($con, "select id_cliente from clientes where nombre_cliente ='".$comedor."'");
	         $rw=mysqli_fetch_array($sqlA);
	         $id_cliente=$rw['id_cliente'];
			
		} else {
			
			$sql_new="INSERT INTO clientes (nombre_cliente, telefono_cliente, status_cliente, date_added, contacto_cliente) VALUES ('$comedor','$telefono','1','$fecha','$contacto')";
		    $query_new_insert_new= mysqli_query($con,$sql_new);
			
			 $sqlA=mysqli_query($con, "select id_cliente from clientes where nombre_cliente ='".$comedor."'");
	         $rw=mysqli_fetch_array($sqlA);
	         $id_cliente=$rw['id_cliente'];
			
		}

		
        $sql=mysqli_query($con, "select LAST_INSERT_ID(numero_factura) as last from facturas order by id_factura desc limit 0,1 ");
	    $rw=mysqli_fetch_array($sql);
	    $numero_orden=$rw['last']+1;	

		$sql="INSERT INTO facturas (numero_factura, fecha_factura, id_cliente, id_vendedor, semana, condiciones, total_venta, estado_factura) VALUES ('$numero_orden','$fecha','$id_cliente','0','$semana','$condiciones','0','3')";
		$query_new_insert = mysqli_query($con,$sql);

        $sql="SELECT * FROM tmp";
		$query = mysqli_query($con, $sql);
         $sum = 0;
        while ($row=mysqli_fetch_array($query)){ 
		    $id_producto=$row['id_producto'];
			$cantidad=$row['cantidad_tmp'];
			$unidad = $row['unidad_tmp'];
			$precio =$row['precio_tmp'];
			
			 //Inserta detalle de orden
	                         $sql3="INSERT INTO detalle_factura (numero_factura, id_producto, cantidad, precio_venta) VALUES ('$numero_orden',' $id_producto','$cantidad','$precio')";
		                      $query_new_insert2 = mysqli_query($con,$sql3);
			                  $sum += $cantidad * $precio;
		
		}

        //actualiza el precio
        $sql="UPDATE facturas SET total_venta='".$sum."' WHERE numero_factura='".$numero_orden."'";
        $query_update = mysqli_query($con,$sql);

         echo "Se agregó con exito";
		/*if ($query_new_insert){
				$messages[] = "Cliente agregado ";
			} else{
				$errors []= "Lo siento algo ha salido mal intenta nuevamente.".mysqli_error($con);
			} */
		
		
		//if (isset($errors)){
			
			

?>