<?php

use App\Models\TenantUser;
use App\Policies\TenantUserPolicy;

it('allows only the primary owner to assign the owner role', function () {
    $principal = Mockery::mock(TenantUser::class)->makePartial();
    $principal->shouldReceive('hasRole')
        ->with('dueño', 'tenant')
        ->andReturn(true);
    $principal->shouldReceive('can')
        ->with('gestionar.users')
        ->andReturn(true);
    $principal->shouldReceive('hasRole')
        ->with('dueño_principal', 'tenant')
        ->andReturn(true);

    $secondaryOwner = Mockery::mock(TenantUser::class)->makePartial();
    $secondaryOwner->shouldReceive('hasRole')
        ->with('dueño', 'tenant')
        ->andReturn(true);
    $secondaryOwner->shouldReceive('can')
        ->with('gestionar.users')
        ->andReturn(true);
    $secondaryOwner->shouldReceive('hasRole')
        ->with('dueño_principal', 'tenant')
        ->andReturn(false);

    $policy = new TenantUserPolicy;

    expect($policy->assignOwnerRole($principal))->toBeTrue()
        ->and($policy->assignOwnerRole($secondaryOwner))->toBeFalse();
});
