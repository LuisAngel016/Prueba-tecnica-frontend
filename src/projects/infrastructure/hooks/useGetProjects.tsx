
import { useQuery } from "@tanstack/react-query";

import { container } from "@/shared/ioc/container";
import type { ProjectPage } from "@/projects/domain/interfaces/appointment-page.interface";

export const useGetProjects = () => {
    const getAllProjectsUseCase = container.resolve("getAllProjectsUseCase");
    return useQuery<ProjectPage>({
        queryKey: ["projects"],
        queryFn: () => getAllProjectsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};