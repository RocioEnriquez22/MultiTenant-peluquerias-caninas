import React, { useState, type FormEvent } from "react";

import { Head, router, Link } from "@inertiajs/react";
import UserFormModal, { UserItem } from "./userFormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    UserPlus,
    Search,
    Edit2,
    CheckCircle2,
    XCircle,
    KeyRound,
    Trash2,
    SearchIcon,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { index as tenantUserIndex } from "@/actions/App/Http/Controllers/Tenant/TenantUserController";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Filtros {
    buscar: string;
    rol: string;
    activo: string;
}

interface Props {
    users: UserItem[];
    roles: string[];
    filtros: Filtros;
    tenantSlug: string;
    rolesParaFiltro: string[];
    isOwner: boolean;
    canCreateOwners: boolean;
}

export default function TenantUsersIndex({
    users,
    roles,
    filtros,
    tenantSlug,
    rolesParaFiltro,
    isOwner,
    canCreateOwners,
}: Props) {
    //estados iniciales para el filtrado
    const [buscar, setBuscar] = useState(filtros.buscar ?? "");
    const [rol, setRol] = useState(filtros.rol ?? "");
    const [activo, setActivo] = useState(filtros.activo ?? "");

    const aplicaFiltros = (e: FormEvent) => {
        e.preventDefault();
        const usersIndexPath = new URL(
            tenantUserIndex.url(tenantSlug),
            window.location.origin,
        ).pathname;
        router.get(
            usersIndexPath,
            { buscar, rol, activo },
            { preserveScroll: true, preserveState: true },
        );
    };

    const can = useCan();
    const canManageUsers = isOwner && can("gestionar.users");
    const canManagePermissions = can("gestionar.permisos");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

    const canManageUser = (user: UserItem): boolean =>
        canManageUsers &&
        !user.roles.includes("dueño_principal") &&
        (!user.roles.includes("dueño") || canCreateOwners);

    const handleOpenCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (user: UserItem) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleToggleStatus = (user: UserItem) => {
        router.patch(`/users/${user.id}/toggle`);
    };

    const handleBorrar = (user: UserItem) => {
        const confirmacion = window.confirm(
            `¿Estás seguro de que quieres eliminar a ${user.nombre}? Esta acción no se puede deshacer.`,
        );
        if (!confirmacion) {
            return;
        }
        router.delete(`/users/${encodeURIComponent(user.id)}`, {
            preserveScroll: true,
        });
    };
    return (
        <>
            <Head title="Gestión de Usuarios" />

            <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gestión de Usuarios
                        </h1>
                        <p className="text-sm text-gray-500">
                            Administra el personal del negocio y asigna sus
                            roles.
                        </p>
                    </div>
                    {canManageUsers && (
                        <Button
                            onClick={handleOpenCreate}
                            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Nuevo Usuario
                        </Button>
                    )}
                </div>

                {/* Filtro y Tabla */}
                <div className="w-full space-y-4 overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="w-full">
                        <form
                            onSubmit={aplicaFiltros}
                            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <div className="relative min-w-0 w-full sm:flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Buscar por nombre, email o teléfono..."
                                    className="pl-9"
                                    value={buscar}
                                    onChange={(e) => setBuscar(e.target.value)}
                                />
                            </div>

                            {/*selector de rol*/}
                            <Select
                                value={rol || "Todos"}
                                onValueChange={(value) =>
                                    setRol(value === "Todos" ? "" : value)
                                }
                            >
                                <SelectTrigger
                                    className="w-full sm:w-48"
                                    aria-label="Filtrar por rol"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Todos">
                                        Todos los roles
                                    </SelectItem>
                                    {rolesParaFiltro.map((nombreRol) => (
                                        <SelectItem
                                            key={nombreRol}
                                            value={nombreRol}
                                        >
                                            <span className="capitalize">
                                                {nombreRol}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={activo || "Todos"}
                                onValueChange={(value) =>
                                    setActivo(value === "Todos" ? "" : value)
                                }
                            >
                                <SelectTrigger
                                    className="w-full sm:w-48"
                                    aria-label="Filtrar por estado"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Todos">
                                        Todos los estados
                                    </SelectItem>
                                    <SelectItem value="1">Activos</SelectItem>
                                    <SelectItem value="0">Inactivos</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit" className="cursor-pointer">
                                <SearchIcon size="xs" />
                                Buscar
                            </Button>
                        </form>
                    </div>

                    <div className="overflow-x-auto rounded-md border border-gray-100">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead className="text-center">
                                        Usuario
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Contacto
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Rol
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Estado
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Acciones
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-8 text-center text-gray-500"
                                        >
                                            No se encontraron empleados
                                            registrados.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                <div className="font-semibold text-gray-900">
                                                    {user.nombre}{" "}
                                                    {user.apellido || ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                <div>{user.email}</div>
                                                <div className="text-xs text-gray-400">
                                                    {user.telefono ||
                                                        "Sin teléfono"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.roles.map((r) => (
                                                    <Badge
                                                        key={r}
                                                        variant={
                                                            r === "dueño" ||
                                                            r ===
                                                                "dueño_principal"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className={
                                                            r === "dueño" ||
                                                            r ===
                                                                "dueño_principal"
                                                                ? "mx-[0.5px] bg-indigo-600 capitalize"
                                                                : "mx-[0.5px] capitalize"
                                                        }
                                                    >
                                                        {r}
                                                    </Badge>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        user.activo
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {user.activo ? (
                                                        <>
                                                            <CheckCircle2 className="h-3 w-3" />{" "}
                                                            Activo
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="h-3 w-3" />{" "}
                                                            Inactivo
                                                        </>
                                                    )}
                                                </span>
                                            </TableCell>
                                            <TableCell className="flex justify-end items-center space-x-2 ">
                                                {canManagePermissions &&
                                                    canManageUser(user) && (
                                                        <Button
                                                            className="cursor-pointer"
                                                            size="sm"
                                                            variant="outline"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/users/${encodeURIComponent(user.id)}/permissions`}
                                                            >
                                                                <KeyRound className="size-3.5" />
                                                                Permisos
                                                            </Link>
                                                        </Button>
                                                    )}
                                                {canManageUser(user) && (
                                                    <>
                                                        <Button
                                                            className="cursor-pointer"
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleOpenEdit(
                                                                    user,
                                                                )
                                                            }
                                                        >
                                                            <Edit2 className="mr-1 h-3.5 w-3.5" />
                                                            Editar
                                                        </Button>

                                                        <Button
                                                            className="cursor-pointer"
                                                            size="sm"
                                                            variant={
                                                                user.activo
                                                                    ? "destructive"
                                                                    : "secondary"
                                                            }
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    user,
                                                                )
                                                            }
                                                        >
                                                            {user.activo
                                                                ? "Desactivar"
                                                                : "Activar"}
                                                        </Button>
                                                    </>
                                                )}
                                                {canManageUser(user) && (
                                                    <Button
                                                        className="cursor-pointer"
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleBorrar(user)
                                                        }
                                                    >
                                                        <Trash2 className="mr-1 size-3.5" />
                                                        Eliminar
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <UserFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
                roles={roles}
            />
        </>
    );
}
