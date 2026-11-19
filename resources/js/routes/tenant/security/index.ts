import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
export const edit = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/settings/security',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
edit.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
edit.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
edit.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
    const editForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
        editForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:81
 * @route '//{tenant}.localhost/settings/security'
 */
        editForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
const security = {
    edit: Object.assign(edit, edit),
}

export default security