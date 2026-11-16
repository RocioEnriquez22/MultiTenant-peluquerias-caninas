//sirve para mantener limpias las vistas y modales del modulo turnos
//centralizar las definiciones de tipos e interfaces de TypeScript de tu módulo de turnos en un único lugar

export type EstadoTurno = "pendiente" | "en_proceso" | "listo" | "cancelado";

export type MetodoPagoTurno =
    | "pendiente"
    | "efectivo"
    | "mercado_pago"
    | "transferencia";

export interface ServicioTurnoItem {
    id: string;
    nombre: string;
    precio_historico: number;
}

export interface TurnoDiarioItem {
    id: string;
    cliente_id: string;
    mascota_id: string;
    fecha: string;
    hora: string;
    estado: EstadoTurno;
    finalizado_at: string | null;
    metodo_pago: MetodoPagoTurno;
    monto_cobrado: number;
    total_estimado: number;
    notas_turno: string | null;
    cliente: {
        id: string;
        nombre: string;
        apellido: string | null;
        telefono: string;
    };
    mascota: {
        id: string;
        nombre: string;
        especie_raza: string | null;
        dimension: string | null;
        observaciones: string | null;
    };
    realizado_por: {
        id: string;
        nombre: string;
        apellido: string | null;
    } | null;
    servicios: ServicioTurnoItem[];
}

export interface TurnoCalendarioItem {
    id: string;
    fecha: string;
    hora: string;
    estado: EstadoTurno;
    mascota_nombre: string;
    mascota_raza: string | null;
    cliente_nombre: string;
    servicios_nombres: string[];
}

export interface ClienteCatalogoItem {
    id: string;
    nombre: string;
    apellido: string | null;
    telefono: string;
    mascotas: {
        id: string;
        nombre: string;
        especie_raza: string | null;
        dimension: string | null;
    }[];
}

export interface ServicioCatalogoItem {
    id: string;
    nombre: string;
    precio: number;
}
