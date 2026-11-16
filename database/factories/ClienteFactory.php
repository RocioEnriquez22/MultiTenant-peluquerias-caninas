<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\Mascota;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cliente>
 */
class ClienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Cliente::class;
    public function definition(): array
    {
        return [
            'nombre' => fake('es_ES')->firstName(),
            'apellido' => fake('es_ES')->lastName(),
            'telefono' => '+549' . fake()->numerify('388#######'),
            'email' => fake()->unique()->safeEmail(),
            'direccion' => fake('es_ES')->streetAddress(),
            'notas' => fake()->optional(0.4)->sentence(),
            'activo' => fake()->boolean(90),
        ];
    }
    public function conMascotas(int $min = 1, int $max = 4): static
    {
        return $this->afterCreating(function (Cliente $cliente) use ($min, $max) {
            Mascota::factory()
                ->count(fake()->numberBetween($min, $max))
                ->create([
                    'cliente_id' => $cliente->id,
                ]);
        });
    }
}
