import { projectContainer } from "@/projects/IoC/project.container";
import type { GetAllProjectsUseCase } from "@/projects/application/get-all-projects.usecase";
import type { GetProjectByIdUseCase } from "@/projects/application/get-project-by-id.usecase";
import type { CreateProjectUseCase } from "@/projects/application/create-project.usecase";
import type { UpdateProjectUseCase } from "@/projects/application/update-project.usecase";
import type { DeleteProjectUseCase } from "@/projects/application/delete-project.usecase";
import { graphicsContainer } from "@/graphics/IoC/graphics.container";
import type { GetGraphicsUseCase } from "@/graphics/application/get-graphics.usecase";
import { analysisContainer } from "@/analysis/IoC/analysis.container";
import type { GetAnalysisUseCase } from "@/analysis/application/get-analysis.usecase";

export interface AppDependencies {
  getAllProjectsUseCase: GetAllProjectsUseCase;
  getProjectByIdUseCase: GetProjectByIdUseCase;
  createProjectUseCase: CreateProjectUseCase;
  updateProjectUseCase: UpdateProjectUseCase;
  deleteProjectUseCase: DeleteProjectUseCase;
  getGraphicsUseCase: GetGraphicsUseCase;
  getAnalysisUseCase: GetAnalysisUseCase;
}

const dependencies: AppDependencies = {
  ...projectContainer,
  ...graphicsContainer,
  ...analysisContainer,
};

type DependencyMap = typeof dependencies;
type DependencyKey = keyof DependencyMap;

export const container = {
  resolve<K extends DependencyKey>(name: K): DependencyMap[K] {
    const dep = dependencies[name];
    if (!dep) throw new Error(`Dependency ${String(name)} not found`);
    return dep;
  },
};
