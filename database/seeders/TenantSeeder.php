<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;
use App\Models\Turno;

//Este seeder esta para primero crear los roles y despues los usuarios, asi no hay errores
//coordina las creaciones en la bd
class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(TenantAuthorizationSeeder::class); //primero se crean los roles y permisos
        $this->call(TenantServiciosSeeder::class); // los servicios para cada peluqueria
        $this->call(TenantClientesMascotasSeeder::class); // creamos unos clientes de prueba con sus mascotas 
        $this->call(TenantUsersSeeder::class); //los usuarios de prueba
        $this->call(TenantOwnerSeeder::class); //la cuenta real del dueño principal

        Cliente::factory()->count(20)->conMascotas(1, 4)->create();
        Turno::factory()->count(8)->paraHoy()->create();
        Turno::factory()->count(25)->create();
    }
}
