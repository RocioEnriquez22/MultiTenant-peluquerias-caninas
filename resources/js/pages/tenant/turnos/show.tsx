import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Dog,
    User,
    Phone,
    Mail,
    Scissors,
    CreditCard,
    CheckCircle2,
    FileText,
    Edit2,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TurnoFormModal from "./turnoFormModal";
import {
    ClienteCatalogoItem,
    ServicioCatalogoItem,
    TurnoDiarioItem,
} from "@/types/turnos";
import { useKanbanPermissions } from "@/hooks/use-kanban-permitions";

interface Props {
    turno: TurnoDiarioItem & {
        cliente_id?: string;
        mascota_id?: string;
        cliente: TurnoDiarioItem["cliente"] & { email?: string | null };
    };
    clientes?: ClienteCatalogoItem[];
    servicios?: ServicioCatalogoItem[];
}

const monedaFormato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

const METODO_PAGO_LABEL: Record<string, string> = {
    pendiente: "Pendiente de cobro",
    efectivo: "Efectivo",
    mercado_pago: "Mercado Pago",
    transferencia: "Transferencia bancaria",
};

const ESTADO_BADGE: Record<string, { label: string; className: string }> = {
    pendiente: {
        label: "Pendiente",
        className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    en_proceso: {
        label: "En Proceso",
        className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    listo: {
        label: "Listo / Finalizado",
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    cancelado: {
        label: "Cancelado",
        className: "bg-rose-100 text-rose-800 border-rose-200",
    },
};

export default function TurnoShow({
    turno,
    clientes = [],
    servicios = [],
}: Props) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const estadoCfg = ESTADO_BADGE[turno.estado] || ESTADO_BADGE.pendiente;

    const { puedeEditarTurno } = useKanbanPermissions();
    return (
        <>
            <Head title={`Turno - ${turno.mascota.nombre} (${turno.fecha})`} />

            <div className="mx-auto w-11/12 lg:w-8/12 space-y-6 px-2 py-4 sm:px-6">
                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <Link
                            href={`/turnos?fecha=${turno.fecha}`}
                            className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 mb-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                            Volver a Turnos
                        </Link>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Turno de {turno.mascota.nombre}
                            </h1>
                            <Badge
                                variant="outline"
                                className={estadoCfg.className}
                            >
                                {estadoCfg.label}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 pt-1">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {turno.fecha}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-gray-400" />
                                {turno.hora} hs
                            </span>
                        </div>
                    </div>

                    {clientes.length > 0 && puedeEditarTurno(turno) && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsEditModalOpen(true);
                            }}
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Editar Ficha
                        </Button>
                    )}
                </div>

                {/* Grid de Información: Mascota y Propietario */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Dog className="w-4 h-4 text-indigo-600" />
                                Ficha de la Mascota
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5 text-sm">
                            <div>
                                <span className="text-gray-400 text-xs block">
                                    Nombre
                                </span>
                                <span className="font-semibold text-gray-900">
                                    {turno.mascota.nombre}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-gray-400 text-xs block">
                                        Especie / Raza
                                    </span>
                                    <span className="text-gray-800">
                                        {turno.mascota.especie_raza ||
                                            "No especificada"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs block">
                                        Tamaño
                                    </span>
                                    <span className="text-gray-800">
                                        {turno.mascota.dimension ||
                                            "No especificado"}
                                    </span>
                                </div>
                            </div>
                            {turno.mascota.observaciones && (
                                <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-md border border-amber-200 mt-2">
                                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <span>{turno.mascota.observaciones}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <User className="w-4 h-4 text-indigo-600" />
                                Propietario
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5 text-sm">
                            <div>
                                <span className="text-gray-400 text-xs block">
                                    Nombre completo
                                </span>
                                <span className="font-semibold text-gray-900">
                                    {turno.cliente.nombre}{" "}
                                    {turno.cliente.apellido || ""}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                <span>{turno.cliente.telefono}</span>
                            </div>
                            {turno.cliente.email && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{turno.cliente.email}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Servicios Contratados y Facturación */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Scissors className="w-4 h-4 text-indigo-600" />
                            Servicios y Resumen de Cobro
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="divide-y border rounded-lg">
                            {turno.servicios.map((servicio) => (
                                <div
                                    key={servicio.id}
                                    className="flex justify-between items-center px-4 py-3 text-sm"
                                >
                                    <span className="font-medium text-gray-800">
                                        {servicio.nombre}
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {monedaFormato.format(
                                            servicio.precio_historico,
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div className="p-3 rounded-lg bg-gray-50 border">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <CreditCard className="w-3.5 h-3.5" />
                                    Medio de pago
                                </span>
                                <p className="font-semibold text-gray-900 mt-0.5">
                                    {METODO_PAGO_LABEL[turno.metodo_pago] ||
                                        turno.metodo_pago}
                                </p>
                            </div>

                            <div className="p-3 rounded-lg bg-gray-50 border">
                                <span className="text-xs text-gray-500">
                                    Monto Total
                                </span>
                                <p className="text-lg font-bold text-indigo-700 mt-0.5">
                                    {monedaFormato.format(
                                        turno.estado === "listo"
                                            ? turno.monto_cobrado
                                            : turno.total_estimado,
                                    )}
                                </p>
                            </div>

                            <div className="p-3 rounded-lg bg-gray-50 border">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Realizado por
                                </span>
                                <p className="font-semibold text-gray-900 mt-0.5">
                                    {turno.realizado_por
                                        ? `${turno.realizado_por.nombre} ${turno.realizado_por.apellido || ""}`
                                        : "Aún sin asignar"}
                                </p>
                                {turno.finalizado_at && (
                                    <span className="text-[11px] text-gray-400">
                                        Finalizado: {turno.finalizado_at}
                                    </span>
                                )}
                            </div>
                        </div>

                        {turno.notas_turno && (
                            <div className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">
                                <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-xs font-semibold text-gray-500 block">
                                        Notas del turno
                                    </span>
                                    <p>{turno.notas_turno}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Modal de Edición (si se pasaron catálogos) */}
                {clientes.length > 0 && (
                    <TurnoFormModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        fechaPorDefecto={turno.fecha}
                        clientes={clientes}
                        servicios={servicios}
                        turnoEditar={{
                            ...turno,
                            cliente_id: turno.cliente.id,
                            mascota_id: turno.mascota.id,
                        }}
                    />
                )}
            </div>
        </>
    );
}
