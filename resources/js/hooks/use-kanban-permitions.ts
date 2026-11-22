import { usePage } from "@inertiajs/react";
import type { TurnoDiarioItem } from "@/types/turnos";
type SharedProps = {
    tenantPermissions?: string[] | null;
    tenantRoles?: string[] | null;
    auth?: {
        user?: {
            id: string;
        } | null;
    };
};

export function useKanbanPermissions() {
    const { tenantPermissions, tenantRoles, auth } =
        usePage<SharedProps>().props;

    const userId = auth?.user?.id ?? null;

    const isOwner = Boolean(
        tenantRoles?.some((r) => r === "dueño_principal" || r === "dueño"),
    );
    const isPrincipalOwner = Boolean(
        tenantRoles?.some((r) => r === "dueño_principal"),
    );

    const puedeEditar = Boolean(
        tenantPermissions?.includes("turnos.update_own"),
    );
    const puedeGestionarTurno = (turno: TurnoDiarioItem): boolean => {
        if (isPrincipalOwner) {
            return true;
        }

        if (turno.estado === "listo" || turno.estado === "cancelado") {
            return false;
        }

        if (
            turno.estado === "en_proceso" &&
            turno.realizado_por &&
            turno.realizado_por.id !== userId
        ) {
            return Boolean(tenantPermissions?.includes("kanban.manage_any"));
        }

        return true;
    };

    return {
        userId,
        isOwner,
        puedeGestionarTurno,
        isPrincipalOwner,
        puedeEditar,
    };
}
