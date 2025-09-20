import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import "./App.css";
import FacturasTable from './components/facturas_table';

const queryClient = new QueryClient();

export default function App() {
	return <QueryClientProvider client={queryClient}>
		<FacturasTable />
	</QueryClientProvider>
}
