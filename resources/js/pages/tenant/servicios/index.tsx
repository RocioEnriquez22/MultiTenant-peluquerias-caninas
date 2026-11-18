import { Head, router, usePage } from "@inertiajs/react";
import { Pencil, Plus, Power, PowerOff, Scissors, Trash2 } from "lucide-react";
import { useKanbanPermissions } from "@/hooks/use-kanban-permitions";
import { useCan } from "@/hooks/use-can";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ServicioFormModal, { ServicioItem } from "./servicioFormModal";

interface Props {
    servicios: ServicioItem[];
    canManage: boolean;
    tenantId: string;
}

interface SharedProps {
    [key: string]: unknown;
    errors: Record<string, string>;
}

const monedaFormato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

export default function ServiciosIndex({ servicios, tenantId }: Props) {
    const { errors } = usePage<SharedProps>().props;
    const can = useCan();
    const { isPrincipalOwner } = useKanbanPermissions();

    const canManage = can("gestionar.servicios") || isPrincipalOwner;
    // Estado para controlar la apertura del modal y el servicio seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServicio, setSelectedServicio] =
        useState<ServicioItem | null>(null);

    const handleOpenCrear = () => {
        setSelectedServicio(null);
        setIsModalOpen(true);
    };

    const handleOpenEditar = (servicio: ServicioItem) => {
        setSelectedServicio(servicio);
        setIsModalOpen(true);
    };

    const handleBorrado = (servicio: ServicioItem) => {
        const confirmado = window.confirm(
            `¿Seguro que quieres eliminar el servicio "${servicio.nombre}"?`,
        );

        if (!confirmado) {
            return;
        }

        router.delete(`/servicios/${servicio.id}`, { preserveScroll: true });
    };

    const handleCambioEstado = (servicio: ServicioItem) => {
        router.patch(
            `/servicios/${servicio.id}/toggle`,
            {},
            { preserveScroll: true },
        );
    };

    /*preserveScroll: true Al guardar o editar, Inertia revalida los 
     datos y actualiza las tarjetas visuales de las Cards suavemente 
     en pantalla.*/

    return (
        <>
            <Head title="Servicios" />

            <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                <header className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Servicios
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Consulta los servicios y sus precios.
                        </p>
                    </div>

                    {canManage && (
                        <Button
                            type="button"
                            onClick={handleOpenCrear}
                            className="cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                        >
                            <Plus className="mr-1 size-4" />
                            Nuevo servicio
                        </Button>
                    )}
                </header>

                {errors.servicio && (
                    <p
                        role="alert"
                        className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                    >
                        {errors.servicio}
                    </p>
                )}

                {servicios.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                            <Scissors className="size-8 text-muted-foreground" />
                            <div className="space-y-1">
                                <h2 className="font-semibold">
                                    Todavía no hay servicios
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Cuando se agreguen, aparecerán aquí.
                                </p>
                            </div>
                            {canManage && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleOpenCrear}
                                    className="mt-2"
                                >
                                    <Plus className="mr-1 size-4" />
                                    Crear primer servicio
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <section
                        aria-label="Catálogo de servicios"
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {servicios.map((servicio) => (
                            <Card
                                key={servicio.id}
                                className="justify-between transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-3">
                                        <CardTitle className="text-lg">
                                            {servicio.nombre}
                                        </CardTitle>

                                        <Badge
                                            className={
                                                servicio.activo
                                                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                                    : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                                            }
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`size-2 rounded-full animate-pulse ${
                                                    servicio.activo
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            />
                                            {servicio.activo
                                                ? "Activo"
                                                : "Inactivo"}
                                        </Badge>
                                    </div>

                                    <CardDescription>
                                        {servicio.descripcion ||
                                            "Sin descripción"}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-2xl font-semibold">
                                        {monedaFormato.format(
                                            Number(servicio.precio),
                                        )}
                                    </p>
                                </CardContent>

                                {canManage && (
                                    <CardFooter className="flex flex-wrap justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                handleOpenEditar(servicio)
                                            }
                                        >
                                            <Pencil className="mr-1 size-4" />
                                            Editar
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                handleCambioEstado(servicio)
                                            }
                                        >
                                            {servicio.activo ? (
                                                <PowerOff className="mr-1 size-4" />
                                            ) : (
                                                <Power className="mr-1 size-4" />
                                            )}
                                            {servicio.activo
                                                ? "Desactivar"
                                                : "Activar"}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                                handleBorrado(servicio)
                                            }
                                        >
                                            <Trash2 />
                                            Eliminar
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </section>
                )}
            </main>
            {/*Modal para crear y editar*/}
            <ServicioFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                servicio={selectedServicio}
                tenantId={tenantId}
            />
        </>
    );
}
