import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    Dog,
    User,
    Scissors,
    ArrowUpRight,
    CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { EstadoTurno, TurnoCalendarioItem } from "@/types/turnos";
import { ScrollToBottomButton } from "@/components/ui/button-scroll";
import { useCan } from "@/hooks/use-can";

interface Props {
    fechaSeleccionada: string; // YYYY-MM-DD
    turnosMes: TurnoCalendarioItem[];
    onOpenNewTurno: (fecha?: string) => void;
}

const ESTADO_CONFIG: Record<
    EstadoTurno,
    { label: string; dotClass: string; badgeClass: string }
> = {
    pendiente: {
        label: "Pendiente",
        dotClass: "bg-amber-500",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    },
    en_proceso: {
        label: "En proceso",
        dotClass: "bg-blue-500",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
    },
    listo: {
        label: "Listo",
        dotClass: "bg-emerald-500",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    cancelado: {
        label: "Cancelado",
        dotClass: "bg-rose-500",
        badgeClass: "bg-rose-100 text-rose-800 border-rose-200",
    },
};

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const DIAS_MINI = ["L", "M", "M", "J", "V", "S", "D"];

function toIsoDate(year: number, monthIndex: number, day: number): string {
    const m = String(monthIndex + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
}

export default function CalendarioMensualTurnos({
    fechaSeleccionada,
    turnosMes,
    onOpenNewTurno,
}: Props) {
    const can = useCan();
    const [anio, mesStr] = fechaSeleccionada.split("-");
    const currentYear = Number(anio);
    const currentMonthIndex = Number(mesStr) - 1; // 0-11

    // Filtros interactivos de estado (como los checkboxes laterales de tu imagen)
    const [estadosVisibles, setEstadosVisibles] = useState<
        Record<EstadoTurno, boolean>
    >({
        pendiente: true,
        en_proceso: true,
        listo: true,
        cancelado: true,
    });

    // Modal de "Show del Día" al hacer clic en una celda del calendario
    const [diaModalAbierto, setDiaModalAbierto] = useState<string | null>(null);

    const hoyIso = useMemo(() => {
        const now = new Date();
        return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
    }, []);

    // Contadores del mes por estado
    const contadoresEstado = useMemo(() => {
        const counts: Record<EstadoTurno, number> = {
            pendiente: 0,
            en_proceso: 0,
            listo: 0,
            cancelado: 0,
        };
        turnosMes.forEach((t) => {
            counts[t.estado] = (counts[t.estado] || 0) + 1;
        });
        return counts;
    }, [turnosMes]);

    // Turnos filtrados según checkboxes laterales y agrupados por fecha
    const turnosPorDia = useMemo(() => {
        const map: Record<string, TurnoCalendarioItem[]> = {};
        turnosMes
            .filter((t) => estadosVisibles[t.estado])
            .forEach((t) => {
                if (!map[t.fecha]) map[t.fecha] = [];
                map[t.fecha].push(t);
            });
        return map;
    }, [turnosMes, estadosVisibles]);

    // Generación de las 35 o 42 celdas de la grilla (Lunes a Domingo)
    const celdasCalendario = useMemo(() => {
        const primerDiaMes = new Date(currentYear, currentMonthIndex, 1);
        // Convertir domingo (0) a 6, lunes (1) a 0 ...
        const offsetInicio = (primerDiaMes.getDay() + 6) % 7;
        const diasEnMes = new Date(
            currentYear,
            currentMonthIndex + 1,
            0,
        ).getDate();
        const diasMesAnterior = new Date(
            currentYear,
            currentMonthIndex,
            0,
        ).getDate();

        const celdas: {
            fechaIso: string;
            numeroDia: number;
            esMesActual: boolean;
        }[] = [];

        // Días finales del mes anterior
        for (let i = offsetInicio - 1; i >= 0; i--) {
            const d = diasMesAnterior - i;
            const prevDate = new Date(currentYear, currentMonthIndex - 1, d);
            celdas.push({
                fechaIso: toIsoDate(
                    prevDate.getFullYear(),
                    prevDate.getMonth(),
                    prevDate.getDate(),
                ),
                numeroDia: d,
                esMesActual: false,
            });
        }

        // Días del mes actual
        for (let d = 1; d <= diasEnMes; d++) {
            celdas.push({
                fechaIso: toIsoDate(currentYear, currentMonthIndex, d),
                numeroDia: d,
                esMesActual: true,
            });
        }

        // Días iniciales del mes siguiente hasta completar filas de 7
        const restantes = (7 - (celdas.length % 7)) % 7;
        for (let d = 1; d <= restantes; d++) {
            const nextDate = new Date(currentYear, currentMonthIndex + 1, d);
            celdas.push({
                fechaIso: toIsoDate(
                    nextDate.getFullYear(),
                    nextDate.getMonth(),
                    nextDate.getDate(),
                ),
                numeroDia: d,
                esMesActual: false,
            });
        }

        return celdas;
    }, [currentYear, currentMonthIndex]);

    const nombreMesAnio = useMemo(() => {
        const fechaObj = new Date(currentYear, currentMonthIndex, 1);
        const texto = fechaObj.toLocaleDateString("es-AR", {
            month: "long",
            year: "numeric",
        });
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }, [currentYear, currentMonthIndex]);

    const cambiarMes = (deltaMes: number) => {
        const nuevaFecha = new Date(
            currentYear,
            currentMonthIndex + deltaMes,
            1,
        );
        const iso = toIsoDate(
            nuevaFecha.getFullYear(),
            nuevaFecha.getMonth(),
            1,
        );
        router.get(
            "/turnos/calendario",
            { fecha: iso },
            { preserveState: true, preserveScroll: true },
        );
    };

    const irAHoy = () => {
        router.get(
            "/turnos/calendario",
            { fecha: hoyIso },
            { preserveState: true, preserveScroll: true },
        );
    };

    const toggleFiltroEstado = (estado: EstadoTurno) => {
        setEstadosVisibles((prev) => ({
            ...prev,
            [estado]: !prev[estado],
        }));
    };

    const turnosDelDiaModal = diaModalAbierto
        ? turnosPorDia[diaModalAbierto] || []
        : [];

    const tituloDiaModal = useMemo(() => {
        if (!diaModalAbierto) return "";
        const [y, m, d] = diaModalAbierto.split("-").map(Number);
        const dateObj = new Date(y, m - 1, d);
        const str = dateObj.toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, [diaModalAbierto]);

    const construirUrlExport = (tipo: "export-pdf" | "export-excel") => {
        const params = new URLSearchParams();
        params.set("fecha", fechaSeleccionada);

        (Object.keys(estadosVisibles) as EstadoTurno[]).forEach((estado) => {
            if (estadosVisibles[estado]) {
                params.append("estados[]", estado);
            }
        });

        return `/turnos/calendario/${tipo}?${params.toString()}`;
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row">
                {/* SIDEBAR IZQUIERDO (Mini-calendario y Leyenda de Estados) */}
                <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 space-y-6 bg-gray-50/40 shrink-0">
                    <Button
                        type="button"
                        onClick={() => onOpenNewTurno(fechaSeleccionada)}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo turno
                    </Button>

                    {/* Mini-Calendario */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-800">
                            <span>{nombreMesAnio}</span>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => cambiarMes(-1)}
                                    className="p-1 rounded hover:bg-gray-200 text-gray-600"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => cambiarMes(1)}
                                    className="p-1 rounded hover:bg-gray-200 text-gray-600"
                                >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 text-center text-[10px] font-medium text-gray-400">
                            {DIAS_MINI.map((d, idx) => (
                                <div key={idx} className="py-1">
                                    {d}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 text-center text-xs gap-y-1">
                            {celdasCalendario.map((celda, idx) => {
                                const esHoy = celda.fechaIso === hoyIso;
                                const tieneTurnos =
                                    (turnosPorDia[celda.fechaIso]?.length ||
                                        0) > 0;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() =>
                                            setDiaModalAbierto(celda.fechaIso)
                                        }
                                        className={`h-7 w-7 mx-auto rounded-full flex flex-col items-center justify-center text-[11px] transition-colors ${
                                            esHoy
                                                ? "bg-gray-900 text-white font-bold"
                                                : celda.esMesActual
                                                  ? "text-gray-700 hover:bg-gray-200"
                                                  : "text-gray-300"
                                        }`}
                                    >
                                        <span>{celda.numeroDia}</span>
                                        {tieneTurnos && !esHoy && (
                                            <span className="w-1 h-1 rounded-full bg-indigo-500 -mt-0.5" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filtros por Estado con Puntitos de Color */}
                    <div className="space-y-2.5 pt-2 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Estados del mes
                        </p>
                        <div className="space-y-1.5">
                            {(
                                Object.keys(ESTADO_CONFIG) as Array<EstadoTurno>
                            ).map((estado) => {
                                const cfg = ESTADO_CONFIG[estado];
                                const activo = estadosVisibles[estado];
                                return (
                                    <button
                                        key={estado}
                                        type="button"
                                        onClick={() =>
                                            toggleFiltroEstado(estado)
                                        }
                                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-opacity ${
                                            activo
                                                ? "hover:bg-gray-100 text-gray-800"
                                                : "opacity-45 hover:opacity-75 text-gray-500"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span
                                                className={`w-2.5 h-2.5 rounded-sm ${cfg.dotClass}`}
                                            />
                                            <span className="font-medium">
                                                {cfg.label}
                                            </span>
                                        </span>
                                        <span className="text-gray-400 font-medium">
                                            {contadoresEstado[estado]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* ÁREA PRINCIPAL DEL CALENDARIO MENSUAL */}
                <div className="flex-1 flex flex-col">
                    {/* Barra superior del Calendario */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={irAHoy}
                                className="text-xs h-8"
                            >
                                Hoy
                            </Button>
                            <div className="flex items-center">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => cambiarMes(-1)}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => cambiarMes(1)}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 ml-1">
                                {nombreMesAnio}
                            </h2>
                        </div>
                        {can("analytics.report") && (
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[11px] leading-none text-muted-foreground">
                                    <CircleAlert className="h-[11px] w-[11px] inline mr-1" />
                                    Crea archivos con detalles del mes{" "}
                                    {nombreMesAnio}
                                </span>

                                <div className="flex flex-col justify-end md:flex-row ">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            window.open(
                                                construirUrlExport(
                                                    "export-pdf",
                                                ),
                                                "_blank",
                                                "noopener,noreferrer",
                                            );
                                        }}
                                        className="h-8 text-xs m-1"
                                    >
                                        Exportar PDF
                                    </Button>

                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => {
                                            window.location.href =
                                                construirUrlExport(
                                                    "export-excel",
                                                );
                                        }}
                                        className="m-1 h-8 bg-emerald-600 text-xs text-white hover:bg-emerald-700 ml-2"
                                    >
                                        Exportar Excel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cabecera Días de la Semana */}
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/70">
                        {DIAS_SEMANA.map((dia) => (
                            <div
                                key={dia}
                                className="py-2 text-center text-xs font-medium text-gray-500 border-r last:border-r-0 border-gray-200"
                            >
                                {dia}
                            </div>
                        ))}
                    </div>

                    {/* Grilla de Celdas */}
                    <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                        {celdasCalendario.map((celda, idx) => {
                            const turnosCelda =
                                turnosPorDia[celda.fechaIso] || [];
                            const esHoy = celda.fechaIso === hoyIso;
                            const visibles = turnosCelda.slice(0, 3);
                            const ocultos =
                                turnosCelda.length - visibles.length;

                            return (
                                <div
                                    key={idx}
                                    onClick={() =>
                                        setDiaModalAbierto(celda.fechaIso)
                                    }
                                    className={`min-h-[108px] p-1.5 border-b border-r border-gray-200 cursor-pointer transition-colors hover:bg-indigo-50/30 flex flex-col ${
                                        !celda.esMesActual
                                            ? "bg-gray-50/60 text-gray-400"
                                            : "bg-white"
                                    }`}
                                >
                                    {/* Número de día */}
                                    <div className="flex justify-center mb-1">
                                        <span
                                            className={`text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                                                esHoy
                                                    ? "bg-gray-900 text-white font-bold"
                                                    : celda.esMesActual
                                                      ? "text-gray-700 font-medium"
                                                      : "text-gray-400"
                                            }`}
                                        >
                                            {celda.numeroDia}
                                        </span>
                                    </div>

                                    {/* Puntitos + Hora + Mascota */}
                                    <div className="space-y-1 flex-1">
                                        {visibles.map((turno) => (
                                            <div
                                                key={turno.id}
                                                className="flex items-center gap-1.5 text-[11px] leading-tight px-1 py-0.5 rounded hover:bg-gray-100 truncate"
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                                        ESTADO_CONFIG[
                                                            turno.estado
                                                        ].dotClass
                                                    }`}
                                                />
                                                <span className="text-gray-500 font-medium shrink-0">
                                                    {turno.hora}
                                                </span>
                                                <span className="text-gray-800 font-medium truncate">
                                                    {turno.mascota_nombre}
                                                </span>
                                            </div>
                                        ))}

                                        {ocultos > 0 && (
                                            <div className="text-[11px] font-medium text-indigo-600 pl-3.5 pt-0.5">
                                                +{ocultos} más
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MODAL SHOW DEL DÍA: Lista los turnos de la fecha y navega a /turnos/{id} */}
                <Dialog
                    open={!!diaModalAbierto}
                    onOpenChange={(open) => !open && setDiaModalAbierto(null)}
                >
                    <DialogContent className="sm:max-w-[540px]">
                        <DialogHeader>
                            <DialogTitle>{tituloDiaModal}</DialogTitle>
                            <DialogDescription>
                                {turnosDelDiaModal.length === 0
                                    ? "No hay turnos registrados para este día."
                                    : `${turnosDelDiaModal.length} turno(s) registrado(s). Haz clic en un turno para ver todos sus detalles.`}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto py-2">
                            {turnosDelDiaModal.length === 0 ? (
                                <div className="text-center py-8 border rounded-lg bg-gray-50/60 space-y-3">
                                    <p className="text-sm text-gray-500">
                                        La agenda de este día está libre.
                                    </p>
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => {
                                            const fecha = diaModalAbierto!;
                                            setDiaModalAbierto(null);
                                            onOpenNewTurno(fecha);
                                        }}
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        <Plus className="w-4 h-4 mr-1.5" />
                                        Agendar turno en esta fecha
                                    </Button>
                                </div>
                            ) : (
                                turnosDelDiaModal.map((turno) => {
                                    const cfg = ESTADO_CONFIG[turno.estado];
                                    return (
                                        <div
                                            key={turno.id}
                                            onClick={() =>
                                                router.visit(
                                                    `/turnos/${turno.id}`,
                                                )
                                            }
                                            className="group flex items-center justify-between p-3.5 rounded-lg border border-gray-200 bg-white hover:border-indigo-400 hover:shadow-sm cursor-pointer transition-all"
                                        >
                                            <div className="space-y-1 min-w-0 pr-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                                                        <Clock className="w-3 h-3 mr-1 text-gray-500" />
                                                        {turno.hora}
                                                    </span>
                                                    <span className="font-semibold text-gray-900 flex items-center gap-1 truncate">
                                                        <Dog className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                                        {turno.mascota_nombre}
                                                        {turno.mascota_raza && (
                                                            <span className="text-xs font-normal text-gray-500">
                                                                (
                                                                {
                                                                    turno.mascota_raza
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {turno.cliente_nombre}
                                                    </span>
                                                    {turno.servicios_nombres
                                                        .length > 0 && (
                                                        <span className="flex items-center gap-1 truncate">
                                                            <Scissors className="w-3 h-3" />
                                                            {turno.servicios_nombres.join(
                                                                ", ",
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <Badge
                                                    variant="outline"
                                                    className={`text-[11px] ${cfg.badgeClass}`}
                                                >
                                                    {cfg.label}
                                                </Badge>
                                                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <ScrollToBottomButton />
        </>
    );
}
