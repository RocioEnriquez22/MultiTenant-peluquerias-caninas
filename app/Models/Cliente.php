<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cliente extends Model
{
    use HasUuids, HasFactory;
    protected $table = 'clientes';
    protected $fillable = [
        'nombre',
        'apellido',
        'telefono',
        'email',
        'direccion',
        'notas',
        'activo',
    ];
    protected function casts(): array
    {
        return [
            'activo' => 'boolean',
        ];
    }
    public function mascotas(): HasMany
    {
        return $this->hasMany(Mascota::class, 'cliente_id');
    }
}
