<?php

namespace App\Http\Requests\Tenant;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Cliente;
use Illuminate\Validation\Rule;

class ClienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user('tenant') !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $clienteRoute = $this->route('cliente');
        $telefonoUnico = Rule::unique('clientes', 'telefono');
        $emailUnico = Rule::unique('clientes', 'email');

        if ($clienteRoute !== null) {
            $cliente = $clienteRoute instanceof Cliente
                ? $clienteRoute
                : Cliente::query()->findOrFail($clienteRoute);

            $telefonoUnico->ignore($cliente);
            $emailUnico->ignore($cliente);
        }
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['required', 'string', 'max:255'],
            'telefono' => ['required', 'string', 'regex:/^\+549\d{10}$/', $telefonoUnico],
            'email' => ['nullable', 'email', 'max:255', $emailUnico],
            'direccion' => ['nullable', 'string'],
            'notas' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'unique'   => 'El :attribute ingresado ya se encuentra registrado en un cliente existente.',
            'email'    => 'El :attribute debe ser una dirección de correo válida.',
            'max'      => 'El campo :attribute no debe superar los :max caracteres.',
            'boolean'  => 'El campo :attribute debe ser verdadero o falso.',
        ];
    }
}
