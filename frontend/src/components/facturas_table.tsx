import { useQuery } from "@tanstack/react-query";
import { FileUp, Printer, Search, SquarePen, Trash } from "lucide-react";
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
import { Input } from "./ui/input";

async function getFacturas() {
    return (await client.facturas.get()).data;
}

export default function FacturasTable() {
    const query = useQuery({ queryKey: ['facturas'], queryFn: getFacturas });

    return <Suspense fallback={<span>loading...</span>}>
        <div className="space-y-4">
            <div className="flex items-center space-x-2 bg-background/50 p-4 rounded-lg border">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por número, cliente, contacto o estado..."
                    value={""}
                    onChange={(e) => { }}
                    className="max-w-sm"
                />
                {/* {searchTerm && (
                    <Button variant="ghost" size="sm" onClick={() => {}}>
                        Limpiar
                    </Button>
                )} */}
            </div>
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
                    {query.data?.count > 0
                        ? query.data?.data.map(row => {
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
                        })
                        : <TableRow>
                            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                {true
                                    ? "No se encontraron facturas que coincidan con tu búsqueda."
                                    : "No hay facturas disponibles."}
                            </TableCell>
                        </TableRow>

                    }
                </TableBody>
            </Table>
        </div>
    </Suspense>
}