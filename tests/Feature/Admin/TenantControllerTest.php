<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;

test('admin users can update a tenant', function () {
    $user = User::factory()->create();
    $user->forceFill(['is_admin' => true])->save();

    DB::table('tenants')->insert([
        'id' => 'tenant-edit',
        'nombre_comercial' => 'Nombre anterior',
        'nombre_dueño' => 'Dueño anterior',
        'email_contacto' => 'anterior@example.com',
        'telefono' => '111111',
        'activo' => true,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $response = $this->actingAs($user)
        ->from(route('admin.tenants.index'))
        ->put(route('admin.tenants.update', ['tenant' => 'tenant-edit']), [
            'nombre_comercial' => 'Peluquería nueva',
            'nombre_dueño' => 'Dueña nueva',
            'email_contacto' => 'nueva@example.com',
            'telefono' => '222222',
        ]);

    $response->assertRedirect(route('admin.tenants.index'));
    $this->assertDatabaseHas('tenants', [
        'id' => 'tenant-edit',
        'nombre_comercial' => 'Peluquería nueva',
        'nombre_dueño' => 'Dueña nueva',
        'email_contacto' => 'nueva@example.com',
        'telefono' => '222222',
    ]);
});

test('invalid tenant updates return validation errors without changing the tenant', function () {
    $user = User::factory()->create();
    $user->forceFill(['is_admin' => true])->save();
    DB::table('tenants')->insert([
        'id' => 'tenant-edit',
        'nombre_comercial' => 'Nombre anterior',
        'nombre_dueño' => 'Dueño anterior',
        'email_contacto' => 'anterior@example.com',
        'telefono' => '111111',
        'activo' => true,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $response = $this->actingAs($user)
        ->from(route('admin.tenants.index'))
        ->put(route('admin.tenants.update', ['tenant' => 'tenant-edit']), [
            'nombre_comercial' => '',
            'nombre_dueño' => 'Dueña nueva',
            'email_contacto' => 'correo-invalido',
            'telefono' => '222222',
        ]);

    $response->assertSessionHasErrors([
        'nombre_comercial',
        'email_contacto',
    ]);
    $this->assertDatabaseHas('tenants', [
        'id' => 'tenant-edit',
        'nombre_comercial' => 'Nombre anterior',
        'nombre_dueño' => 'Dueño anterior',
        'email_contacto' => 'anterior@example.com',
        'telefono' => '111111',
    ]);
});

test('admin can deactivate and reactivate a tenant without changing its other data', function () {
    $user = User::factory()->create();
    $user->forceFill(['is_admin' => true])->save();

    DB::table('tenants')->insert([
        'id' => 'tenant-toggle',
        'nombre_comercial' => 'Peluquería de prueba',
        'nombre_dueño' => 'Dueña de prueba',
        'email_contacto' => 'prueba@example.com',
        'telefono' => '111111',
        'activo' => true,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $this->actingAs($user)
        ->from(route('admin.tenants.index'))
        ->patch(route('admin.tenants.toggle', ['tenant' => 'tenant-toggle']))
        ->assertRedirect(route('admin.tenants.index'));

    $this->assertDatabaseHas('tenants', [
        'id' => 'tenant-toggle',
        'activo' => false,
        'nombre_comercial' => 'Peluquería de prueba',
        'nombre_dueño' => 'Dueña de prueba',
    ]);

    $this->actingAs($user)
        ->from(route('admin.tenants.index'))
        ->patch(route('admin.tenants.toggle', ['tenant' => 'tenant-toggle']))
        ->assertRedirect(route('admin.tenants.index'));

    $this->assertDatabaseHas('tenants', [
        'id' => 'tenant-toggle',
        'activo' => true,
        'nombre_comercial' => 'Peluquería de prueba',
        'nombre_dueño' => 'Dueña de prueba',
    ]);
});
