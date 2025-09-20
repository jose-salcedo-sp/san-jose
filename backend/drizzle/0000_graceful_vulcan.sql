-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `products` (
	`id_producto` numeric,
	`codigo_producto` numeric,
	`nombre_producto` numeric,
	`status_producto` numeric,
	`unidad_producto` numeric,
	`date_added` numeric,
	`precio_proveedor` numeric,
	`precio_producto` numeric,
	`etiqueta` numeric,
	`clave_sat` numeric
);
--> statement-breakpoint
CREATE TABLE `metodo_pago` (
	`id_metodo` numeric,
	`nombre_metodo` numeric,
	`clave_metodo` numeric
);
--> statement-breakpoint
CREATE TABLE `tipo_comprobantes` (
	`id_tipo` numeric,
	`descripcion_comprobante` numeric
);
--> statement-breakpoint
CREATE TABLE `detalle_factura` (
	`id_detalle` numeric,
	`numero_factura` numeric,
	`id_producto` numeric,
	`cantidad` numeric,
	`precio_venta` numeric,
	`obj_imp` numeric,
	`iva_trasladado` numeric
);
--> statement-breakpoint
CREATE TABLE `facturas` (
	`id_factura` numeric,
	`numero_factura` numeric,
	`fecha_factura` numeric,
	`id_cliente` numeric,
	`id_vendedor` numeric,
	`condiciones` numeric,
	`semana` numeric,
	`total_venta` numeric,
	`estado_factura` numeric,
	`metodo_pago` numeric,
	`uso_cfdi` numeric,
	`xml` numeric
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` numeric,
	`firstname` numeric,
	`lastname` numeric,
	`user_empresa` numeric,
	`user_name` numeric,
	`user_password_hash` numeric,
	`user_email` numeric,
	`date_added` numeric,
	`user_tipo` numeric
);
--> statement-breakpoint
CREATE TABLE `forma_de_pago` (
	`id_forma` numeric,
	`nombre_forma` numeric,
	`clave` numeric,
	`activo` numeric
);
--> statement-breakpoint
CREATE TABLE `proveedores` (
	`id_cliente` numeric,
	`nombre_cliente` numeric,
	`telefono_cliente` numeric,
	`email_cliente` numeric,
	`direccion_cliente` numeric,
	`productos_cliente` numeric,
	`status_cliente` numeric,
	`date_added` numeric
);
--> statement-breakpoint
CREATE TABLE `unidades_medida` (
	`id_unidad` numeric,
	`descripcion` numeric,
	`codigo_sat` numeric
);
--> statement-breakpoint
CREATE TABLE `uso_cfdi` (
	`id_cfd` numeric,
	`clave` numeric,
	`nombre_uso` numeric,
	`fisico` numeric,
	`moral` numeric
);
--> statement-breakpoint
CREATE TABLE `clientes` (
	`id_cliente` numeric,
	`nombre_cliente` numeric,
	`telefono_cliente` numeric,
	`email_cliente` numeric,
	`direccion_cliente` numeric,
	`status_cliente` numeric,
	`date_added` numeric,
	`contacto_cliente` numeric,
	`razon_social` numeric,
	`rfc_cliente` numeric,
	`cp_cliente` numeric,
	`tipo_cliente` numeric,
	`regimen_cliente` numeric
);
--> statement-breakpoint
CREATE TABLE `tmp` (
	`id_tmp` numeric,
	`id_producto` numeric,
	`cantidad_tmp` numeric,
	`unidad_tmp` numeric,
	`precio_tmp` numeric,
	`session_id` numeric
);
--> statement-breakpoint
CREATE TABLE `moneda_sat` (
	`id_moneda` numeric,
	`descripcion_moneda` numeric,
	`activo` numeric,
	`pais` numeric
);
--> statement-breakpoint
CREATE TABLE `currencies` (
	`id` numeric,
	`name` numeric,
	`symbol` numeric,
	`precision` numeric,
	`thousand_separator` numeric,
	`decimal_separator` numeric,
	`code` numeric
);
--> statement-breakpoint
CREATE TABLE `detalle_facturas_emitidas` (
	`id_detalle` numeric,
	`id_factura` numeric,
	`codigo_producto` numeric,
	`cantidad_producto` numeric,
	`unidad_producto` numeric,
	`descripcion_producto` numeric,
	`precio_venta` numeric,
	`importe` numeric,
	`descuento` numeric,
	`descuento_aplicado` numeric,
	`objetoimpuesto` numeric,
	`impuesto_opcion` numeric,
	`valor_trasladado` numeric,
	`ret_iva` numeric,
	`ret_isr` numeric,
	`val_ret_iva` numeric,
	`val_ret_isr` numeric
);
--> statement-breakpoint
CREATE TABLE `regimenes` (
	`id_reg` numeric,
	`clave` numeric,
	`regimen_sat` numeric,
	`tipo` numeric
);
--> statement-breakpoint
CREATE TABLE `contactos` (
	`user_id` numeric,
	`firstname` numeric,
	`lastname` numeric,
	`empresa` numeric,
	`id_empresa` numeric,
	`date_added` numeric,
	`telefono` numeric
);
--> statement-breakpoint
CREATE TABLE `perfil` (
	`id_perfil` numeric,
	`nombre_empresa` numeric,
	`direccion` numeric,
	`ciudad` numeric,
	`codigo_postal` numeric,
	`estado` numeric,
	`telefono` numeric,
	`email` numeric,
	`impuesto` numeric,
	`moneda` numeric,
	`logo_url` numeric,
	`emisor_factura` numeric,
	`rfc_emisor` numeric,
	`cp_emisor` numeric,
	`regimen_emisor` numeric
);
--> statement-breakpoint
CREATE TABLE `configuraciones` (
	`id_config` numeric,
	`pac` numeric,
	`version` numeric,
	`ruta_timbrado` numeric,
	`proveedor` numeric,
	`usuario` numeric,
	`palabra_paso` numeric,
	`ruta_keys` numeric,
	`predeterminado` numeric,
	`ruta_pac` numeric,
	`utilidades_pac` numeric,
	`registro_cliente_pac` numeric,
	`cancelacion_pac` numeric
);
--> statement-breakpoint
CREATE TABLE `facturas_emitidas` (
	`id_factura` numeric,
	`numero_factura` numeric,
	`fecha_factura` numeric,
	`lugar_expedicion` numeric,
	`id_cliente_emisor` numeric,
	`rfc_emisor` numeric,
	`id_cliente_receptor` numeric,
	`rfc_receptor` numeric,
	`forma_pago_f` numeric,
	`metodo_pago_f` numeric,
	`moneda_f` numeric,
	`uso_cfdi_f` numeric,
	`tipo_comprobante` numeric,
	`id_cliente_propietario` numeric,
	`tipo_impuesto` numeric,
	`subtotal` numeric,
	`impuesto` numeric,
	`total_venta` numeric,
	`saldo` numeric,
	`impuestos_retenidos` numeric,
	`impuestos_trasladados` numeric,
	`status_factura` numeric,
	`codigo_mf` numeric,
	`fecha_timbrado` numeric,
	`val_iva_trasladado` numeric,
	`val_iva_retenido` numeric,
	`val_isr_retenido` numeric,
	`uuid` numeric,
	`certificado_no` numeric,
	`sello` numeric,
	`sello_sat` numeric,
	`certificado_sat` numeric,
	`cadena_original_sat` numeric,
	`mensaje_jason` numeric,
	`version_cfdi` numeric
);

*/