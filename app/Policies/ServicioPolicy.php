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
        return $this->isPrincipalOwner($user);
    }

    public function update(TenantUser $user, Servicio $servicio): bool
    {
        return $this->isPrincipalOwner($user);
    }

    public function toggleStatus(TenantUser $user, Servicio $servicio): bool
    {
        return $this->isPrincipalOwner($user);
    }

    public function delete(TenantUser $user, Servicio $servicio): bool
    {
        return $this->isPrincipalOwner($user);
    }

    private function isPrincipalOwner(TenantUser $user): bool
    {
        return $user->hasRole('dueño_principal', 'tenant');
    }
}
