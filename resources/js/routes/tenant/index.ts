import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import users from './users'
import servicios from './servicios'
import clientes from './clientes'
import turnos from './turnos'
/**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
export const home = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(args, options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
home.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return home.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
home.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(args, options),
    method: 'get',
})
/**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
home.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(args, options),
    method: 'head',
})

    /**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
    const homeForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
        homeForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/tenant.php:35
 * @route '//{tenant}.localhost'
 */
        homeForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
export const login = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(args, options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
login.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return login.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
login.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
login.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
    const loginForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
        loginForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::login
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:17
 * @route '//{tenant}.localhost/login'
 */
        loginForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::authenticate
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:27
 * @route '//{tenant}.localhost/login'
 */
export const authenticate = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(args, options),
    method: 'post',
})

authenticate.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::authenticate
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:27
 * @route '//{tenant}.localhost/login'
 */
authenticate.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return authenticate.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::authenticate
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:27
 * @route '//{tenant}.localhost/login'
 */
authenticate.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::authenticate
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:27
 * @route '//{tenant}.localhost/login'
 */
    const authenticateForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: authenticate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::authenticate
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:27
 * @route '//{tenant}.localhost/login'
 */
        authenticateForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: authenticate.url(args, options),
            method: 'post',
        })
    
    authenticate.form = authenticateForm
/**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
export const dashboard = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
dashboard.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return dashboard.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
dashboard.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})
/**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
dashboard.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(args, options),
    method: 'head',
})

    /**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
    const dashboardForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
        dashboardForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/tenant.php:58
 * @route '//{tenant}.localhost/dashboard'
 */
        dashboardForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::logout
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:49
 * @route '//{tenant}.localhost/logout'
 */
export const logout = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(args, options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::logout
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:49
 * @route '//{tenant}.localhost/logout'
 */
logout.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return logout.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::logout
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:49
 * @route '//{tenant}.localhost/logout'
 */
logout.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::logout
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:49
 * @route '//{tenant}.localhost/logout'
 */
    const logoutForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\Auth\TenantSessionController::logout
 * @see app/Http/Controllers/Tenant/Auth/TenantSessionController.php:49
 * @route '//{tenant}.localhost/logout'
 */
        logoutForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(args, options),
            method: 'post',
        })
    
    logout.form = logoutForm
const tenant = {
    home: Object.assign(home, home),
login: Object.assign(login, login),
authenticate: Object.assign(authenticate, authenticate),
dashboard: Object.assign(dashboard, dashboard),
users: Object.assign(users, users),
servicios: Object.assign(servicios, servicios),
clientes: Object.assign(clientes, clientes),
turnos: Object.assign(turnos, turnos),
logout: Object.assign(logout, logout),
}

export default tenant