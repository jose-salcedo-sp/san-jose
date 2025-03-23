<?php
		if (isset($title))
		{
	?>
<nav class="navbar navbar-default ">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
	  <img id="profile-img"  src="img/logo.png" height=50 width="180" />
     <!-- <a class="navbar-brand" href="#">Simple Invoice</a>-->
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        
		 <li class="<?php echo $active_facturas;?>"><a href="facturas2.php"><i class='glyphicon glyphicon-list-alt'></i> Orden de Compra<span class="sr-only">(current)</span></a></li> 
		<li><a href="login.php?logout"><i class='glyphicon glyphicon-off'></i> Salir</a></li>
       </ul>
     
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
	<?php
		}
	?>