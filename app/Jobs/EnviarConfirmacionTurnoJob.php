<?php

namespace App\Jobs;

use App\Models\Turno;
use App\Services\WhatsAppService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class EnviarConfirmacionTurnoJob implements ShouldQueue
{
    use Queueable;

    /**
     * Cantidad de reintentos si falla la petición a Meta Cloud API.
     */
    public int $tries = 3;

    /**
     * Segundos de espera entre reintentos.
     *
     * @var array<int, int>
     */
    public array $backoff = [10, 30, 60];

    public function __construct(
        public string $turnoId,
        public string $nombrePeluqueria
    ) {}

    /**
     * Execute the job.
     */
    public function handle(WhatsAppService $whatsAppService): void
    {
        // stancl/tenancy restaura automáticamente el tenant activo en el worker
        $turno = Turno::with(['cliente', 'mascota', 'servicios'])->find($this->turnoId);

        if (! $turno) {
            Log::warning("EnviarConfirmacionTurnoJob: Turno {$this->turnoId} no encontrado.");

            return;
        }

        // Evitar envíos duplicados si ya se envió o si el turno fue cancelado
        if ($turno->confirmacion_enviada || $turno->estado === 'cancelado') {
            return;
        }

        if (! $turno->cliente || empty($turno->cliente->telefono)) {
            Log::info("EnviarConfirmacionTurnoJob: El cliente del turno {$this->turnoId} no tiene teléfono registrado.");

            return;
        }

        $whatsAppService->enviarConfirmacionTurno($turno, $this->nombrePeluqueria);
    }
}
