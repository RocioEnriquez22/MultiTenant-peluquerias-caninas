import { Head, Link } from "@inertiajs/react";
import {
    ArrowUpRight,
    CalendarCheck,
    CheckCircle2,
    DollarSign,
    PawPrint,
    Plus,
    Users,
} from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

interface Props {
    tenant: TenantInfo;
    metrics?: DashboardMetrics;
    serviciosSolicitados?: ServicioChartItem[];
    ingresosPorMetodo?: MetodoPagoChartItem[];
    rendimientoEquipo?: EquipoItem[];
    ultimosTurnos?: UltimoTurnoItem[];
}

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#64748b"];

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
    ingresosPorMetodo = [],
    rendimientoEquipo = [],
    ultimosTurnos = [],
}: Props) {
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

                {/* Fila 1: 4 Tarjetas KPI */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Ingresos del Mes
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatARS(metrics.ingresos_mes)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Hoy: {formatARS(metrics.ingresos_hoy)} cobrados
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Turnos del Mes
                            </CardTitle>
                            <CalendarCheck className="h-4 w-4 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {metrics.turnos_mes}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.turnos_hoy} agendados para hoy
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
                        <CardContent>
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
                        <CardContent>
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

                {/* Fila 2: Gráficos Recharts (Barras + Dona) */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Gráfico de Barras: Servicios más solicitados */}
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Servicios Más Solicitados</CardTitle>
                            <CardDescription>
                                Cantidad histórica de turnos por servicio
                                (Relación N:M)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {serviciosSolicitados.length === 0 ? (
                                <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                    Aún no hay servicios asociados a turnos.
                                </div>
                            ) : (
                                <div className="h-72 w-full">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={serviciosSolicitados}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: -15,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                className="stroke-muted"
                                            />
                                            <XAxis
                                                dataKey="name"
                                                fontSize={12}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                fontSize={12}
                                                allowDecimals={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                formatter={(value) => [
                                                    `${value} turnos`,
                                                    "Solicitudes",
                                                ]}
                                            />
                                            <Bar
                                                dataKey="cantidad"
                                                fill="#6366f1"
                                                radius={[4, 4, 0, 0]}
                                                name="Turnos"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Gráfico de Dona: Ingresos por Medio de Pago */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Ingresos por Medio de Pago</CardTitle>
                            <CardDescription>
                                Distribución de cobros realizados este mes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {ingresosPorMetodo.length === 0 ? (
                                <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                    Sin cobros registrados en el mes actual.
                                </div>
                            ) : (
                                <div className="h-72 w-full">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={ingresosPorMetodo}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={55}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {ingresosPorMetodo.map(
                                                    (_, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                PIE_COLORS[
                                                                    index %
                                                                        PIE_COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value) =>
                                                    formatARS(Number(value))
                                                }
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                iconType="circle"
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Fila 3: Tablas Relacionales */}
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
                                        <TableHead className="text-right">
                                            Facturado
                                        </TableHead>
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
                                                <TableCell className="text-right font-medium tabular-nums">
                                                    {formatARS(
                                                        emp.total_facturado,
                                                    )}
                                                </TableCell>
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
        </>
    );
}
