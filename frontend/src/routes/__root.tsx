import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthStore } from '@/contexts/auth';

export const Route =  createRootRouteWithContext<{ auth: AuthStore }>()({
  component: () => <>
		<Outlet />
		<TanStackRouterDevtools />
	</>
})
