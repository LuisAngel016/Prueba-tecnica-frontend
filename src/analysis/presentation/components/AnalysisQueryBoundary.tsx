import type { PropsWithChildren, ReactNode } from 'react';

interface AnalysisQueryBoundaryProps {
    isLoading: boolean;
    error: unknown;
    loadingFallback: ReactNode;
    errorFallback: ReactNode;
}

export const AnalysisQueryBoundary = ({
    isLoading,
    error,
    loadingFallback,
    errorFallback,
    children,
}: PropsWithChildren<AnalysisQueryBoundaryProps>) => {
    if (isLoading) return <>{loadingFallback}</>;
    if (error) return <>{errorFallback}</>;
    return <>{children}</>;
};
