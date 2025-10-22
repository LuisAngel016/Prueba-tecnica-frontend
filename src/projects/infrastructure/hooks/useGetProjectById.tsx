import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC";

export const useGetProjectById = (id: string) => {
    const getProjectByIdUseCase = container.resolve("getProjectByIdUseCase");

    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectByIdUseCase.execute(id),
        enabled: !!id, // Solo ejecuta si hay un ID válido
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
