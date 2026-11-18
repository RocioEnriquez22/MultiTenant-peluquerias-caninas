@extends('emails.layout', [
    'headerTitle' => 'Auditoría del Catálogo de Servicios',
    'subTitle' => $data['nombre_comercial'],
])

@section('content')
    <p style="margin-top: 0; margin-bottom: 16px; font-size: 16px; color: #111827;">
        Hola <strong>{{ $data['destinatario_nombre'] }}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px; color: #4b5563;">
        Te informamos que <strong>{{ $data['actor_nombre'] }}</strong> ({{ $data['actor_email'] }}) ha realizado una
        modificación en el catálogo de servicios de tu peluquería:
    </p>

    <!-- Tarjeta con el detalle de la acción -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 22px; border: 1px solid #e2e8f0;">
        <tr>
            <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">
                    Acción realizada</p>
                <p style="margin: 0; font-size: 15px; color: #1e3a8a; font-weight: 700;">{{ $data['accion_titulo'] }}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">
                    Servicio</p>
                <p style="margin: 0; font-size: 15px; color: #0f172a; font-weight: 600;">{{ $data['servicio_nombre'] }}</p>
                @if (!empty($data['servicio_descripcion']))
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">{{ $data['servicio_descripcion'] }}</p>
                @endif
            </td>
        </tr>
        <tr>
            <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">
                    Precio</p>
                <p style="margin: 0; font-size: 14px; color: #0f172a;">
                    <strong>${{ number_format($data['servicio_precio'], 2, ',', '.') }}</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 14px 18px;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">
                    Estado actual y Fecha</p>
                <p style="margin: 0; font-size: 14px; color: #0f172a;">
                    Estado: <strong>{{ $data['servicio_activo'] ? 'Activo' : 'Inactivo' }}</strong> ·
                    {{ $data['fecha_hora'] }}
                </p>
            </td>
        </tr>
    </table>

    <!-- Alerta de control -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
        <tr>
            <td style="padding: 14px 16px;">
                <p style="margin: 0; color: #991b1b; font-size: 13px;">
                    <strong>Control de Administración:</strong> Si no reconoces este cambio o deseas revertirlo, ingresa al
                    panel de Servicios de tu negocio.
                </p>
            </td>
        </tr>
    </table>
@endsection
