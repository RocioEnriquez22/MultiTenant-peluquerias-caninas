<?php

namespace App\Policies;

use App\Models\Cliente;
use App\Models\TenantUser;

class ClientePolicy
{
    public function viewAny(TenantUser $user): bool
    {
        return true;
    }

    public function view(TenantUser $user, Cliente $cliente): bool
    {
        return true;
    }

    public function create(TenantUser $user): bool
    {
        return true;
    }
    public function update(TenantUser $user, Cliente $cliente): bool
    {
        return true;
    }

    public function archivar(TenantUser $user, ?Cliente $cliente = null): bool
    {
        return $user->hasRole(['dueño_principal', 'dueño'], 'tenant');
    }
}
