<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Servicio;
use App\Policies\ServicioPolicy;

use App\Models\Cliente;
use App\Models\Mascota;
use App\Models\TenantUser;
use App\Models\Turno;
use App\Models\Tenant;
use App\Policies\ClientePolicy;
use App\Policies\MascotaPolicy;
use App\Policies\TenantUserPolicy;
use App\Policies\TurnoPolicy;
use App\Policies\BusinessSettingsPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('access-admin', function (User $user) {
            return (bool) $user->is_admin;
        });

        Gate::policy(Servicio::class, ServicioPolicy::class);
        Gate::policy(Cliente::class, ClientePolicy::class);
        Gate::policy(Mascota::class, MascotaPolicy::class);
        Gate::policy(Turno::class, TurnoPolicy::class);
        Gate::policy(TenantUser::class, TenantUserPolicy::class);
        Gate::policy(Tenant::class, BusinessSettingsPolicy::class);
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null,
        );
    }
}
