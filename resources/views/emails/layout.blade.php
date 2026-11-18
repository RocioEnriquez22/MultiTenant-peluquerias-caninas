<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación del Sistema</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; width: 100% !important;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        style="background-color: #f4f6f9; padding: 32px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                    style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
                    <!-- Encabezado -->
                    <tr>
                        <td style="background-color: #1e3a8a; padding: 22px 24px; text-align: center;">
                            <h2
                                style="margin: 0; color: #ffffff; font-size: 19px; font-weight: 600; letter-spacing: 0.4px;">
                                {{ $headerTitle ?? 'Notificación de Auditoría' }}
                            </h2>
                            @isset($subTitle)
                                <p style="margin: 4px 0 0 0; color: #dbeafe; font-size: 13px;">
                                    {{ $subTitle }}
                                </p>
                            @endisset
                        </td>
                    </tr>

                    <!-- Contenido Dinámico -->
                    <tr>
                        <td style="padding: 28px 32px; color: #374151; font-size: 15px; line-height: 1.6;">
                            @yield('content')
                        </td>
                    </tr>

                    <!-- Pie de página -->
                    <tr>
                        <td
                            style="background-color: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px;">
                            Este es un correo automático de auditoría generado por el sistema. Por favor no respondas a
                            este mensaje.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
