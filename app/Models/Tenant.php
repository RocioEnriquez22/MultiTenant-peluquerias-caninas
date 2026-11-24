<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Illuminate\Support\Facades\Storage;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $fillable = [
        'id',
        'nombre_comercial',
        'logo',
        'nombre_dueño',
        'email_contacto',
        'telefono',
        'whatsapp_phone_number_id',
        'activo',
        'data',
    ];
    protected $appends = ['logo_url'];

    /**
     * Define qué columnas se guardan como columnas reales en la tabla PostgreSQL
     * y cuáles se guardan dentro de la columna JSON 'data'.
     */

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'nombre_comercial',
            'logo',
            'nombre_dueño',
            'email_contacto',
            'telefono',
            'whatsapp_phone_number_id',
            'activo',
        ];
    }

    //asi obtenemos la url dinamicamente 
    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo
            ? Storage::url($this->logo) // devuelve ruta relativa del logo
            : null;
    }
}
