<?php

namespace App\Http\Requests\Tenant;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\TenantUser;
use Illuminate\Foundation\Http\FormRequest;



class UpdateLogoRequest extends FormRequest
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
        return [
            'logo' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ]
        ];
    }
    public function messages(): array
    {
        return [
            'logo.required' => 'Debes seleccionar una imagen para el logo.',
            'logo.image' => 'El archivo debe ser una imagen válida.',
            'logo.mimes' => 'Formatos permitidos: JPG, JPEG, PNG o WEBP.',
            'logo.max' => 'La imagen no puede superar los 2 MB.',
        ];
    }
}
