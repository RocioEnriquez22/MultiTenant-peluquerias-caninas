import { Link, usePage } from "@inertiajs/react";
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
import { Scissors } from "lucide-react";

//aqui estaran los navItems que tendran los tenant acceso

type TenantSharedProps = {
    currentTenant?: {
        id: string;
        nombre: string;
        logo_url: string | null;
    } | null;
};

const footerNavItems: NavItem[] = [];

export function TenantSidebar() {
    const { currentTenant } = usePage<TenantSharedProps>().props;
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

    const headerContent = (
        <div className="flex items-center gap-2.5 overflow-hidden">
            {currentTenant?.logo_url ? (
                <img
                    src={currentTenant.logo_url}
                    alt={currentTenant.nombre}
                    className="size-12 shrink-0 rounded-full border object-cover"
                />
            ) : (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Scissors className="size-4" />
                </div>
            )}
            <span className="truncate text-sm font-semibold">
                {currentTenant?.nombre || "Mi negocio"}
            </span>
        </div>
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            {can("dashboard.view") ? (
                                <Link href="/dashboard" prefetch>
                                    {headerContent}
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
