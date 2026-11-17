import { Head, Link } from "@inertiajs/react";
import { useState, useMemo } from "react";
import {
    ArrowUpRight,
    CalendarCheck,
    CheckCircle2,
    DollarSign,
    PawPrint,
    Plus,
    Users,
    TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { useKanbanPermissions } from "@/hooks/use-kanban-permitions";
import { ScrollToBottomButton } from "@/components/ui/button-scroll";

interface TenantInfo {
    id: string;
    nombre: string;
    dueño: string;
}

interface DashboardMetrics {
    ingresos_mes: number;
    ingresos_hoy: number;
    turnos_mes: number;
    turnos_hoy: number;
    clientes_activos: number;
    mascotas_activas: number;
    tasa_asistencia: number;
    turnos_listos_mes: number;
}

interface ServicioChartItem {
    name: string;
    cantidad: number;
    precio: number;
}

interface MetodoPagoChartItem {
    name: string;
    value: number;
}

interface EquipoItem {
    id: string;
    nombre: string;
    turnos_count: number;
    total_facturado: number;
}

interface UltimoTurnoItem {
    id: string;
    fecha: string;
    hora: string;
    mascota: string;
    cliente: string;
    servicios: string[];
    empleado: string;
    metodo_pago: string;
    monto_cobrado: number;
}
type PeriodoPago = "semana" | "mes" | "año";

interface IngresosPorMetodoMap {
    semana: MetodoPagoChartItem[];
    mes: MetodoPagoChartItem[];
    año: MetodoPagoChartItem[];
}

interface Props {
    tenant: TenantInfo;
    metrics?: DashboardMetrics;
    serviciosSolicitados?: ServicioChartItem[];
    ingresosPorMetodo?: IngresosPorMetodoMap;
    rendimientoEquipo?: EquipoItem[];
    ultimosTurnos?: UltimoTurnoItem[];
}

const PIE_COLORS = ["#10ad79a8", "#6a6cefa2", "#f5ab2da3", "#64748ba2"];

const formatARS = (valor: number) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(valor);

export default function TenantDashboard({
    tenant,
    metrics = {
        ingresos_mes: 0,
        ingresos_hoy: 0,
        turnos_mes: 0,
        turnos_hoy: 0,
        clientes_activos: 0,
        mascotas_activas: 0,
        tasa_asistencia: 100,
        turnos_listos_mes: 0,
    },
    serviciosSolicitados = [],
    ingresosPorMetodo = { semana: [], mes: [], año: [] },
    rendimientoEquipo = [],
    ultimosTurnos = [],
}: Props) {
    const [periodoPago, setPeriodoPago] = useState<PeriodoPago>("mes");
    const datosPagoActuales = ingresosPorMetodo[periodoPago] ?? [];
    const { isOwner } = useKanbanPermissions();
    const [periodoTurnos, setPeriodoTurnos] = useState<"hoy" | "mes">("mes");

    const subtituloPeriodo: Record<PeriodoPago, string> = {
        semana: "Distribución de cobros realizados esta semana",
        mes: "Distribución de cobros realizados este mes",
        año: "Distribución de cobros realizados este año",
    };

    const { pieChartData, pieChartConfig, totalCobradoPeriodo } =
        useMemo(() => {
            const config: ChartConfig = {
                value: {
                    label: "Ingresos",
                },
            };

            let total = 0;

            const data = datosPagoActuales.map((item, index) => {
                const color = PIE_COLORS[index % PIE_COLORS.length];
                config[item.name] = {
                    label: item.name,
                    color,
                };

                total += Number(item.value || 0);

                return {
                    name: item.name,
                    value: Number(item.value || 0),
                    fill: color,
                };
            });

            return {
                pieChartData: data,
                pieChartConfig: config,
                totalCobradoPeriodo: total,
            };
        }, [datosPagoActuales]);
    const serviciosChartConfig = {
        cantidad: {
            label: "Turnos",
            color: "#f59f0bb8",
        },
    } satisfies ChartConfig;

    return (
        <>
            <Head title={`Dashboard - ${tenant.nombre}`} />
            <div className="flex-1 space-y-6 p-6 md:p-8">
                {/* Encabezado */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                            {tenant.nombre}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Resumen operativo, ingresos y actividad del mes en
                            curso.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/turnos/calendario">
                                Ver Calendario
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/turnos">
                                <Plus className="mr-1.5 h-4 w-4" />
                                Agenda del Día
                            </Link>
                        </Button>
                    </div>
                </div>

                {/*4 Tarjetas con info general */}
                <div
                    className={
                        isOwner
                            ? "grid  gap-4 grid-cols-2 lg:grid-cols-4"
                            : "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    }
                >
                    {isOwner && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Ingresos del Mes
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="text-2xl font-bold">
                                    {formatARS(metrics.ingresos_mes)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Hoy: {formatARS(metrics.ingresos_hoy)}{" "}
                                    cobrados
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex flex-row justify-end text-sm font-medium ">
                                {periodoTurnos === "hoy"
                                    ? "Turnos de Hoy"
                                    : "Turnos del Mes"}
                                <CalendarCheck className="h-4 w-4 text-indigo-600 inline ml-3" />
                            </CardTitle>
                            <div className="relative top-0 rigth-0 inline-flex items-center rounded-md border bg-muted/50 p-0.5">
                                <button
                                    type="button"
                                    onClick={() => setPeriodoTurnos("hoy")}
                                    className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                                        periodoTurnos === "hoy"
                                            ? "bg-background text-foreground shadow-xs"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    Hoy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPeriodoTurnos("mes")}
                                    className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                                        periodoTurnos === "mes"
                                            ? "bg-background text-foreground shadow-xs"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    Mes
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">
                                {periodoTurnos === "hoy"
                                    ? metrics.turnos_hoy
                                    : metrics.turnos_mes}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {periodoTurnos === "hoy"
                                    ? `${metrics.turnos_mes} agendados en todo el mes`
                                    : `${metrics.turnos_hoy} agendados para hoy`}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Clientes y Mascotas
                            </CardTitle>
                            <PawPrint className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">
                                {metrics.clientes_activos} clientes
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.mascotas_activas} mascotas activas
                                registradas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tasa de Cumplimiento
                            </CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-sky-600" />
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">
                                {metrics.tasa_asistencia}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.turnos_listos_mes} turnos finalizados
                                este mes
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/*Graficos Recharts (Barras + Dona) */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Grafico de Barras: Servicios más solicitados */}
                    <Card
                        className={isOwner ? "lg:col-span-4" : "lg:col-span-7"}
                    >
                        <CardHeader>
                            <CardTitle>Servicios Más Solicitados</CardTitle>
                            <CardDescription>
                                Cantidad histórica de turnos por servicio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {serviciosSolicitados.length === 0 ? (
                                <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                    Aún no hay servicios asociados a turnos.
                                </div>
                            ) : (
                                <ChartContainer
                                    config={serviciosChartConfig}
                                    className="max-h-72 w-full"
                                >
                                    <BarChart
                                        accessibilityLayer
                                        data={serviciosSolicitados}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value: string) =>
                                                value.length > 14
                                                    ? `${value.slice(0, 14)}…`
                                                    : value
                                            }
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={
                                                <ChartTooltipContent
                                                    hideLabel
                                                />
                                            }
                                        />
                                        <Bar
                                            dataKey="cantidad"
                                            fill="var(--color-cantidad)"
                                            radius={8}
                                            barSize={50}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                        {serviciosSolicitados.length > 0 && (
                            <CardFooter className="flex-col items-center gap-2 text-sm">
                                <div className="flex gap-2 leading-none font-medium">
                                    Servicio líder:{" "}
                                    {serviciosSolicitados[0].name} (
                                    {serviciosSolicitados[0].cantidad} turnos){" "}
                                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Mostrando los {serviciosSolicitados.length}{" "}
                                    servicios más solicitados
                                </div>
                            </CardFooter>
                        )}
                    </Card>

                    {/* Grafico piechart: Ingresos por Medio de Pago (sacado de shadcn) */}
                    {isOwner && (
                        <Card className="lg:col-span-3">
                            <CardHeader className="flex flex-col gap-3 pb-0 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <CardTitle className="mb-2">
                                        Ingresos segun metodos de pagos
                                    </CardTitle>
                                    <CardDescription>
                                        {subtituloPeriodo[periodoPago]}
                                    </CardDescription>
                                </div>

                                {/* Botones Semana / Mes / Año */}
                                <div className="inline-flex items-center self-start rounded-lg border bg-muted/50 p-0.5">
                                    {(
                                        [
                                            { key: "semana", label: "Semana" },
                                            { key: "mes", label: "Mes" },
                                            { key: "año", label: "Año" },
                                        ] as const
                                    ).map((opcion) => (
                                        <Button
                                            key={opcion.key}
                                            type="button"
                                            size="sm"
                                            variant={
                                                periodoPago === opcion.key
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            onClick={() =>
                                                setPeriodoPago(opcion.key)
                                            }
                                            className="h-7 px-2.5 text-xs font-medium"
                                        >
                                            {opcion.label}
                                        </Button>
                                    ))}
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 pb-0">
                                {pieChartData.length === 0 ? (
                                    <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
                                        Sin cobros registrados en el período
                                        seleccionado.
                                    </div>
                                ) : (
                                    <ChartContainer
                                        config={pieChartConfig}
                                        className="mx-auto w-full aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                                    >
                                        <PieChart>
                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                        hideLabel
                                                        formatter={(
                                                            value,
                                                            name,
                                                        ) => (
                                                            <div className="flex w-full items-center justify-between gap-4">
                                                                <span className="text-muted-foreground">
                                                                    {String(
                                                                        name,
                                                                    )}
                                                                </span>
                                                                <span className="font-mono font-semibold tabular-nums">
                                                                    {formatARS(
                                                                        Number(
                                                                            value,
                                                                        ),
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                    />
                                                }
                                            />
                                            <Pie
                                                data={pieChartData}
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name }) => name}
                                                outerRadius={70}
                                            />
                                        </PieChart>
                                    </ChartContainer>
                                )}
                            </CardContent>

                            <CardFooter className="flex-col gap-2 text-sm pt-2">
                                <div className="flex items-center gap-2 leading-none font-medium">
                                    Total cobrado:{" "}
                                    {formatARS(totalCobradoPeriodo)}{" "}
                                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Desglose por medio de cobro en{" "}
                                    {periodoPago === "semana"
                                        ? "la semana actual"
                                        : periodoPago === "mes"
                                          ? "el mes actual"
                                          : "el año en curso"}
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </div>

                {/* Tablas Relacionales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Tabla Equipo */}
                    <Card className="lg:col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    Atenciones por Equipo
                                </CardTitle>
                                <CardDescription>
                                    Turnos finalizados en el mes por usuario
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Profesional</TableHead>
                                        <TableHead className="text-center">
                                            Turnos
                                        </TableHead>
                                        {isOwner && (
                                            <TableHead className="text-right">
                                                Facturado
                                            </TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rendimientoEquipo.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="text-center text-sm text-muted-foreground"
                                            >
                                                Sin datos de equipo este mes.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        rendimientoEquipo.map((emp) => (
                                            <TableRow key={emp.id}>
                                                <TableCell className="font-medium">
                                                    {emp.nombre}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary">
                                                        {emp.turnos_count}
                                                    </Badge>
                                                </TableCell>
                                                {isOwner && (
                                                    <TableCell className="text-right font-medium tabular-nums">
                                                        {formatARS(
                                                            emp.total_facturado,
                                                        )}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Tabla Últimos Turnos Finalizados */}
                    <Card className="lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>
                                    Últimos Turnos Finalizados
                                </CardTitle>
                                <CardDescription>
                                    Detalle de servicios aplicados y cobros
                                    recientes
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link
                                    href="/turnos"
                                    className="flex items-center gap-1"
                                >
                                    Ir al tablero{" "}
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mascota / Cliente</TableHead>
                                        <TableHead>Servicios</TableHead>
                                        <TableHead>Atendió</TableHead>
                                        <TableHead className="text-right">
                                            Cobrado
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ultimosTurnos.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center text-sm text-muted-foreground"
                                            >
                                                Todavía no hay turnos
                                                finalizados.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        ultimosTurnos.map((turno) => (
                                            <TableRow key={turno.id}>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {turno.mascota}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {turno.cliente} ·{" "}
                                                        {turno.fecha}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {turno.servicios.map(
                                                            (srv, idx) => (
                                                                <Badge
                                                                    key={idx}
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {srv}
                                                                </Badge>
                                                            ),
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {turno.empleado}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="font-semibold tabular-nums">
                                                        {formatARS(
                                                            turno.monto_cobrado,
                                                        )}
                                                    </div>
                                                    <div className="text-[11px] text-muted-foreground">
                                                        {turno.metodo_pago}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ScrollToBottomButton />
        </>
    );
}
