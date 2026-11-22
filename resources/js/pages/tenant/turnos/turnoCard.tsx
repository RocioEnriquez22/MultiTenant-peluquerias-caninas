import { router } from "@inertiajs/react";
import {
    AlertCircle,
    CalendarIcon,
    CheckCircle2,
    Dog,
    Edit2,
    Eye,
    Lock,
    MoreHorizontal,
    RotateCcw,
    User,
    UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KanbanItem, KanbanItemHandle } from "@/components/ui/kanban";
import { cn } from "@/lib/utils";
import { TurnoDiarioItem } from "@/types/turnos";

export interface TurnoCardProps {
    turno: TurnoDiarioItem;
    isOverlay?: boolean;
    puedeGestionar?: boolean;
    puedeEditar?: boolean;
    onEdit?: (turno: TurnoDiarioItem) => void;
    onRequestFinalizar?: (turno: TurnoDiarioItem) => void;
    onLiberarTurno?: (turno: TurnoDiarioItem) => void;
}

export default function TurnoCard({
    turno,
    isOverlay,
    puedeGestionar = true,
    puedeEditar = false,
    onEdit,
    onRequestFinalizar,
    onLiberarTurno,
}: TurnoCardProps) {
    const bloqueadoPorOtro =
        turno.estado === "en_proceso" &&
        turno.realizado_por !== null &&
        !puedeGestionar;

    const bloqueadoCerrado =
        (turno.estado === "listo" || turno.estado === "cancelado") &&
        !puedeGestionar;

    const tarjetaBloqueada =
        !isOverlay && (bloqueadoPorOtro || bloqueadoCerrado);
    const puedeArrastrar = !isOverlay && puedeGestionar;

    const card = (
        <div
            className={cn(
                "w-[14rem] shrink-0 md:w-full h-[12rem] shrink-0 md:h-full bg-white rounded-xl border border-gray-100 p-3.5 shadow-xs transition-all space-y-2.5",
                bloqueadoPorOtro && "border-amber-200/80 bg-gray-200 ",
                bloqueadoCerrado && "border-slate-200/80 bg-gray-200 ",
                !tarjetaBloqueada &&
                    !isOverlay &&
                    "hover:border-indigo-300/70 hover:shadow-sm",
                isOverlay && "ring-2 ring-indigo-400/30 rotate-1 shadow-lg",
            )}
        >
            {/* Cabecera: Mascota + Menú rápido */}
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-snug flex items-center gap-1.5">
                        <Dog className="size-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{turno.mascota.nombre}</span>
                        {bloqueadoCerrado && (
                            <span title="Turno cerrado (solo lectura)">
                                <Lock className="size-3 text-slate-400 shrink-0" />
                            </span>
                        )}
                    </p>
                    {turno.mascota.especie_raza && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                            ({turno.mascota.especie_raza})
                        </p>
                    )}
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
                                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
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

                            {puedeEditar && (
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

                            {puedeGestionar &&
                                turno.estado !== "listo" &&
                                turno.estado !== "cancelado" && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            onRequestFinalizar?.(turno)
                                        }
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

            {/* Pie: Hora + Responsable / Acción rápida */}
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

                {turno.estado === "listo" && turno.realizado_por && (
                    <span
                        title={`Atendido por ${turno.realizado_por.nombre} ${turno.realizado_por.apellido || ""}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"
                    >
                        <UserCheck className="size-3" />
                        {turno.realizado_por.nombre}
                    </span>
                )}

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
        <KanbanItem value={turno.id} disabled={!puedeArrastrar}>
            {!puedeArrastrar ? (
                card
            ) : (
                <KanbanItemHandle>{card}</KanbanItemHandle>
            )}
        </KanbanItem>
    );
}
