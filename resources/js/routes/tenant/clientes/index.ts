import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import mascotas from './mascotas'
/**
* @see \App\Http\Controllers\Tenant\ClienteController::toggle
 * @see app/Http/Controllers/Tenant/ClienteController.php:153
 * @route '//{tenant}.localhost/clientes/{cliente}/toggle'
 */
export const toggle = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '//{tenant}.localhost/clientes/{cliente}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Tenant\ClienteController::toggle
 * @see app/Http/Controllers/Tenant/ClienteController.php:153
 * @route '//{tenant}.localhost/clientes/{cliente}/toggle'
 */
toggle.url = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    cliente: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                cliente: args.cliente,
                }

    return toggle.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{cliente}', parsedArgs.cliente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\ClienteController::toggle
 * @see app/Http/Controllers/Tenant/ClienteController.php:153
 * @route '//{tenant}.localhost/clientes/{cliente}/toggle'
 */
toggle.patch = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\ClienteController::toggle
 * @see app/Http/Controllers/Tenant/ClienteController.php:153
 * @route '//{tenant}.localhost/clientes/{cliente}/toggle'
 */
    const toggleForm = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\ClienteController::toggle
 * @see app/Http/Controllers/Tenant/ClienteController.php:153
 * @route '//{tenant}.localhost/clientes/{cliente}/toggle'
 */
        toggleForm.patch = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
 */
export const index = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/clientes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
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
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
 */
index.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
 */
index.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
 */
    const indexForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
 */
        indexForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\ClienteController::index
 * @see app/Http/Controllers/Tenant/ClienteController.php:21
 * @route '//{tenant}.localhost/clientes'
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
* @see \App\Http\Controllers\Tenant\ClienteController::store
 * @see app/Http/Controllers/Tenant/ClienteController.php:128
 * @route '//{tenant}.localhost/clientes'
 */
export const store = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/clientes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\ClienteController::store
 * @see app/Http/Controllers/Tenant/ClienteController.php:128
 * @route '//{tenant}.localhost/clientes'
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
* @see \App\Http\Controllers\Tenant\ClienteController::store
 * @see app/Http/Controllers/Tenant/ClienteController.php:128
 * @route '//{tenant}.localhost/clientes'
 */
store.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\ClienteController::store
 * @see app/Http/Controllers/Tenant/ClienteController.php:128
 * @route '//{tenant}.localhost/clientes'
 */
    const storeForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\ClienteController::store
 * @see app/Http/Controllers/Tenant/ClienteController.php:128
 * @route '//{tenant}.localhost/clientes'
 */
        storeForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
export const update = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '//{tenant}.localhost/clientes/{cliente}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
update.url = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    cliente: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                cliente: args.cliente,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{cliente}', parsedArgs.cliente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
update.put = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
update.patch = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
    const updateForm = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
        updateForm.put = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Tenant\ClienteController::update
 * @see app/Http/Controllers/Tenant/ClienteController.php:141
 * @route '//{tenant}.localhost/clientes/{cliente}'
 */
        updateForm.patch = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const clientes = {
    toggle: Object.assign(toggle, toggle),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
mascotas: Object.assign(mascotas, mascotas),
}

export default clientes