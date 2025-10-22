import { container } from "@/shared/IoC";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    const deleteProjectUseCase = container.resolve("deleteProjectUseCase");

    return useMutation({
        mutationFn: (id: string) => deleteProjectUseCase.execute(id),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de proyectos
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
