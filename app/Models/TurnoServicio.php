<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TurnoServicio extends Pivot
{
    use HasUuids;
    protected $table = 'turno_servicio';
}
