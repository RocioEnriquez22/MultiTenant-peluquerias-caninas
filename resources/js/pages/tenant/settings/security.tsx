import { Head, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TenantSettingsLayout from "@/layouts/settings/tenants/settings-layout";

export default function TenantSecuritySettings() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put("/settings/password", {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <TenantSettingsLayout>
            <Head title="Seguridad y contraseña" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Actualizar contraseña"
                    description="Asegúrate de usar una contraseña larga y segura para proteger tu cuenta"
                />

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">
                            Contraseña actual
                        </Label>
                        <Input
                            id="current_password"
                            type="password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.current_password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Nueva contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirmar contraseña
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Actualizar contraseña
                    </Button>
                </form>
            </div>
        </TenantSettingsLayout>
    );
}
