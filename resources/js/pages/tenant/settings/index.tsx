import { Head, router, useForm } from "@inertiajs/react";
import { ImagePlus, Scissors, Trash2 } from "lucide-react";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TenantSettingsLayout from "@/layouts/settings/tenants/settings-layout";
import { useEffect } from "react";
interface Props {
    negocio: {
        id: string;
        nombre_comercial: string;
        logo_url: string | null;
    };
}

export default function BusinessSettingsIndex({ negocio }: Props) {
    useEffect(() => {
        console.log("Datos de negocio:", negocio);
        console.log("logo_url:", negocio.logo_url);
        console.log("nombre_file:", imagenMostrada);
    }, [negocio]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { setData, data, post, processing, errors, reset } = useForm<{
        logo: File | null;
    }>({
        logo: null,
    });

    const imagenMostrada = previewUrl ?? negocio.logo_url;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData("logo", file);

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post("/settings/negocio/logo", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset("logo");
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                }
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            },
        });
    };

    const handleEliminarLogo = () => {
        const confirmado = window.confirm(
            "¿Seguro que deseas eliminar el logo actual y volver al ícono por defecto?",
        );

        if (!confirmado) {
            return;
        }

        router.delete("/settings/negocio/logo", {
            preserveScroll: true,
            onSuccess: () => {
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                }
            },
        });
    };

    return (
        <TenantSettingsLayout>
            <Head title="Configuración del negocio" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Logo de la empresa"
                    description={`Personaliza el logo de ${negocio.nombre_comercial} que se muestra en el inicio de sesión.`}
                />

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    {imagenMostrada ? (
                        <img
                            src={imagenMostrada}
                            alt={`Logo de ${negocio.nombre_comercial}`}
                            className="h-30 w-30 rounded-full border object-cover shadow-sm"
                        />
                    ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                            <Scissors className="h-9 w-9" />
                        </div>
                    )}

                    <div className="space-y-1 text-center sm:text-left">
                        <p className="text-sm font-medium">
                            {previewUrl
                                ? "Vista previa del nuevo logo (sin guardar)"
                                : negocio.logo_url
                                  ? "Logo activo actualmente"
                                  : "Sin logo personalizado"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            JPG, JPEG, PNG o WEBP. Máximo 2 MB.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="logo">Seleccionar imagen</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                ref={fileInputRef}
                                id="logo"
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex h-9 flex-1 items-center rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground truncate">
                                {negocio.logo_url
                                    ? "Hay un archivo subido"
                                    : "Seleccione un archivo"}
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {negocio.logo_url
                                    ? "Cambiar archivo"
                                    : "Elegir archivo"}
                            </Button>
                        </div>
                        <InputError message={errors.logo} />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            type="submit"
                            disabled={processing || !previewUrl}
                        >
                            <ImagePlus className="mr-2 size-4" />
                            {negocio.logo_url
                                ? "Reemplazar logo"
                                : "Guardar logo"}
                        </Button>

                        {negocio.logo_url && (
                            <Button
                                type="button"
                                variant="destructive"
                                disabled={processing}
                                onClick={handleEliminarLogo}
                            >
                                <Trash2 className="mr-2 size-4" />
                                Eliminar logo
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </TenantSettingsLayout>
    );
}
