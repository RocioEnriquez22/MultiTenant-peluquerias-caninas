import { usePage } from "@inertiajs/react";

type SharedProps = {
    tenantPermissions: string[] | null;
};

export function useCan() {
    const { tenantPermissions } = usePage<SharedProps>().props;

    return (permission: string): boolean =>
        tenantPermissions?.includes(permission) ?? false;
}
