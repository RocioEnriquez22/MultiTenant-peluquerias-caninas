<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventAccessFromTenantDomains
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Si hay un tenant inicializado o el host actual NO pertenece a los central_domains
        $centralDomains = config('tenancy.central_domains', []);
        $currentHost = $request->getHost();

        // Si la petición proviene de un subdominio de tenant, bloqueamos el acceso (404)
        if (tenancy()->initialized || !in_array($currentHost, $centralDomains, true)) {
            abort(404);
        }

        return $next($request);
    }
}
