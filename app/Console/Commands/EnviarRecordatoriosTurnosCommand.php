<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use App\Models\Tenant;
use App\Models\Turno;
use App\Services\WhatsAppService;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:enviar-recordatorios-turnos-command')]
#[Description('Command description')]
class EnviarRecordatoriosTurnosCommand extends Command
{

    protected $signature = 'turnos:enviar-recordatorios';
    protected $description = 'Envía recordatorios por WhatsApp 24 horas antes de cada turno pendiente';
    /**
     * Execute the console command.
     */
    public function handle(WhatsAppService $whatsAppService): int
    {
        $mañana = now()->addDay()->toDateString();
        $tenants = Tenant::where('activo', true)->get();

        tenancy()->runForMultiple($tenants, function (Tenant $tenant) use ($mañana, $whatsAppService): void {
            $turnos = Turno::with(['cliente', 'mascota'])
                ->whereDate('fecha', $mañana)
                ->where('estado', 'pendiente')
                ->where('recordatorio_enviado', false)
                ->get();

            foreach ($turnos as $turno) {
                if (! $turno->cliente?->telefono) {
                    continue;
                }

                $nombreComercial = $tenant->nombre_comercial
                    ?? $tenant->nombre
                    ?? 'Peluquería Canina';

                $enviado = $whatsAppService->enviarRecordatorioTurno($turno, $nombreComercial);

                if ($enviado) {
                    $this->info("[{$tenant->id}] Recordatorio enviado para el turno {$turno->id}");
                }
            }
        });

        return self::SUCCESS;
    }
}
