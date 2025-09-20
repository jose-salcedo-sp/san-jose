import {
	QueryClient,
	QueryClientProvider,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import "./App.css";

const queryClient = new QueryClient();

function App() {
	return <QueryClientProvider client={queryClient}>
		<Facturas />
	</QueryClientProvider>
}

async function getFacturas() {
	const facturas_query = await fetch("http://localhost:3001/facturas");
	return await facturas_query.json();
}

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

function Facturas() {
	const queryClient = useQueryClient();
	const query = useQuery({ queryKey: ['facturas'], queryFn: getFacturas });

	return <Table>
		<TableCaption>A list of your recent invoices.</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead className="w-[100px]">Invoice</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Method</TableHead>
				<TableHead className="text-right">Amount</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<TableCell className="font-medium">INV001</TableCell>
				<TableCell>Paid</TableCell>
				<TableCell>Credit Card</TableCell>
				<TableCell className="text-right">$250.00</TableCell>
			</TableRow>
		</TableBody>
	</Table>
}

export default App;
