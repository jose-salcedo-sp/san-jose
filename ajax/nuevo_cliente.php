<?php
	include('is_logged.php');//Archivo verifica que el usario que intenta acceder a la URL esta logueado
	/*Inicia validacion del lado del servidor*/
	if (empty($_POST['nombre'])) {
           $errors[] = "Nombre vacío";
        } else if (!empty($_POST['nombre'])){
		/* Connect To Database*/
		require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
		require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
		// escaping, additionally removing everything that could be (html/javascript-) code
		$nombre=mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
		$telefono=mysqli_real_escape_string($con,(strip_tags($_POST["telefono"],ENT_QUOTES)));
		$email=mysqli_real_escape_string($con,(strip_tags($_POST["email"],ENT_QUOTES)));
		$direccion=mysqli_real_escape_string($con,(strip_tags($_POST["direccion"],ENT_QUOTES)));
		//$contacto=mysqli_real_escape_string($con,(strip_tags($_POST["contacto"],ENT_QUOTES)));
		$rfc=mysqli_real_escape_string($con,(strip_tags($_POST["rfc"],ENT_QUOTES)));
		$cp=mysqli_real_escape_string($con,(strip_tags($_POST["cp"],ENT_QUOTES)));
		$tipo=mysqli_real_escape_string($con,(strip_tags($_POST["tentidad_basico"],ENT_QUOTES)));
		$regimen=mysqli_real_escape_string($con,(strip_tags($_POST["regimen"],ENT_QUOTES)));
		$nomcontacto=mysqli_real_escape_string($con,(strip_tags($_POST["nomcontacto"],ENT_QUOTES)));
		$apelcontacto=mysqli_real_escape_string($con,(strip_tags($_POST["apelcontacto"],ENT_QUOTES)));
		$user_password_hash = password_hash('25252', PASSWORD_DEFAULT);
		$date_added=date("Y-m-d H:i:s");
		$user_tipo ="2";
		$nombrecompleto =$nomcontacto ." ".$apelcontacto;
		$sql="INSERT INTO clientes (nombre_cliente, telefono_cliente, email_cliente, direccion_cliente, status_cliente, date_added, contacto_cliente,rfc_cliente,cp_cliente,tipo_cliente,regimen_cliente) 
		VALUES ('$nombre','$telefono','$email','$direccion','1','$date_added','$nombrecompleto','$rfc','$cp','$tipo','$regimen')";
		$query_new_insert = mysqli_query($con,$sql);
		if ($query_new_insert){
				$messages[] = "Cliente agregado ";
			} else{
				$errors []= "Lo siento algo ha salido mal intenta nuevamente.".mysqli_error($con);
			}
		} else {
			$errors []= "Error desconocido.";
		}
		$sql2 = "INSERT INTO users (firstname, lastname, user_empresa, user_name, user_password_hash, user_email, date_added,user_tipo)
                            VALUES('".$nomcontacto."','".$apelcontacto."','".$nombre."','" .$nomcontacto.$apelcontacto. "', '" . $user_password_hash . "', '" . $email . "','".$date_added."','".$user_tipo."');";

		$query_new_insert2 = mysqli_query($con,$sql2);
        if ($query_new_insert2){
				$messages[] = "y usuario ingresado satisfactoriamente.";
			} 
        else{
				$errors []= "Lo siento algo ha salido mal al agregar al usuario, intenta nuevamente.".mysqli_error($con);
			}
		
		
		if (isset($errors)){
			
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
			}

?>