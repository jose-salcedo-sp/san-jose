import { createFileRoute } from '@tanstack/react-router';
import { type } from "arktype";
import FacturasTable from '@/components/facturas_table';

const routeParams = type({
    search: "string?",
    page: 'number?',
    perPage: 'number?'
})

export const Route = createFileRoute('/app/facturas')({
    component: RouteComponent,
    validateSearch: routeParams
})

function RouteComponent() {
    return <FacturasTable />
}
