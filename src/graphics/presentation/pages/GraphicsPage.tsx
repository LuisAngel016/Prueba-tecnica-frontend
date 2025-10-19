import { useGetGraphics } from "@/graphics/infrastructure/hooks";
import { BarChart3, TrendingUp, Activity } from "lucide-react";
import {
    StatCard,
    StateDistributionChart,
    StatusComparisonChart,
    GraphicsLoadingSkeleton,
    GraphicsErrorState,
} from "../components";

export const GraphicsPage = () => {
    const { data: graphics, isLoading, error } = useGetGraphics();

    if (isLoading) {
        return <GraphicsLoadingSkeleton />;
    }

    if (error) {
        return <GraphicsErrorState />;
    }

    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animate-duration-[800ms] animate-delay-100">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-gray-100">
                        Estadísticas
                    </h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">
                        Visualización de datos y métricas de proyectos
                    </p>
                </div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total de Proyectos"
                    value={graphics?.total || 0}
                    description="Proyectos registrados"
                    icon={BarChart3}
                    gradient="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
                    iconColor="text-blue-600 dark:text-blue-400"
                    textColor="text-blue-900 dark:text-blue-100"
                    descriptionColor="text-blue-700 dark:text-blue-300"
                />

                <StatCard
                    title="Proyectos Activos"
                    value={graphics?.byStatus.active || 0}
                    description="En operación"
                    icon={TrendingUp}
                    gradient="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800"
                    iconColor="text-green-600 dark:text-green-400"
                    textColor="text-green-900 dark:text-green-100"
                    descriptionColor="text-green-700 dark:text-green-300"
                />

                <StatCard
                    title="Proyectos Inactivos"
                    value={graphics?.byStatus.inactive || 0}
                    description="Pausados o completados"
                    icon={Activity}
                    gradient="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border-gray-200 dark:border-gray-800"
                    iconColor="text-gray-600 dark:text-gray-400"
                    textColor="text-gray-900 dark:text-gray-100"
                    descriptionColor="text-gray-700 dark:text-gray-300"
                />
            </div>

            {/* Gráficos con Recharts */}
            <div className="grid gap-4 md:grid-cols-2">
                <StateDistributionChart data={graphics?.byState || []} />
                <StatusComparisonChart data={graphics?.byStatus || { active: 0, inactive: 0 }} />
            </div>
        </div>
    );
};