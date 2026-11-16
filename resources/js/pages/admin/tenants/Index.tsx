import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Building2,
    Check,
    Globe,
    Mail,
    Phone,
    Pencil,
    Plus,
    Power,
    Scissors,
    Trash2,
    UserRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EditTenantModal from '@/components/admin/editTenantModal';

interface Domain {
    id: number;
    domain: string;
    tenant_id: string;
}

interface Tenant {
    id: string;
    nombre_comercial: string;
    nombre_dueño: string;
    email_contacto: string;
    telefono: string;
    activo: boolean;
    domains: Domain[];
}

interface Props {
    tenants: Tenant[];
}

export default function Index({ tenants }: Props) {
    const [tenantBeingEdited, setTenantBeingEdited] = useState<Tenant | null>(
        null,
    );
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre_comercial: '',
        nombre_dueño: '',
        email_contacto: '',
        telefono: '',
        subdomain: '',
    });

    const activeTenants = tenants.filter((tenant) => tenant.activo).length;
    const inactiveTenants = tenants.length - activeTenants;

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/admin/tenants', {
            onSuccess: () => reset(),
        });
    };

    const toggleTenantStatus = (tenantId: string) => {
        router.patch(`/admin/tenants/${encodeURIComponent(tenantId)}/toggle`);
    };

    const deleteTenant = (tenant: Tenant) => {
        if (
            confirm(
                `¿Estás segura de eliminar permanentemente a "${tenant.nombre_comercial}"? Se borrará completamente su base de datos PostgreSQL.`,
            )
        ) {
            router.delete(`/admin/tenants/${encodeURIComponent(tenant.id)}`);
        }
    };

    return (
        <>
            <Head title="Gestión de peluquerías" />

            <main className="min-h-full bg-muted/30">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
                    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                <Scissors
                                    className="size-4"
                                    aria-hidden="true"
                                />
                                <span>Administración</span>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    Peluquerías
                                </h1>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    Registra nuevos negocios y administra sus
                                    accesos desde un solo lugar.
                                </p>
                            </div>
                        </div>

                        <Badge
                            variant="outline"
                            className="gap-1.5 self-start rounded-full px-3 py-1 sm:self-auto"
                        >
                            <Building2
                                className="size-3.5"
                                aria-hidden="true"
                            />
                            {tenants.length}{' '}
                            {tenants.length === 1
                                ? 'peluquería registrada'
                                : 'peluquerías registradas'}
                        </Badge>
                    </header>

                    <section
                        aria-label="Resumen de peluquerías"
                        className="grid gap-4 sm:grid-cols-3"
                    >
                        <Card className="gap-4 py-5">
                            <CardContent className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Total registradas
                                    </p>
                                    <p className="text-2xl font-semibold">
                                        {tenants.length}
                                    </p>
                                </div>
                                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Building2
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="gap-4 py-5">
                            <CardContent className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Activas
                                    </p>
                                    <p className="text-2xl font-semibold">
                                        {activeTenants}
                                    </p>
                                </div>
                                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <Check
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="gap-4 py-5">
                            <CardContent className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Inactivas
                                    </p>
                                    <p className="text-2xl font-semibold">
                                        {inactiveTenants}
                                    </p>
                                </div>
                                <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                                    <Power
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                        <Card className="min-w-0">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Plus
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle>
                                            Registrar peluquería
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={submit} className="space-y-5">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre_comercial">
                                                Nombre comercial
                                            </Label>
                                            <Input
                                                id="nombre_comercial"
                                                name="nombre_comercial"
                                                autoComplete="organization"
                                                placeholder="Ej.: Canitos Peluquería"
                                                value={data.nombre_comercial}
                                                onChange={(event) =>
                                                    setData(
                                                        'nombre_comercial',
                                                        event.target.value,
                                                    )
                                                }
                                                aria-invalid={Boolean(
                                                    errors.nombre_comercial,
                                                )}
                                            />
                                            {errors.nombre_comercial && (
                                                <p className="text-sm text-destructive">
                                                    {errors.nombre_comercial}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nombre_dueño">
                                                Nombre del dueño/a
                                            </Label>
                                            <Input
                                                id="nombre_dueño"
                                                name="nombre_dueño"
                                                autoComplete="name"
                                                placeholder="Nombre y apellido"
                                                value={data.nombre_dueño}
                                                onChange={(event) =>
                                                    setData(
                                                        'nombre_dueño',
                                                        event.target.value,
                                                    )
                                                }
                                                aria-invalid={Boolean(
                                                    errors.nombre_dueño,
                                                )}
                                            />
                                            {errors.nombre_dueño && (
                                                <p className="text-sm text-destructive">
                                                    {errors.nombre_dueño}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email_contacto">
                                                Email de contacto
                                            </Label>
                                            <Input
                                                id="email_contacto"
                                                name="email_contacto"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="contacto@peluqueria.com"
                                                value={data.email_contacto}
                                                onChange={(event) =>
                                                    setData(
                                                        'email_contacto',
                                                        event.target.value,
                                                    )
                                                }
                                                aria-invalid={Boolean(
                                                    errors.email_contacto,
                                                )}
                                            />
                                            {errors.email_contacto && (
                                                <p className="text-sm text-destructive">
                                                    {errors.email_contacto}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="telefono">
                                                Teléfono
                                            </Label>
                                            <Input
                                                id="telefono"
                                                name="telefono"
                                                type="tel"
                                                autoComplete="tel"
                                                placeholder="+54 11 1234-5678"
                                                value={data.telefono}
                                                onChange={(event) =>
                                                    setData(
                                                        'telefono',
                                                        event.target.value,
                                                    )
                                                }
                                                aria-invalid={Boolean(
                                                    errors.telefono,
                                                )}
                                            />
                                            {errors.telefono && (
                                                <p className="text-sm text-destructive">
                                                    {errors.telefono}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subdomain">
                                            Subdominio deseado
                                        </Label>
                                        <div className="flex min-w-0">
                                            <div className="relative h-9 min-w-0 flex-1">
                                                <Input
                                                    id="subdomain"
                                                    name="subdomain"
                                                    className="rounded-r-none"
                                                    placeholder=" canitos"
                                                    value={data.subdomain}
                                                    onChange={(event) =>
                                                        setData(
                                                            'subdomain',
                                                            event.target.value,
                                                        )
                                                    }
                                                    aria-invalid={Boolean(
                                                        errors.subdomain,
                                                    )}
                                                />
                                            </div>

                                            <span className="inline-flex h-9 shrink-0 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                                                .localhost
                                            </span>
                                        </div>
                                        {errors.subdomain && (
                                            <p className="text-sm text-destructive">
                                                {errors.subdomain}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                                Aprovisionando base de datos...
                                            </>
                                        ) : (
                                            <>
                                                <Plus
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                                Crear peluquería
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="min-w-0">
                            <CardHeader>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="space-y-1">
                                        <CardTitle>
                                            Peluquerías registradas
                                        </CardTitle>
                                        <CardDescription>
                                            Consulta sus datos y administra su
                                            estado.
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary">
                                        {tenants.length}{' '}
                                        {tenants.length === 1
                                            ? 'negocio'
                                            : 'negocios'}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {tenants.length === 0 ? (
                                    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center">
                                        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                            <Building2
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                Todavía no hay peluquerías
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Cuando registres una, aparecerá
                                                aquí.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <ul className="space-y-3">
                                        {tenants.map((tenant) => (
                                            <li
                                                key={tenant.id}
                                                className={`rounded-xl border p-4 transition-colors ${
                                                    tenant.activo
                                                        ? 'border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-900 dark:bg-green-950/40 dark:hover:bg-green-950/60'
                                                        : 'border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:hover:bg-red-950/60'
                                                }`}
                                            >
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div className="flex min-w-0 items-start gap-3">
                                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                            <Scissors
                                                                className="size-5"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 space-y-1">
                                                            <h3 className="truncate font-semibold">
                                                                {
                                                                    tenant.nombre_comercial
                                                                }
                                                            </h3>
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    tenant.activo
                                                                        ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
                                                                        : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
                                                                }
                                                            >
                                                                {tenant.activo
                                                                    ? 'Activa'
                                                                    : 'Inactiva'}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setTenantBeingEdited(
                                                                    tenant,
                                                                )
                                                            }
                                                        >
                                                            <Pencil
                                                                className="size-3"
                                                                aria-hidden="true"
                                                            />
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                toggleTenantStatus(
                                                                    tenant.id,
                                                                )
                                                            }
                                                        >
                                                            <Power
                                                                className="size-4"
                                                                aria-hidden="true"
                                                            />
                                                            {tenant.activo
                                                                ? 'Dar de baja'
                                                                : 'Activar'}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="bg-red-100 text-destructive hover:bg-red-200 hover:text-destructive"
                                                            onClick={() =>
                                                                deleteTenant(
                                                                    tenant,
                                                                )
                                                            }
                                                        >
                                                            <Trash2
                                                                className="size-4"
                                                                aria-hidden="true"
                                                            />
                                                            Eliminar BD
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="mt-4 grid gap-3 border-t pt-3 text-sm text-muted-foreground sm:grid-cols-2">
                                                    <p className="flex min-w-0 items-center gap-2">
                                                        <UserRound
                                                            className="size-4 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="truncate">
                                                            {
                                                                tenant.nombre_dueño
                                                            }
                                                        </span>
                                                    </p>
                                                    <p className="flex min-w-0 items-center gap-2">
                                                        <Mail
                                                            className="size-4 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="truncate">
                                                            {
                                                                tenant.email_contacto
                                                            }
                                                        </span>
                                                    </p>
                                                    <p className="flex min-w-0 items-center gap-2">
                                                        <Phone
                                                            className="size-4 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="truncate">
                                                            {tenant.telefono ||
                                                                'Sin teléfono'}
                                                        </span>
                                                    </p>
                                                    <p className="flex min-w-0 items-center gap-2">
                                                        <Globe
                                                            className="size-4 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="truncate">
                                                            {tenant.domains[0]
                                                                ?.domain ??
                                                                'Sin dominio'}
                                                        </span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <EditTenantModal
                isOpen={tenantBeingEdited !== null}
                tenant={tenantBeingEdited}
                onClose={() => setTenantBeingEdited(null)}
            />
        </>
    );
}
