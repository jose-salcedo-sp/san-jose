import { useQuery } from "@tanstack/react-query";
import { FileUp, Printer, SquarePen, Trash } from "lucide-react";
import { Suspense } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { client } from '../client';
import { Button } from "./ui/button";
import EstadoFacturaBadge from "./ui/estado_factura_badge";

async function getFacturas() {
	return (await client.facturas.get()).data;
}

export default function FacturasTable() {
	const query = useQuery({ queryKey: ['facturas'], queryFn: getFacturas });

	return <Suspense fallback={<span>loading...</span>}>
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>#</TableHead>
					<TableHead>Fecha</TableHead>
					<TableHead>Cliente</TableHead>
					<TableHead>Solicita</TableHead>
					<TableHead>Semana</TableHead>
					<TableHead>Año</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead>Total</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{query.data?.data.map(row => {
					return <TableRow key={row.idFactura}>
						<TableCell className="font-bold">{row.numeroFactura}</TableCell>
						<TableCell>{new Date(row.fechaFactura).toLocaleDateString()}</TableCell>
						<TableCell>{row.nombreCliente}</TableCell>
						<TableCell>{row.contactoCliente}</TableCell>
						<TableCell>{row.semana}</TableCell>
						<TableCell>{new Date(row.fechaFactura).getFullYear()}</TableCell>
						<TableCell>
                            <EstadoFacturaBadge estado={row.estadoFactura} />
                        </TableCell>
						<TableCell>${row.totalVenta}</TableCell>
						<TableCell>
                            <Button variant="outline">
                                <SquarePen />
                            </Button>
                            <Button variant="outline">
                                <Printer />
                            </Button>
                            <Button variant="outline">
                                <FileUp />
                            </Button>
                            <Button variant="destructive">
                                <Trash />
                            </Button>
                        </TableCell>
					</TableRow>
				})}
			</TableBody>
		</Table>
	</Suspense>
}