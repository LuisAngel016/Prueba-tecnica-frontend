import type { IProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "../../domain/entities/project.entity";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";
import { ProjectMapper } from "../mappers/project.mapper";
import type { ProjectPage } from "@/projects/domain/interfaces/appointment-page.interface";
import type { ProjectsAPIResponse } from "../dto/response/projects-api.response";
import type { ProjectAPIResponse } from "../dto/response/project-api.response";

export class ProjectRepositoryImpl implements IProjectRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<ProjectPage> {
    const { data } = await this.httpClient.get<ProjectsAPIResponse>("/projects");
    const projects = ProjectMapper.toDomain(data);
    return projects;
  }

  async getById(id: string): Promise<Project> {
    const { data } = await this.httpClient.get<ProjectAPIResponse>(`/projects/${id}`);
    const project = ProjectMapper.toDomainSingle(data);
    return project;
  }

  async create(projectData: Omit<Project, "id">): Promise<Project> {
    const { data } = await this.httpClient.post<ProjectAPIResponse>("/projects", projectData);
    const project = ProjectMapper.toDomainSingle(data);
    return project;
  }

  async update(id: string, projectData: Partial<Omit<Project, "id">>): Promise<Project> {
    const { data } = await this.httpClient.patch<ProjectAPIResponse>(`/projects/${id}`, projectData);
    return ProjectMapper.toDomainSingle(data);
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/projects/${id}`);
    return true;
  }
}
