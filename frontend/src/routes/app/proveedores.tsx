import { SSTable } from "@/components/table/table";
import type { RowFromModel, State } from "@/components/table/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/proveedores")({
	component: RouteComponent,
});

const model = [
	{ key: "id", valueType: "number", title: "#", options: { show: true, filterable: true, sortable: false } },
	{ key: "name", valueType: "string", title: "Name", options: { show: true, filterable: false, sortable: true } },
	{ key: "active", valueType: "boolean", title: "IsActive", options: { show: true, filterable: true, sortable: true } },
	{ key: "date", valueType: "date", title: "Date", options: { show: true, filterable: false, sortable: false } },
] as const;

type Row = RowFromModel<typeof model>;

function RouteComponent() {
	const data: Row[] = [
		{ id: 5, name: "Test", active: true, date: new Date() },
	];

	return <SSTable columnModel={model} data={data} />;
}