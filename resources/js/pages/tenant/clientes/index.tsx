import React, { useState, FormEvent } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import ClienteFormModal from "./clienteFormModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollToBottomButton } from "@/components/ui/button-scroll";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    UserPlus,
    LayoutGrid,
    Table as TableIcon,
    MoreVertical,
    Edit2,
    Dog,
    Archive,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Phone,
    Mail,
    MapPin,
    FileText,
    Users,
    Eye,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Search,
    ChevronRight,
    ChevronLeft,
    Bold,
} from "lucide-react";

// 1. Tipos e Interfaces
export interface MascotaItem {
    id: string;
    nombre: string;
    especie_raza: string | null;
    dimension: string | null; // Muestra "Tamaño" en la UI
    observaciones: string | null;
    activo: boolean;
}

export interface ClienteItem {
    id: string;
    nombre: string;
    apellido: string | null;
    telefono: string;
    email: string | null;
    direccion: string | null;
    notas: string | null;
    activo: boolean;
    mascotas: MascotaItem[];
}
//interfaces para los filtros
export interface ClientesPaginados {
    data: ClienteItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export interface FiltrosClientes {
    buscar: string;
    estado: string;
    orden: string;
    direccion: string;
    por_pagina: number | string;
}
interface Props {
    clientes: ClientesPaginados;
    filtros: FiltrosClientes;
    canManage: boolean;
    tenantId: string;
    canArchivar: boolean;
}

interface SharedProps {
    [key: string]: unknown;
    errors: Record<string, string>;
}

export default function ClientesIndex({
    clientes,
    filtros,
    canManage,
    tenantId,
    canArchivar,
}: Props) {
    const { errors } = usePage<SharedProps>().props;

    // Estado visual: Tarjetas vs Tabla
    const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

    // Estado para controlar expansiones de mascotas en la vista de tabla
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(
        {},
    );

    // 5. Preparación de estados para modales (se integrarán cuando se construyan los componentes)
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);

    const [selectedCliente, setSelectedCliente] = useState<ClienteItem | null>(
        null,
    );

    // Handlers para abrir modales
    const handleOpenNewCliente = () => {
        setSelectedCliente(null);
        setIsClientModalOpen(true);
    };

    const handleOpenEditCliente = (cliente: ClienteItem) => {
        setSelectedCliente(cliente);
        setIsClientModalOpen(true);
    };

    // Acciones de Archivo / Reactivación usando rutas relativas
    const handleToggleCliente = (cliente: ClienteItem) => {
        const accion = cliente.activo ? "archivar" : "reactivar";
        if (
            confirm(
                `¿Estás seguro de que deseas ${accion} la ficha del cliente "${cliente.nombre}"?`,
            )
        ) {
            router.patch(
                `/clientes/${cliente.id}/toggle`,
                {},
                { preserveScroll: true },
            );
        }
    };

    const handleToggleMascota = (clienteId: string, mascota: MascotaItem) => {
        const accion = mascota.activo ? "archivar" : "reactivar";
        if (
            confirm(
                `¿Estás seguro de que deseas ${accion} a la mascota "${mascota.nombre}"?`,
            )
        ) {
            router.patch(
                `/clientes/${clienteId}/mascotas/${mascota.id}/toggle`,
                {},
                { preserveScroll: true },
            );
        }
    };

    const toggleRowExpand = (id: string) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const [buscar, setBuscar] = useState(filtros.buscar ?? "");
    const [estado, setEstado] = useState(filtros.estado ?? "");
    const [orden, setOrden] = useState(filtros.orden ?? "cliente");
    const [direccion, setDireccion] = useState(filtros.direccion ?? "asc");
    const [porPagina, setPorPagina] = useState<number | string>(
        filtros.por_pagina ?? "todos",
    );

