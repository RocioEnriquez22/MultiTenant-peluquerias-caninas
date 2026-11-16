<?php

namespace App\Http\Requests\Tenant;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\TenantUser;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Override;

class StoreTenantUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $currentUser = auth('tenant')->user();
        if (! $currentUser || ! Gate::forUser($currentUser)->allows('create', TenantUser::class)) {
            return false;
        }
        if ($this->input('rol') === 'dueño') {
            return Gate::forUser($currentUser)->allows('assignOwnerRole', TenantUser::class);
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'telefono' => ['nullable', 'string', 'max:50'],
            'password' => ['required', 'string', 'min:8'],
            'rol' => ['required', 'string', Rule::in(['dueño', 'empleado'])],
        ];
    }


    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Ingresa un correo electrónico válido.',
            'email.unique' => 'Este correo electrónico ya está registrado en esta peluquería.',
            'password.required' => 'La contraseña es requerida para crear el usuario.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'rol.in' => 'El rol seleccionado no es válido.',
        ];
    }
}
