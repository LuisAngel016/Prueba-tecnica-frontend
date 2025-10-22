import { useQuery } from '@tanstack/react-query';
import { container } from '@/shared/IoC/container';

export const useGetAnalysis = () => {
    const getAnalysisUseCase = container.resolve('getAnalysisUseCase');

    return useQuery({
        queryKey: ['analysis'],
        queryFn: () => getAnalysisUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
