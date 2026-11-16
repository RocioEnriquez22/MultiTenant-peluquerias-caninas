<?php

namespace App\Policies;

use App\Models\TenantUser;

class TenantUserPolicy
{
    public function create(TenantUser $actor): bool
    {
        return $this->canManageUsers($actor);
    }

    public function assignOwnerRole(TenantUser $actor): bool
    {
        return $this->canManageUsers($actor)
            && $actor->hasRole('dueño_principal', 'tenant');
    }

    public function update(TenantUser $actor, TenantUser $target): bool
    {
        return $this->canManageTarget($actor, $target);
    }

    public function toggleStatus(TenantUser $actor, TenantUser $target): bool
    {
        return ! $actor->is($target)
            && $this->canManageTarget($actor, $target);
    }

    public function delete(TenantUser $actor, TenantUser $target): bool
    {
        return ! $actor->is($target)
            && $this->canManageTarget($actor, $target);
    }

    public function managePermissions(TenantUser $actor, TenantUser $target): bool
    {
        return $actor->can('gestionar.permisos')
            && $this->canManageTarget($actor, $target);
    }

    private function canManageUsers(TenantUser $actor): bool
    {
        return $actor->hasRole('dueño', 'tenant')
            && $actor->can('gestionar.users');
    }

    private function canManageTarget(TenantUser $actor, TenantUser $target): bool
    {
        if (! $this->canManageUsers($actor)) {
            return false;
        }

        if ($target->hasRole('dueño_principal', 'tenant')) {
            return false;
        }

        if ($target->hasRole('empleado', 'tenant')) {
            return true;
        }

        if ($target->hasRole('dueño', 'tenant')) {
            return $actor->hasRole('dueño_principal', 'tenant');
        }

        return false;
    }
}
