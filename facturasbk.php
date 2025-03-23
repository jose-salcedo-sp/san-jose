<?php
	session_start();
	if (!isset($_SESSION['user_login_status']) AND $_SESSION['user_login_status'] != 1) {
        header("location: login.php");
		exit;
        }
	
	$active_facturas="active";
	$active_productos="";
	$active_clientes="";
	$active_usuarios="";	
    $active_proveedores="";
	$title="Orden de Compra | LicaERP";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
	<?php include("head.php");?>

  </head>
  <body>
		<?php
	  
	  switch ($_SESSION['user_tipoact']){
		  case 1:			 
			  include("navbar.php");
			  break;	  
		  case 2:			
			  include("navbar2.php");
			  break;
		  case 3:			 
			  include("navbar2.php");
			  break;
		 			  
	  }
		  	  
	//include("navbar.php");
	?> 
    <div class="container">
		<div class="panel panel-info">
		<div class="panel-heading">
			
		    <div class="btn-group pull-right">
				<a  href="nueva_factura.php" class="btn btn-info"><span class="glyphicon glyphicon-plus" ></span> Nueva Orden</a>
			</div>
			<h4><i class='glyphicon glyphicon-search'></i> Buscar Orden de Compra</h4>
		</div>
			<div class="panel-body">
				<?php
				
				//include("modal/seccionar_productos.php");
			    ?>
				
				<form class="form-horizontal" role="form" id="datos_cotizacion">
				
						<div class="form-group row">
							<label for="q" class="col-md-2 control-label">Cliente o # de Orden</label>
							<div class="col-md-5">
								<input type="text" class="form-control" id="q" placeholder="Nombre del cliente o # de orden" onkeyup='load(1);'>
							</div>

							<div class="col-md-3">
								<button type="button" class="btn btn-default" onclick='load(1);'>
									<span class="glyphicon glyphicon-search" ></span> Buscar</button>
								<span id="loader"></span>
							</div>
							
						</div>

			</form>
				<div id="resultados"></div><!-- Carga los datos ajax -->
				<div class='outer_div'></div><!-- Carga los datos ajax -->
			</div>
		</div>	
		
	</div>
	<hr>
	<?php
	include("footer.php");
	?>
	  
	  
	<script type="text/javascript" src="js/VentanaCentrada.js"></script>
	<script type="text/javascript" src="js/facturas.js"></script>
	  
	  <script>
		
		  
		  function imprimir_ticket(cliente,idtmp){
			  alert(idtmp);
			  window.open('ticket.php?cliente='+cliente+'&nticket='+idtmp);
		  }
		  
		 // function Exportar_excel(idtmp){ 
			//  alert(idtmp);
			/*$.ajax({
			type: "POST",
			url: "ajax/exportar_excel.php",
			data: {idtmp:idtmp},
			 
			  success: function(datos){
			    alert(datos);
		       }
	         });*/
		  
		 // }
		  
/*$( "#dividir_prod" ).submit(function( event ) {
  $('#generar_datos').attr("disabled", true);
  
 var parametros = $(this).serialize();
	 $.ajax({
			type: "POST",
			url: "ajax/generar_archivo.php",
			data: parametros,
			 beforeSend: function(objeto){
				$("#resultados_ajax2").html("Mensaje: Cargando...");
			  },
			success: function(datos){
			$("#resultados_ajax2").html(datos);
			$('#generar_datos').attr("disabled", false);
		
		  }
	});
  event.preventDefault();
}) 

	  </script>  
  </body>
</html>