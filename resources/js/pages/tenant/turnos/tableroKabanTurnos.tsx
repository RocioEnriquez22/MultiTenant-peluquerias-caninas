import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useKanbanPermissions } from "@/hooks/use-kanban-permitions";
import {
    CalendarIcon,
    Lock,
    RotateCcw,
    Dog,
    Plus,
    User,
    AlertCircle,
    CheckCircle2,
    Eye,
    Edit2,
    MoreHorizontal,
    UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Kanban,
    KanbanBoard,
    KanbanColumn,
    KanbanColumnContent,
    KanbanItem,
    KanbanItemHandle,
    KanbanOverlay,
    type KanbanMoveEvent,
} from "@/components/ui/kanban";
import { cn } from "@/lib/utils";
import { EstadoTurno, TurnoDiarioItem } from "@/types/turnos";

interface Props {
    turnos: TurnoDiarioItem[];
    fechaSeleccionada: string;
    onOpenNewTurno: (fecha?: string) => void;
    onEditTurno: (turno: TurnoDiarioItem) => void;
    onRequestFinalizar: (turno: TurnoDiarioItem) => void;
}

const COLUMN_CONFIG: Record<
    EstadoTurno,
    {
        title: string;
        containerClass: string;
        dotClass: string;
        titleClass: string;
        badgeClass: string;
    }
> = {
    pendiente: {
        title: "Pendiente",
        containerClass: "bg-slate-100/90 border-slate-200/80",
        dotClass: "bg-slate-600",
        titleClass: "text-slate-800",
        badgeClass: "border-slate-300 bg-white/80 text-slate-700",
    },
    en_proceso: {
        title: "En Proceso",
        containerClass: "bg-amber-50/90 border-amber-200/80",
        dotClass: "bg-amber-500",
        titleClass: "text-amber-700",
        badgeClass: "border-amber-300 bg-white/80 text-amber-700",
    },
    listo: {
        title: "Listo",
        containerClass: "bg-sky-50/90 border-sky-200/80",
        dotClass: "bg-sky-500",
        titleClass: "text-sky-700",
        badgeClass: "border-sky-300 bg-white/80 text-sky-700",
    },
    cancelado: {
        title: "Cancelado",
        containerClass: "bg-rose-50/80 border-rose-200/80",
        dotClass: "bg-rose-500",
        titleClass: "text-rose-700",
        badgeClass: "border-rose-300 bg-white/80 text-rose-700",
    },
};

const ORDEN_COLUMNAS: EstadoTurno[] = [
    "pendiente",
    "en_proceso",
    "listo",
    "cancelado",
];

function agruparPorEstado(
    turnos: TurnoDiarioItem[],
): Record<EstadoTurno, TurnoDiarioItem[]> {
    return {
        pendiente: turnos.filter((t) => t.estado === "pendiente"),
        en_proceso: turnos.filter((t) => t.estado === "en_proceso"),
        listo: turnos.filter((t) => t.estado === "listo"),
        cancelado: turnos.filter((t) => t.estado === "cancelado"),
    };
}

interface TurnoCardProps {
    turno: TurnoDiarioItem;
    isOverlay?: boolean;
    puedeGestionar?: boolean;
    onEdit?: (turno: TurnoDiarioItem) => void;
    onRequestFinalizar?: (turno: TurnoDiarioItem) => void;
    onLiberarTurno?: (turno: TurnoDiarioItem) => void;
}

