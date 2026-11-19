import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::update
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:32
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
export const update = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/settings/negocio/logo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::update
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:32
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
update.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::update
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:32
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
update.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::update
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:32
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
    const updateForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::update
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:32
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
        updateForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::destroy
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:58
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
export const destroy = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '//{tenant}.localhost/settings/negocio/logo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::destroy
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:58
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
destroy.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                }

    return destroy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::destroy
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:58
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
destroy.delete = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::destroy
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:58
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
    const destroyForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::destroy
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:58
 * @route '//{tenant}.localhost/settings/negocio/logo'
 */
        destroyForm.delete = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const logo = {
    update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default logo