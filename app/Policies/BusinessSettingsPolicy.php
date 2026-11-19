<?php

namespace App\Policies;

use App\Models\TenantUser;
use App\Models\Tenant;
use Illuminate\Contracts\Auth\Authenticatable;

class BusinessSettingsPolicy
{
    public function manage(TenantUser $user, ?Tenant $tenant = null): bool
    {
        if (! $user instanceof TenantUser || ! $user->activo) {
            return false;
        }

        return $user->hasRole('dueño_principal', 'tenant')
            && $user->hasPermissionTo('business_settings.manage', 'tenant');
    }
}
