import { Head } from "@inertiajs/react";
import AppearanceTabs from "@/components/appearance-tabs";
import Heading from "@/components/heading";
import TenantSettingsLayout from "@/layouts/settings/tenants/settings-layout";

export default function TenantAppearanceSettings() {
    return (
        <TenantSettingsLayout>
            <Head title="Apariencia" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Apariencia"
                    description="Personaliza el tema visual (claro, oscuro o sistema)"
                />
                <AppearanceTabs />
            </div>
        </TenantSettingsLayout>
    );
}
