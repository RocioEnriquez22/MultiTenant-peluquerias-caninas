import { FormEvent, useEffect } from "react";
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
import { ClienteItem } from "@/pages/tenant/clientes/index"; // Ajusta la ruta a tu index si varía

interface Props {
    isOpen: boolean;
    onClose: () => void;
    cliente: ClienteItem | null;
    tenantId: string;
}

export default function ClienteFormModal({
    isOpen,
    onClose,
    cliente,
    tenantId,
}: Props) {
    const isEditing = !!cliente;

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            nombre: "",
            apellido: "",
            telefono: "+549",
            email: "",
            direccion: "",
            notas: "",
        });

    // Cargar datos del cliente si estamos en modo edición o resetear si es nuevo
    useEffect(() => {
        if (cliente) {
            setData({
                nombre: cliente.nombre,
                apellido: cliente.apellido || "",
                telefono: cliente.telefono,
                email: cliente.email || "",
                direccion: cliente.direccion || "",
                notas: cliente.notas || "",
            });
        } else {
            reset();
        }
        clearErrors();
    }, [cliente, isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEditing && cliente) {
            put(`/clientes/${cliente.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        } else {
            post("/clientes", {
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
            <DialogContent className="sm:max-w-[485px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Editar Cliente" : "Nuevo Cliente"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Modifica los datos del cliente seleccionado."
                            : "Completa los campos para registrar un nuevo cliente."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="nombre">Nombre *</Label>
                            <Input
                                id="nombre"
                                value={data.nombre}
                                onChange={(e) =>
                                    setData("nombre", e.target.value)
                                }
                                placeholder="Ej: Maria"
                                required
                            />
                            {errors.nombre && (
                                <p className="text-xs text-destructive">
                                    {errors.nombre}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input
                                id="apellido"
                                value={data.apellido}
                                onChange={(e) =>
                                    setData("apellido", e.target.value)
                                }
                                placeholder="Ej: Pérez"
                            />
                            {errors.apellido && (
                                <p className="text-xs text-destructive">
                                    {errors.apellido}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="telefono">Teléfono *</Label>
                            <div className="flex">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                                    +549
                                </span>

                                <Input
                                    id="telefono"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    className="rounded-l-none"
                                    value={
                                        data.telefono.startsWith("+549")
                                            ? data.telefono.slice(4)
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const digitos = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10);
                                        setData("telefono", `+549${digitos}`);
                                    }}
                                    placeholder="3881234567"
                                    required
                                />
                            </div>
                            {errors.telefono && (
                                <p className="text-xs text-destructive">
                                    {errors.telefono}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="cliente@email.com"
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                            id="direccion"
                            value={data.direccion}
                            onChange={(e) =>
                                setData("direccion", e.target.value)
                            }
                            placeholder="Ej: Av. Belgrano 1234"
                        />
                        {errors.direccion && (
                            <p className="text-xs text-destructive">
                                {errors.direccion}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="notas">Notas u Observaciones</Label>
                        <Textarea
                            id="notas"
                            value={data.notas}
                            onChange={(e) => setData("notas", e.target.value)}
                            placeholder="Preferencias de contacto, indicaciones especiales..."
                            rows={3}
                        />
                        {errors.notas && (
                            <p className="text-xs text-destructive">
                                {errors.notas}
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
                                  : "Crear cliente"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
