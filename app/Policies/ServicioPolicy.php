<?php

namespace App\Policies;

use App\Models\Servicio;
use App\Models\TenantUser;
use Illuminate\Auth\Access\Response;

class ServicioPolicy
{
    public function viewAny(TenantUser $user): bool
    {
        return true;
    }

    public function create(TenantUser $user): bool
    {
        return $this->isPrincipalOwner($user) ||
            $user->hasPermissionTo('gestionar.servicios', 'tenant');
    }

    public function update(TenantUser $user, Servicio $servicio): bool
    {
        return $this->isPrincipalOwner($user) ||
            $user->hasPermissionTo('gestionar.servicios', 'tenant');
    }

    public function toggleStatus(TenantUser $user, Servicio $servicio): bool
    {
        return $this->isPrincipalOwner($user) ||
            $user->hasPermissionTo('gestionar.servicios', 'tenant');
    }

    public function delete(TenantUser $user, Servicio $servicio): bool
    {
        return $this->isPrincipalOwner($user) ||
            $user->hasPermissionTo('gestionar.servicios', 'tenant');
    }

    public function notifCorreo(TenantUser $user)
    {
        if (! $user instanceof TenantUser) {
            return false;
        }
        return ($user->hasRole('dueño', 'tenant') && !$user->hasRole('dueño_principal', 'tenant'));
    }

    private function isPrincipalOwner(TenantUser $user): bool
    {
        return $user->hasRole('dueño_principal', 'tenant');
    }
}
