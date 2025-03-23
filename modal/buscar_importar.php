	<?php
		if (isset($con))
		{
	?>
	<!-- Modal -->
	<div class="modal fade" id="nuevaimportacion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="myModalLabel"><i class='glyphicon glyphicon-import'></i> Importar Archivo</h4>
		  </div>
		  <div class="modal-body">
			<form class="form-horizontal" method="post" id="guardar_importacion" name="guardar_importacion" action="importar_archivoxls.php" enctype="multipart/form-data">
			<div id="resultados_ajax_productos"></div>
				
			  <div class="form-group">
				<label for="codigo" class="col-sm-3 control-label">Archivo</label>
				<div class="col-sm-8">
				  <input name="myfile" id="file" type="file" accept=".xls,.xlsx" class="form-control" required>
				</div>
			  </div>
			  
			  
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			<button type="submit" class="btn btn-primary" id="importar_datos">Importar datos</button>
		  </div>
		  </form>
		</div>
	  </div>
	</div>
	<?php
		}
	?>