import { Form, Head } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Scissors } from "lucide-react";

type Props = {
    tenant: {
        id: string;
        nombre: string;
        logo_url: string | null;
    };
};

export default function TenantLogin({ tenant }: Props) {
    return (
        <>
            <Head title={`Ingresar - ${tenant.nombre}`} />
            <div className="w-full h-full flex flex-col ">
                <div className="flex flex-col items-center gap-3 text-center mb-10 ">
                    {tenant.logo_url ? (
                        <img
                            src={tenant.logo_url}
                            alt={`Logo de ${tenant.nombre}`}
                            className="h-35 w-35 rounded-full border object-cover shadow-sm"
                        />
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Scissors className="h-7 w-7" />
                        </div>
                    )}
                </div>

                <div className=" flex  max-w-md flex-col justify-center">
                    <h1 className="mb-2 text-2xl font-semibold text-center">
                        Iniciar sesión en {tenant.nombre}
                    </h1>

                    <p className="mb-6 text-sm text-gray-600 text-center">
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
            </div>
        </>
    );
}

TenantLogin.layout = {
    conLogo: false,
};
