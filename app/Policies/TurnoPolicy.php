<?php

namespace App\Policies;

use App\Models\TenantUser;
use App\Models\Turno;
use Illuminate\Auth\Access\Response;

class TurnoPolicy
{
    private function isAuthorizedTenantUser(TenantUser $user)
    {
        if (! $user instanceof TenantUser || ! $user->activo) {
            return false;
        }
        return $user->hasAnyRole(['dueño_principal', 'dueño', 'empleado'], 'tenant');
    }
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(TenantUser $user): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }

        return $user->hasAnyRole(['dueño_principal'], 'tenant')
            || $user->can('turnos.view_all')
            || $user->can('kanban.view');
    }


    /*PAra que cualquier usuario pueda ver los detalles de los turnos */

    public function view(TenantUser $user, Turno $turno): bool
    {
        return $this->viewAny($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(TenantUser $user): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }
        return $user->hasAnyRole(['dueño_principal', 'dueño'], 'tenant')
            || $user->can('turnos.create_own');
    }


    /**
     * Determine whether the user can update the model.
     */
    public function update(TenantUser $user, Turno $turno): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }
        return $user->hasAnyRole(['dueño_principal', 'dueño'], 'tenant')
            || $user->can('turnos.update_own')
            || $user->can('kanban.manage_any');
    }

    public function cambiarEstado(TenantUser $user, Turno $turno): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }

        if (
            $user->hasAnyRole(['dueño_principal', 'dueño', 'empleado'], 'tenant')
            || $user->can('kanban.manage_any')
            || $user->can('turnos.update_own')
        ) {
            return true;
        }

        if ($turno->estado == 'en_proceso' && $turno->empleado_id !== null && $turno->empleado_id !== $user->id) {
            return false;
        }
        return $this->viewAny($user);
    }
    /**
     * Determine whether the user can delete the model.
     */
    public function delete(TenantUser $user, Turno $turno): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }
        return $user->hasAnyRole(['dueño_principal', 'dueño'], 'tenant');
    }

    public function export(TenantUser $user): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }
        return $user->hasAnyRole(['dueño_principal'], 'tenant') ||
            $user->can("analytics.report");
    }
}