function TurnoCard({
    turno,
    isOverlay,
    puedeGestionar = true,
    onEdit,
    onRequestFinalizar,
    onLiberarTurno,
}: TurnoCardProps) {
    const bloqueadoPorOtro =
        turno.estado === "en_proceso" &&
        turno.realizado_por !== null &&
        !puedeGestionar;
    const card = (
        <div
            className={cn(
                "w-[14rem] shrink-0 md:w-full h-[12rem] shrink-0 md:h-full bg-white rounded-xl border border-gray-100 p-3.5 shadow-xs transition-all space-y-2.5",
                bloqueadoPorOtro
                    ? "border-amber-200/80 bg-amber-50/20 opacity-90"
                    : "border-gray-100",
                !isOverlay && "hover:border-indigo-300/70 hover:shadow-sm",
                isOverlay && "ring-2 ring-indigo-400/30 rotate-1 shadow-lg",
            )}
        >
            {/* Cabecera: Mascota + Menú rápido */}
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <div>
                        <p className="text-sm font-semibold text-gray-900 leading-snug flex items-center gap-1.5">
                            <Dog className="size-3.5 text-indigo-600 shrink-0" />
                            <span>{turno.mascota.nombre}</span>
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                        {turno.mascota.especie_raza && (
                            <span className="text-xs font-normal text-gray-400 truncate">
                                ({turno.mascota.especie_raza})
                            </span>
                        )}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                        <User className="size-3 shrink-0" />
                        {turno.cliente.nombre} {turno.cliente.apellido || ""}
                    </p>
                </div>

                {!isOverlay && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="sm"
                                onPointerDown={(e) => e.stopPropagation()}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 "
                            >
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(`/turnos/${turno.id}`)
                                }
                            >
                                <Eye className="size-3.5 mr-2" />
                                Ver ficha completa
                            </DropdownMenuItem>

                            {puedeGestionar &&
                                turno.estado !== "listo" &&
                                turno.estado !== "cancelado" && (
                                    <DropdownMenuItem
                                        onClick={() => onEdit?.(turno)}
                                    >
                                        <Edit2 className="size-3.5 mr-2" />
                                        Editar turno
                                    </DropdownMenuItem>
                                )}
                            {puedeGestionar &&
                                turno.estado === "en_proceso" && (
                                    <DropdownMenuItem
                                        onClick={() => onLiberarTurno?.(turno)}
                                        className="text-slate-700"
                                    >
                                        <RotateCcw className="size-3.5 mr-2" />
                                        Volver a Pendiente (Liberar)
                                    </DropdownMenuItem>
                                )}
                            {puedeGestionar && turno.estado !== "listo" && (
                                <DropdownMenuItem
                                    onClick={() => onRequestFinalizar?.(turno)}
                                    className="text-emerald-700 font-medium"
                                >
                                    <CheckCircle2 className="size-3.5 mr-2" />
                                    Marcar Listo / Cobrar
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Servicios contratados */}
            <div className="flex flex-wrap gap-1">
                {turno.servicios.map((s) => (
                    <span
                        key={s.id}
                        className="bg-gray-100 text-gray-700 rounded-md px-2 py-0.5 text-[11px] font-medium"
                    >
                        {s.nombre}
                    </span>
                ))}
            </div>

            {/* Alerta de observaciones técnicas si existen */}
            {turno.mascota.observaciones && (
                <div className="flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                    <AlertCircle className="size-3 text-amber-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">
                        {turno.mascota.observaciones}
                    </span>
                </div>
            )}

            {/* Pie estilo imagen: Hora + Quién lo realizó / Badge */}
            <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium text-gray-600 tabular-nums">
                    <CalendarIcon className="size-3.5 text-gray-400" />
                    {turno.hora} hs
                </span>
                {turno.estado === "en_proceso" && (
                    <div className="flex items-center gap-1.5 min-w-0">
                        {turno.realizado_por && (
                            <span
                                title={`En atención por ${turno.realizado_por.nombre} ${turno.realizado_por.apellido || ""}`}
                                className={cn(
                                    "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full truncate",
                                    bloqueadoPorOtro
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-indigo-50 text-indigo-700",
                                )}
                            >
                                {bloqueadoPorOtro ? (
                                    <Lock className="size-2.5 shrink-0" />
                                ) : (
                                    <UserCheck className="size-3 shrink-0" />
                                )}
                                <span className="truncate">
                                    {turno.realizado_por.nombre}
                                </span>
                            </span>
                        )}

                        {puedeGestionar && !isOverlay && (
                            <button
                                type="button"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => onRequestFinalizar?.(turno)}
                                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 hover:underline whitespace-nowrap"
                            >
                                Finalizar
                            </button>
                        )}
                    </div>
                )}
                {/* Estado LISTO: Muestra quién lo realizó */}
                {turno.estado === "listo" && turno.realizado_por && (
                    <span
                        title={`Atendido por ${turno.realizado_por.nombre} ${turno.realizado_por.apellido || ""}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"
                    >
                        <UserCheck className="size-3" />
                        {turno.realizado_por.nombre}
                    </span>
                )}

                {/* Estado PENDIENTE: Acción rápida para finalizar directo si hace falta */}
                {turno.estado === "pendiente" && !isOverlay && (
                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => onRequestFinalizar?.(turno)}
                        className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 hover:underline whitespace-nowrap"
                    >
                        Finalizar
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <KanbanItem value={turno.id} disabled={bloqueadoPorOtro}>
            {isOverlay || bloqueadoPorOtro ? (
                card
            ) : (
                <KanbanItemHandle>{card}</KanbanItemHandle>
            )}
        </KanbanItem>
    );
}

export default function TableroKanbanTurnos({
    turnos,
    fechaSeleccionada,
    onOpenNewTurno,
    onEditTurno,
    onRequestFinalizar,
}: Props) {
    const { puedeGestionarTurno } = useKanbanPermissions();

    const [columns, setColumns] = useState<Record<string, TurnoDiarioItem[]>>(
        () => agruparPorEstado(turnos),
    );

    // Sincronizar cuando Inertia recarga los turnos del día
    useEffect(() => {
        setColumns(agruparPorEstado(turnos));
    }, [turnos]);
    const handleLiberarTurno = (turno: TurnoDiarioItem) => {
        router.patch(
            `/turnos/${turno.id}/estado`,
            { estado: "pendiente" },
            {
                preserveScroll: true,
                onError: () => setColumns(agruparPorEstado(turnos)),
            },
        );
    };

    const handleMove = ({
        activeContainer,
        overContainer,
        event,
    }: KanbanMoveEvent) => {
        if (activeContainer === overContainer) return;

        const turnoId = String(event.active.id);
        const nuevoEstado = overContainer as EstadoTurno;
        const turnoMovido = columns[activeContainer]?.find(
            (t) => t.id === turnoId,
        );

        if (!turnoMovido || !puedeGestionarTurno(turnoMovido)) {
            setColumns(agruparPorEstado(turnos));
            return;
        }

        // Si lo sueltan en 'listo', pedimos confirmar medio de pago y monto antes de guardar
        if (nuevoEstado === "listo") {
            onRequestFinalizar(turnoMovido);
            return;
        }

        // Actualización optimista inmediata en pantalla
        setColumns((prev) => ({
            ...prev,
            [activeContainer]: prev[activeContainer].filter(
                (t) => t.id !== turnoId,
            ),
            [nuevoEstado]: [
                ...prev[nuevoEstado],
                { ...turnoMovido, estado: nuevoEstado },
            ],
        }));

        // Persistir en Laravel (PATCH /turnos/{turno}/estado)
        router.patch(
            `/turnos/${turnoId}/estado`,
            { estado: nuevoEstado },
            {
                preserveScroll: true,
                onError: () => setColumns(agruparPorEstado(turnos)),
            },
        );
    };

    return (
        <div className="overflow-x-auto pb-2">
            <Kanban
                value={columns}
                onValueChange={setColumns}
                onMove={handleMove}
                getItemValue={(item) => item.id}
                className="w-full"
            >
                <KanbanBoard className="flex flex-col md:grid md:auto-rows-fr md:grid-cols-4 gap-4 w-full">
                    {ORDEN_COLUMNAS.map((estado) => {
                        const meta = COLUMN_CONFIG[estado];
                        const items = columns[estado] || [];
                        const countFormatted = String(items.length).padStart(
                            2,
                            "0",
                        );

                        return (
                            <KanbanColumn key={estado} value={estado}>
                                <div
                                    className={cn(
                                        "flex h-full min-h-[140px] md:min-h-[420px] flex-col rounded-2xl border p-3.5 transition-colors",
                                        meta.containerClass,
                                    )}
                                >
                                    <div className="flex items-center gap-2 px-1 pb-3.5">
                                        <span
                                            className={cn(
                                                "size-2 rounded-full",
                                                meta.dotClass,
                                            )}
                                        />
                                        <h3
                                            className={cn(
                                                "text-sm font-semibold",
                                                meta.titleClass,
                                            )}
                                        >
                                            {meta.title}
                                        </h3>
                                        <span
                                            className={cn(
                                                "rounded-full border px-2 py-0.5 text-[11px] font-semibold tabular-nums",
                                                meta.badgeClass,
                                            )}
                                        >
                                            {countFormatted}
                                        </span>
                                    </div>

                                    {/* Lista de tarjetas arrastrables */}
                                    <KanbanColumnContent
                                        value={estado}
                                        className="flex-1 flex-row overflow-x-auto pb-1.5 md:flex-col md:overflow-visible md:pb-0 gap-3"
                                    >
                                        {items.map((turno) => (
                                            <TurnoCard
                                                key={turno.id}
                                                turno={turno}
                                                puedeGestionar={puedeGestionarTurno(
                                                    turno,
                                                )}
                                                onEdit={onEditTurno}
                                                onRequestFinalizar={
                                                    onRequestFinalizar
                                                }
                                                onLiberarTurno={
                                                    handleLiberarTurno
                                                }
                                            />
                                        ))}
                                    </KanbanColumnContent>

                                    {estado === "pendiente" && (
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                onOpenNewTurno(
                                                    fechaSeleccionada,
                                                )
                                            }
                                            className="pointer mt-3 flex items-center justify-start md:justify-center  gap-1.5 px-1 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            <Plus className="size-3.5" />
                                            Agregar turno
                                        </Button>
                                    )}
                                </div>
                            </KanbanColumn>
                        );
                    })}
                </KanbanBoard>

                <KanbanOverlay>
                    {({ value, variant }) => {
                        if (variant === "column") return null;
                        const turno = Object.values(columns)
                            .flat()
                            .find((t) => t.id === String(value));
                        return turno ? (
                            <TurnoCard turno={turno} isOverlay />
                        ) : null;
                    }}
                </KanbanOverlay>
            </Kanban>
        </div>
    );
}
