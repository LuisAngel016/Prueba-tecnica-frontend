import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FileText } from 'lucide-react';

interface Props {
    summary?: string;
}

const formatSummary = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
        if (line.trim().startsWith('###')) {
            return (
                <h3 key={index} className="text-xl font-bold text-foreground dark:text-gray-100 mt-6 mb-3">
                    {line.replace(/^###\s*\*?\*?/, '').replace(/\*?\*?$/, '')}
                </h3>
            );
        }
        if (line.trim().startsWith('##')) {
            return (
                <h2 key={index} className="text-2xl font-bold text-foreground dark:text-gray-100 mt-8 mb-4">
                    {line.replace(/^##\s*\*?\*?/, '').replace(/\*?\*?$/, '')}
                </h2>
            );
        }
        if (line.trim().match(/^[*-]\s+\*?\*?/)) {
            return (
                <li key={index} className="ml-4 text-muted-foreground dark:text-gray-300 leading-relaxed">
                    {line.replace(/^[*-]\s+\*?\*?/, '').replace(/\*?\*?:?$/, '')}
                </li>
            );
        }
        if (line.trim().match(/^\d+\.\s+/)) {
            return (
                <li key={index} className="ml-4 text-muted-foreground dark:text-gray-300 leading-relaxed list-decimal">
                    {line.replace(/^\d+\.\s+\*?\*?/, '').replace(/\*?\*?:?$/, '')}
                </li>
            );
        }
        if (line.trim() === '' || line.trim() === '---') {
            return <div key={index} className="h-2" />;
        }
        return (
            <p key={index} className="text-muted-foreground dark:text-gray-300 leading-relaxed mb-2">
                {line}
            </p>
        );
    });
};

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
