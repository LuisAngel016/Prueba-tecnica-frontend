import { useGetAnalysis } from "@/analysis/infrastructure/hooks";
import { AnalysisLoadingSkeleton } from "../components";
import {
    AnalysisQueryBoundary,
    AnalysisHeader,
    AnalysisStatCards,
    AnalysisSummaryCard,
    AnalysisInfoNote
} from "../components";

export const AnalysisPage = () => {
    const { data: analysis, isLoading, error } = useGetAnalysis();

    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animate-duration-[800ms] animate-delay-100">
            <AnalysisQueryBoundary
                isLoading={isLoading}
                error={error}
                loadingFallback={<AnalysisLoadingSkeleton />}
                errorFallback={<div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                    <div className="text-center text-red-600 dark:text-red-400">Error al cargar análisis</div>
                </div>}
            >
                <AnalysisHeader />
                <AnalysisStatCards
                    projectCount={analysis?.projectCount ?? 0}
                    model={analysis?.model ?? ''}
                    method={analysis?.method ?? ''}
                />
                <AnalysisSummaryCard summary={analysis?.summary} />
                <AnalysisInfoNote />
            </AnalysisQueryBoundary>
        </div>
    );
};
