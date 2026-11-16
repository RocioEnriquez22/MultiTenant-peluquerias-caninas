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
        Schema::create('turno_servicio', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID para soporte offline PWA

            $table->foreignUuid('turno_id')->constrained('turnos')->onDelete('cascade');
            $table->foreignUuid('servicio_id')->constrained('servicios')->onDelete('restrict');

            // Guardar el precio histórico al momento de agendar (por si el precio del catálogo cambia después)
            $table->decimal('precio_historico', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turno_x_srvicio');
    }
};
