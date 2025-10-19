import { Badge } from '@/shared/components/ui/badge';
import { FileText, BarChart, Sparkles } from 'lucide-react';
import { StatCard } from './StatCard';

interface Props {
    projectCount: number;
    model: string;
    method: string;
}

export const AnalysisStatCards = ({ projectCount, model, method }: Props) => (
    <div className="grid gap-4 md:grid-cols-3">
        <StatCard
            title="Proyectos Analizados"
            icon={<FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
            value={<span className="text-3xl font-bold text-purple-900 dark:text-purple-100">{projectCount}</span>}
            description={<span className="text-purple-700 dark:text-purple-300">Total de proyectos</span>}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800"
            titleClassName="text-purple-900 dark:text-purple-100"
        />
        <StatCard
            title="Modelo de IA"
            icon={<Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
            value={<span className="text-xl font-bold text-indigo-900 dark:text-indigo-100 truncate">{model || 'N/A'}</span>}
            description={<span className="text-indigo-700 dark:text-indigo-300">{method || 'N/A'}</span>}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800"
            titleClassName="text-indigo-900 dark:text-indigo-100"
        />
        <StatCard
            title="Tipo de Análisis"
            icon={<BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            content={
                <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary" className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100">
                        Resumen Ejecutivo
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100">
                        IA Generativa
                    </Badge>
                </div>
            }
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
            titleClassName="text-blue-900 dark:text-blue-100"
        />
    </div>
);
