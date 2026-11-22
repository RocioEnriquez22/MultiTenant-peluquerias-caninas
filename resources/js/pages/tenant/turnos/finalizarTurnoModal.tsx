import { FormEvent, useEffect, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { CheckCircle2, CreditCard, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    MetodoPagoTurno,
    TurnoDiarioItem,
    ServicioCatalogoItem,
} from "@/types/turnos";

interface Props {
    turno: TurnoDiarioItem | null;
    onClose: () => void;
    serviciosCatalogo?: ServicioCatalogoItem[];
}

const METODOS_PAGO: {
    value: Exclude<MetodoPagoTurno, "pendiente">;
    label: string;
}[] = [
    { value: "efectivo", label: "Efectivo" },
    { value: "mercado_pago", label: "Mercado Pago" },
    { value: "transferencia", label: "Transferencia" },
];

const monedaFormato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

export default function FinalizarTurnoModal({
    turno,
    onClose,
    serviciosCatalogo = [],
}: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        estado: "listo",
        metodo_pago: "efectivo" as MetodoPagoTurno,
        monto_cobrado: 0,
        servicios: [] as string[],
    });
    // Unificamos todos los servicios activos del catálogo con los que ya tenía el turno (conservando precio_historico)
    const listaServiciosDisponibles = useMemo(() => {
        if (!turno) return [];

        const mapaTurnos = new Map(
            turno.servicios.map((s) => [s.id, Number(s.precio_historico)]),
        );

        const items = serviciosCatalogo.map((s) => ({
            id: s.id,
            nombre: s.nombre,
            precio: mapaTurnos.has(s.id)
                ? mapaTurnos.get(s.id)!
                : Number(s.precio),
        }));
        // Si el turno tenía un servicio que luego fue desactivado en el catálogo, lo incluimos igual
        for (const sTurno of turno.servicios) {
            if (!items.some((i) => i.id === sTurno.id)) {
                items.push({
                    id: sTurno.id,
                    nombre: sTurno.nombre,
                    precio: Number(sTurno.precio_historico),
                });
            }
        }

        return items;
    }, [turno, serviciosCatalogo]);

    useEffect(() => {
        if (turno) {
            const idsIniciales = turno.servicios.map((s) => s.id);
            const sumaInicial = turno.servicios.reduce(
                (acc, s) => acc + Number(s.precio_historico),
                0,
            );

            setData({
                estado: "listo",
                metodo_pago:
                    turno.metodo_pago !== "pendiente"
                        ? turno.metodo_pago
                        : "efectivo",
                monto_cobrado:
                    turno.monto_cobrado > 0 ? turno.monto_cobrado : sumaInicial,
                servicios: idsIniciales,
            });
        }
    }, [turno]);

    const toggleServicio = (servicioId: string) => {
        if (!turno) return;

        const yaSeleccionado = data.servicios.includes(servicioId);
        // Evitamos dejar el turno sin ningún servicio realizado
        if (yaSeleccionado && data.servicios.length === 1) return;

        const nuevosIds = yaSeleccionado
            ? data.servicios.filter((id) => id !== servicioId)
            : [...data.servicios, servicioId];

        const nuevoTotal = turno.servicios
            .filter((s) => nuevosIds.includes(s.id))
            .reduce((acc, s) => acc + Number(s.precio_historico), 0);

        setData((prev) => ({
            ...prev,
            servicios: nuevosIds,
            monto_cobrado: nuevoTotal,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!turno) return;

        patch(`/turnos/${turno.id}/estado`, {
            onSuccess: () => onClose(),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={!!turno} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="size-5" />
                        Finalizar Turno y Registrar Cobro
                    </DialogTitle>
                    <DialogDescription>
                        Mascota:{" "}
                        <span className="font-semibold text-gray-800">
                            {turno?.mascota.nombre}
                        </span>{" "}
                        ({turno?.cliente.nombre} {turno?.cliente.apellido || ""}
                        ). Quedará registrado a tu nombre como turno realizado.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                            Medio de pago *
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                            {METODOS_PAGO.map((m) => (
                                <button
                                    key={m.value}
                                    type="button"
                                    onClick={() =>
                                        setData("metodo_pago", m.value)
                                    }
                                    className={`py-2.5 px-2 rounded-lg border text-xs font-semibold transition-all ${
                                        data.metodo_pago === m.value
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                        {errors.metodo_pago && (
                            <p className="text-xs text-destructive">
                                {errors.metodo_pago}
                            </p>
                        )}
                    </div>

                    {/* Lista completa de servicios activos del catálogo */}
                    {listaServiciosDisponibles.length > 0 && (
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5">
                                <Scissors className="w-3.5 h-3.5 text-gray-500" />
                                Servicios realizados *
                            </Label>
                            <div className="max-h-44 overflow-y-auto space-y-1.5 rounded-lg border bg-gray-50/60 p-2.5">
                                {listaServiciosDisponibles.map((servicio) => {
                                    const checked = data.servicios.includes(
                                        servicio.id,
                                    );
                                    return (
                                        <label
                                            key={servicio.id}
                                            className={`flex items-center justify-between p-2 rounded-md border text-xs cursor-pointer transition-colors ${
                                                checked
                                                    ? "bg-white border-emerald-300 text-gray-900 font-medium"
                                                    : "bg-gray-100/70 border-gray-200 text-gray-500"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() =>
                                                        toggleServicio(
                                                            servicio.id,
                                                        )
                                                    }
                                                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                <span>{servicio.nombre}</span>
                                            </div>
                                            <span className="tabular-nums">
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
                    )}

                    <div className="space-y-1">
                        <Label htmlFor="monto_cobrado">
                            Monto cobrado ($) *
                        </Label>
                        <Input
                            id="monto_cobrado"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.monto_cobrado}
                            onChange={(e) =>
                                setData("monto_cobrado", Number(e.target.value))
                            }
                            required
                        />
                        {errors.monto_cobrado && (
                            <p className="text-xs text-destructive">
                                {errors.monto_cobrado}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            <X className="size-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <CheckCircle2 className="size-4 mr-1" />
                            {processing ? "Registrando..." : "Confirmar Listo"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
