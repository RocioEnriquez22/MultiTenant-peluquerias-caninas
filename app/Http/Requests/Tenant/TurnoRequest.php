<?php

namespace App\Http\Requests\Tenant;

use App\Models\Mascota;
use App\Models\Turno;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class TurnoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Cambio de estado en el tablero Kanban y registro de cobro si pasa a 'listo'
        if ($this->routeIs('tenant.turnos.estado') || $this->isMethod('patch')) {
            return [
                'estado' => ['required', Rule::in(['pendiente', 'en_proceso', 'listo', 'cancelado'])],
                'metodo_pago' => [
                    Rule::requiredIf(fn() => $this->input('estado') === 'listo'),
                    'nullable',
                    Rule::in(['pendiente', 'efectivo', 'mercado_pago', 'transferencia']),
                ],
                'monto_cobrado' => [
                    Rule::requiredIf(fn() => $this->input('estado') === 'listo'),
                    'nullable',
                    'numeric',
                    'min:0',
                ],
                'servicios' => [
                    Rule::requiredIf(fn() => $this->input('estado') === 'listo'),
                    'array',
                    'min:1',
                ],
                'servicios.*' => ['uuid', 'distinct', 'exists:servicios,id'],
            ];
        }

        // Creación (POST) y Actualización (PUT) del turno
        return [
            'cliente_id' => ['required', 'uuid', 'exists:clientes,id'],
            'mascota_id' => ['required', 'uuid', 'exists:mascotas,id'],
            'fecha' => ['required', 'date'],
            'hora' => ['required', 'date_format:H:i'],
            'servicios' => ['required', 'array', 'min:1'],
            'servicios.*' => ['required', 'uuid', 'distinct', 'exists:servicios,id'],
            'notas_turno' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Validación cruzada,verifica que la mascota pertenezca al cliente seleccionado.
     */
    public function withValidator(Validator $validator): void
    {
        if ($this->routeIs('tenant.turnos.estado') || $this->isMethod('patch')) {
            return;
        }

        $validator->after(function (Validator $validator): void {
            $clienteId = $this->input('cliente_id');
            $mascotaId = $this->input('mascota_id');

            if ($clienteId && $mascotaId) {
                $perteneceAlCliente = Mascota::where('id', $mascotaId)
                    ->where('cliente_id', $clienteId)
                    ->exists();

                if (! $perteneceAlCliente) {
                    $validator->errors()->add(
                        'mascota_id',
                        'La mascota seleccionada no pertenece al cliente indicado.'
                    );
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'cliente_id.required' => 'Debes seleccionar un cliente.',
            'mascota_id.required' => 'Debes seleccionar una mascota.',
            'fecha.required' => 'La fecha del turno es obligatoria.',
            'hora.required' => 'La hora del turno es obligatoria.',
            'hora.date_format' => 'El formato de hora debe ser HH:MM.',
            'servicios.required' => 'Debes seleccionar al menos un servicio.',
            'servicios.min' => 'Debes seleccionar al menos un servicio.',
            'estado.in' => 'El estado seleccionado no es válido.',
            'metodo_pago.required' => 'Debes indicar el medio de pago al finalizar el turno.',
            'monto_cobrado.required' => 'Debes confirmar el monto cobrado al finalizar el turno.',
        ];
    }
}
