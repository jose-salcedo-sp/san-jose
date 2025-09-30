import cors from "@elysiajs/cors";
import { jwt } from '@elysiajs/jwt'
import { type } from "arktype";
import { desc, eq, like, or, sql } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "./db/db";
import { clientes, facturas, users } from "./drizzle/schema";

const app = new Elysia()
	.use(cors())
	.use(
		jwt({
			name: 'jwt',
			secret: 'The Lord of the rings'
		})
	)
	.post('/login',
		async ({ body, status, jwt }) => {
			const match = (await db.select().from(users).where(or(
				eq(users.userName, body.user_name),
				eq(users.userEmail, body.user_name)
			)))[0];
			
			if (!match || !(await Bun.password.verify(body.password, match.userPasswordHash))) return status(400, "Incorrect username or password");

			const token = await jwt.sign({
				user_id: match.userId,
				user_name: match.userName,
				user_email: match.userEmail,
				empresa: match.userEmpresa,
				firstname: match.firstname,
				lastname: match.lastname
			});

			return {
				token,
				user_id: match.userId,
				user_name: match.userName,
				user_email: match.userEmail,
				empresa: match.userEmpresa,
				firstname: match.firstname,
				lastname: match.lastname
			};
		},
		{
			body: type({
				user_name: "string",
				password: "string"
			})
		}
	)
	.get(
		"/facturas",
		async ({ query }) => {
			const search = query?.search?.trim() ?? "";
			const page = query.page ?? 1;
			const perPage = query.perPage ?? 20;
			const offset = (page - 1) * perPage;

			const searchWhere =
				search.length > 0
					? or(
							like(clientes.nombreCliente, sql`'%' || ${search} || '%'`),
							like(facturas.numeroFactura, sql`'%' || ${search} || '%'`),
						)
					: undefined;

			const totalCount = (
				await db
					.select({ totalCount: sql<number>`count(*)` })
					.from(facturas)
					.innerJoin(clientes, eq(facturas.idCliente, clientes.idCliente))
					.where(searchWhere) // join already enforces the relationship
					.execute()
			)[0]?.totalCount as unknown as number;

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
				count: totalCount,
				page,
				perPage,
				totalPages: Math.max(1, Math.ceil((totalCount ?? 0) / perPage)),
			};
		},
		{
			query: type({
				search: "string?",
				page: type("string").pipe(t => parseInt(t, 10)).optional(),
				perPage: type("string").pipe(t => parseInt(t, 10)).optional(),
			}),
		},
	)
	.listen(3001);

export type BackendApi = typeof app;
console.log("Backend running at http://localhost:3001");
