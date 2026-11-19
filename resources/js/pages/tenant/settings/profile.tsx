import { Head, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TenantSettingsLayout from "@/layouts/settings/tenants/settings-layout";

interface Props {
    perfil: {
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
    };
}

export default function TenantProfileSettings({ perfil }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        nombre: perfil.nombre,
        apellido: perfil.apellido,
        telefono: perfil.telefono,
        email: perfil.email,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch("/settings/profile", { preserveScroll: true });
    };

    return (
        <TenantSettingsLayout>
            <Head title="Configuración de perfil" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Información de perfil"
                    description="Actualiza tus datos personales y correo electrónico"
                />

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                value={data.nombre}
                                onChange={(e) =>
                                    setData("nombre", e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.nombre} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input
                                id="apellido"
                                value={data.apellido}
                                onChange={(e) =>
                                    setData("apellido", e.target.value)
                                }
                            />
                            <InputError message={errors.apellido} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                            id="telefono"
                            value={data.telefono}
                            onChange={(e) =>
                                setData("telefono", e.target.value)
                            }
                        />
                        <InputError message={errors.telefono} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Guardar cambios
                    </Button>
                </form>
            </div>
        </TenantSettingsLayout>
    );
}
