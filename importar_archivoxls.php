<?php
    include('ajax/is_logged.php');//Archivo verifica que el usario que intenta acceder a la URL esta logueado
	$session_id= session_id();
    require_once ("config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
	require_once ("config/conexion.php");//Contiene funcion que conecta a la base de datos

	
   $archivo_tmp =  $_FILES['myfile']['name'];//$_POST['myfile'];
   $fichero = $_FILES["myfile"];
   // Cargando el fichero en la carpeta "tmp"
    move_uploaded_file($fichero["tmp_name"], "tmp/".$fichero["name"]);		
  
    $date_added = date("Y-m-d H:i:s");

include("funciones.php");
require_once 'PHPExcel/Classes/PHPExcel.php';

$delete=mysqli_query($con, "TRUNCATE TABLE tmp");
							   
//echo  $path ;
$archivo = "tmp/".$archivo_tmp; //"ListaPersonal.xlsx";
$inputFileType = PHPExcel_IOFactory::identify($archivo);
$objReader = PHPExcel_IOFactory::createReader($inputFileType);
$objPHPExcel = $objReader->load($archivo);
$sheet = $objPHPExcel->getSheet(0); 
$highestRow = $sheet->getHighestRow(); 
$highestColumn = $sheet->getHighestColumn(); 

$comedor =  $sheet->getCell("D4")->getCalculatedValue();	
$contacto =  $sheet->getCell("D3")->getCalculatedValue();	
$telefono =  $sheet->getCell("D6")->getCalculatedValue();
$semana =  $sheet->getCell("D7")->getCalculatedValue();	

$sumador_total = 0;
				 			 
for ($row = 14; $row <= $highestRow; $row++) { //$num++;
	//echo $row.'\n';
		 $descripciontmp = $sheet->getCell("B".$row)->getValue();		
	     $unidadtmp = $sheet->getCell("C".$row)->getValue();	
	     $cantidadtmp = $sheet->getCell("K".$row)->getCalculatedValue();
	
	    if ($cantidadtmp != 0) {

	           $sqlsearch2 = "SELECT * FROM products WHERE nombre_producto ='$descripciontmp'";
               $querysearch2 = mysqli_query($con,$sqlsearch2);
	           $rw_chance=mysqli_fetch_array($querysearch2);
	           $id_producto = $rw_chance['id_producto'];
	           $precio_producto = $rw_chance['precio_producto'];
			                  
			   $insert_tmp=mysqli_query($con, "INSERT INTO tmp (id_producto,cantidad_tmp,unidad_tmp,precio_tmp,session_id) VALUES ('$id_producto','$cantidadtmp','$unidadtmp','$precio_producto','$session_id')"); 

			}
	
}

 unlink('tmp/'.$archivo_tmp);		//Borra el archivo 
?>

<!DOCTYPE html>
<html lang="en">
   <head>
    <?php include("head.php");?>
  </head>
  <body>
	<?php
	
	include("navbar.php");
	?>  
    <div class="container">
	<div class="panel panel-info">
		<div class="panel-heading">
			
			<h4><i class='glyphicon glyphicon-edit'></i> Nueva Orden de Compra desde Excel</h4>
		</div>
		<div class="panel-body">
		<?php 
			include("modal/buscar_productos.php");
			include("modal/buscar_importar.php");
			include("modal/editarproductos_nuevaorden.php");
			//include("modal/registro_clientes.php");
			//include("modal/registro_productos.php");
		?>
			
			<form class="form-horizontal" role="form" id="datos_factura">
				<div class="form-group row">
				  <label for="nombre_cliente" class="col-md-1 control-label">Comedor</label>
				  <div class="col-md-3">
					  <input type="text" class="form-control input-sm" id="comedor" name="comedor" value="<?php echo $comedor ?>" required/> 
					  <input id="id_cliente" type='hidden'>	
				  </div>
				  <label for="tel1" class="col-md-1 control-label">Teléfono</label>
							<div class="col-md-2">
								<input type="text" class="form-control input-sm" id="tel1" name="tel1" value="<?php echo $telefono ?>" readonly>
							</div>
					<label for="mail" class="col-md-1 control-label">Email</label>
							<div class="col-md-3">
								<input type="text" class="form-control input-sm" id="mail" name="mail" placeholder="Email" readonly>
							</div>
				 </div>
						<div class="form-group row">
							<label for="empresa" class="col-md-1 control-label">Solicita</label>
							<div class="col-md-3">
								<input type="text" class="form-control input-sm" id="Solicita" name="Solicita" value="<?php echo $contacto ?>">
							</div>
							<label for="tel2" class="col-md-1 control-label">Fecha</label>
							<div class="col-md-2">
								<input type="text" class="form-control input-sm" id="fecha" value="<?php echo date("d/m/Y");?>" readonly>
							</div>
							<label for="email" class="col-md-1 control-label">Pago</label>
							<div class="col-md-3">
								<select class='form-control input-sm' id="condiciones" name="condiciones">
									<option value="1">Efectivo</option>
									<option value="3">Transferencia bancaria</option>
									<option value="4">Crédito</option>
								</select>
							</div>
						</div>
				
				        <div class="form-group row">
							<label for="semana" class="col-md-1 control-label">Semana</label>
							 <div class="col-md-3">
								<input type="text" class="form-control input-sm" id="semana" name="semana" value="<?php echo $semana?>" required>
							 </div>
							
				        </div>	
				
				
				<div class="col-md-12">
					<div class="pull-right">
						<button type="submit" class="btn btn-default" id="imprimir_datos">
						  <span class="glyphicon glyphicon-print"></span> Guardar
						</button>
					</div>	
				</div>
			</form>	
			<div id="resultados_save"></div>

		      <div id="resultados" class='col-md-12' style="margin-top:10px"></div><!-- Carga los datos ajax -->			
		</div>
	</div>		
		  <div class="row-fluid">
			<div class="col-md-12">

			</div>	
		 </div>
	</div>
	<hr>
	<?php
	include("footer.php");
	?>
	<script type="text/javascript" src="js/VentanaCentrada.js"></script>

	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script>
		
		$(document).ready(function(){
			mostrar_articulos();
		});

		$( "#datos_factura" ).submit(function( event ) {
		  $('#imprimir_datos').attr("disabled", true);
		  
		 var parametros = $(this).serialize();
			 $.ajax({
					type: "POST",
					url: "ajax/Guardar_imprimir.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados_save").html("Mensaje: Cargando...");
					  },
					success: function(datos){
						alert(datos);
						window.open('facturas.php');
						//obtenerdatos();
						// window.open('ticket.php?cliente='+cliente+'&nticket='+idtmp);
					$("#resultados_save").html(datos);
					$('#imprimir_datos').attr("disabled", false);
						
						
						//windows.open('facturas.php');
						//header("Location: nueva_factura.php"); 
					//load(1);
				  }
			});
		  event.preventDefault();
		}) 
		
		function editar(sesiontmp,idtmp,canttmp,descriptmp,preciotmp){
			//alert(idtmp);
			$("#id_sesiontmp").val(sesiontmp);
			$("#id_partida").val(idtmp);
			$("#cantidad").val(canttmp);
			 $.ajax({
                type: "POST",
                url: 'ajax/get_articulo.php',
                data: { idtmp:idtmp },
                 success: function(resp){
                  $('#descripcion').html(resp);
                }
		  
             });
			$("#preciov").val(preciotmp);

		}
		
$( "#editar_producto" ).submit(function( event ) {
  $('#guardar_datos').attr("disabled", true);
  
 var parametros = $(this).serialize();
	 $.ajax({
			type: "POST",
			url: "ajax/editar_partida_nuevaorden.php",
			data: parametros,
			
			success: function(datos){
				//alert(datos);
			//$("#resultados_ajax_productos").html(datos);
			$('#guardar_datos').attr("disabled", false);
			 $("#modalpartida").modal('hide');	
			mostrar_articulos();	
			//location.reload();
		  }
	});
  event.preventDefault();
})	
		
	function mostrar_articulos() {
		
		$.ajax({
        type: "GET",
        url: "./ajax/mostrar_articulostmp.php",
        success: function(datos){
		   $("#resultados").html(datos);
		  }
		});
	}

	</script>

  </body>
</html>


<!--  unlink('tmp/'.$archivo_tmp);		//Borra el archivo	

  header("Location: nueva_factura.php"); -->

						
             
	
	