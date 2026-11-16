import React, { FormEvent, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { CheckCircle2, CreditCard, X } from "lucide-react";
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
import { MetodoPagoTurno, TurnoDiarioItem } from "@/types/turnos";

interface Props {
    turno: TurnoDiarioItem | null;
    onClose: () => void;
}

const METODOS_PAGO: {
    value: Exclude<MetodoPagoTurno, "pendiente">;
    label: string;
}[] = [
    { value: "efectivo", label: "Efectivo" },
    { value: "mercado_pago", label: "Mercado Pago" },
    { value: "transferencia", label: "Transferencia" },
];

export default function FinalizarTurnoModal({ turno, onClose }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        estado: "listo",
        metodo_pago: "efectivo" as MetodoPagoTurno,
        monto_cobrado: 0,
    });

    useEffect(() => {
        if (turno) {
            setData({
                estado: "listo",
                metodo_pago:
                    turno.metodo_pago !== "pendiente"
                        ? turno.metodo_pago
                        : "efectivo",
                monto_cobrado:
                    turno.monto_cobrado > 0
                        ? turno.monto_cobrado
                        : turno.total_estimado,
            });
        }
    }, [turno]);

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
            <DialogContent className="sm:max-w-[420px]">
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
