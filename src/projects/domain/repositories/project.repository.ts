import { Project } from "../entities/project.entity";
import type { ProjectPage } from "../interfaces/appointment-page.interface";

export interface IProjectRepository {
  getAll(): Promise<ProjectPage>;
  getById(id: string): Promise<Project>;
  create(data: Omit<Project, "id">): Promise<Project>;
  update(id: string, data: Partial<Omit<Project, "id">>): Promise<Project>;
  delete(id: string): Promise<boolean>;
}