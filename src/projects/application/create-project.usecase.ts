import { Project } from "../domain/entities/project.entity";
import type { IProjectRepository } from "../domain/repositories/project.repository";

export class CreateProjectUseCase {
  constructor(private repository: IProjectRepository) {}

  async execute(data: Omit<Project, "id">): Promise<Project> {
    return await this.repository.create(data);
  }
}
