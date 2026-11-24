<?php

namespace App\Services;

use App\Models\Turno;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected string $accessToken;
    protected string $phoneNumberId;
    protected string $baseUrl;
    protected string $version;

    public function __construct()
    {
        $this->accessToken = (string) config('services.whatsapp.access_token');
        $this->phoneNumberId = (string) config('services.whatsapp.phone_number_id');
        $this->baseUrl = rtrim((string) config('services.whatsapp.base_url', 'https://graph.facebook.com'), '/');
        $this->version = (string) config('services.whatsapp.api_version', 'v25.0');
    }

    /**
     * Normaliza teléfonos argentinos al formato aceptado por el Sandbox / Cloud API de Meta.
     */
    public function normalizarTelefonoArgentina(string $telefono): string
    {
        $digits = preg_replace('/\D+/', '', $telefono);

        // Si ya viene como 54 + área + 15 + abonado (ej: 54388155220726)
        if (preg_match('/^54\d{2,4}15\d{6,8}$/', $digits)) {
            return $digits;
        }

        // Si viene como 549 + área (3 dígitos) + abonado (7 dígitos) -> 54 + área + 15 + abonado
        if (preg_match('/^549(\d{3})(\d{7})$/', $digits, $m)) {
            return '54' . $m[1] . '15' . $m[2];
        }

        $digits = ltrim($digits, '0');

        // Si viene como 388155220726
        if (preg_match('/^(\d{3})15(\d{7})$/', $digits, $m)) {
            return '54' . $m[1] . '15' . $m[2];
        }

        // Si viene como 3885220726 (10 dígitos locales)
        if (preg_match('/^(\d{3})(\d{7})$/', $digits, $m)) {
            return '54' . $m[1] . '15' . $m[2];
        }

        return $digits;
    }

    /**
     * Envía una plantilla aprobada en Meta WhatsApp Cloud API con soporte para Header y Body.
     */
    public function enviarPlantilla(
        string $telefonoDestino,
        string $templateName,
        array $bodyParams = [],
        string $languageCode = 'es_AR',
        array $headerParams = []
    ): bool {
        $to = $this->normalizarTelefonoArgentina($telefonoDestino);

        $mapParams = function (array $params): array {
            $result = [];
            $isAssoc = ! array_is_list($params);

            foreach ($params as $key => $value) {
                $item = [
                    'type' => 'text',
                    'text' => (string) $value,
                ];

                if ($isAssoc) {
                    $item['parameter_name'] = (string) $key;
                }

                $result[] = $item;
            }

            return $result;
        };

        $components = [];

        if (! empty($headerParams)) {
            $components[] = [
                'type' => 'header',
                'parameters' => $mapParams($headerParams),
            ];
        }

        if (! empty($bodyParams)) {
            $components[] = [
                'type' => 'body',
                'parameters' => $mapParams($bodyParams),
            ];
        }

        $payload = [
            'messaging_product' => 'whatsapp',
            'to' => $to,
            'type' => 'template',
            'template' => [
                'name' => $templateName,
                'language' => [
                    'code' => $languageCode,
                ],
            ],
        ];

        if (! empty($components)) {
            $payload['template']['components'] = $components;
        }

        $response = Http::withToken($this->accessToken)
            ->post("{$this->baseUrl}/{$this->version}/{$this->phoneNumberId}/messages", $payload);

        if ($response->failed()) {
            Log::error('Error enviando WhatsApp Meta Cloud API', [
                'to' => $to,
                'template' => $templateName,
                'status' => $response->status(),
                'body' => $response->json(),
            ]);

            return false;
        }

        return true;
    }

    /**
     * Envía la confirmación inmediata al agendar un turno.
     */
    public function enviarConfirmacionTurno(Turno $turno, string $nombrePeluqueria): bool
    {
        if (! $turno->cliente?->telefono) {
            return false;
        }

        // Formato en español con mayúscula inicial: "Lunes 23 de Noviembre"
        $fechaFormateada = str_replace(
            ' De ',
            ' de ',
            mb_convert_case(
                $turno->fecha->locale('es')->translatedFormat('l j \d\e F'),
                MB_CASE_TITLE,
                'UTF-8'
            )
        );

        $enviado = $this->enviarPlantilla(
            telefonoDestino: $turno->cliente->telefono,
            templateName: 'confirmacion_turno_peluqueria',
            headerParams: [
                $nombrePeluqueria, // {{1}} del Header en negrita (ej: "Peluqueria Patitas")
            ],
            bodyParams: [
                $turno->cliente->nombre,             // {{1}} del Body (ej: "Juan")
                $turno->mascota->nombre,             // {{2}} del Body (ej: "Budy")
                $fechaFormateada,                    // {{3}} del Body (ej: "Lunes 23 de Noviembre")
                substr((string) $turno->hora, 0, 5), // {{4}} del Body (ej: "15:00")
            ],
            languageCode: 'es_AR'
        );

        if ($enviado) {
            $turno->update(['confirmacion_enviada' => true]);
        }

        return $enviado;
    }

    public function enviarRecordatorioTurno(Turno $turno, string $nombrePeluqueria): bool
    {
        if (! $turno->cliente?->telefono) {
            return false;
        }

        $fechaFormateada = str_replace(
            ' De ',
            ' de ',
            mb_convert_case(
                $turno->fecha->locale('es')->translatedFormat('l j \d\e F'),
                MB_CASE_TITLE,
                'UTF-8'
            )
        );

        $enviado = $this->enviarPlantilla(
            telefonoDestino: $turno->cliente->telefono,
            templateName: 'recordatorio_turno_24h',
            headerParams: [
                // Si el header en Meta tiene variable con nombre, ej. 'peluqueria' => $nombrePeluqueria
                // Si el header es texto fijo sin variable, deja este arreglo vacío: []
            ],
            bodyParams: [
                'cliente_nombre' => $turno->cliente->nombre,
                'nombre_mascota' => $turno->mascota->nombre,
                'dia'            => $fechaFormateada,
                'hora'           => substr((string) $turno->hora, 0, 5),
            ],
            languageCode: 'es_AR'
        );

        if ($enviado) {
            $turno->update([
                'recordatorio_enviado' => true,
                'fecha_envio_recordatorio' => now(),
            ]);
        }

        return $enviado;
    }
}
