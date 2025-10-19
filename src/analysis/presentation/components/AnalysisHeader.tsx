import { Brain } from 'lucide-react';

export const AnalysisHeader = () => (
    <div className="flex flex-col gap-3">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-gray-100 flex items-center gap-2">
                <Brain className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                Análisis con IA
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 mt-1">
                Resumen ejecutivo generado por inteligencia artificial
            </p>
        </div>
    </div>
);
