import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import FinalizarTurnoModal from "./finalizarTurnoModal";
import TableroKanbanTurnos from "./tableroKabanTurnos";
import TurnoFormModal from "./turnoFormModal";
import { Button } from "@/components/ui/button";
import type {
    ClienteCatalogoItem,
    ServicioCatalogoItem,
    TurnoDiarioItem,
} from "@/types/turnos";

interface Props {
    fechaSeleccionada: string;
    turnos: TurnoDiarioItem[];
    clientes: ClienteCatalogoItem[];
    servicios: ServicioCatalogoItem[];
}

function sumarDias(fechaIso: string, dias: number): string {
    const [year, month, day] = fechaIso.split("-").map(Number);
    const date = new Date(year, month - 1, day + dias);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function formatearFechaLarga(fechaIso: string): string {
    const [year, month, day] = fechaIso.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function TurnosIndex({
    fechaSeleccionada,
    turnos,
    clientes,
    servicios,
}: Props) {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [fechaModal, setFechaModal] = useState<string>(fechaSeleccionada);
    const [turnoAEditar, setTurnoAEditar] = useState<TurnoDiarioItem | null>(
        null,
    );
    const [turnoAFinalizar, setTurnoAFinalizar] =
        useState<TurnoDiarioItem | null>(null);

    //func para obtener la fecha y hora local y no usando UTF
    function obtenerHoyLocalIso(): string {
        const ahora = new Date();
        const y = ahora.getFullYear();
        const m = String(ahora.getMonth() + 1).padStart(2, "0");
        const d = String(ahora.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    const hoyIso = obtenerHoyLocalIso();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Si entró sin ?fecha= y el servidor (UTC) devolvió un día distinto al local:
        if (!params.has("fecha") && fechaSeleccionada !== hoyIso) {
            router.get(
                "/turnos",
                { fecha: hoyIso },
                { replace: true, preserveState: true, preserveScroll: true },
            );
        }
    }, []);

    const cambiarFecha = (nuevaFecha: string) => {
        if (!nuevaFecha) return;
        router.get(
            "/turnos",
            { fecha: nuevaFecha },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleOpenNewTurno = (fecha?: string) => {
        setTurnoAEditar(null);
        setFechaModal(fecha ?? fechaSeleccionada);
        setIsFormModalOpen(true);
    };

    const handleEditTurno = (turno: TurnoDiarioItem) => {
        setTurnoAEditar(turno);
        setFechaModal(turno.fecha);
        setIsFormModalOpen(true);
    };

    const handleRequestFinalizar = (turno: TurnoDiarioItem) => {
        setTurnoAFinalizar(turno);
    };

    return (
        <>
            <Head title="Turnos del día" />

            <main className="w-full space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <header className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Turnos del día
                        </h1>
                        <p className="text-sm text-muted-foreground capitalize">
                            {formatearFechaLarga(fechaSeleccionada)} •{" "}
                            {turnos.length}{" "}
                            {turnos.length === 1 ? "turno" : "turnos"}
                        </p>
                    </div>

                    <div className="flex flex-wrap sm:justify-end  justify-center items-center gap-2">
                        {/* Navegación por día */}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-2.5 text-xs"
                            onClick={() => cambiarFecha(hoyIso)}
                            disabled={fechaSeleccionada === hoyIso}
                        >
                            Hoy
                        </Button>
                        <div className="flex items-center rounded-lg border bg-background p-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                    cambiarFecha(
                                        sumarDias(fechaSeleccionada, -1),
                                    )
                                }
                                title="Día anterior"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="relative flex items-center px-2">
                                <CalendarIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                                <input
                                    type="date"
                                    value={fechaSeleccionada}
                                    onChange={(e) =>
                                        cambiarFecha(e.target.value)
                                    }
                                    className="bg-transparent text-xs font-medium focus:outline-none"
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                    cambiarFecha(
                                        sumarDias(fechaSeleccionada, 1),
                                    )
                                }
                                title="Día siguiente"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <Button
                            type="button"
                            onClick={() => handleOpenNewTurno()}
                        >
                            <Plus className="mr-1.5 h-4 w-4" />
                            Nuevo turno
                        </Button>
                    </div>
                </header>

                {/* Tablero Kanban */}
                <TableroKanbanTurnos
                    turnos={turnos}
                    fechaSeleccionada={fechaSeleccionada}
                    onOpenNewTurno={handleOpenNewTurno}
                    onEditTurno={handleEditTurno}
                    onRequestFinalizar={handleRequestFinalizar}
                />

                {/* Modal Agendar / Editar Turno */}
                <TurnoFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    fechaPorDefecto={fechaModal}
                    clientes={clientes}
                    servicios={servicios}
                    turnoEditar={turnoAEditar}
                />

                {/* Modal Finalizar y Cobrar */}
                <FinalizarTurnoModal
                    onClose={() => setTurnoAFinalizar(null)}
                    turno={turnoAFinalizar}
                    serviciosCatalogo={servicios}
                />
            </main>
        </>
    );
}
