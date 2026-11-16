import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\MascotaController::toggle
 * @see app/Http/Controllers/Tenant/MascotaController.php:73
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}/toggle'
 */
export const toggle = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Tenant\MascotaController::toggle
 * @see app/Http/Controllers/Tenant/MascotaController.php:73
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}/toggle'
 */
toggle.url = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    cliente: args[1],
                    mascota: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                cliente: args.cliente,
                                mascota: args.mascota,
                }

    return toggle.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{cliente}', parsedArgs.cliente.toString())
            .replace('{mascota}', parsedArgs.mascota.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\MascotaController::toggle
 * @see app/Http/Controllers/Tenant/MascotaController.php:73
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}/toggle'
 */
toggle.patch = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\MascotaController::toggle
 * @see app/Http/Controllers/Tenant/MascotaController.php:73
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}/toggle'
 */
    const toggleForm = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\MascotaController::toggle
 * @see app/Http/Controllers/Tenant/MascotaController.php:73
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}/toggle'
 */
        toggleForm.patch = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
export const index = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/clientes/{cliente}/mascotas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
index.url = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    cliente: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                cliente: typeof args.cliente === 'object'
                ? args.cliente.id
                : args.cliente,
                }

    return index.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{cliente}', parsedArgs.cliente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
index.get = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
index.head = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
    const indexForm = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
        indexForm.get = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\MascotaController::index
 * @see app/Http/Controllers/Tenant/MascotaController.php:20
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
        indexForm.head = (args: { tenant: string | number, cliente: string | number | { id: string | number } } | [tenant: string | number, cliente: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Tenant\MascotaController::store
 * @see app/Http/Controllers/Tenant/MascotaController.php:59
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
export const store = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/clientes/{cliente}/mascotas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\MascotaController::store
 * @see app/Http/Controllers/Tenant/MascotaController.php:59
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
store.url = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{cliente}', parsedArgs.cliente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\MascotaController::store
 * @see app/Http/Controllers/Tenant/MascotaController.php:59
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
store.post = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\MascotaController::store
 * @see app/Http/Controllers/Tenant/MascotaController.php:59
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
    const storeForm = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\MascotaController::store
 * @see app/Http/Controllers/Tenant/MascotaController.php:59
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas'
 */
        storeForm.post = (args: { tenant: string | number, cliente: string | number } | [tenant: string | number, cliente: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
export const update = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
update.url = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    cliente: args[1],
                    mascota: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                cliente: args.cliente,
                                mascota: args.mascota,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{cliente}', parsedArgs.cliente.toString())
            .replace('{mascota}', parsedArgs.mascota.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
update.put = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
update.patch = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
    const updateForm = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
        updateForm.put = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Tenant\MascotaController::update
 * @see app/Http/Controllers/Tenant/MascotaController.php:94
 * @route '//{tenant}.localhost/clientes/{cliente}/mascotas/{mascota}'
 */
        updateForm.patch = (args: { tenant: string | number, cliente: string | number, mascota: string | number } | [tenant: string | number, cliente: string | number, mascota: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const mascotas = {
    toggle: Object.assign(toggle, toggle),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default mascotas