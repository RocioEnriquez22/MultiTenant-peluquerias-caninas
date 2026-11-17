import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//localhost/admin/tenants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:13
 * @route '//localhost/admin/tenants'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:26
 * @route '//localhost/admin/tenants'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//localhost/admin/tenants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:26
 * @route '//localhost/admin/tenants'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:26
 * @route '//localhost/admin/tenants'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:26
 * @route '//localhost/admin/tenants'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:26
 * @route '//localhost/admin/tenants'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:103
 * @route '//localhost/admin/tenants/{tenant}'
 */
export const update = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '//localhost/admin/tenants/{tenant}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:103
 * @route '//localhost/admin/tenants/{tenant}'
 */
update.url = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tenant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: typeof args.tenant === 'object'
                ? args.tenant.id
                : args.tenant,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:103
 * @route '//localhost/admin/tenants/{tenant}'
 */
update.put = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:103
 * @route '//localhost/admin/tenants/{tenant}'
 */
    const updateForm = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:103
 * @route '//localhost/admin/tenants/{tenant}'
 */
        updateForm.put = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TenantController::toggle
 * @see app/Http/Controllers/Admin/TenantController.php:81
 * @route '//localhost/admin/tenants/{tenant}/toggle'
 */
export const toggle = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '//localhost/admin/tenants/{tenant}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::toggle
 * @see app/Http/Controllers/Admin/TenantController.php:81
 * @route '//localhost/admin/tenants/{tenant}/toggle'
 */
toggle.url = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tenant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: typeof args.tenant === 'object'
                ? args.tenant.id
                : args.tenant,
                }

    return toggle.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::toggle
 * @see app/Http/Controllers/Admin/TenantController.php:81
 * @route '//localhost/admin/tenants/{tenant}/toggle'
 */
toggle.patch = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::toggle
 * @see app/Http/Controllers/Admin/TenantController.php:81
 * @route '//localhost/admin/tenants/{tenant}/toggle'
 */
    const toggleForm = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::toggle
 * @see app/Http/Controllers/Admin/TenantController.php:81
 * @route '//localhost/admin/tenants/{tenant}/toggle'
 */
        toggleForm.patch = (args: { tenant: string | number | { id: string | number } } | [tenant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:90
 * @route '//localhost/admin/tenants/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '//localhost/admin/tenants/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:90
 * @route '//localhost/admin/tenants/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:90
 * @route '//localhost/admin/tenants/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:90
 * @route '//localhost/admin/tenants/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:90
 * @route '//localhost/admin/tenants/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const tenants = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
toggle: Object.assign(toggle, toggle),
destroy: Object.assign(destroy, destroy),
}

export default tenants