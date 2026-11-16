<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->string('id')->primary(); //Identificador/codigoPelu

            $table->string('nombre_comercial');
            $table->string('nombre_dueño');
            $table->string('email_contacto');
            $table->string('telefono');
            $table->boolean('activo')->default(true); //para dar de baja o no

            // Almacena la configuración particular de PostgreSQL que genera stancl/tenancy
            $table->timestamps();
            $table->json('data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
}
