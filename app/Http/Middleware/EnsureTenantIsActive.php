<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! tenancy()->initialized) { //evita usar este middleware si no hay un tenant inicializado
            abort(404);
        }
        if (!(bool)tenant('activo')) { //si el tenant esta inactivo, bloquea el acceso
            abort(403, 'El acceso a este negocio esta suspendido.');
        }
        return $next($request);
    }
}
