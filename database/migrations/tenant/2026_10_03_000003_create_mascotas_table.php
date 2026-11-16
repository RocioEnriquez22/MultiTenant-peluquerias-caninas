<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mascotas', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Relación por UUID con la tabla clientes
            $table->foreignUuid('cliente_id')
                ->constrained('clientes')
                ->onDelete('cascade');

            $table->string('nombre');
            $table->string('especie_raza')->nullable(); // Ej: 'Caniche', 'Golden Retriever'
            $table->string('dimension')->nullable(); // Ej: 'Chico', 'Mediano', 'Grande'
            $table->text('observaciones')->nullable(); // Notas de baño/corte
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mascotas');
    }
};
