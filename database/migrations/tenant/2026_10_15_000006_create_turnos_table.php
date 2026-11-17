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
        Schema::create('turnos', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID clave para sincronización PWA

            // Relaciones con las demas tablas
            $table->foreignUuid('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->foreignUuid('mascota_id')->constrained('mascotas')->onDelete('cascade');

            $table->foreignUuid('empleado_id')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamp('finalizado_at')->nullable();

            // Fecha y hora del turno agendado
            $table->date('fecha');
            $table->time('hora');

            // Tablero Kanban / Control visual
            $table->enum('estado', ['pendiente', 'en_proceso', 'listo', 'cancelado'])->default('pendiente');

            // Métodos de Pago
            $table->enum('metodo_pago', ['pendiente', 'efectivo', 'mercado_pago', 'transferencia'])->default('pendiente');
            $table->decimal('monto_cobrado', 10, 2)->default(0.00);

            // Automatización WhatsApp (Meta Cloud API)
            $table->boolean('confirmacion_enviada')->default(false);
            $table->boolean('recordatorio_enviado')->default(false);
            $table->timestamp('fecha_envio_recordatorio')->nullable();

            $table->text('notas_turno')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
