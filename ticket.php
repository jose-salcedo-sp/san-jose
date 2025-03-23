<?php
	/* Connect To Database*/
	require_once ("config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
	require_once ("config/conexion.php");//Contiene funcion que conecta a la base de datos
	
	
	//$sql=mysqli_query($con, "select LAST_INSERT_ID(id_factura) as last from facturas order by id_factura desc limit 0,1 ");
	//$rw=mysqli_fetch_array($sql);
	//$numero=$rw['last']+1;	
	
	
	$query_perfil=mysqli_query($con,"select * from perfil where id_perfil=1");
	$rw=mysqli_fetch_assoc($query_perfil);
	$tax=$rw['impuesto'];
    $logo=$rw['logo_url'];
	
	//Variables por GET
	$cliente=intval($_GET['cliente']);
    $nticket=intval($_GET['nticket']);
    $nsemana=intval($_GET['nsemana']);
	
	//Fin de variables por GET
	
	$sql_cliente=mysqli_query($con,"select * from clientes where id_cliente='$cliente' limit 0,1");//Obtengo los datos del cliente
	$rw_cliente=mysqli_fetch_array($sql_cliente);
	
	$session_id= session_id();

?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="assets/css/ticket.css">
		
        <title>Ticket de venta, Comercializadora San José</title>
    </head>
    <body>
        <div class="ticket">
            
			 <img src="<?php echo $logo ?>" alt="Logo comercializadora" />
            <p class="centered"><?php echo $rw['nombre_empresa'];?> 
                <br><strong>Teléfono :</strong> <?php echo $rw['telefono'];?> 
                <br><strong>Dirección: </strong> <?php echo $rw['direccion'];?> 
				<br><strong>Fecha: </strong><?php echo date("d/m/Y H:i");?>
				<br><strong>Orden #: </strong> <?php echo $nticket;?> 
				<br><strong>Semana: </strong> <?php echo $nsemana;?> 
				</p>
				
				
			<p >
				<strong>Cliente :</strong> <?php echo $rw_cliente['nombre_cliente'];?> 
				<br><strong>Dirección: </strong> <?php echo $rw_cliente['direccion_cliente'];?> 
				
				</p>	
            <table style="font-size: 13px;">
                <thead>
                    <tr >
                        <th class="quantity both_border">Cant.</th>
                        <th class="description both_border">Producto</th>
						<th class="price both_border">P.Unit.</th>
                        <th class="price both_border">Importe</th>
                    </tr>
                </thead>
                <tbody>
				<?php
					$query=mysqli_query($con,"select * from detalle_factura,products where numero_factura ='".$nticket."' and products.id_producto = detalle_factura.id_producto");
					$suma=0;
					while($row=mysqli_fetch_array($query)){
						$total=$row['cantidad']*$row['precio_venta'];
						$total=number_format($total,2,'.','');
				?>
                    <tr>
                        <td class="quantity"><?php echo $row['cantidad'];?></td>
						<td class="description"><?php echo $row['nombre_producto'];?></td>
						<td class="price"><?php echo number_format($row['precio_venta'],2);?></td>
                        <td class="price">$<?php echo number_format($total,2) ;?></td>
                    </tr>
				<?php 
					$suma+=$total;
				
					}
					
					$iva=$suma * ($tax / 100);
					$total_iva=number_format($iva,2,'.','');	
					$total=$suma + $total_iva;
			
				?>	
                
                    <tr>
                        <td class="quantity"></td>
						 <td class="quantity"></td>
                        <th class="description"> Total</th>
                        <th class="price totales both_border" colspan=3>$ <?php echo number_format($suma,2);?></th>
                    </tr>
				
                </tbody>
            </table>
            <p class="centered">Gracias por su compra!
                <br>www.comercalizadorasajose.com</p>
        </div>
		
        <button id="btnPrint" class="hidden-print" onclick="window.print();">Imprimir</button>
		<button  class="hidden-print" onclick="window.close();">Cerrar</button>
        <script src="js/script.js"></script>
    </body>
</html>
<?php
//Guardando los datos del ticket
//$fecha=date("Y-m-d H:i:s");
//$sql="INSERT INTO `facturas` (`id`, `fecha`, `id_cliente`, `monto`) VALUES (NULL, '$fecha', '$cliente', '$total');";
//$save=mysqli_query($con,$sql);
//$delete=mysqli_query($con,"delete from tmp");
?> 