import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
 */
export const edit = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
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
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
 */
edit.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
 */
edit.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
 */
    const editForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
 */
        editForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::edit
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:17
 * @route '//{tenant}.localhost/settings/profile'
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
/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:33
 * @route '//{tenant}.localhost/settings/profile'
 */
export const update = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '//{tenant}.localhost/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:33
 * @route '//{tenant}.localhost/settings/profile'
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
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:33
 * @route '//{tenant}.localhost/settings/profile'
 */
update.patch = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:33
 * @route '//{tenant}.localhost/settings/profile'
 */
    const updateForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantProfileSettingsController::update
 * @see app/Http/Controllers/Tenant/TenantProfileSettingsController.php:33
 * @route '//{tenant}.localhost/settings/profile'
 */
        updateForm.patch = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const profile = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default profile