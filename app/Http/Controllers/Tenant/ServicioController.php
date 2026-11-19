<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Servicio;
use App\Mail\ServicioModificadoMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use App\Models\TenantUser;
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
        $servicio = Servicio::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'precio' => $validated['precio'],
            'activo' => true,
        ]);
        $this->notificarCorreoCambio($servicio, 'Nuevo servicio creado');

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
        $this->notificarCorreoCambio($servicio, 'Servicio editado');

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
        $this->notificarCorreoCambio($servicio, $mensaje);

        return redirect()->back();
    }
    public function destroy(string $tenant, string $id): RedirectResponse
    {
        $servicio = Servicio::findOrFail($id);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('delete', $servicio);

        $tieneTurnos = DB::table('turno_servicio')
            ->where('servicio_id', $servicio->id)
            ->exists();

        if ($tieneTurnos) {
            $this->toggleStatus($tenant, $id);
            throw ValidationException::withMessages([
                'servicio' => 'Este servicio ya se utilizó en turnos. Se desactivara en vez de eliminarse.',
            ]);
        }
        $this->notificarCorreoCambio($servicio, 'Servicio Eliminado de Base de Dato');
        $servicio->delete();

        $this->flashToast('success', 'Servicio eliminado correctamente.');

        return redirect()->back();
    }

    private function notificarCorreoCambio(Servicio $servicio, string $accion)
    {
        $currentUser = auth('tenant')->user();
        if (!$currentUser || ! Gate::forUser($currentUser)->allows('notifCorreo', Servicio::class)) {

            return;
        }


        $dueñoPrincipal = TenantUser::role('dueño_principal', 'tenant')
            ->where('activo', true)
            ->first();
        if (! $dueñoPrincipal || empty($dueñoPrincipal->email)) {
            return;
        }

        $data = [
            'nombre_comercial' => tenant('nombre_comercial') ?? 'Peluquería Canina',
            'destinatario_nombre' => trim($dueñoPrincipal->nombre . ' ' . ($dueñoPrincipal->apellido ?? '')),
            'actor_nombre' => trim($currentUser->nombre . ' ' . ($currentUser->apellido ?? '')),
            'actor_email' => $currentUser->email,
            'accion_titulo' => $accion,
            'servicio_nombre' => $servicio->nombre,
            'servicio_descripcion' => $servicio->descripcion,
            'servicio_precio' => (float) $servicio->precio,
            'servicio_duracion' => (int) $servicio->duracion_minutos,
            'servicio_activo' => (bool) $servicio->activo,
            'fecha_hora' => now('America/Argentina/Salta')->format('d/m/Y H:i'),
        ];
        try {
            Mail::to($dueñoPrincipal->email)->send(new ServicioModificadoMail($data));
        } catch (\Throwable $e) {
            Log::warning('No se pudo enviar el correo de auditoría de servicio: ' . $e->getMessage());
        }
    }
}
