<?php

namespace Database\Factories;

use App\Models\Mascota;
use App\Models\Servicio;
use App\Models\TenantUser;
use App\Models\Turno;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Turno>
 */
class TurnoFactory extends Factory
{
    protected $model = Turno::class;

    public function definition(): array
    {
        // Reutiliza una mascota activa existente junto con su dueño real
        $mascota = Mascota::query()
            ->where('activo', true)
            ->whereHas('cliente', fn($q) => $q->where('activo', true))
            ->inRandomOrder()
            ->first();

        if (! $mascota) {
            $mascota = Mascota::factory()->create();
        }


        $horasDisponibles = [
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
        ];

        $estado = fake()->randomElement([
            'pendiente',
            'pendiente',
            'en_proceso',
            'listo',
            'cancelado',
        ]);

        $esListo = $estado === 'listo';
        $empleado = $esListo ? TenantUser::query()->inRandomOrder()->first() : null;

        $notasPosibles = [
            'Corte higiénico y despeje de ojos.',
            'Baño con champú neutro.',
            'El dueño pidió corte bajo en cuerpo y patas redondeadas.',
            'Retira otro familiar.',
            null,
            null,
            null,
        ];

        return [
            'cliente_id' => $mascota->cliente_id,
            'mascota_id' => $mascota->id,
            'empleado_id' => $empleado?->id,
            'fecha' => fake()->dateTimeBetween('-5 days', '+20 days')->format('Y-m-d'),
            'hora' => fake()->randomElement($horasDisponibles),
            'estado' => $estado,
            'finalizado_at' => $esListo ? now() : null,
            'metodo_pago' => $esListo
                ? fake()->randomElement(['efectivo', 'mercado_pago', 'transferencia'])
                : 'pendiente',
            'monto_cobrado' => 0,
            'notas_turno' => fake()->randomElement($notasPosibles),
        ];
    }


    //Asocia entre 1 y 3 servicios reales en la tabla pivote y calcula el monto total.

    public function configure(): static
    {
        return $this->afterCreating(function (Turno $turno): void {
            $servicios = Servicio::query()
                ->where('activo', true)
                ->inRandomOrder()
                ->limit(fake()->numberBetween(1, 3))
                ->get();

            if ($servicios->isEmpty()) {
                return;
            }

            $pivotData = [];
            $total = 0;

            foreach ($servicios as $servicio) {
                $pivotData[$servicio->id] = [
                    'precio_historico' => $servicio->precio,
                ];
                $total += (float) $servicio->precio;
            }

            $turno->servicios()->attach($pivotData);

            $turno->updateQuietly([
                'monto_cobrado' => $total,
            ]);
        });
    }

    public function paraHoy(): static
    {
        return $this->state(fn(): array => [
            'fecha' => now()->toDateString(),
        ]);
    }
}
