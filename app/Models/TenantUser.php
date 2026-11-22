<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

/**
 * @method bool hasRole(string|array|\Spatie\Permission\Contracts\Role $roles, ?string $guard = null)
 * @method bool hasAnyRole(string|array|\Spatie\Permission\Contracts\Role ...$roles)
 * @method bool checkPermissionTo(string|int|\Spatie\Permission\Contracts\Permission $permission, ?string $guardName = null)
 */

class TenantUser extends Authenticatable
{
    //este modelo representa el usuario que Laravel va a buscar en la base tenant
    use HasRoles;
    use HasUuids;
    use HasPermissions;

    protected $table = 'users';
    protected $fillable = [
        'id',
        'nombre',
        'apellido',
        'email',
        'telefono',
        'password',
        'activo',
    ];
    public $incrementing = false;

    protected $keyType = 'string';

    protected $guard_name = 'tenant';

    protected function casts(): array
    {
        return [
            'activo' => 'boolean',
            'password' => 'hashed',
        ];
    }
    public function turnosRealizados()
    {
        return $this->hasMany(Turno::class, 'empleado_id');
    }
}
