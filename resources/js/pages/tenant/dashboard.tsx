import React from "react";

import { Head } from "@inertiajs/react";
import { Calendar, Users, Dog, Scissors } from "lucide-react";

interface TenantInfo {
    id: string;
    nombre: string;
    dueño: string;
}

interface Props {
    tenant: TenantInfo;
}

export default function TenantDashboard({ tenant }: Props) {
    return (
        <>
            <Head title={`Dashboard - ${tenant.nombre}`} />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                {/* Header del Local */}
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {tenant.nombre}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Bienvenido/a al panel de gestión de turnos y
                            peluquería.
                        </p>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-700 uppercase">
                        Inquilino Activo
                    </span>
                </div>

                {/* Tarjetas de Acceso Rápido / Módulos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="flex items-center space-x-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">
                                Turnos Hoy
                            </p>
                            <p className="text-xl font-bold text-gray-800">0</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-green-50 p-3 text-green-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">
                                Clientes
                            </p>
                            <p className="text-xl font-bold text-gray-800">0</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                            <Dog className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">
                                Mascotas
                            </p>
                            <p className="text-xl font-bold text-gray-800">0</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                            <Scissors className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">
                                Servicios
                            </p>
                            <p className="text-xl font-bold text-gray-800">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
