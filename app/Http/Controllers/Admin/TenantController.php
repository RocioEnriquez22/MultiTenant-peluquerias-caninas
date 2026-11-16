<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tenant;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    public function index()
    {
        // Traemos todos los tenants registrados junto con sus dominios asociados
        $tenants = Tenant::with('domains')->latest()->get();

        return Inertia::render('admin/tenants/Index', [
            'tenants' => $tenants
        ]);
    }

    /**
     * Registrar una nueva peluquería (Crea el Tenant y aprovisiona su Base de Datos en PostgreSQL).
     */
    public function store(Request $request)
    {
        // 1. Limpiamos el subdominio para asegurarnos de que sea un slug válido (sin espacios ni caracteres especiales)
        $subdomainSlug = Str::slug($request->subdomain);

        // Adjuntamos el slug procesado a la request para validarlo
        $request->merge(['subdomain' => $subdomainSlug]);

        // 2. Validamos que el ID/subdominio NO exista previamente en la base central
        $request->validate([
            'nombre_comercial' => 'required|string|max:255',
            'nombre_dueño'     => 'required|string|max:255',
            'email_contacto'   => 'required|email|max:255',
            'telefono'         => 'required|string|max:50',
            'subdomain'        => [
                'required',
                'string',
                'alpha_dash',
                'max:50',
                'unique:tenants,id', // <-- Evita duplicar el ID en la tabla tenants
            ],
        ], [
            'subdomain.unique' => 'El subdominio ingresado ya está en uso por otra peluquería.',
        ]);

        // 3. El ID del tenant será exactamente el subdominio limpio
        $tenantId = $subdomainSlug;

        // 4. Crear el Tenant
        $tenant = Tenant::create([
            'id'               => $tenantId, // Ejemplo: 'canitos'
            'nombre_comercial' => $request->nombre_comercial,
            'nombre_dueño'     => $request->nombre_dueño,
            'email_contacto'   => $request->email_contacto,
            'telefono'         => $request->telefono,
            'activo'           => true,
        ]);

        // 5. Asociar el dominio
        $centralDomain = config('app.central_domain', 'localhost');
        $fullDomain = $tenantId . '.' . $centralDomain;

        $tenant->domains()->create([
            'domain' => $fullDomain
        ]);

        $this->flashToast('success', 'Peluquería registrada con éxito.');
        return redirect()->back();
    }



    /**
     * Cambiar el estado de la peluquería (Dar de baja / Activar).
     */
    public function toggleStatus(Tenant $tenant)
    {
        $tenant->update([
            'activo' => !$tenant->activo
        ]);

        return redirect()->back()->with('success', 'Estado de la peluquería actualizado.');
    }

    public function destroy(string $id)
    {
        $tenant = Tenant::findOrFail($id);
        //Eliminamos dominios asociados
        $tenant->domains()->delete();

        //Al ejecutar delete(), se dispara Events\DeletingTenant y Events\TenantDeleted,
        // ejecutando Jobs\DeleteDatabase para borrar la BD física en PostgreSQL.
        $tenant->delete();

        return redirect()->back()->with('success', 'Peluquería y su base de datos fueron eliminadas.');
    }

    public function update(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'nombre_comercial' => 'required|string|max:255',
            'nombre_dueño'     => 'required|string|max:255',
            'email_contacto'   => 'required|email|max:255',
            'telefono'         => 'required|string|max:50',
        ]);

        $tenant->update($validated);

        $this->flashToast('success', 'Datos actualizados correctamente.');

        return redirect()->back();
    }
}
