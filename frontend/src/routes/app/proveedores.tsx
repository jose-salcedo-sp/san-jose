import { SSTable } from "@/components/table/table";
import type { FilterDescriptor, RowFromModel } from "@/components/table/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/proveedores")({
	component: RouteComponent,
});

const model = [
	{ key: "id", valueType: "number", title: "ID", options: { show: true, filterable: true, sortable: true } },
	{ key: "name", valueType: "string", title: "Name", options: { show: true, filterable: true, sortable: true } },
	{ key: "active", valueType: "boolean", title: "Is Active", options: { show: true, filterable: true, sortable: true } },
	{ key: "date", valueType: "date", title: "Date", options: { show: true, filterable: true, sortable: true } },
] as const;

type Row = RowFromModel<typeof model>;

const fd: FilterDescriptor<typeof model> = {
  key: "date",
  operation: "range",
  from: new Date("2025-01-01"),
  to:   new Date("2025-12-31"),
};

function RouteComponent() {
	const data: Row[] = [
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
		{ id: 5, name: "Test", active: true, date: new Date() },
	];

	return <SSTable columnModel={model} data={data} />;
}