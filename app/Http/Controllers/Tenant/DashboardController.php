<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Mascota;
use App\Models\Servicio;
use App\Models\TenantUser;
use App\Models\Turno;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{

    public function index(): Response
    {
        $inicioMes = now()->startOfMonth()->toDateString();
        $finMes = now()->endOfMonth()->toDateString();
        $hoy = now()->toDateString();
        //Tarjetas para las metricas principaless del negocio

        $ingresoMes = (float) Turno::query()
            ->where('estado', 'listo')
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->sum('monto_cobrado');

        $ingresoHoy = (float)Turno::query()
            ->where('estado', 'listo')
            ->whereDate('fecha', $hoy)
            ->sum('monto_cobrado');

        $turnosMes = Turno::query()
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->where('estado', '!=', 'cancelado')
            ->count();

        $turnosHoy = Turno::query()
            ->whereDate('fecha', $hoy)
            ->where('estado', '!=', 'cancelado')
            ->count();

        $turnosListosMes = Turno::query()
            ->where('estado', 'listo')
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->count();

        $turnosCanceladosMes = Turno::query()
            ->where('estado', 'cancelado')
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->count();

        $totalCerrados = $turnosListosMes + $turnosCanceladosMes;
        $tasaAsistencia = $totalCerrados > 0
            ? (int) round(($turnosListosMes / $totalCerrados) * 100)
            : 100;


        $metrics = [
            'ingresos_mes' => $ingresoMes,
            'ingresos_hoy' => $ingresoHoy,
            'turnos_mes' => $turnosMes,
            'turnos_hoy' => $turnosHoy,
            'clientes_activos' => Cliente::where('activo', true)->count(),
            'mascotas_activas' => Mascota::where('activo', true)->count(),
            'tasa_asistencia' => $tasaAsistencia,
            'turnos_listos_mes' => $turnosListosMes,
        ];


        //Grafico de Barras Servicios mas Solicitados
        $serviciosSolicitados = Servicio::query()
            ->where('activo', true)
            ->withCount(['turnos' => fn($q) => $q->where('estado', '!=', 'cancelado')])
            ->orderByDesc('turnos_count')
            ->take(6)
            ->get()
            ->map(fn(Servicio $s): array => [
                'name' => $s->nombre,
                'cantidad' => (int) $s->turnos_count,
                'precio' => (float) $s->precio,
            ]);

        //Grafico como pieChart 
        $etiquetasPago = [
            'efectivo' => 'Efectivo',
            'mercado_pago' => 'Mercado Pago',
            'transferencia' => 'Transferencia',
            'pendiente' => 'Pendiente',
        ];
        $ingresosPorMetodo = Turno::query()
            ->select('metodo_pago', DB::raw('SUM(monto_cobrado) as total'))
            ->where('estado', 'listo')
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->groupBy('metodo_pago')
            ->get()
            ->map(fn($item): array => [
                'name' => $etiquetasPago[$item->metodo_pago] ?? ucfirst((string) $item->metodo_pago),
                'value' => (float) $item->total,
            ]);

        //Turnos realizados y facturacion de cada empleado en mes
        $rendimientoEquipo = TenantUser::query()
            ->where('activo', true)
            ->withCount([
                'turnosRealizados' => fn($q) => $q
                    ->where('estado', 'listo')
                    ->whereBetween('fecha', [$inicioMes, $finMes]),
            ])
            ->withSum([
                'turnosRealizados as total_facturado' => fn($q) => $q
                    ->where('estado', 'listo')
                    ->whereBetween('fecha', [$inicioMes, $finMes]),
            ], 'monto_cobrado')
            ->orderByDesc('turnos_realizados_count')
            ->get()
            ->map(fn(TenantUser $emp): array => [
                'id' => $emp->id,
                'nombre' => trim($emp->nombre . ' ' . ($emp->apellido ?? '')),
                'turnos_count' => (int) $emp->turnos_realizados_count,
                'total_facturado' => (float) ($emp->total_facturado ?? 0),
            ]);

        //tabla de los ultimos 6 turnos finalizados
        $ultimosTurnos = Turno::query()
            ->with(['cliente', 'mascota', 'servicios', 'realizadoPor'])
            ->where('estado', 'listo')
            ->orderByDesc('fecha')
            ->orderByDesc('hora')
            ->take(6)
            ->get()
            ->map(fn(Turno $t): array => [
                'id' => $t->id,
                'fecha' => $t->fecha->format('d/m/Y'),
                'hora' => substr((string) $t->hora, 0, 5),
                'mascota' => $t->mascota->nombre,
                'cliente' => trim($t->cliente->nombre . ' ' . ($t->cliente->apellido ?? '')),
                'servicios' => $t->servicios->pluck('nombre')->values()->all(),
                'empleado' => $t->realizadoPor
                    ? trim($t->realizadoPor->nombre . ' ' . ($t->realizadoPor->apellido ?? ''))
                    : 'Sin asignar',
                'metodo_pago' => $etiquetasPago[$t->metodo_pago] ?? $t->metodo_pago,
                'monto_cobrado' => (float) $t->monto_cobrado,
            ]);

        return Inertia::render('tenant/tenantDashboard', [
            'tenant' => [
                'id' => tenant('id'),
                'nombre' => tenant('nombre_comercial'),
                'dueño' => tenant('nombre_dueño'),
            ],
            'metrics' => $metrics,
            'serviciosSolicitados' => $serviciosSolicitados,
            'ingresosPorMetodo' => $ingresosPorMetodo,
            'rendimientoEquipo' => $rendimientoEquipo,
            'ultimosTurnos' => $ultimosTurnos,
        ]);
    }
}
