<?php

// seeder para los users de la tabla de usuarios de cada tenant(peluqueria)

namespace Database\Seeders;

use App\Models\TenantUser;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class TenantUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permisosInicialesEmpleado = [
            'dashboard.view',
            'turnos.view_all',
            'kanban.view',
            'kanban.manage_any',
        ];

        $permisosInicialesDueñoSec = [
            'dashboard.view',
            'turnos.view_all',
            'kanban.view',
            'kanban.manage_any',
            'gestionar.users',
            'gestionar.permisos',
        ];

        $users = [
            [
                'nombre' => 'Dueño',
                'apellido' => 'Prueba',
                'email' => 'dueno@example.com',
                'role' => 'dueño',
                'permissions' => $permisosInicialesDueñoSec
            ],
            [
                'nombre' => 'Empleado',
                'apellido' => 'Uno',
                'email' => 'empleado1@example.com',
                'role' => 'empleado',
                'permissions' => $permisosInicialesEmpleado,
            ],
            [
                'nombre' => 'Empleado',
                'apellido' => 'Dos',
                'email' => 'empleado2@example.com',
                'role' => 'empleado',
                'permissions' => $permisosInicialesEmpleado,
            ],
        ];

        foreach ($users as $userDatos) {
            $user = TenantUser::updateOrCreate(
                ['email' => $userDatos['email']],
                [
                    'nombre' => $userDatos['nombre'],
                    'apellido' => $userDatos['apellido'],
                    'activo' => true,
                    'password' => '1234',
                ]
            );

            $user->syncRoles([$userDatos['role']]);
            $user->syncPermissions($userDatos['permissions']);
        }
    }
}
