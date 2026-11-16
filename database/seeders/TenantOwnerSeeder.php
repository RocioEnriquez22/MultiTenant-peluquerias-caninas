<?php

namespace Database\Seeders;

use App\Models\TenantUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use RuntimeException;

class TenantOwnerSeeder extends Seeder
{
    public function run(): void
    {
        $ownerName = tenant('nombre_dueño');
        $ownerEmail = tenant('email_contacto');
        $ownerPhone = tenant('telefono');

        if (
            ! is_string($ownerName)
            || trim($ownerName) === ''
            || ! is_string($ownerEmail)
            || trim($ownerEmail) === ''
        ) {
            throw new RuntimeException(
                'No se pueden crear el dueño principal: faltan nombre o email en el tenant.'
            );
        }

        $owner = TenantUser::firstOrCreate( //para evitar crear otra cuenta con el mismo email
            ['email' => trim($ownerEmail)],
            [
                'nombre' => trim($ownerName),
                'apellido' => null,
                'telefono' => $ownerPhone,
                'password' => 'admin',
                'activo' => true,
            ]
        );

        $owner->syncRoles(['dueño', 'dueño_principal']);
    }
}
