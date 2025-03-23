<?php
	include('is_logged.php');//Archivo verifica que el usario que intenta acceder a la URL esta logueado
	/*Inicia validacion del lado del servidor*/
	
		/* Connect To Database*/
		require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
		require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
		// escaping, additionally removing everything that could be (html/javascript-) code
		$cantidad=mysqli_real_escape_string($con,(strip_tags($_POST["cantidad"],ENT_QUOTES)));
		//$descripcion=mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));
        //$descripcion=$_POST["descripcion"];

		$precio_venta=floatval($_POST['preciov']);
		$id_producto=$_POST['id_partida'];
        $id_sesiontmp=$_POST['id_sesiontmp'];
		$sql="UPDATE tmp SET cantidad_tmp='".$cantidad."', precio_tmp='".$precio_venta."' WHERE session_id='".$id_sesiontmp."' AND id_producto ='".$id_producto."'";
		$query_update = mysqli_query($con,$sql);
			if ($query_update){
				echo $messages[] = "Producto ha sido actualizado satisfactoriamente.";
			} else{
				echo $errors []= "Lo siento algo ha salido mal intenta nuevamente.".mysqli_error($con);
			}
		
		/*if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong>Error!</strong> 
					<?php
						foreach ($errors as $error) {
								echo $error;
							}
						?>
			</div>
			<?php
			}
			if (isset($messages)){
				
				?>
				<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong>¡Bien hecho!</strong>
						<?php
							foreach ($messages as $message) {
									echo $message;
								}
							?>
				</div>
				<?php
			} */

?>