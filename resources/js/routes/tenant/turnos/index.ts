import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
export const exportPdf = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(args, options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/turnos/calendario/export-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
exportPdf.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return exportPdf.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
exportPdf.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
exportPdf.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
    const exportPdfForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
        exportPdfForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TurnoController::exportPdf
 * @see app/Http/Controllers/Tenant/TurnoController.php:429
 * @route '//{tenant}.localhost/turnos/calendario/export-pdf'
 */
        exportPdfForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPdf.form = exportPdfForm
/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
export const exportExcel = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(args, options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/turnos/calendario/export-excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
exportExcel.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return exportExcel.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
exportExcel.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
exportExcel.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
    const exportExcelForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportExcel.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
        exportExcelForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TurnoController::exportExcel
 * @see app/Http/Controllers/Tenant/TurnoController.php:475
 * @route '//{tenant}.localhost/turnos/calendario/export-excel'
 */
        exportExcelForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportExcel.form = exportExcelForm
/**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
export const calendario = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(args, options),
    method: 'get',
})

calendario.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/turnos/calendario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
calendario.url = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return calendario.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
calendario.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
calendario.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendario.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
    const calendarioForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendario.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
        calendarioForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendario.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TurnoController::calendario
 * @see app/Http/Controllers/Tenant/TurnoController.php:96
 * @route '//{tenant}.localhost/turnos/calendario'
 */
        calendarioForm.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendario.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    calendario.form = calendarioForm
/**
* @see \App\Http\Controllers\Tenant\TurnoController::estado
 * @see app/Http/Controllers/Tenant/TurnoController.php:230
 * @route '//{tenant}.localhost/turnos/{turno}/estado'
 */
export const estado = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: estado.url(args, options),
    method: 'patch',
})

estado.definition = {
    methods: ["patch"],
    url: '//{tenant}.localhost/turnos/{turno}/estado',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::estado
 * @see app/Http/Controllers/Tenant/TurnoController.php:230
 * @route '//{tenant}.localhost/turnos/{turno}/estado'
 */
estado.url = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    turno: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                turno: typeof args.turno === 'object'
                ? args.turno.id
                : args.turno,
                }

    return estado.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::estado
 * @see app/Http/Controllers/Tenant/TurnoController.php:230
 * @route '//{tenant}.localhost/turnos/{turno}/estado'
 */
estado.patch = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: estado.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::estado
 * @see app/Http/Controllers/Tenant/TurnoController.php:230
 * @route '//{tenant}.localhost/turnos/{turno}/estado'
 */
    const estadoForm = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: estado.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::estado
 * @see app/Http/Controllers/Tenant/TurnoController.php:230
 * @route '//{tenant}.localhost/turnos/{turno}/estado'
 */
        estadoForm.patch = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: estado.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    estado.form = estadoForm
/**
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
 */
export const index = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/turnos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
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
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
 */
index.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
 */
index.head = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
 */
    const indexForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
 */
        indexForm.get = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TurnoController::index
 * @see app/Http/Controllers/Tenant/TurnoController.php:29
 * @route '//{tenant}.localhost/turnos'
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
* @see \App\Http\Controllers\Tenant\TurnoController::store
 * @see app/Http/Controllers/Tenant/TurnoController.php:139
 * @route '//{tenant}.localhost/turnos'
 */
export const store = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//{tenant}.localhost/turnos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::store
 * @see app/Http/Controllers/Tenant/TurnoController.php:139
 * @route '//{tenant}.localhost/turnos'
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
* @see \App\Http\Controllers\Tenant\TurnoController::store
 * @see app/Http/Controllers/Tenant/TurnoController.php:139
 * @route '//{tenant}.localhost/turnos'
 */
store.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::store
 * @see app/Http/Controllers/Tenant/TurnoController.php:139
 * @route '//{tenant}.localhost/turnos'
 */
    const storeForm = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::store
 * @see app/Http/Controllers/Tenant/TurnoController.php:139
 * @route '//{tenant}.localhost/turnos'
 */
        storeForm.post = (args: { tenant: string | number } | [tenant: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
export const show = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '//{tenant}.localhost/turnos/{turno}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
show.url = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    turno: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                turno: typeof args.turno === 'object'
                ? args.turno.id
                : args.turno,
                }

    return show.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
show.get = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
show.head = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
    const showForm = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
        showForm.get = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Tenant\TurnoController::show
 * @see app/Http/Controllers/Tenant/TurnoController.php:328
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
        showForm.head = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
export const update = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '//{tenant}.localhost/turnos/{turno}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
update.url = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    turno: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                turno: typeof args.turno === 'object'
                ? args.turno.id
                : args.turno,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
update.put = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
update.patch = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
    const updateForm = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
        updateForm.put = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Tenant\TurnoController::update
 * @see app/Http/Controllers/Tenant/TurnoController.php:181
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
        updateForm.patch = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Tenant\TurnoController::destroy
 * @see app/Http/Controllers/Tenant/TurnoController.php:316
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
export const destroy = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '//{tenant}.localhost/turnos/{turno}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Tenant\TurnoController::destroy
 * @see app/Http/Controllers/Tenant/TurnoController.php:316
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
destroy.url = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                    turno: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: args.tenant,
                                turno: typeof args.turno === 'object'
                ? args.turno.id
                : args.turno,
                }

    return destroy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tenant\TurnoController::destroy
 * @see app/Http/Controllers/Tenant/TurnoController.php:316
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
destroy.delete = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Tenant\TurnoController::destroy
 * @see app/Http/Controllers/Tenant/TurnoController.php:316
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
    const destroyForm = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Tenant\TurnoController::destroy
 * @see app/Http/Controllers/Tenant/TurnoController.php:316
 * @route '//{tenant}.localhost/turnos/{turno}'
 */
        destroyForm.delete = (args: { tenant: string | number, turno: string | number | { id: string | number } } | [tenant: string | number, turno: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const turnos = {
    exportPdf: Object.assign(exportPdf, exportPdf),
exportExcel: Object.assign(exportExcel, exportExcel),
calendario: Object.assign(calendario, calendario),
estado: Object.assign(estado, estado),
index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default turnos