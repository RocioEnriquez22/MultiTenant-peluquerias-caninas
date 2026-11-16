<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Servicio extends Model
{
    use HasUuids;
    protected $table = 'servicios';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'activo',
    ];

    //no hace falta incluir created_at y updated_at, que Eloquent administra automáticamente.


    protected function casts(): array
    {
        return [
            'precio' => 'decimal:2',
            'activo' => 'boolean',
        ];
    }

    public function turnos(): BelongsToMany
    {
        return $this->belongsToMany(Turno::class, 'turno_servicio', 'servicio_id', 'turno_id')
            ->withPivot(['id', 'precio_historico'])
            ->withTimestamps();
    }
}
