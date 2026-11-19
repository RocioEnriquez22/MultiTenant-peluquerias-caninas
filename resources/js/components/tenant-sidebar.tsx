import { Link } from "@inertiajs/react";
import {
    LayoutGrid,
    Users,
    BookOpenText,
    PawPrint,
    Clock,
    CalendarDays,
} from "lucide-react";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";
import { useCan } from "@/hooks/use-can";

//aqui estaran los navItems que tendran los tenant acceso

const footerNavItems: NavItem[] = [];

export function TenantSidebar() {
    const can = useCan();
    const tenantNavItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutGrid,
            permission: "dashboard.view",
        },
        {
            title: "Empleados y permisos",
            href: "/users",
            icon: Users,
            permission: "gestionar.users",
        },
        {
            title: "Catalogo de servicios",
            href: "/servicios",
            icon: BookOpenText,
        },
        { title: "Clientes y sus mascotas", href: "/clientes", icon: PawPrint },
        {
            title: "Turnos del día",
            href: "/turnos",
            icon: Clock,
        },
        {
            title: "Calendario mensual",
            href: "/turnos/calendario",
            icon: CalendarDays,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            {can("dashboard.view") ? (
                                <Link href="/dashboard" prefetch>
                                    <span className="truncate text-sm font-semibold">
                                        Mi negocio
                                    </span>
                                </Link>
                            ) : (
                                <span className="truncate text-sm font-semibold">
                                    Mi negocio
                                </span>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={tenantNavItems} title="Mi negocio" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser showSettings={true} />
            </SidebarFooter>
        </Sidebar>
    );
}
