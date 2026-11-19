import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import logo from './logo'
/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
 */
export const edit = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/settings/negocio',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
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
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
 */
edit.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
 */
edit.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
 */
    const editForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
 */
        editForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\BusinessSettingsController::edit
 * @see app/Http/Controllers/Tenant/BusinessSettingsController.php:17
 * @route '//{tenant}.localhost/settings/negocio'
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
const settings = {
    edit: Object.assign(edit, edit),
logo: Object.assign(logo, logo),
}

export default settings