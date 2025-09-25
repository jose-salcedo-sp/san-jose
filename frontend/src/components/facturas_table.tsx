import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	FileUp,
	Printer,
	Search,
	SquarePen,
	Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EstadoFacturaBadge from "@/components/ui/estado_factura_badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { client } from "../client";
import { Label } from "./ui/label";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { Skeleton } from "./ui/skeleton";

async function getFacturas({
	search,
	page,
	perPage,
}: {
	search?: string;
	page: number;
	perPage: number;
}) {
	const res = await client.facturas.get({
		query: { search, page, perPage },
	});
	return res.data;
}

const mxnFmt = new Intl.NumberFormat("es-MX", {
	style: "currency",
	currency: "MXN",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const route = getRouteApi("/app/facturas");

export default function FacturasTable() {
	const navigate = route.useNavigate();
	const { search = "", page = 1, perPage = 20 } = route.useSearch();
	const [rawSearch, setRawSearch] = useState(search);
	const debouncedSearch = useDebounce(rawSearch, 300);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["facturas", debouncedSearch, page, perPage],
		queryFn: () => getFacturas({ search: debouncedSearch, page, perPage }),
		placeholderData: (prev) => prev,
	});

	function setSearchParams(
		next: Partial<{ search?: string; page?: number; perPage?: number }>,
	) {
		navigate({
			search: (old) => {
				const merged = { ...old, ...next };
				if (!merged.search) delete merged.search;
				return merged;
			},
			replace: true,
		});
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: setSearchParams changes every render
	useEffect(() => {
		setSearchParams({ search: debouncedSearch, page: 1 });
	}, [debouncedSearch]);

	const showingSkeleton = isLoading && !data;

	return (
		<div className="space-y-4">
			<div className="flex">
				<div className="flex flex-1 items-center space-x-2">
					<Search className="h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Buscar por número, cliente, contacto o estado..."
						value={rawSearch}
						onChange={(e) => setRawSearch(e.target.value)}
						className="max-w-sm"
					/>
					{rawSearch && (
						<Button variant="ghost" size="sm" onClick={() => setRawSearch("")}>
							Limpiar
						</Button>
					)}
					{isFetching && data && (
						<span className="text-xs text-muted-foreground">actualizando…</span>
					)}
				</div>

				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<Label className="whitespace-nowrap">Tamaño de página</Label>
						<Select
							value={data?.perPage ? data.perPage.toString() : "20"}
							onValueChange={(rowsPerPage) =>
								setSearchParams({ perPage: +rowsPerPage })
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
								<SelectItem value="100">100</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center gap-2">
						{data && (
							<>
								<span className="text-sm text-muted-foreground whitespace-nowrap">
									{(page - 1) * data.perPage + 1}-{page * data.perPage} of{" "}
									{data.count}
								</span>
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<Button
												aria-label="Go to previous page"
												size="icon"
												variant="ghost"
												disabled={page === 1}
												onClick={() => setSearchParams({ page: page - 1 })}
											>
												<ChevronLeftIcon className="h-4 w-4" />
											</Button>
										</PaginationItem>
										<PaginationItem>
											<Button
												aria-label="Go to next page"
												size="icon"
												variant="ghost"
												disabled={page * data.perPage >= data.count}
												onClick={() => setSearchParams({ page: page + 1 })}
											>
												<ChevronRightIcon className="h-4 w-4" />
											</Button>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</>
						)}
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
					{showingSkeleton ? (
						<SkeletonRows rows={perPage} cols={9} />
					) : data && data.count > 0 ? (
						data.data.map((row) => (
							<TableRow key={row.idFactura}>
								<TableCell className="font-bold">{row.numeroFactura}</TableCell>
								<TableCell>
									{new Date(row.fechaFactura).toLocaleDateString()}
								</TableCell>
								<TableCell>{row.nombreCliente}</TableCell>
								<TableCell>{row.contactoCliente}</TableCell>
								<TableCell>{row.semana}</TableCell>
								<TableCell>
									{new Date(row.fechaFactura).getFullYear()}
								</TableCell>
								<TableCell>
									<EstadoFacturaBadge estado={row.estadoFactura} />
								</TableCell>
								<TableCell>{mxnFmt.format(row.totalVenta)}</TableCell>
								<TableCell className="space-x-2">
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
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={9}
								className="text-center py-8 text-muted-foreground"
							>
								{rawSearch
									? "No se encontraron facturas que coincidan con tu búsqueda."
									: "No hay facturas disponibles."}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

function SkeletonRows({ rows, cols }: { rows: number; cols: number }) {
	return (
		<>
			{Array.from({ length: rows }).map((_, r) => (
				<TableRow key={`skeleton-row-${r}`}>
					{Array.from({ length: cols }).map((__, c) => (
						<TableCell key={`skeleton-cell-${r}-${c}`}>
							<Skeleton className="h-4 w-full" />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
