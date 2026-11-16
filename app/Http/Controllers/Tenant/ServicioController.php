<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Servicio;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ServicioController extends Controller
{
    public function index(): Response
    {
        // Traemos todos los servicios que tiene el tenant
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('viewAny', Servicio::class);
        $servicios = Servicio::query()
            ->orderBy('nombre')
            ->get()
            ->map(fn(Servicio $servicio): array => [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'descripcion' => $servicio->descripcion,
                'precio' => $servicio->precio,
                'activo' => $servicio->activo,
            ]);
        return Inertia::render('tenant/servicios/index', [
            'tenantId' => tenant('id'),
            'servicios' => $servicios,
            'canManage' => Gate::forUser($currentUser)->allows('create', Servicio::class),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('create', Servicio::class);
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'precio' => ['required', 'numeric', 'min:0', 'max:99999999.99', 'decimal:0,2'],
        ]);
        Servicio::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'precio' => $validated['precio'],
            'activo' => true,
        ]);
        $this->flashToast('success', 'Servicio creado correctamente.');
        return redirect()->back();
    }

    public function update(Request $request, string $tenant, string $id): RedirectResponse
    {
        $servicio = Servicio::findOrFail($id);
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('update', $servicio);
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'precio' => ['required', 'numeric', 'min:0', 'max:99999999.99', 'decimal:0,2'],
        ]);

        $servicio->update($validated);

        $this->flashToast('success', 'Servicio actualizado correctamente.');

        return redirect()->back();
    }

    public function toggleStatus(string $tenant, string $id): RedirectResponse
    {
        $servicio = Servicio::findOrFail($id);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('toggleStatus', $servicio);

        $servicio->update([
            'activo' => ! $servicio->activo,
        ]);

        $mensaje = $servicio->activo
            ? 'Servicio activado correctamente.'
            : 'Servicio desactivado correctamente.';

        $this->flashToast('success', $mensaje);

        return redirect()->back();
    }
    public function destroy(string $tenant, string $id): RedirectResponse
    {
        $servicio = Servicio::findOrFail($id);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('delete', $servicio);

        $tieneTurnos = DB::table('turno_x_srvicio')
            ->where('servicio_id', $servicio->id)
            ->exists();

        if ($tieneTurnos) {
            throw ValidationException::withMessages([
                'servicio' => 'Este servicio ya se utilizó en turnos. Desactívalo en lugar de eliminarlo.',
            ]);
        }

        $servicio->delete();

        $this->flashToast('success', 'Servicio eliminado correctamente.');

        return redirect()->back();
    }
}
