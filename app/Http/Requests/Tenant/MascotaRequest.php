<?php

namespace App\Http\Requests\Tenant;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MascotaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $clienteId = $this->route('cliente')?->id ?? $this->route('cliente');
        $mascotaId = $this->route('mascota')?->id ?? $this->route('mascota');
        return [
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('mascotas', 'nombre')
                    ->where('cliente_id', $clienteId)
                    ->ignore($mascotaId)
            ],
            'especie_raza' => ['nullable', 'string', 'max:255'],
            'dimension' => ['nullable', 'string', 'max:50'],
            'observaciones' => ['nullable', 'string'],
        ];
    }
    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'unique'   => 'El :attribute ingresado ya se encuentra registrado.',
            'email'    => 'El :attribute debe ser una dirección de correo válida.',
            'max'      => 'El campo :attribute no debe superar los :max caracteres.',
            'boolean'  => 'El campo :attribute debe ser verdadero o falso.',
        ];
    }
}
