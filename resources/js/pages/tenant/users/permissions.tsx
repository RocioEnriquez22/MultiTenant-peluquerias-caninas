import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { ArrowLeft, KeyRound, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Permission = {
    name: string;
};

type Props = {
    user: {
        id: string;
        nombre: string;
        apellido: string | null;
    };
    permissions: Permission[];
    assignedPermissions: string[];
};

export default function UserPermissions({
    user,
    permissions,
    assignedPermissions,
}: Props) {
    const { data, setData, put, processing, errors } = useForm({
        permissions: assignedPermissions,
    });

    const handlePermissionChange = (
        permissionName: string,
        checked: boolean,
    ) => {
        const updatedPermissions = checked
            ? [...data.permissions, permissionName]
            : data.permissions.filter(
                  (permission) => permission !== permissionName,
              );

        setData('permissions', updatedPermissions);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(`/users/${encodeURIComponent(user.id)}/permissions`);
    };

    const fullName = [user.nombre, user.apellido].filter(Boolean).join(' ');

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
                <KeyRound className="mt-1 size-6 text-primary" />
                <div>
                    <h1 className="text-2xl font-semibold">
                        Permisos de {fullName}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Marca los permisos que tendrá esta cuenta. Los cambios
                        afectan únicamente a este usuario.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Permisos disponibles</CardTitle>
                    <CardDescription>
                        Los permisos de administración están excluidos de esta
                        lista.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {permissions.map((permission) => {
                                const checkboxId = `permission-${permission.name}`;
                                const isChecked = data.permissions.includes(
                                    permission.name,
                                );

                                return (
                                    <div
                                        key={permission.name}
                                        className="flex items-center gap-3 rounded-md border p-3"
                                    >
                                        <Checkbox
                                            id={checkboxId}
                                            checked={isChecked}
                                            onCheckedChange={(checked) =>
                                                handlePermissionChange(
                                                    permission.name,
                                                    checked === true,
                                                )
                                            }
                                            disabled={processing}
                                        />
                                        <Label
                                            htmlFor={checkboxId}
                                            className="cursor-pointer"
                                        >
                                            {permission.name}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>

                        {errors.permissions && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.permissions}
                            </p>
                        )}

                        <div className="flex flex-wrap justify-end gap-3">
                            <Button variant="outline" asChild>
                                <a href="/users">
                                    <ArrowLeft />
                                    Volver
                                </a>
                            </Button>

                            <Button type="submit" disabled={processing}>
                                <Save />
                                {processing
                                    ? 'Guardando...'
                                    : 'Guardar permisos'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
