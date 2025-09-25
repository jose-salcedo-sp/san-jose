import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/components/login";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginPage />;
}
