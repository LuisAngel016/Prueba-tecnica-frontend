import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../../domain/entities/project.entity";
import { container } from "@/shared/IoC";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const updateProjectUseCase = container.resolve("updateProjectUseCase");

  return useMutation({
    mutationFn: ({
      id,
      projectData,
    }: {
      id: string;
      projectData: Partial<Omit<Project, "id">>;
    }) => updateProjectUseCase.execute(id, projectData),
    onSuccess: (_, variables) => {
      // Invalida el cache del proyecto específico y la lista
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
