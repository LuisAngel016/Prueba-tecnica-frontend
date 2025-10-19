import { ProjectRepositoryImpl } from "../infrastructure/repositories/project.repository.impl";
import { GetAllProjectsUseCase } from "../application/get-all-projects.usecase";
import { GetProjectByIdUseCase } from "../application/get-project-by-id.usecase";
import { CreateProjectUseCase } from "../application/create-project.usecase";
import { UpdateProjectUseCase } from "../application/update-project.usecase";
import { DeleteProjectUseCase } from "../application/delete-project.usecase";
import { httpClient } from "@/shared/api";

/**
 * Contenedor IoC del módulo de Proyectos
 * Usa el httpClient del contenedor compartido
 */


// Repository
const projectRepository = new ProjectRepositoryImpl(httpClient);

// Use Cases
export const projectContainer = {
	getAllProjectsUseCase: new GetAllProjectsUseCase(projectRepository),
	getProjectByIdUseCase: new GetProjectByIdUseCase(projectRepository),
	createProjectUseCase: new CreateProjectUseCase(projectRepository),
	updateProjectUseCase: new UpdateProjectUseCase(projectRepository),
	deleteProjectUseCase: new DeleteProjectUseCase(projectRepository),
};
