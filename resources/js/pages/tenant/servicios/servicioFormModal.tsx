import React, { FormEvent, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export interface ServicioItem {
    id: string;
    nombre: string;
    descripcion: string | null;
    precio: string;
    activo: boolean;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    servicio: ServicioItem | null;
    tenantId: string;
}

export default function ServicioFormModal({
    isOpen,
    onClose,
    servicio,
    tenantId,
}: Props) {
    const isEditing = !!servicio;
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            nombre: "",
            descripcion: "",
            precio: "",
            activo: true,
        });

    // Cargar datos del servicio si estamos en modo edición o resetear si es nuevo
    useEffect(() => {
        if (servicio) {
            setData({
                nombre: servicio.nombre,
                descripcion: servicio.descripcion || "",
                precio: servicio.precio,
                activo: servicio.activo,
            });
        } else {
            reset();
        }
        clearErrors();
    }, [servicio, isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEditing && servicio) {
            put(`/servicios/${servicio.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        } else {
            post("/servicios", {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Modifica los datos del servicio seleccionado."
                            : "Completa los campos para agregar un nuevo servicio al catálogo."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label htmlFor="nombre">Nombre del servicio *</Label>
                        <Input
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            placeholder="Ej: Baño y corte higiénico"
                        />
                        {errors.nombre && (
                            <p className="text-xs text-destructive">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="precio">Precio (ARS) *</Label>
                        <Input
                            id="precio"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.precio}
                            onChange={(e) => setData("precio", e.target.value)}
                            placeholder="15000.00"
                        />
                        {errors.precio && (
                            <p className="text-xs text-destructive">
                                {errors.precio}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="descripcion">
                            Descripción (Opcional)
                        </Label>
                        <Textarea
                            id="descripcion"
                            value={data.descripcion}
                            onChange={(e) =>
                                setData("descripcion", e.target.value)
                            }
                            placeholder="Incluye corte de uñas, limpieza de oídos..."
                            rows={3}
                        />
                        {errors.descripcion && (
                            <p className="text-xs text-destructive">
                                {errors.descripcion}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="cursor-pointer bg-red-500 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-red-500/80"
                        >
                            <X className="size-4" />
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className={
                                isEditing
                                    ? "cursor-pointer bg-green-500 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-green-500/80"
                                    : "cursor-pointer bg-sky-500 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-sky-500/80"
                            }
                        >
                            <CheckCheck className="size-4" />
                            {processing
                                ? "Guardando..."
                                : isEditing
                                  ? "Guardar cambios"
                                  : "Crear servicio"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
