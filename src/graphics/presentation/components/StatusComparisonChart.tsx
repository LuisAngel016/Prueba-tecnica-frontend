import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import type { ByStatus } from "@/graphics/domain/entities/graphics.entity";
import { cn } from "@/shared/lib/utils";

interface StatusComparisonChartProps {
    data: ByStatus;
}

export const StatusComparisonChart = ({ data }: StatusComparisonChartProps) => {
    const chartData = [
        {
            name: 'Activos',
            cantidad: data.active,
        },
        {
            name: 'Inactivos',
            cantidad: data.inactive,
        }
    ];

    const BAR_COLORS = ['#10b981', '#6b7280'];

    return (
        <Card className={cn("dark:bg-slate-800 dark:text-gray-100")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Proyectos Activos vs Inactivos
                </CardTitle>
                <CardDescription>
                    Comparación del estado de actividad de los proyectos
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="name"
                            stroke="#6b7280"
                            style={{ fontSize: '14px', fontWeight: 500 }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: '14px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                        />
                        <Bar
                            dataKey="cantidad"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={100}
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={BAR_COLORS[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
