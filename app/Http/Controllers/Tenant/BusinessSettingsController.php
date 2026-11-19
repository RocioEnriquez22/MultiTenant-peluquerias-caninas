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
            $disk = $this->centralPublicDisk();
            if ($tenant->logo && $disk->exists($tenant->logo)) {
                $disk->delete($tenant->logo);
            }

            $ruta = $disk->putFile('logos', $request->file('logo'));

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
        $disk = $this->centralPublicDisk();

        if ($tenant->logo && $disk->exists($tenant->logo)) {
            $disk->delete($tenant->logo);
        }

        $tenant->update(['logo' => null]);

        $this->flashToast('success', 'Logo eliminado. Se usará el ícono por defecto.');

        return redirect()->back();
    }

    private function centralPublicDisk()
    {
        return Storage::build([
            'driver' => 'local',
            'root' => base_path('storage/app/public'),
            'url' => '/storage',
            'visibility' => 'public',
        ]);
    }
}
