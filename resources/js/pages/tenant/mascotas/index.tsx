import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import MascotaFormModal from "./mascotaFormModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ArrowLeft,
    Dog,
    MoreVertical,
    Edit2,
    Archive,
    RotateCcw,
    FileText,
    Phone,
    Plus,
} from "lucide-react";
import { ClienteItem, MascotaItem } from "@/pages/tenant/clientes/index";

interface Props {
    cliente: ClienteItem;
    mascotas: MascotaItem[];
    openCreateModal: boolean;
    canManage: boolean;
    canArchivar: boolean;
}

export default function MascotasIndex({
    cliente,
    mascotas,
    openCreateModal,
    canManage,
    canArchivar,
}: Props) {
    // Si viene ?agregar=1 en la URL, arranca abierto automáticamente
    const [isPetModalOpen, setIsPetModalOpen] =
        useState<boolean>(openCreateModal);
    const [selectedMascota, setSelectedMascota] = useState<MascotaItem | null>(
        null,
    );

    const handleClosePetModal = () => {
        setIsPetModalOpen(false);
        setSelectedMascota(null);

        // Si entraste con ?agregar=1, lo quita de la barra de direcciones al cerrar
        if (window.location.search.includes("agregar=")) {
            router.replace({
                url: `/clientes/${cliente.id}/mascotas`,
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const handleOpenNewMascota = () => {
        setSelectedMascota(null);
        setIsPetModalOpen(true);
    };

    const handleOpenEditMascota = (mascota: MascotaItem) => {
        setSelectedMascota(mascota);
        setIsPetModalOpen(true);
    };

    const handleToggleMascota = (mascota: MascotaItem) => {
        const accion = mascota.activo ? "archivar" : "reactivar";
        if (
            confirm(
                `¿Estás seguro de que deseas ${accion} a la mascota "${mascota.nombre}"?`,
            )
        ) {
            router.patch(
                `/clientes/${cliente.id}/mascotas/${mascota.id}/toggle`,
                {},
                { preserveScroll: true },
            );
        }
    };

    return (
        <>
            <Head
                title={`Mascotas de ${cliente.nombre} ${cliente.apellido || ""}`}
            />

            <div className="mx-auto w-11/12 md:w-11/12 lg:w-9/12 space-y-6 px-2 py-4 sm:px-6 lg:px-4">
                {/* Encabezado con contexto del Propietario y botón Volver */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <Link
                            href="/clientes"
                            className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 mb-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                            Volver a Clientes
                        </Link>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Mascotas de {cliente.nombre}{" "}
                                {cliente.apellido || ""}
                            </h1>
                            <Badge
                                variant={cliente.activo ? "default" : "outline"}
                                className={
                                    cliente.activo
                                        ? "bg-green-600"
                                        : "text-gray-500 border-gray-300"
                                }
                            >
                                {cliente.activo
                                    ? "Cliente Activo"
                                    : "Cliente Archivado"}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {cliente.telefono}
                            {cliente.email && ` • ${cliente.email}`}
                        </p>
                    </div>

                    {canManage && (
                        <Button
                            onClick={handleOpenNewMascota}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Mascota
                        </Button>
                    )}
                </div>

                {/* Estado vacío o Grilla de Fichas de Mascotas */}
                {mascotas.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <Dog className="w-12 h-12 text-gray-300 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Este cliente aún no tiene mascotas registradas
                            </h3>
                            <p className="text-sm text-gray-500 max-w-sm mt-1">
                                Registra su primera mascota con su raza, tamaño
                                y observaciones técnicas para agendarle turnos.
                            </p>
                            {canManage && (
                                <Button
                                    onClick={handleOpenNewMascota}
                                    className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Registrar Primera Mascota
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mascotas.map((mascota) => (
                            <Card
                                key={mascota.id}
                                className={`flex flex-col flex-start transition-shadow hover:shadow-md ${
                                    !mascota.activo
                                        ? "opacity-70 bg-gray-50/50"
                                        : ""
                                }`}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                <Dog className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-bold text-gray-900">
                                                    {mascota.nombre}
                                                </CardTitle>
                                                <div className="mt-1">
                                                    <Badge
                                                        variant={
                                                            mascota.activo
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        className={
                                                            mascota.activo
                                                                ? "bg-green-500 animate-pulse"
                                                                : "text-gray-500 border-gray-300 "
                                                        }
                                                    >
                                                        {mascota.activo
                                                            ? "Activo"
                                                            : "Archivado"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        {canManage && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleOpenEditMascota(
                                                                mascota,
                                                            )
                                                        }
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5 mr-2" />
                                                        Editar ficha
                                                    </DropdownMenuItem>
                                                    {canArchivar && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleToggleMascota(
                                                                        mascota,
                                                                    )
                                                                }
                                                                className={
                                                                    mascota.activo
                                                                        ? "text-amber-600"
                                                                        : "text-green-600"
                                                                }
                                                            >
                                                                {mascota.activo ? (
                                                                    <>
                                                                        <Archive className="w-3.5 h-3.5 mr-2" />
                                                                        Archivar
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <RotateCcw className="w-3.5 h-3.5 mr-2" />
                                                                        Reactivar
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 text-sm text-gray-600">
                                    <div className="grid grid-cols-2 gap-2 border-t pt-3 text-xs">
                                        <div>
                                            <span className="text-gray-400 block">
                                                Especie / Raza
                                            </span>
                                            <span className="font-medium text-gray-800">
                                                {mascota.especie_raza ||
                                                    "No especificada"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">
                                                Tamaño
                                            </span>
                                            <span className="font-medium text-gray-800">
                                                {mascota.dimension ||
                                                    "No especificado"}
                                            </span>
                                        </div>
                                    </div>

                                    {mascota.observaciones && (
                                        <div className="flex items-start text-xs text-amber-800 bg-amber-50/80 p-2.5 rounded-md border border-amber-100">
                                            <FileText className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5 text-amber-600" />
                                            <span>{mascota.observaciones}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Modal Reutilizable de Mascota */}
                <MascotaFormModal
                    isOpen={isPetModalOpen}
                    onClose={handleClosePetModal}
                    cliente={cliente}
                    mascota={selectedMascota}
                />
            </div>
        </>
    );
}
