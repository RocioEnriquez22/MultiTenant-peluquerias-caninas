<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\TenantUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class TenantUserPermissionController extends Controller
{
    private const PROTECTED_PERMISSIONS = [
        'gestionar.users',
        'gestionar.permisos',
    ];

    public function edit(string $tenant, string $id): Response
    {
        $employee = $this->findAutorizedUser($id);

        $permissions = Permission::query()
            ->where('guard_name', 'tenant')
            ->whereNotIn('name', self::PROTECTED_PERMISSIONS)
            ->orderBy('name')
            ->get(['name']);

        return Inertia::render('tenant/users/permissions', [
            'user' => [
                'id' => $employee->id,
                'nombre' => $employee->nombre,
                'apellido' => $employee->apellido,
            ],
            'permissions' => $permissions,
            'assignedPermissions' => $employee
                ->getDirectPermissions()
                ->pluck('name')
                ->reject(fn (string $permission): bool => in_array(
                    $permission,
                    self::PROTECTED_PERMISSIONS,
                    true,
                ))
                ->values(),
        ]);
    }

    public function update(Request $request, string $tenant, string $id): RedirectResponse
    {
        $employee = $this->findAutorizedUser($id);

        $assignablePermissionNames = Permission::query()
            ->where('guard_name', 'tenant')
            ->whereNotIn('name', self::PROTECTED_PERMISSIONS)
            ->pluck('name')
            ->all();

        $validated = $request->validate([
            'permissions' => ['present', 'array'],
            'permissions.*' => [
                'string',
                'distinct',
                Rule::in($assignablePermissionNames),
            ],
        ]);

        $protectedPermissions = $employee->getDirectPermissions()
            ->whereIn('name', self::PROTECTED_PERMISSIONS)
            ->pluck('name')
            ->all();

        $employee->syncPermissions([
            ...$validated['permissions'],
            ...$protectedPermissions,
        ]);
        $this->flashToast('success', 'Permisos actualizados para '.$employee->nombre.' '.$employee->apellido.'.');

        return redirect()->route('tenant.users.index', [
            'tenant' => $tenant,
        ]);
    }

    private function findAutorizedUser(string $id): TenantUser
    {
        $employee = TenantUser::findOrFail($id);

        Gate::forUser(auth('tenant')->user())->authorize('managePermissions', $employee);

        return $employee;
    }
}
