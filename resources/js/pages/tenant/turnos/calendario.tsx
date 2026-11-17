import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import CalendarioMensualTurnos from "./calendarioMensual";
import TurnoFormModal from "./turnoFormModal";
import { Button } from "@/components/ui/button";
import type {
    ClienteCatalogoItem,
    ServicioCatalogoItem,
    TurnoCalendarioItem,
} from "@/types/turnos";

interface Props {
    fechaSeleccionada: string;
    turnosMes: TurnoCalendarioItem[];
    clientes: ClienteCatalogoItem[];
    servicios: ServicioCatalogoItem[];
}

export default function TurnosCalendario({
    fechaSeleccionada,
    turnosMes,
    clientes,
    servicios,
}: Props) {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [fechaModal, setFechaModal] = useState<string>(fechaSeleccionada);

    const handleNuevoTurno = (fecha?: string) => {
        setFechaModal(fecha ?? fechaSeleccionada);
        setIsFormModalOpen(true);
    };

    const handleOpenNewTurno = (fecha?: string) => {
        setFechaModal(fecha ?? fechaSeleccionada);
        setIsFormModalOpen(true);
    };

    return (
        <>
            <Head title="Calendario mensual" />

            <main className="mx-full space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <header className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Calendario mensual
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Vista general del mes. Haz clic en un día para abrir
                            su tablero Kanban o agendar un turno.
                        </p>
                    </div>

                    <Button type="button" onClick={() => handleNuevoTurno()}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Nuevo turno
                    </Button>
                </header>

                {/* Grilla Mensual */}
                <CalendarioMensualTurnos
                    fechaSeleccionada={fechaSeleccionada}
                    turnosMes={turnosMes}
                    onOpenNewTurno={(fechaIso?: string) =>
                        handleOpenNewTurno(fechaIso)
                    }
                />

                {/* Modal Agendar Turno */}
                <TurnoFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    fechaPorDefecto={fechaModal}
                    clientes={clientes}
                    servicios={servicios}
                    turnoEditar={null}
                />
            </main>
        </>
    );
}
