<?php

namespace App\Http\Requests\Tenant;

use App\Models\TenantUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateTenantUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $currentUser = auth('tenant')->user();
        $targetUserId = $this->route('id') ?? $this->route('user');
        $targetUser = TenantUser::findorFail($targetUserId);


        if (! Gate::forUser($currentUser)->allows('update', $targetUser)) {
            return false;
        }

        if ($this->input('rol') === 'dueño') {
            return Gate::forUser($currentUser)->allows('assignOwnerRole', TenantUser::class);
        }

        return true;
    }

    public function rules(): array
    {
        // Obtiene el ID desde el parámetro de la ruta (ajusta 'id' si tu ruta usa otro nombre de parámetro)
        $userId = $this->route('id') ?? $this->route('users');

        return [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'telefono' => ['nullable', 'string', 'max:50'],
            'password' => ['nullable', 'string', 'min:8'],
            'rol' => ['required', 'string', Rule::in(['dueño', 'empleado'])],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Ingresa un correo electrónico válido.',
            'email.unique' => 'Este correo ya pertenece a otro usuario de la peluquería.',
            'password.min' => 'La nueva contraseña debe tener al menos 8 caracteres.',
            'rol.in' => 'El rol seleccionado no es válido.',
        ];
    }
}
