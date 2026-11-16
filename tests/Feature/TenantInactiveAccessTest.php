<?php

use App\Models\TenantUser;
use Illuminate\Support\Facades\DB;
use App\Http\Middleware\HandleInertiaRequests;

beforeEach(function (): void {
    config(['tenancy.bootstrappers' => []]);
    $this->withoutMiddleware(HandleInertiaRequests::class);
});

afterEach(function (): void {
    if (tenancy()->initialized) {
        tenancy()->end();
    }
});

function createTenantForInactiveAccessTest(bool $isActive): string
{
    $tenantId = $isActive
        ? 'tenant-activo-prueba'
        : 'tenant-inactivo-prueba';

    DB::table('tenants')->insert([
        'id' => $tenantId,
        'nombre_comercial' => 'Peluquería de prueba',
        'nombre_dueño' => 'Dueña de prueba',
        'email_contacto' => 'prueba@example.com',
        'telefono' => '111111',
        'activo' => $isActive,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('domains')->insert([
        'domain' => "{$tenantId}.localhost",
        'tenant_id' => $tenantId,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return $tenantId;
}

test('un tenant activo puede mostrar su pagina de login', function () {
    $tenantId = createTenantForInactiveAccessTest(true);

    $this->get("http://{$tenantId}.localhost/login")
        ->assertOk();
});

test('un tenant inactivo no puede mostrar su pagina de login', function () {
    $tenantId = createTenantForInactiveAccessTest(false);

    $this->get("http://{$tenantId}.localhost/login")
        ->assertForbidden();
});

test('un tenant inactivo no puede enviar credenciales de login', function () {
    $tenantId = createTenantForInactiveAccessTest(false);

    $this->post("http://{$tenantId}.localhost/login", [
        'email' => 'persona@example.com',
        'password' => 'password',
    ])->assertForbidden();
});

test('una sesion existente no puede acceder al dashboard de un tenant inactivo', function () {
    $tenantId = createTenantForInactiveAccessTest(false);

    $tenantUser = new TenantUser();
    $tenantUser->forceFill(['id' => 'usuario-de-prueba']);

    $this->actingAs($tenantUser, 'tenant')
        ->get("http://{$tenantId}.localhost/dashboard")
        ->assertForbidden();
});

test('un usuario puede cerrar sesion aunque su tenant este inactivo', function () {
    $tenantId = createTenantForInactiveAccessTest(false);

    $tenantUser = new TenantUser();
    $tenantUser->forceFill(['id' => 'usuario-de-prueba']);

    $this->actingAs($tenantUser, 'tenant')
        ->post("http://{$tenantId}.localhost/logout")
        ->assertRedirect();

    $this->assertGuest('tenant');
});
