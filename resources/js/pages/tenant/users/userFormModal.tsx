import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Lock, Shield } from "lucide-react";

export interface UserItem {
    id: string;
    nombre: string;
    apellido?: string | null;
    email: string;
    telefono?: string | null;
    activo: boolean;
    roles: string[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user?: UserItem | null;
    roles: string[];
}

export default function UserFormModal({ isOpen, onClose, user, roles }: Props) {
    const isEditing = !!user;
    const availableRoles = roles.filter((role) => role !== "dueño_principal");

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            password: "",
            rol: availableRoles.includes("empleado")
                ? "empleado"
                : availableRoles[0] || "",
        });

    useEffect(() => {
        if (user) {
            setData({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                email: user.email || "",
                telefono: user.telefono || "",
                password: "",
                rol:
                    user.roles.find((role) => availableRoles.includes(role)) ||
                    availableRoles[0] ||
                    "empleado",
            });
        } else {
            reset();
        }
        clearErrors();
    }, [user, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && user) {
            put(`/users/${user.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post("/users", {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {isEditing
                            ? "Editar Usuario"
                            : "Registrar Nuevo Usuario"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="nombre">Nombre *</Label>
                            <div className="relative">
                                <User className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="nombre"
                                    className="pl-9"
                                    value={data.nombre}
                                    onChange={(e) =>
                                        setData("nombre", e.target.value)
                                    }
                                    placeholder="Juan"
                                />
                            </div>
                            {errors.nombre && (
                                <p className="text-xs text-red-500">
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
                                placeholder="Pérez"
                            />
                            {errors.apellido && (
                                <p className="text-xs text-red-500">
                                    {errors.apellido}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email">Correo Electrónico *</Label>
                        <div className="relative">
                            <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                className="pl-9"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="juan@ejemplo.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <div className="relative">
                                <Phone className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="telefono"
                                    className="pl-9"
                                    value={data.telefono}
                                    onChange={(e) =>
                                        setData("telefono", e.target.value)
                                    }
                                    placeholder="+54 388..."
                                />
                            </div>
                            {errors.telefono && (
                                <p className="text-xs text-red-500">
                                    {errors.telefono}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="rol">Rol</Label>
                            <Select
                                value={data.rol}
                                onValueChange={(value) => setData("rol", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableRoles.map((r) => (
                                        <SelectItem key={r} value={r}>
                                            <span className="capitalize">
                                                {r}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.rol && (
                                <p className="text-xs text-red-500">
                                    {errors.rol}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">
                            {isEditing
                                ? "Nueva Contraseña (Opcional)"
                                : "Contraseña *"}
                        </Label>
                        <div className="relative">
                            <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                className="pl-9"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder={
                                    isEditing
                                        ? "•••••••• (Dejar en blanco para conservar)"
                                        : "••••••••"
                                }
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer bg-red-500 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-red-500/80"
                        >
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
                            {processing
                                ? "Guardando..."
                                : isEditing
                                  ? "Actualizar"
                                  : "Crear Usuario"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
