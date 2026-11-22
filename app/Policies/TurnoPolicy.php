<?php

namespace App\Policies;

use App\Models\TenantUser;
use App\Models\Turno;
use Illuminate\Auth\Access\Response;
use Psy\Readline\Hoa\Console;

class TurnoPolicy
{
    private function isAuthorizedTenantUser(TenantUser $user)
    {
        if (! $user instanceof TenantUser || ! $user->activo) {
            return false;
        } else {
            return true;
        }
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
            || $user->checkPermissionTo('turnos.view_all', 'tenant')
            || $user->checkPermissionTo('kanban.view', 'tenant');
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
        if ($user->hasAnyRole(['dueño_principal'], 'tenant')) {
            return true;
        }

        if (in_array($turno->estado, ['listo', 'cancelado'], true)) {
            return false;
        }
        if ($turno->estado === 'en_proceso' && $turno->empleado_id !== null && $turno->empleado_id !== $user->id) {
            return false;
        }

        return $user->checkPermissionTo('turnos.update_own', 'tenant')
            || $user->checkPermissionTo('kanban.manage_any', 'tenant');
    }

    public function cambiarEstado(TenantUser $user, Turno $turno): bool
    {
        if (! $this->isAuthorizedTenantUser($user)) {
            return false;
        }

        if ($user->hasRole('dueño_principal', 'tenant')) {
            return true;
        }

        if (in_array($turno->estado, ['listo', 'cancelado'], true)) {
            return false;
        }

        if ($turno->estado === 'en_proceso' && $turno->empleado_id !== null && $turno->empleado_id !== $user->id) {
            return false;
        }

        return $user->checkPermissionTo('kanban.manage_any', 'tenant')
            || $user->checkPermissionTo('turnos.update_own', 'tenant');
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
        return $user->hasAnyRole(['dueño_principal'], 'tenant') || $user->checkPermissionTo('analytics.report', 'tenant');
    }
}
