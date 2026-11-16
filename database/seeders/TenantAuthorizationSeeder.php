<?php

// seeder de roles y servicios

namespace Database\Seeders;

use App\Models\TenantUser;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class TenantAuthorizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // limpar la cache de los permisos de Spatie
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $permisoRegistrar = app(PermissionRegistrar::class);
        $permisoRegistrar->forgetCachedPermissions();

        $guard = 'tenant';
        $permisosNombres = [
            'dashboard.view',
            'turnos.view_all',
            'turnos.view_own',
            'turnos.create_own',
            'turnos.update_own',
            'turnos.cancel_own',
            'kanban.view',
            'kanban.manage_any',
            'analytics.view',
            'whatsapp.manage',
            'business_settings.manage',
            'gestionar.users',
            'gestionar.permisos',
        ];

        foreach ($permisosNombres as $permisoNombre) {
            Permission::findOrCreate($permisoNombre, $guard);
        }

        $permisoRegistrar->forgetCachedPermissions();

        // creacion de roles
        $firstOwner = Role::findOrCreate('dueño_principal', $guard);
        $owner = Role::findOrCreate('dueño', $guard);
        $empleado = Role::findOrCreate('empleado', $guard);

        // asignacion de permisos a los roles
        $firstOwner->syncPermissions($permisosNombres);
        $existingOwnerPermissions = $owner->permissions()->pluck('name')->all();

        if ($existingOwnerPermissions !== []) {
            TenantUser::role('dueño', $guard)
                ->whereDoesntHave('roles', function ($query) use ($guard) {
                    $query->where('name', 'dueño_principal')
                        ->where('guard_name', $guard);
                })
                ->get()
                ->each(function (TenantUser $tenantUser) use ($existingOwnerPermissions) {
                    $tenantUser->syncPermissions($existingOwnerPermissions);
                });
        }

        $owner->syncPermissions([]);

        $empleado->syncPermissions([]);

        $permisoRegistrar->forgetCachedPermissions();
    }
}

// syncPermission maneja los permisos, en caso de que se agregue o eliminen permisos,
// modificara bien la lista.
