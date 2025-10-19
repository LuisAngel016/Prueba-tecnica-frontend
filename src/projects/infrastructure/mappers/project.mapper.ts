import type { ProjectPage } from "@/projects/domain/interfaces/appointment-page.interface";
import { Project } from "../../domain/entities/project.entity";
import type { ProjectAPIResponse } from "../dto/response/project-api.response";
import type { ProjectsAPIResponse } from "../dto/response/projects-api.response";

export class ProjectMapper {
  static toDomain(projects: ProjectsAPIResponse): ProjectPage {
    const data: Project[] = projects.results.map(result => ({
      id: result.id,
      name: result.name,
      description: result.description,
      state: result.state,
      active: result.active,
      startDate: result.startDate,
      endDate: result.endDate,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
    
    return {
      data,
      total: projects.total,
    };
  }
  
  static toDomainSingle(result: ProjectAPIResponse): Project {
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      state: result.state,
      active: result.active,
      startDate: result.startDate,
      endDate: result.endDate,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
