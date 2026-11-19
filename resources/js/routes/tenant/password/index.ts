import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:61
 * @route '//{tenant}.localhost/settings/password'
 */
export const update = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '//{tenant}.localhost/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:61
 * @route '//{tenant}.localhost/settings/password'
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
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:61
 * @route '//{tenant}.localhost/settings/password'
 */
update.put = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:61
 * @route '//{tenant}.localhost/settings/password'
 */
    const updateForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:61
 * @route '//{tenant}.localhost/settings/password'
 */
        updateForm.put = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const password = {
    update: Object.assign(update, update),
}

export default password