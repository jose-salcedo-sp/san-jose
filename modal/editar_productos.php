	<?php
		if (isset($con))
		{
	?>
	<!-- Modal -->
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="myModalLabel"><i class='glyphicon glyphicon-edit'></i> Editar producto</h4>
		  </div>
		  <div class="modal-body">
			<form class="form-horizontal" method="post" id="editar_producto" name="editar_producto">
			<div id="resultados_ajax2"></div>
			  <div class="form-group">
				<label for="mod_codigo" class="col-sm-3 control-label">Código</label>
				<div class="col-sm-8">
				  <input type="text" class="form-control" id="mod_codigo" name="mod_codigo" placeholder="Código del producto" readonly>
					<input type="hidden" name="mod_id" id="mod_id">
				</div>
			  </div>
			   <div class="form-group">
				<label for="mod_nombre" class="col-sm-3 control-label">Nombre</label>
				<div class="col-sm-8">
				  <textarea class="form-control" id="mod_nombre" name="mod_nombre" placeholder="Nombre del producto" required></textarea>
				</div>
			  </div>
				
			  <div class="form-group">
				<label for="mod_unidad" class="col-sm-3 control-label">Unidad de Medida</label>
				<div class="col-sm-8">
				 <select class="form-control" id="mod_unidad" name="mod_unidad" required>
					<option value="" selected disabled>-- Seleccione unidad --</option>
					<option value="Kilogramo">Kilogramo</option>
					<option value="Litro">Litro</option> 
					<option value="Bulto">Bulto</option>
					<option value="Bidon">Bidon</option>
					<option value="Paquete">Paquete</option>
					<option value="Bote">Bote</option>
					<option value="Galón">Galón</option>
					<option value="Pieza">Pieza</option>
					<option value="Frasco">Frasco</option> 
				  </select>
				</div>
			  </div>
				
			  <div class="form-group">
				<label for="mod_precio" class="col-sm-3 control-label">Precio</label>
				<div class="col-sm-8">
				  <input type="text" class="form-control" id="mod_precio" name="mod_precio" placeholder="Precio de venta del producto" required pattern="^[0-9]{1,5}(\.[0-9]{0,2})?$" title="Ingresa sólo números con 0 ó 2 decimales" maxlength="8">
				</div>
			  </div>
				
			  <div class="form-group">
				<label for="mod_etiqueta" class="col-sm-3 control-label">Etiqueta</label>
				<div class="col-sm-8">
				  <select class="form-control" id="mod_etiqueta" name="mod_etiqueta" required>
					<option value="" selected disabled>-- Seleccione unidad --</option>
					<option value="R">R</option>
					<option value="M">M</option> 
					<option value="EX">EX</option>
					<option value="D">D</option>
					<option value="G">G</option>
					<option value="A">A</option>

				  </select>
				 
				</div>
			  </div>	

			  <div class="form-group">
				<label for="mod_precio" class="col-sm-3 control-label">Clave de producto (SAT)</label>
				<div class="col-sm-8">
				  <input type="number" class="form-control" id="mod_clavesat" name="mod_clavesat" placeholder="Capture clave de producto" >
				</div>
			  </div>
			  
			  <div class="form-group">
				<label for="mod_estado" class="col-sm-3 control-label">Estado</label>
				<div class="col-sm-8">
				 <select class="form-control" id="mod_estado" name="mod_estado" required>
					<option value="">-- Selecciona estado --</option>
					<option value="1" selected>Activo</option>
					<option value="0">Inactivo</option>
				  </select>
				</div>
			  </div>
			  
			 
			 
			
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			<button type="submit" class="btn btn-primary" id="actualizar_datos">Actualizar datos</button>
		  </div>
		  </form>
		</div>
	  </div>
	</div>
	<?php
		}
	?>