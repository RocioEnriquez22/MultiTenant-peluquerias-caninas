<?php

//El TenancyServiceProvider ya carga ese archivo aplicando el middleware de tenancy.
// Por ello no agrego de nuevo InitializeTenancyByDomain a cada ruta.
declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tenant\Auth\TenantSessionController;

use Inertia\Inertia;
use App\Http\Controllers\Tenant\TenantUserController;
use App\Http\Controllers\Tenant\TenantUserPermissionController;
use App\Http\Controllers\Tenant\TurnoController;
use App\Http\Middleware\EnsureTenantIsActive;
use App\Http\Controllers\Tenant\ServicioController;
use App\Http\Controllers\Tenant\DashboardController;
use App\Http\Controllers\Tenant\ClienteController;
use App\Http\Controllers\Tenant\MascotaController;

use App\Http\Controllers\Tenant\BusinessSettingsController;
use App\Http\Controllers\Tenant\TenantProfileSettingsController;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::domain('{tenant}.' . config('app.central_domain', 'localhost'))
    ->where(['tenant' => '[a-z0-9-]+'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('tenant/welcome', [
                'tenant' => [
                    'id' => tenant('id'),
                    'nombre' => tenant('nombre_comercial'),
                ],
            ]);
        })->name('tenant.home');

        Route::middleware([EnsureTenantIsActive::class, 'guest:tenant',])->group(function () {
            Route::get('/login', [
                TenantSessionController::class,
                'create'
            ])->name('tenant.login');
            Route::post('/login', [
                TenantSessionController::class,
                'store',
            ])->middleware('throttle:login')->name('tenant.authenticate');
        });


        Route::middleware([EnsureTenantIsActive::class, 'auth:tenant',])->group(function () {
            //Dashboard del Tenant
            Route::get('/dashboard', [DashboardController::class, 'index'])
                ->middleware('can:dashboard.view')
                ->name('tenant.dashboard');

            //rutas para gestionar los users
            Route::middleware(['permission:gestionar.users'])->group(function () {
                Route::get('/users', [TenantUserController::class, 'index'])->name('tenant.users.index');
                Route::post('/users', [TenantUserController::class, 'store'])->name('tenant.users.store');
                Route::put('/users/{id}', [TenantUserController::class, 'update'])->name('tenant.users.update');
                Route::patch('/users/{id}/toggle', [TenantUserController::class, 'toggleStatus'])->name('tenant.users.toggle');
                Route::delete('/users/{id}', [TenantUserController::class, 'destroy'])->middleware('role:dueño,tenant')->name('tenant.users.destroy');
            });
            //rutas para el manejo de los permisos
            Route::middleware(['permission:gestionar.permisos'])->group(function () {
                Route::get('/users/{id}/permissions', [
                    TenantUserPermissionController::class,
                    'edit',
                ])->name('tenant.users.permissions.edit');

                Route::put('/users/{id}/permissions', [
                    TenantUserPermissionController::class,
                    'update',
                ])->name('tenant.users.permissions.update');
            });

            //rutas para la gestion de servicios
            Route::patch('/servicios/{id}/toggle', [ServicioController::class, 'toggleStatus'])->name('tenant.servicios.toggle');

            Route::resource('servicios', ServicioController::class)
                ->only(['index', 'store', 'update', 'destroy'])
                ->names('tenant.servicios');

            //rutas para clientes y mascotas 
            Route::patch('/clientes/{cliente}/toggle', [ClienteController::class, 'toggleStatus'])
                ->name('tenant.clientes.toggle')->middleware('role:dueño_principal|dueño,tenant');
            Route::resource('clientes', ClienteController::class)
                ->only(['index', 'store', 'update'])
                ->names('tenant.clientes')
                ->parameters(['clientes' => 'cliente']);  // El parámetro será {cliente}

            Route::patch('/clientes/{cliente}/mascotas/{mascota}/toggle', [MascotaController::class, 'toggleStatus'])
                ->name('tenant.clientes.mascotas.toggle')
                ->middleware('role:dueño_principal|dueño,tenant'); // las rutas de las mascotas son anidadas, para verificar a que cliente pertenece

            Route::resource('clientes.mascotas', MascotaController::class)
                ->only(['store', 'update', 'index'])
                ->names('tenant.clientes.mascotas')
                ->parameters([
                    'clientes' => 'cliente',
                    'mascotas' => 'mascota'
                ]);

            //rutas para turnos ()
            Route::get('/turnos/calendario/export-pdf', [TurnoController::class, 'exportPdf'])
                ->name('tenant.turnos.export-pdf')
                ->middleware('permission:analytics.report');

            Route::get('/turnos/calendario/export-excel', [TurnoController::class, 'exportExcel'])
                ->name('tenant.turnos.export-excel');

            Route::get('/turnos/calendario', [TurnoController::class, 'calendario'])
                ->name('tenant.turnos.calendario');

            Route::patch('/turnos/{turno}/estado', [TurnoController::class, 'cambiarEstado'])
                ->name('tenant.turnos.estado');
            Route::resource('turnos', TurnoController::class)
                ->only(['index', 'show', 'store', 'update', 'destroy'])
                ->names('tenant.turnos')
                ->parameters(['turnos' => 'turno']);
        });

        //rutas para el logo y setting de los tenants
        // Settings del Tenant
        Route::redirect('/settings', '/settings/profile');

        Route::get('/settings/profile', [TenantProfileSettingsController::class, 'edit'])
            ->name('tenant.profile.edit');
        Route::patch('/settings/profile', [TenantProfileSettingsController::class, 'update'])
            ->name('tenant.profile.update');

        Route::get('/settings/security', [TenantProfileSettingsController::class, 'editSecurity'])
            ->name('tenant.security.edit');
        Route::put('/settings/password', [TenantProfileSettingsController::class, 'updatePassword'])
            ->middleware('throttle:6,1')
            ->name('tenant.password.update');

        Route::inertia('/settings/appearance', 'tenant/settings/appearance')
            ->name('tenant.appearance.edit');

        // Configuración del negocio (solo dueño_principal / permiso business_settings.manage)
        Route::get('/settings/negocio', [BusinessSettingsController::class, 'edit'])
            ->name('tenant.settings.edit');
        Route::post('/settings/negocio/logo', [BusinessSettingsController::class, 'updateLogo'])
            ->name('tenant.settings.logo.update');
        Route::delete('/settings/negocio/logo', [BusinessSettingsController::class, 'destroyLogo'])
            ->name('tenant.settings.logo.destroy');


        Route::middleware('auth:tenant')->post(
            '/logout',
            [TenantSessionController::class, 'destroy'],
        )->name('tenant.logout');
    });
