<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TenantServiciosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicioExiste = DB::table('servicios')
            ->where('nombre', 'Servicio general')
            ->exists();
        if (!$servicioExiste) {
            DB::table('servicios')->insert([
                'id' => (string) Str::uuid(),
                'nombre' => 'Servicio general',
                'descripcion' => 'Baño + corte',
                'precio' => 15000,
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('servicios')->insert([
                'id' => (string) Str::uuid(),
                'nombre' => 'Baño',
                'descripcion' => 'con shampoo antiparasitario + limpieza de oídos.',
                'precio' => 8000,
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('servicios')->insert([
                'id' => (string) Str::uuid(),
                'nombre' => 'Corte',
                'descripcion' => 'solo corte de mantenimiento del pelo.',
                'precio' => 6000,
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
