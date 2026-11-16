<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\StoreTenantUserRequest;
use App\Http\Requests\Tenant\TenantUserIndexRequest;
use App\Http\Requests\Tenant\UpdateTenantUserRequest;
use App\Models\TenantUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TenantUserController extends Controller
{
    public function index(TenantUserIndexRequest $request)
    {
        $filtros = $request->validated();
        $buscar = trim($filtros['buscar'] ?? '');
        $rol = $filtros['rol'] ?? null;
        $activo = $filtros['activo'] ?? null;



        // Traemos todos los usuarios del tenant con sus roles asociados haciendo uso del los filtros 
        $usersQuery = TenantUser::query()
            ->with('roles')
            ->when($buscar !== '', function ($query) use ($buscar): void {
                $query->where(function ($query) use ($buscar): void {
                    $query->where('nombre', 'like', "%{$buscar}%")
                        ->orWhere('apellido', 'like', "%{$buscar}%")
                        ->orWhere('email', 'like', "%{$buscar}%")
                        ->orWhere('telefono', 'like', "%{$buscar}%");
                });
            })
            ->when($rol !== null && $rol !== '', function ($query) use ($rol): void {
                $query->whereHas('roles', function ($roleQuery) use ($rol): void {
                    $roleQuery->where('name', $rol)
                        ->where('guard_name', 'tenant');
                });
            })
            ->when($activo !== null && $activo !== '', function ($query) use ($activo): void {
                $query->where('activo', $activo === '1');
            })
            ->latest();

        $users = $usersQuery->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'apellido' => $user->apellido,
                'email' => $user->email,
                'telefono' => $user->telefono,
                'activo' => (bool) $user->activo,
                'roles' => $user->roles->pluck('name'),
                'created_at' => $user->created_at->format('Y-m-d H:i'),
            ];
        });


        $currentUser = auth('tenant')->user();
        $isOwner = $currentUser instanceof TenantUser
            && $currentUser->hasRole('dueño', 'tenant');

        $canCreateOwners = $isOwner
            && $currentUser instanceof TenantUser
            && $currentUser->hasRole('dueño_principal', 'tenant')
            && $currentUser->can('gestionar.users');

        $roles = Role::query()
            ->where('guard_name', 'tenant')
            ->whereIn('name', $canCreateOwners ? ['dueño', 'empleado'] : ['empleado'])
            ->pluck('name');

        $rolesParaFiltros = Role::query()->where('guard_name', 'tenant')
            ->orderBy('name')
            ->pluck('name');

        return Inertia::render('tenant/users/index', [
            'users' => $users,
            'roles' => $roles,
            'filtros' => [
                'buscar' => $buscar,
                'rol' => $rol ?? '',
                'activo' => $activo ?? '',
            ],
            'tenantSlug' => $request->route('tenant'),
            'rolesParaFiltro' => $rolesParaFiltros,
            'isOwner' => $isOwner,
            'canCreateOwners' => $canCreateOwners,
        ]);
    }

    public function store(StoreTenantUserRequest $request)
    {
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('create', TenantUser::class);
        $validated = $request->validated();


        $user = TenantUser::create([
            'nombre' => $validated['nombre'],
            'apellido' => $validated['apellido'] ?? null,
            'email' => $validated['email'],
            'telefono' => $validated['telefono'] ?? null,
            'password' => Hash::make($validated['password']),
            'activo' => true,
        ]);

        $user->assignRole($validated['rol']);
        if ($validated['rol'] === 'empleado') {
            $user->syncPermissions([
                'dashboard.view',
                'turnos.view_all',
                'turnos.view_own',
                'turnos.create_own',
                'turnos.update_own',
                'turnos.cancel_own',
                'kanban.view',
                'kanban.manage_any',
            ]);
        } elseif ($validated['rol'] === 'dueño') {
            $user->syncPermissions(
                Permission::query()->where('guard_name', 'tenant')->get()
            );
        }

        $this->flashToast('success', 'Usuario creado correctamente.');

        return redirect()->back();
    }

    public function update(UpdateTenantUserRequest $request, string $tenant, string $id)
    {
        $user = TenantUser::findOrFail($id);
        $currentUser = auth('tenant')->user();

        $validated = $request->validated();

        $user->update([
            'nombre' => $validated['nombre'],
            'apellido' => $validated['apellido'] ?? null,
            'email' => $validated['email'],
            'telefono' => $validated['telefono'] ?? null,
        ]);

        if (! empty($validated['password'])) {
            $user->update(['password' => Hash::make($validated['password'])]);
        }

        // Sincronizar el nuevo rol
        $user->syncRoles([$validated['rol']]);
        $this->flashToast('success', 'Usuario actualizado correctamente');

        return redirect()->back();
    }

    public function toggleStatus(string $tenant, string $id)
    {
        $user = TenantUser::findOrFail($id);
        $currentUser = auth('tenant')->user();

        Gate::forUser($currentUser)->authorize('toggleStatus', $user);

        // Evitar que el usuario se desactive a sí mismo
        if (auth('tenant')->id() === $user->id) {
            $this->flashToast('error', 'No puedes desactivar tu propia cuenta.');

            return redirect()->back();
        }

        $user->update([
            'activo' => ! $user->activo,
        ]);

        $this->flashToast('success', 'Estado del empleado actualizado.');

        return redirect()->back();
    }

    public function destroy(string $tenant, string $id): RedirectResponse
    {
        $empleado = TenantUser::findOrFail($id);
        $currentUser = auth('tenant')->user();
        Gate::forUser($currentUser)->authorize('delete', $empleado);

        $empleado->delete();
        $this->flashToast('success', 'Empleado eliminado correctamente.');

        return redirect()->route('tenant.users.index', [
            'tenant' => $tenant,
        ]);
    }
}
