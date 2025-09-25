import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

// Import the generated route tree
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthStoreContextProvider, useAuthStore, type AuthStore } from "./contexts/auth";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: { auth: undefined as unknown as AuthStore },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

function AppRouter() {
	const auth = useAuthStore()
	const ctx = useMemo(() => ({ auth }), [auth])
	return <RouterProvider router={router} context={ctx} />
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthStoreContextProvider>
				<AppRouter />
			</AuthStoreContextProvider>
		</QueryClientProvider>
	</StrictMode>,
);
