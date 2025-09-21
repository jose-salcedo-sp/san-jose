import FacturasTable from '@/components/facturas_table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <FacturasTable />
        </div>
    )
}