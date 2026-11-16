<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Database\Factories\TurnoFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Turno extends Model
{
    use HasUuids;
    use HasFactory;
    protected $table = 'turnos';

    protected $fillable = [
        'cliente_id',
        'mascota_id',
        'empleado_id',
        'fecha',
        'hora',
        'estado',
        'finalizado_at',
        'metodo_pago',
        'monto_cobrado',
        'confirmacion_enviada',
        'recordatorio_enviado',
        'fecha_envio_recordatorio',
        'notas_turno',
    ];
    protected $casts = [
        'fecha' => 'date:Y-m-d',
        'finalizado_at' => 'datetime',
        'monto_cobrado' => 'decimal:2',
        'confirmacion_enviada' => 'boolean',
        'recordatorio_enviado' => 'boolean',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function mascota(): BelongsTo
    {
        return $this->belongsTo(Mascota::class, 'mascota_id');
    }
    public function realizadoPor(): BelongsTo
    {
        return $this->belongsTo(TenantUser::class, 'empleado_id');
    }
    //relacion de muchos a muchos con servicios
    public function servicios(): BelongsToMany
    {
        return $this->belongsToMany(Servicio::class, 'turno_servicio', 'turno_id', 'servicio_id')
            ->using(TurnoServicio::class)
            ->withPivot(['id', 'precio_historico'])
            ->withTimestamps();
    }
}
