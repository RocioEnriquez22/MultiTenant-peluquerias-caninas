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
import { ScrollToBottomButton } from "@/components/ui/button-scroll";
import { cn } from "@/lib/utils";
import { EstadoTurno, TurnoDiarioItem } from "@/types/turnos";
import TurnoCard from "./turnoCard";

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

export default function TableroKanbanTurnos({
    turnos,
    fechaSeleccionada,
    onOpenNewTurno,
    onEditTurno,
    onRequestFinalizar,
}: Props) {
    const { puedeGestionarTurno, puedeEditarTurno } = useKanbanPermissions();

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
                onSuccess: (page) => {
                    const turnosFrescos =
                        (page.props.turnos as TurnoDiarioItem[]) ?? turnos;
                    setColumns(agruparPorEstado(turnosFrescos));
                },
                onError: () => setColumns(agruparPorEstado(turnos)),
            },
        );
    };

    return (
        <>
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
                            const countFormatted = String(
                                items.length,
                            ).padStart(2, "0");

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
                                                    puedeEditar={puedeEditarTurno(
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
            <ScrollToBottomButton />
        </>
    );
}
