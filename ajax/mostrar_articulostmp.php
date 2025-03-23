<?php 	
	/* Connect To Database*/
    include('is_logged.php');
    $session_id= session_id();
	require_once ("../config/db.php");//Contiene las variables de configuracion para conectar a la base de datos
	require_once ("../config/conexion.php");//Contiene funcion que conecta a la base de datos
     $sumador_total = 0;
?>

<table class="table">
            <tr>
	            <th class='text-center'>CODIGO</th>
	            <th class='text-center'>CANT.</th>
	            <th class='text-center'>UNIDAD</th>
	            <th>DESCRIPCION</th>
	            <th class='text-right'>PRECIO UNIT.</th>
	            <th class='text-right'>PRECIO TOTAL</th>
	            <th></th>
            </tr>

		     <?php
	           $sqlsearch2 = "SELECT * FROM tmp WHERE session_id ='$session_id'";
               $querysearch2 = mysqli_query($con,$sqlsearch2);
	          
	           while ($row=mysqli_fetch_array($querysearch2)) { ?>
			 <tr>
				 <td class='text-center'><?php echo $row['id_producto'];?></td>
			     <td class='text-center'><?php echo $row['cantidad_tmp'];?>	</td>		
			     <td class='text-center'><?php echo $row['unidad_tmp'];?></td>
				 <?php
						 $query_producto = mysqli_query($con,"SELECT * FROM products WHERE id_producto ='".$row['id_producto']."'");					
						 $row_p=mysqli_fetch_array($query_producto);
								   
				 ?>											   
			     <td><?php echo $row_p['nombre_producto'];?></td>
			     <td class='text-right'>$ <?php echo  number_format($row['precio_tmp'],2);?></td>
				 <?php $importe = $row['cantidad_tmp'] * $row['precio_tmp'] ?>
			     <td class='text-right'>$ <?php echo  number_format($importe,2);?></td>
			     <td class='text-center'><a href="#" onclick="editar('<?php echo $session_id ?>','<?php echo $row['id_producto'] ?>','<?php echo $row['cantidad_tmp'] ?>','<?php //echo $descripciontmp ?>','<?php echo number_format($row['precio_tmp'],2) ?>')" data-toggle="modal" data-target="#modalpartida"><i class="glyphicon glyphicon-edit"></i></a>
				 </td>	
		    </tr>
				   
			 <?php $sumador_total += $importe ;  }  ?>

<tr>
	<td></td>	
	<td class='text-right' colspan=4>TOTAL $</td>
	<td class='text-right'><?php echo number_format($sumador_total,2);?></td>
	<td></td>
</tr>

</table>