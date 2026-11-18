<?php

namespace App\Exports;

use App\Models\Turno;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TurnosMensualExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithEvents
{
    use Exportable;

    protected string $inicioMes;
    protected string $finMes;
    protected array $estados;

    protected int $totalTurnos = 0;
    protected int $totalListos = 0;
    protected int $totalCancelados = 0;
    protected int $totalActivos = 0;
    protected float $totalIngresos = 0.0;

    public function __construct(string $inicioMes, string $finMes, array $estados = [])
    {
        $this->inicioMes = $inicioMes;
        $this->finMes = $finMes;
        $this->estados = $estados;
    }

    public function query(): Builder
    {
        return Turno::query()
            ->with(['cliente', 'mascota', 'servicios', 'realizadoPor'])
            ->whereBetween('fecha', [$this->inicioMes, $this->finMes])
            ->when(! empty($this->estados), fn(Builder $q) => $q->whereIn('estado', $this->estados))
            ->orderBy('fecha', 'asc')
            ->orderBy('hora', 'asc');
    }

    public function headings(): array
    {
        return [
            'Fecha',
            'Hora',
            'Cliente',
            'Teléfono',
            'Mascota',
            'Servicios',
            'Estado',
            'Atendido por',
            'Medio de Pago',
            'Importe Cobrado ($)',
        ];
    }

    public function map($turno): array
    {
        $etiquetasEstado = [
            'pendiente' => 'Pendiente',
            'en_proceso' => 'En proceso',
            'listo' => 'Listo',
            'cancelado' => 'Cancelado',
        ];

        $etiquetasPago = [
            'efectivo' => 'Efectivo',
            'mercado_pago' => 'Mercado Pago',
            'transferencia' => 'Transferencia',
            'pendiente' => 'Pendiente',
        ];

        $esListo = $turno->estado === 'listo';
        $importe = $esListo ? (float) $turno->monto_cobrado : 0.0;

        // Acumular estadísticas para el resumen final del Excel
        $this->totalTurnos++;
        if ($turno->estado === 'listo') {
            $this->totalListos++;
            $this->totalIngresos += $importe;
        } elseif ($turno->estado === 'cancelado') {
            $this->totalCancelados++;
        } else {
            $this->totalActivos++;
        }

        return [
            $turno->fecha->format('d/m/Y'),
            substr((string) $turno->hora, 0, 5),
            trim($turno->cliente->nombre . ' ' . ($turno->cliente->apellido ?? '')),
            $turno->cliente->telefono ?? '—',
            $turno->mascota->nombre . ($turno->mascota->especie_raza ? " ({$turno->mascota->especie_raza})" : ''),
            $turno->servicios->pluck('nombre')->implode(', '),
            $etiquetasEstado[$turno->estado] ?? $turno->estado,
            $turno->realizadoPor
                ? trim($turno->realizadoPor->nombre . ' ' . ($turno->realizadoPor->apellido ?? ''))
                : 'Sin asignar',
            $esListo ? ($etiquetasPago[$turno->metodo_pago] ?? $turno->metodo_pago) : '—',
            $importe,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '4F46E5'],
                ],
            ],
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event): void {
                $sheet = $event->sheet->getDelegate();
                $ultimaFilaDatos = $this->totalTurnos + 1;

                // Pintar filas según estado y aplicar bordes a la tabla
                for ($row = 2; $row <= $ultimaFilaDatos; $row++) {
                    $estadoCelda = $sheet->getCell("G{$row}")->getValue();

                    $colorFila = match ($estadoCelda) {
                        'Listo' => 'ECFDF5',      // Verde suave
                        'Cancelado' => 'FEF2F2',  // Rojo suave
                        'En proceso' => 'EFF6FF', // Azul suave
                        default => 'FFFBEB',      // Ámbar suave (Pendiente)
                    };

                    $sheet->getStyle("A{$row}:J{$row}")->applyFromArray([
                        'fill' => [
                            'fillType' => Fill::FILL_SOLID,
                            'startColor' => ['rgb' => $colorFila],
                        ],
                    ]);
                }

                // Bordes en toda la tabla principal
                $sheet->getStyle("A1:J{$ultimaFilaDatos}")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => 'D1D5DB'],
                        ],
                    ],
                ]);

                // Formato moneda en columna J
                if ($ultimaFilaDatos >= 2) {
                    $sheet->getStyle("J2:J{$ultimaFilaDatos}")
                        ->getNumberFormat()
                        ->setFormatCode('"$"#,##0.00');
                }

                // Bloque de Resumen al final de la hoja
                $filaInicioResumen = $ultimaFilaDatos + 2;
                $resumenFilas = [
                    ['Total de turnos del mes:', $this->totalTurnos],
                    ['Turnos realizados (Listos):', $this->totalListos],
                    ['Turnos pendientes / en proceso:', $this->totalActivos],
                    ['Turnos cancelados:', $this->totalCancelados],
                    ['Total ingresos cobrados ($):', $this->totalIngresos],
                ];

                foreach ($resumenFilas as $offset => [$etiqueta, $valor]) {
                    $r = $filaInicioResumen + $offset;
                    $sheet->setCellValue("I{$r}", $etiqueta);
                    $sheet->setCellValue("J{$r}", $valor);
                    $sheet->getStyle("I{$r}:J{$r}")->getFont()->setBold(true);
                    $sheet->getStyle("I{$r}:J{$r}")->applyFromArray([
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => '9CA3AF'],
                            ],
                        ],
                    ]);
                }

                // Resaltar fila total de ingresos
                $filaTotal = $filaInicioResumen + 4;
                $sheet->getStyle("I{$filaTotal}:J{$filaTotal}")->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'E0E7FF'],
                    ],
                ]);
                $sheet->getStyle("J{$filaTotal}")
                    ->getNumberFormat()
                    ->setFormatCode('"$"#,##0.00');
            },
        ];
    }
}
