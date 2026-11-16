import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
export const edit = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/users/{id}/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
edit.url = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                id: args.id,
                }

    return edit.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
edit.get = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
edit.head = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
    const editForm = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
        editForm.get = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::edit
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:22
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
        editForm.head = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::update
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:51
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
export const update = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '//{tenant}.localhost/users/{id}/permissions',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::update
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:51
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
update.url = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                id: args.id,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::update
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:51
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
update.put = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::update
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:51
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
    const updateForm = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantUserPermissionController::update
 * @see app/Http/Controllers/Tenant/TenantUserPermissionController.php:51
 * @route '//{tenant}.localhost/users/{id}/permissions'
 */
        updateForm.put = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const permissions = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default permissions