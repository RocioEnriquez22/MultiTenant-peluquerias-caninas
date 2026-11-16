import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\ServicioController::toggle
 * @see app/Http/Controllers/Tenant/ServicioController.php:79
 * @route '//{tenant}.localhost/servicios/{id}/toggle'
 */
export const toggle = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '//{tenant}.localhost/servicios/{id}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Tenant\ServicioController::toggle
 * @see app/Http/Controllers/Tenant/ServicioController.php:79
 * @route '//{tenant}.localhost/servicios/{id}/toggle'
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
* @see \App\Http\Controllers\Tenant\ServicioController::toggle
 * @see app/Http/Controllers/Tenant/ServicioController.php:79
 * @route '//{tenant}.localhost/servicios/{id}/toggle'
 */
toggle.patch = (args: { tenant: string | number, id: string | number } | [tenant: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\ServicioController::toggle
 * @see app/Http/Controllers/Tenant/ServicioController.php:79
 * @route '//{tenant}.localhost/servicios/{id}/toggle'
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
* @see \App\Http\Controllers\Tenant\ServicioController::toggle
 * @see app/Http/Controllers/Tenant/ServicioController.php:79
 * @route '//{tenant}.localhost/servicios/{id}/toggle'
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
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
 */
export const index = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
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
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
 */
index.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
 */
index.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
 */
    const indexForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
 */
        indexForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\ServicioController::index
 * @see app/Http/Controllers/Tenant/ServicioController.php:19
 * @route '//{tenant}.localhost/servicios'
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
* @see \App\Http\Controllers\Tenant\ServicioController::store
 * @see app/Http/Controllers/Tenant/ServicioController.php:42
 * @route '//{tenant}.localhost/servicios'
 */
export const store = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/servicios',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\ServicioController::store
 * @see app/Http/Controllers/Tenant/ServicioController.php:42
 * @route '//{tenant}.localhost/servicios'
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
* @see \App\Http\Controllers\Tenant\ServicioController::store
 * @see app/Http/Controllers/Tenant/ServicioController.php:42
 * @route '//{tenant}.localhost/servicios'
 */
store.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\ServicioController::store
 * @see app/Http/Controllers/Tenant/ServicioController.php:42
 * @route '//{tenant}.localhost/servicios'
 */
    const storeForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\ServicioController::store
 * @see app/Http/Controllers/Tenant/ServicioController.php:42
 * @route '//{tenant}.localhost/servicios'
 */
        storeForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
export const update = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '//{tenant}.localhost/servicios/{servicio}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
update.url = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    servicio: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                servicio: args.servicio,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
update.put = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
update.patch = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
    const updateForm = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
        updateForm.put = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Tenant\ServicioController::update
 * @see app/Http/Controllers/Tenant/ServicioController.php:61
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
        updateForm.patch = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Tenant\ServicioController::destroy
 * @see app/Http/Controllers/Tenant/ServicioController.php:98
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
export const destroy = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '//{tenant}.localhost/servicios/{servicio}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Tenant\ServicioController::destroy
 * @see app/Http/Controllers/Tenant/ServicioController.php:98
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
destroy.url = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    servicio: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                servicio: args.servicio,
                }

    return destroy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\ServicioController::destroy
 * @see app/Http/Controllers/Tenant/ServicioController.php:98
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
destroy.delete = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Tenant\ServicioController::destroy
 * @see app/Http/Controllers/Tenant/ServicioController.php:98
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
    const destroyForm = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\ServicioController::destroy
 * @see app/Http/Controllers/Tenant/ServicioController.php:98
 * @route '//{tenant}.localhost/servicios/{servicio}'
 */
        destroyForm.delete = (args: { tenant: string | number, servicio: string | number } | [tenant: string | number, servicio: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const servicios = {
    toggle: Object.assign(toggle, toggle),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default servicios