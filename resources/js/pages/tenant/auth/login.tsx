import { Form, Head } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Scissors } from "lucide-react";

import { MeshGradient } from "@/components/ui/mesh-gradient";

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

            <MeshGradient
                className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
                colors={["#0ea5e9", "#22d3c5", "#2f5bff", "#7ef0c1"]}
                fallback="radial-gradient(circle at 20% 20%, #7ef0c1 0%, #22d3c5 35%, #0ea5e9 70%, #2f5bff 100%)"
                contrast={1.1}
                detail={1}
                intensity={0.5}
                points={5}
                quality={0.5}
                scale={1.4}
                softness={0.5}
                warp={1.2}
            >
                <div className="w-full max-w-md rounded-3xl border border-white/75 bg-white/75 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/75">
                    <div className="mb-8 flex flex-col items-center gap-3 text-center">
                        {tenant.logo_url ? (
                            <img
                                src={tenant.logo_url}
                                alt={`Logo de ${tenant.nombre}`}
                                className="h-35 w-35 rounded-full border-2 border-white object-cover shadow-md"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Scissors className="h-8 w-8" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="mb-2 text-center text-2xl font-semibold">
                            Iniciar sesión en {tenant.nombre}
                        </h1>

                        <p className="mb-6 text-center text-sm text-muted-foreground">
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
                                            className="bg-white/80 dark:bg-slate-950/60"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Contraseña
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            autoComplete="current-password"
                                            placeholder="Contraseña"
                                            className="bg-white/80 dark:bg-slate-950/60"
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
            </MeshGradient>
        </>
    );
}

TenantLogin.layout = {
    conLogo: false,
};
