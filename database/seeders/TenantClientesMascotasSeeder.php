<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TenantClientesMascotasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clientes = [
            [
                'id' => '10000000-0000-4000-8000-000000000001',
                'nombre' => 'Ana',
                'apellido' => 'García',
                'telefono' => '+5491100000001',
                'email' => 'ana.garcia@example.test',
                'direccion' => null,
                'notas' => 'Cliente de prueba.',
                'activo' => true,
            ],
            [
                'id' => '10000000-0000-4000-8000-000000000002',
                'nombre' => 'Luis',
                'apellido' => 'Pérez',
                'telefono' => '+5491100000002',
                'email' => 'luis.perez@example.test',
                'direccion' => null,
                'notas' => null,
                'activo' => true,
            ],
        ];
        foreach ($clientes as $cliente) {
            $existe = DB::table('clientes')
                ->where('id', $cliente['id'])
                ->exists();

            if (! $existe) {
                $cliente['created_at'] = now();
                $cliente['updated_at'] = now();

                DB::table('clientes')->insert($cliente);
            }
        }
        $mascotas = [
            [
                'id' => '20000000-0000-4000-8000-000000000001',
                'cliente_id' => '10000000-0000-4000-8000-000000000001',
                'nombre' => 'Luna',
                'especie_raza' => 'Caniche',
                'dimension' => 'Pequeño',
                'observaciones' => 'Alergia a ciertos champús.',
                'activo' => true,
            ],
            [
                'id' => '20000000-0000-4000-8000-000000000002',
                'cliente_id' => '10000000-0000-4000-8000-000000000001',
                'nombre' => 'Toby',
                'especie_raza' => 'Mestizo',
                'dimension' => 'Mediano',
                'observaciones' => 'Se pone nervioso con el secador.',
                'activo' => true,
            ],
            [
                'id' => '20000000-0000-4000-8000-000000000003',
                'cliente_id' => '10000000-0000-4000-8000-000000000002',
                'nombre' => 'Mora',
                'especie_raza' => 'Golden Retriever',
                'dimension' => 'Grande',
                'observaciones' => null,
                'activo' => true,
            ],
        ];

        foreach ($mascotas as $mascota) {
            $existe = DB::table('mascotas')
                ->where('id', $mascota['id'])
                ->exists();

            if (! $existe) {
                $mascota['created_at'] = now();
                $mascota['updated_at'] = now();

                DB::table('mascotas')->insert($mascota);
            }
        }
    }
}
