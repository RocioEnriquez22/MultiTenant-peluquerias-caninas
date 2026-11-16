import { AppContent } from "@/components/app-content";
import { AppShell } from "@/components/app-shell";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { TenantSidebar } from "@/components/tenant-sidebar";
import type { AppLayoutProps } from "@/types";

//tiene a TenantSidebar
export default function TenantLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <TenantSidebar />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
