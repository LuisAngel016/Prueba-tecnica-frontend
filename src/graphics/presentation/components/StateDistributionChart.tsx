import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ByState } from "@/graphics/domain/entities/graphics.entity";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect } from "react";

interface StateDistributionChartProps {
    data: ByState[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const StateDistributionChart = ({ data }: StateDistributionChartProps) => {
    const chartData = data.map(item => ({
        name: item.state,
        value: item.count,
    }));

    // Calcular porcentajes
    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
    const labels = chartData.map(({ name, value }, idx) => ({
        name,
        percent: total ? Math.round((value / total) * 100) : 0,
        color: COLORS[idx % COLORS.length],
    }));

    // Detectar mobile solo en render client-side
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Card className={cn("dark:bg-slate-800 dark:text-gray-100")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Distribución por Estado
                </CardTitle>
                <CardDescription>
                    Porcentaje de proyectos según su estado actual
                </CardDescription>
            </CardHeader>
            <CardContent className="relative max-h-[400px] overflow-y-auto">
                {/* Labels arriba de la gráfica solo en mobile */}
                {isMobile && (
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {labels.map(l => (
                            <span key={l.name} className="text-sm font-semibold" style={{ color: l.color }}>
                                {l.name}: {l.percent}%
                            </span>
                        ))}
                    </div>
                )}
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={!isMobile ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
                            outerRadius={isMobile ? 70 : 100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Legend
                            verticalAlign={isMobile ? "top" : "bottom"}
                            height={isMobile ? 60 : 36}
                            iconType="circle"
                            wrapperStyle={{ fontSize: isMobile ? '0.95rem' : '1rem', paddingBottom: isMobile ? 0 : 8 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
