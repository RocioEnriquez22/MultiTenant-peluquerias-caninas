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
        <AppShell
            variant="sidebar"
            className="bg-[radial-gradient(ellipse_at_top_left,_#bbf7d0_0%,_#f8fafc_45%,_#dbeafe_100%)] dark:bg-none"
        >
            <TenantSidebar />
            <AppContent
                variant="sidebar"
                className="min-w-0 overflow-x-clip bg-[#F9FDFB] shadow-[0_8px_30px_rgb(15,23,42,0.06)] ring-1 ring-black/[0.03] md:my-3 md:mr-2 md:ml-2 md:min-h-[calc(100svh-1rem)] md:rounded-2xl dark:bg-background"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
