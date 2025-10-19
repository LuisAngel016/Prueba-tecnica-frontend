import { Card, CardContent } from '@/shared/components/ui/card';
import { Sparkles } from 'lucide-react';

export const AnalysisInfoNote = () => (
    <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
        <CardContent className="pt-6">
            <div className="flex gap-3">
                <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">Generado por IA</p>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        Este análisis fue generado automáticamente utilizando inteligencia artificial.
                        Los resultados deben ser revisados y validados por un profesional.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);
