import { numeric, sqliteTable } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
	idProducto: numeric("id_producto"),
	codigoProducto: numeric("codigo_producto"),
	nombreProducto: numeric("nombre_producto"),
	statusProducto: numeric("status_producto"),
	unidadProducto: numeric("unidad_producto").references(
		() => unidadesMedida.idUnidad,
		{ onDelete: "restrict", onUpdate: "cascade" },
	),
	dateAdded: numeric("date_added"),
	// id proveedor?
	precioProveedor: numeric("precio_proveedor"),
	precioProducto: numeric("precio_producto"),
	etiqueta: numeric(),
	claveSat: numeric("clave_sat"),
});

export const metodoPago = sqliteTable("metodo_pago", {
	idMetodo: numeric("id_metodo"),
	nombreMetodo: numeric("nombre_metodo"),
	claveMetodo: numeric("clave_metodo"),
});

export const tipoComprobantes = sqliteTable("tipo_comprobantes", {
	idTipo: numeric("id_tipo"),
	descripcionComprobante: numeric("descripcion_comprobante"),
});

export const detalleFactura = sqliteTable("detalle_factura", {
	idDetalle: numeric("id_detalle"),
	numeroFactura: numeric("numero_factura").references(
		() => facturas.numeroFactura,
		{ onDelete: "cascade", onUpdate: "cascade" },
	),
	idProducto: numeric("id_producto").references(() => products.idProducto, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	cantidad: numeric(),
	precioVenta: numeric("precio_venta"),
	objImp: numeric("obj_imp"),
	ivaTrasladado: numeric("iva_trasladado"),
});

export const facturas = sqliteTable("facturas", {
	idFactura: numeric("id_factura"),
	numeroFactura: numeric("numero_factura"),
	fechaFactura: numeric("fecha_factura"),
	idCliente: numeric("id_cliente").references(() => clientes.idCliente, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	idVendedor: numeric("id_vendedor").references(() => users.userId, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	condiciones: numeric(),
	semana: numeric(),
	totalVenta: numeric("total_venta"),
	estadoFactura: numeric("estado_factura"),
	metodoPago: numeric("metodo_pago").references(() => metodoPago.idMetodo, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	usoCfdi: numeric("uso_cfdi").references(() => usoCfdi.idCfd, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	xml: numeric(),
});

export const users = sqliteTable("users", {
	userId: numeric("user_id"),
	firstname: numeric(),
	lastname: numeric(),
	userEmpresa: numeric("user_empresa").references(() => perfil.idPerfil, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	userName: numeric("user_name"),
	userPasswordHash: numeric("user_password_hash"),
	userEmail: numeric("user_email"),
	dateAdded: numeric("date_added"),
	userTipo: numeric("user_tipo"),
});

export const formaDePago = sqliteTable("forma_de_pago", {
	idForma: numeric("id_forma"),
	nombreForma: numeric("nombre_forma"),
	clave: numeric(),
	activo: numeric(),
});

export const proveedores = sqliteTable("proveedores", {
	idCliente: numeric("id_cliente"),
	nombreCliente: numeric("nombre_cliente"),
	telefonoCliente: numeric("telefono_cliente"),
	emailCliente: numeric("email_cliente"),
	direccionCliente: numeric("direccion_cliente"),
	productosCliente: numeric("productos_cliente"),
	statusCliente: numeric("status_cliente"),
	dateAdded: numeric("date_added"),
});

export const unidadesMedida = sqliteTable("unidades_medida", {
	idUnidad: numeric("id_unidad"),
	descripcion: numeric(),
	codigoSat: numeric("codigo_sat"),
});

export const usoCfdi = sqliteTable("uso_cfdi", {
	idCfd: numeric("id_cfd"),
	clave: numeric(),
	nombreUso: numeric("nombre_uso"),
	fisico: numeric(),
	moral: numeric(),
});

export const clientes = sqliteTable("clientes", {
	idCliente: numeric("id_cliente"),
	nombreCliente: numeric("nombre_cliente"),
	telefonoCliente: numeric("telefono_cliente"),
	emailCliente: numeric("email_cliente"),
	direccionCliente: numeric("direccion_cliente"),
	statusCliente: numeric("status_cliente"),
	dateAdded: numeric("date_added"),
	contactoCliente: numeric("contacto_cliente"),
	razonSocial: numeric("razon_social"),
	rfcCliente: numeric("rfc_cliente"),
	cpCliente: numeric("cp_cliente"),
	tipoCliente: numeric("tipo_cliente"),
	regimenCliente: numeric("regimen_cliente").references(() => regimenes.idReg, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
});

export const tmp = sqliteTable("tmp", {
	idTmp: numeric("id_tmp"),
	idProducto: numeric("id_producto"),
	cantidadTmp: numeric("cantidad_tmp"),
	unidadTmp: numeric("unidad_tmp"),
	precioTmp: numeric("precio_tmp"),
	sessionId: numeric("session_id"),
});

export const monedaSat = sqliteTable("moneda_sat", {
	idMoneda: numeric("id_moneda"),
	descripcionMoneda: numeric("descripcion_moneda"),
	activo: numeric(),
	pais: numeric(),
});

export const currencies = sqliteTable("currencies", {
	id: numeric(),
	name: numeric(),
	symbol: numeric(),
	precision: numeric(),
	thousandSeparator: numeric("thousand_separator"),
	decimalSeparator: numeric("decimal_separator"),
	code: numeric(),
});

export const detalleFacturasEmitidas = sqliteTable(
	"detalle_facturas_emitidas",
	{
		idDetalle: numeric("id_detalle"),
		idFactura: numeric("id_factura").references(
			() => facturasEmitidas.idFactura,
			{ onDelete: "cascade", onUpdate: "cascade" },
		),
		codigoProducto: numeric("codigo_producto").references(
			() => products.codigoProducto,
			{ onDelete: "restrict", onUpdate: "cascade" },
		),
		cantidadProducto: numeric("cantidad_producto"),
		unidadProducto: numeric("unidad_producto").references(
			() => unidadesMedida.idUnidad,
			{ onDelete: "restrict", onUpdate: "cascade" },
		),
		descripcionProducto: numeric("descripcion_producto"),
		precioVenta: numeric("precio_venta"),
		importe: numeric(),
		descuento: numeric(),
		descuentoAplicado: numeric("descuento_aplicado"),
		objetoimpuesto: numeric(),
		impuestoOpcion: numeric("impuesto_opcion"),
		valorTrasladado: numeric("valor_trasladado"),
		retIva: numeric("ret_iva"),
		retIsr: numeric("ret_isr"),
		valRetIva: numeric("val_ret_iva"),
		valRetIsr: numeric("val_ret_isr"),
	},
);

export const regimenes = sqliteTable("regimenes", {
	idReg: numeric("id_reg"),
	clave: numeric(),
	regimenSat: numeric("regimen_sat"),
	tipo: numeric(),
});

export const contactos = sqliteTable("contactos", {
	userId: numeric("user_id").references(() => users.userId, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
	firstname: numeric(),
	lastname: numeric(),
	empresa: numeric(),
	idEmpresa: numeric("id_empresa").references(() => perfil.idPerfil, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	dateAdded: numeric("date_added"),
	telefono: numeric(),
});

export const perfil = sqliteTable("perfil", {
	idPerfil: numeric("id_perfil"),
	nombreEmpresa: numeric("nombre_empresa"),
	direccion: numeric(),
	ciudad: numeric(),
	codigoPostal: numeric("codigo_postal"),
	estado: numeric(),
	telefono: numeric(),
	email: numeric(),
	impuesto: numeric(),
	moneda: numeric().references(() => currencies.id, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	logoUrl: numeric("logo_url"),
	emisorFactura: numeric("emisor_factura"),
	rfcEmisor: numeric("rfc_emisor"),
	cpEmisor: numeric("cp_emisor"),
	regimenEmisor: numeric("regimen_emisor"),
});

export const configuraciones = sqliteTable("configuraciones", {
	idConfig: numeric("id_config"),
	pac: numeric(),
	version: numeric(),
	rutaTimbrado: numeric("ruta_timbrado"),
	proveedor: numeric(),
	usuario: numeric(),
	palabraPaso: numeric("palabra_paso"),
	rutaKeys: numeric("ruta_keys"),
	predeterminado: numeric(),
	rutaPac: numeric("ruta_pac"),
	utilidadesPac: numeric("utilidades_pac"),
	registroClientePac: numeric("registro_cliente_pac"),
	cancelacionPac: numeric("cancelacion_pac"),
});

export const facturasEmitidas = sqliteTable("facturas_emitidas", {
	idFactura: numeric("id_factura"),
	numeroFactura: numeric("numero_factura"),
	fechaFactura: numeric("fecha_factura"),
	lugarExpedicion: numeric("lugar_expedicion"),
	idClienteEmisor: numeric("id_cliente_emisor").references(
		() => clientes.idCliente,
		{ onDelete: "restrict", onUpdate: "cascade" },
	),
	rfcEmisor: numeric("rfc_emisor"),
	idClienteReceptor: numeric("id_cliente_receptor").references(
		() => clientes.idCliente,
		{ onDelete: "restrict", onUpdate: "cascade" },
	),
	rfcReceptor: numeric("rfc_receptor"),
	formaPagoF: numeric("forma_pago_f").references(() => formaDePago.idForma, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	metodoPagoF: numeric("metodo_pago_f").references(() => metodoPago.idMetodo, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	monedaF: numeric("moneda_f").references(() => monedaSat.idMoneda, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	usoCfdiF: numeric("uso_cfdi_f").references(() => usoCfdi.idCfd, {
		onDelete: "restrict",
		onUpdate: "cascade",
	}),
	tipoComprobante: numeric("tipo_comprobante").references(
		() => tipoComprobantes.idTipo,
		{ onDelete: "restrict", onUpdate: "cascade" },
	),
	idClientePropietario: numeric("id_cliente_propietario").references(
		() => clientes.idCliente,
		{ onDelete: "restrict", onUpdate: "cascade" },
	),
	tipoImpuesto: numeric("tipo_impuesto"),
	subtotal: numeric(),
	impuesto: numeric(),
	totalVenta: numeric("total_venta"),
	saldo: numeric(),
	impuestosRetenidos: numeric("impuestos_retenidos"),
	impuestosTrasladados: numeric("impuestos_trasladados"),
	statusFactura: numeric("status_factura"),
	codigoMf: numeric("codigo_mf"),
	fechaTimbrado: numeric("fecha_timbrado"),
	valIvaTrasladado: numeric("val_iva_trasladado"),
	valIvaRetenido: numeric("val_iva_retenido"),
	valIsrRetenido: numeric("val_isr_retenido"),
	uuid: numeric(),
	certificadoNo: numeric("certificado_no"),
	sello: numeric(),
	selloSat: numeric("sello_sat"),
	certificadoSat: numeric("certificado_sat"),
	cadenaOriginalSat: numeric("cadena_original_sat"),
	mensajeJason: numeric("mensaje_jason"),
	versionCfdi: numeric("version_cfdi"),
});
