import { useQuery } from '@tanstack/react-query';
import { container } from '@/shared/ioc/container';

export const useGetGraphics = () => {
    const getGraphicsUseCase = container.resolve('getGraphicsUseCase');

    return useQuery({
        queryKey: ['graphics'],
        queryFn: () => getGraphicsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
