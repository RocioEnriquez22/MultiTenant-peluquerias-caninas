import { Form, Head } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    tenant: {
        id: string;
        nombre: string;
    };
};

export default function TenantLogin({ tenant }: Props) {
    return (
        <>
            <Head title={`Ingresar - ${tenant.nombre}`} />

            <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
                <h1 className="mb-2 text-2xl font-semibold">
                    Iniciar sesión en {tenant.nombre}
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    Ingresa con tu cuenta de esta peluquería.
                </p>

                <Form
                    action="/login"
                    method="post"
                    resetOnSuccess={["password"]}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="empleado@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Contraseña"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                data-test="tenant-login-button"
                            >
                                {processing && <Spinner />}
                                Ingresar
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

TenantLogin.layout = {
    title: "Iniciar sesion",
    description: "Ingresa a la cuenta de tu peluquería",
};
