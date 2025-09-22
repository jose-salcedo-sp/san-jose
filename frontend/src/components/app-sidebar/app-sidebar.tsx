import type { FileRoutesByPath } from "@tanstack/react-router"
import {
  BarcodeIcon,
  BoxesIcon,
  LogsIcon,
  type LucideIcon,
  UsersIcon,
} from "lucide-react"
import type * as React from "react"
import { NavMain } from '@/components/app-sidebar/nav-main'
import { NavUser } from '@/components/app-sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

export type NavItem = { title: string; to: keyof FileRoutesByPath; icon: LucideIcon };
type Data = {
  user: any,
  navMain: NavItem[]
}

const data: Data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Productos",
      to: "/app/productos",
      icon: BarcodeIcon
    },
    {
      title: "Clientes",
      to: "/app/clientes",
      icon: UsersIcon
    },
    {
      title: "Proveedores",
      to: "/app/proveedores",
      icon: BoxesIcon
    },
    {
      title: "Ordenes de Compra",
      to: "/app/facturas",
      icon: LogsIcon
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center">
          <div className="text-sidebar-primary-foreground flex aspect-square max-w-full items-center justify-center">
            <img src="/san_jose.png" alt="San José Logo" className="h-full" />
          </div>
          <div className="grid flex-1 text-left text-lg leading-tight">
            <span className="truncate font-medium">San José</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
