<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Tenant;
use App\Models\Turno;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class WppWebhookController extends Controller
{
    /**
     * Verificación inicial del Webhook exigida por Meta (GET).
     */
    public function verify(Request $request): Response
    {
        $mode = $request->query('hub_mode');
        $token = $request->query('hub_verify_token');
        $challenge = $request->query('hub_challenge');

        if ($mode === 'subscribe' && $token === config('services.whatsapp.verify_token')) {
            return response((string) $challenge, 200)
                ->header('Content-Type', 'text/plain');
        }

        return response('Forbidden', 403);
    }

    /**
     * Recepción de eventos y clics en botones de respuesta rápida (POST).
     */
    public function handle(Request $request): Response
    {
        $value = $request->input('entry.0.changes.0.value');

        if (! $value || empty($value['messages'])) {
            return response('EVENT_RECEIVED', 200);
        }

        $message = $value['messages'][0];
        $from = $message['from'] ?? null;

        // Meta envía el texto del botón en 'button.text' (plantillas) o 'interactive.button_reply.title'
        $buttonText = $message['button']['text']
            ?? $message['interactive']['button_reply']['title']
            ?? null;

        if (! $from || ! $buttonText) {
            return response('EVENT_RECEIVED', 200);
        }

        // En producción busca el tenant por phone_number_id; en sandbox usa el primer tenant activo
        $phoneNumberId = $value['metadata']['phone_number_id'] ?? null;
        $tenant = Tenant::where('whatsapp_phone_number_id', $phoneNumberId)->first()
            ?? Tenant::where('activo', true)->first();

        if (! $tenant) {
            return response('EVENT_RECEIVED', 200);
        }

        tenancy()->initialize($tenant);

        try {
            // Coincidencia por últimos 7 dígitos locales para evitar diferencias entre 549 / 54 / 15 / 0
            $ultimosDigitos = substr(preg_replace('/\D+/', '', $from), -7);

            $cliente = Cliente::where('telefono', 'like', "%{$ultimosDigitos}")->first();

            if ($cliente && str_contains(mb_strtolower($buttonText), 'cancelar')) {
                $turno = Turno::where('cliente_id', $cliente->id)
                    ->where('estado', 'pendiente')
                    ->whereDate('fecha', '>=', now()->toDateString())
                    ->orderBy('fecha')
                    ->orderBy('hora')
                    ->first();

                if ($turno) {
                    $motivoCancelacion = 'Cancelado por el cliente vía WhatsApp (' . now()->format('d/m/Y H:i') . ')';

                    $notasActualizadas = $turno->notas_turno
                        ? $turno->notas_turno . "\n" . $motivoCancelacion
                        : $motivoCancelacion;

                    $turno->update([
                        'estado' => 'cancelado',
                        'notas_turno' => $notasActualizadas,
                    ]);

                    Log::info("Turno {$turno->id} cancelado vía WhatsApp por {$cliente->nombre} en tenant {$tenant->id}");
                }
            }
        } finally {
            tenancy()->end();
        }

        return response('EVENT_RECEIVED', 200);
    }
}
