	<?php
		if (isset($con))
		{
	?>
	<!-- Modal -->
	<div class="modal fade" id="modalpartida" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="myModalLabel"><i class='glyphicon glyphicon-edit'></i>Editar partida</h4>
		  </div>
		  <div class="modal-body">
			<form class="form-horizontal" method="post" id="editar_producto" name="editar_producto">
			<div id="resultados_ajax_productos"></div>
			    <input type="hidden" class="form-control" id="id_sesiontmp" name="id_sesiontmp" >
			    <input type="hidden" class="form-control" id="id_partida" name="id_partida" >
			  
			  <div class="form-group">
				<label for="cantidad" class="col-sm-3 control-label">Cantidad</label>
				<div class="col-sm-8">
					<input type="number" step="any" class="form-control" id="cantidad" name="cantidad" required >
				  
				</div>
			  </div>
				
			  <div class="form-group">
				<label for="descripcion" class="col-sm-3 control-label">Descripción</label>
				<div class="col-sm-8">
					<select class='form-control input-sm' id="descripcion" name="descripcion" disabled>
					 </select>
					<!--<input type="text" class="form-control" id="descripcion" name="descripcion" readonly>-->
				</div>
			  </div>	
				
			  <div class="form-group">
				<label for="preciov" class="col-sm-3 control-label">Precio</label>
				<div class="col-sm-8">
				  <input type="text" class="form-control" id="preciov" name="preciov" placeholder="Precio de venta del producto" required pattern="^[0-9]{1,5}(\.[0-9]{0,2})?$" title="Ingresa sólo números con 0 ó 2 decimales" maxlength="8">
				</div>
			  </div>
			 

		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			<button type="submit" class="btn btn-primary" id="guardar_datos">Guardar datos</button>
		  </div>
		  </form>
		</div>
	  </div>
	</div>
	<?php
		}
	?>