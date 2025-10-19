import type { IProjectRepository } from "../domain/repositories/project.repository";
import { Project } from "../domain/entities/project.entity";

export class UpdateProjectUseCase {
  constructor(private repository: IProjectRepository) {}

  async execute(id: string, data: Partial<Omit<Project, "id">>): Promise<Project> {
    return await this.repository.update(id, data);
  }
}
