<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\ClienteRequest;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Cliente;
use App\Models\Mascota;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;





class ClienteController extends Controller
{
    public function index(Request $request): Response
    {
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('viewAny', Cliente::class);

        //parametros para inertia para filtro,orden y pag.
        $buscar = trim((string) $request->input('buscar', ''));
        $estado = (string) $request->input('estado', ''); // '' (todos), '1' (activos), '0' (inactivos)
        $orden = (string) $request->input('orden', 'cliente');
        $direccion = (string) $request->input('direccion', 'asc');
        $porPaginaInput = (string) $request->input('por_pagina', '4');

        $camposPermitidos = ['cliente', 'mascotas', 'estado'];
        if (! in_array($orden, $camposPermitidos, true)) {
            $orden = 'cliente';
        }

        if (! in_array($direccion, ['asc', 'desc'], true)) {
            $direccion = 'asc';
        }

        if (! in_array($porPaginaInput, ['4', '8', 'todos'], true)) {
            $porPaginaInput = '4';
        }

        //consulta a elocuent usando los los parametros
        $query = Cliente::query()
            ->with('mascotas')
            ->withCount('mascotas')
            ->when($buscar !== '', function ($q) use ($buscar): void {
                $q->where(function ($sub) use ($buscar): void {
                    $sub->where('nombre', 'like', "%{$buscar}%")
                        ->orWhere('apellido', 'like', "%{$buscar}%")
                        ->orWhere('telefono', 'like', "%{$buscar}%")
                        ->orWhere('email', 'like', "%{$buscar}%");
                });
            })
            ->when($estado !== '' && in_array($estado, ['0', '1'], true), function ($q) use ($estado): void {
                $q->where('activo', $estado === '1');
            });

        if ($orden === 'estado') {
            $query->orderBy('activo', $direccion === 'asc' ? 'desc' : 'asc')
                ->orderBy('apellido', 'asc')
                ->orderBy('nombre', 'asc');
        } else {
            $query->orderByDesc('activo');
        }
        if ($orden === 'mascotas') {
            $query->orderBy('mascotas_count', $direccion)
                ->orderBy('apellido', 'asc')
                ->orderBy('nombre', 'asc');
        } else {
            // Orden por 'cliente'
            $query->orderBy('apellido', $direccion)
                ->orderBy('nombre', $direccion);
        }

        $cantidadPorPagina = $porPaginaInput === 'todos'
            ? max(1, (clone $query)->count())
            : (int) $porPaginaInput;



        $clientes = $query
            ->paginate($cantidadPorPagina)
            ->withQueryString()
            ->through(fn(Cliente $cliente): array => [
                'id' => $cliente->id,
                'nombre' => $cliente->nombre,
                'apellido' => $cliente->apellido,
                'telefono' => $cliente->telefono,
                'email' => $cliente->email,
                'direccion' => $cliente->direccion,
                'notas' => $cliente->notas,
                'activo' => (bool) $cliente->activo,
                'mascotas' => $cliente->mascotas
                    ->map(fn(Mascota $mascota): array => [
                        'id' => $mascota->id,
                        'nombre' => $mascota->nombre,
                        'especie_raza' => $mascota->especie_raza,
                        'dimension' => $mascota->dimension,
                        'observaciones' => $mascota->observaciones,
                        'activo' => (bool) $mascota->activo,
                    ])
                    ->values(),
            ]);


        $canArchivar = Gate::forUser($currentUser)->allows('archivar', Cliente::class);
        return Inertia::render('tenant/clientes/index', [
            'tenantId' => tenant('id'),
            'clientes' => $clientes,
            'filtros' => [
                'buscar' => $buscar,
                'estado' => $estado,
                'orden' => $orden,
                'direccion' => $direccion,
                'por_pagina' => $porPaginaInput === 'todos' ? 'todos' : (int) $porPaginaInput,
            ],
            'canManage' => true,
            'canArchivar' => $canArchivar,

        ]);
    }

    public function store(ClienteRequest $request): RedirectResponse
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('create', Cliente::class);
        Cliente::create([
            ...$request->validated(),
            'activo' => true,
        ]);

        $this->flashToast('success', 'Cliente creado correctamente');
        return redirect()->back();
    }

    public function update(ClienteRequest $request, string $tenant, string $cliente): RedirectResponse
    {
        $clienteExiste = Cliente::findOrFail($cliente);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('update', $clienteExiste);
        $clienteExiste->update($request->validated());

        $this->flashToast('success', 'Cliente actualizado correctamente.');
        return redirect()->back();
    }

    public function toggleStatus(string $tenant, string $cliente): RedirectResponse
    {
        $clienteExiste = Cliente::findOrFail($cliente);
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('archivar', $clienteExiste);
        $clienteExiste->update([
            'activo' => !$clienteExiste->activo,
        ]);
        $mensaje = $clienteExiste->activo
            ? 'Cliente reactivado correctamente.'
            : 'Cliente archivado correctamente.';
        $this->flashToast('success', $mensaje);
        return redirect()->back();
    }
}
