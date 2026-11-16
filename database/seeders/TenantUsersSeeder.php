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
            'turnos.view_own',
            'turnos.create_own',
            'turnos.update_own',
            'turnos.cancel_own',
            'kanban.view',
            'kanban.manage_any',
        ];
        $users = [
            [
                'nombre' => 'Dueño',
                'apellido' => 'Prueba',
                'email' => 'dueno@example.com',
                'role' => 'dueño',
                'permissions' => Permission::query()
                    ->where('guard_name', 'tenant')
                    ->pluck('name')
                    ->all(),
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
