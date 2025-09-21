import FacturasTable from '@/components/facturas_table'
import { createFileRoute } from '@tanstack/react-router'
import { type } from "arktype";

const routeParams = type({
    search: "string?",
    page: 'number?',
    perPage: 'number?'
})

export const Route = createFileRoute('/')({
    component: Index,
    validateSearch: routeParams
})

function Index() {
    return (
        <div className="p-2">
            <FacturasTable />
        </div>
    )
}