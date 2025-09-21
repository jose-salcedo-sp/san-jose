import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { ChevronLeft, ChevronRight, FileUp, Printer, Search, SquarePen, Trash } from "lucide-react";
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

async function getFacturas({ search, page, perPage }: { search?: string; page: number; perPage: number }) {
    const res = await client.facturas.get({
        query: { search, page, perPage },
    });
    return res.data;
}

import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/');

export default function FacturasTable() {
    const navigate = route.useNavigate();
    const { search = "", page = 1, perPage = 20 } = route.useSearch();
    const debouncedSearch = useDebounce(search, 300);

    const { data, isSuccess } = useQuery({
        queryKey: ["facturas", debouncedSearch, page, perPage],
        queryFn: () => getFacturas({ search: debouncedSearch, page, perPage }),
        placeholderData: (prev) => prev,
    });

    function setSearch(next: Partial<{ search?: string; page?: number; perPage?: number }>) {
        navigate({
            search: (old) => {
                const merged = { ...old, ...next };
                if (!merged.search) delete merged.search;
                return merged;
            },
            replace: true,
        });
    }

    return <Suspense fallback={<span>loading...</span>}>
        <div className="space-y-4">
            <div className="flex">
                <div className="flex flex-1 items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por número, cliente, contacto o estado..."
                        value={search}
                        onChange={(e) => setSearch({ search: e.target.value, page: 1 })}
                        className="max-w-sm"
                    />
                    {search && (
                        <Button variant="ghost" size="sm" onClick={() => setSearch({ search: "", page: 1 })}>
                            Limpiar
                        </Button>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSearch({ page: page - 1 })} disabled={page === 1}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center space-x-1">
                            {(isSuccess && data) && Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                                let pageNumber: number;
                                if (data.totalPages <= 5) {
                                    pageNumber = i + 1
                                } else if (page <= 3) {
                                    pageNumber = i + 1
                                } else if (page >= data.totalPages - 2) {
                                    pageNumber = data.totalPages - 4 + i
                                } else {
                                    pageNumber = page - 2 + i
                                }

                                return (
                                    <Button
                                        key={pageNumber}
                                        variant={page === pageNumber ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSearch({ page: pageNumber })}
                                        className="w-8 h-8 p-0"
                                    >
                                        {pageNumber}
                                    </Button>
                                )
                            })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSearch({ page: page + 1 })}
                            disabled={page === data?.totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
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
                    {data?.count > 0
                        ? data?.data.map(row => {
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
                                {search
                                    ? "No se encontraron facturas que coincidan con tu búsqueda."
                                    : "No hay facturas disponibles."}
                            </TableCell>
                        </TableRow>

                    }
                </TableBody>
            </Table>
        </div>
    </Suspense >
}