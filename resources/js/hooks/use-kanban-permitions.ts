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

    const canCambiarEstadoCualquiera =
        isPrincipalOwner ||
        Boolean(
            tenantPermissions?.includes("kanban.cambiar_estado_cualquiera"),
        );

    const canEditarFinalizado =
        isPrincipalOwner ||
        Boolean(tenantPermissions?.includes("turnos.editar_finalizado"));

    const puedeGestionarTurno = (turno: TurnoDiarioItem): boolean => {
        if (canCambiarEstadoCualquiera) {
            return true;
        }

        // Sin permiso especial, al llegar a 'listo' o 'cancelado' la tarjeta queda bloqueada
        if (turno.estado === "listo" || turno.estado === "cancelado") {
            return false;
        }

        // En 'en_proceso', solo el usuario que lo tomó puede moverlo
        if (
            turno.estado === "en_proceso" &&
            turno.realizado_por &&
            turno.realizado_por.id !== userId
        ) {
            return false;
        }

        return true;
    };

    const puedeEditarTurno = (turno: TurnoDiarioItem): boolean => {
        if (isPrincipalOwner) {
            return true;
        }

        if (turno.estado === "listo") {
            return canEditarFinalizado;
        }

        if (turno.estado === "cancelado") {
            return false;
        }

        return puedeGestionarTurno(turno);
    };

    return {
        userId,
        isOwner,
        isPrincipalOwner,
        canCambiarEstadoCualquiera,
        canEditarFinalizado,
        puedeGestionarTurno,
        puedeEditarTurno,
    };
}
