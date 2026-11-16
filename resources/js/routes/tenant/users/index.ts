import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import permissions from './permissions'
/**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
export const index = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
index.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
index.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
index.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
    const indexForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
        indexForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TenantUserController::index
 * @see app/Http/Controllers/Tenant/TenantUserController.php:21
 * @route '//{tenant}.localhost/users'
 */
        indexForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Tenant\TenantUserController::store
 * @see app/Http/Controllers/Tenant/TenantUserController.php:99
 * @route '//{tenant}.localhost/users'
 */
export const store = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::store
 * @see app/Http/Controllers/Tenant/TenantUserController.php:99
 * @route '//{tenant}.localhost/users'
 */
store.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::store
 * @see app/Http/Controllers/Tenant/TenantUserController.php:99
 * @route '//{tenant}.localhost/users'
 */
store.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserController::store
 * @see app/Http/Controllers/Tenant/TenantUserController.php:99
 * @route '//{tenant}.localhost/users'
 */
    const storeForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantUserController::store
 * @see app/Http/Controllers/Tenant/TenantUserController.php:99
 * @route '//{tenant}.localhost/users'
 */
        storeForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Tenant\TenantUserController::update
 * @see app/Http/Controllers/Tenant/TenantUserController.php:138
 * @route '//{tenant}.localhost/users/{id}'
 */
export const update = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '//{tenant}.localhost/users/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::update
 * @see app/Http/Controllers/Tenant/TenantUserController.php:138
 * @route '//{tenant}.localhost/users/{id}'
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
* @see \App\Http\Controllers\Tenant\TenantUserController::update
 * @see app/Http/Controllers/Tenant/TenantUserController.php:138
 * @route '//{tenant}.localhost/users/{id}'
 */
update.put = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserController::update
 * @see app/Http/Controllers/Tenant/TenantUserController.php:138
 * @route '//{tenant}.localhost/users/{id}'
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
* @see \App\Http\Controllers\Tenant\TenantUserController::update
 * @see app/Http/Controllers/Tenant/TenantUserController.php:138
 * @route '//{tenant}.localhost/users/{id}'
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
/**
* @see \App\Http\Controllers\Tenant\TenantUserController::toggle
 * @see app/Http/Controllers/Tenant/TenantUserController.php:163
 * @route '//{tenant}.localhost/users/{id}/toggle'
 */
export const toggle = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '//{tenant}.localhost/users/{id}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::toggle
 * @see app/Http/Controllers/Tenant/TenantUserController.php:163
 * @route '//{tenant}.localhost/users/{id}/toggle'
 */
toggle.url = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions) => {
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

    return toggle.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::toggle
 * @see app/Http/Controllers/Tenant/TenantUserController.php:163
 * @route '//{tenant}.localhost/users/{id}/toggle'
 */
toggle.patch = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserController::toggle
 * @see app/Http/Controllers/Tenant/TenantUserController.php:163
 * @route '//{tenant}.localhost/users/{id}/toggle'
 */
    const toggleForm = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantUserController::toggle
 * @see app/Http/Controllers/Tenant/TenantUserController.php:163
 * @route '//{tenant}.localhost/users/{id}/toggle'
 */
        toggleForm.patch = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\Tenant\TenantUserController::destroy
 * @see app/Http/Controllers/Tenant/TenantUserController.php:186
 * @route '//{tenant}.localhost/users/{id}'
 */
export const destroy = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '//{tenant}.localhost/users/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::destroy
 * @see app/Http/Controllers/Tenant/TenantUserController.php:186
 * @route '//{tenant}.localhost/users/{id}'
 */
destroy.url = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TenantUserController::destroy
 * @see app/Http/Controllers/Tenant/TenantUserController.php:186
 * @route '//{tenant}.localhost/users/{id}'
 */
destroy.delete = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Tenant\TenantUserController::destroy
 * @see app/Http/Controllers/Tenant/TenantUserController.php:186
 * @route '//{tenant}.localhost/users/{id}'
 */
    const destroyForm = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TenantUserController::destroy
 * @see app/Http/Controllers/Tenant/TenantUserController.php:186
 * @route '//{tenant}.localhost/users/{id}'
 */
        destroyForm.delete = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const users = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
toggle: Object.assign(toggle, toggle),
destroy: Object.assign(destroy, destroy),
permissions: Object.assign(permissions, permissions),
}

export default users