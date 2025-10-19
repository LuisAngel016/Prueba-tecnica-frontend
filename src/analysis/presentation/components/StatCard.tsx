import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    icon?: ReactNode;
    value?: ReactNode;
    description?: ReactNode;
    content?: ReactNode;
    className?: string;
    titleClassName?: string;
    iconClassName?: string;
}

export const StatCard = ({
    title,
    icon,
    value,
    description,
    content,
    className = '',
    titleClassName = '',
    iconClassName = '',
}: StatCardProps) => (
    <Card
        className={
            className ||
            'bg-gradient-to-br from-white/80 to-slate-100/80 dark:from-slate-800/70 dark:to-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-sm'
        }
    >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={`text-sm font-medium ${titleClassName}`}>{title}</CardTitle>
            {icon && <span className={iconClassName}>{icon}</span>}
        </CardHeader>
        <CardContent>
            {value && <div>{value}</div>}
            {description && <p className="text-xs mt-1">{description}</p>}
            {content}
        </CardContent>
    </Card>
);
