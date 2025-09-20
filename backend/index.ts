import cors from "@elysiajs/cors";
import { desc, eq, like, or, sql } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { clientes, facturas } from "./drizzle/schema";

const app = new Elysia()
    .use(cors())
    .get(
        "/facturas",
        async ({ query }) => {
            const search = query?.search?.trim() ?? "";
            const page = query.page ?? 1;
            const perPage = query.perPage ?? 20;
            const offset = (page - 1) * perPage;

            const likeQ = search ? sql`'%' || ${search} || '%'` : null;
            const searchWhere =
                search.length > 0
                    ? or(like(clientes.nombreCliente, likeQ!), like(facturas.numeroFactura, likeQ!))
                    : undefined;

            // COUNT
            const totalCount = (await db
                .select({ totalCount: sql<number>`count(*)` })
                .from(facturas)
                .innerJoin(clientes, eq(facturas.idCliente, clientes.idCliente))
                .where(searchWhere) // join already enforces the relationship
                .execute())[0];

            // PAGE
            const rows = await db
                .select({
                    idFactura: facturas.idFactura,
                    numeroFactura: facturas.numeroFactura,
                    fechaFactura: facturas.fechaFactura,
                    idCliente: facturas.idCliente,
                    idVendedor: facturas.idVendedor,
                    condiciones: facturas.condiciones,
                    semana: facturas.semana,
                    totalVenta: facturas.totalVenta,
                    estadoFactura: facturas.estadoFactura,
                    metodoPago: facturas.metodoPago,
                    usoCfdi: facturas.usoCfdi,
                    xml: facturas.xml,
                    nombreCliente: clientes.nombreCliente,
                    telefonoCliente: clientes.telefonoCliente,
                    emailCliente: clientes.emailCliente,
                    direccionCliente: clientes.direccionCliente,
                    statusCliente: clientes.statusCliente,
                    dateAdded: clientes.dateAdded,
                    contactoCliente: clientes.contactoCliente,
                    razonSocial: clientes.razonSocial,
                    rfcCliente: clientes.rfcCliente,
                    cpCliente: clientes.cpCliente,
                    tipoCliente: clientes.tipoCliente,
                    regimenCliente: clientes.regimenCliente,
                })
                .from(facturas)
                .innerJoin(clientes, eq(facturas.idCliente, clientes.idCliente))
                .where(searchWhere)
                .orderBy(desc(facturas.numeroFactura))
                .limit(perPage)
                .offset(offset)
                .execute();

            return {
                data: rows,
                count: totalCount?.totalCount,
                page,
                perPage,
                totalPages: Math.max(1, Math.ceil((totalCount?.totalCount ?? 0) / perPage)),
            };
        },
        {
            query: t.Object({
                search: t.Optional(t.String()),
                page: t.Optional(t.Numeric()),
                perPage: t.Optional(t.Numeric()),
            }),
        }
    )
    .listen(3001);

export type BackendApi = typeof app;
console.log("Backend running at http://localhost:3001");

