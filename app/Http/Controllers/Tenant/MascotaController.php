<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\MascotaRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Mascota;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;




class MascotaController extends Controller
{
    public function index(Request $request, string $tenant, Cliente $cliente): Response
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('viewAny', Cliente::class);
        $mascotas = $cliente->mascotas()
            ->orderByDesc('activo')
            ->orderBy('nombre')
            ->get()
            ->map(fn(Mascota $mascota): array => [
                'id' => $mascota->id,
                'nombre' => $mascota->nombre,
                'especie_raza' => $mascota->especie_raza,
                'dimension' => $mascota->dimension,
                'observaciones' => $mascota->observaciones,
                'activo' => (bool) $mascota->activo,
            ]);

        $canArchivar = $currentUser->hasRole(
            ['dueño_principal', 'dueño'],
            'tenant'
        );
        return Inertia::render('tenant/mascotas/index', [
            'cliente' => [
                'id' => $cliente->id,
                'nombre' => $cliente->nombre,
                'apellido' => $cliente->apellido,
                'telefono' => $cliente->telefono,
                'email' => $cliente->email,
                'activo' => (bool) $cliente->activo,
            ],
            'mascotas' => $mascotas,
            'openCreateModal' => $request->boolean('agregar'), // Detecta ?agregar=1 en la request 
            'canManage' => true,
            'canArchivar' => $canArchivar,
        ]);
    }



    public function store(MascotaRequest $request, string $tenant, string $cliente): RedirectResponse
    {
        $clienteBuscado = Cliente::findOrFail($cliente);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('create', Mascota::class);
        $clienteBuscado->mascotas()->create([
            ...$request->validated(),
            'activo' => true,
        ]);

        $this->flashToast('success', 'Ficha de mascota actualizada correctamente.');
        return redirect()->back();
    }
    public function toggleStatus(string $tenant, string $cliente, string $mascota): RedirectResponse
    {
        $clienteBuscado = Cliente::findOrFail($cliente);
        $mascotaBuscada = $clienteBuscado->mascotas()->findOrFail($mascota);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('archivar', $mascotaBuscada);

        $mascotaBuscada->update([
            'activo' => ! $mascotaBuscada->activo,
        ]);

        $mensaje = $mascotaBuscada->activo
            ? 'Mascota reactivada correctamente.'
            : 'Mascota archivada correctamente.';

        $this->flashToast('success', $mensaje);

        return redirect()->back();
    }

    public function update(
        MascotaRequest $request,
        string $tenant,
        string $cliente,
        string $mascota
    ): RedirectResponse {
        $clienteBuscado = Cliente::findOrFail($cliente);
        $mascotaBuscada = $clienteBuscado->mascotas()->findOrFail($mascota);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('update', $mascotaBuscada);

        $mascotaBuscada->update($request->validated());

        $this->flashToast('success', 'Ficha de mascota actualizada correctamente.');

        return redirect()->back();
    }
}
