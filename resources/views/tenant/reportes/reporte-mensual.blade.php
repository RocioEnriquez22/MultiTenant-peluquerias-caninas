<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte Mensual de Turnos - {{ $periodoTexto }}</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #1f2937;
            margin: 0;
            padding: 16px;
        }

        .header {
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 10px;
            margin-bottom: 16px;
        }

        .header h1 {
            margin: 0 0 4px 0;
            font-size: 18px;
            color: #111827;
        }

        .header p {
            margin: 2px 0;
            color: #4b5563;
            font-size: 11px;
        }

        table.datos {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
        }

        table.datos th {
            background-color: #f3f4f6;
            color: #111827;
            font-weight: bold;
            text-align: left;
            padding: 7px 6px;
            border: 1px solid #d1d5db;
            font-size: 10px;
            text-transform: uppercase;
        }

        table.datos td {
            padding: 6px;
            border: 1px solid #e5e7eb;
            vertical-align: top;
        }

        table.datos tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge-listo {
            background-color: #d1fae5;
            color: #065f46;
        }

        .badge-pendiente {
            background-color: #fef3c7;
            color: #92400e;
        }

        .badge-en_proceso {
            background-color: #dbeafe;
            color: #1e40af;
        }

        .badge-cancelado {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .resumen-box {
            width: 55%;
            margin-left: auto;
            border-collapse: collapse;
        }

        .resumen-box th,
        .resumen-box td {
            border: 1px solid #d1d5db;
            padding: 6px 10px;
        }

        .resumen-box th {
            background-color: #f3f4f6;
            text-align: left;
            width: 65%;
        }

        .resumen-box td {
            text-align: right;
            font-weight: bold;
        }

        .resumen-total {
            background-color: #eef2ff;
            color: #3730a3;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $nombreComercial }} — Reporte Mensual de Turnos</h1>
        <p><strong>Período:</strong> {{ $periodoTexto }} | <strong>Generado el:</strong> {{ $fechaGeneracion }}</p>
    </div>

    <table class="datos">
        <thead>
            <tr>
                <th style="width: 11%;">Fecha / Hora</th>
                <th style="width: 18%;">Cliente</th>
                <th style="width: 15%;">Mascota</th>
                <th style="width: 24%;">Servicios</th>
                <th style="width: 12%;">Estado</th>
                <th style="width: 10%;">Atendió</th>
                <th class="text-right" style="width: 10%;">Importe</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($turnos as $turno)
                @php
                    $etiquetasEstado = [
                        'pendiente' => 'Pendiente',
                        'en_proceso' => 'En proceso',
                        'listo' => 'Listo',
                        'cancelado' => 'Cancelado',
                    ];
                    $importe = $turno->estado === 'listo' ? (float) $turno->monto_cobrado : 0;
                @endphp
                <tr>
                    <td>
                        <strong>{{ $turno->fecha->format('d/m/Y') }}</strong><br>
                        {{ substr((string) $turno->hora, 0, 5) }} hs
                    </td>
                    <td>
                        {{ $turno->cliente->nombre }} {{ $turno->cliente->apellido ?? '' }}<br>
                        <small style="color: #6b7280;">{{ $turno->cliente->telefono }}</small>
                    </td>
                    <td>
                        <strong>{{ $turno->mascota->nombre }}</strong>
                        @if ($turno->mascota->especie_raza)
                            <br><small style="color: #6b7280;">{{ $turno->mascota->especie_raza }}</small>
                        @endif
                    </td>
                    <td>{{ $turno->servicios->pluck('nombre')->implode(', ') ?: '—' }}</td>
                    <td class="text-center">
                        <span class="badge badge-{{ $turno->estado }}">
                            {{ $etiquetasEstado[$turno->estado] ?? $turno->estado }}
                        </span>
                    </td>
                    <td>
                        {{ $turno->realizadoPor ? trim($turno->realizadoPor->nombre . ' ' . ($turno->realizadoPor->apellido ?? '')) : '—' }}
                    </td>
                    <td class="text-right">
                        @if ($turno->estado === 'listo')
                            ${{ number_format($importe, 2, ',', '.') }}
                        @else
                            <span style="color: #9ca3af;">$0,00</span>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="text-center" style="padding: 16px; color: #6b7280;">
                        No se encontraron turnos para los filtros seleccionados en este mes.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{-- Resumen estadístico y financiero al pie --}}
    <table class="resumen-box">
        <tr>
            <th>Total de turnos en el reporte</th>
            <td>{{ $resumen['total'] }}</td>
        </tr>
        <tr>
            <th>Turnos realizados (Listos)</th>
            <td style="color: #065f46;">{{ $resumen['listos'] }}</td>
        </tr>
        <tr>
            <th>Turnos pendientes / en proceso</th>
            <td style="color: #92400e;">{{ $resumen['activos'] }}</td>
        </tr>
        <tr>
            <th>Turnos cancelados</th>
            <td style="color: #991b1b;">{{ $resumen['cancelados'] }}</td>
        </tr>
        <tr class="resumen-total">
            <th>Total ingresos cobrados (Turnos listos)</th>
            <td>${{ number_format($resumen['ingresos'], 2, ',', '.') }}</td>
        </tr>
    </table>
</body>

</html>
