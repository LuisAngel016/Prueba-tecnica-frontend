import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../../domain/entities/project.entity";
import { container } from "@/shared/IoC";

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const createProjectUseCase = container.resolve("createProjectUseCase");

    return useMutation({
        mutationFn: (projectData: Omit<Project, "id">) =>
            createProjectUseCase.execute(projectData),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de proyectos
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
