import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
 */
export const edit = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
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
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
 */
edit.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
 */
edit.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
 */
    const editForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
 */
        editForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '//{tenant}.localhost/settings/appearance'
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
const appearance = {
    edit: Object.assign(edit, edit),
}

export default appearance