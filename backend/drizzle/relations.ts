import { relations } from "drizzle-orm";
import {
    clientes,
    contactos,
    currencies,
    facturas,
    facturasEmitidas,
    formaDePago,
    metodoPago,
    monedaSat,
    perfil,
    products,
    proveedores,
    regimenes,
    tipoComprobantes,
    users,
    usoCfdi,
} from "./schema";

// ---------- clientes ----------
export const clientesRelations = relations(clientes, ({ many, one }) => ({
    facturas: many(facturas),
    contactos: many(contactos),
    regimen: one(regimenes, {
        fields: [clientes.regimenId],
        references: [regimenes.id],
    }),
}));

// ---------- proveedores ----------
export const proveedoresRelations = relations(proveedores, ({ many, one }) => ({
    productos: many(products),
    contactos: many(contactos),
    regimen: one(regimenes, {
        fields: [proveedores.regimenId],
        references: [regimenes.id],
    }),
}));

// ---------- contactos ----------
export const contactosRelations = relations(contactos, ({ one }) => ({
    cliente: one(clientes, {
        fields: [contactos.clienteId],
        references: [clientes.id],
    }),
    proveedor: one(proveedores, {
        fields: [contactos.proveedorId],
        references: [proveedores.id],
    }),
}));

// ---------- perfil ----------
export const perfilRelations = relations(perfil, ({ one }) => ({
    user: one(users, {
        fields: [perfil.userId],
        references: [users.id],
    }),
}));

// ---------- products ----------
export const productsRelations = relations(products, ({ one }) => ({
    proveedor: one(proveedores, {
        fields: [products.proveedorId],
        references: [proveedores.id],
    }),
}));

// ---------- facturas ----------
export const facturasRelations = relations(facturas, ({ one, many }) => ({
    cliente: one(clientes, {
        fields: [facturas.clienteId],
        references: [clientes.id],
    }),
    metodoPago: one(metodoPago, {
        fields: [facturas.metodoPagoId],
        references: [metodoPago.id],
    }),
    formaPago: one(formaDePago, {
        fields: [facturas.formaPagoId],
        references: [formaDePago.id],
    }),
    moneda: one(currencies, {
        fields: [facturas.monedaId],
        references: [currencies.id],
    }),
    usoCfdi: one(usoCfdi, {
        fields: [facturas.usoCfdiId],
        references: [usoCfdi.id],
    }),
    tipoComprobante: one(tipoComprobantes, {
        fields: [facturas.tipoComprobanteId],
        references: [tipoComprobantes.id],
    }),
    facturasEmitidas: many(facturasEmitidas),
}));

// ---------- facturas_emitidas ----------
export const facturasEmitidasRelations = relations(facturasEmitidas, ({ one }) => ({
    factura: one(facturas, {
        fields: [facturasEmitidas.facturaId],
        references: [facturas.id],
    }),
    usuario: one(users, {
        fields: [facturasEmitidas.usuarioId],
        references: [users.id],
    }),
}));

// ---------- users ----------
export const usersRelations = relations(users, ({ many }) => ({
    facturasEmitidas: many(facturasEmitidas),
    perfil: many(perfil),
}));

// ---------- regimenes ----------
export const regimenesRelations = relations(regimenes, ({ many }) => ({
    clientes: many(clientes),
    proveedores: many(proveedores),
}));

// ---------- lookup tables ----------
export const formaDePagoRelations = relations(formaDePago, ({ many }) => ({
    facturas: many(facturas),
}));

export const metodoPagoRelations = relations(metodoPago, ({ many }) => ({
    facturas: many(facturas),
}));

export const currenciesRelations = relations(currencies, ({ many }) => ({
    facturas: many(facturas),
}));

export const usoCfdiRelations = relations(usoCfdi, ({ many }) => ({
    facturas: many(facturas),
}));

export const tipoComprobantesRelations = relations(tipoComprobantes, ({ many }) => ({
    facturas: many(facturas),
}));

// export const monedaSatRelations = relations(monedaSat, ({ }) => ({}));
