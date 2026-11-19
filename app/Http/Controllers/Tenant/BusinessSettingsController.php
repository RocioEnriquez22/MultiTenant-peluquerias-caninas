<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\UpdateLogoRequest;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;


class BusinessSettingsController extends Controller
{
    public function edit(): Response
    {
        $currentUser = auth('tenant')->user();
        $tenant = tenant();
        Gate::forUser($currentUser)->authorize('manage', $tenant);

        return Inertia::render('tenant/settings/index', [
            'negocio' => [
                'id' => $tenant->id,
                'nombre_comercial' => $tenant->nombre_comercial,
                'logo_url' => $tenant->logo_url,
            ],
        ]);
    }

    public function updateLogo(UpdateLogoRequest $request): RedirectResponse
    {

        $tenant = tenant();
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('manage', $tenant);

        if ($request->hasFile('logo')) {
            // Elimina imagen previa para evitar archivos solos
            if ($tenant->logo && Storage::disk('public')->exists($tenant->logo)) {
                Storage::disk('public')->delete($tenant->logo);
            }

            $ruta = $request->file('logo')->store('logos', 'public');

            $tenant->update([
                'logo' => $ruta,
            ]);
        }

        $this->flashToast('success', 'Logo de la peluquería actualizado correctamente.');

        return redirect()->back();
    }

    public function destroyLogo(): RedirectResponse
    {
        $currentUser = auth('tenant')->user();
        $tenant = tenant();

        Gate::forUser($currentUser)->authorize('manage', $tenant);

        if ($tenant->logo && Storage::disk('public')->exists($tenant->logo)) {
            Storage::disk('public')->delete($tenant->logo);
        }

        $tenant->update(['logo' => null]);

        $this->flashToast('success', 'Logo eliminado. Se usará el ícono por defecto.');

        return redirect()->back();
    }
}
