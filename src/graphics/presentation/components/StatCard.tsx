import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
    gradient: string;
    iconColor: string;
    textColor: string;
    descriptionColor: string;
}

export const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    gradient,
    iconColor,
    textColor,
    descriptionColor,
}: StatCardProps) => {
    return (
        <Card className={
            gradient ||
            'bg-gradient-to-br from-white/80 to-slate-100/80 dark:from-slate-800/70 dark:to-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-sm'
        }>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className={`text-sm font-medium ${textColor}`}>
                    {title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${iconColor}`} />
            </CardHeader>
            <CardContent>
                <div className={`text-3xl font-bold ${textColor}`}>
                    {value}
                </div>
                <p className={`text-xs ${descriptionColor} mt-1`}>
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};
