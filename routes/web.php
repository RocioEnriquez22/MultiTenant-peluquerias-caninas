<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Middleware\PreventAccessFromTenantDomains;



// Aplicamos PreventAccessFromTenantDomains para que estas rutas
// SOLO respondan en el dominio central (localhost:8000)
Route::domain(config('app.central_domain', 'localhost'))
    ->middleware([
        'web',
        PreventAccessFromTenantDomains::class,
    ])->group(function () {
        Route::inertia('/', 'welcome')->name('home');

        // Rutas autenticadas para la Moderadora en el Dominio Central
        Route::middleware(['auth', 'verified'])->group(function () {
            Route::inertia('dashboard', 'dashboard')->name('dashboard');

            // Módulo de Gestión de Tenants (Peluquerías)
            Route::prefix('admin')->name('admin.')->middleware('can:access-admin')->group(function () {
                Route::get('/tenants', [TenantController::class, 'index'])->name('tenants.index');
                Route::post('/tenants', [TenantController::class, 'store'])->name('tenants.store');
                Route::put('/tenants/{tenant}', [TenantController::class, 'update'])->name('tenants.update');
                Route::patch('/tenants/{tenant}/toggle', [TenantController::class, 'toggleStatus'])->name('tenants.toggle');
                Route::delete('/tenants/{id}', [TenantController::class, 'destroy'])->name('tenants.destroy');
            });
        });
    });
require __DIR__ . '/settings.php';
