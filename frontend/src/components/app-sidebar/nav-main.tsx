import { Link, useMatchRoute } from "@tanstack/react-router";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NavItem } from "./app-sidebar";

export function NavMain({ items }: { items: NavItem[] }) {
	const matchRoute = useMatchRoute();

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map(({ title, to, icon: Icon }) => {
						const isActive = !!matchRoute({ to, fuzzy: true });
						return (
							<SidebarMenuItem key={title}>
								{/* asChild makes the button render the Link directly (no nested button) */}
								<SidebarMenuButton
									asChild
									tooltip={title}
									className={cn(
										"hover:bg-primary/90 hover:text-primary-foreground min-w-8 duration-200 ease-linear",
										isActive && "bg-primary text-primary-foreground",
									)}
								>
									<Link
										to={to}
										preload="intent"
										aria-current={isActive ? "page" : undefined}
									>
										<Icon />
										<span>{title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
