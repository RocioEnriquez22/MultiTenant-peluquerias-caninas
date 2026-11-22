<?php

namespace App\Http\Controllers\Tenant;

use App\Exports\TurnosMensualExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;


use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\TurnoRequest;
use App\Models\Cliente;
use App\Models\Servicio;
use Illuminate\Http\RedirectResponse;
use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TurnoController extends Controller
{
    /**
     * Muestra la Agenda Diaria / Tablero Kanban filtrada por fecha.
     */
    public function index(Request $request): Response
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('viewAny', Turno::class);

        $fecha = $this->parsearFecha($request->input('fecha'));


        // traer los turnos del día con todas sus relaciones cargadas (Eager Loading)
        $turnos = Turno::query()
            ->with(['cliente', 'mascota', 'realizadoPor', 'servicios'])
            ->whereDate('fecha', $fecha)
            ->orderBy('hora', 'asc')
            ->get()
            ->map(function (Turno $turno): array {
                // Calculamos la suma de los precios históricos guardados en turno_servicio
                $totalServicios = $turno->servicios->sum(
                    fn(Servicio $s) => (float) $s->pivot->precio_historico
                );

                return [
                    'id' => $turno->id,
                    'cliente_id' => $turno->cliente_id,
                    'mascota_id' => $turno->mascota_id,
                    'fecha' => $turno->fecha->format('Y-m-d'),
                    'hora' => substr((string) $turno->hora, 0, 5),
                    'estado' => $turno->estado,
                    'finalizado_at' => $turno->finalizado_at?->format('H:i'),
                    'metodo_pago' => $turno->metodo_pago,
                    'monto_cobrado' => (float) $turno->monto_cobrado,
                    'total_estimado' => (float) $totalServicios,
                    'notas_turno' => $turno->notas_turno,
                    'cliente' => [
                        'id' => $turno->cliente->id,
                        'nombre' => $turno->cliente->nombre,
                        'apellido' => $turno->cliente->apellido,
                        'telefono' => $turno->cliente->telefono,
                    ],
                    'mascota' => [
                        'id' => $turno->mascota->id,
                        'nombre' => $turno->mascota->nombre,
                        'especie_raza' => $turno->mascota->especie_raza,
                        'dimension' => $turno->mascota->dimension,
                        'observaciones' => $turno->mascota->observaciones,
                    ],
                    // Usuario que realizó el turno (null mientras no esté finalizado)
                    'realizado_por' => $turno->realizadoPor ? [
                        'id' => $turno->realizadoPor->id,
                        'nombre' => $turno->realizadoPor->nombre,
                        'apellido' => $turno->realizadoPor->apellido,
                    ] : null,
                    'servicios' => $turno->servicios->map(fn(Servicio $servicio): array => [
                        'id' => $servicio->id,
                        'nombre' => $servicio->nombre,
                        'precio_historico' => (float) $servicio->pivot->precio_historico,
                    ])->values(),
                ];
            });

        return Inertia::render('tenant/turnos/index', [
            'fechaSeleccionada' => $fecha,
            'turnos' => $turnos,
            'clientes' => $this->getClientesCatalogo(),
            'servicios' => $this->getServiciosCatalogo(),

        ]);
    }
    public function calendario(Request $request): Response
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('viewAny', Turno::class);


        $fecha = $this->parsearFecha($request->input('fecha'));
        $inicioMes = Carbon::parse($fecha)->startOfMonth()->toDateString();
        $finMes = Carbon::parse($fecha)->endOfMonth()->toDateString();

        $turnosMes = Turno::query()
            ->with([
                'cliente:id,nombre,apellido,telefono',
                'mascota:id,nombre,especie_raza',
                'servicios:id,nombre',
            ])
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->orderBy('hora', 'asc')
            ->get()
            ->map(fn(Turno $t): array => [
                'id' => $t->id,
                'fecha' => $t->fecha->format('Y-m-d'),
                'hora' => substr((string) $t->hora, 0, 5),
                'estado' => $t->estado,
                'mascota_nombre' => $t->mascota->nombre,
                'mascota_raza' => $t->mascota->especie_raza,
                'cliente_nombre' => trim($t->cliente->nombre . ' ' . ($t->cliente->apellido ?? '')),
                'servicios_nombres' => $t->servicios->pluck('nombre')->values(),
            ]);

        return Inertia::render('tenant/turnos/calendario', [
            'fechaSeleccionada' => $fecha,
            'turnosMes' => $turnosMes,
            'clientes' => $this->getClientesCatalogo(),
            'servicios' => $this->getServiciosCatalogo(),
        ]);
    }



    /**
     * Agenda un nuevo turno (sin asignar empleado aún) y asocia sus servicios en turno_servicio.
     */
    public function store(TurnoRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('create', Turno::class);

        DB::transaction(function () use ($validated): void {
            // Buscamos los servicios seleccionados para congelar su precio actual
            $serviciosSeleccionados = Servicio::whereIn('id', $validated['servicios'])->get();
            $totalEstimado = $serviciosSeleccionados->sum('precio');

            $turno = Turno::create([
                'cliente_id' => $validated['cliente_id'],
                'mascota_id' => $validated['mascota_id'],
                'empleado_id' => null, // Nadie lo realizó todavía
                'fecha' => $validated['fecha'],
                'hora' => $validated['hora'],
                'estado' => 'pendiente',
                'metodo_pago' => 'pendiente',
                'monto_cobrado' => $totalEstimado,
                'notas_turno' => $validated['notas_turno'] ?? null,
            ]);

            // Preparamos datos para la tabla pivote turno_servicio
            $pivotData = [];
            foreach ($serviciosSeleccionados as $servicio) {
                $pivotData[$servicio->id] = [
                    'precio_historico' => $servicio->precio,
                ];
            }

            $turno->servicios()->attach($pivotData);
        });

        $this->flashToast('success', 'Turno agendado correctamente.');

        return redirect()->back();
    }

    /**
     * Actualiza fecha, hora, mascota, notas o servicios de un turno existente.
     */
    public function update(TurnoRequest $request, string $tenant, Turno $turno): RedirectResponse
    {
        $validated = $request->validated();
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('update', $turno);

        DB::transaction(function () use ($turno, $validated): void {
            $serviciosSeleccionados = Servicio::whereIn('id', $validated['servicios'])->get();

            // Conservamos los precios históricos que ya tenía congelados este turno
            $preciosExistentes = $turno->servicios()
                ->pluck('turno_servicio.precio_historico', 'servicios.id');
            $pivotData = [];
            $totalActualizado = 0;

            foreach ($serviciosSeleccionados as $servicio) {
                $precio = $preciosExistentes->has($servicio->id)
                    ? (float) $preciosExistentes->get($servicio->id)
                    : (float) $servicio->precio;

                $pivotData[$servicio->id] = [
                    'precio_historico' => $precio,
                ];
                $totalActualizado += $precio;
            }

            $turno->update([
                'cliente_id' => $validated['cliente_id'],
                'mascota_id' => $validated['mascota_id'],
                'fecha' => $validated['fecha'],
                'hora' => $validated['hora'],
                // Siempre sincronizamos monto_cobrado con la suma real de los servicios del turno
                'monto_cobrado' => $totalActualizado,
                'notas_turno' => $validated['notas_turno'] ?? null,
            ]);

            $turno->servicios()->sync($pivotData);
        });

        $this->flashToast('success', 'Turno actualizado correctamente.');

        return redirect()->back();
    }



    /**
     * Cambia el estado en el Tablero Kanban.
     */
    public function cambiarEstado(TurnoRequest $request, string $tenant, Turno $turno): RedirectResponse
    {
        $currentUser = auth('tenant')->user();

        if (! Gate::forUser($currentUser)->allows('cambiarEstado', $turno)) {
            $this->flashToast('error', 'No tienes permiso para modificar este turno.');

            return redirect()->back();
        }

        $validated = $request->validated();
        $nuevoEstado = $validated['estado'];

        if ($nuevoEstado === 'en_proceso') {
            $puedeGestionarCualquiera = $currentUser->hasRole('dueño_principal', 'tenant')
                || $currentUser->checkPermissionTo('kanban.cambiar_estado_cualquiera', 'tenant');

            if ($turno->estado !== 'pendiente' && ! $puedeGestionarCualquiera) {
                $this->flashToast('error', 'Este turno ya fue tomado por otro usuario.');

                return redirect()->back();
            }

            $turno->update([
                'estado' => 'en_proceso',
                'empleado_id' => $turno->empleado_id ?? $currentUser->id,
                'finalizado_at' => null,
            ]);

            $this->flashToast('success', 'Turno pasado a En Proceso.');

            return redirect()->back();
        }

        if ($nuevoEstado === 'listo') {
            DB::transaction(function () use ($turno, $validated, $currentUser): void {
                if (! empty($validated['servicios'])) {
                    $preciosHistoricos = $turno->servicios()
                        ->pluck('turno_servicio.precio_historico', 'servicios.id');

                    $pivotData = [];
                    foreach ($validated['servicios'] as $servicioId) {
                        $precio = $preciosHistoricos->get($servicioId)
                            ?? Servicio::find($servicioId)?->precio
                            ?? 0;
                        $pivotData[$servicioId] = ['precio_historico' => $precio];
                    }

                    $turno->servicios()->sync($pivotData);
                }

                $turno->update([
                    'estado' => 'listo',
                    'empleado_id' => $turno->empleado_id ?? $currentUser->id,
                    'finalizado_at' => now(),
                    'metodo_pago' => $validated['metodo_pago'],
                    'monto_cobrado' => $validated['monto_cobrado'],
                ]);
            });

            $this->flashToast('success', 'Turno finalizado y cobro registrado.');

            return redirect()->back();
        }

        // Si vuelve a pendiente o se cancela
        $turno->update([
            'estado' => $nuevoEstado,
            'empleado_id' => null,
            'finalizado_at' => null,
            'metodo_pago' => 'pendiente',
        ]);

        $mensajes = [
            'pendiente' => 'El turno volvió a Pendiente y quedó libre.',
            'cancelado' => 'Turno cancelado.',
        ];

        $this->flashToast('success', $mensajes[$nuevoEstado] ?? 'Estado actualizado.');

        return redirect()->back();
    }

    /**
     * Elimina físicamente un turno (solo dueños).
     */
    public function destroy(string $tenant, Turno $turno): RedirectResponse
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('delete', $turno);

        $turno->delete();

        $this->flashToast('success', 'Turno eliminado de la agenda.');

        return redirect()->back();
    }

    public function show(string $tenant, Turno $turno): Response
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('view', $turno);

        $turno->load(['cliente', 'mascota', 'realizadoPor', 'servicios']);

        $totalServicios = $turno->servicios->sum(
            fn(Servicio $s) => (float) $s->pivot->precio_historico
        );

        return Inertia::render('tenant/turnos/show', [
            'turno' => [
                'id' => $turno->id,
                'cliente_id' => $turno->cliente_id,
                'mascota_id' => $turno->mascota_id,
                'fecha' => $turno->fecha->format('Y-m-d'),
                'hora' => substr((string) $turno->hora, 0, 5),
                'estado' => $turno->estado,
                'finalizado_at' => $turno->finalizado_at?->format('d/m/Y H:i'),
                'metodo_pago' => $turno->metodo_pago,
                'monto_cobrado' => (float) $turno->monto_cobrado,
                'total_estimado' => (float) $totalServicios,
                'notas_turno' => $turno->notas_turno,
                'cliente' => [
                    'id' => $turno->cliente->id,
                    'nombre' => $turno->cliente->nombre,
                    'apellido' => $turno->cliente->apellido,
                    'telefono' => $turno->cliente->telefono,
                    'email' => $turno->cliente->email,
                ],
                'mascota' => [
                    'id' => $turno->mascota->id,
                    'nombre' => $turno->mascota->nombre,
                    'especie_raza' => $turno->mascota->especie_raza,
                    'dimension' => $turno->mascota->dimension,
                    'observaciones' => $turno->mascota->observaciones,
                ],
                'realizado_por' => $turno->realizadoPor ? [
                    'id' => $turno->realizadoPor->id,
                    'nombre' => $turno->realizadoPor->nombre,
                    'apellido' => $turno->realizadoPor->apellido,
                ] : null,
                'servicios' => $turno->servicios->map(fn(Servicio $s): array => [
                    'id' => $s->id,
                    'nombre' => $s->nombre,
                    'precio_historico' => (float) $s->pivot->precio_historico,
                ])->values(),
            ],
            'clientes' => $this->getClientesCatalogo(),
            'servicios' => $this->getServiciosCatalogo(),
        ]);
    }

    private function getClientesCatalogo(): Collection
    {
        return Cliente::query()
            ->where('activo', true)
            ->with(['mascotas' => fn($q) => $q->where('activo', true)->orderBy('nombre')])
            ->orderBy('apellido')
            ->orderBy('nombre')
            ->get()
            ->map(fn(Cliente $cliente): array => [
                'id' => $cliente->id,
                'nombre' => $cliente->nombre,
                'apellido' => $cliente->apellido,
                'telefono' => $cliente->telefono,
                'mascotas' => $cliente->mascotas->map(fn($mascota): array => [
                    'id' => $mascota->id,
                    'nombre' => $mascota->nombre,
                    'especie_raza' => $mascota->especie_raza,
                    'dimension' => $mascota->dimension,
                ])->values(),
            ]);
    }

    private function getServiciosCatalogo(): Collection
    {
        return Servicio::query()
            ->where('activo', true)
            ->orderBy('nombre')
            ->get()
            ->map(fn(Servicio $servicio): array => [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'precio' => (float) $servicio->precio,
            ]);
    }
    private function parsearFecha(?string $fechaInput): string
    {
        if (! $fechaInput) {
            return now()->toDateString();
        }

        try {
            return Carbon::parse($fechaInput)->toDateString();
        } catch (\Throwable) {
            return now()->toDateString();
        }
    }

    public function exportPdf(Request $request)
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('export', Turno::class);

        $fecha = $this->parsearFecha($request->input('fecha'));
        $carbonFecha = Carbon::parse($fecha);
        $inicioMes = $carbonFecha->copy()->startOfMonth()->toDateString();
        $finMes = $carbonFecha->copy()->endOfMonth()->toDateString();

        $estadosPermitidos = ['pendiente', 'en_proceso', 'listo', 'cancelado'];
        $estadosFiltro = array_values(array_intersect(
            $estadosPermitidos,
            (array) $request->input('estados', [])
        ));

        $turnos = Turno::query()
            ->with(['cliente', 'mascota', 'servicios', 'realizadoPor'])
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->when(! empty($estadosFiltro), fn($q) => $q->whereIn('estado', $estadosFiltro))
            ->orderBy('fecha', 'asc')
            ->orderBy('hora', 'asc')
            ->get();

        $resumen = [
            'total' => $turnos->count(),
            'listos' => $turnos->where('estado', 'listo')->count(),
            'activos' => $turnos->whereIn('estado', ['pendiente', 'en_proceso'])->count(),
            'cancelados' => $turnos->where('estado', 'cancelado')->count(),
            'ingresos' => (float) $turnos->where('estado', 'listo')->sum('monto_cobrado'),
        ];

        $periodoTexto = ucfirst($carbonFecha->locale('es')->translatedFormat('F Y'));
        $nombreArchivo = 'reporte-turnos-' . $carbonFecha->format('Y-m') . '.pdf';

        $pdf = Pdf::loadView('tenant.reportes.reporte-mensual', [
            'nombreComercial' => tenant('nombre_comercial') ?? 'Peluquería Canina',
            'periodoTexto' => $periodoTexto,
            'fechaGeneracion' => now()->format('d/m/Y H:i'),
            'turnos' => $turnos,
            'resumen' => $resumen,
        ])->setPaper('a4', 'landscape');

        return $pdf->stream($nombreArchivo);
    }

    public function exportExcel(Request $request)
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('export', Turno::class);

        $fecha = $this->parsearFecha($request->input('fecha'));
        $carbonFecha = Carbon::parse($fecha);
        $inicioMes = $carbonFecha->copy()->startOfMonth()->toDateString();
        $finMes = $carbonFecha->copy()->endOfMonth()->toDateString();

        $estadosPermitidos = ['pendiente', 'en_proceso', 'listo', 'cancelado'];
        $estadosFiltro = array_values(array_intersect(
            $estadosPermitidos,
            (array) $request->input('estados', [])
        ));

        $nombreArchivo = 'reporte-turnos-' . $carbonFecha->format('Y-m') . '.xlsx';

        return Excel::download(
            new TurnosMensualExport($inicioMes, $finMes, $estadosFiltro),
            $nombreArchivo
        );
    }
}
