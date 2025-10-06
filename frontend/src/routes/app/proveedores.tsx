import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { client } from "@/client";
import { col, SSTable, useTableState } from "@/components/table/table";
import type { RowFromModel } from "@/components/table/types";
import EstadoFacturaBadge, { type EstadoFactura } from "@/components/ui/estado_factura_badge";

export const Route = createFileRoute("/app/proveedores")({
	component: RouteComponent,
});

const mxnFmt = new Intl.NumberFormat("es-MX", {
	style: "currency",
	currency: "MXN",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const model = [
	col({ key: "idFactura", valueType: "number", title: "#", options: { show: true, filterable: false, sortable: false } }),
	col({
		key: "fechaFactura",
		valueType: "date",
		title: "Fecha",
		cell: ({ value }) => <>{format(value, "dd/MM/yyyy")}</>,
		options: { show: true, filterable: false, sortable: true }
	}),
	col({ key: "nombreCliente", valueType: "string", title: "Cliente", options: { show: true, filterable: true, sortable: false } }),
	col({ key: "contactoCliente", valueType: "string", title: "Solicita", options: { show: true, filterable: true, sortable: true } }),
	col({ key: "semana", valueType: "number", title: "Semana", options: { show: true, filterable: true, sortable: true } }),
	col({
		key: "statusCliente",
		valueType: "number",
		title: "Estado",
		cell: ({ value }) => <EstadoFacturaBadge estado={value as EstadoFactura} />,
		options: { show: true, filterable: true, sortable: true }
	}),
	col({
		key: "totalVenta",
		valueType: "number",
		title: "Total",
		cell: ({ value }) => <strong>{mxnFmt.format(value)}</strong>,
		options: { show: true, filterable: true, sortable: true }
	}),
] as const;

type Row = RowFromModel<typeof model>;

async function getFacturas({
	search,
	page,
	perPage,
}: {
	search?: string;
	page?: number;
	perPage?: number;
}) {
	const res = await client.facturas.get({
		query: { search, page, perPage },
	});
	return res.data;
}

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ["facturas"],
		queryFn: () => getFacturas({}),
		placeholderData: (prev) => prev,
	});

	const rows = (data?.data as unknown ?? []) as Row[];
	const [state, dispatch] = useTableState();

	console.log(state)
	
	return <SSTable data={rows} columnModel={model} state={state} dispatch={dispatch} />
}