import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FileText } from 'lucide-react';
import { formatSummary } from './summaryFormatter';

interface Props {
    summary?: string;
}

export const AnalysisSummaryCard = ({ summary }: Props) => (
    <Card className="shadow-lg bg-gradient-to-br from-white/80 to-slate-100/80 dark:from-slate-800/70 dark:to-slate-900/70 border border-slate-200 dark:border-slate-700">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b">
            <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                Resumen Ejecutivo
            </CardTitle>
            <CardDescription>
                Análisis generado automáticamente a partir de las descripciones de proyectos
            </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
            <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                <div className="space-y-1 text-base">
                    {summary ? (
                        formatSummary(summary)
                    ) : (
                        <p className="text-muted-foreground">No hay análisis disponible</p>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
);
