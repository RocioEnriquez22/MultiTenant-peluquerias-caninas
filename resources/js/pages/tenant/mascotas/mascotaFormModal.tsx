import React, { FormEvent, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { CheckCheck, Dog, X } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ClienteItem, MascotaItem } from "@/pages/tenant/clientes/index"; // Ajusta la ruta si es necesario

interface Props {
    isOpen: boolean;
    onClose: () => void;
    cliente: ClienteItem;
    mascota: MascotaItem | null;
}

export default function MascotaFormModal({
    isOpen,
    onClose,
    cliente,
    mascota,
}: Props) {
    const isEditing = !!mascota;

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            nombre: "",
            especie_raza: "",
            dimension: "",
            observaciones: "",
        });

    useEffect(() => {
        if (mascota) {
            setData({
                nombre: mascota.nombre,
                especie_raza: mascota.especie_raza || "",
                dimension: mascota.dimension || "",
                observaciones: mascota.observaciones || "",
            });
        } else {
            reset();
        }
        clearErrors();
    }, [mascota, isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEditing && mascota) {
            put(`/clientes/${cliente.id}/mascotas/${mascota.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        } else {
            post(`/clientes/${cliente.id}/mascotas`, {
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
            <DialogContent className="sm:max-w-[465px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Dog className="size-5 text-indigo-600" />
                        {isEditing
                            ? `Editar a ${mascota?.nombre}`
                            : "Nueva Mascota"}
                    </DialogTitle>
                    <DialogDescription>
                        Propietario:{" "}
                        <span className="font-semibold text-gray-800">
                            {cliente.nombre} {cliente.apellido || ""}
                        </span>
                        .{" "}
                        {isEditing
                            ? "Actualiza los datos o cuidados especiales de la ficha."
                            : "Completa los datos para registrar la ficha técnica."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label htmlFor="nombre">Nombre de la mascota *</Label>
                        <Input
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            placeholder="Ej: Firulais"
                            required
                        />
                        {errors.nombre && (
                            <p className="text-xs text-destructive">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="especie_raza">Especie / Raza</Label>
                            <Input
                                id="especie_raza"
                                value={data.especie_raza}
                                onChange={(e) =>
                                    setData("especie_raza", e.target.value)
                                }
                                placeholder="Ej: Caniche Toy"
                            />
                            {errors.especie_raza && (
                                <p className="text-xs text-destructive">
                                    {errors.especie_raza}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="dimension">Tamaño</Label>
                            <Select
                                value={data.dimension}
                                onValueChange={(value) =>
                                    setData("dimension", value)
                                }
                            >
                                <SelectTrigger id="dimension">
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pequeño">
                                        Pequeño
                                    </SelectItem>
                                    <SelectItem value="Mediano">
                                        Mediano
                                    </SelectItem>
                                    <SelectItem value="Grande">
                                        Grande
                                    </SelectItem>
                                    <SelectItem value="Gigante">
                                        Gigante
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.dimension && (
                                <p className="text-xs text-destructive">
                                    {errors.dimension}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="observaciones">
                            Observaciones técnicas / Alergias
                        </Label>
                        <Textarea
                            id="observaciones"
                            value={data.observaciones}
                            onChange={(e) =>
                                setData("observaciones", e.target.value)
                            }
                            placeholder="Ej: Alérgico a champú con perfume, inquieto con el secador..."
                            rows={3}
                        />
                        {errors.observaciones && (
                            <p className="text-xs text-destructive">
                                {errors.observaciones}
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
                            <X className="size-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className={
                                isEditing
                                    ? "cursor-pointer bg-green-500 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-green-500/80"
                                    : "cursor-pointer bg-indigo-600 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-indigo-700"
                            }
                        >
                            <CheckCheck className="size-4 mr-1" />
                            {processing
                                ? "Guardando..."
                                : isEditing
                                  ? "Guardar cambios"
                                  : "Agregar mascota"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
