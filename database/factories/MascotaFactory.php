<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\Mascota;
use Illuminate\Database\Eloquent\Factories\Factory;

class MascotaFactory extends Factory
{
    protected $model = Mascota::class;

    public function definition(): array
    {
        $razas = [
            'Caniche Toy',
            'Golden Retriever',
            'Bulldog Francés',
            'Mestizo',
            'Schnauzer Miniatura',
            'Labrador',
            'Yorkshire Terrier',
            'Salchicha',
            'Beagle',
            'Cocker',
        ];

        $dimensiones = ['Pequeño', 'Mediano', 'Grande', 'Gigante'];

        $observacionesPosibles = [
            'Alérgico a champú con perfume, usar neutro.',
            'Nervioso con el ruido del secador.',
            'Muy dócil, se deja cortar las uñas sin problema.',
            'Nudos frecuentes detrás de las orejas.',
            null,
            null,
        ];

        $nombresMascotas = [
            'Max',
            'Puflito',
            'Luna',
            'Toby',
            'Bella',
            'Rocky',
            'Lola',
            'Bruno',
            'Coco',
            'Nala',
            'Simba',
            'Milo',
            'Kira',
            'Zeus',
            'Mia',
            'Thor',
            'Nina',
            'Leo',
            'Duque',
            'Canela'
        ];

        return [
            'cliente_id' => Cliente::factory(),
            'nombre' => fake()->randomElement($nombresMascotas),
            'especie_raza' => fake()->randomElement($razas),
            'dimension' => fake()->randomElement($dimensiones),
            'observaciones' => fake()->randomElement($observacionesPosibles),
            'activo' => true,
        ];
    }
}
