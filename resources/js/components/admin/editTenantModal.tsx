import { useEffect } from 'react';
import type { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Tenant {
    id: string;
    nombre_comercial: string;
    nombre_dueño: string;
    email_contacto: string;
    telefono: string;
    activo: boolean;
}

interface EditTenantModalProps {
    isOpen: boolean;
    tenant: Tenant | null;
    onClose: () => void;
}

export default function EditTenantModal({
    isOpen,
    tenant,
    onClose,
}: EditTenantModalProps) {
    const { data, setData, put, processing, errors, reset, clearErrors } =
        useForm({
            nombre_comercial: '',
            nombre_dueño: '',
            email_contacto: '',
            telefono: '',
        });

    useEffect(() => {
        if (tenant) {
            setData({
                nombre_comercial: tenant.nombre_comercial,
                nombre_dueño: tenant.nombre_dueño,
                email_contacto: tenant.email_contacto,
                telefono: tenant.telefono,
            });
            clearErrors();
        }
    }, [tenant, setData, clearErrors]);

    const closeDialog = () => {
        reset();
        clearErrors();
        onClose();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!tenant) {
            return;
        }

        put(`/admin/tenants/${encodeURIComponent(tenant.id)}`, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog
            open={isOpen && tenant !== null}
            onOpenChange={(open) => {
                if (!open) {
                    closeDialog();
                }
            }}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Editar peluquería</DialogTitle>
                    <DialogDescription>
                        Actualiza los datos de contacto de{' '}
                        <span className="font-medium text-foreground">
                            {tenant?.nombre_comercial}
                        </span>
                        . El subdominio no se modifica.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-nombre-comercial">
                            Nombre comercial
                        </Label>
                        <Input
                            id="edit-nombre-comercial"
                            value={data.nombre_comercial}
                            onChange={(event) =>
                                setData('nombre_comercial', event.target.value)
                            }
                            aria-invalid={Boolean(errors.nombre_comercial)}
                            required
                        />
                        {errors.nombre_comercial && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.nombre_comercial}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-nombre-dueno">
                            Nombre del dueño/a
                        </Label>
                        <Input
                            id="edit-nombre-dueno"
                            value={data.nombre_dueño}
                            onChange={(event) =>
                                setData('nombre_dueño', event.target.value)
                            }
                            aria-invalid={Boolean(errors.nombre_dueño)}
                            required
                        />
                        {errors.nombre_dueño && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.nombre_dueño}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-email-contacto">
                            Email de contacto
                        </Label>
                        <Input
                            id="edit-email-contacto"
                            type="email"
                            value={data.email_contacto}
                            onChange={(event) =>
                                setData('email_contacto', event.target.value)
                            }
                            aria-invalid={Boolean(errors.email_contacto)}
                            required
                        />
                        {errors.email_contacto && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.email_contacto}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-telefono">Teléfono</Label>
                        <Input
                            id="edit-telefono"
                            value={data.telefono}
                            onChange={(event) =>
                                setData('telefono', event.target.value)
                            }
                            aria-invalid={Boolean(errors.telefono)}
                            required
                        />
                        {errors.telefono && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.telefono}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeDialog}
                            disabled={processing}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing || !tenant}>
                            {processing ? 'Guardando...' : 'Guardar cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
