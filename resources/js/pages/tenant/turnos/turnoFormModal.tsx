import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    CalendarClock,
    CheckCheck,
    Scissors,
    X,
    CircleCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ClienteCatalogoItem,
    ServicioCatalogoItem,
    TurnoDiarioItem,
} from "@/types/turnos";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    fechaPorDefecto: string;
    clientes: ClienteCatalogoItem[];
    servicios: ServicioCatalogoItem[];
    turnoEditar?: TurnoDiarioItem | null;
}

const monedaFormato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

//para el funcionamiento del calendario de shad/studio
const TIME_SLOTS = Array.from({ length: 49 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = Math.floor(totalMinutes / 60) + 8;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
});

function parseIsoToDate(iso: string): Date | undefined {
    if (!iso) return undefined;
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return undefined;
    return new Date(y, m - 1, d);
}

function formatDateToIso(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function TurnoFormModal({
    isOpen,
    onClose,
    fechaPorDefecto,
    clientes,
    servicios,
    turnoEditar = null,
}: Props) {
    const isEditing = !!turnoEditar;

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            cliente_id: "",
            mascota_id: "",
            fecha: fechaPorDefecto,
            hora: "09:00",
            servicios: [] as string[],
            notas_turno: "",
        });

    useEffect(() => {
        if (turnoEditar) {
            setData({
                cliente_id: turnoEditar.cliente_id,
                mascota_id: turnoEditar.mascota_id,
                fecha: turnoEditar.fecha,
                hora: turnoEditar.hora,
                servicios: turnoEditar.servicios.map((s) => s.id),
                notas_turno: turnoEditar.notas_turno || "",
            });
            const clienteActual = clientes.find(
                (c) => c.id === turnoEditar.cliente_id,
            );
            setBusquedaCliente(
                clienteActual
                    ? `${clienteActual.nombre} ${clienteActual.apellido ?? ""}`.trim()
                    : "",
            );
        } else {
            reset();
            setBusquedaCliente("");
            setData((prev) => ({
                ...prev,
                fecha: fechaPorDefecto,
                hora: "09:00",
                servicios: [],
            }));
        }
        clearErrors();
    }, [turnoEditar, isOpen, fechaPorDefecto]);

    const selectedDateObj = useMemo(
        () => parseIsoToDate(data.fecha),
        [data.fecha],
    );

    // Mascotas disponibles según el cliente elegido
    const mascotasDelCliente = useMemo(() => {
        const cliente = clientes.find((c) => c.id === data.cliente_id);
        return cliente ? cliente.mascotas : [];
    }, [clientes, data.cliente_id]);

    // Cálculo en tiempo real del total estimado
    const totalEstimado = useMemo(() => {
        return servicios
            .filter((s) => data.servicios.includes(s.id))
            .reduce((acc, s) => acc + Number(s.precio), 0);
    }, [servicios, data.servicios]);

    const handleClienteChange = (clienteId: string) => {
        const cliente = clientes.find((c) => c.id === clienteId);
        // Si tiene una sola mascota activa, la preseleccionamos automáticamente
        const mascotaAuto =
            cliente && cliente.mascotas.length === 1
                ? cliente.mascotas[0].id
                : "";

        setData((prev) => ({
            ...prev,
            cliente_id: clienteId,
            mascota_id: mascotaAuto,
        }));
    };

    const toggleServicio = (servicioId: string) => {
        setData(
            "servicios",
            data.servicios.includes(servicioId)
                ? data.servicios.filter((id) => id !== servicioId)
                : [...data.servicios, servicioId],
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEditing && turnoEditar) {
            put(`/turnos/${turnoEditar.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        } else {
            post("/turnos", {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        }
    };

    //para el uso del combobox
    const [busquedaCliente, setBusquedaCliente] = useState("");

    const clienteSeleccionado =
        clientes.find((c) => c.id === data.cliente_id) ?? null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CalendarClock className="size-5 text-indigo-600" />
                        {isEditing ? "Editar Turno" : "Agendar Nuevo Turno"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Modifica el horario, mascota o servicios del turno."
                            : "Selecciona el cliente, su mascota y los servicios a realizar."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Cliente y Mascota */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Cliente *</Label>
                            <Combobox
                                items={clientes.map((c) => c.id)}
                                value={data.cliente_id || null}
                                inputValue={busquedaCliente}
                                onInputValueChange={(val, details) => {
                                    if (details.reason === "input-change") {
                                        setBusquedaCliente(val);
                                    }
                                }}
                                itemToStringLabel={(id) => {
                                    if (!id) return "";
                                    const c = clientes.find(
                                        (item) => item.id === id,
                                    );
                                    return c
                                        ? `${c.nombre} ${c.apellido ?? ""}`.trim()
                                        : "";
                                }}
                                onValueChange={(clienteId: string | null) => {
                                    if (clienteId) {
                                        const c = clientes.find(
                                            (item) => item.id === clienteId,
                                        );
                                        handleClienteChange(clienteId);
                                        setBusquedaCliente(
                                            c
                                                ? `${c.nombre} ${c.apellido ?? ""}`.trim()
                                                : "",
                                        );
                                    } else {
                                        setData((prev) => ({
                                            ...prev,
                                            cliente_id: "",
                                            mascota_id: "",
                                        }));
                                        setBusquedaCliente("");
                                    }
                                }}
                            >
                                <ComboboxInput
                                    placeholder="Buscar cliente por nombre o teléfono..."
                                    showClear={Boolean(data.cliente_id)}
                                    className="w-full"
                                />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        No se encontraron clientes.
                                    </ComboboxEmpty>
                                    <ComboboxList>
                                        {(clienteId: string) => {
                                            const cliente = clientes.find(
                                                (c) => c.id === clienteId,
                                            );
                                            if (!cliente) return null;
                                            return (
                                                <ComboboxItem
                                                    key={cliente.id}
                                                    value={cliente.id}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleClienteChange(
                                                            cliente.id,
                                                        );
                                                        setBusquedaCliente(
                                                            `${cliente.nombre} ${cliente.apellido ?? ""}`.trim(),
                                                        );
                                                    }}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {cliente.nombre}{" "}
                                                            {cliente.apellido ??
                                                                ""}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {cliente.telefono}
                                                        </span>
                                                    </div>
                                                </ComboboxItem>
                                            );
                                        }}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                            {errors.cliente_id && (
                                <p className="text-xs text-destructive">
                                    {errors.cliente_id}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="mascota_id">Mascota *</Label>
                            <Select
                                value={data.mascota_id}
                                onValueChange={(val) =>
                                    setData("mascota_id", val)
                                }
                                disabled={
                                    !data.cliente_id ||
                                    mascotasDelCliente.length === 0
                                }
                            >
                                <SelectTrigger id="mascota_id">
                                    <SelectValue
                                        placeholder={
                                            !data.cliente_id
                                                ? "Elige un cliente primero"
                                                : mascotasDelCliente.length ===
                                                    0
                                                  ? "Sin mascotas activas"
                                                  : "Seleccionar mascota..."
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {mascotasDelCliente.map((m) => (
                                        <SelectItem key={m.id} value={m.id}>
                                            {m.nombre}{" "}
                                            {m.especie_raza
                                                ? `(${m.especie_raza})`
                                                : ""}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.mascota_id && (
                                <p className="text-xs text-destructive">
                                    {errors.mascota_id}
                                </p>
                            )}
                        </div>
                    </div>

                    {/*Uso de calendar bajado de shadStudio */}
                    <div className="space-y-1.5">
                        <Label>Fecha y Horario del Turno *</Label>
                        <div className="rounded-xl border bg-card overflow-hidden">
                            <div className="relative md:pr-44">
                                <div className="p-3 flex justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDateObj}
                                        onSelect={(d) =>
                                            d &&
                                            setData("fecha", formatDateToIso(d))
                                        }
                                        defaultMonth={selectedDateObj}
                                        showOutsideDays={false}
                                        className="bg-transparent p-0 [--cell-size:--spacing(9)]"
                                    />
                                </div>

                                <div className="inset-y-0 right-0 flex w-full flex-col border-t max-md:h-44 md:absolute md:w-44 md:border-t-0 md:border-l bg-gray-50/40">
                                    <ScrollArea className="h-full">
                                        <div className="flex flex-col gap-1.5 p-3">
                                            {TIME_SLOTS.map((time) => (
                                                <Button
                                                    key={time}
                                                    type="button"
                                                    size="sm"
                                                    variant={
                                                        data.hora === time
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    onClick={() =>
                                                        setData("hora", time)
                                                    }
                                                    className="w-full shadow-none text-xs h-8"
                                                >
                                                    {time} hs
                                                </Button>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 border-t bg-gray-50/60 px-4 py-2.5 text-xs text-gray-700">
                                <CircleCheckIcon className="size-4 text-emerald-600 shrink-0" />
                                <span>
                                    Turno programado para el{" "}
                                    <span className="font-semibold">
                                        {selectedDateObj?.toLocaleDateString(
                                            "es-AR",
                                            {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                            },
                                        )}
                                    </span>{" "}
                                    a las{" "}
                                    <span className="font-semibold">
                                        {data.hora} hs
                                    </span>
                                    .
                                </span>
                            </div>
                        </div>
                        {(errors.fecha || errors.hora) && (
                            <p className="text-xs text-destructive">
                                {errors.fecha || errors.hora}
                            </p>
                        )}
                    </div>

                    {/* Selección Múltiple de Servicios */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label className="flex items-center gap-1.5">
                                <Scissors className="w-3.5 h-3.5 text-indigo-600" />
                                Servicios a realizar *
                            </Label>
                            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                                Total estimado:{" "}
                                {monedaFormato.format(totalEstimado)}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-2.5 border rounded-lg bg-gray-50/50">
                            {servicios.map((servicio) => {
                                const seleccionado = data.servicios.includes(
                                    servicio.id,
                                );
                                return (
                                    <label
                                        key={servicio.id}
                                        className={`flex items-center justify-between p-2 rounded-md border text-xs cursor-pointer transition-colors ${
                                            seleccionado
                                                ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-medium"
                                                : "bg-white border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 truncate pr-2">
                                            <input
                                                type="checkbox"
                                                checked={seleccionado}
                                                onChange={() =>
                                                    toggleServicio(servicio.id)
                                                }
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="truncate">
                                                {servicio.nombre}
                                            </span>
                                        </div>
                                        <span className="text-gray-600 shrink-0">
                                            {monedaFormato.format(
                                                servicio.precio,
                                            )}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                        {errors.servicios && (
                            <p className="text-xs text-destructive">
                                {errors.servicios}
                            </p>
                        )}
                    </div>

                    {/* Notas del turno */}
                    <div className="space-y-1">
                        <Label htmlFor="notas_turno">
                            Notas del turno (Opcional)
                        </Label>
                        <Textarea
                            id="notas_turno"
                            value={data.notas_turno}
                            onChange={(e) =>
                                setData("notas_turno", e.target.value)
                            }
                            placeholder="Indicaciones de corte, horario de retiro, etc..."
                            rows={2}
                        />
                        {errors.notas_turno && (
                            <p className="text-xs text-destructive">
                                {errors.notas_turno}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="cursor-pointer bg-red-500 text-white hover:bg-red-500/80"
                        >
                            <X className="size-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            <CheckCheck className="size-4 mr-1" />
                            {processing
                                ? "Guardando..."
                                : isEditing
                                  ? "Guardar cambios"
                                  : "Agendar turno"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