    const aplicarFiltros = (e?: FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            "/clientes",
            {
                buscar,
                estado,
                orden,
                direccion,
                por_pagina: porPagina,
            },
            { preserveState: true, preserveScroll: true },
        );
    };
    const limpiarFiltros = () => {
        setBuscar("");
        setEstado("");
        setOrden("cliente");
        setDireccion("asc");
        setPorPagina("todos");
        router.get(
            "/clientes",
            {},
            { preserveState: true, preserveScroll: true },
        );
    };
    const ordenarPor = (campo: "cliente" | "mascotas" | "estado") => {
        const nuevaDireccion =
            orden === campo && direccion === "asc" ? "desc" : "asc";
        setOrden(campo);
        setDireccion(nuevaDireccion);

        router.get(
            "/clientes",
            {
                buscar,
                estado,
                orden: campo,
                direccion: nuevaDireccion,
                por_pagina: porPagina,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleChangePorPagina = (nuevoValor: number | string) => {
        setPorPagina(nuevoValor);
        router.get(
            "/clientes",
            {
                buscar,
                estado,
                orden,
                direccion,
                por_pagina: nuevoValor,
            },
            { preserveState: true, preserveScroll: true },
        );
    };
    const renderIndicadorOrden = (campo: string) => {
        if (orden !== campo) {
            return (
                <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-gray-400 inline" />
            );
        }
        return direccion === "asc" ? (
            <ArrowUp className="w-3.5 h-3.5 ml-1 text-indigo-600 inline" />
        ) : (
            <ArrowDown className="w-3.5 h-3.5 ml-1 text-indigo-600 inline" />
        );
    };

    return (
        <>
            <Head title="Clientes y Mascotas" />

            <div className="mx-auto w-11/12 md:w-11/12 lg:w-9/12 px-4 md:px-0 space-y-6 px-2 py-4 sm:px-6 lg:px-4">
                {/* 2. Encabezado común y selector de vista */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Clientes y Mascotas
                        </h1>
                        <p className="text-sm text-gray-500">
                            Gestión de propietarios e historial de fichas
                            técnicas.
                        </p>
                    </div>

                    <div className="w-full flex flex-col  sm:flex-row justify-between items-center sm:items-center gap-4">
                        {/* Selector para alternar entre Tarjetas y Tabla */}
                        {canManage && (
                            <Button
                                onClick={handleOpenNewCliente}
                                className="bg-indigo-600 hover:bg-indigo-700 lg:w-[13rem]"
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Nuevo Cliente
                            </Button>
                        )}
                        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
                            <Button
                                type="button"
                                size="sm"
                                variant={
                                    viewMode === "cards"
                                        ? "secondary"
                                        : "outline"
                                }
                                aria-pressed={viewMode === "cards"}
                                onClick={() => setViewMode("cards")}
                                className="px-3 py-1 text-xs font-medium"
                            >
                                <LayoutGrid className="w-3.5 h-3.5 mr-1.5" />
                                Fichas
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant={
                                    viewMode === "table"
                                        ? "secondary"
                                        : "outline"
                                }
                                aria-pressed={viewMode === "table"}
                                onClick={() => setViewMode("table")}
                                className="px-3 py-1 text-xs font-medium"
                            >
                                <TableIcon className="w-3.5 h-3.5 mr-1.5" />
                                Lista
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Barra de Búsqueda, Filtros y Cantidad por Página */}
                <form
                    onSubmit={aplicarFiltros}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
                >
                    {/* Buscador por nombre, teléfono o email */}
                    <div className="lg:col-span-5 space-y-1">
                        <label className="text-xs font-medium text-gray-600">
                            Buscar cliente
                        </label>
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={buscar}
                                onChange={(e) => setBuscar(e.target.value)}
                                placeholder="Nombre, apellido, teléfono o email..."
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Filtro por Estado */}
                    <div className="lg:col-span-3 space-y-1">
                        <label className="text-xs font-medium text-gray-600">
                            Estado
                        </label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Todos</option>
                            <option value="1">Solo Activos</option>
                            <option value="0">
                                Solo Inactivos / Archivados
                            </option>
                        </select>
                    </div>

                    {/* Selector Mostrar todos , 4 o 8*/}
                    <div className="lg:col-span-2 space-y-1">
                        <label className="text-xs font-medium text-gray-600">
                            Mostrar
                        </label>
                        <select
                            value={String(porPagina)}
                            onChange={(e) => {
                                const val = e.target.value;
                                handleChangePorPagina(
                                    val === "todos" ? "todos" : Number(val),
                                );
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="4">4 registros</option>
                            <option value="8">8 registros</option>
                            <option value="todos">Todos</option>
                        </select>
                    </div>

                    {/* Botones de Acción */}
                    <div className="lg:col-span-2 flex wrap gap-2">
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                            Buscar
                        </Button>
                        {(filtros.buscar ||
                            filtros.estado ||
                            String(filtros.por_pagina) !== "todos") && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={limpiarFiltros}
                                title="Limpiar filtros"
                            >
                                Limpiar
                            </Button>
                        )}
                    </div>
                </form>

                {errors.cliente && (
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                        {errors.cliente}
                    </div>
                )}

                {/* Estado vacío */}
                {clientes.data.length === 0 ? (
                    <Card className="h-auto flex flex-col">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <Users className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-lg font-semibold text-gray-500">
                                No hay clientes registrados con{" "}
                                <b className="text-black">"{filtros.buscar}"</b>
                            </p>
                            {canManage && (
                                <Button
                                    onClick={handleOpenNewCliente}
                                    className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Registrar Cliente
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/*  VISTA DE TARJETAS/FICHAS */}
                        {viewMode === "cards" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {clientes.data.map((cliente) => (
                                    <Card
                                        key={cliente.id}
                                        className={`flex flex-col justify-start gap-2 transition-shadow hover:shadow-md ${
                                            !cliente.activo
                                                ? "opacity-70 bg-gray-50/50"
                                                : ""
                                        }`}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg font-bold text-gray-900">
                                                        {cliente.nombre}{" "}
                                                        {cliente.apellido || ""}
                                                    </CardTitle>
                                                    <div className="mt-1">
                                                        <Badge
                                                            variant={
                                                                cliente.activo
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            className={
                                                                cliente.activo
                                                                    ? "bg-green-600"
                                                                    : "text-gray-500 border-gray-300"
                                                            }
                                                        >
                                                            {cliente.activo
                                                                ? "Activo"
                                                                : "Archivado"}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* Menu de Acciones del Cliente */}
                                                {canManage && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreVertical className="h-4 w-4 text-gray-500" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleOpenEditCliente(
                                                                        cliente,
                                                                    )
                                                                }
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5 mr-2" />
                                                                Editar cliente
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    router.visit(
                                                                        `/clientes/${cliente.id}/mascotas?agregar=1`,
                                                                    )
                                                                }
                                                            >
                                                                <Dog className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                                                                Agregar mascota
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            {canArchivar && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleToggleCliente(
                                                                            cliente,
                                                                        )
                                                                    }
                                                                    className={
                                                                        cliente.activo
                                                                            ? "text-amber-600"
                                                                            : "text-green-600"
                                                                    }
                                                                >
                                                                    {cliente.activo ? (
                                                                        <>
                                                                            <Archive className="w-3.5 h-3.5 mr-2" />
                                                                            Archivar
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <RotateCcw className="w-3.5 h-3.5 mr-2" />
                                                                            Reactivar
                                                                        </>
                                                                    )}
                                                                </DropdownMenuItem>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4 text-sm text-gray-600">
                                            {/* Datos de contacto */}
                                            <div className="flex flex-col justify-start h-[6rem] min-h-[6rem] flex-shrink-0 space-y-1.5 border-b pb-3 ">
                                                <div className="flex items-center text-gray-700 font-medium">
                                                    <Phone className="w-3.5 h-3.5 mr-2 text-gray-400" />
                                                    {cliente.telefono}
                                                </div>
                                                {cliente.email && (
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Mail className="w-3.5 h-3.5 mr-2 text-gray-400" />
                                                        {cliente.email}
                                                    </div>
                                                )}
                                                {cliente.direccion && (
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400" />
                                                        {cliente.direccion}
                                                    </div>
                                                )}
                                                {cliente.notas && (
                                                    <div className="flex items-start text-xs text-amber-700 bg-amber-50/60 p-2 rounded mt-2">
                                                        <FileText className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5" />
                                                        <span>
                                                            {cliente.notas}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Listado de Mascotas de la Tarjeta */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                                    <span className="flex flex-row">
                                                        <Dog className="w-3.5 h-3.5 mx-2 text-indigo-500" />
                                                        Mascotas (
                                                        {
                                                            cliente.mascotas
                                                                .length
                                                        }
                                                        )
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            `/clientes/${cliente.id}/mascotas`,
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="w-3 h-3" />
                                                                    Ver
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            `/clientes/${cliente.id}/mascotas?agregar=1`,
                                                                        )
                                                                    }
                                                                >
                                                                    <Dog className="w-3.5 h-3.5 text-indigo-600" />
                                                                    Agregar
                                                                    mascota
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* 4. VISTA DE TABLA */}
                        {viewMode === "table" && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50/50 [&>th]:text-center">
                                            <TableHead
                                                onClick={() =>
                                                    ordenarPor("cliente")
                                                }
                                                className="cursor-pointer select-none hover:text-indigo-600 transition-colors"
                                            >
                                                Cliente{" "}
                                                {renderIndicadorOrden(
                                                    "cliente",
                                                )}
                                            </TableHead>
                                            <TableHead>
                                                Teléfono / Contacto
                                            </TableHead>
                                            <TableHead
                                                onClick={() =>
                                                    ordenarPor("mascotas")
                                                }
                                                className="cursor-pointer select-none hover:text-indigo-600 transition-colors"
                                            >
                                                Mascotas{" "}
                                                {renderIndicadorOrden(
                                                    "mascotas",
                                                )}
                                            </TableHead>
                                            <TableHead
                                                onClick={() =>
                                                    ordenarPor("estado")
                                                }
                                                className="cursor-pointer select-none hover:text-indigo-600 transition-colors"
                                            >
                                                Estado{" "}
                                                {renderIndicadorOrden("estado")}
                                            </TableHead>
                                            <TableHead>Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clientes.data.map((cliente) => (
                                            <React.Fragment key={cliente.id}>
                                                <TableRow
                                                    className={
                                                        !cliente.activo
                                                            ? "bg-gray-50/50 opacity-75 [&>th]:text-center [&>td]:text-center"
                                                            : "[&>th]:text-center [&>td]:text-center"
                                                    }
                                                >
                                                    <TableCell className="font-medium">
                                                        <div className="font-semibold text-gray-900 ml-[1rem]">
                                                            {cliente.nombre}{" "}
                                                            {cliente.apellido ||
                                                                ""}
                                                        </div>
                                                        {cliente.direccion && (
                                                            <div className="text-xs text-gray-400">
                                                                {
                                                                    cliente.direccion
                                                                }
                                                            </div>
                                                        )}
                                                    </TableCell>

                                                    <TableCell className="text-sm">
                                                        <div>
                                                            {cliente.telefono}
                                                        </div>
                                                        {cliente.email && (
                                                            <div className="text-xs text-gray-400">
                                                                {cliente.email}
                                                            </div>
                                                        )}
                                                    </TableCell>

                                                    <TableCell className="flex justify-center">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                toggleRowExpand(
                                                                    cliente.id,
                                                                )
                                                            }
                                                            className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            <Dog className="w-3.5 h-3.5" />
                                                            {
                                                                cliente.mascotas
                                                                    .length
                                                            }{" "}
                                                            mascota(s)
                                                            {expandedRows[
                                                                cliente.id
                                                            ] ? (
                                                                <ChevronUp className="w-3 h-3 ml-1" />
                                                            ) : (
                                                                <ChevronDown className="w-3 h-3 ml-1" />
                                                            )}
                                                        </Button>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                cliente.activo
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            className={
                                                                cliente.activo
                                                                    ? "bg-green-600"
                                                                    : "text-gray-500 border-gray-300"
                                                            }
                                                        >
                                                            {cliente.activo
                                                                ? "Activo"
                                                                : "Archivado"}
                                                        </Badge>
                                                    </TableCell>

                                                    <TableCell className="text-right">
                                                        {canManage && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleOpenEditCliente(
                                                                                cliente,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Edit2 className="w-3.5 h-3.5 mr-2" />{" "}
                                                                        Editar
                                                                        cliente
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            router.visit(
                                                                                `/clientes/${cliente.id}/mascotas?agregar=1`,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Dog className="w-3.5 h-3.5 mr-2 text-indigo-600" />{" "}
                                                                        Agregar
                                                                        mascota
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    {canArchivar && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleToggleCliente(
                                                                                    cliente,
                                                                                )
                                                                            }
                                                                            className={
                                                                                cliente.activo
                                                                                    ? "text-amber-600"
                                                                                    : "text-green-600"
                                                                            }
                                                                        >
                                                                            {cliente.activo ? (
                                                                                <>
                                                                                    <Archive className="w-3.5 h-3.5 mr-2" />{" "}
                                                                                    Archivar
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <RotateCcw className="w-3.5 h-3.5 mr-2" />{" "}
                                                                                    Reactivar
                                                                                </>
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </TableCell>
                                                </TableRow>

                                                {/* Fila desplegable para ver y gestionar las mascotas en la vista de tabla */}
                                                {expandedRows[cliente.id] && (
                                                    <TableRow className="bg-gray-100">
                                                        <TableCell
                                                            colSpan={5}
                                                            className="py-3 lg:px-6 px-3"
                                                        >
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                                                                    <span>
                                                                        Fichas
                                                                        de
                                                                        Mascotas
                                                                        de{" "}
                                                                        {
                                                                            cliente.nombre
                                                                        }
                                                                    </span>
                                                                    <div className="flex flex-row items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                router.visit(
                                                                                    `/clientes/${cliente.id}/mascotas`,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Eye className="w-3 h-3" />
                                                                            Ver
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                router.visit(
                                                                                    `/clientes/${cliente.id}/mascotas?agregar=1`,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Dog className="w-3.5 h-3.5 text-indigo-600" />
                                                                            <p className="text-indigo-600">
                                                                                Agregar
                                                                                mascota
                                                                            </p>
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                                {cliente
                                                                    .mascotas
                                                                    .length ===
                                                                0 ? (
                                                                    <p className="text-xs text-gray-400 italic">
                                                                        No hay
                                                                        mascotas
                                                                        registradas
                                                                        para
                                                                        este
                                                                        cliente.
                                                                    </p>
                                                                ) : (
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                                                        {cliente.mascotas.map(
                                                                            (
                                                                                m,
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        m.id
                                                                                    }
                                                                                    className="flex items-center justify-between p-2 rounded border bg-white text-xs"
                                                                                >
                                                                                    <div>
                                                                                        <div className="font-semibold text-gray-800">
                                                                                            {
                                                                                                m.nombre
                                                                                            }{" "}
                                                                                            {!m.activo && (
                                                                                                <span className="text-red-500 font-normal">
                                                                                                    (Archivada)
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="text-gray-500 text-[11px]">
                                                                                            {m.especie_raza ||
                                                                                                "Sin raza"}{" "}
                                                                                            {m.dimension &&
                                                                                                `• Tamaño: ${m.dimension}`}
                                                                                        </div>
                                                                                        {m.observaciones && (
                                                                                            <div className="text-[10px] text-amber-700 mt-0.5">
                                                                                                {
                                                                                                    m.observaciones
                                                                                                }
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </>
                )}
                {/* Barra de Paginación */}
                {clientes.total > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 text-sm text-gray-600">
                        <div>
                            Mostrando{" "}
                            <span className="font-semibold text-gray-900">
                                {clientes.from ?? 0}
                            </span>{" "}
                            a{" "}
                            <span className="font-semibold text-gray-900">
                                {clientes.to ?? 0}
                            </span>{" "}
                            de{" "}
                            <span className="font-semibold text-gray-900">
                                {clientes.total}
                            </span>{" "}
                            clientes
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={!clientes.prev_page_url}
                                onClick={() =>
                                    clientes.prev_page_url &&
                                    router.get(
                                        clientes.prev_page_url,
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Anterior
                            </Button>

                            <span className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">
                                Página {clientes.current_page} de{" "}
                                {clientes.last_page}
                            </span>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={!clientes.next_page_url}
                                onClick={() =>
                                    clientes.next_page_url &&
                                    router.get(
                                        clientes.next_page_url,
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                            >
                                Siguiente
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Modal de Cliente */}
                <ClienteFormModal
                    isOpen={isClientModalOpen}
                    onClose={() => setIsClientModalOpen(false)}
                    cliente={selectedCliente}
                    tenantId={tenantId}
                />
            </div>
            <ScrollToBottomButton />
        </>
    );
}
