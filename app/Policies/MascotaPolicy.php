<?php

namespace App\Policies;

use App\Models\Mascota;
use App\Models\TenantUser;

class MascotaPolicy
{
    public function viewAny(TenantUser $currentUser): bool
    {
        if (! $currentUser instanceof TenantUser || ! $currentUser->activo) {
            return false;
        }
        return $currentUser->hasAnyRole(['dueño_principal', 'dueño', 'empleado'], 'tenant');
    }

    public function view(TenantUser $user, Mascota $mascota): bool
    {
        return true;
    }

    public function create(TenantUser $user): bool
    {
        return true;
    }

    public function update(TenantUser $user, Mascota $mascota): bool
    {
        return true;
    }

    public function archivar(TenantUser $user, Mascota $mascota): bool
    {
        return $user->hasRole(['dueño_principal', 'dueño'], 'tenant');
    }
}
