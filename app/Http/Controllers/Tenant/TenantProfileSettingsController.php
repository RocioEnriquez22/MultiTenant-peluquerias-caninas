<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\TenantUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class TenantProfileSettingsController extends Controller
{
    public function edit(): Response
    {
        $currentUser = auth('tenant')->user();
        if (! $currentUser instanceof TenantUser) {
            abort(403, 'no es un usuario de la peluqueria, no esta autorizado.');
        }
        return Inertia::render('tenant/settings/profile', [
            'perfil' => [
                'nombre' => $currentUser->nombre,
                'apellido' => $currentUser->apellido ?? '',
                'telefono' => $currentUser->telefono ?? '',
                'email' => $currentUser->email,
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $currentUser = auth('tenant')->user();

        if (! $currentUser instanceof TenantUser) {
            abort(403, 'no es un usuario de la peluqueria, no esta autorizado.');
        }
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['nullable', 'string', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:50'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($currentUser->id),
            ],
        ]);
        $currentUser->update($validated);
        if ($currentUser instanceof TenantUser) {
        }
        $this->flashToast('success', 'Perfil actualizado correctamente.');

        return redirect()->back();
    }


    public function updatePassword(Request $request): RedirectResponse
    {
        $currentUser = auth('tenant')->user();
        if (! $currentUser instanceof TenantUser) {
            abort(403, 'no es un usuario de la peluqueria, no esta autorizado.');
        }
        $validated = $request->validate([
            'current_password' => ['required', 'current_password:tenant'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ], [
            'current_password.current_password' => 'La contraseña actual no es correcta.',
        ]);
        $currentUser->update([
            'password' => Hash::make($validated['password']),
        ]);
        $this->flashToast('success', 'Contraseña actualizada correctamente.');

        return redirect()->back();
    }

    public function editSecurity(): Response
    {
        return Inertia::render('tenant/settings/security');
    }
}
